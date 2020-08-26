import { exec } from 'child_process'
import $ from 'dekko'
import glob from 'glob'
import path from 'path'

const fnNames = glob
    .sync('src/!(_)*/!(_)*.ts')
    .map((file) => path.basename(path.dirname(file)))

function testPackages() {
    $('lib').isDirectory().hasDirectory('es').hasDirectory('umd')
    $('lib/umd')
        .hasFile('index.d.ts')
        .hasFile('index.js')
        .hasFile('index.min.js')
    $('lib/es').hasFile('index.d.ts').hasFile('index.js')

    fnNames.forEach((name) => {
        $('lib/es').hasFile(`${name}.js`)
    })
}

async function buildPackages() {
    await new Promise((resolve) => {
        exec('npm run build', (e) => {
            if (e) {
                console.log(e)
                process.exit(1)
            }
            resolve()
        })
    })
}

async function execGlobalSetup() {
    try {
        await buildPackages()
        testPackages()
    } catch (e) {
        console.log(e)
        process.exit(1)
    }
}
export default execGlobalSetup
