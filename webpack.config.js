const fs = require('fs');
const path = require('path');

const webpack = require('webpack');
const {merge} = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const LiveReload = require('webpack-livereload-plugin');

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

console.log(`Building Webpack project with enviroment "${environment}"`);

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
            loader: 'url-loader',
            options: {
              name: FILENAMES.images,
              options: {
                limit: 25000
              }
            }
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
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
};

if (environment === 'production') {
  envConfig.plugins = [
    new webpack.optimize.OccurrenceOrderPlugin(undefined),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false
    })
  ];
  envConfig.devtool = 'source-map';
} else {
  envConfig.plugins = [
    new HtmlPlugin({
      filename: FILENAMES.html
    }),
    new LiveReload()
  ];
  envConfig.devServer = {
    contentBase: path.join(__dirname),
    port: 8080
  };
  envConfig.devtool = 'eval';
}

module.exports = merge(config, commonConfig, envConfig);
