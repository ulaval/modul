const path = require('path');
const ContextReplacementPlugin = require("webpack/lib/ContextReplacementPlugin");

function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    entry: {
        lib: resolve('src/lib.ts')
    },
    output: {
        filename: 'modul.esm.js',
        libraryTarget: 'umd',
        path: resolve('dist'),
        library: 'modulComponents'
    },
    externals: {
        vue: {
            commonjs: 'vue',
            commonjs2: 'vue',
            amd: 'vue',
            root: 'Vue'
        }
    },
    resolve: {
        extensions: ['.js', '.ts', '.html'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        },

    },
    module: {
        rules: [
            {
                enforce: 'post',
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                enforce: 'post',
                test: /\.scss$/,
                use: ['style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            plugins: function () {
                                return [
                                    require('autoprefixer')
                                ];
                            }
                        }
                    }
                ]
            },
            {
                enforce: 'pre',
                test: /\.scss$/,
                loader: 'sass-loader',
                options: {
                    sourceMap: true,
                    includePaths: ['./src/styles']
                }
            },
            {
                test: /\.html$/,
                loader: 'vue-template-loader',
                options: {
                    scoped: true
                }
            },
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: 'thread-loader',
                        options: {
                            workers: require('os').cpus().length - 1
                        }
                    },
                    {
                        loader: 'ts-loader',
                        options: {
                            configFile: resolve('tsconfig.lib.json'),
                            happyPackMode: true
                        }
                    }
                ]
            },
            {
                test: /\.svg$/,
                loader: 'svg-inline-loader',
                options: {
                    removeTags: true,
                    removingTags: ['desc', 'defs', 'style'],
                    removeSVGTagAttrs: true
                }
            }
        ]
    },
    performance: {
        hints: false
    },
    plugins: [
        new ContextReplacementPlugin(
            /moment[\/\\]locale$/,
            /en-ca|fr-ca/
        )
    ]
};
