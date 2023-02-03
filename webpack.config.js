const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",

  devServer: {
    static: "./dist",
    watchFiles: ["src/"],
    hot: true,
  },
  target: "web",
  entry: "./src/index.ts",

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
  },

  // link JavaScript file to HTML file
  plugins: [new HtmlWebpackPlugin({ template: "./src/index.html" })],

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
      },
      {
        test: /\.(scss|sass|css)$/,
        use: [
          "style-loader", // create style nodes from JS strings
          "css-loader", // translate CSS into CommonJS
          "postcss-loader",
          {
            loader: `sass-loader`, // compile Sass to CSS
            options: {
              implementation: require("sass"), // use dart-sass
            },
          },
        ],
      },
    ],
  },

  resolve: {
    modules: ["node_modules"],
    extensions: [".ts", ".js"],
  },
};
