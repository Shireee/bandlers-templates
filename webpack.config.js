const path = require('path');
const HtmlBundlerPlugin = require('html-bundler-webpack-plugin');

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';
    console.log(isProduction);

    return {
        output: {
            path: path.resolve(__dirname, 'docs'),
        },
        stats: isProduction
            ? {}
            : {
                  warnings: false,
                  performance: false,
              },
        performance: isProduction
            ? {}
            : {
                  hints: false,
                  maxAssetSize: 512000,
                  maxEntrypointSize: 512000,
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
                    filename: `${isProduction ? 'js/[name].js' : 'js/[name].[contenthash:8].js'}`,
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
                    use: [
                        'css-loader',
                        {
                            loader: 'sass-loader',
                            options: {
                                sassOptions: {
                                    outputStyle: 'expanded',
                                },
                            },
                        },
                    ],
                },
                {
                    test: /\.(png|svg|jpe?g|webp)$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: `${isProduction ? 'img/[name][ext]' : 'img/[name].[hash:8][ext]'}`,
                    },
                    use: [
                        {
                            loader: 'image-webpack-loader',
                            options: {
                                disable: !isProduction,
                                mozjpeg: {
                                    progressive: true,
                                    quality: 75,
                                },
                                optipng: {
                                    enabled: true,
                                },
                                pngquant: {
                                    quality: [0.65, 0.9],
                                    speed: 4,
                                },
                                gifsicle: {
                                    interlaced: false,
                                },
                                webp: {
                                    quality: 75,
                                },
                            },
                        },
                    ],
                },
                {
                    test: /\.(woff(2)?|ttf|eot|otf)$/,
                    type: 'asset/resource',
                    generator: {
                        filename: `${isProduction ? 'fonts/[name][ext]' : 'fonts/[name].[hash:8][ext]'}`,
                    },
                },
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
    };
};
