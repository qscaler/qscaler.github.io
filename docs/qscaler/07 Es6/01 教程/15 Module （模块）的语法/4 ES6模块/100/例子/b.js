/*
 * @Author              : qxp
 * @Date                : 2021-10-19 16:07:30
 * @LastEditors         : Please set LastEditors
 * @LastEditTime        : 2021-10-19 16:20:17
 * @FilePath            : \new\6 Es6\15 Module （模块）的语法\4 ES6模块\3 export\b.js
 */

// import { test } from './a.js'
import { foo } from './a.js'
console.log("🚀 ~ file: 2.html ~ line 86 ~ foo", foo)  //上面代码输出变量foo，

setTimeout(() => console.log(foo), 1000);//值为bar，500 毫秒之后变成baz。