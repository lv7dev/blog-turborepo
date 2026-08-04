const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = (config) => {
  config.externals = [
    nodeExternals({
      modulesDir: path.resolve(__dirname, 'node_modules'),
      importType: 'module',
    }),
    nodeExternals({
      modulesDir: path.resolve(__dirname, '../../node_modules'),
      importType: 'module',
    }),
  ];

  config.output = {
    ...config.output,
    module: true,
    chunkFormat: 'module',
    library: {
      type: 'module',
    },
  };

  config.experiments = {
    ...config.experiments,
    outputModule: true,
  };

  config.externalsType = 'module';

  config.resolve = {
    ...config.resolve,
    extensionAlias: {
      '.js': ['.ts', '.js'],
      '.mjs': ['.mts', '.mjs'],
      '.cjs': ['.cts', '.cjs'],
    },
  };

  return config;
};
