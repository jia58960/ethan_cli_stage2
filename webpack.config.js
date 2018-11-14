const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const chalk = require('chalk')
var WebpackBuildNotifierPlugin = require('webpack-build-notifier');
var ProgressBarPlugin = require('progress-bar-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
var setIterm2Badge = require('set-iterm2-badge');
var argv = require('yargs-parser')(process.argv.slice(2))
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin')
var loading = {
    html: '加载中...'
}
const _currentMode = argv.mode
const merge = require('webpack-merge')
const _envConfig = require(`./config/webpack.${_currentMode}.js`)
console.log("当前环境：" + _currentMode)
const _isProdEnv = _currentMode === "production"
// var env = _currentMode;
setIterm2Badge(_currentMode);
// const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
// const smp = new SpeedMeasurePlugin();
const commonConfig = {
    module: {
        rules: [{
            test: /\.css$/,
            use: [{
                    loader: MiniCssExtractPlugin.loader
                },
                {
                    loader: 'css-loader',
                    options: {
                        modules: true,
                        localIdentName: '[path][name]__[local]--[hash:base64:5]'
                    }
                }
            ]
        }, {
            test: /\.(gif|png|jpe?g|svg)$/i,
            use: [
                'file-loader',
                {
                    loader: 'image-webpack-loader',
                    options: {
                        mozjpeg: {
                            progressive: true,
                            quality: 65
                        },
                        // optipng.enabled: false will disable optipng
                        optipng: {
                            enabled: false,
                        },
                        pngquant: {
                            quality: '65-90',
                            speed: 4
                        }
                    }
                }
            ]
        }]
    },
    optimization: {
        noEmitOnErrors: false, // 遇到错误时不停止编译，将错误信息吐出到页面
        splitChunks: {
            cacheGroups: {
                commons: {
                    chunks: 'initial',
                    name: 'common',
                    minChunks: 2, // 至少被两个模块引用，但webpack默认会限制小于30KB也不会单独抽离出来
                    maxInitialRequests: 5,
                    minSize: 0 // 文件最小不为0
                }
            }
        },
        runtimeChunk: { // webpack运行时单独抽离出来,这是webpack最核心的代码，必须第一个加载。用老袁的话讲比jquery还jquery
            name: 'runtime'
        }
    },
    devServer: {
        before(app) {
            app.get("/api/test", (req, res) => {
                res.json({
                    code: 200,
                    message: "Hello World"
                });
            });
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            title: 'ethan webpack',
            loading,
            minify: {
                removeComments: _isProdEnv,
                collapseWhitespace: _isProdEnv
            } // 线上环境压缩
        }),
        new InlineManifestWebpackPlugin('runtime'), // 与下面的smp.wrap冲突
        new MiniCssExtractPlugin({
            filename: _isProdEnv ? 'styles/[name].[contenthash:5].css' : 'styles/[name].css',
            chunkFilename: _isProdEnv ? 'styles/[id].[contenthash:5].css' : 'styles/[id].css'
        }),
        new ProgressBarPlugin({
            format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
            clear: false
        }),
        new CleanWebpackPlugin('dist'),
        new WebpackBuildNotifierPlugin({
            title: "Webpack Ethan Cli",
            logo: "./favicon.ico",
            suppressSuccess: true
        }),
    ]
}
/* 加了耗时插件 上面的 InlineManifestWebpackPlugin('runtime') 会报错
module.exports = smp.wrap(
    merge(commonConfig, _envConfig)
) */
module.exports = merge(commonConfig, _envConfig)
