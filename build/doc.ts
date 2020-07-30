import jsdoc2md from 'jsdoc-to-markdown'
import glob from 'glob'
import {
    existsSync, mkdirSync, readFileSync, writeFileSync,
} from 'fs'
import { removeSync } from 'fs-extra'

interface State {
    docDir: string
    tsFiles: string[]
    mdFiles: string[]
}

interface Sidebar {
    title?: string
    path: string
    collapsable?: boolean
}

class Docs {
    state: State = {
        docDir: 'docs/src',
        tsFiles: glob.sync('src/!(_)*/!(_)*.ts'),
        mdFiles: glob.sync('docs/common/!(_)*.md'),
    }

    getMD(path: string) {
        return jsdoc2md.render({
            'example-lang': 'js',
            files: path,
            partial: 'build/jsdoc2md/templates/*.hbs',
            configure: 'build/jsdoc2md/jsdoc2md.json',
        })
    }

    setSidebar(sidebar: Sidebar[]) {
        const { mdFiles } = this.state
        console.log('mdFiles :>> ', mdFiles)
        const mdList: Array<string | Sidebar> = mdFiles.map((mdFile) => {
            let [, dir, name] = mdFile.split('/')
            name = name.split('.')[0]
            if (name === 'CHANGELOG') {
                return {
                    title: '变更历史',
                    collapsable: false,
                    path: `/${dir}/${name}`,
                }
            }
            return `/${dir}/${name}`
        })

        const path = 'docs/.vuepress/config.js'
        const config: string = readFileSync(path, 'utf-8')
        let result = eval(config)

        result.themeConfig.sidebar = mdList.concat(sidebar)
        result = JSON.stringify(result, null, 4)
        writeFileSync(path, `module.exports = ${result}`, 'utf-8')
    }

    setMD() {
        const { tsFiles, docDir } = this.state
        console.log('tsFiles :>> ', tsFiles)

        if (tsFiles.length === 0) return

        removeSync(docDir)

        return tsFiles.map(async (path) => {
            let [src, , name] = path.split('/')
            name = name.split('.')[0]

            const data = await this.getMD(path)

            if (!existsSync(docDir)) mkdirSync(docDir)
            writeFileSync(`${docDir}/${name}.md`, data)

            const sidebarItem = {
                title: name,
                collapsable: false,
                path: `/${src}/${name}`,
            }
            return sidebarItem
        })
    }

    render() {
        const sidebar = this.setMD() || []

        Promise.all(sidebar)
            .then((data) => {
                console.log('sidebar :>> ', data)
                this.setSidebar(data)
            })
            .catch((err) => {
                console.log('err :>> ', err)
            })
    }
}

new Docs().render()
