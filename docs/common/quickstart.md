# 快速上手

## npm

全局引入
```bash
npm i @wont/utils -S
```

```js
import utils from '@wont/utils'

utils.getUrlParam('id', 'http://localhost:8088/#/index?type=hash&id=8080&index=0') // 8080
```

按需引入（推荐）

```js
import { getUrlParam } from '@wont/utils'

getUrlParam('id', 'http://localhost:8088/#/index?type=hash&id=8080&index=0') // 8080
```

## script
> 如需使用script，需要自行打包上传

```html
<script src="https://unpkg.com/@wont/utils@0.0.1-alpha.8/lib/umd/index.min.js" type="text/javascript"></script>

<script>
    window.onload = function () {
        wontUtils.getUrlParam('id', 'http://localhost:8088/#/index?type=hash&id=8080&index=0') // 8080
    }
</script>
```
