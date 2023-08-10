### This的指向
```js
1. 默认绑定(只是函数声明方式不同而已)
    function test() {
        console.log(this); //window 或 严格模式下是undefined
    }
    var fun = function (params) {
        console.log(this); //window 或 严格模式下是undefined
    }

2. 隐式绑定（谁调用，指向谁）
    // 例子1
    const obj = {
        name: 'objName',
        getName() {
            console.log(this); //obj
            console.log(this.name); //objName
        }
    };
    obj.getName();
    // 例子2(链式)
    var foo =function (){
        console.log( this.a );
    }
    var obj1 = {
        a: 2,
        obj2: obj2
    };
    var obj2 = {
        a: 3,
        foo: foo
    };
    obj1.obj2.foo(); // 3

3. 显式绑定（apply，call，bind指定绑定的对象）
    const bird = {
        name:'bird',
        fly(a='a',b='b'){
            console.log(this);
            console.log(this.name+' can fly');
            console.log(a+b+"0000000000000000");
        }
    }
    const fish = {
        name:'fish',
        Swimming(c='c',d='d'){
            console.log(this);
            console.log(this.name+' can Swimming');
            console.log(c+d+"111111111111111");
        }
    }

    bird.fly('aaaaaaaa','ssssssss')

    fish.Swimming('wwww','qweqewqe')
    将fish的Swimming的this指向bird
    bind
    //bind(要执行，参数是多个)
    fish.Swimming.bind(bird,'1','qwe')()

    call
    // call(立即执行，参数是多个)
    fish.Swimming.call(bird,'2',"33333333")

    apply
    // apply(立即执行，参数是一个数组存储)
    fish.Swimming.apply(bird,['2','asd'])


4. new绑定
    function foo() {
        console.log(this);
    }
    foo(); //window
    new foo(); //foo这个new出来的对象

5. 箭头函数绑定
    this始终指向它被创建时所处的词法作用域中的this

    // 例子1
    const obj = {
        getName: () => {
            console.log(this); //调用前this是什么,函数里面的this就是什么
        }
    };
    obj.getName()//window
    // 例子2
    var b = {
        getThis: function () {
            return {
                fun: () => {
                    console.log(this);
                }
            }
        }
    }
    b.getThis().fun()//返回{getThis:f}就是b对象
    // 例子3
    name = 'window'
    var obj = {
        name: "obj",
        fn: function () {
            name = "obj1"
            console.log(this.name + "dddd");
            return {
                name: "obj2",
                fn1: function () {
                    name = "obj3"
                    console.log(this.name + "aaaaaaa");

                    // return () => {
                    //     console.log(this.name + "bbbbbbbbbb");
                    // }
                    return function () {
                        name = "obj4"
                        console.log(this.name + "bbbbbbbbbb");
                    }

                },
                fn2: () => {
                    console.log(this.name + "cccccccccccc");
                }
            }
        },
    }

    var newObj = obj.fn();
    var newObj1 = newObj.fn1()
    newObj1();
    newObj.fn2();
```