import { execSync, spawn } from 'child_process'
import { version } from '../package.json'

const runner = spawn('npm', ['publish'])

runner.on('close', () => {
    execSync(`git tag ${version}`)
    execSync(`git push origin ${version}:${version}`)
    execSync('git push origin master:master')
})
