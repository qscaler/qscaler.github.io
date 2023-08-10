---
title: 15 理解Vue的设计思想及实现Vue
---


##  理解Vue的设计思想

![](https://s.poetries.work/images/20210313152225.png)

*   MVVM框架的三要素:数据响应式、模板引擎及其渲染

*   数据响应式:监听数据变化并在视图中更新

    *   Object.defineProperty()
    *   Proxy
*   模版引擎:提供描述视图的模版语法

    *   插值:`{{}}`
    *   指令:`v-bind，v-on，v-model，v-for，v-if`
*   渲染:如何将模板转换为html

    *   `模板 => vdom => dom`

##  数据响应式原理

> 数据变更能够响应在视图中，就是数据响应式。vue2中利用 `Object.defineProperty()` 实现变更检 测。

![](https://s.poetries.work/images/20210313152449.png)

简单实现

```jsx

    // 数据响应式：
    // Object.defineProperty()

    function defineReactive(obj, key, val) {

      // val可能还是对象，此时我们需要递归
      observe(val)

      // 参数3是描述对象
      Object.defineProperty(obj, key, {
        get() {
          console.log('get', key);
          return val
        },
        set(newVal) {
          if (newVal !== val) {
            console.log('set', key);
            // 防止newVal是对象，提前做一次observe
            observe(newVal)
            val = newVal
          }
        }
      })
    }

    function observe(obj) {
      if (typeof obj !== 'object' || obj === null) {
        return
      }

      // 遍历
      Object.keys(obj).forEach(key => defineReactive(obj, key, obj[key]))
    }

    // 对于新加入属性，需要单独处理他的响应式
    function set(obj, key, val) {
      defineReactive(obj, key, val)
    }

    const obj = { foo: 'foo', bar: 'bar', baz: { a: 1 } }
    observe(obj)
    // defineReactive(obj, 'foo', 'foo')
    // obj.foo
    // obj.foo = 'fooooooooo'
    // obj.bar
    // obj.bar = 'barrrrrrrr'

    // obj.baz.a = '10'

    // obj.baz = {a: 10}
    // obj.baz.a = 100

    // 新添加一些属性
    // obj.dong = 'dong' // no ok
    set(obj, 'dong', 'dong')
    obj.dong

    // 前面的方法对于数组是不支持
    // 思路：拦截数组7个变更方法push、pop。。。，扩展他们，使他们在变更数据的同时
    // 额外的执行一个通知更新的任务
```

> `defineProperty()` 不支持数组

**解决数组数据的响应化**

##  Vue中的数据响应化

```jsx

    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Document</title>
    </head>
    <body>
      <div id="app">
        <h3>KVue</h3>
        <p>{{counter}}</p>
        <p k-text="counter"></p>
        <p k-html="desc"></p>

      </div>

      <script src="kvue.js"></script>

      <script>
        const app = new KVue({
          el:'#app',
          data: {
            counter: 1,
            desc: '<span style="color:red">kvue可还行</span>'
          }
        })
        setInterval(() => {
          app.counter++
        }, 1000);

      </script>
    </body>
    </html>
```

###  原理分析

*   `new Vue()`首先执行初始化，对**data**执行响应化处理，这个过程发生在`Observer`中
*   同时对模板执行编译，找到其中动态绑定的数据，从`data`中获取并初始化视图，这个过程发生在 `Compile`中
*   同时定义一个更新函数和`Watcher`，将来对应数据变化时`Watcher`会调用更新函数
*   由于`data`的某个`key`在一个视图中可能出现多次，所以每个`key`都需要一个管家`Dep`来管理多个`Watcher`
*   将来`data`中数据一旦发生变化，会首先找到对应的`Dep`，通知所有`Watcher`执行更新函数

![](https://s.poetries.work/images/20210313153616.png)

###  涉及类型介绍

*   `KVue`:框架构造函数
*   `Observer`:执行数据响应化(分辨数据是对象还是数组)
*   `Compile`:编译模板，初始化视图，收集依赖(更新函数、`watcher`创建)
*   `Watcher`:执行更新函数(更新`dom`)
*   `Dep`:管理多个`Watcher`，批量更新

##  实现Vue

###  框架构造函数:执行初始化

执行初始化，对data执行响应化处理，kvue.js

```jsx

    function observe(obj) {
      if (typeof obj !== 'object' || obj === null) {
        return
      }

      // 响应式
      new Observer(obj)

    }
```

```jsx

    function defineReactive(obj, key, val) {}

    class KVue {
      constructor(options) {
        this.$options = options;
        this.$data = options.data;
        observe(this.$data)
      }
    }
    class Observer {
      constructor(value) {
        this.value = value this.walk(value);
      }
      walk(obj) {
        Object.keys(obj).forEach(key = >{
          defineReactive(obj, key, obj[key])
        })
      }
    }
```

> 为`$data`做代理

```jsx

    class KVue {
      constructor(options) {
        // 。。。
        proxy(this, '$data')
      }
    }
    function proxy(vm) {
      Object.keys(vm.$data).forEach(key = >{
        Object.defineProperty(vm, key, {
          get() {
            return vm.$data[key];
          },
          set(newVal) {
            vm.$data[key] = newVal;
          }
        });
      })
    }
```

###  编译 Compile

编译模板中vue模板特殊语法，初始化视图、更新视图

![](https://s.poetries.work/images/20210313154136.png)

**1\. 初始化视图**

根据节点类型编译

```jsx

    class Compile {
      constructor(el, vm) {
        this.$vm = vm;
        this.$el = document.querySelector(el);
        if (this.$el) {
          this.compile(this.$el);
        }
      }
      console.log("编译元素" + node.nodeName);
    } else if (this.isInterpolation(node)) {
      console.log("编译插值文本" + node.textContent);
    }
    if (node.childNodes && node.childNodes.length > 0) {
      this.compile(node);
    }
    });
    }
    isElement(node) {
      return node.nodeType == 1;

    }
    isInterpolation(node) {
      return node.nodeType == 3 && /\{\{(.*)\}\}/.test(node.textContent);
    }
    }
```

编译插值

```jsx

    compile(el) { // ...
    } else if (this.isInerpolation(node)) {
      // console.log("编译插值文本" + node.textContent); this.compileText(node);
    }
    });
    }
    compileText(node) {
      console.log(RegExp.$1);
      node.textContent = this.$vm[RegExp.$1];
    }
```

编译元素

```jsx

    compile(el) { //...
      if (this.isElement(node)) {
        // console.log("编译元素" + node.nodeName); this.compileElement(node)
      }
    }
    compileElement(node) {
      let nodeAttrs = node.attributes;
      Array.from(nodeAttrs).forEach(attr = >{
        let attrName = attr.name;
        let exp = attr.value;
        if (this.isDirective(attrName)) {
          let dir = attrName.substring(2);
          this[dir] && this[dir](node, exp);
        }
      });
    }
    isDirective(attr) {
      return attr.indexOf("k-") == 0;
    }
    text(node, exp) {
      node.textContent = this.$vm[exp];
    }
```

###  依赖收集

视图中会用到data中某key，这称为依赖。同一个key可能出现多次，每次都需要收集出来用一个

Watcher来维护它们，此过程称为依赖收集。

多个Watcher需要一个Dep来管理，需要更新时由Dep统一通知。 看下面案例，理出思路:

```jsx

    new Vue({
        template:`<div> <p>{{name1}}</p>
                <p>{{name2}}</p>
    <p>{{name1}}</p> <div>`,
    data: {
       name1: 'name1',
       name2: 'name2' }
    });
```

![](https://s.poetries.work/images/20210313154749.png)

**实现思路**

1.  defineReactive时为每一个key创建一个Dep实例
2.  初始化视图时读取某个key，例如name1，创建一个watcher1
3.  由于触发name1的getter方法，便将watcher1添加到name1对应的Dep中
4.  当name1更新，setter触发时，便可通过对应Dep通知其管理所有Watcher更新

![](https://s.poetries.work/images/20210313162351.png)

创建Watcher，kvue.js

```jsx

    const watchers = []; //临时用于保存watcher测试用
    // 监听器:负责更新视图 class Watcher {
    constructor(vm, key, updateFn) { // kvue实例
      this.vm = vm;
      // 依赖key
      this.key = key;
      // 更新函数
      this.updateFn = updateFn;
      // 临时放入watchers数组
      watchers.pus
      // 更新 update() {
      this.updateFn.call(this.vm, this.vm[this.key]);
    }
    }
```

编写更新函数、创建watcher

```jsx

    // 调用update函数执插值文本赋值 compileText(node) {
    // console.log(RegExp.$1);
    // node.textContent = this.$vm[RegExp.$1]; this.update(node, RegExp.$1, 'text')
    }
    text(node, exp) {
      this.update(node, exp, 'text')
    }
    html(node, exp) {
      this.update(node, exp, 'html')
    }
    update(node, exp, dir) {
      const fn = this[dir + 'Updater'] fn && fn(node, this.$vm[exp]) new Watcher(this.$vm, exp,
      function(val) {
        fn && fn(node, val)
      })
    }
    textUpdater(node, val) {
      node.textContent = val;
    }
    htmlUpdater(node, val) {
      node.innerHTML = val
    }
```

声明Dep

```jsx

    class Dep {
        constructor () {
    		this.deps = [] }
    		addDep (dep) { this.deps.push(dep)
        }
        notify() {
          this.deps.forEach(dep => dep.update());
        } 
    }
```

创建watcher时触发getter

```jsx

    class Watcher {
      constructor(vm, key, updateFn) {
        Dep.target = this;
        this.vm[this.key];
        Dep.target = null;
      }
    }
```

依赖收集，创建Dep实例

```jsx

    defineReactive(obj, key, val) {
      this.observe(val);
      const dep = new Dep() Object.defineProperty(obj, key, {
        get() {
          Dep.target && dep.addDep(Dep.target);
          return val
        },
        set(newVal) {
          if (newVal === val) return dep.notify()
        }
      })
    }
```

###  完整代码

```jsx

    // 任务：
    // 1\. 数据响应式：是data选项中的对象编程响应式的
    // 2.

    // 数据响应式：
    // Object.defineProperty()

    function defineReactive(obj, key, val) {

      // val可能还是对象，此时我们需要递归
      observe(val)

      // 创建Dep实例，他和key一对一对应关系
      const dep = new Dep()

      // 参数3是描述对象
      Object.defineProperty(obj, key, {
        get() {
          // console.log('get', key);
          // 依赖收集:Dep.target就是当前新创建Watcher实例
          Dep.target && dep.addDep(Dep.target)
          return val
        },
        set(newVal) {
          if (newVal !== val) {
            console.log('set', key);
            // 防止newVal是对象，提前做一次observe
            observe(newVal)
            val = newVal

            // 通知更新
            dep.notify()
          }
        }
      })
    }

    function observe(obj) {
      if (typeof obj !== 'object' || obj === null) {
        return
      }

      // 响应式
      new Observer(obj)

    }

    // Observer: 辨别当前对象类型是纯对象还是数组，从而做不同响应式操作
    class Observer {
      constructor(value) {
        this.value = value
        // 辨别类型
        if (Array.isArray(value)) {
          // todo
        } else {
          this.walk(value)
        }
      }

      walk(obj) {
        // 对象响应式
        Object.keys(obj).forEach(key => defineReactive(obj, key, obj[key]))
      }
    }

    // 代理函数：可以将$data代理到KVue的实例
    // vm是KVue实例
    function proxy(vm) {
      Object.keys(vm.$data).forEach(key => {
        // 为当前实例做代理，定义一些key和data相对应
        Object.defineProperty(vm, key, {
          get() {
            return vm.$data[key]
          },
          set(newVal) {
            vm.$data[key] = newVal
          }
        })
      })
    }

    // KVue：解析选项，响应式、编译等等
    class KVue {
      constructor(options) {
        this.$options = options
        this.$data = options.data

        // 对data选项做响应式处理
        observe(this.$data)

        // 代理
        proxy(this)

        // 执行编译
        new Compile(options.el, this)
      }
    }

    // Compile: 遍历视图模板，解析其中的特殊模板语法为更新函数
    // new Compile(el, vm)
    class Compile {
      constructor(el, vm) {
        // el:宿主元素选择器
        // vm:KVue的实例
        this.$vm = vm;
        this.$el = document.querySelector(el)

        // 执行编译
        this.compile(this.$el)
      }

      compile(el) {
        // 遍历子元素，判断他们类型并做响应处理
        el.childNodes.forEach(node => {
          // 判断类型
          if (node.nodeType === 1) {
            // 元素节点
            // console.log('编译元素', node.nodeName);
            this.compileElement(node)
          } else if (this.isInter(node)) {
            // 文本节点
            // console.log('文本节点', node.textContent);
            // double kill
            this.compileText(node)
          }

          // 递归子节点
          if (node.childNodes) {
            this.compile(node)
          }
        })
      }

      // 是否插值绑定
      isInter(node) {
        return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
      }

      // 绑定表达式解析
      compileText(node) {
        // 获取匹配表达式 RegExp.$1,比如counter， vm['counter']
        // node.textContent = this.$vm[RegExp.$1]
        this.update(node, RegExp.$1, 'text')
      }

      // 编译元素节点：判断指令和事件
      compileElement(node) {
        // 获取属性
        const attrs = node.attributes

        Array.from(attrs).forEach(attr => {
          // k-text="counter"
          // attr是一个对象{name:'k-text', value: 'counter'}
          const { name, value } = attr
          // 判断是否是指令
          if (name.indexOf('k-') === 0) {
            // 截取指令
            const dir = name.substring(2)
            // 指令指令
            this[dir] && this[dir](node, value)
          }
          // 判断是否是事件 @
          // else if() {

          // }
        })
      }

      // k-text文本更新
      text(node, exp) {
        this.update(node, exp, 'text')
      }

      // k-html
      html(node, exp) {
        this.update(node, exp, 'html')
      }

      // update方法，高阶函数：除了执行dom操作，创建一个额外watcher实例
      // dir是指令名称
      update(node, exp, dir) {
        // 获取更新方法
        const fn = this[dir + 'Updater']
        // 初始化，让用户看到首次渲染结果
        fn && fn(node, this.$vm[exp])

        // 创建watcher实例
        new Watcher(this.$vm, exp, val => {
          fn && fn(node, val)
        })
      }

      // dom执行方法
      textUpdater(node, value) {
        node.textContent = value
      }

      htmlUpdater(node, value) {
        node.innerHTML = value
      }
    }

    // Watcher: 管理依赖，执行更新
    // const watchers = []
    class Watcher {
      // vm是KVue实例
      // key是data中对应的key名称
      // fn是更新函数，他知道怎么更新dom
      constructor(vm, key, fn) {
        this.vm = vm
        this.key = key
        this.fn = fn

        // watchers.push(this)

        // 建立dep和watcher之间的关系
        Dep.target = this
        this.vm[this.key] // 读一下key的值触发其getter
        Dep.target = null
      }

      // 更新函数，由Dep调用
      update() {
        // 更新函数调用，设置上下文问KVue实例，传参是当前最新值
        this.fn.call(this.vm, this.vm[this.key])
      }

    }

    // Dep: 管理多个watcher实例，当对应key发生变化时，通知他们更新
    class Dep {
      constructor() {
        this.deps = []
      }

      addDep(dep) {
        // 添加订阅者，dep就是watcher实例
        this.deps.push(dep)
      }

      // 通知更新
      notify() {
        this.deps.forEach(w => w.update())
      }
    }
```
