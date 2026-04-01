import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import * as _unitOfWork from '../../src/api';
import useAuth from '../../src/contexts/authContext';
import { BRAND_COLOR } from '../../src/constants/colors';

// ─── Status metadata ────────────────────────────────────────────────────────

const STATUS_LABEL = {
  new: 'Mới',
  assigned: 'Đã phân công',
  accepted: 'Đã tiếp nhận',
  inProgress: 'Đang xử lý',
  completed: 'Hoàn thành',
  cloesed: 'Đã đóng',
  rejected: 'Từ chối',
  cancelled: 'Đã hủy',
  submitted: 'Đã nộp',
  reopen: 'Mở lại',
  reassignment: 'Phân công lại',
  pending_approval: 'Chờ duyệt',
  partiallyCompleted: 'Hoàn thành một phần',
  skipped: 'Bỏ qua',
  replacement: 'Thay thế',
};

const STATUS_COLOR = {
  new: '#1890ff',
  assigned: '#21d9a4',
  accepted: '#13c2c2',
  inProgress: '#5BBD2B',
  completed: '#52c41a',
  cloesed: '#8c8c8c',
  rejected: '#ff4d4f',
  cancelled: '#ff4d4f',
  submitted: '#faad14',
  reopen: '#fa8c16',
  reassignment: '#722ed1',
  pending_approval: '#faad14',
  partiallyCompleted: '#36cfc9',
  skipped: '#8c8c8c',
  replacement: '#eb2f96',
};

// ─── Sub-components ──────────────────────────────────────────────────────────

function Avatar({ name }) {
  const initials = (name || '')
    .split(' ')
    .filter(Boolean)
    .slice(-2)
    .map((w) => w[0].toUpperCase())
    .join('');
  return (
    <View style={styles.avatar}>
      <Text style={styles.avatarText}>{initials || '?'}</Text>
    </View>
  );
}

function StatChip({ status, count }) {
  const color = STATUS_COLOR[status] || '#595959';
  const label = STATUS_LABEL[status] || status;
  return (
    <View style={[styles.chip, { borderColor: color }]}>
      <Text style={[styles.chipCount, { color }]}>{count ?? 0}</Text>
      <Text style={styles.chipLabel}>{label}</Text>
    </View>
  );
}

function SectionRow({ title, data, loading }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {loading ? (
        <ActivityIndicator color={BRAND_COLOR} style={{ marginVertical: 12 }} />
      ) : (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipRow}>
          {(data || []).length === 0 ? (
            <Text style={styles.emptyText}>Không có dữ liệu</Text>
          ) : (
            (data || []).map((item, idx) => (
              <StatChip key={item.status ?? idx} status={item.status} count={item.count} />
            ))
          )}
        </ScrollView>
      )}
    </View>
  );
}

// ─── Main Screen ─────────────────────────────────────────────────────────────

