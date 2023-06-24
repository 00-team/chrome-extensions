import Compression from 'compression-webpack-plugin'
import Copy from 'copy-webpack-plugin'
import CssMinimizer from 'css-minimizer-webpack-plugin'
import Html from 'html-webpack-plugin'
import CssExtract from 'mini-css-extract-plugin'
import { resolve } from 'path'
import TsPaths from 'tsconfig-paths-webpack-plugin'
import { Configuration } from 'webpack'

const BASE_DIR = resolve(__dirname)
const DIST_DIR = resolve(BASE_DIR, 'dist')
const PUBLIC_DIR = resolve(BASE_DIR, 'public')
const SRC_DIR = resolve(BASE_DIR, 'src')

var Config: Configuration = {
    entry: resolve(SRC_DIR, 'index.tsx'),
    output: {
        path: DIST_DIR,
        clean: true,
        filename: '[name].[contenthash].js',
        sourceMapFilename: 'source_maps/[file].map',
        assetModuleFilename: 'assets/[hash][ext][query]',
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: 'ts-loader',
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(s|)[ac]ss$/i,
                use: [
                    CssExtract.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: ['autoprefixer'],
                            },
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sassOptions: {
                                includePaths: [resolve(SRC_DIR, 'style')],
                            },
                        },
                    },
                ],
            },
        ],
    },
    devtool: 'source-map',
    plugins: [
        new Html({
            filename: resolve(DIST_DIR, 'index.html'),
            template: resolve(SRC_DIR, 'template.html'),
            inject: true,
            publicPath: './',
            minify: false,
        }),
        new CssExtract(),
        new Compression({ exclude: /\.(html)$/ }),
        new Copy({
            patterns: [{ from: PUBLIC_DIR, to: DIST_DIR }],
        }),
    ],
    resolve: {
        extensions: ['.mjs', '.tsx', '.ts', '.js'],
        plugins: [
            new TsPaths({ configFile: resolve(SRC_DIR, 'tsconfig.json') }),
        ],
    },
    optimization: {
        emitOnErrors: false,
        chunkIds: 'deterministic',
        minimize: true,
        minimizer: [new CssMinimizer()],
    },
}

type Args = {
    mode: 'none' | 'development' | 'production'
}

export default (_: unknown, args: Args) => {
    if (args.mode == 'development') {
        delete Config.optimization
        Config.watch = true
    }
    return Config
}
