---
title: 3 Promise面试题
sidebarDepth: 1
---


**event loop它的执行顺序：**

*   一开始整个脚本作为一个宏任务执行
*   执行过程中同步代码直接执行，宏任务进入宏任务队列，微任务进入微任务队列
*   当前宏任务执行完出队，检查微任务列表，有则依次执行，直到全部执行完
*   执行浏览器UI线程的渲染工作
*   检查是否有Web Worker任务，有则执行
*   执行完本轮的宏任务，回到2，依此循环，直到宏任务和微任务队列都为空

**微任务包括**：`MutationObserver`、`Promise.then()`或`reject()`、`Promise`为基础开发的其它技术，比如`fetch API`、`V8`的垃圾回收过程、`Node`独有的`process.nextTick`。

**宏任务包括**：`script、script` 、`setTimeout`、`setInterval` 、`setImmediate` 、`I/O` 、`UI rendering`

##  1 Promise的几道基础题

###  1.1 题目一

```jsx

    const promise1 = new Promise((resolve, reject) => {
      console.log('promise1')
    })
    console.log('1', promise1);
```

*   从上至下，先遇到new Promise，执行该构造函数中的代码promise1
*   然后执行同步代码1，此时promise1没有被resolve或者reject，因此状态还是pending

```jsx

    'promise1'
    '1' Promise{<pending>}
```

###  1.2 题目二

```jsx

    const promise = new Promise((resolve, reject) => {
      console.log(1);
      resolve('success')
      console.log(2);
    });
    promise.then(() => {
      console.log(3);
    });
    console.log(4);
```

*   从上至下，先遇到new Promise，执行其中的同步代码1
*   再遇到resolve('success')， 将promise的状态改为了resolved并且将值保存下来
*   继续执行同步代码2
*   跳出promise，往下执行，碰到promise.then这个微任务，将其加入微任务队列
*   执行同步代码4
*   本轮宏任务全部执行完毕，检查微任务队列，发现promise.then这个微任务且状态为resolved，执行它。

```jsx

    1 2 4 3
```

###  1.3 题目三

```jsx

    const promise = new Promise((resolve, reject) => {
      console.log(1);
      console.log(2);
    });
    promise.then(() => {
      console.log(3);
    });
    console.log(4);
```

*   和题目二相似，只不过在`promise`中并没有`resolve`或者`reject`
*   因此`promise.then`并不会执行，它只有在被改变了状态之后才会执行。

```jsx

    1 2 4
```

###  1.4 题目四

```jsx

    const promise1 = new Promise((resolve, reject) => {
      console.log('promise1')
      resolve('resolve1')
    })
    const promise2 = promise1.then(res => {
      console.log(res)
    })
    console.log('1', promise1);
    console.log('2', promise2);
```

*   从上至下，先遇到`new Promise`，执行该构造函数中的代码`promise1`
*   碰到`resolve`函数, 将`promise1`的状态改变为`resolved`, 并将结果保存下来
*   碰到`promise1.then`这个微任务，将它放入微任务队列
*   `promise2`是一个新的状态为`pending的`Promise`
*   执行同步代码1， 同时打印出`promise1`的状态是`resolved`
*   执行同步代码2，同时打印出`promise2`的状态是`pending`
*   宏任务执行完毕，查找微任务队列，发现`promise1.then`这个微任务且状态为resolved，执行它。

```jsx

    'promise1'
    '1' Promise{<resolved>: 'resolve1'}
    '2' Promise{<pending>}
    'resolve1'
```

###  1.5 题目五

```jsx

    const fn = () => (new Promise((resolve, reject) => {
      console.log(1);
      resolve('success')
    }))
    fn().then(res => {
      console.log(res)
    })
    console.log('start')
```

请仔细看看哦，fn函数它是直接返回了一个new Promise的，而且fn函数的调用是在start之前，所以它里面的内容应该会先执行。

```jsx

    1
    'start'
    'success'
```

###  1.6 题目六

如果把fn的调用放到start之后呢？

```jsx

    const fn = () =>
      new Promise((resolve, reject) => {
        console.log(1);
        resolve("success");
      });
    console.log("start");
    fn().then(res => {
      console.log(res);
    });
```

现在start就在1之前打印出来了，因为fn函数是之后执行的。

> 注意⚠️：之前我们很容易就以为看到`new Promise()`就执行它的第一个参数函数了，其实这是不对的，就像这两道题中，我们得注意它是不是被包裹在函数当中，如果是的话，只有在函数调用的时候才会执行。

```jsx

    "start"
    1
    "success"
```

##  2\. Promise结合setTimeout

###  2.1 题目一

```jsx

    console.log('start')
    setTimeout(() => {
      console.log('time')
    })
    Promise.resolve().then(() => {
      console.log('resolve')
    })
    console.log('end')
```

*   刚开始整个脚本作为一个宏任务来执行，对于同步代码直接压入执行栈进行执行，因此先打印出start和end。
*   setTimout作为一个宏任务被放入宏任务队列(下一个)
*   Promise.then作为一个微任务被放入微任务队列
*   本次宏任务执行完，检查微任务，发现Promise.then，执行它
*   接下来进入下一个宏任务，发现setTimeout，执行。

```jsx

    'start'
    'end'
    'resolve'
    'time'
```

###  2.2 题目二

```jsx

    const promise = new Promise((resolve, reject) => {
      console.log(1);
      setTimeout(() => {
        console.log("timerStart");
        resolve("success");
        console.log("timerEnd");
      }, 0);
      console.log(2);
    });
    promise.then((res) => {
      console.log(res);
    });
    console.log(4);
