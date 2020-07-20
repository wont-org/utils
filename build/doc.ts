
const jsdoc2md = require('jsdoc-to-markdown')
const glob = require('glob')
const fs = require('fs')

class Docs {
    state={
        file: '',
        entries: glob.sync('src/!(_)*/*.ts')
    }

    getMD(path: string) {
        return jsdoc2md.render({
            'example-lang': 'js',
            files: path,
            partial: 'build/jsdoc2md/templates/*.hbs',
            configure: 'build/jsdoc2md/jsdoc2md.json'
        })
    }

    render() {
        console.log('this.state.entries :>> ', this.state.entries);
        const { entries } =  this.state
        entries.forEach(async path=> {
            const name = path.split('/')[1].split('.')[0]
            try {
                const data = await this.getMD(path)
                fs.writeFileSync(`docs/src/${name}.md`, data)
            } catch(e) {
                console.log('getMD err :>> ', e);
            }
        })
    }
}

new Docs().render()