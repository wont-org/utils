## [0.0.1-alpha.8](https://github.com/wont-org/utils/compare/v0.0.1-alpha.7...v0.0.1-alpha.8) (2020-09-14)


### Features

* 合并校验函数为validator ([#12](https://github.com/wont-org/utils/issues/12)) ([e325127](https://github.com/wont-org/utils/commit/e32512713088fcc13d5da6430bb337c2ce2a452f)), closes [#4](https://github.com/wont-org/utils/issues/4)
* 合并验证方法 ([ef6ef5d](https://github.com/wont-org/utils/commit/ef6ef5dfcdeaf2f5a66c45cc8a0575598d5ba40a))
* 删除单个验证方法, 合成validator, type严格约束 ([21d2a56](https://github.com/wont-org/utils/commit/21d2a56fdb500f6b9ded6ae273a77bb5bb1fccab))
* 新增座机校验 ([d864c24](https://github.com/wont-org/utils/commit/d864c248b088957908b38c316ed0be3137a711ab))
* 增加身份证校验方法 ([e417d43](https://github.com/wont-org/utils/commit/e417d43596e2fa8010dbe375b2cb7b8b9232b158))
* 增加银行卡泛校验方法 ([b7b5e5b](https://github.com/wont-org/utils/commit/b7b5e5b43c22e41d1efbf12777c0d9ab43c2e696))
* 增加邮箱校验方法 ([869d0f9](https://github.com/wont-org/utils/commit/869d0f92d4685222f05ddbd68761096e0fee88aa))
* 增加中文名校验方法 ([90eea6c](https://github.com/wont-org/utils/commit/90eea6ce5999756039994d9a493fee3014c440bb))
* 增加中文校验方法 ([71c4a00](https://github.com/wont-org/utils/commit/71c4a00c4e4134d241b80deff4375ba10aec2416))



## [0.0.1-alpha.7](https://github.com/wont-org/utils/compare/v0.0.1-alpha.4...v0.0.1-alpha.7) (2020-09-06)


### Features

* 新增首字母大写方法 ([246be7f](https://github.com/wont-org/utils/commit/246be7f59a990c66443b19bd3c2074dcafd698b7))
* 新增get方法 ([6ca2d9b](https://github.com/wont-org/utils/commit/6ca2d9bcecec9285ffb917c85ade2b44a53d6c4d))



## [0.0.1-alpha.4](https://github.com/wont-org/utils/compare/v0.0.1-alpha.3...v0.0.1-alpha.4) (2020-08-26)


### Bug Fixes

* 调整import/export，确保使用者享受ts提示 ([#5](https://github.com/wont-org/utils/issues/5)) ([a9c67ae](https://github.com/wont-org/utils/commit/a9c67ae1763f54b10fb77103a80bcead7c529f72))
* 入口文件应使用export default ([c23837e](https://github.com/wont-org/utils/commit/c23837e9427aa9523f678774d3e725cb7f121920))



## [0.0.1-alpha.3](https://github.com/wont-org/utils/compare/v0.0.1-alpha.2...v0.0.1-alpha.3) (2020-08-26)


### Bug Fixes

* **import/export:** 调整导入导出方式, 确保.d.ts正确提示, 优化globalSetup ([5489781](https://github.com/wont-org/utils/commit/5489781bb4d1371bbb8172ef9c668ad890a71e24)), closes [#4](https://github.com/wont-org/utils/issues/4)


### Features

* **build refactor, test, new methods(validator), deps:** 默认导出, 构建产物dekko测试, 添加校验方法, create模板更新 ([#1](https://github.com/wont-org/utils/issues/1)) ([4cff27f](https://github.com/wont-org/utils/commit/4cff27feb8458ecbba4647c370305e23afc42657))



## [0.0.1-alpha.2](https://github.com/wont-org/utils/compare/v0.0.1-alpha.0...v0.0.1-alpha.2) (2020-08-25)


### Features

* **build refactor, test, new methods(validator), deps:** 默认导出, 构建产物dekko测试, 添加校验方法, create模板更新 ([f503014](https://github.com/wont-org/utils/commit/f503014636c1c2a7f5d9ea96609c08a5d14dd5a8))



## [0.0.1-alpha.0](https://github.com/wont-org/utils/compare/0e1d2d43a9a5323c08871e5dac96ab37194b4eb9...v0.0.1-alpha.0) (2020-08-11)


### Bug Fixes

* **entry:index:** 修复入口文件生成引用地址, 及解构this.state.umdInputScript ([38abf00](https://github.com/wont-org/utils/commit/38abf00dc08e7d6488e7a03fd3896201aede7806))


### Features

* **add:** 获取url参数 ([434a5a6](https://github.com/wont-org/utils/commit/434a5a626351d4c38d1c65d91551a58b65a16835))
* **build:** 打包配置完成' ([d601ff3](https://github.com/wont-org/utils/commit/d601ff39cc09410913ef3d1ad132eb9436c1d3c4))
* **build:doc:** 注释生成文档完成 ([25923ee](https://github.com/wont-org/utils/commit/25923ee169a5c674f1c8d3a44c967e931295cc03))
* **eslint:** 补全eslint配置 ([a09ec13](https://github.com/wont-org/utils/commit/a09ec13ae8edef4537a175a3026f24a0d8373ab4))
* **eslint:** 增加typescript eslint校验 ([cf1aae8](https://github.com/wont-org/utils/commit/cf1aae8b8991c97febfc1e075273c59a4acdd7b5))
* **eslint-prettier:** eslint结合prettier ([42048e1](https://github.com/wont-org/utils/commit/42048e18a555aca9c7efb9b1e2b3cab7e13e8561))
* **jest:** 新增jest写测试用例及测试覆盖率 ([5a534ae](https://github.com/wont-org/utils/commit/5a534aef89f695bcc103ee3a1b7856f9f8740ac5))
* 打包文件自动生成入口文件 ([ccbbb75](https://github.com/wont-org/utils/commit/ccbbb7593cfbcfe5be85698a2a397c40c0dbd3cc))
* 完善生成md, 准备开始做commit规范 ([0e1d2d4](https://github.com/wont-org/utils/commit/0e1d2d43a9a5323c08871e5dac96ab37194b4eb9))
* 自动生成模块,方便开发函数库 ([1e55d20](https://github.com/wont-org/utils/commit/1e55d20dd8dfdab54736ad12de22288f0025d9fd))
* rollup打包ts ([65e1ff8](https://github.com/wont-org/utils/commit/65e1ff8f4c50caf782dd8cb32c365592a32c2b00))
* **gen: changelog:** 自动生成changelog ([449b712](https://github.com/wont-org/utils/commit/449b712369aaeb526ce66c628bde3736e0d5af2e))



