import pkg from "./package.json";

import path from 'path'
import ts from "rollup-plugin-ts";

import resolve from 'rollup-plugin-node-resolve'
import filesize from 'rollup-plugin-filesize'

import externalDep from 'rollup-plugin-peer-deps-external'
import { terser } from 'rollup-plugin-terser'

import postcss from 'rollup-plugin-postcss'

const  isDev = process.env.NODE_ENV === 'dev',
    isProd = !isDev,
    extensions = ['.js', '.ts','.tsx']

export default {
    input: "src/index.tsx",
    output: [
        {
            file: pkg.main,
            format: "cjs",
            sourcemap: false
        },
        {
            file: pkg.module,
            format: "esm",
            sourcemap: false
        }
    ],
    plugins: [
        resolve({
            browser: true,
            extensions
        }),
        postcss({
            extract: path.resolve('dist/style.css')
        }),
        externalDep(),
        ts({
            hook: {
                outputPath: (path) => path.replace(/\.esm\.d|\.cjs\.d/g, '.d')
            },
            transpiler: "babel",
            browserslist: ["> 0.25%, ie 11, not op_mini all, not dead"],
            babelConfig: {
                presets: [
                    [
                        '@babel/preset-env',
                        {
                            bugfixes: true,
                            modules: false,
                            targets: { browsers: '> 0.25%, ie 11, not op_mini all, not dead' }
                        }
                    ],
                    '@babel/preset-react',
                    '@babel/preset-typescript'
                ]
            },
            exclude: ["node_modules/**/*.*"]
        }),
        isProd ? terser() : null,
        filesize(),
    ]
};