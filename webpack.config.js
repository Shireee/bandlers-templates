const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WebpackDevServer = require('webpack-dev-server');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production'

    return{
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, 'docs'),
            filename: 'bundle.js'
        },
        module: {
          rules: [
              {
                  test: /\.scss$/,
                  use: [
                      isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                      'css-loader',
                      'sass-loader'
                  ]
              },
              {
                  test: /\.(woff|woff2|eot|ttf|otf)$/i,
                  type: 'asset/resource',
                  generator: {
                      filename: 'fonts/[name][ext]'
                  }
              },
              {
                test: /\.(jpeg|svg|jpg|webp|png)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'img/[name][ext]'
                }
            }
          ]
      },
          plugins: [new MiniCssExtractPlugin({filename: "style/style.css"}),
                    new CopyPlugin({ patterns: [{ from: "*.html", to: "./", context:'src/'},
                                                { from: 'img/**', to: './', context: 'src/', noErrorOnMissing: true },
                                                { from: 'script/**', to: './', context: 'src/', noErrorOnMissing: true }]})
          ],
        devServer: {
            static: {
              directory: path.resolve(__dirname, './docs'),
            },
            historyApiFallback: true, 
            open: true, 
            hot: true,
            port: 8080,
          },
    }
}
