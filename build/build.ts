import path from 'path';
import glob from 'glob';
import fs from 'fs';
import rollupConfig from '../rollup.config'
import { rollup } from 'rollup'
import { removeSync } from 'fs-extra'

class Build {
    state = {
        entries: glob.sync('src/!(_)*/!(_)*.ts'),
        entryStr: '',
        lib: 'lib',
        umdInput: 'src/index.ts',
        esOutput: 'lib/es/index.js',
        desc: '// 此文件是脚本自动生成，请勿在此修改\n\n',
    }

    checkEntry() {
        const { entries, lib } = this.state
        if (entries.length===0) {
            throw new Error(`没有可构建的文件~`)
        } else {
            removeSync(lib)
        }
    }

    genIndex(output: string) {
        let { entries, desc, entryStr } = this.state

        entries.forEach(files => {
            const name = path.basename(path.dirname(files))
            entryStr += `export { ${name} } from './${name}/${name}'\n`
        })

        const result = desc + entryStr

        this.writeIndex(output, result)
    }

    writeIndex(dist: string, content: string) {
        fs.writeFileSync(dist, content)
    }

    async build(config) {
        const { output } = config
        const bundle = await rollup(config)
        await bundle.write(output)
    }

    async render() {
        this.checkEntry()

        const { esOutput, umdInput } = this.state

        this.genIndex(umdInput)

        await Promise.all(
            rollupConfig.map(async config => {
                await this.build(config)
            })
        ).then(()=> {
            this.genIndex(esOutput)
        }).catch(err=> {
            console.log('Build render error :>> ', err);
        })
    }
}

new Build().render()
