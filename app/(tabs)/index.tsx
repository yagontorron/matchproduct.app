import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SearchBar } from '@/components/ui/SearchBar';
import { CategoryPill } from '@/components/ui/CategoryPill';
import { RequestCard, RequestItem } from '@/components/home/RequestCard';
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';

// Sample data for demonstration
const CATEGORIES = [
  'All',
  'Electronics',
  'Furniture',
  'Clothing',
  'Books',
  'Sports',
  'Toys',
  'Art',
  'Collectibles'
];

const REQUESTS: RequestItem[] = [
  {
    id: '1',
    title: 'Looking for iPhone 14 Pro Max',
    description: 'Looking for a new or lightly used iPhone 14 Pro Max with at least 256GB storage. Prefer Space Gray color.',
    category: 'Electronics',
    price: { min: 800, max: 1000 },
    location: 'San Francisco, CA',
    timePosted: '2h ago',
    imageUrl: 'https://images.pexels.com/photos/5750001/pexels-photo-5750001.jpeg',
    isFavorite: true
  },
  {
    id: '2',
    title: 'Mid-century modern coffee table',
    description: 'I need a mid-century modern coffee table for my living room. Wood should be walnut or teak. Looking for good condition.',
    category: 'Furniture',
    price: { min: 150, max: 300 },
    location: 'Seattle, WA',
    timePosted: '5h ago',
    imageUrl: 'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg',
    isFavorite: false
  },
  {
    id: '3',
    title: 'Looking for vintage vinyl records',
    description: 'Collecting vinyl records from the 70s and 80s. Particularly interested in rock and jazz albums in good condition.',
    category: 'Collectibles',
    price: { min: 20, max: 100 },
    location: 'Austin, TX',
    timePosted: '1d ago',
    imageUrl: 'https://images.pexels.com/photos/1853552/pexels-photo-1853552.jpeg',
    isFavorite: false
  },
  {
    id: '4',
    title: 'Need a mountain bike',
    description: 'Looking for a mountain bike for weekend trails. Prefer models with front suspension and at least 21 speeds.',
    category: 'Sports',
    price: { min: 300, max: 600 },
    location: 'Denver, CO',
    timePosted: '2d ago',
    imageUrl: 'https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg',
    isFavorite: false
  }
];

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [requests, setRequests] = useState(REQUESTS);

  const filteredRequests = requests.filter(request => {
    const matchesCategory = selectedCategory === 'All' || request.category === selectedCategory;
    const matchesSearch = 
      request.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      request.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && (searchQuery === '' || matchesSearch);
  });

  const handleRequestPress = (item: RequestItem) => {
    console.log('Request pressed:', item);
    // Navigate to request details
  };

  const handleMakeOfferPress = (item: RequestItem) => {
    console.log('Make offer pressed:', item);
    // Navigate to make offer screen
  };

  const handleFavoritePress = (item: RequestItem) => {
    console.log('Favorite pressed:', item);
    // Toggle favorite status
    setRequests(requests.map(request => 
      request.id === item.id 
        ? { ...request, isFavorite: !request.isFavorite } 
        : request
    ));
  };

  const renderItem = ({ item }: { item: RequestItem }) => (
    <RequestCard
      item={item}
      onPress={() => handleRequestPress(item)}
      onFavoritePress={() => handleFavoritePress(item)}
    />
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.headerContainer}>
        <Text style={styles.logo}>MatchProduct</Text>
        <View style={styles.searchContainer}>
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="What are you looking for?"
          />
        </View>
      </View>

      <FlatList
        data={filteredRequests}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.categoriesContainer}>
            <Text style={styles.sectionTitle}>Browse Categories</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoriesList}
            >
              {CATEGORIES.map((category) => (
                <CategoryPill
                  key={category}
                  label={category}
                  isSelected={selectedCategory === category}
                  onPress={() => setSelectedCategory(category)}
                />
              ))}
            </ScrollView>
            
            <Text style={styles.sectionTitle}>
              {selectedCategory === 'All' 
                ? 'Recent Requests' 
                : `${selectedCategory} Requests`}
            </Text>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No requests found</Text>
            <Text style={styles.emptyStateSubtext}>
              Try changing your search or category filter
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  headerContainer: {
    backgroundColor: Colors.neutral.white,
    paddingHorizontal: Layout.spacing.lg,
    paddingBottom: Layout.spacing.md,
    ...Layout.shadow.sm,
  },
  logo: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: Colors.primary.brand,
    marginBottom: Layout.spacing.md,
  },
  searchContainer: {
    marginBottom: Layout.spacing.sm,
  },
  categoriesContainer: {
    paddingTop: Layout.spacing.lg,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: Colors.accent.dark,
    marginBottom: Layout.spacing.md,
    paddingHorizontal: Layout.spacing.lg,
  },
  categoriesList: {
    paddingHorizontal: Layout.spacing.lg,
    paddingBottom: Layout.spacing.md,
  },
  listContent: {
    paddingBottom: Layout.spacing.xl,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: Layout.spacing.xl,
    marginTop: Layout.spacing.xl,
  },
  emptyStateText: {
    fontFamily: 'Inter-Medium',
    fontSize: 18,
    color: Colors.accent.light,
    textAlign: 'center',
    marginBottom: Layout.spacing.sm,
  },
  emptyStateSubtext: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.accent.light,
    textAlign: 'center',
  },
});