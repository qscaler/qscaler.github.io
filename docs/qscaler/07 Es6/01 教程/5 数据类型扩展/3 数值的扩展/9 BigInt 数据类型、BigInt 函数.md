### 9 BigInt 数据类型+BigInt 函数

1.  BigInt 数据类型
    简介
    JavaScript 所有数字都保存成 64 位浮点数，这给数值的表示带来了两大限制。一是数值的精度只能到 53 个二进制位（相当于 16 个十进制位），大于这个范围的整数，JavaScript 是无法精确表示，这使得 JavaScript 不适合进行科学和金融方面的精确计算。二是大于或等于2的1024次方的数值，JavaScript 无法表示，会返回Infinity。
    ```js
    // 超过 53 个二进制位的数值，无法保持精度
    Math.pow(2, 53) === Math.pow(2, 53) + 1 // true

    // 超过 2 的 1024 次方的数值，无法表示
    Math.pow(2, 1024) // Infinity
    ES2020 引入了一种新的数据类型 BigInt（大整数），来解决这个问题，这是 ECMAScript 的第八种数据类型。BigInt 只用来表示整数，没有位数的限制，任何位数的整数都可以精确表示。

    const a = 2172141653n;
    const b = 15346349309n;

    // BigInt 可以保持精度
    a * b // 33334444555566667777n

    // 普通整数无法保持精度
    Number(a) * Number(b) // 33334444555566670000
    为了与 Number 类型区别，BigInt 类型的数据必须添加后缀n。

    1234 // 普通整数
    1234n // BigInt

    // BigInt 的运算
    1n + 2n // 3n
    BigInt 同样可以使用各种进制表示，都要加上后缀n。

    0b1101n // 二进制
    0o777n // 八进制
    0xFFn // 十六进制
    BigInt 与普通整数是两种值，它们之间并不相等。

    42n === 42 // false
    typeof运算符对于 BigInt 类型的数据返回bigint。

    typeof 123n // 'bigint'
    BigInt 可以使用负号（-），但是不能使用正号（+），因为会与 asm.js 冲突。

    -42n // 正确
    +42n // 报错
    JavaScript 以前不能计算70的阶乘（即70!），因为超出了可以表示的精度。

    let p = 1;
    for (let i = 1; i <= 70; i++) {
    p *= i;
    }
    console.log(p); // 1.197857166996989e+100
    现在支持大整数了，就可以算了，浏览器的开发者工具运行下面代码，就OK。

    let p = 1n;
    for (let i = 1n; i <= 70n; i++) {
    p *= i;
    }
    console.log(p); // 11978571...00000000n
    ```

2. BigInt 函数

    ```js
    JavaScript 原生提供BigInt函数，可以用它生成 BigInt 类型的数值。转换规则基本与Number()一致，将其他类型的值转为 BigInt。

    BigInt(123) // 123n
    BigInt('123') // 123n
    BigInt(false) // 0n
    BigInt(true) // 1n
    BigInt()函数必须有参数，而且参数必须可以正常转为数值，下面的用法都会报错。

    new BigInt() // TypeError
    BigInt(undefined) //TypeError
    BigInt(null) // TypeError
    BigInt('123n') // SyntaxError
    BigInt('abc') // SyntaxError
    上面代码中，尤其值得注意字符串123n无法解析成 Number 类型，所以会报错。

    参数如果是小数，也会报错。

    BigInt(1.5) // RangeError
    BigInt('1.5') // SyntaxError
    BigInt 继承了 Object 对象的两个实例方法。

    BigInt.prototype.toString()
    BigInt.prototype.valueOf()
    它还继承了 Number 对象的一个实例方法。

    BigInt.prototype.toLocaleString()
    此外，还提供了三个静态方法。

    BigInt.asUintN(width, BigInt)： 给定的 BigInt 转为 0 到 2width - 1 之间对应的值。
    BigInt.asIntN(width, BigInt)：给定的 BigInt 转为 -2width - 1 到 2width - 1 - 1 之间对应的值。
    BigInt.parseInt(string[, radix])：近似于Number.parseInt()，将一个字符串转换成指定进制的 BigInt。
    const max = 2n ** (64n - 1n) - 1n;

    BigInt.asIntN(64, max)
    // 9223372036854775807n
    BigInt.asIntN(64, max + 1n)
    // -9223372036854775808n
    BigInt.asUintN(64, max + 1n)
    // 9223372036854775808n
    上面代码中，max是64位带符号的 BigInt 所能表示的最大值。如果对这个值加1n，BigInt.asIntN()将会返回一个负值，因为这时新增的一位将被解释为符号位。而BigInt.asUintN()方法由于不存在符号位，所以可以正确返回结果。

    如果BigInt.asIntN()和BigInt.asUintN()指定的位数，小于数值本身的位数，那么头部的位将被舍弃。

    const max = 2n ** (64n - 1n) - 1n;

    BigInt.asIntN(32, max) // -1n
    BigInt.asUintN(32, max) // 4294967295n
    上面代码中，max是一个64位的 BigInt，如果转为32位，前面的32位都会被舍弃。

    下面是BigInt.parseInt()的例子。

    // Number.parseInt() 与 BigInt.parseInt() 的对比
    Number.parseInt('9007199254740993', 10)
    // 9007199254740992
    BigInt.parseInt('9007199254740993', 10)
    // 9007199254740993n
    上面代码中，由于有效数字超出了最大限度，Number.parseInt方法返回的结果是不精确的，而BigInt.parseInt方法正确返回了对应的 BigInt。

    对于二进制数组，BigInt 新增了两个类型BigUint64Array和BigInt64Array，这两种数据类型返回的都是64位 BigInt。DataView对象的实例方法DataView.prototype.getBigInt64()和DataView.prototype.getBigUint64()，返回的也是 BigInt。
    ```


