// webpack 专用的配置文件
const path = require("path");
const VueLoader = require("vue-loader/lib/plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const resolve = (dir) => {
    return path.resolve(__dirname, dir)
}
module.exports = {
    mode: "development",
    entry: resolve("./src/main.js"),
    output: {
        filename: "bundle.js",
        path: resolve("./dist")
    },
    resolve: {
        extensions: [".js", ".vue"]
    },
    module: {
        rules: [
            {
                test: /\.js$/, 
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }, 
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ["vue-style-loader", "css-loader"]
            },
            {
                test: /\.vue$/,
                use: "vue-loader"
            }
        ]
    },
    plugins: [
        new VueLoader(),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: resolve("./public/index.html")
        })
    ]
}