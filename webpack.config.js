const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
    entry: './src/index.js',
    output: {
        path: resolve(__dirname, '/public'),
        filename: 'index-bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader', 'eslint-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    resolve: {
        alias: {
            api: resolve(__dirname, 'src/api/'),
            assets: resolve(__dirname, 'src/assets/'),
            components: resolve(__dirname, 'src/components/')
        }
    }
};

module.exports = config;
