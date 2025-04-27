import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Settings, Star } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';

export interface UserProfile {
  id: string;
  name: string;
  avatarUrl: string;
  location: string;
  memberSince: string;
  rating: number;
  totalRequests: number;
  totalDeals: number;
}

interface ProfileHeaderProps {
  user: UserProfile;
  onSettingsPress: () => void;
}

export function ProfileHeader({ user, onSettingsPress }: ProfileHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image
            source={{ uri: user.avatarUrl }}
            style={styles.avatar}
          />
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{user.name}</Text>
            <View style={styles.ratingContainer}>
              <Star size={14} color={Colors.warning.brand} fill={Colors.warning.brand} />
              <Text style={styles.rating}>{user.rating.toFixed(1)}</Text>
            </View>
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.settingsButton} 
          onPress={onSettingsPress}
          hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
        >
          <Settings size={22} color={Colors.accent.brand} />
        </TouchableOpacity>
      </View>
      
      <Text style={styles.location}>{user.location}</Text>
      <Text style={styles.memberSince}>Member since {user.memberSince}</Text>
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{user.totalRequests}</Text>
          <Text style={styles.statLabel}>Requests</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{user.totalDeals}</Text>
          <Text style={styles.statLabel}>Completed Deals</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.neutral.white,
    padding: Layout.spacing.lg,
    ...Layout.shadow.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.md,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: Layout.spacing.md,
    borderWidth: 2,
    borderColor: Colors.primary.brand,
  },
  nameContainer: {
    justifyContent: 'center',
  },
  name: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: Colors.accent.dark,
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.accent.light,
    marginLeft: 4,
  },
  settingsButton: {
    padding: Layout.spacing.sm,
  },
  location: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.accent.light,
    marginBottom: 2,
  },
  memberSince: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.accent.light,
    marginBottom: Layout.spacing.lg,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.neutral.offWhite,
    borderRadius: Layout.borderRadius.md,
    padding: Layout.spacing.md,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: Colors.accent.dark,
    marginBottom: 2,
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.accent.light,
  },
  divider: {
    width: 1,
    backgroundColor: Colors.neutral.lightGray,
    marginHorizontal: Layout.spacing.sm,
  },
});