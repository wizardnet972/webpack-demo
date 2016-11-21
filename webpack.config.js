var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HTMLWebpackPlugin = require('html-webpack-plugin');

const PRODUCATION = process.env.NODE_ENV == 'producation';
const DEVELOPMENT = process.env.NODE_ENV == 'development';

var entry = PRODUCATION
    ? ['./src/index.js']
    : [
        './src/index.js',
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://localhost:8080'
    ];
var plugins = PRODUCATION
    ? [
        new HTMLWebpackPlugin({
            template: 'index-template.html'
        }),
        new ExtractTextPlugin('styles.css'),
        new webpack.optimize.UglifyJsPlugin()
        // ({
        //     comment: true,
        //     mangle:false,
        //     compress: {
        //         warnings: true
        //     }
        // })
    ]
    : [new webpack.HotModuleReplacementPlugin()];

plugins.push(
    new webpack.DefinePlugin({
        DEVELOPMENT: JSON.stringify(DEVELOPMENT),
        PRODUCATION: JSON.stringify(PRODUCATION)
    })
)

const cssIdentifier = PRODUCATION ? '[hash:base64:10]' : '[path][name]---[local]';

const cssLoader = PRODUCATION
    ? ExtractTextPlugin.extract({
        loader: 'css-loader?localIdentName=' + cssIdentifier
    })
    : ['style-loader', 'css-loader?localIdentName=' + cssIdentifier];

module.exports = {
    externals: {
        'jquery': 'jQuery' //not include in bundle. gloabl var as window.jquery.
        
    },
    devtool: 'source-map',
    entry: entry,
    plugins: plugins,
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['babel-loader'],
            exclude: '/node_modules/'
        },
        {
            test: /\.css$/,
            loaders: cssLoader,
            exclude: '/node_modules/'
        },
        {
            test: /\.(png|jpg|gif)$/,
            loaders: ['url-loader?limit=1000&name=images/[hash:12].[ext]'],
            exclude: '/node_modules/'
        }]
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: PRODUCATION ? '/' : '/dist/',
        filename: PRODUCATION ? 'bundle.[hash:12].min.js' : 'bundle.js'
    }
}