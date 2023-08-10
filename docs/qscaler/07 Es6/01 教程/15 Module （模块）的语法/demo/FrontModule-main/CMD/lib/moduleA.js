//定义moduleA模块

//其中require用于载入其它模块,其中require.async用于懒加载。
//exports用于导出本模块的property
//module有三个properties，比较有用的就是module.exports。

//到处本模块接口的方式有两种弄：
//1. 通过exports一个接口一个接口的导出。exports.xxxxx = xxxxx
//2. 通过module.exports一次性全部到处。module.exports = { xxxxxxx  }

define(function(require,exports,module){
    exports.helloA=function(){
        console.log("This is moduleA.helloA!");
    }
    exports.helloExp="moduleA + exports";
});