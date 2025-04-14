import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ErrorDisplayProps {
  message: string;
  onRetry?: () => void;
  type?: 'error' | 'warning' | 'info';
  style?: object;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  message,
  onRetry,
  type = 'error',
  style,
}) => {
  const getIconName = () => {
    switch (type) {
      case 'error':
        return 'alert-circle';
      case 'warning':
        return 'warning';
      case 'info':
        return 'information-circle';
      default:
        return 'alert-circle';
    }
  };

  const getIconColor = () => {
    switch (type) {
      case 'error':
        return '#dc2626';
      case 'warning':
        return '#f59e0b';
      case 'info':
        return '#3b82f6';
      default:
        return '#dc2626';
    }
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.content}>
        <Ionicons name={getIconName()} size={24} color={getIconColor()} />
        <Text style={[styles.message, { color: getIconColor() }]}>{message}</Text>
      </View>
      {onRetry && (
        <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
          <Text style={styles.retryText}>Try Again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#f8fafc',
    margin: 16,
    alignItems: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  message: {
    marginLeft: 8,
    fontSize: 16,
    flex: 1,
  },
  retryButton: {
    marginTop: 8,
    padding: 8,
    backgroundColor: '#e2e8f0',
    borderRadius: 4,
  },
  retryText: {
    color: '#475569',
    fontWeight: '500',
  },
}); 