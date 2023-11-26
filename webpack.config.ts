import path from 'path';
import 'webpack-dev-server';

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
      // it allow us use routing
      historyApiFallback: {
        index: 'index.html'
      },
      open: true, // open browser when server started 
      hot: true, // enable Hot Module Replacement
      port: 8080,
    }
  }
};

export default config;