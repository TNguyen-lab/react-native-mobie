import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
  Image,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter, useLocalSearchParams } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import useAuth from '../../src/contexts/authContext';
import * as _unitOfWork from '../../src/api';
import { parseDateHH } from '../../src/helper/date-helper';
import { breakdownUserStatus } from '../../src/utils/constant';
import { BRAND_COLOR } from '../../src/constants/colors';
import CheckinCheckout from '../../src/components/breakdown/CheckinCheckout';
import ComfirmRefuse from '../../src/components/breakdown/ComfirmRefuse';
import ReOpenBreakdown from '../../src/components/breakdown/ReOpenBreakdown';
import ComfirmCancelBreakdown from '../../src/components/breakdown/ComfirmCancelBreakdown';
import BreakdownComment from '../../src/components/breakdown/BreakdownComment';

const TABS = [
  { key: 'general', label: 'Chung' },
  { key: 'diary', label: 'Nhật ký' },
  { key: 'comments', label: 'Nhận xét' },
  { key: 'spareParts', label: 'Phụ tùng' },
  { key: 'documents', label: 'Tài liệu' },
];

const STATUS_COLORS = {
  new: '#1890ff',
  assigned: '#21d9a4',
  accepted: '#13c2c2',
  inProgress: '#5BBD2B',
  completed: '#52c41a',
  cloesed: '#8c8c8c',
  rejected: '#ff4d4f',
  cancelled: '#ff4d4f',
  reopen: '#1890ff',
  submitted: '#faad14',
  WWA: '#ff4d4f',
  experimentalFix: '#79378B',
  replacement: '#ff4d4f',
};

const STATUS_LABELS = {
  new: 'Mới',
  assigned: 'Đã phân công',
  accepted: 'Đã tiếp nhận',
  inProgress: 'Đang xử lý',
  completed: 'Hoàn thành',
  cloesed: 'Đã đóng',
  rejected: 'Từ chối',
  cancelled: 'Đã huỷ',
  reopen: 'Mở lại',
  submitted: 'Đã nộp',
  WWA: 'Chờ phê duyệt',
  experimentalFix: 'Sửa thử nghiệm',
  replacement: 'Thay thế',
};

const PRIORITY_COLORS = {
  immediate: '#ff4d4f',
  emergent: '#fa541c',
  urgent: '#fa8c16',
  semiUrgent: '#722ed1',
  nonUrgent: '#52c41a',
};

const PRIORITY_LABELS = {
  immediate: 'Khẩn cấp',
  emergent: 'Cấp bách',
  urgent: 'Ưu tiên',
  semiUrgent: 'Nửa ưu tiên',
  nonUrgent: 'Thông thường',
};

