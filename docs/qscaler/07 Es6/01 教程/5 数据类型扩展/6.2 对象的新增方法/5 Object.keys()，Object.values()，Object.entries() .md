### 5 Object.keys()，Object.values()，Object.entries()

1.Object.keys()
ES5 引入了Object.keys方法，返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键名。

    ```js
    var obj = { foo: 'bar', baz: 42 };
    Object.keys(obj)
    // ["foo", "baz"]
    ES2017 引入了跟Object.keys配套的Object.values和Object.entries，作为遍历一个对象的补充手段，供for...of循环使用。

    let {keys, values, entries} = Object;
    let obj = { a: 1, b: 2, c: 3 };

    for (let key of keys(obj)) {
    console.log(key); // 'a', 'b', 'c'
    }

    for (let value of values(obj)) {
    console.log(value); // 1, 2, 3
    }

    for (let [key, value] of entries(obj)) {
    console.log([key, value]); // ['a', 1], ['b', 2], ['c', 3]
    }
    Object.values()
    Object.values方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值。

    const obj = { foo: 'bar', baz: 42 };
    Object.values(obj)
    // ["bar", 42]
    返回数组的成员顺序，与本章的《属性的遍历》部分介绍的排列规则一致。

    const obj = { 100: 'a', 2: 'b', 7: 'c' };
    Object.values(obj)
    // ["b", "c", "a"]
    上面代码中，属性名为数值的属性，是按照数值大小，从小到大遍历的，因此返回的顺序是b、c、a。
    ```
2.  Object.values只返回对象自身的可遍历属性。
    ```js
    const obj = Object.create({}, {p: {value: 42}});
    Object.values(obj) // []
    上面代码中，Object.create方法的第二个参数添加的对象属性（属性p），如果不显式声明，默认是不可遍历的，因为p的属性描述对象的enumerable默认是false，Object.values不会返回这个属性。只要把enumerable改成true，Object.values就会返回属性p的值。

    const obj = Object.create({}, {p:
    {
        value: 42,
        enumerable: true
    }
    });
    Object.values(obj) // [42]
    Object.values会过滤属性名为 Symbol 值的属性。

    Object.values({ [Symbol()]: 123, foo: 'abc' });
    // ['abc']
    如果Object.values方法的参数是一个字符串，会返回各个字符组成的一个数组。

    Object.values('foo')
    // ['f', 'o', 'o']
    上面代码中，字符串会先转成一个类似数组的对象。字符串的每个字符，就是该对象的一个属性。因此，Object.values返回每个属性的键值，就是各个字符组成的一个数组。

    如果参数不是对象，Object.values会先将其转为对象。由于数值和布尔值的包装对象，都不会为实例添加非继承的属性。所以，Object.values会返回空数组。

    Object.values(42) // []
    Object.values(true) // []
    ```

3.  Object.entries()
    Object.entries()方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值对数组。

    ```js
    const obj = { foo: 'bar', baz: 42 };
    Object.entries(obj)
    // [ ["foo", "bar"], ["baz", 42] ]
    除了返回值不一样，该方法的行为与Object.values基本一致。

    如果原对象的属性名是一个 Symbol 值，该属性会被忽略。

    Object.entries({ [Symbol()]: 123, foo: 'abc' });
    // [ [ 'foo', 'abc' ] ]
    上面代码中，原对象有两个属性，Object.entries只输出属性名非 Symbol 值的属性。将来可能会有Reflect.ownEntries()方法，返回对象自身的所有属性。

    Object.entries的基本用途是遍历对象的属性。

    let obj = { one: 1, two: 2 };
        for (let [k, v] of Object.entries(obj)) {
        console.log(
            `${JSON.stringify(k)}: ${JSON.stringify(v)}`
        );
    }
    // "one": 1
    // "two": 2
    Object.entries方法的另一个用处是，将对象转为真正的Map结构。

    const obj = { foo: 'bar', baz: 42 };
    const map = new Map(Object.entries(obj));
    map // Map { foo: "bar", baz: 42 }
    自己实现Object.entries方法，非常简单。

    // Generator函数的版本
    function* entries(obj) {
        for (let key of Object.keys(obj)) {
            yield [key, obj[key]];
        }
    }

    // 非Generator函数的版本
    function entries(obj) {
        let arr = [];
        for (let key of Object.keys(obj)) {
            arr.push([key, obj[key]]);
        }
        return arr;
    }
    ```