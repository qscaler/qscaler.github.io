<!--
 * @Author              : qxp
 * @Date                : 2021-03-22 15:02:03
 * @LastEditors         : Please set LastEditors
 * @LastEditTime        : 2021-03-22 15:05:29
 * @FilePath            : \new\6 Es6\5 扩展\2 数值的扩展.html
-->

### 7 安全整数和 Number.isSafeInteger() 

1.  **JavaScript 能够准确表示的整数范围在-2^53到2^53之间（不含两个端点），超过这个范围，无法精确表示这个值**。
    
    ```js
    Math.pow(2, 53) // 9007199254740992

    9007199254740992  // 9007199254740992
    9007199254740993  // 9007199254740992

    Math.pow(2, 53) === Math.pow(2, 53) + 1
    // true
    ```
    上面代码中，超出 2 的 53 次方之后，一个数就不精确了。

2.  ES6 引入了**Number.MAX_SAFE_INTEGER**和**Number.MIN_SAFE_INTEGER**这两个常量，用来表示这个范围的上下限。
    ```js
    Number.MAX_SAFE_INTEGER === Math.pow(2, 53) - 1
    // true
    Number.MAX_SAFE_INTEGER === 9007199254740991
    // true

    Number.MIN_SAFE_INTEGER === -Number.MAX_SAFE_INTEGER
    // true
    Number.MIN_SAFE_INTEGER === -9007199254740991
    ```
    // true
    **上面代码中，可以看到 JavaScript 能够精确表示的极限**。
    
3.  Number.isSafeInteger()则是用来判断一个整数是否落在这个范围之内。

    ```js
    Number.isSafeInteger('a') // false
    Number.isSafeInteger(null) // false
    Number.isSafeInteger(NaN) // false
    Number.isSafeInteger(Infinity) // false
    Number.isSafeInteger(-Infinity) // false

    Number.isSafeInteger(3) // true
    Number.isSafeInteger(1.2) // false
    Number.isSafeInteger(9007199254740990) // true
    Number.isSafeInteger(9007199254740992) // false

    Number.isSafeInteger(Number.MIN_SAFE_INTEGER - 1) // false
    Number.isSafeInteger(Number.MIN_SAFE_INTEGER) // true
    Number.isSafeInteger(Number.MAX_SAFE_INTEGER) // true
    Number.isSafeInteger(Number.MAX_SAFE_INTEGER + 1) // false
    ```
    这个函数的实现很简单，就是跟安全整数的两个边界值比较一下。

    ```js
    Number.isSafeInteger = function (n) {
    return (typeof n === 'number' &&
        Math.round(n) === n &&
        Number.MIN_SAFE_INTEGER <= n &&
        n <= Number.MAX_SAFE_INTEGER);
    }
    实际使用这个函数时，需要注意。验证运算结果是否落在安全整数的范围内，不要只验证运算结果，而要同时验证参与运算的每个值。

    Number.isSafeInteger(9007199254740993)
    // false
    Number.isSafeInteger(990)
    // true
    Number.isSafeInteger(9007199254740993 - 990)
    // true
    9007199254740993 - 990
    // 返回结果 9007199254740002
    // 正确答案应该是 9007199254740003
    上面代码中，9007199254740993不是一个安全整数，但是Number.isSafeInteger会返回结果，显示计算结果是安全的。这是因为，这个数超出了精度范围，导致在计算机内部，以9007199254740992的形式储存。

    9007199254740993 === 9007199254740992
    // true
    所以，如果只验证运算结果是否为安全整数，很可能得到错误结果。下面的函数可以同时验证两个运算数和运算结果。

    function trusty (left, right, result) {
    if (
        Number.isSafeInteger(left) &&
        Number.isSafeInteger(right) &&
        Number.isSafeInteger(result)
    ) {
        return result;
    }
    throw new RangeError('Operation cannot be trusted!');
    }

    trusty(9007199254740993, 990, 9007199254740993 - 990)
    // RangeError: Operation cannot be trusted!

    trusty(1, 2, 3)
    // 3
    ```