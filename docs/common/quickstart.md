# 快速上手
## 使用`npm`引入

全局引入
```js
import utils from 'zero-utils'

utils.xxx()
```

按需引入
```js
import isApp from 'zero-utils/xxx'

xxx()
```

## 使用CDN引入
```html
<script src="xxx.js" type="text/javascript"></script>

<script>
  window.onload = function() {
    utils.xxx()
  }
</script>
```
详细请看 [发布历史](common/changelog)