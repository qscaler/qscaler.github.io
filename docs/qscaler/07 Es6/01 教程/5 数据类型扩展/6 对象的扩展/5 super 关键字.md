### 6 super 关键字

1.  我们知道，this关键字总是指向函数所在的当前对象，**ES6 又新增了另一个类似的关键字super，指向当前对象的原型对象**。

    ```js
    const proto = {
        foo: 'hello'
    };

    const obj = {
        foo: 'world',
        find() {
            return super.foo;
        }
    };

    Object.setPrototypeOf(obj, proto);
    obj.find() // "hello"
    上面代码中，对象obj.find()方法之中，通过super.foo引用了原型对象proto的foo属性。
    ```

2.  注意，super关键字表示原型对象时，只能用在对象的方法之中，用在其他地方都会报错。

    ```js
    // 报错
    const obj = {
        foo: super.foo
    }

    // 报错
    const obj = {
        foo: () => super.foo
    }

    // 报错
    const obj = {
        foo: function () {
            return super.foo
        }
    }
    上面三种super的用法都会报错，因为对于 JavaScript 引擎来说，这里的super都没有用在对象的方法之中。第一种写法是super用在属性里面，第二种和第三种写法是super用在一个函数里面，然后赋值给foo属性。目前，只有对象方法的简写法可以让 JavaScript 引擎确认，定义的是对象的方法。

    JavaScript 引擎内部，super.foo等同于Object.getPrototypeOf(this).foo（属性）或Object.getPrototypeOf(this).foo.call(this)（方法）。

    const proto = {
        x: 'hello',
        foo() {
            console.log(this.x);
        },
    };

    const obj = {
        x: 'world',
        foo() {
            super.foo();
        }
    }

    Object.setPrototypeOf(obj, proto);

    obj.foo() // "world"
    上面代码中，super.foo指向原型对象proto的foo方法，但是绑定的this却还是当前对象obj，因此输出的就是world。
    ```