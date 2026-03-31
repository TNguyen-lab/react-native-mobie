import React from 'react';
import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import BaseLayout from '../../src/components/layout/BaseLayout';
import { placeholderStyles as styles } from '../../src/styles/placeholderStyles';

export default function AssetScreen() {
  const router = useRouter();
  return (
    <BaseLayout title="Tài sản" showBack onBack={() => router.back()}>
      <View style={styles.placeholder}>
        <Text style={styles.text}>Tài sản</Text>
        <Text style={styles.subText}>Nội dung sẽ được cập nhật sau</Text>
      </View>
    </BaseLayout>
  );
}