export default function DashboardScreen() {
  const { user, logout } = useAuth();

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [approvalCount, setApprovalCount] = useState(0);
  const [totalBreakdownStatuses, setTotalBreakdownStatuses] = useState([]);
  const [totalMyBreakdownStatuses, setTotalMyBreakdownStatuses] = useState([]);
  const [totalSchedulePreventiveStatuses, setTotalSchedulePreventiveStatuses] = useState([]);
  const [totalMySchedulePreventiveStatuses, setTotalMySchedulePreventiveStatuses] = useState([]);

  const fetchAll = useCallback(async () => {
    try {
      const [
        breakdownRes,
        myBreakdownRes,
        scheduleRes,
        myScheduleRes,
        approvalRes,
        notifRes,
      ] = await Promise.allSettled([
        _unitOfWork.breakdown.getTotalBreakdwonStatus({}),
        _unitOfWork.breakdownAssignUser.getTotalMyBreakdownAssignUserStatus(),
        _unitOfWork.schedulePreventive.getTotalSchedulePreventiveStatus({}),
        _unitOfWork.schedulePreventive.getTotalMySchedulePreventiveTaskAssignUserStatus({}),
        _unitOfWork.report.getApproveWorks({ page: 1, limit: 1 }),
        _unitOfWork.notification.getNotificationUsers({}),
      ]);

      if (breakdownRes.status === 'fulfilled' && breakdownRes.value?.data) {
        setTotalBreakdownStatuses(breakdownRes.value.data);
      }
      if (myBreakdownRes.status === 'fulfilled' && myBreakdownRes.value?.data) {
        setTotalMyBreakdownStatuses(myBreakdownRes.value.data);
      }
      if (scheduleRes.status === 'fulfilled' && scheduleRes.value?.data) {
        setTotalSchedulePreventiveStatuses(scheduleRes.value.data);
      }
      if (myScheduleRes.status === 'fulfilled' && myScheduleRes.value?.data) {
        setTotalMySchedulePreventiveStatuses(myScheduleRes.value.data);
      }
      if (approvalRes.status === 'fulfilled') {
        setApprovalCount(approvalRes.value?.data?.totalResults ?? 0);
      }
      if (notifRes.status === 'fulfilled') {
        setUnreadCount(notifRes.value?.data?.countUnRead ?? 0);
      }
    } catch (_) {
      // individual errors handled via allSettled
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchAll().finally(() => setLoading(false));
  }, [fetchAll]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchAll().finally(() => setRefreshing(false));
  }, [fetchAll]);

  const displayName = user
    ? [user.firstName, user.lastName].filter(Boolean).join(' ') || user.name || user.email || 'User'
    : 'User';
  const companyName = user?.company?.name ?? '';

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* ── Header ── */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Avatar name={displayName} />
          <View style={styles.headerInfo}>
            <Text style={styles.headerName} numberOfLines={1}>{displayName}</Text>
            {!!companyName && (
              <Text style={styles.headerCompany} numberOfLines={1}>{companyName}</Text>
            )}
          </View>
        </View>
        <View style={styles.headerActions}>
          {/* Notification bell */}
          <TouchableOpacity style={styles.iconBtn}>
            <MaterialIcons name="notifications" size={24} color="#fff" />
            {unreadCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{unreadCount > 99 ? '99+' : unreadCount}</Text>
              </View>
            )}
          </TouchableOpacity>
          {/* Logout */}
          <TouchableOpacity style={styles.iconBtn} onPress={logout}>
            <MaterialIcons name="logout" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* ── Body ── */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={BRAND_COLOR} />
        </View>
      ) : (
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[BRAND_COLOR]} />}
        >
          {/* Quick action row */}
          <View style={styles.quickRow}>
            <TouchableOpacity style={styles.quickCard}>
              <View style={styles.quickIconWrap}>
                <MaterialIcons name="check-circle" size={28} color={BRAND_COLOR} />
                {approvalCount > 0 && (
                  <View style={styles.quickBadge}>
                    <Text style={styles.quickBadgeText}>{approvalCount > 99 ? '99+' : approvalCount}</Text>
                  </View>
                )}
              </View>
              <Text style={styles.quickLabel}>Duyệt nhanh</Text>
            </TouchableOpacity>
          </View>

          {/* Breakdown sections */}
          <SectionRow
            title="Sự cố tổng thể"
            data={totalBreakdownStatuses}
          />
          <SectionRow
            title="Sự cố của tôi"
            data={totalMyBreakdownStatuses}
          />

          {/* Schedule Preventive sections */}
          <SectionRow
            title="Lịch BDĐK tổng thể"
            data={totalSchedulePreventiveStatuses}
          />
          <SectionRow
            title="Lịch BDĐK của tôi"
            data={totalMySchedulePreventiveStatuses}
          />
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BRAND_COLOR,
  },
  // Header
  header: {
    backgroundColor: BRAND_COLOR,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  avatarText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
  headerInfo: {
    flex: 1,
  },
  headerName: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
  headerCompany: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 12,
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  iconBtn: {
    padding: 8,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#ff4d4f',
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  badgeText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: '700',
  },
  // Body
  loadingContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scroll: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  scrollContent: {
    paddingBottom: 32,
  },
  // Quick action row
  quickRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 4,
    gap: 12,
  },
  quickCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  quickIconWrap: {
    position: 'relative',
    marginBottom: 6,
  },
  quickBadge: {
    position: 'absolute',
    top: -4,
    right: -8,
    backgroundColor: '#ff4d4f',
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  quickBadgeText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: '700',
  },
  quickLabel: {
    fontSize: 13,
    color: '#333',
    fontWeight: '600',
  },
  // Section
  section: {
    marginTop: 16,
    marginHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: BRAND_COLOR,
    marginBottom: 10,
  },
  chipRow: {
    flexDirection: 'row',
    gap: 10,
    paddingBottom: 4,
  },
  chip: {
    borderWidth: 1.5,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 14,
    alignItems: 'center',
    minWidth: 80,
    backgroundColor: '#fafafa',
  },
  chipCount: {
    fontSize: 20,
    fontWeight: '800',
  },
  chipLabel: {
    fontSize: 11,
    color: '#595959',
    marginTop: 2,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 13,
    color: '#aaa',
    paddingVertical: 8,
  },
});
