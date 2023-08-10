
### 6 Symbol.for()，Symbol.keyFor()

1.  有时，我们希望重新使用同一个 Symbol 值，Symbol.for()方法可以做到这一点。它接受一个字符串作为参数，然后搜索有没有以该参数作为名称的 Symbol 值。如果有，就返回这个 Symbol 值，否则就新建一个以该字符串为名称的 Symbol 值，并将其注册到全局。
    ```js
    let s1 = Symbol.for('foo');
    let s2 = Symbol.for('foo');

    s1 === s2 // true
    上面代码中，s1和s2都是 Symbol 值，但是它们都是由同样参数的Symbol.for方法生成的，所以实际上是同一个值。

    Symbol.for()与Symbol()这两种写法，都会生成新的 Symbol。它们的区别是，前者会被登记在全局环境中供搜索，后者不会。Symbol.for()不会每次调用就返回一个新的 Symbol 类型的值，而是会先检查给定的key是否已经存在，如果不存在才会新建一个值。比如，如果你调用Symbol.for("cat")30 次，每次都会返回同一个 Symbol 值，但是调用Symbol("cat")30 次，会返回 30 个不同的 Symbol 值。

    Symbol.for("bar") === Symbol.for("bar")
    // true

    Symbol("bar") === Symbol("bar")
    // false
    上面代码中，由于Symbol()写法没有登记机制，所以每次调用都会返回一个不同的值。
    ```
2.  Symbol.keyFor()方法返回一个已登记的 Symbol 类型值的key。
    ```js
    let s1 = Symbol.for("foo");
    Symbol.keyFor(s1) // "foo"

    let s2 = Symbol("foo");
    Symbol.keyFor(s2) // undefined
    上面代码中，变量s2属于未登记的 Symbol 值，所以返回undefined。

    注意，Symbol.for()为 Symbol 值登记的名字，是全局环境的，不管有没有在全局环境运行。

    function foo() {
        return Symbol.for('bar');
    }

    const x = foo();
    const y = Symbol.for('bar');
    console.log(x === y); // true
    上面代码中，Symbol.for('bar')是函数内部运行的，但是生成的 Symbol 值是登记在全局环境的。所以，第二次运行Symbol.for('bar')可以取到这个 Symbol 值。

    Symbol.for()的这个全局登记特性，可以用在不同的 iframe 或 service worker 中取到同一个值。

    iframe = document.createElement('iframe');
    iframe.src = String(window.location);
    document.body.appendChild(iframe);

    iframe.contentWindow.Symbol.for('foo') === Symbol.for('foo')
    // true
    上面代码中，iframe 窗口生成的 Symbol 值，可以在主页面得到。
    ```