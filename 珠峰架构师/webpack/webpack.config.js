const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
    mode: "development",
    // entry: {
    //     index: "./src/index.js",
    //     common: "./src/common.js",
    // },
    entry: "./src/index.js",
    output: {
        path: path.join(__dirname, "dist"), // 输出的目录只能是绝对目录
        filename: "[name].[hash:8].js",
        publicPath: "/"  // 根路径
    },
    // 如果使用了devServer， 那么产生的文件都会写到内存中，不会写到硬盘上
    devServer: {
        contentBase: path.join(__dirname, "dist"), // 产出文件的根目录
        port: 8080,
        host: "localhost",
        // compress: true
    },
    module: {
        rules: [
            {
                test: /\.css$/, 
                use: [MiniCssExtractPlugin.loader,"css-loader"]
            },
            {
                test: /\.(jpg|png|gif|jpeg|svg)$/,
                use: [
                    {
                        // url-loader内置了file-loader
                        loader: "url-loader",
                        options: {  // 如果要加载的图片大小小于10k的话，就转换为base64
                            // esModule: false,
                            limit: 10*1024
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html",
            hash: true,  // 为了避免缓存，可以在插入的资源后面添加hash值
            chunks: ["main"],
            chunksSortMode: "manual"
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].css",  // name是代码块chunk的名称
            chunkFilename: "[id].css"  // 在异步加载的时候用的
        })
    ]

}