# 开发指南

::: tip
参与`wont-utils`函数库开发之前，您需要了解 [TypeScript](https://www.tslang.cn/)、[commit 规范](https://github.com/conventional-changelog/commitlint)、[jest](https://jestjs.io/docs/en/getting-started)、[jsdoc](https://jsdoc.app/index.html)
:::

## 函数设计

首先创建一个`issue`，说明函数功能，模板如下：

- 函数名称
- 功能描述、解决痛点
- 入参说明
- 返回参数说明
- 实现方案、系统分析

函数功能、系统分析得到认可后，开始开发。

## 分支策略

::: tip
分支策略遵循`angular commit`规范，示例如下。
:::

- master: 受保护、稳定且经过测试的分支，也是主迭代分支。代码必须提`pull request`并且`code review`后，联系仓库`owner` **liukun** <919590347@qq.com>
- feat/\*: 新功能, 新函数
- fix/\*: 修复函数的 bug （src/\*）
- docs/\*: 仅修改文档相关（docs/\*）
- style/\*: 代码风格层面改动, eg: 空格、分号、空行、引号……
- refactor/\*: 函数重构，既不是 bug 也不是 feature （src/\*）
- perf/\*: 优化性能（src/\*, build/\*）
- test/\*: 测试用例的添加、修改、删除（src/\_\*.test.ts）
- build/\*: 构建层面修改。 egg：build/\*, rollup, gulp……
- ci/\*: 自动化脚本相关。 eg: Travis, jenkins, gitlab.ci
- chore/\*: 其他的修改，不包含 src, test
- revert/\*: 回滚之前的 commit

## 创建分支、函数

### 创建分支

```bash
# 迭代分支
git checkout master
git checkout -b feat/helloWorld
```

### 创建模块

::: tip
执行 npm 脚本，输入函数名，强制使用小驼峰（camelCase），例如: `helloWorld`;

如该函数不开放给使用者，请以下划线开头，例如: `_helloWorld`;

完成之后，可以看到新增了一个目录 **src/helloWorld**，且该目录下有两个文件：
:::

```bash
npm run create
```

**helloWorld.ts**

```ts
/**
 * @description 总体的描述
 * @function helloWorld
 * @returns {number} 返回值的描述
 * @param {number} a - 参数a的描述
 * @throws {TypeError} 异常的描述
 * @author  xxx <xxx@xxx.com>
 * @example
 * helloWorld(1)  // returns 1
 */
export function helloWorld(a: number): number {
  return a
}
```

**\_helloWorld.test.ts**

```ts
import { helloWorld } from './helloWorld'

describe('helloWorld 方法测试', () => {
  test('具体测试', () => {
    expect(helloWorld(1)).toBe(1)
  })
})
```

## 实现函数功能

在 **helloWorld.ts** 文件中实现函数的相关功能

::: tip
如有引入第三方的 `npm` 包，请在 `rollup.config.ts` 的 `external`中添加配置。注意，在`umd`与`iife`中还需要添加`globals`
:::

## 编写单元测试

在 **\_helloWorld.test.ts** 文件中编写单元测试

函数库使用 **[Jest](https://jestjs.io/)** 作为单元测试框架，可参考 [Jest 介绍](/common/jest/)

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

- 输入 `F` 修复 EsLint
- 输入 `回车键` 触发运行一次单元测试
- 输入 `q` 退出 `watch` 模式

## 完善注释

在 **helloWorld.ts** 文件中完善注释，用于自动生成文档；我们使用 jsdoc 的规范来写注释，然后利用 jsdoc-to-markdown 把注释生成 markdown 文档

默认的注释如下，改成正确的内容即可，[如何写注释](/common/code-commenting/)

```ts
/**
 * @description 总体的描述
 * @function helloWorld
 * @returns {number} 返回值的描述
 * @param {number} a - 参数a的描述
 * @throws {TypeError} 异常的描述
 * @author  xxx <xxx@xxx.com>
 * @example
 * helloWorld(1)  // returns 1
 */
```

运行 npm 命令来查看文档：

```bash
npm run changelog && npm run build:docs
```

## 提交代码

::: tip
commit 规范: 采用 angular 风格, 借助 commitizen 进行交互式提交、commitlint 进行消息格式的校验；
:::

### commitizen 命令行交互

```bash
# global
npm i conventional-changelog-cli -g
git cz
# npm
npm i conventional-changelog-cli -D
npx git-cz
```

### commitlint 校验

::: tip
commit 格式如下(第一行必填, 其他行选填), 其中 type 代表的是修改内容的类型(必须使用指定的值)、scope 代表影响范围(根据项目自定义)、
:::

```
type(scope): 简单描述

- 详细描述一
- 详情描述二

BREAKING CHANGE: 类似 angular-v2 的断层式升级 #1 (只有 type=feat、fix 时才包含)

fix #1, fix #2
```

#### type 取值列表

> 分支策略完全相同

- feat: 新功能, 新函数
- fix: 修复函数的 bug （src/\*）
- docs: 仅修改文档相关（docs/\*）
- style: 代码风格层面改动, eg: 空格、分号、空行、引号……
- refactor: 函数重构，既不是 bug 也不是 feature （src/\*）
- perf: 优化性能（src/\*, build/\*）
- test: 测试用例的添加、修改、删除（src/\_\*.test.ts）
- build: 构建层面修改。 egg：build/\*, rollup, gulp……
- ci: 自动化脚本相关。 eg: Travis, jenkins, gitlab.ci
- chore: 其他的修改，不包含 src, test
- revert: 回滚之前的 commit

#### scope 建议

- 修改的函数名
- 待补充

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

审核人员审核通过后，会处理**PR**，合并成功后，整个开发流程就此结束。

## 发版

通过 npm scripts, 执行自动化版本变更，然后申请 pr，pr 通过后，切换到 master，执行`npm run pushtag`推送 tag 至远程，travis 会自动化发版，发版成功后会收到邮件

```bash
npm run alpha # 内部测试版,一般不向外部发布,会有很多Bug.一般只有测试人员使用
npm run beta # 公测版，消除了严重bug，这个阶段的版本会一直加入新的功能。在Alpha版之后推出
npm run rc # 系统平台上就是发行候选版本。RC版不会再加入新的功能了，主要着重于除错。
npm run patch # 补丁，当做了向下兼容的问题修正
npm run minor # 新增功能，当做了向下兼容的功能性新增
npm run major # 断层更新，当做了不兼容的 API 修改
```
