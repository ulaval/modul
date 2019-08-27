const StyleLintPlugin = require('stylelint-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const path = require("path");

function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    lintOnSave: false,
    runtimeCompiler: true,
    productionSourceMap: true,
    filenameHashing: false,
    baseUrl: process.env.NODE_ENV === 'production' ? 'https://contenu.monportail.ulaval.ca/mpo/packages/@ulaval/modul-website/website/' : '/',
    chainWebpack: config => {
        config.module.rules.delete("svg");
        config.module.rules.delete("scss");
    },

    configureWebpack: {
        output: {
            filename: "app.js"
        },
        plugins: [
            new StyleLintPlugin({
                configFile: '.stylelintrc',
                emitErrors: true
            }),
            new CompressionPlugin()
        ],
        module: {
            rules: [{
                test: /\.js$/,
                use: ["source-map-loader"],
                enforce: "pre"
            },
            {
                enforce: 'pre',
                test: /\.scss$/,
                loader: "sass-loader",
                options: {
                    sourceMap: true,
                    includePaths: ["../../node_modules/@ulaval/modul-components/dist/styles"]
                }
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
                test: /.html$/,
                loader: "vue-template-loader",
                exclude: resolve('public/index.html'),
                options: {
                    scoped: true
                }
            },
            {
                test: /\.svg$/,
                loader: 'svg-inline-loader',
                exclude: /(logo-ul|grid|brain|castle|square-and-pen)\.svg$/,
                options: {
                    removeTags: true,
                    removingTags: ['desc', 'defs', 'style'],
                    removeSVGTagAttrs: true
                }
            },
            {
                test: /(logo-ul\.svg|grid\.svg|brain\.svg|castle\.svg|square-and-pen\.svg|\.png)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000
                }
            },
            {
                test: /\.ts$/,
                enforce: 'pre',
                loader: 'tslint-loader',
                include: [/src/],
                options: {
                    configFile: 'tslint.json',
                    formatter: 'grouped',
                    formattersDirectory: '../../node_modules/custom-tslint-formatters/formatters',
                    emitErrors: true
                }
            }
            ]
        },
    },
};
