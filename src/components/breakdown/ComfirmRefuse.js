import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import * as _unitOfWork from "../../api";
import { BRAND_COLOR } from "../../constants/colors";

export default function ComfirmRefuse({ open, onCancel, refuseBreakAssignUser }) {
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!reason.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập lý do từ chối.");
      return;
    }
    try {
      setLoading(true);
      const res = await _unitOfWork.breakdownAssignUser.comfirmRefuseBreakdownAssignUser({
        data: {
          id: refuseBreakAssignUser?.id,
          status: refuseBreakAssignUser?.status,
        },
      });
      if (res && res.code === 1) {
        setReason("");
        onCancel();
      } else {
        Alert.alert("Thông báo", res?.message || "Có lỗi xảy ra.");
      }
    } catch (_e) {
      Alert.alert("Lỗi", "Không thể thực hiện yêu cầu.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setReason("");
    onCancel();
  };

  return (
    <Modal
      visible={open}
      transparent
      animationType="fade"
      onRequestClose={handleCancel}
    >
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Từ chối phân công</Text>
          </View>

          <View style={styles.body}>
            <Text style={styles.label}>
              Lý do từ chối <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={styles.textarea}
              multiline
              numberOfLines={4}
              placeholder="Nhập lý do từ chối..."
              placeholderTextColor="#aaa"
              value={reason}
              onChangeText={setReason}
              maxLength={500}
              textAlignVertical="top"
            />
          </View>

          <View style={styles.footer}>
            <TouchableOpacity
              style={[styles.btn, styles.btnCancel]}
              onPress={handleCancel}
              disabled={loading}
            >
              <Text style={styles.btnCancelText}>Huỷ</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btn, styles.btnSubmit]}
              onPress={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text style={styles.btnSubmitText}>Xác nhận</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  container: {
    backgroundColor: "#fff",
    borderRadius: 10,
    width: "100%",
    maxWidth: 480,
    overflow: "hidden",
  },
  header: {
    backgroundColor: BRAND_COLOR,
    paddingVertical: 14,
    paddingHorizontal: 18,
  },
  title: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  body: {
    padding: 18,
  },
  label: {
    fontSize: 14,
    color: "#333",
    marginBottom: 8,
    fontWeight: "500",
  },
  required: {
    color: "#e53935",
  },
  textarea: {
    borderWidth: 1,
    borderColor: "#d9d9d9",
    borderRadius: 6,
    padding: 10,
    fontSize: 14,
    color: "#333",
    minHeight: 100,
    backgroundColor: "#fafafa",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 14,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    gap: 10,
  },
  btn: {
    paddingVertical: 9,
    paddingHorizontal: 20,
    borderRadius: 6,
    minWidth: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  btnCancel: {
    borderWidth: 1,
    borderColor: "#d9d9d9",
    backgroundColor: "#fff",
  },
  btnCancelText: {
    color: "#555",
    fontSize: 14,
  },
  btnSubmit: {
    backgroundColor: BRAND_COLOR,
  },
  btnSubmitText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});
