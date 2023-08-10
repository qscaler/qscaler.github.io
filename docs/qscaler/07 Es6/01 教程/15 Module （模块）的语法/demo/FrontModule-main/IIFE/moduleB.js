//模块 moduleB.js
(function(window,jQuery) {
    window.my_module = {
       // 这里是代码 
        helloB:function(){
            console.log("I am moduleB! I called moduleA.helloA!")
            jQuery.helloA()  //模块A中定义了全局模块jQuery，这里引用了jQuery，于是moduleB.js依赖moduleA.js
        }
    };
})(window,window.jQuery);

window.my_module.helloB();