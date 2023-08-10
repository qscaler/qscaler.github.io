<!--
 * @Author              : qxp
 * @Date                : 2021-03-22 14:56:31
 * @LastEditors         : Please set LastEditors
 * @LastEditTime        : 2021-10-19 12:02:38
 * @FilePath            : \new\6 Es6\5 数据类型扩展\6 字符串的扩展.html
-->

### 一 字符的 Unicode 表示法

1. ES6 **加强**了对 Unicode 的支持 多了一个{}表示法，允许采用\uxxxx形式表示一个字符，**其中xxxx表示字符的 Unicode 码点**。
    ```js

    "\u0061"
    // "a"
    //但是，这种表示法只限于码点在\u0000~\uFFFF之间的字符(ASCII)。超出这个范围的字符，必须用两个双字节的形式表示。

    "\uD842\uDFB7"
    // "𠮷"

    "\u20BB7"
    // '₻7'
    ```
    //上面代码表示，如果直接在\u后面跟上超过0xFFFF的数值（比如\u20BB7），JavaScript 会理解成\u20BB+7。由于\u20BB是一个不可打印字符，所以只会显示一个空格，后面跟着一个7。
    ES6 对这一点做出了改进，只要将**码点放入大括号**，就能正确解读该字符。
    ```js
    "\u{20BB7}"
    // "𠮷"

    "\u{41}\u{42}\u{43}"
    // "ABC"

    let hello = 123;
    hell\u{6F} // 123

    '\u{1F680}' === '\uD83D\uDE80'
    // true
    ```
    上面代码中，最后一个例子表明，**大括号表示法与四字节的 UTF-16 编码是等价的**。
    有了这种表示法之后，**JavaScript 共有 6 种方法可以表示一个字符**。
    ```js
    '\z' === 'z'  // true     转义
    '\172' === 'z' // true     8进制
    '\x7A' === 'z' // true    16进制
    '\u007A' === 'z' // true    Unicode表示法
    '\u{7A}' === 'z' // true    Unicode表示法
    
