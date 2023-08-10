/*
 * @Author              : qxp
 * @Date                : 2021-09-29 14:18:49
 * @LastEditors         : Please set LastEditors
 * @LastEditTime        : 2021-09-29 14:19:17
 * @FilePath            : \new\7 vue\16 Vue之webpack打包基础---模块化思维\1\bbb.js
 */
let module2 = (function () {
    let flag = false
    let use = "我是use"

    function enable() {
        console.log("bbb里面的enable函数")
    }

    let phone = {
        flag: flag,
        use: use
    }
    return phone;
})()