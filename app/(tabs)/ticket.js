import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  StyleSheet,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import useAuth from '../../src/contexts/authContext';
import * as _unitOfWork from '../../src/api';
import { parseDateHH } from '../../src/helper/date-helper';
import {
  breakdownType,
  breakdownUserStatus,
} from '../../src/utils/constant';
import { BRAND_COLOR } from '../../src/constants/colors';
import BreakdownComment from '../../src/components/breakdown/BreakdownComment';
import ComfirmRefuse from '../../src/components/breakdown/ComfirmRefuse';

const STATUS_TABS = [
  { key: 'new', label: 'Mới' },
  { key: 'inProgress', label: 'Đang xử lý' },
  { key: 'overdue', label: 'Quá hạn' },
  { key: 'completed', label: 'Hoàn thành' },
  { key: 'cloesed', label: 'Đóng' },
];

const STATUS_MAP = {
  new: ['assigned', 'rejected', 'accepted', 'reopen'],
  inProgress: [
    'inProgress',
    'requestForSupport',
    'WCA',
    'reassignment',
    'experimentalFix',
    'pending_approval',
    'approved',
    'submitted',
  ],
  overdue: [
    'assigned',
    'rejected',
    'accepted',
    'reopen',
    'inProgress',
    'requestForSupport',
    'WCA',
    'reassignment',
    'experimentalFix',
    'pending_approval',
    'approved',
    'submitted',
  ],
  completed: ['completed'],
  cloesed: ['cloesed', 'cancelled', 'replacement'],
};

const PRIORITY_COLORS = {
  immediate: 'red',
  emergent: '#ff4d2b',
  urgent: '#fa8c16',
  semiUrgent: '#722ed1',
  nonUrgent: '#52c41a',
};

const PRIORITY_LABELS = {
  immediate: 'Khẩn cấp',
  emergent: 'Rất gấp',
  urgent: 'Gấp',
  semiUrgent: 'Bán gấp',
  nonUrgent: 'Không gấp',
};

const SORT_OPTIONS = [
  { key: 'createdAt_-1', label: 'Ngày tạo ↓', field: 'createdAt', order: -1 },
  { key: 'createdAt_1', label: 'Ngày tạo ↑', field: 'createdAt', order: 1 },
  { key: 'updatedAt_-1', label: 'Ngày cập nhật ↓', field: 'updatedAt', order: -1 },
  { key: 'updatedAt_1', label: 'Ngày cập nhật ↑', field: 'updatedAt', order: 1 },
];

function getUserStatusColor(status) {
  const found = breakdownUserStatus.Option?.find((o) => o.value === status);
  return found?.color ?? '#8c8c8c';
}

function getUserStatusLabel(status) {
  const labels = {
    new: 'Mới',
    assigned: 'Đã phân công',
    reassignment: 'Phân công lại',
    awaiting: 'Chờ',
    pending_approval: 'Chờ duyệt',
    inProgress: 'Đang xử lý',
    accepted: 'Đã chấp nhận',
    approved: 'Đã duyệt',
    submitted: 'Đã nộp',
    spareReplace: 'Thay thế phụ tùng',
    requestForSupport: 'Yêu cầu hỗ trợ',
    WCA: 'WCA',
    WWA: 'WWA',
    experimentalFix: 'Sửa thử nghiệm',
    completed: 'Hoàn thành',
    cloesed: 'Đóng',
    reopen: 'Mở lại',
    rejected: 'Từ chối',
    cancelled: 'Huỷ',
    replacement: 'Thay thế',
  };
  return labels[status] ?? status;
}

