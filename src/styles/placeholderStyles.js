import { StyleSheet } from 'react-native';
import { BRAND_COLOR } from '../constants/colors';

/**
 * Shared styles for placeholder screens.
 */
export const placeholderStyles = StyleSheet.create({
  placeholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  text: {
    fontSize: 22,
    fontWeight: '600',
    color: BRAND_COLOR,
  },
  subText: {
    fontSize: 14,
    color: '#888',
  },
});
