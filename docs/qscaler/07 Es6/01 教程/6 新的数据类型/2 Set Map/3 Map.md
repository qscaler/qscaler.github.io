<!--
 * @Author              : qxp
 * @Date                : 2021-03-22 17:04:04
 * @LastEditors         : Please set LastEditors
 * @LastEditTime        : 2021-03-22 17:05:04
 * @FilePath            : \new\6 Es6\7 Set 和 Map数据结构\2 Map.html
-->
[Map](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map)
JavaScript 的对象（Object），本质上是键值对的集合（Hash 结构），但是传统上只能用字符串当作键。这给它的使用带来了很大的限制。
```js
const data = {};
const element = document.getElementById('myDiv');

data[element] = 'metadata';
data['[object HTMLDivElement]'] // "metadata"
```
bject 结构提供了“字符串—值”的对应，
Map 结构提供了“值—值”的对应，是一种更完善的 Hash 结构实现。
如果你需要“键值对”的数据结构，Map 比 Object 更合适。


```js
使用 Map 对象
const myMap = new Map();

const keyString = 'a string';
const keyObj = {};
const keyFunc = function() {};

// 添加键
myMap.set(keyString, "和键'a string'关联的值");
myMap.set(keyObj, "和键 keyObj 关联的值");
myMap.set(keyFunc, "和键 keyFunc 关联的值");

console.log(myMap.size); // 3

// 读取值
console.log(myMap.get(keyString)); // "和键'a string'关联的值"
console.log(myMap.get(keyObj)); // "和键 keyObj 关联的值"
console.log(myMap.get(keyFunc)); // "和键 keyFunc 关联的值"

console.log(myMap.get('a string')); // "和键'a string'关联的值"，因为 keyString === 'a string'
console.log(myMap.get({})); // undefined，因为 keyObj !== {}
console.log(myMap.get(function() {})); // undefined，因为 keyFunc !== function () {}
```