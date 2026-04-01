import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter, useLocalSearchParams } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import * as _unitOfWork from '../../src/api';
import { parseDateHH } from '../../src/helper/date-helper';
import { BRAND_COLOR } from '../../src/constants/colors';

export default function ComfirmFixedScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [breakdownAssignUser, setBreakdownAssignUser] = useState(null);
  const [totalEngineer, setTotalEngineer] = useState(0);

  // Form fields
  const [notes, setNotes] = useState('');
  const [problem, setProblem] = useState('');
  const [rootCause, setRootCause] = useState('');
  const [solution, setSolution] = useState('');
  const [comment, setComment] = useState('');
  const [downtimeHr, setDowntimeHr] = useState('0');
  const [downtimeMin, setDowntimeMin] = useState('0');
  const [signatoryIsName, setSignatoryIsName] = useState('');

  useEffect(() => {
    if (id) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [assignRes, totalRes] = await Promise.all([
        _unitOfWork.breakdownAssignUser.getBreakdownAssignUserById({ id }),
        _unitOfWork.breakdownAssignUser.getTotalEngineerBreakdownAssignUser(id),
      ]);

      if (assignRes?.code === 1) {
        setBreakdownAssignUser(assignRes.data);
        setProblem(assignRes.data?.breakdown?.breakdown?.breakdownDefect?.name || '');
      }
      if (totalRes?.code === 1) {
        setTotalEngineer(totalRes.totalEngineerBreakdown);
        if (totalRes.time) {
          const totalMinutes = Math.floor(Number(totalRes.time) / 60000);
          setDowntimeHr(String(Math.floor(totalMinutes / 60)));
          setDowntimeMin(String(totalMinutes % 60));
        }
      }
    } catch (_) {}
    setLoading(false);
  };

  const onSubmit = async () => {
    setSubmitting(true);
    try {
      const hour = Number(downtimeHr || 0);
      const minute = Number(downtimeMin || 0);
      const downtimeMs = (hour * 60 + minute) * 60 * 1000;

      const res = await _unitOfWork.breakdownAssignUser.comfirmBreakdownAssignUserFixedMobile({
        data: {
          listAttachment: [],
          beakdownAssignUserRepair: {
            breakdownAssignUser: id,
            notes,
            problem,
            rootCause,
            solution,
            comment,
            downtimeHr: hour,
            downtimeMin: minute,
            downTimeMilis: downtimeMs,
            signatoryIsName,
          },
        },
      });

      if (res?.code === 1) {
        Alert.alert('Thành công', 'Xác nhận đã sửa thành công!', [
          { text: 'OK', onPress: () => router.back() },
        ]);
      } else {
        Alert.alert('Lỗi', 'Có lỗi xảy ra, vui lòng thử lại!');
      }
    } catch (_) {
      Alert.alert('Lỗi', 'Có lỗi xảy ra, vui lòng thử lại!');
    }
    setSubmitting(false);
  };

  const breakdown = breakdownAssignUser?.breakdown?.breakdown;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor={BRAND_COLOR} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerBack}>
          <MaterialIcons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          Xác nhận đã sửa
        </Text>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={BRAND_COLOR} />
        </View>
      ) : (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            {/* Asset info */}
            <Text style={styles.assetName}>
              {breakdown?.assetMaintenance?.assetModel?.asset?.assetName}
            </Text>

            <View style={styles.infoRow}>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Mã phiếu</Text>
                <Text style={styles.infoValue}>{breakdown?.code}</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Ngày mở</Text>
                <Text style={styles.infoValue}>{parseDateHH(breakdownAssignUser?.breakdown?.createdAt)}</Text>
              </View>
            </View>

            <View style={styles.divider} />

            {/* Downtime (only if sole engineer) */}
            {totalEngineer === 1 && (
              <View style={styles.row}>
                <View style={[styles.field, { flex: 1, marginRight: 8 }]}>
                  <Text style={styles.label}>Giờ ngừng hoạt động</Text>
                  <TextInput
                    style={styles.input}
                    value={downtimeHr}
                    onChangeText={setDowntimeHr}
                    keyboardType="numeric"
                    placeholder="0"
                  />
                </View>
                <View style={[styles.field, { flex: 1 }]}>
                  <Text style={styles.label}>Phút ngừng hoạt động</Text>
                  <TextInput
                    style={styles.input}
                    value={downtimeMin}
                    onChangeText={setDowntimeMin}
                    keyboardType="numeric"
                    placeholder="0"
                  />
                </View>
              </View>
            )}

            <View style={styles.field}>
              <Text style={styles.label}>Ghi chú</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={notes}
                onChangeText={setNotes}
                multiline
                numberOfLines={3}
                placeholder="Nhập ghi chú..."
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Lỗi / Vấn đề</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={problem}
                onChangeText={setProblem}
                multiline
                numberOfLines={3}
                placeholder="Mô tả vấn đề..."
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Nguyên nhân gốc rễ</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={rootCause}
                onChangeText={setRootCause}
                multiline
                numberOfLines={3}
                placeholder="Nguyên nhân..."
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Giải pháp</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={solution}
                onChangeText={setSolution}
                multiline
                numberOfLines={3}
                placeholder="Giải pháp đã áp dụng..."
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Nhận xét</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={comment}
                onChangeText={setComment}
                multiline
                numberOfLines={3}
                placeholder="Nhận xét thêm..."
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Tên người ký xác nhận</Text>
              <TextInput
                style={styles.input}
                value={signatoryIsName}
                onChangeText={setSignatoryIsName}
                placeholder="Nhập tên người ký..."
              />
            </View>

            {/* Spacer for bottom button */}
            <View style={{ height: 80 }} />
          </ScrollView>

          {/* Submit button */}
          <View style={styles.submitBar}>
            <TouchableOpacity
              style={[styles.submitBtn, submitting && styles.submitBtnDisabled]}
              onPress={onSubmit}
              disabled={submitting}
              activeOpacity={0.8}
            >
              {submitting ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.submitBtnText}>Xác nhận đã sửa</Text>
              )}
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: {
    backgroundColor: BRAND_COLOR,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    minHeight: 60,
  },
  headerBack: { marginRight: 12 },
  headerTitle: { flex: 1, color: '#fff', fontSize: 18, fontWeight: '600' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  scrollView: { flex: 1 },
  scrollContent: { padding: 16 },
  assetName: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 12,
    color: '#222',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
  infoItem: { alignItems: 'center' },
  infoLabel: { fontSize: 13, color: '#aaa' },
  infoValue: { fontSize: 16, fontWeight: '600', color: '#00b96b', marginTop: 2 },
  divider: {
    borderBottomWidth: 2,
    borderBottomColor: '#ddd',
    borderStyle: 'dashed',
    marginBottom: 16,
  },
  row: { flexDirection: 'row', marginBottom: 4 },
  field: { marginBottom: 14 },
  label: { fontSize: 13, fontWeight: '600', color: '#555', marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#333',
    backgroundColor: '#fff',
  },
  textArea: { minHeight: 80, textAlignVertical: 'top' },
  submitBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    padding: 12,
  },
  submitBtn: {
    backgroundColor: BRAND_COLOR,
    borderRadius: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitBtnDisabled: { opacity: 0.7 },
  submitBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
