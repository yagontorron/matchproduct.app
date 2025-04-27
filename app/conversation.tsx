import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const messagesMock = [
  {
    id: '1',
    text: "Hi! I'm interested in your iPhone. Is it still available?",
    time: '10:30 AM',
    sent: true,
  },
  {
    id: '2',
    text: "Yes, I have the iPhone model you're looking for. It's in great condition!",
    time: '10:31 AM',
    sent: false,
  },
  {
    id: '3',
    text: 'Great! Could you share some more photos?',
    time: '10:32 AM',
    sent: true,
  },
];

export default function ConversationScreen() {
  const router = useRouter();
  const [message, setMessage] = useState('');

  const renderItem = ({ item }: { item: any }) => (
    <View
      style={[
        styles.messageBubble,
        item.sent ? styles.sent : styles.received,
      ]}
    >
      <Text
        style={[
          styles.messageText,
          item.sent && { color: 'white' },
        ]}
      >
        {item.text}
      </Text>
      <Text
        style={[
          styles.messageTime,
          item.sent && { color: '#f1f1f1' },
        ]}
      >
        {item.time}
      </Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Header estilo Wallapop */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        <Image
          source={{ uri: 'https://images.pexels.com/photos/4065882/pexels-photo-4065882.jpeg' }}
          style={styles.productImage}
        />

        <View style={styles.productInfo}>
          <Text style={styles.productTitle}>iPhone 13</Text>
          <Text style={styles.productPrice}>250€</Text>
        </View>

        <View style={styles.profileInfo}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg' }}
            style={styles.profileAvatar}
          />
          <Text style={styles.username}>María</Text>
        </View>
      </View>

      {/* Chat */}
      <FlatList
        data={messagesMock}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesContainer}
        inverted
      />

      {/* Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Type a message..."
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity>
          <Ionicons name="send" size={24} color="#EF5350" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    gap: 10,
  },
  productImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  productInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  productPrice: {
    fontSize: 14,
    color: '#EF5350',
    marginTop: 2,
  },
  profileInfo: {
    alignItems: 'center',
  },
  profileAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  username: {
    fontSize: 12,
    marginTop: 4,
    color: '#555',
  },
  messagesContainer: {
    padding: 16,
    gap: 10,
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  messageBubble: {
    padding: 12,
    borderRadius: 16,
    maxWidth: '75%',
  },
  sent: {
    backgroundColor: '#EF5350',
    alignSelf: 'flex-end',
    borderTopRightRadius: 0,
  },
  received: {
    backgroundColor: '#f1f1f1',
    alignSelf: 'flex-start',
    borderTopLeftRadius: 0,
  },
  messageText: {
    fontSize: 16,
  },
  messageTime: {
    fontSize: 10,
    color: '#555',
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
  },
  textInput: {
    flex: 1,
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#f1f1f1',
    marginRight: 8,
  },
});