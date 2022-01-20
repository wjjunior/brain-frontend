export const colors = {
  primary: {
    transparent: 'rgba(0, 0, 0, 0)',
    purple: '#36B3CF',
    dark_blue: '#1C3249',
    gray: '#2C547D',
    silver: '#DFE3E6',
    white: '#FFFFFF',
  },
  secondary: {
    purple: '#D5F7FF',
    blue: '#1C3249',
    gray: '#A8AFB3',
    silver: '#F9FEFF',
    green: '#6FCF97',
  },
  situational: {
    danger: '#BE0D31',
    warning: '#FFBD59',
    attention: '#FFFF00',
    info: '#36B3CF',
  },
};

export const grid = (multiplier: number): string => `${multiplier * 8}px`;

export default function configTheme() {
  return { colors, grid };
}
