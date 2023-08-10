---
title: 6 React模块
---

##  0 如何理解React State不可变性的原则

在 React 中，不可变性是指数据一旦被创建，就不能被修改。React 推崇使用不可变数据的原则，这意味着在更新数据时，应该创建新的数据对象而不是直接修改现有的数据。

**以下是理解 React 中不可变性原则的几个关键点：**

1.  **数据一旦创建就不能被修改**：在 React 中，组件的状态（state）和属性（props）应该被视为不可变的。一旦创建了状态或属性对象，就不应该直接修改它们的值。这样可以确保组件的数据在更新时是不可变的，从而避免意外的数据改变和副作用。
2.  **创建新的数据对象**：当需要更新状态或属性时，应该创建新的数据对象。这可以通过使用对象展开运算符、数组的 `concat()`、`slice()` 等方法，或者使用不可变数据库（如 `Immutable.js`、`Immer` 等）来创建新的数据副本。
3.  **比较数据变化**：React 使用 `Virtual DOM` 来比较前后两个状态树的差异，并仅更新需要更新的部分。通过使用不可变数据，React 可以更高效地进行比较，因为它可以简单地比较对象引用是否相等，而不必逐个比较对象的属性。
4.  **性能优化**：使用不可变数据可以带来性能上的优势。由于 React 可以更轻松地比较前后状态的差异，可以减少不必要的重新渲染和组件更新，提高应用的性能和响应性。

**不可变性的原则在 React 中有以下好处：**

*   **简化数据变更追踪**：由于数据不可变，可以更轻松地追踪数据的变化。这样可以更好地理解代码的行为和数据的流动。
*   **避免副作用**：可变数据容易引发副作用和难以追踪的 bug。通过使用不可变数据，可以避免许多与副作用相关的问题。
*   **方便的历史记录和回滚**：不可变数据使得记录和回滚应用状态的历史变得更容易。可以在不改变原始数据的情况下，创建和保存不同时间点的数据快照。

##  1 JSX本质

*   `React.createElement` 即`h`函数，返回`vnode`
    *   **createElement 与 cloneElement 的区别是什么**
        *   `createElement`函数是`JSX`编译之后使用的创建`React Element`的函数
        *   而`cloneElement`则是用于复制某个元素并传入新的`Props`
*   第一个参数，可能是组件，也可能是`html tag`
*   组件名，首字母必须是大写（`React`规定）

```js

    React.createElement(
      type,
      [props],
      [...children]
    )
    // - 第一个参数是必填，传入的是似HTML标签名称，eg: ul, li
    // - 第二个参数是选填，表示的是属性，eg: className
    // - 第三个参数是选填, 子节点，eg: 要显示的文本内容
```

```js

    // React.createElement写法
    React.createElement('tag', null, [child1,child2])
    React.createElement('tag', props, child1,child2,child3)
    React.createElement(Comp, props, child1,child2,'文本节点')
```

```jsx

    // jsx基本用法
    <div className="container">
      <p>tet</p>
      <img src={imgSrc} />
    </div>

    // 编译后 https://babeljs.io/repl
    React.createElement(
      "div",
      {
        className: "container"
      },
      React.createElement("p", null, "tet"),
      React.createElement("img", {
        src: imgSrc
      })
    );
```

```jsx

    // jsx style
    const styleData = {fontSize:'20px',color:'#f00'}
    const styleElem = <p style={styleData}>设置style</p>

    // 编译后
    const styleData = {
      fontSize: "20px",
      color: "#f00"
    };
    const styleElem = React.createElement(
      "p",
      {
        style: styleData
      },
      "\u8BBE\u7F6Estyle"
    );
```

```jsx

    // jsx加载组件
    const app = <div>
        <Input submitTitle={onSubmitTitle} />
        <List list={list} />
    </div>

    // 编译后
    const app = React.createElement(
      "div",
      null,
      React.createElement(Input, {
        submitTitle: onSubmitTitle
      }),
      React.createElement(List, {
        list: list
      })
    );
```

```jsx

    // jsx事件
    const eventList = <p onClick={this.clickHandler}>text</p>

    // 编译后
    const eventList = React.createElement(
      "p",
      {
        onClick: (void 0).clickHandler
      },
      "text"
    );
```

```js

    // jsx列表
    const listElem = <ul>
    {
      this.state.list.map((item,index)=>{
        return <li key={index}>index:{index},title:{item.title}</li>
      })
     }
    </ul>

    // 编译后

    const listElem = React.createElement(
      "ul",
      null,
      (void 0).state.list.map((item, index) => {
        return React.createElement(
          "li",
          {
            key: index
          },
          "index:",
          index,
          ",title:",
          item.title
        );
      })
    );
```

##  2 React合成事件机制

*   `React16`事件绑定到`document`上
*   `React17`事件绑定到`root`组件上，有利于多个`react`版本共存，例如微前端
*   `event`不是原生的，是`SyntheticEvent`合成事件对象
*   和`Vue`不同，和`DOM`事件也不同

> 为了解决跨浏览器兼容性问题，`React` 会将浏览器原生事件（`Browser Native Event`）封装为合成事件（`SyntheticEvent`）传入设置的事件处理器中。这里的合成事件提供了与原生事件相同的接口，不过它们屏蔽了底层浏览器的细节差异，保证了行为的一致性。另外有意思的是，`React` 并没有直接将事件附着到子元素上，而是以单一事件监听器的方式将所有的事件发送到顶层进行处理。这样 `React` 在更新 `DOM` 的时候就不需要考虑如何去处理附着在 `DOM` 上的事件监听器，最终达到优化性能的目的

