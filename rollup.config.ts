import path from 'path'
import glob from 'glob'
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import { terser } from "rollup-plugin-terser";
import babel from '@rollup/plugin-babel';

import { name } from './package.json'

const extensions = ['.ts', '.js']
let singleFileInput = {}

glob.sync('src/!(_)*/!(_)*.ts').forEach(files => {
    const name = path.basename(path.dirname(files))
    singleFileInput[name] = files
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
    lodash: 'lodash'
}

const plugins = [
    json(),
    resolve({
        extensions
    }),
    commonjs(),
    babel({
        exclude: 'node_modules/**',
        extensions,
    }),
]

const rollupConfig = [
    {
        input: paths.singleFileInput,
        output:
        {
            dir: paths.outputCJS,
            format: 'cjs',
            // chunkFileNames: `${paths.outputCJS}/[name].js`, // 指定dir时可以忽略
        },
        external: ['lodash'],
        plugins: [
            ...plugins,
            terser(),
        ],
    },
    {
        input: paths.singleFileInput,
        output:
        {
            dir: paths.outputES,
            format: 'es',
        },
        external: ['lodash'],
        plugins: [
            ...plugins,
        ],
    },
    {
        input: paths.input,
        output:
        {
            dir: paths.outputIIFE,
            format: 'iife',
            name,
            globals,
        },
        external: ['lodash'],
        plugins: [
            ...plugins,
        ],
    },
    {
        input: paths.input,
        output:
        {
            dir: paths.outputUMD,
            format: 'umd',
            name,
            globals,
        },
        external: ['lodash'],
        plugins: [
            ...plugins,
        ],
    }
]

export default rollupConfig
