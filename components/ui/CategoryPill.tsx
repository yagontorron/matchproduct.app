import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';

interface CategoryPillProps {
  label: string;
  isSelected?: boolean;
  onPress: () => void;
  style?: ViewStyle;
}

export function CategoryPill({
  label,
  isSelected = false,
  onPress,
  style,
}: CategoryPillProps) {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        isSelected ? styles.selectedContainer : {},
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text
        style={[
          styles.label,
          isSelected ? styles.selectedLabel : {},
        ]}
        numberOfLines={1}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Layout.spacing.md,
    paddingVertical: Layout.spacing.xs,
    borderRadius: Layout.borderRadius.full,
    backgroundColor: Colors.neutral.offWhite,
    marginRight: Layout.spacing.sm,
    marginBottom: Layout.spacing.sm,
  },
  selectedContainer: {
    backgroundColor: Colors.primary.brand,
  },
  label: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.accent.brand,
  },
  selectedLabel: {
    color: Colors.neutral.white,
  },
});