const path = require("path");
const htmlwebpack = require("html-webpack-plugin");
const fastrefresh = require("@pmmmwh/react-refresh-webpack-plugin");

const isDev = process.env.NOVE_ENV !== "production";

module.exports = {
	mode: isDev ? "development" : "production",
	devtool: isDev ? "eval-source-map" : "source-map",
	entry: path.resolve(__dirname, "src", "index.jsx"),
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "bundle.js",
	},
	resolve: {
		extensions: [".js", ".jsx"],
	},
	devServer: {
		contentBase: path.resolve(__dirname, "public"),
		hot: true,
	},
	plugins: [
		isDev && new fastrefresh(),
		new htmlwebpack({
			template: path.resolve(__dirname, "public", "index.html"),
		}),
	].filter(Boolean),
	module: {
		rules: [
			{
				test: /\.jsx$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						plugins: [isDev && require.resolve("react-refresh/babel")].filter(Boolean),
					},
				},
			},
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				use: ["style-loader", "css-loader", "sass-loader"],
			},
		],
	},
};
