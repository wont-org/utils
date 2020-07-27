import path from 'path';
import glob from 'glob';
import fs from 'fs';
import rollupConfig from '../rollup.config'
import { rollup } from 'rollup'

class Build {
    state = {
        entries: glob.sync('src/!(_)*/!(_)*.ts'),
        entryStr: '',
    }

    genIndex() {
        let { entryStr, entries } = this.state

        entries.forEach(files => {
            const name = path.basename(path.dirname(files))
            entryStr += `export { ${name} } from './${name}/${name}'\n`
        })

        fs.writeFileSync('src/index.ts', entryStr)
    }

    async build(config) {
        const { output } = config
        const bundle = await rollup(config)
        await bundle.write(output)
    }

    render() {
        this.genIndex()
        rollupConfig.forEach(async config => {
            await this.build(config)
        })
    }
}

new Build().render()
