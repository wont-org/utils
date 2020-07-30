import path from 'path'
import glob from 'glob'
import fs from 'fs'
import { rollup } from 'rollup'
import { removeSync } from 'fs-extra'
import rollupConfig from '../rollup.config'

class Build {
    state = {
        inputs: glob.sync('src/!(_)*/!(_)*.ts'),
        umdInputScript: '',
        esInputScript: '',
        lib: 'lib',
        umdInputFile: 'src/index.ts',
        esOutputFile: 'lib/es/index.js',
        desc: '// 此文件是脚本自动生成，请勿在此修改\n\n',
    }

    checkEntry() {
        const { inputs, lib } = this.state
        if (inputs.length === 0) {
            throw new Error('没有可构建的文件~')
        } else {
            removeSync(lib)
            this.genIndex()
        }
    }

    genIndex() {
        const { inputs } = this.state
        inputs.forEach((files) => {
            const name = path.basename(path.dirname(files))
            this.state.umdInputScript += `export { ${name} } from './${name}/${name}'\n`
            this.state.esInputScript += `export { ${name} } from './${name}'\n`
        })
    }

    async build(config) {
        const { output } = config
        const bundle = await rollup(config)
        await bundle.write(output)
    }

    async render() {
        this.checkEntry()

        const {
            umdInputFile,
            esOutputFile,
            umdInputScript,
            esInputScript,
            desc,
        } = this.state

        fs.writeFileSync(umdInputFile, desc + umdInputScript)

        await Promise.all(
            rollupConfig.map(async (config) => {
                await this.build(config)
            }),
        )
            .then(() => {
                fs.writeFileSync(esOutputFile, desc + esInputScript)
            })
            .catch((err) => {
                console.log('Build render error :>> ', err)
            })
    }
}

new Build().render()
