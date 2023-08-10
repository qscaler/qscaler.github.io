### 7 Object.hasOwn()

1.  JavaScript 对象的属性分成两种：自身的属性和继承的属性。对象实例有一个hasOwnProperty()方法，可以判断某个属性是否为原生属性。ES2022 在Object对象上面新增了一个静态方法Object.hasOwn()，也可以判断是否为自身的属性。

```js
Object.hasOwn()可以接受两个参数，第一个是所要判断的对象，第二个是属性名。

const foo = Object.create({ a: 123 });
foo.b = 456;

Object.hasOwn(foo, 'a') // false
Object.hasOwn(foo, 'b') // true
上面示例中，对象foo的属性a是继承属性，属性b是原生属性。Object.hasOwn()对属性a返回false，对属性b返回true。

Object.hasOwn()的一个好处是，对于不继承Object.prototype的对象不会报错，而hasOwnProperty()是会报错的。

const obj = Object.create(null);

obj.hasOwnProperty('foo') // 报错
Object.hasOwn(obj, 'foo') // false
上面示例中，Object.create(null)返回的对象obj是没有原型的，不继承任何属性，这导致调用obj.hasOwnProperty()会报错，但是Object.hasOwn()就能正确处理这种情况。
```