const path = require('path');
const ContextReplacementPlugin = require("webpack/lib/ContextReplacementPlugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

function resolve(dir) {
    return path.join(__dirname, '..', dir);
}


module.exports = {
    mode: 'production',
    devtool: 'source-map',
    entry: {
        lib: resolve('dist/lib.js')
    },
    output: {
        filename: 'modul.cjs.js',
        libraryTarget: 'commonjs2', // change to 'module' when available https://github.com/webpack/webpack/issues/2933
        path: resolve('dist'),
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
    resolve: {
        extensions: ['.js', '.ts', '.html'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        },

    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader'
                }
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
