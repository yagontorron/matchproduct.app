import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ProfileHeader, UserProfile } from '@/components/profile/ProfileHeader';
import { RequestList } from '@/components/profile/RequestList';
import { RequestItem } from '@/components/home/RequestCard';
import { Button } from '@/components/ui/Button';
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';

const USER_PROFILE: UserProfile = {
  id: 'user123',
  name: 'Alex Johnson',
  avatarUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
  location: 'San Francisco, CA',
  memberSince: 'May 2022',
  rating: 4.8,
  totalRequests: 12,
  totalDeals: 8,
};

const MY_REQUESTS: RequestItem[] = [/* ... */];
const FAVORITE_REQUESTS: RequestItem[] = [/* ... */];

type TabType = 'my-requests' | 'favorites';

export default function ProfileScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('my-requests');
  const [myRequests, setMyRequests] = useState(MY_REQUESTS);
  const [favoriteRequests, setFavoriteRequests] = useState(FAVORITE_REQUESTS);

  const handleSettingsPress = () => {
    router.push('/settings'); // Esto abre settings.tsx
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView>
        <ProfileHeader
          user={USER_PROFILE}
          onSettingsPress={handleSettingsPress} // <- Aquí se pasa la función
        />

        {/* tabs y listado */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});