3. 转换规则
    ```js
    可以使用Boolean()、Number()和String()这三个方法，将 BigInt 可以转为布尔值、数值和字符串类型。

    Boolean(0n) // false
    Boolean(1n) // true
    Number(1n)  // 1
    String(1n)  // "1"
    上面代码中，注意最后一个例子，转为字符串时后缀n会消失。

    另外，取反运算符（!）也可以将 BigInt 转为布尔值。

    !0n // true
    !1n // false
    ```

4.  数学运算
    数学运算方面，BigInt 类型的+、-、*和**这四个二元运算符，与 Number 类型的行为一致。除法运算/会舍去小数部分，返回一个整数。
    ```js
    9n / 5n
    // 1n
    几乎所有的数值运算符都可以用在 BigInt，但是有两个例外。

    不带符号的右移位运算符>>>
    一元的求正运算符+
    上面两个运算符用在 BigInt 会报错。前者是因为>>>运算符是不带符号的，但是 BigInt 总是带有符号的，导致该运算无意义，完全等同于右移运算符>>。后者是因为一元运算符+在 asm.js 里面总是返回 Number 类型，为了不破坏 asm.js 就规定+1n会报错。

    BigInt 不能与普通数值进行混合运算。

    1n + 1.3 // 报错
    上面代码报错是因为无论返回的是 BigInt 或 Number，都会导致丢失精度信息。比如(2n**53n + 1n) + 0.5这个表达式，如果返回 BigInt 类型，0.5这个小数部分会丢失；如果返回 Number 类型，有效精度只能保持 53 位，导致精度下降。

    同样的原因，如果一个标准库函数的参数预期是 Number 类型，但是得到的是一个 BigInt，就会报错。

    // 错误的写法
    Math.sqrt(4n) // 报错

    // 正确的写法
    Math.sqrt(Number(4n)) // 2
    上面代码中，Math.sqrt的参数预期是 Number 类型，如果是 BigInt 就会报错，必须先用Number方法转一下类型，才能进行计算。

    asm.js 里面，|0跟在一个数值的后面会返回一个32位整数。根据不能与 Number 类型混合运算的规则，BigInt 如果与|0进行运算会报错。

    1n | 0 // 报错
    ```
5.  其他运算
    ```js
    BigInt 对应的布尔值，与 Number 类型一致，即0n会转为false，其他值转为true。

    if (0n) {
        console.log('if');
    } else {
        console.log('else');
    }
    // else
    上面代码中，0n对应false，所以会进入else子句。

    比较运算符（比如>）和相等运算符（==）允许 BigInt 与其他类型的值混合计算，因为这样做不会损失精度。

    0n < 1 // true
    0n < true // true
    0n == 0 // true
    0n == false // true
    0n === 0 // false
    BigInt 与字符串混合运算时，会先转为字符串，再进行运算。

    '' + 123n // "123"
    ```