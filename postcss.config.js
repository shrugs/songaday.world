/* eslint-disable @typescript-eslint/no-var-requires */

const purgecss = require('@fullhuman/postcss-purgecss')({
  content: ['./components/**/*.js', './pages/**/*.js'],
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
});

module.exports = {
  plugins: [
    require('postcss-import'),
    require('tailwindcss'),
    require('postcss-preset-env')({ stage: 2 }),
    ...(process.env.NODE_ENV === 'production' ? [purgecss] : []),
  ],
};
