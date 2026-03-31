import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { BRAND_COLOR } from '../../constants/colors';

/**
 * BaseLayout mirrors the web app's layout shell:
 * - Header bar: left icons | title (right-aligned) | optional action icon
 * - Flexible content area
 * Bottom navigation is handled by the Expo Router tab layout.
 */
export default function BaseLayout({ children, title, showBack = false, onBack }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={BRAND_COLOR} barStyle="light-content" />
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          {showBack ? (
            <TouchableOpacity onPress={onBack} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <MaterialIcons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
          ) : (
            <MaterialIcons name="menu" size={24} color="#fff" />
          )}
        </View>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {title || 'Mobie'}
        </Text>
        <View style={styles.headerRight}>
          <MaterialIcons name="notifications-none" size={24} color="#fff" />
        </View>
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
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerLeft: {
    width: 36,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'right',
    paddingRight: 8,
  },
  headerRight: {
    width: 36,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
});
