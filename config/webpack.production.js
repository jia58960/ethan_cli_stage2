var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    output: {
        filename: "scripts/[name].[contenthash:5].bundles.js"
    },
    plugins: [
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                preset: ['default', {
                    discardComments: {
                        removeAll: true
                    }
                }],
            },
            canPrint: true
        })
    ]
}