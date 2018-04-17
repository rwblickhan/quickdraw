import * as path from "path";
import * as webpack from "webpack";

const config: webpack.Configuration = {
    entry: path.resolve(__dirname, "client/index.js"),
    output: {
        path: path.resolve(__dirname, "public"),
        filename: "bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["react", "es2015"],
                    },
                },
            },
        ],
    },
};

export default config;
