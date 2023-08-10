//模块 moduleA.js
(function(window) {
    window.jQuery = {
       // 这里是代码 
       helloA:function(){
           console.log("I am moduleA!");
       }
    };
})(window);