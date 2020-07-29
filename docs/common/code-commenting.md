# 根据注释生成文档
函数库中，我们使用[jsdoc](https://github.com/jsdoc/jsdoc) 的规范来写注释，然后利用 [jsdoc-to-markdown](https://github.com/jsdoc2md/jsdoc-to-markdown) 把注释生成 markdown 文档

新建函数后，默认的注释大致如下所示：
```
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
```

## 总体描述
我们在注释的最上面写一些关于函数的描述，例如：功能、使用场景、需要注意的点 等等，开发者可以根据自己的理解来写

## 函数名称
在 `@function` 后面写上函数名称即可
```
/**
 * @function helloWorld
 */
```

## 返回值
在 `@returns` 后面的大括号中写入返回值的类型, 在最后面添加对返回值的描述
```
/**
 * @returns {number} 对返回值的描述
 */
```

如果返回值有多种类型:
```
/**
 * @returns {(number|string)} 返回值是 number 或 string
 */
```

返回promise:
```
/**
 * @returns {promise} 返回promise，带入最终结果
 */
```

## 参数
在`@param` 后的大括号中填写参数类型，后面填写参数名称，再在名称后面加一个 `-`，最后写对于参数的描述：
```
/**
 * @param {number} a - 参数a的描述.
 */
```

可以写多个参数：
```
/**
 * @param {number} a - 参数a的描述.
 * @param {string} b - 参数b的描述.
 */
```

参数可以有多个类型：
```
/**
 * @param {(number|string|Array)} a - 参数a的描述.
 */
```

参数不限类型：
```
/**
 * @param {*} a - 参数a的描述.
 */
```

当参数是`Object`时，例如`{ name: '张三', age: 18 }`：
```
/**
 * @param {Object} employee - employee是一个对象.
 * @param {string} employee.name - 表示姓名
 * @param {number} employee.age - 表示年龄
 */
```

当参数是`对象数组`时，例如`[{ name: '张三'， age: '18' }, { name: '李四', age: '19' }]`：
```
/**
 * @param {Object[]} employees - employees是一个对象数组.
 * @param {string} employees[].name - 表示姓名
 * @param {number} employees[].age - 表示年龄
 */
```

参数可选，不是必传：
```
/**
 * @param {string} [a] - 参数a的描述.
 */
```

参数有默认值：
```
/**
 * @param {string} [a=hello] - 参数a的描述.
 */

/**
 * @param {number} [a=100] - 参数a的描述.
 */

/**
 * @param {Array} [a=[1, 2, 3]] - 参数a的描述.
 */
```

参数不限个数：
```
/**
 * @param {...number} num - 参数num的个数不限
 */
```

参数类型为 `function`：
```
/**
 * @function handleEmployee 处理员工信息
 * @param {requestCallback} cb - 回调函数cb，接收一个 employee 参数，employee 为一个对象
 */
export default function handleEmployee(cb) {
  requestEmployee().then(employee => {
    console.log(employee.name, employee.age)
    cb(employee)
  })
}

/**
 * 回调函数的相关介绍
 * @typedef {function} requestCallback
 * @param {Object} employee - employee是一个对象.
 * @param {string} employee.name - 表示姓名
 * @param {number} employee.age - 表示年龄
 */
```

**注意**：`@param {requestCallback} cb` 中 `requestCallback` 的命名没有严格的要求，但是需要与 `@typedef {function} ` 后面的名称保持一致

## 抛出异常
```
/**
 * @throws 参数不传时会抛出异常
 */
```

可以写明异常的类型：
```
/**
 * @throws {TypeError} 参数a类型不是string时，会抛出 TypeError
 */
```

可以抛出多个异常：
```
/**
 * @throws {TypeError} 参数a类型不是string时，会抛出 TypeError
 * @throws {Error} 参数b不传时，会抛出 Error
 */
```

## 开发者/维护者
```
/**
 * @author 张三 <zhangsan@winbaoxian.com>
 */

/**
 * @author 张三 <zhangsan@winbaoxian.com> 李四 <lisi@winbaoxian.com>
 */
```

## 函数使用举例
```
/**
 * @example // returns 1
 * helloWorld(1)
 */
```

可以写多行:
```
/**
 * @example // returns '姓名：张三，年龄：20'
 * hello({
 *   name: '张三',
 *   age: 20
 * })
 */
```
