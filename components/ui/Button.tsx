import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ViewStyle, TextStyle, ActivityIndicator } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  style,
  textStyle,
  disabled = false,
  loading = false,
  fullWidth = false,
}: ButtonProps) {
  const getButtonStyles = () => {
    const baseStyles = [styles.button, styles[`${size}Button`]];
    
    if (fullWidth) {
      baseStyles.push(styles.fullWidth);
    }
    
    if (variant === 'primary') {
      baseStyles.push(styles.primaryButton);
    } else if (variant === 'secondary') {
      baseStyles.push(styles.secondaryButton);
    } else if (variant === 'outline') {
      baseStyles.push(styles.outlineButton);
    } else if (variant === 'ghost') {
      baseStyles.push(styles.ghostButton);
    }
    
    if (disabled) {
      baseStyles.push(styles.disabledButton);
    }
    
    return baseStyles;
  };
  
  const getTextStyles = () => {
    const baseStyles = [styles.text, styles[`${size}Text`]];
    
    if (variant === 'primary') {
      baseStyles.push(styles.primaryText);
    } else if (variant === 'secondary') {
      baseStyles.push(styles.secondaryText);
    } else if (variant === 'outline') {
      baseStyles.push(styles.outlineText);
    } else if (variant === 'ghost') {
      baseStyles.push(styles.ghostText);
    }
    
    if (disabled) {
      baseStyles.push(styles.disabledText);
    }
    
    return baseStyles;
  };

  return (
    <TouchableOpacity
      style={[...getButtonStyles(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator 
          color={variant === 'primary' ? Colors.neutral.white : Colors.primary.brand} 
          size="small" 
        />
      ) : (
        <Text style={[...getTextStyles(), textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: Layout.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWidth: {
    width: '100%',
  },
  primaryButton: {
    backgroundColor: Colors.primary.brand,
  },
  secondaryButton: {
    backgroundColor: Colors.secondary.brand,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.primary.brand,
  },
  ghostButton: {
    backgroundColor: 'transparent',
  },
  disabledButton: {
    backgroundColor: Colors.neutral.lightGray,
    borderColor: Colors.neutral.lightGray,
  },
  text: {
    fontFamily: 'Inter-SemiBold',
    textAlign: 'center',
  },
  primaryText: {
    color: Colors.neutral.white,
  },
  secondaryText: {
    color: Colors.neutral.white,
  },
  outlineText: {
    color: Colors.primary.brand,
  },
  ghostText: {
    color: Colors.primary.brand,
  },
  disabledText: {
    color: Colors.neutral.mediumGray,
  },
  smButton: {
    paddingVertical: Layout.spacing.xs,
    paddingHorizontal: Layout.spacing.md,
  },
  mdButton: {
    paddingVertical: Layout.spacing.sm,
    paddingHorizontal: Layout.spacing.lg,
  },
  lgButton: {
    paddingVertical: Layout.spacing.md,
    paddingHorizontal: Layout.spacing.xl,
  },
  smText: {
    fontSize: 12,
  },
  mdText: {
    fontSize: 14,
  },
  lgText: {
    fontSize: 16,
  },
});