import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import BaseLayout from '../../src/components/layout/BaseLayout';
import { BRAND_COLOR } from '../../src/constants/colors';

const MORE_ITEMS = [
  { icon: 'info', label: 'Tài sản', key: 'asset' },
  { icon: 'build', label: 'Bảo trì', key: 'maintenance' },
  { icon: 'today', label: 'Hiệu chuẩn công việc', key: 'calibration_work' },
  { icon: 'explore', label: 'Hiệu chuẩn của tôi', key: 'my_calibration_work' },
  { icon: 'verified-user', label: 'Kiểm tra tài sản', key: 'property_inspection' },
  { icon: 'shield', label: 'Phê duyệt phụ tùng sự cố', key: 'spare_breakdown' },
  {
    icon: 'assignment-turned-in',
    label: 'Phê duyệt phụ tùng bảo trì',
    key: 'spare_maintenance',
  },
  { icon: 'apps', label: 'Hợp đồng', key: 'contract' },
  { icon: 'storage', label: 'Lịch kiểm kê', key: 'inventory' },
  { icon: 'find-in-page', label: 'Báo cáo', key: 'report' },
  { icon: 'settings', label: 'Cài đặt', key: 'settings' },
  { icon: 'contacts', label: 'Liên hệ', key: 'contact' },
];

export default function MoreScreen() {
  return (
    <BaseLayout title="Thêm">
      <ScrollView style={styles.scroll} contentContainerStyle={styles.list}>
        {MORE_ITEMS.map((item) => (
          <TouchableOpacity
            key={item.key}
            style={styles.menuItem}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel={item.label}>
            <View style={styles.iconWrap}>
              <MaterialIcons name={item.icon} size={22} color={BRAND_COLOR} />
            </View>
            <Text style={styles.label}>{item.label}</Text>
            <MaterialIcons name="chevron-right" size={20} color="#ccc" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </BaseLayout>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  list: {
    paddingVertical: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginHorizontal: 12,
    marginVertical: 4,
    borderRadius: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
  },
  iconWrap: {
    width: 36,
    alignItems: 'center',
  },
  label: {
    flex: 1,
    fontSize: 15,
    color: '#333',
    marginLeft: 8,
  },
});
