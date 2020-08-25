[![Build Status](https://travis-ci.org/wont-org/utils.svg?branch=master)](https://travis-ci.org/wont-org/utils)

## Install

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
<script src="xxx.js" type="text/javascript"></script>

<script>
    window.onload = function () {
        wontUtils.getUrlParam()
    }
</script>
```

## Links

- [Documentation](https://wont-org.github.io/utils/)
- [Changelog](https://wont-org.github.io/utils/common/CHANGELOG.html)

## LICENSE

[MIT](https://en.wikipedia.org/wiki/MIT_License)
