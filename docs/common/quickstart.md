# 快速上手

## npm

全局引入

```bash
npm i @wont/utils -S
```

```js
import utils from '@wont/utils'

utils.getUrlParam(
  'id',
  'http://localhost:8088/#/index?type=hash&id=8080&index=0'
) // 8080
```

按需引入（推荐）

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

## 试一试
打开控制台，`wontUtils`查看所有方法

```js
wontUtils.getUrlParam(
  'id',
  'http://localhost:8088/#/index?type=hash&id=8080&index=0'
) // 8080
```
