### 2 next 方法的参数
1.  yield表达式本身没有返回值，或者说总是返回undefined。next方法可以带一个参数，该参数就会被当作上一个yield表达式的返回值。
    ```js
    function* f() {
        for(var i = 0; true; i++) {
            var reset = yield i;
            if(reset) { i = -1; }
        }
    }

    var g = f();

    g.next() // { value: 0, done: false }
    g.next() // { value: 1, done: false }
    g.next() // { value: 2, done: false }
    g.next() // { value: 3, done: false }
    g.next() // { value: 4, done: false }
    g.next(true) // { value: 0, done: false }
    ```

    上面代码先定义了一个可以无限运行的 Generator 函数f，如果next方法没有参数，每次运行到yield表达式，变量reset的值总是undefined。当next方法带一个参数true时，变量reset就被重置为这个参数（即true），因此i会等于-1，下一轮循环就会从-1开始递增。

    这个功能有很重要的语法意义。Generator 函数从暂停状态到恢复运行，它的上下文状态（context）是不变的。通过next方法的参数，就有办法在 Generator 函数开始运行之后，继续向函数体内部注入值。也就是说，可以在 Generator 函数运行的不同阶段，从外部向内部注入不同的值，从而调整函数行为。

    再看一个例子。
    ```js
    function* foo(x) {
        var y = 2 * (yield (x + 1));
        var z = yield (y / 3);
        return (x + y + z);
    }

    var a = foo(5);
    a.next() // Object{value:6, done:false}
    a.next() // Object{value:NaN, done:false}
    a.next() // Object{value:NaN, done:true}

    var b = foo(5);
    b.next() // { value:6, done:false }
    b.next(12) // { value:8, done:false }
    b.next(13) // { value:42, done:true }
    ```
    上面代码中，第二次运行next方法的时候不带参数，导致 y 的值等于2 * undefined（即NaN），除以 3 以后还是NaN，因此返回对象的value属性也等于NaN。第三次运行Next方法的时候不带参数，所以z等于undefined，返回对象的value属性等于5 + NaN + undefined，即NaN。

    如果向next方法提供参数，返回结果就完全不一样了。上面代码第一次调用b的next方法时，返回x+1的值6；第二次调用next方法，将上一次yield表达式的值设为12，因此y等于24，返回y / 3的值8；第三次调用next方法，将上一次yield表达式的值设为13，因此z等于13，这时x等于5，y等于24，所以return语句的值等于42。

    注意，由于next方法的参数表示上一个yield表达式的返回值，所以在第一次使用next方法时，传递参数是无效的。V8 引擎直接忽略第一次使用next方法时的参数，只有从第二次使用next方法开始，参数才是有效的。从语义上讲，第一个next方法用来启动遍历器对象，所以不用带有参数。

    再看一个通过next方法的参数，向 Generator 函数内部输入值的例子。
    ```js
    function* dataConsumer() {
    console.log('Started');
    console.log(`1. ${yield}`);
    console.log(`2. ${yield}`);
    return 'result';
    }

    let genObj = dataConsumer();
    genObj.next();
    // Started
    genObj.next('a')
    // 1. a
    genObj.next('b')
    // 2. b
    ```
    上面代码是一个很直观的例子，每次通过next方法向 Generator 函数输入值，然后打印出来。

    如果想要第一次调用next方法时，就能够输入值，可以在 Generator 函数外面再包一层。
    ```js
    function wrapper(generatorFunction) {
    return function (...args) {
        let generatorObject = generatorFunction(...args);
        generatorObject.next();
        return generatorObject;
    };
    }

    const wrapped = wrapper(function* () {
    console.log(`First input: ${yield}`);
    return 'DONE';
    });

    wrapped().next('hello!')
    // First input: hello!
    ```
    上面代码中，Generator 函数如果不用wrapper先包一层，是无法第一次调用next方法，就输入参数的。