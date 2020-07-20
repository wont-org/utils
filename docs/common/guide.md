# 开发指南

> 在参与`zero-utils`函数库之前，您需要了解 `TypeScript`

## 函数设计
首先创建一个`issue`，对函数设计进行说明，需要包含以下几点：
- 函数名称
- 传入参数介绍
- 返回参数介绍
- 函数将实现的功能，以及大致的实现方案

经过两名审核人员审核通过后，进入开发阶段


## 新建分支
函数库分支策略如下
* master: 主分支, 始终保留最新测试通过的代码
* feat/*:   新功能, 新函数、老函数添加新参数以支持新功能...
* fix/*:    修复了函数的 bug (不包含构建脚本、测试用例...等不需要发布 SDK 的修改)
* docs/*:   仅改动了文档相关内容
* style/*:  代码风格改动, eg: 空格、分号、空行、文档样式...
* refactor/*: 提交中即不包含 bug, 也不包含 feature, 但改动了 src 目录内的东西
* perf/*:    提升函数性能的一些优化
* test/*:    测试用例的添加、修改、删除
* build/*:   构建脚本相关的更改
* ci/*:      修改构建环境相关的内容, eg: jenkins.yml
* chore/*:   其他的未修改 src、test 的改动, eg: 发布时修改文档、修改package.json 等
* revert/*:  回滚某个 commit

根据分支策略，新建相应分支，例如 **feat/helloWorld**

## 创建函数
运行npm命令来创建函数
```bash
npm run create
```
然后输入函数名，请使用驼峰式命名法（Camel-Case），例如: `helloWorld`;

如果该函数是函数库内部的公共函数，且不开放给使用者，请以下划线开头，例如: `_helloWorld`;

完成之后，可以看到新增了一个目录 **src/helloWorld/**，且该目录下有两个文件：

**helloWorld.ts**
```js
/**
 * 总体的描述
 * @function helloWorld
 * @returns {number} 对返回值的描述
 * @param {number} a - 参数a的描述.
 * @throws {TypeError} 异常1的描述.
 * @author  xxx <xxx@winbaoxian.com>
 * @example // returns 1
 * helloWorld(1)
 */
export default function helloWorld(a: number): number {
  return a
}

```

**helloWorld.test.js**
```js
import helloWorld from './helloWorld'

describe('helloWorld 方法测试', () => {
  test('具体测试', () => {
    expect(helloWorld(1)).toBe(1)
  })
})

```

## 实现函数功能
在 **helloWorld.ts** 文件中实现函数的相关功能

如果有引入第三方的 `npm` 包，请在 `build/rollup.build.config.js` 的 `external` 和 `globals` 中添加配置

## 编写单元测试
在 **helloWorld.test.js** 文件中编写单元测试

函数库使用 **[Jest](https://jestjs.io/)** 作为默认的单元测试框架，可参考 [Jest介绍](common/jest)

## 运行单元测试
运行以下命令进行测试
```bash
npm run test
```
该命令会运行：单元测试、`eslint`，并且在控制台输出测试结果，生成单元测试覆盖率报告；

如果发生错误，请改正后再重新测试。此外，也可以使用 `watch` 模式，在该模式下，如果文件内容发生改变，会自动触发测试；
```bash
npm run watch
```
`watch` 模式默认运行所有的单元测试，也可以根据需求自定义
- 输入 `p` 只运行文件名符合匹配规则的单元测试
- 输入 `t` 只运行`test name`符合匹配规则的单元测试
- 输入 `f` 只运行测试失败的单元测试
- 输入 `o` 只运行文件发生改动的单元测试

此外，`watch` 模式还支持其他功能
- 输入 `F` 修复EsLint
- 输入 `回车键` 触发运行一次单元测试
- 输入 `q` 退出 `watch` 模式

## 完善注释
在 **helloWorld.ts** 文件中完善注释，用于自动生成文档；我们使用 jsdoc 的规范来写注释，然后利用 jsdoc-to-markdown 把注释生成 markdown 文档

默认的注释如下，改成正确的内容即可，[如何写注释](common/code-commenting)
```js
/**
 * 总体的描述1
 * 总体的描述2
 * @function helloWorld
 * @returns {number} 对返回值的描述
 * @param {number} a - 参数a的描述.
 * @throws {TypeError} 异常1的描述.
 * @author  xxx <xxx@winbaoxian.com>
 * @example // returns 1
 * helloWorld(1)
 */
```

运行 npm 命令来查看文档：
```bash
npm run build:all && npm run doc
```

## 提交代码
commit规范: 采用 angular 风格, 借助 commitizen 进行交互式提交、commitlint 进行消息格式的校验；

commit 格式如下(第一行必填, 其他行选填), 其中 type 代表的是修改内容的类型(必须使用指定的值)、scope 代表影响范围(根据项目自定义)、

```
type(scope): 简单描述

- 详细描述一
- 详情描述二

BREAKING CHANGE: 类似 angular-v2 的断层式升级 #1 (只有 type=feat、fix 时才包含)

fix #1, fix #2
```

#### type 取值列表

* feat:   新功能, 新函数、老函数添加新参数以支持新功能...
* fix:    修复了函数的 bug (不包含构建脚本、测试用例...等不需要发布 SDK 的修改)
* docs:   仅改动了文档相关内容
* style:  代码风格改动, eg: 空格、分号、空行、文档样式...
* refactor: 提交中即不包含 bug, 也不包含 feature, 但改动了 src 目录内的东西
* perf:    提升函数性能的一些优化
* test:    测试用例的添加、修改、删除
* build:   构建脚本相关的更改
* ci:      修改构建环境相关的内容, eg: jenkins.yml
* chore:   其他的未修改 src、test 的改动, eg: 发布时修改文档、修改package.json 等
* revert:  回滚某个 commit

#### scope 建议

* 修改的函数名
* all: 所有或大多数函数都有涉及, 提交主体中要说明改动涉及到了哪些函数
* 待补充

<br/>


在 `git commit` 提交成功后，请推到远程仓库，并发起 **MR**。

一般情况下，一个分支只允许有 **一个 commit**，除非有多个不相关的内容时，才允许有多个。

在创建 **MR** 的时候，有一个**Squash commits**选项：

![img](https://media.winbaoxian.com/autoUpload/common/WechatIMG264_6b50cebfcaa8deb.png ':size=600')

<span style="color: red;">请不要勾选该选项；</span>

因为我们使用了 `commitizen` 来对 **commit message** 做了严格的校验；如果勾选**Squash commits**，
那么当 **MR** 中有多个 **commit** 时，最终合并成的 **commit message** 会默认使用 **MR** 的 `title`，
从而导致 **commit message** 发生改变，变得不符合 `commitizen` 的要求。

因此，如果需要合并多个**commit**，可以使用 `git rebase` 来进行合并，合并完成后再 push 到远程相关分支。

**MR**创建完成后，审核人员会对代码进行审核，如果有需要修改、优化的地方，需要开发人员进行处理；

## 完成
两名审核人员审核通过后，会处理**MR**，合并成功后，整个开发流程就此结束。
