module.exports = {
  theme: {
    extend: {
      fontSize: {
        xxs: '0.55rem',
      },
      colors: {
        main: '#2B2E6E',
        selectpurple: '#6D70C5',
      },
    },
  },
  variants: {
    opacity: ['disabled'],
    pointerEvents: ['disabled'],
  },
  plugins: [],
  purge: {
    content: ['./**/*.tsx'],
  },
};
