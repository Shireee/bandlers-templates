import path from 'path';

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
    }
  }
};

export default config;