```

> 和题目1.2很像，不过在resolve的外层加了一层setTimeout定时器。

*   从上至下，先遇到new Promise，执行该构造函数中的代码1
*   然后碰到了定时器，将这个定时器中的函数放到下一个宏任务的延迟队列中等待执行 执行同步代码2
*   跳出promise函数，遇到promise.then，但其状态还是为pending，这里理解为先不执行 执行同步代码4
*   一轮循环过后，进入第二次宏任务，发现延迟队列中有setTimeout定时器，执行它
*   首先执行timerStart，然后遇到了resolve，将promise的状态改为resolved且保存结果并将之前的promise.then推入微任务队列
*   继续执行同步代码timerEnd
*   宏任务全部执行完毕，查找微任务队列，发现promise.then这个微任务，执行它

```jsx

    1
    2
    4
    "timerStart"
    "timerEnd"
    "success"
```

###  2.3 题目三

题目三分了两个题目，因为看着都差不多，不过执行的结果却不一样，大家不妨先猜猜下面两个题目分别执行什么：

```jsx

    setTimeout(() => {
      console.log('timer1');
      setTimeout(() => {
        console.log('timer3')
      }, 0)
    }, 0)
    setTimeout(() => {
      console.log('timer2')
    }, 0)
    console.log('start')
```

```jsx

    'start'
    'timer1'
    'timer2'
    'timer3'
```

```jsx

    setTimeout(() => {
      console.log('timer1');
      Promise.resolve().then(() => {
        console.log('promise')
      })
    }, 0)
    setTimeout(() => {
      console.log('timer2')
    }, 0)
    console.log('start')
```

```jsx

    'start'
    'timer1'
    'promise'
    'timer2'
```

*   这两个例子，看着好像只是把第一个定时器中的内容换了一下而已。
*   一个是为定时器timer3，一个是为Promise.then
*   但是如果是定时器timer3的话，它会在timer2后执行，而Promise.then却是在timer2之前执行。
*   你可以这样理解，Promise.then是微任务，它会被加入到本轮中的微任务列表，而定时器timer3是宏任务，它会被加入到下一轮的宏任务中。
*   理解完这两个案例，可以来看看下面一道比较难的题目了

###  2.4 题目三

```jsx

    Promise.resolve().then(() => {
      console.log('promise1');
      const timer2 = setTimeout(() => {
        console.log('timer2')
      }, 0)
    });
    const timer1 = setTimeout(() => {
      console.log('timer1')
      Promise.resolve().then(() => {
        console.log('promise2')
      })
    }, 0)
    console.log('start');
```

*   这道题稍微的难一些，在promise中执行定时器，又在定时器中执行promise；
*   并且要注意的是，这里的Promise是直接resolve的，而之前的new Promise不一样。

**因此过程分析为**

*   刚开始整个脚本作为第一次宏任务来执行，我们将它标记为宏1，从上至下执行
*   遇到Promise.resolve().then这个微任务，将then中的内容加入第一次的微任务队列标记为微1
*   遇到定时器timer1，将它加入下一次宏任务的延迟列表，标记为宏2，等待执行(先不管里面是什么内容)
*   执行宏1中的同步代码start
*   第一次宏任务(宏1)执行完毕，检查第一次的微任务队列(微1)，发现有一个promise.then这个微任务需要执行
*   执行打印出微1中同步代码promise1，然后发现定时器timer2，将它加入宏2的后面，标记为宏3
*   第一次微任务队列(微1)执行完毕，执行第二次宏任务(宏2)，首先执行同步代码timer1
*   然后遇到了promise2这个微任务，将它加入此次循环的微任务队列，标记为微2
*   宏2中没有同步代码可执行了，查找本次循环的微任务队列(微2)，发现了promise2，执行它
*   第二轮执行完毕，执行宏3，打印出timer2

```jsx

    'start'
    'promise1'
    'timer1'
    'promise2'
    'timer2'
```

![](https://s.poetries.work/gitee/2020/03/2.png)

###  2.5 题目四

```jsx

    const promise1 = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('success')
      }, 1000)
    })
    const promise2 = promise1.then(() => {
      throw new Error('error!!!')
    })
    console.log('promise1', promise1)
    console.log('promise2', promise2)
    setTimeout(() => {
      console.log('promise1', promise1)
      console.log('promise2', promise2)
    }, 2000)
```

*   从上至下，先执行第一个new Promise中的函数，碰到setTimeout将它加入下一个宏任务列表
*   跳出new Promise，碰到promise1.then这个微任务，但其状态还是为pending，这里理解为先不执行
*   promise2是一个新的状态为pending的Promise
*   执行同步代码console.log('promise1')，且打印出的promise1的状态为pending
*   执行同步代码console.log('promise2')，且打印出的promise2的状态为pending
*   碰到第二个定时器，将其放入下一个宏任务列表
*   第一轮宏任务执行结束，并且没有微任务需要执行，因此执行第二轮宏任务
*   先执行第一个定时器里的内容，将promise1的状态改为resolved且保存结果并将之前的promise1.then推入微任务队列
*   该定时器中没有其它的同步代码可执行，因此执行本轮的微任务队列，也就是promise1.then，它抛出了一个错误，且将promise2的状态设置为了rejected
*   第一个定时器执行完毕，开始执行第二个定时器中的内容
*   打印出'promise1'，且此时promise1的状态为resolved
*   打印出'promise2'，且此时promise2的状态为rejected

```jsx

    'promise1' Promise{<pending>}
    'promise2' Promise{<pending>}
    test5.html:102 Uncaught (in promise) Error: error!!! at test.html:102
    'promise1' Promise{<resolved>: "success"}
    'promise2' Promise{<rejected>: Error: error!!!}