![](https://s.poetries.work/uploads/2023/02/2ed64c281a747078.png)

**合成事件图示**

![](https://s.poetries.work/uploads/2023/02/bd7cd8acbb3cfd85.png)

**为何需要合成事件**

*   更好的兼容性和跨平台，如`react native`
*   挂载到`document`或`root`上，减少内存消耗，避免频繁解绑
*   方便事件的统一管理（如事务机制）

```js

    // 事件的基本使用
    import React from 'react'

    class EventDemo extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                name: 'zhangsan',
                list: [
                    {
                        id: 'id-1',
                        title: '标题1'
                    },
                    {
                        id: 'id-2',
                        title: '标题2'
                    },
                    {
                        id: 'id-3',
                        title: '标题3'
                    }
                ]
            }

            // 修改方法的 this 指向
            this.clickHandler1 = this.clickHandler1.bind(this)
        }
        render() {
            // // this - 使用 bind
            // return <p onClick={this.clickHandler1}>
            //     {this.state.name}
            // </p>

            // // this - 使用静态方法
            // return <p onClick={this.clickHandler2}>
            //     clickHandler2 {this.state.name}
            // </p>

            // // event
            // return <a href="https://test.com/" onClick={this.clickHandler3}>
            //     click me
            // </a>

            // 传递参数 - 用 bind(this, a, b)
            return <ul>{this.state.list.map((item, index) => {
                return <li key={item.id} onClick={this.clickHandler4.bind(this, item.id, item.title)}>
                    index {index}; title {item.title}
                </li>
            })}</ul>
        }
        clickHandler1() {
            // console.log('this....', this) // this 默认是 undefined
            this.setState({
                name: 'lisi'
            })
        }
        // 静态方法，this 指向当前实例
        clickHandler2 = () => {
            this.setState({
                name: 'lisi'
            })
        }
        // 获取 event
        clickHandler3 = (event) => {
            event.preventDefault() // 阻止默认行为
            event.stopPropagation() // 阻止冒泡
            console.log('target', event.target) // 指向当前元素，即当前元素触发
            console.log('current target', event.currentTarget) // 指向当前元素，假象！！！

            // 注意，event 其实是 React 封装的。可以看 __proto__.constructor 是 SyntheticEvent 组合事件
            console.log('event', event) // 不是原生的 Event ，原生的 MouseEvent
            console.log('event.__proto__.constructor', event.__proto__.constructor)

            // 原生 event 如下。其 __proto__.constructor 是 MouseEvent
            console.log('nativeEvent', event.nativeEvent)
            console.log('nativeEvent target', event.nativeEvent.target)  // 指向当前元素，即当前元素触发
            console.log('nativeEvent current target', event.nativeEvent.currentTarget) // 指向 document ！！！

            // 1\. event 是 SyntheticEvent ，模拟出来 DOM 事件所有能力
            // 2\. event.nativeEvent 是原生事件对象
            // 3\. 所有的事件，都被挂载到 document 上
            // 4\. 和 DOM 事件不一样，和 Vue 事件也不一样
        }
        // 传递参数
        clickHandler4(id, title, event) {
            console.log(id, title)
            console.log('event', event) // 最后追加一个参数，即可接收 event
        }
    }
```

##  3 setState和batchUpdate机制

*   `setState`在`react`事件、生命周期中是异步的（在`react`上下文中是异步）；在`setTimeout`、自定义`DOM`事件中是同步的
*   有时合并（对象形式`setState({})` => 通过`Object.assign`形式合并对象），有时不合并（函数形式`setState((prevState,nextState)=>{})`）

###  setState主流程

*   `setState`是否是异步还是同步，看是否能命中`batchUpdate`机制，判断`isBatchingUpdates`
*   哪些能命中`batchUpdate`机制
    *   生命周期
    *   `react`中注册的事件和它调用的函数
    *   总之在`react`的上下文中
*   哪些不能命中`batchUpdate`机制
    *   `setTimeout`、`setInterval`等
    *   自定义`DOM`事件
    *   总之不在`react`的上下文中，`react`管不到的

![](https://s.poetries.work/uploads/2023/02/1ede1982d9eb5a45.png)

###  batchUpdate机制

![](https://s.poetries.work/uploads/2023/02/7bb96642c305b9d6.png) ![](https://s.poetries.work/uploads/2023/02/e0e5828f54c4d6a1.png)

```js

    // setState batchUpdate原理模拟
    let isBatchingUpdate = true;

    let queue = [];
    let state = {number:0};
    function setState(newSate){
      //state={...state,...newSate}
      // setState异步更新
      if(isBatchingUpdate){
        queue.push(newSate);
      }else{
        // setState同步更新
        state={...state,...newSate}
      }   
    }

    // react事件是合成事件，在合成事件中isBatchingUpdate需要设置为true
    // 模拟react中事件点击
    function handleClick(){
      isBatchingUpdate=true; // 批量更新标志

      /**我们自己逻辑开始 */
      setState({number:state.number+1});
      setState({number:state.number+1});
      console.log(state); // 0
      setState({number:state.number+1});
      console.log(state); // 0
      /**我们自己逻辑结束 */

      state= queue.reduce((newState,action)=>{
        return {...newState,...action}
      },state); 

      isBatchingUpdate=false; // 执行结束设置false
    }
    handleClick();
    console.log(state); // 1
```

###  transaction事务机制

![](https://s.poetries.work/uploads/2023/02/4b2c232c6b39d3ac.png) ![](https://s.poetries.work/uploads/2023/02/5a0b0ab821739984.png) ![](https://s.poetries.work/uploads/2023/02/ad98ab68ffa45716.png)

```js

    // setState现象演示

    import React from 'react'

    // 默认没有 state
    class StateDemo extends React.Component {
        constructor(props) {
            super(props)

            // 第一，state 要在构造函数中定义
            this.state = {
                count: 0
            }
        }
        render() {
            return <div>
                <p>{this.state.count}</p>
                <button onClick={this.increase}>累加</button>
            </div>
        }
        increase = () => {
            // // 第二，不要直接修改 state ，使用不可变值 ----------------------------
            // // this.state.count++ // 错误
            // this.setState({
            //     count: this.state.count + 1 // SCU
            // })
            // 操作数组、对象的的常用形式

            // 第三，setState 可能是异步更新（有可能是同步更新） ----------------------------

            // this.setState({
            //     count: this.state.count + 1
            // }, () => {
            //     // 联想 Vue $nextTick - DOM
            //     console.log('count by callback', this.state.count) // 回调函数中可以拿到最新的 state
            // })
            // console.log('count', this.state.count) // 异步的，拿不到最新值

            // // setTimeout 中 setState 是同步的
            // setTimeout(() => {
            //     this.setState({
            //         count: this.state.count + 1
            //     })
            //     console.log('count in setTimeout', this.state.count)
            // }, 0)

            // 自己定义的 DOM 事件，setState 是同步的。再 componentDidMount 中

            // 第四，state 异步更新的话，更新前会被合并 ----------------------------

            // 传入对象，会被合并（类似 Object.assign ）。执行结果只一次 +1
            // this.setState({
            //     count: this.state.count + 1
            // })
            // this.setState({
            //     count: this.state.count + 1
            // })
            // this.setState({
            //     count: this.state.count + 1
            // })

            // 传入函数，不会被合并。执行结果是 +3
            this.setState((prevState, props) => {
                return {
                    count: prevState.count + 1
                }
            })
            this.setState((prevState, props) => {
                return {
                    count: prevState.count + 1
                }
            })
            this.setState((prevState, props) => {
                return {
                    count: prevState.count + 1
                }
            })
        }
        // bodyClickHandler = () => {
        //     this.setState({
        //         count: this.state.count + 1
        //     })
        //     console.log('count in body event', this.state.count)
        // }
        // componentDidMount() {
        //     // 自己定义的 DOM 事件，setState 是同步的
        //     document.body.addEventListener('click', this.bodyClickHandler)
        // }
        // componentWillUnmount() {
        //     // 及时销毁自定义 DOM 事件
        //     document.body.removeEventListener('click', this.bodyClickHandler)
        //     // clearTimeout
        // }
    }

    export default StateDemo

    // -------------------------- 我是分割线 -----------------------------

    // 不可变值（函数式编程，纯函数） - 数组
    // const list5Copy = this.state.list5.slice()
    // list5Copy.splice(2, 0, 'a') // 中间插入/删除
    // this.setState({
    //     list1: this.state.list1.concat(100), // 追加
    //     list2: [...this.state.list2, 100], // 追加
    //     list3: this.state.list3.slice(0, 3), // 截取
    //     list4: this.state.list4.filter(item => item > 100), // 筛选
    //     list5: list5Copy // 其他操作
    // })
    // // 注意，不能直接对 this.state.list 进行 push pop splice 等，这样违反不可变值

    // 不可变值 - 对象
    // this.setState({
    //     obj1: Object.assign({}, this.state.obj1, {a: 100}),
    //     obj2: {...this.state.obj2, a: 100}
    // })
    // // 注意，不能直接对 this.state.obj 进行属性设置，这样违反不可变值
```

```js

    // setState笔试题考察 下面这道题输出什么
    class Example extends React.Component {
      constructor() {
      super()
      this.state = {
        val: 0
      }
    }
    // componentDidMount中isBatchingUpdate=true setState批量更新
    componentDidMount() {
      // setState传入对象会合并，后面覆盖前面的Object.assign({})
      this.setState({ val: this.state.val + 1 }) // 添加到queue队列中，等待处理 
      console.log(this.state.val)
      // 第 1 次 log
      this.setState({ val: this.state.val + 1 }) // 添加到queue队列中，等待处理
      console.log(this.state.val)
      // 第 2 次 log
      setTimeout(() => {
        // 到这里this.state.val结果等于1了
        // 在原生事件和setTimeout中（isBatchingUpdate=false），setState同步更新，可以马上获取更新后的值
        this.setState({ val: this.state.val + 1 }) // 同步更新
        console.log(this.state.val)
        // 第 3 次 log
        this.setState({ val: this.state.val + 1 }) // 同步更新
        console.log(this.state.val)
        // 第 4 次 log
        }, 0)
      }
      render() {
        return null
      }
    }

    // 答案：0, 0, 2, 3
```

**注意**

> 在`React 18`之前，`setState`在`React`的合成事件中是合并更新的，在`setTimeout`的原生事件中是同步按序更新的。例如

```js

    handleClick = () => {
      this.setState({ age: this.state.age + 1 });
      console.log(this.state.age); // 0
      this.setState({ age: this.state.age + 1 });
      console.log(this.state.age); // 0
      this.setState({ age: this.state.age + 1 });
      console.log(this.state.age); // 0
      setTimeout(() => {
        this.setState({ age: this.state.age + 1 });
        console.log(this.state.age); // 2
        this.setState({ age: this.state.age + 1 });
        console.log(this.state.age); // 3
      });
    };
```

> 而在`React 18`中，不论是在合成事件中，还是在宏任务中，都是会合并更新

```js

    function handleClick() {
      setState({ age: state.age + 1 }, onePriority);
      console.log(state.age);// 0
      setState({ age: state.age + 1 }, onePriority);
      console.log(state.age); // 0
      setTimeout(() => {
        setState({ age: state.age + 1 }, towPriority);
        console.log(state.age); // 1
        setState({ age: state.age + 1 }, towPriority);
        console.log(state.age); // 1
      });
    }
```

###  传入 setState 函数的第二个参数的作用是什么

> 该函数会在 `setState` 函数调用完成并且组件开始重渲染的时候被调用，我们可以用该函数来监听渲染是否完成：

```js

    this.setState(
      { username: 'test' },
      () => console.log('setState has finished and the component has re-rendered.')
    )
```

```js

    this.setState((prevState, props) => {
      return {
        streak: prevState.streak + props.count
      }
    })
```

###  调用 setState 之后发生了什么

> 在代码中调用 `setState` 函数之后，`React` 会将传入的参数与之前的状态进行合并，然后触发所谓的调和过程（`Reconciliation`）。经过调和过程，`React` 会以相对高效的方式根据新的状态构建 `React` 元素树并且着手重新渲染整个 `UI` 界面。在 `React` 得到元素树之后，`React` 会计算出新的树和老的树之间的差异，然后根据差异对界面进行最小化重新渲染。通过 `diff` 算法，`React` 能够精确制导哪些位置发生了改变以及应该如何改变，这就保证了按需更新，而不是全部重新渲染。

*   在 `setState` 的时候，`React` 会为当前节点创建一个 `updateQueue` 的更新列队。
*   然后会触发 `reconciliation` 过程，在这个过程中，会使用名为 `Fiber` 的调度算法，开始生成新的 `Fiber` 树， `Fiber` 算法的最大特点是可以做到异步可中断的执行。
*   然后 `React Scheduler` 会根据优先级高低，先执行优先级高的节点，具体是执行 `doWork` 方法。
*   在 `doWork` 方法中，`React` 会执行一遍 `updateQueue` 中的方法，以获得新的节点。然后对比新旧节点，为老节点打上 更新、插入、替换 等 `Tag`。
*   当前节点 `doWork` 完成后，会执行 `performUnitOfWork` 方法获得新节点，然后再重复上面的过程。
*   当所有节点都 `doWork` 完成后，会触发 `commitRoot` 方法，`React` 进入 `commit` 阶段。
*   在 `commit` 阶段中，`React` 会根据前面为各个节点打的 `Tag`，一次性更新整个 `dom` 元素

###  setState总结

**setState到底是异步还是同步** 有时表现出异步,有时表现出同步

*   `setState`只在合成事件和钩子函数中是“异步”的，在原生事件和`setTimeout` 中都是同步的
*   `setState` 的“异步”并不是说内部由异步代码实现，其实本身执行的过程和代码都是同步的，只是合成事件和钩子函数的调用顺序在更新之前，导致在合成事件和钩子函数中没法立马拿到更新后的值，形成了所谓的“异步”，当然可以通过第二个参数`setState(partialState, callback)`中的`callback`拿到更新后的结果
*   `setState` 的批量更新优化也是建立在“异步”（合成事件、钩子函数）之上的，在原生事件和`setTimeout` 中不会批量更新，在“异步”中如果对同一个值进行多次`setState`，`setState`的批量更新策略会对其进行覆盖，取最后一次的执行，如果是同时`setState`多个不同的值，在更新时会对其进行合并批量更新

> **事务 (Transaction)** 是 `React` 中的一个调用结构，用于包装一个方法，结构为: `initialize - perform(method) - close`。通过事务，可以统一管理一个方法的开始与结束；处于事务流中，表示进程正在执行一些操作

`setState`: `React` 中用于修改状态，更新视图。它具有以下特点:

*   **异步与同步:** `setState`并不是单纯的异步或同步，这其实与调用时的环境相关:
*   在**合成事件** 和 **生命周期钩子**(除 `componentDidUpdate)` 中，`setState`是"异步"的；
    *   原因: 因为在`setState`的实现中，有一个判断: 当更新策略正在事务流的执行中时，该组件更新会被推入`dirtyComponents`队列中等待执行；否则，开始执行`batchedUpdates`队列更新；
        *   在生命周期钩子调用中，更新策略都处于更新之前，组件仍处于事务流中，而`componentDidUpdate`是在更新之后，此时组件已经不在事务流中了，因此则会同步执行；
        *   在合成事件中，`React` 是基于 事务流完成的事件委托机制 实现，也是处于事务流中；
    *   问题: 无法在`setState`后马上从`this.state`上获取更新后的值。
    *   解决: 如果需要马上同步去获取新值，`setState`其实是可以传入第二个参数的。`setState(updater, callback)`，在回调中即可获取最新值；
*   在 **原生事件** 和 `setTimeout` 中，`setState`是同步的，可以马上获取更新后的值；
    *   原因: 原生事件是浏览器本身的实现，与事务流无关，自然是同步；而setTimeout是放置于定时器线程中延后执行，此时事务流已结束，因此也是同步；
*   **批量更新**: 在 合成事件 和 生命周期钩子 中，`setState`更新队列时，存储的是 合并状态(`Object.assign`)。因此前面设置的 `key` 值会被后面所覆盖，最终只会执行一次更新；
*   **函数式**: 由于 `Fiber` 及 合并 的问题，官方推荐可以传入 函数 的形式。`setState(fn)`，在`fn`中返回新的`state`对象即可，例如`this.setState((state, props) => newState)`；
    *   使用函数式，可以用于避免`setState`的批量更新的逻辑，传入的函数将会被 顺序调用；

**注意事项:**

*   `setState` 合并，在 合成事件 和 生命周期钩子 中多次连续调用会被优化为一次；
*   当组件已被销毁，如果再次调用`setState`，`React` 会报错警告，通常有两种解决办法
    *   将数据挂载到外部，通过 `props` 传入，如放到 `Redux` 或 父级中；
    *   在组件内部维护一个状态量 (`isUnmounted`)，`componentWillUnmount`中标记为 `true`，在`setState`前进行判断；

##  4 组件渲染和更新过程

*   `JSX`如何渲染为页面
*   `setState`之后如何更新页面
*   面试考察全流程

**组件的本质**

*   组件指的是页面的一部分，本质就是一个类，最本质就是一个构造函数
*   类编译成构造函数

**1.组件渲染过程**

*   分析
    *   `props`、`state` 变化
    *   `render()`生成`vnode`
    *   `patch(elem, vnode)` 渲染到页面上（`react`并一定用`patch`）
*   渲染过程
    *   `setState(newState)` => `newState`存入`pending`队列，判断是否处于`batchUpdate`状态，保存组件于`dirtyComponents`中（可能有子组件） ![](https://s.poetries.work/uploads/2023/02/1ede1982d9eb5a45.png)
    *   遍历所有的`dirtyComponents`调用`updateComponent`生成`newVnode`
    *   `patch(vnode,newVnode)` **2.组件更新过程**
*   `patch`更新被分为两个阶段
    *   **reconciliation阶段**：执行`diff`算法，纯`JS`计算
    *   **commit阶段**：将`diff`结果渲染到`DOM`中
*   如果不拆分，可能有性能问题
    *   `JS`是单线程的，且和`DOM`渲染共用一个线程
    *   当组件足够复杂，组件更新时计算和渲染都压力大
    *   同时再有`DOM`操作需求（动画、鼠标拖拽等）将卡顿
*   **解决方案Fiber**
    *   `reconciliation`阶段拆分为多个子任务
    *   `DOM`需要渲染时更新，空闲时恢复在执行计算
    *   通过`window.requestIdleCallback`来判断浏览器是否空闲

##  5 Diff算法相关

###  为什么虚拟dom会提高性能

> 虚拟`dom`相当于在`js`和真实`dom`中间加了一个缓存，利用`dom diff`算法避免了没有必要的`dom`操作，从而提高性能

![](https://s.poetries.work/uploads/2022/07/c45a9231feb35759.png)

> 首先说说为什么要使用`Virturl DOM`，因为操作真实`DOM`的耗费的性能代价太高，所以`react`内部使用`js`实现了一套dom结构，在每次操作在和真实dom之前，使用实现好的`diff`算法，对虚拟`dom`进行比较，递归找出有变化的`dom`节点，然后对其进行更新操作。为了实现虚拟`DOM`，我们需要把每一种节点类型抽象成对象，每一种节点类型有自己的属性，也就是`prop`，每次进行`diff`的时候，`react`会先比较该节点类型，假如节点类型不一样，那么`react`会直接删除该节点，然后直接创建新的节点插入到其中，假如节点类型一样，那么会比较`prop`是否有更新，假如有`prop`不一样，那么`react`会判定该节点有更新，那么重渲染该节点，然后在对其子节点进行比较，一层一层往下，直到没有子节点

**具体实现步骤如下**

*   用 `JavaScript` 对象结构表示 `DOM` 树的结构；然后用这个树构建一个真正的 `DOM` 树，插到文档当中
*   当状态变更的时候，重新构造一棵新的对象树。然后用新的树和旧的树进行比较，记录两棵树差异
*   把记录的差异应用到真正的`DOM`树上，视图就更新

**虚拟DOM一定会提高性能吗？**

> 很多人认为虚拟`DOM`一定会提高性能，一定会更快，其实这个说法有点片面，因为虚拟`DOM`虽然会减少`DOM`操作，但也无法避免`DOM`操作

*   它的优势是在于`diff`算法和批量处理策略,将所有的`DOM`操作搜集起来，一次性去改变真实的`DOM`,但在首次渲染上，虚拟`DOM`会多了一层计算，消耗一些性能，所以有可能会比`html`渲染的要慢
*   注意，虚拟`DOM`实际上是给我们找了一条最短，最近的路径，并不是说比`DOM`操作的更快，而是路径最简单

###  react 的渲染过程中，兄弟节点之间是怎么处理的？也就是key值不一样的时候

> 通常我们输出节点的时候都是map一个数组然后返回一个`ReactNode`，为了方便`react`内部进行优化，我们必须给每一个`reactNode`添加`key`，这个`key prop`在设计值处不是给开发者用的，而是给`react`用的，大概的作用就是给每一个`reactNode`添加一个身份标识，方便`react`进行识别，在重渲染过程中，如果`key`一样，若组件属性有所变化，则`react`只更新组件对应的属性；没有变化则不更新，如果`key`不一样，则`react`先销毁该组件，然后重新创建该组件

###  diff算法

> 我们知道`React`会维护两个虚拟`DOM`，那么是如何来比较，如何来判断，做出最优的解呢？这就用到了`diff`算法

![](https://s.poetries.work/images/20210307225249.png)

**diff算法的作用**

计算出`Virtual DOM`中真正变化的部分，并只针对该部分进行原生`DOM`操作，而非重新渲染整个页面。

**传统diff算法**

> 通过循环递归对节点进行依次对比，算法复杂度达到 `O(n^3)` ，`n`是树的节点数，这个有多可怕呢？——如果要展示`1000`个节点，得执行上亿次比较。即便是`CPU`快能执行`30`亿条命令，也很难在一秒内计算出差异。

![](https://s.poetries.work/uploads/2022/07/af5492478b123261.png)

*   把树形结构按照层级分解，只比较同级元素。
*   给列表结构的每个单元添加唯一的`key`属性，方便比较。
*   `React` 只会匹配相同 `class` 的 `component`（这里面的`class`指的是组件的名字）
*   合并操作，调用 `component` 的 `setState` 方法的时候, `React` 将其标记为 - `dirty`.到每一个事件循环结束, `React` 检查所有标记 `dirty`的 `component`重新绘制.
*   开发人员可以重写`shouldComponentUpdate`提高`diff`的性能

**diff策略**

> React用 三大策略 将`O(n^3)`杂度 转化为 `O(n)`复杂度

**策略一（tree diff）：**

*   Web UI中DOM节点跨层级的移动操作特别少，可以忽略不计
*   同级比较,既然DOM 节点跨层级的移动操作少到可以忽略不计，那么React通过updateDepth 对 Virtual DOM 树进行层级控制，也就是同一层，在对比的过程中，如果发现节点不在了，会完全删除不会对其他地方进行比较，这样只需要对树遍历一次就OK了

**策略二（component diff）：**

*   拥有相同类的两个组件 生成相似的树形结构，
*   拥有不同类的两个组件 生成不同的树形结构。

**策略三（element diff）：**

对于同一层级的一组子节点，通过唯一id区分。

**tree diff**

*   `React`通过`updateDepth`对`Virtual DOM`树进行层级控制。
*   对树分层比较，两棵树 只对同一层次节点 进行比较。如果该节点不存在时，则该节点及其子节点会被完全删除，不会再进一步比较。
*   只需遍历一次，就能完成整棵DOM树的比较。

![](https://s.poetries.work/images/image-20210307224725566.png)

那么问题来了，如果`DOM`节点出现了跨层级操作,`diff`会咋办呢？

> `diff`只简单考虑同层级的节点位置变换，如果是跨层级的话，只有创建节点和删除节点的操作。

![](https://s.poetries.work/images/image-20210307224829092.png)

> 如上图所示，以A为根节点的整棵树会被重新创建，而不是移动，因此 官方建议不要进行DOM节点跨层级操作，可以通过CSS隐藏、显示节点，而不是真正地移除、添加DOM节点

**component diff**

> React对不同的组件间的比较，有三种策略

1.  同一类型的两个组件，按原策略（层级比较）继续比较`Virtual DOM`树即可。
2.  同一类型的两个组件，组件A变化为组件B时，可能`Virtual DOM`没有任何变化，如果知道这点（变换的过程中，`Virtual DOM`没有改变），可节省大量计算时间，所以 用户 可以通过 `shouldComponentUpdate()` 来判断是否需要 判断计算。
3.  不同类型的组件，将一个（将被改变的）组件判断为`dirty component`（脏组件），从而替换 整个组件的所有节点。

> 注意：如果组件`D`和组件`G`的结构相似，但是 `React`判断是 不同类型的组件，则不会比较其结构，而是删除 组件`D`及其子节点，创建组件`G`及其子节点。

**element diff**

> 当节点处于同一层级时，`diff`提供三种节点操作：删除、插入、移动。

*   **插入**：组件 `C` 不在集合（`A`,`B`）中，需要插入
*   **删除**：
    *   组件 `D` 在集合（`A`,`B`,`D`）中，但`D`的节点已经更改，不能复用和更新，所以需要删除旧的 `D` ，再创建新的。
    *   组件 `D` 之前在 集合（`A`,`B`,`D`）中，但集合变成新的集合（`A`,`B`）了，`D` 就需要被删除。
*   **移动**：组件D已经在集合（`A`,`B`,`C`,`D`）里了，且集合更新时，`D`没有发生更新，只是位置改变，如新集合（`A`,`D`,`B`,`C`），`D`在第二个，无须像传统`diff`，让旧集合的第二个B和新集合的第二个`D`比较，并且删除第二个位置的`B`，再在第二个位置插入`D`，而是 （对同一层级的同组子节点） 添加唯一`key`进行区分，移动即可。

**diff的不足与待优化的地方**

尽量减少类似将最后一个节点移动到列表首部的操作，当节点数量过大或更新操作过于频繁时，会影响`React`的渲染性能

###  Diff 的瓶颈以及 React 的应对

由于 diff 操作本身会带来性能上的损耗，在 React 文档中提到过，即使最先进的算法中，将前后两棵树完全比对的算法复杂度为`O(n3)`，其中 `n` 为树中元素的数量。

如果 React 使用了该算法，那么仅仅一千个元素的页面所需要执行的计算量就是十亿的量级，这无疑是无法接受的。

为了降低算法的复杂度，React 的 `diff` 会预设三个限制：

1.  只对同级元素进行 `diff` 比对。如果一个元素节点在前后两次更新中跨越了层级，那么 `React` 不会尝试复用它
2.  两个不同类型的元素会产生出不同的树。如果元素由 `div` 变成 `p`，`React` 会销毁 `div` 及其子孙节点，并新建 `p` 及其子孙节点
3.  开发者可以通过 `key` 来暗示哪些子元素在不同的渲染下能保持稳定

###  React 中 key 的作用是什么

*   `Key`是 `React` 用于追踪哪些列表中元素被修改、被添加或者被移除的辅助标识
*   给每一个 `vnode` 的唯一 `id`，可以依靠 `key`,更准确,更快的拿到 `oldVnode` 中对应的 `vnode` 节点

```html

    <!-- 更新前 -->
    <div>
      <p key="a">a</p>
      <h3 key="b">b</he>
    </div>

    <!-- 更新后 -->
    <div>
      <h3 key="b">b</h3>
      <p key="a">a</p>
    </div>
```

*   如果没有 `key`，`React` 会认为 `div` 的第一个子节点由 `p` 变成 `h3，`第二个子节点由 `h3` 变成 `p`，则会销毁这两个节点并重新构造
*   但是当我们用 `key` 指明了节点前后对应关系后，`React` 知道 `key === "a"` 的 `p` 更新后还在，所以可以复用该节点，只需要交换顺序。
*   `key` 是 `React` 用来追踪哪些列表元素被修改、被添加或者被移除的辅助标志。
*   在开发过程中，我们需要保证某个元素的 `key` 在其同级元素中具有唯一性。在 `React diff` 算法中，`React` 会借助元素的 `Key` 值来判断该元素是新近创建的还是被移动而来的元素，从而减少不必要的元素重新渲染

###  关于Fiber

> `React Fiber` 用类似 `requestIdleCallback` 的机制来做异步 `diff`。但是之前数据结构不支持这样的实现异步 `diff`，于是 `React` 实现了一个类似链表的数据结构，将原来的 `递归diff`（不可被中断） 变成了现在的 `遍历diff`，这样就能做到异步可更新并且可以中断恢复执行

**React 的核心流程可以分为两个部分:**

*   `reconciliation` (调度算法，也可称为 `render`)
    *   更新 `state` 与 `props`；
    *   调用生命周期钩子；
    *   生成 `virtual dom`
        *   这里应该称为 `Fiber Tree` 更为符合；
    *   通过新旧 `vdom` 进行 `diff` 算法，获取 `vdom change`
    *   确定是否需要重新渲染
*   `commit`
    *   如需要，则操作 `dom` 节点更新

> 要了解 `Fiber`，我们首先来看为什么需要它

*   **问题**: 随着应用变得越来越庞大，整个更新渲染的过程开始变得吃力，大量的组件渲染会导致主进程长时间被占用，导致一些动画或高频操作出现卡顿和掉帧的情况。而关键点，便是 同步阻塞。在之前的调度算法中，React 需要实例化每个类组件，生成一颗组件树，使用 `同步递归` 的方式进行遍历渲染，而`这个过程最大的问题就是无法 暂停和恢复`。
*   **解决方案**: 解决同步阻塞的方法，通常有两种: `异步` 与 `任务分割`。而 `React Fiber` 便是为了`实现任务分割`而诞生的
*   **简述**
    *   在 `React V16` 将调度算法进行了重构， 将之前的 `stack reconciler` 重构成新版的 `fiber reconciler`，变成了具有链表和指针的 单链表树遍历算法。通过指针映射，每个单元都记录着遍历当下的上一步与下一步，从而使遍历变得可以被暂停和重启
    *   这里我理解为是一种 任务分割调度算法，主要是 将原先同步更新渲染的任务分割成一个个独立的 小任务单位，根据不同的优先级，将小任务分散到浏览器的空闲时间执行，充分利用主进程的事件循环机制
*   **核心**
    *   `Fiber` 这里可以具象为一个数据结构

```js

    class Fiber {
    	constructor(instance) {
    		this.instance = instance
    		// 指向第一个 child 节点
    		this.child = child
    		// 指向父节点
    		this.return = parent
    		// 指向第一个兄弟节点
    		this.sibling = previous
    	}	
    }
```

*   **链表树遍历算法**: 通过 `节点保存与映射`，便能够随时地进行 `停止和重启`，这样便能达到实现任务分割的基本前提
    *   首先通过不断遍历子节点，到树末尾；
    *   开始通过 `sibling` 遍历兄弟节点；
    *   return 返回父节点，继续执行2；
    *   直到 root 节点后，跳出遍历；
*   **任务分割**，React 中的渲染更新可以分成两个阶段
    *   **reconciliation 阶段**: vdom 的数据对比，是个适合拆分的阶段，比如对比一部分树后，先暂停执行个动画调用，待完成后再回来继续比对
    *   **Commit 阶段**: 将 change list 更新到 dom 上，并不适合拆分，才能保持数据与 UI 的同步。否则可能由于阻塞 UI 更新，而导致数据更新和 UI 不一致的情况
*   **分散执行:** 任务分割后，就可以把小任务单元分散到浏览器的空闲期间去排队执行，而实现的关键是两个新API: `requestIdleCallback` 与 `requestAnimationFrame`
    *   低优先级的任务交给`requestIdleCallback`处理，这是个浏览器提供的事件循环空闲期的回调函数，需要 `pollyfill`，而且拥有 `deadline` 参数，限制执行事件，以继续切分任务；
    *   高优先级的任务交给`requestAnimationFrame`处理；

```js

    // 类似于这样的方式
    requestIdleCallback((deadline) => {
        // 当有空闲时间时，我们执行一个组件渲染；
        // 把任务塞到一个个碎片时间中去；
        while ((deadline.timeRemaining() > 0 || deadline.didTimeout) && nextComponent) {
            nextComponent = performWork(nextComponent);
        }
    });
```

*   **优先级策略:** 文本框输入 > 本次调度结束需完成的任务 > 动画过渡 > 交互反馈 > 数据更新 > 不会显示但以防将来会显示的任务

> *   `Fiber` 其实可以算是一种编程思想，在其它语言中也有许多应用(`Ruby Fiber`)。
> *   核心思想是 任务拆分和协同，主动把执行权交给主线程，使主线程有时间空挡处理其他高优先级任务。
> *   当遇到进程阻塞的问题时，任务分割、异步调用 和 缓存策略 是三个显著的解决思路。

##  6 受控组件与非受控组件

###  受控组件

*   表单的值，受到`state`控制
*   需要自行监听`onChange`，更新`state`
*   对比非受控组件

```js

    import React from 'react'

    class FormDemo extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                name: 'test',
                info: '个人信息',
                city: 'shenzhen',
                flag: true,
                gender: 'male'
            }
        }
        render() {

            // 受控组件
            // return <div>
            //     <p>{this.state.name}</p>
            //     <label htmlFor="inputName">姓名：</label> {/* 用 htmlFor 代替 for */}
            //     <input id="inputName" value={this.state.name} onChange={this.onInputChange}/>
            // </div>

            // textarea - 使用 value
            return <div>
                <textarea value={this.state.info} onChange={this.onTextareaChange}/>
                <p>{this.state.info}</p>
            </div>

            // // select - 使用 value
            // return <div>
            //     <select value={this.state.city} onChange={this.onSelectChange}>
            //         <option value="beijing">北京</option>
            //         <option value="shanghai">上海</option>
            //         <option value="shenzhen">深圳</option>
            //     </select>
            //     <p>{this.state.city}</p>
            // </div>

            // // checkbox
            // return <div>
            //     <input type="checkbox" checked={this.state.flag} onChange={this.onCheckboxChange}/>
            //     <p>{this.state.flag.toString()}</p>
            // </div>

            // // radio
            // return <div>
            //     male <input type="radio" name="gender" value="male" checked={this.state.gender === 'male'} onChange={this.onRadioChange}/>
            //     female <input type="radio" name="gender" value="female" checked={this.state.gender === 'female'} onChange={this.onRadioChange}/>
            //     <p>{this.state.gender}</p>
            // </div>

            // 非受控组件 - 后面再讲
        }
        onInputChange = (e) => {
            this.setState({
                name: e.target.value
            })
        }
        onTextareaChange = (e) => {
            this.setState({
                info: e.target.value
            })
        }
        onSelectChange = (e) => {
            this.setState({
                city: e.target.value
            })
        }
        onCheckboxChange = () => {
            this.setState({
                flag: !this.state.flag
            })
        }
        onRadioChange = (e) => {
            this.setState({
                gender: e.target.value
            })
        }
    }

    export default FormDemo
```

###  非受控组件

*   `ref` 访问 `DOM`元素或者某个组件实例的句柄
    *   `ref` 有两种使用方式
        *   `React.createRef()` 创建`ref`，通过`ref`访问`DOM`元素或者某个组件实例
        *   `React.forwardRef()` 函数组件中传递`ref`，通过`ref`访问`DOM`元素或者某个组件实例
*   `ref` 有两种使用场景
    *   `defaultValue`、`defaultChecked`
    *   手动操作`DOM`元素

**使用场景**

*   必须手动操作`DOM`元素，`setState`实现不了
*   文件上传`<input type="file" />`
*   某些富文本编辑器，需要传入`DOM`元素

```js

    import React from 'react'

    class App extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                name: 'test',
                flag: true,
            }
            this.nameInputRef = React.createRef() // 创建 ref
            this.fileInputRef = React.createRef()
        }
        render() {
            // // input defaultValue
            // return <div>
            //     {/* 使用 defaultValue 而不是 value ，使用 ref */}
            //     <input defaultValue={this.state.name} ref={this.nameInputRef}/>
            //     {/* state 并不会随着改变 */}
            //     <span>state.name: {this.state.name}</span>
            //     <br/>
            //     <button onClick={this.alertName}>alert name</button>
            // </div>

            // // checkbox defaultChecked
            // return <div>
            //     <input
            //         type="checkbox"
            //         defaultChecked={this.state.flag}
            //     />
            // </div>

            // file
            return <div>
                <input type="file" ref={this.fileInputRef}/>
                <button onClick={this.alertFile}>alert file</button>
            </div>

        }
        alertName = () => {
            const elem = this.nameInputRef.current // 通过 ref 获取 DOM 节点
            alert(elem.value) // 不是 this.state.name
        }
        alertFile = () => {
            const elem = this.fileInputRef.current // 通过 ref 获取 DOM 节点
            alert(elem.files[0].name)
        }
    }

    export default App
```

##  7 组件生命周期

[点击查看各个版本的生命周期<span><span class="sr-only">(opens new window)</span></span>](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

**>=16.4**

![](https://s.poetries.work/uploads/2023/02/d10ddb1f3843e2bc.png)

###  react旧版生命周期函数

**初始化阶段**

*   `getDefaultProps`:获取实例的默认属性
*   `getInitialState`:获取每个实例的初始化状态
*   `componentWillMount`：组件即将被装载、渲染到页面上
*   `render`:组件在这里生成虚拟的`DOM`节点
*   `componentDidMount`:组件真正在被装载之后

**运行中状态**

*   `componentWillReceiveProps`:组件将要接收到属性的时候调用
    *   新版本已被废弃，设置为不安全的生命周期函数`UNSAFE_componentWillReceiveProps`
    *   当`props`改变的时候才调用，子组件第二次接收到`props`的时候
*   `shouldComponentUpdate`:组件接受到新属性或者新状态的时候（可以返回`false`，接收数据后不更新，阻止`render`调用，后面的函数不会被继续执行了）
*   `componentWillUpdate`:组件即将更新不能修改属性和状态
*   `render`:组件重新描绘
*   `componentDidUpdate`:组件已经更新

**销毁阶段**

*   `componentWillUnmount`:组件即将销毁

###  新版生命周期

> 在新版本中，`React` 官方对生命周期有了新的 变动建议:

*   使用`getDerivedStateFromProps`替换`componentWillMount；`
*   使用`getSnapshotBeforeUpdate`替换`componentWillUpdate；`
*   避免使用`componentWillReceiveProps`；

> 其实该变动的原因，正是由于上述提到的 `Fiber`。首先，从上面我们知道 `React` 可以分成 `reconciliation` 与 `commit`两个阶段，对应的生命周期如下:

**reconciliation**

*   `componentWillMount`
*   `componentWillReceiveProps`
*   `shouldComponentUpdate`
*   `componentWillUpdate`

**commit**

*   `componentDidMount`
*   `componentDidUpdate`
*   `componentWillUnmount`

> 在 `Fiber` 中，`reconciliation` 阶段进行了任务分割，涉及到 暂停 和 重启，因此可能会导致 `reconciliation` 中的生命周期函数在一次更新渲染循环中被 多次调用 的情况，产生一些意外错误

新版的建议生命周期如下:

```js

    class Component extends React.Component {
      // 替换 `componentWillReceiveProps` ，
      // 初始化和 update 时被调用
      // 静态函数，无法使用 this
      static getDerivedStateFromProps(nextProps, prevState) {}

      // 判断是否需要更新组件
      // 可以用于组件性能优化
      shouldComponentUpdate(nextProps, nextState) {}

      // 组件被挂载后触发
      componentDidMount() {}

      // 替换 componentWillUpdate
      // 可以在更新之前获取最新 dom 数据
      getSnapshotBeforeUpdate() {}

      // 组件更新后调用
      componentDidUpdate() {}

      // 组件即将销毁
      componentWillUnmount() {}

      // 组件已销毁
      componentDidUnMount() {}
    }
```

**使用建议:**

*   在`constructor`初始化 `state`；
*   在`componentDidMount`中进行事件监听，并在`componentWillUnmount`中解绑事件；
*   在`componentDidMount`中进行数据的请求，而不是在`componentWillMount`；
*   需要根据 `props` 更新 `state` 时，使用`getDerivedStateFromProps(nextProps, prevState)`；
    *   旧 `props` 需要自己存储，以便比较；

**react中这两个生命周期会触发死循环**

> `componentWillUpdate`生命周期在`shouldComponentUpdate`返回`true`后被触发。在这两个生命周期只要视图更新就会触发，因此不能再这两个生命周期中使用`setState` 否则会导致死循环

```js

    public static getDerivedStateFromProps(nextProps, prevState) {
    	// 当新 props 中的 data 发生变化时，同步更新到 state 上
    	if (nextProps.data !== prevState.data) {
    		return {
    			data: nextProps.data
    		}
    	} else {
    		return null1
    	}
    }
```

> 可以在`componentDidUpdate`监听 `props` 或者 `state` 的变化，例如:

```js

    componentDidUpdate(prevProps) {
    	// 当 id 发生变化时，重新获取数据
    	if (this.props.id !== prevProps.id) {
    		this.fetchData(this.props.id);
    	}
    }
```

*   在`componentDidUpdate`使用`setState`时，必须加条件，否则将进入死循环；
*   `getSnapshotBeforeUpdate(prevProps, prevState)`可以在更新之前获取最新的渲染数据，它的调用是在 `render` 之后， `update` 之前；
*   `shouldComponentUpdate`: 默认每次调用`setState`，一定会最终走到 `diff` 阶段，但可以通过`shouldComponentUpdate`的生命钩子返回`false`来直接阻止后面的逻辑执行，通常是用于做条件渲染，优化渲染的性能。

###  为什么有些react生命周期钩子被标记为UNSAFE

**componentWillMount**

> `componentWillMount`生命周期发生在首次渲染前，一般使用的小伙伴大多在这里初始化数据或异步获取外部数据赋值。初始化数据，`react`官方建议放在`constructor`里面。而异步获取外部数据，渲染并不会等待数据返回后再去渲染

```js

    class Example extends React.Component {   
        state = {
            value: ''
        };
        componentWillMount() {    
            this.setState({       
                value: this.props.source.value
            });       
            this.props.source.subscribe(this.handleChange);
        }   
        componentWillUnmount() {    
            this.props.source.unsubscribe(this.handleChange ); 
        }   
        handleChange = source => {    
            this.setState({
                value: source.value
            });   
        }; 
    }
```

> 试想一下，假如组件在第一次渲染的时候被中断，由于组件没有完成渲染，所以并不会执行`componentWillUnmount`生命周期（注：很多人经常认为`componentWillMount`和`componentWillUnmount`总是配对，但这并不是一定的。只有调用`componentDidMount`后，`React`才能保证稍后调用`componentWillUnmount`进行清理）。因此`handleSubscriptionChange`还是会在数据返回成功后被执行，这时候`setState`由于组件已经被移除，就会导致内存泄漏。所以建议把异步获取外部数据写在`componentDidMount`生命周期里，这样就能保证`componentWillUnmount`生命周期会在组件移除的时候被执行，避免内存泄漏的风险。

**componentWillReceiveProps**

> `componentWillReceiveProps`生命周期是在`props`更新时触发。一般用于`props`参数更新时同步更新`state`参数。但如果在`componentWillReceiveProps`生命周期直接调用父组件的某些有调用`setState`的函数，会导致程序死循环

```js

    // 如下是子组件componentWillReceiveProps里调用父组件改变state的函数示例

    class Parent extends React.Component{
        constructor(){
            super();
            this.state={
                list: [],
                selectedData: {}
            };
        }

        changeSelectData = selectedData => {
            this.setState({
                selectedData
            });
        }

        render(){
            return (
                <Clild list={this.state.list} changeSelectData={this.changeSelectData}/>
            );
        }
    }

    ...
    class Child extends React.Component{
        constructor(){
            super();
            this.state={
                list: []
            };
        }
        componentWillReceiveProps(nextProps){
            this.setState({
                list: nextProps.list
            })
            nextProps.changeSelectData(nextProps.list[0]); //默认选择第一个
        }
        ...
    }
```

*   如上代码，在`Child`组件的`componentWillReceiveProps`里直接调用`Parent`组件的`changeSelectData`去更新`Parent`组件`state`的`selectedData`值。会触发`Parent`组件重新渲染，而`Parent`组件重新渲染会触发`Child`组件的`componentWillReceiveProps`生命周期函数执行。如此就会陷入死循环。导致程序崩溃。
*   所以，`React`官方把`componentWillReceiveProps`替换为`UNSAFE_componentWillReceiveProps`，在使用这个生命周期的时候注意它会有缺陷，要注意避免，比如上面例子，`Child`在`componentWillReceiveProps`调用`changeSelectData`时先判断`list`是否有更新再确定是否要调用，就可以避免死循环。

**componentWillUpdate**

> `componentWillUpdate`生命周期在视图更新前触发。一般用于视图更新前保存一些数据方便视图更新完成后赋值

```js

    // 如下是列表加载更新后回到当前滚动条位置的案例
    class ScrollingList extends React.Component {   
        listRef = null;   
        previousScrollOffset = null;   
        componentWillUpdate(nextProps, nextState) {    
            if (this.props.list.length < nextProps.list.length) {      
                this.previousScrollOffset = this.listRef.scrollHeight - this.listRef.scrollTop;    
            } 
        }   
        componentDidUpdate(prevProps, prevState) {    
            if (this.previousScrollOffset !== null) {      
                this.listRef.scrollTop = this.listRef.scrollHeight - this.previousScrollOffset;  
                this.previousScrollOffset = null;    
            }   
        }   
        render() {    
            return (       
                `<div>` {/* ...contents... */}`</div>`     
            );   
        }   
        setListRef = ref => {    this.listRef = ref;   };
```

*   由于`componentWillUpdate`和`componentDidUpdate`这两个生命周期函数有一定的时间差（`componentWillUpdate`后经过渲染、计算、再更新`DOM`元素，最后才调用`componentDidUpdate`），如果这个时间段内用户刚好拉伸了浏览器高度，那`componentWillUpdate`计算的`previousScrollOffset`就不准确了。如果在`componentWillUpdate`进行`setState`操作，会出现多次调用只更新一次的问题，把`setState`放在`componentDidUpdate`，能保证每次更新只调用一次。
*   所以，`react`官方建议把`componentWillUpdate`替换为`UNSAFE_componentWillUpdate`。如果真的有以上案例的需求，可以使用`16.3`新加入的一个周期函数`getSnapshotBeforeUpdate`

**结论**

*   `React`意识到`componentWillMount`、`componentWillReceiveProps`和`componentWillUpdate`这三个生命周期函数有缺陷，比较容易导致崩溃。但是由于旧的项目已经在用以及有些老开发者习惯用这些生命周期函数，于是通过给它加`UNSAFE_`来提醒用它的人要注意它们的缺陷
*   `React`加入了两个新的生命周期函数`getSnapshotBeforeUpdate`和`getDerivedStateFromProps`，目的为了即使不使用这三个生命周期函数，也能实现只有这三个生命周期能实现的功能

###  在生命周期中的哪一步你应该发起 AJAX 请求

> 我们应当将AJAX 请求放到 `componentDidMount` 函数中执行，主要原因有下

*   `React` 下一代调和算法 `Fiber` 会通过开始或停止渲染的方式优化应用性能，其会影响到 `componentWillMount` 的触发次数。对于 `componentWillMount` 这个生命周期函数的调用次数会变得不确定，`React` 可能会多次频繁调用 `componentWillMount`。如果我们将 `AJAX` 请求放到 `componentWillMount` 函数中，那么显而易见其会被触发多次，自然也就不是好的选择。
*   如果我们将`AJAX` 请求放置在生命周期的其他函数中，我们并不能保证请求仅在组件挂载完毕后才会要求响应。如果我们的数据请求在组件挂载之前就完成，并且调用了`setState`函数将数据添加到组件状态中，对于未挂载的组件则会报错。而在 `componentDidMount` 函数中进行 `AJAX` 请求则能有效避免这个问题

##  8 Portal传送门

*   在以前， `react` 中所有的组件都会位于 `#app` 下，组件默认会按照既定层级嵌套渲染，而使用 `Portals` 提供了一种脱离 `#app` 的组件
*   因此 `Portals` 适合脱离文档流(`out of flow`) 的组件（让组件渲染到父组件以外），特别是 `position: absolute` 与 `position: fixed`的组件。比如模态框，通知，警告，`goTop` 等

```js

    import React from 'react'
    import ReactDOM from 'react-dom'
    import './style.css'

    class App extends React.Component {
        constructor(props) {
            super(props)
            this.state = {}
        }
        render() {
            // 正常渲染
            // return <div className="modal">
            //     {this.props.children} {/* 类似 vue slot */}
            // </div>

            // 使用 Portals 渲染到 body 上。
            // fixed 元素要放在 body 上，有更好的浏览器兼容性。
            return ReactDOM.createPortal(
                <div className="modal">{this.props.children}</div>,
                document.body // DOM 节点
            )
        }
    }

    export default App
```

```css

    /* style.css */
    .modal {
        position: fixed;
        width: 300px;
        height: 100px;
        top: 100px;
        left: 50%;
        margin-left: -150px;
        background-color: #000;
        /* opacity: .2; */
        color: #fff;
        text-align: center;
    }
```

以下是官方一个模态框的示例

```html

    <html>
      <body>
        <div id="app"></div>
        <div id="modal"></div>
        <div id="gotop"></div>
        <div id="alert"></div>
      </body>
    </html>
```

```js

    const modalRoot = document.getElementById('modal');

    class Modal extends React.Component {
      constructor(props) {
        super(props);
        this.el = document.createElement('div');
      }

      componentDidMount() {
        modalRoot.appendChild(this.el);
      }

      componentWillUnmount() {
        modalRoot.removeChild(this.el);
      }

      render() {
        return ReactDOM.createPortal(
          this.props.children,
          this.el,
        );
      }
    }
```

##  9 Context

公共信息（语言、主题）传递给每个组件，用`props`太繁琐

```js

    import React from 'react'

    // 创建 Context 填入默认值（任何一个 js 变量）
    const ThemeContext = React.createContext('light')

    // 底层组件 - 函数是组件
    function ThemeLink (props) {
        // const theme = this.context // 会报错。函数式组件没有实例，即没有 this

        // 函数式组件可以使用 Consumer
        return <ThemeContext.Consumer>
            { value => <p>link's theme is {value}</p> }
        </ThemeContext.Consumer>
    }

    // 底层组件 - class 组件
    class ThemedButton extends React.Component {
        // 指定 contextType 读取当前的 theme context。
        // static contextType = ThemeContext // 也可以用 ThemedButton.contextType = ThemeContext
        render() {
            const theme = this.context // React 会往上找到最近的 theme Provider，然后使用它的值。
            return <div>
                <p>button's theme is {theme}</p>
            </div>
        }
    }
    ThemedButton.contextType = ThemeContext // 指定 contextType 读取当前的 theme context。

    // 中间的组件再也不必指明往下传递 theme 了。
    function Toolbar(props) {
        return (
            <div>
                <ThemedButton />
                <ThemeLink />
            </div>
        )
    }

    class App extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                theme: 'light'
            }
        }
        render() {
            return <ThemeContext.Provider value={this.state.theme}>
                <Toolbar />
                <hr/>
                <button onClick={this.changeTheme}>change theme</button>
            </ThemeContext.Provider>
        }
        changeTheme = () => {
            this.setState({
                theme: this.state.theme === 'light' ? 'dark' : 'light'
            })
        }
    }

    export default App
```

##  10 异步组件

*   `import()`
*   `React.lazy`
*   `React.Suspense`

**何时使用异步组件**

*   加载大组件
*   路由懒加载

```js

    import React from 'react'

    const ContextDemo = React.lazy(() => import('./ContextDemo'))

    class App extends React.Component {
        constructor(props) {
            super(props)
        }
        render() {
            return <div>
                <p>引入一个动态组件</p>
                <hr />
                <React.Suspense fallback={<div>Loading...</div>}>
                    <ContextDemo/>
                </React.Suspense>
            </div>

            // 1\. 强制刷新，可看到 loading （看不到就限制一下 chrome 网速）
            // 2\. 看 network 的 js 加载
        }
    }

    export default App
```

**react router如何配置懒加载**

![](https://s.poetries.work/uploads/2023/02/bd495d045b61d7bc.png)

##  11 性能优化

###  使用shouldComponentUpdate优化

*   `shouldComponentUpdate`(简称`SCU`) 允许我们手动地判断是否要进行组件更新，根据组件的应用场景设置函数的合理返回值能够帮我们避免不必要的更新
*   `PureComponent`和`React.memo`
*   不可变值`immutable.js`
*   使用`key`来帮助`React`识别列表中所有子组件的最小变化

> *   **React 默认**：`父组件有更新，子组件则无条件也更新`！！！
> *   性能优化对于 `React` 更加重要！
> *   `SCU` 一定要每次都用吗？—— 需要的时候才优化

**总结**

*   `shouldComponentUpdate`默认返回`true`，即`react`默认重新渲染所有子组件
*   必须配合`不可变值`使用
*   可先不使用`SCU`，有性能问题在考虑

```js

    import React from 'react'

    class App extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                count: 0
            }
        }
        render() {
            return <div>
                <span>{this.state.count}</span>
                <button onClick={this.onIncrease}>increase</button>
            </div>
        }
        onIncrease = () => {
            this.setState({
                count: this.state.count + 1
            })
        }
        // 演示 shouldComponentUpdate 的基本使用
        shouldComponentUpdate(nextProps, nextState) {
            if (nextState.count !== this.state.count) {
                return true // 可以渲染
            }
            return false // 不重复渲染
        }
    }

    export default App
```

```js

    import React from 'react'
    import PropTypes from 'prop-types'
    import _ from 'lodash'

    class Input extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                title: ''
            }
        }
        render() {
            return <div>
                <input value={this.state.title} onChange={this.onTitleChange}/>
                <button onClick={this.onSubmit}>提交</button>
            </div>
        }
        onTitleChange = (e) => {
            this.setState({
                title: e.target.value
            })
        }
        onSubmit = () => {
            const { submitTitle } = this.props
            submitTitle(this.state.title)

            this.setState({
                title: ''
            })
        }
    }
    // props 类型检查
    Input.propTypes = {
        submitTitle: PropTypes.func.isRequired
    }

    class List extends React.Component {
        constructor(props) {
            super(props)
        }
        render() {
            const { list } = this.props

            return <ul>{list.map((item, index) => {
                return <li key={item.id}>
                    <span>{item.title}</span>
                </li>
            })}</ul>
        }

        // 增加 shouldComponentUpdate
        shouldComponentUpdate(nextProps, nextState) {
            // _.isEqual 做对象或者数组的深度比较（一次性递归到底）
            if (_.isEqual(nextProps.list, this.props.list)) {
                // 相等，则不重复渲染
                return false
            }
            return true // 不相等，则渲染
        }
    }
    // props 类型检查
    List.propTypes = {
        list: PropTypes.arrayOf(PropTypes.object).isRequired
    }

    class TodoListDemo extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                list: [
                    {
                        id: 'id-1',
                        title: '标题1'
                    },
                    {
                        id: 'id-2',
                        title: '标题2'
                    },
                    {
                        id: 'id-3',
                        title: '标题3'
                    }
                ]
            }
        }
        render() {
            return <div>
                <Input submitTitle={this.onSubmitTitle}/>
                <List list={this.state.list}/>
            </div>
        }
        onSubmitTitle = (title) => {
            // 正确的用法
            this.setState({
                list: this.state.list.concat({
                    id: `id-${Date.now()}`,
                    title
                })
            })

            // // 为了演示 SCU ，故意写的错误用法
            // this.state.list.push({
            //     id: `id-${Date.now()}`,
            //     title
            // })
            // this.setState({
            //     list: this.state.list
            // })
        }
    }

    export default TodoListDemo
```

###  PureComponent和React.memo

*   `PureComponent`实现浅比较
*   `memo`函数组件中的`PureComponent`
*   浅比较已适用大部分情况

![](https://s.poetries.work/uploads/2023/02/f990aae49bc103b4.png)

```js

    import React from 'react'
    import PropTypes from 'prop-types'

    class Input extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                title: ''
            }
        }
        render() {
            return <div>
                <input value={this.state.title} onChange={this.onTitleChange}/>
                <button onClick={this.onSubmit}>提交</button>
            </div>
        }
        onTitleChange = (e) => {
            this.setState({
                title: e.target.value
            })
        }
        onSubmit = () => {
            const { submitTitle } = this.props
            submitTitle(this.state.title)

            this.setState({
                title: ''
            })
        }
    }
    // props 类型检查
    Input.propTypes = {
        submitTitle: PropTypes.func.isRequired
    }

    class List extends React.PureComponent {
        constructor(props) {
            super(props)
        }
        render() {
            const { list } = this.props

            return <ul>{list.map((item, index) => {
                return <li key={item.id}>
                    <span>{item.title}</span>
                </li>
            })}</ul>
        }
        shouldComponentUpdate() {/*浅比较*/}
    }
    // props 类型检查
    List.propTypes = {
        list: PropTypes.arrayOf(PropTypes.object).isRequired
    }

    class TodoListDemo extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                list: [
                    {
                        id: 'id-1',
                        title: '标题1'
                    },
                    {
                        id: 'id-2',
                        title: '标题2'
                    },
                    {
                        id: 'id-3',
                        title: '标题3'
                    }
                ]
            }
        }
        render() {
            return <div>
                <Input submitTitle={this.onSubmitTitle}/>
                <List list={this.state.list}/>
            </div>
        }
        onSubmitTitle = (title) => {
            // 正确的用法
            this.setState({
                list: this.state.list.concat({
                    id: `id-${Date.now()}`,
                    title
                })
            })

            // // 为了演示 SCU ，故意写的错误用法
            // this.state.list.push({
            //     id: `id-${Date.now()}`,
            //     title
            // })
            // this.setState({
            //     list: this.state.list
            // })
        }
    }

    export default TodoListDemo
```

###  优化性能的方式小结

**类组件中的优化手段**

*   使用纯组件 `PureComponent` 作为基类。
*   使用 `React.memo` 高阶函数包装组件。
*   使用 `shouldComponentUpdate` 生命周期函数来自定义渲染逻辑。

**方法组件中的优化手段**

*   使用 `useMemo`配合`React.memo`高阶函数包装组件，避免父组件更新子组件重新渲染
*   使用 `useCallBack`配合 `React.memo` 高阶函数包装组件，避免父组件更新子组件重新渲染

**其他方式**

*   在列表需要频繁变动时，使用唯一`id`作为`key`，而不是数组下标。
*   必要时通过改变 `CSS` 样式隐藏显示组件，而不是通过条件判断显示隐藏组件。
*   使用 `Suspense` 和 `lazy` 进行懒加载，例如：

```js

    import React, { lazy, Suspense } from "react";

    export default class CallingLazyComponents extends React.Component {
      render() {
        var ComponentToLazyLoad = null;

        if (this.props.name == "Mayank") {
          ComponentToLazyLoad = lazy(() => import("./mayankComponent"));
        } else if (this.props.name == "Anshul") {
          ComponentToLazyLoad = lazy(() => import("./anshulComponent"));
        }

        return (
          <div>
            <h1>This is the Base User: {this.state.name}</h1>
            <Suspense fallback={<div>Loading...</div>}>
              <ComponentToLazyLoad />
            </Suspense>
          </div>
        )
      }
    }
```

###  React实现的移动应用中，如果出现卡顿，有哪些可以考虑的优化方案

*   增加`shouldComponentUpdate`钩子对新旧`props`进行比较，如果值相同则阻止更新，避免不必要的渲染，或者使用`PureReactComponent`替代`Component`，其内部已经封装了`shouldComponentUpdate`的浅比较逻辑
*   对于列表或其他结构相同的节点，为其中的每一项增加唯一`key`属性，以方便`React`的`diff`算法中对该节点的复用，减少节点的创建和删除操作
*   `render`函数中减少类似`onClick={() => {doSomething()}}`的写法，每次调用`render`函数时均会创建一个新的函数，即使内容没有发生任何变化，也会导致节点没必要的重渲染，建议将函数保存在组件的成员对象中，这样只会创建一次
*   组件的`props`如果需要经过一系列运算后才能拿到最终结果，则可以考虑使用`reselect`库对结果进行缓存，如果`props`值未发生变化，则结果直接从缓存中拿，避免高昂的运算代价
*   `webpack-bundle-analyzer`分析当前页面的依赖包，是否存在不合理性，如果存在，找到优化点并进行优化

##  12 高阶组件和Render Props

**关于组件公共逻辑的抽离**

*   高阶组件`HOC`：模式简单，但增加组件层级
*   `Render Props`：代码简洁，学习成本较高

###  高阶组件

> 高阶组件(`Higher Order Componennt`)本身其实不是组件，而是一个函数，这个函数接收一个元组件作为参数，然后返回一个新的增强组件，高阶组件的出现本身也是为了逻辑复用

**简述:**

*   高阶组件不是组件，是 增强函数，可以输入一个元组件，返回出一个新的增强组件；
*   高阶组件的主要作用是 代码复用，操作 状态和参数；

`redux connect`是高阶组件

![](https://s.poetries.work/uploads/2023/02/572d9a77c0c8d67f.png) ![](https://s.poetries.work/uploads/2023/02/b64b3f1732ac0c9e.png)

```jsx
    import React from 'react'

    // 高阶组件
    const withMouse = (Component) => {
        class withMouseComponent extends React.Component {
            constructor(props) {
                super(props)
                this.state = { x: 0, y: 0 }
            }

            handleMouseMove = (event) => {
                this.setState({
                    x: event.clientX,
                    y: event.clientY
                })
            }

            render() {
                return (
                    <div style={{ height: '500px' }} onMouseMove={this.handleMouseMove}>
                        {/* 1\. 透传所有 props 2\. 增加 mouse 属性 */}
                        {/* props从使用高阶组件的地方传入 如<HocDemo a="100" /> */}
                        <Component {...this.props} mouse={this.state}/>
                    </div>
                )
            }
        }
        return withMouseComponent
    }

    const App = (props) => {
        const a = props.a
        const { x, y } = props.mouse // 接收 mouse 属性
        return (
            <div style={{ height: '500px' }}>
                <h1>The mouse position is ({x}, {y})</h1>
                <p>{a}</p>
            </div>
        )
    }

    export default withMouse(App) // 返回高阶函数
```

**用法:**

*   属性代理 (`Props Proxy`): 返回出一个组件，它基于被包裹组件进行 功能增强；

1.  默认参数: 可以为组件包裹一层默认参数；

```js

    function proxyHoc(Comp) {
    	return class extends React.Component {
    		render() {
    			const newProps = {
    				name: 'test1',
    				age: 1,
    			}
    			return <Comp {...this.props} {...newProps} />
    		}
    	}
    }
```

1.  提取状态: 可以通过 `props` 将被包裹组件中的 `state` 依赖外层，例如用于转换受控组件:

```js

    function withOnChange(Comp) {
    	return class extends React.Component {
    		constructor(props) {
    			super(props)
    			this.state = {
    				name: '',
    			}
    		}
    		onChangeName = () => {
    			this.setState({
    				name: 'test',
    			})
    		}
    		render() {
    			const newProps = {
    				value: this.state.name,
    				onChange: this.onChangeName,
    			}
    			return <Comp {...this.props} {...newProps} />
    		}
    	}
    }
```

使用姿势如下，这样就能非常快速的将一个 `Input` 组件转化成受控组件。

```js

    const NameInput = props => (<input name="name" {...props} />)
    export default withOnChange(NameInput)
```

**包裹组件: 可以为被包裹元素进行一层包装，**

```js

    function withMask(Comp) {
      return class extends React.Component {
          render() {
    		  return (
    		      <div>
    				  <Comp {...this.props} />
    					<div style={{
    					  width: '100%',
    					  height: '100%',
    					  backgroundColor: 'rgba(0, 0, 0, .6)',
    				  }} 
    			  </div>
    		  )
    	  }
      }
    }
```

> **反向继承** (`Inheritance Inversion`): 返回出一个组件，继承于被包裹组件，常用于以下操作

```js

    function IIHoc(Comp) {
        return class extends Comp {
            render() {
                return super.render();
            }
        };
    }
```

**渲染劫持 (Render Highjacking)**

条件渲染: 根据条件，渲染不同的组件

```js

    function withLoading(Comp) {
        return class extends Comp {
            render() {
                if(this.props.isLoading) {
                    return <Loading />
                } else {
                    return super.render()
                }
            }
        };
    }
```

可以直接修改被包裹组件渲染出的 `React` 元素树

**操作状态 (Operate State)**: 可以直接通过 `this.state` 获取到被包裹组件的状态，并进行操作。但这样的操作容易使 `state` 变得难以追踪，不易维护，谨慎使用。

**应用场景:**

> 权限控制，通过抽象逻辑，统一对页面进行权限判断，按不同的条件进行页面渲染:

```js

    function withAdminAuth(WrappedComponent) {
        return class extends React.Component {
    		constructor(props){
    			super(props)
    			this.state = {
    		    	isAdmin: false,
    			}
    		} 
    		async componentWillMount() {
    		    const currentRole = await getCurrentUserRole();
    		    this.setState({
    		        isAdmin: currentRole === 'Admin',
    		    });
    		}
    		render() {
    		    if (this.state.isAdmin) {
    		        return <Comp {...this.props} />;
    		    } else {
    		        return (<div>您没有权限查看该页面，请联系管理员！</div>);
    		    }
    		}
        };
    }
```

**性能监控**，包裹组件的生命周期，进行统一埋点:

```js

    function withTiming(Comp) {
        return class extends Comp {
            constructor(props) {
                super(props);
                this.start = Date.now();
                this.end = 0;
            }
            componentDidMount() {
                super.componentDidMount && super.componentDidMount();
                this.end = Date.now();
                console.log(`${WrappedComponent.name} 组件渲染时间为 ${this.end - this.start} ms`);
            }
            render() {
                return super.render();
            }
        };
    }
```

代码复用，可以将重复的逻辑进行抽象。

**使用注意:**

*   纯函数: 增强函数应为纯函数，避免侵入修改元组件；
*   避免用法污染: 理想状态下，应透传元组件的无关参数与事件，尽量保证用法不变；
*   命名空间: 为 `HOC` 增加特异性的组件名称，这样能便于开发调试和查找问题；
*   **引用传递**: 如果需要传递元组件的 `refs` 引用，可以使用`React.forwardRef`；
*   **静态方法**: 元组件上的静态方法并无法被自动传出，会导致业务层无法调用；解决:
    *   函数导出
    *   静态方法赋值
*   **重新渲**染: 由于增强函数每次调用是返回一个新组件，因此如果在 `Render`中使用增强函数，就会导致每次都重新渲染整个`HOC`，而且之前的状态会丢失；

###  render props

![](https://s.poetries.work/uploads/2023/02/113889f4a723c2e3.png)

```js

    import React from 'react'
    import PropTypes from 'prop-types'

    class Mouse extends React.Component {
        constructor(props) {
            super(props)
            this.state = { x: 0, y: 0 }
        }

        handleMouseMove = (event) => {
          this.setState({
            x: event.clientX,
            y: event.clientY
          })
        }

        render() {
          return (
            <div style={{ height: '500px' }} onMouseMove={this.handleMouseMove}>
                {/* 将当前 state 作为 props ，传递给 render （render 是一个函数组件） */}
                {this.props.render(this.state)}
            </div>
          )
        }
    }
    Mouse.propTypes = {
        render: PropTypes.func.isRequired // 必须接收一个 render 属性，而且是函数
    }

    const App = (props) => (
        <div style={{ height: '500px' }}>
            <p>{props.a}</p>
            <Mouse render={
                /* render 是一个函数组件 */
                ({ x, y }) => <h1>The mouse position is ({x}, {y})</h1>
            }/>

        </div>
    )

    /**
     * 即，定义了 Mouse 组件，只有获取 x y 的能力。
     * 至于 Mouse 组件如何渲染，App 说了算，通过 render prop 的方式告诉 Mouse 。
     */

    export default App
```

###  拓展：vue中实现高阶组件

```js

    function withAvatarURL (InnerComponent) {
      return {
        props: ['username','url'],
        inheritAttrs: false,
        data () {
          return { id: null }
        },
        created () {
          fetchURL(this.id, url => {
            this.username = username
          })
        },
        render (h) {// 使用h函数渲染组件
          return h(InnerComponent, {
            attrs: this.$attrs,
            props: {
              src: this.username
            }
          })
        }
      }
    }
    ​
    const SmartAvatar = withAvatarURL(Item)
    ​
    new Vue({
      el: '#app',
      components: { SmartAvatar }
    })
```

##  13 React Hooks相关

###  React Hooks带来了那些便利

*   代码逻辑聚合，逻辑复用
*   解决`HOC`嵌套地狱问题
*   代替`class`

> React 中通常使用 类定义 或者 函数定义 创建组件:

在类定义中，我们可以使用到许多 `React` 特性，例如 `state`、 各种组件生命周期钩子等，但是在函数定义中，我们却无能为力，因此 `React 16.8` 版本推出了一个新功能 (`React Hooks`)，通过它，可以更好的在函数定义组件中使用 React 特性。

**好处:**

1.  跨组件复用: 其实 `render props` / `HOC` 也是为了复用，相比于它们，`Hooks` 作为官方的底层 `API`，最为轻量，而且改造成本小，不会影响原来的组件层次结构和传说中的嵌套地狱；
2.  类定义更为复杂

*   不同的生命周期会使逻辑变得分散且混乱，不易维护和管理；
*   时刻需要关注`this`的指向问题；
*   代码复用代价高，高阶组件的使用经常会使整个组件树变得臃肿；

1.  状态与UI隔离: 正是由于 `Hooks` 的特性，状态逻辑会变成更小的粒度，并且极容易被抽象成一个自定义 `Hooks`，组件中的状态和 `UI` 变得更为清晰和隔离。

**注意:**

*   避免在 循环/条件判断/嵌套函数 中调用 `hooks`，保证调用顺序的稳定；
*   只有 函数定义组件 和 `hooks` 可以调用 `hooks`，避免在 类组件 或者 普通函数 中调用；
*   不能在`useEffect`中使用`useState`，`React` 会报错提示；
*   类组件不会被替换或废弃，不需要强制改造类组件，两种方式能并存；

**重要钩子**

1.  状态钩子 (`useState`): 用于定义组件的 `State`，其到类定义中`this.state`的功能；

```js

    // useState 只接受一个参数: 初始状态
    // 返回的是组件名和更改该组件对应的函数
    const [flag, setFlag] = useState(true);
    // 修改状态
    setFlag(false)

    // 上面的代码映射到类定义中:
    this.state = {
    	flag: true	
    }
    const flag = this.state.flag
    const setFlag = (bool) => {
        this.setState({
            flag: bool,
        })
    }
```

1.  生命周期钩子 (`useEffect`):

> 类定义中有许多生命周期函数，而在 `React Hooks` 中也提供了一个相应的函数 (`useEffect`)，这里可以看做`componentDidMount`、`componentDidUpdate`和`componentWillUnmount`的结合。

**useEffect(callback, [source])接受两个参数**

*   `callback`: 钩子回调函数；
*   `source`: 设置触发条件，仅当 `source` 发生改变时才会触发；
*   `useEffect`钩子在没有传入`[source]`参数时，默认在每次 `render` 时都会优先调用上次保存的回调中返回的函数，后再重新调用回调；

**的useEffect是如何区分生命周期钩子的**

> `useEffect`可以看成是`componentDidMount`，`componentDidUpdate`和`componentWillUnmount`三者的结合。`useEffect(callback, [source])` 接收两个参数，调用方式如下

```js

    useEffect(() => {
      console.log('mounted');

      return () => {
        console.log('willUnmount');
      }
    }, [source]);
```

> 生命周期函数的调用主要是通过第二个参数`[source]`来进行控制，有如下几种情况：

*   `[source]`参数不传时，则每次都会优先调用上次保存的函数中返回的那个函数，然后再调用外部那个函数；
*   `[source]`参数传`[]`时，则外部的函数只会在初始化时调用一次，返回的那个函数也只会最终在组件卸载时调用一次；
*   `[source]`参数有值时，则只会监听到数组中的值发生变化后才优先调用返回的那个函数，再调用外部的函数。

```js

    useEffect(() => {
    	// 组件挂载后执行事件绑定
    	console.log('on')
    	addEventListener()

    	// 组件 update 时会执行事件解绑
    	return () => {
    		console.log('off')
    		removeEventListener()
    	}
    }, [source]);

    // 每次 source 发生改变时，执行结果(以类定义的生命周期，便于大家理解):
    // --- DidMount ---
    // 'on'
    // --- DidUpdate ---
    // 'off'
    // 'on'
    // --- DidUpdate ---
    // 'off'
    // 'on'
    // --- WillUnmount --- 
    // 'off'
```

**通过第二个参数，我们便可模拟出几个常用的生命周期:**

*   `componentDidMount`: 传入[]时，就只会在初始化时调用一次

```js

    const useMount = (fn) => useEffect(fn, [])
```

*   `componentWillUnmount:` 传入`[]`，回调中的返回的函数也只会被最终执行一次

```js

    const useUnmount = (fn) => useEffect(() => fn, [])
```

*   `mounted`: 可以使用 `useState` 封装成一个高度可复用的 `mounted` 状态；

```js

    const useMounted = () => {
        const [mounted, setMounted] = useState(false);
        useEffect(() => {
            !mounted && setMounted(true);
            return () => setMounted(false);
        }, []);
        return mounted;
    }
```

*   `componentDidUpdate`: `useEffect`每次均会执行，其实就是排除了 `DidMount` 后即可；

```js

    const mounted = useMounted() 
    useEffect(() => {
        mounted && fn()
    })
```

1.  其它内置钩子:

*   `useContext`: 获取 `context` 对象
*   `useReducer`: 类似于 `Redux` 思想的实现，但其并不足以替代 `Redux`，可以理解成一个组件内部的 `redux`:
    *   并不是持久化存储，会随着组件被销毁而销毁；
    *   属于组件内部，各个组件是相互隔离的，单纯用它并无法共享数据；
    *   配合`useContext`的全局性，可以完成一个轻量级的 `Redux；(easy-peasy)`
*   `useCallback`: 缓存回调函数，避免传入的回调每次都是新的函数实例而导致依赖组件重新渲染，具有性能优化的效果；
*   `useMemo`: 用于缓存传入的 `props`，避免依赖的组件每次都重新渲染；
*   `useRef`: 获取组件的真实节点；
*   `useLayoutEffect`
    *   `DOM`更新同步钩子。用法与`useEffect`类似，只是区别于执行时间点的不同
    *   `useEffect`属于异步执行，并不会等待 `DOM` 真正渲染后执行，而`useLayoutEffect`则会真正渲染后才触发；
    *   可以获取更新后的 `state`；

1.  自定义钩子(`useXxxxx`): 基于 `Hooks` 可以引用其它 `Hooks` 这个特性，我们可以编写自定义钩子，如上面的`useMounted`。又例如，我们需要每个页面自定义标题:

```js

    function useTitle(title) {
      useEffect(
        () => {
          document.title = title;
        });
    }

    // 使用:
    function Home() {
    	const title = '我是首页'
    	useTitle(title)

    	return (
    		<div>{title}</div>
    	)
    }
```

###  class组件存在哪些问题

*   **函数组件的特点**
    *   没有组件实例
    *   没有生命周期
    *   没有`state`和`setState`，只能接收`props`
*   **class组件问题**
    *   大型组件很难拆分和重构，很难测试
    *   相同的业务逻辑分散到各个方法中，逻辑混乱
    *   复用逻辑变得复杂，如`Mixins`、`HOC`、`Render Props`
*   **react组件更易用函数表达**
    *   React提倡函数式编程，`View = fn(props)`
    *   函数更灵活，更易于拆分，更易测试
    *   但函数组件太简单，需要增强能力—— 使用`hooks`

###  用useState实现state和setState功能

**让函数组件实现state和setState**

*   默认函数组件没有`state`
*   函数组件是一个纯函数，执行完即销毁，无法存储`state`
*   需要`state hook`，即把`state`“钩”到纯函数中（保存到闭包中）

**hooks命名规范**

*   规定所有的`hooks`都要以`use`开头，如`useXX`
*   自定义`hook`也要以`use`开头

```js

    // 使用hooks
    import React, { useState } from 'react'

    function ClickCounter() {
        // 数组的解构
        // useState 就是一个 Hook “钩”，最基本的一个 Hook
        const [count, setCount] = useState(0) // 传入一个初始值

        const [name, setName] = useState('test')

        // const arr = useState(0)
        // const count = arr[0]
        // const setCount = arr[1]

        function clickHandler() {
            setCount(count + 1)
            setName(name + '2020')
        }

        return <div>
            <p>你点击了 {count} 次 {name}</p>
            <button onClick={clickHandler}>点击</button>
        </div>
    }

    export default ClickCounter
```

```js

    // 使用class

    import React from 'react'

    class ClickCounter extends React.Component {
        constructor() {
            super()

            // 定义 state
            this.state = {
                count: 0,
                name: 'test'
            }
        }
        render() {
            return <div>
                <p>你点击了 {this.state.count} 次 {this.state.name}</p>
                <button onClick={this.clickHandler}>点击</button>
            </div>
        }
        clickHandler = ()=> {
            // 修改 state
            this.setState({
                count: this.state.count + 1,
                name: this.state.name + '2020'
            })
        }
    }

    export default ClickCounter
```

###  用useEffect模拟组件生命周期

**让函数组件模拟生命周期**

*   默认函数组件没有生命周期
*   函数组件是一个纯函数，执行完即销毁，自己无法实现生命周期
*   使用`Effect Hook`把生命周期"钩"到纯函数中

**useEffect让纯函数有了副作用**

*   默认情况下，执行纯函数，输入参数，返回结果，无副作用
*   所谓副作用，就是对函数之外造成影响，如设置全局定时器
*   而组件需要副作用，所以需要有`useEffect`钩到纯函数中

**总结**

*   模拟`componentDidMount`，`useEffect`依赖`[]`
*   模拟`componentDidUpdate`，`useEffect`依赖`[a,b]`或者`useEffect(fn)`没有写第二个参数
*   模拟`componentWillUnmount`，`useEffect`返回一个函数
*   注意`useEffect(fn)`没有写第二个参数：同时模拟`componentDidMount` + `componentDidUpdate`

```js

    import React, { useState, useEffect } from 'react'

    function LifeCycles() {
        const [count, setCount] = useState(0)
        const [name, setName] = useState('test')

        // // 模拟 class 组件的 DidMount 和 DidUpdate
        // useEffect(() => {
        //     console.log('在此发送一个 ajax 请求')
        // })

        // // 模拟 class 组件的 DidMount
        // useEffect(() => {
        //     console.log('加载完了')
        // }, []) // 第二个参数是 [] （不依赖于任何 state）

        // // 模拟 class 组件的 DidUpdate
        // useEffect(() => {
        //     console.log('更新了')
        // }, [count, name]) // 第二个参数就是依赖的 state

        // 模拟 class 组件的 DidMount
        useEffect(() => {
            let timerId = window.setInterval(() => {
                console.log(Date.now())
            }, 1000)

            // 返回一个函数
            // 模拟 WillUnMount
            return () => {
                window.clearInterval(timerId)
            }
        }, [])

        function clickHandler() {
            setCount(count + 1)
            setName(name + '2020')
        }

        return <div>
            <p>你点击了 {count} 次 {name}</p>
            <button onClick={clickHandler}>点击</button>
        </div>
    }

    export default LifeCycles
```

###  用useEffect模拟WillUnMount时的注意事项

**useEffect中返回函数**

*   `useEffect`依赖项`[]`，组件销毁是执行`fn`，等于`willUnmount`
*   `useEffect`第二个参数没有或依赖项`[a,b]`，组件更新时执行`fn`，即下次执行`useEffect`之前，就会执行`fn`，无论更新或卸载（`props`更新会导致`willUnmount`多次执行）

```js

    import React from 'react'

    class FriendStatus extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                status: false // 默认当前不在线
            }
        }
        render() {
            return <div>
                好友 {this.props.friendId} 在线状态：{this.state.status}
            </div>
        }
        componentDidMount() {
            console.log(`开始监听 ${this.props.friendId} 的在线状态`)
        }
        componentWillUnMount() {
            console.log(`结束监听 ${this.props.friendId} 的在线状态`)
        }
        // friendId 更新
        componentDidUpdate(prevProps) {
            console.log(`结束监听 ${prevProps.friendId} 在线状态`)
            console.log(`开始监听 ${this.props.friendId} 在线状态`)
        }
    }

    export default FriendStatus
```

```js

    import React, { useState, useEffect } from 'react'

    function FriendStatus({ friendId }) {
        const [status, setStatus] = useState(false)

        // DidMount 和 DidUpdate
        useEffect(() => {
            console.log(`开始监听 ${friendId} 在线状态`)

            // 【特别注意】
            // 此处并不完全等同于 WillUnMount
            // props 发生变化，即更新，也会执行结束监听
            // 准确的说：返回的函数，会在下一次 effect 执行之前，被执行
            return () => {
                console.log(`结束监听 ${friendId} 在线状态`)
            }
        })

        return <div>
            好友 {friendId} 在线状态：{status.toString()}
        </div>
    }

    export default FriendStatus
```

###  useRef和useContext

####  useRef

```js

    import React, { useRef, useEffect } from 'react'

    function UseRef() {
        const btnRef = useRef(null) // 初始值

        // const numRef = useRef(0)
        // numRef.current

        useEffect(() => {
            console.log(btnRef.current) // DOM 节点
        }, [])

        return <div>
            <button ref={btnRef}>click</button>
        </div>
    }

    export default UseRef
```

####  useContext

```js

    import React, { useContext } from 'react'

    // 主题颜色
    const themes = {
        light: {
            foreground: '#000',
            background: '#eee'
        },
        dark: {
            foreground: '#fff',
            background: '#222'
        }
    }

    // 创建 Context
    const ThemeContext = React.createContext(themes.light) // 初始值

    function ThemeButton() {
        const theme = useContext(ThemeContext)

        return <button style={{ background: theme.background, color: theme.foreground }}>
            hello world
        </button>
    }

    function Toolbar() {
        return <div>
            <ThemeButton></ThemeButton>
        </div>
    }

    function App() {
        return <ThemeContext.Provider value={themes.dark}>
            <Toolbar></Toolbar>
        </ThemeContext.Provider>
    }

    export default App
```

###  useReducer能代替redux吗

*   `useReducer`是`useState`的代替方案，用于`state`复杂变化
*   `useReducer`是单个组件状态管理，组件通讯还需要`props`
*   `redux`是全局的状态管理，多组件共享数据

```js

    import React, { useReducer } from 'react'

    const initialState = { count: 0 }

    const reducer = (state, action) => {
        switch (action.type) {
            case 'increment':
                return { count: state.count + 1 }
            case 'decrement':
                return { count: state.count - 1 }
            default:
                return state
        }
    }

    function App() {
        // 很像 const [count, setCount] = useState(0)
        const [state, dispatch] = useReducer(reducer, initialState)

        return <div>
            count: {state.count}
            <button onClick={() => dispatch({ type: 'increment' })}>increment</button>
            <button onClick={() => dispatch({ type: 'decrement' })}>decrement</button>
        </div>
    }

    export default App
```

###  使用useMemo做性能优化

*   状态变化，React会默认更新所有子组件
*   `class`组件使用`shouldComponentUpdate`和`PureComponent`优化
*   `Hooks`中使用`useMemo`缓存对象，避免子组件更新
*   `useMemo`需要配合`React.memo`使用才生效

```js

    import React, { useState, memo, useMemo } from 'react'

    // 子组件
    // function Child({ userInfo }) {
    //     console.log('Child render...', userInfo)

    //     return <div>
    //         <p>This is Child {userInfo.name} {userInfo.age}</p>
    //     </div>
    // }
    // 类似 class PureComponent ，对 props 进行浅层比较
    const Child = memo(({ userInfo }) => {
        console.log('Child render...', userInfo)

        return <div>
            <p>This is Child {userInfo.name} {userInfo.age}</p>
        </div>
    })

    // 父组件
    function App() {
        console.log('Parent render...')

        const [count, setCount] = useState(0)
        const [name, setName] = useState('test')

        // const userInfo = { name, age: 20 }
        // 用 useMemo 缓存数据，有依赖
        // useMemo包裹后返回的对象是同一个，没有创建新的对象地址，不会触发子组件的重新渲染
        const userInfo = useMemo(() => {
            return { name, age: 21 }
        }, [name])

        return <div>
            <p>
                count is {count}
                <button onClick={() => setCount(count + 1)}>click</button>
            </p>
            <Child userInfo={userInfo}></Child>
        </div>
    }

    export default App
```

###  使用useCallback做性能优化

*   `Hooks`中使用`useCallback`缓存函数，避免子组件更新
*   `useCallback`需要配合`React.memo`使用才生效

```js

    import React, { useState, memo, useMemo, useCallback } from 'react'

    // 子组件，memo 相当于 PureComponent
    const Child = memo(({ userInfo, onChange }) => {
        console.log('Child render...', userInfo)

        return <div>
            <p>This is Child {userInfo.name} {userInfo.age}</p>
            <input onChange={onChange}></input>
        </div>
    })

    // 父组件
    function App() {
        console.log('Parent render...')

        const [count, setCount] = useState(0)
        const [name, setName] = useState('test')

        // 用 useMemo 缓存数据
        const userInfo = useMemo(() => {
            return { name, age: 21 }
        }, [name])

        // function onChange(e) {
        //     console.log(e.target.value)
        // }
        // 用 useCallback 缓存函数，避免在组件多次渲染中多次创建函数导致引用地址一致
        const onChange = useCallback(e => {
            console.log(e.target.value)
        }, [])

        return <div>
            <p>
                count is {count}
                <button onClick={() => setCount(count + 1)}>click</button>
            </p>
            <Child userInfo={userInfo} onChange={onChange}></Child>
        </div>
    }

    export default App
```

###  什么是自定义Hook

*   封装通用的功能
*   开发和使用第三方`Hooks`
*   自定义`Hooks`带来无限的拓展性，解耦代码

```js

    import { useState, useEffect } from 'react'
    import axios from 'axios'

    // 封装 axios 发送网络请求的自定义 Hook
    function useAxios(url) {
        const [loading, setLoading] = useState(false)
        const [data, setData] = useState()
        const [error, setError] = useState()

        useEffect(() => {
            // 利用 axios 发送网络请求
            setLoading(true)
            axios.get(url) // 发送一个 get 请求
                .then(res => setData(res))
                .catch(err => setError(err))
                .finally(() => setLoading(false))
        }, [url])

        return [loading, data, error]
    }

    export default useAxios

    // 第三方 Hook
    // https://nikgraf.github.io/react-hooks/
    // https://github.com/umijs/hooks
```

```js

    import { useState, useEffect } from 'react'

    function useMousePosition() {
        const [x, setX] = useState(0)
        const [y, setY] = useState(0)

        useEffect(() => {
            function mouseMoveHandler(event) {
                setX(event.clientX)
                setY(event.clientY)
            }

            // 绑定事件
            document.body.addEventListener('mousemove', mouseMoveHandler)

            // 解绑事件
            return () => document.body.removeEventListener('mousemove', mouseMoveHandler)
        }, [])

        return [x, y]
    }

    export default useMousePosition
```

```js

    // 使用
    function App() {
        const url = 'http://localhost:3000/'
        // 数组解构
        const [loading, data, error] = useAxios(url)

        if (loading) return <div>loading...</div>

        return error
            ? <div>{JSON.stringify(error)}</div>
            : <div>{JSON.stringify(data)}</div>

        // const [x, y] = useMousePosition()
        // return <div style={{ height: '500px', backgroundColor: '#ccc' }}>
        //     <p>鼠标位置 {x} {y}</p>
        // </div>
    }
```

###  使用Hooks的两条重要规则

*   只能用于函数组件和自定义`Hook`中，其他地方不可以
*   只能用于顶层代码，不能在判断、循环中使用`Hooks`
*   `eslint`插件`eslint-plugin-react-hooks`可以帮助检查`Hooks`的使用规则

![](https://s.poetries.work/uploads/2023/02/ee5e71b37a63fb7b.png)

###  为何Hooks要依赖于调用顺序

*   无论是`render`还是`re-render`，`Hooks`调用顺序必须一致
*   如果`Hooks`出现在循环、判断里，则无法保证顺序一致
*   `Hooks`严重依赖调用顺序

```js

    import React, { useState, useEffect } from 'react'

    function Teach({ couseName }) {
        // 函数组件，纯函数，执行完即销毁
        // 所以，无论组件初始化（render）还是组件更新（re-render）
        // 都会重新执行一次这个函数，获取最新的组件
        // 这一点和 class 组件不一样：有组件实例，组件实例一旦声声明不会销毁（除非组件销毁）

        // render: 初始化 state 的值 '张三'
        // re-render: 读取 state 的值 '张三'
        const [studentName, setStudentName] = useState('张三')

        // if (couseName) {
        //     const [studentName, setStudentName] = useState('张三')
        // }

        // render: 初始化 state 的值 'poetry'
        // re-render: 读取 state 的值 'poetry'
        const [teacherName, setTeacherName] = useState('poetry')

        // if (couseName) {
        //     useEffect(() => {
        //         // 模拟学生签到
        //         localStorage.setItem('name', studentName)
        //     })
        // }

        // render: 添加 effect 函数
        // re-render: 替换 effect 函数（内部的函数也会重新定义）
        useEffect(() => { // 内部函数执行完就销毁
            // 模拟学生签到
            localStorage.setItem('name', studentName)
        })

        // render: 添加 effect 函数
        // re-render: 替换 effect 函数（内部的函数也会重新定义）
        useEffect(() => {// 内部函数执行完就销毁
            // 模拟开始上课
            console.log(`${teacherName} 开始上课，学生 ${studentName}`)
        })

        return <div>
            课程：{couseName}，
            讲师：{teacherName}，
            学生：{studentName}
        </div>
    }

    export default Teach
```

###  class组件逻辑复用有哪些问题

*   **高级组件HOC**
    *   组件嵌套层级过多，不易于渲染、调试
    *   `HOC`会劫持`props`，必须严格规范
*   **Render Props**
    *   学习成本高，不利于理解
    *   只能传递纯函数，而默认情况下纯函数功能有限

###  Hooks组件逻辑复用有哪些好处

*   变量作用域很明确
*   不会产生组件嵌套

###  Hooks使用中的几个注意事项

*   `useState`初始化值，只有第一次有效
*   `useEffect`内部不能修改`state`，第二个参数需要是空的依赖`[]`
*   `useEffect`可能出现死循环，依赖`[]`里面有对象、数组等引用类型，把引用类型拆解为值类型

```js

    // 第一个坑：`useState`初始化值，只有第一次有效
    import React, { useState } from 'react'

    // 子组件
    function Child({ userInfo }) {
        // render: 初始化 state
        // re-render: 只恢复初始化的 state 值，不会再重新设置新的值
        //            只能用 setName 修改
        const [ name, setName ] = useState(userInfo.name)

        return <div>
            <p>Child, props name: {userInfo.name}</p>
            <p>Child, state name: {name}</p>
        </div>
    }

    function App() {
        const [name, setName] = useState('test')
        const userInfo = { name }

        return <div>
            <div>
                Parent &nbsp;
                <button onClick={() => setName('test1')}>setName</button>
            </div>
            <Child userInfo={userInfo}/>
        </div>
    }

    export default App
```

```js

    // 第二个坑：`useEffect`内部不能修改`state`
    import React, { useState, useRef, useEffect } from 'react'

    function UseEffectChangeState() {
        const [count, setCount] = useState(0)

        // 模拟 DidMount
        const countRef = useRef(0)
        useEffect(() => {
            console.log('useEffect...', count)

            // 定时任务
            const timer = setInterval(() => {
                console.log('setInterval...', countRef.current) // 一直是0 闭包陷阱
                // setCount(count + 1)
                setCount(++countRef.current) // 解决方案使用useRef
            }, 1000)

            // 清除定时任务
            return () => clearTimeout(timer)
        }, []) // 依赖为 []

        // 依赖为 [] 时： re-render 不会重新执行 effect 函数
        // 没有依赖：re-render 会重新执行 effect 函数

        return <div>count: {count}</div>
    }

    export default UseEffectChangeState
```

##  14 Redux相关

###  简述flux 思想

> `Flux` 的最大特点，就是数据的"单向流动"。

*   用户访问 `View`
*   `View`发出用户的 `Action`
*   `Dispatcher` 收到`Action`，要求 `Store` 进行相应的更新
*   `Store` 更新后，发出一个`"change"`事件
*   `View` 收到`"change"`事件后，更新页面

###  redux中间件

> 中间件提供第三方插件的模式，自定义拦截 `action` -> `reducer` 的过程。变为 `action` -> `middlewares` -> `reducer`。这种机制可以让我们改变数据流，实现如异步`action` ，`action` 过滤，日志输出，异常报告等功能

*   `redux-logger`：提供日志输出
*   `redux-thunk`：处理异步操作
*   `redux-promise`：处理异步操作，`actionCreator`的返回值是`promise`

###  redux有什么缺点

*   一个组件所需要的数据，必须由父组件传过来，而不能像`flux`中直接从`store`取。
*   当一个组件相关数据更新时，即使父组件不需要用到这个组件，父组件还是会重新`render`，可能会有效率影响，或者需要写复杂的`shouldComponentUpdate`进行判断。

###  Redux设计理念

**为什么要用redux**

> 在`React`中，数据在组件中是单向流动的，数据从一个方向父组件流向子组件（通过`props`）,所以，两个非父子组件之间通信就相对麻烦，`redux`的出现就是为了解决`state`里面的数据问题

**Redux设计理念**

> `Redux`是将整个应用状态存储到一个地方上称为`store`,里面保存着一个状态树`store tree`,组件可以派发(`dispatch`)行为(`action`)给`store`,而不是直接通知其他组件，组件内部通过订阅`store`中的状态`state`来刷新自己的视图

![](https://s.poetries.work/gitee/2020/07/68.png)

**Redux三大原则**

*   唯一数据源

> 整个应用的state都被存储到一个状态树里面，并且这个状态树，只存在于唯一的store中

*   保持只读状态

> `state`是只读的，唯一改变`state`的方法就是触发`action`，`action`是一个用于描述以发生时间的普通对象

*   数据改变只能通过纯函数来执行

> 使用纯函数来执行修改，为了描述`action`如何改变`state`的，你需要编写`reducers`

**Redux源码**

```js

    let createStore = (reducer) => {
        let state;
        //获取状态对象
        //存放所有的监听函数
        let listeners = [];
        let getState = () => state;
        //提供一个方法供外部调用派发action
        let dispath = (action) => {
            //调用管理员reducer得到新的state
            state = reducer(state, action);
            //执行所有的监听函数
            listeners.forEach((l) => l())
        }
        //订阅状态变化事件，当状态改变发生之后执行监听函数
        let subscribe = (listener) => {
            listeners.push(listener);
        }
        dispath();
        return {
            getState,
            dispath,
            subscribe
        }
    }
    let combineReducers=(renducers)=>{
        //传入一个renducers管理组，返回的是一个renducer
        return function(state={},action={}){
            let newState={};
            for(var attr in renducers){
                newState[attr]=renducers[attr](state[attr],action)

            }
            return newState;
        }
    }
    export {createStore,combineReducers};
```

###  Redux怎么实现dispstch一个函数

> 以`redux-thunk`中间件作为例子，下面就是`thunkMiddleware`函数的代码

```js

    // 部分转为ES5代码，运行middleware函数会返回一个新的函数，如下：
    return ({ dispatch, getState }) => {
        // next实际就是传入的dispatch
        return function (next) {
            return function (action) {
                // redux-thunk核心
                if (typeof action === 'function') { 
                    return action(dispatch, getState, extraArgument);
                }
                return next(action);
            };
        };
    }
```

> `redux-thunk`库内部源码非常的简单，允许`action`是一个函数，同时支持参数传递，否则调用方法不变

*   `redux`创建`Store`：通过`combineReducers`函数合并`reducer`函数，返回一个新的函数`combination`（这个函数负责循环遍历运行`reducer`函数，返回全部`state`）。将这个新函数作为参数传入`createStore`函数，函数内部通过dispatch，初始化运行传入的`combination`，state生成，返回store对象
*   `redux`中间件：`applyMiddleware`函数中间件的主要目的就是修改`dispatch`函数，返回经过中间件处理的新的`dispatch`函数
*   `redux`使用：实际就是再次调用循环遍历调用`reducer`函数，更新`state`

###  connect高级组件原理

*   首先`connect`之所以会成功，是因为`Provider`组件：
*   在原应用组件上包裹一层，使原来整个应用成为`Provider`的子组件 接收`Redux`的`store`作为`props`，通过`context`对象传递给子孙组件上的`connect`

> `connect`做了些什么。它真正连接 `Redux` 和 `React`，它包在我们的容器组件的外一层，它接收上面 `Provider` 提供的 `store` 里面的`state` 和 `dispatch`，传给一个构造函数，返回一个对象，以属性形式传给我们的容器组件
> 
> *   `connect`是一个高阶函数，首先传入`mapStateToProps`、`mapDispatchToProps`，然后返回一个生产`Component`的函数(`wrapWithConnect`)，然后再将真正的`Component`作为参数传入`wrapWithConnect`，这样就生产出一个经过包裹的`Connect`组件，

**该组件具有如下特点**

*   通过`props.store`获取祖先`Component`的`store props`包括`stateProps`、`dispatchProps`、`parentProps`,合并在一起得到`nextState`，作为`props`传给真正的`Component componentDidMount`时，添加事件`this.store.subscribe(this.handleChange)`，实现页面交互
*   `shouldComponentUpdate`时判断是否有避免进行渲染，提升页面性能，并得到`nextState` `componentWillUnmount`时移除注册的事件`this.handleChange`

> 由于`connect`的源码过长，我们只看主要逻辑

```js

    export default function connect(mapStateToProps, mapDispatchToProps, mergeProps, options = {}) {
      return function wrapWithConnect(WrappedComponent) {
        class Connect extends Component {
          constructor(props, context) {
            // 从祖先Component处获得store
            this.store = props.store || context.store
            this.stateProps = computeStateProps(this.store, props)
            this.dispatchProps = computeDispatchProps(this.store, props)
            this.state = { storeState: null }
            // 对stateProps、dispatchProps、parentProps进行合并
            this.updateState()
          }
          shouldComponentUpdate(nextProps, nextState) {
            // 进行判断，当数据发生改变时，Component重新渲染
            if (propsChanged || mapStateProducedChange || dispatchPropsChanged) {
              this.updateState(nextProps)
              return true
            }
            componentDidMount() {
              // 改变Component的state
              this.store.subscribe(() = {
                this.setState({
                  storeState: this.store.getState()
                })
              })
            }
            render() {
              // 生成包裹组件Connect
              return (
                <WrappedComponent {...this.nextState} />
              )
            }
          }
          Connect.contextTypes = {
            store: storeShape
          }
          return Connect;
        }
      }
```

###  Dva工作原理

> 集成`redux+redux-saga`

**工作原理**

> 改变发生通常是通过用户交互行为或者浏览器行为（如路由跳转等）触发的，当此类行为会改变数据的时候可以通过 `dispatch` 发起一个 `action`，如果是同步行为会直接通过 `Reducers` 改变 `State` ，如果是异步行为（副作用）会先触发 `Effects` 然后流向 `Reducers` 最终改变 `State`

##  15 React中Ref几种创建方式

`React` 提供了 `Refs`，帮助我们访问 `DOM` 节点或在 `render` 方法中创建的 `React` 元素

###  三种使用 Ref 的方式

**String Refs**

```js

    class App extends React.Component {
        constructor(props) {
            super(props)
        }
        componentDidMount() {
            setTimeout(() => {
                 // 2\. 通过 this.refs.xxx 获取 DOM 节点
                 this.refs.textInput.value = 'new value'
            }, 2000)
        }
        render() {
            // 1\. ref 直接传入一个字符串
            return (
                <div>
                  <input ref="textInput" value='value' />
                </div>
            )
        }
    }
```

**回调 Refs**

```js

    class App extends React.Component {
        constructor(props) {
            super(props)
        }
        componentDidMount() {
            setTimeout(() => {
                  // 2\. 通过实例属性获取 DOM 节点
                  this.textInput.value = 'new value'
            }, 2000)
        }
        render() {
            // 1\. ref 传入一个回调函数
            // 该函数中接受 React 组件实例或 DOM 元素作为参数
            // 我们通常会将其存储到具体的实例属性（this.textInput）
            return (
                <div>
                  <input ref={(element) => {
                    this.textInput = element;
                  }} value='value' />
                </div>
            )
        }
    }
```

**createRef**

这是最被推荐使用的方式

```js

    class App extends React.Component {
        constructor(props) {
            super(props)
            // 1\. 使用 createRef 创建 Refs
            // 并将 Refs 分配给实例属性 textInputRef，以便在整个组件中引用
            this.textInputRef = React.createRef();
        }
        componentDidMount() {
            setTimeout(() => {
                // 3\. 通过 Refs 的 current 属性进行引用
                this.textInputRef.current.value = 'new value'
            }, 2000)
        }
        render() {
            // 2\. 通过 ref 属性附加到 React 元素
            return (
                <div>
                  <input ref={this.textInputRef} value='value' />
                </div>
            )
        }
    }
```

###  使用Ref获取组件实例

> `Refs` 除了用于获取具体的 `DOM` 节点外，也可以获取 `Class` 组件的实例，当获取到实例后，可以调用其中的方法，从而强制执行，比如动画之类的效果

```js

    class TextInput extends React.Component{
      constructor(props){
        super(props);
        this.inputRef = React.createRef();
      }
      getTextInputFocus = ()=>{
        this.inputRef.current.focus();
      }
      render(){
        return <input ref={this.inputRef}/>
      }
    }
    class Form extends React.Component{
      constructor(props){
        super(props);
        this.textInputRef = React.createRef();
      }
      getFormFocus = ()=>{
        //this.textInputRef.current就会指向TextInput类组件的实例
        this.textInputRef.current.getTextInputFocus();
      }
      render(){
        return (
          <>
            <TextInput ref={this.textInputRef}/>
            <button onClick={this.getFormFocus}>获得焦点</button>
          </>
        )
      }
    }
```

###  函数组件传递forwardRef

*   我们不能在函数组件上使用 `ref` 属性，因为函数组件没有实例
*   使用`forwardRef`（`forward`在这里是「传递」的意思）后，就能跨组件传递`ref`。
*   在例子中，我们将`inputRef`从`Form`跨组件传递到`MyInput`中，并与`input`产生关联

```js

    //  3\. 子组件通过 forwardRef 获取 ref，并通过 ref 属性绑定 React 元素
    const MyInput = forwardRef((props, ref) => {
      return <input {...props} ref={ref} />;
    });

    function Form() {
      // // 1\. 创建 refs
      const inputRef = useRef(null);

      function handleClick() {
        // // 4\. 使用 this.inputRef.current 获取子组件中渲染的 DOM 节点
        inputRef.current.focus();
      }

      return (
        <>
         {/* 2\. 传给子组件的 ref 属性 */}
          <MyInput ref={inputRef} />
          <button onClick={handleClick}>
            Focus the input
          </button>
        </>
      );
    }
```

###  useImperativeHandle

> 除了「限制跨组件传递`ref`」外，还有一种「防止`ref`失控的措施」，那就是`useImperativeHandle`，他的逻辑是这样的：既然`「ref失控」`是由于「使用了不该被使用的`DOM`方法」（比如`appendChild`），那我可以限制「`ref`中只存在可以被使用的方法」。用`useImperativeHandle`修改我们的`MyInput`组件：

```js

    const MyInput = forwardRef((props, ref) => {
      const realInputRef = useRef(null);
      // 函数组件自定义暴露给父组件ref对象，这样更安全避免外部修改删除dom
      useImperativeHandle(ref, () => ({
        focus() {
          realInputRef.current.focus();
        },
      }));
      return <input {...props} ref={realInputRef} />;
    });
```

现在，`Form`组件中通过`inputRef.current`只能取到如下数据结构：

```js

    {
      focus() {
        realInputRef.current.focus();
      },
    }
```

> 就杜绝了`「开发者通过ref取到DOM后，执行不该被使用的API，出现ref失控」`的情况

*   为了防止错用/滥用导致`ref`失控，React限制`「默认情况下，不能跨组件传递ref」`
*   为了破除这种限制，可以使用`forwardRef`。
*   为了减少`ref`对`DOM`的滥用，可以使用`useImperativeHandle`限制`ref`传递的数据结构。

##  16 为什么 React 元素有一个 $typeof 属性

![](https://s.poetries.work/images/image-20210302200213923.png)

> 目的是为了防止 `XSS` 攻击。因为 `Synbol` 无法被序列化，所以 `React` 可以通过有没有 `$typeof` 属性来断出当前的 `element` 对象是从数据库来的还是自己生成的。

*   如果没有 `$typeof` 这个属性，`react` 会拒绝处理该元素。
*   在 `React` 的古老版本中，下面的写法会出现 `XSS` 攻击：

```js

    // 服务端允许用户存储 JSON
    let expectedTextButGotJSON = {
      type: 'div',
      props: {
        dangerouslySetInnerHTML: {
          __html: '/* 把你想的搁着 */'
        },
      },
      // ...
    };
    let message = { text: expectedTextButGotJSON };

    // React 0.13 中有风险
    <p>
      {message.text}
    </p>
```

##  17 React 如何区分 Class组件 和 Function组件

一般的方式是借助 `typeof` 和 `Function.prototype.toString` 来判断当前是不是 `class`，如下：

```js

    function isClass(func) {
      return typeof func === 'function'
        && /^class\s/.test(Function.prototype.toString.call(func));
    }
```

但是这个方式有它的局限性，因为如果用了 `babel` 等转换工具，将 `class` 写法全部转为 `function` 写法，上面的判断就会失效。

> `React` 区分 `Class`组件 和 `Function`组件的方式很巧妙，由于所有的类组件都要继承 `React.Component`，所以只要判断原型链上是否有 `React.Component` 就可以了：

```js

    AComponent.prototype instanceof React.Component
```

##  18 react组件的划分业务组件技术组件

*   根据组件的职责通常把组件分为UI组件和容器组件。
*   UI 组件负责 UI 的呈现，容器组件负责管理数据和逻辑。
*   两者通过`React-Redux` 提供`connect`方法联系起来

##  19 React如何进行组件/逻辑复用?

> 抛开已经被官方弃用的`Mixin`,组件抽象的技术目前有三种比较主流:

*   高阶组件:
    *   属性代理
    *   反向继承
*   渲染属性`Render Props`
*   `react-hooks`

##  20 说说你用react有什么坑点

*   `JSX`做表达式判断时候，需要强转为`boolean`类型
    *   如果不使用 `!!b` 进行强转数据类型，会在页面里面输出 `0`。

        ```js

            render() {
                const b = 0;
                return <div>
                    {
                      !!b && <div>这是一段文本</div>
                    }
                </div>
            }

        ```

*   尽量不要在 `componentWillReviceProps` 里使用 `setState`，如果一定要使用，那么需要判断结束条件，不然会出现无限重渲染，导致页面崩溃
*   给组件添加`ref`时候，尽量不要使用匿名函数，因为当组件更新的时候，匿名函数会被当做新的`prop`处理，让`ref`属性接受到新函数的时候，`react`内部会先清空`ref`，也就是会以`null`为回调参数先执行一次`ref`这个`props`，然后在以该组件的实例执行一次`ref`，所以用匿名函数做`ref`的时候，有的时候去`ref`赋值后的属性会取到`null`
*   遍历子节点的时候，不要用 `index` 作为组件的 `key` 进行传入

##  21 react和vue的区别

**共同**

*   都支持组件化
*   都是数据驱动视图
*   都用`vdom`操作`DOM`

**区别**

*   `React`使用`JSX`拥抱`JS`，`Vue`使用模板拥抱`HTML`
*   `React`函数式编程，`Vue`是声明式编程
*   `React`更多的是自力更生，`Vue`把你想要的都给你

##  22 对React实现原理的理解

###  前言介绍

*   `react` 和 `vue` 都是基于 `vdom` 的前端框架，之所以用 `vdom` 是因为可以精准的对比关心的属性，而且还可以跨平台渲染
*   但是开发不会直接写 `vdom`，而是通过 `jsx` 这种接近 `html` 语法的 `DSL`，编译产生 `render function`，执行后产生 `vdom`
*   `vdom` 的渲染就是根据不同的类型来用不同的 `dom api` 来操作 `dom`
*   渲染组件的时候，如果是函数组件，就执行它拿到 `vdom`。`class` 组件就创建实例然后调用 `render` 方法拿到 `vdom`。`vue` 的那种 `option` 对象的话，就调用 `render` 方法拿到 `vdom`
*   组件本质上就是对一段 `vdom` 产生逻辑的封装，`函数`、`class`、`option` 对象甚至其他形式都可以
*   `react` 和 `vue` 最大的区别在状态管理方式上，`vue` 是通过响应式，`react` 是通过 `setState` 的 `api`。我觉得这个是最大的区别，因为它导致了后面 `react` 架构的变更
*   `react` 的 `setState` 的方式，导致它并不知道哪些组件变了，需要渲染整个 `vdom` 才行。但是这样计算量又会比较大，会阻塞渲染，导致动画卡顿。所以 `react` 后来改造成了 `fiber` 架构，目标是可打断的计算
*   为了这个目标，不能变对比变更新 `dom` 了，所以把渲染分为了 `render` 和 `commit` 两个阶段，`render` 阶段通过 `schedule` 调度来进行 `reconcile`，也就是找到变化的部分，创建 `dom`，打上增删改的 `tag`，等全部计算完之后，`commit` 阶段一次性更新到 `dom`
*   打断之后要找到父节点、兄弟节点，所以 `vdom` 也被改造成了 `fiber` 的数据结构，有了 `parent`、`sibling` 的信息
*   所以 `fiber` 既指这种链表的数据结构，又指这个 `render`、`commit` 的流程
*   `reconcile` 阶段每次处理一个 `fiber` 节点，处理前会判断下 `shouldYield`，如果有更高优先级的任务，那就先执行别的
*   `commit` 阶段不用再次遍历 `fiber` 树，为了优化，`react` 把有 `effectTag` 的 `fiber` 都放到了 `effectList` 队列中，遍历更新即可
*   在`dom`操作前，会异步调用 `useEffect` 的回调函数，异步是因为不能阻塞渲染
*   在 `dom` 操作之后，会同步调用 `useLayoutEffect` 的回调函数，并且更新 `ref`
*   所以，`commit` 阶段又分成了 `before mutation`、`mutation`、`layout` 这三个小阶段，就对应上面说的那三部分

> 理解了 `vdom`、`jsx`、`组件本质`、`fiber`、`render(reconcile + schedule)` + `commit(before mutation、mutation、layout)`的渲染流程，就算是对 `react` 原理有一个比较深的理解

下面展开分析

###  vdom

为什么 `react` 和 `vue` 都要基于 `vdom` 呢？直接操作真实 `dom` 不行么？

考虑下这样的场景：

*   渲染就是用 `dom api` 对真实 `dom` 做增删改，如果已经渲染了一个 `dom`，后来要更新，那就要遍历它所有的属性，重新设置，比如 `id`、`clasName`、`onclick` 等。
*   而 `dom` 的属性是很多的：

![](https://s.poetries.work/uploads/2022/08/b14c40db3beb9881.png)

*   有很多属性根本用不到，但在更新时却要跟着重新设置一遍。
*   能不能只对比我们关心的属性呢？
*   把这些单独摘出来用 `JS` 对象表示不就行了？
*   这就是为什么要有 `vdom`，是它的第一个好处。
*   而且有了 `vdom` 之后，就没有和 `dom` 强绑定了，可以渲染到别的平台，比如 `native`、`canvas` 等等。
*   这是 `vdom` 的第二个好处。
*   我们知道了 `vdom` 就是用 `JS` 对象表示最终渲染的 `dom` 的，比如：

```js

    {
      type: 'div',
      props: {
        id: 'aaa',
        className: ['bbb', 'ccc'],
        onClick: function() {}
      },
      children: []
    }
```

然后用渲染器把它渲染出来，但是要让开发去写这样的 `vdom` 么？那肯定不行，这样太麻烦了，大家熟悉的是 `html` 那种方式，所以我们要引入编译的手段

###  dsl 的编译

*   `dsl` 是 `domain specific language`，领域特定语言的意思，`html`、`css` 都是 `web` 领域的 `dsl`
*   直接写 `vdom` 太麻烦了，所以前端框架都会设计一套 `dsl`，然后编译成 `render function`，执行后产生 `vdom`。
*   `vue` 和 `react` 都是这样

![](https://s.poetries.work/uploads/2022/08/3d654d2b28b78f94.png)

> 这套 dsl 怎么设计呢？前端领域大家熟悉的描述 `dom` 的方式是 `html`，最好的方式自然是也设计成那样。所以 `vue` 的 `template`，`react` 的 `jsx` 就都是这么设计的。`vue` 的 `template compiler` 是自己实现的，而 `react` 的 `jsx` 的编译器是 `babel` 实现的，是两个团队合作的结果。

编译成 `render function` 后再执行就是我们需要的 `vdom`。接下来渲染器把它渲染出来就行了。那渲染器怎么渲染 `vdom` 的呢？

###  渲染 vdom

渲染 `vdom` 也就是通过 `dom api` 增删改 `dom`。比如一个 `div`，那就要 `document.createElement` 创建元素，然后 `setAttribute` 设置属性，`addEventListener` 设置事件监听器。如果是文本，那就要 `document.createTextNode` 来创建。所以说根据 `vdom` 类型的不同，写个 `if else`，分别做不同的处理就行了。没错，不管 `vue` 还是 `react`，渲染器里这段 `if else` 是少不了的：

```js

    switch (vdom.tag) {
      case HostComponent:
        // 创建或更新 dom
      case HostText:
        // 创建或更新 dom
      case FunctionComponent: 
        // 创建或更新 dom
      case ClassComponent: 
        // 创建或更新 dom
    }
```

> `react` 里是通过 `tag` 来区分 `vdom` 类型的，比如 `HostComponent` 就是元素，`HostText` 就是文本，`FunctionComponent`、`ClassComponent` 就分别是函数组件和类组件。那么问题来了，组件怎么渲染呢？这就涉及到组件的原理了：

###  组件

> 我们的目标是通过 `vdom` 描述界面，在 `react` 里会使用 `jsx`。这样的 `jsx` 有的时候是基于 `state` 来动态生成的。如何把 `state` 和 `jsx` 关联起来呢？封装成 `function`、`class` 或者 `option`对象的形式。然后在渲染的时候执行它们拿到 `vdom`就行了。

这就是组件的实现原理：

```js

    switch (vdom.tag) {
      case FunctionComponent: 
           const childVdom = vdom.type(props);

           render(childVdom);
           //...
      case ClassComponent: 
         const instance = new vdom.type(props);
         const childVdom = instance.render();

         render(childVdom);
         //...
    } 
```

如果是函数组件，那就传入 `props` 执行它，拿到 `vdom` 之后再递归渲染。如果是 `class` 组件，那就创建它的实例对象，调用 `render` 方法拿到 `vdom`，然后递归渲染。所以，大家猜到 `vue` 的 `option` 对象的组件描述方式怎么渲染了么？

```js

    {
        data: {},
        props: {}
        render(h) {
            return h('div', {}, '');
        }
    }
```

没错，就是执行下 `render` 方法就行：

```js

    const childVdom = option.render();

    render(childVdom);
```

大家可能平时会写单文件组件 `sfc`的形式，那个会有专门的编译器，把 `template` 编译成 `render function`，然后挂到 `option 对象的`render` 方法上

![](https://s.poetries.work/uploads/2022/08/b5a9bf470a936def.png)

所以组件本质上只是对产生 `vdom` 的逻辑的封装，函数的形式、`option` 对象的形式、`class` 的形式都可以。就像 `vue3` 也有了函数组件一样，组件的形式并不重要。基于 `vdom` 的前端框架渲染流程都差不多，vue 和 react 很多方面是一样的。但是管理状态的方式不一样，`vue` 有响应式，而 `react` 则是 `setState` 的 `api` 的方式。真说起来，vue 和 react 最大的区别就是状态管理方式的区别，因为这个区别导致了后面架构演变方向的不同。

###  状态管理

> `react` 是通过 `setState` 的 `api` 触发状态更新的，更新以后就重新渲染整个 `vdom`。而 `vue` 是通过对状态做代理，`get` 的时候收集以来，然后修改状态的时候就可以触发对应组件的 `render` 了。

有的同学可能会问，为什么 `react` 不直接渲染对应组件呢？

想象一下这个场景：

父组件把它的 `setState` 函数传递给子组件，子组件调用了它。这时候更新是子组件触发的，但是要渲染的就只有那个组件么？明显不是，还有它的父组件。同理，某个组件更新实际上可能触发任意位置的其他组件更新的。所以必须重新渲染整个 `vdom` 才行。

那 `vue` 为啥可以做到精准的更新变化的组件呢？因为响应式的代理呀，不管是子组件、父组件、还是其他位置的组件，只要用到了对应的状态，那就会被作为依赖收集起来，状态变化的时候就可以触发它们的 `render`，不管是组件是在哪里的。这就是为什么 `react` 需要重新渲染整个 `vdom`，而 `vue` 不用。这个问题也导致了后来两者架构上逐渐有了差异。

###  react 架构的演变

*   `react15` 的时候，和 `vue` 的渲染流程还是很像的，都是递归渲染 `vdom`，增删改 `dom` 就行。但是因为状态管理方式的差异逐渐导致了架构的差异。
*   `react` 的 `setState` 会渲染整个 `vdom`，而一个应用的所有 `vdom` 可能是很庞大的，计算量就可能很大。浏览器里 `js` 计算时间太长是会阻塞渲染的，会占用每一帧的动画、重绘重排的时间，这样动画就会卡顿。作为一个有追求的前端框架，动画卡顿肯定是不行的。但是因为 `setState` 的方式只能渲染整个 `vdom`，所以计算量大是不可避免的。那能不能把计算量拆分一下，每一帧计算一部分，不要阻塞动画的渲染呢？顺着这个思路，`react` 就改造为了 `fiber` 架构。

###  fiber 架构

优化的目标是打断计算，分多次进行，但现在递归的渲染是不能打断的，有两个方面的原因导致的：

*   渲染的时候直接就操作了 dom 了，这时候打断了，那已经更新到 dom 的那部分怎么办？
*   现在是直接渲染的 vdom，而 vdom 里只有 children 的信息，如果打断了，怎么找到它的父节点呢？

**第一个问题的解决还是容易想到的：**

*   渲染的时候不要直接更新到 `dom` 了，只找到变化的部分，打个增删改的标记，创建好 `dom`，等全部计算完了一次性更新到 `dom` 就好了。
*   所以 `react` 把渲染流程分为了两部分： `render` 和 `commit`。
*   `render` 阶段会找到 `vdom` 中变化的部分，创建 `dom`，打上增删改的标记，这个叫做 `reconcile`，调和。
*   `reconcile` 是可以打断的，由 `schedule` 调度。
*   之后全部计算完了，就一次性更新到 `dom`，叫做 `commit`。
*   这样，`react` 就把之前的和 `vue` 很像的递归渲染，改造成了 `render（reconcile + schdule） + commit` 两个阶段的渲染。
*   从此以后，`react` 和 `vue` 架构上的差异才大了起来。

**第二个问题，如何打断以后还能找到父节点、其他兄弟节点呢？**

现有的 `vdom` 是不行的，需要再记录下 `parent`、`silbing` 的信息。所以 `react` 创造了 `fiber` 的数据结构。

![](https://s.poetries.work/uploads/2022/08/61ab11477198a2fe.png)

*   除了 `children` 信息外，额外多了 `sibling`、`return`，分别记录着兄弟节点、父节点的信息。
*   这个数据结构也叫做 `fiber`。（`fiber` 既是一种数据结构，也代表 `render + commit` 的渲染流程） `react` 会先把 `vdom` 转换成 `fiber`，再去进行 `reconcile`，这样就是可打断的了。
*   为什么这样就可以打断了呢？因为现在不再是递归，而是循环了：

```js

    function workLoop() {
      while (wip) {
        performUnitOfWork();
      }

      if (!wip && wipRoot) {
        commitRoot();
      }
    }
```

*   `react` 里有一个 workLoop 循环，每次循环做一个 `fiber` 的 `reconcile`，当前处理的 `fiber` 会放在 `workInProgress` 这个全局变量上。
*   当循环完了，也就是 `wip` 为空了，那就执行 `commit` 阶段，把 `reconcile` 的结果更新到 `dom`。
*   每个 `fiber` 的 `reconcile` 是根据类型来做的不同处理。当处理完了当前 `fiber` 节点，就把 `wip` 指向 `sibling`、`return` 来切到下个 `fiber` 节点。：

```js

    function performUnitOfWork() {
      const { tag } = wip;

      switch (tag) {
        case HostComponent:
          updateHostComponent(wip);
          break;

        case FunctionComponent:
          updateFunctionComponent(wip);
          break;

        case ClassComponent:
          updateClassComponent(wip);
          break;
        case Fragment:
          updateFragmentComponent(wip);
          break;
        case HostText:
          updateHostTextComponent(wip);
          break;
        default:
          break;
      }

      if (wip.child) {
        wip = wip.child;
        return;
      }

      let next = wip;

      while (next) {
        if (next.sibling) {
          wip = next.sibling;
          return;
        }
        next = next.return;
      }

      wip = null;
    }
```

> 函数组件和 `class` 组件的 `reconcile`和之前讲的一样，就是调用 `render` 拿到 `vdom`，然后继续处理渲染出的 `vdom`：

```js

    function updateClassComponent(wip) {
      const { type, props } = wip;
      const instance = new type(props);
      const children = instance.render();

      reconcileChildren(wip, children);
    }

    function updateFunctionComponent(wip) {
      renderWithHooks(wip);

      const { type, props } = wip;

      const children = type(props);
      reconcileChildren(wip, children);
    }
```

*   循环执行 `reconcile`，那每次处理之前判断一下是不是有更高优先级的任务，就能实现打断了。
*   所以我们在每次处理 `fiber` 节点的 `reconcile` 之前，都先调用下 `shouldYield` 方法：

```js

    function workLoop() {
      while (wip && shouldYield()) {
        performUnitOfWork();
      }

      if (!wip && wipRoot) {
        commitRoot();
      }
    }
```

*   `shouldYiled` 方法就是判断待处理的任务队列有没有优先级更高的任务，有的话就先处理那边的 `fiber`，这边的先暂停一下。
*   这就是 `fiber` 架构的 `reconcile` 可以打断的原理。通过 `fiber` 的数据结构，加上循环处理前每次判断下是否打断来实现的。
*   聊完了 `render` 阶段（`reconcile + schedule`），接下来就进入 `commit` 阶段了。
*   前面说过，为了变为可打断的，`reconcile` 阶段并不会真正操作 `dom`，只会创建 `dom` 然后打个 `effectTag` 的增删改标记。
*   `commit` 阶段就根据标记来更新 `dom` 就可以了。
*   但是 `commit` 阶段要再遍历一次 `fiber` 来查找有 `effectTag` 的节点，更新 `dom`么？
*   这样当然没问题，但没必要。完全可以在 reconcile 的时候把有 effectTag 的节点收集到一个队列里，然后 commit 阶段直接遍历这个队列就行了。
*   这个队列叫做 `effectList`。
*   `react` 会在 `commit` 阶段遍历 `effectList`，根据 `effectTag` 来增删改 `dom`。
*   `dom` 创建前后就是 `useEffect`、`useLayoutEffect` 还有一些函数组件的生命周期函数执行的时候。
*   `useEffect` 被设计成了在 `dom` 操作前异步调用，`useLayoutEffect` 是在 `dom` 操作后同步调用。
*   为什么这样呢？
*   因为都要操作 `dom` 了，这时候如果来了个 `effect` 同步执行，计算量很大，那不是把 fiber 架构带来的优势有毁了么？
*   所以 `effect` 是异步的，不会阻塞渲染。
*   而 `useLayoutEffect`，顾名思义是想在这个阶段拿到一些布局信息的，dom 操作完以后就可以了，而且都渲染完了，自然也就可以同步调用了。
*   实际上 `react` 把 `commit` 阶段也分成了 `3` 个小阶段。
*   `before mutation`、`mutation`、`layout`。
*   `mutation` 就是遍历 `effectList` 来更新 `dom` 的。
*   它的之前就是 `before mutation`，会异步调度 `useEffect` 的回调函数。
*   它之后就是 `layout` 阶段了，因为这个阶段已经可以拿到布局信息了，会同步调用 `useLayoutEffect` 的回调函数。而且这个阶段可以拿到新的 `dom` 节点，还会更新下 `ref`。
*   至此，我们对 `react` 的新架构，`render`、`commit` 两大阶段都干了什么就理清了。

##  23 React18新增了哪些特性

###  前言

*   在 `2021` 年 `6` 月份，`React 18 Working Group`（`React 18` 工作组，简称 `reactwg`）成立了，并且公布了 `v18` 版本的发布计划，经过将近一年的迭代和准备，在 `2022` 年 `3` 月 `29` 日，`React 18` 正式版终于发布了
*   `react 17` 的发布时间是 `2020` 年 `10` 月 `20`号，距离 `React 18` 发布足足间隔一年半，并且`v17`中只有三个小版本，分别是`17.0.0`、`17.0.1`、`17.0.2`
    *   `17.0.0` - `React 17` 正式版发布
    *   `17.0.1` - 只改动了 `1` 个文件，修复 `ie` 兼容问题，同时提升了 `V8` 内部对数组的执行性能
    *   `17.0.2` - 改动集中于 `Scheduler` 包, 主干逻辑没有变动，只与性能统计相关
*   在 `React 17` 的两次迭代中，都是只更新了补丁号，并且都是一些比较细节的更新，直到 `React 18` 正式版发布，`React 17` 都没有任何更新

**注意**

`React 18` 已经放弃了对 `ie11` 的支持，将于 `2022`年`6`月`15`日 停止支持 `ie`，如需兼容，需要回退到 `React 17` 版本

> `React 18` 中引入的新特性是使用现代浏览器的特性构建的，在`IE`中无法支持的`polyfill`，比如`micro-tasks`

###  新特性一览

*   新增了`useId`，`startTransition`，`useTransition`，`useDeferredValue`，`useSyncExternalStore`，`useInsertionEffect`等新的 `hook API`
*   针对浏览器和服务端渲染的 `React DOM API` 都有新的变化
    *   `React DOM Client` 新增 `createRoot` 和 `hydrateRoot` 方法
    *   `React DOM Server` 新增 `renderToPipeableStream` 和 `renderToReadableStream` 方法
*   **部分弃用特性**
    *   `ReactDOM.render` 已被弃用。使用它会警告：在 `React 17` 模式下运行您的应用程序
    *   `ReactDOM.hydrate`已被弃用。使用它会警告：在`React 17` 模式下运行您的应用程序
    *   `ReactDOM.unmountComponentAtNode`已被弃用。 `ReactDOM.renderSubtreeIntoContainer` 已被弃用
    *   `ReactDOMServer.renderToNodeStream` 已被弃用
*   **breaking change**
    *   `setState`自动批处理
    *   `Stricter Strict Mode`严格模式

###  Render API

为了更好的管理`root`节点，`React 18` 引入了一个新的 `root API`，新的 `root API` 还支持 `new concurrent renderer`（并发模式的渲染），它允许你进入`concurrent mode`（并发模式）

```js

    // React 17
    import React from 'react';
    import ReactDOM from 'react-dom';
    import App from './App';

    const root = document.getElementById('root')!;

    ReactDOM.render(<App />, root);

    // React 18
    import React from 'react';
    import ReactDOM from 'react-dom/client';
    import App from './App';

    const root = document.getElementById('root')!;

    ReactDOM.createRoot(root).render(<App />);
```

> 同时，在卸载组件时，我们也需要将 `unmountComponentAtNode` 升级为 `root.unmount`

```js

    // React 17
    ReactDOM.unmountComponentAtNode(root);

    // React 18
    root.unmount();
```

在新版本中，如果需要在 `render` 方法中使用回调函数，我们可以在组件中通过 `useEffect` 实现

```js

    // React 17
    const root = document.getElementById('root')!;
    ReactDOM.render(<App />, root, () => {
      console.log('渲染完成');
    });

    // React 18
    // React 18 从 render 方法中删除了回调函数，因为当使用Suspense时，它通常不会有预期的结果
    const AppWithCallback = () => {
      useEffect(() => {
        console.log('渲染完成');
      }, []);
      return <App />;
    };
    const root = document.getElementById('root')!;
    ReactDOM.createRoot(root).render(<AppWithCallback />);
```

> 如果你的项目使用了`ssr`服务端渲染，需要把`hydration`升级为`hydrateRoot`

```js

    // React 17
    import ReactDOM from 'react-dom';
    const root = document.getElementById('root');
    ReactDOM.hydrate(<App />, root);

    // React 18
    import ReactDOM from 'react-dom/client';
    const root = document.getElementById('root')!;
    ReactDOM.hydrateRoot(root, <App />);
```

> 另外，还需要更新 `TypeScript` 类型定义，如果你的项目使用了 `TypeScript`，最值得注意的变化是，现在在定义`props类`型时，如果需要获取子组件`children`，那么你需要显式的定义它，例如这样：

```js

    // React 17
    interface MyButtonProps {
      color: string;
    }

    const MyButton: React.FC<MyButtonProps> = ({ children }) => {
      // 在 React 17 的 FC 中，默认携带了 children 属性
      return <div>{children}</div>;
    };

    export default MyButton;

    // React 18
    interface MyButtonProps {
      color: string;
      children?: React.ReactNode;
    }

    const MyButton: React.FC<MyButtonProps> = ({ children }) => {
      // 在 React 18 的 FC 中，不存在 children 属性，需要手动申明
      return <div>{children}</div>;
    };

    export default MyButton;
```

###  setState合并更新

*   `React 18` 通过在默认情况下执行批处理来实现了开箱即用的性能改进
*   批处理是指为了获得更好的性能，在数据层，将`多个状态更新`批量处理，合并成`一次更新`（在视图层，将`多个渲染`合并成`一次渲染`）

**在 React 18 之前**

> 在`React 18`之前，`setState`在`React`的合成事件中是合并更新的，在`setTimeout`的原生事件中是同步按序更新的。例如

```js

    handleClick = () => {
      this.setState({ age: this.state.age + 1 });
      console.log(this.state.age); // 0
      this.setState({ age: this.state.age + 1 });
      console.log(this.state.age); // 0
      this.setState({ age: this.state.age + 1 });
      console.log(this.state.age); // 0
      setTimeout(() => {
        this.setState({ age: this.state.age + 1 });
        console.log(this.state.age); // 2
        this.setState({ age: this.state.age + 1 });
        console.log(this.state.age); // 3
      });
    };
```

> 而在`React 18`中，不论是在合成事件中，还是在宏任务中，都是会合并更新

```js

    function handleClick() {
      setState({ age: state.age + 1 }, onePriority);
      console.log(state.age);// 0
      setState({ age: state.age + 1 }, onePriority);
      console.log(state.age); // 0
      setTimeout(() => {
        setState({ age: state.age + 1 }, towPriority);
        console.log(state.age); // 1
        setState({ age: state.age + 1 }, towPriority);
        console.log(state.age); // 1
      });
    }
```

**总结：**

*   在 `18` 之前，只有在`react`事件处理函数中，才会自动执行批处理，其它情况会多次更新
*   在 `18` 之后，任何情况都会自动执行批处理，多次更新始终合并为一次

###  flushSync

> 批处理是一个`破坏性改动`，如果你想退出批量更新，你可以使用 `flushSync`，建议尽量不要这么做

```js

    import React, { useState } from 'react';
    import { flushSync } from 'react-dom';

    const App: React.FC = () => {
      const [count, setCount] = useState(0);
      return (
        <div
          onClick={() => {
            flushSync(() => {
              setCount(count => count + 1);
            });
            flushSync(() => {
              setCount(count => count + 2);
            });
          }}
        >
          <div>count1： {count1}</div>
          <div>count2： {count2}</div>
        </div>
      );
    };

    export default App;
```

> 注意：`flushSync` 函数内部的多个 `setState` 仍然为批量更新

###  改进Suspense

`Suspense`用于数据获取，可以“等待”目标代码加载，并且可以直接指定一个加载的界面（像是个 `spinner`），让它在用户等待的时候显示。

```js

    import {useState, Suspense} from "react";
    import User from "../components/User";
    import Num from "../components/Num";
    import {fetchData} from "../utils";
    import ErrorBoundaryPage from "./ErrorBoundaryPage";

    const initialResource = fetchData();

    export default function SuspensePage(props) {
      const [resource, setResource] = useState(initialResource);

      return (
        <div>
          <h3>SuspensePage</h3>
          <ErrorBoundaryPage fallback={<h1>网络出错了</h1>}>
            <Suspense fallback={<h1>loading - user</h1>}>
              <User resource={resource} />
            </Suspense>
          </ErrorBoundaryPage>

          <Suspense fallback={<h1>loading-num</h1>}>
            <Num resource={resource} />
          </Suspense>

          <button onClick={() => setResource(fetchData())}>refresh</button>
        </div>
      );
    }
```

**错误处理**

> 每当使用 `Promises`，大概率我们会用 `catch()` 来做错误处理。但当我们用 `Suspense` 时，我们不等待 `Promises` 就直接开始渲染，这时 `catch()` 就不适用了。这种情况下，错误处理该怎么进行呢？

在 `Suspense` 中，获取数据时抛出的错误和组件渲染时的报错处理方式一样——你可以在需要的层级渲染一个错误边界组件来“捕捉”层级下面的所有的报错信息。

```js

    export default class ErrorBoundaryPage extends React.Component {
      state = {hasError: false, error: null};
      static getDerivedStateFromError(error) {
        return {
          hasError: true,
          error,
        };
      }
      render() {
        if (this.state.hasError) {
          return this.props.fallback;
        }
        return this.props.children;
      }
    }
```

###  支持Concurrent模式

带来新的`API`，如`startTransition`、`useDeferredValue`等

*   为了支持以上特性，`React18`不仅加入了多任务处理，还加入了基于优先级的渲染、调度和打断
*   `React18`加入的新的模式，即"并发渲染（`concurrent renderin`g）"模式，当然这个模式是可选的，这个模式也使得`React`能够同时支持多个`UI`版本。这个变化对于开发者来说大部分是不可见的，但是它解锁了`React`应用在性能提升方面的一些新特性

> `Concurrent` 模式是一组 `React` 的新功能，可帮助应用保持响应，并根据用户的设备性能和网速进行适当的调整

在 `Concurrent` 模式中，`React` 可以 同时 更新多个状态 —— 就像分支可以让不同的团队成员独立地工作一样

*   对于 `CPU-bound` 的更新 (例如创建新的 `DOM`节点和运行组件中的代码)，并发意味着一个更急迫的更新可以“中断”已经开始的渲染。
*   对于 `IO-bound` 的更新 (例如从网络加载代码或数据)，并发意味着 `React` 甚至可以在全部数据到达之前就在内存中开始渲染，然后跳过令人不愉快的空白加载状态

重要的是，你使用 `React` 的方式是相同的。`components`，`props`，和 `state` 等概念的基本工作方式是相同的。当你想更新屏幕，设置 `state`即可

`React` 使用一种启发式方法决定更新的“紧急性”，并且允许你用几行代码对其进行调整，以便你可以在每次交互中实现理想的用户体验

> 简单来说，`Concurrent`模式想做到的事情就是用户可以自定义更新任务优先级并且能够通知到`React`，`React`再来处理不同优先级的更新任务，当然，优先处理高优先级任务，并且低优先级任务可以中断

`Concurrent` 模式减少了防抖和节流在 `UI` 中的需求。因为渲染是可以中断的，`React` 不需要人为地 延迟 工作以避免卡顿（比如使用`setTimeout`）。它可以立即开始渲染，但是当需要保持应用响应时中断这项工作

![](https://s.poetries.work/uploads/2023/02/2027503a209c69f2.png)

###  组件返回undefined不再报错

```js

    export default function UndefinedPage(props) {
      return undefined;
    }
```

`React`以前之所以返回`undefined`会报错，是为了帮助用户快速排错，因为用户可能会忘记返回组件。这是当时`2017`年把组件返回`undefined`报错处理的原因，但是现在来看呢，今时不同往日了，现在的类型检测工具都非常流行并且可靠了，比如`ts`。所以现在`React`可以不再帮助用户排查忘记给组件添加返回值的情况了。

并且还有一点，这个改动和`React18`之后的特性也相关。比如`Suspense`，如果我不想要`fallback`所以才赋值`undefined`，但是`React`报错，这理论上有点矛盾

###  startTransition

`startTransition`包裹里的更新函数被当做是非紧急事件，如果有别的紧急更新（`urgent update`）进来，那么这个`startTransition`包裹里的更新则会被打断

**React把状态更新分成两种：**

*   `Urgent updates` 紧急更新，指直接交互。如点击、输入、滚动、拖拽等
*   `Transition updates` 过渡更新，如`UI`从一个视图向另一个视图的更新

```js

    import {useEffect, useState, Suspense} from "react";
    import Button from "../components/Button";
    import User from "../components/User";
    import Num from "../components/Num";
    import {fetchData} from "../utils";

    const initialResource = fetchData();

    export default function TransitionPage(props) {
      const [resource, setResource] = useState(initialResource);

      // useEffect(() => {
      //   console.log("resource", resource); //sy-log
      // }, [resource]);

      return (
        <div>
          <h3>TransitionPage</h3>
          <Suspense fallback={<h1>loading - user</h1>}>
            <User resource={resource} />
          </Suspense>

          <Suspense fallback={<h1>loading-num</h1>}>
            <Num resource={resource} />
          </Suspense>

          <Button
            refresh={() => {
              setResource(fetchData());
            }}
          />
        </div>
      );
    }
```

```js

    import {
      //startTransition,
      useTransition,
    } from "react";

    export default function Button({refresh}) {
      const [isPending, startTransition] = useTransition();

      return (
        <div className="border">
          <h3>Button</h3>
          <button
            onClick={() => {
              startTransition(() => {
                refresh();
              });
            }}
            disabled={isPending}>
            点击刷新数据
          </button>
          {isPending ? <div>loading...</div> : null}
        </div>
      );
    }
```

**与setTimeout异同**

*   在`startTransition`出现之前，我们可以使用`setTimeout`来实现优化。但是现在在处理上面的优化的时候，有了`startTransition`基本上可以抛弃`setTimeout`了，原因主要有以三点：
*   首先，与`setTimeout`不同的是，`startTransition`并不会延迟调度，而是会立即执行，`startTransition`接收的函数是同步执行的，只是这个`update`被加了一个“`transitions`"的标记。而这个标记，`React`内部处理更新的时候是会作为参考信息的。这就意味着，相比于`setTimeout`， 把一个update交给`startTransition`能够更早地被处理。而在于较快的设备上，这个过度是用户感知不到的

**使用场景**

`startTransition`可以用在任何你想更新的时候。但是从实际来说，以下是两种典型适用场景：

*   渲染慢：如果你有很多没那么着急的内容要渲染更新。
*   网络慢：如果你的更新需要花较多时间从服务端获取。这个时候也可以再结合`Suspense`

**useTransition**

在使用`startTransition`更新状态的时候，用户可能想要知道`transition`的实时情况，这个时候可以使用`React`提供的`hook api useTransition`

```js

    import { useTransition } from 'react';
    const [isPending, startTransition] = useTransition();
```

如果`transition`未完成，`isPending`值为`true`，否则为`false`

###  useDeferredValue

> 使得我们可以延迟更新某个不那么重要的部分

举例：如下图，当用户在输入框输入“书”的时候，用户应该立马看到输入框的反应，而相比之下，下面的模糊查询框如果延迟出现一会儿其实是完全可以接受的，因为用户可能会继续修改输入框内容，这个过程中模糊查询结果还是会变化，但是这个变化对用户来说相对没那么重要，用户最关心的是看到最后的匹配结果

![](https://s.poetries.work/uploads/2023/02/de03ec06d4ef15ee.png)

```js

    import {useDeferredValue, useState} from "react";
    import MySlowList from "../components/MySlowList";

    export default function UseDeferredValuePage(props) {
      const [text, setText] = useState("hello");
      const deferredText = useDeferredValue(text);

      const handleChange = (e) => {
        setText(e.target.value);
      };
      return (
        <div>
          <h3>UseDeferredValuePage</h3>
          {/* 保持将当前文本传递给 input */}
          <input value={text} onChange={handleChange} />
          {/* 但在必要时可以将列表“延后” */}
          <p>{deferredText}</p>

          <MySlowList text={deferredText} />
        </div>
      );
    }
```

```js

    // MySlowList.js

    import React, {memo} from "react";

    function ListItem({children}) {
      let now = performance.now();
      while (performance.now() - now < 3) {}
      return <div className="ListItem">{children}</div>;
    }

    export default memo(function MySlowList({text}) {
      let items = [];
      for (let i = 0; i < 80; i++) {
        items.push(
          <ListItem key={i}>
            Result #{i} for "{text}"
          </ListItem>
        );
      }
      return (
        <div className="border">
          <p>
            <b>Results for "{text}":</b>
          </p>
          <ul className="List">{items}</ul>
        </div>
      );
    });
```

**源码**

![](https://s.poetries.work/uploads/2023/02/4160e3dd6e3450ac.png)
