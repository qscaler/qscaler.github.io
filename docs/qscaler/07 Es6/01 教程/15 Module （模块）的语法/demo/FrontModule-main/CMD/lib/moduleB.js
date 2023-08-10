define(function(require,exports,module){
    var moduleA = require("./moduleA");
    moduleA.helloA();//调用moduleA中的hello()方法
    console.log("moduleA:",moduleA.helloExp);
    module.exports = {
        helloB:function(){
            console.log("This is moduleB!");
        }
    }

});