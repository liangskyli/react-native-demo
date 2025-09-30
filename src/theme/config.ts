import type { TextStyle } from 'react-native';

const colorsLight = {
  gray100: '#DFDFDF',
  gray200: '#A1A1A1',
  gray400: '#4D4D4D',
  gray50: '#EFEFEF',
  gray800: '#303030',
  red500: '#C13333',
  skeleton: '#A1A1A1',
} as const;

export const staticColorStyles = {
  gray100: {
    color: colorsLight.gray100,
  },
  gray200: {
    color: colorsLight.gray200,
  },
  gray400: {
    color: colorsLight.gray400,
  },
  gray50: {
    color: colorsLight.gray50,
  },
  gray800: {
    color: colorsLight.gray800,
  },
  red500: {
    color: colorsLight.red500,
  },
  skeleton: {
    color: colorsLight.skeleton,
  },
};

export const staticFontStyles = {
  alignCenter: {
    textAlign: 'center',
  },
  bold: {
    fontWeight: 'bold',
  },
  capitalize: {
    textTransform: 'capitalize',
  },
  uppercase: {
    textTransform: 'uppercase',
  },
  size_12: {
    fontSize: 12,
  },
  size_16: {
    fontSize: 16,
  },
} as const satisfies Record<string, TextStyle>;

export const fonts = staticFontStyles;
export const colors = staticColorStyles;