```

###  2.6 题目五

如果你上面这道题搞懂了之后，我们就可以来做做这道了，你应该能很快就给出答案：

```jsx

    const promise1 = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("success");
        console.log("timer1");
      }, 1000);
      console.log("promise1里的内容");
    });
    const promise2 = promise1.then(() => {
      throw new Error("error!!!");
    });
    console.log("promise1", promise1);
    console.log("promise2", promise2);
    setTimeout(() => {
      console.log("timer2");
      console.log("promise1", promise1);
      console.log("promise2", promise2);
    }, 2000);
```

```jsx

    'promise1里的内容'
    'promise1' Promise{<pending>}
    'promise2' Promise{<pending>}
    'timer1'
    test5.html:102 Uncaught (in promise) Error: error!!! at test.html:102
    'timer2'
    'promise1' Promise{<resolved>: "success"}
    'promise2' Promise{<rejected>: Error: error!!!}
```

##  3\. Promise中的then、catch、finally

*   Promise的状态一经改变就不能再改变
*   .then和.catch都会返回一个新的Promise
*   catch不管被连接到哪里，都能捕获上层的错误
*   在Promise中，返回任意一个非 promise 的值都会被包裹成 promise 对象，例如return 2会被包装为return Promise.resolve(2)
*   Promise 的 .then 或者 .catch 可以被调用多次, 当如果Promise内部的状态一经改变，并且有了一个值，那么后续每次调用.then或者.catch的时候都会直接拿到该值
*   .then 或者 .catch 中 return 一个 error 对象并不会抛出错误，所以不会被后续的 .catch 捕获
*   .then 或 .catch 返回的值不能是 promise 本身，否则会造成死循环
*   .then 或者 .catch 的参数期望是函数，传入非函数则会发生值穿透
*   .then方法是能接收两个参数的，第一个是处理成功的函数，第二个是处理失败的函数，再某些时候你可以认为catch是.then第二个参数的简便写法
*   .finally方法也是返回一个Promise，他在Promise结束的时候，无论结果为resolved还是rejected，都会执行里面的回调函数

###  3.1 题目一

```jsx

    const promise = new Promise((resolve, reject) => {
      resolve("success1");
      reject("error");
      resolve("success2");
    });
    promise
    .then(res => {
        console.log("then: ", res);
      }).catch(err => {
        console.log("catch: ", err);
      })
```

```jsx

    "then: success1"
```

> 构造函数中的 resolve 或 reject 只有第一次执行有效，多次调用没有任何作用 。验证了第一个结论，Promise的状态一经改变就不能再改变

###  3.2 题目二

```jsx

    const promise = new Promise((resolve, reject) => {
      reject("error");
      resolve("success2");
    });
    promise
    .then(res => {
        console.log("then: ", res);
      }).then(res => {
        console.log("then: ", res);
      }).catch(err => {
        console.log("catch: ", err);
      }).then(res => {
        console.log("then: ", res);
      })
```

```jsx

    "catch: " "error"
    "then3: " undefined
```

> 验证了第三个结论，catch不管被连接到哪里，都能捕获上层的错误。

###  3.3 题目三

```jsx

    Promise.resolve(1)
      .then(res => {
        console.log(res);
        return 2;
      })
      .catch(err => {
        return 3;
      })
      .then(res => {
        console.log(res);
      });
```

```jsx

    1
    2
```

*   Promise可以链式调用，不过promise 每次调用 .then 或者 .catch 都会返回一个新的 promise，从而实现了链式调用, 它并不像一般我们任务的链式调用一样return this
*   上面的输出结果之所以依次打印出1和2，那是因为resolve(1)之后走的是第一个then方法，并没有走catch里，所以第二个then中的res得到的实际上是第一个then的返回值
*   且return 2会被包装成resolve(2)

###  3.4 题目四

如果把3.3中的Promise.resolve(1)改为Promise.reject(1)又会怎么样呢？

```jsx

    Promise.reject(1)
      .then(res => {
        console.log(res);
        return 2;
      })
      .catch(err => {
        console.log(err);
        return 3
      })
      .then(res => {
        console.log(res);
      });
```

```jsx

    1
    3
```

> 结果打印的当然是 1 和 3啦，因为reject(1)此时走的就是catch，且第二个then中的res得到的就是catch中的返回值

###  3.5 题目五

```jsx

    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('timer')
        resolve('success')
      }, 1000)
    })
    const start = Date.now();
    promise.then(res => {
      console.log(res, Date.now() - start)
    })
    promise.then(res => {
      console.log(res, Date.now() - start)
    })
```

```jsx

    'timer'
    success 1001
    success 1002
```

当然，如果你足够快的话，也可能两个都是1001。 Promise 的 .then 或者 .catch 可以被调用多次，但这里 Promise 构造函数只执行一次。或者说 promise 内部状态一经改变，并且有了一个值，那么后续每次调用 .then 或者 .catch 都会直接拿到该值

###  3.6 题目六

```jsx

    Promise.resolve().then(() => {
      return new Error('error!!!')
    }).then(res => {
      console.log("then: ", res)
    }).catch(err => {
      console.log("catch: ", err)
    })
```

*   你可能想到的是进入.catch然后被捕获了错误。
*   结果并不是这样的，它走的是.then里面：

```jsx

    "then: " "Error: error!!!"
```

> 这也验证了第4点和第6点，返回任意一个非 promise 的值都会被包裹成 promise 对象，因此这里的return new Error('error!!!')也被包裹成了return Promise.resolve(new Error('error!!!'))

当然如果你抛出一个错误的话，可以用下面👇两的任意一种：

```jsx

    return Promise.reject(new Error('error!!!'));
    // or
    throw new Error('error!!!')
