// model1.js
define(function () {
    console.log('model1 entry');
    return {
        getHello: function () {
            return 'model1';
        }
    };
});
// model2.js
define(function () {
    console.log('model2 entry');
    return {
        getHello: function () {
            return 'model2';
        }
    };
});
// main.js amd的cmd写法
define(function (require) {
    var model1 = require('./model1');
    console.log(model1.getHello());
    var model2 = require('./model2');
    console.log(model2.getHello());
});
<script src="https://cdn.bootcss.com/require.js/2.3.6/require.min.js"></script>
<script>
    requirejs(['main']);
</script>
// 输出结果  
// model1 entry
// model2 entry
// model1
// model2