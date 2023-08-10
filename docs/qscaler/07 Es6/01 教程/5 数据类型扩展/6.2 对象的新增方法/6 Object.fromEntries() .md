### 6 Object.fromEntries()

1. Object.fromEntries()方法是Object.entries()的逆操作，用于将一个键值对数组转为对象。

    ```js
    Object.fromEntries([
        ['foo', 'bar'],
        ['baz', 42]
    ])
    // { foo: "bar", baz: 42 }
    该方法的主要目的，是将键值对的数据结构还原为对象，因此特别适合将 Map 结构转为对象。

    // 例一
    const entries = new Map([
        ['foo', 'bar'],
        ['baz', 42]
    ]);

    Object.fromEntries(entries)
    // { foo: "bar", baz: 42 }

    // 例二
    const map = new Map().set('foo', true).set('bar', false);
    Object.fromEntries(map)
    // { foo: true, bar: false }
    该方法的一个用处是配合URLSearchParams对象，将查询字符串转为对象。

    Object.fromEntries(new URLSearchParams('foo=bar&baz=qux'))
    // { foo: "bar", baz: "qux" }
    ```