```

###  3.7 题目七

```jsx

    const promise = Promise.resolve().then(() => {
      return promise;
    })
    promise.catch(console.err)
```

> .then 或 .catch 返回的值不能是 promise 本身，否则会造成死循环。

因此结果会报错：

```jsx

    Uncaught (in promise) TypeError: Chaining cycle detected for promise #<Promise>
```

###  3.8 题目八

```jsx

    Promise.resolve(1)
      .then(2)
      .then(Promise.resolve(3))
      .then(console.log)
```

*   其实你只要记住原则8：.then 或者 .catch 的参数期望是函数，传入非函数则会发生值穿透。
*   第一个then和第二个then中传入的都不是函数，一个是数字类型，一个是对象类型，因此发生了穿透，将resolve(1) 的值直接传到最后一个then里。

所以输出结果为：

```jsx

    1
```

###  3.9 题目九

下面来介绍一下.then函数中的两个参数。

第一个参数是用来处理Promise成功的函数，第二个则是处理失败的函数。 也就是说Promise.resolve('1')的值会进入成功的函数，Promise.reject('2')的值会进入失败的函数。

让我们来看看这个例子

```jsx

    Promise.reject('err!!!')
      .then((res) => {
        console.log('success', res)
      }, (err) => {
        console.log('error', err)
      }).catch(err => {
        console.log('catch', err)
      })
```

这里的执行结果是：

```jsx

    'error' 'error!!!'
```

> 它进入的是then()中的第二个参数里面，而如果把第二个参数去掉，就进入了catch()中：

```jsx

    Promise.reject('err!!!')
      .then((res) => {
        console.log('success', res)
      }).catch(err => {
        console.log('catch', err)
      })
```

执行结果：

```jsx

    'catch' 'error!!!'
```

但是有一个问题，如果是这个案例呢？

```jsx

    Promise.resolve()
      .then(function success (res) {
        throw new Error('error!!!')
      }, function fail1 (err) {
        console.log('fail1', err)
      }).catch(function fail2 (err) {
        console.log('fail2', err)
      })
```

> 由于Promise调用的是resolve()，因此.then()执行的应该是success()函数，可是success()函数抛出的是一个错误，它会被后面的catch()给捕获到，而不是被fail1函数捕获。

因此执行结果为：

```jsx

    fail2 Error: error!!!
    			at success
```

###  3.10 题目十

接着来看看.finally()，这个功能一般不太用在面试中，不过如果碰到了你也应该知道该如何处理。

```jsx

    function promise1 () {
      let p = new Promise((resolve) => {
        console.log('promise1');
        resolve('1')
      })
      return p;
    }
    function promise2 () {
      return new Promise((resolve, reject) => {
        reject('error')
      })
    }
    promise1()
      .then(res => console.log(res))
      .catch(err => console.log(err))
      .finally(() => console.log('finally1'))

    promise2()
      .then(res => console.log(res))
      .catch(err => console.log(err))
      .finally(() => console.log('finally2'))
```

结果：

```jsx

    'promise1'
    '1'
    'error'
    'finally1'
    'finally2'
```

##  4\. Promise中的all和race

*   在做下面👇的题目之前，让我们先来了解一下Promise.all()和Promise.race()的用法。
*   通俗来说，.all()的作用是接收一组异步任务，然后并行执行异步任务，并且在所有异步操作执行完后才执行回调。
*   `.race()`的作用也是接收一组异步任务，然后并行执行异步任务，只保留取第一个执行完成的异步操作的结果，其他的方法仍在执行，不过执行结果会被抛弃。

来看看题目一。

###  4.1 题目一

我们知道如果直接在脚本文件中定义一个Promise，它构造函数的第一个参数是会立即执行的，就像这样：

```jsx

    const p1 = new Promise(r => console.log('立即打印'))
```

控制台中会立即打印出 “立即打印”。

因此为了控制它什么时候执行，我们可以用一个函数包裹着它，在需要它执行的时候，调用这个函数就可以了：

```jsx

    function runP1 () {
    	const p1 = new Promise(r => console.log('立即打印'))
    	return p1
    }

    runP1() // 调用此函数时才执行
```

OK 👌， 让我们回归正题。 现在来构建这么一个函数：

```jsx

    function runAsync (x) {
    	const p = new Promise(r => setTimeout(() => r(x, console.log(x)), 1000))
    	return p
    }
```

*   该函数传入一个值x，然后间隔一秒后打印出这个x。
*   如果我用`.all()`来执行它会怎样呢？

```jsx

    function runAsync (x) {
    	const p = new Promise(r => setTimeout(() => r(x, console.log(x)), 1000))
    	return p
    }
    Promise.all([runAsync(1), runAsync(2), runAsync(3)])
      .then(res => console.log(res))
```

*   先来想想此段代码在浏览器中会如何执行？
*   没错，当你打开页面的时候，在间隔一秒后，控制台会同时打印出1, 2, 3，还有一个数组[1, 2, 3]。

```jsx

    1
    2
    3
    [1, 2, 3]
```

> 所以你现在能理解这句话的意思了吗：有了all，你就可以并行执行多个异步操作，并且在一个回调中处理所有的返回数据

*   .all()后面的.then()里的回调函数接收的就是所有异步操作的结果。
*   而且这个结果中数组的顺序和Promise.all()接收到的数组顺序一致！！！

> 有一个场景是很适合用这个的，一些游戏类的素材比较多的应用，打开网页时，预先加载需要用到的各种资源如图片、flash以及各种静态文件。所有的都加载完后，我们再进行页面的初始化。

###  4.2 题目二

我新增了一个runReject函数，它用来在1000 * x秒后reject一个错误。

同时.catch()函数能够捕获到.all()里最先的那个异常，并且只执行一次。

想想这道题会怎样执行呢 🤔️？

```jsx

    function runAsync (x) {
      const p = new Promise(r => setTimeout(() => r(x, console.log(x)), 1000))
      return p
    }
    function runReject (x) {
      const p = new Promise((res, rej) => setTimeout(() => rej(`Error: ${x}`, console.log(x)), 1000 * x))
      return p
    }
    Promise.all([runAsync(1), runReject(4), runAsync(3), runReject(2)])
      .then(res => console.log(res))
      .catch(err => console.log(err))
