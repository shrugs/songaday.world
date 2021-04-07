
const { withPlugins } = require('next-compose-plugins');
const withTM = require('next-transpile-modules')(['lodash-es']);


module.exports = withPlugins(
  [
    [withTM],
  ],
  {
    // no free advertising on my watch
    poweredByHeader: false,

    // env variables to propagate to the client (public info)
    env: {},
  },
);
