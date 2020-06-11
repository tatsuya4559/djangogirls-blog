module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: ['./assets/**/*.tsx'],
  },
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
};
