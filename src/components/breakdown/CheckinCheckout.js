import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  ActivityIndicator,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import * as _unitOfWork from "../../api";
import { breakdownUserStatus } from "../../utils/constant";
import { parseDateHH } from "../../helper/date-helper";
import { BRAND_COLOR } from "../../constants/colors";

export default function CheckinCheckout({
  getBreakdownAssignUserByBreakdownId,
  lastCheckInCheckOut,
  lastCheckInCheckOutByUser,
  breakdownAssignUser,
  onCallBack,
}) {
  const [checkinModalVisible, setCheckinModalVisible] = useState(false);
  const [checkoutModalVisible, setCheckoutModalVisible] = useState(false);
  const [estimatedDate, setEstimatedDate] = useState("");
  const [checkOutComment, setCheckOutComment] = useState("");
  const [loading, setLoading] = useState(false);

  /** Returns true when another check-in is active and prevents a new one */
  const disabledLogin = () => {
    return !!(lastCheckInCheckOut && !lastCheckInCheckOut.logOutAt);
  };

  /**
   * Returns true if the current user is checked in somewhere ELSE
   * (different breakdownAssignUser than the current one).
   */
  const showAnother = () => {
    if (!lastCheckInCheckOutByUser) return false;
    if (lastCheckInCheckOutByUser.logOutAt) return false;
    const currentId =
      breakdownAssignUser?._id || breakdownAssignUser?.id;
    const activeId =
      lastCheckInCheckOutByUser?.breakdownAssignUser?._id ||
      lastCheckInCheckOutByUser?.breakdownAssignUser?.id;
    return activeId && currentId && activeId !== currentId;
  };

  /** Show check-in / check-out button only for relevant statuses and when not locked out */
  const showButtonCheckin = () => {
    const status = breakdownAssignUser?.status;
    const allowedStatuses = [
      breakdownUserStatus.accepted,
      breakdownUserStatus.inProgress,
      breakdownUserStatus.submitted,
      breakdownUserStatus.approved,
    ];
    return allowedStatuses.includes(status) && !showAnother();
  };

  const isCheckedIn = () => {
    return !!(lastCheckInCheckOut && !lastCheckInCheckOut.logOutAt);
  };

  /* ── Check-in ── */
  const handleCheckin = async () => {
    if (!estimatedDate.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập ngày dự kiến hoàn thành.");
      return;
    }
    try {
      setLoading(true);
      const id = breakdownAssignUser?._id || breakdownAssignUser?.id;
      const res = await _unitOfWork.breakdownAssignUser.checkinBreakdown(id, {
        estimatedCompletionDate: estimatedDate,
      });
      if (res && res.code === 1) {
        setEstimatedDate("");
        setCheckinModalVisible(false);
        getBreakdownAssignUserByBreakdownId?.();
        onCallBack?.();
      } else {
        Alert.alert("Thông báo", res?.message || "Có lỗi xảy ra.");
      }
    } catch (_) {
      Alert.alert("Lỗi", "Không thể thực hiện check-in.");
    } finally {
      setLoading(false);
    }
  };

  /* ── Check-out ── */
  const handleCheckout = async () => {
    try {
      setLoading(true);
      const id = breakdownAssignUser?._id || breakdownAssignUser?.id;
      const res = await _unitOfWork.breakdownAssignUser.checkoutBreakdown(id, {
        checkOutComments: checkOutComment,
      });
      if (res && res.code === 1) {
        setCheckOutComment("");
        setCheckoutModalVisible(false);
        getBreakdownAssignUserByBreakdownId?.();
        onCallBack?.();
      } else {
        Alert.alert("Thông báo", res?.message || "Có lỗi xảy ra.");
      }
    } catch (_) {
      Alert.alert("Lỗi", "Không thể thực hiện check-out.");
    } finally {
      setLoading(false);
    }
  };

  if (!showButtonCheckin()) {
    if (showAnother()) {
      return (
        <View style={styles.anotherBox}>
          <Text style={styles.anotherText}>
            Bạn đang check-in tại một phiếu khác.
          </Text>
        </View>
      );
    }
    return null;
  }

  return (
    <View>
      {/* ── Action button ── */}
      {isCheckedIn() ? (
        <TouchableOpacity
          style={[styles.btn, styles.btnCheckout]}
          onPress={() => setCheckoutModalVisible(true)}
        >
          <Text style={styles.btnText}>Check-out</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[styles.btn, styles.btnCheckin, disabledLogin() && styles.btnDisabled]}
          onPress={() => !disabledLogin() && setCheckinModalVisible(true)}
          disabled={disabledLogin()}
        >
          <Text style={styles.btnText}>Check-in</Text>
        </TouchableOpacity>
      )}

      {/* Last check-in info */}
      {lastCheckInCheckOut && (
        <View style={styles.infoBox}>
          <Text style={styles.infoLabel}>Check-in lúc:</Text>
          <Text style={styles.infoValue}>
            {parseDateHH(lastCheckInCheckOut.logInAt || lastCheckInCheckOut.createdAt)}
          </Text>
          {lastCheckInCheckOut.logOutAt && (
            <>
              <Text style={styles.infoLabel}>Check-out lúc:</Text>
              <Text style={styles.infoValue}>
                {parseDateHH(lastCheckInCheckOut.logOutAt)}
              </Text>
            </>
          )}
        </View>
      )}

      {/* ── Check-in Modal ── */}
      <Modal
        visible={checkinModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setCheckinModalVisible(false)}
      >
        <KeyboardAvoidingView
          style={styles.overlay}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Check-in</Text>
            </View>
            <View style={styles.modalBody}>
              <Text style={styles.fieldLabel}>
                Ngày dự kiến hoàn thành <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                placeholder="DD/MM/YYYY HH:mm"
                placeholderTextColor="#aaa"
                value={estimatedDate}
                onChangeText={setEstimatedDate}
              />
            </View>
            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={[styles.footerBtn, styles.footerBtnCancel]}
                onPress={() => {
                  setEstimatedDate("");
                  setCheckinModalVisible(false);
                }}
                disabled={loading}
              >
                <Text style={styles.footerBtnCancelText}>Huỷ</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.footerBtn, styles.footerBtnSubmit]}
                onPress={handleCheckin}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" size="small" />
                ) : (
                  <Text style={styles.footerBtnSubmitText}>Xác nhận</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* ── Check-out Modal ── */}
      <Modal
        visible={checkoutModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setCheckoutModalVisible(false)}
      >
        <KeyboardAvoidingView
          style={styles.overlay}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Check-out</Text>
            </View>
            <View style={styles.modalBody}>
              <Text style={styles.fieldLabel}>Ghi chú check-out</Text>
              <TextInput
                style={[styles.input, styles.textarea]}
                placeholder="Nhập ghi chú (tuỳ chọn)..."
                placeholderTextColor="#aaa"
                value={checkOutComment}
                onChangeText={setCheckOutComment}
                multiline
                numberOfLines={4}
                maxLength={500}
                textAlignVertical="top"
              />
            </View>
            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={[styles.footerBtn, styles.footerBtnCancel]}
                onPress={() => {
                  setCheckOutComment("");
                  setCheckoutModalVisible(false);
                }}
                disabled={loading}
              >
                <Text style={styles.footerBtnCancelText}>Huỷ</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.footerBtn, styles.footerBtnSubmit]}
                onPress={handleCheckout}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" size="small" />
                ) : (
                  <Text style={styles.footerBtnSubmitText}>Xác nhận</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
    marginVertical: 4,
  },
  btnCheckin: {
    backgroundColor: BRAND_COLOR,
  },
  btnCheckout: {
    backgroundColor: "#e53935",
  },
  btnDisabled: {
    backgroundColor: "#b0bec5",
  },
  btnText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  infoBox: {
    marginTop: 8,
    backgroundColor: "#f0f4f8",
    borderRadius: 6,
    padding: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
  },
  infoLabel: {
    fontSize: 12,
    color: "#666",
    marginRight: 4,
  },
  infoValue: {
    fontSize: 12,
    color: "#333",
    fontWeight: "600",
    marginRight: 12,
  },
  anotherBox: {
    backgroundColor: "#fff3e0",
    borderRadius: 6,
    padding: 10,
    marginVertical: 4,
  },
  anotherText: {
    color: "#e65100",
    fontSize: 13,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    width: "100%",
    maxWidth: 480,
    overflow: "hidden",
  },
  modalHeader: {
    backgroundColor: BRAND_COLOR,
    paddingVertical: 14,
    paddingHorizontal: 18,
  },
  modalTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  modalBody: {
    padding: 18,
  },
  fieldLabel: {
    fontSize: 14,
    color: "#333",
    marginBottom: 8,
    fontWeight: "500",
  },
  required: {
    color: "#e53935",
  },
  input: {
    borderWidth: 1,
    borderColor: "#d9d9d9",
    borderRadius: 6,
    padding: 10,
    fontSize: 14,
    color: "#333",
    backgroundColor: "#fafafa",
  },
  textarea: {
    minHeight: 90,
    textAlignVertical: "top",
  },
  modalFooter: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 14,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    gap: 10,
  },
  footerBtn: {
    paddingVertical: 9,
    paddingHorizontal: 20,
    borderRadius: 6,
    minWidth: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  footerBtnCancel: {
    borderWidth: 1,
    borderColor: "#d9d9d9",
    backgroundColor: "#fff",
  },
  footerBtnCancelText: {
    color: "#555",
    fontSize: 14,
  },
  footerBtnSubmit: {
    backgroundColor: BRAND_COLOR,
  },
  footerBtnSubmitText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});
