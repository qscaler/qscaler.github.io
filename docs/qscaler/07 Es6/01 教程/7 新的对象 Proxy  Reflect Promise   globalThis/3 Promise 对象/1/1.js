1、	const promise = new Promise((resolve, reject) => {
    console.log(1);
    resolve();
    console.log(2);
})
promise.then(() => {
    console.log(4);
})
console.log(5);

运行结果是： 1, 2, 5, 4
解释：promise的构造函数是同步执行，promise.then中的函数是异步执行。


2、 	const promise = new Promise((resolve, reject) => {
    resolve('success1')
    reject('error')
    resolve('success2')
})
promise
    .then((res) => {
        console.log('then: ', res)
    })
    .catch((err) => {
        console.log('catch: ', err)
    })
运行结果：then: success1
解释：构造函数中的 resolve 或 reject 只有第一次执行有效，多次调用没有任何
作用。promise 状态一旦改变则不能再变。
promise 有 3 种状 态： pending、fulfilled 或 rejected。
状态改变只能是 pending -> fulfilled 或者 pending -> rejected，
状态一旦改变则不能再变。
3、const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('once')
        resolve('success')
    }, 1000)
})

const start = Date.now()
promise.then((res) => {
    console.log(res, Date.now() - start)
})
promise.then((res) => {
    console.log(res, Date.now() - start)
})
运行结果：once
success 1005
success 1007
解释：promise 的.then 或者.catch 可以被调用多次，但这里 Promise 构造函数
只执行一次。或者说 promise 内部状态一经改变，并且有了一个值，那么后续每
次调用.then 或者.catch 都会直接拿到该值。

4、console.log('start');
new Promise(function (resolve, reject) {
    setTimeout(function () {    //定时器模拟异步
        resolve('hello');    //修改promise状态调用then中的第一个函数
    }, 2000);
}).then((value) => {
    console.log(value);    //接收resolve传来的值
    return new Promise(function (resolve) {   //该then()返回一个新的promise实例，后面可以继续接then
        setTimeout(function () {
            resolve('world');       //修改新promise的状态，去调用then
        }, 3000)
    })
}).then((value) => {
    console.log(value);
})
//输出结果：
/*
    立即输出   start
    两秒输出   hello
    再三秒     world
 */



Promise 新建后就会立即执行。

let promise = new Promise(function (resolve, reject) {
    console.log('Promise');
    resolve();
});

promise.then(function () {
    console.log('resolved.');
});

console.log('Hi!');

// Promise
// Hi!
// resolved
上面代码中，Promise 新建后立即执行，所以首先输出的是Promise。然后，then方法指定的回调函数，将在当前脚本所有同步任务执行完才会执行，所以resolved最后输出。




const p1 = new Promise(function (resolve, reject) {
    setTimeout(() => reject(new Error('fail')), 3000)
})

const p2 = new Promise(function (resolve, reject) {
    setTimeout(() => resolve(p1), 1000)
})

p2
    .then(result => console.log(result))
    .catch(error => console.log(error))
// Error: fail
上面代码中，p1是一个 Promise，3 秒之后变为rejected。p2的状态在 1 秒之后改变，resolve方法返回的是p1。由于p2返回的是另一个 Promise，导致p2自己的状态无效了，由p1的状态决定p2的状态。所以，后面的then语句都变成针对后者（p1）。又过了 2 秒，p1变为rejected，导致触发catch方法指定的回调函数。

new Promise((resolve, reject) => {
    resolve(1);
    console.log(2);
}).then(r => {
    console.log(r);
});
// 2
// 1
上面代码中，调用resolve(1)以后，后面的console.log(2)还是会执行，并且会首先打印出来。这是因为立即 resolved 的 Promise 是在本轮事件循环的末尾执行，总是晚于本轮循环的同步任务。



一般来说，调用resolve或reject以后，Promise 的使命就完成了，后继操作应该放到then方法里面，而不应该直接写在resolve或reject的后面。所以，最好在它们前面加上return语句，这样就不会有意外。

new Promise((resolve, reject) => {
    return resolve(1);
    // 后面的语句不会执行
    console.log(2);
})



如果 Promise 状态已经变成resolved，再抛出错误是无效的。

const promise = new Promise(function (resolve, reject) {
    resolve('ok');
    throw new Error('test');
});
promise
    .then(function (value) { console.log(value) })
    .catch(function (error) { console.log(error) });
// ok
上面代码中，Promise 在resolve语句后面，再抛出错误，不会被捕获，等于没有抛出。因为 Promise 的状态一旦改变，就永久保持该状态，不会再变了。