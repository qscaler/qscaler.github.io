### Object.getOwnPropertyDescriptors()

1.  ES5 的Object.getOwnPropertyDescriptor()方法会返回某个对象属性的描述对象（descriptor）。ES2017 引入了Object.getOwnPropertyDescriptors()方法，返回指定对象所有自身属性（非继承属性）的描述对象。

    ```js

    const obj = {
        foo: 123,
        get bar() { return 'abc' }
    };

    Object.getOwnPropertyDescriptors(obj)
    // { foo:
    //    { value: 123,
    //      writable: true,
    //      enumerable: true,
    //      configurable: true },
    //   bar:
    //    { get: [Function: get bar],
    //      set: undefined,
    //      enumerable: true,
    //      configurable: true } }
    上面代码中，Object.getOwnPropertyDescriptors()方法返回一个对象，所有原对象的属性名都是该对象的属性名，对应的属性值就是该属性的描述对象。

    该方法的实现非常容易。

    function getOwnPropertyDescriptors(obj) {
        const result = {};
        for (let key of Reflect.ownKeys(obj)) {
            result[key] = Object.getOwnPropertyDescriptor(obj, key);
        }
        return result;
    }
    ----------------该方法的引入目的，主要是为了解决Object.assign()无法正确拷贝get属性和set属性的问题。--------------------------

    const source = {
        set foo(value) {
            console.log(value);
        }
    };

    const target1 = {};
    Object.assign(target1, source);

    Object.getOwnPropertyDescriptor(target1, 'foo')
    // { value: undefined,
    //   writable: true,
    //   enumerable: true,
    //   configurable: true }
    上面代码中，source对象的foo属性的值是一个赋值函数，Object.assign方法将这个属性拷贝给target1对象，结果该属性的值变成了undefined。这是因为Object.assign方法总是拷贝一个属性的值，而不会拷贝它背后的赋值方法或取值方法。

    这时，Object.getOwnPropertyDescriptors()方法配合Object.defineProperties()方法，就可以实现正确拷贝。

    const source = {
        set foo(value) {
            console.log(value);
        }
    };

    const target2 = {};
    Object.defineProperties(target2, Object.getOwnPropertyDescriptors(source));
    Object.getOwnPropertyDescriptor(target2, 'foo')
    // { get: undefined,
    //   set: [Function: set foo],
    //   enumerable: true,
    //   configurable: true }
    上面代码中，两个对象合并的逻辑可以写成一个函数。

    const shallowMerge = (target, source) => Object.defineProperties(
        target,
        Object.getOwnPropertyDescriptors(source)
    );
    Object.getOwnPropertyDescriptors()方法的另一个用处，是配合Object.create()方法，将对象属性克隆到一个新对象。这属于浅拷贝。

    const clone = Object.create(Object.getPrototypeOf(obj),
    Object.getOwnPropertyDescriptors(obj));

    // 或者

    const shallowClone = (obj) => Object.create(
        Object.getPrototypeOf(obj),
        Object.getOwnPropertyDescriptors(obj)
    );
    上面代码会克隆对象obj。

    另外，Object.getOwnPropertyDescriptors()方法可以实现一个对象继承另一个对象。以前，继承另一个对象，常常写成下面这样。

    const obj = {
        __proto__: prot,
        foo: 123,
    };
    ES6 规定__proto__只有浏览器要部署，其他环境不用部署。如果去除__proto__，上面代码就要改成下面这样。

    const obj = Object.create(prot);
    obj.foo = 123;

    // 或者

    const obj = Object.assign(
        Object.create(prot),
        {
            foo: 123,
        }
    );
    有了Object.getOwnPropertyDescriptors()，我们就有了另一种写法。

    const obj = Object.create(
        prot,
        Object.getOwnPropertyDescriptors({
            foo: 123,
        })
    );
    Object.getOwnPropertyDescriptors()也可以用来实现 Mixin（混入）模式。

    let mix = (object) => ({
         with: (...mixins) => mixins.reduce(
        (c, mixin) => Object.create(c, Object.getOwnPropertyDescriptors(mixin)
        ), object)
    });

    // multiple mixins example
    let a = {a: 'a'};
    let b = {b: 'b'};
    let c = {c: 'c'};
    let d = mix(c).with(a, b);

    d.c // "c"
    d.b // "b"
    d.a // "a"
    上面代码返回一个新的对象d，代表了对象a和b被混入了对象c的操作。
    ```
    出于完整性的考虑，Object.getOwnPropertyDescriptors()进入标准以后，以后还会新增Reflect.getOwnPropertyDescriptors()方法。