module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: ['./assets/**/*.tsx'],
  },
  theme: {
    extend: {
      colors: {
        brand: {
          100: '#c3c8f2',
          200: '#9ca3e3',
          300: '#757fd7',
          400: '#4f5aca',
          500: '#3540b0',
          600: '#28328a',
          700: '#1c2464',
          800: '#0f153f',
          900: '#04061b',
        },
      },
    },
  },
  variants: {},
  plugins: [],
};
