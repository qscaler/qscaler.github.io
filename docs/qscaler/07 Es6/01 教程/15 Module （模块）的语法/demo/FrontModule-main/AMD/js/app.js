define(
 function(require) {
    'use strict';
    var moduleA = require('./lib/moduleA');
    console.log("I am app! calling moduleA.hello!");
    moduleA.helloA();
});