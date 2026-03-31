import React from 'react';
import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import BaseLayout from '../../src/components/layout/BaseLayout';
import { placeholderStyles as styles } from '../../src/styles/placeholderStyles';

export default function CalibrationScreen() {
  const router = useRouter();
  return (
    <BaseLayout title="Hiệu chuẩn của tôi" showBack onBack={() => router.back()}>
      <View style={styles.placeholder}>
        <Text style={styles.text}>Hiệu chuẩn của tôi</Text>
        <Text style={styles.subText}>Nội dung sẽ được cập nhật sau</Text>
      </View>
    </BaseLayout>
  );
}
