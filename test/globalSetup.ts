import { exec } from 'child_process'
import $ from 'dekko'
import glob from 'glob'
import path from 'path'

const fnNames = glob
  .sync('src/!(_)*/!(_)*.ts')
  .map((file) => path.basename(path.dirname(file)))

function testPackages() {
  $('lib').isDirectory().hasFile('index.js').hasFile('index.d.ts')
  $('es').isDirectory().hasFile('index.js').hasFile('index.d.ts')

  fnNames.forEach((name) => {
    $('lib').hasDirectory(name)
    $(`lib/${name}`).isDirectory().hasFile('index.js').hasFile(`${name}.d.ts`)

    $('es').hasDirectory(name)
    $(`es/${name}`).isDirectory().hasFile('index.js').hasFile(`${name}.d.ts`)
  })
}

function execGlobalSetup() {
  try {
    exec('npm run build', (e) => {
      if (e) {
        console.log('npm run build error :>> ', e)
        process.exit(1)
      }
      testPackages()
    })
  } catch (e) {
    console.log('execGlobalSetup error :>> ', e)
    process.exit(1)
  }
}
export default execGlobalSetup
