(function(root, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        console.log('是commonjs模块规范，nodejs环境')
        var depModule = require('./moduleA.js')
        module.exports = factory(depModule);
    } else if (typeof define === 'function' && define.amd) {
        console.log('是AMD模块规范，如require.js')
        define(function(require,exports,module){
              var depModule = require('./moduleA'); 
              module.exports = factory(depModule);});
    } else if (typeof define === 'function' && define.cmd) {
        console.log('是CMD模块规范，如sea.js')
        define(function(require, exports, module) {
            var depModule = require('./moduleA')
            module.exports = factory(depModule)
        })
    } else {
        console.log('没有模块环境，直接挂载在全局对象上')
        root.umdModule = factory(root.depModule);
    }
}(this, function(depModule) {
    console.log('我调用了依赖模块', depModule)
    depModule.helloA();
	// ...省略了一些代码，去代码仓库看吧
    return {
        name: '我自己是一个umd模块'
    }
}));