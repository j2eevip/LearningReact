let webpack = require('webpack'),
    config = require('./webpack.base.conf'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    BrowserSyncPlugin = require('browser-sync-webpack-plugin'),
    PurifyCSSPlugin = require('purifycss-webpack'),
    SOURCE_MAP = false;
let path = require('path');
let glob = require('glob');
const extractTextPlugin = new ExtractTextPlugin({
    filename: '[name].css',
    disable: false,
    allChunks: true
});
config.output.filename = '[name].js';
config.output.chunkFilename = '[id].js';

config.devtool = SOURCE_MAP ? 'eval-source-map' : false;

// add hot-reload related code to entry chunk
config.entry.app = [
    'eventsource-polyfill',
    'webpack-hot-middleware/client?reload=true',
    'webpack/hot/only-dev-server',
    config.entry.app
];

config.output.publicPath = '/';

// 开发环境下直接内嵌 CSS 以支持热替换
config.module.loaders.push({
    test: /\.css$/,
    loader: 'style!css'
}, {
    test: /\.less$/,
    loader: 'style!css!less'
}, {
    test: /\.scss$/,
    loader: 'style!css!sass',
    exclude: path.resolve(__dirname,"../src/assets/scss"),//styles文件夹是全局样式，不对全局样式进行CSS模块化
    use: extractTextPlugin.extract({
        fallback: "style-loader",
        use:  [
            {
                loader: "css-loader",
                options: {
                    modules: true,
                    localIdentName: "MODULES-[hash:base64:5]"//设置className打包后都以Modules为前缀
                }
            },
            {
                loader: "sass-loader"
            },
            {
                loader: "sass-resources-loader",
                options: {
                    resources: path.resolve(__dirname,'../src/styles/variable.scss')//指定全局样式文件，定义了一些变量以及函数
                }
            }
        ]
    })
});

config.plugins.push(
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin("css/[name].[contenthash:5].css"),
    new PurifyCSSPlugin({
        //用来指定清除无效CSS的html文件，这里是单页应用，就指定首页index.html
        paths: glob.sync(path.resolve(__dirname,'../src/index.html')),
        //这里设置为scss是因为项目样式都是用scss写的
        styleExtensions: ['.scss'],
        purifyOptions: {
            //这个选项主要是针对CSS模块化开启白名单的，这里就设置了以MODULES为前缀的className
            whitelist: ['*MODULES*']
        }
    }),
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: config.commonPath.indexHTML,
        chunksSortMode: 'none'
    }),
    new BrowserSyncPlugin({
        host: '127.0.0.1',
        port: 9090,
        proxy: 'http://127.0.0.1:9000/',
        logConnections: false,
        notify: false
    }, {
        reload: false
    })
);

module.exports = config;