```

```jsx

    1
    3
    // 2s后输出
    2
    Error: 2
    // 4s后输出
    4
```

没错，就像我之前说的，.catch是会捕获最先的那个异常，在这道题目中最先的异常就是runReject(2)的结果。

另外，如果一组异步操作中有一个异常都不会进入.then()的第一个回调函数参数中。

注意，为什么不说是不进入.then()中呢 🤔️？

哈哈，大家别忘了.then()方法的第二个参数也是可以捕获错误的：

```jsx

    Promise.all([runAsync(1), runReject(4), runAsync(3), runReject(2)])
      .then(res => console.log(res), 
      err => console.log(err))
```

###  4.3 题目三

所以使用.race()方法，它只会获取最先执行完成的那个结果，其它的异步任务虽然也会继续进行下去，不过race已经不管那些任务的结果了。

```jsx

    function runAsync (x) {
      const p = new Promise(r => setTimeout(() => r(x, console.log(x)), 1000))
      return p
    }
    Promise.race([runAsync(1), runAsync(2), runAsync(3)])
      .then(res => console.log('result: ', res))
      .catch(err => console.log(err))
```

```jsx

    1
    'result: ' 1
    2
    3
```

> 这个race有什么用呢？使用场景还是很多的，比如我们可以用race给某个异步请求设置超时时间，并且在超时后执行相应的操作

###  4.4 题目四

```jsx

    function runAsync(x) {
      const p = new Promise(r =>
        setTimeout(() => r(x, console.log(x)), 1000)
      );
      return p;
    }
    function runReject(x) {
      const p = new Promise((res, rej) =>
        setTimeout(() => rej(`Error: ${x}`, console.log(x)), 1000 * x)
      );
      return p;
    }
    Promise.race([runReject(0), runAsync(1), runAsync(2), runAsync(3)])
      .then(res => console.log("result: ", res))
      .catch(err => console.log(err));
```

> 遇到错误的话，也是一样的，在这道题中，`runReject(0)`最先执行完，所以进入了`catch()`中：

```jsx

    0
    'Error: 0'
    1
    2
    3
```

**总结**

> 好的，让我们来总结一下.then()和.race()吧，😄

*   Promise.all()的作用是接收一组异步任务，然后并行执行异步任务，并且在所有异步操作执行完后才执行回调。
*   .race()的作用也是接收一组异步任务，然后并行执行异步任务，只保留取第一个执行完成的异步操作的结果，其他的方法仍在执行，不过执行结果会被抛弃。
*   Promise.all().then()结果中数组的顺序和Promise.all()接收到的数组顺序一致

##  5\. async/await的几道题

> 既然谈到了Promise，那就肯定得再说说async/await，在很多时候async和Promise的解法差不多，又有些不一样。不信你来看看题目一。

###  5.1 题目一

```jsx

    async function async1() {
      console.log("async1 start");
      await async2();
      console.log("async1 end");
    }
    async function async2() {
      console.log("async2");
    }
    async1();
    console.log('start')
```

这道基础题输出的是啥？

答案：

```jsx

    'async1 start'
    'async2'
    'start'
    'async1 end'
```

*   首先一进来是创建了两个函数的，我们先不看函数的创建位置，而是看它的调用位置 发现async1函数被调用了，然后去看看调用的内容
*   执行函数中的同步代码async1 start，之后碰到了await，它会阻塞async1后面代码的执行，因此会先去执行async2中的同步代码async2，然后跳出async1
*   跳出async1函数后，执行同步代码start
*   在一轮宏任务全部执行完之后，再来执行刚刚await后面的内容async1 end。

（在这里，你可以理解为await后面的内容就相当于放到了Promise.then的里面）

来看看区别，如果我们把await async2()换成一个new Promise呢？

```jsx

    async function async1() {
      console.log("async1 start");
      new Promise(resolve => {
        console.log('promise')
      })
      console.log("async1 end");
    }
    async1();
    console.log("start")
```

此时的执行结果为：

```jsx

    'async start'
    'promise'
    'async1 end'
    'start'
```

> 可以看到new Promise()并不会阻塞后面的同步代码async1 end的执行。

###  5.2 题目二

*   现在将async结合定时器看看。
*   给题目一中的 async2函数中加上一个定时器

```jsx

    async function async1() {
      console.log("async1 start");
      await async2();
      console.log("async1 end");
    }
    async function async2() {
      setTimeout(() => {
        console.log('timer')
      }, 0)
      console.log("async2");
    }
    async1();
    console.log("start")
```

没错，定时器始终还是最后执行的，它被放到下一条宏任务的延迟队列中。

答案：

```jsx

    'async1 start'
    'async2'
    'start'
    'async1 end'
    'timer'
```

###  5.3 题目三

```jsx

    async function async1() {
      console.log("async1 start");
      await async2();
      console.log("async1 end");
      setTimeout(() => {
        console.log('timer1')
      }, 0)
    }
    async function async2() {
      setTimeout(() => {
        console.log('timer2')
      }, 0)
      console.log("async2");
    }
    async1();
    setTimeout(() => {
      console.log('timer3')
    }, 0)
    console.log("start")
