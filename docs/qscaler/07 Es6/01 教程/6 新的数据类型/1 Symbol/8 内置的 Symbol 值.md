###  8 内置的 Symbol 值

1.  **除了定义自己使用的 Symbol 值以外，ES6 还提供了 11 个内置的 Symbol 值，指向语言内部使用的方法**。
    ```js
    1.  Symbol.hasInstance
    2.  Symbol.isConcatSpreadable
    3.  Symbol.species
    4.  Symbol.match
    5.  Symbol.replace
    6.  Symbol.search
    7.  Symbol.split
    8.  Symbol.iterator
    9.  Symbol.toPrimitive 
    10.  Symbol.toStringTag
    11.  Symbol.unscopables
    ```
2. 详解
    ```js
    Symbol.hasInstance
    对象的Symbol.hasInstance属性，指向一个内部方法。当其他对象使用instanceof运算符，判断是否为该对象的实例时，会调用这个方法。比如，foo instanceof Foo在语言内部，实际调用的是Foo[Symbol.hasInstance](foo)。

    class MyClass {
    [Symbol.hasInstance](foo) {
        return foo instanceof Array;
    }
    }

    [1, 2, 3] instanceof new MyClass() // true
    上面代码中，MyClass是一个类，new MyClass()会返回一个实例。该实例的Symbol.hasInstance方法，会在进行instanceof运算时自动调用，判断左侧的运算子是否为Array的实例。

    下面是另一个例子。

    class Even {
    static [Symbol.hasInstance](obj) {
        return Number(obj) % 2 === 0;
    }
    }

    // 等同于
    const Even = {
    [Symbol.hasInstance](obj) {
        return Number(obj) % 2 === 0;
    }
    };

    1 instanceof Even // false
    2 instanceof Even // true
    12345 instanceof Even // false
    Symbol.isConcatSpreadable
    对象的Symbol.isConcatSpreadable属性等于一个布尔值，表示该对象用于Array.prototype.concat()时，是否可以展开。

    let arr1 = ['c', 'd'];
    ['a', 'b'].concat(arr1, 'e') // ['a', 'b', 'c', 'd', 'e']
    arr1[Symbol.isConcatSpreadable] // undefined

    let arr2 = ['c', 'd'];
    arr2[Symbol.isConcatSpreadable] = false;
    ['a', 'b'].concat(arr2, 'e') // ['a', 'b', ['c','d'], 'e']
    上面代码说明，数组的默认行为是可以展开，Symbol.isConcatSpreadable默认等于undefined。该属性等于true时，也有展开的效果。

    类似数组的对象正好相反，默认不展开。它的Symbol.isConcatSpreadable属性设为true，才可以展开。

    let obj = {length: 2, 0: 'c', 1: 'd'};
    ['a', 'b'].concat(obj, 'e') // ['a', 'b', obj, 'e']

    obj[Symbol.isConcatSpreadable] = true;
    ['a', 'b'].concat(obj, 'e') // ['a', 'b', 'c', 'd', 'e']
    Symbol.isConcatSpreadable属性也可以定义在类里面。

    class A1 extends Array {
    constructor(args) {
        super(args);
        this[Symbol.isConcatSpreadable] = true;
    }
    }
    class A2 extends Array {
    constructor(args) {
        super(args);
    }
    get [Symbol.isConcatSpreadable] () {
        return false;
    }
    }
    let a1 = new A1();
    a1[0] = 3;
    a1[1] = 4;
    let a2 = new A2();
    a2[0] = 5;
    a2[1] = 6;
    [1, 2].concat(a1).concat(a2)
    // [1, 2, 3, 4, [5, 6]]
    上面代码中，类A1是可展开的，类A2是不可展开的，所以使用concat时有不一样的结果。

    注意，Symbol.isConcatSpreadable的位置差异，A1是定义在实例上，A2是定义在类本身，效果相同。

    Symbol.species
    对象的Symbol.species属性，指向一个构造函数。创建衍生对象时，会使用该属性。

    class MyArray extends Array {
    }

    const a = new MyArray(1, 2, 3);
    const b = a.map(x => x);
    const c = a.filter(x => x > 1);

    b instanceof MyArray // true
    c instanceof MyArray // true
    上面代码中，子类MyArray继承了父类Array，a是MyArray的实例，b和c是a的衍生对象。你可能会认为，b和c都是调用数组方法生成的，所以应该是数组（Array的实例），但实际上它们也是MyArray的实例。

    Symbol.species属性就是为了解决这个问题而提供的。现在，我们可以为MyArray设置Symbol.species属性。

    class MyArray extends Array {
    static get [Symbol.species]() { return Array; }
    }
    上面代码中，由于定义了Symbol.species属性，创建衍生对象时就会使用这个属性返回的函数，作为构造函数。这个例子也说明，定义Symbol.species属性要采用get取值器。默认的Symbol.species属性等同于下面的写法。

    static get [Symbol.species]() {
    return this;
    }
    现在，再来看前面的例子。

    class MyArray extends Array {
    static get [Symbol.species]() { return Array; }
    }

    const a = new MyArray();
    const b = a.map(x => x);

    b instanceof MyArray // false
    b instanceof Array // true
    上面代码中，a.map(x => x)生成的衍生对象，就不是MyArray的实例，而直接就是Array的实例。

    再看一个例子。

    class T1 extends Promise {
    }

    class T2 extends Promise {
    static get [Symbol.species]() {
        return Promise;
    }
    }

    new T1(r => r()).then(v => v) instanceof T1 // true
    new T2(r => r()).then(v => v) instanceof T2 // false
    上面代码中，T2定义了Symbol.species属性，T1没有。结果就导致了创建衍生对象时（then方法），T1调用的是自身的构造方法，而T2调用的是Promise的构造方法。

    总之，Symbol.species的作用在于，实例对象在运行过程中，需要再次调用自身的构造函数时，会调用该属性指定的构造函数。它主要的用途是，有些类库是在基类的基础上修改的，那么子类使用继承的方法时，作者可能希望返回基类的实例，而不是子类的实例。

    Symbol.match
    对象的Symbol.match属性，指向一个函数。当执行str.match(myObject)时，如果该属性存在，会调用它，返回该方法的返回值。

    String.prototype.match(regexp)
    // 等同于
    regexp[Symbol.match](this)

    class MyMatcher {
    [Symbol.match](string) {
        return 'hello world'.indexOf(string);
    }
    }

    'e'.match(new MyMatcher()) // 1
    Symbol.replace
    对象的Symbol.replace属性，指向一个方法，当该对象被String.prototype.replace方法调用时，会返回该方法的返回值。

    String.prototype.replace(searchValue, replaceValue)
    // 等同于
    searchValue[Symbol.replace](this, replaceValue)
    下面是一个例子。

    const x = {};
    x[Symbol.replace] = (...s) => console.log(s);

    'Hello'.replace(x, 'World') // ["Hello", "World"]
    Symbol.replace方法会收到两个参数，第一个参数是replace方法正在作用的对象，上面例子是Hello，第二个参数是替换后的值，上面例子是World。

    Symbol.search
    对象的Symbol.search属性，指向一个方法，当该对象被String.prototype.search方法调用时，会返回该方法的返回值。

    String.prototype.search(regexp)
    // 等同于
    regexp[Symbol.search](this)

    class MySearch {
    constructor(value) {
        this.value = value;
    }
    [Symbol.search](string) {
        return string.indexOf(this.value);
    }
    }
    'foobar'.search(new MySearch('foo')) // 0
    Symbol.split
    对象的Symbol.split属性，指向一个方法，当该对象被String.prototype.split方法调用时，会返回该方法的返回值。

    String.prototype.split(separator, limit)
    // 等同于
    separator[Symbol.split](this, limit)
    下面是一个例子。

    class MySplitter {
    constructor(value) {
        this.value = value;
    }
    [Symbol.split](string) {
        let index = string.indexOf(this.value);
        if (index === -1) {
        return string;
        }
        return [
        string.substr(0, index),
        string.substr(index + this.value.length)
        ];
    }
    }

    'foobar'.split(new MySplitter('foo'))
    // ['', 'bar']

    'foobar'.split(new MySplitter('bar'))
    // ['foo', '']

    'foobar'.split(new MySplitter('baz'))
    // 'foobar'
    上面方法使用Symbol.split方法，重新定义了字符串对象的split方法的行为，

    Symbol.iterator
    对象的Symbol.iterator属性，指向该对象的默认遍历器方法。

    const myIterable = {};
    myIterable[Symbol.iterator] = function* () {
    yield 1;
    yield 2;
    yield 3;
    };

    [...myIterable] // [1, 2, 3]
    对象进行for...of循环时，会调用Symbol.iterator方法，返回该对象的默认遍历器，详细介绍参见《Iterator 和 for...of 循环》一章。

    class Collection {
    *[Symbol.iterator]() {
        let i = 0;
        while(this[i] !== undefined) {
        yield this[i];
        ++i;
        }
    }
    }

    let myCollection = new Collection();
    myCollection[0] = 1;
    myCollection[1] = 2;

    for(let value of myCollection) {
    console.log(value);
    }
    // 1
    // 2
    Symbol.toPrimitive
    对象的Symbol.toPrimitive属性，指向一个方法。该对象被转为原始类型的值时，会调用这个方法，返回该对象对应的原始类型值。

    Symbol.toPrimitive被调用时，会接受一个字符串参数，表示当前运算的模式，一共有三种模式。

    Number：该场合需要转成数值
    String：该场合需要转成字符串
    Default：该场合可以转成数值，也可以转成字符串
    let obj = {
    [Symbol.toPrimitive](hint) {
        switch (hint) {
        case 'number':
            return 123;
        case 'string':
            return 'str';
        case 'default':
            return 'default';
        default:
            throw new Error();
        }
    }
    };

    2 * obj // 246
    3 + obj // '3default'
    obj == 'default' // true
    String(obj) // 'str'
    Symbol.toStringTag
    对象的Symbol.toStringTag属性，指向一个方法。在该对象上面调用Object.prototype.toString方法时，如果这个属性存在，它的返回值会出现在toString方法返回的字符串之中，表示对象的类型。也就是说，这个属性可以用来定制[object Object]或[object Array]中object后面的那个字符串。

    // 例一
    ({[Symbol.toStringTag]: 'Foo'}.toString())
    // "[object Foo]"

    // 例二
    class Collection {
    get [Symbol.toStringTag]() {
        return 'xxx';
    }
    }
    let x = new Collection();
    Object.prototype.toString.call(x) // "[object xxx]"
    ES6 新增内置对象的Symbol.toStringTag属性值如下。

    JSON[Symbol.toStringTag]：'JSON'
    Math[Symbol.toStringTag]：'Math'
    Module 对象M[Symbol.toStringTag]：'Module'
    ArrayBuffer.prototype[Symbol.toStringTag]：'ArrayBuffer'
    DataView.prototype[Symbol.toStringTag]：'DataView'
    Map.prototype[Symbol.toStringTag]：'Map'
    Promise.prototype[Symbol.toStringTag]：'Promise'
    Set.prototype[Symbol.toStringTag]：'Set'
    %TypedArray%.prototype[Symbol.toStringTag]：'Uint8Array'等
    WeakMap.prototype[Symbol.toStringTag]：'WeakMap'
    WeakSet.prototype[Symbol.toStringTag]：'WeakSet'
    %MapIteratorPrototype%[Symbol.toStringTag]：'Map Iterator'
    %SetIteratorPrototype%[Symbol.toStringTag]：'Set Iterator'
    %StringIteratorPrototype%[Symbol.toStringTag]：'String Iterator'
    Symbol.prototype[Symbol.toStringTag]：'Symbol'
    Generator.prototype[Symbol.toStringTag]：'Generator'
    GeneratorFunction.prototype[Symbol.toStringTag]：'GeneratorFunction'
    Symbol.unscopables
    对象的Symbol.unscopables属性，指向一个对象。该对象指定了使用with关键字时，哪些属性会被with环境排除。

    Array.prototype[Symbol.unscopables]
    // {
    //   copyWithin: true,
    //   entries: true,
    //   fill: true,
    //   find: true,
    //   findIndex: true,
    //   includes: true,
    //   keys: true
    // }

    Object.keys(Array.prototype[Symbol.unscopables])
    // ['copyWithin', 'entries', 'fill', 'find', 'findIndex', 'includes', 'keys']
    上面代码说明，数组有 7 个属性，会被with命令排除。

    // 没有 unscopables 时
    class MyClass {
    foo() { return 1; }
    }

    var foo = function () { return 2; };

    with (MyClass.prototype) {
    foo(); // 1
    }

    // 有 unscopables 时
    class MyClass {
    foo() { return 1; }
    get [Symbol.unscopables]() {
        return { foo: true };
    }
    }

    var foo = function () { return 2; };

    with (MyClass.prototype) {
    foo(); // 2
    }
    上面代码通过指定Symbol.unscopables属性，使得with语法块不会在当前作用域寻找foo属性，即foo将指向外层作用域的变量。
    ```