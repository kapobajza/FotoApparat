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
  error: '#d9534f',
  info: '#5bc0de',
  success: '#5cb85c',
};

export default colors;
