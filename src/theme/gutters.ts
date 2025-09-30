import type { ViewStyle } from 'react-native';

export default {
  gap_16: {
    gap: 16,
  },
  padding_16: {
    padding: 16,
  },
} as const satisfies Record<string, ViewStyle>;
