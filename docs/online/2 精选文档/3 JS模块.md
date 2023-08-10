---
title: 3 JS模块
---
<div class="content__default">

##  1 数据类型基础

###  1.1 JS内置类型

*   `JS` 中分为七种内置类型，七种内置类型又分为两大类型：基本类型和对象（`Object`）。
*   基本类型有七种： `null`，`undefined`，`boolean`，`number`，`string`，`symbol`, `bigint`
    *   `BigInt` 是 `ES10` 新增的数据类型
    *   `Symbol` 代表独一无二的值，最大的用法是用来定义对象的唯一属性名。
    *   `BigInt` 可以表示任意大小的整数。
*   其中 `JS` 的数字类型是浮点类型的，没有整型。并且浮点类型基于 `IEEE 754`标准实现，在使用中会遇到某些 Bug。`NaN` 也属于 `number` 类型，并且 `NaN` 不等于自身。
*   对于基本类型来说，如果使用字面量的方式，那么这个变量只是个字面量，只有在必要的时候才会转换为对应的类型。

**引用数据类型:**

*   对象`Object`（包含普通对象-`Object`，数组对象-`Array`，正则对象-`RegExp`，日期对象-`Date`，数学函数-`Math`，函数对象-`Function`）

```jsx

    let a = 111 // 这只是字面量，不是 number 类型
    a.toString() // 使用时候才会转换为对象类型
```

> 对象（`Object`）是引用类型，在使用过程中会遇到浅拷贝和深拷贝的问题。

```jsx

    let a = { name: 'FE' }
    let b = a
    b.name = 'EF'
    console.log(a.name) // EF
```

**说出下面运行的结果，解释原因。**

```jsx

    function test(person) {
      person.age = 26
      person = {
        name: 'hzj',
        age: 18
      }
      return person
    }
    const p1 = {
      name: 'fyq',
      age: 19
    }
    const p2 = test(p1)
    console.log(p1) // -> ?
    console.log(p2) // -> ?
```

```jsx

    // 结果:
    p1：{name: “fyq”, age: 26}
    p2：{name: “hzj”, age: 18}
```

> 原因: 在函数传参的时候传递的是对象在堆中的内存地址值，test函数中的实参person是p1对象的内存地址，通过调用`person.age = 26`确实改变了p1的值，但随后`person`变成了另一块内存空间的地址，并且在最后将这另外一份内存空间的地址返回，赋给了p2。

###  1.2 null和undefined区别

> `Undefined`类型只有一个值，即`undefined`。当声明的变量还未被初始化时，变量的默认值为`undefined`。用法

*   变量被声明了，但没有赋值时，就等于`undefined`。
*   调用函数时，应该提供的参数没有提供，该参数等于`undefined`。
*   对象没有赋值的属性，该属性的值为`undefined`。
*   函数没有返回值时，默认返回`undefined`

> `Null`类型也只有一个值，即`null`。`null`用来表示尚未存在的对象，常用来表示函数企图返回一个不存在的对象。用法

*   作为函数的参数，表示该函数的参数不是对象。
*   作为对象原型链的终点

###  1.3 null是对象吗？为什么？

结论: `null`不是对象。

> 解释: 虽然 `typeof null` 会输出 object，但是这只是 JS 存在的一个悠久 Bug。在 JS 的最初版本中使用的是 32 位系统，为了性能考虑使用低位存储变量的类型信息，000 开头代表是对象然而 null 表示为全零，所以将它错误的判断为 object 。

### 为什么可以调用？

其实在这个语句运行的过程中做了这样几件事情：

```jsx

    var s = new Object('1');
    s.toString();
    s = null;
```

*   第一步: 创建Object类实例。注意为什么不是String ？ 由于Symbol和BigInt的出现，对它们调用new都会报错，目前ES6规范也不建议用new来创建基本类型的包装类。
*   第二步: 调用实例方法。
*   第三步: 执行完方法立即销毁这个实例。

> 整个过程体现了`基本包装类型`的性质，而基本包装类型恰恰属于`基本数据类型`，包括Boolean, Number和String。

###  1.5 0.1+0.2为什么不等于0.3？如何让其相等

> `0.1`和`0.2`在转换成二进制后会无限循环，由于标准位数的限制后面多余的位数会被截掉，此时就已经出现了精度的损失，相加后因浮点数小数位的限制而截断的二进制数字在转换为十进制就会变成`0.30000000000000004`

我们都知道计算机时是通过二进制来进行计算的，即 `0` 和 `1`

*   就拿 `0.1 + 0.2` 来说，`0.1`表示为`0.0001100110011001...`，而`0.2`表示为`0.0011001100110011...`
*   而在二进制中 `1 + 1 = 10`，所以 `0.1 + 0.2 = 0.0100110011001100...`
*   转成`10`进制就近似表示为 `0.30000000000000004`

> 简单来说就是，**浮点数转成二进制时丢失了精度，因此在二进制计算完再转回十进制时可能会和理论结果不同**

**1\. ES6提供的Number.EPSILON方法**

```jsx

    function isEqual(a, b) {
      return Math.abs(a - b) < Number.EPSILON;
    }

    console.log(isEqual(0.1 + 0.2, 0.3)); // true
```

> `Number.EPSILON` 的实质是一个可以接受的最小误差范围，一般来说为 `Math.pow(2, -52)`

**2\. 乘以一个10的幂次方**

> 把需要计算的数字乘以`10`的`n`次方，让数值都变为整数，计算完后再除以`10`的`n`次方，这样就不会出现浮点数精度丢失问题

```jsx

    (0.1*10 + 0.2*10) / 10 == 0.3 //true
```

###  1.6 如何理解BigInt

**什么是BigInt?**

> `BigInt`是一种新的数据类型，用于当整数值大于Number数据类型支持的范围时。这种数据类型允许我们安全地对大整数执行算术操作，表示高分辨率的时间戳，使用大整数id，等等，而不需要使用库。

**为什么需要BigInt?**

在JS中，所有的数字都以双精度64位浮点格式表示，那这会带来什么问题呢？

> 这导致JS中的Number无法精确表示非常大的整数，它会将非常大的整数四舍五入，确切地说，JS中的`Number`类型只能安全地表示`-9007199254740991(-(2^53-1))和9007199254740991（(2^53-1)）`，任何超出此范围的整数值都可能失去精度。

```jsx

    console.log(999999999999999);  //=>10000000000000000
```

同时也会有一定的安全性问题:

```jsx

    9007199254740992 === 9007199254740993;    // → true 居然是true!
```

**如何创建并使用BigInt？**

要创建`BigInt`，只需要在数字末尾追加`n`即可

```jsx

    console.log( 9007199254740995n );    // → 9007199254740995n	
    console.log( 9007199254740995 );     // → 9007199254740996
```

另一种创建`BigInt`的方法是用`BigInt()`构造函数

```jsx

    BigInt("9007199254740995");    // → 9007199254740995n
```

简单使用如下:

```jsx

    10n + 20n;    // → 30n	
    10n - 20n;    // → -10n	
    +10n;         // → TypeError: Cannot convert a BigInt value to a number	
    -10n;         // → -10n	
    10n * 20n;    // → 200n	
    20n / 10n;    // → 2n	
    23n % 10n;    // → 3n	
    10n ** 3n;    // → 1000n	

    const x = 10n;	
    ++x;          // → 11n	
    --x;          // → 9n
    console.log(typeof x);   //"bigint"
```

**值得警惕的点**

> `BigInt`不支持一元加号运算符, 这可能是某些程序可能依赖于 + 始终生成 `Number` 的不变量，或者抛出异常。另外，更改 `+` 的行为也会破坏 `asm.js` 代码。

因为隐式类型转换可能丢失信息，所以不允许在`bigint`和 `Number` 之间进行混合操作。当混合使用大整数和浮点数时，结果值可能无法由`BigInt`或`Number`精确表示。

```jsx

    10 + 10n;    // → TypeError
```

> 不能将`BigInt`传递给`Web api`和内置的 JS 函数，这些函数需要一个 Number 类型的数字。尝试这样做会报TypeError错误。

```jsx

    Math.max(2n, 4n, 6n);    // → TypeError
```

> 当 `Boolean` 类型与 `BigInt` 类型相遇时，`BigInt` 的处理方式与`Number`类似，换句话说，只要不是`0n`，`BigInt`就被视为`truthy`的值。

```jsx

    if(0n){//条件判断为false

    }
    if(3n){//条件为true

    }
```

*   元素都为BigInt的数组可以进行sort。
*   `BigInt`可以正常地进行位运算，如`|`、`&`、`<<`、`>>`和`^`

**浏览器兼容性**

caniuse的结果:

