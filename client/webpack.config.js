// For inspiration on your webpack configuration, see:
// https://github.com/shakacode/react_on_rails/tree/master/spec/dummy/client
// https://github.com/shakacode/react-webpack-rails-tutorial/tree/master/client

const webpack = require('webpack');
const { resolve } = require('path');
const path = require('path');
const ManifestPlugin = require('webpack-manifest-plugin');
const webpackConfigLoader = require('react-on-rails/webpackConfigLoader');

const configPath = resolve('..', 'config');
const { devBuild, manifest, webpackOutputPath, webpackPublicOutputDir } = webpackConfigLoader(configPath);

const config = {

  context: resolve(__dirname),

  entry: {
    'webpack-bundle': [
      'es5-shim/es5-shim',
      'es5-shim/es5-sham',
      'babel-polyfill',
      './app/bundles/Admin/startup/registration'
    ],
  },

  output: {
    // this is our app/assets/javascripts directory, which is part of the Sprockets pipeline
    path: path.join(__dirname, '../', 'app', 'assets', 'javascripts'),
    // the filename of the compiled bundle, e.g. app/assets/javascripts/bundle.js
    filename: 'webpack-bundle.js',
    // if the webpack code-splitting feature is enabled, this is the path it'll use to download bundles
    // publicPath: '/assets',
    // Name comes from the entry section.
    // filename: '[name]-[hash].js',

    // Leading slash is necessary
    publicPath: '/home/framgia/project/faa_rebuild/app/assets/javascripts'
    // path: webpackOutputPath,
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development', // use 'development' unless process.env.NODE_ENV is defined
      DEBUG: false,
    }),
    new ManifestPlugin({ fileName: manifest, writeToFileEmit: true })
  ],

  module: {
    rules: [
      {
        test: require.resolve('react'),
        use: {
          loader: 'imports-loader',
          options: {
            shim: 'es5-shim/es5-shim',
            sham: 'es5-shim/es5-sham',
          },
        },
      },
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css?$/,
        loaders: 'style-loader!css-loader'
      },
    ],
  },
};

module.exports = config;

if (devBuild) {
  console.log('Webpack dev build for Rails'); // eslint-disable-line no-console
  module.exports.devtool = 'eval-source-map';
} else {
  console.log('Webpack production build for Rails'); // eslint-disable-line no-console
}
