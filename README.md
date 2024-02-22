![Check Status](https://github.com/wont-org/utils/workflows/Check%20Status/badge.svg) ![Npm Publish](https://github.com/wont-org/utils/workflows/Npm%20Publish/badge.svg) ![Deploy gh-pages](https://github.com/wont-org/utils/workflows/Deploy%20gh-pages/badge.svg)

## Install

按需引入

```js
import { getUrlParam } from '@wont/utils'

getUrlParam('id', 'http://localhost:8088/#/index?type=hash&id=8080&index=0') // 8080
```

## script

> [unpkg](https://unpkg.com/)收录，遵循 umd 规范，不支持`tree shaking`

```html
<script src="https://unpkg.com/@wont/utils" type="text/javascript"></script>

<script>
  window.onload = function () {
    wontUtils.getUrlParam(
      'id',
      'http://localhost:8088/#/index?type=hash&id=8080&index=0'
    ) // 8080
  }
</script>
```

## Links

- [Documentation](https://wont-org.github.io/utils/)
- [Changelog](https://wont-org.github.io/utils/common/CHANGELOG.html)

## LICENSE

[MIT](https://en.wikipedia.org/wiki/MIT_License)
