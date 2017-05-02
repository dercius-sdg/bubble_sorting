const path=require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const cssExtractPlugin= new ExtractTextPlugin('../css/build.css');
const scssExtractPlugin= new ExtractTextPlugin('../css/build.css');

module.exports=
    {
        context:path.resolve(__dirname,"dist/js"),
        entry:
            {
                build:'./build'
            },
        output:
            {
                path:path.resolve(__dirname,"public/js"),
                filename:'[name].js'
            },
        resolve:
            {
                extensions:[".js",".css",".scss"]
            },
        watch:true,
        watchOptions:
            {
                aggregateTimeout:500,
                ignored:'/node_modules/'
            },
        module:
            {
                rules:
                [
                    {
                        test:/\.scss$/,
                        use: scssExtractPlugin.extract({
                            fallback: "style-loader",
                            use: [
                                    {
                                        loader: 'css-loader',
                                        options: {
                                            importLoaders: 1
                                        }
                                    },
                                    {
                                        loader: 'postcss-loader',
                                        options: {
                                            plugins: function () {
                                                return [
                                                    require('autoprefixer')
                                                ];
                                            }
                                        }
                                    },
                                    'sass-loader'
                                ]
                                //["css-loader","sass-loader"]
                        })
                    },
                    {
                        test:/\.css$/,
                        use: cssExtractPlugin.extract({
                            fallback: "style-loader",
                            use: "css-loader"
                        })
                    }
                ]
            },
        plugins:
        [
            cssExtractPlugin,
            scssExtractPlugin
        ]
    }