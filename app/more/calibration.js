import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import * as _unitOfWork from '../../src/api';
import BaseLayout from '../../src/components/layout/BaseLayout';
import { BRAND_COLOR } from '../../src/constants/colors';
import { parseDate } from '../../src/helper/date-helper';

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
  inProgress: ['inProgress', 'submitted', 'pending_approval', 'approved'],
  overdue: ['assigned', 'accepted', 'inProgress', 'submitted', 'pending_approval', 'approved'],
  upcoming: ['assigned', 'accepted'],
  history: ['completed', 'cancelled', 'skipped', 'rejected', 'replacement', 'reassignment', 'reopen', 'partiallyCompleted'],
};

const STATUS_COLOR = {
  assigned: '#21d9a4',
  accepted: '#13c2c2',
  inProgress: '#5BBD2B',
  completed: '#52c41a',
  cancelled: '#ff4d4f',
  skipped: '#8c8c8c',
  reassignment: '#1890ff',
  reopen: '#1890ff',
  submitted: '#faad14',
  pending_approval: '#1890ff',
  approved: '#1890ff',
  replacement: '#ff4d4f',
  partiallyCompleted: '#faad14',
  rejected: '#ff4d4f',
};

const STATUS_LABEL = {
  assigned: 'Đã phân công',
  accepted: 'Đã tiếp nhận',
  inProgress: 'Đang xử lý',
  completed: 'Hoàn thành',
  cancelled: 'Đã hủy',
  skipped: 'Bỏ qua',
  reassignment: 'Phân công lại',
  reopen: 'Mở lại',
  submitted: 'Đã nộp',
  pending_approval: 'Chờ duyệt',
  approved: 'Đã duyệt',
  replacement: 'Thay thế',
  partiallyCompleted: 'Hoàn thành một phần',
  rejected: 'Từ chối',
};

export default function CalibrationScreen() {
  const router = useRouter();

  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalRecord, setTotalRecord] = useState(0);
  const [statusFilter, setStatusFilter] = useState('new');
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
          sortOrder: -1,
          calibrationWorkAssignUserStatuses: STATUS_MAP[statusFilter] ?? [],
        };
        if (statusFilter === 'overdue') payload.isOverdue = true;
        if (statusFilter === 'upcoming') payload.isUpcoming = true;

        const res = await _unitOfWork.calibrationWork.getMyCalibrationWorks(payload);
        if (res?.calibrationWorkAssignUser) {
          if (reset) {
            setItems(res.calibrationWorkAssignUser);
          } else {
            setItems((prev) => [...prev, ...res.calibrationWorkAssignUser]);
          }
          setTotalRecord(res.totalResults ?? 0);
        }
      } catch (e) {
        console.error('CalibrationScreen fetchItems error', e);
      } finally {
        if (reset) setLoading(false);
        isLoadingMore.current = false;
      }
    },
    [statusFilter], // eslint-disable-line react-hooks/exhaustive-deps
  );

  useEffect(() => {
    setPage(1);
    fetchItems(1, true);
  }, [statusFilter]); // eslint-disable-line react-hooks/exhaustive-deps

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

  const renderCard = ({ item }) => {
    const cw = item.calibrationWork;
    const asset = cw?.assetMaintenance;
    const statusColor = STATUS_COLOR[item.status] ?? '#8c8c8c';
    const statusLabel = STATUS_LABEL[item.status] ?? item.status ?? '';

    return (
      <View style={styles.card}>
        <View style={styles.cardRow}>
          <MaterialIcons name="build-circle" size={16} color={BRAND_COLOR} style={styles.cardIcon} />
          <Text style={styles.cardTitle} numberOfLines={2}>
            {cw?.calibrationWorkCode ?? '—'}
          </Text>
        </View>

        {(asset?.assetNumber || asset?.serial) ? (
          <View style={styles.cardRow}>
            <MaterialIcons name="memory" size={14} color="#888" style={styles.cardIcon} />
            <Text style={styles.cardSub} numberOfLines={1}>
              {[asset?.assetNumber, asset?.serial].filter(Boolean).join(' / ')}
            </Text>
          </View>
        ) : null}

        {asset?.customer?.customerName ? (
          <View style={styles.cardRow}>
            <MaterialIcons name="business" size={14} color="#888" style={styles.cardIcon} />
            <Text style={styles.cardMeta} numberOfLines={1}>
              <Text style={styles.metaLabel}>KH: </Text>
              {asset.customer.customerName}
            </Text>
          </View>
        ) : null}

        {cw?.scheduledDate ? (
          <View style={styles.cardRow}>
            <MaterialIcons name="event" size={14} color="#888" style={styles.cardIcon} />
            <Text style={styles.cardMeta}>
              <Text style={styles.metaLabel}>Ngày lịch: </Text>
              {parseDate(cw.scheduledDate)}
            </Text>
          </View>
        ) : null}

        <View style={styles.badgeRow}>
          <View style={[styles.badge, { backgroundColor: statusColor + '22' }]}>
            <Text style={[styles.badgeText, { color: statusColor }]}>{statusLabel}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <BaseLayout title="Hiệu chuẩn của tôi" showBack onBack={() => router.back()}>
      {/* Status tabs */}
      <View style={styles.tabsWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsContent}
        >
          {STATUS_TABS.map((tab) => (
            <TouchableOpacity
              key={tab.key}
              style={[styles.tab, statusFilter === tab.key && styles.tabActive]}
              onPress={() => setStatusFilter(tab.key)}
            >
              <Text style={[styles.tabText, statusFilter === tab.key && styles.tabTextActive]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

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
    </BaseLayout>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 40 },
  emptyText: { color: '#999', fontSize: 14 },

  tabsWrapper: { backgroundColor: '#fff', elevation: 2 },
  tabsContent: { paddingHorizontal: 8, paddingVertical: 6, gap: 6 },
  tab: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 14,
    backgroundColor: '#f0f2f5',
  },
  tabActive: { backgroundColor: BRAND_COLOR },
  tabText: { fontSize: 13, color: '#555' },
  tabTextActive: { color: '#fff', fontWeight: '600' },

  listContent: { padding: 10, paddingBottom: 24 },

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

  badgeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 6 },
  badge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10 },
  badgeText: { fontSize: 12, fontWeight: '600' },
});
