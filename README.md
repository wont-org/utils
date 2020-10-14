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
> [unpkg](https://unpkg.com/)收录，遵循umd规范，不支持`tree shake`

```html
<script src="https://unpkg.com/@wont/utils" type="text/javascript"></script>

<script>
    window.onload = function () {
        wontUtils.getUrlParam('id', 'http://localhost:8088/#/index?type=hash&id=8080&index=0') // 8080
    }
</script>
```

## Links

- [Documentation](https://wont-org.github.io/utils/)
- [Changelog](https://wont-org.github.io/utils/common/CHANGELOG.html)

## LICENSE

[MIT](https://en.wikipedia.org/wiki/MIT_License)
