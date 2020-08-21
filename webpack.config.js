const fs = require('fs');
const path = require('path');

const webpack = require('webpack');
const {merge} = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const LiveReload = require('webpack-livereload-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const packages = require('./package.json');

const environment = process.env.NODE_ENV;

const PATHS = {
  app: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'build')
};

const FILENAMES = {
  build: '[name].js',
  vendor: 'vendors.js',
  sass: 'sass.build.css',
  html: 'index.html',
  images: 'images/[hash].[ext]',
  fonts: 'fonts/[hash].[ext]'
};

const FILES = {};
fs.readdirSync(PATHS.app).forEach((file) => {
  const match = file.match(/(.*)\.(js|jsx)$/);
  if (match) {
    FILES[match[1]] = `./${file}`;
  }
});

console.log(`Building Webpack project with environment "${environment}"`);

let config = {
  context: PATHS.app,
  entry: FILES,
  output: {
    path: PATHS.build,
    filename: FILENAMES.build,
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /[\\/]node_modules[\\/]/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.coffee$/,
        use: [
          {
            loader: 'coffee-loader'
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          process.env.NODE_ENV !== 'production'
            ? 'style-loader'
            : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      },
      {
        test: /\.(woff2?|ttf|eot|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: FILENAMES.fonts
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "style.css",
      chunkFilename: "[name].css"
    }),
    new webpack.EnvironmentPlugin([
      'NODE_ENV',
    ]),
  ]
};

let envConfig = {};

const commonConfig = {
  entry: {
    vendor: Object.keys(packages.dependencies),
  },
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 50000,
      maxSize: 200000,
      minChunks: 1,
      maxAsyncRequests: 20,
      maxInitialRequests: 5,
      automaticNameDelimiter: '~',
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  plugins: [
    new HtmlPlugin({
      template: FILENAMES.html,
      filename: FILENAMES.html
    }),
    new CopyWebpackPlugin({
      patterns: [
        {from: 'static'}
      ]
    })
  ]
};

if (environment === 'production'
) {
  envConfig.plugins = [
    new webpack.optimize.OccurrenceOrderPlugin(undefined),
  ];
  envConfig.optimization = {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        sourceMap: false
      })
    ]
  }
  envConfig.devtool = false;
} else {
  envConfig.plugins = [
    new LiveReload()
  ];
  envConfig.devServer = {
    contentBase: path.join(__dirname),
    historyApiFallback: true,
    port: 8080
  };
  envConfig.devtool = 'source-map';
}

module.exports = merge(config, commonConfig, envConfig);