export default function TicketScreen() {
  const router = useRouter();
  const { user } = useAuth();

  const [breakdowns, setBreakdowns] = useState([]);
  const [page, setPage] = useState(1);
  const [totalRecord, setTotalRecord] = useState(0);
  const [ticketStatus, setTicketStatus] = useState(breakdownType.assigned);
  const [statusFilter, setStatusFilter] = useState('new');
  const [sortOrder, setSortOrder] = useState(-1);
  const [sortField, setSortField] = useState('createdAt');
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [commentBreakdown, setCommentBreakdown] = useState(null);
  const [showRefuse, setShowRefuse] = useState(false);
  const [refuseTarget, setRefuseTarget] = useState(null);
  const [acceptModal, setAcceptModal] = useState(false);
  const [acceptTarget, setAcceptTarget] = useState(null);
  const [acceptDate, setAcceptDate] = useState('');
  const [acceptLoading, setAcceptLoading] = useState(false);

  const isLoadingMore = useRef(false);

  const fetchGetListBreakdown = useCallback(
    async (_page = 1, reset = true) => {
      if (loading && !reset) return;
      try {
        if (reset) setLoading(true);
        const payload = {
          page: _page,
          limit: 10,
          sortBy: sortField,
          sortOrder: sortOrder,
        };
        if (ticketStatus === breakdownType.assigned) {
          payload.user = user?.id;
          payload.breakdownAssignUserStatuses = STATUS_MAP[statusFilter] ?? [];
        } else {
          if (statusFilter !== 'overdue') {
            payload.ticketStatuses = [statusFilter];
          } else {
            payload.ticketStatuses = ['new', 'inProgress'];
            payload.isOverdue = true;
          }
        }
        const res = await _unitOfWork.breakdown.getListBreakdowns(payload);
        if (res?.results) {
          setBreakdowns(reset ? res.results : (prev) => [...prev, ...res.results]);
          setTotalRecord(res.totalResults ?? 0);
        }
      } catch (e) {
        console.error('fetchGetListBreakdown error', e);
      } finally {
        if (reset) setLoading(false);
        isLoadingMore.current = false;
      }
    },
    [ticketStatus, statusFilter, sortOrder, sortField, user?.id], // eslint-disable-line react-hooks/exhaustive-deps
  );

  useEffect(() => {
    setPage(1);
    fetchGetListBreakdown(1, true);
  }, [ticketStatus, statusFilter, sortOrder, sortField]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    setPage(1);
    await fetchGetListBreakdown(1, true);
    setRefreshing(false);
  }, [fetchGetListBreakdown]);

  const handleLoadMore = useCallback(() => {
    if (isLoadingMore.current) return;
    if (breakdowns.length >= totalRecord) return;
    const nextPage = page + 1;
    isLoadingMore.current = true;
    setPage(nextPage);
    fetchGetListBreakdown(nextPage, false);
  }, [breakdowns.length, totalRecord, page, fetchGetListBreakdown]);

  const handleAcceptConfirm = async () => {
    if (!acceptTarget) return;
    try {
      setAcceptLoading(true);
      await _unitOfWork.breakdownAssignUser.comfirmAcceptBreakdownAssignUer({
        data: { id: acceptTarget.id, expectedRepairTime: acceptDate },
      });
      setAcceptModal(false);
      setAcceptDate('');
      setAcceptTarget(null);
      fetchGetListBreakdown(1, true);
    } catch (_e) {
      Alert.alert('Lỗi', 'Không thể chấp nhận phiếu. Vui lòng thử lại.');
    } finally {
      setAcceptLoading(false);
    }
  };

  const renderCard = ({ item }) => {
    const assignUser = item.breakdownAssignUsers?.[0];
    const userStatus = assignUser?.status;
    const priorityColor = PRIORITY_COLORS[item.priorityLevel] ?? '#8c8c8c';
    const priorityLabel = PRIORITY_LABELS[item.priorityLevel] ?? item.priorityLevel ?? '';
    const statusColor = getUserStatusColor(userStatus);
    const statusLabel = getUserStatusLabel(userStatus);
    const isAssigned = userStatus === 'assigned';

    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.85}
        onPress={() => router.push('/breakdown/' + item.id)}
      >
        {/* Asset info */}
        <View style={styles.cardRow}>
          <MaterialIcons name="build" size={16} color={BRAND_COLOR} style={styles.cardIcon} />
          <Text style={styles.cardAsset} numberOfLines={1}>
            {item.asset?.name ?? '—'}
          </Text>
          {item.asset?.code ? (
            <Text style={styles.cardCode}> ({item.asset.code})</Text>
          ) : null}
        </View>
        {(item.asset?.serialNumber || item.asset?.model) ? (
          <View style={styles.cardRow}>
            <Text style={styles.cardSub}>
              {[item.asset?.serialNumber, item.asset?.model].filter(Boolean).join(' / ')}
            </Text>
          </View>
        ) : null}

        {/* Priority */}
        {item.priorityLevel ? (
          <View style={styles.cardRow}>
            <Text style={[styles.priority, { color: priorityColor }]}>{priorityLabel}</Text>
          </View>
        ) : null}

        {/* Customer + created by */}
        <View style={styles.cardRow}>
          {item.customer?.name ? (
            <Text style={styles.cardMeta} numberOfLines={1}>
              <Text style={styles.metaLabel}>KH: </Text>
              {item.customer.name}
            </Text>
          ) : null}
          {item.createdByUser?.name ? (
            <Text style={[styles.cardMeta, { marginLeft: 12 }]} numberOfLines={1}>
              <Text style={styles.metaLabel}>Tạo bởi: </Text>
              {item.createdByUser.name}
            </Text>
          ) : null}
        </View>

        {/* Dates */}
        <View style={styles.cardRow}>
          {item.createdAt ? (
            <Text style={styles.cardMeta}>
              <Text style={styles.metaLabel}>Ngày tạo: </Text>
              {parseDateHH(item.createdAt)}
            </Text>
          ) : null}
          {item.deadline ? (
            <Text style={[styles.cardMeta, styles.deadline, { marginLeft: 12 }]}>
              <Text style={[styles.metaLabel, styles.deadline]}>Hạn: </Text>
              {parseDateHH(item.deadline)}
            </Text>
          ) : null}
        </View>

        {/* Status badge */}
        {userStatus ? (
          <View style={[styles.statusBadge, { backgroundColor: statusColor + '22' }]}>
            <Text style={[styles.statusText, { color: statusColor }]}>{statusLabel}</Text>
          </View>
        ) : null}

        {/* Actions */}
        <View style={styles.cardActions}>
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => console.log('monitor', item.id)}
          >
            <MaterialIcons name="visibility" size={16} color={BRAND_COLOR} />
            <Text style={styles.actionLabel}>Theo dõi</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => {
              setCommentBreakdown(item);
              setShowComment(true);
            }}
          >
            <MaterialIcons name="comment" size={16} color={BRAND_COLOR} />
            <Text style={styles.actionLabel}>Bình luận</Text>
          </TouchableOpacity>

          {isAssigned ? (
            <>
              <TouchableOpacity
                style={[styles.actionBtn, styles.acceptBtn]}
                onPress={() => {
                  setAcceptTarget(assignUser);
                  setAcceptDate('');
                  setAcceptModal(true);
                }}
              >
                <MaterialIcons name="check-circle" size={16} color="#fff" />
                <Text style={[styles.actionLabel, { color: '#fff' }]}>Nhận</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionBtn, styles.rejectBtn]}
                onPress={() => {
                  setRefuseTarget(assignUser);
                  setShowRefuse(true);
                }}
              >
                <MaterialIcons name="cancel" size={16} color="#fff" />
                <Text style={[styles.actionLabel, { color: '#fff' }]}>Từ chối</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                style={styles.actionBtn}
                onPress={() => console.log('phone', item.id)}
              >
                <MaterialIcons name="phone" size={16} color={BRAND_COLOR} />
                <Text style={styles.actionLabel}>Liên hệ</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionBtn}
                onPress={() => console.log('solution', item.id)}
              >
                <MaterialIcons name="lightbulb" size={16} color={BRAND_COLOR} />
                <Text style={styles.actionLabel}>Giải pháp</Text>
              </TouchableOpacity>
            </>
          )}
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
          <TouchableOpacity onPress={() => setShowSort(true)} style={styles.headerIcon}>
            <MaterialIcons name="sort" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.headerCenter}>
          <TouchableOpacity
            style={[styles.typeTab, ticketStatus === breakdownType.assigned && styles.typeTabActive]}
            onPress={() => setTicketStatus(breakdownType.assigned)}
          >
            <Text
              style={[
                styles.typeTabText,
                ticketStatus === breakdownType.assigned && styles.typeTabTextActive,
              ]}
            >
              Phiếu của tôi
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.typeTab,
              ticketStatus === breakdownType.hasOpened && styles.typeTabActive,
            ]}
            onPress={() => setTicketStatus(breakdownType.hasOpened)}
          >
            <Text
              style={[
                styles.typeTabText,
                ticketStatus === breakdownType.hasOpened && styles.typeTabTextActive,
              ]}
            >
              Phiếu đã mở
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.headerRight}>
          <MaterialIcons name="notifications-none" size={22} color="#fff" />
        </View>
      </View>

      {/* Status filter tabs */}
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
      {loading && breakdowns.length === 0 ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={BRAND_COLOR} />
        </View>
      ) : (
        <FlatList
          data={breakdowns}
          keyExtractor={(item) => item.id?.toString()}
          renderItem={renderCard}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={[BRAND_COLOR]}
            />
          }
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.3}
          ListEmptyComponent={
            <View style={styles.center}>
              <Text style={styles.emptyText}>Không có dữ liệu</Text>
            </View>
          }
          ListFooterComponent={
            !loading && breakdowns.length > 0 && breakdowns.length < totalRecord ? (
              <ActivityIndicator size="small" color={BRAND_COLOR} style={{ marginVertical: 12 }} />
            ) : null
          }
        />
      )}

      {/* Sort modal */}
      <Modal visible={showSort} transparent animationType="fade" onRequestClose={() => setShowSort(false)}>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowSort(false)}
        >
          <View style={styles.sortMenu}>
            <Text style={styles.sortMenuTitle}>Sắp xếp theo</Text>
            {SORT_OPTIONS.map((opt) => (
              <TouchableOpacity
                key={opt.key}
                style={[
                  styles.sortMenuItem,
                  opt.field === sortField && opt.order === sortOrder && styles.sortMenuItemActive,
                ]}
                onPress={() => {
                  setSortField(opt.field);
                  setSortOrder(opt.order);
                  setShowSort(false);
                }}
              >
                <Text
                  style={[
                    styles.sortMenuItemText,
                    opt.field === sortField &&
                      opt.order === sortOrder &&
                      styles.sortMenuItemTextActive,
                  ]}
                >
                  {opt.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Accept modal */}
      <Modal
        visible={acceptModal}
        transparent
        animationType="slide"
        onRequestClose={() => setAcceptModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.acceptModalBox}>
            <Text style={styles.acceptModalTitle}>Nhập thời gian dự kiến sửa chữa</Text>
            <TextInput
              style={styles.acceptInput}
              placeholder="DD/MM/YYYY HH:mm"
              value={acceptDate}
              onChangeText={setAcceptDate}
              placeholderTextColor="#aaa"
            />
            <View style={styles.acceptModalActions}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => {
                  setAcceptModal(false);
                  setAcceptDate('');
                }}
              >
                <Text style={styles.cancelBtnText}>Huỷ</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.okBtn}
                onPress={handleAcceptConfirm}
                disabled={acceptLoading}
              >
                {acceptLoading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.okBtnText}>OK</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Breakdown comment */}
      {showComment && (
        <BreakdownComment
          visible={showComment}
          onClose={() => {
            setShowComment(false);
            setCommentBreakdown(null);
          }}
          dataBreakdown={commentBreakdown}
        />
      )}

      {/* Refuse modal */}
      {showRefuse && (
        <ComfirmRefuse
          open={showRefuse}
          onCancel={() => {
            setShowRefuse(false);
            setRefuseTarget(null);
          }}
          refuseBreakAssignUser={refuseTarget}
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
  headerCenter: { flex: 1, flexDirection: 'row', justifyContent: 'center', gap: 4 },
  headerRight: { width: 36, alignItems: 'flex-end' },
  headerIcon: { padding: 4 },

  typeTab: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  typeTabActive: { backgroundColor: 'rgba(255,255,255,0.25)' },
  typeTabText: { color: 'rgba(255,255,255,0.7)', fontSize: 13, fontWeight: '500' },
  typeTabTextActive: { color: '#fff', fontWeight: '700' },

  /* Status filter */
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
  cardRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 3, flexWrap: 'wrap' },
  cardIcon: { marginRight: 4 },
  cardAsset: { fontSize: 15, fontWeight: '700', color: '#222', flex: 1 },
  cardCode: { fontSize: 13, color: '#666' },
  cardSub: { fontSize: 12, color: '#888' },
  priority: { fontSize: 12, fontWeight: '700' },
  cardMeta: { fontSize: 12, color: '#555', flexShrink: 1 },
  metaLabel: { fontWeight: '600', color: '#444' },
  deadline: { color: '#ff4d4f' },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginTop: 4,
    marginBottom: 6,
  },
  statusText: { fontSize: 12, fontWeight: '600' },

  /* Card actions */
  cardActions: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 6 },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: BRAND_COLOR,
  },
  actionLabel: { fontSize: 12, color: BRAND_COLOR },
  acceptBtn: { backgroundColor: '#52c41a', borderColor: '#52c41a' },
  rejectBtn: { backgroundColor: '#ff4d4f', borderColor: '#ff4d4f' },

  /* Sort modal */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sortMenu: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: 220,
    overflow: 'hidden',
    elevation: 6,
  },
  sortMenuTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: BRAND_COLOR,
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sortMenuItem: { paddingHorizontal: 16, paddingVertical: 12 },
  sortMenuItemActive: { backgroundColor: '#e6f0ff' },
  sortMenuItemText: { fontSize: 14, color: '#333' },
  sortMenuItemTextActive: { color: BRAND_COLOR, fontWeight: '700' },

  /* Accept modal */
  acceptModalBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: 300,
    padding: 20,
    elevation: 8,
  },
  acceptModalTitle: { fontSize: 15, fontWeight: '700', color: '#222', marginBottom: 12 },
  acceptInput: {
    borderWidth: 1,
    borderColor: '#d9d9d9',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    color: '#333',
    marginBottom: 16,
  },
  acceptModalActions: { flexDirection: 'row', justifyContent: 'flex-end', gap: 10 },
  cancelBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#d9d9d9',
  },
  cancelBtnText: { color: '#555', fontSize: 14 },
  okBtn: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: BRAND_COLOR,
    minWidth: 60,
    alignItems: 'center',
  },
  okBtnText: { color: '#fff', fontSize: 14, fontWeight: '600' },
});
