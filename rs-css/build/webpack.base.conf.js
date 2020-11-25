const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../dist'),
    assets: 'assets/',
};

module.exports = {
    externals: {
        paths: PATHS,
    },

    entry: {
        app: PATHS.src
    },

    output: {
        filename: `${PATHS.assets}js/[name].js`,
        path: PATHS.dist,
        publicPath: '/',
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: '/node_modules/',
        }, {
            test: /\.(png|jpg|gif|svg)$/,
            loader: 'file-loader',
            options: {
                name: '[name].[ext]',
            },
        }, {
            test: /(wav)$/,
            loader: 'file-loader',
            options: {
                outputPath: 'audio',
                name: '[name].[ext]',
            },
        }, {
            test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'file-loader',
            options: {
            name: '[name].[ext]',
            },
        }, {
            test: /\.css$/,
            use: [
                "style-loader",
                MiniCssExtractPlugin.loader,
                {
                    loader: "css-loader",
                    options: { sourceMap: true }
                },
                {
                loader: "postcss-loader",
                options: {
                    sourceMap: true,
                    config: { path: `./postcss.config.js` }
                    }
                }
            ]
        },
        {
            test: /\.scss$/,
            use: [
                'style-loader',
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: { sourceMap: true }
                },
                {
                    loader: 'resolve-url-loader',
                    options: {sourceMap: true}
                },
                {
                    loader: 'sass-loader',
                    options: { sourceMap: true, }
                },
                {
                    loader: 'postcss-loader',
                    options: { sourceMap: true, config: { path: './postcss.config.js' },}
                },
            ]
        }]
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: `${PATHS.assets}css/[name].css`,
        }),
        new CopyWebpackPlugin([
            { from: `${PATHS.src}/${PATHS.assets}img`, to: `${PATHS.assets}img` },
            { from: `${PATHS.src}/${PATHS.assets}fonts`, to: `${PATHS.assets}fonts` },
            { from: `${PATHS.src}/${PATHS.assets}audio`, to: `${PATHS.assets}audio` },
            { from: `${PATHS.src}/static`, to: '' },
        ]),
        new HtmlWebpackPlugin({
            template: `${PATHS.src}/index.html`,
            filename: './index.html',
        }),
    ],
};
