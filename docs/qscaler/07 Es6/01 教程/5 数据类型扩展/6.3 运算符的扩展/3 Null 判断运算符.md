###　1

3 Null 判断运算符
读取对象属性的时候，如果某个属性的值是null或undefined，有时候需要为它们指定默认值。常见做法是通过||运算符指定默认值。
```js
    const animationDuration = response.settings?.animationDuration ?? 300;
    // 上面代码中，如果response.settings是null或undefined，或者response.settings.animationDuration是null或undefined，就会返回默认值300。也就是说，这一行代码包括了两级属性的判断。

    // 这个运算符很适合判断函数参数是否赋值。

    function Component(props) {
        const enable = props.enabled ?? true;
        // …
    }
    // 上面代码判断props参数的enabled属性是否赋值，基本等同于下面的写法。

    function Component(props) {
        const {
            enabled: enable = true,
        } = props;
        // …
    }
    // ?? 本质上是逻辑运算，它与其他两个逻辑运算符 && 和 || 有一个优先级问题，它们之间的优先级到底孰高孰低。优先级的不同，往往会导致逻辑运算的结果不同。

    //         现在的规则是，如果多个逻辑运算符一起使用，必须用括号表明优先级，否则会报错。

    // 报错
    lhs && middle ?? rhs
    lhs ?? middle && rhs
    lhs || middle ?? rhs
    lhs ?? middle || rhs
        // 上面四个表达式都会报错，必须加入表明优先级的括号。

        (lhs && middle) ?? rhs;
    lhs && (middle ?? rhs);

    (lhs ?? middle) && rhs;
    lhs ?? (middle && rhs);

    (lhs || middle) ?? rhs;
    lhs || (middle ?? rhs);

    (lhs ?? middle) || rhs;
    lhs ?? (middle || rhs);
```