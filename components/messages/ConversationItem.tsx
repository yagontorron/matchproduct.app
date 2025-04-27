import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';
import { useRouter } from 'expo-router';

export interface Conversation {
  id: string;
  user: {
    id: string;
    name: string;
    avatarUrl: string;
  };
  lastMessage: {
    text: string;
    timestamp: string;
    isRead: boolean;
  };
  requestTitle: string;
}

interface ConversationItemProps {
  conversation: Conversation;
}

export function ConversationItem({ conversation }: ConversationItemProps) {
  const router = useRouter();
  const { user, lastMessage, requestTitle } = conversation;

  const handlePress = () => {
    router.push('/conversation');
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress} activeOpacity={0.7}>
      <Image
        source={{ uri: user.avatarUrl }}
        style={styles.avatar}
      />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name} numberOfLines={1}>
            {user.name}
          </Text>
          <Text style={styles.timestamp}>{lastMessage.timestamp}</Text>
        </View>
        
        <Text style={styles.requestTitle} numberOfLines={1}>
          {requestTitle}
        </Text>
        
        <Text 
          style={[
            styles.message, 
            !lastMessage.isRead && styles.unreadMessage
          ]} 
          numberOfLines={1}
        >
          {lastMessage.text}
        </Text>
      </View>
      
      {!lastMessage.isRead && <View style={styles.unreadIndicator} />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: Layout.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.lightGray,
    backgroundColor: Colors.neutral.white,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: Layout.spacing.md,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  name: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.accent.dark,
    flex: 1,
    marginRight: Layout.spacing.sm,
  },
  timestamp: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.accent.light,
  },
  requestTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.secondary.brand,
    marginBottom: 2,
  },
  message: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.accent.light,
  },
  unreadMessage: {
    fontFamily: 'Inter-Medium',
    color: Colors.accent.dark,
  },
  unreadIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.primary.brand,
    alignSelf: 'center',
    marginLeft: Layout.spacing.sm,
  },
});