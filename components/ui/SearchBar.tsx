import React from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity } from 'react-native';
import { Search, X } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onClear?: () => void;
  placeholder?: string;
  autoFocus?: boolean;
}

export function SearchBar({
  value,
  onChangeText,
  onClear,
  placeholder = 'Search for items...',
  autoFocus = false,
}: SearchBarProps) {
  const handleClear = () => {
    onChangeText('');
    onClear?.();
  };

  return (
    <View style={styles.container}>
      <Search size={18} color={Colors.accent.light} style={styles.icon} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors.accent.light}
        autoFocus={autoFocus}
        clearButtonMode="never"
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
          <X size={16} color={Colors.accent.light} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.neutral.offWhite,
    borderRadius: Layout.borderRadius.lg,
    paddingHorizontal: Layout.spacing.md,
    paddingVertical: Layout.spacing.sm,
    ...Layout.shadow.sm,
  },
  icon: {
    marginRight: Layout.spacing.sm,
  },
  input: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.text,
    padding: 0,
  },
  clearButton: {
    marginLeft: Layout.spacing.sm,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.neutral.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
  }
});