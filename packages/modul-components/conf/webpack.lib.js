const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const nodeExternals = require('webpack-node-externals');
function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

module.exports = {
    devtool: 'source-map',
    mode: 'development',
    entry: {
        modul: resolve('src/lib.ts'),
        fr: resolve('src/lang/fr.ts'),
        en: resolve('src/lang/en.ts'),
        sprites: resolve('src/utils/svg/default-sprites.ts'),
        rte: resolve('src/components/rich-text-editor/rich-text-editor.ts'),
        phonefield: resolve('src/components/phonefield/phonefield.ts'),


    },
    output: {
        path: resolve('lib'),
        filename: '[name].js',
        libraryTarget: 'commonjs2', // change to 'module' when available https://github.com/webpack/webpack/issues/2933
        library: ['modulComponents', '[name]'],
        publicPath: '/dist/'
    },
    externals: [
        nodeExternals(),
        nodeExternals({
            modulesDir: resolve('../../node_modules') // taken from https://github.com/liady/webpack-node-externals/issues/39
        })],


    // there a bug in mini-css-exptract plugin that make chunck not working well using a common chunks
    // https://github.com/webpack-contrib/mini-css-extract-plugin/pull/305
    // hopefully this will be fixed in webpack 5
    // optimization: {
    //     splitChunks: {
    //         name: 'modul',
    //         chunks: 'all',
    //         // cacheGroups: {
    //         //     styles: {
    //         //         name: 'styles',
    //         //         test(module, chunks) {
    //         //             //console.log('module = ' + module.resource);
    //         //             return module.constructor.name === 'CssModule';
    //         //         },
    //         //         chunks: 'all',
    //         //         priority: 1,
    //         //         minChunks: 1,
    //         //         reuseExistingChunk: true,
    //         //         enforce: true,
    //         //     },
    //         // },
    //     }
    // },
    resolve: {
        extensions: ['.js', '.ts', '.html'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        },

    },
    module: {
        rules: [
            // Uncomment to include babel polyfills
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
    performance: {
        hints: false
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].min.css',
            chunkFilename: '[name].min.css',
            ignoreOrder: false
        })
    ]
};
