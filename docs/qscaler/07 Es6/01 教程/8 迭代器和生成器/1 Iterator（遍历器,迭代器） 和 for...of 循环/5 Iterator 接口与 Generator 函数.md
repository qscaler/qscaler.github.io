### 5 Iterator 接口与 Generator 函数
1. Symbol.iterator()方法的最简单实现，还是使用下一章要介绍的 Generator 函数。

   ```js
        // 一个对象如果要具备可被for...of循环调用的 Iterator 接口，就必须在Symbol.iterator的属性上部署遍历器生成方法（原型链上的对象具有该方法也可）。
        class RangeIterator {
            constructor(start, stop) {
                this.value = start;
                this.stop = stop;
            }
            [Symbol.iterator]() { return this; }
            next() {
                var value = this.value;
                if (value < this.stop) {
                    this.value++;
                    return { done: false, value: value };
                }
                return { done: true, value: undefined };
            }
        }

        function range(start, stop) {
            return new RangeIterator(start, stop);
        }

        for (var value of range(0, 3)) {
            console.log(value); // 0, 1, 2
        }
        const obj = {
            data: ['ttt', 'fff'],
            [Symbol.iterator]() { //执行这个函数，就会返回一个遍历器
                const self = this;
                let index = 0;
                return {
                    next() {
                        if (index < self.data.length) {
                            return {
                                value: self.data[index++],
                                done: false
                            };
                        } else {
                            return { value: undefined, done: true };
                        }
                    }
                };
            }
        };
        for (let x of obj) {
            console.log(x);   // ttt  fff
        }
        // 注意，普通对象部署数组的Symbol.iterator方法，并无效果。
        let myIterable = {
            [Symbol.iterator]: function* () {
                yield 1;
                yield 2;
                yield 3;
            }
        };
        [...myIterable] // [1, 2, 3]

        // 或者采用下面的简洁写法

        let obj1 = {
            *[Symbol.iterator]() {
                yield 'hello';
                yield 'world';
            }
        };

        for (let x of obj1) {
            console.log(x);
        }
        // "hello"
        // "world"
    ```
    **上面代码中，Symbol.iterator()方法几乎不用部署任何代码，只要用 yield 命令给出每一步的返回值即可**。

2.  遍历器对象的  next() return()，throw() 三个方法
    如果你自己写遍历器对象生成函数，那么next()方法是必须部署的，return()方法和throw()方法是否部署是可选的。
   