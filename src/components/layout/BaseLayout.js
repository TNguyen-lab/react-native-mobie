import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, StatusBar } from 'react-native';
import { BRAND_COLOR } from '../../constants/colors';

/**
 * BaseLayout mirrors the web app's layout shell:
 * - Header bar at the top
 * - Flexible content area
 * Bottom navigation is handled by the Expo Router tab layout.
 */
export default function BaseLayout({ children, title }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={BRAND_COLOR} barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{title || 'Mobie'}</Text>
      </View>
      <View style={styles.content}>{children}</View>
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
    justifyContent: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
});
