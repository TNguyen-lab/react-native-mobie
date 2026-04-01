import React, { useState, useRef } from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from 'react-native';
import { Tabs, useRouter } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { BRAND_COLOR } from '../../src/constants/colors';

const TAB_BAR_BG = BRAND_COLOR;
const ACTIVE_COLOR = '#ffffff';
const INACTIVE_COLOR = 'rgba(255, 255, 255, 0.5)';

const DRAWER_ITEMS = [
  { icon: 'inventory', label: 'Tài sản', route: '/more/asset' },
  { icon: 'build-circle', label: 'Hiệu chuẩn của tôi', route: '/more/calibration' },
  { icon: 'settings', label: 'Cài đặt', route: '/more/settings' },
  { icon: 'contact-phone', label: 'Liên hệ', route: '/more/contact' },
];

function AddTabButton({ onPress }) {
  return (
    <Pressable
      style={styles.addButton}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel="Tạo phiếu hỗ trợ kỹ thuật">
      <View style={styles.addInner}>
        <MaterialIcons name="add" size={30} color="#fff" />
      </View>
    </Pressable>
  );
}

function MoreTabButton({ style, onPress }) {
  return (
    <TouchableOpacity
      style={[style, styles.moreTabButton]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel="Thêm">
      <MaterialIcons name="more-horiz" size={24} color={INACTIVE_COLOR} />
      <Text style={styles.moreTabLabel}>Thêm</Text>
    </TouchableOpacity>
  );
}

export default function TabLayout() {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(400)).current;
  const router = useRouter();

  const openDrawer = () => {
    setDrawerVisible(true);
    Animated.spring(slideAnim, {
      toValue: 0,
      useNativeDriver: true,
      bounciness: 4,
    }).start();
  };

  const closeDrawer = () => {
    Animated.timing(slideAnim, {
      toValue: 400,
      duration: 220,
      useNativeDriver: true,
    }).start(() => setDrawerVisible(false));
  };

  const handleDrawerItem = (route) => {
    Animated.timing(slideAnim, {
      toValue: 400,
      duration: 220,
      useNativeDriver: true,
    }).start(() => {
      setDrawerVisible(false);
      router.push(route);
    });
  };

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: TAB_BAR_BG,
            borderTopWidth: 0,
            height: 72,
            paddingBottom: 8,
          },
          tabBarActiveTintColor: ACTIVE_COLOR,
          tabBarInactiveTintColor: INACTIVE_COLOR,
          tabBarLabelStyle: {
            fontSize: 11,
            marginBottom: 8,
          },
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Bảng điều khiển',
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="bar-chart" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="ticket"
          options={{
            title: 'Sự cố',
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="assignment" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="create"
          options={{
            title: '',
            tabBarIcon: () => null,
            tabBarButton: (props) => <AddTabButton onPress={props.onPress} />,
          }}
        />
        <Tabs.Screen
          name="work"
          options={{
            title: 'Công việc',
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="work" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="more"
          options={{
            title: 'Thêm',
            tabBarButton: (props) => (
              <MoreTabButton style={props.style} onPress={openDrawer} />
            ),
          }}
        />
      </Tabs>

      {/* Bottom Sheet Drawer */}
      <Modal
        visible={drawerVisible}
        transparent
        animationType="none"
        onRequestClose={closeDrawer}>
        <View style={styles.overlay}>
          {/* Backdrop – tap outside to close */}
          <Pressable style={StyleSheet.absoluteFill} onPress={closeDrawer} />

          {/* Drawer panel slides up from bottom */}
          <Animated.View
            style={[styles.drawer, { transform: [{ translateY: slideAnim }] }]}>
            {/* Handle bar */}
            <View style={styles.handleBar} />

            <Text style={styles.drawerTitle}>Thêm</Text>

            {DRAWER_ITEMS.map((item) => (
              <TouchableOpacity
                key={item.route}
                style={styles.drawerItem}
                activeOpacity={0.7}
                onPress={() => handleDrawerItem(item.route)}>
                <View style={styles.drawerIconWrap}>
                  <MaterialIcons name={item.icon} size={24} color={BRAND_COLOR} />
                </View>
                <Text style={styles.drawerItemLabel}>{item.label}</Text>
                <MaterialIcons name="chevron-right" size={22} color="#ccc" />
              </TouchableOpacity>
            ))}
          </Animated.View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  // Add tab (centre +) button
  addButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addInner: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#e74c3c',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },

  // More tab button
  moreTabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  moreTabLabel: {
    fontSize: 11,
    color: INACTIVE_COLOR,
    marginBottom: 8,
  },

  // Modal overlay
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.45)',
  },

  // Drawer panel
  drawer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
    paddingBottom: 32,
    elevation: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  handleBar: {
    width: 40,
    height: 4,
    backgroundColor: '#ddd',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 4,
  },
  drawerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#eee',
  },

  // Drawer item row
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#f0f0f0',
  },
  drawerIconWrap: {
    width: 40,
    alignItems: 'center',
  },
  drawerItemLabel: {
    flex: 1,
    fontSize: 15,
    color: '#333',
    marginLeft: 10,
  },
});