export default function BreakdownDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { user } = useAuth();

  const [breakdown, setBreakdown] = useState(null);
  const [breakdownAssignUser, setBreakdownAssignUser] = useState(null);
  const [lastCheckInCheckOut, setLastCheckInCheckOut] = useState(null);
  const [lastCheckInCheckOutByUser, setLastCheckInCheckOutByUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('general');

  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [expectedRepairTime, setExpectedRepairTime] = useState('');
  const [acceptLoading, setAcceptLoading] = useState(false);
  const [showRefuseModal, setShowRefuseModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showReopenModal, setShowReopenModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);

  const fetchGetBreakdownAssignUserByBreakdownId = useCallback(async () => {
    const userId = user?.id || user?._id;
    const res = await _unitOfWork.breakdownAssignUser.getBreakdownAssignUserByBreakdownId({
      breakdown: id,
      user: userId,
    });
    if (res?.code === 1) {
      setBreakdownAssignUser(res.data);
      try {
        const lastCheckInRes =
          await _unitOfWork.breakdownAssignUser.getLastCheckInCheckOutByBreakdownAssignUser({
            breakdownAssignUserId: res.data?.id,
          });
        if (lastCheckInRes?.code === 1) setLastCheckInCheckOut(lastCheckInRes.data);
      } catch (_) {}
      try {
        const lastByUserRes =
          await _unitOfWork.breakdownAssignUser.getLastCheckInCheckOutByUser({ user: userId });
        if (lastByUserRes?.code === 1) setLastCheckInCheckOutByUser(lastByUserRes.data);
      } catch (_) {}
    }
  }, [id, user]);

  const loadData = useCallback(async () => {
    const fetchBreakdown = async () => {
      const res = await _unitOfWork.breakdown.getBreakdownById({ id });
      if (res) setBreakdown(res.breakdown);
    };
    await Promise.all([fetchBreakdown(), fetchGetBreakdownAssignUserByBreakdownId()]);
  }, [fetchGetBreakdownAssignUserByBreakdownId, id]);

  useEffect(() => {
    setLoading(true);
    loadData().finally(() => setLoading(false));
  }, [loadData]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  }, [loadData]);

  const handleAccept = async () => {
    if (!expectedRepairTime.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập thời gian dự kiến sửa chữa.');
      return;
    }
    try {
      setAcceptLoading(true);
      const assignId = breakdownAssignUser?.id || breakdownAssignUser?._id;
      const res = await _unitOfWork.breakdownAssignUser.comfirmAcceptBreakdownAssignUer({
        data: { id: assignId, expectedRepairTime },
      });
      if (res?.code === 1) {
        setExpectedRepairTime('');
        setShowAcceptModal(false);
        onRefresh();
      } else {
        Alert.alert('Thông báo', res?.message || 'Có lỗi xảy ra.');
      }
    } catch (_) {
      Alert.alert('Lỗi', 'Không thể thực hiện yêu cầu.');
    } finally {
      setAcceptLoading(false);
    }
  };

  const getStatusColor = (status) => STATUS_COLORS[status] || '#8c8c8c';
  const getStatusLabel = (status) => STATUS_LABELS[status] || status || '—';
  const getPriorityColor = (priority) => PRIORITY_COLORS[priority] || '#8c8c8c';
  const getPriorityLabel = (priority) => PRIORITY_LABELS[priority] || priority || '—';

  const isAssignedUser = !!breakdownAssignUser;

  /* ── Action buttons ── */
  const renderActionButtons = () => {
    if (!isAssignedUser) return null;

    const assignStatus = breakdownAssignUser?.status;
    const bdStatus = breakdown?.status;

    const buttons = [];

    if (assignStatus === breakdownUserStatus.assigned) {
      buttons.push(
        <TouchableOpacity
          key="accept"
          style={[styles.actionBtn, { backgroundColor: '#13c2c2' }]}
          onPress={() => setShowAcceptModal(true)}
        >
          <Text style={styles.actionBtnText}>Tiếp nhận</Text>
        </TouchableOpacity>,
        <TouchableOpacity
          key="reject"
          style={[styles.actionBtn, { backgroundColor: '#ff4d4f' }]}
          onPress={() => setShowRefuseModal(true)}
        >
          <Text style={styles.actionBtnText}>Từ chối</Text>
        </TouchableOpacity>
      );
    }

    if (
      assignStatus === breakdownUserStatus.accepted ||
      assignStatus === breakdownUserStatus.inProgress
    ) {
      const assignId = breakdownAssignUser?.id || breakdownAssignUser?._id;
      buttons.push(
        <TouchableOpacity
          key="fixed"
          style={[styles.actionBtn, { backgroundColor: '#52c41a' }]}
          onPress={() => router.push(`/breakdown/fixed/${assignId}`)}
        >
          <Text style={styles.actionBtnText}>Đã sửa</Text>
        </TouchableOpacity>
      );
    }

    if (bdStatus === 'completed') {
      buttons.push(
        <TouchableOpacity
          key="close"
          style={[styles.actionBtn, { backgroundColor: BRAND_COLOR }]}
          onPress={() => setShowCancelModal(true)}
        >
          <Text style={styles.actionBtnText}>Xác nhận đóng</Text>
        </TouchableOpacity>
      );
    }

    if (bdStatus === 'cloesed') {
      buttons.push(
        <TouchableOpacity
          key="reopen"
          style={[styles.actionBtn, { backgroundColor: '#fa8c16' }]}
          onPress={() => setShowReopenModal(true)}
        >
          <Text style={styles.actionBtnText}>Mở lại</Text>
        </TouchableOpacity>
      );
    }

    if (buttons.length === 0) return null;
    return <View style={styles.actionRow}>{buttons}</View>;
  };

  /* ── Info row helper ── */
  const renderInfoRow = (label, value) => (
    <View style={styles.infoRow} key={label}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value || '—'}</Text>
    </View>
  );

  /* ── General tab ── */
  const renderGeneralTab = () => {
    if (!breakdown) {
      return (
        <View style={styles.placeholderBox}>
          <Text style={styles.placeholderText}>Không tìm thấy phiếu</Text>
        </View>
      );
    }

    const asset = breakdown.assetMaintenance;
    const imageUrl = _unitOfWork.resource.getImage(asset?.resource);

    return (
      <View>
        {/* Asset card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Thiết bị</Text>
          <View style={styles.assetRow}>
            {asset?.resource ? (
              <Image source={{ uri: imageUrl }} style={styles.assetImage} />
            ) : (
              <View style={[styles.assetImage, styles.assetImagePlaceholder]}>
                <MaterialIcons name="devices" size={32} color="#ccc" />
              </View>
            )}
            <View style={styles.assetInfo}>
              {renderInfoRow('Tên thiết bị', asset?.name || asset?.assetName)}
              {renderInfoRow('Model', asset?.assetModel?.name || asset?.model)}
              {renderInfoRow('Serial', asset?.serial)}
            </View>
          </View>
        </View>

        {/* Breakdown info */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Thông tin phiếu</Text>
          {renderInfoRow('Mã phiếu', breakdown.code)}
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Trạng thái</Text>
            <View style={[styles.badge, { backgroundColor: getStatusColor(breakdown.status) }]}>
              <Text style={styles.badgeText}>{getStatusLabel(breakdown.status)}</Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Ưu tiên</Text>
            <View style={[styles.badge, { backgroundColor: getPriorityColor(breakdown.priority) }]}>
              <Text style={styles.badgeText}>{getPriorityLabel(breakdown.priority)}</Text>
            </View>
          </View>
          {renderInfoRow('Ngày tạo', parseDateHH(breakdown.createdAt))}
          {renderInfoRow(
            'Người tạo',
            breakdown.createdBy?.name || breakdown.createdBy?.fullName
          )}
          <Text style={styles.descLabel}>Mô tả sự cố</Text>
          <Text style={styles.descText}>
            {breakdown.problemDescription || breakdown.description || '—'}
          </Text>
        </View>

        {/* Customer */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Khách hàng</Text>
          {renderInfoRow(
            'Tên khách hàng',
            breakdown.customer?.name || breakdown.customer?.customerName
          )}
          {renderInfoRow('Liên hệ', breakdown.customer?.phone || breakdown.contactPhone)}
        </View>

        {/* Assigned technician */}
        {isAssignedUser && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Kỹ thuật viên</Text>
            {renderInfoRow(
              'Họ tên',
              breakdownAssignUser.user?.name || breakdownAssignUser.user?.fullName
            )}
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Trạng thái</Text>
              <View
                style={[
                  styles.badge,
                  { backgroundColor: getStatusColor(breakdownAssignUser.status) },
                ]}
              >
                <Text style={styles.badgeText}>
                  {getStatusLabel(breakdownAssignUser.status)}
                </Text>
              </View>
            </View>
            {renderInfoRow(
              'TG dự kiến',
              parseDateHH(breakdownAssignUser.expectedRepairTime)
            )}
          </View>
        )}

        {/* Check-in / Check-out */}
        {isAssignedUser && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Check-in / Check-out</Text>
            <CheckinCheckout
              getBreakdownAssignUserByBreakdownId={fetchGetBreakdownAssignUserByBreakdownId}
              lastCheckInCheckOut={lastCheckInCheckOut}
              lastCheckInCheckOutByUser={lastCheckInCheckOutByUser}
              breakdownAssignUser={breakdownAssignUser}
              onCallBack={onRefresh}
            />
          </View>
        )}

        {/* Action buttons */}
        {renderActionButtons()}
      </View>
    );
  };

  /* ── Diary tab ── */
  const renderDiaryTab = () => (
    <View style={styles.placeholderBox}>
      <MaterialIcons name="history" size={48} color="#ccc" />
      <Text style={styles.placeholderText}>Nhật ký công việc - Sẽ cập nhật sau</Text>
    </View>
  );

  /* ── Spare parts tab ── */
  const renderSparePartsTab = () => {
    const parts = breakdown?.spareRequests || breakdown?.spareParts || [];
    if (parts.length === 0) {
      return (
        <View style={styles.placeholderBox}>
          <MaterialIcons name="build" size={48} color="#ccc" />
          <Text style={styles.placeholderText}>Chưa có phụ tùng</Text>
        </View>
      );
    }
    return (
      <View style={styles.card}>
        {parts.map((part, idx) => (
          <View
            key={part.id || part._id || idx}
            style={[styles.partRow, idx < parts.length - 1 && styles.partRowBorder]}
          >
            <Text style={styles.partName}>
              {part.name || part.sparePart?.name || `Phụ tùng ${idx + 1}`}
            </Text>
            <Text style={styles.partQty}>x{part.quantity ?? 1}</Text>
          </View>
        ))}
      </View>
    );
  };

  /* ── Documents tab ── */
  const renderDocumentsTab = () => (
    <View style={styles.placeholderBox}>
      <MaterialIcons name="attach-file" size={48} color="#ccc" />
      <Text style={styles.placeholderText}>Tài liệu - Sẽ cập nhật sau</Text>
    </View>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralTab();
      case 'diary':
        return renderDiaryTab();
      case 'spareParts':
        return renderSparePartsTab();
      case 'documents':
        return renderDocumentsTab();
      default:
        return null;
    }
  };

  const handleTabPress = (tab) => {
    if (tab.key === 'comments') {
      setShowCommentModal(true);
    } else {
      setActiveTab(tab.key);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color={BRAND_COLOR} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar style="light" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {breakdown?.code || 'Chi tiết phiếu'}
        </Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Tab bar */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabBar}
        contentContainerStyle={styles.tabBarContent}
      >
        {TABS.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <TouchableOpacity
              key={tab.key}
              style={[styles.tab, isActive && styles.tabActive]}
              onPress={() => handleTabPress(tab)}
            >
              <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Main content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[BRAND_COLOR]}
            tintColor={BRAND_COLOR}
          />
        }
      >
        {renderTabContent()}
      </ScrollView>

      {/* Accept modal */}
      <Modal
        visible={showAcceptModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowAcceptModal(false)}
      >
        <KeyboardAvoidingView
          style={styles.overlay}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Tiếp nhận phiếu</Text>
            </View>
            <View style={styles.modalBody}>
              <Text style={styles.fieldLabel}>
                Thời gian dự kiến sửa chữa{' '}
                <Text style={{ color: '#e53935' }}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                placeholder="DD/MM/YYYY HH:mm"
                placeholderTextColor="#aaa"
                value={expectedRepairTime}
                onChangeText={setExpectedRepairTime}
              />
            </View>
            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={[styles.modalBtn, styles.modalBtnCancel]}
                onPress={() => {
                  setExpectedRepairTime('');
                  setShowAcceptModal(false);
                }}
                disabled={acceptLoading}
              >
                <Text style={styles.modalBtnCancelText}>Huỷ</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalBtn, styles.modalBtnSubmit]}
                onPress={handleAccept}
                disabled={acceptLoading}
              >
                {acceptLoading ? (
                  <ActivityIndicator color="#fff" size="small" />
                ) : (
                  <Text style={styles.modalBtnSubmitText}>Xác nhận</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* Refuse modal */}
      <ComfirmRefuse
        open={showRefuseModal}
        onCancel={() => {
          setShowRefuseModal(false);
          onRefresh();
        }}
        refuseBreakAssignUser={breakdownAssignUser}
      />

      {/* Reopen modal */}
      <ReOpenBreakdown
        open={showReopenModal}
        onCancel={() => setShowReopenModal(false)}
        breakdown={breakdown}
        onRefresh={onRefresh}
      />

      {/* Cancel / close modal */}
      <ComfirmCancelBreakdown
        open={showCancelModal}
        onCancel={() => setShowCancelModal(false)}
        breakdown={breakdown}
        onRefresh={onRefresh}
      />

      {/* Comments modal */}
      <BreakdownComment
        visible={showCommentModal}
        onClose={() => setShowCommentModal(false)}
        dataBreakdown={breakdown}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  /* Header */
  header: {
    backgroundColor: BRAND_COLOR,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    flex: 1,
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
  },
  /* Tab bar */
  tabBar: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e8e8e8',
    maxHeight: 46,
  },
  tabBarContent: {
    flexDirection: 'row',
    paddingHorizontal: 4,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 2,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: BRAND_COLOR,
  },
  tabText: {
    fontSize: 14,
    color: '#666',
  },
  tabTextActive: {
    color: BRAND_COLOR,
    fontWeight: '600',
  },
  /* Scroll view */
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 12,
    paddingBottom: 32,
  },
  /* Card */
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: BRAND_COLOR,
    marginBottom: 10,
  },
  /* Asset */
  assetRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  assetImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  assetImagePlaceholder: {
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  assetInfo: {
    flex: 1,
  },
  /* Info rows */
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    flexWrap: 'wrap',
  },
  infoLabel: {
    fontSize: 13,
    color: '#888',
    minWidth: 120,
  },
  infoValue: {
    fontSize: 13,
    color: '#333',
    fontWeight: '500',
    flex: 1,
    flexWrap: 'wrap',
  },
  /* Description */
  descLabel: {
    fontSize: 13,
    color: '#888',
    marginBottom: 4,
    marginTop: 2,
  },
  descText: {
    fontSize: 13,
    color: '#333',
    lineHeight: 20,
    backgroundColor: '#f8f8f8',
    borderRadius: 6,
    padding: 10,
  },
  /* Badge */
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  /* Spare parts */
  partRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  partRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  partName: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  partQty: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
    marginLeft: 8,
  },
  /* Placeholder */
  placeholderBox: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    gap: 12,
  },
  placeholderText: {
    fontSize: 14,
    color: '#aaa',
    textAlign: 'center',
  },
  /* Action buttons */
  actionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 4,
    marginBottom: 8,
  },
  actionBtn: {
    paddingVertical: 11,
    paddingHorizontal: 22,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  /* Accept modal */
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '100%',
    maxWidth: 480,
    overflow: 'hidden',
  },
  modalHeader: {
    backgroundColor: BRAND_COLOR,
    paddingVertical: 14,
    paddingHorizontal: 18,
  },
  modalTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalBody: {
    padding: 18,
  },
  fieldLabel: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d9d9d9',
    borderRadius: 6,
    padding: 10,
    fontSize: 14,
    color: '#333',
    backgroundColor: '#fafafa',
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 14,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    gap: 10,
  },
  modalBtn: {
    paddingVertical: 9,
    paddingHorizontal: 20,
    borderRadius: 6,
    minWidth: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBtnCancel: {
    borderWidth: 1,
    borderColor: '#d9d9d9',
    backgroundColor: '#fff',
  },
  modalBtnCancelText: {
    color: '#555',
    fontSize: 14,
  },
  modalBtnSubmit: {
    backgroundColor: BRAND_COLOR,
  },
  modalBtnSubmitText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
