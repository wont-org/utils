import path from 'path'
import glob from 'glob'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json'
import typescript from 'rollup-plugin-typescript2'
import babel from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'

import { name } from './package.json'

const extensions = ['.ts', '.js']
const singleFileInput = {}

glob.sync('src/!(_)*/!(_)*.ts').forEach((files) => {
    const fileName = path.basename(path.dirname(files))
    singleFileInput[fileName] = files
})

const paths = {
    singleFileInput,
    input: 'src/index.ts',
    outputCJS: path.join(__dirname, '/lib/cjs'),
    outputES: path.join(__dirname, '/lib/es'),
    outputUMD: path.join(__dirname, '/lib/umd'),
    outputIIFE: path.join(__dirname, '/lib/iife'),
}

const globals = {
    lodash: 'lodash',
}

function genPlugins(options?) {
    const { useTerser = false, genDts = false } = options || {}
    const plugins = [
        json(),
        resolve({
            extensions,
        }),
        commonjs(),
        typescript({
            tsconfig: './tsconfig.es.json',
            tsconfigOverride: {
                compilerOptions: {
                    declaration: genDts,
                },
            },
        }),
        babel({
            exclude: 'node_modules/**',
            extensions,
        }),
        useTerser ? terser() : null,
    ]
    return plugins
}

const rollupConfig = [
    {
        input: paths.singleFileInput,
        output: {
            dir: paths.outputES,
            format: 'esm',
        },
        external: ['lodash'],
        plugins: genPlugins({ genDts: true }),
    },
    {
        input: paths.input,
        output: {
            file: `${paths.outputUMD}/index.js`,
            format: 'umd',
            name,
            globals,
        },
        external: ['lodash'],
        plugins: genPlugins(),
    },
    {
        input: paths.input,
        output: {
            file: `${paths.outputUMD}/index.min.js`,
            format: 'umd',
            name,
            globals,
        },
        external: ['lodash'],
        plugins: genPlugins({ useTerser: true }),
    },
]

export default rollupConfig
