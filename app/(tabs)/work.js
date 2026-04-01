import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import * as _unitOfWork from '../../src/api';
import { parseDateHH } from '../../src/helper/date-helper';
import { schedulePreventiveTaskAssignUserStatus } from '../../src/utils/schedulePreventive.constant';
import { BRAND_COLOR } from '../../src/constants/colors';

const LIMIT = 20;

const STATUS_TABS = [
  { key: 'new', label: 'Mới' },
  { key: 'inProgress', label: 'Đang xử lý' },
  { key: 'overdue', label: 'Quá hạn' },
  { key: 'upcoming', label: 'Sắp đến hạn' },
  { key: 'history', label: 'Lịch sử' },
];

const STATUS_MAP = {
  new: ['assigned', 'accepted'],
  inProgress: ['inProgress', 'partiallyCompleted', 'pending_approval', 'approved', 'submitted'],
  overdue: ['inProgress', 'assigned', 'accepted', 'partiallyCompleted', 'pending_approval', 'approved', 'submitted'],
  upcoming: ['assigned', 'accepted'],
  history: ['skipped', 'completed', 'cancelled', 'reassignment', 'reopen', 'replacement', 'rejected'],
};

const STATUS_LABELS = {
  assigned: 'Đã phân công',
  accepted: 'Đã chấp nhận',
  inProgress: 'Đang xử lý',
  partiallyCompleted: 'Hoàn thành một phần',
  pending_approval: 'Chờ duyệt',
  approved: 'Đã duyệt',
  submitted: 'Đã nộp',
  skipped: 'Bỏ qua',
  completed: 'Hoàn thành',
  cancelled: 'Đã huỷ',
  reassignment: 'Phân công lại',
  reopen: 'Mở lại',
  replacement: 'Thay thế',
  rejected: 'Từ chối',
};

const PRIORITY_COLORS = { High: '#ff4d4f', Medium: '#fa8c16', Low: '#52c41a' };
const PRIORITY_LABELS = { High: 'Cao', Medium: 'Trung bình', Low: 'Thấp' };

function getStatusColor(status) {
  const found = schedulePreventiveTaskAssignUserStatus.Options?.find((o) => o.value === status);
  return found?.color ?? '#8c8c8c';
}

