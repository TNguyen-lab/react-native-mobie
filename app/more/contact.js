import React from 'react';
import { View, Text, StyleSheet, ScrollView, Linking, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import BaseLayout from '../../src/components/layout/BaseLayout';
import { BRAND_COLOR } from '../../src/constants/colors';

const APP_VERSION = '1.0.0';

function ContactRow({ icon, label, value, onPress }) {
  return (
    <TouchableOpacity style={styles.contactRow} onPress={onPress} disabled={!onPress} activeOpacity={onPress ? 0.7 : 1}>
      <MaterialIcons name={icon} size={20} color={BRAND_COLOR} style={styles.contactIcon} />
      <View style={styles.contactText}>
        <Text style={styles.contactLabel}>{label}</Text>
        <Text style={[styles.contactValue, onPress && styles.contactLink]}>{value}</Text>
      </View>
      {onPress ? <MaterialIcons name="chevron-right" size={18} color="#ccc" /> : null}
    </TouchableOpacity>
  );
}

export default function ContactScreen() {
  const router = useRouter();

  return (
    <BaseLayout title="Liên hệ" showBack onBack={() => router.back()}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Company header */}
        <View style={styles.companyHeader}>
          <View style={styles.companyLogo}>
            <Text style={styles.companyLogoText}>MTC</Text>
          </View>
          <Text style={styles.companyName}>MTC Corp</Text>
          <Text style={styles.companyTagline}>Giải pháp quản lý bảo trì thông minh</Text>
        </View>

        {/* Contact info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thông tin liên hệ</Text>
          <ContactRow
            icon="phone"
            label="Hotline"
            value="0949 854 758"
            onPress={() => Linking.openURL('tel:0949854758')}
          />
          <ContactRow
            icon="email"
            label="Email"
            value="support@mtccorp.vn"
            onPress={() => Linking.openURL('mailto:support@mtccorp.vn')}
          />
          <ContactRow
            icon="language"
            label="Website"
            value="www.mtccorp.vn"
            onPress={() => Linking.openURL('https://www.mtccorp.vn')}
          />
          <ContactRow
            icon="location-on"
            label="Địa chỉ"
            value="Việt Nam"
          />
        </View>

        {/* About app */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Về ứng dụng</Text>
          <View style={styles.aboutRow}>
            <Text style={styles.aboutLabel}>Phiên bản</Text>
            <Text style={styles.aboutValue}>{APP_VERSION}</Text>
          </View>
          <View style={styles.aboutRow}>
            <Text style={styles.aboutLabel}>Nhà phát triển</Text>
            <Text style={styles.aboutValue}>MTC Corp</Text>
          </View>
          <View style={[styles.aboutRow, { borderBottomWidth: 0 }]}>
            <Text style={styles.aboutLabel}>Bản quyền</Text>
            <Text style={styles.aboutValue}>© {new Date().getFullYear()} MTC Corp</Text>
          </View>
        </View>
      </ScrollView>
    </BaseLayout>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, paddingBottom: 32 },

  companyHeader: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  companyLogo: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: BRAND_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  companyLogoText: { color: '#fff', fontSize: 20, fontWeight: '800' },
  companyName: { fontSize: 20, fontWeight: '700', color: '#222', marginBottom: 4 },
  companyTagline: { fontSize: 13, color: '#888', textAlign: 'center' },

  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#999',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#f0f0f0',
  },
  contactIcon: { marginRight: 12 },
  contactText: { flex: 1 },
  contactLabel: { fontSize: 11, color: '#aaa', marginBottom: 1 },
  contactValue: { fontSize: 14, color: '#333' },
  contactLink: { color: BRAND_COLOR },

  aboutRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#f0f0f0',
  },
  aboutLabel: { fontSize: 14, color: '#555' },
  aboutValue: { fontSize: 14, color: '#333', fontWeight: '500' },
});
