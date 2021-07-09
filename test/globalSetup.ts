import { execSync } from 'child_process'
import $ from 'dekko'
import glob from 'glob'
import path from 'path'

const fnNames = glob
    .sync('src/!(_)*/!(_)*.ts')
    .map((file) => path.basename(path.dirname(file)))

function testPackages() {
    $('lib').isDirectory()
    $('es').isDirectory()

    fnNames.forEach((name) => {
        $('lib').hasFile(`${name}/index.js`)
        $('lib').hasFile(`${name}/${name}.d.ts`)
        $('es').hasFile(`${name}/index.js`)
        $('es').hasFile(`${name}/${name}.d.ts`)
    })
}

async function execGlobalSetup() {
    try {
        execSync('npm run build')
        testPackages()
    } catch (e) {
        console.log('execGlobalSetup error :>> ', e)
        process.exit(1)
    }
}
export default execGlobalSetup
