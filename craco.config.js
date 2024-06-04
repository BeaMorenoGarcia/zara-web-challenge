const CompressionPlugin = require('compression-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const { extendDefaultPlugins } = require('svgo');

module.exports = {
  webpack: {
    configure: (webpackConfig, { env }) => {
      if (env === 'production') {
        webpackConfig.module.rules.push({
          test: /\.(jpe?g|png|gif|svg)$/i,
          use: [
            {
              loader: 'image-webpack-loader',
              options: {
                bypassOnDebug: true,
                disable: true,
              },
            },
          ],
        });

        webpackConfig.plugins.push(
          new ImageMinimizerPlugin({
            minimizerOptions: {
              plugins: [
                ['gifsicle', { interlaced: true }],
                ['jpegtran', { progressive: true }],
                ['optipng', { optimizationLevel: 5 }],
                [
                  'svgo',
                  {
                    plugins: extendDefaultPlugins([
                      {
                        name: 'removeViewBox',
                        active: false,
                      },
                    ]),
                  },
                ],
              ],
            },
          })
        );

        webpackConfig.plugins.push(
          new CompressionPlugin({
            filename: '[path][base].gz',
            algorithm: 'gzip',
            test: /\.(js|css|html|svg)$/,
            threshold: 8192,
            minRatio: 0.8,
          })
        );
      }
      return webpackConfig;
    },
  },
};