export default function WorkScreen() {
  const router = useRouter();

  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalRecord, setTotalRecord] = useState(0);
  const [statusFilter, setStatusFilter] = useState('new');
  const [sortOrder, setSortOrder] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const isLoadingMore = useRef(false);

  const fetchItems = useCallback(
    async (_page = 1, reset = true) => {
      if (loading && !reset) return;
      try {
        if (reset) setLoading(true);
        const payload = {
          page: _page,
          limit: LIMIT,
          sortBy: 'createdAt',
          sortOrder,
          schedulePreventiveTaskAssignUserStatuses: STATUS_MAP[statusFilter] ?? [],
        };
        if (statusFilter === 'overdue') {
          payload.isOverdue = true;
        } else if (statusFilter === 'upcoming') {
          payload.isUpcoming = true;
        }
        const res = await _unitOfWork.schedulePreventive.getMySchedulePreventives(payload);
        if (res?.schedulePreventiveTaskAssignUser) {
          setItems(
            reset
              ? res.schedulePreventiveTaskAssignUser
              : (prev) => [...prev, ...res.schedulePreventiveTaskAssignUser],
          );
          setTotalRecord(res.totalResults ?? 0);
        }
      } catch (e) {
        console.error('fetchItems error', e);
      } finally {
        if (reset) setLoading(false);
        isLoadingMore.current = false;
      }
    },
    [statusFilter, sortOrder], // eslint-disable-line react-hooks/exhaustive-deps
  );

  useEffect(() => {
    setPage(1);
    fetchItems(1, true);
  }, [statusFilter, sortOrder]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    setPage(1);
    await fetchItems(1, true);
    setRefreshing(false);
  }, [fetchItems]);

  const handleLoadMore = useCallback(() => {
    if (isLoadingMore.current) return;
    if (items.length >= totalRecord) return;
    const nextPage = page + 1;
    isLoadingMore.current = true;
    setPage(nextPage);
    fetchItems(nextPage, false);
  }, [items.length, totalRecord, page, fetchItems]);

  const handleToggleSort = useCallback(() => {
    setSortOrder((prev) => (prev === -1 ? 1 : -1));
  }, []);

  const renderCard = ({ item }) => {
    const sp = item.schedulePreventiveTask?.schedulePreventive;
    const task = item.schedulePreventiveTask;
    const asset = sp?.assetMaintenance;
    const statusColor = getStatusColor(item.status);
    const statusLabel = STATUS_LABELS[item.status] ?? item.status ?? '';
    const priorityColor = PRIORITY_COLORS[sp?.priorityType] ?? '#8c8c8c';
    const priorityLabel = PRIORITY_LABELS[sp?.priorityType] ?? sp?.priorityType ?? '';

    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.85}
        onPress={() => console.log('work detail', item.id)}
      >
        {/* Task / Schedule name */}
        <View style={styles.cardRow}>
          <MaterialIcons name="event-note" size={16} color={BRAND_COLOR} style={styles.cardIcon} />
          <Text style={styles.cardTitle} numberOfLines={2}>
            {sp?.schedulePreventiveName ?? '—'}
          </Text>
        </View>

        {/* Asset info */}
        {(asset?.assetNumber || asset?.serial) ? (
          <View style={styles.cardRow}>
            <MaterialIcons name="build" size={14} color="#888" style={styles.cardIcon} />
            <Text style={styles.cardSub} numberOfLines={1}>
              {[asset?.assetNumber, asset?.serial].filter(Boolean).join(' / ')}
            </Text>
          </View>
        ) : null}

        {/* Customer */}
        {asset?.customer?.customerName ? (
          <View style={styles.cardRow}>
            <MaterialIcons name="business" size={14} color="#888" style={styles.cardIcon} />
            <Text style={styles.cardMeta} numberOfLines={1}>
              <Text style={styles.metaLabel}>KH: </Text>
              {asset.customer.customerName}
            </Text>
          </View>
        ) : null}

        {/* Dates */}
        <View style={styles.cardRow}>
          {task?.scheduledStartDate ? (
            <Text style={styles.cardMeta}>
              <Text style={styles.metaLabel}>Bắt đầu: </Text>
              {parseDateHH(task.scheduledStartDate)}
            </Text>
          ) : null}
          {task?.scheduledEndDate ? (
            <Text style={[styles.cardMeta, { marginLeft: 10 }]}>
              <Text style={styles.metaLabel}>Kết thúc: </Text>
              {parseDateHH(task.scheduledEndDate)}
            </Text>
          ) : null}
        </View>

        {/* Priority + Status badges */}
        <View style={styles.badgeRow}>
          {priorityLabel ? (
            <View style={[styles.badge, { backgroundColor: priorityColor + '22' }]}>
              <Text style={[styles.badgeText, { color: priorityColor }]}>{priorityLabel}</Text>
            </View>
          ) : null}
          {statusLabel ? (
            <View style={[styles.badge, { backgroundColor: statusColor + '22' }]}>
              <Text style={[styles.badgeText, { color: statusColor }]}>{statusLabel}</Text>
            </View>
          ) : null}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar backgroundColor={BRAND_COLOR} style="light" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.headerIcon} onPress={handleToggleSort}>
            <MaterialIcons
              name={sortOrder === -1 ? 'arrow-downward' : 'arrow-upward'}
              size={22}
              color="#fff"
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.headerTitle}>Công việc</Text>
        <View style={styles.headerRight}>
          <MaterialIcons name="notifications-none" size={22} color="#fff" />
        </View>
      </View>

      {/* Status tabs */}
      <View style={styles.statusTabsWrapper}>
        <FlatList
          data={STATUS_TABS}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(t) => t.key}
          contentContainerStyle={styles.statusTabsContent}
          renderItem={({ item: tab }) => (
            <TouchableOpacity
              style={[styles.statusTab, statusFilter === tab.key && styles.statusTabActive]}
              onPress={() => setStatusFilter(tab.key)}
            >
              <Text
                style={[
                  styles.statusTabText,
                  statusFilter === tab.key && styles.statusTabTextActive,
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* List */}
      {loading && items.length === 0 ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={BRAND_COLOR} />
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id?.toString()}
          renderItem={renderCard}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} colors={[BRAND_COLOR]} />
          }
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.3}
          ListEmptyComponent={
            <View style={styles.center}>
              <Text style={styles.emptyText}>Không có dữ liệu</Text>
            </View>
          }
          ListFooterComponent={
            !loading && items.length > 0 && items.length < totalRecord ? (
              <ActivityIndicator size="small" color={BRAND_COLOR} style={{ marginVertical: 12 }} />
            ) : null
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f2f5' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 40 },
  emptyText: { color: '#999', fontSize: 14 },

  /* Header */
  header: {
    backgroundColor: BRAND_COLOR,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 10,
  },
  headerLeft: { width: 36, alignItems: 'flex-start' },
  headerTitle: { flex: 1, textAlign: 'center', color: '#fff', fontSize: 16, fontWeight: '700' },
  headerRight: { width: 36, alignItems: 'flex-end' },
  headerIcon: { padding: 4 },

  /* Status tabs */
  statusTabsWrapper: { backgroundColor: '#fff', elevation: 2 },
  statusTabsContent: { paddingHorizontal: 8, paddingVertical: 6, gap: 6 },
  statusTab: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 14,
    backgroundColor: '#f0f2f5',
  },
  statusTabActive: { backgroundColor: BRAND_COLOR },
  statusTabText: { fontSize: 13, color: '#555' },
  statusTabTextActive: { color: '#fff', fontWeight: '600' },

  /* List */
  listContent: { padding: 10, paddingBottom: 24 },

  /* Card */
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  cardRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4, flexWrap: 'wrap' },
  cardIcon: { marginRight: 4 },
  cardTitle: { fontSize: 15, fontWeight: '700', color: '#222', flex: 1 },
  cardSub: { fontSize: 12, color: '#888', flex: 1 },
  cardMeta: { fontSize: 12, color: '#555', flexShrink: 1 },
  metaLabel: { fontWeight: '600', color: '#444' },

  /* Badges */
  badgeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 6 },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  badgeText: { fontSize: 12, fontWeight: '600' },
});
