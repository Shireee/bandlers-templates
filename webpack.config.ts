import path from 'path';
import 'webpack-dev-server';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const config = (env: any, argv: any) => {
  const isProduction = argv.mode === "production"
  
  return {
    entry: './src/index.tsx',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
    },
    module: {
      rules: [{test: /\.(ts|tsx)$/, use: 'ts-loader'},
              {test: /\.css$/, use: ['style-loader', 'css-loader']}]
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    devServer: {
      static: {
        directory: path.resolve(__dirname, './dist'),
      },
      historyApiFallback: true, // it allow us use routing
      open: true, // open browser when server started 
      hot: true, // enable Hot Module Replacement
      port: 8080,
    },
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, 'src', 'index.html'),
            to: path.resolve(__dirname, 'dist'),
          },
        ],
      }),
    ],
  }
};

export default config;
