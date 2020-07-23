import glob from 'glob';
import path from 'path';
import fs from 'fs';

// import rollupConfig from '../rollup.config'
// import { rollup } from 'rollup'

const entries = glob.sync('src/!(_)*/!(_)*.ts')
let importText = ''
let attrText = ''
const newLine = `\n`

// 拼装index.js文件
function addText(name) {
  importText += `${importText ? newLine : ''}import ${name} from './${name}/${name}'`
  attrText += `${attrText ? newLine : ''}${name},`
}
entries.forEach(files=> {
    const name = path.basename(path.dirname(files))
    addText(name)
})
const index = `${importText}\n
export default {
    ${attrText}
}`
// console.log('index content :>> ',index);
fs.writeFileSync('src/index.ts', index)

// const { input, output, plugins } = rollupConfig

// async function build (inputOpt, outputOpt) {
//     const bundle = await rollup(inputOpt)
//     await bundle.write(outputOpt)
// }

// const inputOpt = {
//     input,
//     plugins
// }
// build(inputOpt, output).then(res=> {
//     console.log('res :>> ', res);
// }).catch(err=> {
//     console.log('err :>> ', err, inputOpt, output);
// })
