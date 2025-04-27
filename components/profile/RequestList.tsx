import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { RequestItem, RequestCard } from '@/components/home/RequestCard';
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';

interface RequestListProps {
  title: string;
  requests: RequestItem[];
  onRequestPress: (item: RequestItem) => void;
  onMakeOfferPress: (item: RequestItem) => void;
  onFavoritePress: (item: RequestItem) => void;
  emptyStateMessage?: string;
}

export function RequestList({
  title,
  requests,
  onRequestPress,
  onMakeOfferPress,
  onFavoritePress,
  emptyStateMessage = 'No requests found',
}: RequestListProps) {
  const renderItem = ({ item }: { item: RequestItem }) => (
    <RequestCard
      item={item}
      onPress={() => onRequestPress(item)}
      onFavoritePress={() => onFavoritePress(item)}
    />
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyStateText}>{emptyStateMessage}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={requests}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyState}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: Colors.accent.dark,
    marginBottom: Layout.spacing.md,
    paddingHorizontal: Layout.spacing.lg,
  },
  listContent: {
    padding: Layout.spacing.lg,
    paddingTop: 0,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: Layout.spacing.xl,
  },
  emptyStateText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.accent.light,
    textAlign: 'center',
  },
});