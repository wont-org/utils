import path from 'path'
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
// import rollupTypescript from 'rollup-plugin-typescript2'
import babel from '@rollup/plugin-babel';
// import pkg from 'package.json'
const pkg = {
    name: "zero-utils"
}

const extensions = ['.ts', '.js']

const paths = {
  input: path.join(__dirname, '/src/index.ts'),
  outputCJS: path.join(__dirname, '/lib/cjs'),
  outputES: path.join(__dirname, '/lib/es'),
  outputUMD: path.join(__dirname, '/lib/umd'),
}

const rollupConfig = {
    input: paths.input,
    // output: {
    //     file: path.join(paths.outputCJS, 'index.js'),
    //     format: 'cjs',
    //     name: pkg.name,
    // },
    output: [
        {
            file: path.join(paths.outputCJS, 'index.js'),
            format: 'cjs',
            name: pkg.name,
        },
        {
            file: path.join(paths.outputES, 'index.esm.js'),
            format: 'es',
            name: pkg.name,
        },
        {
            file: path.join(paths.outputUMD, 'index.umd.js'),
            format: 'umd',
            name: pkg.name,
        },
    ],
  external: [],
  plugins: [
    // rollupTypescript(),
    resolve({ extensions }),
    commonjs(),
    babel({
      exclude: 'node_modules/**',
      extensions,
    }),
  ],
}

export default rollupConfig
