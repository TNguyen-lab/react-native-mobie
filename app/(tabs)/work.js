import React from 'react';
import { View, Text } from 'react-native';
import BaseLayout from '../../src/components/layout/BaseLayout';
import { placeholderStyles as styles } from '../../src/styles/placeholderStyles';

export default function WorkScreen() {
  return (
    <BaseLayout title="Công việc">
      <View style={styles.placeholder}>
        <Text style={styles.text}>Công việc</Text>
        <Text style={styles.subText}>Nội dung sẽ được cập nhật sau</Text>
      </View>
    </BaseLayout>
  );
}
