/* global process __dirname */
const DEV = process.env.NODE_ENV !== 'production';

const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require( 'terser-webpack-plugin' );
const ManifestPlugin = require('webpack-manifest-plugin');

const appPath = __dirname;

// Assets path
const assetsPath = './resources';
const publicPath = `${appPath}/public`;

// Separate functionality
const entry = `${assetsPath}/application.js`;

// Outputs
const outputJs = 'js/[name]-[hash].js';
const outputCss = 'css/[name]-[hash].css';
const outputFile = '[name].[ext]';

const allModules = {
	rules: [
		{
			test: /\.(js|jsx)$/,
			exclude: /node_modules/,
			use: 'babel-loader',
		},
		{
			test: /\.json$/,
			exclude: /node_modules/,
			use: 'file-loader',
		},
		{
			test: /\.(scss|css)$/,
			exclude: /node_modules/,
			use: [
				MiniCssExtractPlugin.loader,
				'css-loader', 'postcss-loader', 'sass-loader',
			],
		},
	],
};

const allPlugins = [
	new CleanWebpackPlugin(),

	new MiniCssExtractPlugin({
		filename: outputCss,
	}),

	new webpack.DefinePlugin({
		'process.env': {
			NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
		},
	}),

	// Create manifest.json file.
	new ManifestPlugin({
		seed: {},
	}),
];

const allOptimizations = {
	runtimeChunk: false,
	splitChunks: {
		cacheGroups: {
			commons: {
				test: /[\\/]node_modules[\\/]/,
				name: 'vendors',
				chunks: 'all',
			},
		},
	},
};

if (!DEV) {
	allOptimizations.minimizer = [
		new TerserPlugin({
			cache: true,
			parallel: true,
			sourceMap: true,
		}),
	];
}

module.exports = [

	// Skin
	{
		context: path.join(__dirname),

		entry: {
			application: [entry],
		},

		output: {
			path: publicPath,
			publicPath: '',
			filename: outputJs,
		},

		externals: {
			jquery: 'jQuery',
		},

		optimization: allOptimizations,

		module: allModules,

		plugins: allPlugins,

		devtool: DEV ? 'source-map' : '',
	},
];
