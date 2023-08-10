<!--
 * @Author              : qxp
 * @Date                : 2021-03-22 15:02:03
 * @LastEditors         : Please set LastEditors
 * @LastEditTime        : 2021-03-22 15:05:29
 * @FilePath            : \new\6 Es6\5 扩展\2 数值的扩展.html
-->

### 6 Number.EPSILON

**希腊字母表的第五个字母 ε 。**  **用来设置误差范围**

ES6 在Number对象上面，**新增一个极小的常量Number.EPSILON**。根据规格，**它表示 1 与大于 1 的最小浮点数之间的差**。

对于 64 位浮点数来说，大于 1 的最小浮点数相当于二进制的1.00..001，小数点后面有连续 51 个零。这个值减去 1 之后，就等于 2 的 -52 次方。
```js
Number.EPSILON === Math.pow(2, -52)
// true
Number.EPSILON
// 2.220446049250313e-16
Number.EPSILON.toFixed(20)
// "0.00000000000000022204"
Number.EPSILON实际上是 JavaScript 能够表示的最小精度。误差如果小于这个值，就可以认为已经没有意义了，即不存在误差了。

引入一个这么小的量的目的，在于为浮点数计算，设置一个误差范围。我们知道浮点数计算是不精确的。

0.1 + 0.2
// 0.30000000000000004

0.1 + 0.2 - 0.3
// 5.551115123125783e-17

5.551115123125783e-17.toFixed(20)
// '0.00000000000000005551'
上面代码解释了，为什么比较0.1 + 0.2与0.3得到的结果是false。

0.1 + 0.2 === 0.3 // false
Number.EPSILON可以用来设置“能够接受的误差范围”。比如，误差范围设为 2 的-50 次方（即Number.EPSILON * Math.pow(2, 2)），即如果两个浮点数的差小于这个值，我们就认为这两个浮点数相等。

5.551115123125783e-17 < Number.EPSILON * Math.pow(2, 2)
// true
因此，Number.EPSILON的实质是一个可以接受的最小误差范围。

function withinErrorMargin (left, right) {
  return Math.abs(left - right) < Number.EPSILON * Math.pow(2, 2);
}

0.1 + 0.2 === 0.3 // false
withinErrorMargin(0.1 + 0.2, 0.3) // true

1.1 + 1.3 === 2.4 // false
withinErrorMargin(1.1 + 1.3, 2.4) // true
上面的代码为浮点数运算，部署了一个误差检查函数。
```