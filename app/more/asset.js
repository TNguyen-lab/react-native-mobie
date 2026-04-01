import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import * as _unitOfWork from '../../src/api';
import BaseLayout from '../../src/components/layout/BaseLayout';
import { BRAND_COLOR } from '../../src/constants/colors';

const LIMIT = 20;

const ASSET_STATUS_COLOR = {
  isActive: '#52c41a',
  isNotActive: '#ff4d4f',
  underMaintenance: '#fa8c16',
};

const ASSET_STATUS_LABEL = {
  isActive: 'Đang hoạt động',
  isNotActive: 'Không hoạt động',
  underMaintenance: 'Đang bảo trì',
};

export default function AssetScreen() {
  const router = useRouter();

  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalRecord, setTotalRecord] = useState(0);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const isLoadingMore = useRef(false);
  const searchTimeout = useRef(null);

  const fetchItems = useCallback(
    async (_page = 1, reset = true, searchText = search) => {
      if (loading && !reset) return;
      try {
        if (reset) setLoading(true);
        const payload = { page: _page, limit: LIMIT };
        if (searchText) payload.search = searchText;

        const res = await _unitOfWork.assetMaintenance.getListAssetMaintenances(payload);
        if (res?.data) {
          if (reset) {
            setItems(res.data);
          } else {
            setItems((prev) => [...prev, ...res.data]);
          }
          setTotalRecord(res.totalResults ?? 0);
        }
      } catch (e) {
        console.error('AssetScreen fetchItems error', e);
      } finally {
        if (reset) setLoading(false);
        isLoadingMore.current = false;
      }
    },
    [search], // eslint-disable-line react-hooks/exhaustive-deps
  );

  useEffect(() => {
    setPage(1);
    fetchItems(1, true);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSearchChange = useCallback(
    (text) => {
      setSearch(text);
      if (searchTimeout.current) clearTimeout(searchTimeout.current);
      searchTimeout.current = setTimeout(() => {
        setPage(1);
        fetchItems(1, true, text);
      }, 400);
    },
    [fetchItems],
  );

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    setPage(1);
    await fetchItems(1, true, search);
    setRefreshing(false);
  }, [fetchItems, search]);

  const handleLoadMore = useCallback(() => {
    if (isLoadingMore.current) return;
    if (items.length >= totalRecord) return;
    const nextPage = page + 1;
    isLoadingMore.current = true;
    setPage(nextPage);
    fetchItems(nextPage, false, search);
  }, [items.length, totalRecord, page, fetchItems, search]);

  const renderCard = ({ item }) => {
    const statusColor = ASSET_STATUS_COLOR[item.status] ?? '#8c8c8c';
    const statusLabel = ASSET_STATUS_LABEL[item.status] ?? item.status ?? '';

    return (
      <View style={styles.card}>
        <View style={styles.cardRow}>
          <MaterialIcons name="devices" size={16} color={BRAND_COLOR} style={styles.cardIcon} />
          <Text style={styles.cardTitle} numberOfLines={1}>
            {item.assetModel?.asset?.assetName ?? item.assetModel?.assetModelName ?? '—'}
          </Text>
        </View>

        {item.assetModel?.assetModelName ? (
          <View style={styles.cardRow}>
            <MaterialIcons name="category" size={14} color="#888" style={styles.cardIcon} />
            <Text style={styles.cardSub} numberOfLines={1}>{item.assetModel.assetModelName}</Text>
          </View>
        ) : null}

        {(item.assetNumber || item.serial) ? (
          <View style={styles.cardRow}>
            <MaterialIcons name="pin" size={14} color="#888" style={styles.cardIcon} />
            <Text style={styles.cardMeta} numberOfLines={1}>
              {[item.assetNumber && `Mã: ${item.assetNumber}`, item.serial && `S/N: ${item.serial}`]
                .filter(Boolean)
                .join('  |  ')}
            </Text>
          </View>
        ) : null}

        {item.customer?.customerName ? (
          <View style={styles.cardRow}>
            <MaterialIcons name="business" size={14} color="#888" style={styles.cardIcon} />
            <Text style={styles.cardMeta} numberOfLines={1}>
              <Text style={styles.metaLabel}>KH: </Text>
              {item.customer.customerName}
            </Text>
          </View>
        ) : null}

        {statusLabel ? (
          <View style={styles.badgeRow}>
            <View style={[styles.badge, { backgroundColor: statusColor + '22' }]}>
              <Text style={[styles.badgeText, { color: statusColor }]}>{statusLabel}</Text>
            </View>
          </View>
        ) : null}
      </View>
    );
  };

  return (
    <BaseLayout title="Tài sản" showBack onBack={() => router.back()}>
      <View style={styles.searchWrapper}>
        <MaterialIcons name="search" size={20} color="#aaa" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm tài sản..."
          placeholderTextColor="#aaa"
          value={search}
          onChangeText={handleSearchChange}
          returnKeyType="search"
          clearButtonMode="while-editing"
        />
      </View>

      {loading && items.length === 0 ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={BRAND_COLOR} />
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id?.toString()}
          renderItem={renderCard}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} colors={[BRAND_COLOR]} />
          }
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.3}
          ListEmptyComponent={
            <View style={styles.center}>
              <Text style={styles.emptyText}>Không có dữ liệu</Text>
            </View>
          }
          ListFooterComponent={
            !loading && items.length > 0 && items.length < totalRecord ? (
              <ActivityIndicator size="small" color={BRAND_COLOR} style={{ marginVertical: 12 }} />
            ) : null
          }
        />
      )}
    </BaseLayout>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 40 },
  emptyText: { color: '#999', fontSize: 14 },

  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 8,
    paddingHorizontal: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },
  searchIcon: { marginRight: 6 },
  searchInput: { flex: 1, height: 40, fontSize: 14, color: '#333' },

  listContent: { paddingHorizontal: 10, paddingBottom: 24 },

  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  cardRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4, flexWrap: 'wrap' },
  cardIcon: { marginRight: 4 },
  cardTitle: { fontSize: 15, fontWeight: '700', color: '#222', flex: 1 },
  cardSub: { fontSize: 12, color: '#888', flex: 1 },
  cardMeta: { fontSize: 12, color: '#555', flexShrink: 1 },
  metaLabel: { fontWeight: '600', color: '#444' },

  badgeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 6 },
  badge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10 },
  badgeText: { fontSize: 12, fontWeight: '600' },
});
