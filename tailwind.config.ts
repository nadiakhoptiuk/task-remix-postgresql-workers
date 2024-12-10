import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

export default {
  content: [
    './app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}',
    './app/**/**/**/*.css',
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      xl: '1280px',
    },

    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: '1.25rem',
          sm: '1.25rem',
          md: '2rem',
          xl: '2rem',
        },
      },

      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
          'Noto Color Emoji',
        ],
      },

      colors: {
        ui_light: '#F1F1F1',
        ui_lighter: '#fafafa',
        ui_grey: '#D9D9D9',
        ui_dark_grey: '#bfbfbf',
        ui_dark: '#020202',
        ui_accent: '#3E69AD',
        ui_accent_dark: '#2C528F',
        ui_red: '#F80909',
        ui_overlay: 'rgba(2, 2, 2, 0.8)',
        user0: '#4bc0c0',
        user1: '#ff9f40',
        user2: '#ff6384',
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant('hocus', ['&:hover', '&:focus']);
    }),
  ],
} satisfies Config;
