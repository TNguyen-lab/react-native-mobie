import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
  Alert,
  ActivityIndicator,
  StyleSheet,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as _unitOfWork from '../../src/api';
import { priorityLevelStatus, assetMaintenanceStatus } from '../../src/utils/constant';
import { BRAND_COLOR } from '../../src/constants/colors';

const PRIORITY_LABELS = {
  immediate: 'Khẩn cấp',
  emergent: 'Rất gấp',
  urgent: 'Gấp',
  semiUrgent: 'Bán gấp',
  nonUrgent: 'Không gấp',
};

const PRIORITY_COLORS = {
  immediate: '#ff4d4f',
  emergent: '#ff7a45',
  urgent: '#fa8c16',
  semiUrgent: '#722ed1',
  nonUrgent: '#52c41a',
};

const STATUS_LABELS = {
  isActive: 'Đang hoạt động',
  isNotActive: 'Không hoạt động',
};

export default function CreateScreen() {
  const router = useRouter();

  // Asset search state
  const [assetSearchQuery, setAssetSearchQuery] = useState('');
  const [assetSearchResults, setAssetSearchResults] = useState([]);
  const [assetSearchLoading, setAssetSearchLoading] = useState(false);
  const [showAssetModal, setShowAssetModal] = useState(false);

  // Selected asset + auto-filled fields
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [assetNumber, setAssetNumber] = useState('');
  const [serial, setSerial] = useState('');
  const [assetName, setAssetName] = useState('');
  const [assetModelName, setAssetModelName] = useState('');
  const [customerName, setCustomerName] = useState('');

  // Failure types
  const [failureTypes, setFailureTypes] = useState([]);
  const [selectedFailureType, setSelectedFailureType] = useState(null);
  const [showFailureTypeModal, setShowFailureTypeModal] = useState(false);

  // Asset maintenance status
  const [selectedStatus, setSelectedStatus] = useState(assetMaintenanceStatus.isNotActive);
  const [showStatusModal, setShowStatusModal] = useState(false);

  // Priority
  const [selectedPriority, setSelectedPriority] = useState(null);
  const [showPriorityModal, setShowPriorityModal] = useState(false);

  // Incident deadline
  const [incidentDeadline, setIncidentDeadline] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Description & submit
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSearchAssets = useCallback(async () => {
    if (!assetSearchQuery.trim()) {
      Alert.alert('Thông báo', 'Vui lòng nhập mã tài sản để tìm kiếm');
      return;
    }
    try {
      setAssetSearchLoading(true);
      const res = await _unitOfWork.assetMaintenance.getAllAssetMaintenance({
        assetNumber: assetSearchQuery.trim(),
      });
      const results = res?.data ?? res?.results ?? [];
      setAssetSearchResults(Array.isArray(results) ? results : []);
    } catch (e) {
      console.error('Search assets error', e);
      Alert.alert('Lỗi', 'Không thể tìm kiếm tài sản. Vui lòng thử lại.');
    } finally {
      setAssetSearchLoading(false);
    }
  }, [assetSearchQuery]);

  const handleSelectAsset = useCallback(async (item) => {
    setSelectedAsset(item);
    setAssetNumber(item.assetNumber ?? '');
    setSerial(item.serial ?? '');
    setAssetName(item.assetModel?.asset?.assetName ?? '');
    setAssetModelName(item.assetModel?.assetModelName ?? '');
    setCustomerName(item.customer?.customerName ?? '');
    setShowAssetModal(false);
    setAssetSearchQuery('');
    setAssetSearchResults([]);
    setSelectedFailureType(null);

    if (item.assetModel?.id) {
      try {
        const res = await _unitOfWork.assetModelFailureType.getAllAssetModelFailureType({
          assetModel: item.assetModel.id,
        });
        const types = res?.data ?? res?.results ?? [];
        setFailureTypes(Array.isArray(types) ? types : []);
      } catch (e) {
        console.error('Fetch failure types error', e);
        setFailureTypes([]);
      }
    } else {
      setFailureTypes([]);
    }
  }, []);

  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    return `${day}-${month}-${d.getFullYear()}`;
  };

  const handleSubmit = async () => {
    if (!selectedAsset) {
      Alert.alert('Lỗi', 'Vui lòng chọn tài sản');
      return;
    }
    try {
      setSubmitting(true);
      const payload = {
        assetMaintenance: selectedAsset.id,
        assetMaintenanceStatus: selectedStatus,
        ...(selectedPriority && { priorityLevel: selectedPriority }),
        ...(selectedFailureType && { breakdownDefect: selectedFailureType.id }),
        ...(description.trim() && { defectDescription: description.trim() }),
        ...(incidentDeadline && { incidentDeadline: incidentDeadline.toISOString() }),
      };
      await _unitOfWork.breakdown.createBreakdown(payload);
      Alert.alert('Thành công', 'Tạo phiếu hỗ trợ thành công', [
        { text: 'OK', onPress: () => router.replace('/') },
      ]);
    } catch (e) {
      console.error('Create breakdown error', e);
      Alert.alert('Lỗi', 'Không thể tạo phiếu hỗ trợ. Vui lòng thử lại.');
    } finally {
      setSubmitting(false);
    }
  };

  const openAssetSearchModal = () => {
    setAssetSearchQuery('');
    setAssetSearchResults([]);
    setShowAssetModal(true);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="light" backgroundColor={BRAND_COLOR} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <MaterialIcons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tạo phiếu hỗ trợ kỹ thuật</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
      >
        {/* Asset Number (search) */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>
            Số tài sản <Text style={styles.required}>*</Text>
          </Text>
          <TouchableOpacity style={styles.searchField} onPress={openAssetSearchModal}>
            <Text style={[styles.searchFieldText, !assetNumber && styles.placeholderText]}>
              {assetNumber || 'Tìm kiếm tài sản...'}
            </Text>
            <MaterialIcons name="search" size={20} color={BRAND_COLOR} />
          </TouchableOpacity>
        </View>

        {/* Read-only auto-filled fields */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Serial</Text>
          <View style={styles.readOnlyField}>
            <Text style={[styles.readOnlyText, !serial && styles.placeholderText]}>
              {serial || 'Tự động điền'}
            </Text>
          </View>
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Tên tài sản</Text>
          <View style={styles.readOnlyField}>
            <Text style={[styles.readOnlyText, !assetName && styles.placeholderText]}>
              {assetName || 'Tự động điền'}
            </Text>
          </View>
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Model tài sản</Text>
          <View style={styles.readOnlyField}>
            <Text style={[styles.readOnlyText, !assetModelName && styles.placeholderText]}>
              {assetModelName || 'Tự động điền'}
            </Text>
          </View>
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Khách hàng</Text>
          <View style={styles.readOnlyField}>
            <Text style={[styles.readOnlyText, !customerName && styles.placeholderText]}>
              {customerName || 'Tự động điền'}
            </Text>
          </View>
        </View>

        {/* Incident Deadline */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Hạn xử lý sự cố</Text>
          <TouchableOpacity style={styles.selectField} onPress={() => setShowDatePicker(true)}>
            <Text style={[styles.selectFieldText, !incidentDeadline && styles.placeholderText]}>
              {incidentDeadline ? formatDate(incidentDeadline) : 'Chọn ngày'}
            </Text>
            <MaterialIcons name="event" size={20} color={BRAND_COLOR} />
          </TouchableOpacity>
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={incidentDeadline ?? new Date()}
            mode="date"
            display={Platform.OS === 'ios' ? 'inline' : 'default'}
            onChange={(event, date) => {
              setShowDatePicker(Platform.OS === 'ios');
              if (event.type !== 'dismissed' && date) {
                setIncidentDeadline(date);
              }
            }}
          />
        )}

        {/* Priority Level */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Mức độ ưu tiên</Text>
          <TouchableOpacity style={styles.selectField} onPress={() => setShowPriorityModal(true)}>
            <Text
              style={[
                styles.selectFieldText,
                !selectedPriority && styles.placeholderText,
                selectedPriority && { color: PRIORITY_COLORS[selectedPriority] },
              ]}
            >
              {selectedPriority ? PRIORITY_LABELS[selectedPriority] : 'Chọn mức độ ưu tiên'}
            </Text>
            <MaterialIcons name="keyboard-arrow-down" size={20} color={BRAND_COLOR} />
          </TouchableOpacity>
        </View>

        {/* Defect Type */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Loại hỏng hóc</Text>
          <TouchableOpacity
            style={[styles.selectField, !selectedAsset && styles.selectFieldDisabled]}
            onPress={() => selectedAsset && setShowFailureTypeModal(true)}
          >
            <Text style={[styles.selectFieldText, !selectedFailureType && styles.placeholderText]}>
              {selectedFailureType?.failureTypeName ??
                (selectedAsset ? 'Chọn loại hỏng hóc' : 'Chọn tài sản trước')}
            </Text>
            <MaterialIcons
              name="keyboard-arrow-down"
              size={20}
              color={selectedAsset ? BRAND_COLOR : '#ccc'}
            />
          </TouchableOpacity>
        </View>

        {/* Asset Maintenance Status */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Trạng thái tài sản</Text>
          <TouchableOpacity style={styles.selectField} onPress={() => setShowStatusModal(true)}>
            <Text style={styles.selectFieldText}>
              {STATUS_LABELS[selectedStatus] ?? selectedStatus}
            </Text>
            <MaterialIcons name="keyboard-arrow-down" size={20} color={BRAND_COLOR} />
          </TouchableOpacity>
        </View>

        {/* Defect Description */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Mô tả sự cố</Text>
          <TextInput
            style={styles.textArea}
            multiline
            numberOfLines={4}
            value={description}
            onChangeText={setDescription}
            placeholder="Nhập mô tả chi tiết sự cố..."
            placeholderTextColor="#bbb"
            textAlignVertical="top"
          />
        </View>

        {/* Submit */}
        <TouchableOpacity
          style={[styles.submitButton, submitting && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={submitting}
        >
          {submitting ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text style={styles.submitButtonText}>Tạo phiếu hỗ trợ</Text>
          )}
        </TouchableOpacity>

        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* ── Asset Search Modal ── */}
      <Modal
        visible={showAssetModal}
        animationType="slide"
        onRequestClose={() => setShowAssetModal(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowAssetModal(false)}>
              <MaterialIcons name="close" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Tìm kiếm tài sản</Text>
            <View style={styles.headerSpacer} />
          </View>

          <View style={styles.searchBar}>
            <TextInput
              style={styles.searchInput}
              value={assetSearchQuery}
              onChangeText={setAssetSearchQuery}
              placeholder="Nhập mã tài sản..."
              placeholderTextColor="#bbb"
              returnKeyType="search"
              onSubmitEditing={handleSearchAssets}
              autoFocus
            />
            <TouchableOpacity
              style={styles.searchButton}
              onPress={handleSearchAssets}
              disabled={assetSearchLoading}
            >
              {assetSearchLoading ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <MaterialIcons name="search" size={22} color="#fff" />
              )}
            </TouchableOpacity>
          </View>

          {assetSearchResults.length === 0 ? (
            <View style={styles.emptyContainer}>
              <MaterialIcons name="search" size={48} color="#ccc" />
              <Text style={styles.emptyText}>Nhập mã tài sản để tìm kiếm</Text>
            </View>
          ) : (
            <FlatList
              data={assetSearchResults}
              keyExtractor={(item) => String(item.id ?? item.assetNumber)}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.assetItem}
                  onPress={() => handleSelectAsset(item)}
                >
                  <View style={styles.assetItemRow}>
                    <MaterialIcons name="devices" size={20} color={BRAND_COLOR} />
                    <View style={styles.assetItemInfo}>
                      <Text style={styles.assetItemTitle}>{item.assetNumber}</Text>
                      <Text style={styles.assetItemSub}>
                        {[item.assetModel?.asset?.assetName, item.assetModel?.assetModelName]
                          .filter(Boolean)
                          .join(' – ')}
                      </Text>
                      {item.customer?.customerName ? (
                        <Text style={styles.assetItemCustomer}>
                          {item.customer.customerName}
                        </Text>
                      ) : null}
                    </View>
                    <MaterialIcons name="chevron-right" size={20} color="#ccc" />
                  </View>
                </TouchableOpacity>
              )}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
          )}
        </SafeAreaView>
      </Modal>

      {/* ── Priority Modal ── */}
      <Modal
        visible={showPriorityModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowPriorityModal(false)}
      >
        <View style={styles.bottomSheetOverlay}>
          <TouchableOpacity
            style={styles.bottomSheetBackdrop}
            onPress={() => setShowPriorityModal(false)}
          />
          <View style={styles.bottomSheet}>
            <View style={styles.bottomSheetHandle} />
            <Text style={styles.bottomSheetTitle}>Chọn mức độ ưu tiên</Text>
            {priorityLevelStatus.Options.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.optionItem,
                  selectedPriority === option.value && styles.optionItemSelected,
                ]}
                onPress={() => {
                  setSelectedPriority(option.value);
                  setShowPriorityModal(false);
                }}
              >
                <View
                  style={[
                    styles.optionDot,
                    { backgroundColor: PRIORITY_COLORS[option.value] ?? '#ccc' },
                  ]}
                />
                <Text
                  style={[
                    styles.optionText,
                    selectedPriority === option.value && styles.optionTextSelected,
                  ]}
                >
                  {PRIORITY_LABELS[option.value] ?? option.value}
                </Text>
                {selectedPriority === option.value && (
                  <MaterialIcons name="check" size={18} color={BRAND_COLOR} />
                )}
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.clearOption}
              onPress={() => {
                setSelectedPriority(null);
                setShowPriorityModal(false);
              }}
            >
              <Text style={styles.clearOptionText}>Xóa lựa chọn</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* ── Failure Type Modal ── */}
      <Modal
        visible={showFailureTypeModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowFailureTypeModal(false)}
      >
        <View style={styles.bottomSheetOverlay}>
          <TouchableOpacity
            style={styles.bottomSheetBackdrop}
            onPress={() => setShowFailureTypeModal(false)}
          />
          <View style={styles.bottomSheet}>
            <View style={styles.bottomSheetHandle} />
            <Text style={styles.bottomSheetTitle}>Chọn loại hỏng hóc</Text>
            {failureTypes.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Không có loại hỏng hóc</Text>
              </View>
            ) : (
              <FlatList
                data={failureTypes}
                keyExtractor={(item) => String(item.id)}
                style={{ maxHeight: 320 }}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.optionItem,
                      selectedFailureType?.id === item.id && styles.optionItemSelected,
                    ]}
                    onPress={() => {
                      setSelectedFailureType(item);
                      setShowFailureTypeModal(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        selectedFailureType?.id === item.id && styles.optionTextSelected,
                      ]}
                    >
                      {item.failureTypeName ?? item.name ?? String(item.id)}
                    </Text>
                    {selectedFailureType?.id === item.id && (
                      <MaterialIcons name="check" size={18} color={BRAND_COLOR} />
                    )}
                  </TouchableOpacity>
                )}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
              />
            )}
            <TouchableOpacity
              style={styles.clearOption}
              onPress={() => {
                setSelectedFailureType(null);
                setShowFailureTypeModal(false);
              }}
            >
              <Text style={styles.clearOptionText}>Xóa lựa chọn</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* ── Asset Status Modal ── */}
      <Modal
        visible={showStatusModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowStatusModal(false)}
      >
        <View style={styles.bottomSheetOverlay}>
          <TouchableOpacity
            style={styles.bottomSheetBackdrop}
            onPress={() => setShowStatusModal(false)}
          />
          <View style={styles.bottomSheet}>
            <View style={styles.bottomSheetHandle} />
            <Text style={styles.bottomSheetTitle}>Chọn trạng thái tài sản</Text>
            {assetMaintenanceStatus.Options.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.optionItem,
                  selectedStatus === option.value && styles.optionItemSelected,
                ]}
                onPress={() => {
                  setSelectedStatus(option.value);
                  setShowStatusModal(false);
                }}
              >
                <Text
                  style={[
                    styles.optionText,
                    selectedStatus === option.value && styles.optionTextSelected,
                  ]}
                >
                  {STATUS_LABELS[option.value] ?? option.value}
                </Text>
                {selectedStatus === option.value && (
                  <MaterialIcons name="check" size={18} color={BRAND_COLOR} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: BRAND_COLOR,
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 60,
  },
  headerTitle: {
    flex: 1,
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    paddingLeft: 12,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  fieldGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  required: {
    color: '#ff4d4f',
  },
  searchField: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d9d9d9',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  searchFieldText: {
    flex: 1,
    fontSize: 15,
    color: '#333',
  },
  readOnlyField: {
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  readOnlyText: {
    fontSize: 15,
    color: '#555',
  },
  selectField: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d9d9d9',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  selectFieldDisabled: {
    backgroundColor: '#f5f5f5',
  },
  selectFieldText: {
    flex: 1,
    fontSize: 15,
    color: '#333',
  },
  placeholderText: {
    color: '#bbb',
  },
  textArea: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d9d9d9',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 15,
    color: '#333',
    minHeight: 100,
  },
  submitButton: {
    backgroundColor: BRAND_COLOR,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  // Asset search modal
  modalContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  modalHeader: {
    backgroundColor: BRAND_COLOR,
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 60,
  },
  modalTitle: {
    flex: 1,
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  searchBar: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#d9d9d9',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: '#333',
    marginRight: 8,
    backgroundColor: '#f9f9f9',
  },
  searchButton: {
    backgroundColor: BRAND_COLOR,
    borderRadius: 8,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  emptyText: {
    fontSize: 15,
    color: '#999',
    marginTop: 12,
  },
  assetItem: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  assetItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  assetItemInfo: {
    flex: 1,
    marginLeft: 12,
  },
  assetItemTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  assetItemSub: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  assetItemCustomer: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  separator: {
    height: 1,
    backgroundColor: '#f0f0f0',
  },
  // Bottom sheet (shared by picker modals)
  bottomSheetOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  bottomSheetBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  bottomSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: 32,
    maxHeight: '70%',
  },
  bottomSheetHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#ddd',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 8,
  },
  bottomSheetTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  optionItemSelected: {
    backgroundColor: '#f0f4ff',
  },
  optionDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 12,
  },
  optionText: {
    flex: 1,
    fontSize: 15,
    color: '#333',
  },
  optionTextSelected: {
    color: BRAND_COLOR,
    fontWeight: '600',
  },
  clearOption: {
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    marginTop: 4,
  },
  clearOptionText: {
    fontSize: 14,
    color: '#ff4d4f',
  },
  headerSpacer: {
    width: 24,
  },
  bottomSpacer: {
    height: 32,
  },
});