```

其实如果你能做到这里了，说明你前面的那些知识点也都掌握了，我就不需要太过详细的步骤分析了。

直接公布答案吧：

```jsx

    'async1 start'
    'async2'
    'start'
    'async1 end'
    'timer2'
    'timer3'
    'timer1'
```

> 定时器谁先执行，你只需要关注谁先被调用的以及延迟时间是多少，这道题中延迟时间都是0，所以只要关注谁先被调用的。

###  5.4 题目四

*   正常情况下，async中的await命令是一个Promise对象，返回该对象的结果。
*   但如果不是Promise对象的话，就会直接返回对应的值，相当于Promise.resolve()

```jsx

    async function fn () {
      // return await 1234
      // 等同于
      return 123
    }
    fn().then(res => console.log(res))
```

结果：

```jsx

    123
```

###  5.5 题目五

```jsx

    async function async1 () {
      console.log('async1 start');
      await new Promise(resolve => {
        console.log('promise1')
      })
      console.log('async1 success');
      return 'async1 end'
    }
    console.log('srcipt start')
    async1().then(res => console.log(res))
    console.log('srcipt end')
```

> 在async1中await后面的Promise是没有返回值的，也就是它的状态始终是pending状态，因此相当于一直在await，await，await却始终没有响应...

所以在await之后的内容是不会执行的，也包括async1后面的 .then。

```jsx

    'script start'
    'async1 start'
    'promise1'
    'script end'
```

###  5.6 题目六

让我们给5.5中的Promise加上resolve：

```jsx

    async function async1 () {
      console.log('async1 start');
      await new Promise(resolve => {
        console.log('promise1')
        resolve('promise1 resolve')
      }).then(res => console.log(res))
      console.log('async1 success');
      return 'async1 end'
    }
    console.log('srcipt start')
    async1().then(res => console.log(res))
    console.log('srcipt end')
```

现在Promise有了返回值了，因此await后面的内容将会被执行：

```jsx

    'script start'
    'async1 start'
    'promise1'
    'script end'
    'promise1 resolve'
    'async1 success'
    'async1 end'
```

###  5.7 题目七

```jsx

    async function async1 () {
      console.log('async1 start');
      await new Promise(resolve => {
        console.log('promise1')
        resolve('promise resolve')
      })
      console.log('async1 success');
      return 'async1 end'
    }
    console.log('srcipt start')
    async1().then(res => {
      console.log(res)
    })
    new Promise(resolve => {
      console.log('promise2')
      setTimeout(() => {
        console.log('timer')
      })
    })
```

这道题应该也不难，不过有一点需要注意的，在async1中的new Promise它的resovle的值和async1().then()里的值是没有关系的，很多小伙伴可能看到resovle('promise resolve')就会误以为是async1().then()中的返回值。

因此这里的执行结果为：

```jsx

    'script start'
    'async1 start'
    'promise1'
    'promise2'
    'async1 success'
    'sync1 end'
    'timer'
```

###  5.8 题目八

我们再来看一道头条曾经的面试题：

```jsx

    async function async1() {
      console.log("async1 start");
      await async2();
      console.log("async1 end");
    }

    async function async2() {
      console.log("async2");
    }

    console.log("script start");

    setTimeout(function() {
      console.log("setTimeout");
    }, 0);

    async1();

    new Promise(function(resolve) {
      console.log("promise1");
      resolve();
    }).then(function() {
      console.log("promise2");
    });
    console.log('script end')
```

```jsx

    'script start'
    'async1 start'
    'async2'
    'promise1'
    'script end'
    'async1 end'
    'promise2'
    'setTimeout'
```

(这道题最后async1 end和promise2的顺序其实在网上饱受争议，我这里使用浏览器Chrome V80，Node v12.16.1的执行结果都是上面这个答案)

###  5.9 题目九

```jsx

    async function testSometing() {
      console.log("执行testSometing");
      return "testSometing";
    }

    async function testAsync() {
      console.log("执行testAsync");
      return Promise.resolve("hello async");
    }

    async function test() {
      console.log("test start...");
      const v1 = await testSometing();
      console.log(v1);
      const v2 = await testAsync();
      console.log(v2);
      console.log(v1, v2);
    }

    test();

    var promise = new Promise(resolve => {
      console.log("promise start...");
      resolve("promise");
    });
    promise.then(val => console.log(val));

    console.log("test end...");
```

答案：

```jsx

    'test start...'
    '执行testSometing'
    'promise start...'
    'test end...'
    'testSometing'
    '执行testAsync'
    'promise'
    'hello async'
    'testSometing' 'hello async'
```

##  6\. async处理错误

###  6.1 题目一

> 在async中，如果 await后面的内容是一个异常或者错误的话，会怎样呢？

```jsx

    async function async1 () {
      await async2();
      console.log('async1');
      return 'async1 success'
    }
    async function async2 () {
      return new Promise((resolve, reject) => {
        console.log('async2')
        reject('error')
      })
    }
    async1().then(res => console.log(res))
```

例如这道题中，await后面跟着的是一个状态为rejected的promise。

如果在async函数中抛出了错误，则终止错误结果，不会继续向下执行。

所以答案为：

```jsx

    'async2'
    Uncaught (in promise) error
```

> 如果改为throw new Error也是一样的：

```jsx

    async function async1 () {
      console.log('async1');
      throw new Error('error!!!')
      return 'async1 success'
    }
    async1().then(res => console.log(res))
```

结果为：

```jsx

    'async1'
    Uncaught (in promise) Error: error!!!
