import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Clock, MapPin, Heart } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'expo-router';

export interface RequestItem {
  id: string;
  title: string;
  description: string;
  category: string;
  price: {
    min: number;
    max: number;
  };
  location: string;
  timePosted: string;
  imageUrl: string;
  isFavorite?: boolean;
}

interface RequestCardProps {
  item: RequestItem;
  onPress: () => void;
  onFavoritePress: () => void;
}

export function RequestCard({
  item,
  onPress,
  onFavoritePress,
}: RequestCardProps) {
  const router = useRouter();

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.9}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item.imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={onFavoritePress}
          hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
        >
          <Heart
            size={20}
            color={item.isFavorite ? Colors.primary.brand : Colors.neutral.white}
            fill={item.isFavorite ? Colors.primary.brand : 'transparent'}
          />
        </TouchableOpacity>
      </View>
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.category}>{item.category}</Text>
          <Text style={styles.price}>
            ${item.price.min} - ${item.price.max}
          </Text>
        </View>
        
        <Text style={styles.title} numberOfLines={1}>
          {item.title}
        </Text>
        
        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>
        
        <View style={styles.footer}>
          <View style={styles.metaContainer}>
            <View style={styles.metaItem}>
              <MapPin size={14} color={Colors.accent.light} />
              <Text style={styles.metaText}>{item.location}</Text>
            </View>
            <View style={styles.metaItem}>
              <Clock size={14} color={Colors.accent.light} />
              <Text style={styles.metaText}>{item.timePosted}</Text>
            </View>
          </View>
          
          <Button
            title="Make Offer"
            onPress={() => router.push('/conversation')}
            variant="primary"
            size="sm"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.neutral.white,
    borderRadius: Layout.borderRadius.lg,
    marginBottom: Layout.spacing.md,
    overflow: 'hidden',
    ...Layout.shadow.md,
  },
  imageContainer: {
    height: 160,
    width: '100%',
    position: 'relative',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  favoriteButton: {
    position: 'absolute',
    top: Layout.spacing.md,
    right: Layout.spacing.md,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: Layout.borderRadius.full,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: Layout.spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.xs,
  },
  category: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: Colors.secondary.brand,
    backgroundColor: 'rgba(0, 166, 153, 0.1)',
    paddingHorizontal: Layout.spacing.sm,
    paddingVertical: 2,
    borderRadius: Layout.borderRadius.sm,
  },
  price: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: Colors.primary.brand,
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: Colors.accent.dark,
    marginBottom: Layout.spacing.xs,
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.accent.light,
    marginBottom: Layout.spacing.md,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metaContainer: {
    flex: 1,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.xs,
  },
  metaText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.accent.light,
    marginLeft: Layout.spacing.xs,
  },
});