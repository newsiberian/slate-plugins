module.exports = async ({ config }) => {
  config.devtool = 'cheap-eval-source-map';

  return config;
};