![](https://s.poetries.work/images/20210309092826.png)

其实现在的兼容性并不怎么好，只有chrome67、firefox、Opera这些主流实现，要正式成为规范，其实还有很长的路要走

###  1.7 JS 整数是怎么表示的

> 通过 Number 类型来表示，遵循 IEEE754 标准，通过 64 位来表示一个数字，（1 + 11 + 52），最大安全数字是 Math.pow(2, 53) - 1，对于 16 位十进制。（符号位 + 指数位 + 小数部分有效位）

###  的存储空间是多大？如果后台发送了一个超过最大自己的数字怎么办

> Math.pow(2, 53) ，53 为有效数字，会发生截断，等于 JS 能支持的最大数字。

##  2 数据类型检测

###  2.1 typeof类型判断

> 在写业务逻辑的时候，经常要用到JS数据类型的判断，面试常见的案例深浅拷贝也要用到数据类型的判断。

**typeof**

```jsx

    console.log(typeof 2);               // number
    console.log(typeof true);            // boolean
    console.log(typeof 'str');           // string
    console.log(typeof undefined);       // undefined
    console.log(typeof function(){});    // function
    console.log(typeof Symbol("foo")); // symbol
    console.log(typeof 2172141653n); // bigint

    // 不能判别
    console.log(typeof []); // object
    console.log(typeof {}); // object
    console.log(typeof null); // object
```

> 优点：能够快速区分基本数据类型 缺点：不能将`Object`、`Array`和`Null`区分，都返回`object`

**instanceof**

```jsx

    console.log(2 instanceof Number);                    // false
    console.log(true instanceof Boolean);                // false 
    console.log('str' instanceof String);                // false  
    console.log([] instanceof Array);                    // true
    console.log(function(){} instanceof Function);       // true
    console.log({} instanceof Object);                   // true
```

*   优点：能够区分`Array`、`Object`和`Function`，适合用于判断自定义的类实例对象
*   缺点：`Number`，`Boolean`，`String`基本数据类型不能判断

> 其内部运行机制是判断在其原型链中能否找到该类型的原型

```jsx

    class People {}
    class Student extends People {}

    const stu = new Student();

    console.log(stu instanceof People); // true
    console.log(stu instanceof Student); // true
```

其实现就是顺着原型链去找，如果能找到对应的 `Xxxxx.prototype`  即为 `true` 。比如这里的 `stu`  作为实例，顺着原型链能找到 `Student.prototype`  及 `People.prototype` ，所以都为 `true`

**Object.prototype.toString.call()**

```jsx

    var toString = Object.prototype.toString;

    console.log(toString.call(2));                      //[object Number]
    console.log(toString.call(true));                   //[object Boolean]
    console.log(toString.call('str'));                  //[object String]
    console.log(toString.call([]));                     //[object Array]
    console.log(toString.call(function(){}));           //[object Function]
    console.log(toString.call({}));                     //[object Object]
    console.log(toString.call(undefined));              //[object Undefined]
    console.log(toString.call(null));                   //[object Null]
```

*   优点：精准判断数据类型，所有原始数据类型都是能判断的，还有 `Error` 对象，`Date` 对象等
*   缺点：写法繁琐不容易记，推荐进行封装后使用

```jsx

    Object.prototype.toString.call(2); // "[object Number]"
    Object.prototype.toString.call(""); // "[object String]"
    Object.prototype.toString.call(true); // "[object Boolean]"
    Object.prototype.toString.call(undefined); // "[object Undefined]"
    Object.prototype.toString.call(null); // "[object Null]"
    Object.prototype.toString.call(Math); // "[object Math]"
    Object.prototype.toString.call({}); // "[object Object]"
    Object.prototype.toString.call([]); // "[object Array]"
    Object.prototype.toString.call(function () {}); // "[object Function]"
```

在面试中有一个经常被问的问题就是：如何判断变量是否为数组？

```jsx

    Array.isArray(arr); // true
    arr.__proto__ === Array.prototype; // true
    arr instanceof Array; // true
    Object.prototype.toString.call(arr); // "[object Array]"
```

**判断是否是promise对象**

```jsx

    function isPromise (val) {
        return (
          typeof val.then === 'function' &&
          typeof val.catch === 'function'
        )
    }
```

###  2.2 typeof 于 instanceof 区别

> `typeof` 对于基本类型，除了 `null`都可以显示正确的类型

```jsx

    typeof 1 // 'number'
    typeof '1' // 'string'
    typeof undefined // 'undefined'
    typeof true // 'boolean'
    typeof Symbol() // 'symbol'
    typeof b // b 没有声明，但是还会显示 undefined
```

> `typeof` 对于对象，除了函数都会显示 `object`

```jsx

    typeof [] // 'object'
    typeof {} // 'object'
    typeof console.log // 'function'
```

> 对于 `null` 来说，虽然它是基本类型，但是会显示 `object`，这是一个存在很久了的 `Bug`

```jsx

    typeof null // 'object'
```

> `instanceof` 可以正确的判断对象的类型，因为内部机制是通过判断对象的原型链中是不是能找到类型的 `iprototype`

```jsx

    // 我们也可以试着实现一下 instanceof
    function _instanceof(left, right) {
        // 由于instance要检测的是某对象，需要有一个前置判断条件
        //基本数据类型直接返回false
        if(typeof left !== 'object' || left === null) return false;

        // 获得类型的原型
        let prototype = right.prototype
        // 获得对象的原型
        left = left.__proto__
        // 判断对象的类型是否等于类型的原型
        while (true) {
        	if (left === null)
        		return false
        	if (prototype === left)
        		return true
        	left = left.__proto__
        }
    }

    console.log('test', _instanceof(null, Array)) // false
    console.log('test', _instanceof([], Array)) // true
    console.log('test', _instanceof('', Array)) // false
    console.log('test', _instanceof({}, Object)) // true
```

###  2.3 Object.is和===的区别

> `Object`在严格等于的基础上修复了一些特殊情况下的失误，具体来说就是`+0`和`-0`，`NaN`和`NaN`。 源码如下

```jsx

    function is(x, y) {
      if (x === y) {
        //运行到1/x === 1/y的时候x和y都为0，但是1/+0 = +Infinity， 1/-0 = -Infinity, 是不一样的
        return x !== 0 || y !== 0 || 1 / x === 1 / y;
      } else {
        //NaN===NaN是false,这是不对的，我们在这里做一个拦截，x !== x，那么一定是 NaN, y 同理
        //两个都是NaN的时候返回true
        return x !== x && y !== y;
      }
    }
```

###  2.4 总结

*   `typeof`
    *   直接在计算机底层基于数据类型的值（二进制）进行检测
    *   `typeof null`为`object` 原因是对象存在在计算机中，都是以`000`开始的二进制存储，所以检测出来的结果是对象
    *   `typeof` 普通对象/数组对象/正则对象/日期对象 都是`object`
    *   `typeof NaN === 'number'`
*   `instanceof`
    *   检测当前实例是否属于这个类的
    *   底层机制：只要当前类出现在实例的原型上，结果都是true
    *   不能检测基本数据类型
*   `constructor`
    *   支持基本类型
    *   `constructor`可以随便改，也不准
*   `Object.prototype.toString.call([val])`
    *   返回当前实例所属类信息

> 判断 `Target` 的类型，单单用 `typeof` 并无法完全满足，这其实并不是 `bug`，本质原因是 `JS` 的万物皆对象的理论。因此要真正完美判断时，我们需要区分对待:

*   基本类型(`null`): 使用 `String(null)`
*   基本类型(`string / number / boolean / undefined`) + `function`: - 直接使用 `typeof`即可
*   其余引用类型(`Array / Date / RegExp Error`): 调用`toString`后根据`[object XXX]`进行判断

很稳的判断封装:

```jsx

    let class2type = {}
    'Array Date RegExp Object Error'.split(' ').forEach(e => class2type[ '[object ' + e + ']' ] = e.toLowerCase()) 

    function type(obj) {
      if (obj == null) return String(obj)
      return typeof obj === 'object' ? class2type[ Object.prototype.toString.call(obj) ] || 'object' : typeof obj
    }
```

##  3 数据类型转换

> 大家都知道 JS 中在使用运算符号或者对比符时，会自带隐式转换，规则如下:

###  3.1 转化规则

*   `-、*、/、%`：一律转换成数值后计算
*   **+：**
    *   数字 + 字符串 = 字符串， 运算顺序是从左到右
    *   数字 + 对象， 优先调用对象的`valueOf -> toString`
    *   数字 + `boolean/null` -> 数字
    *   数字 + `undefined` -> `NaN`
*   `[1].toString() === '1'`
*   `{}.toString() === '[object object]'`
*   `NaN !== NaN` 、+`undefined` 为 `NaN`

> 首先我们要知道，在 `JS` 中类型转换只有三种情况，分别是：

*   转换为布尔值
*   转换为数字
*   转换为字符串

![类型转换](https://s.poetries.work/gitee/2020/02/2.png)

###  3.2 转Boolean

> 在条件判断时，除了 `undefined`，`null`， `false`， `NaN`， `''`， `0`， `-0`，其他所有值都转为 `true`，包括所有对象

###  3.3 对象转原始类型是根据什么流程运行的

> 对象转原始类型，会调用内置的`[ToPrimitive]`函数，对于该函数而言，其逻辑如下：

*   如果有`Symbol.toPrimitive()`方法，优先调用再返回
*   调用`valueOf()`，如果转换为原始类型，则返回
*   调用`toString()`，如果转换为原始类型，则返回
*   如果都没有返回原始类型，会报错

```jsx

    var obj = {
      value: 3,
      valueOf() {
        return 4;
      },
      toString() {
        return '5'
      },
      [Symbol.toPrimitive]() {
        return 6
      }
    }
    console.log(obj + 1); // 输出7
```

### 条件成立

其实就是上一个问题的应用。

```jsx

    var a = {
      value: 0,
      valueOf: function() {
        this.value++;
        return this.value;
      }
    };
    console.log(a == 1 && a == 2);//true
```

###  3.5 四则运算符

> 它有以下几个特点：

*   运算中其中一方为字符串，那么就会把另一方也转换为字符串
*   如果一方不是字符串或者数字，那么会将它转换为数字或者字符串

```jsx

    1 + '1' // '11'
    true + true // 2
    4 + [1,2,3] // "41,2,3"
```

*   对于第一行代码来说，触发特点一，所以将数字 `1` 转换为字符串，得到结果 `'11'`
*   对于第二行代码来说，触发特点二，所以将 `true` 转为数字 `1`
*   对于第三行代码来说，触发特点二，所以将数组通过 `toString`转为字符串 `1,2,3`，得到结果 `41,2,3`

> 另外对于加法还需要注意这个表达式 `'a' + + 'b'`

```jsx

    'a' + + 'b' // -> "aNaN"
```

*   因为 `+ 'b'` 等于 `NaN`，所以结果为 `"aNaN"`，你可能也会在一些代码中看到过 `+ '1'`的形式来快速获取 `number` 类型。
*   那么对于除了加法的运算符来说，只要其中一方是数字，那么另一方就会被转为数字

```jsx

    4 * '3' // 12
    4 * [] // 0
    4 * [1, 2] // NaN
```

###  3.6 比较运算符

*   如果是对象，就通过 `toPrimitive` 转换对象
*   如果是字符串，就通过 `unicode` 字符索引来比较

```jsx

    let a = {
      valueOf() {
        return 0
      },
      toString() {
        return '1'
      }
    }
    a > -1 // true
```

> 在以上代码中，因为 `a` 是对象，所以会通过 `valueOf` 转换为原始类型再比较值。

###  3.7 [] == ![]结果是什么？为什么？

*   `==` 中，左右两边都需要转换为数字然后进行比较
*   `[]`转换为数字为`0`
*   `![]` 首先是转换为布尔值，由于`[]`作为一个引用类型转换为布尔值为`true`
*   因此`![]`为`false`，进而在转换成数字，变为`0`
*   `0 == 0` ， 结果为`true`

###  3.8 == 和 ===有什么区别

> `===`叫做严格相等，是指：左右两边不仅值要相等，类型也要相等，例如`'1'===1`的结果是`false`，因为一边是`string`，另一边是`number`

**==不像===那样严格，对于一般情况，只要值相等，就返回true，但==还涉及一些类型转换，它的转换规则如下**

*   两边的类型是否相同，相同的话就比较值的大小，例如`1==2`，返回`false`
*   判断的是否是`null`和`undefined`，是的话就返回true
*   判断的类型是否是`String`和`Number`，是的话，把`String`类型转换成`Number`，再进行比较
*   判断其中一方是否是`Boolean`，是的话就把`Boolean`转换成`N`umber`，再进行比较
*   如果其中一方为`Object`，且另一方为`String`、`Number`或者`Symbol`，会将`Object`转换成字符串，再进行比较

##  4 闭包

> 红宝书(p178)上对于闭包的定义：闭包是指有权访问另外一个函数作用域中的变量的函数，

> MDN 对闭包的定义为：闭包是指那些能够访问自由变量的函数。
> 
> *   （其中自由变量，指在函数中使用的，但既不是函数参数arguments也不是函数的局部变量的变量，其实就是另外一个函数作用域中的变量。）

###  4.1 闭包产生的原因

> 首先要明白作用域链的概念，其实很简单，在ES5中只存在两种作用域————`全局作用域`和`函数作用域`，当访问一个变量时，解释器会首先在当前作用域查找标示符，如果没有找到，就去父作用域找，直到找到该变量的标示符或者不在父作用域中，这就是作用域链，值得注意的是，每一个子函数都会拷贝上级的作用域，形成一个作用域的链条。 比如:

```jsx

    var a = 1;
    function f1() {
      var a = 2
      function f2() {
        var a = 3;
        console.log(a);//3
      }
    }
```

> 在这段代码中，`f1`的作用域指向有全局作用域(`window`)和它本身，而`f2`的作用域指向全局作用域(`window`)、`f1`和它本身。而且作用域是从最底层向上找，直到找到全局作用域`window`为止，如果全局还没有的话就会报错。就这么简单一件事情

**闭包产生的本质就是，当前环境中存在指向父级作用域的引用。还是举上面的例子:**

```jsx

    function f1() {
      var a = 2
      function f2() {
        console.log(a);//2
      }
      return f2;
    }
    var x = f1();
    x();
```

> 这里x会拿到父级作用域中的变量，输出2。因为在当前环境中，含有对f2的引用，f2恰恰引用了window、f1和f2的作用域。因此f2可以访问到f1的作用域的变量。

*   那是不是只有返回函数才算是产生了闭包呢？
*   回到闭包的本质，我们只需要让父级作用域的引用存在即可，因此我们还可以这么做：

```jsx

    var f3;
    function f1() {
      var a = 2
      f3 = function() {
        console.log(a);
      }
    }
    f1();
    f3();
```

*   让`f1`执行，给`f3`赋值后，等于说现在`f3`拥有了`window、f1和f3本身这几个作用域的访问权限`，还是自底向上查找，最近是在`f1`中找到了`a`,因此输出2。
*   在这里是外面的变量`f3`存在着父级作用域的引用，因此产生了闭包，形式变了，本质没有改变

###  4.2 闭包有哪些表现形式

明白了本质之后，我们就来看看，在真实的场景中，究竟在哪些地方能体现闭包的存在？

1.  返回一个函数。刚刚已经举例。
2.  作为函数参数传递

```jsx

    var a = 1;
    function foo(){
      var a = 2;
      function baz(){
        console.log(a);
      }
      bar(baz);
    }
    function bar(fn){
      // 这就是闭包
      fn();
    }
    // 输出2，而不是1
    foo();
```

1.  在定时器、事件监听、Ajax请求、跨窗口通信、`Web Workers`或者任何异步中，只要使用了回调函数，实际上就是在使用闭包

以下的闭包保存的仅仅是window和当前作用域。

```jsx

    // 定时器
    setTimeout(function timeHandler(){
      console.log('111');
    }，100)

    // 事件监听
    $('#app').click(function(){
      console.log('DOM Listener');
    })
```

1.  `IIFE`(立即执行函数表达式)创建闭包, 保存了全局作用域`window`和当前函数的作用域，因此可以访问全局的变量

```jsx

    var a = 2;
    (function IIFE(){
      // 输出2
      console.log(a);
    })();
```

###  4.3 如何解决下面的循环输出问题

```jsx

    for(var i = 1; i <= 5; i ++){
      setTimeout(function timer(){
        console.log(i)
      }, 0)
    }
```

为什么会全部输出6？如何改进，让它输出1，2，3，4，5？(方法越多越好) 因为setTimeout为宏任务，由于JS中单线程eventLoop机制，在主线程同步任务执行完后才去执行宏任务，因此循环结束后setTimeout中的回调才依次执行，但输出i的时候当前作用域没有，往上一级再找，发现了i,此时循环已经结束，i变成了6。因此会全部输出6。

**解决方法：**

1.  利用IIFE(立即执行函数表达式)当每次for循环时，把此时的i变量传递到定时器中

```jsx

    for(var i = 1;i <= 5;i++){
      (function(j){
        setTimeout(function timer(){
          console.log(j)
        }, 0)
      })(i)
    }
```

1.  给定时器传入第三个参数, 作为`timer`函数的第一个函数参数

```jsx

    for(var i=1;i<=5;i++){
      setTimeout(function timer(j){
        console.log(j)
      }, 0, i)
    }
```

1.  使用ES6中的let

```jsx

    for(let i = 1; i <= 5; i++){
      setTimeout(function timer(){
        console.log(i)
      },0)
    }
```

> let使JS发生革命性的变化，让JS有函数作用域变为了块级作用域，用let后作用域链不复存在。代码的作用域以块级为单位，以上面代码为例:

```jsx

    // i = 1
    {
      setTimeout(function timer(){
        console.log(1)
      },0)
    }
    // i = 2
    {
      setTimeout(function timer(){
        console.log(2)
      },0)
    }
    // i = 3
    ...
```

###  4.4 闭包的几种使用场景

**1\. 返回值（最常用）**

```jsx

    //1.返回值 最常用的
    function fn(){
        var name="hello";
        return function(){
            return name;
        }
    }
    var fnc = fn();
    console.log(fnc())//hello
```

> 这个很好理解就是以闭包的形式将 `name` 返回

**2\. 函数赋值**

```jsx

    var fn2;
    function fn(){
        var name="hello";
        //将函数赋值给fn2
        fn2 = function(){
            return name;
        }
    }
    fn()//要先执行进行赋值，
    console.log(fn2())//执行输出fn2
```

> 在闭包里面给`fn2`函数设置值，闭包的形式把`name`属性记忆下来，执行会输出 hello。

**3\. 函数参数**

```jsx

    function fn(){
        var name="hello";
        return function callback(){
            return name;
        }
    }
    var fn1 = fn()//执行函数将返回值（callback函数）赋值给fn1，

    function fn2(f){
        //将函数作为参数传入
        console.log(f());//执行函数，并输出
    }
    fn2(fn1)//执行输出fn2
```

> 用闭包返回一个函数，把此函数作为另一个函数的参数，在另一个函数里面执行这个函数，最终输出 hello

**4\. IIFE（自执行函数）**

```jsx

    (function(){
        var name="hello";
        var fn1= function(){
            return name;
        }
        //直接在自执行函数里面调用fn2，将fn1作为参数传入
        fn2(fn1);
    })()
    function fn2(f){
        //将函数作为参数传入
        console.log(f());//执行函数，并输出
    }
```

> 直接在自执行函数里面将封装的函数`fn1`传给`fn2`，作为参数调用同样可以获得结果 hello

**5\. 循环赋值**

```jsx

    //每秒执行1次，分别输出1-10
    for(var i=1;i<=10;i++){
        (function(j){
            //j来接收
            setTimeout(function(){
                console.log(j);
            },j*1000);
        })(i)//i作为实参传入
    }
```

> 如果不采用闭包的话，会有不一样的情况

**6\. getter和setter**

```jsx

    function fn(){
        var name='hello'
        setName=function(n){
            name = n;
        }
        getName=function(){
            return name;
        }

        //将setName，getName作为对象的属性返回
        return {
            setName:setName,
            getName:getName
        }
    }
    var fn1 = fn();//返回对象，属性setName和getName是两个函数
    console.log(fn1.getName());//getter
    fn1.setName('world');//setter修改闭包里面的name
    console.log(fn1.getName());//getter
```

> 第一次输出 hello 用setter以后再输出 world ，这样做可以封装成公共方法，防止不想暴露的属性和函数暴露在外部

**7\. 迭代器（执行一次函数往下取一个值）**

```jsx

    var arr =['aa','bb','cc'];
    function incre(arr){
        var i=0;
        return function(){
            //这个函数每次被执行都返回数组arr中 i下标对应的元素
             return arr[i++] || '数组值已经遍历完';
        }
    }
    var next = incre(arr);
    console.log(next());//aa
    console.log(next());//bb
    console.log(next());//cc
    console.log(next());//数组值已经遍历完
```

**8\. 缓存**

```jsx

    // 比如求和操作，如果没有缓存，每次调用都要重复计算，采用缓存已经执行过的去查找，查找到了就直接返回，不需要重新计算    
    var fn=(function(){
      var cache={};//缓存对象
      var calc=function(arr){//计算函数
        var sum=0;
        //求和
        for(var i=0;i<arr.length;i++){
          sum+=arr[i];
        }
        return sum;
      }

      return function(){
        var args = Array.prototype.slice.call(arguments,0);//arguments转换成数组
        var key=args.join(",");//将args用逗号连接成字符串
        var result , tSum = cache[key];
        if(tSum){//如果缓存有   
          console.log('从缓存中取：',cache)//打印方便查看
          result = tSum;
        }else{
          //重新计算，并存入缓存同时赋值给result
          result = cache[key]=calc(args);
          console.log('存入缓存：',cache)//打印方便查看
        }
        return result;
      }
    })();
```

```jsx

    fn(1,2,3,4,5);
    fn(1,2,3,4,5);
    fn(1,2,3,4,5,6);
    fn(1,2,3,4,5,8);
    fn(1,2,3,4,5,6);
```

![](https://s.poetries.work/uploads/2022/07/dccf46fd74b0f457.png)

##  5 原型和原型链链

![](https://s.poetries.work/uploads/2022/08/3fc85b7f8f5e0b75.png)

###  5.1 原型/构造函数/实例

*   原型(`prototype`): 一个简单的对象，用于实现对象的 属性继承。可以简单的理解成对象的爹。在 `Firefox` 和 `Chrome` 中，每个`JavaScript`对象中都包含一个`__proto__`(非标准)的属性指向它爹(该对象的原型)，可`obj.__proto__`进行访问。
*   构造函数: 可以通过`new`来 新建一个对象 的函数。
*   实例: 通过构造函数和`new`创建出来的对象，便是实例。 实例通过`__proto__`指向原型，通过`constructor`指向构造函数。

> 以`Object`为例，我们常用的`Object`便是一个构造函数，因此我们可以通过它构建实例。

```jsx

    // 实例
    const instance = new Object()
```

> 则此时， 实例为`instance`, 构造函数为`Object`，我们知道，构造函数拥有一个`prototype`的属性指向原型，因此原型为:

```jsx

    // 原型
    const prototype = Object.prototype
```

**这里我们可以来看出三者的关系:**

*   `实例.__proto__ === 原型`
*   `原型.constructor === 构造函数`
*   `构造函数.prototype === 原型`

```jsx

    // 这条线其实是是基于原型进行获取的，可以理解成一条基于原型的映射线
    // 例如: 
    // const o = new Object()
    // o.constructor === Object   --> true
    // o.__proto__ = null;
    // o.constructor === Object   --> false
    实例.constructor === 构造函数
```

![](https://s.poetries.work/gitee/2020/09/112.png)

###  5.2 原型对象和构造函数有何关系

*   在JavaScript中，每当定义一个函数数据类型(普通函数、类)时候，都会天生自带一个`prototype`属性，这个属性指向函数的原型对象。
*   当函数经过`new`调用时，这个函数就成为了构造函数，返回一个全新的实例对象，这个实例对象有一个`__proto__`属性，指向构造函数的原型对象。

![](https://s.poetries.work/images/20210309102015.png)

###  5.3 能不能描述一下原型链

> JavaScript对象通过`__proto__` 指向父类对象，直到指向`Object`对象为止，这样就形成了一个原型指向的链条, 即原型链

![](https://s.poetries.work/images/20210309102100.png)

*   对象的 `hasOwnProperty()` 来检查对象自身中是否含有该属性
*   使用 `in` 检查对象中是否含有某个属性时，如果对象中没有但是原型链中有，也会返回 `true`

##  6 继承

###  6.1 方式1: 借助call

```jsx

     function Parent1(){
        this.name = 'parent1';
      }
      function Child1(){
        Parent1.call(this);
        this.type = 'child1'
      }
      console.log(new Child1);
```

> 这样写的时候子类虽然能够拿到父类的属性值，但是问题是父类原型对象中一旦存在方法那么子类无法继承。那么引出下面的方法。

###  6.2 方式2: 借助原型链

```jsx

     function Parent2() {
        this.name = 'parent2';
        this.play = [1, 2, 3]
      }
      function Child2() {
        this.type = 'child2';
      }
      Child2.prototype = new Parent2();

      console.log(new Child2());
```

看似没有问题，父类的方法和属性都能够访问，但实际上有一个潜在的不足。举个例子：

```jsx

    var s1 = new Child2();
    var s2 = new Child2();
    s1.play.push(4);
    console.log(s1.play, s2.play);
```

可以看到控制台：

![](https://s.poetries.work/images/20210309103243.png)

> 明明我只改变了s1的play属性，为什么s2也跟着变了呢？很简单，因为两个实例使用的是同一个原型对象。

那么还有更好的方式么？

###  6.3 方式3：将前两种组合

```jsx

      function Parent3 () {
        this.name = 'parent3';
        this.play = [1, 2, 3];
      }
      function Child3() {
        Parent3.call(this);
        this.type = 'child3';
      }
      Child3.prototype = new Parent3();
      var s3 = new Child3();
      var s4 = new Child3();
      s3.play.push(4);
      console.log(s3.play, s4.play);
```

可以看到控制台：

![](https://s.poetries.work/images/20210309103312.png)

> 之前的问题都得以解决。但是这里又徒增了一个新问题，那就是`Parent3`的构造函数会多执行了一次（`Child3.prototype = new Parent3();`）。这是我们不愿看到的。那么如何解决这个问题？

###  6.4 方式4: 组合继承的优化1

```jsx

      function Parent4 () {
        this.name = 'parent4';
        this.play = [1, 2, 3];
      }
      function Child4() {
        Parent4.call(this);
        this.type = 'child4';
      }
      Child4.prototype = Parent4.prototype;
```

这里让将父类原型对象直接给到子类，父类构造函数只执行一次，而且父类属性和方法均能访问，但是我们来测试一下：

```jsx

    var s3 = new Child4();
    var s4 = new Child4();
    console.log(s3)
```

![](https://s.poetries.work/images/20210309103358.png)

> 子类实例的构造函数是Parent4，显然这是不对的，应该是Child4。

### : 组合继承的优化2

```jsx

     function Parent5 () {
        this.name = 'parent5';
        this.play = [1, 2, 3];
      }
      function Child5() {
        Parent5.call(this);
        this.type = 'child5';
      }
      Child5.prototype = Object.create(Parent5.prototype);
      Child5.prototype.constructor = Child5;
```

这是最推荐的一种方式，接近完美的继承，它的名字也叫做寄生组合继承。

###  6.6 ES6的extends被编译后的JavaScript代码

> ES6的代码最后都是要在浏览器上能够跑起来的，这中间就利用了babel这个编译工具，将ES6的代码编译成ES5让一些不支持新语法的浏览器也能运行。

那最后编译成了什么样子呢？

```jsx

    function _possibleConstructorReturn(self, call) {
        // ...
        return call && (typeof call === 'object' || typeof call === 'function') ? call : self;
    }

    function _inherits(subClass, superClass) {
        // ...
        //看到没有
        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var Parent = function Parent() {
        // 验证是否是 Parent 构造出来的 this
        _classCallCheck(this, Parent);
    };

    var Child = (function (_Parent) {
        _inherits(Child, _Parent);

        function Child() {
            _classCallCheck(this, Child);

            return _possibleConstructorReturn(this, (Child.__proto__ || Object.getPrototypeOf(Child)).apply(this, arguments));
        }

        return Child;
    }(Parent));
```

> 核心是`_inherits`函数，可以看到它采用的依然也是第五种方式————寄生组合继承方式，同时证明了这种方式的成功。不过这里加了一个`Object.setPrototypeOf(subClass, superClass)`，这是用来干啥的呢？

答案是用来继承父类的静态方法。这也是原来的继承方式疏忽掉的地方。

**追问: 面向对象的设计一定是好的设计吗？**

> 不一定。从继承的角度说，这一设计是存在巨大隐患的。

###  6.7 从设计思想上谈谈继承本身的问题

假如现在有不同品牌的车，每辆车都有drive、music、addOil这三个方法。

```jsx

    class Car{
      constructor(id) {
        this.id = id;
      }
      drive(){
        console.log("wuwuwu!");
      }
      music(){
        console.log("lalala!")
      }
      addOil(){
        console.log("哦哟！")
      }
    }
    class otherCar extends Car{}
```

现在可以实现车的功能，并且以此去扩展不同的车。

但是问题来了，新能源汽车也是车，但是它并不需要addOil(加油)。

如果让新能源汽车的类继承Car的话，也是有问题的，俗称"大猩猩和香蕉"的问题。大猩猩手里有香蕉，但是我现在明明只需要香蕉，却拿到了一只大猩猩。也就是说加油这个方法，我现在是不需要的，但是由于继承的原因，也给到子类了。

> 继承的最大问题在于：无法决定继承哪些属性，所有属性都得继承。

当然你可能会说，可以再创建一个父类啊，把加油的方法给去掉，但是这也是有问题的，一方面父类是无法描述所有子类的细节情况的，为了不同的子类特性去增加不同的父类，代码势必会大量重复，另一方面一旦子类有所变动，父类也要进行相应的更新，代码的耦合性太高，维护性不好。

**那如何来解决继承的诸多问题呢？**

> 用组合，这也是当今编程语法发展的趋势，比如golang完全采用的是面向组合的设计方式。

顾名思义，面向组合就是先设计一系列零件，然后将这些零件进行拼装，来形成不同的实例或者类。

```jsx

    function drive(){
      console.log("wuwuwu!");
    }
    function music(){
      console.log("lalala!")
    }
    function addOil(){
      console.log("哦哟！")
    }

    let car = compose(drive, music, addOil);
    let newEnergyCar = compose(drive, music);
```

> 代码干净，复用性也很好。这就是面向组合的设计方式。

###  6.8 继承-简版

> 在 ES5 中，我们可以使用如下方式解决继承的问题

```jsx

    function Super() {}
    Super.prototype.getNumber = function() {
      return 1
    }

    function Sub() {}
    let s = new Sub()
    Sub.prototype = Object.create(Super.prototype, {
      constructor: {
        value: Sub,
        enumerable: false,
        writable: true,
        configurable: true
      }
    })
```

*   以上继承实现思路就是将子类的原型设置为父类的原型
*   在 `ES6` 中，我们可以通过 `class` 语法轻松解决这个问题

```jsx

    class MyDate extends Date {
      test() {
        return this.getTime()
      }
    }
    let myDate = new MyDate()
    myDate.test()
```

*   但是 `ES6` 不是所有浏览器都兼容，所以我们需要使用 `Babel` 来编译这段代码。
*   如果你使用编译过得代码调用 `myDate.test()`你会惊奇地发现出现了报错

> 因为在 `JS` 底层有限制，如果不是由 `Date`构造出来的实例的话，是不能调用 `Date` 里的函数的。所以这也侧面的说明了：`ES6` 中的 `class` 继承与 `ES5` 中的一般继承写法是不同的。

*   既然底层限制了实例必须由 `Date` 构造出来，那么我们可以改变下思路实现继承

```jsx

    function MyData() {

    }
    MyData.prototype.test = function () {
      return this.getTime()
    }
    let d = new Date()
    Object.setPrototypeOf(d, MyData.prototype)
    Object.setPrototypeOf(MyData.prototype, Date.prototype)
```

*   以上继承实现思路：先创建父类实例 => 改变实例原先的 `_proto__`转而连接到子类的 `prototype`=> 子类的 `prototype` 的 `__proto__` 改为父类的 `prototype`。
*   通过以上方法实现的继承就可以完美解决 `JS` 底层的这个限制

##  7 this

> 我们先来看几个函数调用的场景

```jsx

    function foo() {
      console.log(this.a)
    }
    var a = 1
    foo()

    const obj = {
      a: 2,
      foo: foo
    }
    obj.foo()

    const c = new foo()
```

*   对于直接调用 `foo` 来说，不管 `foo` 函数被放在了什么地方，`this` 一定是`window`
*   对于 `obj.foo()` 来说，我们只需要记住，谁调用了函数，谁就是 `this`，所以在这个场景下 `foo` 函数中的 `this` 就是 `obj` 对象
*   对于 `new` 的方式来说，`this` 被永远绑定在了 `c` 上面，不会被任何方式改变 `this`

> 说完了以上几种情况，其实很多代码中的 `this` 应该就没什么问题了，下面让我们看看箭头函数中的 `this`

```jsx

    function a() {
      return () => {
        return () => {
          console.log(this)
        }
      }
    }
    console.log(a()()())
```

*   首先箭头函数其实是没有 `this` 的，箭头函数中的 `this` 只取决包裹箭头函数的第一个普通函数的 `this`。在这个例子中，因为包裹箭头函数的第一个普通函数是 `a`，所以此时的 `this` 是 `window`。另外对箭头函数使用 `bind`这类函数是无效的。
*   最后种情况也就是 `bind` 这些改变上下文的 `API` 了，对于这些函数来说，`this` 取决于第一个参数，如果第一个参数为空，那么就是 `window`。
*   那么说到 `bind`，不知道大家是否考虑过，如果对一个函数进行多次 `bind`，那么上下文会是什么呢？

```jsx

    let a = {}
    let fn = function () { console.log(this) }
    fn.bind().bind(a)() // => ?
```

> 如果你认为输出结果是 `a`，那么你就错了，其实我们可以把上述代码转换成另一种形式

```jsx

    // fn.bind().bind(a) 等于
    let fn2 = function fn1() {
      return function() {
        return fn.apply()
      }.apply(a)
    }
    fn2()
```

> 可以从上述代码中发现，不管我们给函数 `bind` 几次，`fn` 中的 `this` 永远由第一次 `bind` 决定，所以结果永远是 `window`

```jsx

    let a = { name: 'poetries' }
    function foo() {
      console.log(this.name)
    }
    foo.bind(a)() // => 'poetries'
```

> 以上就是 `this` 的规则了，但是可能会发生多个规则同时出现的情况，这时候不同的规则之间会根据优先级最高的来决定 `this` 最终指向哪里。

> 首先，`new` 的方式优先级最高，接下来是 `bind` 这些函数，然后是 `obj.foo()` 这种调用方式，最后是 `foo` 这种调用方式，同时，箭头函数的 `this` 一旦被绑定，就不会再被任何方式所改变。

![image.png](https://s.poetries.work/gitee/2020/07/2.png)

**总结**

> `this`执行主体，谁把它执行的和在哪创建的在哪执行的都没有必然的关系

*   函数执行，看方法前面是否有点，没有点`this`是`window`(严格模式下是`undefined`)，有点，点前面是谁·this·就是谁
*   给当前元素的某个事件行为绑定方法，当事件行为触发，方法中的this是当前元素本身（排除`attachEvent`）
*   构造函数体中`this`是当前类的实例
*   箭头函数中没有执行主体，所用到的this都是所处上下文中的`this`
*   可以基于`Function.prototype`上的`call/apply/bind`改变`this`指向

##  8 内存机制

> 网上的资料基本是这样说的: 基本数据类型用栈存储，引用数据类型用堆存储。

看起来没有错误，但实际上是有问题的。可以考虑一下闭包的情况，如果变量存在栈中，那函数调用完栈顶空间销毁，闭包变量不就没了吗？

其实还是需要补充一句:

> 闭包变量是存在堆内存中的。

**具体而言，以下数据类型存储在栈中:**

*   `boolean`
*   `null`
*   `undefined`
*   `number`
*   `string`
*   `symbol`
*   `bigint`

而所有的对象数据类型存放在堆中。

> 值得注意的是，对于赋值操作，原始类型的数据直接完整地复制变量值，对象数据类型的数据则是复制引用地址。

因此会有下面的情况:

```jsx

    let obj = { a: 1 };
    let newObj = obj;
    newObj.a = 2;
    console.log(obj.a);//变成了2
```

*   之所以会这样，是因为 `obj` 和 `newObj` 是同一份堆空间的地址，改变`newObj`，等于改变了共同的堆内存，这时候通过 obj 来获取这块内存的值当然会改变。 当然，你可能会问: 为什么不全部用栈来保存呢？
*   首先，对于系统栈来说，它的功能除了保存变量之外，还有创建并切换函数执行上下文的功能。举个例子:

当然，你可能会问: 为什么不全部用栈来保存呢？

首先，对于系统栈来说，它的功能除了保存变量之外，还有`创建并切换函数执行上下文的功能`。举个例子:

```jsx

    function f(a) {
      console.log(a);
    }

    function func(a) {
      f(a);
    }

    func(1);
```

*   假设用ESP指针来保存当前的执行状态，在系统栈中会产生如下的过程：
*   调用func, 将 func 函数的上下文压栈，ESP指向栈顶。
*   执行func，又调用f函数，将 f 函数的上下文压栈，ESP 指针上移。
*   执行完 f 函数，将ESP 下移，f函数对应的栈顶空间被回收。
*   执行完 func，ESP 下移，func对应的空间被回收。

图示如下:

![](https://s.poetries.work/images/20210309114827.png)

*   因此你也看到了，如果采用栈来存储相对基本类型更加复杂的对象数据，那么切换上下文的开销将变得巨大！
*   不过堆内存虽然空间大，能存放大量的数据，但与此同时垃圾内存的回收会带来更大的开销

##  9 执行上下文

> 当执行 JS 代码时，会产生三种执行上下文

*   全局执行上下文
*   函数执行上下文
*   `eval` 执行上下文

> 每个执行上下文中都有三个重要的属性

*   变量对象（`VO`），包含变量、函数声明和函数的形参，该属性只能在全局上下文中访问
*   作用域链（`JS` 采用词法作用域，也就是说变量的作用域是在定义时就决定了）
*   `this`

```jsx

    var a = 10
    function foo(i) {
      var b = 20
    }
    foo()
```

> 对于上述代码，执行栈中有两个上下文：全局上下文和函数 foo 上下文。

```jsx

    stack = [
        globalContext,
        fooContext
    ]
```

> 对于全局上下文来说，`VO`大概是这样的

```jsx

    globalContext.VO === globe
    globalContext.VO = {
        a: undefined,
    	foo: <Function>,
    }
```

> 对于函数 `foo` 来说，`VO` 不能访问，只能访问到活动对象（`AO`）

```jsx

    fooContext.VO === foo.AO
    fooContext.AO {
        i: undefined,
    	b: undefined,
        arguments: <>
    }
    // arguments 是函数独有的对象(箭头函数没有)
    // 该对象是一个伪数组，有 `length` 属性且可以通过下标访问元素
    // 该对象中的 `callee` 属性代表函数本身
    // `caller` 属性代表函数的调用者
```

> 对于作用域链，可以把它理解成包含自身变量对象和上级变量对象的列表，通过 `[[Scope]]`属性查找上级变量

```jsx

    fooContext.[[Scope]] = [
        globalContext.VO
    ]
    fooContext.Scope = fooContext.[[Scope]] + fooContext.VO
    fooContext.Scope = [
        fooContext.VO,
        globalContext.VO
    ]
```

> 接下来让我们看一个老生常谈的例子，`var`

```jsx

    b() // call b
    console.log(a) // undefined

    var a = 'Hello world'

    function b() {
    	console.log('call b')
    }
```

> 想必以上的输出大家肯定都已经明白了，这是因为函数和变量提升的原因。通常提升的解释是说将声明的代码移动到了顶部，这其实没有什么错误，便于大家理解。但是更准确的解释应该是：在生成执行上下文时，会有两个阶段。第一个阶段是创建的阶段（具体步骤是创建 `VO`），`JS` 解释器会找出需要提升的变量和函数，并且给他们提前在内存中开辟好空间，函数的话会将整个函数存入内存中，变量只声明并且赋值为 `undefined`，所以在第二个阶段，也就是代码执行阶段，我们可以直接提前使用。

*   在提升的过程中，相同的函数会覆盖上一个函数，并且函数优先于变量提升

```jsx

    b() // call b second

    function b() {
    	console.log('call b fist')
    }
    function b() {
    	console.log('call b second')
    }
    var b = 'Hello world'
```

> `var`会产生很多错误，所以在 `ES6`中引入了 `let`。`let`不能在声明前使用，但是这并不是常说的 `let` 不会提升，`let` 提升了声明但没有赋值，因为临时死区导致了并不能在声明前使用。

*   对于非匿名的立即执行函数需要注意以下一点

```jsx

    var foo = 1
    (function foo() {
        foo = 10
        console.log(foo)
    }()) // -> ƒ foo() { foo = 10 ; console.log(foo) }
```

> 因为当 `JS` 解释器在遇到非匿名的立即执行函数时，会创建一个辅助的特定对象，然后将函数名称作为这个对象的属性，因此函数内部才可以访问到 `foo`，但是这个值又是只读的，所以对它的赋值并不生效，所以打印的结果还是这个函数，并且外部的值也没有发生更改。

```jsx

    specialObject = {};

    Scope = specialObject + Scope;

    foo = new FunctionExpression;
    foo.[[Scope]] = Scope;
    specialObject.foo = foo; // {DontDelete}, {ReadOnly}

    delete Scope[0]; // remove specialObject from the front of scope chain
```

**小结**

> 执行上下文可以简单理解为一个对象:

**它包含三个部分:**

*   变量对象(`VO`)
*   作用域链(词法作用域)
*   `this`指向

**它的类型:**

*   全局执行上下文
*   函数执行上下文
*   `eval`执行上下文

**代码执行过程:**

*   创建 全局上下文 (`global EC`)
*   全局执行上下文 (`caller`) 逐行 自上而下 执行。遇到函数时，函数执行上下文 (`callee`) 被`push`到执行栈顶层
*   函数执行上下文被激活，成为 `active EC`, 开始执行函数中的代码，`caller` 被挂起
*   函数执行完后，`callee` 被`pop`移除出执行栈，控制权交还全局上下文 (`caller`)，继续执行

##  10 变量提升

> 当执行 `JS` 代码时，会生成执行环境，只要代码不是写在函数中的，就是在全局执行环境中，函数中的代码会产生函数执行环境，只此两种执行环境。

```jsx

    b() // call b
    console.log(a) // undefined

    var a = 'Hello world'

    function b() {
        console.log('call b')
    }
```

> 想必以上的输出大家肯定都已经明白了，这是因为函数和变量提升的原因。通常提升的解释是说将声明的代码移动到了顶部，这其实没有什么错误，便于大家理解。但是更准确的解释应该是：在生成执行环境时，会有两个阶段。第一个阶段是创建的阶段，`JS` 解释器会找出需要提升的变量和函数，并且给他们提前在内存中开辟好空间，函数的话会将整个函数存入内存中，变量只声明并且赋值为 `undefined`，所以在第二个阶段，也就是代码执行阶段，我们可以直接提前使用

*   在提升的过程中，相同的函数会覆盖上一个函数，并且函数优先于变量提升

```jsx

    b() // call b second

    function b() {
        console.log('call b fist')
    }
    function b() {
        console.log('call b second')
    }
    var b = 'Hello world'
```

> `var` 会产生很多错误，所以在 ES6中引入了 `let`。`let`不能在声明前使用，但是这并不是常说的 `let` 不会提升，`let`提升了，在第一阶段内存也已经为他开辟好了空间，但是因为这个声明的特性导致了并不能在声明前使用

##  11 模块化

> 模块化开发在现代开发中已是必不可少的一部分，它大大提高了项目的可维护、可拓展和可协作性。通常，我们 在浏览器中使用 `ES6` 的模块化支持，在 `Node` 中使用 `commonjs` 的模块化支持。

**分类:**

*   `es6: import / export`
*   `commonjs: require / module.exports / exports`
*   `amd: require / defined`

**require与import的区别**

*   `require`支持 动态导入，`import`不支持，正在提案 (`babel` 下可支持)
*   `require`是 同步 导入，`impor`t属于 异步 导入
*   `require`是 值拷贝，导出值变化不会影响导入值；`import`指向 内存地址，导入值会随导出值而变化

##  12 异步编程

> 这部分着重要理解 `Promise`、`async awiat`、`event loop` 等

###  12.1 浏览器中的Event loop

<div class="custom-block tip">

简版总结

`JavaScript` 最早是用于写网页交互逻辑的，为了避免多线程同时修改 `dom` 的同步问题，设计成了单线程，又为了解决单线程的阻塞问题，加了一层调度逻辑，也就是 `Loop` 循环和 `Task` 队列，把阻塞的逻辑放到其他线程跑，从而支持了异步。然后为了支持高优先级的任务调度，又引入了微任务队列，这就是浏览器的 `Event Loop` 机制：每次执行一个宏任务，然后执行所有微任务

![](https://s.poetries.work/images/20210414213126.png)

**正确的一次 Event loop 顺序是这样的**

*   执行同步代码，这属于宏任务
*   执行栈为空，查询是否有微任务需要执行
*   执行所有微任务
*   必要的话渲染 UI
*   然后开始下一轮 `Event loop`，执行宏任务中的异步代码

> 通过 `Event loop` 顺序可知，如果宏任务中的异步代码有大量的计算并且需要操作 `DOM` 的话，为了更快的响应界面响应，我们可以把操作 `DOM` 放入微任务中
```

推荐一个可以在线看代码流程的网站：[loupe<span><span class="sr-only">(opens new window)</span></span>](http://latentflip.com/loupe)，看一下[这个学习视频<span><span class="sr-only">(opens new window)</span></span>](https://www.bilibili.com/video/BV1oV411k7XY/?spm_id_from=333.788.recommend_more_video.-1&vd_source=f48e73dcbb57f07ec3567f1cf5693b6e)

> JavaScript 是用于实现网页交互逻辑的，涉及到 `dom` 操作，如果多个线程同时操作需要做同步互斥的处理，为了简化就设计成了单线程，但是如果单线程的话，遇到定时逻辑、网络请求又会阻塞住。怎么办呢？可以加一层调度逻辑。把 JS 代码封装成一个个的任务，放在一个任务队列中，主线程就不断的取任务执行就好了。

每次取任务执行，都会创建新的调用栈。

![](https://s.poetries.work/uploads/2022/08/7579ff26c4175e46.png)

> 其中，`定时器`、`网络请求`其实都是在别的线程执行的，执行完了之后在任务队列里放个任务，告诉主线程可以继续往下执行了

![](https://s.poetries.work/uploads/2022/08/7256bc5207e91265.png)

*   因为这些异步任务是在别的线程执行完，然后通过任务队列通知下主线程，是一种事件机制，所以这个循环叫做 `Event Loop`
*   这些在其他线程执行的异步任务包括定时器（`setTimeout`、`setInterval`），`UI 渲染`、网络请求（`XHR` 或 `fetch`）。
*   但是，现在的 `Event Loop` 有个严重的问题，没有优先级的概念，只是按照先后顺序来执行，那如果有高优先级的任务就得不到及时的执行了。所以，得设计一套插队机制。
*   那就搞一个高优先级的任务队列就好了，每执行完一个普通任务，都去把所有高优先级的任务给执行完，之后再去执行普通任务。

![](https://s.poetries.work/uploads/2022/08/61952b031d507e8c.png)

> 有了插队机制之后，高优任务就能得到及时的执行。这就是现在浏览器的 `Event Loop`，其中普通任务叫做 `MacroTask`（宏任务），高优任务叫做 `MicroTask`（微任务）

*   **宏任务包括**：`setTimeout`、`setInterval`、`requestAnimationFrame`、`Ajax`、`fetch`、`script`（浏览器会先执行一个宏任务，接下来有异步代码的话就先执行微任务） 标签的代码
*   **微任务包括**：`Promise.then`、`MutationObserver`、`Object.observe`

**怎么理解宏微任务的划分呢？**

*   `定时器`、`网络请求`这种都是在别的线程跑完之后通知主线程的普通异步逻辑，所以都是宏任务
*   高优任务的这三种也很好理解，`MutationObserver` 和 `Object.observe` 都是监听某个对象的变化的，变化是很瞬时的事情，肯定要马上响应，不然可能又变了，`Promise` 是组织异步流程的，异步结束调用 `then` 也是很高优的

> **这就是浏览器里的 Event Loop 的设计**：设计 `Loop` 机制和 `Task 队列`是为了支持异步，`解决逻辑执行阻塞主线程`的问题，设计 `MicroTask` 队列的插队机制是为了`解决高优任务尽早执行`的问题

但是后来，JS 的执行环境不只是浏览器一种了，还有了 `Node.js`，它同样也要解决这些问题，但是它设计出来的 `Event Loop` 更细致一些

**例子1**

```jsx

    setTimeout(function() {
      console.log(1)
    }, 0);
    new Promise(function(resolve, reject) {
      console.log(2);
      resolve()
    }).then(function() {
      console.log(3)
    });
    process.nextTick(function () {
      console.log(4)
    })
    console.log(5)
```

*   第一轮：主线程开始执行，遇到`setTimeout`，将setTimeout的回调函数丢到宏任务队列中，在往下执行`new Promise`立即执行，输出`2`，`then`的回调函数丢到微任务队列中，再继续执行，遇到`process.nextTick`，同样将回调函数扔到微任务队列，再继续执行，输出`5`，当所有同步任务执行完成后看有没有可以执行的微任务，发现有`then`函数和`nextTick`两个微任务，先执行哪个呢？`process.nextTick`指定的异步任务总是发生在所有异步任务之前，因此先执行`process.nextTick`输出`4`然后执行`then`函数输出`3`，第一轮执行结束。
*   第二轮：从宏任务队列开始，发现`setTimeout`回调，输出1执行完毕，因此结果是`25431`

**例子2**

```jsx

    console.log('script start');

    setTimeout(function() {
      console.log('setTimeout');
    }, 0);

    new Promise((resolve) => {
        console.log('Promise')
        resolve()
    }).then(function() {
      console.log('promise1');
    }).then(function() {
      console.log('promise2');
    });

    console.log('script end');
    // script start => Promise => script end => promise1 => promise2 => setTimeout
```

> 以上代码虽然 `setTimeout` 写在 `Promise` 之前，但是因为 `Promise` 属于微任务而 `setTimeout` 属于宏任务

###  12.2 Node 中的 Event loop

<div class="custom-block tip">

首先从优先级出发理解Node EventLoop

> `Node.js` 是一个新的 `JS` 运行环境，它同样要支持异步逻辑，包括`定时器`、`IO`、`网络请求`，很明显，也可以用 Event Loop 那一套来跑

但是呢，浏览器那套 ·Event Loop· 就是为浏览器设计的，对于做高性能服务器来说，那种设计还是有点粗糙了

哪里粗糙呢？

*   浏览器的 `Event Loop` 只分了两层优先级，一层是宏任务，一层是微任务。但是宏任务之间没有再划分优先级，微任务之间也没有再划分优先级。
*   而 `Node.js` 任务宏任务之间也是有优先级的，比如定时器 `Timer` 的逻辑就比 `IO` 的逻辑优先级高，因为涉及到时间，越早越准确；而 `close` 资源的处理逻辑优先级就很低，因为不 `close` 最多多占点内存等资源，影响不大。
*   于是就把宏任务队列拆成了五个优先级：`Timers`、`Pending`、`Poll`、`Check`、`Close`

![](https://s.poetries.work/uploads/2022/08/e425445641ddc33d.png)

**解释一下这五种宏任务：**

*   `Timers Callback`： 涉及到时间，肯定越早执行越准确，所以这个优先级最高很容易理解。
*   `Pending Callback`：处理网络、`IO` 等异常时的回调，有的 `*niux` 系统会等待发生错误的上报，所以得处理下。
*   `Poll Callback`：处理 `IO` 的 `data`，网络的 `connection`，服务器主要处理的就是这个。
*   `Check Callback`：执行 `setImmediate` 的回调，特点是刚执行完 `IO` 之后就能回调这个。
*   `Close Callback`：关闭资源的回调，晚点执行影响也不到，优先级最低。

所以呢，`Node.js` 的 `Event Loop` 就是这样跑的了：

![](https://s.poetries.work/uploads/2022/08/aaa99026a99c0959.png)

**还有一点不同要特别注意：**

> `Node.js` 的 `Event Loop` 并不是浏览器那种一次执行一个宏任务，然后执行所有的微任务，而是执行完一定数量的 `Timers` 宏任务，再去执行所有微任务，然后再执行一定数量的 `Pending` 的宏任务，然后再去执行所有微任务，剩余的 `Poll`、`Check`、`Close` 的宏任务也是这样。（订正：`node 11` 之前是这样，`node 11` 之后改为了每个宏任务都执行所有微任务了）

**为什么这样呢？**

> 其实按照优先级来看很容易理解：假设浏览器里面的宏任务优先级是 `1`，所以是按照先后顺序依次执行，也就是一个宏任务，所有的微任务，再一个宏任务，再所有的微任务。而 `Node.js` 的 宏任务之间也是有优先级的，所以 `Node.js` 的 `Event Loop` 每次都是把当前优先级的所有宏任务跑完再去跑微任务，然后再跑下一个优先级的宏任务

![](https://s.poetries.work/uploads/2022/08/79901f3c439b7aca.png)

*   也就是是一定数量的 `Timers` 宏任务，再所有微任务，再一定数量的 `Pending Callback` 宏任务，再所有微任务这样。
*   **为什么说是一定数量呢**？因为如果某个阶段宏任务太多，下个阶段就一直执行不到了，所以有个上限的限制，剩余的下个 `Event Loop` 再继续执行。 除了宏任务有优先级，微任务也划分了优先级，多了一个 `process.nextTick` 的高优先级微任务，在所有的普通微任务之前来跑。

![](https://s.poetries.work/uploads/2022/08/d8d8aab462f64df6.png)

**Node.js 的 Event Loop 的完整流程就是这样的**

*   **`Timers` 阶段**：执行一定数量的定时器，也就是 `setTimeout`、`setInterval` 的 `callback`，太多的话留到下次执行
*   微任务：执行所有 `nextTick` 的微任务，再执行其他的普通微任务
*   **`Pending` 阶段**：执行一定数量的 `IO` 和网络的异常回调，太多的话留到下次执行
*   微任务：执行所有 `nextTick` 的微任务，再执行其他的普通微任务
*   **`Idle/Prepare` 阶段**：内部用的一个阶段
*   微任务：执行所有 `nextTick` 的微任务，再执行其他的普通微任务
*   **`Poll` 阶段**：执行一定数量的文件的 `data` 回调、网络的 `connection` 回调，太多的话留到下次执行。如果没有 `IO` 回调并且也没有 `timers`、`check` 阶段的回调要处理，就阻塞在这里等待 `IO` 事件
*   微任务：执行所有 `nextTick`的微任务，再执行其他的普通微任务
*   **`Check` 阶段**：执行一定数量的 `setImmediate` 的 `callback`，太多的话留到下次执行。
*   微任务：执行所有 `nextTick` 的微任务，再执行其他的普通微任务
*   **`Close` 阶段**：执行一定数量的 `close` 事件的 `callback`，太多的话留到下次执行。
*   微任务：执行所有 `nextTick` 的微任务，再执行其他的普通微任务

比起浏览器里的 `Event Loop`，明显复杂了很多

> `Node.js` 对宏任务做了优先级划分，从高到低分别是 `Timers`、`Pending`、`Poll`、`Check`、`Close` 这 `5` 种，也对微任务做了划分，也就是 `nextTick` 的微任务和其他微任务。执行流程是先执行完当前优先级的一定数量的宏任务（剩下的留到下次循环），然后执行 `process.nextTick` 的微任务，再执行普通微任务，之后再执行下个优先级的一定数量的宏任务。这样不断循环。其中还有一个 `Idle/Prepare` 阶段是给 `Node.js` 内部逻辑用的，不需要关心

*   改变了浏览器 `Event Loop` 里那种一次执行一个宏任务的方式，可以让高优先级的宏任务更早的得到执行，但是也设置了个上限，避免下个阶段一直得不到执行。
*   还有一个特别要注意的点，就是 `poll` 阶段：如果执行到 `poll` 阶段，发现 `poll` 队列为空并且 `timers` 队列、`check` 队列都没有任务要执行，那么就阻塞的等在这里等 `IO` 事件，而不是空转。 这点设计也是因为服务器主要是处理 `IO` 的，阻塞在这里可以更早的响应 `IO`。

**完整的 Node.js 的 Event Loop 是这样的**

![](https://s.poetries.work/uploads/2022/08/49ed4533c3a57da1.png)

对比下浏览器的 `Event Loop`

![](https://s.poetries.work/uploads/2022/08/105a2141ea20e709.png)

两个 `JS` 运行环境的 `Event Loop` 整体设计思路是差不多的，只不过 `Node.js` 的 `Event Loop` 对宏任务和微任务做了更细粒度的划分，也很容易理解，毕竟 `Node.js` 面向的环境和浏览器不同，更重要的是服务端对性能的要求会更高

**总结**

*   `Node.js`也是一个 `JS` 运行环境，想支持异步同样要用 `Event Loop`，只不过服务端环境更复杂，对性能要求更高，所以 `Node.js` 对宏微任务都做了更细粒度的优先级划分
*   `Node.js` 里划分了 `5` 种宏任务，分别是 `Timers`、`Pending`、`Poll`、`Check`、`Close`。又划分了 `2` 种微任务，分别是 `process.nextTick` 的微任务和其他的微任务。
*   `Node.js` 的 `Event Loop` 流程是执行当前阶段的一定数量的宏任务（剩余的到下个循环执行），然后执行所有微任务，一共有 `Timers`、`Pending`、`Idle/Prepare`、`Poll`、`Check`、`Close` `6` 个阶段。（订正：`node 11` 之前是这样，`node 11` 之后改为了每个宏任务都执行所有微任务了）其中 `Idle/Prepare` 阶段是 `Node.js` 内部用的，不用关心。
*   特别要注意的是 `Poll` 阶段，如果执行到这里，`poll` 队列为空并且 `timers`、`check` 队列也为空，就一直阻塞在这里等待 `IO`，直到 `timers`、`check` 队列有回调再继续 `loop`。
*   `Event Loop` 是 `JS` 为了支持异步和任务优先级而设计的一套调度逻辑，针对浏览器、`Node.js` 等不同环境有不同的设计（主要是任务优先级的划分粒度不同），`Node.js` 面对的环境更复杂、对性能要求更高，所以 `Event Loop` 设计的更复杂一些。
```

> 当 `Node.js` 开始启动时，会初始化一个 `Eventloop`，处理输入的代码脚本，这些脚本会进行 `API` 异步调用，`process.nextTick()` 方法会开始处理事件循环。下面就是 `Node.js` 官网提供的 `Eventloop` 事件循环参考流程

*   `Node` 中的 `Event loop` 和浏览器中的不相同。
*   `Node` 的 `Event loop` 分为`6`个阶段，它们会按照顺序反复运行

![](https://s.poetries.work/images/20210414211850.png) ![](https://s.poetries.work/images/20210516214402.png) ![](https://s.poetries.work/images/20210516221825.png)

*   每次执行执行一个宏任务后会清空微任务（执行顺序和浏览器一致，在`node11`版本以上）
*   `process.nextTick` node中的微任务，当前执行栈的底部，优先级比`promise`要高

> 整个流程分为六个阶段，当这六个阶段执行完一次之后，才可以算得上执行了一次 Eventloop 的循环过程。我们来分别看下这六个阶段都做了哪些事情。

*   **Timers 阶段**：这个阶段执行 `setTimeout` 和 `setInterval`的回调函数，简单理解就是由这两个函数启动的回调函数。
*   **I/O callbacks 阶段**：这个阶段主要执行系统级别的回调函数，比如 TCP 连接失败的回调。
*   **idle，prepare 阶段**：仅系统内部使用，你只需要知道有这 2 个阶段就可以。
*   **poll 阶段**：`poll` 阶段是一个重要且复杂的阶段，几乎所有 `I/O` 相关的回调，都在这个阶段执行（除了`setTimeout`、`setInterval`、`setImmediate` 以及一些因为 `exception` 意外关闭产生的回调）。检索新的 `I/O` 事件，执行与 `I/O` 相关的回调`，其他情况`Node.js` 将在适当的时候在此阻塞。这也是最复杂的一个阶段，所有的事件循环以及回调处理都在这个阶段执行。这个阶段的主要流程如下图所示。

![](https://s.poetries.work/images/20210414212124.png)

*   **check 阶段**：`setImmediate()` 回调函数在这里执行，`setImmediate` 并不是立马执行，而是当事件循环 `poll 中没有新的事件处理时就执行该部分`，如下代码所示。

```jsx

    const fs = require('fs');
    setTimeout(() => { // 新的事件循环的起点
        console.log('1'); 
    }, 0);
    setImmediate( () => {
        console.log('setImmediate 1');
    });
    /// fs.readFile 将会在 poll 阶段执行
    fs.readFile('./test.conf', {encoding: 'utf-8'}, (err, data) => {
        if (err) throw err;
        console.log('read file success');
    });
    /// 该部分将会在首次事件循环中执行
    Promise.resolve().then(()=>{
        console.log('poll callback');
    });
    // 首次事件循环执行
    console.log('2');
```

在这一代码中有一个非常奇特的地方，就是 `setImmediate` 会在 `setTimeout` 之后输出。有以下几点原因：

> *   `setTimeout` 如果不设置时间或者设置时间为 `0`，则会默认为 `1ms`
> *   主流程执行完成后，超过 `1ms` 时，会将 `setTimeout` 回调函数逻辑插入到待执行回调函数 `poll` 队列中；
> *   由于当前 `poll` 队列中存在可执行回调函数，因此需要先执行完，待完全执行完成后，才会执行`check：setImmediate`。

> 因此这也验证了这句话，`先执行回调函数，再执行 setImmediate`

*   **close callbacks 阶段**：执行一些关闭的回调函数，如 `socket.on('close', ...)`

> 除了把 Eventloop 的宏任务细分到不同阶段外。node 还引入了一个新的任务队列 `Process.nextTick()`

可以认为，`Process.nextTick()` 会在上述各个阶段结束时，在`进入下一个阶段之前立即执行`（优先级甚至超过 `microtask` 队列）

**事件循环的主要包含微任务和宏任务。具体是怎么进行循环的呢**

![](https://s.poetries.work/images/20210424174311.png)

*   **微任务**：在 Node.js 中微任务包含 2 种——`process.nextTick` 和 `Promise`。`微任务在事件循环中优先级是最高的`，因此在同一个事件循环中有其他任务存在时，优先执行微任务队列。并且`process.nextTick 和 Promise`也存在优先级，`process.nextTick` 高于 `Promise`
*   **宏任务**：在 Node.js 中宏任务包含 4 种——`setTimeout`、`setInterval`、`setImmediate` 和 `I/O`。宏任务在微任务执行之后执行，因此在同一个事件循环周期内，如果既存在微任务队列又存在宏任务队列，那么优先将微任务队列清空，再执行宏任务队列

我们可以看到有一个核心的主线程，它的执行阶段主要处理三个核心逻辑。

*   同步代码。
*   将异步任务插入到微任务队列或者宏任务队列中。
*   执行微任务或者宏任务的回调函数。在主线程处理回调函数的同时，也需要判断是否插入微任务和宏任务。根据优先级，先判断微任务队列是否存在任务，存在则先执行微任务，不存在则判断在宏任务队列是否有任务，有则执行。

```jsx

    const fs = require('fs');
    // 首次事件循环执行
    console.log('start');
    /// 将会在新的事件循环中的阶段执行
    fs.readFile('./test.conf', {encoding: 'utf-8'}, (err, data) => {
        if (err) throw err;
        console.log('read file success');
    });
    setTimeout(() => { // 新的事件循环的起点
        console.log('setTimeout'); 
    }, 0);
    /// 该部分将会在首次事件循环中执行
    Promise.resolve().then(()=>{
        console.log('Promise callback');
    });
    /// 执行 process.nextTick
    process.nextTick(() => {
        console.log('nextTick callback');
    });
    // 首次事件循环执行
    console.log('end');
```

分析下上面代码的执行过程

*   第一个事件循环主线程发起，因此先执行同步代码，所以先输出 start，然后输出 end
*   第一个事件循环主线程发起，因此先执行同步代码，所以先输出 start，然后输出 end；
*   再从上往下分析，遇到微任务，插入微任务队列，遇到宏任务，插入宏任务队列，分析完成后，微任务队列包含：`Promise.resolve 和 process.nextTick`，宏任务队列包含：`fs.readFile 和 setTimeout`；
*   先执行微任务队列，但是根据优先级，先执行 `process.nextTick 再执行 Promise.resolve`，所以先输出 `nextTick callback` 再输出 `Promise callback`；
*   再执行宏任务队列，根据`宏任务插入先后顺序执行 setTimeout 再执行 fs.readFile`，这里需要注意，先执行 `setTimeout` 由于其回调时间较短，因此回调也先执行，并非是 `setTimeout` 先执行所以才先执行回调函数，但是它执行需要时间肯定大于 `1ms`，所以虽然 `fs.readFile` 先于`setTimeout` 执行，但是 `setTimeout` 执行更快，所以先输出 `setTimeout` ，最后输出 `read file success`。

```jsx

    // 输出结果
    start
    end
    nextTick callback
    Promise callback
    setTimeout
    read file success
```

![](https://s.poetries.work/images/20210516224232.png)

> 当微任务和宏任务又产生新的微任务和宏任务时，又应该如何处理呢？如下代码所示：

```jsx

    const fs = require('fs');
    setTimeout(() => { // 新的事件循环的起点
        console.log('1'); 
        fs.readFile('./config/test.conf', {encoding: 'utf-8'}, (err, data) => {
            if (err) throw err;
            console.log('read file sync success');
        });
    }, 0);
    /// 回调将会在新的事件循环之前
    fs.readFile('./config/test.conf', {encoding: 'utf-8'}, (err, data) => {
        if (err) throw err;
        console.log('read file success');
    });
    /// 该部分将会在首次事件循环中执行
    Promise.resolve().then(()=>{
        console.log('poll callback');
    });
    // 首次事件循环执行
    console.log('2');
```

在上面代码中，有 2 个宏任务和 1 个微任务，宏任务是 `setTimeout 和 fs.readFile`，微任务是 `Promise.resolve`。

*   整个过程优先执行主线程的第一个事件循环过程，所以先执行同步逻辑，先输出 2。
*   接下来执行微任务，输出 `poll callback`。
*   再执行宏任务中的 `fs.readFile 和 setTimeout`，由于 `fs.readFile` 优先级高，先执行 `fs.readFile`。但是处理时间长于 `1ms`，因此会先执行 `setTimeout` 的回调函数，输出 `1`。这个阶段在执行过程中又会产生新的宏任务 `fs.readFile`，因此又将该 `fs.readFile 插入宏任务队列`
*   最后由于只剩下宏任务了 `fs.readFile`，因此执行该宏任务，并等待处理完成后的回调，输出 `read file sync success`。

```jsx

    // 结果
    2
    poll callback
    1
    read file success
    read file sync success
```

**Process.nextick() 和 Vue 的 nextick**

![](https://s.poetries.work/images/20210414213602.png)

> `Node.js` 和浏览器端宏任务队列的另一个很重要的不同点是，浏览器端任务队列每轮事件循环仅出队一个回调函数接着去执行微任务队列；而 `Node.js` 端只要轮到执行某个宏任务队列，则会执行完队列中所有的当前任务，但是当前轮次新添加到队尾的任务则会等到下一轮次才会执行。

```jsx

    setTimeout(() => {
        console.log('setTimeout');
    }, 0);
    setImmediate(() => {
        console.log('setImmediate');
    })
    // 这里可能会输出 setTimeout，setImmediate
    // 可能也会相反的输出，这取决于性能
    // 因为可能进入 event loop 用了不到 1 毫秒，这时候会执行 setImmediate
    // 否则会执行 setTimeout
```

> 上面介绍的都是 `macrotask` 的执行情况，`microtask` 会在以上每个阶段完成后立即执行

```jsx

    setTimeout(()=>{
        console.log('timer1')

        Promise.resolve().then(function() {
            console.log('promise1')
        })
    }, 0)

    setTimeout(()=>{
        console.log('timer2')

        Promise.resolve().then(function() {
            console.log('promise2')
        })
    }, 0)

    // 以上代码在浏览器和 node 中打印情况是不同的
    // 浏览器中一定打印 timer1, promise1, timer2, promise2
    // node 中可能打印 timer1, timer2, promise1, promise2
    // 也可能打印 timer1, promise1, timer2, promise2
```

> `Node` 中的 `process.nextTick` 会先于其他 `microtask` 执行

![](https://s.poetries.work/images/20210529172258.png)

```jsx

    setTimeout(() => {
     console.log("timer1");

     Promise.resolve().then(function() {
       console.log("promise1");
     });
    }, 0);

    // poll阶段执行
    fs.readFile('./test',()=>{
      // 在poll阶段里面 如果有setImmediate优先执行，setTimeout处于事件循环顶端 poll下面就是setImmediate
      setTimeout(()=>console.log('setTimeout'),0)
      setImmediate(()=>console.log('setImmediate'),0)
    })

    process.nextTick(() => {
     console.log("nextTick");
    });
    // nextTick, timer1, promise1,setImmediate,setTimeout
```

> 对于 `microtask` 来说，它会在以上每个阶段完成前清空 `microtask` 队列，下图中的 `Tick` 就代表了 `microtask`

![](https://s.poetries.work/gitee/2020/07/fe/5.png)

**谁来启动这个循环过程，循环条件是什么？**

> 当 Node.js 启动后，会初始化事件循环，处理已提供的输入脚本，它可能会先调用一些异步的 API、调度定时器，或者 `process.nextTick()`，然后再开始处理事件循环。因此可以这样理解，Node.js 进程启动后，就发起了一个新的事件循环，也就是事件循环的起点。

总结来说，Node.js 事件循环的发起点有 4 个：

*   `Node.js` 启动后；
*   `setTimeout` 回调函数；
*   `setInterval` 回调函数；
*   也可能是一次 `I/O` 后的回调函数。

**无限循环有没有终点**

> 当所有的微任务和宏任务都清空的时候，虽然当前没有任务可执行了，但是也并不能代表循环结束了。因为可能存在当前还未回调的异步 I/O，所以这个循环是没有终点的，只要进程在，并且有新的任务存在，就会去执行

**Node.js 是单线程的还是多线程的？**

> `主线程是单线程执行的`，但是 Node.js `存在多线程执行`，多线程包括 `setTimeout 和异步 I/O 事件`。其实 Node.js 还存在其他的线程，包括`垃圾回收、内存优化`等

**EventLoop 对渲染的影响**

*   想必你之前在业务开发中也遇到过 `requestIdlecallback 和 requestAnimationFrame`，这两个函数在我们之前的内容中没有讲过，但是当你开始考虑它们在 Eventloop 的生命周期的哪一步触发，或者这两个方法的回调会在微任务队列还是宏任务队列执行的时候，才发现好像没有想象中那么简单。这两个方法其实也并不属于 JS 的原生方法，而是浏览器宿主环境提供的方法，因为它们牵扯到另一个问题：渲染。
*   我们知道浏览器作为一个复杂的应用是多线程工作的，除了运行 JS 的线程外，还有渲染线程、定时器触发线程、HTTP 请求线程，等等。JS 线程可以读取并且修改 DOM，而渲染线程也需要读取 DOM，这是一个典型的多线程竞争临界资源的问题。所以浏览器就把这两个线程设计成互斥的，即同时只能有一个线程在执行
*   渲染原本就不应该出现在 Eventloop 相关的知识体系里，但是因为 Eventloop 显然是在讨论 JS 如何运行的问题，而渲染则是浏览器另外一个线程的工作。但是 `requestAnimationFrame`的出现却把这两件事情给关联起来
*   通过调用 `requestAnimationFrame` 我们可以在下次渲染之前执行回调函数。那下次渲染具体是哪个时间点呢？渲染和 Eventloop 有什么关系呢？
    *   简单来说，就是在每一次 `Eventloop` 的末尾，`判断当前页面是否处于渲染时机，就是重新渲染`
*   有屏幕的硬件限制，比如 60Hz 刷新率，简而言之就是 1 秒刷新了 60 次，16.6ms 刷新一次。这个时候浏览器的渲染间隔时间就没必要小于 `16.6ms`，因为就算渲染了屏幕上也看不到。当然浏览器也不能保证一定会每 16.6ms 会渲染一次，因为还会受到处理器的性能、JavaScript 执行效率等其他因素影响。
*   回到 `requestAnimationFrame`，这个 API 保证在下次浏览器渲染之前一定会被调用，实际上我们完全可以把它看成是一个高级版的 `setInterval`。它们都是在一段时间后执行回调，但是前者的间隔时间是由浏览器自己不断调整的，而后者只能由用户指定。这样的特性也决定了 `requestAnimationFrame` 更适合用来做针对每一帧来修改的动画效果
*   当然 `requestAnimationFrame` 不是 `Eventloop` 里的宏任务，或者说它并不在 `Eventloop` 的生命周期里，只是浏览器又开放的一个在渲染之前发生的新的 hook。另外需要注意的是微任务的认知概念也需要更新，在执行 animation callback 时也有可能产生微任务（比如 promise 的 callback），会放到 animation queue 处理完后再执行。所以微任务并不是像之前说的那样在每一轮 Eventloop 后处理，而是在 JS 的函数调用栈清空后处理

但是 `requestIdlecallback` 却是一个更好理解的概念。当宏任务队列中没有任务可以处理时，浏览器可能存在“空闲状态”。这段空闲时间可以被 `requestIdlecallback` 利用起来执行一些优先级不高、不必立即执行的任务，如下图所示：

![](https://s.poetries.work/images/20210414212916.png)

###  12.3 实现一个Promise A+ 规范

> 最好是实现一遍 `Promise A+` 规范，多少有点印象，当然面试官也不会叫你默写一个完整的出来，但是你起码要知道实现原理

```jsx

    /**
     * Promises/A+规范 实现一个promise
     * https://promisesaplus.com/
    */

    const EMUM = {
      PENDING: 'PENDING',
      FULFILLED: 'FULFILLED',
      REJECTED: 'REJECTED'
    }

    // x 返回值
    // promise2 then的时候new的promise
    // promise2的resolve, reject
    const resolvePromise = (x, promise2, resolve, reject)=>{
      // 解析promise的值解析promise2是成功还是失败 传递到下层then
      if(x === promise2) {
        reject(new TypeError('类型错误'))
      }
      // 这里的x如果是一个promise的话 可能是其他的promise，可能调用了成功 又调用了失败
      // 防止resolve的时候 又throw err抛出异常到reject了
      let called
      // 如果x是promise 那么就采用他的状态
      // 有then方法是promise
      if(typeof x === 'object' && typeof x!== null || typeof x === 'function') {
        // x是对象或函数
        try {
          let then = x.then // 缓存，不用多次取值
          if(typeof then === 'function') {
            // 是promise，调用then方法里面有this，需要传入this为x才能取到then方法里面的值this.value
            then.call(x, y=>{// 成功
              // y值可能也是一个promise 如resolve(new Promise()) 此时的y==new Promise()
              // 递归解析y，直到拿到普通的值resolve(x出去)
              if(called) return;
              called = true;

              resolvePromise(y, promise2, resolve, reject)
            },r=>{// 一旦失败直接失败
              if(called) return;
              called = true;
              reject(r)
            })
          } else {
            // 普通对象不是promise
            resolve(x)
          }
        } catch (e) {
          // 对象取值可能报错，用defineProperty定义get 抛出异常
          if(called) return;
          called = true;
          reject(e)
        }
      } else {
        // x是普通值
        resolve(x) // 直接成功
      }

    }
    class myPromise {
      constructor(executor) {
        this.status = EMUM.PENDING // 当前状态
        this.value = undefined // resolve接收值
        this.reason = undefined // reject失败返回值

        /**
         * 同一个promise可以then多次(发布订阅模式)
         * 调用then时 当前状态是等待态，需要将当前成功或失败的回调存放起来（订阅）
         * 调用resolve时 将订阅函数进行执行（发布）
        */
        // 成功队列
        this.onResolvedCallbacks = []
        // 失败队列
        this.onRejectedCallbacks = []
        const resolve = value =>{
          // 如果value是一个promise，需要递归解析
          // 如 myPromise.resolve(new myPromise()) 需要解析value
          if(value instanceof myPromise) {
            // 不停的解析 直到值不是promise
            return value.then(resolve,reject)
          }

          if(this.status === EMUM.PENDING) {
            this.status = EMUM.FULFILLED
            this.value = value

            this.onResolvedCallbacks.forEach(fn=>fn())
          }
        }
        const reject = reason =>{
          if(this.status === EMUM.PENDING) {
            this.status = EMUM.REJECTED
            this.reason = reason

            this.onRejectedCallbacks.forEach(fn=>fn())
          }
        }
        try {
          executor(resolve,reject)
        } catch(e) {
          reject(e)
        }
      }
      then(onFulFilled, onRejected) {
        // 透传 处理默认不传的情况
        // new Promise((resolve,reject)=>{
        //   resolve(1)
        // }).then().then().then(d=>{})
        // new Promise((resolve,reject)=>{
        //   resolve(1)
        // }).then(v=>v).then(v=>v).then(d=>{})
        // new Promise((resolve,reject)=>{
        //   reject(1)
        // }).then().then().then(null, e=>{console.log(e)})
        // new Promise((resolve,reject)=>{
        //   reject(1)
        // }).then(null,e=>{throw e}).then(null,e=>{throw e}).then(null,e=>{console.log(e)})
        onFulFilled = typeof onFulFilled === 'function' ? onFulFilled : v => v
        onRejected = typeof onRejected === 'function' ? onRejected : err => {throw err}

        // 调用then 创建一个新的promise
        let promise2 = new myPromise((resolve,reject)=>{
          // 根据value判断是resolve 还是reject value也可能是promise
          if(this.status === EMUM.FULFILLED) {
            setTimeout(() => {
              try {
                // 成功回调结果
                let x = onFulFilled(this.value)
                // 解析promise
                resolvePromise(x, promise2,resolve,reject)
              } catch (error) {
                reject(error)
              }
            }, 0);
          }
          if(this.status === EMUM.REJECTED) {
            setTimeout(() => {
              try {
                let x = onRejected(this.reason)
                // 解析promise
                resolvePromise(x, promise2,resolve,reject)
              } catch (error) {
                reject(error)
              }
            }, 0);
          }
          // 用户还未调用resolve或reject方法
          if(this.status === EMUM.PENDING) {
            this.onResolvedCallbacks.push(()=>{
              try {
                let x = onFulFilled(this.value)
                // 解析promise
                resolvePromise(x, promise2,resolve,reject)
              } catch (error) {
                reject(error)
              }
            })
            this.onRejectedCallbacks.push(()=>{
              try {
                let x = onRejected(this.reason)
                // 解析promise
                resolvePromise(x, promise2,resolve,reject)
              } catch (error) {
                reject(error)
              }
            })
          }
        })

        return promise2
      }
      catch(errCallback) {
        // 等同于没有成功，把失败放进去而已
        return this.then(null, errCallback)
      }
      // myPromise.resolve 具备等待功能的 如果参数的promise会等待promise解析完毕在向下执行
      static resolve(val) {
        return new myPromise((resolve,reject)=>{
          resolve(val)
        })
      }
      // myPromise.reject 直接将值返回
      static reject(reason) {
        return new myPromise((resolve,reject)=>{
          reject(reason)
        })
      }
      // finally传入的函数 无论成功或失败都执行
      // Promise.reject(100).finally(()=>{console.log(1)}).then(d=>console.log('success',d)).catch(er=>console.log('faild',er))
      // Promise.reject(100).finally(()=>new Promise()).then(d=>console.log(d)).catch(er=>)
      finally(callback) {
        return this.then((val)=>{
          return myPromise.resolve(callback()).then(()=>val)
        },(err)=>{
          return myPromise.resolve(callback()).then(()=>{throw err})
        })
      }
      // Promise.all
      static all(values) {
        return new myPromise((resolve,reject)=>{
          let resultArr = []
          let orderIndex = 0
          const processResultByKey = (value,index)=>{
            resultArr[index] = value 
            // 处理完全部
            if(++orderIndex === values.length) {
              resolve(resultArr) // 处理完成的结果返回去
            }
          }
          for (let i = 0; i < values.length; i++) {
            const value = values[i];
            // 是promise
            if(value && typeof value.then === 'function') {
              value.then((val)=>{
                processResultByKey(val,i)
              },reject)
            } else {
              // 不是promise情况
              processResultByKey(value,i)
            }
          }
        })
      }
      static race(promises) {
        // 采用最新成功或失败的作为结果
        return new myPromise((resolve,reject)=>{
          for (let i = 0; i < promises.length; i++) {
            let val = promises[i]
            if(val && typeof val.then === 'function') {
              // 任何一个promise先调用resolve或reject就返回结果了 也就是返回执行最快的那个promise的结果
              val.then(resolve,reject)
            }else{
              // 普通值
              resolve(val)
            }
          }
        })
      }
    }

    module.exports = myPromise
```

测试

```jsx

    /**
     * =====测试用例-====
     */
    // let promise1 = new myPromise((resolve,reject)=>{
    //   setTimeout(() => {
    //     resolve('成功')
    //   }, 900);
    // })

    // promise1.then(val=>{
    //   console.log('success', val)
    // },reason=>{
    //   console.log('fail', reason)
    // })

    /**
     * then的使用方式 普通值意味不是promise
     * 
     * 1、then中的回调有两个方法 成功或失败 他们的结果返回（普通值）会传递给外层的下一个then中
     * 2、可以在成功或失败中抛出异常，走到下一次then的失败中
     * 3、返回的是一个promsie，那么会用这个promise的状态作为结果，会用promise的结果向下传递
     * 4、错误处理，会默认先找离自己最新的错误处理，找不到就向下查找，找打了就执行
     */

    // read('./name.txt').then(data=>{
    //   return '123'
    // }).then(data=>{

    // }).then(null,err=>{

    // })
    // // .catch(err=>{ // catch就是没有成功的promise

    // // })

    /**
     * promise.then实现原理：通过每次返回一个新的promise来实现（promise一旦成功就不能失败，失败就不能成功）
     * 
     */

    // function read(data) {
    //   return new myPromise((resolve,reject)=>{
    //     setTimeout(() => {
    //       resolve(new myPromise((resolve,reject)=>resolve(data)))
    //     }, 1000);
    //   })
    // }

    // let promise2 = read({name: 'poetry'}).then(data=>{
    //   return data
    // }).then().then().then(data=>{
    //   console.log(data,'-data-')
    // },(err)=>{
    //   console.log(err,'-err-')
    // })

    // finally测试
    // myPromise
    //   .resolve(100)
    //   .finally(()=>{
    //     return new myPromise((resolve,reject)=>setTimeout(() => {
    //       resolve(100)
    //     }, 100))
    //   })
    //   .then(d=>console.log('finally success',d))
    //   .catch(er=>console.log(er, 'finally err'))

    /**
     * promise.all 测试
     * 
     * myPromise.all 解决并发问题 多个异步并发获取最终的结果
    */

    // myPromise.all([1,2,3,4,new myPromise((resolve,reject)=>{
    //   setTimeout(() => {
    //     resolve('ok1')
    //   }, 1000);
    // }),new myPromise((resolve,reject)=>{
    //   setTimeout(() => {
    //     resolve('ok2')
    //   }, 1000);
    // })]).then(d=>{
    //   console.log(d,'myPromise.all.resolve')
    // }).catch(err=>{
    //   console.log(err,'myPromise.all.reject')
    // })

    // 实现promise中断请求
    let promise = new Promise((resolve,reject)=>{
      setTimeout(() => {
        // 模拟接口调用 ajax调用超时
        resolve('成功') 
      }, 10000);
    })

    function promiseWrap(promise) {
      // 包装一个promise 可以控制原来的promise是成功 还是失败
      let abort
      let newPromsie = new myPromise((resolve,reject)=>{
        abort = reject
      })
      // 只要控制newPromsie失败，就可以控制被包装的promise走向失败
      // Promise.race 任何一个先成功或者失败 就可以获得结果
      let p = myPromise.race([promise, newPromsie])
      p.abort = abort

      return p
    }

    let newPromise = promiseWrap(promise)

    setTimeout(() => {
      // 超过3秒超时
      newPromise.abort('请求超时')
    }, 3000);

    newPromise.then(d=>{
      console.log('d',d)
    }).catch(err=>{
      console.log('err',err)
    })

    // 使用promises-aplus-tests 测试写的promise是否规范
    // 全局安装 cnpm i -g promises-aplus-tests
    // 命令行执行 promises-aplus-tests promise.js
    // 测试入口 产生延迟对象
    myPromise.defer = myPromise.deferred = function () {
      let dfd = {}
      dfd.promise = new myPromise((resolve,reject)=>{
        dfd.resolve = resolve
        dfd.reject = reject
      })
      return dfd
    }

    // 延迟对象用户
    // ![](https://s.poetries.work/images/20210509172817.png)
    // promise解决嵌套问题
    // function readData(url) {
    //   let dfd = myPromise.defer()
    //   fs.readFile(url, 'utf8', function (err,data) {
    //     if(err) {
    //       dfd.reject()
    //     }
    //     dfd.resolve(data)
    //   })
    //   return dfd.promise
    // }
    // readData().then(d=>{
    //   return d
    // })
```

###  12.4 setTimeout、Promise、Async / Await 的区别

*   首先，我们先来了解一下基本概念：
    *   `js EventLoop` 事件循环机制:
    *   `JavaScript`的事件分两种，宏任务(`macro-task`)和微任务(`micro-task`)
*   宏任务：包括整体代码`script`，`setTimeout`，`setInterval`
*   微任务：`Promise.then`(非`new Promise`)，`process.nextTick`(`node`中)
*   事件的执行顺序，是先执行宏任务，然后执行微任务，这个是基础，任务可以有同步任务和异步任务，同步的进入主线程，异步的进入`Event Table`并注册函数，异步事件完成后，会将回调函数放入`Event Queue`中(宏任务和微任务是不同的`Event Queue`)，同步任务执行完成后，会从`Event Queue`中读取事件放入主线程执行，回调函数中可能还会包含不同的任务，因此会循环执行上述操作。
*   注意： `setTimeOut`并不是直接的把你的回掉函数放进上述的异步队列中去，而是在定时器的时间到了之后，把回掉函数放到执行异步队列中去。如果此时这个队列已经有很多任务了，那就排在他们的后面。这也就解释了为什么`setTimeOut`为什么不能精准的执行的问题了。
*   `setTimeout`执行需要满足两个条件：
    *   主进程必须是空闲的状态，如果到时间了，主进程不空闲也不会执行你的回掉函数
    *   这个回掉函数需要等到插入异步队列时前面的异步函数都执行完了，才会执行
*   上面是比较官方的解释，说一下自己的理解吧：
    *   了解了什么是宏任务和微任务，就好理解多了，首先执行 `宏任务` => `微任务的Event Queue` => `宏任务的Event Queue`
*   `promise`、`async/await`
    *   首先，`new Promise`是同步的任务，会被放到主进程中去立即执行。而`.then()`函数是异步任务会放到异步队列中去，那什么时候放到异步队列中去呢？当你的promise状态结束的时候，就会立即放进异步队列中去了。
    *   带`async`关键字的函数会返回一个`promise`对象，如果里面没有`await`，执行起来等同于普通函数；如果没有`await`，`async`函数并没有很厉害是不是
    *   `await` 关键字要在 `async` 关键字函数的内部，await 写在外面会报错；`await`如同他的语意，就是在等待，等待右侧的表达式完成。此时的`await`会让出线程，阻塞`async`内后续的代码，先去执行`async`外的代码。等外面的同步代码执行完毕，才会执行里面的后续代码。就算`await`的不是`promise`对象，是一个同步函数，也会等这样操作

![](https://pic2.zhimg.com/80/v2-9540801abdfb378ae5120b0df9a96059_1440w.jpg)

根据图片显示我们来整理一下流程：

*   执行`console.log('script start')`，输出`script start`；
*   执行`setTimeout`，是一个异步动作，放入宏任务异步队列中；
*   执行`async1()`，输出`async1 start`，继续向下执行；
*   执行`async2()`，输出`async2`，并返回了一个`promise`对象，`await`让出了线程，把返回的promise加入了微任务异步队列，所以`async1()`下面的代码也要等待上面完成后继续执行;
*   执行 `new Promise`，输出`promise1`，然后将`resolve`放入微任务异步队列；
*   执行`console.log('script end')`，输出`script end`；
*   到此同步的代码就都执行完成了，然后去微任务异步队列里去获取任务
*   接下来执行`resolve`（`async2`返回的`promise`返回的），输出了`async1 end`。
*   然后执行`resolve`（`new Promise`的），输出了`promise2`
*   最后执行`setTimeout`，输出了`settimeout`

### 多久才执行，Event Loop

> setTimeout 按照顺序放到队列里面，然后等待函数调用栈清空之后才开始执行，而这些操作进入队列的顺序，则由设定的延迟时间来决定

###  12.6 async原理

> `async/await`语法糖就是使用`Generator`函数+自动执行器来运作的

```jsx

    // 定义了一个promise，用来模拟异步请求，作用是传入参数++
    function getNum(num){
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(num+1)
            }, 1000)
        })
    }

    //自动执行器，如果一个Generator函数没有执行完，则递归调用
    function asyncFun(func){
      var gen = func();

      function next(data){
        var result = gen.next(data);
        if (result.done) return result.value;
        result.value.then(function(data){
          next(data);
        });
      }

      next();
    }

    // 所需要执行的Generator函数，内部的数据在执行完成一步的promise之后，再调用下一步
    var func = function* (){
      var f1 = yield getNum(1);
      var f2 = yield getNum(f1);
      console.log(f2) ;
    };
    asyncFun(func);
```

*   在执行的过程中，判断一个函数的`promise`是否完成，如果已经完成，将结果传入下一个函数，继续重复此步骤
*   每一个 `next()` 方法返回值的 `value` 属性为一个 `Promise` 对象，所以我们为其添加 `then` 方法， 在 `then` 方法里面接着运行 `next` 方法挪移遍历器指针，直到 `Generator`函数运行完成

##  13 内存泄露

###  13.1 Chrome devTools查看内存情况

> *   打开`Chrome`的无痕模式，这样做的目的是为了屏蔽掉`Chrome`插件对我们之后测试内存占用情况的影响
> *   打开开发者工具，找到`Performance`这一栏，可以看到其内部带着一些功能按钮，例如：开始录制按钮；刷新页面按钮；清空记录按钮；记录并可视化js内存、节点、事件监听器按钮；触发垃圾回收机制按钮等

![](https://s.poetries.work/uploads/2022/08/d1451162abd9747e.png)

简单录制一下百度页面，看看我们能获得什么，如下动图所示：

![](https://s.poetries.work/uploads/2022/08/e683158f36977b6b.gif)

> 从上图中我们可以看到，在页面从零到加载完成这个过程中`JS Heap`（js堆内存）、`documents`（文档）、`Nodes`（DOM节点）、`Listeners`（监听器）、`GPU memory`（`GPU`内存）的最低值、最高值以及随时间的走势曲线，这也是我们主要关注的点

看看开发者工具中的`Memory`一栏，其主要是用于记录页面堆内存的具体情况以及js堆内存随加载时间线动态的分配情况

![](https://s.poetries.work/uploads/2022/08/ef508139131f6abc.png)

堆快照就像照相机一样，能记录你当前页面的堆内存情况，每快照一次就会产生一条快照记录

![](https://s.poetries.work/uploads/2022/08/e2a1fe0d0aa4d4fd.png)

> 如上图所示，刚开始执行了一次快照，记录了当时堆内存空间占用为`33.7MB`，然后我们点击了页面中某些按钮，又执行一次快照，记录了当时堆内存空间占用为`32.5MB`。并且点击对应的快照记录，能看到当时所有内存中的变量情况（结构、占总占用内存的百分比...）

![](https://s.poetries.work/uploads/2022/08/ee6a489b7e87ef0f.png)

> 在开始记录后，我们可以看到图中右上角有起伏的蓝色与灰色的柱形图，其中`蓝色`表示当前时间线下占用着的内存；`灰色`表示之前占用的内存空间已被清除释放

在得知有内存泄漏的情况存在时，我们可以改用`Memory`来更明确得确认问题和定位问题

首先可以用`Allocation instrumentation on timeline`来确认问题，如下图所示：

![](https://s.poetries.work/uploads/2022/08/bcb184db6f3912da.png)

###  13.2 内存泄漏的场景

*   闭包使用不当引起内存泄漏
*   全局变量
*   分离的`DOM`节点
*   控制台的打印
*   遗忘的定时器

**1\. 闭包使用不当引起内存泄漏**

使用`Performance`和`Memory`来查看一下闭包导致的内存泄漏问题

```jsx

    <button onclick="myClick()">执行fn1函数</button>
    <script>
        function fn1 () {
            let a = new Array(10000)  // 这里设置了一个很大的数组对象

            let b = 3

            function fn2() {
                let c = [1, 2, 3]
            }

            fn2()

            return a
        }

        let res = []  

        function myClick() {
            res.push(fn1())
        }
    </script>
```

> 在退出`fn1`函数执行上下文后，该上下文中的变量`a`本应被当作垃圾数据给回收掉，但因`fn1`函数最终将变量`a`返回并赋值给全局变量`res`，其产生了对变量`a`的引用，所以变量`a`被标记为活动变量并一直占用着相应的内存，假设变量`res`后续用不到，这就算是一种闭包使用不当的例子

设置了一个按钮，每次执行就会将`fn1`函数的返回值添加到全局数组变量`res`中，是为了能在`performacne`的曲线图中看出效果，如图所示：

![](https://s.poetries.work/uploads/2022/08/70ebeb00bb65e063.gif)

*   在每次录制开始时手动触发一次垃圾回收机制，这是为了确认一个初始的堆内存基准线，便于后面的对比，然后我们点击了几次按钮，即往全局数组变量`res`中添加了几个比较大的数组对象，最后再触发一次垃圾回收，发现录制结果的JS Heap曲线刚开始成阶梯式上升的，最后的曲线的高度比基准线要高，说明可能是存在内存泄漏的问题
*   在得知有内存泄漏的情况存在时，我们可以改用`Memory`来更明确得确认问题和定位问题
*   首先可以用`Allocation instrumentation on timeline`来确认问题，如下图所示：

![](https://s.poetries.work/uploads/2022/08/3c5e8a655b107d85.gif)

*   在我们每次点击按钮后，动态内存分配情况图上都会出现一个`蓝色的柱形`，并且在我们触发垃圾回收后，`蓝色柱形`都没变成灰色柱形，即之前分配的内存并未被清除
*   所以此时我们就可以更明确得确认内存泄漏的问题是存在的了，接下来就精准定位问题，可以利用`Heap snapshot`来定位问题，如图所示：

![](https://s.poetries.work/uploads/2022/08/89b88d985b2b101e.gif)

*   第一次先点击快照记录初始的内存情况，然后我们多次点击按钮后再次点击快照，记录此时的内存情况，发现从原来的`1.1M`内存空间变成了`1.4M`内存空间，然后我们选中第二条快照记录，可以看到右上角有个`All objects`的字段，其表示展示的是当前选中的快照记录所有对象的分配情况，而我们想要知道的是第二条快照与第一条快照的区别在哪，所以选择`Object allocated between Snapshot1 and Snapshot2`即展示第一条快照和第二条快照存在差异的内存对象分配情况，此时可以看到Array的百分比很高，初步可以判断是该变量存在问题，点击查看详情后就能查看到该变量对应的具体数据了

以上就是一个判断闭包带来内存泄漏问题并简单定位的方法了

**2\. 全局变量**

全局的变量一般是不会被垃圾回收掉的当然这并不是说变量都不能存在全局，只是有时候会因为疏忽而导致某些变量流失到全局，例如未声明变量，却直接对某变量进行赋值，就会导致该变量在全局创建，如下所示：

```jsx

    function fn1() {
        // 此处变量name未被声明
        name = new Array(99999999)
    }

    fn1()
```

*   此时这种情况就会在全局自动创建一个变量`name`，并将一个很大的数组赋值给`name`，又因为是全局变量，所以该内存空间就一直不会被释放
*   解决办法的话，自己平时要多加注意，不要在变量未声明前赋值，或者也可以`开启严格模式`，这样就会在不知情犯错时，收到报错警告，例如

```jsx

    function fn1() {
        'use strict';
        name = new Array(99999999)
    }

    fn1()
```

**3\. 分离的`DOM`节点**

假设你手动移除了某个`dom`节点，本应释放该dom节点所占用的内存，但却因为疏忽导致某处代码仍对该被移除节点有引用，最终导致该节点所占内存无法被释放，例如这种情况

```jsx

    <div id="root">
        <div class="child">我是子元素</div>
        <button>移除</button>
    </div>
    <script>
      let btn = document.querySelector('button')
      let child = document.querySelector('.child')
      let root = document.querySelector('#root')

      btn.addEventListener('click', function() {
          root.removeChild(child)
      })
    </script>
```

> 该代码所做的操作就是点击按钮后移除`.child`的节点，虽然点击后，该节点确实从`dom`被移除了，但全局变量`child`仍对该节点有引用，所以导致该节点的内存一直无法被释放，可以尝试用`Memory`的快照功能来检测一下，如图所示

![](https://s.poetries.work/uploads/2022/08/3ab5821936052270.gif)

> 同样的先记录一下初始状态的快照，然后点击移除按钮后，再点击一次快照，此时内存大小我们看不出什么变化，因为移除的节点占用的内存实在太小了可以忽略不计，但我们可以点击第二条快照记录，在筛选框里输入`detached`，于是就会展示所有脱离了却又未被清除的节点对象

解决办法如下图所示：

```jsx

    <div id="root">
        <div class="child">我是子元素</div>
        <button>移除</button>
    </div>
    <script>
        let btn = document.querySelector('button')

        btn.addEventListener('click', function() {  
            let child = document.querySelector('.child')
            let root = document.querySelector('#root')

            root.removeChild(child)
        })

    </script>
```

> 改动很简单，就是将对`.child`节点的引用移动到了`click`事件的回调函数中，那么当移除节点并退出回调函数的执行上文后就会自动清除对该节点的引用，那么自然就不会存在内存泄漏的情况了，我们来验证一下，如下图所示：

![](https://s.poetries.work/uploads/2022/08/1fa90928bddb4112.gif)

结果很明显，这样处理过后就不存在内存泄漏的情况了

**4\. 控制台的打印**

```jsx

    <button>按钮</button>
    <script>
        document.querySelector('button').addEventListener('click', function() {
            let obj = new Array(1000000)

            console.log(obj);
        })
    </script>
```

我们在按钮的点击回调事件中创建了一个很大的数组对象并打印，用`performance`来验证一下

![](https://s.poetries.work/uploads/2022/08/7295a733de9b6e6d.gif)

> 开始录制，先触发一次垃圾回收清除初始的内存，然后点击三次按钮，即执行了三次点击事件，最后再触发一次垃圾回收。查看录制结果发现`JS Heap`曲线成阶梯上升，并且最终保持的高度比初始基准线高很多，这说明每次执行点击事件创建的很大的数组对象`obj`都因为`console.log`被浏览器保存了下来并且无法被回收

接下来注释掉`console.log`，再来看一下结果：

```jsx

    <button>按钮</button>
    <script>
        document.querySelector('button').addEventListener('click', function() {
            let obj = new Array(1000000)

            // console.log(obj);
        })
    </script>
```

![](https://s.poetries.work/uploads/2022/08/b875ced23a8c96d7.gif)

可以看到没有打印以后，每次创建的`obj`都立马被销毁了，并且最终触发垃圾回收机制后跟初始的基准线同样高，说明已经不存在内存泄漏的现象了

其实同理 `console.log`也可以用`Memory`来进一步验证

未注释 `console.log`

![](https://s.poetries.work/uploads/2022/08/da2f80dd5bad24b2.gif)

注释掉了`console.log`

![](https://s.poetries.work/uploads/2022/08/a69e5d3e85c60164.gif)

> 最后简单总结一下：在开发环境下，可以使用控制台打印便于调试，但是在生产环境下，尽可能得不要在控制台打印数据。所以我们经常会在代码中看到类似如下的操作：

```jsx

    // 如果在开发环境下，打印变量obj
    if(isDev) {
        console.log(obj)
    }
```

> 这样就避免了生产环境下无用的变量打印占用一定的内存空间，同样的除了`console.log`之外，`console.error`、`console.info`、`console.dir`等等都不要在生产环境下使用

**5\. 遗忘的定时器**

> 定时器也是平时很多人会忽略的一个问题，比如定义了定时器后就再也不去考虑清除定时器了，这样其实也会造成一定的内存泄漏。来看一个代码示例：

```jsx

    <button>开启定时器</button>
    <script>

        function fn1() {
            let largeObj = new Array(100000)

            setInterval(() => {
                let myObj = largeObj
            }, 1000)
        }

        document.querySelector('button').addEventListener('click', function() {
            fn1()
        })
    </script>
```

这段代码是在点击按钮后执行`fn1`函数，`fn1`函数内创建了一个很大的数组对象`largeObj`，同时创建了一个`setInterval`定时器，定时器的回调函数只是简单的引用了一下变量`largeObj`，我们来看看其整体的内存分配情况吧：

![](https://s.poetries.work/uploads/2022/08/babc2efb74c7ed87.gif)

按道理来说点击按钮执行`fn1`函数后会退出该函数的执行上下文，紧跟着函数体内的局部变量应该被清除，但图中`performance`的录制结果显示似乎是存在内存泄漏问题的，即最终曲线高度比基准线高度要高，那么再用`Memory`来确认一次：

![](https://s.poetries.work/uploads/2022/08/2391b90e30911564.gif)

*   在我们点击按钮后，从动态内存分配的图上看到出现一个蓝色柱形，说明浏览器为变量`largeObj`分配了一段内存，但是之后这段内存并没有被释放掉，说明的确存在内存泄漏的问题，原因其实就是因为`setInterval`的回调函数内对变量`largeObj`有一个引用关系，而定时器一直未被清除，所以变量`largeObj`的内存也自然不会被释放
*   那么我们如何来解决这个问题呢，假设我们只需要让定时器执行三次就可以了，那么我们可以改动一下代码：

```jsx

    <button>开启定时器</button>
    <script>
        function fn1() {
            let largeObj = new Array(100000)
            let index = 0

            let timer = setInterval(() => {
                if(index === 3) clearInterval(timer);
                let myObj = largeObj
                index ++
            }, 1000)
        }

        document.querySelector('button').addEventListener('click', function() {
            fn1()
        })
    </script>
```

现在我们再通过`performance`和`memory`来看看还不会存在内存泄漏的问题

*   `performance`

![](https://s.poetries.work/uploads/2022/08/a55f5e42812ae5a2.gif)

> 这次的录制结果就能看出，最后的曲线高度和初始基准线的高度一样，说明并没有内存泄漏的情况

*   `memory`

![](https://s.poetries.work/uploads/2022/08/3c69cab609414411.gif)

这里做一个解释，图中刚开始出现的蓝色柱形是因为我在录制后刷新了页面，可以忽略；然后我们点击了按钮，看到又出现了一个蓝色柱形，此时就是为`fn1`函数中的变量`largeObj`分配了内存，`3s`后该内存又被释放了，即变成了灰色柱形。所以我们可以得出结论，这段代码不存在内存泄漏的问题

> 简单总结一下： 大家在平时用到了定时器，如果在用不到定时器后一定要清除掉，否则就会出现本例中的情况。除了`setTimeout`和`setInterval`，其实浏览器还提供了一个`API`也可能就存在这样的问题，那就是`requestAnimationFrame`

##  14 垃圾回收机制

*   对于在JavaScript中的字符串，对象，数组是没有固定大小的，只有当对他们进行动态分配存储时，解释器就会分配内存来存储这些数据，当JavaScript的解释器消耗完系统中所有可用的内存时，就会造成系统崩溃。
*   内存泄漏，在某些情况下，不再使用到的变量所占用内存没有及时释放，导致程序运行中，内存越占越大，极端情况下可以导致系统崩溃，服务器宕机。
*   JavaScript有自己的一套垃圾回收机制，JavaScript的解释器可以检测到什么时候程序不再使用这个对象了（数据），就会把它所占用的内存释放掉。
*   针对JavaScript的垃圾回收机制有以下两种方法（常用）：标记清除（现代），引用计数（之前）

**有两种垃圾回收策略：**

*   **标记清除**：标记阶段即为所有活动对象做上标记，清除阶段则把没有标记（也就是非活动对象）销毁。
*   **引用计数**：它把对象是否不再需要简化定义为对象有没有其他对象引用到它。如果没有引用指向该对象（引用计数为 `0`），对象将被垃圾回收机制回收

**标记清除的缺点：**

*   **内存碎片化**，空闲内存块是不连续的，容易出现很多空闲内存块，还可能会出现分配所需内存过大的对象时找不到合适的块。
*   **分配速度慢**，因为即便是使用 First-fit 策略，其操作仍是一个 `O(n)` 的操作，最坏情况是每次都要遍历到最后，同时因为碎片化，大对象的分配效率会更慢。

> 解决以上的缺点可以使用 **标记整理（Mark-Compact）算法** 标记结束后，标记整理算法会将活着的对象（即不需要清理的对象）向内存的一端移动，最后清理掉边界的内存（如下图）

![](https://s.poetries.work/uploads/2022/08/9ab816979f615b6e.png)

**引用计数的缺点：**

*   需要一个计数器，所占内存空间大，因为我们也不知道被引用数量的上限。
*   解决不了循环引用导致的无法回收问题

> V8 的垃圾回收机制也是基于标记清除算法，不过对其做了一些优化。

*   针对新生区采用并行回收。
*   针对老生区采用增量标记与惰性回收

##  15 深浅拷贝

![](https://s.poetries.work/images/20210414142630.png)

**1\. 浅拷贝的原理和实现**

> 自己创建一个新的对象，来接受你要重新复制或引用的对象值。如果对象属性是基本的数据类型，复制的就是基本类型的值给新对象；但如果属性是引用数据类型，复制的就是内存中的地址，如果其中一个对象改变了这个内存中的地址，肯定会影响到另一个对象

**方法一：object.assign**

> `object.assign`是 ES6 中 `object` 的一个方法，该方法可以用于 JS 对象的合并等多个用途，`其中一个用途就是可以进行浅拷贝`。该方法的第一个参数是拷贝的目标对象，后面的参数是拷贝的来源对象（也可以是多个来源）。

```jsx

    object.assign 的语法为：Object.assign(target, ...sources)
```

object.assign 的示例代码如下：

```jsx

    let target = {};
    let source = { a: { b: 1 } };
    Object.assign(target, source);
    console.log(target); // { a: { b: 1 } };
```

**但是使用 object.assign 方法有几点需要注意**

*   它不会拷贝对象的继承属性；
*   它不会拷贝对象的不可枚举的属性；
*   可以拷贝 `Symbol` 类型的属性。

```jsx

    let obj1 = { a:{ b:1 }, sym:Symbol(1)}; 
    Object.defineProperty(obj1, 'innumerable' ,{
        value:'不可枚举属性',
        enumerable:false
    });
    let obj2 = {};
    Object.assign(obj2,obj1)
    obj1.a.b = 2;
    console.log('obj1',obj1);
    console.log('obj2',obj2);
```

![](https://s.poetries.work/images/20210414134752.png)

> 从上面的样例代码中可以看到，利用 `object.assign` 也可以拷贝 `Symbol` 类型的对象，但是如果到了对象的第二层属性 obj1.a.b 这里的时候，前者值的改变也会影响后者的第二层属性的值，说明其中`依旧存在着访问共同堆内存的问题`，也就是说`这种方法还不能进一步复制，而只是完成了浅拷贝的功能`

**方法二：扩展运算符方式**

*   我们也可以利用 JS 的扩展运算符，在构造对象的同时完成浅拷贝的功能。
*   扩展运算符的语法为：`let cloneObj = { ...obj };`

```jsx

    /* 对象的拷贝 */
    let obj = {a:1,b:{c:1}}
    let obj2 = {...obj}
    obj.a = 2
    console.log(obj)  //{a:2,b:{c:1}} console.log(obj2); //{a:1,b:{c:1}}
    obj.b.c = 2
    console.log(obj)  //{a:2,b:{c:2}} console.log(obj2); //{a:1,b:{c:2}}
    /* 数组的拷贝 */
    let arr = [1, 2, 3];
    let newArr = [...arr]; //跟arr.slice()是一样的效果
```

> 扩展运算符 和 `object.assign` 有同样的缺陷，也就是`实现的浅拷贝的功能差不多`，但是如果属性都是`基本类型的值，使用扩展运算符进行浅拷贝会更加方便`

**方法三：concat 拷贝数组**

> 数组的 `concat` 方法其实也是浅拷贝，所以连接一个含有引用类型的数组时，需要注意修改原数组中的元素的属性，因为它会影响拷贝之后连接的数组。不过 `concat` 只能用于数组的浅拷贝，使用场景比较局限。代码如下所示。

```jsx

    let arr = [1, 2, 3];
    let newArr = arr.concat();
    newArr[1] = 100;
    console.log(arr);  // [ 1, 2, 3 ]
    console.log(newArr); // [ 1, 100, 3 ]
```

**方法四：slice 拷贝数组**

> `slice` 方法也比较有局限性，因为`它仅仅针对数组类型`。`slice方法会返回一个新的数组对象`，这一对象由该方法的前两个参数来决定原数组截取的开始和结束时间，是不会影响和改变原始数组的。

```jsx

    slice 的语法为：arr.slice(begin, end);
```

```jsx

    let arr = [1, 2, {val: 4}];
    let newArr = arr.slice();
    newArr[2].val = 1000;
    console.log(arr);  //[ 1, 2, { val: 1000 } ]
```

> 从上面的代码中可以看出，这就是`浅拷贝的限制所在了——它只能拷贝一层对象`。如果`存在对象的嵌套，那么浅拷贝将无能为力`。因此深拷贝就是为了解决这个问题而生的，它能解决多层对象嵌套问题，彻底实现拷贝

**手工实现一个浅拷贝**

根据以上对浅拷贝的理解，如果让你自己实现一个浅拷贝，大致的思路分为两点：

*   对基础类型做一个最基本的一个拷贝；
*   对引用类型开辟一个新的存储，并且拷贝一层对象属性。

```jsx

    const shallowClone = (target) => {
      if (typeof target === 'object' && target !== null) {
        const cloneTarget = Array.isArray(target) ? []: {};
        for (let prop in target) {
          if (target.hasOwnProperty(prop)) {
              cloneTarget[prop] = target[prop];
          }
        }
        return cloneTarget;
      } else {
        return target;
      }
    }
```

> 利用类型判断，针对引用类型的对象进行 for 循环遍历对象属性赋值给目标对象的属性，基本就可以手工实现一个浅拷贝的代码了

**2\. 深拷贝的原理和实现**

`浅拷贝只是创建了一个新的对象，复制了原有对象的基本类型的值，而引用数据类型只拷贝了一层属性，再深层的还是无法进行拷贝`。深拷贝则不同，对于复杂引用数据类型，其在堆内存中完全开辟了一块内存地址，并将原有的对象完全复制过来存放。

这两个对象是相互独立、不受影响的，彻底实现了内存上的分离。总的来说，`深拷贝的原理可以总结如下`：

> 将一个对象从内存中完整地拷贝出来一份给目标对象，并从堆内存中开辟一个全新的空间存放新对象，且新对象的修改并不会改变原对象，二者实现真正的分离。

**方法一：乞丐版（JSON.stringify）**

> `JSON.stringify()` 是目前开发过程中最简单的深拷贝方法，其实就是把一个对象序列化成为 `JSON` 的字符串，并将对象里面的内容转换成字符串，最后再用 `JSON.parse()` 的方法将 `JSON` 字符串生成一个新的对象

```jsx

    let a = {
        age: 1,
        jobs: {
            first: 'FE'
        }
    }
    let b = JSON.parse(JSON.stringify(a))
    a.jobs.first = 'native'
    console.log(b.jobs.first) // FE
```

**但是该方法也是有局限性的**：

*   会忽略 `undefined`
*   会忽略 `symbol`
*   不能序列化函数
*   无法拷贝不可枚举的属性
*   无法拷贝对象的原型链
*   拷贝 `RegExp` 引用类型会变成空对象
*   拷贝 `Date` 引用类型会变成字符串
*   对象中含有 `NaN`、`Infinity` 以及 `-Infinity`，`JSON` 序列化的结果会变成 `null`
*   不能解决循环引用的对象，即对象成环 (`obj[key] = obj`)。

```jsx

    function Obj() { 
      this.func = function () { alert(1) }; 
      this.obj = {a:1};
      this.arr = [1,2,3];
      this.und = undefined; 
      this.reg = /123/; 
      this.date = new Date(0); 
      this.NaN = NaN;
      this.infinity = Infinity;
      this.sym = Symbol(1);
    } 
    let obj1 = new Obj();
    Object.defineProperty(obj1,'innumerable',{ 
      enumerable:false,
      value:'innumerable'
    });
    console.log('obj1',obj1);
    let str = JSON.stringify(obj1);
    let obj2 = JSON.parse(str);
    console.log('obj2',obj2);
```

![](https://s.poetries.work/images/20210414141731.png)

> 使用 `JSON.stringify` 方法实现深拷贝对象，虽然到目前为止还有很多无法实现的功能，但是这种方法足以满足日常的开发需求，并且是最简单和快捷的。而对于其他的也要实现深拷贝的，比较麻烦的属性对应的数据类型，`JSON.stringify` 暂时还是无法满足的，那么就需要下面的几种方法了

**方法二：基础版（手写递归实现）**

> 下面是一个实现 deepClone 函数封装的例子，通过 `for in` 遍历传入参数的属性值，如果值是引用类型则再次递归调用该函数，如果是基础数据类型就直接复制

```jsx

    let obj1 = {
      a:{
        b:1
      }
    }
    function deepClone(obj) { 
      let cloneObj = {}
      for(let key in obj) {                 //遍历
        if(typeof obj[key] ==='object') { 
          cloneObj[key] = deepClone(obj[key])  //是对象就再次调用该函数递归
        } else {
          cloneObj[key] = obj[key]  //基本类型的话直接复制值
        }
      }
      return cloneObj
    }
    let obj2 = deepClone(obj1);
    obj1.a.b = 2;
    console.log(obj2);   //  {a:{b:1}}
```

虽然利用递归能实现一个深拷贝，但是同上面的 `JSON.stringify` 一样，还是有一些问题没有完全解决，例如：

*   这个深拷贝函数并不能复制不可枚举的属性以及 `Symbol` 类型；
*   这种方法`只是针对普通的引用类型的值做递归复制`，而对于 `Array、Date、RegExp、Error、Function` 这样的引用类型并不能正确地拷贝；
*   对象的属性里面成环，即`循环引用没有解决`。

这种基础版本的写法也比较简单，可以应对大部分的应用情况。但是你在面试的过程中，如果只能写出这样的一个有缺陷的深拷贝方法，有可能不会通过。

所以为了“拯救”这些缺陷，下面我带你一起看看改进的版本，以便于你可以在面试种呈现出更好的深拷贝方法，赢得面试官的青睐。

**方法三：改进版（改进后递归实现）**

> 针对上面几个待解决问题，我先通过四点相关的理论告诉你分别应该怎么做。

*   针对能够遍历对象的不可枚举属性以及 `Symbol` 类型，我们可以使用 `Reflect.ownKeys` 方法；
*   当参数为 `Date、RegExp` 类型，则直接生成一个新的实例返回；
*   利用 `Object` 的 `getOwnPropertyDescriptors` 方法可以获得对象的所有属性，以及对应的特性，顺便结合 `Object.create` 方法创建一个新对象，并继承传入原对象的原型链；
*   利用 `WeakMap` 类型作为 `Hash` 表，因为 `WeakMap` 是弱引用类型，可以有效防止内存泄漏（你可以关注一下 `Map` 和 `weakMap` 的关键区别，这里要用 `weakMap`），作为检测循环引用很有帮助，如果存在循环，则引用直接返回 `WeakMap` 存储的值

如果你在考虑到循环引用的问题之后，还能用 `WeakMap` 来很好地解决，并且向面试官解释这样做的目的，那么你所展示的代码，以及你对问题思考的全面性，在面试官眼中应该算是合格的了

**实现深拷贝**

```jsx

    const isComplexDataType = obj => (typeof obj === 'object' || typeof obj === 'function') && (obj !== null)

    const deepClone = function (obj, hash = new WeakMap()) {
      if (obj.constructor === Date) {
        return new Date(obj)       // 日期对象直接返回一个新的日期对象
      }

      if (obj.constructor === RegExp){
        return new RegExp(obj)     //正则对象直接返回一个新的正则对象
      }

      //如果循环引用了就用 weakMap 来解决
      if (hash.has(obj)) {
        return hash.get(obj)
      }
      let allDesc = Object.getOwnPropertyDescriptors(obj)

      //遍历传入参数所有键的特性
      let cloneObj = Object.create(Object.getPrototypeOf(obj), allDesc)

      // 把cloneObj原型复制到obj上
      hash.set(obj, cloneObj)

      for (let key of Reflect.ownKeys(obj)) { 
        cloneObj[key] = (isComplexDataType(obj[key]) && typeof obj[key] !== 'function') ? deepClone(obj[key], hash) : obj[key]
      }
      return cloneObj
    }
```

```jsx

    // 下面是验证代码
    let obj = {
      num: 0,
      str: '',
      boolean: true,
      unf: undefined,
      nul: null,
      obj: { name: '我是一个对象', id: 1 },
      arr: [0, 1, 2],
      func: function () { console.log('我是一个函数') },
      date: new Date(0),
      reg: new RegExp('/我是一个正则/ig'),
      [Symbol('1')]: 1,
    };
    Object.defineProperty(obj, 'innumerable', {
      enumerable: false, value: '不可枚举属性' }
    );
    obj = Object.create(obj, Object.getOwnPropertyDescriptors(obj))
    obj.loop = obj    // 设置loop成循环引用的属性
    let cloneObj = deepClone(obj)
    cloneObj.arr.push(4)
    console.log('obj', obj)
    console.log('cloneObj', cloneObj)
```

我们看一下结果，`cloneObj` 在 `obj` 的基础上进行了一次深拷贝，`cloneObj` 里的 `arr` 数组进行了修改，并未影响到 `obj.arr` 的变化，如下图所示

![](https://s.poetries.work/uploads/2022/08/f636f4c6e3cfbd36.png)

##  16 对象的几种创建方式

###  16.1 工厂模式,创建方式

```jsx

    function createPerson(name,age,job){
        var o = new Object();
        o.name=name;
        o.age=age;
        o.job=job;
        o.sayName = function(){
            alert(this.name);
        }
    }
    var person1 = createPerson("da",1,"it");
    var person2 = createPerson("dada",2,"it");
```

###  16.2 构造函数模式

```jsx

    function Person(name,age,ob){
        this.name=name;
        this.age=age;
        this.job=job;
        this.sayName = function(){
            alert(this.name);
        }
    var person1 = new Person("dada",1,"web");
    var person2 = new Person("dada",2,"web");
    }
```

###  16.3 使用原型模式

```jsx

    function Person(){
    }
    Person.prototype.name = "da";
    Person.prototype.age = 1;
    Person.prototype.job = "web";
    Person.prototype.sayName = function(){
        alert(this.name);
    }

    var person1 = new Person();
    person1.sayName();    //"dada"

    var person2 = new Person();
    person2.sayName();    //"dada"

    alert(person1.sayName == person2.sayName);   //true
```

###  16.4 组合使用构造函数模式和原型模式

```jsx

    function Person(name,age){
        this.name = name;
        this.age = age;
        this.friends = ["da","dada"];
    }
    Person.prototype = {
        constructor:Person,
        sayName:function(){
            alert(this.name);
        }
    }
    var person1 = new Person("da1",1);
    var person2 = new Person("da2",2);
    person1.friends.push("dadada");
    console.log(person1.friends);    //["da","dada","dadada"]
    console.log(person2.friends);    //["da","dada"]
    console.log(person1.friends === person2.friends);    //false
    console.log(person1.sayName === person2.sayName);   //true
```

###  16.5 动态原型模式

```jsx

    function Person(name,age,job){
        this.name=name;
        this.age=age;
        this.job=job;

        if(typeof this.sayName!="function"){
            Person.prototype.sayName=function(){
                alert(this.name);
            };
        }
    }
```

##  17 数组相关

###  17.1 数组常用方法

*   `map`: 遍历数组，返回回调返回值组成的新数组
*   `forEach`: 无法`break`，可以用`try/catch`中`throw new Error`来停止
*   `filter`: 过滤
*   `some`: 有一项返回`true`，则整体为`true`
*   `every`: 有一项返回`false`，则整体为`false`
*   `join`: 通过指定连接符生成字符串
*   `push / pop`: 末尾推入和弹出，改变原数组， 返回推入/弹出项
*   `unshift / shift`: 头部推入和弹出，改变原数组，返回操作项
*   `sort(fn) / reverse`: 排序与反转，改变原数组
*   `concat`: 连接数组，不影响原数组， 浅拷贝
*   `slice(start, end)`: 返回截断后的新数组，不改变原数组
*   `splice(start, number, value...)`: 返回删除元素组成的数组，`value`为插入项，改变原数组
*   `indexOf / lastIndexOf(value, fromIndex)`: 查找数组项，返回对应的下标
*   `reduce / reduceRight(fn(prev, cur)`， `defaultPrev)`: 两两执行，`prev` 为上次化简函数的`return`值，`cur`为当前值(从第二项开始)

**数组乱序：**

```jsx

    var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    arr.sort(function () {
        return Math.random() - 0.5;
    });
```

**数组拆解: flat: [1,[2,3]] --> [1, 2, 3]**

```jsx

    Array.prototype.flat = function() {
        this.toString().split(',').map(item => +item )
    }
```

### 的区别？

```jsx

    console.log(Array(3)) // [empty x 3]
    console.log(Array(3, 4)) // [3, 4]
```

###  17.3 请创建一个长度为100，值都为1的数组

```jsx

    new Array(100).fill(1)
```

###  17.4 请创建一个长度为100，值为对应下标的数组

```jsx

    // cool的写法：
    [...Array(100).keys()]

    // 其他方法：
    Array(100).join(",").split(",").map((v, i) => i)
    Array(100).fill().map((v, i) => i)
```

###  17.5 如何转化类数组成数组

> 因为`arguments`本身并不能调用数组方法，它是一个另外一种对象类型，只不过属性从`0`开始排，依次为`0，1，2...`最后还有`callee`和`length`属性。我们也把这样的对象称为类数组

**常见的类数组还有：**

*   用`getElementsByTagName/ClassName()`获得的`HTMLCollection`
*   用`querySelector`获得的`nodeList`

> 那这导致很多数组的方法就不能用了，必要时需要我们将它们转换成数组，有哪些方法呢？

**1\. Array.prototype.slice.call()**

```jsx

    function sum(a, b) {
      let args = Array.prototype.slice.call(arguments);
      console.log(args.reduce((sum, cur) => sum + cur));//args可以调用数组原生的方法啦
    }
    sum(1, 2);//3
```

**2\. Array.from()**

```jsx

    function sum(a, b) {
      let args = Array.from(arguments);
      console.log(args.reduce((sum, cur) => sum + cur));//args可以调用数组原生的方法啦
    }
    sum(1, 2);//3
```

这种方法也可以用来转换`Set`和`Map`哦！

**3\. ES6展开运算符**

```jsx

    function sum(a, b) {
      let args = [...arguments];
      console.log(args.reduce((sum, cur) => sum + cur));//args可以调用数组原生的方法啦
    }
    sum(1, 2);//3
```

**4\. 利用concat+apply**

```jsx

    function sum(a, b) {
      let args = Array.prototype.concat.apply([], arguments);//apply方法会把第二个参数展开
      console.log(args.reduce((sum, cur) => sum + cur));//args可以调用数组原生的方法啦
    }
    sum(1, 2);//3
```

###  17.6 forEach中return有效果吗？如何中断forEach循环？

> 在`forEach`中用`return`不会返回，函数会继续执行。

```jsx

    let nums = [1, 2, 3];
    nums.forEach((item, index) => {
      return;//无效
    })
```

**中断方法：**

*   使用`try`监视代码块，在需要中断的地方抛出异常。
*   官方推荐方法（替换方法）：用`every`和`some`替代`forEach`函数。`every`在碰到`return false`的时候，中止循环。`some`在碰到`return true`的时候，中止循环

###  17.7 JS判断数组中是否包含某个值

**方法一：array.indexOf**

> 此方法判断数组中是否存在某个值，如果存在，则返回数组元素的下标，否则返回`-1`。

```jsx

    var arr=[1,2,3,4];
    var index=arr.indexOf(3);
    console.log(index);
```

**方法二：array.includes(searcElement[,fromIndex])**

> 此方法判断数组中是否存在某个值，如果存在返回`true`，否则返回`false`

```jsx

    var arr=[1,2,3,4];
    if(arr.includes(3))
      console.log("存在");
    else
      console.log("不存在");
```

**方法三：array.find(callback[,thisArg])**

返回数组中满足条件的第一个元素的值，如果没有，返回`undefined`

```jsx

    var arr=[1,2,3,4];
    var result = arr.find(item =>{
        return item > 3
    });
    console.log(result);
```

**方法四：array.findeIndex(callback[,thisArg])**

> 返回数组中满足条件的第一个元素的下标，如果没有找到，返回`-1`

```jsx

    var arr=[1,2,3,4];
    var result = arr.findIndex(item =>{
        return item > 3
    });
    console.log(result);
```

###  17.8 JS中flat---数组扁平化

> 对于前端项目开发过程中，偶尔会出现层叠数据结构的数组，我们需要将多层级数组转化为一级数组（即提取嵌套数组元素最终合并为一个数组），使其内容合并且展开。那么该如何去实现呢？

需求:多维数组=>一维数组

```jsx

    let ary = [1, [2, [3, [4, 5]]], 6];// -> [1, 2, 3, 4, 5, 6]
    let str = JSON.stringify(ary);
```

**1\. 调用ES6中的flat方法**

```jsx

    ary = ary.flat(Infinity);
```

**2\. replace + split**

```jsx

    ary = str.replace(/(\[|\])/g, '').split(',')
```

**3\. replace + JSON.parse**

```jsx

    str = str.replace(/(\[|\])/g, '');
    str = '[' + str + ']';
    ary = JSON.parse(str);
```

**4\. 普通递归**

```jsx

    let result = [];
    let fn = function(ary) {
      for(let i = 0; i < ary.length; i++) {
        let item = ary[i];
        if (Array.isArray(ary[i])){
          fn(item);
        } else {
          result.push(item);
        }
      }
    }
```

**5\. 利用reduce函数迭代**

```jsx

    function flatten(ary) {
        return ary.reduce((pre, cur) => {
            return pre.concat(Array.isArray(cur) ? flatten(cur) : cur);
        }, []);
    }
    let ary = [1, 2, [3, 4], [5, [6, 7]]]
    console.log(flatten(ary))
```

**6\. 扩展运算符**

```jsx

    //只要有一个元素有数组，那么循环继续
    while (ary.some(Array.isArray)) {
      ary = [].concat(...ary);
    }
```

##  18 操作DOM

###  18.1 说说有几种类型的DOM节点

*   `Document`节点，整个文档是一个文档节点；
*   `Element`节点，每个HTML标签是一个元素节点；
*   `Attribute`节点，每一个HTML属性是一个属性节点；
*   `Text`节点，包含在HTML元素中的文本是文本节点

###  18.2 操作DOM节点方法

**创建新节点**

```jsx

    createDocumentFragment()    //创建一个DOM片段
    createElement()   //创建一个具体的元素
    createTextNode()   //创建一个文本节点
```

**添加、移除、替换、插入**

```jsx

    appendChild()      //添加
    removeChild()      //移除
    replaceChild()      //替换
    insertBefore()      //插入
```

**查找**

```jsx

    getElementsByTagName()    //通过标签名称
    getElementsByName()     //通过元素的Name属性的值
    getElementById()        //通过元素Id，唯一性
```

##  19 Ajax总结

*   `Ajax`的原理简单来说是在用户和服务器之间加了—个中间层(`AJAX`引擎)，通过`XmlHttpRequest`对象来向服务器发异步请求，从服务器获得数据，然后用`javascript`来操作DOM而更新页面。使用户操作与服务器响应异步化。这其中最关键的一步就是从服务器获得请求数据
*   `Ajax`的过程只涉及`JavaScript`、`XMLHttpRequest`和`DOM`。`XMLHttpRequest`是`ajax`的核心机制

###  19.1 Ajax 有那些优缺点

**优点：**

*   通过异步模式，提升了用户体验.
*   优化了浏览器和服务器之间的传输，减少不必要的数据往返，减少了带宽占用.
*   `Ajax`在客户端运行，承担了一部分本来由服务器承担的工作，减少了大用户量下的服务器负载。
*   `Ajax`可以实现动态不刷新（局部刷新）

**缺点：**

*   安全问题 `AJAX`暴露了与服务器交互的细节。
*   对搜索引擎的支持比较弱。
*   不容易调试。

###  19.2 关于http,XMLHttpRequest,Ajax的关系

*   `http`是浏览器和web服务器交换数据的协议,规范
*   `XMLHttpRequest`是一个`JS`对象，是浏览器实现的一组`api`函数，使用这些函数，浏览器再通过`http`协议请求和发送数据。
*   `Ajax`是一种技术方案，但并不是一种新技术，它最核心的就是依赖浏览器提供的`XMLHttpRequest`对象。用一句话来概括就是`我们使用XMLHttpRequest对象来发送一个Ajax请求`。

###  19.3 XMLHttpRequest的发展历程是怎样的？

它最开始只是微软浏览器提供的一个接口，后来各大浏览器纷纷效仿也提供了这个接口，再后来W3C对它进行了标准化，提出了`XMLHttpRequest`标准。标准又分为`Level 1`和`Level 2`。

`Level 2`相对于`Level 1`做了很大的改进，具体来说是：

*   可以设置`HTTP`请求的超时时间。
*   可以使用`FormData`对象管理表单数据。
*   可以上传文件。
*   可以请求不同域名下的数据（跨域请求）。
*   可以获取服务器端的二进制数据。
*   可以获得数据传输的进度信息。

###  19.4 使用XMLHttpRequest封装一个get和post请求

**get请求**：

核心就四步：

1.  `var xhr = new XMLHttpRequest()`
2.  `xhr.open('GET', 'http://www.example.com/api/getname', true)`
3.  `xhr.onreadystatechange = function () {}`
4.  `xhr.send()`

让我们来封装一个简易版的：

```jsx

    /*
    * xhr的get请求
    * @param url: 请求地址
    * @param params: 请求参数
    * @param onSuccess: 成功回调函数
    * @param onError: 失败回调函数
    */
    function xhrGet (url, params = {}, onSuccess, onError) {
      // 兼容IE6
      var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
      let paramString = formatParams(params);
      // xhr.open的第三个参数isAsync：是否异步 
      xhr.open('GET', `${url}${paramString}`, true);
      xhr.onreadystatechange = function () {
        // console.log(e);
        console.log(this);
        if (this.readyState === 4) {
          if (this.status >= 200 && this.status < 300) {
            onSuccess(this.response);
          } else {
            onError(this.response)
          }
        }
      }
      xhr.send();
    }
    // 处理参数：如将{name: 'lindaidai'}转为'?name=lindaidai'
    function formatParams (params) {
      var paramString = Object.keys(params).map(key => {
        return `${key}=${encodeURIComponent(params[key])}`
      }).join('&');
      return paramString ? `?${paramString}` : ''
    }
```

（当然上面的兼容`IE6`估计现在考的不多了，而且我这种写法其实也没啥用，因为如果真是在`IE6`下的话，后面的`Object.keys()`等方法也用不了了）

需要注意的是两种状态，一个是`readyState`，一个是`status`。

> `readyState`请求状态：

*   `0`（未初始化）：还没有调用 `open()` 方法。
*   `1`（载入）：已调用 `send()` 方法，正在发送请求。
*   `2`（载入完成）：`send()` 方法完成，已收到全部响应内容。
*   `3`（解析）：正在解析响应内容。
*   `4`（完成）：响应内容解析完成，可以在客户端调用。

> `status`结果状态码：

*   `0` ：如果状态是 `UNSENT` 或 `OPENED`；或者如果错误标签被设置(例如跨域时)
*   `200` 成功
*   其它`HTTP`状态码

**post请求：**

```jsx

    function xhrPost (url, params, onSuccess, onError) {
      var xhr = new XMLHttpRequest();
      xhr.open('POST', url, true);
      // ajax的默认请求ContentType:text/plain(纯文本)
      xhr.setRequestHeader("Content-Type", "application-x-www-form-urlencode");
      xhr.onreadystatechange = function () {
        if (this.readyState === 4) {
          if (this.status >= 200 && this.status < 300) {
            onSuccess(this.response);
          } else {
            onError(this.response);
          }
        }
      }
      xhr.send(params);
    }
```

##  20 定时器

###  20.1 setInterval存在哪些问题？

> `JavaScript`中使用 `setInterval` 开启轮询。定时器代码可能在代码再次被添加到队列之前还没有完成执行，结果导致定时器代码连续运行好几次，而之间没有任何停顿。而javascript引擎对这个问题的解决是：当使用`setInterval()`时，仅当没有该定时器的任何其他代码实例时，才将定时器代码添加到队列中。这确保了定时器代码加入到队列中的最小时间间隔为指定间隔。

但是，这样会导致两个问题：

*   某些间隔被跳过；
*   多个定时器的代码执行之间的间隔可能比预期的小

###  20.2 链式调用setTimeout对比setInterval

`setInterval`本身是会存在一些问题的。而使用链式调用`setTimeout`这种方式会比它好一些：

```jsx

    setTimeout(function fn(){
        console.log('我是setTimeout');
        setTimeout(fn, 1000);
    },1000);
```

这个模式链式调用了`setTimeout()`，每次函数执行的时候都会创建一个新的定时器。第二个`setTimeout()`调用当前执行的函数，并为其设置另外一个定时器。这样做的好处是：

*   在前一个定时器代码执行完之前，不会向队列插入新的定时器代码，确保不会有任何缺失的间隔。
*   而且，它可以保证在下一次定时器代码执行之前，至少要等待指定的间隔，避免了连续的运行。

###  20.3 实现比 setTimeout 快 80 倍的定时器

> 在浏览器中，`setTimeout()/setInterval()` 的每调用一次定时器的最小间隔是 `4ms`，这通常是由于函数嵌套导致（嵌套层级达到一定深度）

简单来说，`5` 层以上的定时器嵌套会导致至少 `4ms` 的延迟。

用如下代码做个测试：

```jsx

    let a = performance.now();
    setTimeout(() => {
      let b = performance.now();
      console.log(b - a);
      setTimeout(() => {
        let c = performance.now();
        console.log(c - b);
        setTimeout(() => {
          let d = performance.now();
          console.log(d - c);
          setTimeout(() => {
            let e = performance.now();
            console.log(e - d);
            setTimeout(() => {
              let f = performance.now();
              console.log(f - e);
              setTimeout(() => {
                let g = performance.now();
                console.log(g - f);
              }, 0);
            }, 0);
          }, 0);
        }, 0);
      }, 0);
    }, 0);
```

> 在浏览器中的打印结果大概是这样的，和规范一致，第五次执行的时候延迟来到了 `4ms` 以上

```jsx

    // 结果是
    1.2999999970197678
    1.5
    1.2999999970197678
    1.9000000059604645
    4.5
    4.5999999940395355
```

> 如果想在浏览器中实现 `0ms` 延时的定时器，可以用 `window.postMessage` 来实现真正 `0` 延迟的定时器

```jsx

    (function () {
      var timeouts = [];
      var messageName = 'zero-timeout-message';

      // 保持 setTimeout 的形态，只接受单个函数的参数，延迟始终为 0。
      function setZeroTimeout(fn) {
        timeouts.push(fn);
        window.postMessage(messageName, '*');
      }

      function handleMessage(event) {
        if (event.source == window && event.data == messageName) {
          event.stopPropagation();
          if (timeouts.length > 0) {
            var fn = timeouts.shift();
            fn();
          }
        }
      }

      window.addEventListener('message', handleMessage, true);

      // 把 API 添加到 window 对象上
      window.setZeroTimeout = setZeroTimeout;
    })();
```

由于 `postMessage` 的回调函数的执行时机和 `setTimeout` 类似，都属于宏任务，所以可以简单利用 `postMessage` 和 `addEventListener('message')` 的消息通知组合，来实现模拟定时器的功能。

这样，执行时机类似，但是延迟更小的定时器就完成了。

再利用下面的嵌套定时器的例子来跑一下测试：

```jsx

    var a = performance.now();
    setZeroTimeout(() => {
      let b = performance.now();
      console.log(b - a);
      setZeroTimeout(() => {
        let c = performance.now();
        console.log(c - b);
        setZeroTimeout(() => {
          let d = performance.now();
          console.log(d - c);
          setZeroTimeout(() => {
            let e = performance.now();
            console.log(e - d);
            setZeroTimeout(() => {
              let f = performance.now();
              console.log(f - e);
              setZeroTimeout(() => {
                let g = performance.now();
                console.log(g - f);
              }, 0);
            }, 0);
          }, 0);
        }, 0);
      }, 0);
    }, 0);
```

```jsx

    // 结果
    0.30000000447034836
    0.19999999552965164
    0.10000000149011612
    0.10000000149011612
    0.10000000149011612
    0.10000000149011612
```

全部在 `0.1 ~ 0.3` 毫秒级别，而且不会随着嵌套层数的增多而增加延迟

**有什么场景需要无延迟的定时器？其实在 React 的源码中，做时间切片的部分就用到了**

```jsx

    // 伪代码

    const channel = new MessageChannel();
    const port = channel.port2;

    // 每次 port.postMessage() 调用就会添加一个宏任务
    // 该宏任务为调用 scheduler.scheduleTask 方法
    channel.port1.onmessage = scheduler.scheduleTask;

    const scheduler = {
      scheduleTask() {
        // 挑选一个任务并执行
        const task = pickTask();
        const continuousTask = task();

        // 如果当前任务未完成，则在下个宏任务继续执行
        if (continuousTask) {
          port.postMessage(null);
        }
      },
    };
```

> React 把任务切分成很多片段，这样就可以通过把任务交给 `postMessage` 的回调函数，来让浏览器主线程拿回控制权，进行一些更优先的渲染任务（比如用户输入）

为什么不用执行时机更靠前的微任务呢？关键的原因在于微任务会在渲染之前执行，这样就算浏览器有紧急的渲染任务，也得等微任务执行完才能渲染

###  22.4 说一下requestAnimationFrame

**简介：**

显示器都有自己固有的刷新频率(`60HZ`或者`75HZ`)，也就是说每秒最多重绘`60`次或者`75`次。而`requestAnimationFrame`的基本思想就是与这个刷新频率保持同步，利用这个刷新频率进行重绘。

**特点：**

*   使用这个`API`时，一旦页面不处于浏览器的当前标签，就会自动停止刷新，这样就节省了`CPU`、`GPU`、电力。
*   由于它时在主线程上完成的，所以若是主线程非常忙时它的动画也会收到影响
*   它使用一个回调函数作为参数，这个回调函数会在浏览器重绘之前调用。

**使用：**

正常使用：

```jsx

    const requestID = window.requestAnimationFrame(callback);
```

兼容版本：

```jsx

    // 给 window 下挂载一个兼容版本的 requestAniFrame
    window.requestAniFrame = (function () {
      return  window.requestAnimationFrame || 
        window.webkitRequestAnimationFrame || 
        window.mozRequestAnimationFrame    || 
        window.oRequestAnimationFrame      || 
        window.msRequestAnimationFrame     || 
        function( callback ){
          window.setTimeout(callback, 1000 / 60);
        };
    })();
```

###  22.5 requestAnimationFrame对比setTimeout

*   **屏幕刷新频率** 屏幕每秒出现图像的次数。普通笔记本为`60Hz`
*   **动画原理** 计算机每`16.7ms`刷新一次，由于人眼的视觉停留，所以看起来是流畅的移动。
*   **setTimeout** 通过设定间隔时间来不断改变图像位置，达到动画效果。但是容易出现卡顿抖动的现象；原因是：

1.  `settimeout` 任务被放入异步队列，只有当主线程任务执行完后才会执行队列中的任务，因此实际执行时间总是比设定时间要晚；
2.  `settimeout` 的固定时间间隔不一定与屏幕刷新时间相同，会引起丢帧。

> **requestAnimationFrame** 优势：由系统决定回调函数的执行时机。60Hz的刷新频率，那么每次刷新的间隔中会执行一次回调函数，不会引起丢帧，不会卡顿。且由于一旦页面不处于浏览器的当前标签，就会自动停止刷新，这样就节省了CPU、GPU、电力。

##  21 谈谈你对for in/for of的理解

> `for in`性能很差，迭代当前对象中可枚举的属性，并且一直查找到原型上去。

*   问题1：遍历顺序数字优先
*   问题2：无法遍历`symbol`属性
*   问题3：可以遍历到原型属性中可枚举的

```jsx

    let obj = {
      name: 'poetry',
      age: 22,
      [Symbol('aa')]: 100,
      0: 200,
      1: 300
    }
```

![](https://s.poetries.work/images/20210320102041.png) ![](https://s.poetries.work/images/20210320103701.png)

```jsx

    for(let key in obj) {
      // 不遍历原型上的属性
      if(!obj.hasOwnProperty(key)) {
        break;
      }
    }
```

**遍历obj的私有属性拼接**

```jsx

    let keys = Object.keys(obj)
    keys = keys.concat(Object.getOwnPropertySymbols(obj1))
    keys.forEach(v=>{
      console.log(v)
    })
```

**for of**

*   部分数据结构实现了迭代器规范
    *   `Symbol.itertor`
    *   `数组/set/map`
    *   对象没有实现，`for of`不能遍历对象

```jsx

    // 数组具备迭代器规范，模拟实现
    var arr = [1,2,3,4,5]

    arr[Symbol.iterator] = function() {
      let self = this, index = 0;

      return {
        next() {
          if(index > self.length - 1) {
            return {
              done: true,
              value: undefined
            }
          }
          return {
            done: false,
            value: self[index++]
          }
        }
      }
    }
```

```jsx

    // 使对象具备可迭代特性
    let obj = {
      0: 100,
      1: 200,
      length: 2
    }

    obj[Symbol.iterator] = Array.prototype[Symbol.iterator]

    for(var val of obj) {
      console.log(val)
    }
```

##  22 JavaScript 实现对上传图片的压缩？

> 答：读取用户上传的 File 对象，读写到画布（canvas）上，利用 Canvas 的 API 进行压缩，完成压缩之后再转成 `File（Blob）` 对象，上传到远程图片服务器；不过有时候我们也需要将一个 `base64` 字符串压缩之后再变为 `base64` 字符串传入到远程数据库或者再转成 `File（Blob）` 对象。

思路就是 `File + Canvas` 的 `drawImage`
```