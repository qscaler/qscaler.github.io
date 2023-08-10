/*
 * @Author              : qxp
 * @Date                : 2021-09-29 14:18:49
 * @LastEditors         : Please set LastEditors
 * @LastEditTime        : 2021-09-29 14:19:03
 * @FilePath            : \new\7 vue\16 Vue之webpack打包基础---模块化思维\1\aaa.js
 */
let module1 = (function () {
    let name = "张三"
    let flag = true

    function add() {
        console.log("这是aaa里面的add方法")
    }

    let p = {
        flag: flag,
        name: name
    }

    return p
})()