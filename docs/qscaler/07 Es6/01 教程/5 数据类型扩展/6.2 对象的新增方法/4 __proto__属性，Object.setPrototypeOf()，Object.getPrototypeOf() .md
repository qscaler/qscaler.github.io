### 4 __proto__属性，Object.setPrototypeOf()，Object.getPrototypeOf()

JavaScript 语言的对象继承是通过原型链实现的。ES6 提供了更多原型对象的操作方法。

1.  __proto__属性
    __proto__属性（前后各两个下划线），用来读取或设置当前对象的原型对象（prototype）。目前，所有浏览器（包括 IE11）都部署了这个属性。

    ```js

    // es5 的写法
    const obj = {
    method: function() { ... }
    };
    obj.__proto__ = someOtherObj;

    // es6 的写法
    var obj = Object.create(someOtherObj);
    obj.method = function() { ... };
    该属性没有写入 ES6 的正文，而是写入了附录，原因是__proto__前后的双下划线，说明它本质上是一个内部属性，而不是一个正式的对外的 API，只是由于浏览器广泛支持，才被加入了 ES6。标准明确规定，只有浏览器必须部署这个属性，其他运行环境不一定需要部署，而且新的代码最好认为这个属性是不存在的。因此，无论从语义的角度，还是从兼容性的角度，都不要使用这个属性，而是使用下面的Object.setPrototypeOf()（写操作）、Object.getPrototypeOf()（读操作）、Object.create()（生成操作）代替。

    实现上，__proto__调用的是Object.prototype.__proto__，具体实现如下。

    Object.defineProperty(Object.prototype, '__proto__', {
    get() {
        let _thisObj = Object(this);
        return Object.getPrototypeOf(_thisObj);
    },
    set(proto) {
        if (this === undefined || this === null) {
        throw new TypeError();
        }
        if (!isObject(this)) {
        return undefined;
        }
        if (!isObject(proto)) {
        return undefined;
        }
        let status = Reflect.setPrototypeOf(this, proto);
        if (!status) {
        throw new TypeError();
        }
    },
    });

    function isObject(value) {
    return Object(value) === value;
    }
    如果一个对象本身部署了__proto__属性，该属性的值就是对象的原型。

    Object.getPrototypeOf({ __proto__: null })
    // null
    ```
2.  Object.setPrototypeOf()

    Object.setPrototypeOf方法的作用与__proto__相同，用来设置一个对象的原型对象（prototype），返回参数对象本身。它是 ES6 正式推荐的设置原型对象的方法。

    ```js
    // 格式
    Object.setPrototypeOf(object, prototype)

    // 用法
    const o = Object.setPrototypeOf({}, null);
    该方法等同于下面的函数。

    function setPrototypeOf(obj, proto) {
    obj.__proto__ = proto;
        return obj;
    }
    下面是一个例子。

    let proto = {};
    let obj = { x: 10 };
    Object.setPrototypeOf(obj, proto);

    proto.y = 20;
    proto.z = 40;

    obj.x // 10
    obj.y // 20
    obj.z // 40
    上面代码将proto对象设为obj对象的原型，所以从obj对象可以读取proto对象的属性。

    如果第一个参数不是对象，会自动转为对象。但是由于返回的还是第一个参数，所以这个操作不会产生任何效果。

    Object.setPrototypeOf(1, {}) === 1 // true
    Object.setPrototypeOf('foo', {}) === 'foo' // true
    Object.setPrototypeOf(true, {}) === true // true
    由于undefined和null无法转为对象，所以如果第一个参数是undefined或null，就会报错。

    Object.setPrototypeOf(undefined, {})
    // TypeError: Object.setPrototypeOf called on null or undefined

    Object.setPrototypeOf(null, {})
    // TypeError: Object.setPrototypeOf called on null or undefined
    ```

3.  Object.getPrototypeOf()
    该方法与Object.setPrototypeOf方法配套，用于读取一个对象的原型对象。

    ```js
    Object.getPrototypeOf(obj);
    下面是一个例子。

    function Rectangle() {
    // ...
    }

    const rec = new Rectangle();

    Object.getPrototypeOf(rec) === Rectangle.prototype
    // true

    Object.setPrototypeOf(rec, Object.prototype);
    Object.getPrototypeOf(rec) === Rectangle.prototype
    // false
    如果参数不是对象，会被自动转为对象。

    // 等同于 Object.getPrototypeOf(Number(1))
    Object.getPrototypeOf(1)
    // Number {[[PrimitiveValue]]: 0}

    // 等同于 Object.getPrototypeOf(String('foo'))
    Object.getPrototypeOf('foo')
    // String {length: 0, [[PrimitiveValue]]: ""}

    // 等同于 Object.getPrototypeOf(Boolean(true))
    Object.getPrototypeOf(true)
    // Boolean {[[PrimitiveValue]]: false}

    Object.getPrototypeOf(1) === Number.prototype // true
    Object.getPrototypeOf('foo') === String.prototype // true
    Object.getPrototypeOf(true) === Boolean.prototype // true
    如果参数是undefined或null，它们无法转为对象，所以会报错。

    Object.getPrototypeOf(null)
    // TypeError: Cannot convert undefined or null to object

    Object.getPrototypeOf(undefined)
    // TypeError: Cannot convert undefined or null to object
    Object.keys()，Object.values()，Object.entries()
    ```