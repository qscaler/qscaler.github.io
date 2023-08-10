
### 四  JSON.stringify() 的改造（https://blog.51cto.com/u_15914240/5946530）
1. 根据标准，JSON 数据必须是 UTF-8 编码。但是，现在的 JSON.stringify()方法有可能返回不符合 UTF-8 标准的字符串。具体来说，UTF-8 标准规定，`0xD800` 到 0xDFFF 之间的码点，不能单独使用，必须配对使用。比如，\uD834\uDF06 是两个码点，但是必须放在一起配对使用，代表字符 𝌆。这是为了表示码点大于 0xFFFF 的字符的一种变通方法。单独使用\uD834 和\uDFO6 这两个码点是不合法的，或者颠倒顺序也不行，因为\uDF06\uD834 并没有对应的字符。

    JSON.stringify()的问题在于，它可能返回 `0xD800` 到 0xDFFF 之间的单个码点。

    JSON.stringify(’\u{D834}’) // “\u{D834}”

    为了确保返回的是合法的 UTF-8 字符，ES2019 改变了 JSON.stringify()的行为。如果遇到` 0xD800` 到 `0xDFFF` 之间的单个码点，或者不存在的配对形式，它会返回转义字符串，留给应用自己决定下一步的处理。

    JSON.stringify('\u{D834}') // ""\\uD834""
    JSON.stringify('\uDF06\uD834') // ""\\udf06\\ud834""


2. 字符串处理函数

    ES6 新增了几个专门处理 4 字节码点的函数。

    String.fromCodePoint()：从 Unicode 码点返回对应字符

    因为 fromCodePoint() 是 String 的一个静态方法，所以只能通过 String.fromCodePoint() 这样的方式来使用，不能在你创建的 String 对象实例上直接调用。
    ```js
    String.fromCodePoint(42);      // "*"

    String.fromCodePoint(65, 90);  // "AZ"

    String.fromCodePoint(0x404);    // "\u0404"

    String.fromCodePoint(0x2F804);  // "\uD87E\uDC04"

    String.fromCodePoint(194564);  // "\uD87E\uDC04"

    String.fromCodePoint(0x1D306, 0x61, 0x1D307) // "\uD834\uDF06a\uD834\uDF07"

    String.fromCodePoint('_');      // RangeError

    String.fromCodePoint(Infinity); // RangeError

    String.fromCodePoint(-1);      // RangeError

    String.fromCodePoint(3.14);    // RangeError

    String.fromCodePoint(3e-2);    // RangeError

    String.fromCodePoint(NaN);      // RangeError

    String.prototype.codePointAt()：从字符返回对应的码点

    如果在指定的位置没有元素则返回 undefined 。如果在索引处开始没有 UTF-16 代理对，将直接返回在那个索引处的编码单元。

    Surrogate Pair 是 UTF-16 中用于扩展字符而使用的编码方式，是一种采用四个字节(两个 UTF-16 编码)来表示一个字符，称作代理对。

    'ABC'.codePointAt(1);          // 66

    '\uD800\uDC00'.codePointAt(0); // 65536

    'XYZ'.codePointAt(42); // undefined
    ```
3. 正则表达式
    ES6 提供了 u 修饰符，对正则表达式添加 4 字节码点的支持。
    ```js
    /^.$/.test('𝌆')

    false

    /^.$/u.test('𝌆')

    true
    ```
4.  Unicode 正规化
    有些字符除了字母以外，还有附加符号。比如，汉语拼音的 Ǒ，字母上面的声调就是附加符号。对于许多欧洲语言来说，声调符号是非常重要的。

    Unicode 提供了两种表示方法。一种是带附加符号的单个字符，即一个码点表示一个字符，比如 Ǒ 的码点是 U+01D1；另一种是将附加符号单独作为一个码点，与主体字符复合显示，即两个码点表示一个字符，比如 Ǒ 可以写成 O（U+004F） + ˇ（U+030C）。
    ```js
    // 方法一

    '\u01D1'

    // 'Ǒ'

    // 方法二

    '\u004F\u030C'

    // 'Ǒ'

    这两种表示方法，视觉和语义都完全一样，理应作为等同情况处理。但是，JavaScript 无法辨别。

    '\u01D1'==='\u004F\u030C'

    //false

    ES6 提供了 normalize 方法，允许”Unicode 正规化”，即将两种方法转为同样的序列。

    '\u01D1'.normalize() === '\u004F\u030C'.normalize()

    // true
     ```
5.  Emoji 表情符号的储存
    在 Android 手机或者 iPhone 的各种输入法键盘中，会自带一些 Emoji 表情符号，如 IPhone 手机系统键盘包含的表情符号有：

    计算机基础知识之Unicode-彻底弄懂 Unicode 编码_字符串

    如果在移动端发布文本内容时包含了这种 Emoji 表情符号，通过接口传递到服务器端，服务器端再存入 MySQL 数据库：

    对 gbk 字符集的数据库，写入数据库的数据，在回显时，变成 ‘口口’ 无法回显；

    对 utf8 字符集的数据库，则根本无法写入数据库，程序直接报出异常信息 java.io.exception xxxxxxxx.

    原因分析：
    这是由于字符集不支持的异常，因为 Emoji 表情是四个字节，而 mysql 的 utf-8 编码最多三个字节，所以导致数据插不进去。

    真正的 utf8 编码(大家都使用的标准)，最大支持 4 个 bytes。正是由于 mysql 的 utf8 少一个 byte，导致中文的一些特殊字符和 emoji 都无法正常的显示。mysql 真正的 utf8 其实是 utf8mb4，这是在 5.5.3 版本之后加入的。而目前的“utf8”其实是 utf8mb3。所以尽量不要使用默认的 utf8，使用 utf8mb4 才是正确的选择。

    从 mysql 5.5.3 之后版本基本可以无缝升级到 utf8mb4 字符集。同时，utf8mb4 兼容 utf8 字符集，utf8 字符的编码、位置、存储在 utf8mb4 与 utf8 字符集里一样的，不会对有现有数据带来损坏。

    ```
