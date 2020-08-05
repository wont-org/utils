
## Install

全局引入
```bash
npm i zero-utils -S
```

```js
import utils from 'zero-utils'

utils.getUrlParam()
```

按需引入

```js
import { getUrlParam } from 'zero-utils'

getUrlParam()
```

## 使用 CDN 引入

```html
<script src="xxx.js" type="text/javascript"></script>

<script>
    window.onload = function () {
        utils.getUrlParam()
    }
</script>
```

## Links

- [Documentation](https://zero-org.github.io/zero-utils/)
- [Changelog](https://zero-org.github.io/zero-utils/common/CHANGELOG.html)

## LICENSE

[MIT](https://en.wikipedia.org/wiki/MIT_License)
