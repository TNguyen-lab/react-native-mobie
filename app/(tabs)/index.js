import React from 'react';
import { View, Text } from 'react-native';
import BaseLayout from '../../src/components/layout/BaseLayout';
import { placeholderStyles as styles } from '../../src/styles/placeholderStyles';

export default function DashboardScreen() {
  return (
    <BaseLayout title="Bảng điều khiển">
      <View style={styles.placeholder}>
        <Text style={styles.text}>Bảng điều khiển</Text>
        <Text style={styles.subText}>Nội dung sẽ được cập nhật sau</Text>
      </View>
    </BaseLayout>
  );
}