```

###  6.2 题目二

> 如果想要使得错误的地方不影响async函数后续的执行的话，可以使用try catch

```jsx

    async function async1 () {
      try {
        await Promise.reject('error!!!')
      } catch(e) {
        console.log(e)
      }
      console.log('async1');
      return Promise.resolve('async1 success')
    }
    async1().then(res => console.log(res))
    console.log('script start')
```

这里的结果为：

```jsx

    'script start'
    'error!!!'
    'async1'
    'async1 success'
```

> 或者你可以直接在Promise.reject后面跟着一个catch()方法：

```jsx

    async function async1 () {
      // try {
      //   await Promise.reject('error!!!')
      // } catch(e) {
      //   console.log(e)
      // }
      await Promise.reject('error!!!')
        .catch(e => console.log(e))
      console.log('async1');
      return Promise.resolve('async1 success')
    }
    async1().then(res => console.log(res))
    console.log('script start')
```

##  7\. 综合题

###  7.1 题目一

```jsx

    const first = () => (new Promise((resolve, reject) => {
        console.log(3);
        let p = new Promise((resolve, reject) => {
            console.log(7);
            setTimeout(() => {
                console.log(5);
                resolve(6);
              	console.log(p)
            }, 0)
            resolve(1);
        });
        resolve(2);
        p.then((arg) => {
            console.log(arg);
        });

    }));

    first().then((arg) => {
        console.log(arg);
    });
    console.log(4);
```

*   第一段代码定义的是一个函数，所以我们得看看它是在哪执行的，发现它在4之前，所以可以来看看first函数里面的内容了。(这一步有点类似于题目1.5)
*   函数first返回的是一个new Promise()，因此先执行里面的同步代码3
*   接着又遇到了一个new Promise()，直接执行里面的同步代码7
*   执行完7之后，在p中，遇到了一个定时器，先将它放到下一个宏任务队列里不管它，接着向下走
*   碰到了resolve(1)，这里就把p的状态改为了resolved，且返回值为1，不过这里也先不执行
*   跳出p，碰到了resolve(2)，这里的resolve(2)，表示的是把first函数返回的那个Promise的状态改了，也先不管它。
*   然后碰到了p.then，将它加入本次循环的微任务列表，等待执行
*   跳出first函数，遇到了first().then()，将它加入本次循环的微任务列表(p.then的后面执行)
*   然后执行同步代码4
*   本轮的同步代码全部执行完毕，查找微任务列表，发现p.then和first().then()，依次执行，打印出1和2
*   本轮任务执行完毕了，发现还有一个定时器没有跑完，接着执行这个定时器里的内容，执行同步代码5
*   然后又遇到了一个`resolve(6)`，它是放在p里的，但是p的状态在之前已经发生过改变了，因此这里就不会再改变，也就是说`resolve(6)`相当于没任何用处，因此打印出来的p为`Promise{<resolved>: 1}`。(这一步类似于题目3.1)

```jsx

    3
    7
    4
    1
    2
    5
    Promise{<resolved>: 1}
```

###  7.2 题目二

```jsx

    const async1 = async () => {
      console.log('async1');
      setTimeout(() => {
        console.log('timer1')
      }, 2000)
      await new Promise(resolve => {
        console.log('promise1')
      })
      console.log('async1 end')
      return 'async1 success'
    } 
    console.log('script start');
    async1().then(res => console.log(res));
    console.log('script end');
    Promise.resolve(1)
      .then(2)
      .then(Promise.resolve(3))
      .catch(4)
      .then(res => console.log(res))
    setTimeout(() => {
      console.log('timer2')
    }, 1000)
```

**注意的知识点：**

*   async函数中await的new Promise要是没有返回值的话则不执行后面的内容(类似题5.5)
*   .then函数中的参数期待的是函数，如果不是函数的话会发生穿透(类似题3.8 )
*   注意定时器的延迟时间

```jsx

    'script start'
    'async1'
    'promise1'
    'script end'
    1
    'timer2'
    'timer1'
```

###  7.3 题目三

```jsx

    const p1 = new Promise((resolve) => {
      setTimeout(() => {
        resolve('resolve3');
        console.log('timer1')
      }, 0)
      resolve('resovle1');
      resolve('resolve2');
    }).then(res => {
      console.log(res)
      setTimeout(() => {
        console.log(p1)
      }, 1000)
    }).finally(res => {
      console.log('finally', res)
    })
```

**注意的知识点：**

*   Promise的状态一旦改变就无法改变(类似题目3.5)
*   finally不管Promise的状态是resolved还是rejected都会执行，且它的回调函数是没有参数的(类似3.10)

```jsx

    'resolve1'
    'finally' undefined
    'timer1'
    Promise{<resolved>: undefined}
```

##  8\. 几道大厂的面试题

###  8.1 使用Promise实现每隔1秒输出1,2,3

> 这道题比较简单的一种做法是可以用Promise配合着reduce不停的在promise后面叠加.then，请看下面的代码：

```jsx

    const arr = [1, 2, 3]
    arr.reduce((p, x) => {
      return p.then(() => {
        return new Promise(r => {
          setTimeout(() => r(console.log(x)), 1000)
        })
      })
    }, Promise.resolve())
```

或者你可以更简单一点写：

```jsx

    const arr = [1, 2, 3]
    arr.reduce((p, x) => p.then(() => new Promise(r => setTimeout(() => r(console.log(x)), 1000))), Promise.resolve())
```

###  8.2 使用Promise实现红绿灯交替重复亮

红灯3秒亮一次，黄灯2秒亮一次，绿灯1秒亮一次；如何让三个灯不断交替重复亮灯？（用Promise实现）三个亮灯函数已经存在：

```jsx

    function red() {
        console.log('red');
    }
    function green() {
        console.log('green');
    }
    function yellow() {
        console.log('yellow');
    }
