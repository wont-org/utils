# Jest 介绍

单元测试是函数库中最重要的环节之一，良好的单元测试能对函数库产生许多正面的影响；

- 单元测试能帮助我们节约后续的开发和维护成本，在一定程度上降低了出错的概率；
- 单元测试也是代码设计的一部分，会促使开发者重新审视自己的代码，改进设计，完善各种边界条件和异常情况的处理；
- 当函数被修改后，如果发生错误，单元测试能帮助我们快速定位错误。

常见的单元测试框架有 **[Mocha](https://mochajs.org/)** 、**[Jasmine](https://jasmine.github.io/)**、**[Jest](https://jestjs.io/)** 等。

**Jest** 配置简单、功能强大、容易上手，在绝大多数情况下，它都是一个不错的选择。

## 快速开始
安装
```shell
npm install --save-dev jest
// 或者
yarn add --dev jest
```
创建 *sum.js*
```js
function sum(a, b) {
  return a + b
}
module.exports = sum
```
创建 *sum.test.js*
```js
const sum = require('./sum')

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3)
})
```
在 `package.json` 里面添加如下配置
```json
{
  "scripts": {
    "test": "jest"
  }
}
```
运行 `npm run test` 即可看到控制台打印了以下信息
```shell
 PASS  ./sum.test.js
  ✓ adds 1 + 2 to equal 3 (3ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        0.985s, estimated 1s
Ran all test suites.
```

## 测试单个文件
### 普通
```bash
npx jest path
```
### 生成覆盖率报告
```bash
npx jest path --coverage --verbose -u
```

## 匹配器
Jest 内置了断言，可以使用多种匹配器。

最简单的测试值的方法是看是否精确匹配。
```js
test('two plus two is four', () => {
  expect(2 + 2).toBe(4)
})
```
在此代码中，`expect (2 + 2)` 返回一个"期望"的对象。 你通常不会对这些期望对象调用过多的匹配器。 在此代码中，`.toBe(4)` 是匹配器。 当 Jest 运行时，它会跟踪所有失败的匹配器，以便它可以为你打印出很好的错误消息。

`toBe` 是用来判断是否精确匹配，在判断对象是否相等时，可以使用 `toEqual`
```js
test('object assignment', () => {
  const data = {one: 1}
  data['two'] = 2
  expect(data).toEqual({one: 1, two: 2})
})
```
`toEqual` 会递归检查对象或数组的每个字段。

在测试中，你有时需要区分 undefined、 null，和 false，但有时你又不需要区分。 Jest 能让你明确地表达你想要什么。
```js
test('null', () => {
  const n = null
  expect(n).toBeNull()
  expect(n).toBeDefined()
  expect(n).not.toBeUndefined()
  expect(n).not.toBeTruthy()
  expect(n).toBeFalsy()
})

test('zero', () => {
  const z = 0
  expect(z).not.toBeNull()
  expect(z).toBeDefined()
  expect(z).not.toBeUndefined()
  expect(z).not.toBeTruthy()
  expect(z).toBeFalsy()
})
```
数字的对比也有相应的匹配器
```js
test('two plus two', () => {
  const value = 2 + 2
  expect(value).toBeGreaterThan(3)
  expect(value).toBeGreaterThanOrEqual(3.5)
  expect(value).toBeLessThan(5)
  expect(value).toBeLessThanOrEqual(4.5)

  // toBe and toEqual are equivalent for numbers
  expect(value).toBe(4)
  expect(value).toEqual(4)
})
```
js浮点数计算中，有可能会出现精度问题，但是没有关系，Jest提供了相应的解决方案
```js
test('两个浮点数字相加', () => {
  const value = 0.1 + 0.2
  //expect(value).toBe(0.3)           这句会报错，因为浮点数有舍入误差
  expect(value).toBeCloseTo(0.3) // 这句可以正常运行
})
```
我们还可以使用正则表达式来进行匹配
```js
test('there is no I in team', () => {
  expect('team').not.toMatch(/I/)
})

test('but there is a "stop" in Christoph', () => {
  expect('Christoph').toMatch(/stop/)
})
```

以通过 toContain 来检查一个数组或可迭代对象是否包含某个特定项：
```js
const shoppingList = [
  'diapers',
  'kleenex',
  'trash bags',
  'paper towels',
  'beer',
]

test('the shopping list has beer on it', () => {
  expect(shoppingList).toContain('beer')
  expect(new Set(shoppingList)).toContain('beer')
})
```
当我们要测试的特定函数抛出一个错误，可以在它调用时，使用 toThrow
```js
function compileAndroidCode() {
  throw new ConfigError('you are using the wrong JDK')
}

test('compiling android goes as expected', () => {

  // expect(compileAndroidCode()).toThrow()   这种写法是错误的，如果想要抛出异常，expect()中必须是一个方法

  expect(compileAndroidCode).toThrow()
  expect(compileAndroidCode).toThrow(ConfigError)

  // You can also use the exact error message or a regexp
  expect(compileAndroidCode).toThrow('you are using the wrong JDK')
  expect(compileAndroidCode).toThrow(/JDK/)
})
```
这些只是一部分，有关匹配器的完整列表，请查阅[参考文档](https://jestjs.io/docs/zh-Hans/expect)。

## 测试异步代码
在JavaScript中执行异步代码是很常见的。 当你有以异步方式运行的代码时，Jest 需要知道当前它测试的代码是否已完成，然后它可以转移到另一个测试。 Jest有若干方法处理这种情况。

**回调函数**

例如，假设您有一个 fetchData(callback) 函数，获取一些数据并在完成时调用 callback(data)。 你想要测试这返回的数据是只是字符串 'peanut butter'。
```js
test('the data is peanut butter', done => {
  function callback(data) {
    expect(data).toBe('peanut butter')
    done()
  }

  fetchData(callback)
})
```
必须要在回调方法 `callback` 中调用 `done()` ;Jest 回等待 `done()` 调用后再结束测试；如果 `done()` 永远不调用，这个测试将失败，这也是你所希望发生的。

**Promises**

如果您的代码使用 Promises，还有一个更简单的方法来处理异步测试。 只需要从您的测试返回一个 Promise, Jest 会等待这一 Promise 来解决。不要忘记把Promise 作为返回值：
```js
test('the data is peanut butter', () => {
  return fetchData().then(data => {
    expect(data).toBe('peanut butter')
  })
})
```

如果你想要 Promise 被 reject ，可以使用 .catch 方法。 请确保添加 expect.assertions 来验证一定数量的断言被调用。 否则一个fulfilled态的 Promise 不会让测试失败︰
```js
test('the fetch fails with an error', () => {
  expect.assertions(1)
  return fetchData().catch(e => expect(e).toMatch('error'))
})
```
**resolves、rejects 匹配器**

还可以使用 resolves、rejects 匹配器，一定不要忘记把整个断言作为返回值返回：
```js
test('the data is peanut butter', () => {
  return expect(fetchData()).resolves.toBe('peanut butter')
})

test('the fetch fails with an error', () => {
  return expect(fetchData()).rejects.toMatch('error')
})
```

**async 和 await**

此外，还可以在测试中使用 async 和 await。 若要编写 async 测试，只要在函数前面使用 async 关键字传递到 test。 例如，可以用来测试相同的 fetchData 方案︰
```js
test('the data is peanut butter', async () => {
  const data = await fetchData()
  expect(data).toBe('peanut butter')
})

test('the fetch fails with an error', async () => {
  expect.assertions(1)
  try {
    await fetchData()
  } catch (e) {
    expect(e).toMatch('error')
  }
})
```

## 全局方法

### `describe(name, fn)`
`describe` 的回调函数 `fn` 中可以写多个 `test`, `name` 是一个 `string` 类型的参数，表示对这多个 `test` 的描述
```
describe('minus 方法测试', () => {
  test('1 - 2 = -1', () => {
    expect(minus(1, 2)).toBe(-1)
  })

  test('0 - 0 = 0', () => {
    expect(minus(0, 0)).toBe(0)
  })

  test('2 - 1 = 1', () => {
    expect(minus(2, 1)).toBe(1)
  })

  test('1 - undefined to throw Error', () => {
    expect(() => { minus(1) }).toThrow('minus方法的参数必须为Number类型')
  })
})
```

### `beforeEach(fn, timeout)`
在每个 `test` 运行之前，`beforeEach` 的回调方法 `fn` 都会运行一次；
```
let num = 1

beforeEach(() => {
  num = 1
})

test('第一个测试', () => {
  num += 1
  expect(num).toBe(2)
})

test('第二个测试', () => {
  num += 2
  expect(num).toBe(3)
})
```

如果 `fn` 返回一个`promise`, Jest 会等待 `promise` 完成后再运行 `test`; 或者，您可以提供`timeout`（以毫秒为单位）来指定等待的时间。注意：默认超时为 5000 毫秒.
```
let num = 1

beforeEach(() => {
  return requestFun().then(() => {
    num = 1
  })
})

test('第一个测试', () => {
  num += 1
  expect(num).toBe(2)
})

test('第二个测试', () => {
  num += 2
  expect(num).toBe(3)
})
```

如果 `beforeEach` 在describe块内，则它将在 describe 块的开头运行。

### `beforeAll(fn, timeout)`
在 `test` 运行之前，会运行一次 `beforeAll` 的回调函数 `fn`;

`beforeAll` 和 `beforeEach` 的区别是：
- `beforeAll`: 无论 `test` 有多少个，`beforeAll` 只会运行一次
- `beforeEach`: `test` 有多少个，`beforeEach` 就会运行多少次

其他类似的方法还有 `afterEach` 、 `afterAll` 等；

更多用法请参考 **[Jest官网](https://jestjs.io/)**

## Puppeteer
Jest 默认使用 [jsdom](https://github.com/jsdom/jsdom) 来模拟一些浏览器相关的属性，但是和真实表现并不完全一致；

有一些函数会使用XMLHttpRequest对象（例如文件上传函数），但是XMLHttpRequest是用于浏览器向服务器来发起的，node环境没有 XMLHttpRequest，虽然有相关的npm包来模拟，但是和真正的XMLHttpRequest始终有差别，例如文件上传进度的监听等；

这时候，我们可以使用 [Puppeteer](https://github.com/GoogleChrome/puppeteer);

Puppeteer 是一个Chrome官方出品的 headless Chrome node 库。它提供了一系列的API, 可以在无UI的情况下调用Chrome的功能, 适用于爬虫、自动化处理等各种场景。它的功能包括但是不限于以下几点：
- 生成页面截图和 PDF
- 自动化表单提交、UI 测试、键盘输入等
- 创建一个最新的自动化测试环境。使用最新的 JavaScript 和浏览器功能，可以直接在最新版本的 Chrome 中运行测试
- 捕获站点的时间线跟踪，以帮助诊断性能问题
- 抓取SPA并生成预先呈现的内容

安装 puppeteer 后会自动下载一个 chromium 内核（100M+），相当于运行在一个真实的浏览器环境中，只是缺少了UI页面；也可以自己下载 chromium ，然后指定 chromium 路径；此外，还可以指定本地已安装的 Chrome 浏览器中的 chromium 路径，例如：executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

函数库默认引入了 Puppeteer，下面简单介绍一些如何在 Jest 中使用 Puppeteer。
```js
import puppeteer from 'puppeteer'

test('获取页面title', async () => {
    // 创建 browser 实例
    const browser = await puppeteer.launch({
      args: ['--no-sandbox']
    })

    // 创建 page 实例
    const page = await browser.newPage()

    // 打开页面
    await page.goto('https://www.baidu.com')
    // 也可以打开本地启动的服务
    // await page.goto('http://localhost:8080/')

    // 对当前页面截图，命名为 'screenshot.png'，并保存到 'src' 目录中
    await page.screenshot({path: 'src/screenshot.png'});

    // 关闭浏览器
    await browser.close();
  })
```

也可以在 `page` 中注入本地的js文件
```js
// hello.ts
export default function hello(info: string): string {
  return `hello ${info}`
}

// hello.test.js
import puppeteer from 'puppeteer'

test('获取页面title', async () => {
  jest.setTimeout(20000) // 设置超时时间（毫秒）， 默认是5000
  const browser = await puppeteer.launch({
    args: ['--no-sandbox']
  })
  const page = await browser.newPage()
  await page.goto('https://www.baidu.html')

  // 把 js 文件注入到页面中, path 表示js文件的路径
  // 在函数库中，我们把打包好的文件存放在 'lib/index.min.js'
  await page.addScriptTag({ path: 'lib/index.min.js' })

  const name1 = 'name1'
  const name2 = 'name2'
  const title = await page.evaluate(
    (a, b) => {
      document.title = Jax.hello(a + b)
      return document.title
    },
    name1,
    name2,
  )
  await browser.close()
  expect(title).toBe('hello name1name1')
})
```

更多姿势请查看 **[Jest](https://jestjs.io/)** 、**[Puppeteer](https://github.com/GoogleChrome/puppeteer)**
