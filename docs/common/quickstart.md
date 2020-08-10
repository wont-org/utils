# 快速上手

## npm

全局引入
```bash
npm i @wont/utils -S
```

```js
import utils from '@wont/utils'

utils.getUrlParam()
```

按需引入（推荐）

```js
import { getUrlParam } from '@wont/utils'

getUrlParam()
```

## script
> 如需使用script，需要自行打包上传

```html
<script src="@wont/utils.js" type="text/javascript"></script>

<script>
    window.onload = function () {
        wontUtils.getUrlParam()
    }
</script>
```
