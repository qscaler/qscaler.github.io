define(function(require){
    var moduleB = require("./lib/moduleB");
    var moduleC = require("./lib/moduleC");
    moduleB.helloB();
    moduleC.helloC();
    console.log("This is app!");
})