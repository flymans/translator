const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');

const config = {
    entry: './src/index.js',
    output: {
        path: resolve(__dirname, 'public'),
        filename: 'index-bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
        new ESLintWebpackPlugin(),
    ],

    resolve: {
        alias: {
            api: resolve(__dirname, 'src/api/'),
            assets: resolve(__dirname, 'src/assets/'),
            components: resolve(__dirname, 'src/components/'),
        },
    },
};

module.exports = config;
