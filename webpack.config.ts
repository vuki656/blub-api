import path from 'path'

import { NormalModuleReplacementPlugin } from 'webpack'
import type { Configuration } from 'webpack'
import nodeExternals from 'webpack-node-externals'

const config: Configuration = {
    entry: './src/index.ts',
    externals: [
        nodeExternals(),
        nodeExternals({
            modulesDir: path.resolve(__dirname, './node_modules'),
        }),
    ] as Configuration['externals'],
    mode: 'production',
    module: {
        rules: [
            {
                exclude: /node_modules/u,
                loader: 'ts-loader',
                options: {
                    configFile: 'tsconfig.production.json',
                },
            },
        ],
    },
    optimization: {
        minimize: false,
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new NormalModuleReplacementPlugin(/type-graphql$/u, (resource) => {
            resource.request = resource.request.replace(/type-graphql/u, 'type-graphql/dist/browser-shim.js')
        }),
    ],
    resolve: {
        extensions: ['.ts', '.ts', '.js'],
    },
    target: 'node',
}

export default config
