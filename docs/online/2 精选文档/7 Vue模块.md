---
title: 7 Vue模块
---

##  1 谈谈你对MVVM的理解

为什么要有这些模式，目的：职责划分、分层（将`Model`层、`View`层进行分类）借鉴后端思想，对于前端而已，就是如何将数据同步到页面上

**MVC模式** 代表：`Backbone` + `underscore` + `jquery`

![](https://s.poetries.work/uploads/2022/08/bf9b97960412f53f.png)

*   传统的 `MVC` 指的是,用户操作会请求服务端路由，路由会调用对应的控制器来处理，控制器会获取数据。将结果返回给前端,页面重新渲染
*   `MVVM`：传统的前端会将数据手动渲染到页面上, `MVVM` 模式不需要用户收到操作 `dom` 元素,将数据绑定到 `viewModel` 层上，会自动将数据渲染到页面中，视图变化会通知 `viewModel`层 更新数据。`ViewModel` 就是我们 `MVVM` 模式中的桥梁

**MVVM模式** 映射关系的简化，隐藏了`controller`

![](https://s.poetries.work/uploads/2022/08/41f439971593ef61.png)

> `MVVM`是`Model-View-ViewModel`缩写，也就是把`MVC`中的`Controller`演变成`ViewModel`。`Model`层代表数据模型，`View`代表UI组件，`ViewModel`是`View`和`Model`层的桥梁，数据会绑定到`viewModel`层并自动将数据渲染到页面中，视图变化的时候会通知`viewModel`层更新数据。

*   `Model`: 代表数据模型，也可以在`Model`中定义数据修改和操作的业务逻辑。我们可以把`Model`称为数据层，因为它仅仅关注数据本身，不关心任何行为
*   `View`: 用户操作界面。当`ViewModel`对`Model`进行更新的时候，会通过数据绑定更新到`View`
*   `ViewModel`： 业务逻辑层，`View`需要什么数据，`ViewModel`要提供这个数据；`View`有某些操作，`ViewModel`就要响应这些操作，所以可以说它是`Model for View`.

**总结**： `MVVM`模式简化了界面与业务的依赖，解决了数据频繁更新。`MVVM` 在使用当中，利用双向绑定技术，使得 `Model` 变化时，`ViewModel` 会自动更新，而 `ViewModel` 变化时，`View` 也会自动变化。

我们以下通过一个 `Vue` 实例来说明 `MVVM` 的具体实现

```html

    <!-- View 层 -->

    <div id="app">
      <p>{{message}}</p>
      <button v-on:click="showMessage()">Click me</button>
    </div>
```

```js

    var app = new Vue({
      el: '#app',
      data: {  // 用于描述视图状态  
        message: 'Hello Vue!', // Model 层
      },
      // ViewModel 层：通过事件修改model层数据
      methods: {  // 用于描述视图行为  
        showMessage(){
          let vm = this;
          alert(vm.message);
        }
      },
      created(){
        let vm = this;
        // Ajax 获取 Model 层的数据
        ajax({
          url: '/your/server/data/api',
          success(res){
            vm.message = res;
          }
        });
      }
    })
```

##  2 谈谈你对SPA单页面的理解

> `SPA`（ single-page application ）仅在 `Web` 页面初始化时加载相应的 `HTML`、`JavaScript` 和 `CSS`。一旦页面加载完成，`SPA` 不会因为用户的操作而进行页面的重新加载或跳转；取而代之的是利用路由机制实现 `HTML` 内容的变换，`UI` 与用户的交互，避免页面的重新加载

**优点：**

*   用户体验好、快，内容的改变不需要重新加载整个页面，避免了不必要的跳转和重复渲染；
*   基于上面一点，`SPA` 相对对服务器压力小；
*   前后端职责分离，架构清晰，前端进行交互逻辑，后端负责数据处理

**缺点：**

*   初次加载耗时多：为实现单页 `Web` 应用功能及显示效果，需要在加载页面的时候将 `JavaScript`、`CSS` 统一加载，部分页面按需加载；
*   前进后退路由管理：由于单页应用在一个页面中显示所有的内容，所以不能使用浏览器的前进后退功能，所有的页面切换需要自己建立堆栈管理；
*   `SEO` 难度较大：由于所有的内容都在一个页面中动态替换显示，所以在 `SEO` 上其有着天然的弱势

**单页应用与多页应用的区别**

<table>

<thead>

<tr>

<th></th>

<th>单页面应用（SPA）</th>

<th>多页面应用（MPA）</th>

</tr>

</thead>

<tbody>

<tr>

<td>组成</td>

<td>一个主页面和多个页面片段</td>

<td>多个主页面</td>

</tr>

<tr>

<td>刷新方式</td>

<td>局部刷新</td>

<td>整页刷新</td>

</tr>

<tr>

<td>`url`模式</td>

<td>哈希模式</td>

<td>历史模式</td>

</tr>

<tr>

<td>`SEO`搜索引擎优化</td>

<td>难实现，可使用SSR方式改善</td>

<td>容易实现</td>

</tr>

<tr>

<td>数据传递</td>

<td>容易</td>

<td>通过`url`、`cookie`、`localStorage`等传递</td>

</tr>

<tr>

<td>页面切换</td>

<td>速度快，用户体验良好</td>

<td>切换加载资源，速度慢，用户体验差</td>

</tr>

<tr>

<td>维护成本</td>

<td>相对容易</td>

<td>相对复杂</td>

</tr>

</tbody>

</table>

**实现一个SPA**

*   监听地址栏中`hash`变化驱动界面变化
*   用`pushsate`记录浏览器的历史，驱动界面发送变化

![](https://s.poetries.work/uploads/2022/09/e2b412462d9e1bbf.png)

1.  **hash 模式**：核心通过监听`url`中的`hash`来进行路由跳转

```js

    // 定义 Router  
    class Router {  
        constructor () {  
            this.routes = {}; // 存放路由path及callback  
            this.currentUrl = '';  

            // 监听路由change调用相对应的路由回调  
            window.addEventListener('load', this.refresh, false);  
            window.addEventListener('hashchange', this.refresh, false);  
        }  

        route(path, callback){  
            this.routes[path] = callback;  
        }  

        push(path) {  
            this.routes[path] && this.routes[path]()  
        }  
    }  

    // 使用 router  
    window.miniRouter = new Router();  
    miniRouter.route('/', () => console.log('page1'))  
    miniRouter.route('/page2', () => console.log('page2'))  

    miniRouter.push('/') // page1  
    miniRouter.push('/page2') // page2  
```

1.  **history模式**：`history` 模式核心借用 `HTML5 history api`，`api` 提供了丰富的 `router` 相关属性先了解一个几个相关的api

*   `history.pushState` 浏览器历史纪录添加记录
*   `history.replaceState`修改浏览器历史纪录中当前纪录
*   `history.popState` 当 `history` 发生变化时触发

```js

    // 定义 Router  
    class Router {  
        constructor () {  
            this.routes = {};  
            this.listerPopState()  
        }  

        init(path) {  
            history.replaceState({path: path}, null, path);  
            this.routes[path] && this.routes[path]();  
        }  

        route(path, callback){  
            this.routes[path] = callback;  
        }  

        push(path) {  
            history.pushState({path: path}, null, path);  
            this.routes[path] && this.routes[path]();  
        }  

        listerPopState () {  
            window.addEventListener('popstate' , e => {  
                const path = e.state && e.state.path;  
                this.routers[path] && this.routers[path]()  
            })  
        }  
    }  

    // 使用 Router  

    window.miniRouter = new Router();  
    miniRouter.route('/', ()=> console.log('page1'))  
    miniRouter.route('/page2', ()=> console.log('page2'))  

    // 跳转  
    miniRouter.push('/page2')  // page2  
```

**题外话：如何给SPA做SEO**

1.  SSR服务端渲染

将组件或页面通过服务器生成`html`，再返回给浏览器，如`nuxt.js`

1.  静态化

目前主流的静态化主要有两种：

*   一种是通过程序将动态页面抓取并保存为静态页面，这样的页面的实际存在于服务器的硬盘中
*   另外一种是通过WEB服务器的 `URL Rewrite`的方式，它的原理是通过web服务器内部模块按一定规则将外部的URL请求转化为内部的文件地址，一句话来说就是把外部请求的静态地址转化为实际的动态页面地址，而静态页面实际是不存在的。这两种方法都达到了实现URL静态化的效果

1.  使用`Phantomjs`针对爬虫处理

原理是通过`Nginx`配置，判断访问来源是否为爬虫，如果是则搜索引擎的爬虫请求会转发到一个`node server`，再通过`PhantomJS`来解析完整的`HTML`，返回给爬虫。下面是大致流程图

![](https://s.poetries.work/uploads/2022/09/d0b4e716fda54d7f.png)

##  3 Vue2.x 响应式数据原理


整体思路是数据劫持+观察者模式

对象内部通过 `defineReactive` 方法，使用 `Object.defineProperty` 来劫持各个属性的 `setter`、`getter`（只会劫持已经存在的属性），数组则是通过`重写数组7个方法`来实现。当页面使用对应属性时，每个属性都拥有自己的 `dep` 属性，存放他所依赖的 `watcher`（依赖收集），当属性变化后会通知自己对应的 `watcher` 去更新(派发更新)
```

**Object.defineProperty基本使用**

```js

    function observer(value) { // proxy reflect
        if (typeof value === 'object' && typeof value !== null)
        for (let key in value) {
            defineReactive(value, key, value[key]);
        }
    }

    function defineReactive(obj, key, value) {
        observer(value);
        Object.defineProperty(obj, key, {
            get() { // 收集对应的key 在哪个方法（组件）中被使用
                return value;
            },
            set(newValue) {
                if (newValue !== value) {
                    observer(newValue);
                    value = newValue; // 让key对应的方法（组件重新渲染）重新执行
                }
            }
        })
    }
    let obj1 = { school: { name: 'poetry', age: 20 } };
    observer(obj1);
    console.log(obj1)
```

**源码分析**

![](https://s.poetries.work/uploads/2022/08/c2f6869e2adcf668.png)

```js

    class Observer {
      // 观测值
      constructor(value) {
        this.walk(value);
      }
      walk(data) {
        // 对象上的所有属性依次进行观测
        let keys = Object.keys(data);
        for (let i = 0; i < keys.length; i++) {
          let key = keys[i];
          let value = data[key];
          defineReactive(data, key, value);
        }
      }
    }
    // Object.defineProperty数据劫持核心 兼容性在ie9以及以上
    function defineReactive(data, key, value) {
      observe(value); // 递归关键
      // --如果value还是一个对象会继续走一遍odefineReactive 层层遍历一直到value不是对象才停止
      //   思考？如果Vue数据嵌套层级过深 >>性能会受影响
      Object.defineProperty(data, key, {
        get() {
          console.log("获取值");

          //需要做依赖收集过程 这里代码没写出来
          return value;
        },
        set(newValue) {
          if (newValue === value) return;
          console.log("设置值");
          //需要做派发更新过程 这里代码没写出来
          value = newValue;
        },
      });
    }
    export function observe(value) {
      // 如果传过来的是对象或者数组 进行属性劫持
      if (
        Object.prototype.toString.call(value) === "[object Object]" ||
        Array.isArray(value)
      ) {
        return new Observer(value);
      }
    }
```


说一说你对vue响应式理解回答范例

*   所谓数据响应式就是**能够使数据变化可以被检测并对这种变化做出响应的机制**
*   `MVVM`框架中要解决的一个核心问题是连接数据层和视图层，通过**数据驱动**应用，数据变化，视图更新，要做到这点的就需要对数据做响应式处理，这样一旦数据发生变化就可以立即做出更新处理
*   以`vue`为例说明，通过数据响应式加上虚拟`DOM`和`patch`算法，开发人员只需要操作数据，关心业务，完全不用接触繁琐的DOM操作，从而大大提升开发效率，降低开发难度
*   `vue2`中的数据响应式会根据数据类型来做不同处理，如果是**对象则采用`Object.defineProperty()`的方式定义数据拦截，当数据被访问或发生变化时，我们感知并作出响应；如果是数组则通过覆盖数组对象原型的7个变更方法**，使这些方法可以额外的做更新通知，从而作出响应。这种机制很好的解决了数据响应化的问题，但在实际使用中也存在一些缺点：比如初始化时的递归遍历会造成性能损失；新增或删除属性时需要用户使用`Vue.set/delete`这样特殊的`api`才能生效；对于`es6`中新产生的`Map`、`Set`这些数据结构不支持等问题
*   为了解决这些问题，`vue3`重新编写了这一部分的实现：利用`ES6`的`Proxy`代理要响应化的数据，它有很多好处，编程体验是一致的，不需要使用特殊`api`，初始化性能和内存消耗都得到了大幅改善；另外由于响应化的实现代码抽取为独立的`reactivity`包，使得我们可以更灵活的使用它，第三方的扩展开发起来更加灵活了
```

##  4 Vue3.x 响应式数据原理

> `Vue3.x`改用`Proxy`替代`Object.defineProperty`。因为`Proxy`可以直接监听对象和数组的变化，并且有多达`13`种拦截方法。并且作为新标准将受到浏览器厂商重点持续的性能优化。

###  proxy基本用法

```js

    // proxy默认只会代理第一层对象，只有取值再次是对象的时候再次代理，不是一上来就代理，提高性能。不像vue2.x递归遍历每个对象属性
    let handler = {
        set(target, key, value) {
            return Reflect.set(target, key, value);
        },
        get(target, key) {
            if (typeof target[key] == 'object' && target[key] !== null) {
                return new Proxy(target[key], handler); // 懒代理，只有取值再次是对象的时候再次代理，提高性能
            }
            return Reflect.get(target, key);
        }
    }
    let obj = { school: { name: 'poetry', age: 20 } };
    let proxy = new Proxy(obj, handler);

    // 返回对象的代理
    proxy.school
```

###  说说你对 proxy 的理解，Proxy 相比于 defineProperty 的优势

**`Object.defineProperty()` 的问题主要有三个：**

*   **不能监听数组的变化**：无法监控到数组下标的变化，导致通过数组下标添加元素，不能实时响应
*   **必须遍历对象的每个属性**：只能劫持对象的属性，从而需要对每个对象，每个属性进行遍历，如果属性值是对象，还需要深度遍历。`Proxy` 可以劫持整个对象，并返回一个新的对象
*   **必须深层遍历嵌套的对象**

**Proxy的优势如下:**

*   针对对象：**针对整个对象，而不是对象的某个属性**，所以也就不需要对 `keys` 进行遍历
*   支持数组：`Proxy` 不需要对数组的方法进行重载，省去了众多 hack，减少代码量等于减少了维护成本，而且标准的就是最好的
*   `Proxy`的第二个参数可以有 `13` 种拦截方：不限于`apply`、`ownKeys`、`deleteProperty`、`has`等等是`Object.defineProperty`不具备的
*   `Proxy`返回的是一个新对象,我们可以只操作新的对象达到目的,而`Object.defineProperty`只能遍历对象属性直接修改
*   `Proxy`作为新标准将受到浏览器厂商重点持续的性能优化，也就是传说中的新标准的性能红利

[proxy详细使用点击查看<span><span class="sr-only">(opens new window)</span></span>](https://es6.ruanyifeng.com/#docs/proxy)

**Object.defineProperty的优势如下:**

> 兼容性好，支持 `IE9`，而 `Proxy` 的存在浏览器兼容性问题,而且无法用 `polyfill` 磨平

**defineProperty的属性值有哪些**

```js

    Object.defineProperty(obj, prop, descriptor)

    // obj 要定义属性的对象
    // prop 要定义或修改的属性的名称
    // descriptor 要定义或修改的属性描述符

    Object.defineProperty(obj,"name",{
      value:"poetry", // 初始值
      writable:true, // 该属性是否可写入
      enumerable:true, // 该属性是否可被遍历得到（for...in， Object.keys等）
      configurable:true, // 定该属性是否可被删除，且除writable外的其他描述符是否可被修改
      get: function() {},
      set: function(newVal) {}
    })
```

**相关代码如下**

```js

    import { mutableHandlers } from "./baseHandlers"; // 代理相关逻辑
    import { isObject } from "./util"; // 工具方法

    export function reactive(target) {
      // 根据不同参数创建不同响应式对象
      return createReactiveObject(target, mutableHandlers);
    }
    function createReactiveObject(target, baseHandler) {
      if (!isObject(target)) {
        return target;
      }
      const observed = new Proxy(target, baseHandler);
      return observed;
    }

    const get = createGetter();
    const set = createSetter();

    function createGetter() {
      return function get(target, key, receiver) {
        // 对获取的值进行放射
        const res = Reflect.get(target, key, receiver);
        console.log("属性获取", key);
        if (isObject(res)) {
          // 如果获取的值是对象类型，则返回当前对象的代理对象
          return reactive(res);
        }
        return res;
      };
    }
    function createSetter() {
      return function set(target, key, value, receiver) {
        const oldValue = target[key];
        const hadKey = hasOwn(target, key);
        const result = Reflect.set(target, key, value, receiver);
        if (!hadKey) {
          console.log("属性新增", key, value);
        } else if (hasChanged(value, oldValue)) {
          console.log("属性值被修改", key, value);
        }
        return result;
      };
    }
    export const mutableHandlers = {
      get, // 当获取属性时调用此方法
      set, // 当修改属性时调用此方法
    };
```

`Proxy`只会代理对象的第一层，那么`Vue3`又是怎样处理这个问题的呢？

> 判断当前`Reflect.get的`返回值是否为`Object`，如果是则再通过`reactive`方法做代理， 这样就实现了深度观测。

**监测数组的时候可能触发多次get/set，那么如何防止触发多次呢？**

> 我们可以判断`key`是否为当前被代理对象`target`自身属性，也可以判断旧值与新值是否相等，只有满足以上两个条件之一时，才有可能执行`trigger`

##  5 Vue中如何检测数组变化

**前言**

`Vue` 不能检测到以下数组的变动：

*   当你利用索引直接设置一个数组项时，例如：`vm.items[indexOfItem] = newValue`
*   当你修改数组的长度时，例如：`vm.items.length = newLength`

`Vue` 提供了以下操作方法

```js

    // Vue.set
    Vue.set(vm.items, indexOfItem, newValue)
    // vm.$set，Vue.set的一个别名
    vm.$set(vm.items, indexOfItem, newValue)
    // Array.prototype.splice
    vm.items.splice(indexOfItem, 1, newValue)
```

**分析**

> 数组考虑性能原因没有用 `defineProperty` 对数组的每一项进行拦截，而是选择对 `7` 种数组（`push`,`shift`,`pop`,`splice`,`unshift`,`sort`,`reverse`）方法进行重写(`AOP` 切片思想)

所以在 `Vue` 中修改数组的索引和长度是无法监控到的。需要通过以上 `7` 种变异方法修改数组才会触发数组对应的 `watcher` 进行更新

*   用函数劫持的方式，重写了数组方法，具体呢就是更改了数组的原型，更改成自己的，用户调数组的一些方法的时候，走的就是自己的方法，然后通知视图去更新
*   数组里每一项可能是对象，那么我就是会对数组的每一项进行观测（且只有数组里的对象才能进行观测，观测过的也不会进行观测）

**原理**

> `Vue` 将 `data` 中的数组，进行了原型链重写。指向了自己定义的数组原型方法，这样当调用数组`api` 时，可以通知依赖更新，如果数组中包含着引用类型。会对数组中的引用类型再次进行监控。

![](https://s.poetries.work/uploads/2022/08/7c69c59722899f6a.png)

手写简版分析

```js

    let oldArray = Object.create(Array.prototype);
    ['shift', 'unshift', 'push', 'pop', 'reverse','sort'].forEach(method => {
        oldArray[method] = function() { // 这里可以触发页面更新逻辑
            console.log('method', method)
            Array.prototype[method].call(this,...arguments);
        }
    });
    let arr = [1,2,3];
    arr.__proto__ = oldArray;
    arr.unshift(4);
```

源码分析

```js

    // 拿到数组原型拷贝一份
    const arrayProto = Array.prototype 
    // 然后将arrayMethods继承自数组原型
    // 这里是面向切片编程思想（AOP）--不破坏封装的前提下，动态的扩展功能
    export const arrayMethods = Object.create(arrayProto) 
    const methodsToPatch = [ 'push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse' ]

    methodsToPatch.forEach(function (method) { // 重写原型方法 
        const original = arrayProto[method] // 调用原数组的方法 

        def(arrayMethods, method, function mutator (...args) { 
            // 这里保留原型方法的执行结果
            const result = original.apply(this, args) 
            // 这句话是关键
            // this代表的就是数据本身 比如数据是{a:[1,2,3]} 那么我们使用a.push(4)  this就是a  ob就是a.__ob__ 这个属性就是上段代码增加的 代表的是该数据已经被响应式观察过了指向Observer实例
            const ob = this.__ob__ 

            // 这里的标志就是代表数组有新增操作
            let inserted
            switch (method) { 
                case 'push': 
                case 'unshift': 
                    inserted = args 
                    break 
                case 'splice': 
                    inserted = args.slice(2) 
                    break 
            }
            // 如果有新增的元素 inserted是一个数组 调用Observer实例的observeArray对数组每一项进行观测
            if (inserted) ob.observeArray(inserted) 

            ob.dep.notify() // 当调用数组方法后，手动通知视图更新 

            return result 
        }) 
    })

    this.observeArray(value) // 进行深度监控
```

> `vue3`：改用 `proxy` ，可直接监听对象数组的变化

##  6 Vue中如何进行依赖收集？

*   每个属性都有自己的`dep`属性，存放他所依赖的`watcher`，当属性变化之后会通知自己对应的`watcher`去更新
*   默认会在初始化时调用`render`函数，此时会触发属性依赖收集 `dep.depend`
*   当属性发生修改时会触发`watcher`更新`dep.notify()`

![](https://s.poetries.work/uploads/2022/08/196afd48958a52c3.png)

**依赖收集简版**

```js

    let obj = { name: 'poetry', age: 20 };

    class Dep {
        constructor() {
          this.subs = [] // subs [watcher]
        }
        depend() {
          this.subs.push(Dep.target)
        }
        notify() {
          this.subs.forEach(watcher => watcher.update())
        }
    }
    Dep.target = null;
    observer(obj); // 响应式属性劫持

    // 依赖收集  所有属性都会增加一个dep属性，
    // 当渲染的时候取值了 ，这个dep属性 就会将渲染的watcher收集起来
    // 数据更新 会让watcher重新执行

    // 观察者模式

    // 渲染组件时 会创建watcher
    class Watcher {
        constructor(render) {
          this.get();
        }
        get() {
          Dep.target = this;
          render(); // 执行render
          Dep.target = null;
        }
        update() {
          this.get();
        }
    }
    const render = () => {
        console.log(obj.name); // obj.name => get方法
    }

    // 组件是watcher、计算属性是watcher
    new Watcher(render);

    function observer(value) { // proxy reflect
        if (typeof value === 'object' && typeof value !== null)
        for (let key in value) {
            defineReactive(value, key, value[key]);
        }
    }
    function defineReactive(obj, key, value) {
        // 创建一个dep
        let dep = new Dep();

        // 递归观察子属性
        observer(value);

        Object.defineProperty(obj, key, {
            get() { // 收集对应的key 在哪个方法（组件）中被使用
                if (Dep.target) { // watcher
                    dep.depend(); // 这里会建立 dep 和watcher的关系
                }
                return value;
            },
            set(newValue) {
                if (newValue !== value) {
                    observer(newValue);
                    value = newValue; // 让key对应的方法（组件重新渲染）重新执行
                    dep.notify()
                }
            }
        })
    }

    // 模拟数据获取，触发getter
    obj.name = 'poetries'

    // 一个属性一个dep，一个属性可以对应多个watcher（一个属性可以在任何组件中使用、在多个组件中使用）
    // 一个dep 对应多个watcher 
    // 一个watcher 对应多个dep （一个视图对应多个属性）
    // dep 和 watcher是多对多的关系
```

##  7 Vue实例挂载的过程中发生了什么

###  简单


TIP

**分析**

挂载过程完成了最重要的两件事：

*   初始化
*   建立更新机制

把这两件事说清楚即可！

**回答范例**

1.  挂载过程指的是`app.mount()`过程，这个过程中整体上做了两件事：**初始化**和**建立更新机制**
2.  初始化会创建组件实例、初始化组件状态，创建各种响应式数据
3.  建立更新机制这一步会立即执行一次组件更新函数，这会首次执行组件渲染函数并执行`patch`将前面获得`vnode`转换为`dom`；同时首次执行渲染函数会创建它内部响应式数据之间和组件更新函数之间的依赖关系，这使得以后数据变化时会执行对应的更新函数
```

来看一下源码，在`src/core/instance/index.js` 中

```js

    function Vue (options) {
      if (process.env.NODE_ENV !== 'production' &&
        !(this instanceof Vue)
      ) {
        warn('Vue is a constructor and should be called with the `new` keyword')
      }
      this._init(options)
    }
```

可以看到 `Vue` 只能通过 `new` 关键字初始化，然后会调用 `this._init` 方法， 该方法在 `src/core/instance/init.js` 中定义

```js

    Vue.prototype._init = function (options?: Object) {
      const vm: Component = this
      // a uid
      vm._uid = uid++

      let startTag, endTag
      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
        startTag = `vue-perf-start:${vm._uid}`
        endTag = `vue-perf-end:${vm._uid}`
        mark(startTag)
      }

      // a flag to avoid this being observed
      vm._isVue = true
      // merge options
      if (options && options._isComponent) {
        // optimize internal component instantiation
        // since dynamic options merging is pretty slow, and none of the
        // internal component options needs special treatment.
        initInternalComponent(vm, options)
      } else {
        vm.$options = mergeOptions(
          resolveConstructorOptions(vm.constructor),
          options || {},
          vm
        )
      }
      /* istanbul ignore else */
      if (process.env.NODE_ENV !== 'production') {
        initProxy(vm)
      } else {
        vm._renderProxy = vm
      }
      // expose real self
      vm._self = vm
      initLifecycle(vm)
      initEvents(vm)
      initRender(vm)
      callHook(vm, 'beforeCreate')
      initInjections(vm) // resolve injections before data/props
      initState(vm)
      initProvide(vm) // resolve provide after data/props
      callHook(vm, 'created')

      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
        vm._name = formatComponentName(vm, false)
        mark(endTag)
        measure(`vue ${vm._name} init`, startTag, endTag)
      }

      if (vm.$options.el) {
        vm.$mount(vm.$options.el)
      }
    }
```

> `Vue` 初始化主要就干了几件事情，`合并配置`，`初始化生命周期`，`初始化事件中心`，`初始化渲染`，`初始化 data`、`props`、`computed`、`watcher` 等

###  vue2.x详细

**1\. 分析**

首先找到`vue`的构造函数

源码位置：src\core\instance\index.js

```js

    function Vue (options) {
      if (process.env.NODE_ENV !== 'production' &&
        !(this instanceof Vue)
      ) {
        warn('Vue is a constructor and should be called with the `new` keyword')
      }
      this._init(options)
    }
```

`options`是用户传递过来的配置项，如`data、methods`等常用的方法

`vue`构建函数调用`_init`方法，但我们发现本文件中并没有此方法，但仔细可以看到文件下方定定义了很多初始化方法

```js

    initMixin(Vue);     // 定义 _init
    stateMixin(Vue);    // 定义 $set $get $delete $watch 等
    eventsMixin(Vue);   // 定义事件  $on  $once $off $emit
    lifecycleMixin(Vue);// 定义 _update  $forceUpdate  $destroy
    renderMixin(Vue);   // 定义 _render 返回虚拟dom
```

首先可以看`initMixin`方法，发现该方法在`Vue`原型上定义了`_init`方法

源码位置：src\core\instance\init.js

```js

    Vue.prototype._init = function (options?: Object) {
        const vm: Component = this
        // a uid
        vm._uid = uid++
        let startTag, endTag
        /* istanbul ignore if */
        if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
          startTag = `vue-perf-start:${vm._uid}`
          endTag = `vue-perf-end:${vm._uid}`
          mark(startTag)
        }

        // a flag to avoid this being observed
        vm._isVue = true
        // merge options
        // 合并属性，判断初始化的是否是组件，这里合并主要是 mixins 或 extends 的方法
        if (options && options._isComponent) {
          // optimize internal component instantiation
          // since dynamic options merging is pretty slow, and none of the
          // internal component options needs special treatment.
          initInternalComponent(vm, options)
        } else { // 合并vue属性
          vm.$options = mergeOptions(
            resolveConstructorOptions(vm.constructor),
            options || {},
            vm
          )
        }
        /* istanbul ignore else */
        if (process.env.NODE_ENV !== 'production') {
          // 初始化proxy拦截器
          initProxy(vm)
        } else {
          vm._renderProxy = vm
        }
        // expose real self
        vm._self = vm
        // 初始化组件生命周期标志位
        initLifecycle(vm)
        // 初始化组件事件侦听
        initEvents(vm)
        // 初始化渲染方法
        initRender(vm)
        callHook(vm, 'beforeCreate')
        // 初始化依赖注入内容，在初始化data、props之前
        initInjections(vm) // resolve injections before data/props
        // 初始化props/data/method/watch/methods
        initState(vm)
        initProvide(vm) // resolve provide after data/props
        callHook(vm, 'created')

        /* istanbul ignore if */
        if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
          vm._name = formatComponentName(vm, false)
          mark(endTag)
          measure(`vue ${vm._name} init`, startTag, endTag)
        }
        // 挂载元素
        if (vm.$options.el) {
          vm.$mount(vm.$options.el)
        }
      }
```

仔细阅读上面的代码，我们得到以下结论：

*   在调用`beforeCreate`之前，数据初始化并未完成，像`data`、`props`这些属性无法访问到
*   到了`created`的时候，数据已经初始化完成，能够访问`data`、`props`这些属性，但这时候并未完成`dom`的挂载，因此无法访问到`dom`元素
*   挂载方法是调用`vm.$mount`方法

`initState`方法是完成`props/data/method/watch/methods`的初始化

源码位置：src\core\instance\state.js

```js

    export function initState (vm: Component) {
      // 初始化组件的watcher列表
      vm._watchers = []
      const opts = vm.$options
      // 初始化props
      if (opts.props) initProps(vm, opts.props)
      // 初始化methods方法
      if (opts.methods) initMethods(vm, opts.methods)
      if (opts.data) {
        // 初始化data  
        initData(vm)
      } else {
        observe(vm._data = {}, true /* asRootData */)
      }
      if (opts.computed) initComputed(vm, opts.computed)
      if (opts.watch && opts.watch !== nativeWatch) {
        initWatch(vm, opts.watch)
      }
    }
```

我们和这里主要看初始化`data`的方法为`initData`，它与`initState`在同一文件上

```js

    function initData (vm: Component) {
      let data = vm.$options.data
      // 获取到组件上的data
      data = vm._data = typeof data === 'function'
        ? getData(data, vm)
        : data || {}
      if (!isPlainObject(data)) {
        data = {}
        process.env.NODE_ENV !== 'production' && warn(
          'data functions should return an object:\n' +
          'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
          vm
        )
      }
      // proxy data on instance
      const keys = Object.keys(data)
      const props = vm.$options.props
      const methods = vm.$options.methods
      let i = keys.length
      while (i--) {
        const key = keys[i]
        if (process.env.NODE_ENV !== 'production') {
          // 属性名不能与方法名重复
          if (methods && hasOwn(methods, key)) {
            warn(
              `Method "${key}" has already been defined as a data property.`,
              vm
            )
          }
        }
        // 属性名不能与state名称重复
        if (props && hasOwn(props, key)) {
          process.env.NODE_ENV !== 'production' && warn(
            `The data property "${key}" is already declared as a prop. ` +
            `Use prop default value instead.`,
            vm
          )
        } else if (!isReserved(key)) { // 验证key值的合法性
          // 将_data中的数据挂载到组件vm上,这样就可以通过this.xxx访问到组件上的数据
          proxy(vm, `_data`, key)
        }
      }
      // observe data
      // 响应式监听data是数据的变化
      observe(data, true /* asRootData */)
    }
```

仔细阅读上面的代码，我们可以得到以下结论：

*   初始化顺序：`props`、`methods`、`data`
*   `data`定义的时候可选择函数形式或者对象形式（组件只能为函数形式）

关于数据响应式在这就不展开详细说明

上文提到挂载方法是调用`vm.$mount`方法

源码位置：

```js

    Vue.prototype.$mount = function (
      el?: string | Element,
      hydrating?: boolean
    ): Component {
      // 获取或查询元素
      el = el && query(el)

      /* istanbul ignore if */
      // vue 不允许直接挂载到body或页面文档上
      if (el === document.body || el === document.documentElement) {
        process.env.NODE_ENV !== 'production' && warn(
          `Do not mount Vue to <html> or <body> - mount to normal elements instead.`
        )
        return this
      }

      const options = this.$options
      // resolve template/el and convert to render function
      if (!options.render) {
        let template = options.template
        // 存在template模板，解析vue模板文件
        if (template) {
          if (typeof template === 'string') {
            if (template.charAt(0) === '#') {
              template = idToTemplate(template)
              /* istanbul ignore if */
              if (process.env.NODE_ENV !== 'production' && !template) {
                warn(
                  `Template element not found or is empty: ${options.template}`,
                  this
                )
              }
            }
          } else if (template.nodeType) {
            template = template.innerHTML
          } else {
            if (process.env.NODE_ENV !== 'production') {
              warn('invalid template option:' + template, this)
            }
            return this
          }
        } else if (el) {
          // 通过选择器获取元素内容
          template = getOuterHTML(el)
        }
        if (template) {
          /* istanbul ignore if */
          if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
            mark('compile')
          }
          /**
           *  1.将temmplate解析ast tree
           *  2.将ast tree转换成render语法字符串
           *  3.生成render方法
           */
          const { render, staticRenderFns } = compileToFunctions(template, {
            outputSourceRange: process.env.NODE_ENV !== 'production',
            shouldDecodeNewlines,
            shouldDecodeNewlinesForHref,
            delimiters: options.delimiters,
            comments: options.comments
          }, this)
          options.render = render
          options.staticRenderFns = staticRenderFns

          /* istanbul ignore if */
          if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
            mark('compile end')
            measure(`vue ${this._name} compile`, 'compile', 'compile end')
          }
        }
      }
      return mount.call(this, el, hydrating)
    }
```

阅读上面代码，我们能得到以下结论：

*   不要将根元素放到`body`或者`html`上
*   可以在对象中定义`template/render`或者直接使用`template`、`el`表示元素选择器
*   最终都会解析成`render`函数，调用`compileToFunctions`，会将`template`解析成`render`函数

对`template`的解析步骤大致分为以下几步：

*   将`html`文档片段解析成`ast`描述符
*   将`ast`描述符解析成字符串
*   生成`render`函数

生成`render`函数，挂载到`vm`上后，会再次调用`mount`方法

源码位置：src\platforms\web\runtime\index.js

```js

    // public mount method
    Vue.prototype.$mount = function (
      el?: string | Element,
      hydrating?: boolean
    ): Component {
      el = el && inBrowser ? query(el) : undefined
      // 渲染组件
      return mountComponent(this, el, hydrating)
    }
```

调用`mountComponent`渲染组件

```js

    export function mountComponent (
      vm: Component,
      el: ?Element,
      hydrating?: boolean
    ): Component {
      vm.$el = el
      // 如果没有获取解析的render函数，则会抛出警告
      // render是解析模板文件生成的
      if (!vm.$options.render) {
        vm.$options.render = createEmptyVNode
        if (process.env.NODE_ENV !== 'production') {
          /* istanbul ignore if */
          if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
            vm.$options.el || el) {
            warn(
              'You are using the runtime-only build of Vue where the template ' +
              'compiler is not available. Either pre-compile the templates into ' +
              'render functions, or use the compiler-included build.',
              vm
            )
          } else {
            // 没有获取到vue的模板文件
            warn(
              'Failed to mount component: template or render function not defined.',
              vm
            )
          }
        }
      }
      // 执行beforeMount钩子
      callHook(vm, 'beforeMount')

      let updateComponent
      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
        updateComponent = () => {
          const name = vm._name
          const id = vm._uid
          const startTag = `vue-perf-start:${id}`
          const endTag = `vue-perf-end:${id}`

          mark(startTag)
          const vnode = vm._render()
          mark(endTag)
          measure(`vue ${name} render`, startTag, endTag)

          mark(startTag)
          vm._update(vnode, hydrating)
          mark(endTag)
          measure(`vue ${name} patch`, startTag, endTag)
        }
      } else {
        // 定义更新函数
        updateComponent = () => {
          // 实际调⽤是在lifeCycleMixin中定义的_update和renderMixin中定义的_render
          vm._update(vm._render(), hydrating)
        }
      }
      // we set this to vm._watcher inside the watcher's constructor
      // since the watcher's initial patch may call $forceUpdate (e.g. inside child
      // component's mounted hook), which relies on vm._watcher being already defined
      // 监听当前组件状态，当有数据变化时，更新组件
      new Watcher(vm, updateComponent, noop, {
        before () {
          if (vm._isMounted && !vm._isDestroyed) {
            // 数据更新引发的组件更新
            callHook(vm, 'beforeUpdate')
          }
        }
      }, true /* isRenderWatcher */)
      hydrating = false

      // manually mounted instance, call mounted on self
      // mounted is called for render-created child components in its inserted hook
      if (vm.$vnode == null) {
        vm._isMounted = true
        callHook(vm, 'mounted')
      }
      return vm
    }
```

阅读上面代码，我们得到以下结论：

*   会触发`boforeCreate`钩子
*   定义`updateComponent`渲染页面视图的方法
*   监听组件数据，一旦发生变化，触发`beforeUpdate`生命钩子

`updateComponent`方法主要执行在`vue`初始化时声明的`render`，`update`方法

render`的作用主要是生成`vnode

源码位置：src\core\instance\render.js

```js

    // 定义vue 原型上的render方法
    Vue.prototype._render = function (): VNode {
        const vm: Component = this
        // render函数来自于组件的option
        const { render, _parentVnode } = vm.$options

        if (_parentVnode) {
            vm.$scopedSlots = normalizeScopedSlots(
                _parentVnode.data.scopedSlots,
                vm.$slots,
                vm.$scopedSlots
            )
        }

        // set parent vnode. this allows render functions to have access
        // to the data on the placeholder node.
        vm.$vnode = _parentVnode
        // render self
        let vnode
        try {
            // There's no need to maintain a stack because all render fns are called
            // separately from one another. Nested component's render fns are called
            // when parent component is patched.
            currentRenderingInstance = vm
            // 调用render方法，自己的独特的render方法， 传入createElement参数，生成vNode
            vnode = render.call(vm._renderProxy, vm.$createElement)
        } catch (e) {
            handleError(e, vm, `render`)
            // return error render result,
            // or previous vnode to prevent render error causing blank component
            /* istanbul ignore else */
            if (process.env.NODE_ENV !== 'production' && vm.$options.renderError) {
                try {
                    vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e)
                } catch (e) {
                    handleError(e, vm, `renderError`)
                    vnode = vm._vnode
                }
            } else {
                vnode = vm._vnode
            }
        } finally {
            currentRenderingInstance = null
        }
        // if the returned array contains only a single node, allow it
        if (Array.isArray(vnode) && vnode.length === 1) {
            vnode = vnode[0]
        }
        // return empty vnode in case the render function errored out
        if (!(vnode instanceof VNode)) {
            if (process.env.NODE_ENV !== 'production' && Array.isArray(vnode)) {
                warn(
                    'Multiple root nodes returned from render function. Render function ' +
                    'should return a single root node.',
                    vm
                )
            }
            vnode = createEmptyVNode()
        }
        // set parent
        vnode.parent = _parentVnode
        return vnode
    }
```

`_update`主要功能是调用`patch`，将`vnode`转换为真实`DOM`，并且更新到页面中

源码位置：src\core\instance\lifecycle.js

```js

    Vue.prototype._update = function (vnode: VNode, hydrating?: boolean) {
        const vm: Component = this
        const prevEl = vm.$el
        const prevVnode = vm._vnode
        // 设置当前激活的作用域
        const restoreActiveInstance = setActiveInstance(vm)
        vm._vnode = vnode
        // Vue.prototype.__patch__ is injected in entry points
        // based on the rendering backend used.
        if (!prevVnode) {
          // initial render
          // 执行具体的挂载逻辑
          vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */)
        } else {
          // updates
          vm.$el = vm.__patch__(prevVnode, vnode)
        }
        restoreActiveInstance()
        // update __vue__ reference
        if (prevEl) {
          prevEl.__vue__ = null
        }
        if (vm.$el) {
          vm.$el.__vue__ = vm
        }
        // if parent is an HOC, update its $el as well
        if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
          vm.$parent.$el = vm.$el
        }
        // updated hook is called by the scheduler to ensure that children are
        // updated in a parent's updated hook.
      }
```

**2\. 结论**

*   `new Vue`的时候调用会调用`_init`方法
    *   定义 `$set`、`$get` 、`$delete`、`$watch` 等方法
    *   定义 `$on`、`$off`、`$emit`、`$off`等事件
    *   定义 `_update`、`$forceUpdate`、`$destroy`生命周期
*   调用`$mount`进行页面的挂载
*   挂载的时候主要是通过`mountComponent`方法
*   定义`updateComponent`更新函数
*   执行`render`生成虚拟`DOM`
*   `_update`将虚拟`DOM`生成真实`DOM`结构，并且渲染到页面中

##  8 理解Vue运行机制全局概览

###  全局概览

首先我们来看一下笔者画的内部流程图。

![](https://s.poetries.work/gitee/2020/07/vue/1.png)

大家第一次看到这个图一定是一头雾水的，没有关系，我们来逐个讲一下这些模块的作用以及调用关系。相信讲完之后大家对`Vue.js`内部运行机制会有一个大概的认识。

###  初始化及挂载

![](https://s.poetries.work/gitee/2020/07/vue/2.png)

> 在 `new Vue()` 之后。 Vue 会调用 `_init` 函数进行初始化，也就是这里的 `init` 过程，它会初始化生命周期、事件、 props、 methods、 data、 computed 与 watch 等。其中最重要的是通过 `Object.defineProperty` 设置 `setter` 与 `getter` 函数，用来实现「**响应式**」以及「**依赖收集**」，后面会详细讲到，这里只要有一个印象即可。

> 初始化之后调用 `$mount` 会挂载组件，如果是运行时编译，即不存在 render function 但是存在 template 的情况，需要进行「**编译**」步骤。

###  编译

`compile`编译可以分成 `parse`、`optimize` 与 `generate` 三个阶段，最终需要得到 `render function`。

![](https://s.poetries.work/gitee/2020/07/vue/3.png)

**1\. parse**

`parse` 会用正则等方式解析 `template` 模板中的指令、`class`、`style`等数据，形成`AST`。

**2\. optimize**

> `optimize` 的主要作用是标记 `static` 静态节点，这是 Vue 在编译过程中的一处优化，后面当 `update` 更新界面时，会有一个 `patch` 的过程， diff 算法会直接跳过静态节点，从而减少了比较的过程，优化了 `patch` 的性能。

**3\. generate**

> `generate` 是将 `AST` 转化成 `render function` 字符串的过程，得到结果是 `render` 的字符串以及 `staticRenderFns` 字符串。

*   在经历过 `parse`、`optimize` 与 `generate` 这三个阶段以后，组件中就会存在渲染 `VNode` 所需的 `render function` 了。

###  响应式

接下来也就是 `Vue.js` 响应式核心部分。

![](https://s.poetries.work/gitee/2020/07/vue/4.png)

> 这里的 `getter` 跟 `setter` 已经在之前介绍过了，在 `init` 的时候通过 `Object.defineProperty` 进行了绑定，它使得当被设置的对象被读取的时候会执行 `getter` 函数，而在当被赋值的时候会执行 `setter` 函数。

*   当 `render function` 被渲染的时候，因为会读取所需对象的值，所以会触发 `getter` 函数进行「**依赖收集**」，「**依赖收集**」的目的是将观察者 `Watcher` 对象存放到当前闭包中的订阅者 `Dep` 的 `subs` 中。形成如下所示的这样一个关系。

![](https://s.poetries.work/gitee/2020/07/vue/5.png)

> 在修改对象的值的时候，会触发对应的 `setter`， `setter` 通知之前「**依赖收集**」得到的 `Dep` 中的每一个 `Watcher`，告诉它们自己的值改变了，需要重新渲染视图。这时候这些 `Watcher` 就会开始调用 `update` 来更新视图，当然这中间还有一个 `patch` 的过程以及使用队列来异步更新的策略，这个我们后面再讲。

###  Virtual DOM

> 我们知道，`render function` 会被转化成 `VNode` 节点。`Virtual DOM` 其实就是一棵以 JavaScript 对象（ VNode 节点）作为基础的树，用对象属性来描述节点，实际上它只是一层对真实 DOM 的抽象。最终可以通过一系列操作使这棵树映射到真实环境上。由于 Virtual DOM 是以 JavaScript 对象为基础而不依赖真实平台环境，所以使它具有了跨平台的能力，比如说浏览器平台、Weex、Node 等。

比如说下面这样一个例子：

```js

    {
        tag: 'div',                 /*说明这是一个div标签*/
        children: [                 /*存放该标签的子节点*/
            {
                tag: 'a',           /*说明这是一个a标签*/
                text: 'click me'    /*标签的内容*/
            }
        ]
    }
```

渲染后可以得到

```js

    <div>
        <a>click me</a>
    </div>
```

> 这只是一个简单的例子，实际上的节点有更多的属性来标志节点，比如 isStatic （代表是否为静态节点）、 isComment （代表是否为注释节点）等。

###  更新视图

![](https://s.poetries.work/gitee/2020/07/vue/6.png)

*   前面我们说到，在修改一个对象值的时候，会通过 `setter -> Watcher -> update` 的流程来修改对应的视图，那么最终是如何更新视图的呢？
*   当数据变化后，执行 `render function` 就可以得到一个新的 `VNode` 节点，我们如果想要得到新的视图，最简单粗暴的方法就是直接解析这个新的 `VNode` 节点，然后用 `innerHTML` 直接全部渲染到真实 `DOM` 中。但是其实我们只对其中的一小块内容进行了修改，这样做似乎有些「**浪费**」。
*   那么我们为什么不能只修改那些「改变了的地方」呢？这个时候就要介绍我们的「**`patch`**」了。我们会将新的 `VNode` 与旧的 `VNode` 一起传入 `patch` 进行比较，经过 `diff` 算法得出它们的「**差异**」。最后我们只需要将这些「**差异**」的对应 `DOM` 进行修改即可。

###  再看全局

![](https://s.poetries.work/gitee/2020/07/vue/7.png)

回过头再来看看这张图，是不是大脑中已经有一个大概的脉络了呢？

##  9 如何理解Vue中模板编译原理

> `Vue` 的编译过程就是将 `template` 转化为 `render` 函数的过程

*   **解析生成AST树** 将`template`模板转化成`AST`语法树，使用大量的正则表达式对模板进行解析，遇到标签、文本的时候都会执行对应的钩子进行相关处理
*   **标记优化** 对静态语法做静态标记 `markup`(静态节点如`div`下有`p`标签内容不会变化) `diff`来做优化 静态节点跳过`diff`操作
    *   `Vue`的数据是响应式的，但其实模板中并不是所有的数据都是响应式的。有一些数据首次渲染后就不会再变化，对应的`DOM`也不会变化。那么优化过程就是深度遍历`AST`树，按照相关条件对树节点进行标记。这些被标记的节点(静态节点)我们就可以跳过对它们的比对，对运行时的模板起到很大的优化作用
    *   等待后续节点更新，如果是静态的，不会在比较`children`了
*   **代码生成** 编译的最后一步是将优化后的`AST`树转换为可执行的代码


回答范例

**思路**

*   引入`vue`编译器概念
*   说明编译器的必要性
*   阐述编译器工作流程

**回答范例**

1.  `Vue`中有个独特的编译器模块，称为`compiler`，它的主要作用是将用户编写的`template`编译为`js`中可执行的`render`函数。
2.  之所以需要这个编译过程是为了便于前端能高效的编写视图模板。相比而言，我们还是更愿意用`HTML`来编写视图，直观且高效。手写`render`函数不仅效率底下，而且失去了编译期的优化能力。
3.  在`Vue`中编译器会先对`template`进行解析，这一步称为`parse`，结束之后会得到一个`JS`对象，我们称为**抽象语法树AST**，然后是对`AST`进行深加工的转换过程，这一步成为`transform`，最后将前面得到的`AST`生成为`JS`代码，也就是`render`函数

**可能的追问**

1.  `Vue`中编译器何时执行？

![](https://s.poetries.work/uploads/2022/08/d1162df23e6b6fa4.png)

> 在 `new Vue()`之后。 `Vue` 会调用 `_init` 函数进行初始化，也就是这里的 `init` 过程，它会初始化生命周期、事件、 `props`、 `methods`、 `data`、 `computed` 与 `watch`等。其中最重要的是通过 `Object.defineProperty` 设置 `setter` 与 `getter` 函数，用来实现「响应式」以及「依赖收集」

*   初始化之后调用 `$mount` 会挂载组件，如果是运行时编译，即不存在 `render function` 但是存在 `template` 的情况，需要进行「编译」步骤
*   `compile`编译可以分成 `parse`、`optimize` 与 `generate` 三个阶段，最终需要得到 `render function`

1.  `React`有没有编译器？

`react` 使用`babel`将`JSX`语法解析
```

```html

    <div id="app"></div>
    <script>
        let vm = new Vue({
            el: '#app',
            template: `<div>
                // <span>hello world</span> 是静态节点
                <span>hello world</span>    
                // <p>{{name}}</p> 是动态节点
                <p>{{name}}</p>
            </div>`,
            data() {
              return { name: 'test' }
            }
        });
    </script>
```

源码分析

```js

    export function compileToFunctions(template) {
      // 我们需要把html字符串变成render函数
      // 1.把html代码转成ast语法树  ast用来描述代码本身形成树结构 不仅可以描述html 也能描述css以及js语法
      // 很多库都运用到了ast 比如 webpack babel eslint等等
      let ast = parse(template);
      // 2.优化静态节点：对ast树进行标记,标记静态节点
        if (options.optimize !== false) {
          optimize(ast, options);
        }

      // 3.通过ast 重新生成代码
      // 我们最后生成的代码需要和render函数一样
      // 类似_c('div',{id:"app"},_c('div',undefined,_v("hello"+_s(name)),_c('span',undefined,_v("world"))))
      // _c代表创建元素 _v代表创建文本 _s代表文Json.stringify--把对象解析成文本
      let code = generate(ast);
      //   使用with语法改变作用域为this  之后调用render函数可以使用call改变this 方便code里面的变量取值
      let renderFn = new Function(`with(this){return ${code}}`);
      return renderFn;
    }
```

###  Vue complier 实现

*   模板解析这种事，本质是将数据转化为一段 `html` ，最开始出现在后端，经过各种处理吐给前端。随着各种 `mv*` 的兴起，模板解析交由前端处理。
*   总的来说，`Vue complier` 是将 `template` 转化成一个 `render` 字符串。

> 可以简单理解成以下步骤：

*   `parse` 过程，将 `template` 利用正则转化成`AST` 抽象语法树。
*   `optimize` 过程，标记静态节点，后 `diff` 过程跳过静态节点，提升性能。
*   `generate` 过程，生成 `render` 字符串

##  10 Vue生命周期相关

###  Vue的生命周期方法有哪些

1.  `Vue` 实例有一个完整的生命周期，也就是从`开始创建`、`初始化数据`、`编译模版`、`挂载Dom -> 渲染`、`更新 -> 渲染`、`卸载`等一系列过程，我们称这是`Vue`的生命周期
2.  `Vue` 生命周期总共分为8个阶段`创建前/后`，`载入前/后`，`更新前/后`，`销毁前/后`

> `beforeCreate` => `created` => `beforeMount` => `Mounted` => `beforeUpdate` => `updated` => `beforeDestroy` => `destroyed`。`keep-alive`下：`activated` `deactivated`

<table>

<thead>

<tr>

<th>生命周期vue2</th>

<th>生命周期vue3</th>

<th>描述</th>

</tr>

</thead>

<tbody>

<tr>

<td>`beforeCreate`</td>

<td>`beforeCreate`</td>

<td>在实例初始化之后，数据观测(`data observer`) 之前被调用。</td>

</tr>

<tr>

<td>`created`</td>

<td>`created`</td>

<td>实例已经创建完成之后被调用。在这一步，实例已完成以下的配置：数据观测(`data observer`)，属性和方法的运算， `watch/event` 事件回调。这里没有`$el`</td>

</tr>

<tr>

<td>`beforeMount`</td>

<td>`beforeMount`</td>

<td>在挂载开始之前被调用：相关的 `render` 函数首次被调用</td>

</tr>

<tr>

<td>`mounted`</td>

<td>`mounted`</td>

<td>`el` 被新创建的 `vm.$el` 替换，并挂载到实例上去之后调用该钩子</td>

</tr>

<tr>

<td>`beforeUpdate`</td>

<td>`beforeUpdate`</td>

<td>组件数据更新之前调用，发生在虚拟 `DOM` 打补丁之前</td>

</tr>

<tr>

<td>`updated`</td>

<td>`updated`</td>

<td>由于数据更改导致的虚拟 `DOM` 重新渲染和打补丁，在这之后会调用该钩子</td>

</tr>

<tr>

<td>`beforeDestroy`</td>

<td>`beforeUnmount`</td>

<td>实例销毁之前调用。在这一步，实例仍然完全可用</td>

</tr>

<tr>

<td>`destroyed`</td>

<td>`unmounted`</td>

<td>实例销毁后调用。调用后， `Vue` 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。 该钩子在服务器端渲染期间不被调用。</td>

</tr>

</tbody>

</table>

其他几个生命周期

<table>

<thead>

<tr>

<th>生命周期vue2</th>

<th>生命周期vue3</th>

<th>描述</th>

</tr>

</thead>

<tbody>

<tr>

<td>`activated`</td>

<td>`activated`</td>

<td>`keep-alive`专属，组件被激活时调用</td>

</tr>

<tr>

<td>`deactivated`</td>

<td>`deactivated`</td>

<td>`keep-alive`专属，组件被销毁时调用</td>

</tr>

<tr>

<td>`errorCaptured`</td>

<td>`errorCaptured`</td>

<td>捕获一个来自子孙组件的错误时被调用</td>

</tr>

<tr>

<td>-</td>

<td>`renderTracked`</td>

<td>调试钩子，响应式依赖被收集时调用</td>

</tr>

<tr>

<td>-</td>

<td>`renderTriggered`</td>

<td>调试钩子，响应式依赖被触发时调用</td>

</tr>

<tr>

<td>-</td>

<td>`serverPrefetch`</td>

<td>`ssr only`，组件实例在服务器上被渲染前调用</td>

</tr>

</tbody>

</table>

1.  **要掌握每个生命周期内部可以做什么事**

*   `beforeCreate` 初始化`vue`实例，进行数据观测。执行时组件实例还未创建，通常用于插件开发中执行一些初始化任务
*   `created` 组件初始化完毕，可以访问各种数据，获取接口数据等
*   `beforeMount` 此阶段`vm.el`虽已完成`DOM`初始化，但并未挂载在`el`选项上
*   `mounted` 实例已经挂载完成，可以进行一些`DOM`操作
*   `beforeUpdate` 更新前，可用于获取更新前各种状态。此时`view`层还未更新，可用于获取更新前各种状态。可以在这个钩子中进一步地更改状态，这不会触发附加的重渲染过程。
*   `updated` 完成`view`层的更新，更新后，所有状态已是最新。可以执行依赖于 `DOM` 的操作。然而在大多数情况下，你应该避免在此期间更改状态，因为这可能会导致更新无限循环。 该钩子在服务器端渲染期间不被调用。
*   `destroyed` 可以执行一些优化操作,清空定时器，解除绑定事件
*   vue3 `beforeunmount`：实例被销毁前调用，可用于一些定时器或订阅的取消
*   vue3 `unmounted`：销毁一个实例。可清理它与其它实例的连接，解绑它的全部指令及事件监听器

![](https://s.poetries.work/gitee/2020/07/61.png)

```html

    <div id="app">{{name}}</div>
    <script>
        const vm = new Vue({
            data(){
                return {name:'poetries'}
            },
            el: '#app',
            beforeCreate(){
                // 数据观测(data observer) 和 event/watcher 事件配置之前被调用。
                console.log('beforeCreate');
            },
            created(){
                // 属性和方法的运算， watch/event 事件回调。这里没有$el
                console.log('created')
            },
            beforeMount(){
                // 相关的 render 函数首次被调用。
                console.log('beforeMount')
            },
            mounted(){
                // 被新创建的 vm.$el 替换
                console.log('mounted')
            },
            beforeUpdate(){
                //  数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁之前。
                console.log('beforeUpdate')
            },
            updated(){
                //  由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。
                console.log('updated')
            },
            beforeDestroy(){
                // 实例销毁之前调用 实例仍然完全可用
                console.log('beforeDestroy')
            },
            destroyed(){ 
                // 所有东西都会解绑定，所有的事件监听器会被移除
                console.log('destroyed')
            }
        });
        setTimeout(() => {
            vm.name = 'poetry';
            setTimeout(() => {
                vm.$destroy()  
            }, 1000);
        }, 1000);
    </script>
```

1.  组合式API生命周期钩子

你可以通过在生命周期钩子前面加上 “`on`” 来访问组件的生命周期钩子。

下表包含如何在 `setup()` 内部调用生命周期钩子：

<table>

<thead>

<tr>

<th>选项式 API</th>

<th>Hook inside setup</th>

</tr>

</thead>

<tbody>

<tr>

<td>`beforeCreate`</td>

<td>不需要*</td>

</tr>

<tr>

<td>`created`</td>

<td>不需要*</td>

</tr>

<tr>

<td>`beforeMount`</td>

<td>`onBeforeMount`</td>

</tr>

<tr>

<td>`mounted`</td>

<td>`onMounted`</td>

</tr>

<tr>

<td>`beforeUpdate`</td>

<td>`onBeforeUpdate`</td>

</tr>

<tr>

<td>`updated`</td>

<td>`onUpdated`</td>

</tr>

<tr>

<td>`beforeUnmount`</td>

<td>`onBeforeUnmount`</td>

</tr>

<tr>

<td>`unmounted`</td>

<td>`onUnmounted`</td>

</tr>

<tr>

<td>`errorCaptured`</td>

<td>`onErrorCaptured`</td>

</tr>

<tr>

<td>`renderTracked`</td>

<td>`onRenderTracked`</td>

</tr>

<tr>

<td>`renderTriggered`</td>

<td>`onRenderTriggered`</td>

</tr>

</tbody>

</table>

> 因为 `setup` 是围绕 `beforeCreate` 和 `created` 生命周期钩子运行的，所以不需要显式地定义它们。换句话说，在这些钩子中编写的任何代码都应该直接在 `setup` 函数中编写

```js

    export default {
      setup() {
        // mounted
        onMounted(() => {
          console.log('Component is mounted!')
        })
      }
    }
```

**`setup`和`created`谁先执行？**

*   `beforeCreate`:组件被创建出来，组件的`methods`和`data`还没初始化好
*   `setup`：在`beforeCreate`和`created`之间执行
*   `created`:组件被创建出来，组件的`methods`和`data`已经初始化好了

> 由于在执行`setup`的时候，`created`还没有创建好，所以在`setup`函数内我们是无法使用`data`和`methods`的。所以`vue`为了让我们避免错误的使用，直接将`setup`函数内的`this`执行指向`undefined`

```js

    import { ref } from "vue"
    export default {
      // setup函数是组合api的入口函数，注意在组合api中定义的变量或者方法，要在template响应式需要return{}出去
      setup(){
        let count = ref(1)
        function myFn(){
          count.value +=1
        }
        return {count,myFn}
      },

    }
```

1.  其他问题

*   **什么是vue生命周期？** Vue 实例从创建到销毁的过程，就是生命周期。从开始创建、初始化数据、编译模板、挂载Dom→渲染、更新→渲染、销毁等一系列过程，称之为 `Vue` 的生命周期。
*   **vue生命周期的作用是什么？** 它的生命周期中有多个事件钩子，让我们在控制整个Vue实例的过程时更容易形成好的逻辑。
*   **vue生命周期总共有几个阶段？** 它可以总共分为`8`个阶段：创建前/后、载入前/后、更新前/后、销毁前/销毁后。
*   **第一次页面加载会触发哪几个钩子？** 会触发下面这几个`beforeCreate`、`created`、`beforeMount`、`mounted` 。
*   **你的接口请求一般放在哪个生命周期中？** 接口请求一般放在`mounted`中，但需要注意的是服务端渲染时不支持`mounted`，需要放到`created`中
*   **DOM 渲染在哪个周期中就已经完成？** 在`mounted`中，
    *   注意 `mounted` 不会承诺所有的子组件也都一起被挂载。如果你希望等到整个视图都渲染完毕，可以用 `vm.$nextTick` 替换掉 `mounted`

    ```js

          mounted: function () {
            this.$nextTick(function () {
                // Code that will run only after the
                // entire view has been rendered
            })
          }

    </div>

###  父组件可以监听到子组件的生命周期吗

比如有父组件 `Parent` 和子组件 `Child`，如果父组件监听到子组件挂载 `mounted` 就做一些逻辑处理，可以通过以下写法实现：

```js

    // Parent.vue
    <Child @mounted="doSomething"/>

    // Child.vue
    mounted() {
      this.$emit("mounted");
    }
```

以上需要手动通过 `$emit` 触发父组件的事件，更简单的方式可以在父组件引用子组件时通过 `@hook` 来监听即可，如下所示：

```js

    //  Parent.vue
    <Child @hook:mounted="doSomething" ></Child>

    doSomething() {
       console.log('父组件监听到 mounted 钩子函数 ...');
    },

    //  Child.vue
    mounted(){
       console.log('子组件触发 mounted 钩子函数 ...');
    },    

    // 以上输出顺序为：
    // 子组件触发 mounted 钩子函数 ...
    // 父组件监听到 mounted 钩子函数 ...     
```

当然 `@hook` 方法不仅仅是可以监听 `mounted`，其它的生命周期事件，例如：`created`，`updated` 等都可以监听

###  Vue生命周期钩子是如何实现的

*   `vue`的生命周期钩子就是回调函数而已，当创建组件实例的过程中会调用对应的钩子方法
*   内部会对钩子函数进行处理，将钩子函数维护成数组的形式

> `Vue` 的生命周期钩子核心实现是利用发布订阅模式先把用户传入的的生命周期钩子订阅好（内部采用数组的方式存储）然后在创建组件实例的过程中会一次执行对应的钩子方法（发布）

```html

    <script>
        // Vue.options 中会存放所有全局属性

        // 会用自身的 + Vue.options 中的属性进行合并
        // Vue.mixin({
        //     beforeCreate() {
        //         console.log('before 0')
        //     },
        // })
        debugger;
        const vm = new Vue({
            el: '#app',
            beforeCreate: [
                function() {
                    console.log('before 1')
                },
                function() {
                    console.log('before 2')
                }
            ]
        });
        console.log(vm);
    </script>
```

相关代码如下

```js

    export function callHook(vm, hook) {
      // 依次执行生命周期对应的方法
      const handlers = vm.$options[hook];
      if (handlers) {
        for (let i = 0; i < handlers.length; i++) {
          handlers[i].call(vm); //生命周期里面的this指向当前实例
        }
      }
    }

    // 调用的时候
    Vue.prototype._init = function (options) {
      const vm = this;
      vm.$options = mergeOptions(vm.constructor.options, options);
      callHook(vm, "beforeCreate"); //初始化数据之前
      // 初始化状态
      initState(vm);
      callHook(vm, "created"); //初始化数据之后
      if (vm.$options.el) {
        vm.$mount(vm.$options.el);
      }
    };

    // 销毁实例实现
    Vue.prototype.$destory = function() {
    	 // 触发钩子
        callHook(vm, 'beforeDestory')
        // 自身及子节点
        remove() 
        // 删除依赖
        watcher.teardown() 
        // 删除监听
        vm.$off() 
        // 触发钩子
        callHook(vm, 'destoryed')
    }
```

**原理流程图**

![](https://s.poetries.work/uploads/2022/08/11e0dfbc20b273d4.png)

###  Vue 的父子组件生命周期钩子函数执行顺序

*   **渲染顺序**：先父后子，完成顺序：先子后父
*   **更新顺序**：父更新导致子更新，子更新完成后父
*   **销毁顺序**：先父后子，完成顺序：先子后父

**加载渲染过程**

父 `beforeCreate`->父 `created`->父 `beforeMount`->子 `beforeCreate`->子 `created`->子 `beforeMount`->子 `mounted`->父 `mounted`。**子组件先挂载，然后到父组件**

**子组件更新过程**

父 `beforeUpdate`->子 `beforeUpdate`->子 `updated`->父 `updated`

**父组件更新过程**

父 `beforeUpdate`->父 `updated`

**销毁过程**

父 `beforeDestroy`->子 `beforeDestroy`->子 `destroyed`->父 `destroyed`

> 之所以会这样是因为`Vue`创建过程是一个递归过程，先创建父组件，有子组件就会创建子组件，因此创建时先有父组件再有子组件；子组件首次创建时会添加`mounted`钩子到队列，等到`patch`结束再执行它们，可见子组件的`mounted`钩子是先进入到队列中的，因此等到`patch`结束执行这些钩子时也先执行。

![](https://s.poetries.work/uploads/2022/08/c0e24e4114c32a12.png)

```js

    function patch (oldVnode, vnode, hydrating, removeOnly) { 
        if (isUndef(vnode)) { 
          if (isDef(oldVnode)) invokeDestroyHook(oldVnode) return 
        }
        let isInitialPatch = false 
        const insertedVnodeQueue = [] // 定义收集所有组件的insert hook方法的数组 // somthing ... 
        createElm( 
            vnode, 
            insertedVnodeQueue, oldElm._leaveCb ? null : parentElm, 
            nodeOps.nextSibling(oldElm) 
        )// somthing... 
        // 最终会依次调用收集的insert hook 
        invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
        return vnode.elm
    }

    function createElm ( vnode, insertedVnodeQueue, parentElm, refElm, nested, ownerArray, index ) { 
        // createChildren 会递归创建儿子组件 
        createChildren(vnode, children, insertedVnodeQueue) // something... 
    } 
    // 将组件的vnode插入到数组中 
    function invokeCreateHooks (vnode, insertedVnodeQueue) { 
        for (let i = 0; i < cbs.create.length; ++i) { 
            cbs.create[i](emptyNode, vnode) 
        }
        i = vnode.data.hook // Reuse variable 
        if (isDef(i)) { 
            if (isDef(i.create)) i.create(emptyNode, vnode) 
            if (isDef(i.insert)) insertedVnodeQueue.push(vnode) 
        } 
    } 
    // insert方法中会依次调用mounted方法 
    insert (vnode: MountedComponentVNode) { 
        const { context, componentInstance } = vnode 
        if (!componentInstance._isMounted) { 
            componentInstance._isMounted = true 
            callHook(componentInstance, 'mounted') 
        } 
    }
    function invokeInsertHook (vnode, queue, initial) { 
        // delay insert hooks for component root nodes, invoke them after the // element is really inserted 
        if (isTrue(initial) && isDef(vnode.parent)) { 
            vnode.parent.data.pendingInsert = queue 
        } else { 
            for (let i = 0; i < queue.length; ++i) { 
                queue[i].data.hook.insert(queue[i]); // 调用insert方法 
            } 
        } 
    }

    Vue.prototype.$destroy = function () { 
        callHook(vm, 'beforeDestroy') 
        // invoke destroy hooks on current rendered tree 
        vm.__patch__(vm._vnode, null) // 先销毁儿子 
        // fire destroyed hook 
        callHook(vm, 'destroyed') 
    }
```

##  11 Vue.mixin的使用场景和原理

*   在日常的开发中，我们经常会遇到在不同的组件中经常会需要用到一些相同或者相似的代码，这些代码的功能相对独立，可以通过 `Vue` 的 `mixin` 功能抽离公共的业务逻辑，原理类似“对象的继承”，当组件初始化时会调用 `mergeOptions` 方法进行合并，采用策略模式针对不同的属性进行合并。当组件和混入对象含有同名选项时，这些选项将以恰当的方式进行“合并”；如果混入的数据和本身组件的数据冲突，会以组件的数据为准
*   `mixin`有很多缺陷如：命名冲突、依赖问题、数据来源问题

基本使用

```html

    <script>
        // Vue.options
        Vue.mixin({ // 如果他是对象 每个组件都用mixin里的对象进行合并
            data(){
                return {a: 1,b: 2}
            }
        });
        // Vue.extend
        Vue.component('my',{ // 组件必须是函数 Vue.extend  => render(xxx)
            data(){
                return {x:1}
            }
        }) 
        // 没有 new 没有实例  _init()
        // const vm = this
        new Vue({
            el:'#app',
            data(){ // 根可以不是函数 
                return {c:3}
            }
        })
    </script>
```

相关源码

```js

    export default function initMixin(Vue){
      Vue.mixin = function (mixin) {
        //   合并对象
          this.options=mergeOptions(this.options,mixin)
      };
    }
    };

    // src/util/index.js
    // 定义生命周期
    export const LIFECYCLE_HOOKS = [
      "beforeCreate",
      "created",
      "beforeMount",
      "mounted",
      "beforeUpdate",
      "updated",
      "beforeDestroy",
      "destroyed",
    ];

    // 合并策略
    const strats = {};
    // mixin核心方法
    export function mergeOptions(parent, child) {
      const options = {};
      // 遍历父亲
      for (let k in parent) {
        mergeFiled(k);
      }
      // 父亲没有 儿子有
      for (let k in child) {
        if (!parent.hasOwnProperty(k)) {
          mergeFiled(k);
        }
      }

      //真正合并字段方法
      function mergeFiled(k) {
        // strats合并策略
        if (strats[k]) {
          options[k] = strats[k](parent[k], child[k]);
        } else {
          // 默认策略
          options[k] = child[k] ? child[k] : parent[k];
        }
      }
      return options;
    }
```

##  12 Vue组件data为什么必须是个函数？

*   **根实例对象`data`可以是对象也可以是函数**（根实例是单例），不会产生数据污染情况
*   **组件实例对象`data`必须为函数** `.vue`文件在使用的时候实际上会转换成一个`class`，一个组件被复用多次的话，也就会创建多个实例。本质上，这些实例用的都是同一个构造函数。如果`data`是对象的话，对象属于引用类型，会影响到所有的实例。所以为了保证组件在不同的实例之间`data`不冲突，`data`必须是一个函数，

**简版理解**

```js

    // 1.组件的渲染流程 调用Vue.component -> Vue.extend -> 子类 -> new 子类
    // Vue.extend 根据用户定义产生一个新的类
    function Vue() {}
    function Sub() { // 会将data存起来
        this.data = this.constructor.options.data();
    }
    Vue.extend = function(options) {
        Sub.options = options; // 静态属性
        return Sub;
    }
    let Child = Vue.extend({
        data:()=>( { name: 'test' })
    });

    // 两个组件就是两个实例, 希望数据互不感染
    let child1 = new Child();
    let child2 = new Child();

    console.log(child1.data.name);
    child1.data.name = 'poetry';
    console.log(child2.data.name);

    // 根不需要 任何的合并操作   根才有vm属性 所以他可以是函数和对象  但是组件mixin他们都没有vm 所以我就可以判断 当前data是不是个函数
```

**相关源码**

```js

    // 源码位置 src/core/global-api/extend.js
    export function initExtend (Vue: GlobalAPI) {
      Vue.extend = function (extendOptions: Object): Function {
        extendOptions = extendOptions || {}
        const Super = this
        const SuperId = Super.cid
        const cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {})
        if (cachedCtors[SuperId]) {
          return cachedCtors[SuperId]
        }

        const name = extendOptions.name || Super.options.name
        if (process.env.NODE_ENV !== 'production' && name) {
          validateComponentName(name)
        }

        const Sub = function VueComponent (options) {
          this._init(options)
        }
        // 子类继承大Vue父类的原型
        Sub.prototype = Object.create(Super.prototype)
        Sub.prototype.constructor = Sub
        Sub.cid = cid++
        Sub.options = mergeOptions(
          Super.options,
          extendOptions
        )
        Sub['super'] = Super

        // For props and computed properties, we define the proxy getters on
        // the Vue instances at extension time, on the extended prototype. This
        // avoids Object.defineProperty calls for each instance created.
        if (Sub.options.props) {
          initProps(Sub)
        }
        if (Sub.options.computed) {
          initComputed(Sub)
        }

        // allow further extension/mixin/plugin usage
        Sub.extend = Super.extend
        Sub.mixin = Super.mixin
        Sub.use = Super.use

        // create asset registers, so extended classes
        // can have their private assets too.
        ASSET_TYPES.forEach(function (type) {
          Sub[type] = Super[type]
        })
        // enable recursive self-lookup
        if (name) { 
          Sub.options.components[name] = Sub // 记录自己 在组件中递归自己  -> jsx
        }

        // keep a reference to the super options at extension time.
        // later at instantiation we can check if Super's options have
        // been updated.
        Sub.superOptions = Super.options
        Sub.extendOptions = extendOptions
        Sub.sealedOptions = extend({}, Sub.options)

        // cache constructor
        cachedCtors[SuperId] = Sub
        return Sub
      }
    }
```

##  13 nextTick在哪里使用？原理是？

*   `nextTick` 中的回调是在下次 `DOM` 更新循环结束之后执行延迟回调，用于获得更新后的 `DOM`
*   在修改数据之后立即使用这个方法，获取更新后的 `DOM`
*   主要思路就是采用`微任务优先`的方式调用异步方法去执行 `nextTick` 包装的方法

> `nextTick` 方法主要是使用了宏任务和微任务,定义了一个异步方法.多次调用 `nextTick` 会将方法存入队列中，通过这个异步方法清空当前队列。所以这个 `nextTick` 方法就是异步方法

**根据执行环境分别尝试采用**

*   先采用`Promise`
*   `Promise`不支持，再采用`MutationObserver`
*   `MutationObserver`不支持，再采用`setImmediate`
*   如果以上都不行则采用`setTimeout`
*   最后执行`flushCallbacks`，把`callbacks`里面的数据依次执行

![](https://s.poetries.work/uploads/2022/08/dbe8ffb2bbf12d38.png)


回答范例

1.  `nextTick` 中的回调是在下次 `DOM` 更新循环结束之后执行延迟回调，用于获得更新后的 `DOM`
2.  `Vue`有个异步更新策略，意思是如果数据变化，`Vue`不会立刻更新DOM，而是开启一个队列，把组件更新函数保存在队列中，在同一事件循环中发生的所有数据变更会异步的批量更新。这一策略导致我们对数据的修改不会立刻体现在DOM上，此时如果想要获取更新后的DOM状态，就需要使用`nextTick`
3.  开发时，有两个场景我们会用到`nextTick`

*   `created`中想要获取`DOM`时
*   响应式数据变化后获取`DOM`更新后的状态，比如希望获取列表更新后的高度

1.  `nextTick`签名如下：`function nextTick(callback?: () => void): Promise<void>`

所以我们只需要在传入的回调函数中访问最新DOM状态即可，或者我们可以`await nextTick()`方法返回的`Promise`之后做这件事

1.  在`Vue`内部，`nextTick`之所以能够让我们看到DOM更新后的结果，是因为我们传入的`callback`会被添加到队列刷新函数(`flushSchedulerQueue`)的后面，这样等队列内部的更新函数都执行完毕，所有DOM操作也就结束了，`callback`自然能够获取到最新的DOM值
```

基本使用

```js

    const vm = new Vue({
        el: '#app',
        data() {
            return { a: 1 }
        }
    }); 

    // vm.$nextTick(() => {// [nextTick回调函数fn,内部更新flushSchedulerQueue]
    //     console.log(vm.$el.innerHTML)
    // })

    // 是将内容维护到一个数组里，最终按照顺序顺序。 第一次会开启一个异步任务

    vm.a = 'test'; // 修改了数据后并不会马上更新视图
    vm.$nextTick(() => {// [nextTick回调函数fn,内部更新flushSchedulerQueue]
        console.log(vm.$el.innerHTML)
    })

    // nextTick中的方法会被放到 更新页面watcher的后面去
```

相关代码如下

![](https://s.poetries.work/uploads/2022/08/336264b6b10bd324.png)

```js

    // src/core/utils/nextTick
    let callbacks = [];
    let pending = false;
    function flushCallbacks() {
      pending = false; //把标志还原为false
      // 依次执行回调
      for (let i = 0; i < callbacks.length; i++) {
        callbacks[i]();
      }
    }
    let timerFunc; //定义异步方法  采用优雅降级
    if (typeof Promise !== "undefined") {
      // 如果支持promise
      const p = Promise.resolve();
      timerFunc = () => {
        p.then(flushCallbacks);
      };
    } else if (typeof MutationObserver !== "undefined") {
      // MutationObserver 主要是监听dom变化 也是一个异步方法
      let counter = 1;
      const observer = new MutationObserver(flushCallbacks);
      const textNode = document.createTextNode(String(counter));
      observer.observe(textNode, {
        characterData: true,
      });
      timerFunc = () => {
        counter = (counter + 1) % 2;
        textNode.data = String(counter);
      };
    } else if (typeof setImmediate !== "undefined") {
      // 如果前面都不支持 判断setImmediate
      timerFunc = () => {
        setImmediate(flushCallbacks);
      };
    } else {
      // 最后降级采用setTimeout
      timerFunc = () => {
        setTimeout(flushCallbacks, 0);
      };
    }

    export function nextTick(cb) {
      // 除了渲染watcher  还有用户自己手动调用的nextTick 一起被收集到数组
      callbacks.push(cb);
      if (!pending) {
        // 如果多次调用nextTick  只会执行一次异步 等异步队列清空之后再把标志变为false
        pending = true;
        timerFunc();
      }
    }
```

数据更新的时候内部会调用`nextTick`

```js

    // src/core/observer/scheduler.js

    export function queueWatcher (watcher: Watcher) {
      const id = watcher.id
      if (has[id] == null) {
        has[id] = true
        if (!flushing) {
          queue.push(watcher)
        } else {
          // if already flushing, splice the watcher based on its id
          // if already past its id, it will be run next immediately.
          let i = queue.length - 1
          while (i > index && queue[i].id > watcher.id) {
            i--
          }
          queue.splice(i + 1, 0, watcher)
        }
        // queue the flush
        if (!waiting) {
          waiting = true

          if (process.env.NODE_ENV !== 'production' && !config.async) {
            flushSchedulerQueue()
            return
          }
          // 把更新方法放到数组中维护[nextTick回调函数,更新函数flushSchedulerQueue]
          /**
           * vm.a = 'test'; // 修改了数据后并不会马上更新视图
            vm.$nextTick(() => {// [fn,更新]
                console.log(vm.$el.innerHTML)
            })
           */
          nextTick(flushSchedulerQueue)
        }
      }
    }
```

##  14 computed和watch相关

###  computed和watch区别

1.  当页面中有某些数据依赖其他数据进行变动的时候，可以使用计算属性`computed`

> `Computed`本质是一个具备缓存的`watcher`，依赖的属性发生变化就会更新视图。 适用于计算比较消耗性能的计算场景。当表达式过于复杂时，在模板中放入过多逻辑会让模板难以维护，可以将复杂的逻辑放入计算属性中处理

![](https://s.poetries.work/gitee/2020/01/25.png)

```jsx

    <template>{{fullName}}</template>
    export default {
        data(){
            return {
                firstName: 'zhang',
                lastName: 'san',
            }
        },
        computed:{
            fullName: function(){
                return this.firstName + ' ' + this.lastName
            }
        }
    }
```

1.  `watch`用于观察和监听页面上的vue实例，如果要在数据变化的同时进行异步操作或者是比较大的开销，那么`watch`为最佳选择

> `Watch`没有缓存性，更多的是观察的作用，可以监听某些数据执行回调。当我们需要深度监听对象中的属性时，可以打开`deep：true`选项，这样便会对对象中的每一项进行监听。这样会带来性能问题，优化的话可以使用字符串形式监听，如果没有写到组件中，不要忘记使用`unWatch`手动注销

![](https://s.poetries.work/gitee/2020/01/26.png)

```js

    <template>{{fullName}}</template>
    export default {
        data(){
            return {
                firstName: 'zhang',
                lastName: 'san',
                fullName: 'zhang san'
            }
        },
        watch:{
            firstName(val) {
                this.fullName = val + ' ' + this.lastName
            },
            lastName(val) {
                this.fullName = this.firstName + ' ' + val
            }
        }
    }
```

**computed:**

*   `computed`是计算属性,也就是计算值,它更多用于计算值的场景
*   `computed`具有缓存性,`computed`的值在`getter`执行后是会缓存的，只有在它依赖的属性值改变之后，下一次获取`computed`的值时才会重新调用对应的`getter`来计算
*   `computed`适用于计算比较消耗性能的计算场景

**watch:**

*   更多的是「观察」的作用,类似于某些数据的监听回调,用于观察`props` `$emit`或者本组件的值,当数据变化时来执行回调进行后续操作
*   无缓存性，页面重新渲染时值不变化也会执行

**小结:**

*   `computed`和`watch`都是基于`watcher`来实现的
*   `computed`属性是具备缓存的，依赖的值不发生变化，对其取值时计算属性方法不会重新执行
*   `watch`是监控值的变化，当值发生变化时调用其对应的回调函数
*   当我们要进行数值计算,而且依赖于其他数据，那么把这个数据设计为`computed`
*   如果你需要在某个数据变化时做一些事情，使用`watch`来观察这个数据变化

>回答范例

**思路分析**

*   先看`computed`, `watch`两者定义，列举使用上的差异
*   列举使用场景上的差异，如何选择
*   使用细节、注意事项
*   `vue3`变化

`computed`特点：具有响应式的返回值

```js

    const count = ref(1)
    const plusOne = computed(() => count.value + 1)
```

`watch`特点：侦测变化，执行回调

```js

    const state = reactive({ count: 0 })
    watch(
      () => state.count,
      (count, prevCount) => {
        /* ... */
      }
    )
```

**回答范例**

1.  计算属性可以从组件数据派生出新数据，最常见的使用方式是设置一个函数，返回计算之后的结果，`computed`和`methods`的差异是它具备缓存性，如果依赖项不变时不会重新计算。侦听器可以侦测某个响应式数据的变化并执行副作用，常见用法是传递一个函数，执行副作用，watch没有返回值，但可以执行异步操作等复杂逻辑
2.  计算属性常用场景是简化行内模板中的复杂表达式，模板中出现太多逻辑会是模板变得臃肿不易维护。侦听器常用场景是状态变化之后做一些额外的DOM操作或者异步操作。选择采用何用方案时首先看是否需要派生出新值，基本能用计算属性实现的方式首选计算属性.
3.  使用过程中有一些细节，比如计算属性也是可以传递对象，成为既可读又可写的计算属性。`watch`可以传递对象，设置`deep`、`immediate`等选项
4.  `vue3`中`watch`选项发生了一些变化，例如不再能侦测一个点操作符之外的字符串形式的表达式； `reactivity API`中新出现了`watch`、`watchEffect`可以完全替代目前的`watch`选项，且功能更加强大
```

基本使用

```js

    // src/core/observer:45;

    // 渲染watcher  /  computed watcher  /  watch
    const vm = new Vue({
        el: '#app',
        data: {
            firstname:'张',
            lastname:'三'
        },
        computed:{ // watcher  =>   firstname lastname
            // computed 只有取值时才执行

            // Object.defineProperty .get
            fullName(){ // firstName lastName 会收集fullName计算属性
                return this.firstname + this.lastname
            }
        },
        watch:{
            firstname(newVal,oldVal){
                console.log(newVal)
            }
        }
    });

    setTimeout(() => {
        debugger;
        vm.firstname = '赵'
    }, 1000);
```

相关源码

```js

    // 初始化state
    function initState (vm: Component) {
      vm._watchers = []
      const opts = vm.$options
      if (opts.props) initProps(vm, opts.props)
      if (opts.methods) initMethods(vm, opts.methods)
      if (opts.data) {
        initData(vm)
      } else {
        observe(vm._data = {}, true /* asRootData */)
      }

      // 初始化计算属性
      if (opts.computed) initComputed(vm, opts.computed) 

      // 初始化watch
      if (opts.watch && opts.watch !== nativeWatch) { 
        initWatch(vm, opts.watch)
      }
    }

    // 计算属性取值函数
    function createComputedGetter (key) {
      return function computedGetter () {
        const watcher = this._computedWatchers && this._computedWatchers[key]
        if (watcher) {
          if (watcher.dirty) { // 如果值依赖的值发生变化，就会进行重新求值
            watcher.evaluate(); // this.firstname lastname
          }
          if (Dep.target) { // 让计算属性所依赖的属性 收集渲染watcher
            watcher.depend()
          }
          return watcher.value
        }
      }
    }

    // watch的实现
    Vue.prototype.$watch = function (
        expOrFn: string | Function,
        cb: any,
        options?: Object
      ): Function {
        const vm: Component = this
        debugger;
        if (isPlainObject(cb)) {
          return createWatcher(vm, expOrFn, cb, options)
        }
        options = options || {}
        options.user = true
        const watcher = new Watcher(vm, expOrFn, cb, options) // 创建watcher，数据更新调用cb
        if (options.immediate) {
          try {
            cb.call(vm, watcher.value)
          } catch (error) {
            handleError(error, vm, `callback for immediate watcher "${watcher.expression}"`)
          }
        }
        return function unwatchFn () {
          watcher.teardown()
        }
    }
```

![](https://s.poetries.work/uploads/2022/08/a263c317b0cb2793.png)

###  vue3中 watch、watchEffect区别

*   `watch`是惰性执行，也就是只有监听的值发生变化的时候才会执行，但是`watchEffect`不同，每次代码加载`watchEffect`都会执行（忽略`watch`第三个参数的配置，如果修改配置项也可以实现立即执行）
*   `watch`需要传递监听的对象，`watchEffect`不需要
*   `watch`只能监听响应式数据：`ref`定义的属性和`reactive`定义的对象，如果直接监听`reactive`定义对象中的属性是不允许的（会报警告），除非使用函数转换一下。其实就是官网上说的监听一个`getter`
*   `watchEffect`如果监听`reactive`定义的对象是不起作用的，只能监听对象中的属性

看一下`watchEffect`的代码

```html

    <template>
    <div>
      请输入firstName：
      <input type="text" v-model="firstName">
    </div>
    <div>
      请输入lastName：
      <input type="text" v-model="lastName">
    </div>
    <div>
      请输入obj.text：
      <input type="text" v-model="obj.text">
    </div>
     <div>
     【obj.text】 {{obj.text}}
     </div>
    </template>

    <script>
    import {ref, reactive, watch, watchEffect} from 'vue'
    export default {
      name: "HelloWorld",
      props: {
        msg: String,
      },
      setup(props,content){
        let firstName = ref('')
        let lastName = ref('')
        let obj= reactive({
          text:'hello'
        })
        watchEffect(()=>{
          console.log('触发了watchEffect');
          console.log(`组合后的名称为：${firstName.value} ${lastName.value}`)
        })
        return{
          obj,
          firstName,
          lastName
        }
      }
    };
    </script>
```

![](https://s.poetries.work/uploads/2022/08/99d5a09b368aeaa7.png) ![](https://s.poetries.work/uploads/2022/08/c098258e10bbeccf.png)

改造一下代码

```js

    watchEffect(()=>{
      console.log('触发了watchEffect');
      // 这里我们不使用firstName.value/lastName.value ，相当于是监控整个ref,对应第四点上面的结论
      console.log(`组合后的名称为：${firstName} ${lastName}`)
    })
```

![](https://s.poetries.work/uploads/2022/08/41a0ee2dc000ecc3.png)

```js

    watchEffect(()=>{
      console.log('触发了watchEffect');
      console.log(obj);
    })
```

![](https://s.poetries.work/uploads/2022/08/0277951e96a40117.png)

稍微改造一下

```js

    let obj = reactive({
      text:'hello'
    })
    watchEffect(()=>{
      console.log('触发了watchEffect');
      console.log(obj.text);
    })
```

![](https://s.poetries.work/uploads/2022/08/f959357382b9935a.png)

**再看一下watch的代码，验证一下**

```js

    let obj= reactive({
      text:'hello'
    })
    // watch是惰性执行， 默认初始化之后不会执行，只有值有变化才会触发，可通过配置参数实现默认执行
    watch(obj, (newValue, oldValue) => {
      // 回调函数
      console.log('触发监控更新了new',  newValue);
      console.log('触发监控更新了old',  oldValue);
    },{
      // 配置immediate参数，立即执行，以及深层次监听
      immediate: true,
      deep: true
    })
```

![](https://s.poetries.work/uploads/2022/08/c5ec33f5f3b8b6a1.png)

*   监控整个`reactive`对象，从上面的图可以看到 `deep` 实际默认是开启的，就算我们设置为`false`也还是无效。而且旧值获取不到。
*   要获取旧值则需要监控对象的属性，也就是监听一个`getter`，看下图

![](https://s.poetries.work/uploads/2022/08/f3bbb272dee1d73c.png) ![](https://s.poetries.work/uploads/2022/08/6a6bba3d39dbdc6f.png)

**总结**

*   如果定义了`reactive`的数据，想去使用`watch`监听数据改变，则无法正确获取旧值，并且`deep`属性配置无效，自动强制开启了深层次监听。
*   如果使用 `ref` 初始化一个对象或者数组类型的数据，会被自动转成`reactive`的实现方式，生成`proxy`代理对象。也会变得无法正确取旧值。
*   用任何方式生成的数据，如果接收的变量是一个`proxy`代理对象，就都会导致`watch`这个对象时,`watch`回调里无法正确获取旧值。
*   所以当大家使用`watch`监听对象时，如果在不需要使用旧值的情况，可以正常监听对象没关系；但是如果当监听改变函数里面需要用到旧值时，只能监听 对象.xxx`属性 的方式才行


>watch和watchEffect异同总结

**体验**

`watchEffect`立即运行一个函数，然后被动地追踪它的依赖，当这些依赖改变时重新执行该函数

```js

    const count = ref(0)
    ​
    watchEffect(() => console.log(count.value))
    // -> logs 0
    ​
    count.value++
    // -> logs 1
```

`watch`侦测一个或多个响应式数据源并在数据源变化时调用一个回调函数

```js

    const state = reactive({ count: 0 })
    watch(
      () => state.count,
      (count, prevCount) => {
        /* ... */
      }
    )
```

**回答范例**

1.  `watchEffect`立即运行一个函数，然后被动地追踪它的依赖，当这些依赖改变时重新执行该函数。`watch`侦测一个或多个响应式数据源并在数据源变化时调用一个回调函数
2.  `watchEffect(effect)`是一种特殊`watch`，传入的函数既是依赖收集的数据源，也是回调函数。如果我们不关心响应式数据变化前后的值，只是想拿这些数据做些事情，那么`watchEffect`就是我们需要的。`watch`更底层，可以接收多种数据源，包括用于依赖收集的`getter`函数，因此它完全可以实现`watchEffect`的功能，同时由于可以指定`getter`函数，依赖可以控制的更精确，还能获取数据变化前后的值，因此如果需要这些时我们会使用`watch`
3.  `watchEffect`在使用时，传入的函数会立刻执行一次。`watch`默认情况下并不会执行回调函数，除非我们手动设置`immediate`选项
4.  从实现上来说，`watchEffect(fn)`相当于`watch(fn,fn,{immediate:true})`

`watchEffect`定义如下

```js

    export function watchEffect(
      effect: WatchEffect,
      options?: WatchOptionsBase
    ): WatchStopHandle {
      return doWatch(effect, null, options)
    }
```

`watch`定义如下

```js

    export function watch<T = any, Immediate extends Readonly<boolean> = false>(
      source: T | WatchSource<T>,
      cb: any,
      options?: WatchOptions<Immediate>
    ): WatchStopHandle {
      return doWatch(source as any, cb, options)
    }
```

很明显`watchEffect`就是一种特殊的`watch`实现。
```

###  Watch中的deep:true是如何实现的

> 当用户指定了 `watch` 中的deep属性为 `true` 时，如果当前监控的值是数组类型。会对对象中的每一项进行求值，此时会将当前 `watcher`存入到对应属性的依赖中，这样数组中对象发生变化时也会通知数据更新

**源码相关**

```js

    get () { 
        pushTarget(this) // 先将当前依赖放到 Dep.target上 
        let value 
        const vm = this.vm 
        try { 
            value = this.getter.call(vm, vm) 
        } catch (e) { 
            if (this.user) { 
                handleError(e, vm, `getter for watcher "${this.expression}"`) 
            } else { 
                throw e 
            } 
        } finally { 
            if (this.deep) { // 如果需要深度监控 
            traverse(value) // 会对对象中的每一项取值,取值时会执行对应的get方法 
        }
        popTarget() 
    }
```

###  Vue computed 实现

*   建立与其他属性（如：`data`、 `Store`）的联系；
*   属性改变后，通知计算属性重新计算

> 实现时，主要如下

*   初始化 `data`， 使用 `Object.defineProperty` 把这些属性全部转为 `getter/setter`。
*   初始化 `computed`, 遍历 `computed` 里的每个属性，每个 `computed` 属性都是一个 `watch` 实例。每个属性提供的函数作为属性的 `getter`，使用 `Object.defineProperty` 转化。
*   `Object.defineProperty getter` 依赖收集。用于依赖发生变化时，触发属性重新计算。
*   若出现当前 `computed` 计算属性嵌套其他 `computed` 计算属性时，先进行其他的依赖收集

###  watch 原理

`watch` 本质上是为每个监听属性 `setter` 创建了一个 `watcher`，当被监听的属性更新时，调用传入的回调函数。常见的配置选项有 `deep` 和 `immediate`，对应原理如下

*   `deep`：深度监听对象，为对象的每一个属性创建一个 `watcher`，从而确保对象的每一个属性更新时都会触发传入的回调函数。主要原因在于对象属于引用类型，单个属性的更新并不会触发对象 `setter`，因此引入 `deep` 能够很好地解决监听对象的问题。同时也会引入判断机制，确保在多个属性更新时回调函数仅触发一次，避免性能浪费。
*   `immediate`：在初始化时直接调用回调函数，可以通过在 `created` 阶段手动调用回调函数实现相同的效果

##  15 Vue.set的实现原理

*   给对象和数组本身都增加了`dep`属性
*   当给对象新增不存在的属性则触发对象依赖的`watcher`去更新
*   当修改数组索引时，我们调用数组本身的`splice`去更新数组（数组的响应式原理就是重新了`splice`等方法，调用`splice`就会触发视图更新）

**基本使用**

> 以下方法调用会改变原始数组：`push()`, `pop()`, `shift()`, `unshift()`, `splice()`, `sort()`, `reverse()`,`Vue.set( target, key, value )`

*   调用方法：`Vue.set(target, key, value )`
    *   `target`：要更改的数据源(可以是对象或者数组)
    *   `key`：要更改的具体数据
    *   `value` ：重新赋的值

```html

    <div id="app">{{user.name}} {{user.age}}</div>
    <div id="app"></div>
    <script>
        // 1\. 依赖收集的特点：给每个属性都增加一个dep属性，dep属性会进行收集，收集的是watcher
        // 2\. vue会给每个对象也增加一个dep属性
        const vm = new Vue({
            el: '#app',
            data: { // vm._data  
                user: {name:'poetry'}
            }
        });
        // 对象的话：调用defineReactive在user对象上定义一个age属性，增加到响应式数据中，触发对象本身的watcher，ob.dep.notify()更新 
        // 如果是数组 通过调用 splice方法，触发视图更新
        vm.$set(vm.user, 'age', 20); // 不能给根属性添加，因为给根添加属性 性能消耗太大，需要做很多处理

        // 修改肯定是同步的 -> 更新都是一步的  queuewatcher
    </script>
```

**相关源码**

```js

    // src/core/observer/index.js 44
    export class Observer { // new Observer(value)
      value: any;
      dep: Dep;
      vmCount: number; // number of vms that have this object as root $data

      constructor (value: any) {
        this.value = value
        this.dep = new Dep() // 给所有对象类型增加dep属性
      }
    }
```

```js

    // src/core/observer/index.js 201
    export function set (target: Array<any> | Object, key: any, val: any): any {
      // 1.是开发环境 target 没定义或者是基础类型则报错
      if (process.env.NODE_ENV !== 'production' &&
        (isUndef(target) || isPrimitive(target))
      ) {
        warn(`Cannot set reactive property on undefined, null, or primitive value: ${(target: any)}`)
      }
      // 2.如果是数组 Vue.set(array,1,100); 调用我们重写的splice方法 (这样可以更新视图)
      if (Array.isArray(target) && isValidArrayIndex(key)) {
        target.length = Math.max(target.length, key)
        // 利用数组的splice变异方法触发响应式  
        target.splice(key, 1, val)
        return val
      }
      // 3.如果是对象本身的属性，则直接添加即可
      if (key in target && !(key in Object.prototype)) {
        target[key] = val // 直接修改属性值  
        return val
      }
      // 4.如果是Vue实例 或 根数据data时 报错,（更新_data 无意义）
      const ob = (target: any).__ob__
      if (target._isVue || (ob && ob.vmCount)) {
        process.env.NODE_ENV !== 'production' && warn(
          'Avoid adding reactive properties to a Vue instance or its root $data ' +
          'at runtime - declare it upfront in the data option.'
        )
        return val
      }
      // 5.如果不是响应式的也不需要将其定义成响应式属性
      if (!ob) {
        target[key] = val
        return val
      }
      // 6.将属性定义成响应式的
      defineReactive(ob.value, key, val)
      // 通知视图更新
      ob.dep.notify()
      return val
    }
```

**我们阅读以上源码可知，vm.$set 的实现原理是：**

*   **如果目标是数组**，直接使用数组的 `splice` 方法触发响应式；
*   **如果目标是对象**，会先判读属性是否存在、对象是否是响应式，最终如果要对属性进行响应式处理，则是通过调用 `defineReactive` 方法进行响应式处理（ `defineReactive` 方法就是 `Vue` 在初始化对象时，给对象属性采用 `Object.defineProperty` 动态添加 `getter` 和 `setter` 的功能所调用的方法）

##  16 Vue diff算法相关问题

###  Vue为什么需要虚拟DOM？优缺点有哪些

> 由于在浏览器中操作 `DOM` 是很昂贵的。频繁的操作 `DOM`，会产生一定的性能问题。这就是虚拟 `Dom` 的产生原因。`Vue2` 的 `Virtual DOM` 借鉴了开源库 `snabbdom` 的实现。`Virtual DOM` 本质就是用一个原生的 `JS` 对象去描述一个 `DOM` 节点，是对真实 `DOM` 的一层抽象

**优点：**

*   **保证性能下限**： 框架的虚拟 `DOM` 需要适配任何上层 `API` 可能产生的操作，它的一些 `DOM` 操作的实现必须是普适的，所以它的性能并不是最优的；但是比起粗暴的 `DOM` 操作性能要好很多，因此框架的虚拟 `DOM` 至少可以保证在你不需要手动优化的情况下，依然可以提供还不错的性能，即保证性能的下限；
*   **无需手动操作 DOM**： 我们不再需要手动去操作 `DOM`，只需要写好 `View-Model` 的代码逻辑，框架会根据虚拟 `DOM` 和 数据双向绑定，帮我们以可预期的方式更新视图，极大提高我们的开发效率；
*   **跨平台**： 虚拟 `DOM` 本质上是 `JavaScript` 对象,而 `DOM` 与平台强相关，相比之下虚拟 `DOM` 可以进行更方便地跨平台操作，例如服务器渲染、`weex` 开发等等。

**缺点:**

*   无法进行极致优化：虽然虚拟 `DOM` + 合理的优化，足以应对绝大部分应用的性能需求，但在一些性能要求极高的应用中虚拟 `DOM` 无法进行针对性的极致优化。
*   首次渲染大量`DOM`时，由于多了一层虚拟 `DOM` 的计算，会比 `innerHTML` 插入慢。

**虚拟 DOM 实现原理？**

虚拟 `DOM` 的实现原理主要包括以下 `3` 部分：

*   用 `JavaScript` 对象模拟真实 `DOM` 树，对真实 `DOM` 进行抽象；
*   `diff` 算法 — 比较两棵虚拟 `DOM` 树的差异；
*   `pach` 算法 — 将两个虚拟 `DOM` 对象的差异应用到真正的 `DOM` 树。


>说说你对虚拟 DOM 的理解？回答范例

**思路**

*   `vdom`是什么
*   引入`vdom`的好处
*   `vdom`如何生成，又如何成为`dom`
*   在后续的`diff`中的作用

**回答范例**

1.  虚拟`dom`顾名思义就是虚拟的`dom`对象，它本身就是一个 `JavaScript` 对象，只不过它是通过不同的属性去描述一个视图结构
2.  通过引入`vdom`我们可以获得如下好处：

*   **将真实元素节点抽象成 `VNode`，有效减少直接操作 `dom` 次数，从而提高程序性能**
    *   直接操作 `dom` 是有限制的，比如：`diff`、`clone` 等操作，一个真实元素上有许多的内容，如果直接对其进行 `diff` 操作，会去额外 `diff` 一些没有必要的内容；同样的，如果需要进行 `clone` 那么需要将其全部内容进行复制，这也是没必要的。但是，如果将这些操作转移到 `JavaScript` 对象上，那么就会变得简单了
    *   操作 `dom` 是比较昂贵的操作，频繁的`dom`操作容易引起页面的重绘和回流，但是通过抽象 `VNode` 进行中间处理，可以有效减少直接操作`dom`的次数，从而减少页面重绘和回流
*   **方便实现跨平台**
    *   同一 `VNode` 节点可以渲染成不同平台上的对应的内容，比如：渲染在浏览器是 `dom` 元素节点，渲染在 `Native( iOS、Android)`变为对应的控件、可以实现 `SSR` 、渲染到 `WebGL` 中等等
    *   `Vue3` 中允许开发者基于 `VNode` 实现自定义渲染器（`renderer`），以便于针对不同平台进行渲染

1.  `vdom`如何生成？在vue中我们常常会为组件编写模板 - `template`， 这个模板会被编译器 - `compiler`编译为渲染函数，在接下来的挂载（`mount`）过程中会调用`render`函数，返回的对象就是虚拟`dom`。但它们还不是真正的`dom`，所以会在后续的`patch`过程中进一步转化为`dom`。

![](https://s.poetries.work/uploads/2022/08/8154cc1efc0aea96.png)

1.  挂载过程结束后，`vue`程序进入更新流程。如果某些响应式数据发生变化，将会引起组件重新`render`，此时就会生成新的`vdom`，和上一次的渲染结果`diff`就能得到变化的地方，从而转换为最小量的`dom`操作，高效更新视图
```

**为什么要用vdom？案例解析**

现在有一个场景，实现以下需求:

```js

    [    
      { name: "张三", age: "20", address: "北京"},    
      { name: "李四", age: "21", address: "武汉"},    
      { name: "王五", age: "22", address: "杭州"},
    ]
```

将该数据展示成一个表格，并且随便修改一个信息，表格也跟着修改。 用jQuery实现如下:

```html

    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Document</title>
    </head>

    <body>
      <div id="container"></div>
      <button id="btn-change">改变</button>

      <script src="https://cdn.bootcss.com/jquery/3.2.0/jquery.js"></script>
      <script>
        const data = [{
            name: "张三",
            age: "20",
            address: "北京"
          },
          {
            name: "李四",
            age: "21",
            address: "武汉"
          },
          {
            name: "王五",
            age: "22",
            address: "杭州"
          },
        ];
        //渲染函数
        function render(data) {
          const $container = $('#container');
          $container.html('');
          const $table = $('<table>');
          // 重绘一次
          $table.append($('<tr><td>name</td><td>age</td><td>address</td></tr>'));
          data.forEach(item => {
            //每次进入都重绘
            $table.append($(`<tr><td>${item.name}</td><td>${item.age}</td><td>${item.address}</td></tr>`))
          })
          $container.append($table);
        }

        $('#btn-change').click(function () {
          data[1].age = 30;
          data[2].address = '深圳';
          render(data);
        });
      </script>
    </body>
    </html>
```

*   这样点击按钮，会有相应的视图变化，但是你审查以下元素，每次改动之后，`table`标签都得重新创建，也就是说`table`下面的每一个栏目，不管是数据是否和原来一样，都得重新渲染，这并不是理想中的情况，当其中的一栏数据和原来一样，我们希望这一栏不要重新渲染，因为`DOM`重绘相当消耗浏览器性能。
*   因此我们采用JS对象模拟的方法，将`DOM`的比对操作放在`JS`层，减少浏览器不必要的重绘，提高效率。
*   当然有人说虚拟DOM并不比真实的`DOM`快，其实也是有道理的。当上述`table`中的每一条数据都改变时，显然真实的`DOM`操作更快，因为虚拟`DOM`还存在`js`中`diff`算法的比对过程。所以，上述性能优势仅仅适用于大量数据的渲染并且改变的数据只是一小部分的情况。

如下`DOM`结构:

```html

    <ul id="list">
        <li class="item">Item1</li>
        <li class="item">Item2</li>
    </ul>
```

映射成虚拟`DOM`就是这样:

```js

    {
      tag: "ul",
      attrs: {
        id:&emsp;"list"
      },
      children: [
        {
          tag: "li",
          attrs: { className: "item" },
          children: ["Item1"]
        }, {
          tag: "li",
          attrs: { className: "item" },
          children: ["Item2"]
        }
      ]
    } 
```

**使用snabbdom实现vdom**

> 这是一个简易的实现`vdom`功能的库，相比`vue`、`react`，对于`vdom`这块更加简易，适合我们学习`vdom`。`vdom`里面有两个核心的`api`，一个是`h`函数，一个是`patch`函数，前者用来生成`vdom`对象，后者的功能在于做虚拟`dom`的比对和将`vdom`挂载到真实`DOM`上

简单介绍一下这两个函数的用法:

```js

    h('标签名', {属性}, [子元素])
    h('标签名', {属性}, [文本])
    patch(container, vnode) // container为容器DOM元素
    patch(vnode, newVnode)
```

现在我们就来用`snabbdom`重写一下刚才的例子:

```html

    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Document</title>
    </head>
    <body>
      <div id="container"></div>
      <button id="btn-change">改变</button>
      <script src="https://cdn.bootcss.com/snabbdom/0.7.3/snabbdom.js"></script>
      <script src="https://cdn.bootcss.com/snabbdom/0.7.3/snabbdom-class.js"></script>
      <script src="https://cdn.bootcss.com/snabbdom/0.7.3/snabbdom-props.js"></script>
      <script src="https://cdn.bootcss.com/snabbdom/0.7.3/snabbdom-style.js"></script>
      <script src="https://cdn.bootcss.com/snabbdom/0.7.3/snabbdom-eventlisteners.min.js"></script>
      <script src="https://cdn.bootcss.com/snabbdom/0.7.3/h.js"></script>
      <script>
        let snabbdom = window.snabbdom;

        // 定义patch
        let patch = snabbdom.init([
          snabbdom_class,
          snabbdom_props,
          snabbdom_style,
          snabbdom_eventlisteners
        ]);

        //定义h
        let h = snabbdom.h;

        const data = [{
            name: "张三",
            age: "20",
            address: "北京"
          },
          {
            name: "李四",
            age: "21",
            address: "武汉"
          },
          {
            name: "王五",
            age: "22",
            address: "杭州"
          },
        ];
        data.unshift({name: "姓名", age: "年龄", address: "地址"});

        let container = document.getElementById('container');
        let vnode;
        const render = (data) => {
          let newVnode = h('table', {}, data.map(item => { 
            let tds = [];
            for(let i in item) {
              if(item.hasOwnProperty(i)) {
                tds.push(h('td', {}, item[i] + ''));
              }
            }
            return h('tr', {}, tds);
          }));

          if(vnode) {
              patch(vnode, newVnode);
          } else {
              patch(container, newVnode);
          }
          vnode = newVnode;
        }

        render(data);

        let btnChnage = document.getElementById('btn-change');
        btnChnage.addEventListener('click', function() {
          data[1].age = 30;
          data[2].address = "深圳";
          //re-render
          render(data);
        })
      </script>
    </body>
    </html>
```

![](https://s.poetries.work/uploads/2022/08/8599e34fabc9a45f.gif)

你会发现，**只有改变的栏目才闪烁，也就是进行重绘**，数据没有改变的栏目还是保持原样，这样就大大节省了浏览器重新渲染的开销

> vue中使用`h函数`生成虚拟`DOM`返回

```js

    const vm = new Vue({
      el: '#app',
      data: {
        user: {name:'poetry'}
      },
      render(h){
        // h()
        // h(App)
        // h('div',[])
        let vnode = h('div',{},'hello world');
        return vnode
      }
    });
```

**相关源码**
```js

    // src/core/vdom/create-element.js 

    export function createElement ( // 创建元素
      context: Component,
      tag: any,
      data: any,
      children: any,
      normalizationType: any,
      alwaysNormalize: boolean
    ): VNode | Array<VNode> {
      if (Array.isArray(data) || isPrimitive(data)) {
        normalizationType = children
        children = data
        data = undefined
      }
      if (isTrue(alwaysNormalize)) {
        normalizationType = ALWAYS_NORMALIZE
      }
      // 创建元素
      return _createElement(context, tag, data, children, normalizationType)
    }

    export function _createElement (
      context: Component,
      tag?: string | Class<Component> | Function | Object,
      data?: VNodeData,
      children?: any,
      normalizationType?: number
    ): VNode | Array<VNode> {
      if (isDef(data) && isDef((data: any).__ob__)) {
        process.env.NODE_ENV !== 'production' && warn(
          `Avoid using observed data object as vnode data: ${JSON.stringify(data)}\n` +
          'Always create fresh vnode data objects in each render!',
          context
        )
        return createEmptyVNode()
      }
      // object syntax in v-bind
      if (isDef(data) && isDef(data.is)) {
        tag = data.is
      }
      if (!tag) { // 如果 h() 返回空节点
        // in case of component :is set to falsy value
        return createEmptyVNode()
      }
      // warn against non-primitive key
      if (process.env.NODE_ENV !== 'production' &&
        isDef(data) && isDef(data.key) && !isPrimitive(data.key)
      ) {
        if (!__WEEX__ || !('@binding' in data.key)) {
          warn(
            'Avoid using non-primitive value as key, ' +
            'use string/number value instead.',
            context
          )
        }
      }
      // support single function children as default scoped slot
      if (Array.isArray(children) &&
        typeof children[0] === 'function'
      ) {
        data = data || {}
        data.scopedSlots = { default: children[0] }
        children.length = 0
      }
      if (normalizationType === ALWAYS_NORMALIZE) { //  处理儿子节点个数
        children = normalizeChildren(children)
      } else if (normalizationType === SIMPLE_NORMALIZE) {
        children = simpleNormalizeChildren(children)
      } 
      let vnode, ns
      if (typeof tag === 'string') { // 标签是字符串
        let Ctor
        ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag)
        if (config.isReservedTag(tag)) {
          // platform built-in elements
          if (process.env.NODE_ENV !== 'production' && isDef(data) && isDef(data.nativeOn)) {
            warn(
              `The .native modifier for v-on is only valid on components but it was used on <${tag}>.`,
              context
            )
          }
          vnode = new VNode(
            config.parsePlatformTagName(tag), data, children,
            undefined, undefined, context
          )
        } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
          // component  组件的虚拟节点
          vnode = createComponent(Ctor, data, context, children, tag)
        } else {
          // unknown or unlisted namespaced elements
          // check at runtime because it may get assigned a namespace when its
          // parent normalizes children
          vnode = new VNode(
            tag, data, children,
            undefined, undefined, context
          )
        }
      } else {
        // direct component options / constructor  组件的虚拟节点
        vnode = createComponent(tag, data, context, children)
      }
      if (Array.isArray(vnode)) {
        return vnode
      } else if (isDef(vnode)) {
        if (isDef(ns)) applyNS(vnode, ns)
        if (isDef(data)) registerDeepBindings(data)
        return vnode
      } else {
        return createEmptyVNode()
      }
    }

    function applyNS (vnode, ns, force) {
      vnode.ns = ns
      if (vnode.tag === 'foreignObject') {
        // use default namespace inside foreignObject
        ns = undefined
        force = true
      }
      if (isDef(vnode.children)) {
        for (let i = 0, l = vnode.children.length; i < l; i++) {
          const child = vnode.children[i]
          if (isDef(child.tag) && (
            isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
            applyNS(child, ns, force)
          }
        }
      }
    }

    // ref #5318
    // necessary to ensure parent re-render when deep bindings like :style and
    // :class are used on slot nodes
    function registerDeepBindings (data) {
      if (isObject(data.style)) {
        traverse(data.style)
      }
      if (isObject(data.class)) {
        traverse(data.class)
      }
    }
```

```js

    // 虚拟节点的实现 src/core/vdom/vnode.js

    export default class VNode {
      tag: string | void;
      data: VNodeData | void;
      children: ?Array<VNode>;
      text: string | void;
      elm: Node | void;
      ns: string | void;
      context: Component | void; // rendered in this component's scope
      key: string | number | void;
      componentOptions: VNodeComponentOptions | void;
      componentInstance: Component | void; // component instance
      parent: VNode | void; // component placeholder node

      // strictly internal
      raw: boolean; // contains raw HTML? (server only)
      isStatic: boolean; // hoisted static node
      isRootInsert: boolean; // necessary for enter transition check
      isComment: boolean; // empty comment placeholder?
      isCloned: boolean; // is a cloned node?
      isOnce: boolean; // is a v-once node?
      asyncFactory: Function | void; // async component factory function
      asyncMeta: Object | void;
      isAsyncPlaceholder: boolean;
      ssrContext: Object | void;
      fnContext: Component | void; // real context vm for functional nodes
      fnOptions: ?ComponentOptions; // for SSR caching
      devtoolsMeta: ?Object; // used to store functional render context for devtools
      fnScopeId: ?string; // functional scope id support

      constructor (
        tag?: string,
        data?: VNodeData,
        children?: ?Array<VNode>,
        text?: string,
        elm?: Node,
        context?: Component,
        componentOptions?: VNodeComponentOptions,
        asyncFactory?: Function
      ) {
        this.tag = tag
        this.data = data
        this.children = children
        this.text = text
        this.elm = elm
        this.ns = undefined
        this.context = context
        this.fnContext = undefined
        this.fnOptions = undefined
        this.fnScopeId = undefined
        this.key = data && data.key
        this.componentOptions = componentOptions
        this.componentInstance = undefined
        this.parent = undefined
        this.raw = false
        this.isStatic = false
        this.isRootInsert = true
        this.isComment = false
        this.isCloned = false
        this.isOnce = false
        this.asyncFactory = asyncFactory
        this.asyncMeta = undefined
        this.isAsyncPlaceholder = false
      }

      // DEPRECATED: alias for componentInstance for backwards compat.
      /* istanbul ignore next */
      get child (): Component | void {
        return this.componentInstance
      }
    }

    export const createEmptyVNode = (text: string = '') => {
      const node = new VNode()
      node.text = text
      node.isComment = true
      return node
    }

    export function createTextVNode (val: string | number) {
      return new VNode(undefined, undefined, undefined, String(val))
    }

    // optimized shallow clone
    // used for static nodes and slot nodes because they may be reused across
    // multiple renders, cloning them avoids errors when DOM manipulations rely
    // on their elm reference.
    export function cloneVNode (vnode: VNode): VNode {
      const cloned = new VNode(
        vnode.tag,
        vnode.data,
        // #7975
        // clone children array to avoid mutating original in case of cloning
        // a child.
        vnode.children && vnode.children.slice(),
        vnode.text,
        vnode.elm,
        vnode.context,
        vnode.componentOptions,
        vnode.asyncFactory
      )
      cloned.ns = vnode.ns
      cloned.isStatic = vnode.isStatic
      cloned.key = vnode.key
      cloned.isComment = vnode.isComment
      cloned.fnContext = vnode.fnContext
      cloned.fnOptions = vnode.fnOptions
      cloned.fnScopeId = vnode.fnScopeId
      cloned.asyncMeta = vnode.asyncMeta
      cloned.isCloned = true
      return cloned
    }
```

###  Vue中diff算法原理

`DOM`操作是非常昂贵的，因此我们需要尽量地减少`DOM`操作。这就需要找出本次`DOM`必须更新的节点来更新，其他的不更新，这个找出的过程，就需要应用diff算法

> `vue`的`diff`算法是平级比较，不考虑跨级比较的情况。内部采用`深度递归的方式+双指针(头尾都加指针)`的方式进行比较。


>简单来说，Diff算法有以下过程

*   同级比较，再比较子节点（根据`key`和`tag`标签名判断）
*   先判断一方有子节点和一方没有子节点的情况(如果新的`children`没有子节点，将旧的子节点移除)
*   比较都有子节点的情况(核心`diff`)
*   递归比较子节点
```

*   正常`Diff`两个树的时间复杂度是`O(n^3)`，但实际情况下我们很少会进行跨层级的移动`DOM`，所以`Vue`将`Diff`进行了优化，从`O(n^3) -> O(n)`，只有当新旧`children`都为多个子节点时才需要用核心的`Diff`算法进行同层级比较。
*   `Vue2`的核心`Diff`算法采用了`双端比较`的算法，同时从新旧`children`的两端开始进行比较，借助`key`值找到可复用的节点，再进行相关操作。相比`React`的`Diff`算法，同样情况下可以减少移动节点次数，减少不必要的性能损耗，更加的优雅
*   在创建`VNode`时就确定其类型，以及在`mount/patch`的过程中采用位运算来判断一个`VNode`的类型，在这个基础之上再配合核心的`Diff`算法，使得性能上较`Vue2.x`有了提升

![](https://s.poetries.work/uploads/2022/08/15b3a98fc9f361d8.png)

> vue3中采用最长递增子序列来实现`diff`优化

>

回答范例

**思路**

*   `diff`算法是干什么的
*   它的必要性
*   它何时执行
*   具体执行方式
*   拔高：说一下`vue3`中的优化

**回答范例**

1.  `Vue`中的`diff`算法称为`patching`算法，它由`Snabbdom`修改而来，虚拟`DOM`要想转化为真实`DOM`就需要通过`patch`方法转换
2.  最初`Vue1.x`视图中每个依赖均有更新函数对应，可以做到精准更新，因此并不需要虚拟`DOM`和`patching`算法支持，但是这样粒度过细导致`Vue1.x`无法承载较大应用；`Vue 2.x`中为了降低`Watcher`粒度，每个组件只有一个`Watcher`与之对应，此时就需要引入`patching`算法才能精确找到发生变化的地方并高效更新
3.  `vue`中`diff`执行的时刻是组件内响应式数据变更触发实例执行其更新函数时，更新函数会再次执行`render`函数获得最新的虚拟`DOM`，然后执行`patch`函数，并传入新旧两次虚拟DOM，通过比对两者找到变化的地方，最后将其转化为对应的`DOM`操作
4.  `patch`过程是一个递归过程，遵循深度优先、同层比较的策略；

**以`vue3`的`patch`为例**

*   首先判断两个节点是否为相同同类节点，不同则删除重新创建
*   如果双方都是文本则更新文本内容
*   如果双方都是元素节点则递归更新子元素，同时更新元素属性
*   更新子节点时又分了几种情况
    *   新的子节点是文本，老的子节点是数组则清空，并设置文本；
    *   新的子节点是文本，老的子节点是文本则直接更新文本；
    *   新的子节点是数组，老的子节点是文本则清空文本，并创建新子节点数组中的子元素；
    *   新的子节点是数组，老的子节点也是数组，那么比较两组子节点，更新细节blabla
*   `vue3`中引入的更新策略：静态节点标记等
```

**vdom中diff算法的简易实现**

以下代码只是帮助大家理解`diff`算法的原理和流程

1.  将`vdom`转化为真实`dom`：

```js

    const createElement = (vnode) => {
      let tag = vnode.tag;
      let attrs = vnode.attrs || {};
      let children = vnode.children || [];
      if(!tag) {
        return null;
      }
      //创建元素
      let elem = document.createElement(tag);
      //属性
      let attrName;
      for (attrName in attrs) {
        if(attrs.hasOwnProperty(attrName)) {
          elem.setAttribute(attrName, attrs[attrName]);
        }
      }
      //子元素
      children.forEach(childVnode => {
        //给elem添加子元素
        elem.appendChild(createElement(childVnode));
      })

      //返回真实的dom元素
      return elem;
    }
```

1.  用简易`diff`算法做更新操作

```js

    function updateChildren(vnode, newVnode) {
      let children = vnode.children || [];
      let newChildren = newVnode.children || [];

      children.forEach((childVnode, index) => {
        let newChildVNode = newChildren[index];
        if(childVnode.tag === newChildVNode.tag) {
          //深层次对比, 递归过程
          updateChildren(childVnode, newChildVNode);
        } else {
          //替换
          replaceNode(childVnode, newChildVNode);
        }
      })
    }
```

**Vue diff相关源码**
```js

    // src/core/vdom/patch.js 700

    function assertNodeMatch (node, vnode, inVPre) {
        if (isDef(vnode.tag)) {
          return vnode.tag.indexOf('vue-component') === 0 || (
            !isUnknownElement(vnode, inVPre) &&
            vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())
          )
        } else {
          return node.nodeType === (vnode.isComment ? 8 : 3)
        }
      }

      return function patch (oldVnode, vnode, hydrating, removeOnly) {
        if (isUndef(vnode)) { // 此为组件卸载逻辑
          if (isDef(oldVnode)) invokeDestroyHook(oldVnode)
          return
        }

        let isInitialPatch = false
        const insertedVnodeQueue = []

        if (isUndef(oldVnode)) { // 此为组件挂载
          // empty mount (likely as component), create new root element
          isInitialPatch = true
          createElm(vnode, insertedVnodeQueue)
        } else {
          const isRealElement = isDef(oldVnode.nodeType)
          if (!isRealElement && sameVnode(oldVnode, vnode)) {
            // patch existing root node  patchVnode
            patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly)
          } else {
            if (isRealElement) { // 真实元素挂载
              // mounting to a real element
              // check if this is server-rendered content and if we can perform
              // a successful hydration.
              if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
                oldVnode.removeAttribute(SSR_ATTR)
                hydrating = true
              }
              if (isTrue(hydrating)) {
                if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
                  invokeInsertHook(vnode, insertedVnodeQueue, true)
                  return oldVnode
                } else if (process.env.NODE_ENV !== 'production') {
                  warn(
                    'The client-side rendered virtual DOM tree is not matching ' +
                    'server-rendered content. This is likely caused by incorrect ' +
                    'HTML markup, for example nesting block-level elements inside ' +
                    '<p>, or missing <tbody>. Bailing hydration and performing ' +
                    'full client-side render.'
                  )
                }
              }
              // either not server-rendered, or hydration failed.
              // create an empty node and replace it
              oldVnode = emptyNodeAt(oldVnode) // 根据真实元素 产生虚拟节点
            }

            // replacing existing element
            const oldElm = oldVnode.elm
            const parentElm = nodeOps.parentNode(oldElm) // 找到父亲

            // create new node  创建新节点
            createElm(
              vnode,
              insertedVnodeQueue,
              // extremely rare edge case: do not insert if old element is in a
              // leaving transition. Only happens when combining transition +
              // keep-alive + HOCs. (#4590)
              oldElm._leaveCb ? null : parentElm,
              nodeOps.nextSibling(oldElm)
            )

            // update parent placeholder node element, recursively
            if (isDef(vnode.parent)) { // 依次更新父占位符
              let ancestor = vnode.parent
              const patchable = isPatchable(vnode)
              while (ancestor) {
                for (let i = 0; i < cbs.destroy.length; ++i) {
                  cbs.destroy[i](ancestor)
                }
                ancestor.elm = vnode.elm
                if (patchable) {
                  for (let i = 0; i < cbs.create.length; ++i) {
                    cbs.create[i](emptyNode, ancestor)
                  }
                  // #6513
                  // invoke insert hooks that may have been merged by create hooks.
                  // e.g. for directives that uses the "inserted" hook.
                  const insert = ancestor.data.hook.insert
                  if (insert.merged) {
                    // start at index 1 to avoid re-invoking component mounted hook
                    for (let i = 1; i < insert.fns.length; i++) {
                      insert.fns[i]()
                    }
                  }
                } else {
                  registerRef(ancestor)
                }
                ancestor = ancestor.parent
              }
            }

            // destroy old node
            if (isDef(parentElm)) { // 销毁老节点
              removeVnodes([oldVnode], 0, 0)
            } else if (isDef(oldVnode.tag)) {
              invokeDestroyHook(oldVnode)
            }
          }
        }
        // 调用插入的钩子 -》 callInsert
        invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch)
        return vnode.elm
      }
```

```js

    // 比较两个虚拟节点
    function patchVnode (
        oldVnode,
        vnode,
        insertedVnodeQueue,
        ownerArray,
        index,
        removeOnly
      ) {
        if (oldVnode === vnode) {
          return
        }

        if (isDef(vnode.elm) && isDef(ownerArray)) {
          // clone reused vnode
          vnode = ownerArray[index] = cloneVNode(vnode)
        }

        const elm = vnode.elm = oldVnode.elm // 复用老节点

        if (isTrue(oldVnode.isAsyncPlaceholder)) { // 如果是异步占位符跳过
          if (isDef(vnode.asyncFactory.resolved)) {
            hydrate(oldVnode.elm, vnode, insertedVnodeQueue)
          } else {
            vnode.isAsyncPlaceholder = true
          }
          return
        }

        // reuse element for static trees.
        // note we only do this if the vnode is cloned -
        // if the new node is not cloned it means the render functions have been
        // reset by the hot-reload-api and we need to do a proper re-render.
        if (isTrue(vnode.isStatic) &&
          isTrue(oldVnode.isStatic) &&
          vnode.key === oldVnode.key && // 都是静态节点，key相同
          (isTrue(vnode.isCloned) || isTrue(vnode.isOnce)) // 是克隆节点 或者 带有once，直接复用
        ) {
          vnode.componentInstance = oldVnode.componentInstance
          return
        } 

        let i // 组件更新逻辑
        const data = vnode.data
        if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
          i(oldVnode, vnode)
        }

        const oldCh = oldVnode.children
        const ch = vnode.children
        if (isDef(data) && isPatchable(vnode)) { // 调用更新方法
          for (i = 0; i < cbs.update.length; ++i) cbs.update[i](oldVnode, vnode)
          if (isDef(i = data.hook) && isDef(i = i.update)) i(oldVnode, vnode)
        }
        if (isUndef(vnode.text)) { // 如果不是文本节点
          if (isDef(oldCh) && isDef(ch)) { // 两方都有儿子, 而且不是同一个儿子
            if (oldCh !== ch) updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly)
          } else if (isDef(ch)) { // 如果只有新的有儿子
            if (process.env.NODE_ENV !== 'production') {
              checkDuplicateKeys(ch)
            }
            if (isDef(oldVnode.text)) nodeOps.setTextContent(elm, '') // 删除添加新节点
            addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue)
          } else if (isDef(oldCh)) { // 如果老得有儿子
            removeVnodes(oldCh, 0, oldCh.length - 1) // 删除节点
          } else if (isDef(oldVnode.text)) { // 如果老的是文本
            nodeOps.setTextContent(elm, '') // 清空文本中内容
          }
        } else if (oldVnode.text !== vnode.text) {
          nodeOps.setTextContent(elm, vnode.text) // 文本不相同直接设置新值
        }
        if (isDef(data)) { // 调用postpatch钩子
          if (isDef(i = data.hook) && isDef(i = i.postpatch)) i(oldVnode, vnode)
        }
      }

      function invokeInsertHook (vnode, queue, initial) {
        // delay insert hooks for component root nodes, invoke them after the
        // element is really inserted
        if (isTrue(initial) && isDef(vnode.parent)) {
          vnode.parent.data.pendingInsert = queue
        } else {
          for (let i = 0; i < queue.length; ++i) {
            queue[i].data.hook.insert(queue[i])
          }
        }
      }

      let hydrationBailed = false
      // list of modules that can skip create hook during hydration because they
      // are already rendered on the client or has no need for initialization
      // Note: style is excluded because it relies on initial clone for future
      // deep updates (#7063).
      const isRenderedModule = makeMap('attrs,class,staticClass,staticStyle,key')

      // Note: this is a browser-only function so we can assume elms are DOM nodes.
      function hydrate (elm, vnode, insertedVnodeQueue, inVPre) {
        let i
        const { tag, data, children } = vnode
        inVPre = inVPre || (data && data.pre)
        vnode.elm = elm

        if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
          vnode.isAsyncPlaceholder = true
          return true
        }
        // assert node match
        if (process.env.NODE_ENV !== 'production') {
          if (!assertNodeMatch(elm, vnode, inVPre)) {
            return false
          }
        }
        if (isDef(data)) {
          if (isDef(i = data.hook) && isDef(i = i.init)) i(vnode, true /* hydrating */)
          if (isDef(i = vnode.componentInstance)) {
            // child component. it should have hydrated its own tree.
            initComponent(vnode, insertedVnodeQueue)
            return true
          }
        }
        if (isDef(tag)) {
          if (isDef(children)) {
            // empty element, allow client to pick up and populate children
            if (!elm.hasChildNodes()) {
              createChildren(vnode, children, insertedVnodeQueue)
            } else {
              // v-html and domProps: innerHTML
              if (isDef(i = data) && isDef(i = i.domProps) && isDef(i = i.innerHTML)) {
                if (i !== elm.innerHTML) {
                  /* istanbul ignore if */
                  if (process.env.NODE_ENV !== 'production' &&
                    typeof console !== 'undefined' &&
                    !hydrationBailed
                  ) {
                    hydrationBailed = true
                    console.warn('Parent: ', elm)
                    console.warn('server innerHTML: ', i)
                    console.warn('client innerHTML: ', elm.innerHTML)
                  }
                  return false
                }
              } else {
                // iterate and compare children lists
                let childrenMatch = true
                let childNode = elm.firstChild
                for (let i = 0; i < children.length; i++) {
                  if (!childNode || !hydrate(childNode, children[i], insertedVnodeQueue, inVPre)) {
                    childrenMatch = false
                    break
                  }
                  childNode = childNode.nextSibling
                }
                // if childNode is not null, it means the actual childNodes list is
                // longer than the virtual children list.
                if (!childrenMatch || childNode) {
                  /* istanbul ignore if */
                  if (process.env.NODE_ENV !== 'production' &&
                    typeof console !== 'undefined' &&
                    !hydrationBailed
                  ) {
                    hydrationBailed = true
                    console.warn('Parent: ', elm)
                    console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children)
                  }
                  return false
                }
              }
            }
          }
          if (isDef(data)) {
            let fullInvoke = false
            for (const key in data) {
              if (!isRenderedModule(key)) {
                fullInvoke = true
                invokeCreateHooks(vnode, insertedVnodeQueue)
                break
              }
            }
            if (!fullInvoke && data['class']) {
              // ensure collecting deps for deep class bindings for future updates
              traverse(data['class'])
            }
          }
        } else if (elm.data !== vnode.text) {
          elm.data = vnode.text
        }
        return true
      }
```

```js

    function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
        let oldStartIdx = 0
        let newStartIdx = 0
        let oldEndIdx = oldCh.length - 1
        let oldStartVnode = oldCh[0]
        let oldEndVnode = oldCh[oldEndIdx]
        let newEndIdx = newCh.length - 1
        let newStartVnode = newCh[0]
        let newEndVnode = newCh[newEndIdx]
        let oldKeyToIdx, idxInOld, vnodeToMove, refElm

        // removeOnly is a special flag used only by <transition-group>
        // to ensure removed elements stay in correct relative positions
        // during leaving transitions
        const canMove = !removeOnly

        if (process.env.NODE_ENV !== 'production') {
          checkDuplicateKeys(newCh)
        }
        // 新老节点有一方循环完毕则patch 完毕
        while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
          if (isUndef(oldStartVnode)) {
            oldStartVnode = oldCh[++oldStartIdx] // Vnode has been moved left
          } else if (isUndef(oldEndVnode)) {
            oldEndVnode = oldCh[--oldEndIdx]
          } else if (sameVnode(oldStartVnode, newStartVnode)) {
            patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx)
            oldStartVnode = oldCh[++oldStartIdx]
            newStartVnode = newCh[++newStartIdx]
          } else if (sameVnode(oldEndVnode, newEndVnode)) {
            patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx)
            oldEndVnode = oldCh[--oldEndIdx]
            newEndVnode = newCh[--newEndIdx]
          } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
            patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx)
            canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm))
            oldStartVnode = oldCh[++oldStartIdx]
            newEndVnode = newCh[--newEndIdx]
          } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
            patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx)
            canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm)
            oldEndVnode = oldCh[--oldEndIdx]
            newStartVnode = newCh[++newStartIdx]
          } else {
            // 乱序比对
            if (isUndef(oldKeyToIdx)) oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx)
            idxInOld = isDef(newStartVnode.key)
              ? oldKeyToIdx[newStartVnode.key]
              : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx)
            if (isUndef(idxInOld)) { // New element
              createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx)
            } else {
              vnodeToMove = oldCh[idxInOld]
              if (sameVnode(vnodeToMove, newStartVnode)) {
                patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue, newCh, newStartIdx)
                oldCh[idxInOld] = undefined
                canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm)
              } else {
                // same key but different element. treat as new element
                createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx)
              }
            }
            newStartVnode = newCh[++newStartIdx]
          }
        }
        if (oldStartIdx > oldEndIdx) {
          refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm
          addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue)
        } else if (newStartIdx > newEndIdx) {
          removeVnodes(oldCh, oldStartIdx, oldEndIdx)
        }
      }
``` 

###  Vue的diff算法详细分析

**1\. 是什么**

`diff` 算法是一种通过同层的树节点进行比较的高效算法

其有两个特点：

*   比较只会在同层级进行, 不会跨层级比较
*   在diff比较的过程中，循环从两边向中间比较

`diff` 算法在很多场景下都有应用，在 `vue` 中，作用于虚拟 `dom` 渲染成真实 `dom` 的新旧 `VNode` 节点比较

**2\. 比较方式**

`diff`整体策略为：深度优先，同层比较

1.  比较只会在同层级进行, 不会跨层级比较

![](https://s.poetries.work/uploads/2022/09/f29c33c806ecffb5.png)

1.  比较的过程中，循环从两边向中间收拢

![](https://s.poetries.work/uploads/2022/09/8121a9b6102e5377.png)

下面举个`vue`通过`diff`算法更新的例子：

新旧`VNode`节点如下图所示：

![](https://s.poetries.work/uploads/2022/09/78fa0e7847772ef5.png)

第一次循环后，发现旧节点D与新节点D相同，直接复用旧节点D作为`diff`后的第一个真实节点，同时旧节点`endIndex`移动到C，新节点的 `startIndex` 移动到了 C

![](https://s.poetries.work/uploads/2022/09/4ddfc7e80cffdb80.png)

第二次循环后，同样是旧节点的末尾和新节点的开头(都是 C)相同，同理，`diff` 后创建了 C 的真实节点插入到第一次创建的 D 节点后面。同时旧节点的 `endIndex` 移动到了 B，新节点的 `startIndex` 移动到了 E

![](https://s.poetries.work/uploads/2022/09/7fff25b5fa48acf4.png)

第三次循环中，发现E没有找到，这时候只能直接创建新的真实节点 E，插入到第二次创建的 C 节点之后。同时新节点的 `startIndex` 移动到了 A。旧节点的 `startIndex` 和 `endIndex` 都保持不动

![](https://s.poetries.work/uploads/2022/09/4a6aa4297e796b54.png)

第四次循环中，发现了新旧节点的开头(都是 A)相同，于是 `diff` 后创建了 A 的真实节点，插入到前一次创建的 E 节点后面。同时旧节点的 `startIndex` 移动到了 B，新节点的`startIndex` 移动到了 B

![](https://s.poetries.work/uploads/2022/09/121fc9375e2537f6.png)

第五次循环中，情形同第四次循环一样，因此 `diff` 后创建了 B 真实节点 插入到前一次创建的 A 节点后面。同时旧节点的 `startIndex`移动到了 C，新节点的 startIndex 移动到了 F

![](https://s.poetries.work/uploads/2022/09/1c0782546f0e6e97.png)

新节点的 `startIndex` 已经大于 `endIndex` 了，需要创建 `newStartIdx` 和 `newEndIdx` 之间的所有节点，也就是节点F，直接创建 F 节点对应的真实节点放到 B 节点后面

![](https://s.poetries.work/uploads/2022/09/94437bcc7fdc74ba.png)

**3\. 原理分析**

当数据发生改变时，`set`方法会调用`Dep.notify`通知所有订阅者`Watcher`，订阅者就会调用`patch`给真实的`DOM`打补丁，更新相应的视图

源码位置：`src/core/vdom/patch.js`

```js

    function patch(oldVnode, vnode, hydrating, removeOnly) {
        if (isUndef(vnode)) { // 没有新节点，直接执行destory钩子函数
            if (isDef(oldVnode)) invokeDestroyHook(oldVnode)
            return
        }

        let isInitialPatch = false
        const insertedVnodeQueue = []

        if (isUndef(oldVnode)) {
            isInitialPatch = true
            createElm(vnode, insertedVnodeQueue) // 没有旧节点，直接用新节点生成dom元素
        } else {
            const isRealElement = isDef(oldVnode.nodeType)
            if (!isRealElement && sameVnode(oldVnode, vnode)) {
                // 判断旧节点和新节点自身一样，一致执行patchVnode
                patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly)
            } else {
                // 否则直接销毁及旧节点，根据新节点生成dom元素
                if (isRealElement) {

                    if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
                        oldVnode.removeAttribute(SSR_ATTR)
                        hydrating = true
                    }
                    if (isTrue(hydrating)) {
                        if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
                            invokeInsertHook(vnode, insertedVnodeQueue, true)
                            return oldVnode
                        }
                    }
                    oldVnode = emptyNodeAt(oldVnode)
                }
                return vnode.elm
            }
        }
    }
```

`patch`函数前两个参数位为`oldVnode` 和 `Vnode` ，分别代表新的节点和之前的旧节点，主要做了四个判断：

*   没有新节点，直接触发旧节点的`destory`钩子
*   没有旧节点，说明是页面刚开始初始化的时候，此时，根本不需要比较了，直接全是新建，所以只调用 `createElm`
*   旧节点和新节点自身一样，通过 `sameVnode` 判断节点是否一样，一样时，直接调用 `patchVnode`去处理这两个节点
*   旧节点和新节点自身不一样，当两个节点不一样的时候，直接创建新节点，删除旧节点

下面主要讲的是`patchVnode`部分

```js

    function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
        // 如果新旧节点一致，什么都不做
        if (oldVnode === vnode) {
          return
        }

        // 让vnode.el引用到现在的真实dom，当el修改时，vnode.el会同步变化
        const elm = vnode.elm = oldVnode.elm

        // 异步占位符
        if (isTrue(oldVnode.isAsyncPlaceholder)) {
          if (isDef(vnode.asyncFactory.resolved)) {
            hydrate(oldVnode.elm, vnode, insertedVnodeQueue)
          } else {
            vnode.isAsyncPlaceholder = true
          }
          return
        }
        // 如果新旧都是静态节点，并且具有相同的key
        // 当vnode是克隆节点或是v-once指令控制的节点时，只需要把oldVnode.elm和oldVnode.child都复制到vnode上
        // 也不用再有其他操作
        if (isTrue(vnode.isStatic) &&
          isTrue(oldVnode.isStatic) &&
          vnode.key === oldVnode.key &&
          (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
        ) {
          vnode.componentInstance = oldVnode.componentInstance
          return
        }

        let i
        const data = vnode.data
        if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
          i(oldVnode, vnode)
        }

        const oldCh = oldVnode.children
        const ch = vnode.children
        if (isDef(data) && isPatchable(vnode)) {
          for (i = 0; i < cbs.update.length; ++i) cbs.update[i](oldVnode, vnode)
          if (isDef(i = data.hook) && isDef(i = i.update)) i(oldVnode, vnode)
        }
        // 如果vnode不是文本节点或者注释节点
        if (isUndef(vnode.text)) {
          // 并且都有子节点
          if (isDef(oldCh) && isDef(ch)) {
            // 并且子节点不完全一致，则调用updateChildren
            if (oldCh !== ch) updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly)

            // 如果只有新的vnode有子节点
          } else if (isDef(ch)) {
            if (isDef(oldVnode.text)) nodeOps.setTextContent(elm, '')
            // elm已经引用了老的dom节点，在老的dom节点上添加子节点
            addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue)

            // 如果新vnode没有子节点，而vnode有子节点，直接删除老的oldCh
          } else if (isDef(oldCh)) {
            removeVnodes(elm, oldCh, 0, oldCh.length - 1)

            // 如果老节点是文本节点
          } else if (isDef(oldVnode.text)) {
            nodeOps.setTextContent(elm, '')
          }

          // 如果新vnode和老vnode是文本节点或注释节点
          // 但是vnode.text != oldVnode.text时，只需要更新vnode.elm的文本内容就可以
        } else if (oldVnode.text !== vnode.text) {
          nodeOps.setTextContent(elm, vnode.text)
        }
        if (isDef(data)) {
          if (isDef(i = data.hook) && isDef(i = i.postpatch)) i(oldVnode, vnode)
        }
      }
```

**`patchVnode`主要做了几个判断：**

*   新节点是否是文本节点，如果是，则直接更新`dom`的文本内容为新节点的文本内容
*   新节点和旧节点如果都有子节点，则处理比较更新子节点
*   只有新节点有子节点，旧节点没有，那么不用比较了，所有节点都是全新的，所以直接全部新建就好了，新建是指创建出所有新`DOM`，并且添加进父节点
*   只有旧节点有子节点而新节点没有，说明更新后的页面，旧节点全部都不见了，那么要做的，就是把所有的旧节点删除，也就是直接把`DOM` 删除

子节点不完全一致，则调用`updateChildren`

```js

    function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
        let oldStartIdx = 0 // 旧头索引
        let newStartIdx = 0 // 新头索引
        let oldEndIdx = oldCh.length - 1 // 旧尾索引
        let newEndIdx = newCh.length - 1 // 新尾索引
        let oldStartVnode = oldCh[0] // oldVnode的第一个child
        let oldEndVnode = oldCh[oldEndIdx] // oldVnode的最后一个child
        let newStartVnode = newCh[0] // newVnode的第一个child
        let newEndVnode = newCh[newEndIdx] // newVnode的最后一个child
        let oldKeyToIdx, idxInOld, vnodeToMove, refElm

        // removeOnly is a special flag used only by <transition-group>
        // to ensure removed elements stay in correct relative positions
        // during leaving transitions
        const canMove = !removeOnly

        // 如果oldStartVnode和oldEndVnode重合，并且新的也都重合了，证明diff完了，循环结束
        while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
          // 如果oldVnode的第一个child不存在
          if (isUndef(oldStartVnode)) {
            // oldStart索引右移
            oldStartVnode = oldCh[++oldStartIdx] // Vnode has been moved left

          // 如果oldVnode的最后一个child不存在
          } else if (isUndef(oldEndVnode)) {
            // oldEnd索引左移
            oldEndVnode = oldCh[--oldEndIdx]

          // oldStartVnode和newStartVnode是同一个节点
          } else if (sameVnode(oldStartVnode, newStartVnode)) {
            // patch oldStartVnode和newStartVnode， 索引左移，继续循环
            patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue)
            oldStartVnode = oldCh[++oldStartIdx]
            newStartVnode = newCh[++newStartIdx]

          // oldEndVnode和newEndVnode是同一个节点
          } else if (sameVnode(oldEndVnode, newEndVnode)) {
            // patch oldEndVnode和newEndVnode，索引右移，继续循环
            patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue)
            oldEndVnode = oldCh[--oldEndIdx]
            newEndVnode = newCh[--newEndIdx]

          // oldStartVnode和newEndVnode是同一个节点
          } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
            // patch oldStartVnode和newEndVnode
            patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue)
            // 如果removeOnly是false，则将oldStartVnode.eml移动到oldEndVnode.elm之后
            canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm))
            // oldStart索引右移，newEnd索引左移
            oldStartVnode = oldCh[++oldStartIdx]
            newEndVnode = newCh[--newEndIdx]

          // 如果oldEndVnode和newStartVnode是同一个节点
          } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
            // patch oldEndVnode和newStartVnode
            patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue)
            // 如果removeOnly是false，则将oldEndVnode.elm移动到oldStartVnode.elm之前
            canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm)
            // oldEnd索引左移，newStart索引右移
            oldEndVnode = oldCh[--oldEndIdx]
            newStartVnode = newCh[++newStartIdx]

          // 如果都不匹配
          } else {
            if (isUndef(oldKeyToIdx)) oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx)

            // 尝试在oldChildren中寻找和newStartVnode的具有相同的key的Vnode
            idxInOld = isDef(newStartVnode.key)
              ? oldKeyToIdx[newStartVnode.key]
              : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx)

            // 如果未找到，说明newStartVnode是一个新的节点
            if (isUndef(idxInOld)) { // New element
              // 创建一个新Vnode
              createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm)

            // 如果找到了和newStartVnodej具有相同的key的Vnode，叫vnodeToMove
            } else {
              vnodeToMove = oldCh[idxInOld]
              /* istanbul ignore if */
              if (process.env.NODE_ENV !== 'production' && !vnodeToMove) {
                warn(
                  'It seems there are duplicate keys that is causing an update error. ' +
                  'Make sure each v-for item has a unique key.'
                )
              }

              // 比较两个具有相同的key的新节点是否是同一个节点
              //不设key，newCh和oldCh只会进行头尾两端的相互比较，设key后，除了头尾两端的比较外，还会从用key生成的对象oldKeyToIdx中查找匹配的节点，所以为节点设置key可以更高效的利用dom。
              if (sameVnode(vnodeToMove, newStartVnode)) {
                // patch vnodeToMove和newStartVnode
                patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue)
                // 清除
                oldCh[idxInOld] = undefined
                // 如果removeOnly是false，则将找到的和newStartVnodej具有相同的key的Vnode，叫vnodeToMove.elm
                // 移动到oldStartVnode.elm之前
                canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm)

              // 如果key相同，但是节点不相同，则创建一个新的节点
              } else {
                // same key but different element. treat as new element
                createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm)
              }
            }

            // 右移
            newStartVnode = newCh[++newStartIdx]
          }
        }
```

**`while`循环主要处理了以下五种情景：**

*   当新老 `VNode` 节点的 `start` 相同时，直接 `patchVnode` ，同时新老 `VNode` 节点的开始索引都加 1
*   当新老 `VNode` 节点的 `end`相同时，同样直接 `patchVnode` ，同时新老 `VNode` 节点的结束索引都减 1
*   当老 `VNode` 节点的 `start` 和新 `VNode` 节点的 `end` 相同时，这时候在 `patchVnode` 后，还需要将当前真实 `dom` 节点移动到 `oldEndVnode` 的后面，同时老 `VNode` 节点开始索引加 1，新 `VNode` 节点的结束索引减 1
*   当老 `VNode` 节点的 `end` 和新 `VNode` 节点的 `start` 相同时，这时候在 `patchVnode` 后，还需要将当前真实 `dom` 节点移动到 `oldStartVnode` 的前面，同时老 `VNode` 节点结束索引减 1，新 `VNode` 节点的开始索引加 1
*   如果都不满足以上四种情形，那说明没有相同的节点可以复用，则会分为以下两种情况：
    *   从旧的 `VNode` 为 `key` 值，对应 `index` 序列为 `value` 值的哈希表中找到与 `newStartVnode` 一致 `key` 的旧的 `VNode` 节点，再进行`patchVnode`，同时将这个真实 `dom`移动到 `oldStartVnode` 对应的真实 `dom` 的前面
    *   调用 `createElm` 创建一个新的 `dom` 节点放到当前 `newStartIdx` 的位置

**小结**

*   当数据发生改变时，订阅者`watcher`就会调用`patch`给真实的`DOM`打补丁
*   通过`isSameVnode`进行判断，相同则调用`patchVnode`方法
*   `patchVnode`做了以下操作：
    *   找到对应的真实`dom`，称为`el`
    *   如果都有都有文本节点且不相等，将`el`文本节点设置为`Vnode`的文本节点
    *   如果`oldVnode`有子节点而`VNode`没有，则删除`el`子节点
    *   如果`oldVnode`没有子节点而`VNode`有，则将`VNode`的子节点真实化后添加到`el`
    *   如果两者都有子节点，则执行`updateChildren`函数比较子节点
*   `updateChildren`主要做了以下操作：
    *   设置新旧`VNode`的头尾指针
    *   新旧头尾指针进行比较，循环向中间靠拢，根据情况调用`patchVnode`进行`patch`重复流程、调用`createElem`创建一个新节点，从哈希表寻找 `key`一致的`VNode` 节点再分情况操作

###  Vue2和Vue3和React三者的diff算法有什么区别

如果要严格`diff`两颗树，时间复杂度`O(n^3)`不可用，`react`把复杂度优化到了`O(n)`

**Tree diff的优化**

*   只比较同一层级，不跨级比较
*   `tag`不同则删掉重建（不在去比较内部细节）
*   子节点通过`key`区分

![](https://s.poetries.work/uploads/2023/01/4c213c57e4a91c38.png)

**React diff仅右移动**

![](https://s.poetries.work/uploads/2023/01/8c436b7f707c2e0d.png)

**Vue2 深度递归的方式 + 双指针的方式**

> `Vue2`的`diff`算法是平级比较，不考虑跨级比较的情况。内部采用`深度递归的方式 + 双指针的方式`进行比较

*   比较过程:
    *   先比较是否是相同节点
    *   相同节点比较属性,并复用老节点
    *   比较儿子节点，考虑老节点和新节点儿子的情况
    *   优化比较：`头头`、`尾尾`、`头尾`、`尾头`
    *   比对查找进行复用

![](https://s.poetries.work/uploads/2023/01/b200d667af842b4d.png)

**Vue3中采用最长递增子序列实现diff算法**

**Vue React为何循环时必须使用key**

*   `vdom diff` 算法会根据`key`判断元素是否要删除
*   如果匹配了`key`，则只移动元素-性能较好
*   未匹配`key`，则删除重建，性能较差

###  既然Vue通过数据劫持可以精准探测数据变化，为什么还需要虚拟DOM进行diff检测差异

*   响应式数据变化，`Vue`确实可以在数据变化时，响应式系统可以立刻得知。但是如果给每个属性都添加`watcher`用于更新的话，会产生大量的`watcher`从而降低性能
*   而且粒度过细也得导致更新不准确的问题，所以`vue`采用了组件级的`watcher`配合`diff`来检测差异

###  请说明Vue中key的作用和原理，谈谈你对它的理解

![](https://s.poetries.work/gitee/2020/07/67.png)

*   `key`是为`Vue`中的`VNode`标记的唯一`id`，在`patch`过程中通过`key`可以判断两个虚拟节点是否是相同节点，通过这个`key`，我们的`diff`操作可以更准确、更快速
*   `diff`算法的过程中,先会进行新旧节点的首尾交叉对比,当无法匹配的时候会用新节点的`key`与旧节点进行比对,然后检出差异
*   尽量不要采用索引作为`key`
*   如果不加`key`,那么`vue`会选择复用节点(Vue的就地更新策略),导致之前节点的状态被保留下来,会产生一系列的`bug`
*   **更准确**：因为带 `key` 就不是就地复用了，在 `sameNode` 函数 `a.key === b.key` 对比中可以避免就地复用的情况。所以会更加准确。
*   **更快速**：`key`的唯一性可以被`Map`数据结构充分利用，相比于遍历查找的时间复杂度`O(n)`，`Map`的时间复杂度仅仅为`O(1)`，比遍历方式更快。

源码如下：

```js

    function createKeyToOldIdx (children, beginIdx, endIdx) {
      let i, key
      const map = {}
      for (i = beginIdx; i <= endIdx; ++i) {
        key = children[i].key
        if (isDef(key)) map[key] = i
      }
      return map
    }
```

>

回答范例

**分析**

这是一道特别常见的问题，主要考查大家对虚拟`DOM`和`patch`细节的掌握程度，能够反映面试者理解层次

**思路分析：**

*   给出结论，`key`的作用是用于优化`patch`性能
*   `key`的必要性
*   实际使用方式
*   总结：可从源码层面描述一下`vue`如何判断两个节点是否相同

**回答范例：**

1.  `key`的作用主要是为了更高效的更新虚拟`DOM`
2.  `vue`在`patch`过程中**判断两个节点是否是相同节点是`key`是一个必要条件**，渲染一组列表时，`key`往往是唯一标识，所以如果不定义`key`的话，`vue`只能认为比较的两个节点是同一个，哪怕它们实际上不是，这导致了频繁更新元素，使得整个`patch`过程比较低效，影响性能
3.  实际使用中在渲染一组列表时`key`必须设置，而且必须是唯一标识，应该避免使用数组索引作为`key`，这可能导致一些隐蔽的`bug`；`vue`中在使用相同标签元素过渡切换时，也会使用`key`属性，其目的也是为了让`vue`可以区分它们，否则`vue`只会替换其内部属性而不会触发过渡效果
4.  从源码中可以知道，`vue`判断两个节点是否相同时主要判断两者的`key`和`标签类型(如div)`等，因此如果不设置`key`，它的值就是`undefined`，则可能永远认为这是两个相同节点，只能去做更新操作，这造成了大量的`dom`更新操作，明显是不可取的
```

> 如果不使用 `key`，`Vue` 会使用一种最大限度减少动态元素并且尽可能的尝试就地修改/复用相同类型元素的算法。`key` 是为 `Vue` 中 `vnode` 的唯一标记，通过这个 `key`，我们的 `diff` 操作可以更准确、更快速

![](https://s.poetries.work/uploads/2022/08/8c7511b8697e15ea.png)

> diff程可以概括为：`oldCh`和`newCh`各有两个头尾的变量S`tartIdx`和`EndIdx`，它们的`2`个变量相互比较，一共有`4`种比较方式。如果`4`种比较都没匹配，如果设置了`key`，就会用`key`进行比较，在比较的过程中，变量会往中间靠，一旦`StartIdx>EndIdx`表明`oldCh`和`newCh`至少有一个已经遍历完了，就会结束比较,这四种比较方式就是`首`、`尾`、`旧尾新头`、`旧头新尾`

**相关代码如下**

```js

    // 判断两个vnode的标签和key是否相同 如果相同 就可以认为是同一节点就地复用
    function isSameVnode(oldVnode, newVnode) {
      return oldVnode.tag === newVnode.tag && oldVnode.key === newVnode.key;
    }

    // 根据key来创建老的儿子的index映射表  类似 {'a':0,'b':1} 代表key为'a'的节点在第一个位置 key为'b'的节点在第二个位置
    function makeIndexByKey(children) {
      let map = {};
      children.forEach((item, index) => {
        map[item.key] = index;
      });
      return map;
    }
    // 生成的映射表
    let map = makeIndexByKey(oldCh);
```

##  17 Vue组件相关

###  Vue组件为什么只能有一个根元素

`vue3`中没有问题

```js

    Vue.createApp({
      components: {
        comp: {
          template: `
            <div>root1</div>
            <div>root2</div>
          `
        }
      }
    }).mount('#app')
```

1.  `vue2`中组件确实只能有一个根，但`vue3`中组件已经可以多根节点了。
2.  之所以需要这样是因为`vdom`是一颗单根树形结构，`patch`方法在遍历的时候从根节点开始遍历，它要求只有一个根节点。组件也会转换为一个`vdom`
3.  `vue3`中之所以可以写多个根节点，是因为引入了`Fragment`的概念，这是一个抽象的节点，如果发现组件是多根的，就创建一个`Fragment`节点，把多个根节点作为它的`children`。将来`patch`的时候，如果发现是一个`Fragment`节点，则直接遍历`children`创建或更新

###  谈一谈对Vue组件化的理解

*   组件化开发能大幅提高开发效率、测试性、复用性等
*   常用的组件化技术：属性、自定义事件、插槽
*   降低更新频率，只重新渲染变化的组件
*   组件的特点：高内聚、低耦合、单向数据流

###  Vue组件渲染和更新过程

> 渲染组件时，会通过 `Vue.extend` 方法构建子组件的构造函数，并进行实例化。最终手动调用`$mount()` 进行挂载。更新组件时会进行 `patchVnode` 流程，核心就是`diff`算法

![](https://s.poetries.work/uploads/2022/08/9902d8c15277fb57.png)

###  异步组件是什么？使用场景有哪些？

**分析**

因为异步路由的存在，我们使用异步组件的次数比较少，因此还是有必要两者的不同。

**体验**

大型应用中，我们需要分割应用为更小的块，并且在需要组件时再加载它们

```js

    import { defineAsyncComponent } from 'vue'
    // defineAsyncComponent定义异步组件，返回一个包装组件。包装组件根据加载器的状态决定渲染什么内容
    const AsyncComp = defineAsyncComponent(() => {
      // 加载函数返回Promise
      return new Promise((resolve, reject) => {
        // ...可以从服务器加载组件
        resolve(/* loaded component */)
      })
    })
    // 借助打包工具实现ES模块动态导入
    const AsyncComp = defineAsyncComponent(() =>
      import('./components/MyComponent.vue')
    )
```

**回答范例**

1.  在大型应用中，我们需要分割应用为更小的块，并且在需要组件时再加载它们。
2.  我们不仅可以在路由切换时懒加载组件，还可以在页面组件中继续使用异步组件，从而实现更细的分割粒度。
3.  使用异步组件最简单的方式是直接给`defineAsyncComponent`指定一个`loader`函数，结合ES模块动态导入函数`import`可以快速实现。我们甚至可以指定`loadingComponent`和`errorComponent`选项从而给用户一个很好的加载反馈。另外`Vue3`中还可以结合`Suspense`组件使用异步组件。
4.  异步组件容易和路由懒加载混淆，实际上不是一个东西。异步组件不能被用于定义懒加载路由上，处理它的是`vue`框架，处理路由组件加载的是`vue-router`。但是可以在懒加载的路由组件中使用异步组件

###  为什么要使用异步组件

1.  节省打包出的结果，异步组件分开打包，采用`jsonp`的方式进行加载，有效解决文件过大的问题。
2.  核心就是包组件定义变成一个函数，依赖`import()` 语法，可以实现文件的分割加载。

```js

    components:{ 
      AddCustomerSchedule:(resolve)=>import("../components/AddCustomer") // require([]) 
    }
```

原理

```js

    export function ( Ctor: Class<Component> | Function | Object | void, data: ?VNodeData, context: Component, children: ?Array<VNode>, tag?: string ): VNode | Array<VNode> | void { 
        // async component 
        let asyncFactory 
        if (isUndef(Ctor.cid)) { 
            asyncFactory = Ctor 
            Ctor = resolveAsyncComponent(asyncFactory, baseCtor) // 默认调用此函数时返回 undefiend 
            // 第二次渲染时Ctor不为undefined 
            if (Ctor === undefined) { 
                return createAsyncPlaceholder( // 渲染占位符 空虚拟节点 
                    asyncFactory, 
                    data, 
                    context, 
                    children, 
                    tag 
                ) 
            } 
        } 
    }
    function resolveAsyncComponent ( factory: Function, baseCtor: Class<Component> ): Class<Component> | void { 
        if (isDef(factory.resolved)) { 
            // 3.在次渲染时可以拿到获取的最新组件 
            return factory.resolved 
        }
        const resolve = once((res: Object | Class<Component>) => { 
            factory.resolved = ensureCtor(res, baseCtor) 
            if (!sync) { 
                forceRender(true) //2\. 强制更新视图重新渲染 
            } else { 
                owners.length = 0 
            } 
        })
        const reject = once(reason => { 
            if (isDef(factory.errorComp)) { 
                factory.error = true forceRender(true) 
            } 
        })
        const res = factory(resolve, reject)// 1.将resolve方法和reject方法传入，用户调用 resolve方法后 
        sync = false 
        return factory.resolved 
    }
```

###  函数式组件优势和原理

**函数组件的特点**

1.  函数式组件需要在声明组件是指定 `functional:true`
2.  不需要实例化，所以没有`this`,`this`通过`render`函数的第二个参数`context`来代替
3.  没有生命周期钩子函数，不能使用计算属性，`watch`
4.  不能通过`$emit` 对外暴露事件，调用事件只能通过`context.listeners.click`的方式调用外部传入的事件
5.  因为函数式组件是没有实例化的，所以在外部通过`ref`去引用组件时，实际引用的是`HTMLElement`
6.  函数式组件的`props`可以不用显示声明，所以没有在`props`里面声明的属性都会被自动隐式解析为`prop`,而普通组件所有未声明的属性都解析到`$attrs`里面，并自动挂载到组件根元素上面(可以通过`inheritAttrs`属性禁止)

**优点**

1.  由于函数式组件不需要实例化，无状态，没有生命周期，所以渲染性能要好于普通组件
2.  函数式组件结构比较简单，代码结构更清晰

**使用场景：**

*   一个简单的展示组件，作为容器组件使用 比如 `router-view` 就是一个函数式组件
*   “高阶组件”——用于接收一个组件作为参数，返回一个被包装过的组件

例子

```js

    Vue.component('functional',{ // 构造函数产生虚拟节点的
        functional:true, // 函数式组件 // data={attrs:{}}
        render(h){
            return h('div','test')
        }
    })
    const vm = new Vue({
        el: '#app'
    })
```

源码相关

```js

    // functional component
    if (isTrue(Ctor.options.functional)) { // 带有functional的属性的就是函数式组件
      return createFunctionalComponent(Ctor, propsData, data, context, children)
    }

    // extract listeners, since these needs to be treated as
    // child component listeners instead of DOM listeners
    const listeners = data.on // 处理事件
    // replace with listeners with .native modifier
    // so it gets processed during parent component patch.
    data.on = data.nativeOn // 处理原生事件

    // install component management hooks onto the placeholder node
    installComponentHooks(data) // 安装组件相关钩子 （函数式组件没有调用此方法，从而性能高于普通组件）
```

###  Vue组件之间通信方式有哪些

> Vue 组件间通信是面试常考的知识点之一，这题有点类似于开放题，你回答出越多方法当然越加分，表明你对 Vue 掌握的越熟练。**Vue 组件间通信只要指以下 3 类通信**：`父子组件通信`、`隔代组件通信`、`兄弟组件通信`，下面我们分别介绍每种通信方式且会说明此种方法可适用于哪类组件间通信

**组件传参的各种方式**

![](https://s.poetries.work/uploads/2022/08/e6c7ede9c5ab6d49.png)

**组件通信常用方式有以下几种**

*   `props / $emit` **适用 父子组件通信**
    *   父组件向子组件传递数据是通过 `prop` 传递的，子组件传递数据给父组件是通过`$emit` 触发事件来做到的
*   `ref` 与 `$parent / $children(vue3废弃)` **适用 父子组件通信**
    *   `ref`：如果在普通的 `DOM` 元素上使用，引用指向的就是 `DOM` 元素；如果用在子组件上，引用就指向组件实例
    *   `$parent / $children`：访问访问父组件的属性或方法 / 访问子组件的属性或方法
*   `EventBus （$emit / $on）` **适用于 父子、隔代、兄弟组件通信**
    *   这种方法通过一个空的 `Vue` 实例作为中央事件总线（事件中心），用它来触发事件和监听事件，从而实现任何组件间的通信，包括父子、隔代、兄弟组件
*   `$attrs / $listeners(vue3废弃)` **适用于 隔代组件通信**
    *   `$attrs`：包含了父作用域中不被 `prop` 所识别 (且获取) 的特性绑定 ( `class` 和 `style` 除外 )。当一个组件没有声明任何 `prop` 时，这里会包含所有父作用域的绑定 ( `class` 和 `style` 除外 )，并且可以通过 `v-bind="$attrs"` 传入内部组件。通常配合 `inheritAttrs` 选项一起使用，多余的属性不会被解析到标签上
    *   `$listeners`：包含了父作用域中的 (不含 `.native` 修饰器的) `v-on` 事件监听器。它可以通过 `v-on="$listeners"` 传入内部组件
*   `provide / inject` **适用于 隔代组件通信**
    *   祖先组件中通过 `provider` 来提供变量，然后在子孙组件中通过 `inject` 来注入变量。 `provide / inject` API 主要解决了跨级组件间的通信问题，**不过它的使用场景，主要是子组件获取上级组件的状态**，跨级组件间建立了一种主动提供与依赖注入的关系
*   `$root` **适用于 隔代组件通信** 访问根组件中的属性或方法，是根组件，不是父组件。`$root`只对根组件有用
*   `Vuex` **适用于 父子、隔代、兄弟组件通信**
    *   `Vuex` 是一个专为 `Vue.js` 应用程序开发的状态管理模式。每一个 `Vuex` 应用的核心就是 `store`（仓库）。“store” 基本上就是一个容器，它包含着你的应用中大部分的状态 ( `state` )
    *   `Vuex` 的状态存储是响应式的。当 `Vue` 组件从 `store` 中读取状态的时候，若 `store` 中的状态发生变化，那么相应的组件也会相应地得到高效更新。
    *   改变 `store` 中的状态的唯一途径就是显式地提交 (`commit`) `mutation`。这样使得我们可以方便地跟踪每一个状态的变化。

**根据组件之间关系讨论组件通信最为清晰有效**

*   父子组件：`props`/`$emit`/`$parent`/`ref`
*   兄弟组件：`$parent`/`eventbus`/`vuex`
*   跨层级关系：`eventbus`/`vuex`/`provide+inject`/`$attrs + $listeners`/`$root`

> 下面演示组件之间通讯三种情况: 父传子、子传父、兄弟组件之间的通讯

**1\. 父子组件通信**

> 使用`props`，父组件可以使用`props`向子组件传递数据。

父组件`vue`模板`father.vue`:

```html

    <template>
      <child :msg="message"></child>
    </template>

    <script>
    import child from './child.vue';
    export default {
      components: {
        child
      },
      data () {
        return {
          message: 'father message';
        }
      }
    }
    </script>
```

子组件`vue`模板`child.vue`:

```html

    <template>
        <div>{{msg}}</div>
    </template>

    <script>
    export default {
      props: {
        msg: {
          type: String,
          required: true
        }
      }
    }
    </script>
```

**回调函数（callBack）**

父传子：将父组件里定义的`method`作为`props`传入子组件

```js

    // 父组件Parent.vue：
    <Child :changeMsgFn="changeMessage">
    methods: {
    	changeMessage(){
    		this.message = 'test'
    	}
    }
```

```js

    // 子组件Child.vue：
    <button @click="changeMsgFn">
    props:['changeMsgFn']
```

**子组件向父组件通信**

> 父组件向子组件传递事件方法，子组件通过`$emit`触发事件，回调给父组件

父组件`vue`模板`father.vue`:

```html

    <template>
        <child @msgFunc="func"></child>
    </template>

    <script>
    import child from './child.vue';
    export default {
        components: {
            child
        },
        methods: {
            func (msg) {
                console.log(msg);
            }
        }
    }
    </script>
```

子组件`vue`模板`child.vue`:

```html

    <template>
        <button @click="handleClick">点我</button>
    </template>

    <script>
    export default {
        props: {
            msg: {
                type: String,
                required: true
            }
        },
        methods () {
            handleClick () {
              //........
              this.$emit('msgFunc');
            }
        }
    }
    </script>
```

**2\. provide / inject 跨级访问祖先组件的数据**

父组件通过使用`provide(){return{}}`提供需要传递的数据

```js

    export default {
      data() {
        return {
          title: '我是父组件',
          name: 'poetry'
        }
      },
      methods: {
        say() {
          alert(1)
        }
      },
      // provide属性 能够为后面的后代组件/嵌套的组件提供所需要的变量和方法
      provide() {
        return {
          message: '我是祖先组件提供的数据',
          name: this.name, // 传递属性
          say: this.say
        }
      }
    }
```

子组件通过使用`inject:[“参数1”,”参数2”,…]`接收父组件传递的参数

```html

    <template>
      <p>曾孙组件</p>
      <p>{{message}}</p>
    </template>
    <script>
    export default {
      // inject 注入/接收祖先组件传递的所需要的数据即可 
      //接收到的数据 变量 跟data里面的变量一样 可以直接绑定到页面 {}
      inject: [ "message","say"],
      mounted() {
        this.say();
      },
    };
    </script>
```

**3\. $parent + $children 获取父组件实例和子组件实例的集合**

*   `this.$parent` 可以直接访问该组件的父实例或组件
*   父组件也可以通过 `this.$children` 访问它所有的子组件；需要注意 `$children` 并不保证顺序，也不是响应式的

```html

    <!-- parent.vue -->
    <template>
    <div>
      <child1></child1>   
      <child2></child2> 
      <button @click="clickChild">$children方式获取子组件值</button>
    </div>
    </template>
    <script>
    import child1 from './child1'
    import child2 from './child2'
    export default {
      data(){
        return {
          total: 108
        }
      },
      components: {
        child1,
        child2  
      },
      methods: {
        funa(e){
          console.log("index",e)
        },
        clickChild(){
          console.log(this.$children[0].msg);
          console.log(this.$children[1].msg);
        }
      }
    }
    </script>
```

```html

    <!-- child1.vue -->
    <template>
      <div>
        <button @click="parentClick">点击访问父组件</button>
      </div>
    </template>
    <script>
    export default {
      data(){
        return {
          msg:"child1"
        }
      },
      methods: {
        // 访问父组件数据
        parentClick(){
          this.$parent.funa("xx")
          console.log(this.$parent.total);
        }
      }
    }
    </script>
```

```html

    <!-- child2.vue -->
    <template>
      <div>
        child2
      </div>
    </template>
    <script>
    export default {
      data(){
        return {
         msg: 'child2'
        }
      }
    }
    </script>
```

**4\. $attrs + $listeners多级组件通信**

> `$attrs` 包含了从父组件传过来的所有`props`属性

```js

    // 父组件Parent.vue：
    <Child :name="name" :age="age"/>

    // 子组件Child.vue：
    <GrandChild v-bind="$attrs" />

    // 孙子组件GrandChild
    <p>姓名：{{$attrs.name}}</p>
    <p>年龄：{{$attrs.age}}</p>
```

> `$listeners`包含了父组件监听的所有事件

```js

    // 父组件Parent.vue：
    <Child :name="name" :age="age" @changeNameFn="changeName"/>

    // 子组件Child.vue：
    <button @click="$listeners.changeNameFn"></button>
```

**5\. ref 父子组件通信**

```js

    // 父组件Parent.vue：
    <Child ref="childComp"/>
    <button @click="changeName"></button>
    changeName(){
    	console.log(this.$refs.childComp.age);
    	this.$refs.childComp.changeAge()
    }

    // 子组件Child.vue：
    data(){
    	return{
    		age:20
    	}
    },
    methods(){
    	changeAge(){
    		this.age=15
      }
    }
```

**6\. 非父子, 兄弟组件之间通信**

> `vue2`中废弃了`broadcast`广播和分发事件的方法。父子组件中可以用`props`和`$emit()`。如何实现非父子组件间的通信，可以通过实例一个`vue`实例`Bus`作为媒介，要相互通信的兄弟组件之中，都引入`Bus`，然后通过分别调用Bus事件触发和监听来实现通信和参数传递。`Bus.js`可以是这样:

```js

    // Bus.js

    // 创建一个中央时间总线类  
    class Bus {  
      constructor() {  
        this.callbacks = {};   // 存放事件的名字  
      }  
      $on(name, fn) {  
        this.callbacks[name] = this.callbacks[name] || [];  
        this.callbacks[name].push(fn);  
      }  
      $emit(name, args) {  
        if (this.callbacks[name]) {  
          this.callbacks[name].forEach((cb) => cb(args));  
        }  
      }  
    }  

    // main.js  
    Vue.prototype.$bus = new Bus() // 将$bus挂载到vue实例的原型上  
    // 另一种方式  
    Vue.prototype.$bus = new Vue() // Vue已经实现了Bus的功能  
```

```html

    <template>
    	<button @click="toBus">子组件传给兄弟组件</button>
    </template>

    <script>
    export default{
    	methods: {
        toBus () {
          this.$bus.$emit('foo', '来自兄弟组件')
        }
      }
    }
    </script>
```

另一个组件也在钩子函数中监听`on`事件

```js

    export default {
      data() {
        return {
          message: ''
        }
      },
      mounted() {
        this.$bus.$on('foo', (msg) => {
          this.message = msg
        })
      }
    }
```

**7\. $root 访问根组件中的属性或方法**

*   作用：访问根组件中的属性或方法
*   注意：是根组件，不是父组件。`$root`只对根组件有用

```js

    var vm = new Vue({
      el: "#app",
      data() {
        return {
          rootInfo:"我是根元素的属性"
        }
      },
      methods: {
        alerts() {
          alert(111)
        }
      },
      components: {
        com1: {
          data() {
            return {
              info: "组件1"
            }
          },
          template: "<p>{{ info }} <com2></com2></p>",
          components: {
            com2: {
              template: "<p>我是组件1的子组件</p>",
              created() {
                this.$root.alerts()// 根组件方法
                console.log(this.$root.rootInfo)// 我是根元素的属性
              }
            }
          }
        }
      }
    });
```

**8\. vuex**

*   适用场景: 复杂关系的组件数据传递
*   Vuex作用相当于一个用来存储共享变量的容器

![](https://s.poetries.work/uploads/2022/09/b96d3c0fcf648316.png)

*   `state`用来存放共享变量的地方
*   `getter`，可以增加一个`getter`派生状态，(相当于`store`中的计算属性），用来获得共享变量的值
*   `mutations`用来存放修改`state`的方法。
*   `actions`也是用来存放修改state的方法，不过`action`是在`mutations`的基础上进行。常用来做一些异步操作

**小结**

*   父子关系的组件数据传递选择 `props` 与 `$emit`进行传递，也可选择`ref`
*   兄弟关系的组件数据传递可选择`$bus`，其次可以选择`$parent`进行传递
*   祖先与后代组件数据传递可选择`attrs`与`listeners`或者 `Provide`与 `Inject`
*   复杂关系的组件数据传递可以通过`vuex`存放共享的变量

###  组件中写name属性的好处

> 可以标识组件的具体名称方便调试和查找对应属性

```js

    // 源码位置 src/core/global-api/extend.js

    // enable recursive self-lookup
    if (name) { 
        Sub.options.components[name] = Sub // 记录自己 在组件中递归自己  -> jsx
    }
```

###  Vue.extend 作用和原理

> 官方解释：`Vue.extend` 使用基础 `Vue` 构造器，创建一个“子类”。参数是一个包含组件选项的对象。

其实就是一个子类构造器 是 `Vue` 组件的核心 `api` 实现思路就是使用原型继承的方法返回了 Vue 的子类 并且利用 `mergeOptions` 把传入组件的 `options` 和父类的 `options` 进行了合并

*   `extend`是构造一个组件的语法器。然后这个组件你可以作用到`Vue.component`这个全局注册方法里还可以在任意`vue`模板里使用组件。 也可以作用到`vue`实例或者某个组件中的`components`属性中并在内部使用`apple`组件。
*   `Vue.component`你可以创建 ，也可以取组件。

相关代码如下

```js

    export default function initExtend(Vue) {
      let cid = 0; //组件的唯一标识
      // 创建子类继承Vue父类 便于属性扩展
      Vue.extend = function (extendOptions) {
        // 创建子类的构造函数 并且调用初始化方法
        const Sub = function VueComponent(options) {
          this._init(options); //调用Vue初始化方法
        };
        Sub.cid = cid++;
        Sub.prototype = Object.create(this.prototype); // 子类原型指向父类
        Sub.prototype.constructor = Sub; //constructor指向自己
        Sub.options = mergeOptions(this.options, extendOptions); //合并自己的options和父类的options
        return Sub;
      };
    }
```

###  Vue中如何扩展一个组件

此题属于实践题，考察大家对vue常用api使用熟练度，答题时不仅要列出这些解决方案，同时最好说出他们异同

**答题思路：**

*   按照逻辑扩展和内容扩展来列举
    *   逻辑扩展有：`mixins`、`extends`、`composition api`
    *   内容扩展有`slots`；
*   分别说出他们使用方法、场景差异和问题。
*   作为扩展，还可以说说`vue3`中新引入的`composition api`带来的变化

**回答范例：**

1.  常见的组件扩展方法有：`mixins`，`slots`，`extends`等
2.  混入`mixins`是分发 `Vue` 组件中可复用功能的非常灵活的方式。混入对象可以包含任意组件选项。当组件使用混入对象时，所有混入对象的选项将被混入该组件本身的选项

```js

    // 复用代码：它是一个配置对象，选项和组件里面一样
    const mymixin = {
       methods: {
          dosomething(){}
       }
    }
    // 全局混入：将混入对象传入
    Vue.mixin(mymixin)

    // 局部混入：做数组项设置到mixins选项，仅作用于当前组件
    const Comp = {
       mixins: [mymixin]
    }
```

1.  插槽主要用于`vue`组件中的内容分发，也可以用于组件扩展

子组件Child

```html

    <div>
      <slot>这个内容会被父组件传递的内容替换</slot>
    </div>
```

父组件Parent

```html

    <div>
       <Child>来自父组件内容</Child>
    </div>
```

如果要精确分发到不同位置可以使用`具名插槽`，如果要使用子组件中的数据可以使用作用域插槽

1.  组件选项中还有一个不太常用的选项`extends`，也可以起到扩展组件的目的

```js

    // 扩展对象
    const myextends = {
       methods: {
          dosomething(){}
       }
    }
    // 组件扩展：做数组项设置到extends选项，仅作用于当前组件
    // 跟混入的不同是它只能扩展单个对象
    // 另外如果和混入发生冲突，该选项优先级较高，优先起作用
    const Comp = {
       extends: myextends
    }
```

1.  混入的数据和方法不能明确判断来源且可能和当前组件内变量产生命名冲突，`vue3`中引入的`composition api`，可以很好解决这些问题，利用独立出来的响应式模块可以很方便的编写独立逻辑并提供响应式的数据，然后在`setup`选项中组合使用，增强代码的可读性和维护性。例如

```js

    // 复用逻辑1
    function useXX() {}
    // 复用逻辑2
    function useYY() {}
    // 逻辑组合
    const Comp = {
       setup() {
          const {xx} = useXX()
          const {yy} = useYY()
          return {xx, yy}
       }
    }
```

###  子组件可以直接改变父组件的数据么，说明原因

这是一个实践知识点，组件化开发过程中有个`单项数据流原则`，不在子组件中修改父组件是个常识问题

**思路**

*   讲讲单项数据流原则，表明为何不能这么做
*   举几个常见场景的例子说说解决方案
*   结合实践讲讲如果需要修改父组件状态应该如何做

**回答范例**

1.  所有的 `prop` 都使得其父子之间形成了一个单向下行绑定：父级 `prop` 的更新会向下流动到子组件中，但是反过来则不行。这样会防止从子组件意外变更父级组件的状态，从而导致你的应用的数据流向难以理解。另外，每次父级组件发生变更时，子组件中所有的 `prop` 都将会刷新为最新的值。这意味着你不应该在一个子组件内部改变 `prop`。如果你这样做了，`Vue` 会在浏览器控制台中发出警告

```js

    const props = defineProps(['foo'])
    // ❌ 下面行为会被警告, props是只读的!
    props.foo = 'bar'
```

1.  实际开发过程中有两个场景会想要修改一个属性：

**这个 prop 用来传递一个初始值；这个子组件接下来希望将其作为一个本地的 prop 数据来使用。** 在这种情况下，最好定义一个本地的 `data`，并将这个 `prop` 用作其初始值：

```js

    const props = defineProps(['initialCounter'])
    const counter = ref(props.initialCounter)
```

**这个 prop 以一种原始的值传入且需要进行转换。** 在这种情况下，最好使用这个 `prop` 的值来定义一个计算属性：

```js

    const props = defineProps(['size'])
    // prop变化，计算属性自动更新
    const normalizedSize = computed(() => props.size.trim().toLowerCase())
```

1.  实践中如果确实想要改变父组件属性应该`emit`一个事件让父组件去做这个变更。注意虽然我们不能直接修改一个传入的对象或者数组类型的`prop`，但是我们还是能够直接改内嵌的对象或属性

###  什么是递归组件？举个例子说明下？

**分析**

递归组件我们用的比较少，但是在`Tree`、`Menu`这类组件中会被用到。

**体验**

组件通过组件名称引用它自己，这种情况就是递归组件

```html

    <template>
      <li>
        <div> {{ model.name }}</div>
        <ul v-show="isOpen" v-if="isFolder">
          <!-- 注意这里：组件递归渲染了它自己 -->
          <TreeItem
            class="item"
            v-for="model in model.children"
            :model="model">
          </TreeItem>
        </ul>
      </li>
    <script>
    export default {
      name: 'TreeItem',
      // ...
    }
    </script>
```

**回答范例**

1.  如果某个组件通过组件名称引用它自己，这种情况就是递归组件。
2.  实际开发中类似`Tree`、`Menu`这类组件，它们的节点往往包含子节点，子节点结构和父节点往往是相同的。这类组件的数据往往也是树形结构，这种都是使用递归组件的典型场景。
3.  使用递归组件时，由于我们并未也不能在组件内部导入它自己，所以设置组件`name`属性，用来查找组件定义，如果使用`SFC`，则可以通过`SFC`文件名推断。组件内部通常也要有递归结束条件，比如`model.children`这样的判断。
4.  查看生成渲染函数可知，递归组件查找时会传递一个布尔值给`resolveComponent`，这样实际获取的组件就是当前组件本身

**原理**

递归组件编译结果中，获取组件时会传递一个标识符 `_resolveComponent("Comp", true)`

```js

    const _component_Comp = _resolveComponent("Comp", true)
```

就是在传递`maybeSelfReference`

```js

    export function resolveComponent(
      name: string,
      maybeSelfReference?: boolean
    ): ConcreteComponent | string {
      return resolveAsset(COMPONENTS, name, true, maybeSelfReference) || name
    }
```

`resolveAsset`中最终返回的是组件自身：

```js

    if (!res && maybeSelfReference) {
        // fallback to implicit self-reference
        return Component
    }
```

###  Vue中组件和插件有什么区别

**1\. 组件是什么**

组件就是把图形、非图形的各种逻辑均抽象为一个统一的概念（组件）来实现开发的模式，在Vue中每一个.vue文件都可以视为一个组件

**组件的优势**

*   降低整个系统的耦合度，在保持接口不变的情况下，我们可以替换不同的组件快速完成需求，例如输入框，可以替换为日历、时间、范围等组件作具体的实现
*   调试方便，由于整个系统是通过组件组合起来的，在出现问题的时候，可以用排除法直接移除组件，或者根据报错的组件快速定位问题，之所以能够快速定位，是因为每个组件之间低耦合，职责单一，所以逻辑会比分析整个系统要简单
*   提高可维护性，由于每个组件的职责单一，并且组件在系统中是被复用的，所以对代码进行优化可获得系统的整体升级

**2\. 插件是什么**

插件通常用来为 `Vue` 添加全局功能。插件的功能范围没有严格的限制——一般有下面几种：

*   添加全局方法或者属性。如: `vue-custom-element`
*   添加全局资源：指令/过滤器/过渡等。如 `vue-touch`
*   通过全局混入来添加一些组件选项。如`vue-router`
*   添加 `Vue` 实例方法，通过把它们添加到 `Vue.prototype` 上实现。
*   一个库，提供自己的 `API`，同时提供上面提到的一个或多个功能。如`vue-router`

**3\. 两者的区别**

两者的区别主要表现在以下几个方面：

*   编写形式
*   注册形式
*   使用场景

**3.1 编写形式**

**编写组件**

编写一个组件，可以有很多方式，我们最常见的就是vue单文件的这种格式，每一个`.vue`文件我们都可以看成是一个组件

vue文件标准格式

```html

    <template>
    </template>
    <script>
    export default{ 
        ...
    }
    </script>
    <style>
    </style>
```

我们还可以通过`template`属性来编写一个组件，如果组件内容多，我们可以在外部定义`template`组件内容，如果组件内容并不多，我们可直接写在`template`属性上

```html

    <template id="testComponent">     // 组件显示的内容
        <div>component!</div>   
    </template>

    Vue.component('componentA',{ 
        template: '#testComponent'  
        template: `<div>component</div>`  // 组件内容少可以通过这种形式
    })
```

**编写插件**

`vue`插件的实现应该暴露一个 `install` 方法。这个方法的第一个参数是 `Vue` 构造器，第二个参数是一个可选的选项对象

```js

    MyPlugin.install = function (Vue, options) {
      // 1\. 添加全局方法或 property
      Vue.myGlobalMethod = function () {
        // 逻辑...
      }

      // 2\. 添加全局资源
      Vue.directive('my-directive', {
        bind (el, binding, vnode, oldVnode) {
          // 逻辑...
        }
        ...
      })

      // 3\. 注入组件选项
      Vue.mixin({
        created: function () {
          // 逻辑...
        }
        ...
      })

      // 4\. 添加实例方法
      Vue.prototype.$myMethod = function (methodOptions) {
        // 逻辑...
      }
    }
```

**3.2 注册形式**

**组件注册**

vue组件注册主要分为**全局注册**与**局部注册**

全局注册通过`Vue.component`方法，第一个参数为组件的名称，第二个参数为传入的配置项

```js

    Vue.component('my-component-name', { /* ... */ })
```

局部注册只需在用到的地方通过`components`属性注册一个组件

```js

    const component1 = {...} // 定义一个组件

    export default {
    	components:{
    		component1   // 局部注册
    	}
    }
```

**插件注册**

插件的注册通过`Vue.use()`的方式进行注册（安装），第一个参数为插件的名字，第二个参数是可选择的配置项

```js

    Vue.use(插件名字,{ /* ... */} )
```

注意的是：

注册插件的时候，需要在调用 `new Vue()` 启动应用之前完成

`Vue.use`会自动阻止多次注册相同插件，只会注册一次

**4\. 使用场景**

*   组件 (Component) 是用来构成你的 App 的业务模块，它的目标是 `App.vue`
*   插件 (Plugin) 是用来增强你的技术栈的功能模块，它的目标是 Vue 本身

简单来说，插件就是指对`Vue`的功能的增强或补充

##  18 为什么Vue采用异步渲染

> Vue 是组件级更新，如果不采用异步更新，那么每次更新数据都会对当前组件进行重新渲染，所以为了性能， Vue 会在本轮数据更新后，在异步更新视图。核心思想 `nextTick`

![](https://s.poetries.work/uploads/2022/08/0b0716bd40a4ce7c.png)

源码相关

> `dep.notify（）` 通知 `watcher`进行更新， `subs[i].update` 依次调用 `watcher` 的 `update` ， `queueWatcher` 将`watcher` 去重放入队列， `nextTick`（ `flushSchedulerQueue` ）在下一`tick`中刷新`watcher`队列（异步）

```js

    update () { /* istanbul ignore else */ 
        if (this.lazy) { 
            this.dirty = true 
        } 
        else if (this.sync) { 
            this.run() 
        } 
        else { 
            queueWatcher(this); // 当数据发生变化时会将watcher放到一个队列中批量更新 
        }
    }

    export function queueWatcher (watcher: Watcher) { 
        const id = watcher.id // 会对相同的watcher进行过滤 
        if (has[id] == null) { 
            has[id] = true 
            if (!flushing) { 
                queue.push(watcher) 
            } else { 
                let i = queue.length - 1 
                while (i > index && queue[i].id > watcher.id) { 
                    i-- 
                }
                queue.splice(i + 1, 0, watcher) 
            }
            // queue the flush 
            if (!waiting) { 
                waiting = true 
                if (process.env.NODE_ENV !== 'production' && !config.async) { 
                    flushSchedulerQueue() 
                    return 
                }
                nextTick(flushSchedulerQueue) // 调用nextTick方法 批量的进行更新 
            } 
        } 
    }
```

##  19 v-if和v-show区别

*   `v-show`隐藏则是为该元素添加`css--display:none`，`dom`元素依旧还在。`v-if`显示隐藏是将`dom`元素整个添加或删除
*   编译过程：`v-if`切换有一个局部编译/卸载的过程，切换过程中合适地销毁和重建内部的事件监听和子组件；`v-show`只是简单的基于`css`切换
*   编译条件：`v-if`是真正的条件渲染，它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。只有渲染条件为假时，并不做操作，直到为真才渲染
*   `v-show` 由`false`变为`true`的时候不会触发组件的生命周期
*   `v-if`由`false`变为`true`的时候，触发组件的`beforeCreate`、`create`、`beforeMount`、`mounted`钩子，由`true`变为`false`的时候触发组件的`beforeDestory`、`destoryed`方法
*   性能消耗：`v-if`有更高的切换消耗；`v-show`有更高的初始渲染消耗

**v-show与v-if的使用场景**

*   `v-if` 与 `v-show` 都能控制`dom`元素在页面的显示
*   `v-if` 相比 `v-show` 开销更大的（直接操作`dom节`点增加与删除）
*   如果需要非常频繁地切换，则使用 `v-show` 较好
*   如果在运行时条件很少改变，则使用 `v-if` 较好

**v-show与v-if原理分析**

1.  `v-show`原理

不管初始条件是什么，元素总是会被渲染

我们看一下在vue中是如何实现的

代码很好理解，有`transition`就执行`transition`，没有就直接设置`display`属性

```js

    // https://github.com/vuejs/vue-next/blob/3cd30c5245da0733f9eb6f29d220f39c46518162/packages/runtime-dom/src/directives/vShow.ts
    export const vShow: ObjectDirective<VShowElement> = {
      beforeMount(el, { value }, { transition }) {
        el._vod = el.style.display === 'none' ? '' : el.style.display
        if (transition && value) {
          transition.beforeEnter(el)
        } else {
          setDisplay(el, value)
        }
      },
      mounted(el, { value }, { transition }) {
        if (transition && value) {
          transition.enter(el)
        }
      },
      updated(el, { value, oldValue }, { transition }) {
        // ...
      },
      beforeUnmount(el, { value }) {
        setDisplay(el, value)
      }
    }
```

1.  `v-if`原理

`v-if`在实现上比`v-show`要复杂的多，因为还有`else` `else-if` 等条件需要处理，这里我们也只摘抄源码中处理 `v-if` 的一小部分

返回一个`node`节点，`render`函数通过表达式的值来决定是否生成`DOM`

```js

    // https://github.com/vuejs/vue-next/blob/cdc9f336fd/packages/compiler-core/src/transforms/vIf.ts
    export const transformIf = createStructuralDirectiveTransform(
      /^(if|else|else-if)$/,
      (node, dir, context) => {
        return processIf(node, dir, context, (ifNode, branch, isRoot) => {
          // ...
          return () => {
            if (isRoot) {
              ifNode.codegenNode = createCodegenNodeForBranch(
                branch,
                key,
                context
              ) as IfConditionalExpression
            } else {
              // attach this branch's codegen node to the v-if root.
              const parentCondition = getParentCondition(ifNode.codegenNode!)
              parentCondition.alternate = createCodegenNodeForBranch(
                branch,
                key + ifNode.branches.length - 1,
                context
              )
            }
          }
        })
      }
    )
```

##  20 v-if和v-for哪个优先级更高

*   实践中不应该把`v-for`和`v-if`放一起
*   在`vue2`中，`v-for`的优先级是高于`v-if`，把它们放在一起，输出的渲染函数中可以看出会先执行循环再判断条件，哪怕我们只渲染列表中一小部分元素，也得在每次重渲染的时候遍历整个列表，这会比较浪费；另外需要注意的是在`vue3`中则完全相反，`v-if`的优先级高于`v-for`，所以`v-if`执行时，它调用的变量还不存在，就会导致异常
*   通常有两种情况下导致我们这样做：
    *   为了过滤列表中的项目 (比如 `v-for="user in users" v-if="user.isActive"`)。此时定义一个计算属性 (比如 `activeUsers`)，让其返回过滤后的列表即可（比如`users.filter(u=>u.isActive)`）
    *   为了避免渲染本应该被隐藏的列表 (比如 `v-for="user in users" v-if="shouldShowUsers"`)。此时把 `v-if` 移动至容器元素上 (比如 `ul`、`ol`)或者外面包一层`template`即可
*   文档中明确指出永远不要把 `v-if` 和 `v-for` 同时用在同一个元素上，显然这是一个重要的注意事项
*   源码里面关于代码生成的部分，能够清晰的看到是先处理`v-if`还是`v-for`，顺序上`vue2`和`vue3`正好相反，因此产生了一些症状的不同，但是不管怎样都是不能把它们写在一起的

**vue2.x源码分析**

> 在vue模板编译的时候，会将指令系统转化成可执行的`render`函数

编写一个`p`标签，同时使用`v-if`与 `v-for`

```html

    <div id="app">
      <p v-if="isShow" v-for="item in items">
        {{ item.title }}
      </p>
    </div>
```

创建`vue`实例，存放`isShow`与`items`数据

```js

    const app = new Vue({
      el: "#app",
      data() {
        return {
          items: [
            { title: "foo" },
            { title: "baz" }]
        }
      },
      computed: {
        isShow() {
          return this.items && this.items.length > 0
        }
      }
    })
```

模板指令的代码都会生成在`render`函数中，通过`app.$options.render`就能得到渲染函数

```js

    ƒ anonymous() {
      with (this) { return 
        _c('div', { attrs: { "id": "app" } }, 
        _l((items), function (item) 
        { return (isShow) ? _c('p', [_v("\n" + _s(item.title) + "\n")]) : _e() }), 0) }
    }
```

*   `_l`是`vue`的列表渲染函数，函数内部都会进行一次`if`判断
*   初步得到结论：`v-for`优先级是比`v-i`f高
*   再将`v-for`与`v-if`置于不同标签

```html

    <div id="app">
      <template v-if="isShow">
        <p v-for="item in items">{{item.title}}</p>
      </template>
    </div>
```

再输出下`render`函数

```js

    ƒ anonymous() {
      with(this){return 
        _c('div',{attrs:{"id":"app"}},
        [(isShow)?[_v("\n"),
        _l((items),function(item){return _c('p',[_v(_s(item.title))])})]:_e()],2)}
    }
```

这时候我们可以看到，`v-for`与`v-if`作用在不同标签时候，是先进行判断，再进行列表的渲染

我们再在查看下vue源码

源码位置：`\vue-dev\src\compiler\codegen\index.js`

```js

    export function genElement (el: ASTElement, state: CodegenState): string {
      if (el.parent) {
        el.pre = el.pre || el.parent.pre
      }
      if (el.staticRoot && !el.staticProcessed) {
        return genStatic(el, state)
      } else if (el.once && !el.onceProcessed) {
        return genOnce(el, state)
      } else if (el.for && !el.forProcessed) {
        return genFor(el, state)
      } else if (el.if && !el.ifProcessed) {
        return genIf(el, state)
      } else if (el.tag === 'template' && !el.slotTarget && !state.pre) {
        return genChildren(el, state) || 'void 0'
      } else if (el.tag === 'slot') {
        return genSlot(el, state)
      } else {
        // component or element
        ...
    }
```

在进行`if`判断的时候，`v-for`是比`v-if`先进行判断

最终结论：`v-for`优先级比`v-if`高

##  21 Vue的事件绑定原理

> 原生事件绑定是通过 `addEventListener` 绑定给真实元素的，组件事件绑定是通过 `Vue` 自定义的`$on` 实现的。如果要在组件上使用原生事件，需要加`.native` 修饰符，这样就相当于在父组件中把子组件当做普通 `html` 标签，然后加上原生事件。

`$on`、`$emit` 是基于发布订阅模式的，维护一个事件中心，`on` 的时候将事件按名称存在事件中心里，称之为订阅者，然后 `emit` 将对应的事件进行发布，去执行事件中心里的对应的监听器

**EventEmitter(发布订阅模式--简单版)**

```js

    // 手写发布订阅模式 EventEmitter
    class EventEmitter {
      constructor() {
        this.events = {};
      }
      // 实现订阅
      on(type, callBack) {
        if (!this.events) this.events = Object.create(null);

        if (!this.events[type]) {
          this.events[type] = [callBack];
        } else {
          this.events[type].push(callBack);
        }
      }
      // 删除订阅
      off(type, callBack) {
        if (!this.events[type]) return;
        this.events[type] = this.events[type].filter(item => {
          return item !== callBack;
        });
      }
      // 只执行一次订阅事件
      once(type, callBack) {
        function fn() {
          callBack();
          this.off(type, fn);
        }
        this.on(type, fn);
      }
      // 触发事件
      emit(type, ...rest) {
        this.events[type] && this.events[type].forEach(fn => fn.apply(this, rest));
      }
    }

    // 使用如下
    const event = new EventEmitter();

    const handle = (...rest) => {
      console.log(rest);
    };

    event.on("click", handle);

    event.emit("click", 1, 2, 3, 4);

    event.off("click", handle);

    event.emit("click", 1, 2);

    event.once("dbClick", () => {
      console.log(123456);
    });
    event.emit("dbClick");
    event.emit("dbClick");
```

**源码分析**

![](https://s.poetries.work/uploads/2022/08/e0f6b652df9a5418.png)

1.  原生 dom 的绑定

*   `Vue` 在创建真是 `dom` 时会调用 `createElm` ,默认会调用 `invokeCreateHooks`
*   会遍历当前平台下相对的属性处理代码,其中就有 `updateDOMListeners` 方法,内部会传入 `add` 方法

```js

    function updateDOMListeners (oldVnode: VNodeWithData, vnode: VNodeWithData) { 
        if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) { 
            return 
        }
        const on = vnode.data.on || {} 
        const oldOn = oldVnode.data.on || {} 
        target = vnode.elm normalizeEvents(on) 
        updateListeners(on, oldOn, add, remove, createOnceHandler, vnode.context) 
        target = undefined 
    }
    function add ( name: string, handler: Function, capture: boolean, passive: boolean ) {
        target.addEventListener( // 给当前的dom添加事件 
            name, 
            handler, 
            supportsPassive ? { capture, passive } : capture 
        ) 
    }
```

> `vue` 中绑定事件是直接绑定给真实 `dom` 元素的

1.  组件中绑定事件

```js

    export function updateComponentListeners ( vm: Component, listeners: Object, oldListeners: ?Object ) {
        target = vm updateListeners(listeners, oldListeners || {}, add, remove, createOnceHandler, vm)
        target = undefined 
    }
    function add (event, fn) { 
        target.$on(event, fn) 
    }
```

> 组件绑定事件是通过 `vue` 中自定义的 `$on` 方法来实现的

##  22 Vue 是如何实现数据双向绑定的

`Vue` 数据双向绑定主要是指：数据变化更新视图，视图变化更新数据，如下图所示：

![](https://s.poetries.work/uploads/2022/08/195830df8ba5d910.png)

*   输入框内容变化时，`Data` 中的数据同步变化。即 `View => Data` 的变化。
*   `Data` 中的数据变化时，文本节点的内容同步变化。即 `Data => View` 的变化

**Vue 主要通过以下 4 个步骤来实现数据双向绑定的**

*   **实现一个监听器 Observer**：对数据对象进行遍历，包括子属性对象的属性，利用 `Object.defineProperty()` 对属性都加上 `setter` 和 `getter`。这样的话，给这个对象的某个值赋值，就会触发 `setter`，那么就能监听到了数据变化
*   **实现一个解析器 Compile**：解析 `Vue` 模板指令，将模板中的变量都替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，调用更新函数进行数据更新
*   **实现一个订阅者 Watcher**：`Watcher` 订阅者是 `Observer` 和 `Compile` 之间通信的桥梁 ，主要的任务是订阅 `Observer` 中的属性值变化的消息，当收到属性值变化的消息时，触发解析器 `Compile` 中对应的更新函数
*   **实现一个订阅器 Dep**：订阅器采用 发布-订阅 设计模式，用来收集订阅者 `Watcher`，对监听器 `Observer` 和 订阅者 `Watcher` 进行统一管理

![](https://s.poetries.work/uploads/2022/08/976bacb8910af5bd.png)

**Vue 数据双向绑定原理图**

![](https://s.poetries.work/uploads/2022/08/aab95455d08d851d.png)

###  双向绑定的原理是什么

我们都知道 `Vue` 是数据双向绑定的框架，双向绑定由三个重要部分构成

*   数据层（Model）：应用的数据及业务逻辑
*   视图层（View）：应用的展示效果，各类UI组件
*   业务逻辑层（ViewModel）：框架封装的核心，它负责将数据与视图关联起来

而上面的这个分层的架构方案，可以用一个专业术语进行称呼：`MVVM`这里的控制层的核心功能便是 “数据双向绑定” 。自然，我们只需弄懂它是什么，便可以进一步了解数据绑定的原理

**理解ViewModel**

它的主要职责就是：

*   数据变化后更新视图
*   视图变化后更新数据

当然，它还有两个主要部分组成

*   监听器（`Observer`）：对所有数据的属性进行监听
*   解析器（`Compiler`）：对每个元素节点的指令进行扫描跟解析,根据指令模板替换数据,以及绑定相应的更新函数

###  实现双向绑定

我们还是以`Vue`为例，先来看看`Vue`中的双向绑定流程是什么的

1.  `new Vue()`首先执行初始化，对`data`执行响应化处理，这个过程发生`Observe`中
2.  同时对模板执行编译，找到其中动态绑定的数据，从`data`中获取并初始化视图，这个过程发生在`Compile`中
3.  同时定义⼀个更新函数和`Watcher`，将来对应数据变化时`Watcher`会调用更新函数
4.  由于`data`的某个`key`在⼀个视图中可能出现多次，所以每个`key`都需要⼀个管家`Dep`来管理多个`Watcher`
5.  将来data中数据⼀旦发生变化，会首先找到对应的`Dep`，通知所有`Watcher`执行更新函数

流程图如下：

![](https://s.poetries.work/uploads/2022/09/60c6dfd81740142d.png)

先来一个构造函数：执行初始化，对`data`执行响应化处理

```js

    class Vue {  
      constructor(options) {  
        this.$options = options;  
        this.$data = options.data;  

        // 对data选项做响应式处理  
        observe(this.$data);  

        // 代理data到vm上  
        proxy(this);  

        // 执行编译  
        new Compile(options.el, this);  
      }  
    }  
```

对`data`选项执行响应化具体操作

```js

    function observe(obj) {  
      if (typeof obj !== "object" || obj == null) {  
        return;  
      }  
      new Observer(obj);  
    }  

    class Observer {  
      constructor(value) {  
        this.value = value;  
        this.walk(value);  
      }  
      walk(obj) {  
        Object.keys(obj).forEach((key) => {  
          defineReactive(obj, key, obj[key]);  
        });  
      }  
    }  
```

**编译`Compile`**

对每个元素节点的指令进行扫描跟解析,根据指令模板替换数据,以及绑定相应的更新函数

![](https://s.poetries.work/uploads/2022/09/c3c70111cc822594.png)

```js

    class Compile {  
      constructor(el, vm) {  
        this.$vm = vm;  
        this.$el = document.querySelector(el);  // 获取dom  
        if (this.$el) {  
          this.compile(this.$el);  
        }  
      }  
      compile(el) {  
        const childNodes = el.childNodes;   
        Array.from(childNodes).forEach((node) => { // 遍历子元素  
          if (this.isElement(node)) {   // 判断是否为节点  
            console.log("编译元素" + node.nodeName);  
          } else if (this.isInterpolation(node)) {  
            console.log("编译插值⽂本" + node.textContent);  // 判断是否为插值文本 {{}}  
          }  
          if (node.childNodes && node.childNodes.length > 0) {  // 判断是否有子元素  
            this.compile(node);  // 对子元素进行递归遍历  
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

**依赖收集**

视图中会用到`data`中某`key`，这称为依赖。同⼀个`key`可能出现多次，每次都需要收集出来用⼀个`Watcher`来维护它们，此过程称为依赖收集多个`Watcher`需要⼀个`Dep`来管理，需要更新时由`Dep`统⼀通知

![](https://s.poetries.work/uploads/2022/09/ee371a7be5114436.png)

**实现思路**

1.  `defineReactive`时为每⼀个`key`创建⼀个`Dep`实例
2.  初始化视图时读取某个`key`，例如`name1`，创建⼀个`watcher1`
3.  由于触发`name1`的`getter`方法，便将`watcher1`添加到`name1`对应的`Dep`中
4.  当`name1`更新，`setter`触发时，便可通过对应`Dep`通知其管理所有`Watcher`更新

```js

    // 负责更新视图  
    class Watcher {  
      constructor(vm, key, updater) {  
        this.vm = vm  
        this.key = key  
        this.updaterFn = updater  

        // 创建实例时，把当前实例指定到Dep.target静态属性上  
        Dep.target = this  
        // 读一下key，触发get  
        vm[key]  
        // 置空  
        Dep.target = null  
      }  

      // 未来执行dom更新函数，由dep调用的  
      update() {  
        this.updaterFn.call(this.vm, this.vm[this.key])  
      }  
    }  
```

**声明`Dep`**

```js

    class Dep {  
      constructor() {  
        this.deps = [];  // 依赖管理  
      }  
      addDep(dep) {  
        this.deps.push(dep);  
      }  
      notify() {   
        this.deps.forEach((dep) => dep.update());  
      }  
    } 
```

**创建`watcher`时触发`getter`**

```js

    class Watcher {  
      constructor(vm, key, updateFn) {  
        Dep.target = this;  
        this.vm[this.key];  
        Dep.target = null;  
      }  
    }  
```

**依赖收集，创建`Dep`实例**

```js

    function defineReactive(obj, key, val) {  
      this.observe(val);  
      const dep = new Dep();  
      Object.defineProperty(obj, key, {  
        get() {  
          Dep.target && dep.addDep(Dep.target);// Dep.target也就是Watcher实例  
          return val;  
        },  
        set(newVal) {  
          if (newVal === val) return;  
          dep.notify(); // 通知dep执行更新方法  
        },  
      });  
    }  
```

##  23 v-model双向绑定原理

###  v-model实现原理

> 我们在 `vue` 项目中主要使用 `v-model` 指令在表单 `input`、`textarea`、`select` 等元素上创建双向数据绑定，我们知道 `v-model` 本质上不过是语法糖（可以看成是`value + input`方法的语法糖），`v-model` 在内部为不同的输入元素使用不同的属性并抛出不同的事件：

*   `text` 和 `textarea` 元素使用 `value` 属性和 `input` 事件
*   `checkbox` 和 `radio` 使用 `checked` 属性和 `change` 事件
*   `select` 字段将 `value` 作为 `prop` 并将 `change` 作为事件

**所以我们可以v-model进行如下改写：**

```html

    <input v-model="sth" />
    <!-- 等同于 -->
    <input :value="sth" @input="sth = $event.target.value" />
```

> 当在`input`元素中使用`v-model`实现双数据绑定，其实就是在输入的时候触发元素的`input`事件，通过这个语法糖，实现了数据的双向绑定

*   这个语法糖必须是固定的，也就是说属性必须为`value`，方法名必须为：`input`。
*   知道了`v-model`的原理，我们可以在自定义组件上实现`v-model`

```js

    //Parent
    <template>
      {{num}}
      <Child v-model="num">
    </template>
    export default {
      data(){
        return {
          num: 0
        }
      }
    }

    //Child
    <template>
      <div @click="add">Add</div>
    </template>
    export default {
      props: ['value'], // 属性必须为value
      methods:{
        add(){
          // 方法名为input
          this.$emit('input', this.value + 1)
        }
      }
    }
```

**原理**

会将组件的 `v-model` 默认转化成`value+input`

```js

    const VueTemplateCompiler = require('vue-template-compiler'); 
    const ele = VueTemplateCompiler.compile('<el-checkbox v-model="check"></el- checkbox>'); 

    // 观察输出的渲染函数：
    // with(this) { 
    //     return _c('el-checkbox', { 
    //         model: { 
    //             value: (check), 
    //             callback: function ($v) { check = $v }, 
    //             expression: "check" 
    //         } 
    //     }) 
    // }
```

```js

    // 源码位置 core/vdom/create-component.js line:155

    function transformModel (options, data: any) { 
        const prop = (options.model && options.model.prop) || 'value' 
        const event = (options.model && options.model.event) || 'input' 
        ;(data.attrs || (data.attrs = {}))[prop] = data.model.value 
        const on = data.on || (data.on = {}) 
        const existing = on[event] 
        const callback = data.model.callback 
        if (isDef(existing)) { 
            if (Array.isArray(existing) ? existing.indexOf(callback) === -1 : existing !== callback ) {
                on[event] = [callback].concat(existing) 
            } 
        } else { 
            on[event] = callback 
        } 
    }
```

原生的 `v-model`，会根据标签的不同生成不同的事件和属性

```js

    const VueTemplateCompiler = require('vue-template-compiler'); 
    const ele = VueTemplateCompiler.compile('<input v-model="value"/>');

    // with(this) { 
    //     return _c('input', { 
    //         directives: [{ name: "model", rawName: "v-model", value: (value), expression: "value" }], 
    //         domProps: { "value": (value) },
    //         on: {"input": function ($event) { 
    //             if ($event.target.composing) return;
    //             value = $event.target.value
    //         }
    //         }
    //     })
    // }
```

> 编译时：不同的标签解析出的内容不一样 `platforms/web/compiler/directives/model.js`

```js

    if (el.component) { 
        genComponentModel(el, value, modifiers) // component v-model doesn't need extra runtime 
        return false 
    } else if (tag === 'select') { 
        genSelect(el, value, modifiers) 
    } else if (tag === 'input' && type === 'checkbox') { 
        genCheckboxModel(el, value, modifiers) 
    } else if (tag === 'input' && type === 'radio') { 
        genRadioModel(el, value, modifiers) 
    } else if (tag === 'input' || tag === 'textarea') { 
        genDefaultModel(el, value, modifiers) 
    } else if (!config.isReservedTag(tag)) { 
        genComponentModel(el, value, modifiers) // component v-model doesn't need extra runtime 
        return false 
    }
```

> 运行时：会对元素处理一些关于输入法的问题 `platforms/web/runtime/directives/model.js`

```js

    inserted (el, binding, vnode, oldVnode) { 
        if (vnode.tag === 'select') { // #6903 
        if (oldVnode.elm && !oldVnode.elm._vOptions) { 
            mergeVNodeHook(vnode, 'postpatch', () => { 
                directive.componentUpdated(el, binding, vnode) 
            }) 
        } else { 
            setSelected(el, binding, vnode.context) 
        }
        el._vOptions = [].map.call(el.options, getValue) 
        } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) { 
            el._vModifiers = binding.modifiers 
            if (!binding.modifiers.lazy) { 
                el.addEventListener('compositionstart', onCompositionStart) 
                el.addEventListener('compositionend', onCompositionEnd) 
                // Safari < 10.2 & UIWebView doesn't fire compositionend when 
                // switching focus before confirming composition choice 
                // this also fixes the issue where some browsers e.g. iOS Chrome
                // fires "change" instead of "input" on autocomplete. 
                el.addEventListener('change', onCompositionEnd) /* istanbul ignore if */ 
                if (isIE9) { 
                    el.vmodel = true 
                }
            }
        }
    }
```

###  Vue中修饰符.sync与v-model的区别

**`sync`的作用**

*   `.sync`修饰符可以实现父子组件之间的双向绑定，并且可以实现子组件同步修改父组件的值，相比较与`v-model`来说,`sync`修饰符就简单很多了
*   一个组件上可以有多个`.sync`修饰符

```html

    <!-- 正常父传子 -->
    <Son :a="num" :b="num2" />

    <!-- 加上sync之后的父传子 -->
    <Son :a.sync="num" :b.sync="num2" />

    <!-- 它等价于 -->
    <Son 
      :a="num" 
      :b="num2" 
      @update:a="val=>num=val" 
      @update:b="val=>num2=val" 
    />

    <!-- 相当于多了一个事件监听，事件名是update:a, -->
    <!-- 回调函数中，会把接收到的值赋值给属性绑定的数据项中。 -->
```

![](https://s.poetries.work/uploads/2022/08/a50931f6f3c0cf0c.png)

**`v-model`的工作原理**

```html

    <com1 v-model="num"></com1>
    <!-- 等价于 -->
    <com1 :value="num" @input="(val)=>num=val"></com1>
```

*   相同点
    *   都是语法糖，都可以实现父子组件中的数据的双向通信
*   区别点
    *   格式不同：`v-model="num"`, `:num.sync="num"`
    *   `v-model`: `@input + value`
    *   `:num.sync`: `@update:num`
    *   `v-model`只能用一次；`.sync`可以有多个

##  24 什么是作用域插槽

**插槽**

*   创建组件虚拟节点时，会将组件儿子的虚拟节点保存起来。当初始化组件时，通过插槽属性将儿子进行分类`{a:[vnode],b[vnode]}`
*   渲染组件时会拿对应的 `slot` 属性的节点进行替换操作。（插槽的作用域为父组件）

```html

    <app>
        <div slot="a">xxxx</div>
        <div slot="b">xxxx</div>
    </app> 

    slot name="a" 
    slot name="b"
```

**作用域插槽**

*   作用域插槽在解析的时候不会作为组件的孩子节点。会解析成函数，当子组件渲染时，会调用此函数进行渲染。（插槽的作用域为子组件）
*   普通插槽渲染的作用域是父组件，作用域插槽的渲染作用域是当前子组件。

![](https://s.poetries.work/uploads/2022/08/e2fdf798ea0f3d40.png)

```js

    // 插槽

    const VueTemplateCompiler = require('vue-template-compiler'); 
    let ele = VueTemplateCompiler.compile(` 
        <my-component> 
            <div slot="header">node</div> 
            <div>react</div> 
            <div slot="footer">vue</div> 
        </my-component> `
    )

    // with(this) { 
    //     return _c('my-component', [_c('div', { 
    //         attrs: { "slot": "header" },
    //         slot: "header" 
    //     }, [_v("node")] // _文本及诶点 )
    //     , _v(" "), 
    //     _c('div', [_v("react")]), _v(" "), _c('div', { 
    //         attrs: { "slot": "footer" },
    //         slot: "footer" }, [_v("vue")])]) 
    // }

    const VueTemplateCompiler = require('vue-template-compiler');
    let ele = VueTemplateCompiler.compile(` 
        <div>
            <slot name="header"></slot> 
            <slot name="footer"></slot> 
            <slot></slot> 
        </div> `
    );

    with(this) { 
        return _c('div', [_v("node"), _v(" "), _t(_v("vue")])]), _v(" "), _t("default")], 2) 
    }
    //  _t定义在 core/instance/render-helpers/index.js
```

```js

    // 作用域插槽:
    let ele = VueTemplateCompiler.compile(` <app>
            <div slot-scope="msg" slot="footer">{{msg.a}}</div> 
        </app> `
    );

    // with(this) { 
    //     return _c('app', { scopedSlots: _u([{ 
    //         // 作用域插槽的内容会被渲染成一个函数 
    //         key: "footer", 
    //         fn: function (msg) { 
    //             return _c('div', {}, [_v(_s(msg.a))]) } }]) 
    //         })
    //     } 
    // }

    const VueTemplateCompiler = require('vue-template-compiler');
    VueTemplateCompiler.compile(` <div><slot name="footer" a="1" b="2"></slot> </div> `);

    // with(this) { return _c('div', [_t("footer", null, { "a": "1", "b": "2" })], 2) }
```

##  25 keep-alive原理

###  keep-alive 使用场景和原理

*   `keep-alive` 是 `Vue` 内置的一个组件，**可以实现组件缓存**，当组件切换时不会对当前组件进行卸载。**一般结合路由和动态组件一起使用**，用于缓存组件
*   提供 `include` 和 `exclude` 属性，**允许组件有条件的进行缓存**。两者都支持字符串或正则表达式，`include` 表示只有名称匹配的组件会被缓存，`exclude` 表示任何名称匹配的组件都不会被缓存 ，其中 `exclude` 的优先级比 `include` 高
*   对应两个钩子函数 `activated` 和`deactivated` ，当组件被激活时，触发钩子函数 `activated`，当组件被移除时，触发钩子函数 `deactivated`
*   `keep-alive` 的中还运用了 `LRU`(最近最少使用) 算法，选择最近最久未使用的组件予以淘汰

> *   `<keep-alive></keep-alive>` 包裹动态组件时，会缓存不活动的组件实例,主要用于保留组件状态或避免重新渲染
> *   比如有一个列表和一个详情，那么用户就会经常执行打开详情=>返回列表=>打开详情…这样的话列表和详情都是一个频率很高的页面，那么就可以对列表组件使用`<keep-alive></keep-alive>`进行缓存，这样用户每次返回列表的时候，都能从缓存中快速渲染，而不是重新渲染

**关于keep-alive的基本用法**

```html

    <keep-alive>
      <component :is="view"></component>
    </keep-alive>
```

使用`includes`和`exclude`：

```html

    <keep-alive include="a,b">
      <component :is="view"></component>
    </keep-alive>

    <!-- 正则表达式 (使用 `v-bind`) -->
    <keep-alive :include="/a|b/">
      <component :is="view"></component>
    </keep-alive>

    <!-- 数组 (使用 `v-bind`) -->
    <keep-alive :include="['a', 'b']">
      <component :is="view"></component>
    </keep-alive>
```

匹配首先检查组件自身的 `name` 选项，如果 `name` 选项不可用，则匹配它的局部注册名称 (父组件 `components` 选项的键值)，匿名组件不能被匹配

设置了 `keep-alive` 缓存的组件，会多出两个生命周期钩子（`activated`与`deactivated`）：

*   首次进入组件时：`beforeRouteEnter` > `beforeCreate` > `created`> `mounted` > `activated` > ... ... > `beforeRouteLeave` > `deactivated`
*   再次进入组件时：`beforeRouteEnter` >`activated` > ... ... > `beforeRouteLeave` > `deactivated`

**使用场景**

使用原则：当我们在某些场景下不需要让页面重新加载时我们可以使用`keepalive`

举个栗子:

当我们从`首页`–>`列表页`–>`商详页`–>`再返回`，这时候列表页应该是需要`keep-alive`

从`首页`–>`列表页`–>`商详页`–>`返回到列表页(需要缓存)`–>`返回到首页(需要缓存)`–>`再次进入列表页(不需要缓存)`，这时候可以按需来控制页面的`keep-alive`

在路由中设置`keepAlive`属性判断是否需要缓存

```js

    {
      path: 'list',
      name: 'itemList', // 列表页
      component (resolve) {
        require(['@/pages/item/list'], resolve)
     },
     meta: {
      keepAlive: true,
      title: '列表页'
     }
    }
```

使用`<keep-alive>`

```html

    <div id="app" class='wrapper'>
        <keep-alive>
            <!-- 需要缓存的视图组件 --> 
            <router-view v-if="$route.meta.keepAlive"></router-view>
         </keep-alive>
          <!-- 不需要缓存的视图组件 -->
         <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
```

**思考题：缓存后如何获取数据**

解决方案可以有以下两种：

*   `beforeRouteEnter`：每次组件渲染的时候，都会执行`beforeRouteEnter`

```js

    beforeRouteEnter(to, from, next){
        next(vm=>{
            console.log(vm)
            // 每次进入路由执行
            vm.getData()  // 获取数据
        })
    },
```

*   `actived`：在`keep-alive`缓存的组件被激活的时候，都会执行`actived`钩子

```js

    // 注意：服务器端渲染期间avtived不被调用
    activated(){
      this.getData() // 获取数据
    },
```

**扩展补充：LRU 算法是什么？**

![](https://s.poetries.work/uploads/2022/08/beabc92317439472.png)

> `LRU` 的核心思想是如果数据最近被访问过，那么将来被访问的几率也更高，所以我们将命中缓存的组件 `key` 重新插入到 `this.keys` 的尾部，这样一来，`this.keys` 中越往头部的数据即将来被访问几率越低，所以当缓存数量达到最大值时，我们就删除将来被访问几率最低的数据，即 `this.keys` 中第一个缓存的组件

**相关代码**

`keep-alive`是`vue`中内置的一个组件

源码位置：`src/core/components/keep-alive.js`

```js

    export default {
      name: "keep-alive",
      abstract: true, //抽象组件

      props: {
        include: patternTypes, //要缓存的组件
        exclude: patternTypes, //要排除的组件
        max: [String, Number], //最大缓存数
      },

      created() {
        this.cache = Object.create(null); //缓存对象  {a:vNode,b:vNode}
        this.keys = []; //缓存组件的key集合 [a,b]
      },

      destroyed() {
        for (const key in this.cache) {
          pruneCacheEntry(this.cache, key, this.keys);
        }
      },

      mounted() {
        //动态监听include  exclude
        this.$watch("include", (val) => {
          pruneCache(this, (name) => matches(val, name));
        });
        this.$watch("exclude", (val) => {
          pruneCache(this, (name) => !matches(val, name));
        });
      },

      render() {
        const slot = this.$slots.default; //获取包裹的插槽默认值 获取默认插槽中的第一个组件节点
        const vnode: VNode = getFirstComponentChild(slot); //获取第一个子组件
        // 获取该组件节点的componentOptions
        const componentOptions: ?VNodeComponentOptions =
          vnode && vnode.componentOptions;
        if (componentOptions) {
          // 获取该组件节点的名称，优先获取组件的name字段，如果name不存在则获取组件的tag
          const name: ?string = getComponentName(componentOptions);
          const { include, exclude } = this;
          // 不走缓存 如果name不在inlcude中或者存在于exlude中则表示不缓存，直接返回vnode
          if (
            // not included  不包含
            (include && (!name || !matches(include, name))) ||
            // excluded  排除里面
            (exclude && name && matches(exclude, name))
          ) {
            //返回虚拟节点
            return vnode;
          }

          const { cache, keys } = this;
          // 获取组件的key值
          const key: ?string =
            vnode.key == null
              ? // same constructor may get registered as different local components
                // so cid alone is not enough (#3269)
                componentOptions.Ctor.cid +
                (componentOptions.tag ? `::${componentOptions.tag}` : "")
              : vnode.key;
          // 拿到key值后去this.cache对象中去寻找是否有该值，如果有则表示该组件有缓存，即命中缓存
          if (cache[key]) {
            //通过key 找到缓存 获取实例
            vnode.componentInstance = cache[key].componentInstance;
            // make current key freshest
            remove(keys, key); //通过LRU算法把数组里面的key删掉
            keys.push(key); //把它放在数组末尾
          } else {
            cache[key] = vnode; //没找到就换存下来
            keys.push(key); //把它放在数组末尾
            // prune oldest entry  //如果超过最大值就把数组第0项删掉
            if (this.max && keys.length > parseInt(this.max)) {
              pruneCacheEntry(cache, keys[0], keys, this._vnode);
            }
          }

          vnode.data.keepAlive = true; //标记虚拟节点已经被缓存
        }
        // 返回虚拟节点
        return vnode || (slot && slot[0]);
      },
    };
```

可以看到该组件没有`template`，而是用了`render`，在组件渲染的时候会自动执行`render`函数

`this.cache`是一个对象，用来存储需要缓存的组件，它将以如下形式存储：

```js

    this.cache = {
      'key1':'组件1',
      'key2':'组件2',
      // ...
    }
```

在组件销毁的时候执行`pruneCacheEntry`函数

```js

    function pruneCacheEntry (
      cache: VNodeCache,
      key: string,
      keys: Array<string>,
      current?: VNode
    ) {
      const cached = cache[key]
      /* 判断当前没有处于被渲染状态的组件，将其销毁*/
      if (cached && (!current || cached.tag !== current.tag)) {
        cached.componentInstance.$destroy()
      }
      cache[key] = null
      remove(keys, key)
    }
```

在`mounted`钩子函数中观测 `include` 和 `exclude` 的变化，如下：

```js

    mounted () {
      this.$watch('include', val => {
          pruneCache(this, name => matches(val, name))
      })
      this.$watch('exclude', val => {
          pruneCache(this, name => !matches(val, name))
      })
    }
```

如果`include` 或`exclude` 发生了变化，即表示定义需要缓存的组件的规则或者不需要缓存的组件的规则发生了变化，那么就执行`pruneCache`函数，函数如下

```js

    function pruneCache (keepAliveInstance, filter) {
      const { cache, keys, _vnode } = keepAliveInstance
      for (const key in cache) {
        const cachedNode = cache[key]
        if (cachedNode) {
          const name = getComponentName(cachedNode.componentOptions)
          if (name && !filter(name)) {
            pruneCacheEntry(cache, key, keys, _vnode)
          }
        }
      }
    }
```

在该函数内对`this.cache`对象进行遍历，取出每一项的`name`值，用其与新的缓存规则进行匹配，如果匹配不上，则表示在新的缓存规则下该组件已经不需要被缓存，则调用`pruneCacheEntry`函数将其从`this.cache`对象剔除即可

关于`keep-alive`的最强大缓存功能是在`render`函数中实现

首先获取组件的`key`值：

```go

    const key = vnode.key == null? 
    componentOptions.Ctor.cid + (componentOptions.tag ? `::${componentOptions.tag}` : '')
    : vnode.key
```

拿到`key`值后去`this.cache`对象中去寻找是否有该值，如果有则表示该组件有缓存，即命中缓存，如下：

```go

    /* 如果命中缓存，则直接从缓存中拿 vnode 的组件实例 */
    if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance
        /* 调整该组件key的顺序，将其从原来的地方删掉并重新放在最后一个 */
        remove(keys, key)
        keys.push(key)
    } 
```

直接从缓存中拿 `vnode` 的组件实例，此时重新调整该组件`key`的顺序，将其从原来的地方删掉并重新放在`this.keys`中最后一个

`this.cache`对象中没有该`key`值的情况，如下：

```go

    /* 如果没有命中缓存，则将其设置进缓存 */
    else {
        cache[key] = vnode
        keys.push(key)
        /* 如果配置了max并且缓存的长度超过了this.max，则从缓存中删除第一个 */
        if (this.max && keys.length > parseInt(this.max)) {
            pruneCacheEntry(cache, keys[0], keys, this._vnode)
        }
    }
```

表明该组件还没有被缓存过，则以该组件的`key`为键，组件`vnode`为值，将其存入`this.cache`中，并且把`key`存入`this.keys`中

此时再判断`this.keys`中缓存组件的数量是否超过了设置的最大缓存数量值`this.max`，如果超过了，则把第一个缓存组件删掉

###  怎么缓存当前的组件？缓存后怎么更新

缓存组件使用`keep-alive`组件，这是一个非常常见且有用的优化手段，`vue3`中`keep-alive`有比较大的更新，能说的点比较多

**思路**

*   缓存用`keep-alive`，它的作用与用法
*   使用细节，例如缓存指定/排除、结合`router`和`transition`
*   组件缓存后更新可以利用`activated`或者`beforeRouteEnter`
*   原理阐述

**回答范例**

1.  开发中缓存组件使用`keep-alive`组件，`keep-alive`是`vue`内置组件，`keep-alive`包裹动态组件`component`时，会缓存不活动的组件实例，而不是销毁它们，这样在组件切换过程中将状态保留在内存中，防止重复渲染`DOM`

```html

    <keep-alive>
      <component :is="view"></component>
    </keep-alive>
```

1.  结合属性`include`和`exclude`可以明确指定缓存哪些组件或排除缓存指定组件。`vue3`中结合`vue-router`时变化较大，之前是`keep-alive`包裹`router-view`，现在需要反过来用`router-view`包裹`keep-alive`

```html

    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component"></component>
      </keep-alive>
    </router-view>
```

1.  缓存后如果要获取数据，解决方案可以有以下两种

*   `beforeRouteEnter`：在有`vue-router的`项目，每次进入路由的时候，都会执行`beforeRouteEnter`

```js

    beforeRouteEnter(to, from, next){
      next(vm=>{
        console.log(vm)
        // 每次进入路由执行
        vm.getData()  // 获取数据
      })
    },
```

*   `actived`：在`keep-alive`缓存的组件被激活的时候，都会执行`actived`钩子

```js

    activated(){
    	this.getData() // 获取数据
    },
```

1.  `keep-alive`是一个通用组件，它内部定义了一个`map`，缓存创建过的组件实例，它返回的渲染函数内部会查找内嵌的`component`组件对应组件的`vnode`，如果该组件在`map`中存在就直接返回它。由于`component`的`is`属性是个响应式数据，因此只要它变化，`keep-alive`的`render`函数就会重新执行

##  26 Vue路由相关

###  Vue-router基本使用

**mode**

*   `hash`
*   `history`

**跳转**

*   编程式（js跳转）`this.$router.push('/')`
*   声明式（标签跳转） `<router-link to=""></router-link>`

**vue路由传参数**

*   使用`query`方法传入的参数使用`this.$route.query`接受
*   使用`params`方式传入的参数使用`this.$route.params`接受

**占位**

```html

    <router-view></router-view>
```

###  vue-router 动态路由是什么

> 我们经常需要把某种模式匹配到的所有路由，全都映射到同个组件。例如，我们有一个 `User` 组件，对于所有 `ID` 各不相同的用户，都要使用这个组件来渲染。那么，我们可以在 `vue-router` 的路由路径中使用“动态路径参数”(dynamic segment) 来达到这个效果

```js

    const User = {
      template: "<div>User</div>",
    };

    const router = new VueRouter({
      routes: [
        // 动态路径参数 以冒号开头
        { path: "/user/:id", component: User },
      ],
    });
```

问题: `vue-router` 组件复用导致路由参数失效怎么办？

解决方法：

1.  通过 `watch` 监听路由参数再发请求

```js

    watch: { //通过watch来监听路由变化
     "$route": function(){
      this.getData(this.$route.params.xxx);
     }
    }
```

1.  用 `:key` 来阻止“复用”

```html

    <router-view :key="$route.fullPath" />
```

>

回答范例

1.  很多时候，我们需要将给定匹配模式的路由映射到同一个组件，这种情况就需要定义动态路由
2.  例如，我们可能有一个 `User` 组件，它应该对所有用户进行渲染，但用户 `ID` 不同。在 `Vue Router`中，我们可以在路径中使用一个动态字段来实现，例如：`{ path: '/users/:id', component: User }`，其中`:id`就是路径参数
3.  路径参数 用冒号 `:` 表示。当一个路由被匹配时，它的 `params` 的值将在每个组件中以 `this.$route.params` 的形式暴露出来。
4.  参数还可以有多个，例如/`users/:username/posts/:postId`；除了 `$route.params` 之外，`$route` 对象还公开了其他有用的信息，如 `$route.query`、`$route.hash` 等
```

###  router-link和router-view是如何起作用的

**分析**

`vue-router`中两个重要组件`router-link`和`router-view`，分别起到导航作用和内容渲染作用，但是回答如何生效还真有一定难度

**回答范例**

1.  `vue-router`中两个重要组件`router-link`和`router-view`，分别起到路由导航作用和组件内容渲染作用
2.  使用中`router-link`默认生成一个`a`标签，设置`to`属性定义跳转`path`。实际上也可以通过`custom`和插槽自定义最终的展现形式。`router-view`是要显示组件的占位组件，可以嵌套，对应路由配置的嵌套关系，配合`name`可以显示具名组件，起到更强的布局作用。
3.  `router-link`组件内部根据`custom`属性判断如何渲染最终生成节点，内部提供导航方法`navigate`，用户点击之后实际调用的是该方法，此方法最终会修改响应式的路由变量，然后重新去`routes`匹配出数组结果，`router-view`则根据其所处深度`deep`在匹配数组结果中找到对应的路由并获取组件，最终将其渲染出来。

###  Vue-router 除了 router-link 怎么实现跳转

声明式导航

```js

    <router-link to="/about">Go to About</router-link>
```

编程式导航

```js

    // literal string path
    router.push('/users/1')
    ​
    // object with path
    router.push({ path: '/users/1' })
    ​
    // named route with params to let the router build the url
    router.push({ name: 'user', params: { username: 'test' } })
```

**回答范例**

*   `vue-router`导航有两种方式：声明式导航和编程方式导航
*   声明式导航方式使用`router-link`组件，添加`to`属性导航；编程方式导航更加灵活，可传递调用`router.push()`，并传递`path`字符串或者`RouteLocationRaw`对象，指定`path`、`name`、`params`等信息
*   如果页面中简单表示跳转链接，使用`router-link`最快捷，会渲染一个a标签；如果页面是个复杂的内容，比如商品信息，可以添加点击事件，使用编程式导航
*   实际上内部两者调用的导航函数是一样的

###  Vue-router 路由模式有几种

`vue-router` 有 `3` 种路由模式：`hash`、`history`、`abstract`，对应的源码如下所示

```js

    switch (mode) {
        case 'history':
        this.history = new HTML5History(this, options.base)
    	break
        case 'hash':
        this.history = new HashHistory(this, options.base, this.fallback)
    	  break
        case 'abstract':
        this.history = new AbstractHistory(this, options.base)
    	  break
      default:
        if (process.env.NODE_ENV !== 'production') {
          assert(false, `invalid mode: ${mode}`)
        }
    }
```

其中，3 种路由模式的说明如下：

*   `hash`: 使用 `URL hash` 值来作路由，支持所有浏览器。 缺点：SEO不友好
*   `history` : 依赖 `HTML5 History API` 和服务器配置。后端将所有前端路由都渲染同一页面，但不能是`404`页面。缺点：`IE8`不支持
*   `abstract` : 支持所有 `JavaScript` 运行环境，如 `Node.js` 服务器端。如果发现没有浏览器的 `API`，路由会自动强制进入这个模式。缺点：没有`URL`，只对单机有效。前面两种都是把路径存到`URL`上面。`memory`模式不放在`URL`里面，前端一般放在`localstorage`里面。

> 注意：`v4`之前叫做`abstract history`，之后叫做`MemoryHistory`

###  Vue路由hash模式和history模式

**1\. `hash`模式**

早期的前端路由的实现就是基于 `location.hash` 来实现的。其实现原理很简单，`location.hash` 的值就是 `URL`中 `#` 后面的内容。比如下面这个网站，它的 `location.hash` 的值为 `'#search'`

```js

    https://interview.poetries.top#search
```

**hash 路由模式的实现主要是基于下面几个特性**

*   `URL` 中 `hash` 值只是客户端的一种状态，也就是说当向服务器端发出请求时，`hash` 部分不会被发送；
*   `hash` 值的改变，都会在浏览器的访问历史中增加一个记录。因此我们能通过浏览器的回退、前进按钮控制 `hash` 的切换；
*   可以通过 `a` 标签，并设置 `href` 属性，当用户点击这个标签后，`URL` 的 `hash` 值会发生改变；或者使用 `JavaScript` 来对 `loaction.hash` 进行赋值，改变 `URL` 的 `hash` 值；
*   我们可以使用 `hashchange` 事件来监听 `hash` 值的变化，从而对页面进行跳转（渲染）

```js

    window.addEventListener("hashchange", funcRef, false);
```

每一次改变 `hash`（`window.location.hash`），都会在浏览器的访问历史中增加一个记录利用 `hash` 的以上特点，就可以来实现前端路由“更新视图但不重新请求页面”的功能了

**特点**：兼容性好但是不美观

**2\. `history`模式**

`history`采用`HTML5`的新特性；且提供了两个新方法： `pushState()`， `replaceState()`可以对浏览器历史记录栈进行修改，以及`popState`事件的监听到状态变更

```js

    window.history.pushState(null, null, path);
    window.history.replaceState(null, null, path);
```

这两个方法有个共同的特点：当调用他们修改浏览器历史记录栈后，虽然当前 `URL` 改变了，但浏览器不会刷新页面，这就为单页应用前端路由“更新视图但不重新请求页面”提供了基础。

**history 路由模式的实现主要基于存在下面几个特性：**

*   `pushState` 和 `repalceState` 两个 `API` 来操作实现 `URL` 的变化 ；
*   我们可以使用 `popstate` 事件来监听 `url` 的变化，从而对页面进行跳转（渲染）；
*   `history.pushState()` 或 `history.replaceState()` 不会触发 `popstate` 事件，这时我们需要手动触发页面跳转（渲染）。

**特点**：虽然美观，但是刷新会出现 `404` 需要后端进行配置

###  了解history有哪些方法吗？说下它们的区别

> `history` 这个对象在`html5`的时候新加入两个`api` `history.pushState()` 和 `history.repalceState()` 这两个`API`可以在不进行刷新的情况下，操作浏览器的历史纪录。唯一不同的是，前者是新增一个历史记录，后者是直接替换当前的历史记录。

从参数上来说：

```js

    window.history.pushState(state,title,url)
    //state：需要保存的数据，这个数据在触发popstate事件时，可以在event.state里获取
    //title：标题，基本没用，一般传null
    //url：设定新的历史纪录的url。新的url与当前url的origin必须是一样的，否则会抛出错误。url可以时绝对路径，也可以是相对路径。
    //如 当前url是 https://www.baidu.com/a/,执行history.pushState(null, null, './qq/')，则变成 https://www.baidu.com/a/qq/，
    //执行history.pushState(null, null, '/qq/')，则变成 https://www.baidu.com/qq/

    window.history.replaceState(state,title,url)
    //与pushState 基本相同，但她是修改当前历史纪录，而 pushState 是创建新的历史纪录
```

另外还有：

*   `window.history.back()` 后退
*   `window.history.forward()`前进
*   `window.history.go(1)` 前进或者后退几步

从触发事件的监听上来说：

*   `pushState()`和`replaceState()`不能被`popstate`事件所监听
*   而后面三者可以，且用户点击浏览器前进后退键时也可以

###  如何监听 pushState 和 replaceState 的变化呢？

利用自定义事件`new Event()`创建这两个事件，并全局监听：

```html

    <body>
      <button onclick="goPage2()">去page2</button>
      <div>Page1</div>
      <script>
        let count = 0;
        function goPage2 () {
          history.pushState({ count: count++ }, `bb${count}`,'page1.html')
          console.log(history)
        }
        // 这个不能监听到 pushState
        // window.addEventListener('popstate', function (event) {
        //   console.log(event)
        // })
        function createHistoryEvent (type) {
          var fn = history[type]
          return function () {
            // 这里的 arguments 就是调用 pushState 时的三个参数集合
            var res = fn.apply(this, arguments)
            let e = new Event(type)
            e.arguments = arguments
            window.dispatchEvent(e)
            return res
          }
        }
        history.pushState = createHistoryEvent('pushState')
        history.replaceState = createHistoryEvent('replaceState')
        window.addEventListener('pushState', function (event) {
          // { type: 'pushState', arguments: [...], target: Window, ... }
          console.log(event)
        })
        window.addEventListener('replaceState', function (event) {
          console.log(event)
        })
      </script>
    </body>
```

###  Vue路由的钩子函数

> 首页可以控制导航跳转，`beforeEach`，`afterEach`等，一般用于页面`title`的修改。一些需要登录才能调整页面的重定向功能。

*   `beforeEach`主要有3个参数`to`，`from`，`next`。
*   `to`：`route`即将进入的目标路由对象。
*   `from`：`route`当前导航正要离开的路由。
*   `next`：`function`一定要调用该方法`resolve`这个钩子。执行效果依赖n`ext`方法的调用参数。可以控制网页的跳转

###  `$route`和`$router`的区别

*   `$route`是“路由信息对象”，包括`path`，`params`，`hash`，`query`，`fullPath`，`matched`，`name`等路由信息参数。
*   而`$router`是“路由实例”对象包括了路由的跳转方法，钩子函数等

###  vue-router 路由钩子函数是什么 执行顺序是什么

> 路由钩子的执行流程, 钩子函数种类有:`全局守卫`、`路由守卫`、`组件守卫`

1.  导航被触发。
2.  在失活的组件里调用 `beforeRouteLeave` 守卫。
3.  调用全局的 `beforeEach` 守卫。
4.  在重用的组件里调用 `beforeRouteUpdate` 守卫 (`2.2+`)。
5.  在路由配置里调用 `beforeEnter`。
6.  解析异步路由组件。
7.  在被激活的组件里调用 `beforeRouteEnter`。
8.  调用全局的 `beforeResolve` 守卫 (`2.5+`)。
9.  导航被确认。
10.  调用全局的 `afterEach` 钩子。
11.  触发 `DOM` 更新。
12.  调用 `beforeRouteEnter` 守卫中传给 `next` 的回调函数，创建好的组件实例会作为回调函数的参数传入

###  vue-router 有哪几种导航守卫

*   全局守卫
*   路由独享守卫
*   路由组件内的守卫

**全局守卫**

> vue-router全局有三个守卫

*   `router.beforeEach` 全局前置守卫 进入路由之前
*   `router.beforeResolve` 全局解析守卫(2.5.0+) 在`beforeRouteEnter`调用之后调用
*   `router.afterEach` 全局后置钩子 进入路由之后

```js

    // main.js 入口文件
    import router from './router'; // 引入路由
    router.beforeEach((to, from, next) => { 
      next();
    });
    router.beforeResolve((to, from, next) => {
      next();
    });
    router.afterEach((to, from) => {
      console.log('afterEach 全局后置钩子');
    });
```

**路由独享守卫**

> 如果你不想全局配置守卫的话，你可以为某些路由单独配置守卫

```js

    const router = new VueRouter({
      routes: [
        {
          path: '/foo',
          component: Foo,
          beforeEnter: (to, from, next) => { 
            // 参数用法什么的都一样,调用顺序在全局前置守卫后面，所以不会被全局守卫覆盖
            // ...
          }
        }
      ]
    })
```

**路由组件内的守卫**

*   `beforeRouteEnter` 进入路由前, 在路由独享守卫后调用 不能 获取组件实例 `this`，组件实例还没被创建
*   `beforeRouteUpdate` (`2.2`) 路由复用同一个组件时, 在当前路由改变，但是该组件被复用时调用 可以访问组件实例 `this`
*   `beforeRouteLeave` 离开当前路由时, 导航离开该组件的对应路由时调用，可以访问组件实例 `this`

###  vue-router守卫

> 导航守卫 `router.beforeEach` 全局前置守卫

*   `to: Route`: 即将要进入的目标（路由对象）
*   `from: Route`: 当前导航正要离开的路由
*   `next: Function`: 一定要调用该方法来 `resolve` 这个钩子。（一定要用这个函数才能去到下一个路由，如果不用就拦截）
*   执行效果依赖 next 方法的调用参数。
*   `next()`: 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed (确认的)。
*   `next(false)`:取消进入路由，url地址重置为from路由地址(也就是将要离开的路由地址)

```js

    // main.js 入口文件
    import router from './router'; // 引入路由
    router.beforeEach((to, from, next) => { 
      next();
    });
    router.beforeResolve((to, from, next) => {
      next();
    });
    router.afterEach((to, from) => {
      console.log('afterEach 全局后置钩子');
    });
```

> 路由独享的守卫 你可以在路由配置上直接定义 `beforeEnter` 守卫

```js

    const router = new VueRouter({
      routes: [
        {
          path: '/foo',
          component: Foo,
          beforeEnter: (to, from, next) => {
            // ...
          }
        }
      ]
    })
```

> 组件内的守卫你可以在路由组件内直接定义以下路由导航守卫

```js

    const Foo = {
      template: `...`,
      beforeRouteEnter (to, from, next) {
        // 在渲染该组件的对应路由被 confirm 前调用
        // 不！能！获取组件实例 `this`
        // 因为当守卫执行前，组件实例还没被创建
      },
      beforeRouteUpdate (to, from, next) {
        // 在当前路由改变，但是该组件被复用时调用
        // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
        // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
        // 可以访问组件实例 `this`
      },
      beforeRouteLeave (to, from, next) {
        // 导航离开该组件的对应路由时调用，我们用它来禁止用户离开
        // 可以访问组件实例 `this`
        // 比如还未保存草稿，或者在用户离开前，
        将setInterval销毁，防止离开之后，定时器还在调用。
      }
    }
```

###  vue-router中如何保护路由

**分析**

路由保护在应用开发过程中非常重要，几乎每个应用都要做各种路由权限管理，因此相当考察使用者基本功。

**体验**

全局守卫：

```js

    const router = createRouter({ ... })
    ​
    router.beforeEach((to, from) => {
      // ...
      // 返回 false 以取消导航
      return false
    })
```

路由独享守卫：

```js

    const routes = [
      {
        path: '/users/:id',
        component: UserDetails,
        beforeEnter: (to, from) => {
          // reject the navigation
          return false
        },
      },
    ]
```

组件内的守卫：

```js

    const UserDetails = {
      template: `...`,
      beforeRouteEnter(to, from) {
        // 在渲染该组件的对应路由被验证前调用
      },
      beforeRouteUpdate(to, from) {
        // 在当前路由改变，但是该组件被复用时调用
      },
      beforeRouteLeave(to, from) {
        // 在导航离开渲染该组件的对应路由时调用
      },
    }
```

**回答**

*   `vue-router`中保护路由的方法叫做路由守卫，主要用来通过跳转或取消的方式守卫导航。
*   路由守卫有三个级别：`全局`、`路由独享`、`组件级`。影响范围由大到小，例如全局的`router.beforeEach()`，可以注册一个全局前置守卫，每次路由导航都会经过这个守卫，因此在其内部可以加入控制逻辑决定用户是否可以导航到目标路由；在路由注册的时候可以加入单路由独享的守卫，例如`beforeEnter`，守卫只在进入路由时触发，因此只会影响这个路由，控制更精确；我们还可以为路由组件添加守卫配置，例如`beforeRouteEnter`，会在渲染该组件的对应路由被验证前调用，控制的范围更精确了。
*   用户的任何导航行为都会走`navigate`方法，内部有个`guards`队列按顺序执行用户注册的守卫钩子函数，如果没有通过验证逻辑则会取消原有的导航。

**原理**

`runGuardQueue(guards)`链式的执行用户在各级别注册的守卫钩子函数，通过则继续下一个级别的守卫，不通过进入`catch`流程取消原本导航

```js

    // 源码
    runGuardQueue(guards)
      .then(() => {
        // check global guards beforeEach
        guards = []
        for (const guard of beforeGuards.list()) {
          guards.push(guardToPromiseFn(guard, to, from))
        }
        guards.push(canceledNavigationCheck)

        return runGuardQueue(guards)
      })
      .then(() => {
        // check in components beforeRouteUpdate
        guards = extractComponentsGuards(
          updatingRecords,
          'beforeRouteUpdate',
          to,
          from
        )

        for (const record of updatingRecords) {
          record.updateGuards.forEach(guard => {
            guards.push(guardToPromiseFn(guard, to, from))
          })
        }
        guards.push(canceledNavigationCheck)

        // run the queue of per route beforeEnter guards
        return runGuardQueue(guards)
      })
      .then(() => {
        // check the route beforeEnter
        guards = []
        for (const record of to.matched) {
          // do not trigger beforeEnter on reused views
          if (record.beforeEnter && !from.matched.includes(record)) {
            if (isArray(record.beforeEnter)) {
              for (const beforeEnter of record.beforeEnter)
                guards.push(guardToPromiseFn(beforeEnter, to, from))
            } else {
              guards.push(guardToPromiseFn(record.beforeEnter, to, from))
            }
          }
        }
        guards.push(canceledNavigationCheck)

        // run the queue of per route beforeEnter guards
        return runGuardQueue(guards)
      })
      .then(() => {
        // NOTE: at this point to.matched is normalized and does not contain any () => Promise<Component>

        // clear existing enterCallbacks, these are added by extractComponentsGuards
        to.matched.forEach(record => (record.enterCallbacks = {}))

        // check in-component beforeRouteEnter
        guards = extractComponentsGuards(
          enteringRecords,
          'beforeRouteEnter',
          to,
          from
        )
        guards.push(canceledNavigationCheck)

        // run the queue of per route beforeEnter guards
        return runGuardQueue(guards)
      })
      .then(() => {
        // check global guards beforeResolve
        guards = []
        for (const guard of beforeResolveGuards.list()) {
          guards.push(guardToPromiseFn(guard, to, from))
        }
        guards.push(canceledNavigationCheck)

        return runGuardQueue(guards)
      })
      // catch any navigation canceled
      .catch(err =>
        isNavigationFailure(err, ErrorTypes.NAVIGATION_CANCELLED)
          ? err
          : Promise.reject(err)
      )
```

[源码位置<span><span class="sr-only">(opens new window)</span></span>](https://github1s.com/vuejs/router/blob/HEAD/packages/router/src/router.ts#L808-L809)

###  怎么实现路由懒加载呢

这是一道应用题。当打包应用时，JavaScript 包会变得非常大，影响页面加载。如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问时才加载对应组件，这样就会更加高效

```js

    // 将
    // import UserDetails from './views/UserDetails'
    // 替换为
    const UserDetails = () => import('./views/UserDetails')
    ​
    const router = createRouter({
      // ...
      routes: [{ path: '/users/:id', component: UserDetails }],
    })
```

**回答范例**

1.  当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。利用路由懒加载我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样会更加高效，是一种优化手段
2.  一般来说，对所有的**路由都使用动态导入**是个好主意
3.  给`component`选项配置一个返回 `Promise` 组件的函数就可以定义懒加载路由。例如：`{ path: '/users/:id', component: () => import('./views/UserDetails') }`
4.  结合注释 `() => import(/* webpackChunkName: "group-user" */ './UserDetails.vue')` 可以做`webpack`代码分块

###  Vue要做权限管理该怎么做？控制到按钮级别的权限怎么做？

**分析**

*   综合实践题目，实际开发中经常需要面临权限管理的需求，考查实际应用能力。
*   权限管理一般需求是两个：页面权限和按钮权限，从这两个方面论述即可。

![](https://s.poetries.work/uploads/2022/08/1715e3218aeb3d7c.png)

**思路**

*   权限管理需求分析：页面和按钮权限
*   权限管理的实现方案：分后端方案和前端方案阐述
*   说说各自的优缺点

**回答范例**

1.  权限管理一般需求是页面权限和按钮权限的管理
2.  具体实现的时候分后端和前端两种方案：

*   **前端方案** 会把所有路由信息在前端配置，通过路由守卫要求用户登录，用户登录后根据角色过滤出路由表。比如我会配置一个`asyncRoutes`数组，需要认证的页面在其路由的`meta`中添加一个`roles`字段，等获取用户角色之后取两者的交集，若结果不为空则说明可以访问。此过滤过程结束，剩下的路由就是该用户能访问的页面，最后通过`router.addRoutes(accessRoutes)`方式动态添加路由即可
*   **后端方案** 会把所有页面路由信息存在数据库中，用户登录的时候根据其角色查询得到其能访问的所有页面路由信息返回给前端，前端再通过`addRoutes`动态添加路由信息
*   按钮权限的控制通常会`实现一个指令`，例如`v-permission`，将按钮要求角色通过值传给`v-permission`指令，在指令的`moutned`钩子中可以判断当前用户角色和按钮是否存在交集，有则保留按钮，无则移除按钮

1.  纯前端方案的优点是实现简单，不需要额外权限管理页面，但是维护起来问题比较大，有新的页面和角色需求就要修改前端代码重新打包部署；服务端方案就不存在这个问题，通过专门的角色和权限管理页面，配置页面和按钮权限信息到数据库，应用每次登陆时获取的都是最新的路由信息，可谓一劳永逸！

**可能的追问**

1.  类似`Tabs`这类组件能不能使用`v-permission`指令实现按钮权限控制？

```html

    <el-tabs> 
      <el-tab-pane label="⽤户管理" name="first">⽤户管理</el-tab-pane> 
    	<el-tab-pane label="⻆⾊管理" name="third">⻆⾊管理</el-tab-pane>
    </el-tabs>
```

1.  服务端返回的路由信息如何添加到路由器中？

```js

    // 前端组件名和组件映射表
    const map = {
      //xx: require('@/views/xx.vue').default // 同步的⽅式
      xx: () => import('@/views/xx.vue') // 异步的⽅式
    }
    // 服务端返回的asyncRoutes
    const asyncRoutes = [
      { path: '/xx', component: 'xx',... }
    ]
    // 遍历asyncRoutes，将component替换为map[component]
    function mapComponent(asyncRoutes) {
      asyncRoutes.forEach(route => {
        route.component = map[route.component];
        if(route.children) {
          route.children.map(child => mapComponent(child))
        }
    	})
    }
    mapComponent(asyncRoutes)
```

###  如果让你从零开始写一个vue路由，说说你的思路

**思路分析：**

首先思考`vue`路由要解决的问题：用户点击跳转链接内容切换，页面不刷新。

*   借助`hash`或者`history api`实现`url`跳转页面不刷新
*   同时监听`hashchange`事件或者`popstate`事件处理跳转
*   根据`hash`值或者`state`值从`routes`表中匹配对应`component`并渲染

**回答范例：**

一个`SPA`应用的路由需要解决的问题是**页面跳转内容改变同时不刷新**，同时路由还需要以插件形式存在，所以：

1.  首先我会定义一个`createRouter`函数，返回路由器实例，实例内部做几件事

*   保存用户传入的配置项
*   监听`hash`或者`popstate`事件
*   回调里根据`path`匹配对应路由

1.  将`router`定义成一个`Vue`插件，即实现`install`方法，内部做两件事

*   实现两个全局组件：`router-link`和`router-view`，分别实现页面跳转和内容显示
*   定义两个全局变量：`$route`和`$router`，组件内可以访问当前路由和路由器实例

##  27 Vuex相关

###  vuex是什么？怎么使用？哪种功能场景使用它？

> `Vuex` 是一个专为 `Vue.js` 应用程序开发的状态管理模式。`vuex` 就是一个仓库，仓库里放了很多对象。其中 `state` 就是数据源存放地，对应于一般 vue 对象里面的 `data` 里面存放的数据是响应式的，`vue` 组件从 `store` 读取数据，若是 `store` 中的数据发生改变，依赖这相数据的组件也会发生更新它通过 `mapState` 把全局的 `state` 和 `getters` 映射到当前组件的 `computed` 计算属性

*   `vuex` 一般用于中大型 `web` 单页应用中对应用的状态进行管理，对于一些组件间关系较为简单的小型应用，使用 `vuex` 的必要性不是很大，因为完全可以用组件 `prop` 属性或者事件来完成父子组件之间的通信，`vuex` 更多地用于解决跨组件通信以及作为数据中心集中式存储数据。
*   使用`Vuex`解决非父子组件之间通信问题 `vuex` 是通过将 `state` 作为数据中心、各个组件共享 `state` 实现跨组件通信的，此时的数据完全独立于组件，因此将组件间共享的数据置于 `State` 中能有效解决多层级组件嵌套的跨组件通信问题

> `vuex` 的 `State` 在单页应用的开发中本身具有一个“数据库”的作用，可以将组件中用到的数据存储在 `State` 中，并在 `Action` 中封装数据读写的逻辑。这时候存在一个问题，一般什么样的数据会放在 `State` 中呢？ 目前主要有两种数据会使用 `vuex` 进行管理：

*   组件之间全局共享的数据
*   通过后端异步请求的数据

![](https://s.poetries.work/gitee/2020/07/62.png)

**包括以下几个模块**

*   `state`：`Vuex` 使用单一状态树,即每个应用将仅仅包含一个`store` 实例。里面存放的数据是响应式的，`vue` 组件从 `store` 读取数据，若是 `store` 中的数据发生改变，依赖这相数据的组件也会发生更新。它通过 `mapState` 把全局的 `state` 和 `getters` 映射到当前组件的 `computed` 计算属性
*   `mutations`：更改`Vuex`的`store`中的状态的唯一方法是提交`mutation`
*   `getters`：`getter` 可以对 `state` 进行计算操作，它就是 `store` 的计算属性虽然在组件内也可以做计算属性，但是 `getters` 可以在多给件之间复用如果一个状态只在一个组件内使用，是可以不用 `getters`
*   `action`：`action` 类似于 `muation`, 不同在于：`action` 提交的是 `mutation`,而不是直接变更状态`action` 可以包含任意异步操作
*   `modules`：面对复杂的应用程序，当管理的状态比较多时；我们需要将`vuex`的`store`对象分割成模块(`modules`)

![](https://s.poetries.work/gitee/2020/07/63.png)

> `modules`：项目特别复杂的时候，可以让每一个模块拥有自己的`state`、`mutation`、`action`、`getters`，使得结构非常清晰，方便管理

![](https://s.poetries.work/gitee/2020/07/64.png)


>回答范例

**思路**

*   给定义
*   必要性阐述
*   何时使用
*   拓展：一些个人思考、实践经验等

**回答范例**

1.  `Vuex` 是一个专为 `Vue.js` 应用开发的**状态管理模式 + 库**。它采用集中式存储，管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。
2.  我们期待以一种简单的“单向数据流”的方式管理应用，即**状态 -> 视图 -> 操作单向循环**的方式。但当我们的应用遇到多个组件共享状态时，比如：多个视图依赖于同一状态或者来自不同视图的行为需要变更同一状态。此时单向数据流的简洁性很容易被破坏。因此，我们有必要把组件的共享状态抽取出来，以一个全局单例模式管理。通过定义和隔离状态管理中的各种概念并通过强制规则维持视图和状态间的独立性，我们的代码将会变得更结构化且易维护。这是`vuex`存在的必要性，它和`react`生态中的`redux`之类是一个概念
3.  `Vuex` 解决状态管理的同时引入了不少概念：例如`state`、`mutation`、`action`等，是否需要引入还需要根据应用的实际情况衡量一下：如果不打算开发大型单页应用，使用 `Vuex` 反而是繁琐冗余的，一个简单的 `store` 模式就足够了。但是，如果要构建一个中大型单页应用，`Vuex` 基本是标配。
4.  我在使用`vuex`过程中感受到一些等

**可能的追问**

1.  `vuex`有什么缺点吗？你在开发过程中有遇到什么问题吗？

*   刷新浏览器，`vuex`中的`state`会重新变为初始状态。解决方案-插件 `vuex-persistedstate`

1.  `action`和`mutation`的区别是什么？为什么要区分它们？

> *   `action`中处理异步，`mutation`不可以
> *   `mutation`做原子操作
> *   `action`可以整合多个`mutation`的集合
> *   `mutation` 是同步更新数据(内部会进行是否为异步方式更新数据的检测) `$watch` 严格模式下会报错
> *   `action` 异步操作，可以获取数据后调佣 `mutation` 提交最终数据

*   流程顺序：“相应视图—>修改State”拆分成两部分，视图触发`Action`，`Action再触发`Mutation`。
*   基于流程顺序，二者扮演不同的角色：`Mutation`：专注于修改`State`，理论上是修改`State`的唯一途径。`Action`：业务代码、异步请求
*   角色不同，二者有不同的限制：`Mutation`：必须同步执行。`Action`：可以异步，但不能直接操作`State`
```

###  Vuex中actions和mutations有什么区别

**题目分析**

*   `mutations`和`actions`是`vuex`带来的两个独特的概念。新手程序员容易混淆，所以面试官喜欢问。
*   我们只需记住修改状态只能是`mutations`，`actions`只能通过提交`mutation`修改状态即可

**回答范例**

1.  更改 `Vuex` 的 `store` 中的状态的唯一方法是提交 `mutation`，`mutation` 非常类似于事件：每个 `mutation` 都有一个字符串的类型 (`type`)和一个 回调函数 (`handler`) 。`Action` 类似于 `mutation`，不同在于：`Action`可以包含任意异步操作，但它不能修改状态， 需要提交`mutation`才能变更状态
2.  开发时，包含异步操作或者复杂业务组合时使用`action`；需要直接修改状态则提交`mutation`。但由于`dispatch`和`commit`是两个`API`，容易引起混淆，实践中也会采用统一使用`dispatch action`的方式。调用`dispatch`和`commit`两个`API`时几乎完全一样，但是定义两者时却不甚相同，`mutation`的回调函数接收参数是`state`对象。`action`则是与`Store`实例具有相同方法和属性的上下文`context`对象，因此一般会解构它为`{commit, dispatch, state}`，从而方便编码。另外`dispatch`会返回`Promise`实例便于处理内部异步结果
3.  实现上`commit(type)`方法相当于调用`options.mutations[type](state)`；`dispatch(type)`方法相当于调用`options.actions[type](store)`，这样就很容易理解两者使用上的不同了

**实现**

我们可以像下面这样简单实现`commit`和`dispatch`，从而辨别两者不同

```js

    class Store {
        constructor(options) {
            this.state = reactive(options.state)
            this.options = options
        }
        commit(type, payload) {
            // 传入上下文和参数1都是state对象
            this.options.mutations[type].call(this.state, this.state, payload)
        }
        dispatch(type, payload) {
            // 传入上下文和参数1都是store本身
            this.options.actions[type].call(this, this, payload)
        }
    }
```

###  怎么监听vuex数据的变化

**分析**

*   `vuex`数据状态是响应式的，所以状态变视图跟着变，但是有时还是需要知道数据状态变了从而做一些事情。
*   既然状态都是响应式的，那自然可以`watch`，另外`vuex`也提供了订阅的API：`store.subscribe()`

**回答范例**

1.  我知道几种方法：

*   可以通过`watch`选项或者`watch`方法监听状态
*   可以使用`vuex`提供的API：`store.subscribe()`

1.  `watch`选项方式，可以以字符串形式监听`$store.state.xx`；`subscribe`方式，可以调用`store.subscribe(cb)`,回调函数接收`mutation`对象和`state`对象，这样可以进一步判断`mutation.type`是否是期待的那个，从而进一步做后续处理。
2.  `watch`方式简单好用，且能获取变化前后值，首选；`subscribe`方法会被所有`commit`行为触发，因此还需要判断`mutation.type`，用起来略繁琐，一般用于`vuex`插件中

**实践**

`watch`方式

```js

    const app = createApp({
        watch: {
          '$store.state.counter'() {
            console.log('counter change!');
          }
        }
    })
```

`subscribe`方式：

```js

     store.subscribe((mutation, state) => {
        if (mutation.type === 'add') {
          console.log('counter change in subscribe()!');
        }
    })
```

###  Vuex 页面刷新数据丢失怎么解决

**体验**

可以从`localStorage`中获取作为状态初始值：

```js

    const store = createStore({
      state () {
        return {
          count: localStorage.getItem('count')
        }
      }
    })
```

业务代码中，提交修改状态同时保存最新值：虽说实现了，但是每次还要手动刷新`localStorage`不太优雅

```js

    store.commit('increment')
    localStorage.setItem('count', store.state.count)
```

**回答范例**

1.  `vuex`只是在内存保存状态，刷新之后就会丢失，如果要持久化就要存起来
2.  `localStorage`就很合适，提交`mutation`的时候同时存入`localStorage`，`store`中把值取出作为`state`的初始值即可。
3.  这里有两个问题，不是所有状态都需要持久化；如果需要保存的状态很多，编写的代码就不够优雅，每个提交的地方都要单独做保存处理。这里就可以利用`vuex`提供的`subscribe`方法做一个统一的处理。甚至可以封装一个`vuex`插件以便复用。
4.  类似的插件有`vuex-persist`、`vuex-persistedstate`，内部的实现就是通过订阅`mutation`变化做统一处理，通过插件的选项控制哪些需要持久化

**原理**

可以看一下[vuex-persist<span><span class="sr-only">(opens new window)</span></span>](https://github.com/championswimmer/vuex-persist/blob/master/src/index.ts#L277)内部确实是利用`subscribe`实现的

###  Vuex 为什么要分模块并且加命名空间

*   **模块**: 由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，`store` 对象就有可能变得相当臃肿。为了解决以上问题，`Vuex` 允许我们将 `store` 分割成模块（`module`）。每个模块拥有自己的 `state`、`mutation`、`action`、`getter`、甚至是嵌套子模块
*   **命名空间**：默认情况下，模块内部的 `action`、`mutation` 和 `getter` 是注册在全局命名空间的——这样使得多个模块能够对同一 `mutation` 或 `action` 作出响应。如果希望你的模块具有更高的封装度和复用性，你可以通过添加 `namespaced: true` 的方式使其成为带命名空间的模块。当模块被注册后，它的所有 `getter`、`action` 及 `mutation` 都会自动根据模块注册的路径调整命名

###  你有使用过vuex的module吗？

```js

    const moduleA = {
      state: () => ({ ... }),
      mutations: { ... },
      actions: { ... },
      getters: { ... }
    }
    const moduleB = {
      state: () => ({ ... }),
      mutations: { ... },
      actions: { ... }
    }
    const store = createStore({
      modules: {
        a: moduleA,
        b: moduleB
      }
    })
    store.state.a // -> moduleA 的状态
    store.state.b // -> moduleB 的状态
    store.getters.c // -> moduleA里的getters
    store.commit('d') // -> 能同时触发子模块中同名mutation
    store.dispatch('e') // -> 能同时触发子模块中同名action
```

*   用过`module`，项目规模变大之后，单独一个`store`对象会过于庞大臃肿，通过模块方式可以拆分开来便于维护
*   可以按之前规则单独编写子模块代码，然后在主文件中通过`modules`选项组织起来：`reateStore({modules:{...}})`
*   不过使用时要注意访问子模块状态时需要加上注册时模块名：`store.state.a.xxx`，但同时`getters`、`mutations`和`actions`又在全局空间中，使用方式和之前一样。如果要做到完全拆分，需要在子块加上`namespace`选项，此时再访问它们就要加上命名空间前缀。
*   很显然，模块的方式可以拆分代码，但是缺点也很明显，就是使用起来比较繁琐复杂，容易出错。而且类型系统支持很差，不能给我们带来帮助。`pinia`显然在这方面有了很大改进，是时候切换过去了

###  你觉得vuex有什么缺点

**分析**

相较于`redux`，`vuex`已经相当简便好用了。但模块的使用比较繁琐，对`ts`支持也不好。

**体验**

使用模块：用起来比较繁琐，使用模式也不统一，基本上得不到类型系统的任何支持

```js

    const store = createStore({
      modules: {
        a: moduleA
      }
    })
    store.state.a // -> 要带上 moduleA 的key，内嵌模块的话会很长，不得不配合mapState使用
    store.getters.c // -> moduleA里的getters，没有namespaced时又变成了全局的
    store.getters['a/c'] // -> 有namespaced时要加path，使用模式又和state不一样
    store.commit('d') // -> 没有namespaced时变成了全局的，能同时触发多个子模块中同名mutation
    store.commit('a/d') // -> 有namespaced时要加path，配合mapMutations使用感觉也没简化
```

**回答范例**

1.  `vuex`利用响应式，使用起来已经相当方便快捷了。但是在使用过程中感觉模块化这一块做的过于复杂，用的时候容易出错，还要经常查看文档
2.  比如：访问`state`时要带上模块`key`，内嵌模块的话会很长，不得不配合`mapState`使用，加不加`namespaced`区别也很大，`getters`，`mutations`，`actions`这些默认是全局，加上之后必须用字符串类型的path来匹配，使用模式不统一，容易出错；对ts的支持也不友好，在使用模块时没有代码提示。
3.  之前`Vue2`项目中用过`vuex-module-decorators`的解决方案，虽然类型支持上有所改善，但又要学一套新东西，增加了学习成本。`pinia`出现之后使用体验好了很多，`Vue3 + pinia`会是更好的组合

**原理**

下面我们来看看`vuex`中`store.state.x.y`这种嵌套的路径是怎么搞出来的

> 首先是子模块安装过程：父模块状态`parentState`上面设置了子模块名称`moduleName`，值为当前模块`state`对象。放在上面的例子中相当于：`store.state['x'] = moduleX.state`。此过程是递归的，那么`store.state.x.y`安装时就是：`store.state['x']['y'] = moduleY.state`

```js

    //源码位置 https://github1s.com/vuejs/vuex/blob/HEAD/src/store-util.js#L102-L115
    if (!isRoot && !hot) {
        // 获取父模块state
        const parentState = getNestedState(rootState, path.slice(0, -1))
        // 获取子模块名称
        const moduleName = path[path.length - 1]
        store._withCommit(() => {
            // 把子模块state设置到父模块上
            parentState[moduleName] = module.state
        })
    }
```

###  用过pinia吗？有什么优点？

**1\. pinia是什么？**

> *   在`Vue3`中，可以使用传统的`Vuex`来实现状态管理，也可以使用最新的`pinia`来实现状态管理，我们来看看官网如何解释`pinia`的：`Pinia` 是 `Vue` 的存储库，它允许您跨组件/页面共享状态。
> *   实际上，`pinia`就是`Vuex`的升级版，官网也说过，为了尊重原作者，所以取名`pinia`，而没有取名`Vuex`，所以大家可以直接将`pinia`比作为`Vue3`的`Vuex`

**2\. 为什么要使用pinia？**

*   `Vue2`和`Vue3`都支持，这让我们同时使用`Vue2`和`Vue3`的小伙伴都能很快上手。
*   `pinia`中只有`state`、`getter`、`action`，抛弃了`Vuex`中的`Mutation`，`Vuex`中`mutation`一直都不太受小伙伴们的待见，`pinia`直接抛弃它了，这无疑减少了我们工作量。
*   `pinia`中`action`支持同步和异步，`Vuex`不支持
*   良好的`Typescript`支持，毕竟我们`Vue3`都推荐使用`TS`来编写，这个时候使用`pinia`就非常合适了
*   无需再创建各个模块嵌套了，`Vuex`中如果数据过多，我们通常分模块来进行管理，稍显麻烦，而`pinia`中每个`store`都是独立的，互相不影响。
*   体积非常小，只有`1KB`左右。
*   `pinia`支持插件来扩展自身功能。
*   支持服务端渲染

**3\. pinna使用**

[pinna文档<span><span class="sr-only">(opens new window)</span></span>](https://pinia.web3doc.top/)

1.  准备工作

我们这里搭建一个最新的`Vue3 + TS + Vite`项目

```js

    npm create vite@latest my-vite-app --template vue-ts
```

1.  `pinia`基础使用

```js

    yarn add pinia
```

```js

    // main.ts
    import { createApp } from "vue";
    import App from "./App.vue";
    import { createPinia } from "pinia";
    const pinia = createPinia();

    const app = createApp(App);
    app.use(pinia);
    app.mount("#app");
```

2.1 创建`store`

```js

    //sbinsrc/store/user.ts
    import { defineStore } from 'pinia'

    // 第一个参数是应用程序中 store 的唯一 id
    export const useUsersStore = defineStore('users', {
      // 其它配置项
    })
```

创建`store`很简单，调用p`inia`中的`defineStore`函数即可，该函数接收两个参数：

*   `name`：一个字符串，必传项，该`store`的唯一`id`。
*   `options`：一个对象，`store`的配置项，比如配置`store`内的数据，修改数据的方法等等。

我们可以定义任意数量的`store`，因为我们其实一个`store`就是一个函数，这也是`pinia`的好处之一，让我们的代码扁平化了，这和`Vue3`的实现思想是一样的

2.2 使用`store`

```html

    <!-- src/App.vue -->
    <script setup lang="ts">
    import { useUsersStore } from "../src/store/user";
    const store = useUsersStore();
    console.log(store);
    </script>
```

2.3 添加`state`

```js

    export const useUsersStore = defineStore("users", {
      state: () => {
        return {
          name: "test",
          age: 20,
          sex: "男",
        };
      },
    });
```

2.4 读取`state`数据

```html

    <template>
      <img alt="Vue logo" src="./assets/logo.png" />
      <p>姓名：{{ name }}</p>
      <p>年龄：{{ age }}</p>
      <p>性别：{{ sex }}</p>
    </template>
    <script setup lang="ts">
    import { ref } from "vue";
    import { useUsersStore } from "../src/store/user";
    const store = useUsersStore();
    const name = ref<string>(store.name);
    const age = ref<number>(store.age);
    const sex = ref<string>(store.sex);
    </script>
```

上段代码中我们直接通过`store.age`等方式获取到了`store`存储的值，但是大家有没有发现，这样比较繁琐，我们其实可以用解构的方式来获取值，使得代码更简洁一点

```js

    import { useUsersStore, storeToRefs } from "../src/store/user";
    const store = useUsersStore();
    const { name, age, sex } = storeToRefs(store); // storeToRefs获取的值是响应式的
```

2.5 修改`state`数据

```html

    <template>
      <img alt="Vue logo" src="./assets/logo.png" />
      <p>姓名：{{ name }}</p>
      <p>年龄：{{ age }}</p>
      <p>性别：{{ sex }}</p>
      <button @click="changeName">更改姓名</button>
    </template>
    <script setup lang="ts">
    import child from './child.vue';
    import { useUsersStore, storeToRefs } from "../src/store/user";
    const store = useUsersStore();
    const { name, age, sex } = storeToRefs(store);
    const changeName = () => {
      store.name = "张三";
      console.log(store);
    };
    </script>
```

2.6 重置`state`

*   有时候我们修改了`state`数据，想要将它还原，这个时候该怎么做呢？就比如用户填写了一部分表单，突然想重置为最初始的状态。
*   此时，我们直接调用`store`的`$reset()`方法即可，继续使用我们的例子，添加一个重置按钮

```js

    <button @click="reset">重置store</button>
    // 重置store
    const reset = () => {
      store.$reset();
    };
```

当我们点击重置按钮时，`store`中的数据会变为初始状态，页面也会更新

2.7 批量更改`state`数据

如果我们一次性需要修改很多条数据的话，有更加简便的方法，使用`store`的`$patch`方法，修改`app.vue`代码，添加一个批量更改数据的方法

```js

    <button @click="patchStore">批量修改数据</button>
    // 批量修改数据
    const patchStore = () => {
      store.$patch({
        name: "张三",
        age: 100,
        sex: "女",
      });
    };
```

*   有经验的小伙伴可能发现了，我们采用这种批量更改的方式似乎代价有一点大，假如我们`state`中有些字段无需更改，但是按照上段代码的写法，我们必须要将state中的所有字段例举出了。
*   为了解决该问题，`pinia`提供的`$patch`方法还可以接收一个回调函数，它的用法有点像我们的数组循环回调函数了。

```js

    store.$patch((state) => {
      state.items.push({ name: 'shoes', quantity: 1 })
      state.hasChanged = true
    })
```

2.8 直接替换整个`state`

`pinia`提供了方法让我们直接替换整个`state`对象，使用`store`的`$state`方法

```js

    store.$state = { counter: 666, name: '张三' }
```

上段代码会将我们提前声明的`state`替换为新的对象，可能这种场景用得比较少

1.  `getters`属性

*   `getters`是`defineStore`参数配置项里面的另一个属性
*   可以把`getter`想象成`Vue`中的计算属性，它的作用就是返回一个新的结果，既然它和`Vue`中的计算属性类似，那么它肯定也是会被缓存的，就和`computed`一样

3.1 添加`getter`

```js

    export const useUsersStore = defineStore("users", {
      state: () => {
        return {
          name: "test",
          age: 10,
          sex: "男",
        };
      },
      getters: {
        getAddAge: (state) => {
          return state.age + 100;
        },
      },
    })
```

上段代码中我们在配置项参数中添加了`getter`属性，该属性对象中定义了一个`getAddAge`方法，该方法会默认接收一个`state`参数，也就是`state`对象，然后该方法返回的是一个新的数据

3.2 使用`getter`

```html

    <template>
      <p>新年龄：{{ store.getAddAge }}</p>
      <button @click="patchStore">批量修改数据</button>
    </template>
    <script setup lang="ts">
    import { useUsersStore } from "../src/store/user";
    const store = useUsersStore();
    // 批量修改数据
    const patchStore = () => {
      store.$patch({
        name: "张三",
        age: 100,
        sex: "女",
      });
    };
    </script>
```

上段代码中我们直接在标签上使用了`store.gettAddAge`方法，这样可以保证响应式，其实我们`state`中的`name`等属性也可以以此种方式直接在标签上使用，也可以保持响应式

3.3 `getter`中调用其它`getter`

```js

    export const useUsersStore = defineStore("users", {
      state: () => {
        return {
          name: "test",
          age: 20,
          sex: "男",
        };
      },
      getters: {
        getAddAge: (state) => {
          return state.age + 100;
        },
        getNameAndAge(): string {
          return this.name + this.getAddAge; // 调用其它getter
        },
      },
    });
```

3.3 `getter`传参

```js

    export const useUsersStore = defineStore("users", {
      state: () => {
        return {
          name: "test",
          age: 20,
          sex: "男",
        };
      },
      getters: {
        getAddAge: (state) => {
          return (num: number) => state.age + num;
        },
        getNameAndAge(): string {
          return this.name + this.getAddAge; // 调用其它getter
        },
      },
    });
```

```html

    <p>新年龄：{{ store.getAddAge(1100) }}</p>
```

1.  `actions`属性

*   前面我们提到的`state`和`getter`s属性都主要是数据层面的，并没有具体的业务逻辑代码，它们两个就和我们组件代码中的`data`数据和`computed`计算属性一样。
*   那么，如果我们有业务代码的话，最好就是卸载`actions`属性里面，该属性就和我们组件代码中的`methods`相似，用来放置一些处理业务逻辑的方法。
*   `actions`属性值同样是一个对象，该对象里面也是存储的各种各样的方法，包括同步方法和异步方法

4.1 添加`actions`

```js

    export const useUsersStore = defineStore("users", {
      state: () => {
        return {
          name: "test",
          age: 20,
          sex: "男",
        };
      },
      getters: {
        getAddAge: (state) => {
          return (num: number) => state.age + num;
        },
        getNameAndAge(): string {
          return this.name + this.getAddAge; // 调用其它getter
        },
      },
      actions: {
        // 在实际场景中，该方法可以是任何逻辑，比如发送请求、存储token等等。大家把actions方法当作一个普通的方法即可，特殊之处在于该方法内部的this指向的是当前store
        saveName(name: string) {
          this.name = name;
        },
      },
    });
```

4.2 使用`actions`

使用`actions`中的方法也非常简单，比如我们在`App.vue`中想要调用该方法

```js

    const saveName = () => {
      store.saveName("poetries");
    };
```

**总结**

`pinia`的知识点很少，如果你有Vuex基础，那么学起来更是易如反掌

**pinia无非就是以下3个大点：**

*   `state`
*   `getters`
*   `actions`

##  28 对Vue SSR的理解

> `Vue.js` 是构建客户端应用程序的框架。默认情况下，可以在浏览器中输出 `Vue` 组件，进行生成 `DOM` 和操作 `DOM`。然而，也可以将同一个组件渲染为服务端的 `HTML` 字符串，将它们直接发送到浏览器，最后将这些静态标记"激活"为客户端上完全可交互的应用程序。

> `SSR`也就是服务端渲染，也就是将 `Vue` 在客户端把标签渲染成 `HTML` 的工作放在服务端完成，然后再把 `html` 直接返回给客户端

*   **优点**：`SSR` 有着更好的 `SEO`、并且首屏加载速度更快
    *   因为 `SPA` 页面的内容是通过 `Ajax` 获取，而搜索引擎爬取工具并不会等待 `Ajax` 异步完成后再抓取页面内容，所以在 `SPA` 中是抓取不到页面通过 `Ajax`获取到的内容；而 `SSR` 是直接由服务端返回已经渲染好的页面（数据已经包含在页面中），所以搜索引擎爬取工具可以抓取渲染好的页面
    *   更快的内容到达时间（首屏加载更快）： `SPA` 会等待所有 `Vue` 编译后的 `js` 文件都下载完成后，才开始进行页面的渲染，文件下载等需要一定的时间等，所以首屏渲染需要一定的时间；`SSR` 直接由服务端渲染好页面直接返回显示，无需等待下载 js 文件及再去渲染等，所以 SSR 有更快的内容到达时间
*   **缺点**： 开发条件会受到限制，服务器端渲染只支持 `beforeCreate` 和 `created` 两个钩子，当我们需要一些外部扩展库时需要特殊处理，服务端渲染应用程序也需要处于 `Node.js` 的运行环境。服务器会有更大的负载需求
    *   在 Node.js 中渲染完整的应用程序，显然会比仅仅提供静态文件的 `server` 更加大量占用`CPU`资源 (CPU-intensive - CPU 密集)，因此如果你预料在高流量环境 ( high traffic ) 下使用，请准备相应的服务器负载，并明智地采用缓存策略

**其基本实现原理**

*   `app.js` 作为客户端与服务端的公用入口，导出 `Vue` 根实例，供客户端 `entry` 与服务端 `entry` 使用。客户端 `entry` 主要作用挂载到 `DOM` 上，服务端 `entry` 除了创建和返回实例，还进行路由匹配与数据预获取。
*   `webpack` 为客服端打包一个 `Client Bundle` ，为服务端打包一个 `Server Bundle` 。
*   服务器接收请求时，会根据 `url`，加载相应组件，获取和解析异步数据，创建一个读取 `Server Bundle` 的 `BundleRenderer`，然后生成 `html` 发送给客户端。
*   客户端混合，客户端收到从服务端传来的 `DOM` 与自己的生成的 DOM 进行对比，把不相同的 `DOM` 激活，使其可以能够响应后续变化，这个过程称为客户端激活 。为确保混合成功，客户端与服务器端需要共享同一套数据。在服务端，可以在渲染之前获取数据，填充到 `stroe` 里，这样，在客户端挂载到 `DOM` 之前，可以直接从 `store`里取数据。首屏的动态数据通过 `window.__INITIAL_STATE__`发送到客户端

> `Vue SSR` 的实现，主要就是把 `Vue` 的组件输出成一个完整 `HTML`, `vue-server-renderer` 就是干这事的

`Vue SSR`需要做的事多点（输出完整 HTML），除了`complier -> vnode`，还需如数据获取填充至 `HTML`、客户端混合（`hydration`）、缓存等等。相比于其他模板引擎（`ejs`, `jade` 等），最终要实现的目的是一样的，性能上可能要差点

##  29 Vue 修饰符有哪些

###  vue中修饰符分为以下五种

*   表单修饰符
*   事件修饰符
*   鼠标按键修饰符
*   键值修饰符
*   `v-bind`修饰符

**1\. 表单修饰符**

在我们填写表单的时候用得最多的是`input`标签，指令用得最多的是`v-model`

关于表单的修饰符有如下：

*   `lazy`

在我们填完信息，光标离开标签的时候，才会将值赋予给`value`，也就是在`change`事件之后再进行信息同步

```html

    <input type="text" v-model.lazy="value">
    <p>{{value}}</p>
```

*   `trim`

自动过滤用户输入的首空格字符，而中间的空格不会过滤

```html

    <input type="text" v-model.trim="value">
```

*   `number`

自动将用户的输入值转为数值类型，但如果这个值无法被`parseFloat`解析，则会返回原来的值

```html

    <input v-model.number="age" type="number">
```

**2\. 事件修饰符**

事件修饰符是对事件捕获以及目标进行了处理，有如下修饰符

*   `.stop` 阻止了事件冒泡，相当于调用了`event.stopPropagation`方法

```html

    <div @click="shout(2)">
      <button @click.stop="shout(1)">ok</button>
    </div>
    //只输出1
```

*   `.prevent` 阻止了事件的默认行为，相当于调用了`event.preventDefault`方法

```html

    <form v-on:submit.prevent="onSubmit"></form>
```

*   `.capture` 使用事件捕获模式，使事件触发从包含这个元素的顶层开始往下触发

```html

    <div @click.capture="shout(1)">
        obj1
    <div @click.capture="shout(2)">
        obj2
    <div @click="shout(3)">
        obj3
    <div @click="shout(4)">
        obj4
    </div>
    </div>
    </div>
    </div>
    // 输出结构: 1 2 4 3 
```

*   `.self` 只当在 `event.target` 是当前元素自身时触发处理函数

```html

    <div v-on:click.self="doThat">...</div>
```

> 使用修饰符时，顺序很重要；相应的代码会以同样的顺序产生。因此，用 `v-on:click.prevent.self` 会阻止所有的点击，而 `v-on:click.self.prevent` 只会阻止对元素自身的点击

*   `.once` 绑定了事件以后只能触发一次，第二次就不会触发

```html

    <button @click.once="shout(1)">ok</button>
```

*   `.passive` 告诉浏览器你不想阻止事件的默认行为

在移动端，当我们在监听元素滚动事件的时候，会一直触发`onscroll`事件会让我们的网页变卡，因此我们使用这个修饰符的时候，相当于给`onscroll`事件整了一个`.lazy`修饰符

```html

    <!-- 滚动事件的默认行为 (即滚动行为) 将会立即触发 -->
    <!-- 而不会等待 `onScroll` 完成  -->
    <!-- 这其中包含 `event.preventDefault()` 的情况 -->
    <div v-on:scroll.passive="onScroll">...</div>
```

> *   不要把 `.passive` 和 `.prevent` 一起使用,因为 `.prevent` 将会被忽略，同时浏览器可能会向你展示一个警告。
> *   `passive` 会告诉浏览器你不想阻止事件的默认行为

*   `native` 让组件变成像`html`内置标签那样监听根元素的原生事件，否则组件上使用 `v-on` 只会监听自定义事件

```html

    <my-component v-on:click.native="doSomething"></my-component>

    <!-- 使用.native修饰符来操作普通HTML标签是会令事件失效的 -->
```

**3\. 鼠标按钮修饰符**

鼠标按钮修饰符针对的就是左键、右键、中键点击，有如下：

*   `.left` 左键点击
*   `.right` 右键点击
*   `.middle` 中键点击

```html

    <button @click.left="shout(1)">ok</button>
    <button @click.right="shout(1)">ok</button>
    <button @click.middle="shout(1)">ok</button>
```

**4\. 键盘事件的修饰符**

键盘修饰符是用来修饰键盘事件（`onkeyup`，`onkeydown`）的，有如下：

`keyCode`存在很多，但vue为我们提供了别名，分为以下两种：

*   **普通键**（`enter`、`tab`、`delete`、`space`、`esc`、`up`、`down`、`left`、`right`...）
*   **系统修饰键**（`ctrl`、`alt`、`meta`、`shift`...）

```html

    <!-- 只有按键为keyCode的时候才触发 -->
    <input type="text" @keyup.keyCode="shout()">
```

还可以通过以下方式自定义一些全局的键盘码别名

```js

    Vue.config.keyCodes.f2 = 113
```

**5\. v-bind修饰符**

`v-bind`修饰符主要是为属性进行操作，用来分别有如下：

*   **async** 能对`props`进行一个双向绑定

```js

    //父组件
    <comp :myMessage.sync="bar"></comp> 
    //子组件
    this.$emit('update:myMessage',params);
```

以上这种方法相当于以下的简写

```js

    //父亲组件
    <comp :myMessage="bar" @update:myMessage="func"></comp>
    func(e){
     this.bar = e;
    }

    //子组件js
    func2(){
      this.$emit('update:myMessage',params);
    }
```

使用`async`需要注意以下两点：

*   使用`sync`的时候，子组件传递的事件名格式必须为`update:value`，其中`value`必须与子组件中`props`中声明的名称完全一致

*   注意带有 `.sync` 修饰符的 `v-bind` 不能和表达式一起使用

*   **prop** 设置自定义标签属性，避免暴露数据，防止污染HTML结构

```html

    <input id="uid" title="title1" value="1" :index.prop="index">
```

*   **camel** 将命名变为驼峰命名法，如将`view-Box`属性名转换为 `viewBox`

```html

    <svg :viewBox="viewBox"></svg>
```

###  应用场景

根据每一个修饰符的功能，我们可以得到以下修饰符的应用场景：

*   `.stop`：阻止事件冒泡
*   `.native`：绑定原生事件
*   `.once`：事件只执行一次
*   `.self` ：将事件绑定在自身身上，相当于阻止事件冒泡
*   `.prevent`：阻止默认事件
*   `.caption`：用于事件捕获
*   `.once`：只触发一次
*   `.keyCode`：监听特定键盘按下
*   `.right`：右键

##  30 说说 vue 内置指令

![](https://s.poetries.work/uploads/2022/08/0e8989f9c8100b9a.png)

##  31 怎样理解 Vue 的单向数据流

> 数据总是从父组件传到子组件，子组件没有权利修改父组件传过来的数据，只能请求父组件对原始数据进行修改。这样会**防止从子组件意外改变父级组件的状态**，从而导致你的应用的数据流向难以理解

**注意**：在子组件直接用 `v-model` 绑定父组件传过来的 `prop` 这样是不规范的写法 开发环境会报警告

如果实在要改变父组件的 `prop` 值，可以在 `data` 里面定义一个变量 并用 `prop` 的值初始化它 之后用`$emit` 通知父组件去修改

**有两种常见的试图改变一个 prop 的情形 :**

1.  这个 `prop` 用来传递一个初始值；这个子组件接下来希望将其作为一个本地的 `prop` 数据来使用。 在这种情况下，最好定义一个本地的 `data` 属性并将这个 `prop`用作其初始值

```js

    props: ['initialCounter'],
    data: function () {
      return {
        counter: this.initialCounter
      }
    }
```

1.  这个 `prop` 以一种原始的值传入且需要进行转换。 在这种情况下，最好使用这个 `prop` 的值来定义一个计算属性

```js

    props: ['size'],
    computed: {
      normalizedSize: function () {
        return this.size.trim().toLowerCase()
      }
    }
```

##  32 写过自定义指令吗？原理是什么

>

回答范例

1.  `Vue`有一组默认指令，比如`v-model`或`v-for`，同时`Vue`也允许用户注册自定义指令来扩展Vue能力
2.  自定义指令主要完成一些可复用低层级`DOM`操作
3.  使用自定义指令分为定义、注册和使用三步：

*   定义自定义指令有两种方式：对象和函数形式，前者类似组件定义，有各种生命周期；后者只会在`mounte`d和`updated`时执行
*   注册自定义指令类似组件，可以使用`app.directive()`全局注册，使用`{directives:{xxx}}`局部注册
*   使用时在注册名称前加上`v-`即可，比如`v-focus`

1.  我在项目中常用到一些自定义指令，例如：

*   复制粘贴 `v-copy`
*   长按 `v-longpress`
*   防抖 `v-debounce`
*   图片懒加载 `v-lazy`
*   按钮权限 `v-premission`
*   页面水印 `v-waterMarker`
*   拖拽指令 `v-draggable`

1.  `vue3`中指令定义发生了比较大的变化，主要是钩子的名称保持和组件一致，这样开发人员容易记忆，不易犯错。另外在`v3.2`之后，可以在`setup`中以一个小写`v`开头方便的定义自定义指令，更简单了
```

###  基本使用

> 当Vue中的核心内置指令不能够满足我们的需求时，我们可以定制自定义的指令用来满足开发的需求

我们看到的`v-`开头的行内属性，都是指令，不同的指令可以完成或实现不同的功能，对普通 DOM元素进行底层操作，这时候就会用到自定义指令。除了核心功能默认内置的指令 (`v-model` 和 `v-show`)，`Vue` 也允许注册自定义指令

```js

    // 指令使用的几种方式：
    //会实例化一个指令，但这个指令没有参数 
    `v-xxx`

    // -- 将值传到指令中
    `v-xxx="value"`  

    // -- 将字符串传入到指令中，如`v-html="'<p>内容</p>'"`
    `v-xxx="'string'"` 

    // -- 传参数（`arg`），如`v-bind:class="className"`
    `v-xxx:arg="value"` 

    // -- 使用修饰符（`modifier`）
    `v-xxx:arg.modifier="value"` 
```

注册一个自定义指令有全局注册与局部注册

```js

    // 全局注册注册主要是用过Vue.directive方法进行注册
    // Vue.directive第一个参数是指令的名字（不需要写上v-前缀），第二个参数可以是对象数据，也可以是一个指令函数
    // 注册一个全局自定义指令 `v-focus`
    Vue.directive('focus', {
      // 当被绑定的元素插入到 DOM 中时……
      inserted: function (el) {
        // 聚焦元素
        el.focus()  // 页面加载完成之后自动让输入框获取到焦点的小功能
      }
    })

    // 局部注册通过在组件options选项中设置directive属性
    directives: {
      focus: {
        // 指令的定义
        inserted: function (el) {
          el.focus() // 页面加载完成之后自动让输入框获取到焦点的小功能
        }
      }
    }

    // 然后你可以在模板中任何元素上使用新的 v-focus property，如下：

    <input v-focus />
```

**钩子函数**

1.  `bind`：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
2.  `inserted`：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
3.  `update`：被绑定于元素所在的模板更新时调用，而无论绑定值是否变化。通过比较更新前后的绑定值，可以忽略不必要的模板更新。
4.  `componentUpdated`：被绑定元素所在模板完成一次更新周期时调用。
5.  `unbind`：只调用一次，指令与元素解绑时调用。

所有的钩子函数的参数都有以下：

*   `el`：指令所绑定的元素，可以用来直接操作 DOM
*   `binding`：一个对象，包含以下 `property`：
    *   `name`：指令名，不包括 `v-` 前缀。
    *   `value`：指令的绑定值，例如：`v-my-directive="1 + 1"` 中，绑定值为 `2`。
    *   `oldValue`：指令绑定的前一个值，仅在 `update` 和 `componentUpdated` 钩子中可用。无论值是否改变都可用。
    *   `expression`：字符串形式的指令表达式。例如 `v-my-directive="1 + 1"` 中，表达式为 `"1 + 1"`。
    *   `arg`：传给指令的参数，可选。例如 `v-my-directive:foo` 中，参数为 `"foo"`。
    *   `modifiers`：一个包含修饰符的对象。例如：`v-my-directive.foo.bar` 中，修饰符对象为 `{ foo: true, bar: true }`
    *   `vnode`：`Vue` 编译生成的虚拟节点
    *   `oldVnode`：上一个虚拟节点，仅在 `update` 和 `componentUpdated` 钩子中可用

除了 `el` 之外，其它参数都应该是只读的，切勿进行修改。如果需要在钩子之间共享数据，建议通过元素的 `dataset` 来进行

```html

    <div v-demo="{ color: 'white', text: 'hello!' }"></div>
    <script>
        Vue.directive('demo', function (el, binding) {
        console.log(binding.value.color) // "white"
        console.log(binding.value.text)  // "hello!"
        })
    </script>
```

**应用场景**

使用自定义组件组件可以满足我们日常一些场景，这里给出几个自定义组件的案例：

1.  防抖

```js

    // 1.设置v-throttle自定义指令
    Vue.directive('throttle', {
      bind: (el, binding) => {
        let throttleTime = binding.value; // 防抖时间
        if (!throttleTime) { // 用户若不设置防抖时间，则默认2s
          throttleTime = 2000;
        }
        let cbFun;
        el.addEventListener('click', event => {
          if (!cbFun) { // 第一次执行
            cbFun = setTimeout(() => {
              cbFun = null;
            }, throttleTime);
          } else {
            event && event.stopImmediatePropagation();
          }
        }, true);
      },
    });
    // 2.为button标签设置v-throttle自定义指令
    <button @click="sayHello" v-throttle>提交</button>
```

1.  图片懒加载

设置一个`v-lazy`自定义组件完成图片懒加载

```js

    const LazyLoad = {
        // install方法
        install(Vue,options){
           // 代替图片的loading图
            let defaultSrc = options.default;
            Vue.directive('lazy',{
                bind(el,binding){
                    LazyLoad.init(el,binding.value,defaultSrc);
                },
                inserted(el){
                    // 兼容处理
                    if('InterpObserver' in window){
                        LazyLoad.observe(el);
                    }else{
                        LazyLoad.listenerScroll(el);
                    }

                },
            })
        },
        // 初始化
        init(el,val,def){
            // src 储存真实src
            el.setAttribute('src',val);
            // 设置src为loading图
            el.setAttribute('src',def);
        },
        // 利用InterpObserver监听el
        observe(el){
            let io = new InterpObserver(entries => {
                let realSrc = el.dataset.src;
                if(entries[0].isIntersecting){
                    if(realSrc){
                        el.src = realSrc;
                        el.removeAttribute('src');
                    }
                }
            });
            io.observe(el);
        },
        // 监听scroll事件
        listenerScroll(el){
            let handler = LazyLoad.throttle(LazyLoad.load,300);
            LazyLoad.load(el);
            window.addEventListener('scroll',() => {
                handler(el);
            });
        },
        // 加载真实图片
        load(el){
            let windowHeight = document.documentElement.clientHeight
            let elTop = el.getBoundingClientRect().top;
            let elBtm = el.getBoundingClientRect().bottom;
            let realSrc = el.dataset.src;
            if(elTop - windowHeight<0&&elBtm > 0){
                if(realSrc){
                    el.src = realSrc;
                    el.removeAttribute('src');
                }
            }
        },
        // 节流
        throttle(fn,delay){
            let timer; 
            let prevTime;
            return function(...args){
                let currTime = Date.now();
                let context = this;
                if(!prevTime) prevTime = currTime;
                clearTimeout(timer);

                if(currTime - prevTime > delay){
                    prevTime = currTime;
                    fn.apply(context,args);
                    clearTimeout(timer);
                    return;
                }

                timer = setTimeout(function(){
                    prevTime = Date.now();
                    timer = null;
                    fn.apply(context,args);
                },delay);
            }
        }

    }
    export default LazyLoad;
```

1.  一键 Copy的功能

```js

    import { Message } from 'ant-design-vue';

    const vCopy = { //
      /*
        bind 钩子函数，第一次绑定时调用，可以在这里做初始化设置
        el: 作用的 dom 对象
        value: 传给指令的值，也就是我们要 copy 的值
      */
      bind(el, { value }) {
        el.$value = value; // 用一个全局属性来存传进来的值，因为这个值在别的钩子函数里还会用到
        el.handler = () => {
          if (!el.$value) {
          // 值为空的时候，给出提示，我这里的提示是用的 ant-design-vue 的提示，你们随意
            Message.warning('无复制内容');
            return;
          }
          // 动态创建 textarea 标签
          const textarea = document.createElement('textarea');
          // 将该 textarea 设为 readonly 防止 iOS 下自动唤起键盘，同时将 textarea 移出可视区域
          textarea.readOnly = 'readonly';
          textarea.style.position = 'absolute';
          textarea.style.left = '-9999px';
          // 将要 copy 的值赋给 textarea 标签的 value 属性
          textarea.value = el.$value;
          // 将 textarea 插入到 body 中
          document.body.appendChild(textarea);
          // 选中值并复制
          textarea.select();
          // textarea.setSelectionRange(0, textarea.value.length);
          const result = document.execCommand('Copy');
          if (result) {
            Message.success('复制成功');
          }
          document.body.removeChild(textarea);
        };
        // 绑定点击事件，就是所谓的一键 copy 啦
        el.addEventListener('click', el.handler);
      },
      // 当传进来的值更新的时候触发
      componentUpdated(el, { value }) {
        el.$value = value;
      },
      // 指令与元素解绑的时候，移除事件绑定
      unbind(el) {
        el.removeEventListener('click', el.handler);
      },
    };

    export default vCopy;
```

1.  拖拽

```js

    <div ref="a" id="bg" v-drag></div>

      directives: {
        drag: {
          bind() {},
          inserted(el) {
            el.onmousedown = (e) => {
              let x = e.clientX - el.offsetLeft;
              let y = e.clientY - el.offsetTop;
              document.onmousemove = (e) => {
                let xx = e.clientX - x + "px";
                let yy = e.clientY - y + "px";
                el.style.left = xx;
                el.style.top = yy;
              };
              el.onmouseup = (e) => {
                document.onmousemove = null;
              };
            };
          },
        },
      }
```

###  原理

*   指令本质上是装饰器，是 `vue`对 `HTML` 元素的扩展，给 `HTML` 元素增加自定义功能。`vue` 编译 `DOM` 时，会找到指令对象，执行指令的相关方法。
*   自定义指令有五个生命周期（也叫钩子函数），分别是 `bind`、`inserted`、`update`、`componentUpdated`、`unbind`

**原理**

1.  在生成 `ast` 语法树时，遇到指令会给当前元素添加 `directives` 属性
2.  通过 `genDirectives` 生成指令代码
3.  在 `patch` 前将指令的钩子提取到 `cbs` 中,在 `patch` 过程中调用对应的钩子
4.  当执行指令对应钩子函数时，调用对应指令定义的方法

###  vue3.2 自定义全局指令、局部指令

```js

    // 在src目录下新建一个directive文件，在此文件夹下新建一个index.js文件夹，接着输入如下内容
    const directives =  (app) => {
      //这里是给元素取得名字，虽然是focus，但是实际引用的时候必须以v开头
      app.directive('focus',{
        //这里的el就是获取的元素
        mounted(el) {
          el.focus() 
         }
      })
    }

    //默认导出 directives
    export default directives
```

```js

    // 在全局注册directive
    import { createApp } from 'vue'
    import App from './App.vue'
    import router from './router'
    import store from './store'
    import directives from './directives'

    const app = createApp(App)
    directives(app)

    app.use(store).use(router).mount('#app')
```

```html

    <!-- 在你需要的页面进行自定义指令的使用 -->
    <template>
      <div class="container">
        <div class="content">
          <input type="text"  v-focus>
          内容
        </div>
      </div>
    </template>

    <script setup>
    import { reactive, ref } from 'vue'
    // const vMove:Directive = () =>{

    // }
    </script>
```

> 在`vue3.2 setup`语法糖模式下，自定义指令变得及其简单

```html

    <input type="text" v-model="value" v-focus>

    <script setup>
    //直接写，但是必须是v开头
    const vFocus = {
      mounted(el) {
        // 获取input，并调用其focus()方法
        el.focus()
      }
    }
    </script>
```

```html

    <!-- demo 进去页面自动获取焦点，然后让盒子的颜色根据你input框输入的内容变色，并且作防抖处理 -->

    <template>
      <div class="container">
        <div class="content" v-move="{ background: value }">
          内容
          <input type="text" v-model="value" v-focus @keyup="see">
        </div>
      </div>
    </template>

    <script setup>
    import { reactive, ref } from 'vue'
    const value = ref('')

    const vFocus = {
      mounted(el) {
        // 获取input，并调用其focus()方法
        el.focus()
      }
    }

    let timer = null

    const vMove = (el, binding) => {
      if (timer !== null) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        el.style.background = binding.value.background
        console.log(el);
      }, 1000);
    }

    </script>

    <style lang="scss" scoped>
    .container {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      .content {
        border-top: 5px solid black;
        width: 200px;
        height: 200px;
        cursor: pointer;
        border-left: 1px solid #ccc;
        border-right: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
      }
    }
    </style>
```

##  33 Vue3相关

###  Vue3 对 Vue2 有什么优势

*   性能更好（编译优化、使用`proxy`等）
*   体积更小
*   更好的`TS`支持
*   更好的代码组织
*   更好的逻辑抽离
*   更多新功能

###  Vue3 和 Vue2 的生命周期有什么区别

**`Options API`生命周期**

*   `beforeDestroy`改为`beforeUnmount`
*   `destroyed`改为`umounted`
*   其他沿用`vue2`生命周期

**`Composition API`生命周期**

```js

    import { onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue'

    export default {
        name: 'LifeCycles',
        props: {
          msg: String
        },
        // setup等于 beforeCreate 和 created
        setup() {
            console.log('setup')

            onBeforeMount(() => {
                console.log('onBeforeMount')
            })
            onMounted(() => {
                console.log('onMounted')
            })
            onBeforeUpdate(() => {
                console.log('onBeforeUpdate')
            })
            onUpdated(() => {
                console.log('onUpdated')
            })
            onBeforeUnmount(() => {
                console.log('onBeforeUnmount')
            })
            onUnmounted(() => {
                console.log('onUnmounted')
            })
        },

        // 兼容vue2生命周期 options API和composition API生命周期二选一
        beforeCreate() {
            console.log('beforeCreate')
        },
        created() {
            console.log('created')
        },
        beforeMount() {
            console.log('beforeMount')
        },
        mounted() {
            console.log('mounted')
        },
        beforeUpdate() {
            console.log('beforeUpdate')
        },
        updated() {
            console.log('updated')
        },
        // beforeDestroy 改名
        beforeUnmount() {
            console.log('beforeUnmount')
        },
        // destroyed 改名
        unmounted() {
            console.log('unmounted')
        }
    }
```

###  Vue3如何实现响应式

*   回顾`vue2`的`Object.defineProperty`
*   缺点
    *   深度监听对象需要一次性递归
    *   无法监听新增属性、删除属性(`Vue.set`、`Vue.delete`)
    *   无法监听原生数组，需要特殊处理
*   学习`proxy`语法
*   `Vue3`中如何使用`proxy`实现响应式

**Proxy 基本使用**

```js

    // const data = {
    //     name: 'zhangsan',
    //     age: 20,
    // }
    const data = ['a', 'b', 'c']

    const proxyData = new Proxy(data, {
        get(target, key, receiver) {
            // 只处理本身（非原型的）属性
            const ownKeys = Reflect.ownKeys(target)
            if (ownKeys.includes(key)) {
                console.log('get', key) // 监听
            }

            const result = Reflect.get(target, key, receiver)
            return result // 返回结果
        },
        set(target, key, val, receiver) {
            // 重复的数据，不处理
            if (val === target[key]) {
                return true
            }

            const result = Reflect.set(target, key, val, receiver)
            console.log('set', key, val)
            // console.log('result', result) // true
            return result // 是否设置成功
        },
        deleteProperty(target, key) {
            const result = Reflect.deleteProperty(target, key)
            console.log('delete property', key)
            // console.log('result', result) // true
            return result // 是否删除成功
        }
    })
```

**vue3用Proxy 实现响应式**

*   深度监听，性能更好（获取到哪一层才触发响应式`get`，不是一次性递归）
*   可监听`新增/删除`属性
*   可监听数组变化

```js

    // 创建响应式
    function reactive(target = {}) {
      if (typeof target !== 'object' || target == null) {
          // 不是对象或数组，则返回
          return target
      }

      // 代理配置
      const proxyConf = {
          get(target, key, receiver) {
              // 只处理本身（非原型的）属性
              const ownKeys = Reflect.ownKeys(target)
              if (ownKeys.includes(key)) {
                  console.log('get', key) // 监听
              }

              const result = Reflect.get(target, key, receiver)

              // 深度监听
              // 性能如何提升的？获取到哪一层才触发响应式get，不是一次性递归
              return reactive(result)
          },
          set(target, key, val, receiver) {
              // 重复的数据，不处理
              if (val === target[key]) {
                  return true
              }

              const ownKeys = Reflect.ownKeys(target)
              if (ownKeys.includes(key)) {
                  console.log('已有的 key', key)
              } else {
                  console.log('新增的 key', key)
              }

              const result = Reflect.set(target, key, val, receiver)
              console.log('set', key, val)
              // console.log('result', result) // true
              return result // 是否设置成功
          },
          deleteProperty(target, key) {
              const result = Reflect.deleteProperty(target, key)
              console.log('delete property', key)
              // console.log('result', result) // true
              return result // 是否删除成功
          }
      }

      // 生成代理对象
      const observed = new Proxy(target, proxyConf)
      return observed
    }

    // 测试数据
    const data = {
      name: 'zhangsan',
      age: 20,
      info: {
          city: 'shenshen',
          a: {
              b: {
                  c: {
                      d: {
                          e: 100
                      }
                  }
              }
          }
      }
    }

    const proxyData = reactive(data)
```

###  如何理解Composition API和Options API

*   `Composition API`带来了什么
    *   更好的代码组织
    *   更好的逻辑复用
    *   更好的类型推导
*   `Composition API`和`Options API`如何选择
    *   不建议共用，会引起混乱
    *   小型项目、业务逻辑简单，用`Option API`成本更小一些
    *   中大型项目、逻辑复杂，用`Composition API`

###  Composition API 如何实现逻辑复用

*   抽离逻辑代码到一个函数
*   函数命名约定为`useXx`格式（`React Hooks`也是）
*   在`setup`中引用`useXx`函数

```vue

    <template>
        <p>mouse position {{x}} {{y}}</p>
    </template>

    <script>
    import { reactive } from 'vue'
    import useMousePosition from './useMousePosition'
    // import useMousePosition2 from './useMousePosition'

    export default {
        name: 'MousePosition',
        setup() {
            const { x, y } = useMousePosition()
            return {
                x,
                y
            }

            // const state = useMousePosition2()
            // return {
            //     state
            // }
        }
    }
    </script>
```

```js

    import { reactive, ref, onMounted, onUnmounted } from 'vue'

    function useMousePosition() {
        const x = ref(0)
        const y = ref(0)

        function update(e) {
            x.value = e.pageX
            y.value = e.pageY
        }

        onMounted(() => {
            console.log('useMousePosition mounted')
            window.addEventListener('mousemove', update)
        })

        onUnmounted(() => {
            console.log('useMousePosition unMounted')
            window.removeEventListener('mousemove', update)
        })

        // 合成函数尽量返回ref或toRefs(state)  state = reactive({})
        // 这样在使用的时候可以解构但不丢失响应式
        return {
            x,
            y
        }
    }

    // function useMousePosition2() {
    //     const state = reactive({
    //         x: 0,
    //         y: 0
    //     })

    //     function update(e) {
    //         state.x = e.pageX
    //         state.y = e.pageY
    //     }

    //     onMounted(() => {
    //         console.log('useMousePosition mounted')
    //         window.addEventListener('mousemove', update)
    //     })

    //     onUnmounted(() => {
    //         console.log('useMousePosition unMounted')
    //         window.removeEventListener('mousemove', update)
    //     })

    //     return state
    // }

    export default useMousePosition
    // export default useMousePosition2
```

###  Composition API 和 React Hooks 的对比

*   `Composition API`的`setup`(相当于`created`、`beforeCreate`的合集)只会调用一次，而`React Hooks`函数在渲染过程中会被多次调用
*   `Composition API`无需使用`useMemo`、`useCallback`避免子组件重复渲染，因为`setup`只会调用一次，在`setup`闭包中缓存了变量
*   `Composition API`无需顾虑调用顺序，而`React Hooks`需要保证`hooks`的顺序一致（比如`不能放在循环、判断`里面）
*   `Composition API`的`ref`、`reactive`比`useState`难理解

###  Vue3的设计目标是什么？做了哪些优化

**1、设计目标**

不以解决实际业务痛点的更新都是耍流氓，下面我们来列举一下`Vue3`之前我们或许会面临的问题

*   随着功能的增长，复杂组件的代码变得越来越难以维护
*   缺少一种比较「干净」的在多个组件之间提取和复用逻辑的机制
*   类型推断不够友好
*   `bundle`的时间太久了

而 `Vue3` 经过长达两三年时间的筹备，做了哪些事情？

我们从结果反推

*   更小
*   更快
*   TypeScript支持
*   API设计一致性
*   提高自身可维护性
*   开放更多底层功能

一句话概述，就是更小更快更友好了

**更小**

*   `Vue3`移除一些不常用的 `API`

*   引入`tree-shaking`，可以将无用模块“剪辑”，仅打包需要的，使打包的整体体积变小了

**更快**

主要体现在编译方面：

*   `diff`算法优化
*   静态提升
*   事件监听缓存
*   `SSR`优化

**更友好**

`vue3`在兼顾`vue2`的`options API`的同时还推出了`composition API`，大大增加了代码的逻辑组织和代码复用能力

这里代码简单演示下：

存在一个获取鼠标位置的函数

```js

    import { toRefs, reactive } from 'vue';
    function useMouse(){
        const state = reactive({x:0,y:0});
        const update = e=>{
            state.x = e.pageX;
            state.y = e.pageY;
        }
        onMounted(()=>{
            window.addEventListener('mousemove',update);
        })
        onUnmounted(()=>{
            window.removeEventListener('mousemove',update);
        })

        return toRefs(state);
    }
```

我们只需要调用这个函数，即可获取`x`、`y`的坐标，完全不用关注实现过程

试想一下，如果很多类似的第三方库，我们只需要调用即可，不必关注实现过程，开发效率大大提高

同时，`VUE3`是基于`typescipt`编写的，可以享受到自动的类型定义提示

**2、优化方案**

`vue3`从很多层面都做了优化，可以分成三个方面：

*   源码
*   性能
*   语法 API

**源码**

源码可以从两个层面展开：

*   源码管理
*   TypeScript

**源码管理**

`vue3`整个源码是通过 `monorepo`的方式维护的，根据功能将不同的模块拆分到`packages`目录下面不同的子目录中

![](https://s.poetries.work/uploads/2022/09/f223c5d4157351f4.png)

这样使得模块拆分更细化，职责划分更明确，模块之间的依赖关系也更加明确，开发人员也更容易阅读、理解和更改所有模块源码，提高代码的可维护性

另外一些 `package`（比如 `reactivity` 响应式库）是可以独立于 `Vue` 使用的，这样用户如果只想使用 `Vue3`的响应式能力，可以单独依赖这个响应式库而不用去依赖整个 `Vue`

**TypeScript**

`Vue3`是基于`typeScript`编写的，提供了更好的类型检查，能支持复杂的类型推导

**性能**

`vue3`是从什么哪些方面对性能进行进一步优化呢？

*   体积优化
*   编译优化
*   数据劫持优化

这里讲述数据劫持：

在`vue2`中，数据劫持是通过`Object.defineProperty`，这个 API 有一些缺陷，并不能检测对象属性的添加和删除

```js

    Object.defineProperty(data, 'a',{
      get(){
        // track
      },
      set(){
        // trigger
      }
    })
```

尽管`Vue`为了解决这个问题提供了 `set`和`delete`实例方法，但是对于用户来说，还是增加了一定的心智负担

同时在面对嵌套层级比较深的情况下，就存在性能问题

```js

    default {
      data: {
        a: {
          b: {
              c: {
              d: 1
            }
          }
        }
      }
    }
```

相比之下，`vue3`是通过`proxy`监听整个对象，那么对于删除还是监听当然也能监听到

同时`Proxy` 并不能监听到内部深层次的对象变化，而 `Vue3` 的处理方式是在`getter` 中去递归响应式，这样的好处是真正访问到的内部对象才会变成响应式，而不是无脑递归

**语法 API**

这里当然说的就是`composition API`，其两大显著的优化：

*   优化逻辑组织
*   优化逻辑复用

**逻辑组织**

一张图，我们可以很直观地感受到 `Composition API`在逻辑组织方面的优势

![](https://s.poetries.work/uploads/2022/09/c17ce45b7fdc302a.png)

相同功能的代码编写在一块，而不像`options API`那样，各个功能的代码混成一块

**逻辑复用**

在`vue2`中，我们是通过`mixin`实现功能混合，如果多个`mixin`混合，会存在两个非常明显的问题：命名冲突和数据来源不清晰

而通过`composition`这种形式，可以将一些复用的代码抽离出来作为一个函数，只要的使用的地方直接进行调用即可

同样是上文的获取鼠标位置的例子

```js

    import { toRefs, reactive, onUnmounted, onMounted } from 'vue';
    function useMouse(){
        const state = reactive({x:0,y:0});
        const update = e=>{
            state.x = e.pageX;
            state.y = e.pageY;
        }
        onMounted(()=>{
            window.addEventListener('mousemove',update);
        })
        onUnmounted(()=>{
            window.removeEventListener('mousemove',update);
        })

        return toRefs(state);
    }
```

组件使用

```js

    import useMousePosition from './mouse'
    export default {
        setup() {
            const { x, y } = useMousePosition()
            return { x, y }
        }
    }
```

可以看到，整个数据来源清晰了，即使去编写更多的`hook`函数，也不会出现命名冲突的问题

###  Vue3有了解过吗？能说说跟vue2的区别吗？

**1\. 哪些变化**

![](https://s.poetries.work/uploads/2022/09/049a80c13ad8fba9.png)

从上图中，我们可以概览`Vue3`的新特性，如下：

*   速度更快
*   体积减少
*   更易维护
*   更接近原生
*   更易使用

**1.1 速度更快**

`vue3`相比`vue2`

*   重写了虚拟`Dom`实现
*   编译模板的优化
*   更高效的组件初始化
*   `undate`性能提高1.3~2倍
*   `SSR`速度提高了2~3倍

![](https://s.poetries.work/uploads/2022/09/5e2b7ed267793461.png)

**1.2 体积更小**

通过`webpack`的`tree-shaking`功能，可以将无用模块“剪辑”，仅打包需要的

能够`tree-shaking`，有两大好处：

*   对开发人员，能够对`vue`实现更多其他的功能，而不必担忧整体体积过大
*   对使用者，打包出来的包体积变小了

`vue`可以开发出更多其他的功能，而不必担忧`vue`打包出来的整体体积过多

![](https://s.poetries.work/uploads/2022/09/012cda86feaa9b93.png)

**1.3 更易维护**

**compositon Api**

*   可与现有的`Options API`一起使用
*   灵活的逻辑组合与复用
*   `Vue3`模块可以和其他框架搭配使用

![](https://s.poetries.work/uploads/2022/09/dbd78b33807a1196.png)

**更好的Typescript支持**

`VUE3`是基于`typescipt`编写的，可以享受到自动的类型定义提示

![](https://s.poetries.work/uploads/2022/09/440059fdfdb0fb0a.png)

**1.4 编译器重写**

![](https://s.poetries.work/uploads/2022/09/2ec6c2e81e6d9996.png)

**1.5 更接近原生**

可以自定义渲染 API

![](https://s.poetries.work/uploads/2022/09/88eb4d1859e9a619.png)

**1.6 更易使用**

响应式 `Api` 暴露出来

![](https://s.poetries.work/uploads/2022/09/5448e66d67acb711.png)

轻松识别组件重新渲染原因

![](https://s.poetries.work/uploads/2022/09/55ba7c3f18ce4330.png)

**2\. Vue3新增特性**

Vue 3 中需要关注的一些新功能包括：

*   `framents`
*   `Teleport`
*   `composition Api`
*   `createRenderer`

**2.1 framents**

在 `Vue3.x` 中，组件现在支持有多个根节点

```js

    <!-- Layout.vue -->
    <template>
      <header>...</header>
      <main v-bind="$attrs">...</main>
      <footer>...</footer>
    </template>
```

**2.2 Teleport**

`Teleport` 是一种能够将我们的模板移动到 `DOM` 中 `Vue app` 之外的其他位置的技术，就有点像哆啦A梦的“任意门”

在`vue2`中，像 `modals`,`toast` 等这样的元素，如果我们嵌套在 `Vue` 的某个组件内部，那么处理嵌套组件的定位、`z-index` 和样式就会变得很困难

通过`Teleport`，我们可以在组件的逻辑位置写模板代码，然后在 `Vue` 应用范围之外渲染它

```html

    <button @click="showToast" class="btn">打开 toast</button>
    <!-- to 属性就是目标位置 -->
    <teleport to="#teleport-target">
        <div v-if="visible" class="toast-wrap">
            <div class="toast-msg">我是一个 Toast 文案</div>
        </div>
    </teleport>
```

**2.3 createRenderer**

通过`createRenderer`，我们能够构建自定义渲染器，我们能够将 `vue` 的开发模型扩展到其他平台

我们可以将其生成在`canvas`画布上

![](https://s.poetries.work/uploads/2022/09/b079618d8640aed7.png)

关于`createRenderer`，我们了解下基本使用，就不展开讲述了

```js

    import { createRenderer } from '@vue/runtime-core'

    const { render, createApp } = createRenderer({
      patchProp,
      insert,
      remove,
      createElement,
      // ...
    })

    export { render, createApp }

    export * from '@vue/runtime-core'
```

**2.4 composition Api**

composition Api，也就是组合式`api`，通过这种形式，我们能够更加容易维护我们的代码，将相同功能的变量进行一个集中式的管理

![](https://s.poetries.work/uploads/2022/09/f595ce429612b282.png)

关于`compositon api`的使用，这里以下图展开

![](https://s.poetries.work/uploads/2022/09/a92a5ac0c6ec602a.png)

简单使用:

```js

    export default {
        setup() {
            const count = ref(0)
            const double = computed(() => count.value * 2)
            function increment() {
                count.value++
            }
            onMounted(() => console.log('component mounted!'))
            return {
                count,
                double,
                increment
            }
        }
    }
```

**3\. 非兼容变更**

**3.1 Global API**

*   全局 `Vue API` 已更改为使用应用程序实例
*   全局和内部 `API` 已经被重构为可 `tree-shakable`

**3.2 模板指令**

*   组件上 `v-model` 用法已更改
*   `<template v-for>`和 非 `v-for`节点上`key`用法已更改
*   在同一元素上使用的 `v-if` 和 `v-for` 优先级已更改
*   `v-bind="object"` 现在排序敏感
*   `v-for` 中的 `ref` 不再注册 `ref` 数组

**3.3 组件**

*   只能使用普通函数创建功能组件
*   `functional` 属性在单文件组件 `(SFC)`
*   异步组件现在需要 `defineAsyncComponent` 方法来创建

**3.4 渲染函数**

*   渲染函数`API`改变
*   `$scopedSlots` property 已删除，所有插槽都通过 `$slots` 作为函数暴露
*   自定义指令 API 已更改为与组件生命周期一致
*   一些转换`class`被重命名了：
    *   `v-enter` -> `v-enter-from`
    *   `v-leave` -> `v-leave-from`
*   组件 `watch` 选项和实例方法 `$watch`不再支持点分隔字符串路径，请改用计算函数作为参数
*   在 `Vue 2.x` 中，应用根容器的 `outerHTML` 将替换为根组件模板 (如果根组件没有模板/渲染选项，则最终编译为模板)。`VUE3.x` 现在使用应用程序容器的 `innerHTML`。

**3.5 其他小改变**

*   `destroyed` 生命周期选项被重命名为 `unmounted`
*   `beforeDestroy` 生命周期选项被重命名为 `beforeUnmount`
*   `prop default`工厂函数不再有权访问 `this` 是上下文
*   自定义指令 API 已更改为与组件生命周期一致
*   `data` 应始终声明为函数
*   来自 `mixin` 的 `data` 选项现在可简单地合并
*   `attribute` 强制策略已更改
*   一些过渡 `class` 被重命名
*   组建 watch 选项和实例方法 `$watch`不再支持以点分隔的字符串路径。请改用计算属性函数作为参数。
*   `<template>` 没有特殊指令的标记 (`v-if/else-if/else`、`v-for` 或 `v-slot`) 现在被视为普通元素，并将生成原生的 `<template>` 元素，而不是渲染其内部内容。
*   在`Vue 2.x` 中，应用根容器的 `outerHTML` 将替换为根组件模板 (如果根组件没有模板/渲染选项，则最终编译为模板)。`Vue 3.x` 现在使用应用容器的 `innerHTML`，这意味着容器本身不再被视为模板的一部分。

**3.6 移除 API**

*   `keyCode` 支持作为 `v-on` 的修饰符
*   `$on`，`$off`和`$once` 实例方法
*   过滤`filter`
*   内联模板 `attribute`
*   `$destroy` 实例方法。用户不应再手动管理单个`Vue` 组件的生命周期。

###  你知道哪些Vue3新特性?

官网列举的最值得注意的新特性：[v3-migration.vuejs.org<span><span class="sr-only">(opens new window)</span></span>](https://v3-migration.vuejs.org/#notable-new-features)

![](https://s.poetries.work/uploads/2022/08/d0d7ed1343411fab.png)

*   `Composition API`
*   `SFC Composition API`语法糖
*   `Teleport`传送门
*   `Fragments`片段
*   `Emits`选项
*   自定义渲染器
*   `SFC CSS`变量
*   `Suspense`

以上这些是api相关，另外还有很多框架特性也不能落掉

>

回答范例

1.  `api`层面`Vue3`新特性主要包括：`Composition API`、`SFC Composition API`语法糖、`Teleport`传送门、`Fragments` 片段、`Emits`选项、自定义渲染器、`SFC CSS`变量、`Suspense`
2.  另外，`Vue3.0`在框架层面也有很多亮眼的改进：

*   **更快**
    *   虚拟`DOM`重写，`diff`算法优化
    *   编译器优化：静态提升、`patchFlags（静态标记）`、事件监听缓存
    *   基于`Proxy`的响应式系统
    *   `SSR`优化
*   **更小**：更好的摇树优化 `tree shaking`、`Vue3`移除一些不常用的 `API`
*   **更友好**：`vue3`在兼顾`vue2`的`options API`的同时还推出了`composition API`，大大增加了代码的逻辑组织和代码复用能力
*   **更容易维护**：`TypeScript` + 模块化
*   **更容易扩展**
    *   独立的响应化模块
    *   自定义渲染器
```

###  Vue3速度快的原因

>

Vue3.0 性能提升体现在哪些方面

*   代码层面性能优化主要体现在全新响应式`API`，基于`Proxy`实现，性能更好（获取到哪一层才触发响应式`get`，不是像`vue2`一次性递归监听数据）
*   编译层面做了更多编译优化处理，比如`静态标记 pachFlag`（`diff`算法增加了一个静态标记，只对比有标记的`dom`元素）、`事件增加缓存`、`静态提升`（对不参与更新的元素，会做静态提升，只会被创建一次，之后会在每次渲染时候被不停的复用）等，可以有效跳过大量`diff`过程；
*   打包时更好的支持`tree-shaking`，因此整体体积更小，加载更快
*   `ssr`渲染以字符串方式渲染
```

*   `proxy`响应式：深度监听，性能更好（获取到哪一层才触发响应式`get`，不是一次性递归）
*   `PatchFlag` 动态节点做标志
*   `HoistStatic` 将静态节点的定义，提升到父作用域，缓存起来。多个相邻的静态节点，会被合并起来
*   `CacheHandler` 事件缓存
*   `SSR`优化: 静态节点不走`vdom`逻辑，直接输出字符串
*   `Tree-shaking` 根据模板的内容动态`import`不同的内容，不需要就不`import`

**一、编译阶段**

试想一下，一个组件结构如下图

```html

    <template>
        <div id="content">
            <p class="text">静态文本</p>
            <p class="text">静态文本</p>
            <p class="text">{ message }</p>
            <p class="text">静态文本</p>
            ...
            <p class="text">静态文本</p>
        </div>
    </template>
```

可以看到，组件内部只有一个动态节点，剩余一堆都是静态节点，所以这里很多 `diff` 和遍历其实都是不需要的，造成性能浪费

**因此，Vue3在编译阶段，做了进一步优化。主要有如下：**

*   `diff`算法优化
*   静态提升
*   事件监听缓存
*   `SSR`优化

**1\. diff 算法优化**

*   `Vue 2x` 中的虚拟 `dom` 是进行全量的对比。
*   `Vue 3x` 中新增了静态标记(`PatchFlag`):在与上次虚拟结点进行对比的时候，值对比 带有 `patch flag` 的节点，并且可以通过 `flag` 的信息得知当前节点要对比的具体内容化

**什么是PatchFlag**

*   模板编译时，动态节点做标记
*   标记，分为不同类型，如`Text`、`PROPS`、`CLASS`
*   `diff`算法时，可区分静态节点，以及不同类型的动态节点

![](https://s.poetries.work/uploads/2023/02/36af2f141c7659aa.png)

```vue

    <!-- https://vue-next-template-explorer.netlify.app 中打开查看编译结果 -->

    <div>
      <span>hello vue3</span>
      <span>{{msg}}</span>
      <span :class="name">poetry</span>
      <span :id="name">poetry</span>
      <span :id="name">{{msg}}</span>
      <span :id="name" :msg="msg">poetry</span>
    </div>
```

```js

    // 编译后结果

    import { createElementVNode as _createElementVNode, toDisplayString as _toDisplayString, normalizeClass as _normalizeClass, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue"

    export function render(_ctx, _cache, $props, $setup, $data, $options) {
      return (_openBlock(), _createElementBlock("div", null, [
        _createElementVNode("span", null, "hello vue3"),
        _createElementVNode("span", null, _toDisplayString(_ctx.msg), 1 /* TEXT */), // 文本标记1
        _createElementVNode("span", {
          class: _normalizeClass(_ctx.name)
        }, "poetry", 2 /* CLASS */), // class标记2
        _createElementVNode("span", { id: _ctx.name }, "poetry", 8 /* PROPS */, ["id"]), // 属性props标记8
        _createElementVNode("span", { id: _ctx.name }, _toDisplayString(_ctx.msg), 9 /* TEXT, PROPS */, ["id"]), // 文本和属性组合标记9
        _createElementVNode("span", {
          id: _ctx.name,
          msg: _ctx.msg
        }, "poetry", 8 /* PROPS */, ["id", "msg"]) // 属性组合标记
      ]))
    }
```

**Vue2.x的diff算法**

`vue2.x`的`diff`算法叫做`全量比较`，顾名思义，就是当数据改变的时候，会从头到尾的进行`vDom`对比，即使有些内容是永恒固定不变的

![](https://s.poetries.work/uploads/2022/08/d299e4ac4d29052a.png)

**Vue3.0的diff算法**

`vue3.0`的`diff`算法有个叫静态标记（`PatchFlag`）的小玩意，啥是静态标记呢？简单点说，就是如果你的内容会变，我会给你一个`flag`，下次数据更新的时候我直接来对比你，我就不对比那些没有标记的了

![](https://s.poetries.work/uploads/2022/08/216dc586400c35fb.png)

已经标记静态节点的`p`标签在`diff`过程中则不会比较，把性能进一步提高

```js

    export function render(_ctx, _cache, $props, $setup, $data, $options) {
     return (_openBlock(), _createBlock("div", null, [
      _createVNode("p", null, "'HelloWorld'"),
      _createVNode("p", null, _toDisplayString(_ctx.msg), 1 /* TEXT */)
                            //上面这个1就是静态标记
     ]))
    }
```

关于静态类型枚举如下

```js

    TEXT = 1 // 动态文本节点
    CLASS=1<<1,1 // 2//动态class
    STYLE=1<<2，// 4 //动态style
    PROPS=1<<3,// 8 //动态属性，但不包含类名和样式
    FULLPR0PS=1<<4,// 16 //具有动态key属性，当key改变时，需要进行完整的diff比较。
    HYDRATE_ EVENTS = 1 << 5，// 32 //带有监听事件的节点
    STABLE FRAGMENT = 1 << 6, // 64 //一个不会改变子节点顺序的fragment
    KEYED_ FRAGMENT = 1 << 7, // 128 //带有key属性的fragment 或部分子字节有key
    UNKEYED FRAGMENT = 1<< 8, // 256 //子节点没有key 的fragment
    NEED PATCH = 1 << 9, // 512 //一个节点只会进行非props比较
    DYNAMIC_SLOTS = 1 << 10 // 1024 // 动态slot
    HOISTED = -1 // 静态节点
    // 指示在diff算法中退出优化模式
    BALL = -2
```

**2\. hoistStatic 静态提升**

*   `Vue 2x` : 无论元素是否参与更新，每次都会重新创建。
*   `Vue 3x` : 对不参与更新的元素，会做静态提升，只会被创建一次，之后会在每次渲染时候被不停的复用。这样就免去了重复的创建节点，大型应用会受益于这个改动，免去了重复的创建操作，优化了运行时候的内存占用

> *   将静态节点的定义，提升到父作用域，缓存起来
> *   多个相邻的静态节点，会被合并起来
> *   典型的拿空间换时间的优化策略

```html

    <p>HelloWorld</p>
    <p>HelloWorld</p>

    <p>{ message }</p>
```

开启静态提升前

```js

    export function render(_ctx, _cache, $props, $setup, $data, $options) {
     return (_openBlock(), _createBlock("div", null, [
      _createVNode("p", null, "'HelloWorld'"),
      _createVNode("p", null, "'HelloWorld'"),
      _createVNode("p", null, _toDisplayString(_ctx.msg), 1 /* TEXT */)
     ]))
    }
```

开启静态提升后编译结果

```js

    // https://vue-next-template-explorer.netlify.app 中打开查看编译结果

    // 之后函数怎么执行，这些变量都不会被重复定义一遍
    const _hoisted_1 = /*#__PURE__*/_createVNode("p", null, "'HelloWorld'", -1 /* HOISTED */)
    const _hoisted_2 = /*#__PURE__*/_createVNode("p", null, "'HelloWorld'", -1 /* HOISTED */)

    export function render(_ctx, _cache, $props, $setup, $data, $options) {
     return (_openBlock(), _createBlock("div", null, [
      _hoisted_1,
      _hoisted_2,
      _createVNode("p", null, _toDisplayString(_ctx.msg), 1 /* TEXT */)
     ]))
    }
```

> 可以看到开启了静态提升后，直接将那两个内容为`helloworld`的`p`标签声明在外面了，直接就拿来用了。同时 `_hoisted_1`和`_hoisted_2` 被打上了 `PatchFlag` ，静态标记值为 `-1` ，特殊标志是负整数表示永远不会用于 `Diff`

```vue

    <!-- https://vue-next-template-explorer.netlify.app 中打开查看编译结果：options开启hoistStatic -->
    <!-- 当相同的节点达到一定阈值后会被vue3合并起来 -->
    <div>
      <span>hello vue3</span>
      <span>hello vue3</span>
      <span>hello vue3</span>
      <span>hello vue3</span>
      <span>hello vue3</span>
      <span>hello vue3</span>
      <span>hello vue3</span>
      <span>hello vue3</span>
      <span>hello vue3</span>
      <span>hello vue3</span>
      <span>{{msg}}</span>
    </div>
```

```js

    // 编译之后

    import { createElementVNode as _createElementVNode, toDisplayString as _toDisplayString, createStaticVNode as _createStaticVNode, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue"

    // 多个相邻的静态节点，会被合并起来
    const _hoisted_1 = /*#__PURE__*/_createStaticVNode("<span>hello vue3</span><span>hello vue3</span><span>hello vue3</span><span>hello vue3</span><span>hello vue3</span><span>hello vue3</span><span>hello vue3</span><span>hello vue3</span><span>hello vue3</span><span>hello vue3</span>", 10)

    export function render(_ctx, _cache, $props, $setup, $data, $options) {
      return (_openBlock(), _createElementBlock("div", null, [
        _hoisted_1,
        _createElementVNode("span", null, _toDisplayString(_ctx.msg), 1 /* TEXT */)
      ]))
    }
```

**3\. cacheHandlers 事件监听缓存**

*   默认情况下**绑定事件会被视为动态绑定**，所以每次都会去追踪它的变化
*   但是因为是同一个函数，所以没有追踪变化，直接缓存起来复用即可

```html

    <!-- https://vue-next-template-explorer.netlify.app 中打开查看编译结果：options开启cacheHandler -->
    <div>
     <button @click = 'onClick'>点我</button>
    </div>
```

开启事件侦听器缓存之前：

```js

    export const render = /*#__PURE__*/_withId(function render(_ctx, _cache, $props, $setup, $data, $options) {
     return (_openBlock(), _createBlock("div", null, [
      _createVNode("button", { onClick: _ctx.onClick }, "点我", 8 /* PROPS */, ["onClick"])
                           // PROPS=1<<3,// 8 //动态属性，但不包含类名和样式
     ]))
    })
```

这里有一个`8`，表示着这个节点有了静态标记，有静态标记就会进行`diff`算法对比差异，所以会浪费时间

开启事件侦听器缓存之后：

```js

    export function render(_ctx, _cache, $props, $setup, $data, $options) {
     return (_openBlock(), _createBlock("div", null, [
      _createVNode("button", {
       onClick: _cache[1] || (_cache[1] = (...args) => (_ctx.onClick(...args)))
      }, "点我")
     ]))
    }
```

上述发现开启了缓存后，没有了静态标记。也就是说下次`diff`算法的时候直接使用

**4\. SSR优化**

*   静态节点直接输出，绕过了`vdom`
*   动态节点，还是需要动态渲染

> 当静态内容大到一定量级时候，会用`createStaticVNode`方法在客户端去生成一个`static node`，这些静态`node`，会被直接`innerHtml`，就不需要创建对象，然后根据对象渲染

```html

    <!-- https://vue-next-template-explorer.netlify.app 中打开查看编译结果：options开启ssr -->
    <div>
      <span>hello vue3</span>
      <span>hello vue3</span> 
      <span>hello vue3</span> 
      <!-- 这里有很多个静态节点... -->
      <span>{{msgs}}</span>
    </div>
```

```js

    // 编译之后

    import { mergeProps as _mergeProps } from "vue"
    import { ssrRenderAttrs as _ssrRenderAttrs, ssrInterpolate as _ssrInterpolate } from "vue/server-renderer"

    export function ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
      const _cssVars = { style: { color: _ctx.color }}
      _push(`<div${
        _ssrRenderAttrs(_mergeProps(_attrs, _cssVars))
      }><span>hello vue3</span><span>hello vue3</span><span>hello vue3</span><span>${ // 静态节点直接输出
        _ssrInterpolate(_ctx.msgs)
      }</span></div>`)
    }
```

**二、源码体积变小，使用Tree Shaking优化**

> 编译时，根据不同的情况，引入不同的`API`，不会全部引用

*   相比`Vue2`，`Vue3`整体体积变小了，除了移出一些不常用的`API`，再重要的是`Tree shanking`
*   任何一个函数，如`ref`、`reactive`、`computed`等，仅仅在用到的时候才打包，没用到的模块都被摇掉，打包的整体体积变小

```vue

    <!-- https://vue-next-template-explorer.netlify.app 中打开查看编译结果 -->
    <div>
      <span v-if="msg">hello vue3</span>
      <input v-model="msg" />
    </div>
```

```js

    // 编译之后

    // 模板编译会根据模板写法 指令 插值以及用了特别的功能去动态的import相应的接口，需要什么就import什么，这就是tree shaking
    import { openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, vModelText as _vModelText, createElementVNode as _createElementVNode, withDirectives as _withDirectives } from "vue"

    export function render(_ctx, _cache, $props, $setup, $data, $options) {
      return (_openBlock(), _createElementBlock("div", null, [
        (_ctx.msg)
          ? (_openBlock(), _createElementBlock("span", { key: 0 }, "hello vue3"))
          : _createCommentVNode("v-if", true),
        _withDirectives(_createElementVNode("input", {
          "onUpdate:modelValue": $event => ((_ctx.msg) = $event)
        }, null, 8 /* PROPS */, ["onUpdate:modelValue"]), [
          [_vModelText, _ctx.msg]
        ])
      ]))
    }
```

**三、响应式系统**

`vue2`中采用 `defineProperty`来劫持整个对象，然后进行深度遍历所有属性，给每个属性添加`getter`和`setter`，实现响应式

`vue3`采用`proxy`重写了响应式系统，因为`proxy`可以对整个对象进行监听，所以不需要深度遍历

*   可以监听动态属性的添加
*   可以监听到数组的索引和数组`length`属性
*   可以监听删除属性

###  Composition API 与 Options API 有什么不同

**分析**

`Vue3`最重要更新之一就是`Composition API`，它具有一些列优点，其中不少是针对`Options API`暴露的一些问题量身打造。是`Vue3`推荐的写法，因此掌握好`Composition API`应用对掌握好`Vue3`至关重要

![](https://s.poetries.work/uploads/2022/08/42c5530ad23d0361.png)

[What is Composition API?<span><span class="sr-only">(opens new window)</span></span>](https://vuejs.org/guide/extras/composition-api-faq.html#what-is-composition-api)

*   `Composition API`出现就是为了解决Options API导致相同功能代码分散的现象

![](https://s.poetries.work/uploads/2022/08/87829ae3ab62f60f.gif) ![](https://s.poetries.work/uploads/2022/08/b103d51e49714aa9.gif)

**体验**

`Composition API`能更好的组织代码，下面用`composition api`可以提取为`useCount()`，用于组合、复用

![](https://s.poetries.work/uploads/2022/08/1687b11c5dfe0743.png)

**compositon api提供了以下几个函数：**

*   `setup`
*   `ref`
*   `reactive`
*   `watchEffect`
*   `watch`
*   `computed`
*   `toRefs`
*   生命周期的`hooks`

**回答范例**

1.  `Composition API`是一组`API`，包括：`Reactivity API`、`生命周期钩子`、`依赖注入`，使用户可以通过导入函数方式编写`vue`组件。而`Options API`则通过声明组件选项的对象形式编写组件
2.  `Composition API`最主要作用是能够简洁、高效复用逻辑。解决了过去`Options API`中`mixins`的各种缺点；另外`Composition API`具有更加敏捷的代码组织能力，很多用户喜欢`Options API`，认为所有东西都有固定位置的选项放置代码，但是单个组件增长过大之后这反而成为限制，一个逻辑关注点分散在组件各处，形成代码碎片，维护时需要反复横跳，`Composition API`则可以将它们有效组织在一起。最后`Composition API`拥有更好的类型推断，对ts支持更友好，`Options API`在设计之初并未考虑类型推断因素，虽然官方为此做了很多复杂的类型体操，确保用户可以在使用`Options API`时获得类型推断，然而还是没办法用在`mixins`和`provide/inject`上
3.  `Vue3`首推`Composition API`，但是这会让我们在代码组织上多花点心思，因此在选择上，如果我们项目属于中低复杂度的场景，`Options API`仍是一个好选择。对于那些大型，高扩展，强维护的项目上，`Composition API`会获得更大收益

**可能的追问**

1.  `Composition API`能否和`Options API`一起使用？

可以在同一个组件中使用两个`script`标签，一个使用vue3，一个使用vue2写法，一起使用没有问题

```html

    <!-- vue3 -->
    <script setup>
      // vue3写法
    </script>

    <!-- 降级vue2 -->
    <script>
      export default {
        data() {},
        methods: {}
      }
    </script>
```

###  ref如何使用

**ref**

*   生成值类型的响应式数据
*   可用于模板和`reactive`
*   通过`.value`修改值

```vue

    <template>
        <p>ref demo {{ageRef}} {{state.name}}</p>
    </template>

    <script>
    import { ref, reactive } from 'vue'

    export default {
        name: 'Ref',
        setup() {
            const ageRef = ref(20) // 值类型 响应式
            const nameRef = ref('test')

            const state = reactive({
                name: nameRef
            })

            setTimeout(() => {
                console.log('ageRef', ageRef.value)

                ageRef.value = 25 // .value 修改值
                nameRef.value = 'testA'
            }, 1500);

            return {
                ageRef,
                state
            }
        }
    }
    </script>
```

```vue

    <!-- ref获取dom节点 -->
    <template>
        <p ref="elemRef">我是一行文字</p>
    </template>

    <script>
    import { ref, onMounted } from 'vue'

    export default {
        name: 'RefTemplate',
        setup() {
            const elemRef = ref(null)

            onMounted(() => {
                console.log('ref template', elemRef.value.innerHTML, elemRef.value)
            })

            return {
                elemRef
            }
        }
    }
    </script>
```

###  toRef和toRefs如何使用和最佳方式

**toRef**

*   针对一个响应式对象（`reactive`封装的）的一个属性，创建一个`ref`，具有响应式
*   两者保持引用关系

**toRefs**

*   将响应式对象（`reactive`封装的）转化为普通对象
*   对象的每个属性都是对象的`ref`
*   两者保持引用关系

合成函数返回响应式对象

![](https://s.poetries.work/uploads/2023/02/99525a723bd206bd.png)

**最佳使用方式**

*   用`reactive`做对象的响应式，用`ref`做值类型响应式（基本类型）
*   `setup`中返回`toRefs(state)`，或者`toRef(state, 'prop')`
*   `ref`的变量命名都用`xxRef`
*   合成函数返回响应式对象时，使用`toRefs`，有助于使用方对数据进行解构时，不丢失响应式

```vue

    <template>
        <p>toRef demo - {{ageRef}} - {{state.name}} {{state.age}}</p>
    </template>

    <script>
    import { ref, toRef, reactive } from 'vue'

    export default {
        name: 'ToRef',
        setup() {
            const state = reactive({
                age: 20,
                name: 'test'
            })

            const age1 = computed(() => {
                return state.age + 1
            })

            // toRef 如果用于普通对象（非响应式对象），产出的结果不具备响应式
            // const state = {
            //     age: 20,
            //     name: 'test'
            // }
            // 一个响应式对象state其中一个属性要单独拿出来实现响应式用toRef
            const ageRef = toRef(state, 'age')

            setTimeout(() => {
                state.age = 25
            }, 1500)

            setTimeout(() => {
                ageRef.value = 30 // .value 修改值
            }, 3000)

            return {
                state,
                ageRef
            }
        }
    }
    </script>
```

```vue

    <template>
        <p>toRefs demo {{age}} {{name}}</p>
    </template>

    <script>
    import { ref, toRef, toRefs, reactive } from 'vue'

    export default {
        name: 'ToRefs',
        setup() {
            const state = reactive({
                age: 20,
                name: 'test'
            })

            const stateAsRefs = toRefs(state) // 将响应式对象，变成普通对象

            // const { age: ageRef, name: nameRef } = stateAsRefs // 每个属性，都是 ref 对象
            // return {
            //     ageRef,
            //     nameRef
            // }

            setTimeout(() => {
                state.age = 25
            }, 1500)

            return stateAsRefs
        }
    }
    </script>
```

###  深入理解为什么需要ref、toRef、toRefs

**为什么需要用 ref**

*   返回值类型，会丢失响应式
*   如在`setup`、`computed`、合成函数，都有可能返回值类型
*   `Vue`如不定义`ref`，用户将制造`ref`，反而更混乱

**为何ref需要.value属性**

*   `ref`是一个对象（不丢失响应式），`value`存储值
*   通过`.value`属性的`get`和`set`实现响应式
*   用于模板、`reactive`时，不需要`.value`，其他情况都要

**为什么需要toRef和toRefs**

*   **初衷**：不丢失响应式的情况下，把对象数据 `分解/扩散`
*   **前端**：针对的是响应式对象（`reactive`封装的）非普通对象
*   注意：**不创造**响应式，而是**延续**响应式

```vue

    <template>
        <p>why ref demo {{state.age}} - {{age1}}</p>
    </template>

    <script>
    import { ref, toRef, toRefs, reactive, computed } from 'vue'

    function useFeatureX() {
        const state = reactive({
            x: 1,
            y: 2
        })

        return toRefs(state)
    }

    export default {
        name: 'WhyRef',
        setup() {
            // 解构不丢失响应式
            const { x, y } = useFeatureX()

            const state = reactive({
                age: 20,
                name: 'test'
            })

            // computed 返回的是一个类似于 ref 的对象，也有 .value
            const age1 = computed(() => {
                return state.age + 1
            })

            setTimeout(() => {
                state.age = 25
            }, 1500)

            return {
                state,
                age1,
                x,
                y
            }
        }
    }
    </script>
```

###  ref和reactive异同

这是`Vue3`数据响应式中非常重要的两个概念，跟我们写代码关系也很大

```js

    const count = ref(0)
    console.log(count.value) // 0
    ​
    count.value++
    console.log(count.value) // 1

    const obj = reactive({ count: 0 })
    obj.count++
```

*   `ref`接收内部值（`inner value`）返回响应式`Ref`对象，`reactive`返回响应式代理对象
*   从定义上看`ref`通常用于处理单值的响应式，`reactive`用于处理对象类型的数据响应式
*   两者均是用于构造响应式数据，但是`ref`主要解决原始值的响应式问题
*   `ref`返回的响应式数据在JS中使用需要加上`.value`才能访问其值，在视图中使用会自动脱`ref`，不需要`.value`；`ref`可以接收对象或数组等非原始值，但内部依然是`reactive`实现响应式；`reactive`内部如果接收`Re`f对象会自动脱`ref`；使用展开运算符(`...`)展开`reactive`返回的响应式对象会使其失去响应性，可以结合`toRefs()`将值转换为`Ref`对象之后再展开。
*   `reactive`内部使用`Proxy`代理传入对象并拦截该对象各种操作，从而实现响应式。`ref`内部封装一个`RefImpl`类，并设置`get value/set value`，拦截用户对值的访问，从而实现响应式

###  vue3升级了哪些重要功能

**1\. createApp**

```js

    // vue2
    const app = new Vue({/**选项**/})
    Vue.use(/****/)
    Vue.mixin(/****/)
    Vue.component(/****/)
    Vue.directive(/****/)

    // vue3
    const app = createApp({/**选项**/})
    app.use(/****/)
    app.mixin(/****/)
    app.component(/****/)
    app.directive(/****/)
```

**2\. emits属性**

```js

    // 父组件
    <Hello :msg="msg" @onSayHello="sayHello">

    // 子组件
    export default {
        name: 'Hello',
        props: {
            msg: String
        },
        emits: ['onSayHello'], // 声明emits
        setup(props, {emit}) {
            emit('onSayHello', 'aaa')
        }
    }
```

**3\. 多事件**

```vue

    <!-- 定义多个事件 -->
    <button @click="one($event),two($event)">提交</button>
```

**4\. Fragment**

```vue

    <!-- vue2 -->
    <template>
        <div>
            <h2>{{title}}</h2>
            <p>test</p>
        </div>
    </template>

    <!-- vue3：不在使用div节点包裹 -->
    <template>
        <h2>{{title}}</h2>
        <p>test</p>
    </template>
```

**5\. 移除.sync**

```vue

    <!-- vue2 -->
    <MyComponent :title.sync="title" />

    <!-- vue3 简写 -->
    <MyComponent v-model:title="title" />
    <!-- 非简写 -->
    <MyComponent :title="title" @update:title="title = $event" />
```

**.sync用法**

父组件把属性给子组件，子组件修改了后还能同步到父组件中来

```vue

    <template>
      <button @click="close">关闭</button>
    </template>
    <script>
    export default {
        props: {
            isVisible: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            close () {
                this.$emit('update:isVisible', false);
            }
        }
    };
    </script>
```

```vue

    <!-- 父组件使用 -->
    <chlid-component :isVisible.sync="isVisible"></chlid-component>
```

```vue

    <text-doc :title="doc.title" @update:title="doc.title = $event"></text-doc>

    <!-- 为了方便期间，为这种模式提供一个简写 .sync -->
    <text-doc :title.sync="doc.title" />
```

**6\. 异步组件的写法**

```js

    // vue2写法
    new Vue({
        components: {
            'my-component': ()=>import('./my-component.vue')
        }
    })
```

```js

    // vue3写法
    import {createApp, defineAsyncComponent} from 'vue'

    export default {
        components: {
            AsyncComponent: defineAsyncComponent(()=>import('./AsyncComponent.vue'))
        }
    }
```

**7\. 移除filter**

```vue

    <!-- 以下filter在vue3中不可用了 -->

    <!-- 在花括号中 -->
    {{message | capitalize}}

    <!-- 在v-bind中 -->
    <div v-bind:id="rawId | formatId"></div>
```

**8\. Teleport**

```vue

    <button @click="modalOpen = true">
     open
    </button>

    <!-- 通过teleport把弹窗放到body下 -->
    <teleport to="body">
     <div v-if="modalOpen" classs="modal">
       <div>
         teleport弹窗，父元素是body
         <button @click="modalOpen = false">close</button>
       </div>
     </div>
    </teleport>
```

**9\. Suspense**

```html

    <Suspense>
     <template>
        <!-- 异步组件 -->
       <Test1 />  
     </template>
     <!-- fallback是一个具名插槽，即Suspense内部有两个slot，一个具名插槽fallback -->
     <template #fallback>
        loading...
     </template>
    </Suspense>
```

**10\. Composition API**

*   `reactive`
*   `ref`
*   `readonly`
*   `watch`和`watchEffect`
*   `setup`
*   生命周期钩子函数

###  Vue3.2 setup 语法糖汇总

提示：`vue3.2` 版本开始才能使用语法糖！

在 `Vue3.0` 中变量必须 `return` 出来， `template` 中才能使用；而在 `Vue3.2` 中只需要在 `script` 标签上加上 `setup` 属性，无需 `return`， `template` 便可直接使用，非常的香啊！

**1\. 如何使用setup语法糖**

只需在 `script` 标签上写上 `setup`

```html

    <template>
    </template>
    <script setup>
    </script>
    <style scoped lang="less">
    </style>
```

**2\. data数据的使用**

由于 `setup` 不需写 `return` ，所以直接声明数据即可

```html

    <script setup>
    import {
      ref,
      reactive,
      toRefs,
    } from 'vue'

    const data = reactive({
      patternVisible: false,
      debugVisible: false,
      aboutExeVisible: false,
    })

    const content = ref('content')
    //使用toRefs解构
    const { patternVisible, debugVisible, aboutExeVisible } = toRefs(data)
    </script>
```

**3\. method方法的使用**

```html

    <template >
      <button @click="onClickHelp">帮助</button>
    </template>
    <script setup>
    import {reactive} from 'vue'

    const data = reactive({
      aboutExeVisible: false,
    })
    // 点击帮助
    const onClickHelp = () => {
      console.log(`帮助`)
      data.aboutExeVisible = true
    }
    </script>
```

**4\. watchEffect的使用**

```html

    <script setup>
    import {
      ref,
      watchEffect,
    } from 'vue'

    let sum = ref(0)

    watchEffect(()=>{
      const x1 = sum.value
      console.log('watchEffect所指定的回调执行了')
    })
    </script>
```

**5\. watch的使用**

```html

    <script setup>
    import {
      reactive,
      watch,
    } from 'vue'
    //数据
    let sum = ref(0)
    let msg = ref('hello')
    let person = reactive({
      name:'张三',
      age:18,
      job:{
        j1:{
          salary:20
        }
      }
    })
    // 两种监听格式
    watch([sum,msg],(newValue,oldValue)=>{
        console.log('sum或msg变了',newValue,oldValue)
      },
      {immediate:true}
    )

    watch(()=>person.job,(newValue,oldValue)=>{
      console.log('person的job变化了',newValue,oldValue)
    },{deep:true}) 

    </script>
```

**6\. computed计算属性的使用**

`computed` 计算属性有两种写法(简写和考虑读写的完整写法)

```html

    <script setup>
    import {
      reactive,
      computed,
    } from 'vue'

    // 数据
    let person = reactive({
      firstName:'poetry',
      lastName:'x'
    })

    // 计算属性简写
    person.fullName = computed(()=>{
      return person.firstName + '-' + person.lastName
    })

    // 完整写法
    person.fullName = computed({
      get(){
        return person.firstName + '-' + person.lastName
      },
      set(value){
        const nameArr = value.split('-')
        person.firstName = nameArr[0]
        person.lastName = nameArr[1]
      }
    })
    </script>
```

**7\. props父子传值的使用**

父组件代码如下（示例）：

```html

    <template>
      <child :name='name'/>  
    </template>

    <script setup>
      import {ref} from 'vue'
      // 引入子组件
      import child from './child.vue'
      let name= ref('poetry')
    </script>
```

子组件代码如下（示例）：

```html

    <template>
      <span>{{props.name}}</span>
    </template>

    <script setup>
    import { defineProps } from 'vue'
    // 声明props
    const props = defineProps({
      name: {
        type: String,
        default: 'poetries'
      }
    })  
    // 或者
    //const props = defineProps(['name'])
    </script>
```

**8\. emit子父传值的使用**

父组件代码如下（示例）：

```html

    <template>
      <AdoutExe @aboutExeVisible="aboutExeHandleCancel" />
    </template>
    <script setup>
    import { reactive } from 'vue'
    // 导入子组件
    import AdoutExe from '../components/AdoutExeCom'

    const data = reactive({
      aboutExeVisible: false, 
    })
    // content组件ref

    // 关于系统隐藏
    const aboutExeHandleCancel = () => {
      data.aboutExeVisible = false
    }
    </script>
```

子组件代码如下（示例）：

```html

    <template>
      <a-button @click="isOk">
        确定
      </a-button>
    </template>
    <script setup>
    import { defineEmits } from 'vue';

    // emit
    const emit = defineEmits(['aboutExeVisible'])
    /**
     * 方法
     */
    // 点击确定按钮
    const isOk = () => {
      emit('aboutExeVisible');
    }
    </script>
```

**9\. 获取子组件ref变量和defineExpose暴露**

即`vue2`中的获取子组件的`ref`，直接在父组件中控制子组件方法和变量的方法

父组件代码如下（示例）：

```html

    <template>
      <button @click="onClickSetUp">点击</button>
      <Content ref="content" />
    </template>

    <script setup>
    import {ref} from 'vue'

    // content组件ref
    const content = ref('content')
    // 点击设置
    const onClickSetUp = ({ key }) => {
      content.value.modelVisible = true
    }
    </script>
    <style scoped lang="less">
    </style>
```

子组件代码如下（示例）：

```html

    <template>
       <p>{{data }}</p>
    </template>

    <script setup>
    import {
      reactive,
      toRefs
    } from 'vue'

    /**
     * 数据部分
    * */
    const data = reactive({
      modelVisible: false,
      historyVisible: false, 
      reportVisible: false, 
    })

    defineExpose({
      ...toRefs(data),
    })
    </script>
```

**10\. 路由useRoute和useRouter的使用**

```html

    <script setup>
      import { useRoute, useRouter } from 'vue-router'

      // 声明
      const route = useRoute()
      const router = useRouter()

      // 获取query
      console.log(route.query)
      // 获取params
      console.log(route.params)

      // 路由跳转
      router.push({
        path: `/index`
      })
    </script>
```

**11\. store仓库的使用**

```html

    <script setup>
      import { useStore } from 'vuex'
      import { num } from '../store/index'

      const store = useStore(num)

      // 获取Vuex的state
      console.log(store.state.number)
      // 获取Vuex的getters
      console.log(store.state.getNumber)

      // 提交mutations
      store.commit('fnName')

      // 分发actions的方法
      store.dispatch('fnName')
    </script>
```

**12\. await的支持**

`setup`语法糖中可直接使用`await`，不需要写`async`，`setup`会自动变成`async setup`

```html

    <script setup>
      import api from '../api/Api'
      const data = await Api.getData()
      console.log(data)
    </script>
```

**13\. provide 和 inject 祖孙传值**

父组件代码如下（示例）：

```html

    <template>
      <AdoutExe />
    </template>

    <script setup>
      import { ref,provide } from 'vue'
      import AdoutExe from '@/components/AdoutExeCom'

      let name = ref('py')
      // 使用provide
      provide('provideState', {
        name,
        changeName: () => {
          name.value = 'poetries'
        }
      })
    </script>
```

子组件代码如下（示例）：

```html

    <script setup>
      import { inject } from 'vue'
      const provideState = inject('provideState')

      provideState.changeName()
    </script>
```

###  v-model参数的用法

**vue2自定义组件model**

```vue

    <!-- 自定义 v-model -->
    <CustomVModel v-model="name"/> 
```

```vue

    <!-- CustomVModel -->
    <template>
      <!-- 例如：vue 颜色选择 -->
      <input type="text"
        :value="text"
        @input="$emit('change', $event.target.value)"
      >
      <!--
        1\. 上面的 input 使用了 :value 而不是 v-model
        2\. 上面的 change 和 model.event 要对应起来
        3\. text 属性对应起来
      -->
    </template>

    <script>
    export default {
        model: {
            prop: 'text', // 对应 props text
            event: 'change'
        },
        props: {
            text1: String,
            default() {
                return ''
            }
        }
    }
    </script>
```

**vue3自定义组件model**

```vue

    <!-- index.vue 绑定一个值 -->
    <CustomVModel v-model="name"/> 

    <!-- CustomVModel.vue -->
    <template>
        <input type="text"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
        >
    </template>

    <script>
    export default {
        props: {
            modelValue: String,
        }
    }
    </script>
```

```vue

    <!-- UserInfo组件 -->
    <template>
      <input :value="name" @input="$emit('update:name', $event.target.value)"/>
      <input :value="age" @input="$emit('update:age', $event.target.value)"/>
    </template>

    <script>
    export default {
      name: 'UserInfo',
      props: {
        name: String,
        age: String
      }
    }
    </script>
```

```vue

    <!-- 绑定多个值
    使用 vue3中v-model可绑定多个属性 -->
    <user-info
        v-model:name="name"
        v-model:age="age"
    ></user-info>
```

###  watch和watchEffect的区别

*   两者都可以监听`data`属性变化
*   `watch`需要明确监听哪个属性
*   `watchEffect`会根据其中的属性，自动监听其变化

```vue

    <template>
        <p>watch vs watchEffect</p>
        <p>{{numberRef}}</p>
        <p>{{name}} {{age}}</p>
    </template>

    <script>
    import { reactive, ref, toRefs, watch, watchEffect } from 'vue'

    export default {
        name: 'Watch',
        setup() {
            const numberRef = ref(100)
            const state = reactive({
                name: 'test',
                age: 20
            })

            watchEffect(() => {
                // 初始化时，一定会执行一次（收集要监听的数据）
                console.log('hello watchEffect')
            })
            watchEffect(() => {
                console.log('state.name', state.name)
            })
            watchEffect(() => {
                console.log('state.age', state.age)
            })
            watchEffect(() => {
                console.log('state.age', state.age)
                console.log('state.name', state.name)
            })
            setTimeout(() => {
                state.age = 25
            }, 1500)
            setTimeout(() => {
                state.name = 'testA'
            }, 3000)

            // ref直接写
            // watch(numberRef, (newNumber, oldNumber) => {
            //     console.log('ref watch', newNumber, oldNumber)
            // }
            // // , {
            // //     immediate: true // 初始化之前就监听，可选
            // // }
            // )

            // setTimeout(() => {
            //     numberRef.value = 200
            // }, 1500)

            // watch(
            //     // 第一个参数，确定要监听哪个属性
            //     () => state.age,

            //     // 第二个参数，回调函数
            //     (newAge, oldAge) => {
            //         console.log('state watch', newAge, oldAge)
            //     },

            //     // 第三个参数，配置项
            //     {
            //         immediate: true, // 初始化之前就监听，可选
            //         // deep: true // 深度监听
            //     }
            // )

            // setTimeout(() => {
            //     state.age = 25
            // }, 1500)
            // setTimeout(() => {
            //     state.name = 'zhangsanA'
            // }, 3000)

            return {
                numberRef,
                ...toRefs(state)
            }
        }
    }
    </script>
```

###  setup中如何获取组件实例

*   在`setup`和其他`composition API`中没有`this`
*   通过`getCurrentInstance`获取当前实例
*   若使用`options API`可以照常使用`this`

```js

    import { onMounted, getCurrentInstance } from 'vue'

    export default {
        name: 'GetInstance',
        data() {
            return {
                x: 1,
                y: 2
            }
        }, 
        setup() { // setup是created beforeCreate 合集 组件还没正式初始化
            console.log('this1', this) // undefined

            onMounted(() => {
                console.log('this in onMounted', this) // undefined
                console.log('x', instance.data.x) // 1  onMounted中组件已经初始化了
            })

            const instance = getCurrentInstance()
            console.log('instance', instance)
        },
        mounted() {
            console.log('this2', this)
            console.log('y', this.y)
        }
    }
```

###  Vite 为什么启动非常快

*   开发环境使用`Es6 Module`，无需打包，非常快
*   生产环境使用`rollup`，并不会快很多

**ES Module 在浏览器中的应用**

```html

    <p>基本演示</p>
    <script type="module">
        import add from './src/add.js'

        const res = add(1, 2)
        console.log('add res', res)
    </script>
    <script type="module">
        import { add, multi } from './src/math.js'
        console.log('add res', add(10, 20))
        console.log('multi res', multi(10, 20))
    </script>
```

```html

    <p>外链引用</p>
    <script type="module" src="./src/index.js"></script>
```

```html

    <p>远程引用</p>
    <script type="module">
        import { createStore } from 'https://unpkg.com/redux@latest/es/redux.mjs' // es module规范mjs
        console.log('createStore', createStore)
    </script>
```

```html

    <p>动态引入</p>
    <button id="btn1">load1</button>
    <button id="btn2">load2</button>

    <script type="module">
        document.getElementById('btn1').addEventListener('click', async () => {
            const add = await import('./src/add.js')
            const res = add.default(1, 2)
            console.log('add res', res)
        })
        document.getElementById('btn2').addEventListener('click', async () => {
            const { add, multi } = await import('./src/math.js')
            console.log('add res', add(10, 20))
            console.log('multi res', multi(10, 20))
        })
    </script>
```

###  说说Vue 3.0中Tree shaking特性？举例说明一下？

**一、是什么**

`Tree shaking` 是一种通过清除多余代码方式来优化项目打包体积的技术，专业术语叫 `Dead code elimination`

简单来讲，就是在保持代码运行结果不变的前提下，去除无用的代码

如果把代码打包比作制作蛋糕，传统的方式是把鸡蛋（带壳）全部丢进去搅拌，然后放入烤箱，最后把（没有用的）蛋壳全部挑选并剔除出去

而`treeshaking`则是一开始就把有用的蛋白蛋黄（import）放入搅拌，最后直接作出蛋糕

也就是说 ，`tree shaking` 其实是找出使用的代码

在`Vue2`中，无论我们使用什么功能，它们最终都会出现在生产代码中。主要原因是`Vue`实例在项目中是单例的，捆绑程序无法检测到该对象的哪些属性在代码中被使用到

```js

    import Vue from 'vue'

    Vue.nextTick(() => {})
```

而`Vue3`源码引入`tree shaking`特性，将全局 API 进行分块。如果您不使用其某些功能，它们将不会包含在您的基础包中

```js

    import { nextTick, observable } from 'vue'

    nextTick(() => {})
```

**二、如何做**

`Tree shaking`是基于`ES6`模板语法（`import`与`exports`），主要是借助`ES6`模块的静态编译思想，在编译时就能确定模块的依赖关系，以及输入和输出的变量

`Tree shaking`无非就是做了两件事：

*   编译阶段利用`ES6 Module`判断哪些模块已经加载
*   判断那些模块和变量未被使用或者引用，进而删除对应代码

下面就来举个例子：

通过脚手架`vue-cli`安装`Vue2`与`Vue3`项目

```js

    vue create vue-demo
```

**Vue2 项目**

组件中使用`data`属性

```vue

    <script>
        export default {
            data: () => ({
                count: 1,
            }),
        };
    </script>
```

对项目进行打包，体积如下图

![](https://s.poetries.work/uploads/2022/09/3886fc8c2dbc3985.png)

为组件设置其他属性（`compted`、`watch`）

```js

    export default {
        data: () => ({
            question:"", 
            count: 1,
        }),
        computed: {
            double: function () {
                return this.count * 2;
            },
        },
        watch: {
            question: function (newQuestion, oldQuestion) {
                this.answer = 'xxxx'
            }
    };
```

再一次打包，发现打包出来的体积并没有变化

![](https://s.poetries.work/uploads/2022/09/6045e7bd46dc48f3.png)

**Vue3 项目**

组件中简单使用

```js

    import { reactive, defineComponent } from "vue";
    export default defineComponent({
      setup() {
        const state = reactive({
          count: 1,
        });
        return {
          state,
        };
      },
    });
```

将项目进行打包

![](https://s.poetries.work/uploads/2022/09/30de7985e2521249.png)

在组件中引入`computed`和`watch`

```js

    import { reactive, defineComponent, computed, watch } from "vue";
    export default defineComponent({
      setup() {
        const state = reactive({
          count: 1,
        });
        const double = computed(() => {
          return state.count * 2;
        });

        watch(
          () => state.count,
          (count, preCount) => {
            console.log(count);
            console.log(preCount);
          }
        );
        return {
          state,
          double,
        };
      },
    });
```

再次对项目进行打包，可以看到在引入`computer`和`watch`之后，项目整体体积变大了

![](https://s.poetries.work/uploads/2022/09/0bf1724126701e32.png)

**三、作用**

通过`Tree shaking`，`Vue3`给我们带来的好处是：

*   减少程序体积（更小）
*   减少程序执行时间（更快）
*   便于将来对程序架构进行优化（更友好）

###  用Vue3.0 写过组件吗？如果想实现一个 Modal你会怎么设计？

**一、组件设计**

组件就是把图形、非图形的各种逻辑均抽象为一个统一的概念（组件）来实现开发的模式

现在有一个场景，点击新增与编辑都弹框出来进行填写，功能上大同小异，可能只是标题内容或者是显示的主体内容稍微不同

这时候就没必要写两个组件，只需要根据传入的参数不同，组件显示不同内容即可

这样，下次开发相同界面程序时就可以写更少的代码，意义着更高的开发效率，更少的 `Bug`和更少的程序体积

**二、需求分析**

实现一个`Modal`组件，首先确定需要完成的内容：

*   遮罩层
*   标题内容
*   主体内容
*   确定和取消按钮

主体内容需要灵活，所以可以是字符串，也可以是一段 `html` 代码

特点是它们在当前`vue`实例之外独立存在，通常挂载于`body`之上

除了通过引入`import`的形式，我们还可通过`API`的形式进行组件的调用

还可以包括配置全局样式、国际化、与`typeScript`结合

**三、实现流程**

首先看看大致流程：

*   目录结构
*   组件内容
*   实现 `API` 形式
*   事件处理
*   其他完善

**目录结构**

`Modal`组件相关的目录结构

```text

    ├── plugins
    │   └── modal
    │       ├── Content.tsx // 维护 Modal 的内容，用于 h 函数和 jsx 语法
    │       ├── Modal.vue // 基础组件
    │       ├── config.ts // 全局默认配置
    │       ├── index.ts // 入口
    │       ├── locale // 国际化相关
    │       │   ├── index.ts
    │       │   └── lang
    │       │       ├── en-US.ts
    │       │       ├── zh-CN.ts
    │       │       └── zh-TW.ts
    │       └── modal.type.ts // ts类型声明相关
```

因为 Modal 会被 `app.use(Modal)` 调用作为一个插件，所以都放在`plugins`目录下

**组件内容**

首先实现`modal.vue`的主体显示内容大致如下

```html

    <Teleport to="body" :disabled="!isTeleport">
        <div v-if="modelValue" class="modal">
            <div
                 class="mask"
                 :style="style"
                 @click="maskClose && !loading && handleCancel()"
                 ></div>
            <div class="modal__main">
                <div class="modal__title line line--b">
                    <span>{{ title || t("r.title") }}</span>
                    <span
                          v-if="close"
                          :title="t('r.close')"
                          class="close"
                          @click="!loading && handleCancel()"
                          >✕</span
                        >
                </div>
                <div class="modal__content">
                    <Content v-if="typeof content === 'function'" :render="content" />
                    <slot v-else>
                        {{ content }}
                    </slot>
                </div>
                <div class="modal__btns line line--t">
                    <button :disabled="loading" @click="handleConfirm">
                        <span class="loading" v-if="loading"> ❍ </span>{{ t("r.confirm") }}
                    </button>
                    <button @click="!loading && handleCancel()">
                        {{ t("r.cancel") }}
                    </button>
                </div>
            </div>
        </div>
    </Teleport>
```

最外层上通过Vue3 `Teleport` 内置组件进行包裹，其相当于传送门，将里面的内容传送至`body`之上

并且从`DOM`结构上来看，把`modal`该有的内容（遮罩层、标题、内容、底部按钮）都实现了

关于主体内容

```html

    <div class="modal__content">
        <Content v-if="typeof content==='function'"
                 :render="content" />
        <slot v-else>
            {{content}}
        </slot>
    </div>
```

可以看到根据传入`content`的类型不同，对应显示不同得到内容

最常见的则是通过调用字符串和默认插槽的形式

```js

    // 默认插槽
    <Modal v-model="show"
           title="演示 slot">
        <div>hello world~</div>
    </Modal>

    // 字符串
    <Modal v-model="show"
           title="演示 content"
           content="hello world~" />
```

通过 API 形式调用`Modal`组件的时候，`content`可以使用下面两种

*   `h 函数`

```js

    $modal.show({
      title: '演示 h 函数',
      content(h) {
        return h(
          'div',
          {
            style: 'color:red;',
            onClick: ($event: Event) => console.log('clicked', $event.target)
          },
          'hello world ~'
        );
      }
    });
```

*   JSX

```js

    $modal.show({
      title: '演示 jsx 语法',
      content() {
        return (
          <div
            onClick={($event: Event) => console.log('clicked', $event.target)}
          >
            hello world ~
          </div>
        );
      }
    });
```

**实现 API 形式**

那么组件如何实现`API`形式调用`Modal`组件呢？

在`Vue2`中，我们可以借助`Vue`实例以及`Vue.extend`的方式获得组件实例，然后挂载到`body`上

```js

    import Modal from './Modal.vue';
    const ComponentClass = Vue.extend(Modal);
    const instance = new ComponentClass({ el: document.createElement("div") });
    document.body.appendChild(instance.$el);
```

虽然`Vue3`移除了`Vue.extend`方法，但可以通过`createVNode`实现

```js

    import Modal from './Modal.vue';
    const container = document.createElement('div');
    const vnode = createVNode(Modal);
    render(vnode, container);
    const instance = vnode.component;
    document.body.appendChild(container);
```

在`Vue2`中，可以通过`this`的形式调用全局 `API`

```js

    export default {
        install(vue) {
           vue.prototype.$create = create
        }
    }
```

而在 Vue3 的 `setup` 中已经没有 `this`概念了，需要调用`app.config.globalProperties`挂载到全局

```js

    export default {
        install(app) {
            app.config.globalProperties.$create = create
        }
    }
```

**事件处理**

下面再看看看`Modal`组件内部是如何处理「确定」「取消」事件的，既然是`Vue3`，当然采用`Compositon API` 形式

```js

    // Modal.vue
    setup(props, ctx) {
      let instance = getCurrentInstance(); // 获得当前组件实例
      onBeforeMount(() => {
        instance._hub = {
          'on-cancel': () => {},
          'on-confirm': () => {}
        };
      });

      const handleConfirm = () => {
        ctx.emit('on-confirm');
        instance._hub['on-confirm']();
      };
      const handleCancel = () => {
        ctx.emit('on-cancel');
        ctx.emit('update:modelValue', false);
        instance._hub['on-cancel']();
      };

      return {
        handleConfirm,
        handleCancel
      };
    }
```

在上面代码中，可以看得到除了使用传统`emit`的形式使父组件监听，还可通过`_hub`属性中添加 `on-cancel`，`on-confirm`方法实现在`API`中进行监听

```js

    app.config.globalProperties.$modal = {
       show({}) {
         /* 监听 确定、取消 事件 */
       }
    }
```

下面再来目睹下`_hub`是如何实现

```js

    // index.ts
    app.config.globalProperties.$modal = {
        show({
            /* 其他选项 */
            onConfirm,
            onCancel
        }) {
            /* ... */

            const { props, _hub } = instance;

            const _closeModal = () => {
                props.modelValue = false;
                container.parentNode!.removeChild(container);
            };
            // 往 _hub 新增事件的具体实现
            Object.assign(_hub, {
                async 'on-confirm'() {
                if (onConfirm) {
                    const fn = onConfirm();
                    // 当方法返回为 Promise
                    if (fn && fn.then) {
                        try {
                            props.loading = true;
                            await fn;
                            props.loading = false;
                            _closeModal();
                        } catch (err) {
                            // 发生错误时，不关闭弹框
                            console.error(err);
                            props.loading = false;
                        }
                    } else {
                        _closeModal();
                    }
                } else {
                    _closeModal();
                }
            },
                'on-cancel'() {
                    onCancel && onCancel();
                    _closeModal();
                }
        });
    }
    };
```

**其他完善**

关于组件实现国际化、与`TypeScript`结合，大家可以根据自身情况在此基础上进行更改

##  34 Vue中v-html会导致哪些问题

*   可能会导致 `xss` 攻击
*   `v-html` 会替换掉标签内部的子元素

```js

    let template = require('vue-template-compiler'); 
    let r = template.compile(`<div v-html="'<span>hello</span>'"></div>`) 

    // with(this){return _c('div',{domProps: {"innerHTML":_s('<span>hello</span>')}})} 
    console.log(r.render);

    // _c 定义在core/instance/render.js 
    // _s 定义在core/instance/render-helpers/index,js
    if (key === 'textContent' || key === 'innerHTML') { 
        if (vnode.children) vnode.children.length = 0 
        if (cur === oldProps[key]) continue // #6601 work around Chrome version <= 55 bug where single textNode // replaced by innerHTML/textContent retains its parentNode property 
        if (elm.childNodes.length === 1) { 
            elm.removeChild(elm.childNodes[0]) 
        } 
    }
```

##  35 说下$attrs和$listeners的使用场景

API考察，但`$attrs`和`$listeners`是比较少用的边界知识，而且`vue3`有变化，`$listeners`已经移除，还是有细节可说的

**体验**

一个包含组件透传属性的对象

```html

    <template>
        <child-component v-bind="$attrs">
            将非属性特性透传给内部的子组件
        </child-component>
    </template>
```

**回答范例**

*   我们可能会有一些属性和事件没有在`props`中定义，这类称为非属性特性，结合`v-bind`指令可以直接透传给内部的子组件。
*   这类“属性透传”常常用于包装高阶组件时往内部传递属性，常用于爷孙组件之间传参。比如我在扩展A组件时创建了组件B组件，然后在C组件中使用B，此时传递给C的属性中只有`props`里面声明的属性是给B使用的，其他的都是A需要的，此时就可以利用`v-bind="$attrs"`透传下去。
*   最常见用法是结合`v-bind`做展开；`$attrs`本身不是响应式的，除非访问的属性本身是响应式对象。
*   `vue2`中使用`listeners`获取事件，`vue3`中已移除，均合并到`attrs`中,使用起来更简单了

**原理**

查看透传属性`foo`和普通属性`bar`，发现`vnode`结构完全相同，这说明`vue3`中将分辨两者工作由框架完成而非用户指定：

```html

    <template>
      <h1>{{ msg }}</h1>
      <comp foo="foo" bar="bar" />
    </template>
```

```html

    <template>
      <div>
        {{$attrs.foo}} {{bar}}
      </div>
    </template>

    <script setup>
    defineProps({
      bar: String
    })
    </script>
```

```js

    _createVNode(Comp, {
        foo: "foo",
        bar: "bar"
    })
```

##  36 在Vue中使用插件的步骤

*   采用`ES6`的`import ... from ...`语法或`CommonJS`的`require()`方法引入插件
*   使用全局方法`Vue.use( plugin )`使用插件,可以传入一个选项对象`Vue.use(MyPlugin, { someOption: true })`

##  37 vue-cli 工程技术集合介绍

###  构建的 vue-cli 工程都到了哪些技术，它们的作用分别是什么

*   `vue.js`：`vue-cli`工程的核心，主要特点是 双向数据绑定 和 组件系统。
*   `vue-router`：`vue`官方推荐使用的路由框架。
*   `vuex`：专为 `Vue.js` 应用项目开发的状态管理器，主要用于维护`vue`组件间共用的一些 变量 和 方法。
*   `axios`（ 或者 `fetch` 、`ajax` ）：用于发起 `GET` 、或 `POST` 等 `http`请求，基于 `Promise` 设计。
*   `vuex`等：一个专为`vue`设计的移动端UI组件库。
*   创建一个`emit.js`文件，用于`vue`事件机制的管理。
*   `webpack`：模块加载和`vue-cli`工程打包器。

###  vue-cli 工程常用的 npm 命令有哪些

*   下载 `node_modules` 资源包的命令：

```js

    npm install
```

*   启动 `vue-cli` 开发环境的 npm命令：

```js

    npm run dev
```

*   `vue-cli` 生成 生产环境部署资源 的 `npm`命令：

```js

    npm run build
```

*   用于查看 `vue-cli` 生产环境部署资源文件大小的 `npm`命令：

```js

    npm run build --report
```

> 在浏览器上自动弹出一个 展示 `vue-cli` 工程打包后 `app.js`、`manifest.js`、`vendor.js` 文件里面所包含代码的页面。可以具此优化 `vue-cli` 生产环境部署的静态资源，提升 页面 的加载速度

###  请说出vue cli项目中src目录每个文件夹和文件的用法

*   `assets`文件夹是放静态资源；
*   `components`是放组件；
*   `router`是定义路由相关的配置;
*   `view`视图；
*   `app.vue`是一个应用主组件；
*   `main.js`是入口文件

##  38 delete和Vue.delete删除数组的区别？

*   `delete`只是被删除的元素变成了 `empty/undefined` 其他的元素的键值还是不变。
*   `Vue.delete`直接删除了数组 改变了数组的键值。

```js

    var a=[1,2,3,4]
    var b=[1,2,3,4]
    delete a[0]
    console.log(a)  //[empty,2,3,4]
    this.$delete(b,0)
    console.log(b)  //[2,3,4]
```

##  39 v-on可以监听多个方法吗？

可以监听多个方法

```html

    <input type="text" :value="name" @input="onInput" @focus="onFocus" @blur="onBlur" />
```

**v-on 常用修饰符**

*   `.stop` 该修饰符将阻止事件向上冒泡。同理于调用 `event.stopPropagation()` 方法
*   `.prevent` 该修饰符会阻止当前事件的默认行为。同理于调用 `event.preventDefault()` 方法
*   `.self` 该指令只当事件是从事件绑定的元素本身触发时才触发回调
*   `.once` 该修饰符表示绑定的事件只会被触发一次

##  40 v-once的使用场景有哪些

**分析**

`v-once`是`Vue`中内置指令，很有用的`API`，在优化方面经常会用到

**体验**

仅渲染元素和组件一次，并且跳过未来更新

```html

    <!-- single element -->
    <span v-once>This will never change: {{msg}}</span>
    <!-- the element have children -->
    <div v-once>
      <h1>comment</h1>
      <p>{{msg}}</p>
    </div>
    <!-- component -->
    <my-component v-once :comment="msg"></my-component>
    <!-- `v-for` directive -->
    <ul>
      <li v-for="i in list" v-once>{{i}}</li>
    </ul>
```

**回答范例**

*   `v-once`是`vue`的内置指令，作用是仅渲染指定组件或元素一次，并跳过未来对其更新
*   如果我们有一些元素或者组件在初始化渲染之后不再需要变化，这种情况下适合使用`v-once`，这样哪怕这些数据变化，`vue`也会跳过更新，是一种代码优化手段
*   我们只需要作用的组件或元素上加上`v-once`即可
*   `vue3.2`之后，又增加了`v-memo`指令，可以有条件缓存部分模板并控制它们的更新，可以说控制力更强了
*   编译器发现元素上面有`v-once`时，会将首次计算结果存入缓存对象，组件再次渲染时就会从缓存获取，从而避免再次计算

**原理**

下面例子使用了`v-once`：

```html

    <script setup>
    import { ref } from 'vue'
    ​
    const msg = ref('Hello World!')
    </script>
    ​
    <template>
      <h1 v-once>{{ msg }}</h1>
      <input v-model="msg">
    </template>
```

我们发现`v-once`出现后，编译器会缓存作用元素或组件，从而避免以后更新时重新计算这一部分：

```js

    // ...
    return (_ctx, _cache) => {
      return (_openBlock(), _createElementBlock(_Fragment, null, [
        // 从缓存获取vnode
        _cache[0] || (
          _setBlockTracking(-1),
          _cache[0] = _createElementVNode("h1", null, [
            _createTextVNode(_toDisplayString(msg.value), 1 /* TEXT */)
          ]),
          _setBlockTracking(1),
          _cache[0]
        ),
    // ...
```

##  41 Vue Ref的作用

*   获取`dom`元素`this.$refs.box`
*   获取子组件中的`datathis.$refs.box.msg`
*   调用子组件中的方法`this.$refs.box.open()`

##  42 scoped样式穿透

> `scoped`虽然避免了组件间样式污染，但是很多时候我们需要修改组件中的某个样式，但是又不想去除`scoped`属性

1.  使用`/deep/`

```html

    <!-- Parent -->
    <template>
    <div class="wrap">
        <Child />
    </div>
    </template>

    <style lang="scss" scoped>
    .wrap /deep/ .box{
        background: red;
    }
    </style>

    <!-- Child -->
    <template>
        <div class="box"></div>
    </template>
```

1.  使用两个`style`标签

```html

    <!-- Parent -->
    <template>
    <div class="wrap">
        <Child />
    </div>
    </template>

    <style lang="scss" scoped>
    /* 其他样式 */
    </style>
    <style lang="scss">
    .wrap .box{
      background: red;
    }
    </style>

    <!-- Child -->
    <template>
      <div class="box"></div>
    </template>
```

##  43 Class 与 Style 如何动态绑定

`Class` 可以通过对象语法和数组语法进行动态绑定

对象语法：

```js

    <div v-bind:class="{ active: isActive, 'text-danger': hasError }"></div>

    data: {
      isActive: true,
      hasError: false
    }
```

数组语法：

```js

    <div v-bind:class="[isActive ? activeClass : '', errorClass]"></div>

    data: {
      activeClass: 'active',
      errorClass: 'text-danger'
    }
```

`Style` 也可以通过对象语法和数组语法进行动态绑定

对象语法：

```js

    <div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>

    data: {
      activeColor: 'red',
      fontSize: 30
    }
```

数组语法：

```js

    <div v-bind:style="[styleColor, styleSize]"></div>

    data: {
      styleColor: {
         color: 'red'
       },
      styleSize:{
         fontSize:'23px'
      }
    }
```

##  44 Vue为什么没有类似于React中shouldComponentUpdate的生命周期

*   考点: `Vue`的变化侦测原理
*   前置知识: 依赖收集、虚拟`DOM`、响应式系统

> 根本原因是`Vue`与`React`的变化侦测方式有所不同

*   当React知道发生变化后，会使用`Virtual Dom Diff`进行差异检测，但是很多组件实际上是肯定不会发生变化的，这个时候需要 `shouldComponentUpdate` 进行手动操作来减少`diff`，从而提高程序整体的性能
*   `Vue`在一开始就知道那个组件发生了变化，不需要手动控制`diff`，而组件内部采用的`diff`方式实际上是可以引入类似于`shouldComponentUpdate`相关生命周期的，但是通常合理大小的组件不会有过量的diff，手动优化的价值有限，因此目前`Vue`并没有考虑引入`shouldComponentUpdate`这种手动优化的生命周期

##  45 SPA、SSR的区别是什么

我们现在编写的`Vue`、`React`和`Angular`应用大多数情况下都会在一个页面中，点击链接跳转页面通常是内容切换而非页面跳转，由于良好的用户体验逐渐成为主流的开发模式。但同时也会有首屏加载时间长，`SEO`不友好的问题，因此有了`SSR`，这也是为什么面试中会问到两者的区别

1.  `SPA`（Single Page Application）即单页面应用。一般也称为 客户端渲染（Client Side Render）， 简称 `CSR`。`SSR`（Server Side Render）即 服务端渲染。一般也称为 多页面应用（Mulpile Page Application），简称 `MPA`
2.  `SPA`应用只会首次请求`html`文件，后续只需要请求`JSON`数据即可，因此用户体验更好，节约流量，服务端压力也较小。但是首屏加载的时间会变长，而且`SEO`不友好。为了解决以上缺点，就有了`SSR`方案，由于`HTML`内容在服务器一次性生成出来，首屏加载快，搜索引擎也可以很方便的抓取页面信息。但同时SSR方案也会有性能，开发受限等问题
3.  在选择上，如果我们的应用存在首屏加载优化需求，`SEO`需求时，就可以考虑`SSR`
4.  但并不是只有这一种替代方案，比如对一些不常变化的静态网站，SSR反而浪费资源，我们可以考虑预渲染（`prerender`）方案。另外`nuxt.js/next.js`中给我们提供了`SSG（Static Site Generate）`静态网站生成方案也是很好的静态站点解决方案，结合一些`CI`手段，可以起到很好的优化效果，且能节约服务器资源

**内容生成上的区别：**

SSR

![](https://s.poetries.work/uploads/2022/08/a3c8cf7c4b9b8825.png)

SPA

![](https://s.poetries.work/uploads/2022/08/46149f14f3674b16.png)

**部署上的区别**

![](https://s.poetries.work/uploads/2022/08/e302c2f6998f2c7e.png)

##  46 vue-loader是什么？它有什么作用？

**回答范例**

1.  `vue-loader`是用于处理单文件组件（`SFC`，`Single-File Component`）的`webpack loader`
2.  因为有了`vue-loader`，我们就可以在项目中编写`SFC`格式的`Vue`组件，我们可以把代码分割为`<template>`、`<script>`和`<style>`，代码会异常清晰。结合其他`loader`我们还可以用`Pug`编写`<template>`，用`SASS`编写`<style>`，用`TS`编写`<script>`。我们的`<style>`还可以单独作用当前组件
3.  `webpack`打包时，会以`loader`的方式调用`vue-loader`
4.  `vue-loader`被执行时，它会对`SFC`中的每个语言块用单独的`loader`链处理。最后将这些单独的块装配成最终的组件模块

**原理**

`vue-loader`会调用`@vue/compiler-sfc`模块解析`SFC`源码为一个描述符（`Descriptor`），然后为每个语言块生成`import`代码，返回的代码类似下面

```js

    // source.vue被vue-loader处理之后返回的代码
    ​
    // import the <template> block
    import render from 'source.vue?vue&type=template'
    // import the <script> block
    import script from 'source.vue?vue&type=script'
    export * from 'source.vue?vue&type=script'
    // import <style> blocks
    import 'source.vue?vue&type=style&index=1'
    ​
    script.render = render
    export default script
```

我们想要`script`块中的内容被作为`js`处理（当然如果是`<script lang="ts">`被作为`ts`理），这样我们想要`webpack`把配置中跟`.js`匹配的规则都应用到形如`source.vue?vue&type=script`的这个请求上。例如我们对所有`*.js`配置了`babel-loader`，这个规则将被克隆并应用到所在`Vue SFC`

```js

    import script from 'source.vue?vue&type=script
```

将被展开为：

```js

    import script from 'babel-loader!vue-loader!source.vue?vue&type=script'
```

类似的，如果我们对`.sass`文件配置了`style-loader + css-loader + sass-loader`，对下面的代码

```js

    <style scoped lang="scss">
```

`vue-loader`将会返回给我们下面结果：

```js

    import 'source.vue?vue&type=style&index=1&scoped&lang=scss'
```

然后`webpack`会展开如下：

```js

    import 'style-loader!css-loader!sass-loader!vue-loader!source.vue?vue&type=style&index=1&scoped&lang=scss'
```

*   当处理展开请求时，`vue-loader`将被再次调用。这次，`loader`将会关注那些有查询串的请求，且仅针对特定块，它会选中特定块内部的内容并传递给后面匹配的`loader`
*   对于`<script>`块，处理到这就可以了，但是`<template>` 和 `<style>`还有一些额外任务要做，比如
    *   需要用 `Vue` 模板编译器编译`template`，从而得到`render`函数
    *   需要对 `<style scoped>`中的`CSS`做后处理（`post-process`），该操作在`css-loader`之后但在`style-loader`之前

实现上这些附加的`loader`需要被注入到已经展开的`loader`链上，最终的请求会像下面这样：

```js

    // <template lang="pug">
    import 'vue-loader/template-loader!pug-loader!source.vue?vue&type=template'
    ​
    // <style scoped lang="scss">
    import 'style-loader!vue-loader/style-post-loader!css-loader!sass-loader!vue-loader!source.vue?vue&type=style&index=1&scoped&lang=scss'
```

##  47 说说你对slot的理解？slot使用场景有哪些

###  slot是什么

在HTML中 `slot` 元素 ，作为 `Web Components` 技术套件的一部分，是Web组件内的一个占位符

该占位符可以在后期使用自己的标记语言填充

举个栗子

```html

    <template id="element-details-template">
      <slot name="element-name">Slot template</slot>
    </template>
    <element-details>
      <span slot="element-name">1</span>
    </element-details>
    <element-details>
      <span slot="element-name">2</span>
    </element-details>
```

`template`不会展示到页面中，需要用先获取它的引用，然后添加到`DOM`中，

```js

    customElements.define('element-details',
      class extends HTMLElement {
        constructor() {
          super();
          const template = document
            .getElementById('element-details-template')
            .content;
          const shadowRoot = this.attachShadow({mode: 'open'})
            .appendChild(template.cloneNode(true));
      }
    })
```

在`Vue`中的概念也是如此

`Slot` 艺名插槽，花名“占坑”，我们可以理解为`solt`在组件模板中占好了位置，当使用该组件标签时候，组件标签里面的内容就会自动填坑（替换组件模板中`slot`位置），作为承载分发内容的出口

###  slot使用场景

通过插槽可以让用户可以拓展组件，去更好地复用组件和对其做定制化处理

如果父组件在使用到一个复用组件的时候，获取这个组件在不同的地方有少量的更改，如果去重写组件是一件不明智的事情

通过`slot`插槽向组件内部指定位置传递内容，完成这个复用组件在不同场景的应用

比如布局组件、表格列、下拉选、弹框显示内容等

###  slot分类

`slot`可以分来以下三种：

*   默认插槽
*   具名插槽
*   作用域插槽

**1\. 默认插槽**

子组件用`<slot>`标签来确定渲染的位置，标签里面可以放`DOM`结构，当父组件使用的时候没有往插槽传入内容，标签内`DOM`结构就会显示在页面

父组件在使用的时候，直接在子组件的标签内写入内容即可

子组件`Child.vue`

```html

    <template>
        <slot>
          <p>插槽后备的内容</p>
        </slot>
    </template>
```

父组件

```html

    <Child>
      <div>默认插槽</div>  
    </Child>
```

**2\. 具名插槽**

子组件用`name`属性来表示插槽的名字，不传为默认插槽

父组件中在使用时在默认插槽的基础上加上`slot`属性，值为子组件插槽`name`属性值

子组件`Child.vue`

```html

    <template>
        <slot>插槽后备的内容</slot>
      <slot name="content">插槽后备的内容</slot>
    </template>
```

父组件

```html

    <child>
        <template v-slot:default>具名插槽</template>
        <!-- 具名插槽⽤插槽名做参数 -->
        <template v-slot:content>内容...</template>
    </child>
```

**3\. 作用域插槽**

子组件在作用域上绑定属性来将子组件的信息传给父组件使用，这些属性会被挂在父组件`v-slot`接受的对象上

父组件中在使用时通过`v-slot:`（简写：#）获取子组件的信息，在内容中使用

子组件`Child.vue`

```html

    <template> 
      <slot name="footer" testProps="子组件的值">
              <h3>没传footer插槽</h3>
        </slot>
    </template>
```

父组件

```html

    <child> 
        <!-- 把v-slot的值指定为作⽤域上下⽂对象 -->
        <template v-slot:default="slotProps">
          来⾃⼦组件数据：{{slotProps.testProps}}
        </template>
        <template #default="slotProps">
          来⾃⼦组件数据：{{slotProps.testProps}}
        </template>
    </child>
```

**小结：**

*   `v-slot`属性只能在`<template>`上使用，但在只有默认插槽时可以在组件标签上使用
*   默认插槽名为`default`，可以省略default直接写`v-slot`
*   缩写为`#`时不能不写参数，写成`#default`
*   可以通过解构获取`v-slot={user}`，还可以重命名`v-slot="{user: newName}"`和定义默认值`v-slot="{user = '默认值'}"`

###  slot原理分析

`slot`本质上是返回`VNode`的函数，一般情况下，`Vue`中的组件要渲染到页面上需要经过`template -> render function -> VNode -> DOM` 过程，这里看看`slot`如何实现：

编写一个`buttonCounter`组件，使用匿名插槽

```js

    Vue.component('button-counter', {
      template: '<div> <slot>我是默认内容</slot></div>'
    })
```

使用该组件

```js

    new Vue({
        el: '#app',
        template: '<button-counter><span>我是slot传入内容</span></button-counter>',
        components:{buttonCounter}
    })
```

获取`buttonCounter`组件渲染函数

```js

    (function anonymous(
    ) {
    with(this){return _c('div',[_t("default",[_v("我是默认内容")])],2)}
    })
```

`_v`表示穿件普通文本节点，`_t`表示渲染插槽的函数

渲染插槽函数`renderSlot`（做了简化）

```js

    function renderSlot (
      name,
      fallback,
      props,
      bindObject
    ) {
      // 得到渲染插槽内容的函数    
      var scopedSlotFn = this.$scopedSlots[name];
      var nodes;
      // 如果存在插槽渲染函数，则执行插槽渲染函数，生成nodes节点返回
      // 否则使用默认值
      nodes = scopedSlotFn(props) || fallback;
      return nodes;
    }
```

`name`属性表示定义插槽的名字，默认值为`default`，`fallback`表示子组件中的`slot`节点的默认值

关于`this.$scopredSlots`是什么，我们可以先看看`vm.slot`

```js

    function initRender (vm) {
      ...
      vm.$slots = resolveSlots(options._renderChildren, renderContext);
      ...
    }
```

`resolveSlots`函数会对`children`节点做归类和过滤处理，返回`slots`

```js

    function resolveSlots (
        children,
        context
      ) {
        if (!children || !children.length) {
          return {}
        }
        var slots = {};
        for (var i = 0, l = children.length; i < l; i++) {
          var child = children[i];
          var data = child.data;
          // remove slot attribute if the node is resolved as a Vue slot node
          if (data && data.attrs && data.attrs.slot) {
            delete data.attrs.slot;
          }
          // named slots should only be respected if the vnode was rendered in the
          // same context.
          if ((child.context === context || child.fnContext === context) &&
            data && data.slot != null
          ) {
            // 如果slot存在(slot="header") 则拿对应的值作为key
            var name = data.slot;
            var slot = (slots[name] || (slots[name] = []));
            // 如果是tempalte元素 则把template的children添加进数组中，这也就是为什么你写的template标签并不会渲染成另一个标签到页面
            if (child.tag === 'template') {
              slot.push.apply(slot, child.children || []);
            } else {
              slot.push(child);
            }
          } else {
            // 如果没有就默认是default
            (slots.default || (slots.default = [])).push(child);
          }
        }
        // ignore slots that contains only whitespace
        for (var name$1 in slots) {
          if (slots[name$1].every(isWhitespace)) {
            delete slots[name$1];
          }
        }
        return slots
    }
```

`_render`渲染函数通过`normalizeScopedSlots`得到`vm.$scopedSlots`

```js

    vm.$scopedSlots = normalizeScopedSlots(
      _parentVnode.data.scopedSlots,
      vm.$slots,
      vm.$scopedSlots
    );
```

作用域插槽中父组件能够得到子组件的值是因为在`renderSlot`的时候执行会传入`props`，也就是上述`_t`第三个参数，父组件则能够得到子组件传递过来的值

##  48 Vue.observable你有了解过吗？说说看

###  Observable 是什么

`Observable` 翻译过来我们可以理解成**可观察的**

我们先来看一下其在`Vue`中的定义

> `Vue.observable`，让一个对象变成响应式数据。`Vue` 内部会用它来处理 `data` 函数返回的对象

返回的对象可以直接用于渲染函数和计算属性内，并且会在发生变更时触发相应的更新。也可以作为最小化的跨组件状态存储器

```js

    Vue.observable({ count : 1})
```

其作用等同于

```js

    new vue({ count : 1})
```

在 `Vue 2.x` 中，被传入的对象会直接被 `Vue.observable` 变更，它和被返回的对象是同一个对象

在 `Vue 3.x` 中，则会返回一个可响应的代理，而对源对象直接进行变更仍然是不可响应的

###  使用场景

在非父子组件通信时，可以使用通常的`bus`或者使用`vuex`，但是实现的功能不是太复杂，而使用上面两个又有点繁琐。这时，`observable`就是一个很好的选择

创建一个`js`文件

```js

    // 引入vue
    import Vue from 'vue
    // 创建state对象，使用observable让state对象可响应
    export let state = Vue.observable({
      name: '张三',
      'age': 38
    })
    // 创建对应的方法
    export let mutations = {
      changeName(name) {
        state.name = name
      },
      setAge(age) {
        state.age = age
      }
    }
```

在`.vue`文件中直接使用即可

```js

    <template>
      <div>
        姓名：{{ name }}
        年龄：{{ age }}
        <button @click="changeName('李四')">改变姓名</button>
        <button @click="setAge(18)">改变年龄</button>
      </div>
    </template>
    import { state, mutations } from '@/store
    export default {
      // 在计算属性中拿到值
      computed: {
        name() {
          return state.name
        },
        age() {
          return state.age
        }
      },
      // 调用mutations里面的方法，更新数据
      methods: {
        changeName: mutations.changeName,
        setAge: mutations.setAge
      }
    }
```

###  原理分析

源码位置：`src\core\observer\index.js`

```js

    export function observe (value: any, asRootData: ?boolean): Observer | void {
      if (!isObject(value) || value instanceof VNode) {
        return
      }
      let ob: Observer | void
      // 判断是否存在__ob__响应式属性
      if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
        ob = value.__ob__
      } else if (
        shouldObserve &&
        !isServerRendering() &&
        (Array.isArray(value) || isPlainObject(value)) &&
        Object.isExtensible(value) &&
        !value._isVue
      ) {
        // 实例化Observer响应式对象
        ob = new Observer(value)
      }
      if (asRootData && ob) {
        ob.vmCount++
      }
      return ob
    }
```

`Observer`类

```js

    export class Observer {
        value: any;
        dep: Dep;
        vmCount: number; // number of vms that have this object as root $data

        constructor (value: any) {
            this.value = value
            this.dep = new Dep()
            this.vmCount = 0
            def(value, '__ob__', this)
            if (Array.isArray(value)) {
                if (hasProto) {
                    protoAugment(value, arrayMethods)
                } else {
                    copyAugment(value, arrayMethods, arrayKeys)
                }
                this.observeArray(value)
            } else {
                // 实例化对象是一个对象，进入walk方法
                this.walk(value)
            }
    }
```

`walk`函数

```js

    walk (obj: Object) {
        const keys = Object.keys(obj)
        // 遍历key，通过defineReactive创建响应式对象
        for (let i = 0; i < keys.length; i++) {
            defineReactive(obj, keys[i])
        }
    }
```

`defineReactive`方法

```js

    export function defineReactive (
      obj: Object,
      key: string,
      val: any,
      customSetter?: ?Function,
      shallow?: boolean
    ) {
      const dep = new Dep()

      const property = Object.getOwnPropertyDescriptor(obj, key)
      if (property && property.configurable === false) {
        return
      }

      // cater for pre-defined getter/setters
      const getter = property && property.get
      const setter = property && property.set
      if ((!getter || setter) && arguments.length === 2) {
        val = obj[key]
      }

      let childOb = !shallow && observe(val)
      // 接下来调用Object.defineProperty()给对象定义响应式属性
      Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function reactiveGetter () {
          const value = getter ? getter.call(obj) : val
          if (Dep.target) {
            dep.depend()
            if (childOb) {
              childOb.dep.depend()
              if (Array.isArray(value)) {
                dependArray(value)
              }
            }
          }
          return value
        },
        set: function reactiveSetter (newVal) {
          const value = getter ? getter.call(obj) : val
          /* eslint-disable no-self-compare */
          if (newVal === value || (newVal !== newVal && value !== value)) {
            return
          }
          /* eslint-enable no-self-compare */
          if (process.env.NODE_ENV !== 'production' && customSetter) {
            customSetter()
          }
          // #7981: for accessor properties without setter
          if (getter && !setter) return
          if (setter) {
            setter.call(obj, newVal)
          } else {
            val = newVal
          }
          childOb = !shallow && observe(newVal)
          // 对观察者watchers进行通知,state就成了全局响应式对象
          dep.notify()
        }
      })
    }
```

##  49 Vue中的过滤器了解吗？过滤器的应用场景有哪些？

过滤器实质不改变原始数据，只是对数据进行加工处理后返回过滤后的数据再进行调用处理，我们也可以理解其为一个纯函数

Vue 允许你自定义过滤器，可被用于一些常见的文本格式化

ps: `Vue3`中已废弃`filter`

###  如何用

vue中的过滤器可以用在两个地方：双花括号插值和 `v-bind` 表达式，过滤器应该被添加在 JavaScript表达式的尾部，由“管道”符号指示：

```html

    <!-- 在双花括号中 -->
    { message | capitalize }

    <!-- 在 `v-bind` 中 -->
    <div v-bind:id="rawId | formatId"></div>
```

###  定义filter

在组件的选项中定义本地的过滤器

```js

    filters: {
      capitalize: function (value) {
        if (!value) return ''
        value = value.toString()
        return value.charAt(0).toUpperCase() + value.slice(1)
      }
    }
```

定义全局过滤器：

```js

    Vue.filter('capitalize', function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    })

    new Vue({
      // ...
    })
```

注意：当全局过滤器和局部过滤器重名时，会采用局部过滤器

过滤器函数总接收表达式的值 (之前的操作链的结果) 作为第一个参数。在上述例子中，`capitalize` 过滤器函数将会收到 `message` 的值作为第一个参数

过滤器可以串联：

```js

    { message | filterA | filterB }
```

在这个例子中，`filterA` 被定义为接收单个参数的过滤器函数，表达式 `message` 的值将作为参数传入到函数中。然后继续调用同样被定义为接收单个参数的过滤器函数 `filterB`，将 `filterA` 的结果传递到 `filterB` 中。

过滤器是 `JavaScript`函数，因此可以接收参数：

```js

    {{ message | filterA('arg1', arg2) }}
```

这里，`filterA` 被定义为接收三个参数的过滤器函数。

其中 `message` 的值作为第一个参数，普通字符串 `'arg1'` 作为第二个参数，表达式 `arg2` 的值作为第三个参数

举个例子：

```html

    <div id="app">
      <p>{{ msg | msgFormat('疯狂','--')}}</p>
    </div>

    <script>
        // 定义一个 Vue 全局的过滤器，名字叫做  msgFormat
        Vue.filter('msgFormat', function(msg, arg, arg2) {
            // 字符串的  replace 方法，第一个参数，除了可写一个 字符串之外，还可以定义一个正则
            return msg.replace(/单纯/g, arg+arg2)
        })
    </script>
```

**小结：**

*   部过滤器优先于全局过滤器被调用
*   一个表达式可以使用多个过滤器。过滤器之间需要用管道符“|”隔开。其执行顺序从左往右

###  应用场景

平时开发中，需要用到过滤器的地方有很多，比如`单位转换`、`数字打点`、`文本格式化`、`时间格式化`之类的等

比如我们要实现将`30000 => 30,000`，这时候我们就需要使用过滤器

```js

    Vue.filter('toThousandFilter', function (value) {
      if (!value) return ''
      value = value.toString()
      return .replace(str.indexOf('.') > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g, '$1,')
    })
```

###  原理分析

使用过滤器

```js

    {{ message | capitalize }}
```

在模板编译阶段过滤器表达式将会被编译为过滤器函数，主要是用过`parseFilters`，我们放到最后讲

```js

    _s(_f('filterFormat')(message))
```

首先分析一下`_f`：

`_f` 函数全名是：`resolveFilter`，这个函数的作用是从`this.$options.filters`中找出注册的过滤器并返回

```js

    // 变为
    this.$options.filters['filterFormat'](message) // message为参数
```

关于`resolveFilter`

```js

    import { indentity,resolveAsset } from 'core/util/index' 

    export function resolveFilter(id){
      return resolveAsset(this.$options,'filters',id,true) || identity
    }
```

内部直接调用`resolveAsset`，将`option`对象，类型，过滤器`id`，以及一个触发警告的标志作为参数传递，如果找到，则返回过滤器；

`resolveAsset`的代码如下：

```js

    export function resolveAsset(options,type,id,warnMissing){ // 因为我们找的是过滤器，所以在 resolveFilter函数中调用时 type 的值直接给的 'filters',实际这个函数还可以拿到其他很多东西
      if(typeof id !== 'string'){ // 判断传递的过滤器id 是不是字符串，不是则直接返回
          return 
      }
      const assets = options[type]  // 将我们注册的所有过滤器保存在变量中
      // 接下来的逻辑便是判断id是否在assets中存在，即进行匹配
      if(hasOwn(assets,id)) return assets[id] // 如找到，直接返回过滤器
      // 没有找到，代码继续执行
      const camelizedId  = camelize(id) // 万一你是驼峰的呢
      if(hasOwn(assets,camelizedId)) return assets[camelizedId]
      // 没找到，继续执行
      const PascalCaseId = capitalize(camelizedId) // 万一你是首字母大写的驼峰呢
      if(hasOwn(assets,PascalCaseId)) return assets[PascalCaseId]
      // 如果还是没找到，则检查原型链(即访问属性)
      const result = assets[id] || assets[camelizedId] || assets[PascalCaseId]
      // 如果依然没找到，则在非生产环境的控制台打印警告
      if(process.env.NODE_ENV !== 'production' && warnMissing && !result){
        warn('Failed to resolve ' + type.slice(0,-1) + ': ' + id, options)
      }
      // 无论是否找到，都返回查找结果
      return result
    }
```

下面再来分析一下`_s`：

`_s` 函数的全称是 `toString`,过滤器处理后的结果会当作参数传递给 `toString`函数，最终 `toString`函数执行后的结果会保存到`Vnode`中的text属性中，渲染到视图中

```js

    function toString(value){
      return value == null
      ? ''
      : typeof value === 'object'
        ? JSON.stringify(value,null,2)// JSON.stringify()第三个参数可用来控制字符串里面的间距
        : String(value)
    }
```

最后，在分析下`parseFilters`，在模板编译阶段使用该函数阶段将模板过滤器解析为过滤器函数调用表达式

```js

    function parseFilters (filter) {
        let filters = filter.split('|')
        let expression = filters.shift().trim() // shift()删除数组第一个元素并将其返回，该方法会更改原数组
        let i
        if (filters) {
            for(i = 0;i < filters.length;i++){
                experssion = warpFilter(expression,filters[i].trim()) // 这里传进去的expression实际上是管道符号前面的字符串，即过滤器的第一个参数
            }
        }
        return expression
    }
    // warpFilter函数实现
    function warpFilter(exp,filter){
        // 首先判断过滤器是否有其他参数
        const i = filter.indexof('(')
        if(i<0){ // 不含其他参数，直接进行过滤器表达式字符串的拼接
            return `_f("${filter}")(${exp})`
        }else{
            const name = filter.slice(0,i) // 过滤器名称
            const args = filter.slice(i+1) // 参数，但还多了 ‘)’
            return `_f('${name}')(${exp},${args}` // 注意这一步少给了一个 ')'
        }
    }
```

**小结：**

*   在编译阶段通过`parseFilters`将过滤器编译成函数调用（串联过滤器则是一个嵌套的函数调用，前一个过滤器执行的结果是后一个过滤器函数的参数）
*   编译后通过调用`resolveFilter`函数找到对应过滤器并返回结果
*   执行结果作为参数传递给`toString`函数，而`toString`执行后，其结果会保存在`Vnode`的`text`属性中，渲染到视图

##  50 Vue项目中有封装过axios吗？主要是封装哪方面的？

###  axios是什么

`axios` 是一个轻量的 `HTTP`客户端

基于 `XMLHttpRequest` 服务来执行 `HTTP` 请求，支持丰富的配置，支持 `Promise`，支持浏览器端和 `Node.js` 端。自`Vue`2.0起，尤大宣布取消对 `vue-resource` 的官方推荐，转而推荐 `axios`。现在 `axios` 已经成为大部分 `Vue` 开发者的首选

**特性**

*   从浏览器中创建 `XMLHttpRequests`
*   从 `node.js` 创建 `http`请求
*   支持 `Promise` API
*   拦截请求和响应
*   转换请求数据和响应数据
*   取消请求
*   自动转换`JSON` 数据
*   客户端支持防御`XSRF`

**基本使用**

安装

```js

    // 项目中安装
    npm install axios --S
    // cdn 引入
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
```

导入

```js

    import axios from 'axios'
```

发送请求

```js

    axios({        
      url:'xxx',    // 设置请求的地址
      method:"GET", // 设置请求方法
      params:{      // get请求使用params进行参数凭借,如果是post请求用data
        type: '',
        page: 1
      }
    }).then(res => {  
      // res为后端返回的数据
      console.log(res);   
    })
```

并发请求`axios.all([])`

```js

    function getUserAccount() {
        return axios.get('/user/12345');
    }

    function getUserPermissions() {
        return axios.get('/user/12345/permissions');
    }

    axios.all([getUserAccount(), getUserPermissions()])
        .then(axios.spread(function (res1, res2) { 
        // res1第一个请求的返回的内容，res2第二个请求返回的内容
        // 两个请求都执行完成才会执行
    }));
```

###  为什么要封装

`axios` 的 API 很友好，你完全可以很轻松地在项目中直接使用。

不过随着项目规模增大，如果每发起一次`HTTP`请求，就要把这些比如设置超时时间、设置请求头、根据项目环境判断使用哪个请求地址、错误处理等等操作，都需要写一遍

这种重复劳动不仅浪费时间，而且让代码变得冗余不堪，难以维护。为了提高我们的代码质量，我们应该在项目中二次封装一下 `axios` 再使用

举个例子：

```js

    axios('http://localhost:3000/data', {
      // 配置代码
      method: 'GET',
      timeout: 1000,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'xxx',
      },
      transformRequest: [function (data, headers) {
        return data;
      }],
      // 其他请求配置...
    })
    .then((data) => {
      // todo: 真正业务逻辑代码
      console.log(data);
    }, (err) => {
      // 错误处理代码  
      if (err.response.status === 401) {
      // handle authorization error
      }
      if (err.response.status === 403) {
      // handle server forbidden error
      }
      // 其他错误处理.....
      console.log(err);
    });
```

如果每个页面都发送类似的请求，都要写一堆的配置与错误处理，就显得过于繁琐了

这时候我们就需要对`axios`进行二次封装，让使用更为便利

###  如何封装

*   封装的同时，你需要和 后端协商好一些约定，请求头，状态码，请求超时时间.......
*   设置接口请求前缀：根据开发、测试、生产环境的不同，前缀需要加以区分
*   请求头 : 来实现一些具体的业务，必须携带一些参数才可以请求(例如：会员业务)
*   状态码: 根据接口返回的不同`status` ， 来执行不同的业务，这块需要和后端约定好
*   请求方法：根据`get`、`post`等方法进行一个再次封装，使用起来更为方便
*   请求拦截器: 根据请求的请求头设定，来决定哪些请求可以访问
*   响应拦截器： 这块就是根据 后端`返回来的状态码判定执行不同业务

**设置接口请求前缀**

利用`node`环境变量来作判断，用来区分开发、测试、生产环境

```js

    if (process.env.NODE_ENV === 'development') {
      axios.defaults.baseURL = 'http://dev.xxx.com'
    } else if (process.env.NODE_ENV === 'production') {
      axios.defaults.baseURL = 'http://prod.xxx.com'
    }
```

在本地调试的时候，还需要在`vue.config.js`文件中配置`devServer`实现代理转发，从而实现跨域

```js

    devServer: {
        proxy: {
          '/proxyApi': {
            target: 'http://dev.xxx.com',
            changeOrigin: true,
            pathRewrite: {
              '/proxyApi': ''
            }
          }
        }
      }
```

**设置请求头与超时时间**

大部分情况下，请求头都是固定的，只有少部分情况下，会需要一些特殊的请求头，这里将普适性的请求头作为基础配置。当需要特殊请求头时，将特殊请求头作为参数传入，覆盖基础配置

```js

    const service = axios.create({
        ...
        timeout: 30000,  // 请求 30s 超时
    	  headers: {
            get: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
              // 在开发中，一般还需要单点登录或者其他功能的通用请求头，可以一并配置进来
            },
            post: {
              'Content-Type': 'application/json;charset=utf-8'
              // 在开发中，一般还需要单点登录或者其他功能的通用请求头，可以一并配置进来
            }
      },
    })
```

**封装请求方法**

先引入封装好的方法，在要调用的接口重新封装成一个方法暴露出去

```js

    // get 请求
    export function httpGet({
      url,
      params = {}
    }) {
      return new Promise((resolve, reject) => {
        axios.get(url, {
          params
        }).then((res) => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    }

    // post
    // post请求
    export function httpPost({
      url,
      data = {},
      params = {}
    }) {
      return new Promise((resolve, reject) => {
        axios({
          url,
          method: 'post',
          transformRequest: [function (data) {
            let ret = ''
            for (let it in data) {
              ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
          }],
          // 发送的数据
          data,
          // url参数
          params

        }).then(res => {
          resolve(res.data)
        })
      })
    }
```

把封装的方法放在一个`api.js`文件中

```js

    import { httpGet, httpPost } from './http'
    export const getorglist = (params = {}) => httpGet({ url: 'apps/api/org/list', params })
```

页面中就能直接调用

```js

    // .vue
    import { getorglist } from '@/assets/js/api'

    getorglist({ id: 200 }).then(res => {
      console.log(res)
    })
```

这样可以把`api`统一管理起来，以后维护修改只需要在`api.js`文件操作即可

**请求拦截器**

请求拦截器可以在每个请求里加上token，做了统一处理后维护起来也方便

```js

    // 请求拦截器
    axios.interceptors.request.use(
      config => {
        // 每次发送请求之前判断是否存在token
        // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况，此处token一般是用户完成登录后储存到localstorage里的
        token && (config.headers.Authorization = token)
        return config
      },
      error => {
        return Promise.error(error)
      })
```

**响应拦截器**

响应拦截器可以在接收到响应后先做一层操作，如根据状态码判断登录状态、授权

```js

    // 响应拦截器
    axios.interceptors.response.use(response => {
      // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
      // 否则的话抛出错误
      if (response.status === 200) {
        if (response.data.code === 511) {
          // 未授权调取授权接口
        } else if (response.data.code === 510) {
          // 未登录跳转登录页
        } else {
          return Promise.resolve(response)
        }
      } else {
        return Promise.reject(response)
      }
    }, error => {
      // 我们可以在这里对异常状态作统一处理
      if (error.response.status) {
        // 处理请求失败的情况
        // 对不同返回码对相应处理
        return Promise.reject(error.response)
      }
    })
```

**小结**

*   封装是编程中很有意义的手段，简单的`axios`封装，就可以让我们可以领略到它的魅力
*   封装 `axios` 没有一个绝对的标准，只要你的封装可以满足你的项目需求，并且用起来方便，那就是一个好的封装方案

##  51 说下你的vue项目的目录结构，如果是大型项目你该怎么划分结构和划分组件呢

###  为什么要划分

使用`vue`构建项目，项目结构清晰会提高开发效率，熟悉项目的各种配置同样会让开发效率更高

在划分项目结构的时候，需要遵循一些基本的原则：

*   文件夹和文件夹内部文件的语义一致性
*   单一入口/出口
*   就近原则，紧耦合的文件应该放到一起，且应以相对路径引用
*   公共的文件应该以绝对路径的方式从根目录引用
*   `/src` 外的文件不应该被引入

**文件夹和文件夹内部文件的语义一致性**

我们的目录结构都会有一个文件夹是按照路由模块来划分的，如`pages`文件夹，这个文件夹里面应该包含我们项目所有的路由模块，并且仅应该包含路由模块，而不应该有别的其他的非路由模块的文件夹

这样做的好处在于一眼就从 `pages`文件夹看出这个项目的路由有哪些

**单一入口/出口**

举个例子，在`pages`文件夹里面存在一个`seller`文件夹，这时候`seller` 文件夹应该作为一个独立的模块由外部引入，并且 `seller/index.js` 应该作为外部引入 seller 模块的唯一入口

```js

    // 错误用法
    import sellerReducer from 'src/pages/seller/reducer'

    // 正确用法
    import { reducer as sellerReducer } from 'src/pages/seller'
```

这样做的好处在于，无论你的模块文件夹内部有多乱，外部引用的时候，都是从一个入口文件引入，这样就很好的实现了隔离，如果后续有重构需求，你就会发现这种方式的优点

**就近原则，紧耦合的文件应该放到一起，且应以相对路径引用**

使用相对路径可以保证模块内部的独立性

```js

    // 正确用法
    import styles from './index.module.scss'
    // 错误用法
    import styles from 'src/pages/seller/index.module.scss'
```

举个例子

假设我们现在的 seller 目录是在 `src/pages/seller`，如果我们后续发生了路由变更，需要加一个层级，变成 `src/pages/user/seller`。

如果我们采用第一种相对路径的方式，那就可以直接将整个文件夹拖过去就好，`seller` 文件夹内部不需要做任何变更。

但是如果我们采用第二种绝对路径的方式，移动文件夹的同时，还需要对每个 `import` 的路径做修改

**公共的文件应该以绝对路径的方式从根目录引用**

公共指的是多个路由模块共用，如一些公共的组件，我们可以放在`src/components`下

在使用到的页面中，采用绝对路径的形式引用

```js

    // 错误用法
    import Input from '../../components/input'
    // 正确用法
    import Input from 'src/components/input'
```

同样的，如果我们需要对文件夹结构进行调整。将 `/src/components/input` 变成 `/src/components/new/input`，如果使用绝对路径，只需要全局搜索替换

再加上绝对路径有全局的语义，相对路径有独立模块的语义

**src 外的文件不应该被引入**

`vue-cli`脚手架已经帮我们做了相关的约束了，正常我们的前端项目都会有个`src`文件夹，里面放着所有的项目需要的资源，`js`,`css`, `png`, `svg` 等等。`src` 外会放一些项目配置，依赖，环境等文件

这样的好处是方便划分项目代码文件和配置文件

###  目录结构

单页面目录结构

```js

    project
    │  .browserslistrc
    │  .env.production
    │  .eslintrc.js
    │  .gitignore
    │  babel.config.js
    │  package-lock.json
    │  package.json
    │  README.md
    │  vue.config.js
    │  yarn-error.log
    │  yarn.lock
    │
    ├─public
    │      favicon.ico
    │      index.html
    │
    |-- src
        |-- components
            |-- input
                |-- index.js
                |-- index.module.scss
        |-- pages
            |-- seller
                |-- components
                    |-- input
                        |-- index.js
                        |-- index.module.scss
                |-- reducer.js
                |-- saga.js
                |-- index.js
                |-- index.module.scss
            |-- buyer
                |-- index.js
            |-- index.js
```

多页面目录结构

```js

    my-vue-test:.
    │  .browserslistrc
    │  .env.production
    │  .eslintrc.js
    │  .gitignore
    │  babel.config.js
    │  package-lock.json
    │  package.json
    │  README.md
    │  vue.config.js
    │  yarn-error.log
    │  yarn.lock
    │
    ├─public
    │      favicon.ico
    │      index.html
    │
    └─src
        ├─apis //接口文件根据页面或实例模块化
        │      index.js
        │      login.js
        │
        ├─components //全局公共组件
        │  └─header
        │          index.less
        │          index.vue
        │
        ├─config //配置（环境变量配置不同passid等）
        │      env.js
        │      index.js
        │
        ├─contant //常量
        │      index.js
        │
        ├─images //图片
        │      logo.png
        │
        ├─pages //多页面vue项目，不同的实例
        │  ├─index //主实例
        │  │  │  index.js
        │  │  │  index.vue
        │  │  │  main.js
        │  │  │  router.js
        │  │  │  store.js
        │  │  │
        │  │  ├─components //业务组件
        │  │  └─pages //此实例中的各个路由
        │  │      ├─amenu
        │  │      │      index.vue
        │  │      │
        │  │      └─bmenu
        │  │              index.vue
        │  │
        │  └─login //另一个实例
        │          index.js
        │          index.vue
        │          main.js
        │
        ├─scripts //包含各种常用配置，工具函数
        │  │  map.js
        │  │
        │  └─utils
        │          helper.js
        │
        ├─store //vuex仓库
        │  │  index.js
        │  │
        │  ├─index
        │  │      actions.js
        │  │      getters.js
        │  │      index.js
        │  │      mutation-types.js
        │  │      mutations.js
        │  │      state.js
        │  │
        │  └─user
        │          actions.js
        │          getters.js
        │          index.js
        │          mutation-types.js
        │          mutations.js
        │          state.js
        │
        └─styles //样式统一配置
            │  components.less
            │
            ├─animation
            │      index.less
            │      slide.less
            │
            ├─base
            │      index.less
            │      style.less
            │      var.less
            │      widget.less
            │
            └─common
                    index.less
                    reset.less
                    style.less
                    transition.less
```

**小结**

项目的目录结构很重要，因为目录结构能体现很多东西，怎么规划目录结构可能每个人有自己的理解，但是按照一定的规范去进行目录的设计，能让项目整个架构看起来更为简洁，更加易用

##  52 从0到1自己构架一个vue项目，说说有哪些步骤、哪些重要插件、目录结构你会怎么组织

综合实践类题目，考查实战能力。没有什么绝对的正确答案，把平时工作的重点有条理的描述一下即可

**思路**

*   构建项目，创建项目基本结构
*   引入必要的插件：
*   代码规范：`prettier`，`eslint`
*   提交规范：`husky`，lint-staged`
*   其他常用：`svg-loader`，`vueuse`，`nprogress`
*   常见目录结构

**回答范例**

1.  从`0`创建一个项目我大致会做以下事情：项目构建、引入必要插件、代码规范、提交规范、常用库和组件
2.  目前`vue3`项目我会用`vite`或者`create-vue`创建项目
3.  接下来引入必要插件：路由插件`vue-router`、状态管理`vuex/pinia`、`ui`库我比较喜欢`element-plu`s和`antd-vue`、`http`工具我会选`axios`
4.  其他比较常用的库有`vueuse`，`nprogress`，图标可以使用`vite-svg-loader`
5.  下面是代码规范：结合`prettier`和`eslint`即可
6.  最后是提交规范，可以使用`husky`，`lint-staged`，`commitlint`
7.  目录结构我有如下习惯： `.vscode`：用来放项目中的 `vscode` 配置

*   `plugins`：用来放 `vite` 插件的 `plugin` 配置
*   `public`：用来放一些诸如 页头`icon` 之类的公共文件，会被打包到`dist`根目录下
*   `src`：用来放项目代码文件
*   `api`：用来放`http`的一些接口配置
*   `assets`：用来放一些 `CSS` 之类的静态资源
*   `components`：用来放项目通用组件
*   `layout`：用来放项目的布局
*   `router`：用来放项目的路由配置
*   `store`：用来放状态管理`Pinia`的配置
*   `utils`：用来放项目中的工具方法类
*   `views`：用来放项目的页面文件

##  53 vue要做权限管理该怎么做？如果控制到按钮级别的权限怎么做

###  是什么

权限是对特定资源的访问许可，所谓权限控制，也就是确保用户只能访问到被分配的资源

而前端权限归根结底是请求的发起权，请求的发起可能有下面两种形式触发

*   页面加载触发
*   页面上的按钮点击触发

总的来说，所有的请求发起都触发自前端路由或视图

所以我们可以从这两方面入手，对触发权限的源头进行控制，最终要实现的目标是：

*   路由方面，用户登录后只能看到自己有权访问的导航菜单，也只能访问自己有权访问的路由地址，否则将跳转 `4xx` 提示页
*   视图方面，用户只能看到自己有权浏览的内容和有权操作的控件
*   最后再加上请求控制作为最后一道防线，路由可能配置失误，按钮可能忘了加权限，这种时候请求控制可以用来兜底，越权请求将在前端被拦截

###  如何做

前端权限控制可以分为四个方面：

*   接口权限
*   按钮权限
*   菜单权限
*   路由权限

**接口权限**

接口权限目前一般采用`jwt`的形式来验证，没有通过的话一般返回`401`，跳转到登录页面重新进行登录

登录完拿到`token`，将`token`存起来，通过`axios`请求拦截器进行拦截，每次请求的时候头部携带`token`

```js

    axios.interceptors.request.use(config => {
        config.headers['token'] = cookie.get('token')
        return config
    })
    axios.interceptors.response.use(res=>{},{response}=>{
        if (response.data.code === 40099 || response.data.code === 40098) { //token过期或者错误
            router.push('/login')
        }
    })
```

**路由权限控制**

**方案一**

初始化即挂载全部路由，并且在路由上标记相应的权限信息，每次路由跳转前做校验

```js

    const routerMap = [
      {
        path: '/permission',
        component: Layout,
        redirect: '/permission/index',
        alwaysShow: true, // will always show the root menu
        meta: {
          title: 'permission',
          icon: 'lock',
          roles: ['admin', 'editor'] // you can set roles in root nav
        },
        children: [{
          path: 'page',
          component: () => import('@/views/permission/page'),
          name: 'pagePermission',
          meta: {
            title: 'pagePermission',
            roles: ['admin'] // or you can only set roles in sub nav
          }
        }, {
          path: 'directive',
          component: () => import('@/views/permission/directive'),
          name: 'directivePermission',
          meta: {
            title: 'directivePermission'
            // if do not set roles, means: this page does not require permission
          }
        }]
      }]
```

这种方式存在以下四种缺点：

*   加载所有的路由，如果路由很多，而用户并不是所有的路由都有权限访问，对性能会有影响。
*   全局路由守卫里，每次路由跳转都要做权限判断。
*   菜单信息写死在前端，要改个显示文字或权限信息，需要重新编译
*   菜单跟路由耦合在一起，定义路由的时候还有添加菜单显示标题，图标之类的信息，而且路由不一定作为菜单显示，还要多加字段进行标识

**方案二**

初始化的时候先挂载不需要权限控制的路由，比如登录页，404等错误页。如果用户通过URL进行强制访问，则会直接进入404，相当于从源头上做了控制

登录后，获取用户的权限信息，然后筛选有权限访问的路由，在全局路由守卫里进行调用`addRoutes`添加路由

```js

    import router from './router'
    import store from './store'
    import { Message } from 'element-ui'
    import NProgress from 'nprogress' // progress bar
    import 'nprogress/nprogress.css'// progress bar style
    import { getToken } from '@/utils/auth' // getToken from cookie

    NProgress.configure({ showSpinner: false })// NProgress Configuration

    // permission judge function
    function hasPermission(roles, permissionRoles) {
      if (roles.indexOf('admin') >= 0) return true // admin permission passed directly
      if (!permissionRoles) return true
      return roles.some(role => permissionRoles.indexOf(role) >= 0)
    }

    const whiteList = ['/login', '/authredirect']// no redirect whitelist

    router.beforeEach((to, from, next) => {
      NProgress.start() // start progress bar
      if (getToken()) { // determine if there has token
        /* has token*/
        if (to.path === '/login') {
          next({ path: '/' })
          NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
        } else {
          if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
            store.dispatch('GetUserInfo').then(res => { // 拉取user_info
              const roles = res.data.roles // note: roles must be a array! such as: ['editor','develop']
              store.dispatch('GenerateRoutes', { roles }).then(() => { // 根据roles权限生成可访问的路由表
                router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
                next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
              })
            }).catch((err) => {
              store.dispatch('FedLogOut').then(() => {
                Message.error(err || 'Verification failed, please login again')
                next({ path: '/' })
              })
            })
          } else {
            // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
            if (hasPermission(store.getters.roles, to.meta.roles)) {
              next()//
            } else {
              next({ path: '/401', replace: true, query: { noGoBack: true }})
            }
            // 可删 ↑
          }
        }
      } else {
        /* has no token*/
        if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
          next()
        } else {
          next('/login') // 否则全部重定向到登录页
          NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
        }
      }
    })

    router.afterEach(() => {
      NProgress.done() // finish progress bar
    })
```

按需挂载，路由就需要知道用户的路由权限，也就是在用户登录进来的时候就要知道当前用户拥有哪些路由权限

这种方式也存在了以下的缺点：

*   全局路由守卫里，每次路由跳转都要做判断
*   菜单信息写死在前端，要改个显示文字或权限信息，需要重新编译
*   菜单跟路由耦合在一起，定义路由的时候还有添加菜单显示标题，图标之类的信息，而且路由不一定作为菜单显示，还要多加字段进行标识

**菜单权限**

菜单权限可以理解成将页面与理由进行解耦

**方案一**

菜单与路由分离，菜单由后端返回

前端定义路由信息

```js

    {
        name: "login",
        path: "/login",
        component: () => import("@/pages/Login.vue")
    }
```

`name`字段都不为空，需要根据此字段与后端返回菜单做关联，后端返回的菜单信息中必须要有`name`对应的字段，并且做唯一性校验

全局路由守卫里做判断

```js

    function hasPermission(router, accessMenu) {
      if (whiteList.indexOf(router.path) !== -1) {
        return true;
      }
      let menu = Util.getMenuByName(router.name, accessMenu);
      if (menu.name) {
        return true;
      }
      return false;

    }

    Router.beforeEach(async (to, from, next) => {
      if (getToken()) {
        let userInfo = store.state.user.userInfo;
        if (!userInfo.name) {
          try {
            await store.dispatch("GetUserInfo")
            await store.dispatch('updateAccessMenu')
            if (to.path === '/login') {
              next({ name: 'home_index' })
            } else {
              //Util.toDefaultPage([...routers], to.name, router, next);
              next({ ...to, replace: true })//菜单权限更新完成,重新进一次当前路由
            }
          }  
          catch (e) {
            if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
              next()
            } else {
              next('/login')
            }
          }
        } else {
          if (to.path === '/login') {
            next({ name: 'home_index' })
          } else {
            if (hasPermission(to, store.getters.accessMenu)) {
              Util.toDefaultPage(store.getters.accessMenu,to, routes, next);
            } else {
              next({ path: '/403',replace:true })
            }
          }
        }
      } else {
        if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
          next()
        } else {
          next('/login')
        }
      }
      let menu = Util.getMenuByName(to.name, store.getters.accessMenu);
      Util.title(menu.title);
    });

    Router.afterEach((to) => {
      window.scrollTo(0, 0);
    });
```

每次路由跳转的时候都要判断权限，这里的判断也很简单，因为菜单的`name`与路由的`name`是一一对应的，而后端返回的菜单就已经是经过权限过滤的

如果根据路由`name`找不到对应的菜单，就表示用户有没权限访问

如果路由很多，可以在应用初始化的时候，只挂载不需要权限控制的路由。取得后端返回的菜单后，根据菜单与路由的对应关系，筛选出可访问的路由，通过`addRoutes`动态挂载

这种方式的缺点：

*   菜单需要与路由做一一对应，前端添加了新功能，需要通过菜单管理功能添加新的菜单，如果菜单配置的不对会导致应用不能正常使用
*   全局路由守卫里，每次路由跳转都要做判断

**方案二**

菜单和路由都由后端返回

前端统一定义路由组件

```js

    const Home = () => import("../pages/Home.vue");
    const UserInfo = () => import("../pages/UserInfo.vue");
    export default {
        home: Home,
        userInfo: UserInfo
    };
```

后端路由组件返回以下格式

```js

    [
        {
            name: "home",
            path: "/",
            component: "home"
        },
        {
            name: "home",
            path: "/userinfo",
            component: "userInfo"
        }
    ]
```

在将后端返回路由通过`addRoutes`动态挂载之间，需要将数据处理一下，将`component`字段换为真正的组件

如果有嵌套路由，后端功能设计的时候，要注意添加相应的字段，前端拿到数据也要做相应的处理

这种方法也会存在缺点：

*   全局路由守卫里，每次路由跳转都要做判断
*   前后端的配合要求更高

**按钮权限**

**方案一**

按钮权限也可以用`v-if`判断

但是如果页面过多，每个页面页面都要获取用户权限`role`和路由表里的`meta.btnPermissions`，然后再做判断

这种方式就不展开举例了

**方案二**

通过自定义指令进行按钮权限的判断

首先配置路由

```js

    {
        path: '/permission',
        component: Layout,
        name: '权限测试',
        meta: {
            btnPermissions: ['admin', 'supper', 'normal']
        },
        //页面需要的权限
        children: [{
            path: 'supper',
            component: _import('system/supper'),
            name: '权限测试页',
            meta: {
                btnPermissions: ['admin', 'supper']
            } //页面需要的权限
        },
        {
            path: 'normal',
            component: _import('system/normal'),
            name: '权限测试页',
            meta: {
                btnPermissions: ['admin']
            } //页面需要的权限
        }]
    }
```

自定义权限鉴定指令

```js

    import Vue from 'vue'
    /**权限指令**/
    const has = Vue.directive('has', {
        bind: function (el, binding, vnode) {
            // 获取页面按钮权限
            let btnPermissionsArr = [];
            if(binding.value){
                // 如果指令传值，获取指令参数，根据指令参数和当前登录人按钮权限做比较。
                btnPermissionsArr = Array.of(binding.value);
            }else{
                // 否则获取路由中的参数，根据路由的btnPermissionsArr和当前登录人按钮权限做比较。
                btnPermissionsArr = vnode.context.$route.meta.btnPermissions;
            }
            if (!Vue.prototype.$_has(btnPermissionsArr)) {
                el.parentNode.removeChild(el);
            }
        }
    });
    // 权限检查方法
    Vue.prototype.$_has = function (value) {
        let isExist = false;
        // 获取用户按钮权限
        let btnPermissionsStr = sessionStorage.getItem("btnPermissions");
        if (btnPermissionsStr == undefined || btnPermissionsStr == null) {
            return false;
        }
        if (value.indexOf(btnPermissionsStr) > -1) {
            isExist = true;
        }
        return isExist;
    };
    export {has}
```

在使用的按钮中只需要引用`v-has`指令

```js

    <el-button @click='editClick' type="primary" v-has>编辑</el-button>
```

**小结**

关于权限如何选择哪种合适的方案，可以根据自己项目的方案项目，如考虑路由与菜单是否分离

权限需要前后端结合，前端尽可能的去控制，更多的需要后台判断

##  54 Vue项目中你是如何解决跨域的呢

###  跨域是什么

跨域本质是浏览器基于**同源策略**的一种安全手段

同源策略（Sameoriginpolicy），是一种约定，它是浏览器最核心也最基本的安全功能

所谓同源（即指在同一个域）具有以下三个相同点

*   协议相同（protocol）
*   主机相同（host）
*   端口相同（port）

反之非同源请求，也就是协议、端口、主机其中一项不相同的时候，这时候就会产生跨域

> 一定要注意跨域是浏览器的限制，你用抓包工具抓取接口数据，是可以看到接口已经把数据返回回来了，只是浏览器的限制，你获取不到数据。用postman请求接口能够请求到数据。这些再次印证了跨域是浏览器的限制。

###  如何解决

解决跨域的方法有很多，下面列举了三种：

*   JSONP
*   CORS
*   Proxy

而在`vue`项目中，我们主要针对`CORS`或`Proxy`这两种方案进行展开

**CORS**

CORS （Cross-Origin Resource Sharing，跨域资源共享）是一个系统，它由一系列传输的HTTP头组成，这些HTTP头决定浏览器是否阻止前端 JavaScript 代码获取跨域请求的响应

`CORS` 实现起来非常方便，只需要增加一些 `HTTP` 头，让服务器能声明允许的访问来源

只要后端实现了 `CORS`，就实现了跨域

!![](https://s.poetries.work/uploads/2022/09/ef93fd7632d18368.png)

以`koa`框架举例

添加中间件，直接设置`Access-Control-Allow-Origin`响应头

```js

    app.use(async (ctx, next)=> {
      ctx.set('Access-Control-Allow-Origin', '*');
      ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
      ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
      if (ctx.method == 'OPTIONS') {
        ctx.body = 200; 
      } else {
        await next();
      }
    })
```

ps: `Access-Control-Allow-Origin` 设置为*其实意义不大，可以说是形同虚设，实际应用中，上线前我们会将`Access-Control-Allow-Origin` 值设为我们目标`host`

**Proxy**

代理（Proxy）也称网络代理，是一种特殊的网络服务，允许一个（一般为客户端）通过这个服务与另一个网络终端（一般为服务器）进行非直接的连接。一些网关、路由器等网络设备具备网络代理功能。一般认为代理服务有利于保障网络终端的隐私或安全，防止攻击

**方案一**

如果是通过`vue-cli`脚手架工具搭建项目，我们可以通过`webpack`为我们起一个本地服务器作为请求的代理对象

通过该服务器转发请求至目标服务器，得到结果再转发给前端，但是最终发布上线时如果web应用和接口服务器不在一起仍会跨域

在`vue.config.js`文件，新增以下代码

```js

    amodule.exports = {
        devServer: {
            host: '127.0.0.1',
            port: 8084,
            open: true,// vue项目启动时自动打开浏览器
            proxy: {
                '/api': { // '/api'是代理标识，用于告诉node，url前面是/api的就是使用代理的
                    target: "http://xxx.xxx.xx.xx:8080", //目标地址，一般是指后台服务器地址
                    changeOrigin: true, //是否跨域
                    pathRewrite: { // pathRewrite 的作用是把实际Request Url中的'/api'用""代替
                        '^/api': "" 
                    }
                }
            }
        }
    }
```

通过`axios`发送请求中，配置请求的根路径

```js

    axios.defaults.baseURL = '/api'
```

**方案二**

此外，还可通过服务端实现代理请求转发

以`express`框架为例

```js

    var express = require('express');
    const proxy = require('http-proxy-middleware')
    const app = express()
    app.use(express.static(__dirname + '/'))
    app.use('/api', proxy({ target: 'http://localhost:4000', changeOrigin: false
                          }));
    module.exports = app
```

**方案三**

通过配置`nginx`实现代理

```js

    server {
        listen    80;
        # server_name www.josephxia.com;
        location / {
            root  /var/www/html;
            index  index.html index.htm;
            try_files $uri $uri/ /index.html;
        }
        location /api {
            proxy_pass  http://127.0.0.1:3000;
            proxy_redirect   off;
            proxy_set_header  Host       $host;
            proxy_set_header  X-Real-IP     $remote_addr;
            proxy_set_header  X-Forwarded-For  $proxy_add_x_forwarded_for;
        }
    }
```

##  55 Vue项目本地开发完成后部署到服务器后报404是什么原因呢

###  如何部署

前后端分离开发模式下，前后端是独立布署的，前端只需要将最后的构建物上传至目标服务器的`web`容器指定的静态目录下即可

我们知道`vue`项目在构建后，是生成一系列的静态文件

常规布署我们只需要将这个目录上传至目标服务器即可

```bash

    # scp 上传 user为主机登录用户，host为主机外网ip, xx为web容器静态资源路径
    scp dist.zip user@host:/xx/xx/xx
```

让`web`容器跑起来，以`nginx`为例

```js

    server {
      listen  80;
      server_name  www.xxx.com;

      location / {
        index  /data/dist/index.html;
      }
    }
```

配置完成记得重启`nginx`

```js

    // 检查配置是否正确
    nginx -t 

    // 平滑重启
    nginx -s reload
```

操作完后就可以在浏览器输入域名进行访问了

当然上面只是提到最简单也是最直接的一种布署方式

什么自动化，镜像，容器，流水线布署，本质也是将这套逻辑抽象，隔离，用程序来代替重复性的劳动，本文不展开

###  404问题

这是一个经典的问题，相信很多同学都有遇到过，那么你知道其真正的原因吗？

我们先还原一下场景：

*   `vue`项目在本地时运行正常，但部署到服务器中，刷新页面，出现了404错误

先定位一下，HTTP 404 错误意味着链接指向的资源不存在

问题在于为什么不存在？且为什么只有`history`模式下会出现这个问题？

**为什么history模式下有问题**

`Vue`是属于单页应用（single-page application）

而`SPA`是一种网络应用程序或网站的模型，所有用户交互是通过动态重写当前页面，前面我们也看到了，不管我们应用有多少页面，构建物都只会产出一个`index.html`

现在，我们回头来看一下我们的`nginx`配置

```js

    server {
      listen  80;
      server_name  www.xxx.com;

      location / {
        index  /data/dist/index.html;
      }
    }
```

可以根据 `nginx` 配置得出，当我们在地址栏输入 `www.xxx.com` 时，这时会打开我们 `dist` 目录下的 `index.html` 文件，然后我们在跳转路由进入到 `www.xxx.com/login`

关键在这里，当我们在 `website.com/login` 页执行刷新操作，`nginx location` 是没有相关配置的，所以就会出现 `404` 的情况

**为什么hash模式下没有问题**

`router hash` 模式我们都知道是用符号#表示的，如 `website.com/#/login`, `hash` 的值为 `#/login`

它的特点在于：`hash` 虽然出现在 `URL` 中，但不会被包括在 `HTTP` 请求中，对服务端完全没有影响，因此改变 `hash` 不会重新加载页面

`hash` 模式下，仅 `hash` 符号之前的内容会被包含在请求中，如 `website.com/#/login` 只有 `website.com` 会被包含在请求中 ，因此对于服务端来说，即使没有配置`location`，也不会返回`404`错误

###  解决方案

看到这里我相信大部分同学都能想到怎么解决问题了，

产生问题的本质是因为我们的路由是通过JS来执行视图切换的，

当我们进入到子路由时刷新页面，`web`容器没有相对应的页面此时会出现`404`

所以我们只需要配置将任意页面都重定向到 `index.html`，把路由交由前端处理

对`nginx`配置文件`.conf`修改，添加`try_files $uri $uri/ /index.html;`

```js

    server {
      listen  80;
      server_name  www.xxx.com;

      location / {
        index  /data/dist/index.html;
        try_files $uri $uri/ /index.html;
      }
    }
```

修改完配置文件后记得配置的更新

```js

    nginx -s reload
```

这么做以后，你的服务器就不再返回 404 错误页面，因为对于所有路径都会返回 `index.html` 文件

为了避免这种情况，你应该在 `Vue` 应用里面覆盖所有的路由情况，然后在给出一个 404 页面

```js

    const router = new VueRouter({
      mode: 'history',
      routes: [
        { path: '*', component: NotFoundComponent }
      ]
    })
```

##  56 实际工作中，你总结的vue最佳实践有哪些

从编码风格、性能、安全等方面说几条：

**编码风格方面：**

*   命名组件时使用“多词”风格避免和`HTML`元素冲突
*   使用“细节化”方式定义属性而不是只有一个属性名
*   属性名声明时使用“驼峰命名”，模板或`jsx`中使用“肉串命名”
*   使用`v-for`时务必加上`key`，且不要跟`v-if`写在一起

**性能方面：**

*   路由懒加载减少应用尺寸
*   利用`SSR`减少首屏加载时间
*   利用`v-once`渲染那些不需要更新的内容
*   一些长列表可以利用虚拟滚动技术避免内存过度占用
*   对于深层嵌套对象的大数组可以使用`shallowRef`或`shallowReactive`降低开销
*   避免不必要的组件抽象

**安全：**

*   不使用不可信模板，例如使用用户输入拼接模板：`template: <div> + userProvidedString + </div>`
*   避免使用`v-html`，`:url`，`:style`等，避免`html`、`url`、样式等注入

##  57 vue 中使用了哪些设计模式

*   **工厂模式** 传入参数即可创建实例：虚拟 `DOM` 根据参数的不同返回基础标签的 `Vnode` 和组件 `Vnode`
*   **单例模式** 整个程序有且仅有一个实例：`vuex` 和 `vue-router` 的插件注册方法 `install` 判断如果系统存在实例就直接返回掉
*   **发布-订阅模式 (vue 事件机制)**
*   **观察者模式 (响应式数据原理)**
*   **装饰模式: (@装饰器的用法)**
*   **策略模式** 策略模式指对象有某个行为,但是在不同的场景中,该行为有不同的实现方案-比如选项的合并策略

##  58 如果让你从零开始写一个vuex，说说你的思路

**思路分析**

这个题目很有难度，首先思考`vuex`解决的问题：存储用户全局状态并提供管理状态API。

*   `vuex`需求分析
*   如何实现这些需求

**回答范例**

1.  官方说`vuex`是一个状态管理模式和库，并确保这些状态以可预期的方式变更。可见要实现一个`vuex`

*   要实现一个`Store`存储全局状态
*   要提供修改状态所需API：`commit(type, payload), dispatch(type, payload)`

1.  实现`Store`时，可以定义`Store`类，构造函数接收选项`options`，设置属性`state`对外暴露状态，提供`commit`和`dispatch`修改属性`state`。这里需要设置`state`为响应式对象，同时将`Store`定义为一个`Vue`插件
2.  `commit(type, payload)`方法中可以获取用户传入`mutations`并执行它，这样可以按用户提供的方法修改状态。 `dispatch(type, payload)`类似，但需要注意它可能是异步的，需要返回一个`Promise`给用户以处理异步结果

**实践**

`Store`的实现：

```js

    class Store {
        constructor(options) {
            this.state = reactive(options.state)
            this.options = options
        }
        commit(type, payload) {
            this.options.mutations[type].call(this, this.state, payload)
        }
    }
```

**vuex简易版**

```js

    /**
     * 1 实现插件，挂载$store
     * 2 实现store
     */

    let Vue;

    class Store {
      constructor(options) {
        // state响应式处理
        // 外部访问： this.$store.state.***
        // 第一种写法
        // this.state = new Vue({
        //   data: options.state
        // })

        // 第二种写法：防止外界直接接触内部vue实例，防止外部强行变更
        this._vm = new Vue({
          data: {
            $state: options.state
          }
        })

        this._mutations = options.mutations
        this._actions = options.actions
        this.getters = {}
        options.getters && this.handleGetters(options.getters)

        this.commit = this.commit.bind(this)
        this.dispatch = this.dispatch.bind(this)
      }

      get state () {
        return this._vm._data.$state
      }

      set state (val) {
        return new Error('Please use replaceState to reset state')
      }

      handleGetters (getters) {
        Object.keys(getters).map(key => {
          Object.defineProperty(this.getters, key, {
            get: () => getters[key](this.state)
          })
        })
      }

      commit (type, payload) {
        let entry = this._mutations[type]
        if (!entry) {
          return new Error(`${type} is not defined`)
        }

        entry(this.state, payload)
      }

      dispatch (type, payload) {
        let entry = this._actions[type]
        if (!entry) {
          return new Error(`${type} is not defined`)
        }

        entry(this, payload)
      }
    }

    const install = (_Vue) => {
      Vue = _Vue

      Vue.mixin({
        beforeCreate () {
          if (this.$options.store) {
            Vue.prototype.$store = this.$options.store
          }
        },
      })
    }

    export default { Store, install }
```

验证方式

```js

    import Vue from 'vue'
    import Vuex from './vuex'
    // this.$store
    Vue.use(Vuex)

    export default new Vuex.Store({
      state: {
        counter: 0
      },
      mutations: {
        // state从哪里来的
        add (state) {
          state.counter++
        }
      },
      getters: {
        doubleCounter (state) {
          return state.counter * 2
        }
      },
      actions: {
        add ({ commit }) {
          setTimeout(() => {
            commit('add')
          }, 1000)
        }
      },
      modules: {
      }
    })
```

##  59 使用vue渲染大量数据时应该怎么优化？说下你的思路！

**分析**

企业级项目中渲染大量数据的情况比较常见，因此这是一道非常好的综合实践题目。

**回答**

1.  在大型企业级项目中经常需要渲染大量数据，此时很容易出现卡顿的情况。比如大数据量的表格、树
2.  处理时要根据情况做不同处理：

*   可以采取分页的方式获取，避免渲染大量数据
*   [vue-virtual-scroller<span><span class="sr-only">(opens new window)</span></span>](https://github.com/Akryum/vue-virtual-scroller)等虚拟滚动方案，只渲染视口范围内的数据
*   如果不需要更新，可以使用v-once方式只渲染一次
*   通过[v-memo<span><span class="sr-only">(opens new window)</span></span>](https://vuejs.org/api/built-in-directives.html#v-memo)可以缓存结果，结合`v-for`使用，避免数据变化时不必要的`VNode`创建
*   可以采用懒加载方式，在用户需要的时候再加载数据，比如`tree`组件子树的懒加载

1.  还是要看具体需求，首先从设计上避免大数据获取和渲染；实在需要这样做可以采用虚表的方式优化渲染；最后优化更新，如果不需要更新可以`v-once`处理，需要更新可以`v-memo`进一步优化大数据更新性能。其他可以采用的是交互方式优化，无线滚动、懒加载等方案

##  60 动态给vue的data添加一个新的属性时会发生什么？怎样解决？

Vue 不允许在已经创建的实例上动态添加新的响应式属性

若想实现数据与视图同步更新，可采取下面三种解决方案：

*   `Vue.set()`
*   `Object.assign()`
*   `$forcecUpdated()`

### 

```js

    Vue.set( target, propertyName/index, value )
```

参数

*   `{Object | Array} target`
*   `{string | number} propertyName/index`
*   `{any} value`

返回值：设置的值

通过`Vue.set`向响应式对象中添加一个`property`，并确保这个新 `property`同样是响应式的，且触发视图更新

关于`Vue.set`源码（省略了很多与本节不相关的代码）

源码位置：`src\core\observer\index.js`

```js

    function set (target: Array<any> | Object, key: any, val: any): any {
      ...
      defineReactive(ob.value, key, val)
      ob.dep.notify()
      return val
    }
```

这里无非再次调用`defineReactive`方法，实现新增属性的响应式

关于`defineReactive`方法，内部还是通过`Object.defineProperty`实现属性拦截

大致代码如下：

```js

    function defineReactive(obj, key, val) {
        Object.defineProperty(obj, key, {
            get() {
                console.log(`get ${key}:${val}`);
                return val
            },
            set(newVal) {
                if (newVal !== val) {
                    console.log(`set ${key}:${newVal}`);
                    val = newVal
                }
            }
        })
    }
```

### 

直接使用`Object.assign()`添加到对象的新属性不会触发更新

应创建一个新的对象，合并原对象和混入对象的属性

```js

    this.someObject = Object.assign({},this.someObject,{newProperty1:1,newProperty2:2 ...})
```

###  $forceUpdate

如果你发现你自己需要在 `Vue`中做一次强制更新，99.9% 的情况，是你在某个地方做错了事

`$forceUpdate`迫使`Vue` 实例重新渲染

PS：仅仅影响实例本身和插入插槽内容的子组件，而不是所有子组件。

###  小结

*   如果为对象添加少量的新属性，可以直接采用`Vue.set()`
*   如果需要为新对象添加大量的新属性，则通过`Object.assign()`创建新对象
*   如果你实在不知道怎么操作时，可采取`$forceUpdate()`进行强制刷新 (不建议)

PS：`vue3`是用过`proxy`实现数据响应式的，直接动态添加新属性仍可以实现数据响应式

##  61 你是怎么处理vue项目中的错误的？

**分析**

*   这是一个综合应用题目，在项目中我们常常需要将App的异常上报，此时错误处理就很重要了。
*   这里要区分错误的类型，针对性做收集。
*   然后是将收集的的错误信息上报服务器。

**思路**

*   首先区分错误类型
*   根据错误不同类型做相应收集
*   收集的错误是如何上报服务器的

**回答范例**

1.  应用中的错误类型分为"`接口异常`"和“`代码逻辑异常`”
2.  我们需要根据不同错误类型做相应处理：接口异常是我们请求后端接口过程中发生的异常，可能是请求失败，也可能是请求获得了服务器响应，但是返回的是错误状态。以`Axios`为例，这类异常我们可以通过封装`Axios`，在拦截器中统一处理整个应用中请求的错误。`代码逻辑异常`是我们编写的前端代码中存在逻辑上的错误造成的异常，`vue`应用中最常见的方式是使用全局错误处理函数`app.config.errorHandler`收集错误
3.  收集到错误之后，需要统一处理这些异常：分析错误，获取需要错误信息和数据。这里应该有效区分错误类型，如果是请求错误，需要上报接口信息，参数，状态码等；对于前端逻辑异常，获取错误名称和详情即可。另外还可以收集应用名称、环境、版本、用户信息，所在页面等。这些信息可以通过`vuex`存储的全局状态和路由信息获取

**实践**

`axios`拦截器中处理捕获异常：

```js

    // 响应拦截器
    instance.interceptors.response.use(
      (response) => {
        return response.data;
      },
      (error) => {
        // 存在response说明服务器有响应
        if (error.response) {
          let response = error.response;
          if (response.status >= 400) {
            handleError(response);
          }
        } else {
          handleError(null);
        }
        return Promise.reject(error);
      },
    );
```

`vue`中全局捕获异常：

```js

    import { createApp } from 'vue'
    ​
    const app = createApp(...)
    ​
    app.config.errorHandler = (err, instance, info) => {
      // report error to tracking services
    }
```

处理接口请求错误：

```js

    function handleError(error, type) {
      if(type == 1) {
        // 接口错误，从config字段中获取请求信息
        let { url, method, params, data } = error.config
        let err_data = {
           url, method,
           params: { query: params, body: data },
           error: error.data?.message || JSON.stringify(error.data),
        })
      }
    }
```

处理前端逻辑错误：

```js

    function handleError(error, type) {
      if(type == 2) {
        let errData = null
        // 逻辑错误
        if(error instanceof Error) {
          let { name, message } = error
          errData = {
            type: name,
            error: message
          }
        } else {
          errData = {
            type: 'other',
            error: JSON.strigify(error)
          }
        }
      }
    }
```

##  62 SPA首屏加载速度慢的怎么解决

###  什么是首屏加载

首屏时间（`First Contentful Paint`），指的是浏览器从响应用户输入网址地址，到首屏内容渲染完成的时间，此时整个网页不一定要全部渲染完成，但需要展示当前视窗需要的内容

首屏加载可以说是用户体验中**最重要**的环节

**关于计算首屏时间**

利用`performance.timing`提供的数据：

![](https://s.poetries.work/uploads/2022/09/83f77ec966a30dd5.png)

通过`DOMContentLoad`或者`performance`来计算出首屏时间

```js

    // 方案一：
    document.addEventListener('DOMContentLoaded', (event) => {
        console.log('first contentful painting');
    });
    // 方案二：
    performance.getEntriesByName("first-contentful-paint")[0].startTime

    // performance.getEntriesByName("first-contentful-paint")[0]
    // 会返回一个 PerformancePaintTiming的实例，结构如下：
    {
      name: "first-contentful-paint",
      entryType: "paint",
      startTime: 507.80000002123415,
      duration: 0,
    };
```

###  加载慢的原因

在页面渲染的过程，导致加载速度慢的因素可能如下：

*   网络延时问题
*   资源文件体积是否过大
*   资源是否重复发送请求去加载了
*   加载脚本的时候，渲染内容堵塞了

###  解决方案

常见的几种SPA首屏优化方式

*   减小入口文件积
*   静态资源本地缓存
*   UI框架按需加载
*   图片资源的压缩
*   组件重复打包
*   开启GZip压缩
*   使用SSR

**1\. 减小入口文件体积**

常用的手段是路由懒加载，把不同路由对应的组件分割成不同的代码块，待路由被请求的时候会单独打包路由，使得入口文件变小，加载速度大大增加

![](https://s.poetries.work/uploads/2022/09/6140579886e4eada.png)

在`vue-router`配置路由的时候，采用动态加载路由的形式

```js

    routes:[ 
        path: 'Blogs',
        name: 'ShowBlogs',
        component: () => import('./components/ShowBlogs.vue')
    ]
```

以函数的形式加载路由，这样就可以把各自的路由文件分别打包，只有在解析给定的路由时，才会加载路由组件

**2\. 静态资源本地缓存**

后端返回资源问题：

*   采用`HTTP`缓存，设置`Cache-Control`，`Last-Modified`，`Etag`等响应头
*   采用`Service Worker`离线缓存

前端合理利用`localStorage`

**3\. UI框架按需加载**

在日常使用`UI`框架，例如`element-UI`、或者`antd`，我们经常性直接引用整个`UI`库

```js

    import ElementUI from 'element-ui'
    Vue.use(ElementUI)
```

但实际上我用到的组件只有按钮，分页，表格，输入与警告 所以我们要按需引用

```js

    import { Button, Input, Pagination, Table, TableColumn, MessageBox } from 'element-ui';
    Vue.use(Button)
    Vue.use(Input)
    Vue.use(Pagination)
```

**4\. 组件重复打包**

假设`A.js`文件是一个常用的库，现在有多个路由使用了`A.js`文件，这就造成了重复下载

解决方案：在`webpack`的`config`文件中，修改`CommonsChunkPlugin`的配置

```js

    minChunks: 3
```

`minChunks`为3表示会把使用3次及以上的包抽离出来，放进公共依赖文件，避免了重复加载组件

**5\. 图片资源的压缩**

图片资源虽然不在编码过程中，但它却是对页面性能影响最大的因素

对于所有的图片资源，我们可以进行适当的压缩

对页面上使用到的`icon`，可以使用在线字体图标，或者雪碧图，将众多小图标合并到同一张图上，用以减轻`http`请求压力。

**6\. 开启GZip压缩**

拆完包之后，我们再用`gzip`做一下压缩 安装`compression-webpack-plugin`

```js

    cnmp i compression-webpack-plugin -D
```

在`vue.congig.js`中引入并修改`webpack`配置

```js

    const CompressionPlugin = require('compression-webpack-plugin')

    configureWebpack: (config) => {
            if (process.env.NODE_ENV === 'production') {
                // 为生产环境修改配置...
                config.mode = 'production'
                return {
                    plugins: [new CompressionPlugin({
                        test: /\.js$|\.html$|\.css/, //匹配文件名
                        threshold: 10240, //对超过10k的数据进行压缩
                        deleteOriginalAssets: false //是否删除原文件
                    })]
                }
            }
```

在服务器我们也要做相应的配置 如果发送请求的浏览器支持`gzip`，就发送给它`gzip`格式的文件 我的服务器是用`express`框架搭建的 只要安装一下`compression`就能使用

```js

    const compression = require('compression')
    app.use(compression())  // 在其他中间件使用之前调用
```

**7\. 使用SSR**

SSR（Server side ），也就是服务端渲染，组件或页面通过服务器生成html字符串，再发送到浏览器

从头搭建一个服务端渲染是很复杂的，`vue`应用建议使用`Nuxt.js`实现服务端渲染

###  小结

减少首屏渲染时间的方法有很多，总的来讲可以分成两大部分 ：`资源加载优化` 和 `页面渲染优化`

下图是更为全面的首屏优化的方案

![](https://s.poetries.work/uploads/2022/09/ac5076060ba416f5.png)

大家可以根据自己项目的情况选择各种方式进行首屏渲染的优化

##  63 Vue中常见性能优化

**Vue性能优化方式**

*   合理使用`v-show`和`v-if`
*   合理使用`computed`
*   `v-for`时添加`key`，以及避免和`v-if`同时使用
*   自定义事件、`DOM`事件及时销毁
*   合理使用异步组件，加载大组件
*   合理使用`keep-alive`避免频繁重复渲染
*   `data`层级不要太深，避免递归性能不好
*   使用`vue-loader`在开发环境做模板编译(预编译)
*   `webpack`层级优化
*   前端通用性能优化，如图片懒加载
*   使用`SSR`

**编码优化**：

1.  **使用`v-show`复用`DOM`**：避免重复创建组件

```html

    <template>
      <div class="cell">
        <!-- 这种情况用v-show复用DOM，比v-if效果好 -->
        <div v-show="value" class="on">
          <Heavy :n="10000"/>
        </div>
        <section v-show="!value" class="off">
          <Heavy :n="10000"/>
        </section>
      </div>
    </template>
```

1.  **合理使用路由懒加载、异步组件**，有效拆分`App`尺寸，访问时才异步加载

```js

    const router = createRouter({
      routes: [
        // 借助webpack的import()实现异步组件
        { path: '/foo', component: () => import('./Foo.vue') }
      ]
    })
```

1.  **`keep-alive`缓存页面**：避免重复创建组件实例，且能保留缓存组件状态

```html

    <router-view v-slot="{ Component }">
        <keep-alive>
        <component :is="Component"></component>
      </keep-alive>
    </router-view>
```

1.  **`v-once`和`v-memo`：不再变化的数据使用`v-once`**

```html

    <!-- single element -->
    <span v-once>This will never change: {{msg}}</span>
    <!-- the element have children -->
    <div v-once>
      <h1>comment</h1>
      <p>{{msg}}</p>
    </div>
    <!-- component -->
    <my-component v-once :comment="msg"></my-component>
    <!-- `v-for` directive -->
    <ul>
      <li v-for="i in list" v-once>{{i}}</li>
    </ul>
```

按条件跳过更新时使用`v-momo`：下面这个列表只会更新选中状态变化项

```html

    <div v-for="item in list" :key="item.id" v-memo="[item.id === selected]">
      <p>ID: {{ item.id }} - selected: {{ item.id === selected }}</p>
      <p>...more child nodes</p>
    </div>
```

1.  **长列表性能优化**：如果是大数据长列表，可采用虚拟滚动，只渲染少部分区域的内容

```html

    <recycle-scroller
      class="items"
      :items="items"
      :item-size="24"
    >
      <template v-slot="{ item }">
        <FetchItemView
          :item="item"
          @vote="voteItem(item)"
        />
      </template>
    </recycle-scroller>
```

1.  防止内部泄漏，**组件销毁后把全局变量和事件销毁**：`Vue` 组件销毁时，会自动解绑它的全部指令及事件监听器，但是仅限于组件本身的事件

```js

    export default {
      created() {
        this.timer = setInterval(this.refresh, 2000)
      },
      beforeUnmount() {
        clearInterval(this.timer)
      }
    }
```

1.  **图片懒加载**

对于图片过多的页面，为了加速页面加载速度，所以很多时候我们需要将页面内未出现在可视区域内的图片先不做加载，等到滚动到可视区域后再去加载

```html

    <!-- 参考 https://github.com/hilongjw/vue-lazyload -->
    <img v-lazy="/static/img/1.png">
```

1.  **滚动到可视区域动态加载**

[https://tangbc.github.io/vue-virtual-scroll-list<span><span class="sr-only">(opens new window)</span></span>](https://tangbc.github.io/vue-virtual-scroll-list)

1.  **第三方插件按需引入：（`babel-plugin-component`）**

像`element-plus`这样的第三方组件库可以按需引入避免体积太大

```js

    import { createApp } from 'vue';
    import { Button, Select } from 'element-plus';
    ​
    const app = createApp()
    app.use(Button)
    app.use(Select)
```

1.  **服务端渲染：`SSR`**

如果`SPA`应用有首屏渲染慢的问题，可以考虑`SSR`

**以及下面的其他方法**

*   不要将所有的数据都放在`data`中，`data`中的数据都会增加`getter`和`setter`，会收集对应的`watcher`
*   `v-for` 遍历为 `item` 添加 `key`
*   `v-for` 遍历避免同时使用 `v-if`
*   区分 `computed` 和 `watch` 的使用
*   拆分组件(提高复用性、增加代码的可维护性,减少不必要的渲染 )
*   防抖、节流

**用户体验**

*   `app-skeleton` 骨架屏
*   `pwa` `serviceworker`

**SEO优化**

*   预渲染插件 `prerender-spa-plugin`
*   服务端渲染 `ssr`

**打包优化**

*   `Webpack` 对图片进行压缩
*   使用 `cdn` 的方式加载第三方模块
*   多线程打包 `happypack`
*   `splitChunks` 抽离公共文件
*   优化 `SourceMap`
*   构建结果输出分析，利用 `webpack-bundle-analyzer` 可视化分析工具

**基础的 Web 技术的优化**

*   服务端 `gzip` 压缩
*   浏览器缓存
*   `CDN` 的使用
*   使用 `Chrome Performance` 查找性能瓶颈

##  64 Vue项目性能优化-详细

> `Vue` 框架通过数据双向绑定和虚拟 `DOM` 技术，帮我们处理了前端开发中最脏最累的 `DOM` 操作部分， 我们不再需要去考虑如何操作 `DOM` 以及如何最高效地操作 `DOM`；但 `Vue` 项目中仍然存在项目首屏优化、`Webpack` 编译配置优化等问题，所以我们仍然需要去关注 `Vue` 项目性能方面的优化，使项目具有更高效的性能、更好的用户体验

###  代码层面的优化

**1\. v-if 和 v-show 区分使用场景**

*   `v-if` 是 真正 的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建；也是惰性的：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块
*   `v-show` 就简单得多， 不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 `CSS` `display`的`none/block`属性进行切换。
*   所以，`v-if` 适用于在运行时很少改变条件，不需要频繁切换条件的场景；`v-show` 则适用于需要非常频繁切换条件的场景

**2\. computed 和 watch 区分使用场景**

*   `computed`： 是计算属性，依赖其它属性值，并且 `computed` 的值有缓存，只有它依赖的属性值发生改变，下一次获取 `computed` 的值时才会重新计算 computed 的值；
*   `watch`： 更多的是「观察」的作用，类似于某些数据的监听回调 ，每当监听的数据变化时都会执行回调进行后续操作

**运用场景：**

*   当我们需要进行数值计算，并且依赖于其它数据时，应该使用 `computed`，因为可以利用 `computed` 的缓存特性，避免每次获取值时，都要重新计算；
*   当我们需要在数据变化时执行异步或开销较大的操作时，应该使用 `watch`，使用 `watch` 选项允许我们执行异步操作 ( 访问一个 `API` )，限制我们执行该操作的频率，并在我们得到最终结果前，设置中间状态。这些都是计算属性无法做到的

**3\. v-for 遍历必须为 item 添加 key，且避免同时使用 v-if**

*   `v-for` 遍历必须为 `item` 添加 `key`
    *   在列表数据进行遍历渲染时，需要为每一项 `item` 设置唯一 `key` 值，方便 `Vue.js` 内部机制精准找到该条列表数据。当 `state` 更新时，新的状态值和旧的状态值对比，较快地定位到 `diff`
*   `v-for` 遍历避免同时使用 `v-if`
    *   `vue2.x`中`v-for` 比 `v-if` 优先级高，如果每一次都需要遍历整个数组，将会影响速度，尤其是当之需要渲染很小一部分的时候，必要情况下应该替换成 `computed` 属性

推荐：

```js

    <ul>
      <li
        v-for="user in activeUsers"
        :key="user.id">
        {{ user.name }}
      </li>
    </ul>
    computed: {
      activeUsers: function () {
        return this.users.filter(function (user) {
    	 return user.isActive
        })
      }
    }
```

不推荐：

```html

    <ul>
      <li
        v-for="user in users"
        v-if="user.isActive"
        :key="user.id">
        {{ user.name }}
      </li>
    </ul>
```

**4\. 长列表性能优化**

> `Vue` 会通过 `Object.defineProperty` 对数据进行劫持，来实现视图响应数据的变化，然而有些时候我们的组件就是纯粹的数据展示，不会有任何改变，我们就不需要 Vue 来劫持我们的数据，在大量数据展示的情况下，这能够很明显的减少组件初始化的时间，那如何禁止 `Vue` 劫持我们的数据呢？可以通过 `Object.freeze` 方法来冻结一个对象，一旦被冻结的对象就再也不能被修改了

```js

    export default {
      data: () => ({
        users: {}
      }),
      async created() {
        const users = await axios.get("/api/users");
        this.users = Object.freeze(users);
      }
    };
```

**5\. 事件的销毁**

`Vue` 组件销毁时，会自动清理它与其它实例的连接，解绑它的全部指令及事件监听器，但是仅限于组件本身的事件。 如果在 `js` 内使用 `addEventListener` 等方式是不会自动销毁的，我们需要在组件销毁时手动移除这些事件的监听，以免造成内存泄露，如：

```js

    created() {
      addEventListener('click', this.click, false)
    },
    beforeDestroy() {
      removeEventListener('click', this.click, false)
    }
```

**6\. 图片资源懒加载**

对于图片过多的页面，为了加速页面加载速度，所以很多时候我们需要将页面内未出现在可视区域内的图片先不做加载， 等到滚动到可视区域后再去加载。这样对于页面加载性能上会有很大的提升，也提高了用户体验。我们在项目中使用 `Vue` 的 `vue-lazyload` 插件

```js

    npm install vue-lazyload --save-dev
```

在入口文件 `man.js` 中引入并使用

```js

    import VueLazyload from 'vue-lazyload'

    Vue.use(VueLazyload)

    // 或者添加自定义选项
    Vue.use(VueLazyload, {
      preLoad: 1.3,
      error: 'dist/error.png',
      loading: 'dist/loading.gif',
      attempt: 1
    })
```

在 `vue` 文件中将 `img` 标签的 `src` 属性直接改为 `v-lazy` ，从而将图片显示方式更改为懒加载显示

```html

    <img v-lazy="/static/img/1.png">
```

以上为 `vue-lazyload` 插件的简单使用，如果要看插件的更多参数选项，可以查看 [vue-lazyload 的 github 地址<span><span class="sr-only">(opens new window)</span></span>](https://github.com/hilongjw/vue-lazyload)

**7\. 路由懒加载**

Vue 是单页面应用，可能会有很多的路由引入 ，这样使用 `webpcak` 打包后的文件很大，当进入首页时，加载的资源过多，页面会出现白屏的情况，不利于用户体验。如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应的组件，这样就更加高效了。这样会大大提高首屏显示的速度，但是可能其他的页面的速度就会降下来

路由懒加载：

```js

    const Foo = () => import('./Foo.vue')
    const router = new VueRouter({
      routes: [
        { path: '/foo', component: Foo }
      ]
    })
```

**8\. 第三方插件的按需引入**

我们在项目中经常会需要引入第三方插件，如果我们直接引入整个插件，会导致项目的体积太大，我们可以借助 `babel-plugin-component` ，然后可以只引入需要的组件，以达到减小项目体积的目的。以下为项目中引入 `element-ui` 组件库为例

```js

    npm install babel-plugin-component -D
```

将 `.babelrc` 修改为：

```json

    {
      "presets": [["es2015", { "modules": false }]],
      "plugins": [
        [
          "component",
          {
            "libraryName": "element-ui",
            "styleLibraryName": "theme-chalk"
          }
        ]
      ]
    }
```

在 `main.js` 中引入部分组件：

```js

    import Vue from 'vue';
    import { Button, Select } from 'element-ui';

    Vue.use(Button)
    Vue.use(Select)
```

**9\. 优化无限列表性能**

如果你的应用存在非常长或者无限滚动的列表，那么需要采用`虚拟列表`的技术来优化性能，只需要渲染少部分区域的内容，减少重新渲染组件和创建 `dom` 节点的时间。 你可以参考以下开源项目 [vue-virtual-scroll-list<span><span class="sr-only">(opens new window)</span></span>](https://github.com/tangbc/vue-virtual-scroll-list) 和 [vue-virtual-scroller<span><span class="sr-only">(opens new window)</span></span>](https://github.com/Akryum/vue-virtual-scroller) 来优化这种无限列表的场景的

**10\. 服务端渲染 SSR or 预渲染**

服务端渲染是指 `Vue` 在客户端将标签渲染成的整个 `html` 片段的工作在服务端完成，服务端形成的 `html` 片段直接返回给客户端这个过程就叫做服务端渲染。

*   如果你的项目的 `SEO` 和 `首屏渲染`是评价项目的关键指标，那么你的项目就需要服务端渲染来帮助你实现最佳的初始加载性能和 `SEO`
*   如果你的 `Vue` 项目只需改善少数营销页面（例如  `/`， `/about`， `/contact` 等）的 `SEO`，那么你可能需要预渲染，在构建时简单地生成针对特定路由的静态 `HTML` 文件。**优点是设置预渲染更简单**，并可以将你的前端作为一个完全静态的站点，具体你可以使用 [prerender-spa-plugin<span><span class="sr-only">(opens new window)</span></span>](https://github.com/chrisvfritz/prerender-spa-plugin) 就可以轻松地添加预渲染

###  Webpack 层面的优化

**1\. Webpack 对图片进行压缩**

对小于 `limit` 的图片转化为 `base64` 格式，其余的不做操作。所以对有些较大的图片资源，在请求资源的时候，加载会很慢，我们可以用 `image-webpack-loader`来压缩图片

```js

    npm install image-webpack-loader --save-dev
```

```json

    {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      use:[
        {
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
          }
        },
        {
          loader: 'image-webpack-loader',
          options: {
            bypassOnDebug: true,
          }
        }
      ]
    }
```

**2\. 减少 ES6 转为 ES5 的冗余代码**

Babel 插件会在将 ES6 代码转换成 ES5 代码时会注入一些辅助函数，例如下面的 ES6 代码

```js

    class HelloWebpack extends Component{...}
```

这段代码再被转换成能正常运行的 ES5 代码时需要以下两个辅助函数：

```js

    babel-runtime/helpers/createClass  // 用于实现 class 语法
    babel-runtime/helpers/inherits  // 用于实现 extends 语法    
```

在默认情况下， `Babel` 会在每个输出文件中内嵌这些依赖的辅助函数代码，如果多个源代码文件都依赖这些辅助函数，那么这些辅助函数的代码将会出现很多次，造成代码冗余。为了不让这些辅助函数的代码重复出现，可以在依赖它们时通过 `require('babel-runtime/helpers/createClass')` 的方式导入，这样就能做到只让它们出现一次。`babel-plugin-transform-runtime` 插件就是用来实现这个作用的，将相关辅助函数进行替换成导入语句，从而减小 babel 编译出来的代码的文件大小

```js

    npm install babel-plugin-transform-runtime --save-dev
```

修改 `.babelrc` 配置文件为：

```json

    "plugins": [
        "transform-runtime"
    ]
```

**3\. 提取公共代码**

如果项目中没有去将每个页面的第三方库和公共模块提取出来，则项目会存在以下问题：

*   相同的资源被重复加载，浪费用户的流量和服务器的成本。
*   每个页面需要加载的资源太大，导致网页首屏加载缓慢，影响用户体验。

所以我们需要将多个页面的公共代码抽离成单独的文件，来优化以上问题 。`Webpack` 内置了专门用于提取多个`Chunk` 中的公共部分的插件 `CommonsChunkPlugin`，我们在项目中 `CommonsChunkPlugin` 的配置如下：

```js

    // 所有在 package.json 里面依赖的包，都会被打包进 vendor.js 这个文件中。
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function(module, count) {
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        );
      }
    }),
    // 抽取出代码模块的映射关系
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    })
```

**4\. 模板预编译**

*   当使用 DOM 内模板或 JavaScript 内的字符串模板时，模板会在运行时被编译为渲染函数。通常情况下这个过程已经足够快了，但对性能敏感的应用还是最好避免这种用法。
*   预编译模板最简单的方式就是使用单文件组件——相关的构建设置会自动把预编译处理好，所以构建好的代码已经包含了编译出来的渲染函数而不是原始的模板字符串。
*   如果你使用 webpack，并且喜欢分离 JavaScript 和模板文件，你可以使用 [vue-template-loader<span><span class="sr-only">(opens new window)</span></span>](https://github.com/ktsn/vue-template-loader)，它也可以在构建过程中把模板文件转换成为 JavaScript 渲染函数

**5\. 提取组件的 CSS**

当使用单文件组件时，组件内的 CSS 会以 style 标签的方式通过 JavaScript 动态注入。这有一些小小的运行时开销，如果你使用服务端渲染，这会导致一段 “无样式内容闪烁 (fouc) ” 。将所有组件的 CSS 提取到同一个文件可以避免这个问题，也会让 CSS 更好地进行压缩和缓存

**6\. 优化 SourceMap**

我们在项目进行打包后，会将开发中的多个文件代码打包到一个文件中，并且经过压缩、去掉多余的空格、babel编译化后，最终将编译得到的代码会用于线上环境，那么这样处理后的代码和源代码会有很大的差别，当有 bug的时候，我们只能定位到压缩处理后的代码位置，无法定位到开发环境中的代码，对于开发来说不好调式定位问题，因此 `sourceMap` 出现了，它就是为了解决不好调式代码问题的

> `SourceMap` 的可选值如下（`+` 号越多，代表速度越快，`-` 号越多，代表速度越慢, `o` 代表中等速度）

![](https://s.poetries.work/uploads/2022/08/7b07d8079454b3db.png)

*   开发环境推荐： `cheap-module-eval-source-map`
*   生产环境推荐： `cheap-module-source-map`

**原因如下：**

*   `cheap`： 源代码中的列信息是没有任何作用，因此我们打包后的文件不希望包含列相关信息，只有行信息能建立打包前后的依赖关系。因此不管是开发环境或生产环境，我们都希望添加 `cheap` 的基本类型来忽略打包前后的列信息；
*   `module` ：不管是开发环境还是正式环境，我们都希望能定位到`bug`的源代码具体的位置，比如说某个 `Vue` 文件报错了，我们希望能定位到具体的 `Vue` 文件，因此我们也需要 `module`配置；
*   `soure-map` ：`source-map` 会为每一个打包后的模块生成独立的 `soucemap` 文件 ，因此我们需要增加`source-map` 属性；
*   `eval-source-map`：`eval` 打包代码的速度非常快，因为它不生成 `map` 文件，但是可以对 `eval` 组合使用 `eval-source-map` 使用会将 `map` 文件以 `DataURL` 的形式存在打包后的 `js` 文件中。在正式环境中不要使用 `eval-source-map`, 因为它会增加文件的大小，但是在开发环境中，可以试用下，因为他们打包的速度很快。

**7\. 构建结果输出分析**

Webpack 输出的代码可读性非常差而且文件非常大，让我们非常头疼。为了更简单、直观地分析输出结果，社区中出现了许多可视化分析工具。这些工具以图形的方式将结果更直观地展示出来，让我们快速了解问题所在。接下来讲解我们在 Vue 项目中用到的分析工具：`webpack-bundle-analyzer`

```js

    if (config.build.bundleAnalyzerReport) {
      var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
      webpackConfig.plugins.push(new BundleAnalyzerPlugin());
    }
```

执行 `$ npm run build --report` 后生成分析报告如下

![](https://s.poetries.work/uploads/2022/08/ff03763e07c21600.png)

###  基础的 Web 技术优化

**1\. 开启 gzip 压缩**

> `gzip` 是 `GNUzip` 的缩写，最早用于 `UNIX` 系统的文件压缩。`HTTP` 协议上的 `gzip` 编码是一种用来改进 `web` 应用程序性能的技术，`web` 服务器和客户端（浏览器）必须共同支持 gzip。目前主流的浏览器，Chrome，firefox，IE等都支持该协议。常见的服务器如 Apache，Nginx，IIS 同样支持，`zip` 压缩效率非常高，通常可以达到 `70%` 的压缩率，也就是说，如果你的网页有 `30K`，压缩之后就变成了 `9K` 左右

以下我们以服务端使用我们熟悉的 `express` 为例，开启 `gzip` 非常简单，相关步骤如下：

```js

    npm install compression --save
```

```js

    var compression = require('compression');
    var app = express();
    app.use(compression())
```

重启服务，观察网络面板里面的 `response header`，如果看到如下红圈里的字段则表明 `gzip` 开启成功

![](https://s.poetries.work/uploads/2022/08/5147e6ec0da2e575.png)

**Nginx开启gzip压缩**

```js

    #是否启动gzip压缩,on代表启动,off代表开启
    gzip  on;

    #需要压缩的常见静态资源
    gzip_types text/plain application/javascript   application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;

    #由于nginx的压缩发生在浏览器端而微软的ie6很坑爹,会导致压缩后图片看不见所以该选
    项是禁止ie6发生压缩
    gzip_disable "MSIE [1-6]\.";

    #如果文件大于1k就启动压缩
    gzip_min_length 1k;

    #以16k为单位,按照原始数据的大小以4倍的方式申请内存空间,一般此项不要修改
    gzip_buffers 4 16k;

    #压缩的等级,数字选择范围是1-9,数字越小压缩的速度越快,消耗cpu就越大
    gzip_comp_level 2;
```

要想配置生效，记得重启`nginx`服务

```js

    nginx -t
    nginx -s reload
```

**2\. 浏览器缓存**

为了提高用户加载页面的速度，对静态资源进行缓存是非常必要的，根据是否需要重新向服务器发起请求来分类，将 HTTP 缓存规则分为两大类（强制缓存，对比缓存）

**3\. CDN 的使用**

浏览器从服务器上下载 CSS、js 和图片等文件时都要和服务器连接，而大部分服务器的带宽有限，如果超过限制，网页就半天反应不过来。而 CDN 可以通过不同的域名来加载文件，从而使下载文件的并发连接数大大增加，且CDN 具有更好的可用性，更低的网络延迟和丢包率

**4\. 使用 Chrome Performance 查找性能瓶颈**

`Chrome` 的 `Performance` 面板可以录制一段时间内的 `js` 执行细节及时间。使用 `Chrome` 开发者工具分析页面性能的步骤如下。

*   打开 `Chrome` 开发者工具，切换到 `Performance` 面板
*   点击 `Record` 开始录制
*   刷新页面或展开某个节点
*   点击 `Stop` 停止录制

![](https://s.poetries.work/uploads/2022/08/e7a4e7fe64ff0a41.png)

##  65 Vue与Angular以及React的区别？

###  Vue与AngularJS的区别

*   `Angular`采用`TypeScript`开发, 而`Vue`可以使用`javascript`也可以使用`TypeScript`
*   `AngularJS`依赖对数据做脏检查，所以`Watcher`越多越慢；`Vue.js`使用基于依赖追踪的观察并且使用异步队列更新，所有的数据都是独立触发的。
*   `AngularJS`社区完善, `Vue`的学习成本较小

###  Vue与React的区别

**相同点：**

1.  `Virtual DOM`。其中最大的一个相似之处就是都使用了`Virtual DOM`。(当然`Vue`是在`Vue2.x`才引用的)也就是能让我们通过操作数据的方式来改变真实的`DOM`状态。因为其实`Virtual DOM`的本质就是一个`JS`对象，它保存了对真实`DOM`的所有描述，是真实`DOM`的一个映射，所以当我们在进行频繁更新元素的时候，改变这个`JS`对象的开销远比直接改变真实`DOM`要小得多。
2.  组件化的开发思想。第二点来说就是它们都提倡这种组件化的开发思想，也就是建议将应用分拆成一个个功能明确的模块，再将这些模块整合在一起以满足我们的业务需求。
3.  `Props`。`Vue`和`React`中都有`props`的概念，允许父组件向子组件传递数据。
4.  构建工具、Chrome插件、配套框架。还有就是它们的构建工具以及Chrome插件、配套框架都很完善。比如构建工具，`React`中可以使用`CRA`，`Vue`中可以使用对应的脚手架`vue-cli`。对于配套框架`Vue`中有`vuex、vue-router`，`React`中有`react-router、redux`。

**不同点**

1.  模版的编写。最大的不同就是模版的编写，`Vue`鼓励你去写近似常规`HTML`的模板，`React`推荐你使用`JSX`去书写。
2.  状态管理与对象属性。在`React`中，应用的状态是比较关键的概念，也就是`state`对象，它允许你使用`setState`去更新状态。但是在`Vue`中，`state`对象并不是必须的，数据是由`data`属性在`Vue`对象中进行管理。
3.  虚拟`DOM`的处理方式不同。`Vue`中的虚拟`DOM`控制了颗粒度，组件层面走`watcher`通知，而组件内部走`vdom`做`diff`，这样，既不会有太多`watcher`，也不会让`vdom`的规模过大。而`React`走了类似于`CPU`调度的逻辑，把`vdom`这棵树，微观上变成了链表，然后利用浏览器的空闲时间来做`diff`

##  66 Vue2高级用法

###  自定义组件model

```vue

    <!-- 自定义 v-model -->
    <CustomVModel v-model="name"/> 
```

```vue

    <!-- CustomVModel -->
    <template>
        <!-- 例如：vue 颜色选择 -->
        <input type="text"
            :value="text"
            @input="$emit('change', $event.target.value)"
        >
        <!--
            1\. 上面的 input 使用了 :value 而不是 v-model
            2\. 上面的 change 和 model.event 要对应起来
            3\. text 属性对应起来
        -->
    </template>

    <script>
    export default {
        model: {
            prop: 'text', // 对应 props text
            event: 'change'
        },
        props: {
            text1: String,
            default() {
                return ''
            }
        }
    }
    </script>
```

###  vue3自定义组件model

```vue

    <!-- index.vue -->
    <CustomVModel v-model="name"/> 

    <!-- CustomVModel.vue -->
    <template>
        <input type="text"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
        >
    </template>

    <script>
    export default {
        props: {
            modelValue: String,
        }
    }
    </script>
```

###  vue2 slot

```vue

    <!-- slotDemo.vue 默认插槽 -->
    <template>
        <a :href="url">
            <slot>
                默认内容，即父组件没设置内容时，这里显示
            </slot>
        </a>
    </template>

    <script>
    export default {
        props: ['url'],
        data() {
            return {}
        }
    }
    </script>

    <!-- 用法 -->
    <SlotDemo :url="website.url">
        {{website.title}}
    </SlotDemo>
```

```vue

    <!-- ScopedSlotDemo.vue 作用域插槽demo -->
    <template>
        <a :href="url">
            <slot :slotData="website">
                {{website.subTitle}} <!-- 默认值显示 subTitle ，即父组件不传内容时 -->
            </slot>
        </a>
    </template>

    <script>
    export default {
        props: ['url'],
        data() {
            return {
                website: {
                    url: 'http://test.com/',
                    title: 'test',
                    subTitle: 'subtitle'
                }
            }
        }
    }
    </script>

    <!-- 用法 -->
    <ScopedSlotDemo :url="website.url">
        <template v-slot="slotProps">
            {{slotProps.slotData.title}}
        </template>
    </ScopedSlotDemo>
```

```html

    <!-- 具名插槽 -->
    <div>
        <header>
            <slot name="header" />
        </header>
        <main>
            <slot  />
        </main>
        <footer>
            <slot name="footer" />
        </footer>
    </div>

    <!-- 用法 -->
    <template>
        <template #header></template>
        <p>默认显示到main slot中</p>
        <template #footer></template>
    </template>
```

###  vue2动态组件

**动态组件**

*   `:is="component-name`
*   需要根据数据，动态渲染的场景。即组件类型不确定

```vue

    <component :is="compoentName"/>
```

###  vue2异步组件

*   `import()`函数
*   按需加载异步大组件

```vue

    <!-- 异步组件 -->
    <template>
        <FormDemo v-if="showFormDemo"/>
        <button @click="showFormDemo = true">show form demo</button>
    </template>
    <script>
    export default {
        components: {
            FormDemo: () => import('./FormDemo'), // 异步加载组件，初始化不加载
        },
    }
    </script>
```

##  67 Vue面试考察的高频原理

###  响应式原理

**响应式**

*   组件`data`数据一旦变化，立刻触发视图的更新
*   实现数据驱动视图的第一步
*   核心API：`Object.defineProperty`
    *   **缺点**
        *   深度监听，需要递归到底，一次计算量大
        *   无法监听新增属性、删除属性（使用`Vue.set`、`Vue.delete`可以）
        *   无法监听原生数组，需要重写数组原型

```js

    // 触发更新视图
    function updateView() {
        console.log('视图更新')
    }

    // 重新定义数组原型
    const oldArrayProperty = Array.prototype
    // 创建新对象，原型指向 oldArrayProperty ，再扩展新的方法不会影响原型
    const arrProto = Object.create(oldArrayProperty);
    ['push', 'pop', 'shift', 'unshift', 'splice'].forEach(methodName => {
        arrProto[methodName] = function () {
            updateView() // 触发视图更新
            oldArrayProperty[methodName].call(this, ...arguments)
            // Array.prototype.push.call(this, ...arguments)
        }
    })

    // 重新定义属性，监听起来
    function defineReactive(target, key, value) {
        // 深度监听
        observer(value)

        // 核心 API
        Object.defineProperty(target, key, {
            get() {
                return value
            },
            set(newValue) {
                if (newValue !== value) {
                    // 深度监听
                    observer(newValue)

                    // 设置新值
                    // 注意，value 一直在闭包中，此处设置完之后，再 get 时也是会获取最新的值
                    value = newValue

                    // 触发更新视图
                    updateView()
                }
            }
        })
    }

    // 监听对象属性
    function observer(target) {
        if (typeof target !== 'object' || target === null) {
            // 不是对象或数组
            return target
        }

        // 污染全局的 Array 原型
        // Array.prototype.push = function () {
        //     updateView()
        //     ...
        // }

        if (Array.isArray(target)) {
            target.__proto__ = arrProto
        }

        // 重新定义各个属性（for in 也可以遍历数组）
        for (let key in target) {
            defineReactive(target, key, target[key])
        }
    }

    // 准备数据
    const data = {
        name: 'zhangsan',
        age: 20,
        info: {
            address: 'shenzhen' // 需要深度监听
        },
        nums: [10, 20, 30]
    }

    // 监听数据
    observer(data)

    // 测试
    // data.name = 'lisi'
    // data.age = 21
    // // console.log('age', data.age)
    // data.x = '100' // 新增属性，监听不到 —— 所以有 Vue.set
    // delete data.name // 删除属性，监听不到 —— 所有已 Vue.delete
    // data.info.address = '上海' // 深度监听
    data.nums.push(4) // 监听数组
```

```js

    // proxy-demo

    // const data = {
    //     name: 'zhangsan',
    //     age: 20,
    // }
    const data = ['a', 'b', 'c']

    const proxyData = new Proxy(data, {
        get(target, key, receiver) {
            // 只处理本身（非原型的）属性
            const ownKeys = Reflect.ownKeys(target)
            if (ownKeys.includes(key)) {
                console.log('get', key) // 监听
            }

            const result = Reflect.get(target, key, receiver)
            return result // 返回结果
        },
        set(target, key, val, receiver) {
            // 重复的数据，不处理
            if (val === target[key]) {
                return true
            }

            const result = Reflect.set(target, key, val, receiver)
            console.log('set', key, val)
            // console.log('result', result) // true
            return result // 是否设置成功
        },
        deleteProperty(target, key) {
            const result = Reflect.deleteProperty(target, key)
            console.log('delete property', key)
            // console.log('result', result) // true
            return result // 是否删除成功
        }
    })
```

###  vdom和diff算法

**1\. vdom**

*   **背景**
    *   `DOM`操作非常耗时
    *   以前用`jQuery`，可以自行控制`DOM`操作时机，手动调整
    *   `Vue`和`React`是数据驱动视图，如何有效控制`DOM`操作
*   **解决方案VDOM**
    *   有了一定的复杂度，想减少计算次数比较难
    *   能不能把计算，更多的转移为JS计算？因为`JS`执行速度很快
    *   `vdom` 用`JS`模拟`DOM`结构，计算出最小的变更，操作`DOM`
*   **用JS模拟DOM结构**  
    ![](https://s.poetries.work/uploads/2023/02/34c8532904ffd12f.png)
*   **通过snabbdom学习vdom**
    *   简洁强大的`vdom`库
    *   `vue2`参考它实现的`vdom`和`diff`
    *   **snabbdom**
        *   `h`函数
        *   `vnode`数据结构
        *   `patch`函数
*   **vdom总结**
    *   用`JS`模拟`DOM`结构（`vnode`）
    *   新旧`vnode`对比，得出最小的更新范围，有效控制`DOM`操作
    *   数据驱动视图模式下，有效控制`DOM`操作

```html

    <!-- snabbdom-demo -->

    <div id="container"></div>
    <button id="btn-change">change</button>

    <script src="https://cdn.bootcss.com/snabbdom/0.7.3/snabbdom.js"></script>
    <script src="https://cdn.bootcss.com/snabbdom/0.7.3/snabbdom-class.js"></script>
    <script src="https://cdn.bootcss.com/snabbdom/0.7.3/snabbdom-props.js"></script>
    <script src="https://cdn.bootcss.com/snabbdom/0.7.3/snabbdom-style.js"></script>
    <script src="https://cdn.bootcss.com/snabbdom/0.7.3/snabbdom-eventlisteners.js"></script>
    <script src="https://cdn.bootcss.com/snabbdom/0.7.3/h.js"></script>
    <script>
        const snabbdom = window.snabbdom

        // 定义 patch
        const patch = snabbdom.init([
            snabbdom_class,
            snabbdom_props,
            snabbdom_style,
            snabbdom_eventlisteners
        ])

        // 定义 h
        const h = snabbdom.h

        const container = document.getElementById('container')

        // 生成 vnode
        const vnode = h('ul#list', {}, [
            h('li.item', {}, 'Item 1'),
            h('li.item', {}, 'Item 2')
        ])
        patch(container, vnode)

        document.getElementById('btn-change').addEventListener('click', () => {
            // 生成 newVnode
            const newVnode = h('ul#list', {}, [
                h('li.item', {}, 'Item 1'),
                h('li.item', {}, 'Item B'),
                h('li.item', {}, 'Item 3')
            ])
            patch(vnode, newVnode)

            // vnode = newVnode // patch 之后，应该用新的覆盖现有的 vnode ，否则每次 change 都是新旧对比
        })

    </script>
```

```html

    <!-- table-without-vdom.html -->
    <div id="container"></div>
    <button id="btn-change">change</button>

    <script type="text/javascript" src="https://cdn.bootcss.com/jquery/3.2.0/jquery.js"></script>
    <script type="text/javascript">
        const data = [
            {
                name: '张三',
                age: '20',
                address: '北京'
            },
            {
                name: '李四',
                age: '21',
                address: '上海'
            },
            {
                name: '王五',
                age: '22',
                address: '广州'
            }
        ]

        // 渲染函数
        function render(data) {
            const $container = $('#container')

            // 清空容器，重要！！！
            $container.html('')

            // 拼接 table
            const $table = $('<table>')

            $table.append($('<tr><td>name</td><td>age</td><td>address</td>/tr>'))
            data.forEach(item => {
                $table.append($('<tr><td>' + item.name + '</td><td>' + item.age + '</td><td>' + item.address + '</td>/tr>'))
            })

            // 渲染到页面
            $container.append($table)
        }

        $('#btn-change').click(() => {
            data[1].age = 30
            data[2].address = '深圳'
            // re-render  再次渲染
            render(data)
        })

        // 页面加载完立刻执行（初次渲染）
        render(data)

    </script>
```

```html

    <!-- table-with-vdom -->

    <div id="container"></div>
    <button id="btn-change">change</button>

    <script src="https://cdn.bootcss.com/snabbdom/0.7.3/snabbdom.js"></script>
    <script src="https://cdn.bootcss.com/snabbdom/0.7.3/snabbdom-class.js"></script>
    <script src="https://cdn.bootcss.com/snabbdom/0.7.3/snabbdom-props.js"></script>
    <script src="https://cdn.bootcss.com/snabbdom/0.7.3/snabbdom-style.js"></script>
    <script src="https://cdn.bootcss.com/snabbdom/0.7.3/snabbdom-eventlisteners.js"></script>
    <script src="https://cdn.bootcss.com/snabbdom/0.7.3/h.js"></script>
    <script type="text/javascript">
        const snabbdom = window.snabbdom
        // 定义关键函数 patch
        const patch = snabbdom.init([
            snabbdom_class,
            snabbdom_props,
            snabbdom_style,
            snabbdom_eventlisteners
        ])

        // 定义关键函数 h
        const h = snabbdom.h

        // 原始数据
        const data = [
            {
                name: '张三',
                age: '20',
                address: '北京'
            },
            {
                name: '李四',
                age: '21',
                address: '上海'
            },
            {
                name: '王五',
                age: '22',
                address: '广州'
            }
        ]
        // 把表头也放在 data 中
        data.unshift({
            name: '姓名',
            age: '年龄',
            address: '地址'
        })

        const container = document.getElementById('container')

        // 渲染函数
        let vnode
        function render(data) {
            const newVnode = h('table', {}, data.map(item => {
                const tds = []
                for (let i in item) {
                    if (item.hasOwnProperty(i)) {
                        tds.push(h('td', {}, item[i] + ''))
                    }
                }
                return h('tr', {}, tds)
            }))

            if (vnode) {
                // re-render
                patch(vnode, newVnode)
            } else {
                // 初次渲染
                patch(container, newVnode)
            }

            // 存储当前的 vnode 结果
            vnode = newVnode
        }

        // 初次渲染
        render(data)

        const btnChange = document.getElementById('btn-change')
        btnChange.addEventListener('click', () => {
            data[1].age = 30
            data[2].address = '深圳'
            // re-render
            render(data)
        })

    </script>
```

**2\. diff算法**

*   `diff`算法是`vdom`中最核心、最关键的部分
*   `diff`算法能在日常使用`vue` `react`中提现出来（如`key`）

**树的diff的时间复杂度O(n^3)**

*   第一，遍历`tree1`
*   第二，遍历`tree2`
*   第三，排序
*   `1000`个节点，要计算`10`亿次，算法不可用

**优化时间复杂度到O(n)**

*   只比较同一层级，不跨级比较
*   `tag`不想同，则直接删掉重建，不再深度比较
*   `tag`和`key`相同，则认为是相同节点，不再深度比较

![](https://s.poetries.work/uploads/2023/02/9e81506ea3345aea.png) ![](https://s.poetries.work/uploads/2023/02/f304938694b28862.png)

**diff过程细节**

*   新旧节点都有`children`，执行`updateChildren` `diff`对比 ![](https://s.poetries.work/uploads/2023/02/2a4ac0a956e99b22.png)
    *   开始和开始对比--头头
    *   结束和结束对比--尾尾
    *   开始和结束对比--头尾
    *   结束和开始对比--尾头
    *   以上四个都未命中：拿新节点 `key` ，能否对应上 `oldCh` 中的某个节点的 `key`
*   新`children`有，旧`children`无：清空旧`text`节点，新增新`children`节点
*   旧`children`有，新`children`无：移除旧`children`
*   否则旧`text`有，设置`text`为空

**vdom和diff算法总结**

*   细节不重要，`updateChildren`的过程也不重要，不要深究
*   `vdom`的核心概念很重要：`h`、`vnode`、`patch`、`diff`、`key`
*   `vdom`存在的价值更重要，数据驱动视图，控制`dom`操作

```js

    // snabbdom源码位于 src/snabbdom.ts
    /* global module, document, Node */
    import { Module } from './modules/module';
    import vnode, { VNode } from './vnode';
    import * as is from './is';
    import htmlDomApi, { DOMAPI } from './htmldomapi';

    type NonUndefined<T> = T extends undefined ? never : T;

    function isUndef (s: any): boolean { return s === undefined; }
    function isDef<A> (s: A): s is NonUndefined<A> { return s !== undefined; }

    type VNodeQueue = VNode[];

    const emptyNode = vnode('', {}, [], undefined, undefined);

    function sameVnode (vnode1: VNode, vnode2: VNode): boolean {
      // key 和 sel 都相等
      // undefined === undefined // true
      return vnode1.key === vnode2.key && vnode1.sel === vnode2.sel;
    }

    function isVnode (vnode: any): vnode is VNode {
      return vnode.sel !== undefined;
    }

    type KeyToIndexMap = {[key: string]: number};

    type ArraysOf<T> = {
      [K in keyof T]: Array<T[K]>;
    }

    type ModuleHooks = ArraysOf<Module>;

    function createKeyToOldIdx (children: VNode[], beginIdx: number, endIdx: number): KeyToIndexMap {
      const map: KeyToIndexMap = {};
      for (let i = beginIdx; i <= endIdx; ++i) {
        const key = children[i]?.key;
        if (key !== undefined) {
          map[key] = i;
        }
      }
      return map;
    }

    const hooks: Array<keyof Module> = ['create', 'update', 'remove', 'destroy', 'pre', 'post'];

    export { h } from './h';
    export { thunk } from './thunk';

    export function init (modules: Array<Partial<Module>>, domApi?: DOMAPI) {
      let i: number, j: number, cbs = ({} as ModuleHooks);

      const api: DOMAPI = domApi !== undefined ? domApi : htmlDomApi;

      for (i = 0; i < hooks.length; ++i) {
        cbs[hooks[i]] = [];
        for (j = 0; j < modules.length; ++j) {
          const hook = modules[j][hooks[i]];
          if (hook !== undefined) {
            (cbs[hooks[i]] as any[]).push(hook);
          }
        }
      }

      function emptyNodeAt (elm: Element) {
        const id = elm.id ? '#' + elm.id : '';
        const c = elm.className ? '.' + elm.className.split(' ').join('.') : '';
        return vnode(api.tagName(elm).toLowerCase() + id + c, {}, [], undefined, elm);
      }

      function createRmCb (childElm: Node, listeners: number) {
        return function rmCb () {
          if (--listeners === 0) {
            const parent = api.parentNode(childElm);
            api.removeChild(parent, childElm);
          }
        };
      }

      function createElm (vnode: VNode, insertedVnodeQueue: VNodeQueue): Node {
        let i: any, data = vnode.data;
        if (data !== undefined) {
          const init = data.hook?.init;
          if (isDef(init)) {
            init(vnode);
            data = vnode.data;
          }
        }
        let children = vnode.children, sel = vnode.sel;
        if (sel === '!') {
          if (isUndef(vnode.text)) {
            vnode.text = '';
          }
          vnode.elm = api.createComment(vnode.text!);
        } else if (sel !== undefined) {
          // Parse selector
          const hashIdx = sel.indexOf('#');
          const dotIdx = sel.indexOf('.', hashIdx);
          const hash = hashIdx > 0 ? hashIdx : sel.length;
          const dot = dotIdx > 0 ? dotIdx : sel.length;
          const tag = hashIdx !== -1 || dotIdx !== -1 ? sel.slice(0, Math.min(hash, dot)) : sel;
          const elm = vnode.elm = isDef(data) && isDef(i = data.ns)
            ? api.createElementNS(i, tag)
            : api.createElement(tag);
          if (hash < dot) elm.setAttribute('id', sel.slice(hash + 1, dot));
          if (dotIdx > 0) elm.setAttribute('class', sel.slice(dot + 1).replace(/\./g, ' '));
          for (i = 0; i < cbs.create.length; ++i) cbs.create[i](emptyNode, vnode);
          if (is.array(children)) {
            for (i = 0; i < children.length; ++i) {
              const ch = children[i];
              if (ch != null) {
                api.appendChild(elm, createElm(ch as VNode, insertedVnodeQueue));
              }
            }
          } else if (is.primitive(vnode.text)) {
            api.appendChild(elm, api.createTextNode(vnode.text));
          }
          const hook = vnode.data!.hook;
          if (isDef(hook)) {
            hook.create?.(emptyNode, vnode);
            if (hook.insert) {
              insertedVnodeQueue.push(vnode);
            }
          }
        } else {
          vnode.elm = api.createTextNode(vnode.text!);
        }
        return vnode.elm;
      }

      function addVnodes (
        parentElm: Node,
        before: Node | null,
        vnodes: VNode[],
        startIdx: number,
        endIdx: number,
        insertedVnodeQueue: VNodeQueue
      ) {
        for (; startIdx <= endIdx; ++startIdx) {
          const ch = vnodes[startIdx];
          if (ch != null) {
            api.insertBefore(parentElm, createElm(ch, insertedVnodeQueue), before);
          }
        }
      }

      function invokeDestroyHook (vnode: VNode) {
        const data = vnode.data;
        if (data !== undefined) {
          data?.hook?.destroy?.(vnode);
          for (let i = 0; i < cbs.destroy.length; ++i) cbs.destroy[i](vnode);
          if (vnode.children !== undefined) {
            for (let j = 0; j < vnode.children.length; ++j) {
              const child = vnode.children[j];
              if (child != null && typeof child !== "string") {
                invokeDestroyHook(child);
              }
            }
          }
        }
      }

      function removeVnodes (parentElm: Node,
        vnodes: VNode[],
        startIdx: number,
        endIdx: number): void {
        for (; startIdx <= endIdx; ++startIdx) {
          let listeners: number, rm: () => void, ch = vnodes[startIdx];
          if (ch != null) {
            if (isDef(ch.sel)) {
              invokeDestroyHook(ch); // hook 操作

              // 移除 DOM 元素
              listeners = cbs.remove.length + 1;
              rm = createRmCb(ch.elm!, listeners);
              for (let i = 0; i < cbs.remove.length; ++i) cbs.remove[i](ch, rm);
              const removeHook = ch?.data?.hook?.remove;
              if (isDef(removeHook)) {
                removeHook(ch, rm);
              } else {
                rm();
              }
            } else { // Text node
              api.removeChild(parentElm, ch.elm!);
            }
          }
        }
      }

      // diff算法核心
      function updateChildren (parentElm: Node,
        oldCh: VNode[],
        newCh: VNode[],
        insertedVnodeQueue: VNodeQueue) {
        let oldStartIdx = 0, newStartIdx = 0;
        let oldEndIdx = oldCh.length - 1;
        let oldStartVnode = oldCh[0];
        let oldEndVnode = oldCh[oldEndIdx];
        let newEndIdx = newCh.length - 1;
        let newStartVnode = newCh[0];
        let newEndVnode = newCh[newEndIdx];
        let oldKeyToIdx: KeyToIndexMap | undefined;
        let idxInOld: number;
        let elmToMove: VNode;
        let before: any;

        while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
          if (oldStartVnode == null) {
            oldStartVnode = oldCh[++oldStartIdx]; // Vnode might have been moved left
          } else if (oldEndVnode == null) {
            oldEndVnode = oldCh[--oldEndIdx];
          } else if (newStartVnode == null) {
            newStartVnode = newCh[++newStartIdx];
          } else if (newEndVnode == null) {
            newEndVnode = newCh[--newEndIdx];

          // 开始和开始对比--头头
          } else if (sameVnode(oldStartVnode, newStartVnode)) {
            patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
            oldStartVnode = oldCh[++oldStartIdx];
            newStartVnode = newCh[++newStartIdx];

          // 结束和结束对比--尾尾
          } else if (sameVnode(oldEndVnode, newEndVnode)) {
            patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
            oldEndVnode = oldCh[--oldEndIdx];
            newEndVnode = newCh[--newEndIdx];

          // 开始和结束对比--头尾
          } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
            patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
            api.insertBefore(parentElm, oldStartVnode.elm!, api.nextSibling(oldEndVnode.elm!));
            oldStartVnode = oldCh[++oldStartIdx];
            newEndVnode = newCh[--newEndIdx];

          // 结束和开始对比--尾头
          } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
            patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
            api.insertBefore(parentElm, oldEndVnode.elm!, oldStartVnode.elm!);
            oldEndVnode = oldCh[--oldEndIdx];
            newStartVnode = newCh[++newStartIdx];

          // 以上四个都未命中
          } else {
            if (oldKeyToIdx === undefined) {
              oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
            }
            // 拿新节点 key ，能否对应上 oldCh 中的某个节点的 key
            idxInOld = oldKeyToIdx[newStartVnode.key as string];

            // 没对应上
            if (isUndef(idxInOld)) { // New element
              api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm!);
              newStartVnode = newCh[++newStartIdx];

            // 对应上了
            } else {
              // 对应上 key 的节点
              elmToMove = oldCh[idxInOld];

              // sel 是否相等（sameVnode 的条件）
              if (elmToMove.sel !== newStartVnode.sel) {
                // New element
                api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm!);

              // sel 相等，key 相等
              } else {
                patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
                oldCh[idxInOld] = undefined as any;
                api.insertBefore(parentElm, elmToMove.elm!, oldStartVnode.elm!);
              }
              newStartVnode = newCh[++newStartIdx];
            }
          }
        }
        if (oldStartIdx <= oldEndIdx || newStartIdx <= newEndIdx) {
          if (oldStartIdx > oldEndIdx) {
            before = newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].elm;
            addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
          } else {
            removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
          }
        }
      }

      function patchVnode (oldVnode: VNode, vnode: VNode, insertedVnodeQueue: VNodeQueue) {
        // 执行 prepatch hook
        const hook = vnode.data?.hook;
        hook?.prepatch?.(oldVnode, vnode);

        // 设置 vnode.elem
        const elm = vnode.elm = oldVnode.elm!;

        // 旧 children
        let oldCh = oldVnode.children as VNode[];
        // 新 children
        let ch = vnode.children as VNode[];

        if (oldVnode === vnode) return;

        // hook 相关
        if (vnode.data !== undefined) {
          for (let i = 0; i < cbs.update.length; ++i) cbs.update[i](oldVnode, vnode);
          vnode.data.hook?.update?.(oldVnode, vnode);
        }

        // vnode.text === undefined （vnode.children 一般有值）
        if (isUndef(vnode.text)) {
          // 新旧都有 children
          if (isDef(oldCh) && isDef(ch)) {
            if (oldCh !== ch) updateChildren(elm, oldCh, ch, insertedVnodeQueue);
          // 新 children 有，旧 children 无 （旧 text 有）
          } else if (isDef(ch)) {
            // 清空 text
            if (isDef(oldVnode.text)) api.setTextContent(elm, '');
            // 添加 children
            addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
          // 旧 child 有，新 child 无
          } else if (isDef(oldCh)) {
            // 移除 children
            removeVnodes(elm, oldCh, 0, oldCh.length - 1);
          // 旧 text 有
          } else if (isDef(oldVnode.text)) {
            api.setTextContent(elm, '');
          }

        // else : vnode.text !== undefined （vnode.children 无值）
        } else if (oldVnode.text !== vnode.text) {
          // 移除旧 children
          if (isDef(oldCh)) {
            removeVnodes(elm, oldCh, 0, oldCh.length - 1);
          }
          // 设置新 text
          api.setTextContent(elm, vnode.text!);
        }
        hook?.postpatch?.(oldVnode, vnode);
      }

      return function patch (oldVnode: VNode | Element, vnode: VNode): VNode {
        let i: number, elm: Node, parent: Node;
        const insertedVnodeQueue: VNodeQueue = [];
        // 执行 pre hook
        for (i = 0; i < cbs.pre.length; ++i) cbs.pre[i]();

        // 第一个参数不是 vnode
        if (!isVnode(oldVnode)) {
          // 创建一个空的 vnode ，关联到这个 DOM 元素
          oldVnode = emptyNodeAt(oldVnode);
        }

        // 相同的 vnode（key 和 sel 都相等）
        if (sameVnode(oldVnode, vnode)) {
          // vnode 对比
          patchVnode(oldVnode, vnode, insertedVnodeQueue);

        // 不同的 vnode ，直接删掉重建
        } else {
          elm = oldVnode.elm!;
          parent = api.parentNode(elm);

          // 重建
          createElm(vnode, insertedVnodeQueue);

          if (parent !== null) {
            api.insertBefore(parent, vnode.elm!, api.nextSibling(elm));
            removeVnodes(parent, [oldVnode], 0, 0);
          }
        }

        for (i = 0; i < insertedVnodeQueue.length; ++i) {
          insertedVnodeQueue[i].data!.hook!.insert!(insertedVnodeQueue[i]);
        }
        for (i = 0; i < cbs.post.length; ++i) cbs.post[i]();
        return vnode;
      };
    }
```

###  模板编译

**前置知识**

*   模板是`vue`开发中最常用的，即与使用相关联的原理
*   它不是`HTML`，有指令、插值、JS表达式，能实现循环、判断，因此模板一定转为`JS`代码，即模板编译
*   面试不会直接问，但会通过`组件渲染和更新过程`考察

**模板编译**

*   `vue template compiler`将模板编译为`render`函数
*   执行`render`函数，生成`vnode`
*   基于`vnode`在执行`patch`和`diff`
*   使用`webpack vue loader`，会在开发环境下编译模板

**with语法**

![](https://s.poetries.work/uploads/2023/02/6f9943fe553bfa0a.png)

*   改变`{}`内自由变量的查找规则，当做`obj`属性来查找
*   如果找不到匹配的`obj`属性，就会报错
*   `with`要慎用，它打破了作用域规则，易读性变差

**vue组件中使用render代替template**

![](https://s.poetries.work/uploads/2023/02/84a8702352c0d1a7.png)

```js

    // 执行 node index.js

    const compiler = require('vue-template-compiler')

    // 插值
    const template = `<p>{{message}}</p>`
    with(this){return _c('p', [_v(_s(message))])}
    // this就是vm的实例, message等变量会从vm上读取，触发getter
    // _c => createElement 也就是h函数 => 返回vnode
    // _v => createTextVNode 
    // _s => toString 
    // 也就是这样 with(this){return createElement('p',[createTextVNode(toString(message))])}

    // h -> vnode
    // createElement -> vnode

    // 表达式
    const template = `<p>{{flag ? message : 'no message found'}}</p>`
    // with(this){return _c('p',[_v(_s(flag ? message : 'no message found'))])}

    // 属性和动态属性
    const template = `
        <div id="div1" class="container">
            <img :src="imgUrl"/>
        </div>
    `
    with(this){return _c('div',
         {staticClass:"container",attrs:{"id":"div1"}},
         [
             _c('img',{attrs:{"src":imgUrl}})])}

    // 条件
    const template = `
        <div>
            <p v-if="flag === 'a'">A</p>
            <p v-else>B</p>
        </div>
    `
    with(this){return _c('div',[(flag === 'a')?_c('p',[_v("A")]):_c('p',[_v("B")])])}

    // 循环
    const template = `
        <ul>
            <li v-for="item in list" :key="item.id">{{item.title}}</li>
        </ul>
    `
    with(this){return _c('ul',_l((list),function(item){return _c('li',{key:item.id},[_v(_s(item.title))])}),0)}

    // 事件
    const template = `
        <button @click="clickHandler">submit</button>
    `
    with(this){return _c('button',{on:{"click":clickHandler}},[_v("submit")])}

    // v-model
    const template = `<input type="text" v-model="name">`
    // 主要看 input 事件
    with(this){return _c('input',{directives:[{name:"model",rawName:"v-model",value:(name),expression:"name"}],attrs:{"type":"text"},domProps:{"value":(name)},on:{"input":function($event){if($event.target.composing)return;name=$event.target.value}}})}

    // render 函数
    // 返回 vnode
    // patch

    // 编译
    const res = compiler.compile(template)
    console.log(res.render)

    // ---------------分割线--------------

    // 从 vue 源码中找到缩写函数的含义
    function installRenderHelpers (target) {
        target._o = markOnce;
        target._n = toNumber;
        target._s = toString;
        target._l = renderList;
        target._t = renderSlot;
        target._q = looseEqual;
        target._i = looseIndexOf;
        target._m = renderStatic;
        target._f = resolveFilter;
        target._k = checkKeyCodes;
        target._b = bindObjectProps;
        target._v = createTextVNode;
        target._e = createEmptyVNode;
        target._u = resolveScopedSlots;
        target._g = bindObjectListeners;
        target._d = bindDynamicKeys;
        target._p = prependModifier;
    }
```

###  组件渲染更新过程（重点掌握）

**前言**

*   一个组件渲染到页面，修改`data`触发更新（数据驱动视图）
*   其背后原理是什么，需要掌握哪些点
*   考察对流程了解的全面程度

**回顾三大核心知识点**

*   **响应式**：监听`data`属性`getter`、`setter`（包括数组）
*   **模板编译**：模板到`render`函数，再到`vnode`
*   **vdom**：两种用法
    *   `patch(elem,vnode)` 首次渲染`vnode`到`container`上
    *   `patch(vnode、newVnode)` 新的`vnode`取更新旧的`vnode`
*   搞定这三点核心原理，`vue`原理不是问题

**组件渲染更新过程**

*   **1\. 初次渲染过程**
    *   解析模板为`render`函数（或在开发环境已经完成`vue-loader`）
    *   触发响应式，监听`data`属性`getter`、`setter`
    *   执行`render`函数（执行`render`函数过程中，会获取`data`的属性触发`getter`），生成`vnode`，在执行`patch(elem,vnode)` `elem`组件对应的`dom`节点
        *   `const template = <p></p>`
        *   编译为`render`函数 `with(this){return _c('p', [_v(_s(message))])}`
        *   `this`就是`vm`的实例, `message`等变量会从`vm`上读取，触发`getter`进行依赖收集

        ```js

            export default {
                data() {
                    return {
                        message: 'hello' // render函数执行过程中会获取message变量值，触发getter
                    }
                }
            }

        </div>

*   **2\. 更新过程**
    *   修改`data`，触发`setter`（此前在`getter`中已被监听）
    *   重新执行`render`函数，生成`newVnode`
    *   在调用`patch(oldVnode, newVnode)`算出最小差异，进行更新
*   **3\. 完成流程图** ![](https://s.poetries.work/uploads/2023/02/94729fa5b9fcb082.png)

**异步渲染**

*   汇总`data`的修改，一次更新视图
*   减少`DOM`操作次数，提高性能

![](https://s.poetries.work/uploads/2023/02/6c8606aaa99af5cb.png)

```js

    methods: {
        addItem() {
            this.list.push(`${Date.now()}`)
            this.list.push(`${Date.now()}`)
            this.list.push(`${Date.now()}`)

            // 1.页面渲染是异步的，$nextTick待渲染完在回调
            // 2.页面渲染时会将data的修改做整合，多次data修改也只会渲染一次
            this.$nextTick(()=>{
                const ulElem = this.$refs.ul
                console.log(ulElem.childNotes.length)
            })
        }
    }
```

**总结**

*   渲染和响应式的关系
*   渲染和模板编译的关系
*   渲染和`vdom`的关系

###  前端路由原理

**hash的特点**

*   `hash`变化会触发网页跳转，即浏览器的前进和后退
*   `hash`变化不会刷新页面，`SPA`必须的特点
*   `hash`永远不会提交到`server`端
*   通过`onhashchange`监听

**H5 History**

*   用`url`规范的路由，但跳转时不刷新页面
*   通过`history.pushState`和`history.onpopstate`监听
*   `H5 History`需要后端支持
    *   当我们进入到子路由时刷新页面，`web`容器没有相对应的页面此时会出现`404`
    *   所以我们只需要配置将任意页面都重定向到 `index.html`，把路由交由前端处理
    *   对`nginx`配置文件`.conf`修改，添加`try_files $uri $uri/ /index.html;`

    ```js

        server {
          listen  80;
          server_name  www.xxx.com;

          location / {
            index  /data/dist/index.html;
            try_files $uri $uri/ /index.html;
          }
        }

    </div>

**两者选择**

*   `to B`系统推荐使用hash，简单易用，对`url`规范不敏感
*   `to C`系统，可以考虑使用`H5 History`，但需要服务端支持
*   能选择简单的，就别用复杂的，要考虑成本和收益

```js

    // hash 变化，包括：
    // a. JS 修改 url
    // b. 手动修改 url 的 hash
    // c. 浏览器前进、后退
    window.onhashchange = (event) => {
        console.log('old url', event.oldURL)
        console.log('new url', event.newURL)

        console.log('hash:', location.hash)
    }

    // 页面初次加载，获取 hash
    document.addEventListener('DOMContentLoaded', () => {
        console.log('hash:', location.hash)
    })

    // JS 修改 url
    document.getElementById('btn1').addEventListener('click', () => {
        location.href = '#/user'
    })
```

```js

    // history API

    // 页面初次加载，获取 path
    document.addEventListener('DOMContentLoaded', () => {
        console.log('load', location.pathname)
    })

    // 打开一个新的路由
    // 【注意】用 pushState 方式，浏览器不会刷新页面
    document.getElementById('btn1').addEventListener('click', () => {
        const state = { name: 'page1' }
        console.log('切换路由到', 'page1')
        history.pushState(state, '', 'page1') // 重要！！
    })

    // 监听浏览器前进、后退
    window.onpopstate = (event) => { // 重要！！
        console.log('onpopstate', event.state, location.pathname)
    }

    // 需要 server 端配合，可参考
    // https://router.vuejs.org/zh/guide/essentials/history-mode.html#%E5%90%8E%E7%AB%AF%E9%85%8D%E7%BD%AE%E4%BE%8B%E5%AD%90
```

##  68 Vue面试考点答题分析

###  请说一下响应式数据的理解

**参考答案**

*   核心点考察的是：数组和对象类型当值变化时如何劫持到。对象内部通过`defineReactive`方法，使用`Object.defineProperty`将属性进行劫持（只会劫持已经存在的属性），数组则是通过重写数组方法来实现。 这里在回答时可以带出一些相关知识点（比如多层对象是通过递归来实现劫持，顺带提出`Vue3`中是使用`proxy`来实现响应式数据）
*   核心点答出来了也可以在进行补充回答，内部依赖收集是怎样做到的，每个属性都拥有自己的`dep`属性，存放他所依赖的`watcher`，当属性变化后会通知自己对应的`watcher`去更新
*   这里可以引出性能优化相关的内容
    *   对象层级过深，性能就会差
    *   不需要响应数据的内容不要放到`data`中
    *   `Object.freeze()` 可以冻结数据

###  Vue如何检测数组变化

*   核心点考察的是：数组考虑性能原因没有用`defineProperty`对数组的每一项进行拦截，而是选择重写数组（`push`,`shift`,`pop`,`splice`,`unshift`,`sort`,`reverse`）方法进行重写
*   核心点答出来了也可以在进行补充回答，在`Vue`中修改数组的索引和长度是无法监控到的。需要通过以上`7`种变异方法修改数组才会触发数组对应的`watcher`进行更新。数组中如果是对象数据类型也会进行递归劫持
*   引发出的问题，那如果想更改索引更新数据怎么办？可以通过`Vue.$set()`来进行处理 => 核心内部用的是`splice`方法

###  Vue中模板编译原理

`

*   核心点考察的是：如何将`template`转换成`render`函数(这里要注意的是我们在开发时尽量不要使用`template`，因为将`template`转化成`render`方法需要在运行时进行编译操作会有性能损耗，同时引用带有`compiler`包的`vue`体积也会变大。默认`.vue`文件中的`template`处理是通过`vue-loader`来进行处理的并不是通过运行时的编译 - 后面我们会说到默认`vue`项目中引入的`vue.js`是不带有`compiler`模块的)
*   **模板编译过程**
    *   将`template`模板转换成`ast`语法树 - `parserHTML`
    *   对静态语法做静态标记 - `markUp`
    *   重新生成代码 - `codeGen`
    *   核心点答出来了也可以在进行补充回答 （模板引擎的实现原理就是`new Function + with`来进行实现的）

    ```js

        function compileToFunctions(template) {
          // 我们需要把html字符串变成render函数
          // 1.把html代码转成ast语法树  ast用来描述代码本身形成树结构 不仅可以描述html 也能描述css以及js语法
          // 很多库都运用到了ast 比如 webpack babel eslint等等
          let ast = parse(template);
          // 2.优化静态节点：对ast树进行标记,标记静态节点
            if (options.optimize !== false) {
              optimize(ast, options);
            }

          // 3.通过ast 重新生成代码
          // 我们最后生成的代码需要和render函数一样
          // 类似_c('div',{id:"app"},_c('div',undefined,_v("hello"+_s(name)),_c('span',undefined,_v("world"))))
          // _c代表创建元素 _v代表创建文本 _s代表文Json.stringify--把对象解析成文本
          let code = generate(ast);
          //   使用with语法改变作用域为this  之后调用render函数可以使用call改变this 方便code里面的变量取值
          let renderFn = new Function(`with(this){return ${code}}`);
          return renderFn;
        }

    </div>

    *   `vue-loader`中处理`template`属性主要靠的是`vue-template-compiler`模块

    ```js

        const VueTemplateCompiler = require('vue-template-compiler');
        const {render} = VueTemplateCompiler.compile("<div id="hello">{{msg}}</div>");
        console.log(render.toString())

    </div>

###  生命周期钩子是如何实现的

*   核心点考察的是：`Vue`的生命周期钩子就是回调函数而已，当创建组件实例的过程中会调用对应的钩子方法
*   核心点答出来了也可以在进行补充回答：内部主要是使用`callHook`方法来调用对应的方法。核心是一个发布订阅模式，将钩子订阅好（内部采用数组的方式存储），在对应的阶段进行发布

```js

    export function callHook(vm, hook) {
      // 依次执行生命周期对应的方法
      const handlers = vm.$options[hook];
      if (handlers) {
        for (let i = 0; i < handlers.length; i++) {
          handlers[i].call(vm); //生命周期里面的this指向当前实例
        }
      }
    }

    // 调用的时候
    Vue.prototype._init = function (options) {
      const vm = this;
      vm.$options = mergeOptions(vm.constructor.options, options);
      callHook(vm, "beforeCreate"); //初始化数据之前
      // 初始化状态
      initState(vm);
      callHook(vm, "created"); //初始化数据之后
      if (vm.$options.el) {
        vm.$mount(vm.$options.el);
      }
    };

    // 销毁实例实现
    Vue.prototype.$destory = function() {
    	 // 触发钩子
        callHook(vm, 'beforeDestory')
        // 自身及子节点
        remove() 
        // 删除依赖
        watcher.teardown() 
        // 删除监听
        vm.$off() 
        // 触发钩子
        callHook(vm, 'destoryed')
    }
```

###  Vue.mixin的使用场景和原理

*   核心点考察的是：`Vue.mixin`的作用就是抽离公共的业务逻辑，原理类似“对象的继承”，当组件初始化时会调用`mergeOptions`方法进行合并，采用策略模式针对不同的属性进行合并。如果混入的数据和本身组件中的数据冲突，会采用“就近原则”以组件的数据为准
*   核心点答出来了也可以在进行补充回答：`mixin`中有很多缺陷 "命名冲突问题"、"依赖问题"、"数据来源问题",这里强调一下`mixin`的数据是不会被共享的

###  nextTick在哪里使用?原理是

*   核心点考察的是：`nextTick`中的回调是在下次 `DOM` 更新循环结束之后执行的延迟回调。在修改数据之后立即使用这个方法，获取更新后的 `DOM`。原理就是异步方法(`promise`,`mutationObserver`,`setImmediate`,`setTimeout`)经常与事件环一起来问(宏任务和微任务)
*   核心点答出来了也可以在进行补充回答：`vue`多次更新数据，最终会进行批处理更新。内部调用的就是`nextTick`实现了延迟更新，用户自定义的`nextTick`中的回调会被延迟到更新完成后调用，从而可以获取更新后的`DOM`

###  Vue为什么需要虚拟DOM

*   核心点考察的是：`Virtual DOM`就是用`js`对象来描述真实`DOM`，是对真实`DOM`的抽象，由于直接操作`DOM`性能低但是`js`层的操作效率高，可以将`DOM`操作转化成对象操作，最终通过`diff`算法比对差异进行更新`DOM`（减少了对真实`DOM`的操作）。虚拟`DOM`不依赖真实平台环境从而也可以实现跨平台。
*   核心点答出来了也可以在进行补充回答：虚拟`DOM`的实现就是普通对象包含`tag`、`attrs`、`children`等属性对真实节点的描述。（本质上就是在`JS`和`DOM`之间的一个缓存）

###  Vue中的diff原理

> 核心点考察的是：`Vue`的`diff`算法是平级比较，不考虑跨级比较的情况。内部采用`深度递归的方式 + 双指针`的方式进行比较

**比较过程**

1.  先比较是否是相同节点
2.  相同节点比较属性,并复用老节点
3.  比较儿子节点，考虑老节点和新节点儿子的情况
4.  优化比较：`头头`、`尾尾`、`头尾`、`尾头`
5.  比对查找进行复用

`Vue3`中采用最长递增子序列实现`diff`算法

###  Vue中computed和watch的区别

*   核心点考察的是：`computed`和`watch`都是基于`Watcher`来实现的，分别是计算属性`watcher`和用户`watcher`。`computed`属性是具备缓存的，依赖的值不发生变化，对其取值时计算属性方法不会重新执行（可以用模板渲染，取值的过程中不支持异步方法）`watch`则是监控值的变化，当值发生变化时调用对应的回调函数
*   核心点答出来了也可以在进行补充回答：`computed`不会立即执行，内部通过`defineProperty`进行定义。并且通过`dirty`属性来检测依赖的数据是否发生变化。`watch`则是立即执行将老值保存在`watcher`上，当数据更新时重新计算新值，将新值和老值传递到回调函数中

###  Vue.set方法是如何实现的

> 核心点考察的是：为什么`$set`可以触发更新,我们给对象和数组本身都增加了`dep`属性。当给对象新增不存在的属性则触发对象依赖的`watcher`去更新，当修改数组索引时我们调用数组本身的`splice`方法去更新数组

```js

    export function set (target: Array | Object, key: any, val: any): any {
      // 1.是开发环境 target 没定义或者是基础类型则报错
      if (process.env.NODE_ENV !== 'production' &&
          (isUndef(target) || isPrimitive(target))
      ) {
          warn(`Cannot set reactive property on undefined, null, or primitive value: ${(target: any)}`)
      }
      // 2.如果是数组 Vue.set(array,1,100); 调用我们重写的splice方法 (这样可以更新视图)
      if (Array.isArray(target) && isValidArrayIndex(key)) {
          target.length = Math.max(target.length, key)
          target.splice(key, 1, val)
          return val
      }
      // 3.如果是对象本身的属性，则直接添加即可
      if (key in target && !(key in Object.prototype)) {
          target[key] = val
          return val
      }
      const ob = (target: any).__ob__
      // 4.如果是Vue实例 或 根数据data时 报错
      if (target._isVue || (ob && ob.vmCount)) {
          process.env.NODE_ENV !== 'production' && warn(
          'Avoid adding reactive properties to a Vue instance or its root $data ' +
          'at runtime - declare it upfront in the data option.'
          )
          return val
      }
      // 5.如果不是响应式的也不需要将其定义成响应式属性
      if (!ob) {
          target[key] = val
          return val
      }
      // 6.将属性定义成响应式的
      defineReactive(ob.value, key, val)
      // 7.通知视图更新
      ob.dep.notify()
      return val
    }
```

###  Vue.use是干什么的?原理是什么

> 核心点考察的是：`Vue.use`是用来使用插件的，我们可以在插件中扩展全局组件、指令、原型方法等

```js

    Vue.use = function (plugin: Function | Object) {
      // 插件不能重复的加载
      const installedPlugins = (this._installedPlugins || (this._installedPlugins = []))
      if (installedPlugins.indexOf(plugin) > -1) {
          return this
      }
      // additional parameters
      const args = toArray(arguments, 1)
      args.unshift(this)  // install方法的第一个参数是Vue的构造函数，其他参数是Vue.use中除了第一个参数的其他参数
      if (typeof plugin.install === 'function') { // 调用插件的install方法
          plugin.install.apply(plugin, args)  Vue.install = function(Vue,args){}
      } else if (typeof plugin === 'function') { // 插件本身是一个函数，直接让函数执行
          plugin.apply(null, args) 
      }
      installedPlugins.push(plugin) // 缓存插件
      return this
    }
```

###  vue-router有几种钩子函数?具体是什么及执行流程是怎样的

> 核心点考察的是：路由钩子的执行流程, 钩子函数种类有: `全局守卫`、`路由守卫`、`组件守卫`

**完整的导航解析流程**

1.  导航被触发
2.  在失活的组件里调用 `beforeRouteLeave` 守卫
3.  调用全局的 `beforeEach` 守卫
4.  在重用的组件里调用 `beforeRouteUpdate` 守卫 (`2.2+)`
5.  在路由配置里调用 `beforeEnter`
6.  解析异步路由组件
7.  在被激活的组件里调用 `beforeRouteEnter`
8.  调用全局的 `beforeResolve` 守卫 (`2.5+`)
9.  导航被确认
10.  调用全局的 `afterEach` 钩子
11.  触发 `DOM` 更新
12.  调用 `beforeRouteEnter` 守卫中传给 `next` 的回调函数，创建好的组件实例会作为回调函数的参数传入
