<!--
 * @Author              : qxp
 * @Date                : 2021-03-22 15:02:03
 * @LastEditors         : Please set LastEditors
 * @LastEditTime        : 2021-03-22 15:05:29
 * @FilePath            : \new\6 Es6\5 扩展\2 数值的扩展.html
-->

### 5 Number.isInteger()
**Number.isInteger()用来判断一个数值是否为整数。(精度要求不高的情况下)**

    ```js
    Number.isInteger(25) // true
    Number.isInteger(25.1) // false
    ```
1.  JavaScript 内部，整数和浮点数采用的是同样的储存方法，所以 25 和 25.0 被视为同一个值。
    ```js
    Number.isInteger(25) // true
    Number.isInteger(25.0) // true
    ```
2.  如果**参数不是数值，Number.isInteger返回false**。
    ```js
    Number.isInteger() // false
    Number.isInteger(null) // false
    Number.isInteger('15') // false
    Number.isInteger(true) // false
    ```
3.  **精度问题**
    注意，由于 JavaScript 采用 IEEE 754 标准，数值存储为64位双精度格式，数值精度最多可以达到 53 个二进制位（1 个隐藏位与 52 个有效位）。如果数值的精度超过这个限度，第54位及后面的位就会被丢弃，这种情况下，**Number.isInteger可能会误判**。
    上面代码中，Number.isInteger的参数明明不是整数，但是会返回true。原因就是这个小数的精度达到了小数点后16个十进制位，转成二进制位超过了53个二进制位，导致最后的那个2被丢弃了。
    ```js
    Number.isInteger(3.0000000000000002) // true
    ```
    类似的情况还有，如果一个数值的绝对值小于Number.MIN_VALUE（5E-324），即小于 JavaScript 能够分辨的最小值，会被自动转为 0。这时，Number.isInteger也会误判。
    ```js
    Number.isInteger(5E-324) // false
    Number.isInteger(5E-325) // true
    ```
    上面代码中，5E-325由于值太小，会被自动转为0，因此返回true。
    总之，**如果对数据精度的要求较高，不建议使用Number.isInteger()判断一个数值是否为整数**。
