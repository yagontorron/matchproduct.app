import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MessageCircle } from 'lucide-react-native';
import { SearchBar } from '@/components/ui/SearchBar';
import { ConversationItem, Conversation } from '@/components/messages/ConversationItem';
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';

// Sample data for demonstration
const CONVERSATIONS: Conversation[] = [
  {
    id: '1',
    user: {
      id: 'user1',
      name: 'Emma Wilson',
      avatarUrl: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    lastMessage: {
      text: 'Yes, I have the iPhone model you\'re looking for. It\'s in great condition!',
      timestamp: '10:30 AM',
      isRead: false,
    },
    requestTitle: 'Looking for iPhone 14 Pro Max',
  },
  {
    id: '2',
    user: {
      id: 'user2',
      name: 'Daniel Brown',
      avatarUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    lastMessage: {
      text: 'I can deliver the coffee table tomorrow afternoon if that works for you.',
      timestamp: 'Yesterday',
      isRead: true,
    },
    requestTitle: 'Mid-century modern coffee table',
  },
  {
    id: '3',
    user: {
      id: 'user3',
      name: 'Sophia Garcia',
      avatarUrl: 'https://images.pexels.com/photos/1520760/pexels-photo-1520760.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    lastMessage: {
      text: 'I have a collection of jazz vinyl records from the 70s that might interest you.',
      timestamp: '2 days ago',
      isRead: true,
    },
    requestTitle: 'Looking for vintage vinyl records',
  },
  {
    id: '4',
    user: {
      id: 'user4',
      name: 'James Johnson',
      avatarUrl: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    lastMessage: {
      text: 'I have a mountain bike in great condition. Would you like to see some photos?',
      timestamp: '3 days ago',
      isRead: true,
    },
    requestTitle: 'Need a mountain bike',
  },
];

export default function MessagesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [conversations, setConversations] = useState(CONVERSATIONS);

  const filteredConversations = conversations.filter(conversation => {
    const matchesUser = conversation.user.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRequest = conversation.requestTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMessage = conversation.lastMessage.text.toLowerCase().includes(searchQuery.toLowerCase());
    
    return searchQuery === '' || matchesUser || matchesRequest || matchesMessage;
  });

  const handleConversationPress = (conversation: Conversation) => {
    console.log('Conversation pressed:', conversation);
    // Navigate to conversation details

    // Mark as read if unread
    if (!conversation.lastMessage.isRead) {
      const updatedConversations = conversations.map(c => 
        c.id === conversation.id 
          ? { ...c, lastMessage: { ...c.lastMessage, isRead: true } } 
          : c
      );
      setConversations(updatedConversations);
    }
  };

  const renderItem = ({ item }: { item: Conversation }) => (
    <ConversationItem
      conversation={item}
      onPress={() => handleConversationPress(item)}
    />
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
        <View style={styles.searchContainer}>
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search messages..."
          />
        </View>
      </View>

      {filteredConversations.length > 0 ? (
        <FlatList
          data={filteredConversations}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyState}>
          <MessageCircle size={60} color={Colors.neutral.lightGray} />
          <Text style={styles.emptyStateTitle}>No messages yet</Text>
          <Text style={styles.emptyStateText}>
            {searchQuery
              ? 'No messages matching your search'
              : 'When you make or receive offers, conversations will appear here'}
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    backgroundColor: Colors.neutral.white,
    paddingHorizontal: Layout.spacing.lg,
    paddingVertical: Layout.spacing.md,
    ...Layout.shadow.sm,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: Colors.accent.dark,
    marginBottom: Layout.spacing.md,
  },
  searchContainer: {
    marginBottom: Layout.spacing.sm,
  },
  listContent: {
    flexGrow: 1,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Layout.spacing.xl,
  },
  emptyStateTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    color: Colors.accent.dark,
    marginTop: Layout.spacing.lg,
    marginBottom: Layout.spacing.sm,
  },
  emptyStateText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.accent.light,
    textAlign: 'center',
    paddingHorizontal: Layout.spacing.xl,
  },
});