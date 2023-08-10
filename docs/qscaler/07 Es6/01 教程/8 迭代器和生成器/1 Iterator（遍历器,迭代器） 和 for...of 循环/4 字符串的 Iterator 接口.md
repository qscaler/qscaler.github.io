### 4 字符串的 Iterator 接口

1.  字符串是一个类似数组的对象，也原生具有 Iterator 接口。

    ```js

    var someString = "hi";
    typeof someString[Symbol.iterator]
    // "function"

    var iterator = someString[Symbol.iterator]();

    iterator.next()  // { value: "h", done: false }
    iterator.next()  // { value: "i", done: false }
    iterator.next()  // { value: undefined, done: true }
    上面代码中，调用Symbol.iterator方法返回一个遍历器对象，在这个遍历器上可以调用 next 方法，实现对于字符串的遍历。

    可以覆盖原生的Symbol.iterator方法，达到修改遍历器行为的目的。

    var str = new String("hi");

    [...str] // ["h", "i"]

    str[Symbol.iterator] = function() {
    return {
        next: function() {
            if (this._first) {
                this._first = false;
                return { value: "bye", done: false };
            } else {
                return { done: true };
            }
        },
        _first: true
    };
    };

    [...str] // ["bye"]
    str // "hi"
    上面代码中，字符串 str 的Symbol.iterator方法被修改了，所以扩展运算符（...）返回的值变成了bye，而字符串本身还是hi。
    ```