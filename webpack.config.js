var webpack = require('webpack');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
module.exports = {
    entry: "./src/Main.js",

    output: {
        filename: "bundle.js",
        path: __dirname + "/build",
    },

    watch: true,
    plugins: [
        new BrowserSyncPlugin({
            host: process.env.IP || 'localhost',
            port: process.env.PORT || 3000,
            server: {
                baseDir: ['./', './build']
            }
        })],
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".png", ".svg", ".jpg", ".jpeg", ".gif", ".json"]
    },
    module: {
        loaders: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            {
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader"
            },
            // All images will be handled by 'image-webpack'
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'file?hash=sha512&digest=hex&name=[hash].[ext]',
                    'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            },
            {
                test: /\.(mp3|ogg|json)$/,
                loaders: [
                    'file?hash=sha512&digest=hex&name=[hash].[ext]'
                ]
            }
        ],

        preLoaders: [
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {test: /\.js$/, loader: "source-map-loader"}
        ]
    },

    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    },
    externals: {
        phaser: "Phaser",
    },

    devtool: "source-map",
};