```

答案：

```jsx

    function red() {
      console.log("red");
    }
    function green() {
      console.log("green");
    }
    function yellow() {
      console.log("yellow");
    }
    const light = function (timer, cb) {
      return new Promise(resolve => {
        setTimeout(() => {
          cb()
          resolve()
        }, timer)
      })
    }
    const step = function () {
      Promise.resolve().then(() => {
        return light(3000, red)
      }).then(() => {
        return light(2000, green)
      }).then(() => {
        return light(1000, yellow)
      }).then(() => {
        return step()
      })
    }

    step();
```

###  8.3 实现mergePromise函数

> 实现mergePromise函数，把传进去的数组按顺序先后执行，并且把返回的数据先后放到数组data中。

```jsx

    const time = (timer) => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve()
        }, timer)
      })
    }
    const ajax1 = () => time(2000).then(() => {
      console.log(1);
      return 1
    })
    const ajax2 = () => time(1000).then(() => {
      console.log(2);
      return 2
    })
    const ajax3 = () => time(1000).then(() => {
      console.log(3);
      return 3
    })

    function mergePromise () {
      // 在这里写代码
    }

    mergePromise([ajax1, ajax2, ajax3]).then(data => {
      console.log("done");
      console.log(data); // data 为 [1, 2, 3]
    });

    // 要求分别输出
    // 1
    // 2
    // 3
    // done
    // [1, 2, 3]
```

这道题有点类似于Promise.all()，不过.all()不需要管执行顺序，只需要并发执行就行了。但是这里需要等上一个执行完毕之后才能执行下一个。

**解题思路：**

*   定义一个数组data用于保存所有异步操作的结果
*   初始化一个const promise = Promise.resolve()，然后循环遍历数组，在promise后面添加执行ajax任务，同时要将添加的结果重新赋值到promise上

答案：

```jsx

    function mergePromise (ajaxArray) {
      // 存放每个ajax的结果
      const data = [];
      let promise = Promise.resolve();
      ajaxArray.forEach(ajax => {
      	// 第一次的then为了用来调用ajax
      	// 第二次的then是为了获取ajax的结果
        promise = promise.then(ajax).then(res => {
          data.push(res);
          return data; // 把每次的结果返回
        })
      })
      // 最后得到的promise它的值就是data
      return promise;
    }
```

###  8.4 封装一个异步加载图片的方法

这个相对简单一些，只需要在图片的onload函数中，使用resolve返回一下就可以了。 来看看具体代码：

```jsx

    function loadImg(url) {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = function() {
          console.log("一张图片加载完成");
          resolve(img);
        };
        img.onerror = function() {
        	reject(new Error('Could not load image at' + url));
        };
        img.src = url;
      });
```

###  8.5 限制异步操作的并发个数并尽可能快的完成全部

有8个图片资源的url，已经存储在数组urls中。

> urls类似于['https://image1.png', 'https://image2.png', ....]

而且已经有一个函数function loadImg，输入一个url链接，返回一个Promise，该Promise在图片下载完成的时候resolve，下载失败则reject。

但有一个要求，任何时刻同时下载的链接数量不可以超过3个。

请写一段代码实现这个需求，要求尽可能快速地将所有图片下载完成。

```jsx

    var urls = [
      "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting1.png",
      "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting2.png",
      "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting3.png",
      "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting4.png",
      "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting5.png",
      "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/bpmn6.png",
      "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/bpmn7.png",
      "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/bpmn8.png",
    ];
    function loadImg(url) {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = function() {
          console.log("一张图片加载完成");
          resolve(img);
        };
        img.onerror = function() {
        	reject(new Error('Could not load image at' + url));
        };
        img.src = url;
      });
```

看到这道题时，我最开始的想法是：

拿到urls，然后将这个数组每3个`url`一组创建成一个二维数组 然后用`Promise.all()`每次加载一组url（也就是并发3个），这一组加载完再加载下一组。

> 这个想法从技术上说并不难实现，有点类似于第三题。不过缺点也明显，那就是每次都要等到上一组全部加载完之后，才加载下一组，那如果上一组有2个已经加载完了，还有1个特别慢，还在加载，要等这个慢的也加载完才能进入下一组。这明显会照常卡顿，影响加载效率 `

想法一💡：

```jsx

    function limitLoad (urls, handler, limit) {
      const data = []; // 存储所有的加载结果
      let p = Promise.resolve();
      const handleUrls = (urls) => { // 这个函数是为了生成3个url为一组的二维数组
        const doubleDim = [];
        const len = Math.ceil(urls.length / limit); // Math.ceil(8 / 3) = 3
        console.log(len) // 3, 表示二维数组的长度为3
        for (let i = 0; i < len; i++) {
          doubleDim.push(urls.slice(i * limit, (i + 1) * limit))
        }
        return doubleDim;
      }
      const ajaxImage = (urlCollect) => { // 将一组字符串url 转换为一个加载图片的数组
        console.log(urlCollect)
        return urlCollect.map(url => handler(url))
      }
      const doubleDim = handleUrls(urls); // 得到3个url为一组的二维数组
      doubleDim.forEach(urlCollect => {
        p = p.then(() => Promise.all(ajaxImage(urlCollect))).then(res => {
          data.push(...res); // 将每次的结果展开，并存储到data中 (res为：[img, img, img])
          return data;
        })
      })
      return p;
    }
    limitLoad(urls, loadImg, 3).then(res => {
      console.log(res); // 最终得到的是长度为8的img数组: [img, img, img, ...]
      res.forEach(img => {
        document.body.appendChild(img);
      })
    });
```