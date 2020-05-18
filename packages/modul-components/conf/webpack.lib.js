const path = require('path');
const ContextReplacementPlugin = require("webpack/lib/ContextReplacementPlugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

function resolve(dir) {
    return path.join(__dirname, '..', dir);
}


module.exports = {
    devtool: 'source-map',
    mode: 'development',
    entry: {
        lib: resolve('src/lib.ts')
    },
    output: {
        path: resolve('lib'),
        filename: 'modul.js',
        libraryTarget: 'commonjs2', // change to 'module' when available https://github.com/webpack/webpack/issues/2933
        library: 'modulComponents',
        publicPath: '/dist/'
    },
    externals: {
        vue: {
            commonjs: 'vue',
            commonjs2: 'vue',
            amd: 'vue',
            root: 'Vue'
        }
    },
    // optimization: {
    //     splitChunks: {
    //         cacheGroups: {
    //             polyfills: {
    //                 filename: 'polyfills.js',  // Extract polyfills from distribution
    //                 test: /core-js-pure/,
    //                 chunks: 'initial',
    //             },
    //         },
    //     },
    // },
    resolve: {
        extensions: ['.js', '.ts', '.html'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        },

    },
    module: {
        rules: [
            // {
            //     test: /\.m?js$/,
            //     exclude: /(node_modules)/,
            //     use: {
            //         loader: 'babel-loader'
            //     }
            // },
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                options: {
                    transpileOnly: true,
                    configFile: resolve('tsconfig.lib.json')
                },
            },
            {
                enforce: 'post',
                test: /\.(css|scss)$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader
                }, 'css-loader']
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: 'postcss-loader',
                    options: {
                        sourceMap: true,
                        plugins: function () {
                            return [
                                require('autoprefixer')
                            ];
                        }
                    }
                }, {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true,
                        includePaths: ['./src/styles']
                    }
                }]
            },
            {
                test: /\.html$/,
                loader: 'vue-template-loader',
                options: {
                    scoped: true
                }
            },
            {
                test: /\.svg$/,
                loader: 'svg-inline-loader',
                options: {
                    removeTags: true,
                    removingTags: ['desc', 'defs', 'style'],
                    removeSVGTagAttrs: true
                }
            },
        ]
    },
    // experiments: {
    //     outputModule: true,
    // },
    performance: {
        hints: false
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'modul.min.css',
            ignoreOrder: false
        }),
        new ContextReplacementPlugin(
            /moment[\/\\]locale$/,
            /en-ca|fr-ca/
        )
    ]
};
