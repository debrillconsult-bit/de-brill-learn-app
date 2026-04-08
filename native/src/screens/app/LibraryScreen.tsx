import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { DiagonalHeader } from '../../components/DiagonalHeader';
import { BOOKS, PHONICS_BOOKS, MEP_BOOKS, Book } from '../../constants/books';
import { Colors, Typography, Spacing, Radius, Shadow } from '../../constants/theme';

const FILTERS = ['ALL', 'PHONICS', 'MEP'] as const;
type Filter = typeof FILTERS[number];

const BookCard = ({ book, onPress }: { book: Book; onPress: () => void }) => (
  <TouchableOpacity style={[styles.card, Shadow.sm]} onPress={onPress} activeOpacity={0.85}>
    <View style={[styles.accent, { backgroundColor: book.coverColor }]} />
    <View style={styles.cardBody}>
      <View style={[styles.coverPlaceholder, { backgroundColor: book.coverColor + '33' }]}>
        <Text style={[styles.coverInitials, { color: book.coverColor }]}>
          {book.shortTitle.split(' ').map(w => w[0]).join('').slice(0, 3)}
        </Text>
      </View>
      <Text style={styles.bookTitle} numberOfLines={2}>{book.shortTitle}</Text>
      <Text style={styles.bookAge}>{book.ageRange}</Text>
      <View style={styles.cardFooter}>
        <Text style={styles.unitCount}>{book.unitCount} units</Text>
        <Ionicons name="bookmark-outline" size={16} color={Colors.muted} />
      </View>
    </View>
  </TouchableOpacity>
);

export const LibraryScreen = () => {
  const navigation = useNavigation<any>();
  const [filter, setFilter] = useState<Filter>('ALL');

  const books = filter === 'ALL' ? BOOKS : filter === 'PHONICS' ? PHONICS_BOOKS : MEP_BOOKS;

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <DiagonalHeader title="Book Library" />

      <View style={styles.filterRow}>
        {FILTERS.map(f => (
          <TouchableOpacity key={f} style={styles.filterBtn} onPress={() => setFilter(f)}>
            <Text style={[styles.filterLabel, filter === f && styles.filterLabelActive]}>{f}</Text>
            {filter === f && <View style={styles.filterUnderline} />}
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={books}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.list}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <BookCard
            book={item}
            onPress={() => navigation.navigate('BookDetail', { book: item })}
          />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="library-outline" size={48} color={Colors.border} />
            <Text style={styles.emptyText}>No books in this category</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.offWhite },
  filterRow: { flexDirection: 'row', paddingHorizontal: Spacing.base, borderBottomWidth: 1, borderBottomColor: Colors.border },
  filterBtn: { paddingHorizontal: Spacing.base, paddingVertical: Spacing.sm, alignItems: 'center' },
  filterLabel: { fontSize: Typography.sizes.sm, fontWeight: Typography.weights.bold, color: Colors.muted },
  filterLabelActive: { color: Colors.primary },
  filterUnderline: { height: 2, backgroundColor: Colors.orange, borderRadius: 1, marginTop: 4, width: '100%' },
  list: { padding: Spacing.base },
  row: { justifyContent: 'space-between' },
  card: {
    width: '48%',
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    marginBottom: Spacing.base,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  accent: { width: 6 },
  cardBody: { flex: 1, padding: Spacing.sm },
  coverPlaceholder: {
    height: 70,
    borderRadius: Radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  coverInitials: { fontSize: Typography.sizes.sm, fontWeight: Typography.weights.extrabold },
  bookTitle: { fontSize: Typography.sizes.sm, fontWeight: Typography.weights.bold, color: Colors.dark, marginBottom: 2 },
  bookAge: { fontSize: Typography.sizes.xs, color: Colors.muted, marginBottom: Spacing.xs },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  unitCount: { fontSize: Typography.sizes.xs, color: Colors.skyBlue, fontWeight: Typography.weights.medium },
  empty: { alignItems: 'center', padding: Spacing['3xl'] },
  emptyText: { fontSize: Typography.sizes.base, color: Colors.muted, marginTop: Spacing.md },
});
