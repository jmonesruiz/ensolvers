import webpack from "webpack";
import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";

const SRC_DIR = path.resolve("src");
const OUTPUT_DIR = path.resolve("dist");

const defaultInclude = [SRC_DIR];

export default {
	entry: SRC_DIR + "/index.js",
	mode: "development",
	output: {
		path: OUTPUT_DIR,
		publicPath: "/",
		filename: "bundle.js",
	},
	module: {
		rules: [
			{
				test: /\.s[ac]ss$/i,
				use: [
					{ loader: "style-loader" },
					{ loader: "css-loader" },
					{ loader: "sass-loader" },
				],
				include: defaultInclude,
			},
			{
				test: /\.jsx?$/,
				use: [{ loader: "babel-loader" }],
				include: defaultInclude,
				resolve: {
					fullySpecified: false,
				},
			},
			{
				test: /\.(jpe?g|png|gif)$/,
				type: "asset/resource",
				include: defaultInclude,
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2)$/,
				type: "asset/inline",
				include: defaultInclude,
			},
		],
	},
	target: "web",
	plugins: [
		new HtmlWebpackPlugin({
			title: "Ensolvers | To do",
			template: path.resolve("public/index.html"),
			inject: "body",
		}),
		new webpack.DefinePlugin({
			"process.env.NODE_ENV": JSON.stringify("development"),
		}),
	],
	stats: {
		colors: true,
		children: false,
		chunks: false,
		modules: false,
	},
	devtool: "cheap-source-map",
	devServer: {
		static: {
			directory: OUTPUT_DIR,
		},
		historyApiFallback: { index: "/" },
		devMiddleware: {
			stats: {
				colors: true,
				chunks: false,
				children: false,
			},
		},
	},
};
