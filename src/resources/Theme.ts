import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const COLORS = {
  primary: '#1D2026', // Blue
  // primary: '#4f83ff', // Blue
  secondary: '#2D303A', // Dark purple

  white: '#fff',
  background: '#2D303A',
  black: '#000000',
  green: '#37E39F',
  red: '#F9A8BA',
  gray: '#6A6A6A',
  lightGray: '#dbdbdb',
  lightGray1: '#f5f6fa',
};
export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,

  // font sizes
  h1: 24,
  h2: 20,
  h3: 18,
  h4: 16,
  body1: 22,
  body2: 18,
  body3: 16,
  body4: 14,
  body5: 12,

  // app dimensions
  width,
  height,
};
export const FONTS = {
  h1: {fontSize: SIZES.h1, lineHeight: 36},
  h2: {fontSize: SIZES.h2, lineHeight: 30},
  h3: {fontSize: SIZES.h3, lineHeight: 22},
  h4: {fontSize: SIZES.h4, lineHeight: 22},
  body1: {fontSize: SIZES.body1, lineHeight: 36},
  body2: {fontSize: SIZES.body2, lineHeight: 30},
  body3: {fontSize: SIZES.body3, lineHeight: 22},
  body4: {fontSize: SIZES.body4, lineHeight: 22},
  body5: {fontSize: SIZES.body5, lineHeight: 22},
};

const appTheme = {COLORS, SIZES, FONTS};

export default appTheme;
