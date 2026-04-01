import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as _unitOfWork from "../../api";
import { parseDateHH, parseDate } from "../../helper/date-helper";
import { BRAND_COLOR } from "../../constants/colors";
import { PAGINATION, STORAGE_KEY } from "../../utils/constant";

export default function BreakdownComment({ visible, onClose, dataBreakdown }) {
  const [comments, setComments] = useState([]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [breakdownInfo, setBreakdownInfo] = useState(null);
  const [page, setPage] = useState(PAGINATION.page);
  const [hasMore, setHasMore] = useState(true);
  const scrollRef = useRef(null);
  const intervalRef = useRef(null);

  const breakdownId = dataBreakdown?._id || dataBreakdown?.id;

  const loadUser = useCallback(async () => {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY.USER);
      if (raw) setCurrentUser(JSON.parse(raw));
    } catch (_) {}
  }, []);

  const loadBreakdownInfo = useCallback(async () => {
    if (!breakdownId) return;
    try {
      const res = await _unitOfWork.breakdown.getBreakdownById({ id: breakdownId });
      if (res && res.data) setBreakdownInfo(res.data);
    } catch (_) {}
  }, [breakdownId]);

  const loadComments = useCallback(
    async (pageNum = 1, append = false) => {
      if (!breakdownId) return;
      try {
        if (!append) setLoading(true);
        const res = await _unitOfWork.breakdown.getBreakdownComments({
          page: pageNum,
          limit: 7,
          breakdown: breakdownId,
        });
        if (res && res.data) {
          const fetched = res.data.data || res.data || [];
          if (append) {
            setComments((prev) => [...fetched, ...prev]);
          } else {
            setComments(fetched);
            setTimeout(() => scrollRef.current?.scrollToEnd({ animated: false }), 100);
          }
          if (fetched.length < 7) setHasMore(false);
        }
      } catch (_) {
      } finally {
        setLoading(false);
      }
    },
    [breakdownId]
  );

  useEffect(() => {
    if (visible && breakdownId) {
      loadUser();
      loadBreakdownInfo();
      setPage(1);
      setHasMore(true);
      loadComments(1, false);

      intervalRef.current = setInterval(() => {
        loadComments(1, false);
      }, 20000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, breakdownId]);

  const handleLoadMore = () => {
    if (!hasMore || loading) return;
    const nextPage = page + 1;
    setPage(nextPage);
    loadComments(nextPage, true);
  };

  const handleSend = async () => {
    if (!inputText.trim()) return;
    try {
      setSending(true);
      const res = await _unitOfWork.breakdown.createBreakdownComment({
        breakdown: breakdownId,
        comments: inputText.trim(),
      });
      if (res && res.code === 1) {
        setInputText("");
        await loadComments(1, false);
        setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 150);
      } else {
        Alert.alert("Thông báo", res?.message || "Không thể gửi nhận xét.");
      }
    } catch (_) {
      Alert.alert("Lỗi", "Không thể gửi nhận xét.");
    } finally {
      setSending(false);
    }
  };

  const isOwnMessage = (comment) => {
    const userId = currentUser?._id || currentUser?.id;
    const authorId = comment?.user?._id || comment?.user?.id || comment?.createdBy?._id || comment?.createdBy?.id;
    return userId && authorId && userId === authorId;
  };

  const getAuthorName = (comment) => {
    return (
      comment?.user?.fullName ||
      comment?.user?.name ||
      comment?.createdBy?.fullName ||
      comment?.createdBy?.name ||
      "Người dùng"
    );
  };

  const getAuthorInitial = (comment) => {
    const name = getAuthorName(comment);
    return name.charAt(0).toUpperCase();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <SafeAreaView style={styles.safeArea}>
        <StatusBar backgroundColor={BRAND_COLOR} barStyle="light-content" />

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Nhận xét</Text>
          <View style={{ width: 32 }} />
        </View>

        {/* Breakdown info */}
        {breakdownInfo && (
          <View style={styles.infoRow}>
            <Text style={styles.infoCode} numberOfLines={1}>
              {breakdownInfo.code || breakdownInfo.title || "—"}
            </Text>
            <Text style={styles.infoDate}>
              {parseDate(breakdownInfo.createdAt || breakdownInfo.date)}
            </Text>
          </View>
        )}

        {/* Load more */}
        {hasMore && (
          <TouchableOpacity style={styles.loadMoreBtn} onPress={handleLoadMore} disabled={loading}>
            {loading ? (
              <ActivityIndicator size="small" color={BRAND_COLOR} />
            ) : (
              <Text style={styles.loadMoreText}>Tải thêm</Text>
            )}
          </TouchableOpacity>
        )}

        {/* Chat messages */}
        <ScrollView
          ref={scrollRef}
          style={styles.chatArea}
          contentContainerStyle={styles.chatContent}
          keyboardShouldPersistTaps="handled"
        >
          {loading && comments.length === 0 ? (
            <ActivityIndicator size="large" color={BRAND_COLOR} style={{ marginTop: 40 }} />
          ) : comments.length === 0 ? (
            <Text style={styles.emptyText}>Chưa có nhận xét nào.</Text>
          ) : (
            comments.map((item, index) => {
              const own = isOwnMessage(item);
              return (
                <View
                  key={item._id || item.id || index}
                  style={[styles.messageRow, own ? styles.messageRowRight : styles.messageRowLeft]}
                >
                  {!own && (
                    <View style={styles.avatar}>
                      <Text style={styles.avatarText}>{getAuthorInitial(item)}</Text>
                    </View>
                  )}
                  <View style={[styles.bubble, own ? styles.bubbleOwn : styles.bubbleOther]}>
                    {!own && (
                      <Text style={styles.authorName}>{getAuthorName(item)}</Text>
                    )}
                    <Text style={[styles.messageText, own && styles.messageTextOwn]}>
                      {item.comments || item.content || item.message || ""}
                    </Text>
                    <Text style={[styles.messageTime, own && styles.messageTimeOwn]}>
                      {parseDateHH(item.createdAt || item.date)}
                    </Text>
                  </View>
                  {own && (
                    <View style={[styles.avatar, styles.avatarOwn]}>
                      <Text style={styles.avatarText}>{getAuthorInitial(item)}</Text>
                    </View>
                  )}
                </View>
              );
            })
          )}
        </ScrollView>

        {/* Input area */}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
        >
          <View style={styles.inputRow}>
            <TextInput
              style={styles.textInput}
              placeholder="Nhập nhận xét..."
              placeholderTextColor="#aaa"
              value={inputText}
              onChangeText={setInputText}
              multiline
              maxLength={500}
              textAlignVertical="top"
            />
            <TouchableOpacity
              style={[styles.sendBtn, (!inputText.trim() || sending) && styles.sendBtnDisabled]}
              onPress={handleSend}
              disabled={!inputText.trim() || sending}
            >
              {sending ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text style={styles.sendBtnText}>Gửi</Text>
              )}
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: BRAND_COLOR,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backArrow: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },
  infoRow: {
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e8e8e8",
  },
  infoCode: {
    fontSize: 13,
    color: BRAND_COLOR,
    fontWeight: "600",
    flex: 1,
    marginRight: 8,
  },
  infoDate: {
    fontSize: 12,
    color: "#888",
  },
  loadMoreBtn: {
    alignItems: "center",
    paddingVertical: 8,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e8e8e8",
  },
  loadMoreText: {
    color: BRAND_COLOR,
    fontSize: 13,
  },
  chatArea: {
    flex: 1,
  },
  chatContent: {
    padding: 12,
    paddingBottom: 8,
  },
  emptyText: {
    textAlign: "center",
    color: "#aaa",
    marginTop: 40,
    fontSize: 14,
  },
  messageRow: {
    flexDirection: "row",
    marginBottom: 12,
    alignItems: "flex-end",
  },
  messageRowLeft: {
    justifyContent: "flex-start",
  },
  messageRowRight: {
    justifyContent: "flex-end",
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#bbb",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  avatarOwn: {
    backgroundColor: BRAND_COLOR,
    marginRight: 0,
    marginLeft: 8,
  },
  avatarText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 13,
  },
  bubble: {
    maxWidth: "70%",
    borderRadius: 12,
    padding: 10,
  },
  bubbleOther: {
    backgroundColor: "#fff",
    borderBottomLeftRadius: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  bubbleOwn: {
    backgroundColor: BRAND_COLOR,
    borderBottomRightRadius: 2,
  },
  authorName: {
    fontSize: 11,
    color: "#888",
    marginBottom: 3,
    fontWeight: "600",
  },
  messageText: {
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
  },
  messageTextOwn: {
    color: "#fff",
  },
  messageTime: {
    fontSize: 10,
    color: "#aaa",
    marginTop: 4,
    textAlign: "right",
  },
  messageTimeOwn: {
    color: "rgba(255,255,255,0.7)",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e8e8e8",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#d9d9d9",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    fontSize: 14,
    color: "#333",
    maxHeight: 100,
    backgroundColor: "#fafafa",
  },
  sendBtn: {
    backgroundColor: BRAND_COLOR,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 9,
    marginLeft: 8,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 56,
  },
  sendBtnDisabled: {
    backgroundColor: "#b0bec5",
  },
  sendBtnText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});
