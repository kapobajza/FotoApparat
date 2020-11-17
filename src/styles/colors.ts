export interface ColorType {
  transparent: string;
  white: string;
  black: string;
  gray100: string;
  gray200: string;
  gray300: string;
  gray400: string;
  gray500: string;
  gray600: string;
  gray700: string;
  gray800: string;
  gray900: string;
  gold: string;
  disabledGray: string;
  blackWithTransparency: Function;
}

const colors = {
  transparent: 'rgba(0,0,0,0)',
  white: '#fff',
  black: '#000',
  gray100: '#f8f9fa',
  gray200: '#e9ecef',
  gray300: '#dee2e6',
  gray400: '#ced4da',
  gray500: '#adb5bd',
  gray600: '#6c757d',
  gray700: '#495057',
  gray800: '#343a40',
  gray900: '#212529',
  gold: '#FFD700',
  disabledGray: '#D3D3D3',
  blackWithTransparency: (transparency = 0.5) =>
    `rgba(0, 0, 0, ${transparency})`,
};

export default colors;
