const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WebpackDevServer = require('webpack-dev-server');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production'

    return{
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.js'
        },
        module: {
            rules: [{test: /\.scss$/, use: [isProduction ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader', 'sass-loader']}]
        },
          plugins: [new MiniCssExtractPlugin({filename: "styles/style.scss"}),
                    new CopyPlugin({ patterns: [{ from: "./src/index.html", to: "./" }, { from: 'img/**', to: './', context: 'src/', noErrorOnMissing: true }]})
          ],
        devServer: {
            static: {
              directory: path.resolve(__dirname, './dist'),
            },
            historyApiFallback: true, 
            open: true, 
            hot: true,
            port: 8080,
          },
    }
}
