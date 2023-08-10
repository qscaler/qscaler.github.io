### 7 实例：模块的 Singleton 模式

Singleton 模式指的是调用一个类，任何时候返回的都是同一个实例。
对于 Node 来说，模块文件可以看成是一个类。怎么保证每次执行这个模块文件，返回的都是同一个实例呢？
很容易想到，可以把实例放到顶层对象global。
```js

// mod.js
function A() {
  this.foo = 'hello';
}

if (!global._foo) {
  global._foo = new A();
}

module.exports = global._foo;
然后，加载上面的mod.js。

const a = require('./mod.js');
console.log(a.foo);
上面代码中，变量a任何时候加载的都是A的同一个实例。

但是，这里有一个问题，全局变量global._foo是可写的，任何文件都可以修改。

global._foo = { foo: 'world' };

const a = require('./mod.js');
console.log(a.foo);
上面的代码，会使得加载mod.js的脚本都失真。

为了防止这种情况出现，我们就可以使用 Symbol。

// mod.js
const FOO_KEY = Symbol.for('foo');

function A() {
  this.foo = 'hello';
}

if (!global[FOO_KEY]) {
  global[FOO_KEY] = new A();
}

module.exports = global[FOO_KEY];
上面代码中，可以保证global[FOO_KEY]不会被无意间覆盖，但还是可以被改写。

global[Symbol.for('foo')] = { foo: 'world' };

const a = require('./mod.js');
如果键名使用Symbol方法生成，那么外部将无法引用这个值，当然也就无法改写。

// mod.js
const FOO_KEY = Symbol('foo');

// 后面代码相同 ……
上面代码将导致其他脚本都无法引用FOO_KEY。但这样也有一个问题，就是如果多次执行这个脚本，每次得到的FOO_KEY都是不一样的。虽然 Node 会将脚本的执行结果缓存，一般情况下，不会多次执行同一个脚本，但是用户可以手动清除缓存，所以也不是绝对可靠。
```