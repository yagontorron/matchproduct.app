import { Tabs } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Chrome as Home, Plus, MessageSquare, User } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: Colors.primary.brand,
        tabBarInactiveTintColor: Colors.accent.light,
        tabBarLabelStyle: styles.tabBarLabel,
        headerShown: false,
        tabBarShowLabel: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Home color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: 'Create',
          tabBarIcon: ({ color, size }) => (
            <View style={styles.createTabContainer}>
              <Plus color={Colors.neutral.white} size={size} />
            </View>
          ),
          tabBarLabelStyle: { color: Colors.primary.brand },
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: 'Messages',
          tabBarIcon: ({ color, size }) => (
            <MessageSquare color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <User color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.neutral.white,
    height: 60,
    paddingTop: Layout.spacing.xs,
    paddingBottom: Layout.spacing.xs,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral.lightGray,
  },
  tabBarLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    marginBottom: 2,
  },
  createTabContainer: {
    backgroundColor: Colors.primary.brand,
    borderRadius: Layout.borderRadius.full,
    padding: Layout.spacing.xs,
  },
});