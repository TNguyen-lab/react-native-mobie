import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import useAuth from "../src/contexts/authContext";
import * as _unitOfWork from "../src/api";
import { BRAND_COLOR } from "../src/constants/colors";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const onLogin = async () => {
    if (!username.trim()) {
      Alert.alert("Thông báo", "Tên đăng nhập không được để trống!");
      return;
    }
    if (!password.trim()) {
      Alert.alert("Thông báo", "Mật khẩu không được để trống!");
      return;
    }
    setLoading(true);
    try {
      const res = await _unitOfWork.login({ username: username.trim(), password });
      if (res && res.tokens) {
        await login(res);
      } else {
        Alert.alert(
          "Đăng nhập thất bại",
          res?.message || "Tên đăng nhập hoặc mật khẩu không đúng!",
        );
      }
    } catch (err) {
      Alert.alert("Lỗi", "Có lỗi xảy ra, vui lòng thử lại sau!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor={BRAND_COLOR} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header / Logo area */}
          <View style={styles.headerArea}>
            <View style={styles.logoCircle}>
              <MaterialIcons name="medical-services" size={48} color="#fff" />
            </View>
            <Text style={styles.appName}>Mobie</Text>
            <Text style={styles.appSubtitle}>Hệ thống quản lý bảo trì tài sản</Text>
          </View>

          {/* Login Card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>ĐĂNG NHẬP HỆ THỐNG</Text>

            {/* Username */}
            <View style={styles.inputWrapper}>
              <MaterialIcons name="person" size={20} color="#999" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Tên đăng nhập"
                placeholderTextColor="#bbb"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
              />
            </View>

            {/* Password */}
            <View style={styles.inputWrapper}>
              <MaterialIcons name="lock" size={20} color="#999" style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="Mật khẩu"
                placeholderTextColor="#bbb"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                returnKeyType="done"
                onSubmitEditing={onLogin}
              />
              <TouchableOpacity onPress={() => setShowPassword((v) => !v)} style={styles.eyeBtn}>
                <MaterialIcons
                  name={showPassword ? "visibility" : "visibility-off"}
                  size={20}
                  color="#999"
                />
              </TouchableOpacity>
            </View>

            {/* Login Button */}
            <TouchableOpacity
              style={[styles.loginBtn, loading && styles.loginBtnDisabled]}
              onPress={onLogin}
              disabled={loading}
              activeOpacity={0.8}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.loginBtnText}>Đăng nhập</Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Hotline: 0949 854 758</Text>
            <Text style={styles.footerText}>
              © {new Date().getFullYear()} MTC. All rights reserved.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BRAND_COLOR,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  headerArea: {
    alignItems: "center",
    marginBottom: 32,
  },
  logoCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  appName: {
    fontSize: 32,
    fontWeight: "700",
    color: "#fff",
    letterSpacing: 2,
  },
  appSubtitle: {
    fontSize: 13,
    color: "rgba(255,255,255,0.75)",
    marginTop: 4,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: BRAND_COLOR,
    textAlign: "center",
    marginBottom: 24,
    letterSpacing: 0.5,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 16,
    backgroundColor: "#fafafa",
    height: 52,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: "#333",
  },
  eyeBtn: {
    padding: 4,
  },
  loginBtn: {
    backgroundColor: BRAND_COLOR,
    borderRadius: 10,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    elevation: 2,
    shadowColor: BRAND_COLOR,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  loginBtnDisabled: {
    opacity: 0.7,
  },
  loginBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  footer: {
    alignItems: "center",
    marginTop: 32,
    gap: 4,
  },
  footerText: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 13,
  },
});
