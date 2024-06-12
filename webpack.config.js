const path = require('path');
const HtmlBundlerPlugin = require('html-bundler-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production'
  console.log(isProduction)
  return {
    output: {
      path: path.resolve(__dirname, 'docs'),
    },
  
    plugins: [
      new HtmlBundlerPlugin({
        entry: 'src/pages/',
        preprocessor: 'handlebars',
        preprocessorOptions: {
          partials: ['src/partials'],
          helpers: {
            arraySize: (array) => array.length,
          },
        },
        js: {
          filename: `${isProduction ?  'js/[name].js' : 'js/[name].[contenthash:8].js'}`,
        },
        css: {
          filename: `${isProduction ? 'css/[name].css' : 'css/[name].[contenthash:8].css'}`,
        },
      }),
    ],
  
    module: {
      rules: [
        {
          test: /\.(scss)$/,
          use: ['css-loader',{
            loader: 'sass-loader',
            options: {
              sassOptions: {
                outputStyle: 'expanded',
              }
            }
          }],
        },
        {
          test: /\.(png|svg|jpe?g|webp)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'img/[name].[hash:8][ext]',
          },
        },
        {
          test: /\.(woff(2)?|ttf|eot|otf)$/,
          type: 'asset/resource',
          generator: {
            filename: 'fonts/[name][ext]',
          },
        }
      ],
    },
  
    devServer: {
      static: path.resolve(__dirname, 'docs'),
      historyApiFallback: true, 
      open: true, 
      port: 8080,
      watchFiles: {
        paths: ['src/**/*.*'],
        options: {
          usePolling: true,
        },
      },
    },
  }
};
