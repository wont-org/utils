
// const jsdoc2md = require('jsdoc-to-markdown')
// const glob = require('glob')
// const fs = require('fs')
import jsdoc2md from 'jsdoc-to-markdown'
import glob from 'glob'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
import { removeSync } from 'fs-extra'

interface State {
    docDir: string,
    entries: string[],
}

interface Sidebar {
    title: string,
    path: string,
    collapsable: boolean,
}

class Docs {
    state:State={
        docDir: 'docs/src',
        entries: glob.sync('src/!(_)*/!(_)*.ts') || [],
    }

    getMD(path: string) {
        return jsdoc2md.render({
            'example-lang': 'js',
            files: path,
            partial: 'build/jsdoc2md/templates/*.hbs',
            configure: 'build/jsdoc2md/jsdoc2md.json'
        })
    }

    setSidebar(sidebar: Sidebar[]) {
        const path = 'docs/.vuepress/config.js'
        const config: string = readFileSync(path, 'utf-8')
        let result = eval(config)

        result.themeConfig.sidebar = sidebar
        result = JSON.stringify(result, null, 4)
        writeFileSync(path, `module.exports = ${result}`, 'utf-8')
    }

    setMD() {
        let { entries, docDir } =  this.state
        console.log('entries :>> ', entries)

        if(entries.length===0) return

        removeSync(docDir)

        return entries.map(async path=> {
            let [dir, ,name] = path.split('/')
            name = name.split('.')[0]
            console.log('dir, name :>> ', dir, name)
            
            const data = await this.getMD(path)

            if(!existsSync(docDir)) mkdirSync(docDir)
            writeFileSync(`${docDir}/${name}.md`, data)

            const sidebarItem = {
                title: name,
                collapsable: false,
                path: `/${dir}/${name}/`
            }
            return sidebarItem
        })
    }


   render() {
        const sidebar = this.setMD() || []

        Promise.all(sidebar).then(data=> {
            console.log('sidebar :>> ', data);
            this.setSidebar(data)
        }).catch(err=> {
            console.log('err :>> ', err);
        })
    }
}

new Docs().render()