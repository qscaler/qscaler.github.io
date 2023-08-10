---
title: 2 CSS模块
---

![CSS CHEAT SHEET](https://s.poetries.work/uploads/2022/07/47b89e6c7852b4c4.png)

##  1 盒模型

> *   有两种， `IE`盒子模型、`W3C`盒子模型；
> *   盒模型： 内容(`content`)、填充(`padding`)、边界(`margin`)、 边框(`border`)；
> *   区 别： `IE`的`content`部分把 `border` 和 `padding`计算了进去;

**标准盒子模型的模型图**

![](https://s.poetries.work/uploads/2022/09/5c302a15e52c1b08.png)

从上图可以看到：

*   盒子总宽度 = `width` + `padding` + `border` + `margin`;
*   盒子总高度 = `height` + `padding` + `border` + `margin`

也就是，`width/height` 只是内容高度，不包含 `padding` 和 `border` 值

**IE 怪异盒子模型**

![](https://s.poetries.work/uploads/2022/09/55340636fa7cdcee.png)

从上图可以看到：

*   盒子总宽度 = `width` + `margin`;
*   盒子总高度 = `height` + `margin`;

也就是，`width/height` 包含了 `padding` 和 `border`值

> 页面渲染时，`dom` 元素所采用的 布局模型。可通过`box-sizing`进行设置

**通过 box-sizing 来改变元素的盒模型**

CSS 中的 `box-sizing` 属性定义了引擎应该如何计算一个元素的总宽度和总高度

*   `box-sizing: content-box;` 默认的标准(W3C)盒模型元素效果，元素的 `width/height` 不包含`padding`，`border`，与标准盒子模型表现一致
*   `box-sizing: border-box;` 触发怪异(IE)盒模型元素的效果，元素的 `width/height` 包含 `padding`，`border`，与怪异盒子模型表现一致
*   `box-sizing: inherit;` 继承父元素 `box-sizing` 属性的值

**小结**

*   盒子模型构成：内容(`content`)、内填充(`padding`)、 边框(`border`)、外边距(`margin`)
*   `IE8`及其以下版本浏览器，未声明 `DOCTYPE`，内容宽高会包含内填充和边框，称为怪异盒模型(`IE`盒模型)
*   标准(`W3C`)盒模型：元素宽度 = `width + padding + border + margin`
*   怪异(`IE`)盒模型：元素宽度 = `width + margin`
*   标准浏览器通过设置 css3 的 `box-sizing: border-box` 属性，触发“怪异模式”解析计算宽高

##  2 BFC

> 块级格式化上下文，是一个独立的渲染区域，让处于 `BFC` 内部的元素与外部的元素相互隔离，使内外元素的定位不会相互影响。

> `IE`下为 `Layout`，可通过 `zoom:1` 触发

**触发条件:**

*   根元素，即HTML元素
*   绝对定位元素 `position: absolute/fixed`
*   行内块元素 `display`的值为`inline-block`、`table`、`flex`、`inline-flex`、`grid`、`inline-grid`
*   浮动元素：`float`值为`left`、`right`
*   `overflow值`不为 `visible`，为 `auto`、`scroll`、`hidden`

**规则:**

1.  属于同一个 `BFC` 的两个相邻 `Box` 垂直排列
2.  属于同一个 `BFC` 的两个相邻 `Box` 的 `margin` 会发生重叠
3.  `BFC` 中子元素的 `margin box` 的左边， 与包含块 (BFC) `border box`的左边相接触 (子元素 `absolute` 除外)
4.  `BFC` 的区域不会与 `float` 的元素区域重叠
5.  计算 `BFC` 的高度时，浮动子元素也参与计算
6.  文字层不会被浮动层覆盖，环绕于周围

**应用:**

*   利用`2`：阻止`margin`重叠
*   利用`4`：自适应两栏布局
*   利用 `5` ，可以避免高度塌陷
*   可以包含浮动元素 —— 清除内部浮动(清除浮动的原理是两个`div`都位于同一个 `BFC` 区域之中)

**示例**

**1\. 防止margin重叠（塌陷）**

```jsx

    <style>
        p {
          color: #f55;
          background: #fcc;
          width: 200px;
          line-height: 100px;
          text-align:center;
          margin: 100px;
        }
    </style>
    <body>
      <p>Haha</p >
      <p>Hehe</p >
    </body>
```

![](https://s.poetries.work/uploads/2022/09/d8f4f47649805c27.png)

*   两个`p`元素之间的距离为`100px`，发生了`margin`重叠（塌陷），以最大的为准，如果第一个`P`的`margin`为`80`的话，两个`P`之间的距离还是`100`，以最大的为准。
*   同一个`BFC`的俩个相邻的盒子的`margin`会发生重叠
*   可以在`p`外面包裹一层容器，并触发这个容器生成一个`BFC`，那么两个`p`就不属于同一个`BFC`，则不会出现`margin`重叠

```jsx

    <style>
        .wrap {
            overflow: hidden;// 新的BFC
        }
        p {
            color: #f55;
            background: #fcc;
            width: 200px;
            line-height: 100px;
            text-align:center;
            margin: 100px;
        }
    </style>
    <body>
        <p>Haha</p >
        <div class="wrap">
            <p>Hehe</p >
        </div>
    </body>
```

这时候，边距则不会重叠：

![](https://s.poetries.work/uploads/2022/09/5d6156d0fd00e6da.png)

**2\. 清除内部浮动**

```jsx

    <style>
        .par {
            border: 5px solid #fcc;
            width: 300px;
        }

        .child {
            border: 5px solid #f66;
            width:100px;
            height: 100px;
            float: left;
        }
    </style>
    <body>
        <div class="par">
          <div class="child"></div>
          <div class="child"></div>
        </div>
    </body>
```

![](https://s.poetries.work/uploads/2022/09/f8eb06e196dd211b.png)

而`BFC`在计算高度时，浮动元素也会参与，所以我们可以触发`.par`元素生成`BFC`，则内部浮动元素计算高度时候也会计算

```jsx

    .par {
        overflow: hidden;
    }
```

![](https://s.poetries.work/uploads/2022/09/32984028a445dbc7.png)

**3\. 自适应多栏布局**

这里举个两栏的布局

```jsx

    <style>
        body {
            width: 300px;
            position: relative;
        }

        .aside {
            width: 100px;
            height: 150px;
            float: left;
            background: #f66;
        }

        .main {
            height: 200px;
            background: #fcc;
        }
    </style>
    <body>
        <div class="aside"></div>
        <div class="main"></div>
    </body>
```

![](https://s.poetries.work/uploads/2022/09/07acd0b2a466762f.png)

*   每个元素的左外边距与包含块的左边界相接触
*   因此，虽然`.aslide`为浮动元素，但是main的左边依然会与包含块的左边相接触，而`BFC`的区域不会与浮动盒子重叠
*   所以我们可以通过触发`main`生成`BFC`，以此适应两栏布局

```jsx

    .main {
      overflow: hidden;
    }
```

这时候，新的`BFC`不会与浮动的`.aside`元素重叠。因此会根据包含块的宽度，和`.aside`的宽度，自动变窄

![](https://s.poetries.work/uploads/2022/09/8749636e9068ae4a.png)

##  3 层叠上下文

> 元素提升为一个比较特殊的图层，在三维空间中 (z轴) 高出普通元素一等。

**触发条件**

*   根层叠上下文(`html`)
*   `position`
*   `css3`属性
    *   `flex`
    *   `transform`
    *   `opacity`
    *   `filter`
    *   `will-change`
    *   `webkit-overflow-scrolling`

**层叠等级：层叠上下文在z轴上的排序**

*   在同一层叠上下文中，层叠等级才有意义
*   `z-index`的优先级最高

![](https://s.poetries.work/gitee/2020/09/111.png)

##  4 居中布局

###  元素水平垂直居中的方法有哪些？如果元素不定宽高呢？

1.  **利用绝对定位+transform**，设置 `left: 50%` 和 `top: 50%` 现将子元素左上角移到父元素中心位置，然后再通过 `translate` 来调整子元素的中心点到父元素的中心。该方法可以**不定宽高**

```jsx

    .father {
      position: relative;
    }
    .son {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
```

1.  **利用绝对定位+margin:auto**，子元素所有方向都为 `0` ，将 `margin` 设置为 `auto` ，由于宽高固定，对应方向实现平分，该方法必须**盒子有宽高**

```jsx

    .father {
      position: relative;
    }
    .son {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0px;
      margin: auto;
      height: 100px;
      width: 100px;
    }
```

1.  **利用绝对定位+margin:负值**，设置 `left: 50%` 和 `top: 50%` 现将子元素左上角移到父元素中心位置，然后再通过 `margin-left` 和 `margin-top` 以子元素自己的一半宽高进行负值赋值。该方法必须定宽高

```jsx

    .father {
      position: relative;
    }
    .son {
      position: absolute;
      left: 50%;
      top: 50%;
      width: 200px;
      height: 200px;
      margin-left: -100px;
      margin-top: -100px;
    }
```

1.  **利用 flex** ，最经典最方便的一种了，不用解释，**定不定宽高无所谓**

```jsx

    <style>
        .father {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 200px;
            height: 200px;
            background: skyblue;
        }
        .son {
            width: 100px;
            height: 100px;
            background: red;
        }
    </style>
    <div class="father">
        <div class="son"></div>
    </div>
```

1.  **grid网格布局**

```jsx

    <style>
    .father {
      display: grid;
      align-items:center;
      justify-content: center;
      width: 200px;
      height: 200px;
      background: skyblue;

    }
    .son {
      width: 10px;
      height: 10px;
      border: 1px solid red
    }
    </style>
    <div class="father">
      <div class="son"></div>
    </div>
```

1.  **table布局**

设置父元素为`display:table-cell`，子元素设置 `display: inline-block`。利用`vertical`和`text-align`可以让所有的行内块级元素水平垂直居中

```jsx

    <style>
        .father {
            display: table-cell;
            width: 200px;
            height: 200px;
            background: skyblue;
            vertical-align: middle;
            text-align: center;
        }
        .son {
            display: inline-block;
            width: 100px;
            height: 100px;
            background: red;
        }
    </style>
    <div class="father">
        <div class="son"></div>
    </div>
```

**小结**

不知道元素宽高大小仍能实现水平垂直居中的方法有：

*   `利用定位+transform`
*   `flex`布局
*   `grid`布局

**根据元素标签的性质，可以分为：**

*   内联元素居中布局
*   块级元素居中布局

**内联元素居中布局**

*   水平居中
    *   行内元素可设置：`text-align: center`
    *   `flex`布局设置父元素：`display: flex; justify-content: center`
*   垂直居中
    *   单行文本父元素确认高度：`height === line-height`
    *   多行文本父元素确认高度：`display: table-cell; vertical-align: middle`

**块级元素居中布局**

*   水平居中
    *   定宽: `margin: 0 auto`
    *   `绝对定位+left:50%+margin:负自身一半`
*   垂直居中
    *   `position: absolute`设置`left`、`top`、`margin-left`、`margin-top`(定高)
    *   `display: table-cell`
    *   `transform: translate(x, y)`
    *   `flex`(不定高，不定宽)
    *   `grid`(不定高，不定宽)，兼容性相对比较差

###  左右居中

*   行内元素: `text-align: center`
*   定宽块状元素: 左右 `margin` 值为 `auto`
*   不定宽块状元素: `table`布局，`position + transform`

```jsx

    /* 方案1 */
    .wrap {
      text-align: center
    }
    .center {
      display: inline;
      /* or */
      /* display: inline-block; */
    }
    /* 方案2 */
    .center {
      width: 100px;
      margin: 0 auto;
    }
    /* 方案2 */
    .wrap {
      position: relative;
    }
    .center {
      position: absulote;
      left: 50%;
      transform: translateX(-50%);
    }
```

###  上下居中

*   定高：`margin`，`position + margin`(负值)
*   不定高：`position` + `transform`，`flex`，`IFC + vertical-align:middle`

```jsx

    /* 定高方案1 */
    .center {
      height: 100px;
      margin: 50px 0;   
    }
    /* 定高方案2 */
    .center {
      height: 100px;
      position: absolute;
      top: 50%;
      margin-top: -25px;
    }
    /* 不定高方案1 */
    .center {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }
    /* 不定高方案2 */
    .wrap {
      display: flex;
      align-items: center;
    }
    .center {
      width: 100%;
    }
    /* 不定高方案3 */
    /* 设置 inline-block 则会在外层产生 IFC，高度设为 100% 撑开 wrap 的高度 */
    .wrap::before {
      content: '';
      height: 100%;
      display: inline-block;
      vertical-align: middle;
    }
    .wrap {
      text-align: center;
    }
    .center {
      display: inline-block;  
      vertical-align: middle;
    }
```

##  5 选择器权重计算方式

> !important > 内联样式 = 外联样式 > ID选择器 > 类选择器 = 伪类选择器 = 属性选择器 > 元素选择器 = 伪元素选择器 > 通配选择器 = 后代选择器 = 兄弟选择器

1.  属性后面加`!import`会覆盖页面内任何位置定义的元素样式
2.  作为`style`属性写在元素内的样式
3.  `id`选择器
4.  类选择器
5.  标签选择器
6.  通配符选择器（`*`）
7.  浏览器自定义或继承

**同一级别：后写的会覆盖先写的**

> css选择器的解析原则：选择器定位DOM元素是从右往左的方向，这样可以尽早的过滤掉一些不必要的样式规则和元素

##  6 清除浮动

1.  在浮动元素后面添加 `clear:both`的空 `div` 元素

```jsx

    <div class="container">
        <div class="left"></div>
        <div class="right"></div>
        <div style="clear:both"></div>
    </div>
```

1.  给父元素添加 `overflow:hidden` 或者 `auto` 样式，触发`BFC`

```jsx

    <div class="container">
        <div class="left"></div>
        <div class="right"></div>
    </div>
```

```jsx

    .container{
        width: 300px;
        background-color: #aaa;
        overflow:hidden;
        zoom:1;   /*IE6*/
    }
```

1.  使用伪元素，也是在元素末尾添加一个点并带有 `clear: both` 属性的元素实现的。

```jsx

    <div class="container clearfix">
        <div class="left"></div>
        <div class="right"></div>
    </div>
```

```jsx

    .clearfix{
        zoom: 1; /*IE6*/
    }
    .clearfix:after{
        content: ".";
        height: 0;
        clear: both;
        display: block;
        visibility: hidden;
    }
```

> 推荐使用第三种方法，不会在页面新增div，文档结构更加清晰

##  7 link 与 @import 的区别

*   `link`功能较多，可以定义 `RSS`，定义 `Rel` 等作用，而`@import`只能用于加载 `css`
*   当解析到`link`时，页面会同步加载所引的 `css`，而`@import`所引用的 `css` 会等到页面加载完才被加载
*   `@import`需要 `IE5` 以上才能使用
*   `link`可以使用 `js` 动态引入，`@import`不行

##  8 CSS3的新特性

![](https://s.poetries.work/uploads/2022/09/29fc55febf95ee90.png)

**1\. 是什么**

css，即层叠样式表（Cascading Style Sheets）的简称，是一种标记语言，由浏览器解释执行用来使页面变得更美观

`css3`是css的最新标准，是向后兼容的，`CSS1/2`的特性在 `CSS3` 里都是可以使用的

而 `CSS3` 也增加了很多新特性，为开发带来了更佳的开发体验

**2\. 选择器**

`css3`中新增了一些选择器，主要为如下图所示：

![](https://s.poetries.work/uploads/2022/09/bfd8984363dc561d.png)

**3\. 新样式**

*   **边框** `css3`新增了三个边框属性，分别是：
    *   `border-radius`：创建圆角边框
    *   `box-shadow`：为元素添加阴影
    *   `border-image`：使用图片来绘制边框
*   **box-shadow** 设置元素阴影，设置属性如下（其中水平阴影和垂直阴影是必须设置的）
    *   水平阴影
    *   垂直阴影
    *   模糊距离(虚实)
    *   阴影尺寸(影子大小)
    *   阴影颜色
    *   内/外阴影
*   **背景** 新增了几个关于背景的属性，分别是`background-clip`、`background-origin`、`background-size`和`background-break`
    *   **`background-clip`** 用于确定背景画区，有以下几种可能的属性：通常情况，背景都是覆盖整个元素的，利用这个属性可以设定背景颜色或图片的覆盖范围
        *   `background-clip: border-box`; 背景从`border`开始显示
        *   `background-clip: padding-box`; 背景从`padding`开始显示
        *   `background-clip: content-box`; 背景显`content`区域开始显示
        *   `background-clip: no-clip`; 默认属性，等同于b`order-box`
    *   **`background-origin`** 当我们设置背景图片时，图片是会以左上角对齐，但是是以`border`的左上角对齐还是以`padding`的左上角或者`content`的左上角对齐? `border-origin`正是用来设置这个的
        *   `background-origin: border-box`; 从`border`开始计算`background-position`
        *   `background-origin: padding-box`; 从`padding`开始计算`background-position`
        *   `background-origin: content-box`; 从`content`开始计算`background-position`
        *   默认情况是`padding-box`，即以`padding`的左上角为原点
    *   **`background-size`** 常用来调整背景图片的大小，主要用于设定图片本身。有以下可能的属性：
        *   `background-size: contain`; 缩小图片以适合元素（维持像素长宽比）
        *   `background-size: cover`; 扩展元素以填补元素（维持像素长宽比）
        *   `background-size: 100px 100px`; 缩小图片至指定的大小
        *   `background-size: 50% 100%`; 缩小图片至指定的大小，百分比是相对包 含元素的尺寸
    *   **`background-break`** 元素可以被分成几个独立的盒子（如使内联元素`span`跨越多行），`background-break` 属性用来控制背景怎样在这些不同的盒子中显示
        *   `background-break: continuous`; 默认值。忽略盒之间的距离（也就是像元素没有分成多个盒子，依然是一个整体一样）
        *   `background-break: bounding-box`; 把盒之间的距离计算在内；
        *   `background-break: each-box`; 为每个盒子单独重绘背景
*   **文字**
    *   **`word-wrap: normal|break-word`**
        *   `normal`：使用浏览器默认的换行
        *   `break-all`：允许在单词内换行
    *   **`text-overflow`** 设置或检索当当前行超过指定容器的边界时如何显示，属性有两个值选择
        *   `clip`：修剪文本
        *   `ellipsis`：显示省略符号来代表被修剪的文本
    *   **`text-shadow`** 可向文本应用阴影。能够规定水平阴影、垂直阴影、模糊距离，以及阴影的颜色
    *   **`text-decoration`** CSS3里面开始支持对文字的更深层次的渲染，具体有三个属性可供设置：
        *   `text-fill-color`: 设置文字内部填充颜色
        *   `text-stroke-color`: 设置文字边界填充颜色
        *   `text-stroke-width`: 设置文字边界宽度
*   **颜色**
    *   `css3`新增了新的颜色表示方式`rgba`与`hsla`
    *   `rgba`分为两部分，`rgb`为颜色值，`a`为透明度
    *   `hala`分为四部分，`h`为色相，`s`为饱和度，`l`为亮度，`a`为透明度

**4\. transition 过渡**

`transition`属性可以被指定为一个或多个CSS属性的过渡效果，多个属性之间用逗号进行分隔，必须规定两项内容：

*   过度效果
*   持续时间

```jsx

    transition： CSS属性，花费时间，效果曲线(默认ease)，延迟时间(默认0)
```

上面为简写模式，也可以分开写各个属性

```jsx

    transition-property: width; 
    transition-duration: 1s;
    transition-timing-function: linear;
    transition-delay: 2s;
```

**5\. transform 转换**

*   `transform`属性允许你旋转，缩放，倾斜或平移给定元素
*   `transform-origin`：转换元素的位置（围绕那个点进行转换），默认值为`(x,y,z):(50%,50%,0)`

使用方式：

*   `transform: translate(120px, 50%)`：位移
*   `transform: scale(2, 0.5)`：缩放
*   `transform: rotate(0.5turn)`：旋转
*   `transform: skew(30deg, 20deg)`：倾斜

**6\. animation 动画**

动画这个平常用的也很多，主要是做一个预设的动画。和一些页面交互的动画效果，结果和过渡应该一样，让页面不会那么生硬

`animation`也有很多的属性

*   `animation-name`：动画名称
*   `animation-duration`：动画持续时间
*   `animation-timing-function`：动画时间函数
*   `animation-delay`：动画延迟时间
*   `animation-iteration-count`：动画执行次数，可以设置为一个整数，也可以设置为infinite，意思是无限循环
*   `animation-direction`：动画执行方向
*   `animation-paly-state`：动画播放状态
*   `animation-fill-mode`：动画填充模式

**7\. 渐变**

颜色渐变是指在两个颜色之间平稳的过渡，`css3`渐变包括

*   `linear-gradient`：线性渐变 `background-image: linear-gradient(direction, color-stop1, color-stop2, ...)`;
*   `radial-gradient`：径向渐变 `linear-gradient(0deg, red, green)`

**8\. 其他**

*   `Flex`弹性布局
*   `Grid`栅格布局
*   媒体查询 `@media screen and (max-width: 960px) {}`还有打印`print`

**transition和animation的区别**

> `Animation`和`transition`大部分属性是相同的，他们都是随时间改变元素的属性值，他们的主要区别是`transition`需要触发一个事件才能改变属性，而`animation`不需要触发任何事件的情况下才会随时间改变属性值，并且`transition`为2帧，从`from .... to`，而`animation`可以一帧一帧的

##  9 CSS动画和过渡

常见的动画效果有很多，如`平移`、`旋转`、`缩放`等等，复杂动画则是多个简单动画的组合

**css实现动画的方式，有如下几种：**

*   `transition` 实现渐变动画
*   `transform` 转变动画
*   `animation` 实现自定义动画

###  transition 实现渐变动画

**transition的属性如下：**

*   `transition-property:填写需要变化的css属性`
*   `transition-duration:完成过渡效果需要的时间单位(s或者ms)默认是 0`
*   `transition-timing-function:完成效果的速度曲线`
*   `transition-delay: （规定过渡效果何时开始。默认是`0`）`

> 一般情况下，我们都是写一起的，比如：`transition： width 2s ease 1s`

其中`timing-function`的值有如下：

<table>

<thead>

<tr>

<th>值</th>

<th>描述</th>

</tr>

</thead>

<tbody>

<tr>

<td>`linear`</td>

<td>匀速（等于 `cubic-bezier(0,0,1,1)`）</td>

</tr>

<tr>

<td>`ease`</td>

<td>从慢到快再到慢（`cubic-bezier(0.25,0.1,0.25,1)`）</td>

</tr>

<tr>

<td>`ease-in`</td>

<td>慢慢变快（等于 `cubic-bezier(0.42,0,1,1)`）</td>

</tr>

<tr>

<td>`ease-out`</td>

<td>慢慢变慢（等于 `cubic-bezier(0,0,0.58,1)`）</td>

</tr>

<tr>

<td>`ease-in-out`</td>

<td>先变快再到慢（等于 cubic-bezier(0.42,0,0.58,1)`），渐显渐隐效果</td>

</tr>

<tr>

<td>`cubic-bezier(*n*,*n*,*n*,*n*)`</td>

<td>在 `cubic-bezier` 函数中定义自己的值。可能的值是 `0` 至 `1` 之间的数值</td>

</tr>

</tbody>

</table>

注意：并不是所有的属性都能使用过渡的，如`display:none<->display:block`

举个例子，实现鼠标移动上去发生变化动画效果

```jsx

    <style>
      .base {
        width: 100px;
        height: 100px;
        display: inline-block;
        background-color: #0EA9FF;
        border-width: 5px;
        border-style: solid;
        border-color: #5daf34;
        transition-property: width, height, background-color, border-width;
        transition-duration: 2s;
        transition-timing-function: ease-in;
        transition-delay: 500ms;
      }

      /*简写*/
      /*transition: all 2s ease-in 500ms;*/
      .base:hover {
        width: 200px;
        height: 200px;
        background-color: #5daf34;
        border-width: 10px;
        border-color: #3a8ee6;
      }
    </style>
    <div class="base"></div>
```

###  transform 转变动画

包含四个常用的功能：

*   `translate(x,y)`：位移
*   `scale`：缩放
*   `rotate`：旋转
*   `skew`：倾斜

一般配合`transition`过度使用

> 注意的是，`transform`不支持`inline元`素，使用前把它变成`block`

举个例子

```jsx

    <style>
    .base {
      width: 100px;
      height: 100px;
      display: inline-block;
      background-color: #0EA9FF;
      border-width: 5px;
      border-style: solid;
      border-color: #5daf34;
      transition-property: width, height, background-color, border-width;
      transition-duration: 2s;
      transition-timing-function: ease-in;
      transition-delay: 500ms;
    }
    .base2 {
      transform: none;
      transition-property: transform;
      transition-delay: 5ms;
    }
    .base2:hover {
      transform: scale(0.8, 1.5) rotate(35deg) skew(5deg) translate(15px, 25px);
    }
    </style>
    <div class="base base2"></div>
```

可以看到盒子发生了旋转，倾斜，平移，放大

###  animation 实现自定义动画

> 一个关键帧动画，最少包含两部分，`animation` 属性及属性值（动画的名称和运行方式运行时间等）`@keyframes`（规定动画的具体实现过程）

`animation`是由 8 个属性的简写，分别如下：

<table>

<thead>

<tr>

<th>属性</th>

<th>描述</th>

<th>属性值</th>

</tr>

</thead>

<tbody>

<tr>

<td>`animation-duration`</td>

<td>指定动画完成一个周期所需要时间，单位秒（`s`）或毫秒（`ms`），默认是 `0`</td>

<td></td>

</tr>

<tr>

<td>`animation-timing-function`</td>

<td>指定动画计时函数，即动画的速度曲线，默认是 "`ease`"</td>

<td>`linear`、`ease`、`ease-in`、`ease-out`、`ease-in-out`</td>

</tr>

<tr>

<td>`animation-delay`</td>

<td>指定动画延迟时间，即动画何时开始，默认是 `0`</td>

<td></td>

</tr>

<tr>

<td>`animation-iteration-count`</td>

<td>指定动画播放的次数，默认是 `1`。但我们一般用`infinite`，一直播放</td>

<td></td>

</tr>

<tr>

<td>`animation-direction` 指定动画播放的方向</td>

<td>默认是 `normal`</td>

<td>`normal`、`reverse`、`alternate`、`alternate-reverse`</td>

</tr>

<tr>

<td>`animation-fill-mode`</td>

<td>指定动画填充模式。默认是 `none`</td>

<td>`forwards`、`backwards`、`both`</td>

</tr>

<tr>

<td>`animation-play-state`</td>

<td>指定动画播放状态，正在运行或暂停。默认是 `running`</td>

<td>`running`、`pauser`</td>

</tr>

<tr>

<td>`animation-name`</td>

<td>指定 `@keyframes` 动画的名称</td>

<td></td>

</tr>

</tbody>

</table>

`CSS` 动画只需要定义一些关键的帧，而其余的帧，浏览器会根据计时函数插值计算出来，

> `@keyframes`定义关键帧，可以是`from->to`（等同于`0%`和`100%`），也可以是从`0%->100%`之间任意个的分层设置

因此，如果我们想要让元素旋转一圈，只需要定义开始和结束两帧即可：

```jsx

    @keyframes rotate{
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
```

> `from` 表示最开始的那一帧，`to` 表示结束时的那一帧

**也可以使用百分比刻画生命周期**

```jsx

    @keyframes rotate{
      0%{
        transform: rotate(0deg);
      }
      50%{
        transform: rotate(180deg);
      }
      100%{
        transform: rotate(360deg);
      }
    }
```

定义好了关键帧后，下来就可以直接用它了：

```jsx

    animation: rotate 2s;
```

**总结**

<table>

<thead>

<tr>

<th>属性</th>

<th>含义</th>

</tr>

</thead>

<tbody>

<tr>

<td>`transition（过度）`</td>

<td>用于设置元素的样式过度，和`animation`有着类似的效果，但细节上有很大的不同</td>

</tr>

<tr>

<td>`transform（变形）`</td>

<td>用于元素进行旋转、缩放、移动或倾斜，和设置样式的动画并没有什么关系，就相当于color一样用来设置元素的“外表”</td>

</tr>

<tr>

<td>`translate（移动）`</td>

<td>只是`transform`的一个属性值，即移动</td>

</tr>

<tr>

<td>`animation（动画）`</td>

<td>用于设置动画属性，他是一个简写的属性，包含`6`个属性</td>

</tr>

</tbody>

</table>

###  用css3动画使一个图片旋转

```jsx

    #loader {
      display: block;
      position: relative;
      -webkit-animation: spin 2s linear infinite;
      animation: spin 2s linear infinite;
    }

    @-webkit-keyframes spin {
      0%   {
        -webkit-transform: rotate(0deg);
        -ms-transform: rotate(0deg);
        transform: rotate(0deg);
      }
      100% {
        -webkit-transform: rotate(360deg);
        -ms-transform: rotate(360deg);
        transform: rotate(360deg);
      }
    }

    @keyframes spin {
      0%   {
        -webkit-transform: rotate(0deg);
        -ms-transform: rotate(0deg);
        transform: rotate(0deg);
      }
      100% {
        -webkit-transform: rotate(360deg);
        -ms-transform: rotate(360deg);
        transform: rotate(360deg);
      }
    }
```

##  10 有哪些方式（CSS）可以隐藏页面元素

*   `opacity:0`：本质上是将元素的透明度将为`0`，就看起来隐藏了，但是依然占据空间且可以交互
*   `visibility:hidden`: 与上一个方法类似的效果，占据空间，但是不可以交互了
*   `overflow:hidden`: 这个只隐藏元素溢出的部分，但是占据空间且不可交互
*   `display:none`: 这个是彻底隐藏了元素，元素从文档流中消失，既不占据空间也不交互，也不影响布局
*   `z-index:-9999`: 原理是将层级放到底部，这样就被覆盖了，看起来隐藏了
*   `transform: scale(0,0)`: 平面变换，将元素缩放为`0`，但是依然占据空间，但不可交互

##  11 说说em/px/rem/vh/vw区别

传统的项目开发中，我们只会用到`px`、`%`、`em`这几个单位，它可以适用于大部分的项目开发，且拥有比较良好的兼容性

从CSS3开始，浏览器对计量单位的支持又提升到了另外一个境界，新增了`rem`、`vh`、`vw`、`vm`等一些新的计量单位

利用这些新的单位开发出比较良好的响应式页面，适应多种不同分辨率的终端，包括移动设备等

在`css`单位中，可以分为长度单位、绝对单位，如下表所指示

<table>

<thead>

<tr>

<th>CSS单位</th>

<th></th>

</tr>

</thead>

<tbody>

<tr>

<td>相对长度单位</td>

<td>em、ex、ch、rem、vw、vh、vmin、vmax、%</td>

</tr>

<tr>

<td>绝对长度单位</td>

<td>cm、mm、in、px、pt、pc</td>

</tr>

</tbody>

</table>

这里我们主要讲述`px`、`em`、`rem`、`vh`、`vw`

**px**

`px`，表示像素，所谓像素就是呈现在我们显示器上的一个个小点，每个像素点都是大小等同的，所以像素为计量单位被分在了绝对长度单位中

有些人会把`px`认为是相对长度，原因在于在移动端中存在设备像素比，`px`实际显示的大小是不确定的

这里之所以认为`px`为绝对单位，在于`px`的大小和元素的其他属性无关

**em**

em是相对长度单位。相对于当前对象内文本的字体尺寸。如当前对行内文本的字体尺寸未被人为设置，则相对于浏览器的默认字体尺寸（`1em = 16px`）

为了简化 `font-size` 的换算，我们需要在`css`中的 `body` 选择器中声明`font-size`= `62.5%`，这就使 em 值变为 `16px*62.5% = 10px`

这样 `12px = 1.2em`, `10px = 1em`, 也就是说只需要将你的原来的`px` 数值除以 10，然后换上 `em`作为单位就行了

特点：

*   `em` 的值并不是固定的
*   `em` 会继承父级元素的字体大小
*   `em` 是相对长度单位。相对于当前对象内文本的字体尺寸。如当前对行内文本的字体尺寸未被人为设置，则相对于浏览器的默认字体尺寸
*   任意浏览器的默认字体高都是 `16px`

举个例子

```jsx

    <div class="big">
        我是14px=1.4rem<div class="small">我是12px=1.2rem</div>
    </div>
```

样式为

```jsx

    <style>
        html {font-size: 10px;  } /*  公式16px*62.5%=10px  */  
        .big{font-size: 1.4rem}
        .small{font-size: 1.2rem}
    </style>
```

这时候`.big`元素的`font-size`为14px，而`.small`元素的`font-size`为12px

**rem(常用)**

*   根据屏幕的分辨率动态设置`html`的文字大小，达到等比缩放的功能
*   保证`html`最终算出来的字体大小，不能小于`12px`
*   在不同的移动端显示不同的元素比例效果
*   如果`html`的`font-size:20px`的时候，那么此时的`1rem = 20px`
*   把设计图的宽度分成多少分之一，根据实际情况
*   `rem`做盒子的宽度，`viewport`缩放

`head`加入常见的`meta`属性

```jsx

    <meta name="format-detection" content="telephone=no">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <!--这个是关键-->
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0，minimum-scale=1.0">
```

把这段代码加入`head`中的`script`预先加载

```jsx

    // rem适配用这段代码动态计算html的font-size大小
    (function(win) {
        var docEl = win.document.documentElement;
        var timer = '';

        function changeRem() {
            var width = docEl.getBoundingClientRect().width;
            if (width > 750) { // 750是设计稿大小
                width = 750;
            }
            var fontS = width / 10; // 把设备宽度十等分 1rem<=75px
            docEl.style.fontSize = fontS + "px";
        }
        win.addEventListener("resize", function() {
            clearTimeout(timer);
            timer = setTimeout(changeRem, 30);
        }, false);
        win.addEventListener("pageshow", function(e) {
            if (e.persisted) { //清除缓存
                clearTimeout(timer);
                timer = setTimeout(changeRem, 30);
            }
        }, false);
        changeRem();
    })(window)
```

*   或者使用淘宝提供的库 [https://github.com/amfe/lib-flexible<span><span class="sr-only">(opens new window)</span></span>](https://github.com/amfe/lib-flexible)

**vh、vw**

`vw` ，就是根据窗口的宽度，分成`100`等份，`100vw`就表示满宽，`50vw`就表示一半宽。（`vw` 始终是针对窗口的宽），同理，`vh`则为窗口的高度

这里的窗口分成几种情况：

*   在桌面端，指的是浏览器的可视区域
*   移动端指的就是布局视口

像`vw`、`vh`，比较容易混淆的一个单位是`%`，不过百分比宽泛的讲是相对于父元素：

*   对于普通定位元素就是我们理解的父元素
*   对于`position: absolute;`的元素是相对于已定位的父元素
*   对于`position: fixed;`的元素是相对于 `ViewPort`（可视窗口）

**总结**

*   **px**：绝对单位，页面按精确像素展示
*   **%**：相对于父元素的宽度比例
*   **em**：相对单位，基准点为父节点字体的大小，如果自身定义了`font-size`按自身来计算（浏览器默认字体是`16px`），整个页面内`1em`不是一个固定的值
*   **rem**：相对单位，可理解为`root em`, 相对根节点`html`的字体大小来计算
*   **vh、vw**：主要用于页面视口大小布局，在页面布局上更加方便简单
    *   `vw`：屏幕宽度的`1%`
    *   `vh`：屏幕高度的`1%`
    *   `vmin`：取`vw`和`vh`中较小的那个（如：`10vh=100px 10vw=200px` 则`vmin=10vh=100px`）
    *   `vmax`：取`vw`和`vh`中较大的那个（如：`10vh=100px 10vw=200px` 则`vmax=10vw=200px`）

##  12 flex布局

很多时候我们会用到 `flex: 1` ，它具体包含了以下的意思

*   `flex-grow: 1` ：该属性默认为 `0` ，如果存在剩余空间，元素也不放大。设置为 `1`  代表会放大。
*   `flex-shrink: 1` ：该属性默认为 `1 ，如果空间不足，元素缩小。
*   `flex-basis: 0%` ：该属性定义在分配多余空间之前，元素占据的主轴空间。浏览器就是根据这个属性来计算是否有多余空间的。默认值为 `auto` ，即项目本身大小。设置为 `0%`  之后，因为有 `flex-grow`  和 `flex-shrink` 的设置会自动放大或缩小。在做两栏布局时，如果右边的自适应元素 `flex-basis`  设为`auto`  的话，其本身大小将会是 `0`

##  13 关于伪类 LVHA 的解释

> a标签有四种状态：链接访问前、链接访问后、鼠标滑过、激活，分别对应四种伪类:`link`、`:visited`、`:hover`、`:active`；

**当链接未访问过时：**

*   当鼠标滑过a链接时，满足`:link`和`:hover`两种状态，要改变a标签的颜色，就必须将`:hover`伪类在`:link`伪 类后面声明；
*   当鼠标点击激活a链接时，同时满足`:link`、`:hover`、`:active`三种状态，要显示a标签激活时的样式（`:active`）， 必须将`:active`声明放到`:link`和`:hover`之后。因此得出`LVHA`这个顺序。
*   当链接访问过时，情况基本同上，只不过需要将`:link`换成`:visited`。

> 这个顺序能不能变？可以，但也只有`:link`和`:visited`可以交换位置，因为一个链接要么访问过要么没访问过，不可能同时满足，也就不存在覆盖的问题。

##  14 calc函数

> calc函数是css3新增的功能，可以使用`calc()`计算`border、margin、pading、font-size`和width等属性设置动态值

```jsx

    #div1 {
        position: absolute;
        left: 50px;
        width: calc( 100% / (100px * 2) );
        /* 兼容写法 */
        width: -moz-calc( 100% / (100px * 2) );
        width: -webkit-calc( 100% / (100px * 2) );
        border: 1px solid black;
    }
```

**注意点：**

*   需要注意的是，运算符前后都需要保留一个空格，例如：`width: calc(100% - 10px)`;
*   `calc()`函数支持 `"+"`, "`-"`, `"*"`, `"/"` 运算;
*   对于不支持 `calc()`的浏览器，整个属性值表达式将被忽略。不过我们可以对那些不支持`calc()`的浏览器，使用一个固定值作为回退。

##  15 伪类和伪元素

> `css`引入伪类和伪元素概念是为了格式化文档树以外的信息。也就是说，伪类和伪元素都是用来修饰不在文档树中的部分

**伪类**

> 伪类存在的意义是为了通过选择器找到那些不存在DOM树中的信息以及不能被常规CSS选择器获取到的信息

1.  获取不存在与DOM树中的信息。比如a标签的`:link`、`visited`等，这些信息不存在与DOM树结构中，只能通过CSS选择器来获取；
2.  获取不能被常规CSS选择器获取的信息。比如：要获取第一个子元素，我们无法用常规的CSS选择器获取，但可以通过 `:first-child` 来获取到。

![](https://s.poetries.work/gitee/2020/01/24.png)

**伪元素**

> 伪元素用于创建一些不在文档树中的元素，并为其添加样式。比如说，我们可以通过`:before`来在一个元素前增加一些文本，并为这些文本添加样式。虽然用户可以看到这些文本，但是这些文本实际上不在文档树中。常见的伪元素有：`::before`，`::after`，`::first-line`，`::first-letter`，`::selection`、`::placeholder`等

> 因此，伪类与伪元素的区别在于：有没有创建一个文档树之外的元素

**::after和:after的区别**

*   在实际的开发工作中，我们会看到有人把伪元素写成`:after`，这实际是 `CSS2` 与`CSS3`新旧标准的规定不同而导致的。
*   `CSS2` 中的伪元素使用1个冒号，在 `CSS3` 中，为了区分伪类和伪元素，规定伪元素使用2个冒号。所以，对于 CSS2 标准的老伪元素，比如`:first-line`，`:first-letter`，`:before`，`:after`，写一个冒号浏览器也能识别，但对于 CSS3 标准的新伪元素，比如`::selection`，就必须写2个冒号了

**CSS3新增伪类有那些？**

*   `p:first-of-type` 选择属于其父元素的首个`<p>`元素的每个`<p>` 元素。
*   `p:last-of-type` 选择属于其父元素的最后 `<p>` 元素的每个`<p>` 元素。
*   `p:only-of-type` 选择属于其父元素唯一的 `<p>`元素的每个 `<p>` 元素。
*   `p:only-child` 选择属于其父元素的唯一子元素的每个 `<p>` 元素。
*   `p:nth-child(2)` 选择属于其父元素的第二个子元素的每个 `<p>` 元素。
*   `:after` 在元素之前添加内容,也可以用来做清除浮动。
*   `:before` 在元素之后添加内容
*   `:enabled`
*   `:disabled` 控制表单控件的禁用状态。
*   `:checked` 单选框或复选框被选中

##  16 浏览器是怎样解析 CSS 选择器的

*   样式系统从关键选择器开始匹配，然后左移查找规则选择器的祖先元素。只要选择器的子树一直在工作，样式系统就会持续左移，直到和规则匹配，或者是因为不匹配而放弃该规则。
*   试想一下，如果采用从左至右的方式读取CSS规则，那么大多数规则读到最后（最右）才会发现是不匹配的，这样做会费时耗能，
*   最后有很多都是无用的；而如果采取从右向左的方式，那么只要发现最右边选择器不匹配，就可以直接舍弃了，避免了许多无效匹配。

##  17 浏览器如何判断是否支持 webp 格式图片

*   宽高判断法。通过创建`image`对象，将其`src`属性设置为`webp`格式的图片，然后在`onload`事件中获取图片的宽高，如 果能够获取，则说明浏览器支持`webp`格式图片。如果不能获取或者触发了`onerror`函数，那么就说明浏览器不支持webp格 式的图片
*   canvas判断方法。我们可以动态的创建一个`canvas`对象，通过`canvas`的`toDataURL`将设置为webp格式，然后判断 返回值中是否含有`image/webp`字段，如果包含则说明支持`WebP`，反之则不支持

##  18 CSS加载问题

根据页面渲染流程可得知：

*   `css`加载不会阻塞DOM树的解析;
*   `css`加载会阻塞DOM树的渲染；
*   `css`加载会阻塞后面js语句的执行

##  19 文字单超出显示省略号

```jsx

    div {
    	width: 200px;
    	overflow: hidden;
    	white-space: nowrap;
    	text-overflow: ellipsis;
    }
```

**文字多行超出显示省略号**

```jsx

    div {
    	width: 200px;
    	display: -webkit-box;
    	-webkit-box-orient: vertical;
    	-webkit-line-clamp: 3;
    	overflow: hidden;
    }
```

该方法适用于WebKit浏览器及移动端。

**跨浏览器兼容方案：**

```jsx

    p {
        position:relative;
        line-height:1.4em;
        /* 3 times the line-height to show 3 lines */
        height:4.2em;
        overflow:hidden;
    }
    p::after {
        content:"...";
        font-weight:bold;
        position:absolute;
        bottom:0;
        right:0;
        padding:0 20px 1px 45px;
    }
```

##  20 页面变灰

```jsx

    body {
    	filter: grayscale(100%); /* 百分比或者 0~1 */
    }
```

##  21 CSS中可继承的属性

> 可继承的只有：`颜色`、`文字`、`字体间距`、`行高对齐方式`，`列表样式`。

所有元素可继承：`visibility`和`cursor`。

*   内联元素可继承：
    *   `letter-spacing`
    *   `word-spacing`
    *   `white-space`
    *   `line-height`
    *   `color`
    *   `font`
    *   `font-family`
    *   `font-size`
    *   `font-style`
    *   `font-variant`
    *   `font-weight`
    *   `text-decoration`
    *   `text-transform`
    *   `direction`
*   块状：`text-indent`和`text-align`。
*   列表元素可继承：`list-style`、`list-style-type`、`list-style-position`、`list-style-image`

## 是个怎样的排列关系

将窗体自上而下分成一行一行,并在每行中按从左至右的挨次排放元素。

##  23 inline-block的使用场景

1.  要设置某些子元素在一行或者多行内显示，尤其是排列方向一致的情况下，应尽量用`inline-block`。
2.  希望若干个元素平行排列，且在父元素中居中排列，此时可以用`inline-block`，且给父元素设`text-align: center`。
3.  `inline-block`可以用一排`a {display: inline-block}`实现横向导航栏，无论是居左的导航栏还是居右的都适用。

对于第一种和第三种情况虽然都可以使用`float`来实现，不过`inline-block`会比它好一些，原因如下：

*   浮动会脱离文档流，导致父元素高度塌陷

##  24 position: fixed什么时候会失效？

我们知道，设置了`position: fixed`固定定位属性的元素会脱离文档流，达到“超然脱俗”的境界。

> 也就是说此时给这种元素设置`top, left, right, bottom`等属性是根据**浏览器窗口**定位的，与其上级元素的位置无关。

但是有一种情况例外：

*   若是设置了`position: fixed`属性的元素，它的祖先元素设置了`transform`属性则会导致固定定位属性失效。
*   只要你的`transform`设置的不是`none`，都会影响到`position: fixed`，因为此时就会相对于祖先元素指定坐标，而不是浏览器窗口。

注意，这个特性表现，目前只在Chrome浏览器/FireFox浏览器下有。IE浏览器，包括IE11, `fixed`还是`fixed`的表现。

##  25 回流（reflow）和重绘（repaint）的理解

###  分析

在`HTML`中，每个元素都可以理解成一个盒子，在浏览器解析过程中，会涉及到回流与重绘：

*   **回流**：布局引擎会根据各种样式计算每个盒子在页面上的大小与位置
*   **重绘**：当计算好盒模型的位置、大小及其他属性后，浏览器根据每个盒子特性进行绘制

具体的浏览器解析渲染机制如下所示：

![](https://s.poetries.work/uploads/2022/09/b3fc0062bac6f0ff.png)

*   解析HTML，生成`DOM`树，解析`CSS`，生成`CSSOM`树
*   将`DOM`树和`CSSOM`树结合，生成渲染树(`Render Tree`)
*   `Layout`(回流):根据生成的渲染树，进行回流(`Layout`)，得到节点的几何信息（位置，大小）
*   `Painting`(重绘):根据渲染树以及回流得到的几何信息，得到节点的绝对像素
*   `Display`:将像素发送给`GPU`，展示在页面上

> *   在页面初始渲染阶段，回流不可避免的触发，可以理解成页面一开始是空白的元素，后面添加了新的元素使页面布局发生改变
> *   当我们对 `DOM` 的修改引发了 `DOM`几何尺寸的变化（比如修改元素的宽、高或隐藏元素等）时，浏览器需要重新计算元素的几何属性，然后再将计算的结果绘制出来
> *   当我们对 `DOM`的修改导致了样式的变化（`color`或`background-color`），却并未影响其几何属性时，浏览器不需重新计算元素的几何属性、直接为该元素绘制新的样式，这里就仅仅触发了重绘

###  如何触发

要想减少回流和重绘的次数，首先要了解回流和重绘是如何触发的

**回流触发时机**

> 回流这一阶段主要是计算节点的位置和几何信息，那么**当页面布局和几何信息发生变化的时候，就需要回流**，如下面情况：

*   添加或删除可见的DOM元素
*   元素的位置发生变化
*   元素的尺寸发生变化（包括外边距、内边框、边框大小、高度和宽度等）
*   内容发生变化，比如文本变化或图片被另一个不同尺寸的图片所替代
*   页面一开始渲染的时候（这避免不了）
*   浏览器的窗口尺寸变化（因为回流是根据视口的大小来计算元素的位置和大小的）
*   还有一些容易被忽略的操作：获取一些特定属性的值。浏览器为了获取这些值，需要进行回流操作
    *   `offsetTop`
    *   `offsetLeft`
    *   `offsetWidth`
    *   `offsetHeight`
    *   `scrollTop`
    *   `scrollLeft`
    *   `scrollWidth`
    *   `scrollHeight`
    *   `clientTop`
    *   `clientLeft`
    *   `clientWidth`
    *   `clientHeight`
    *   这些属性有一个共性，就是需要通过即时计算得到。因此浏览器为了获取这些值，也会进行回流
*   除此还包括`getComputedStyle`方法，原理是一样的

> **回流过程**：由于DOM的结构发生了改变，所以需要从生成DOM这一步开始，重新经过`样式计算`、`生成布局树`、`建立图层树`、再到`生成绘制列表`以及之后的显示器显示这整一个渲染过程走一遍，开销是非常大的

**重绘触发时机**

> 通过构造渲染树和重排（回流）阶段，我们知道了哪些节点是可见的，以及可见节点的样式和具体的几何信息(元素在视口内的位置和尺寸大小)，接下来就可以将渲染树的每个节点都转换为屏幕上的实际像素，这个阶段就叫做重绘

触发回流一定会触发重绘

*   当 **`DOM` 的修改导致了样式的变化**，并且没有影响几何属性的时候，会导致`重绘`(`repaint`)。
*   重绘过程：由于没有导致 `DOM` 几何属性的变化，因此元素的位置信息不需要更新，所以当发生重绘的时候，会跳过`生存布局树`和`建立图层树`的阶段，直接到`生成绘制列表`，然后继续进行分块、生成位图等后面一系列操作。

**浏览器优化机制**

*   由于每次重排都会造成额外的计算消耗，因此大多数浏览器都会通过队列化修改并批量执行来优化重排过程。浏览器会将修改操作放入到队列里，直到过了一段时间或者操作达到了一个阈值，才清空队列
*   当你获取布局信息的操作的时候，会强制队列刷新，包括前面讲到的`offsetTop`等方法都会返回最新的数据
*   因此浏览器不得不清空队列，触发回流重绘来返回正确的值

###  如何避免

1.  避免频繁使用 `style`，而是采用修改`class`的方式。
2.  将动画效果应用到`position`属性为`absolute`或`fixed`的元素上。
3.  批量操作 `DOM`，比如读取某元素 `offsetWidth` 属性存到一个临时变量，再去使用，而不是频繁使用这个计算属性；又比如利用 `document.createDocumentFragment()` 来添加要被添加的节点，处理完之后再插入到实际 DOM 中
4.  也可以先为元素设置`display: none`，操作结束后再把它显示出来。因为在`display`属性为`none`的元素上进行的DOM操作不会引发回流和重绘
5.  对于 `resize`、`scroll` 等进行防抖/节流处理。
6.  避免频繁读取会引发回流/重绘的属性，如果确实需要多次使用，就用一个变量缓存起来。
7.  利用 CSS3 的`transform`、`opacity`、`filter`这些属性可以实现合成的效果，也就是`CPU`加速。

**以下举例分析**

例如，多次修改一个把元素布局的时候，我们很可能会如下操作

```jsx

    const el = document.getElementById('el')
    for(let i=0;i<10;i++) {
        el.style.top  = el.offsetTop  + 10 + "px";
        el.style.left = el.offsetLeft + 10 + "px";
    }
```

每次循环都需要获取多次`offset`属性，比较糟糕，可以使用变量的形式缓存起来，待计算完毕再提交给浏览器发出重计算请求

```jsx

    // 缓存offsetLeft与offsetTop的值
    const el = document.getElementById('el')
    let offLeft = el.offsetLeft, offTop = el.offsetTop

    // 在JS层面进行计算
    for(let i=0;i<10;i++) {
      offLeft += 10
      offTop  += 10
    }

    // 一次性将计算结果应用到DOM上
    el.style.left = offLeft + "px"
    el.style.top = offTop  + "px"
```

我们还可避免改变样式，使用类名去合并样式

```jsx

    const container = document.getElementById('container')
    container.style.width = '100px'
    container.style.height = '200px'
    container.style.border = '10px solid red'
    container.style.color = 'red'
```

使用类名去合并样式

```jsx

    <style>
      .basic_style {
        width: 100px;
        height: 200px;
        border: 10px solid red;
        color: red;
      }
    </style>
    <script>
      const container = document.getElementById('container')
      container.classList.add('basic_style')
    </script>
```

*   前者每次单独操作，都去触发一次渲染树更改（新浏览器不会），
*   都去触发一次渲染树更改，从而导致相应的回流与重绘过程
*   合并之后，等于我们将所有的更改一次性发出
*   我们还可以通过通过设置元素属性`display: none`，将其从页面上去掉，然后再进行后续操作，这些后续操作也不会触发回流与重绘，这个过程称为**离线操作**

```jsx

    const container = document.getElementById('container')
    container.style.width = '100px'
    container.style.height = '200px'
    container.style.border = '10px solid red'
    container.style.color = 'red'
```

离线操作后

```jsx

    let container = document.getElementById('container')
    container.style.display = 'none'
    container.style.width = '100px'
    container.style.height = '200px'
    container.style.border = '10px solid red'
    container.style.color = 'red'
    ...（省略了许多类似的后续操作）
    container.style.display = 'block'
```

##  26 GPU加速的原因

> 在合成的情况下，会直接跳过布局和绘制流程，直接进入`非主线程`处理的部分，即直接交给`合成线程`处理。交给它处理有两大好处:

1.  能够充分发挥`GPU`的优势。合成线程生成位图的过程中会调用线程池，并在其中使用`GPU`进行加速生成，而 `GPU` 是擅长处理位图数据的。
2.  没有占用主线程的资源，即使主线程卡住了，效果依然能够流畅地展示。

##  27 说说will-change

> `will-change`是`CSS3`新增的标准属性，它的作用很单纯，就是`"增强页面渲染性能"`，当我们在通过某些行为触发页面进行大面积绘制的时候，浏览器往往是没有准备，只能被动的使用CUP去计算和重绘，由于事先没有准备，对于一些复杂的渲染可能会出现掉帧、卡顿等情况。而`will-change`则是在真正的行为触发之前告诉浏览器可能要进行重绘了，相当于浏览器把CUP拉上了，能从容的面对接下来的变形。

**常用的语法主要有：**

*   `whil-change: scroll-position;` 即将开始滚动
*   `will-change: contents;` 内容要动画或者变化了
*   `will-transform;` transform相关的属性要变化了(常用)

**注意：**

*   `will-change`虽然可以开启加速，但是一定要适度使用
*   开启加速的代价为手机的耗电量会增加
*   使用时遵循最小化影响原则，可以对伪元素开启加速，独立渲染
*   可以写在伪类中，例如`hover`中，这样移出元素的时候就会自动`remove`掉`will-change`了
*   如果使用`JS`添加了`will-change`，注意要及时`remove`掉，方式就是`style.willChange = 'auto'`

##  28 z-index和background的覆盖关系

![](https://s.poetries.work/gitee/2020/09/4.png)

##  29 移动端中css你是使用什么单位

**比较常用的**：

*   `em`：定义字体大小时以父级的字体大小为基准；定义长度单位时以当前字体大小为基准。例父级`font-size: 14px`，则子级`font-size: 1em;`为`font-size: 14px;`；若定义长度时，子级的字体大小如果为`14px`，则子级`width: 2em;`为`width: 24px`。
*   `rem`：以根元素的字体大小为基准。例如`html`的`font-size: 14px`，则子级`1rem = 14px`。
*   `%`：以父级的宽度为基准。例父级`width: 200px`，则子级`width: 50%;height:50%;`为`width: 100px;height: 100px;`
*   `vw和vh`：基于视口的宽度和高度(视口不包括浏览器的地址栏工具栏和状态栏)。例如视口宽度为`1000px`，则`60vw = 600px;`
*   `vmin和vmax`：`vmin`为当前`vw` 和`vh`中较小的一个值；`vmax`为较大的一个值。例如视口宽度`375px`，视口高度`812px`，则`100vmin = 375px;`，`100vmax = 812px;`

**不常用的：**

*   `ex和ch`：`ex`以字符`"x"`的高度为基准；例如`1ex`表示和字符`"x"`一样长。`ch`以数字`"0"`的宽度为基准；例如`2ch`表示和2个数字`"0"`一样长。

**移动端布局总结**：

1.  移动端布局的方式主要使用rem和flex，可以结合各自的优点，比如flex布局很灵活，但是字体的大小不好控制，我们可以使用rem和媒体查询控制字体的大小，媒体查询视口的大小，然后不同的上视口大小下设置设置`html`的`font-size`。
2.  可单独制作移动端页面也可响应式pc端移动端共用一个页面。没有好坏，视情况而定，因势利导

##  30 说说设备像素、css像素、设备独立像素、dpr、ppi 之间的区别

**1\. 背景**

在`css`中我们通常使用`px`作为单位，在`PC`浏览器中`css`的`1`个像素都是对应着电脑屏幕的`1`个物理像素

这会造成一种错觉，我们会认为`css`中的像素就是设备的物理像素

但实际情况却并非如此，`css`中的像素只是一个抽象的单位，在不同的设备或不同的环境中，`css`中的`1px`所代表的设备物理像素是不同的

当我们做移动端开发时，同为`1px`的设置，在不同分辨率的移动设备上显示效果却有很大差异

这背后就涉及了`css`像素、设备像素、设备独立像素、`dpr`、`ppi`的概念

**2\. 介绍**

**CSS像素**

CSS像素（`css pixel`,`px`）: 适用于`web`编程，在 CSS 中以 `px` 为后缀，是一个长度单位

在 CSS 规范中，长度单位可以分为两类，绝对单位以及相对单位

`px`是一个相对单位，相对的是设备像素（`device pixel`）

一般情况，页面缩放比为`1`，`1`个CSS像素等于`1`个设备独立像素

`CSS`像素又具有两个方面的相对性：

*   在同一个设备上，每`1`个 `CSS` 像素所代表的设备像素是可以变化的（比如调整屏幕的分辨率）
*   在不同的设备之间，每`1`个 `CSS` 像素所代表的设备像素是可以变化的（比如两个不同型号的手机）

在页面进行缩放操作也会引起`css`中`px`的变化，假设页面放大一倍，原来的 `1px` 的东西变成 `2px`，在实际宽度不变的情况下`1px` 变得跟原来的 `2px` 的长度（长宽）一样了（元素会占据更多的设备像素）

假设原来需要 `320px` 才能填满的宽度现在只需要 `160px`

`px`会受到下面的因素的影响而变化：

*   每英寸像素（`PPI`）
*   设备像素比（`DPR`）

**设备像素**

设备像素（`device pixels`），又称为物理像素

指设备能控制显示的最小物理单位，不一定是一个小正方形区块，也没有标准的宽高，只是用于显示丰富色彩的一个“点”而已

可以参考公园里的景观变色彩灯，一个彩灯(物理像素)由红、蓝、绿小灯组成，三盏小灯不同的亮度混合出各种色彩

![](https://s.poetries.work/uploads/2022/09/c4d2f6aaf3b13a69.png)

从屏幕在工厂生产出的那天起，它上面设备像素点就固定不变了，单位为`pt`

**设备独立像素**

设备独立像素（Device Independent Pixel）：与设备无关的逻辑像素，代表可以通过程序控制使用的虚拟像素，是一个总体概念，包括了CSS像素

在`javaScript`中可以通过`window.screen.width/ window.screen.height` 查看

比如我们会说“电脑屏幕在 `2560x1600` 分辨率下不适合玩游戏，我们把它调为 `1440x900`”，这里的“分辨率”（非严谨说法）指的就是设备独立像素

一个设备独立像素里可能包含`1`个或者多个物理像素点，包含的越多则屏幕看起来越清晰

至于为什么出现设备独立像素这种虚拟像素单位概念，下面举个例子：

iPhone 3GS 和 iPhone 4/4s 的尺寸都是 3.5 寸，但 iPhone 3GS 的分辨率是 320x480，iPhone 4/4s 的分辨率是 640x960

这意味着，iPhone 3GS 有 320 个物理像素，iPhone 4/4s 有 640 个物理像素

如果我们按照真实的物理像素进行布局，比如说我们按照 320 物理像素进行布局，到了 640 物理像素的手机上就会有一半的空白，为了避免这种问题，就产生了虚拟像素单位

我们统一 iPhone 3GS 和 iPhone 4/4s 都是 320 个虚拟像素，只是在 iPhone 3GS 上，最终 1 个虚拟像素换算成 1 个物理像素，在 iphone 4s 中，1 个虚拟像素最终换算成 2 个物理像素

至于 1 个虚拟像素被换算成几个物理像素，这个数值我们称之为设备像素比，也就是下面介绍的`dpr`

**dpr**

`dpr`（device pixel ratio），设备像素比，代表设备独立像素到设备像素的转换关系，在`JavaScript`中可以通过 `window.devicePixelRatio` 获取

计算公式如下：

![](https://s.poetries.work/uploads/2022/09/c9feff5d47e9fba6.png)

当设备像素比为`1:1`时，使用1（`1×1`）个设备像素显示1个CSS像素

当设备像素比为`2:1`时，使用4（`2×2`）个设备像素显示1个CSS像素

当设备像素比为`3:1`时，使用9（`3×3`）个设备像素显示1个CSS像素

如下图所示：

![](https://s.poetries.work/uploads/2022/09/38d1db89f0b327e0.png)

当`dpr`为3，那么`1px`的`CSS`像素宽度对应`3px`的物理像素的宽度，1px的`CSS`像素高度对应`3px`的物理像素高度

**ppi**

`ppi` （pixel per inch），每英寸像素，表示每英寸所包含的像素点数目，更确切的说法应该是像素密度。数值越高，说明屏幕能以更高密度显示图像

计算公式如下：

![](https://s.poetries.work/uploads/2022/09/7fbfde9fbf465a8f.png)

**3\. 总结**

*   无缩放情况下，1个CSS像素等于1个设备独立像素
*   设备像素由屏幕生产之后就不发生改变，而设备独立像素是一个虚拟单位会发生改变
*   PC端中，1个设备独立像素 = 1个设备像素 （在`100%`，未缩放的情况下）
*   在移动端中，标准屏幕（`160ppi`）下 1个设备独立像素 = 1个设备像素
*   设备像素比（`dpr`） = `设备像素 / 设备独立像素`
*   每英寸像素（`ppi`），值越大，图像越清晰

##  31 在移动端中怎样初始化根元素的字体大小

一个简易版的初始化根元素字体大小。

页面开头处引入下面这段代码，用于动态计算`font-size`：

(假设你需要的`1rem = 20px`)

```jsx

    (function () {
      var html = document.documentElement;
      function onWindowResize() {
        html.style.fontSize = html.getBoundingClientRect().width / 20 + 'px';
      }
      window.addEventListener('resize', onWindowResize);
      onWindowResize();
    })();
```

*   `document.documentElement`：获取`document`的根元素
*   `html.getBoundingClientRect().width`：获取`html`的宽度(窗口的宽度)
*   监听`window`的`resize`事件

一般还需要配合一个`meta`头：

```jsx

    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-sacle=1.0, maximum-scale=1.0, user-scalable=no" />
```

##  32 移动端中不同手机html默认的字体大小都是一样的吗

> 如果没有人为取改变根元素字体大小的话，默认是`1rem = 16px`；根元素默认的字体大小是`16px`。

##  33 line-height 如何继承

*   父元素的 `line-height` 写了具体数值，比如 `30px`，则子元素 `line-height` 继承该值。
*   父元素的 `line-height` 写了比例，比如 `1.5`或 `2`，则子元素 `line-height` 也是继承该比例。
*   父元素的 `line-height` 写了百分比，比如 `200%`，则子元素 `line-height` 继承的是父元素 `font-size * 200%` 计算出来的值

## 

浏览器在处理下面的 `css` 的时候，会使用 `GPU` 渲染

*   `transform`（当 `3D` 变换的样式出现时会使用 `GPU` 加速）
*   `opacity`
*   `filter`
*   `will-change`

> *   采用 `transform: translateZ(0)`
> *   采用 `transform: translate3d(0, 0, 0)`
> *   使用 `CSS` 的 `will-change`属性。 `will-change` 可以设置为`opacity`、`transform`、`top、`left`、`bottom`、`right`

> 注意！层爆炸，由于某些原因可能导致产生大量不在预期内的合成层，虽然有浏览器的层压缩机制，但是也有很多无法进行压缩的情况，这就可能出现层爆炸的现象（简单理解就是，很多不需要提升为合成层的元素因为某些不当操作成为了合成层）。解决层爆炸的问题，最佳方案是打破 `overlap` 的条件，也就是说让其他元素不要和合成层元素重叠。简单直接的方式：使用 `3D` 硬件加速提升动画性能时，最好给元素增加一个 `z-index` 属性，人为干扰合成的排序，可以有效减少创建不必要的合成层，提升渲染性能，移动端优化效果尤为明显。

##  35 flex:1 是哪些属性组成的

*   `flex` 实际上是 `flex-grow`、`flex-shrink` 和 `flex-basis` 三个属性的缩写。
*   `flex-grow`：定义项目的的放大比例；
    *   默认为`0`，即 即使存在剩余空间，也不会放大；
    *   所有项目的`flex-grow`为`1`：等分剩余空间（自动放大占位）；
    *   `flex-grow`为`n`的项目，占据的空间（放大的比例）是`flex-grow`为`1`的`n`倍
*   `flex-shrink`：定义项目的缩小比例；
    *   默认为`1`，即 如果空间不足，该项目将缩小；
    *   所有项目的`flex-shrink`为`1`：当空间不足时，缩小的比例相同；
    *   `flex-shrink`为`0`：空间不足时，该项目不会缩小；
    *   `flex-shrink`为`n`的项目，空间不足时缩小的比例是`flex-shrink`为`1`的`n`倍。
*   `flex-basis`： 定义在分配多余空间之前，项目占据的主轴空间（`main size`），浏览器根据此属性计算主轴是否有多余空间
    *   默认值为`auto`，即 项目原本大小；
    *   设置后项目将占据固定空间。

##  36 css选择器有哪些？优先级？哪些属性可以继承？

关于`css`属性选择器常用的有：

*   `id`选择器（`#box`），选择id为box的元素
*   类选择器（`.one`），选择类名为one的所有元素
*   标签选择器（`div`），选择标签为div的所有元素
*   后代选择器（`#box div`），选择id为box元素内部所有的div元素
*   子选择器（`.one>one_1`），选择父元素为.one的所有.one_1的元素
*   相邻同胞选择器（`.one+.two`），选择紧接在.one之后的所有.two元素
*   群组选择器（`div,p`），选择div、p的所有元素

还有一些使用频率相对没那么多的选择器：

*   伪类选择器

```jsx

    :link ：选择未被访问的链接
    :visited：选取已被访问的链接
    :active：选择活动链接
    :hover ：鼠标指针浮动在上面的元素
    :focus ：选择具有焦点的
    :first-child：父元素的首个子元素
```

*   伪元素选择器

```jsx

    :first-letter ：用于选取指定选择器的首字母
    :first-line ：选取指定选择器的首行
    :before : 选择器在被选元素的内容前面插入内容
    :after : 选择器在被选元素的内容后面插入内容
```

*   属性选择器

```jsx

    [attribute] 选择带有attribute属性的元素
    [attribute=value] 选择所有使用attribute=value的元素
    [attribute~=value] 选择attribute属性包含value的元素
    [attribute|=value]：选择attribute属性以value开头的元素·
```

在`CSS3`中新增的选择器有如下：

*   层次选择器（`p~ul`），选择前面有`p`元素的每个`ul`元素
*   伪类选择器

```jsx

    :first-of-type 表示一组同级元素中其类型的第一个元素
    :last-of-type 表示一组同级元素中其类型的最后一个元素
    :only-of-type 表示没有同类型兄弟元素的元素
    :only-child 表示没有任何兄弟的元素
    :nth-child(n) 根据元素在一组同级中的位置匹配元素
    :nth-last-of-type(n) 匹配给定类型的元素，基于它们在一组兄弟元素中的位置，从末尾开始计数
    :last-child 表示一组兄弟元素中的最后一个元素
    :root 设置HTML文档
    :empty 指定空的元素
    :enabled 选择可用元素
    :disabled 选择被禁用元素
    :checked 选择选中的元素
    :not(selector) 选择与 <selector> 不匹配的所有元素
```

*   属性选择器

```jsx

    [attribute*=value]：选择attribute属性值包含value的所有元素
    [attribute^=value]：选择attribute属性开头为value的所有元素
    [attribute$=value]：选择attribute属性结尾为value的所有元素
```

**继承属性**

在`css`中，继承是指的是给父元素设置一些属性，后代元素会自动拥有这些属性

关于继承属性，可以分成：

*   字体系列属性

```jsx

    font:组合字体
    font-family:规定元素的字体系列
    font-weight:设置字体的粗细
    font-size:设置字体的尺寸
    font-style:定义字体的风格
    font-variant:偏大或偏小的字体
```

*   文本系列属性

```jsx

    text-indent：文本缩进
    text-align：文本水平对刘
    line-height：行高
    word-spacing：增加或减少单词间的空白
    letter-spacing：增加或减少字符间的空白
    text-transform：控制文本大小写
    direction：规定文本的书写方向
    color：文本颜色
```

*   元素可见性

```jsx

    visibility
```

*   表格布局属性

```jsx

    caption-side：定位表格标题位置
    border-collapse：合并表格边框
    border-spacing：设置相邻单元格的边框间的距离
    empty-cells：单元格的边框的出现与消失
    table-layout：表格的宽度由什么决定
```

*   列表属性

```jsx

    list-style-type：文字前面的小点点样式
    list-style-position：小点点位置
    list-style：以上的属性可通过这属性集合
```

*   引用

```jsx

    quotes：设置嵌套引用的引号类型
```

*   光标属性

```jsx

    cursor：箭头可以变成需要的形状
```

继承中比较特殊的几点：

*   `a` 标签的字体颜色不能被继承
*   `h1-h6`标签字体的大下也是不能被继承的

**无继承的属性**

*   `display`
*   文本属性：`vertical-align`、`text-decoration`
*   盒子模型的属性：宽度、高度、内外边距、边框等
*   背景属性：背景图片、颜色、位置等
*   定位属性：浮动、清除浮动、定位`position`等
*   生成内容属性：`content`、`counter-reset`、`counter-increment`
*   轮廓样式属性：`outline-style`、`outline-width`、`outline-color`、`outline`
*   页面样式属性：`size`、`page-break-before`、`page-break-after`

##  37 flex弹性盒布局模型及适用场景？

*   采用`Flex`布局的元素，称为`flex`容器`container`
*   它的所有子元素自动成为容器成员，称为`flex`项目`item`

![](https://s.poetries.work/uploads/2022/09/ccecc1e86f1ea0e1.png)

容器中默认存在两条轴，主轴和交叉轴，呈90度关系。项目默认沿主轴排列，通过`flex-direction`来决定主轴的方向

每根轴都有起点和终点，这对于元素的对齐非常重要

关于flex常用的属性，我们可以划分为容器属性和容器成员属性

**容器属性有：**

*   `flex-direction: row | row-reverse | column | column-reverse;` 决定主轴的方向(即项目的排列方向)
    *   `row`（默认值）：主轴为水平方向，起点在左端
    *   `row-reverse`：主轴为水平方向，起点在右端
    *   `column`：主轴为垂直方向，起点在上沿。
    *   `column-reverse`：主轴为垂直方向，起点在下沿 ![](https://s.poetries.work/uploads/2022/09/a6eee92bd809de3c.png)
*   `flex-wrap: nowrap | wrap | wrap-reverse;` 弹性元素永远沿主轴排列，那么如果主轴排不下，通过`flex-wrap`决定容器内项目是否可换行
    *   `nowrap`（默认值）：默认情况是不换行，但这里也不会任由元素直接溢出容器，会涉及到元素的弹性伸缩
    *   `wrap`：换行，第一行在下方
    *   `wrap-reverse`：换行，第一行在上方
*   `flex-flow: <flex-direction> || <flex-wrap>;` 是`flex-direction`属性和`flex-wrap`属性的简写形式，默认值为`row nowrap`
*   `justify-content: flex-start | flex-end | center | space-between | space-around;` 定义了项目在主轴上的对齐方式
    *   `flex-start`（默认值）：左对齐
    *   `flex-end`：右对齐
    *   `center`：居中
    *   `space-between`：两端对齐，项目之间的间隔都相等
    *   `space-around`：两个项目两侧间隔相等 ![](https://s.poetries.work/uploads/2022/09/bce899ac16248797.png)
*   `align-items: flex-start | flex-end | center | baseline | stretch;` 定义项目在交叉轴上如何对齐
    *   `flex-start`：交叉轴的起点对齐
    *   `flex-end`：交叉轴的终点对齐
    *   `center`：交叉轴的中点对齐
    *   `baseline`: 项目的第一行文字的基线对齐
    *   `stretch`（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度
*   `align-content: flex-start | flex-end | center | space-between | space-around | stretch;` 定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用
    *   `flex-start`：与交叉轴的起点对齐
    *   `flex-end`：与交叉轴的终点对齐
    *   `center`：与交叉轴的中点对齐
    *   `space-between`：与交叉轴两端对齐，轴线之间的间隔平均分布
    *   `space-around`：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍
    *   `stretch`（默认值）：轴线占满整个交叉轴 ![](https://s.poetries.work/uploads/2022/09/9611b37a46dab667.png)

**容器成员属性如下：**

*   `order: <integer>;` 定义项目的排列顺序。数值越小，排列越靠前，默认为`0`
*   `flex-grow: <number>;` 上面讲到当容器设为`flex-wrap: nowrap;`不换行的时候，容器宽度有不够分的情况，弹性元素会根据`flex-grow`来决定
    *   定义项目的放大比例（容器宽度>元素总宽度时如何伸展）
    *   默认为`0`，即如果存在剩余空间，也不放大
    *   如果所有项目的`flex-grow`属性都为`1`，则它们将等分剩余空间（如果有的话） ![](https://s.poetries.work/uploads/2022/09/e9d637aaeb865268.png)
    *   如果一个项目的`flex-grow`属性为`2`，其他项目都为`1`，则前者占据的剩余空间将比其他项多一倍 ![](https://s.poetries.work/uploads/2022/09/2cf5e657b6f968c9.png)
    *   弹性容器的宽度正好等于元素宽度总和，无多余宽度，此时无论`flex-grow`是什么值都不会生效
*   `flex-shrink: <number>; /* default 1 */` 定义了项目的缩小比例（容器宽度<元素总宽度时如何收缩），默认为`1`，即如果空间不足，该项目将缩小
    *   如果所有项目的`flex-shrink`属性都为`1`，当空间不足时，都将等比例缩小
    *   如果一个项目的`flex-shrink`属性为`0`，其他项目都为`1`，则空间不足时，前者不缩小
    *   在容器宽度有剩余时，`flex-shrink`也是不会生效的 ![](https://s.poetries.work/uploads/2022/09/e4846a5a063570ec.png)
*   `flex-basis: <length> | auto; /* default auto */` 设置的是元素在主轴上的初始尺寸，所谓的初始尺寸就是元素在`flex-grow`和`flex-shrink`生效前的尺寸
    *   浏览器根据这个属性，计算主轴是否有多余空间，默认值为`auto`，即项目的本来大小，如设置了`width`则元素尺寸由`width/height`决定（主轴方向），没有设置则由内容决定
    *   当设置为`0`的是，会根据内容撑开
    *   它可以设为跟`width`或`height`属性一样的值（比如`350px`），则项目将占据固定空间
*   `flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]` 属性是`flex-grow`, `flex-shrink` 和 `flex-basis`的简写，默认值为`0 1 auto`，也是比较难懂的一个复合属性
    *   `flex: 1 = flex: 1 1 0%`
    *   `flex: 2 = flex: 2 1 0%`
    *   `flex: auto = flex: 1 1 auto`
    *   `flex: none = flex: 0 0 auto`，常用于固定尺寸不伸缩
    *   `flex:1` 和 `flex:auto` 的区别，可以归结于`flex-basis:0`和`flex-basis:auto`的区别
    *   当设置为`0`时（绝对弹性元素），此时相当于告诉`flex-grow`和`flex-shrink`在伸缩的时候不需要考虑我的尺寸
    *   当设置为`auto`时（相对弹性元素），此时则需要在伸缩时将元素尺寸纳入考虑
    *   注意：建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值
*   `align-self: auto | flex-start | flex-end | center | baseline | stretch;` 允许单个项目有与其他项目不一样的对齐方式，可覆盖`align-items`属性
    *   默认值为`auto`，表示继承父元素的`align-items`属性，如果没有父元素，则等同于`stretch` ![](https://s.poetries.work/uploads/2022/09/0bbe195a6bf6a2a5.png)

**应用场景**

*   `flex`简单粗暴的实现元素水平垂直方向的居中，以及在两栏三栏自适应布局中通过`flex`完成
*   在移动端、小程序这边的开发，都建议使用`flex`进行布局

##  38 介绍一下grid网格布局

`Grid` 布局即网格布局，是一个二维的布局方式，由纵横相交的两组网格线形成的框架性布局结构，能够同时处理行与列

擅长将一个页面划分为几个主要区域，以及定义这些区域的大小、位置、层次等关系

![](https://s.poetries.work/uploads/2022/09/7a6bebde16cd0dc1.png)

这与`flex`一维布局不相同

设置`display:grid/inline-grid`的元素就是网格布局容器，这样就能出发浏览器渲染引擎的网格布局算法

```jsx

    <div class="container">
        <div class="item item-1">
            <p class="sub-item"></p >
     </div>
        <div class="item item-2"></div>
        <div class="item item-3"></div>
    </div> 
```

上述代码实例中，`.container`元素就是网格布局容器，`.item`元素就是网格的项目，由于网格元素只能是容器的顶层子元素，所以`p`元素并不是网格元素

这里提一下，网格线概念，有助于下面对`grid-column`系列属性的理解

网格线，即划分网格的线，如下图所示：

![](https://s.poetries.work/uploads/2022/09/f3265f7748c5cab6.png)

上图是一个 `2 x 3` 的网格，共有`3`根水平网格线和`4`根垂直网格线

**Grid 布局属性可以分为两大类**

*   容器属性
*   项目属性

**关于容器属性有如下：**

*   `display` 在元素上设置`display：grid` 或 `display：inline-grid` 来创建一个网格容器
    *   `display：grid` 则该容器是一个块级元素
    *   `display: inline-grid` 则容器元素为行内元素
*   `grid-template-columns` 属性，`grid-template-rows` 属性
    *   `grid-template-columns` 属性设置列宽，`grid-template-rows` 属性设置行高

    ```jsx

        .wrapper {
          display: grid;
          /*  声明了三列，宽度分别为 200px 200px 200px */
          grid-template-columns: 200px 200px 200px;
          grid-gap: 5px;
          /*  声明了两行，行高分别为 50px 50px  */
          grid-template-rows: 50px 50px;
        }

    </div>

    *   以上表示固定列宽为 `200px 200px 200px`，行高为 `50px 50px`
    *   上述代码可以看到重复写单元格宽高，通过使用`repeat()`函数，可以简写重复的值
        *   第一个参数是重复的次数
        *   第二个参数是重复的值
    *   所以上述代码可以简写成

    ```jsx

        .wrapper {
            display: grid;
            grid-template-columns: repeat(3,200px);
            grid-gap: 5px;
            grid-template-rows:repeat(2,50px);
          }

    </div>

    *   除了上述的`repeat`关键字，还有：
        *   `auto-fill`：示自动填充，让一行（或者一列）中尽可能的容纳更多的单元格
            *   `grid-template-columns: repeat(auto-fill, 200px)` 表示列宽是 `200 px`，但列的数量是不固定的，只要浏览器能够容纳得下，就可以放置元素
        *   `fr`：片段，为了方便表示比例关系
            *   `grid-template-columns: 200px 1fr 2fr` 表示第一个列宽设置为 `200px`，后面剩余的宽度分为两部分，宽度分别为剩余宽度的 `1/3` 和 `2/3`
        *   `minmax`：产生一个长度范围，表示长度就在这个范围之中都可以应用到网格项目中。第一个参数就是最小值，第二个参数就是最大值
            *   `minmax(100px, 1fr)`表示列宽不小于`100px`，不大于`1fr`
        *   `auto`：由浏览器自己决定长度
            *   `grid-template-columns: 100px auto 100px` 表示第一第三列为 `100px`，中间由浏览器决定长度
*   `grid-row-gap` 属性， `grid-column-gap` 属性， `grid-gap` 属性
    *   `grid-row-gap` 属性、`grid-column-gap` 属性分别设置行间距和列间距。`grid-gap` 属性是两者的简写形式
    *   `grid-row-gap: 10px` 表示行间距是 `10px`
    *   `grid-column-gap: 20px` 表示列间距是 `20px`
    *   `grid-gap: 10px 20px` 等同上述两个属性
*   `grid-template-areas` 属性：用于定义区域，一个区域由一个或者多个单元格组成

    ```jsx

        .container {
            display: grid;
            grid-template-columns: 100px 100px 100px;
            grid-template-rows: 100px 100px 100px;
            grid-template-areas: 'a b c'
                                'd e f'
                                'g h i';
          }

    </div>

    *   上面代码先划分出`9`个单元格，然后将其定名为`a`到`i`的九个区域，分别对应这九个单元格。
    *   多个单元格合并成一个区域的写法如下

    ```jsx

        grid-template-areas: 'a a a'
                           'b b b'
                           'c c c';

    </div>

    *   上面代码将`9`个单元格分成`a、b、c`三个区域
    *   如果某些区域不需要利用，则使用"点"（`.`）表示
*   `grid-auto-flow` 属性
    *   划分网格以后，容器的子元素会按照顺序，自动放置在每一个网格。
    *   顺序就是由`grid-auto-flow`决定，默认为行，代表"先行后列"，即先填满第一行，再开始放入第二行 ![](https://s.poetries.work/uploads/2022/09/d973d2d25b7a9641.png)
    *   当修改成`column`后，放置变为如下 ![](https://s.poetries.work/uploads/2022/09/59cb05f9412d447a.png)
*   `justify-items` 属性， `align-items` 属性， `place-items` 属性
    *   `justify-items` 属性设置单元格内容的水平位置（左中右），`align-items` 属性设置单元格的垂直位置（上中下）
    *   两者属性的值完成相同

    ```jsx

        .container {
          justify-items: start | end | center | stretch;
          align-items: start | end | center | stretch;
        }

    </div>

    *   属性对应如下：
        *   `start`：对齐单元格的起始边缘
        *   `end`：对齐单元格的结束边缘
        *   `center`：单元格内部居中
        *   `stretch`：拉伸，占满单元格的整个宽度（默认值）
        *   `place-items`属性是`align-items`属性和`justify-items`属性的合并简写形式
*   `justify-content` 属性， `align-content` 属性， `place-content` 属性
    *   `justify-content`属性是整个内容区域在容器里面的水平位置（左中右），`align-content`属性是整个内容区域的垂直位置（上中下）

    ```jsx

        .container {
          justify-content: start | end | center | stretch | space-around | space-between | space-evenly;
          align-content: start | end | center | stretch | space-around | space-between | space-evenly;  
        }

    </div>

    *   两个属性的写法完全相同，都可以取下面这些值：
    *   `start` - 对齐容器的起始边框
    *   `end` - 对齐容器的结束边框
    *   `center` - 容器内部居中 ![](https://s.poetries.work/uploads/2022/09/aa3e504f73f0a7dc.png)
    *   `space-around` - 每个项目两侧的间隔相等。所以，项目之间的间隔比项目与容器边框的间隔大一倍
    *   `space-between` - 项目与项目的间隔相等，项目与容器边框之间没有间隔
    *   `space-evenly` - 项目与项目的间隔相等，项目与容器边框之间也是同样长度的间隔
    *   `stretch` - 项目大小没有指定时，拉伸占据整个网格容器 ![](https://s.poetries.work/uploads/2022/09/36511ef68d7b786b.png)
*   `grid-auto-columns` 属性和 `grid-auto-rows` 属性
    *   有时候，一些项目的指定位置，在现有网格的外部，就会产生显示网格和隐式网格
    *   比如网格只有`3`列，但是某一个项目指定在第`5`行。这时，浏览器会自动生成多余的网格，以便放置项目。超出的部分就是隐式网格
    *   而`grid-auto-rows`与`grid-auto-columns`就是专门用于指定隐式网格的宽高

**关于项目属性，有如下：**

*   `grid-column-start` 属性、`grid-column-end` 属性、`grid-row-start` 属性以及`grid-row-end` 属性
    *   指定网格项目所在的四个边框，分别定位在哪根网格线，从而指定项目的位置
    *   `grid-column-start` 属性：左边框所在的垂直网格线
    *   `grid-column-end` 属性：右边框所在的垂直网格线
    *   `grid-row-start` 属性：上边框所在的水平网格线
    *   `grid-row-end` 属性：下边框所在的水平网格线

    ```jsx

          <style>
            #container{
                display: grid;
                grid-template-columns: 100px 100px 100px;
                grid-template-rows: 100px 100px 100px;
            }
            .item-1 {
                grid-column-start: 2;
                grid-column-end: 4;
            }
          </style>

          <div id="container">
              <div class="item item-1">1</div>
              <div class="item item-2">2</div>
              <div class="item item-3">3</div>
          </div>

    </div>

    *   通过设置`grid-column`属性，指定`1`号项目的左边框是第二根垂直网格线，右边框是第四根垂直网格线 ![](https://s.poetries.work/uploads/2022/09/8fdf4b8f5e6babf4.png)
*   `grid-area` 属性
    *   `grid-area` 属性指定项目放在哪一个区域

    ```jsx

        item-1 {
          grid-area: e;
        }

    </div>

    *   意思为将`1`号项目位于`e`区域
*   `justify-self` 属性、`align-self` 属性以及 `place-self` 属性
    *   `justify-self`属性设置单元格内容的水平位置（左中右），跟`justify-items属性的用法完全一致，但只作用于单个项目。
    *   `align-self`属性设置单元格内容的垂直位置（上中下），跟`align-items`属性的用法完全一致，也是只作用于单个项目

    ```jsx

        .item {
          justify-self: start | end | center | stretch;
          align-self: start | end | center | stretch;
        }

    </div>

    *   这两个属性都可以取下面四个值。
        *   `start`：对齐单元格的起始边缘。
        *   `end`：对齐单元格的结束边缘。
        *   `center`：单元格内部居中。
        *   `stretch`：拉伸，占满单元格的整个宽度（默认值）

**应用场景**

Grid是一个强大的布局，如一些常见的 `CSS 布局`，如`居中`，`两列布局`，`三列布局`等等是很容易实现的

![](https://s.poetries.work/uploads/2022/09/6e019fdb0f08a21f.png)

总体兼容性还不错，但在 `IE 10` 以下不支持

目前，`Grid`布局在手机端支持还不算太友好

##  39 什么是响应式设计？响应式设计的基本原理是什么

> 响应式网站设计（`Responsive Web design`）是一种网络页面设计布局，页面的设计与开发应当根据用户行为以及设备环境(系统平台、屏幕尺寸、屏幕定向等)进行相应的响应和调整

**响应式网站常见特点：**

*   同时适配PC + 平板 + 手机等
*   标签导航在接近手持终端设备时改变为经典的抽屉式导航
*   网站的布局会根据视口来调整模块的大小和位置

![](https://s.poetries.work/uploads/2022/09/7595e50c5fcf7382.png)

**实现方式**

响应式设计的基本原理是通过媒体查询检测不同的设备屏幕尺寸做处理，为了处理移动端，页面头部必须有`meta`声明`viewport`

```jsx

    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no”>
```

属性对应如下：

*   `width=device-width`: 是自适应手机屏幕的尺寸宽度
*   `maximum-scale`:是缩放比例的最大值
*   `inital-scale`:是缩放的初始化
*   `user-scalable`:是用户的可以缩放的操作

实现响应式布局的方式有如下：

*   **媒体查询**
    *   CSS3中的增加了更多的媒体查询，就像if条件表达式一样，我们可以设置不同类型的媒体条件，并根据对应的条件，给相应符合条件的媒体调用相对应的样式表
    *   使用`@Media`查询，可以针对不同的媒体类型定义不同的样式，如： `@media screen and (max-width: 1920px) { ... }`
    *   当视口在`375px - 600px`之间，设置特定字体大小`18px` `@media screen (min-width: 375px) and (max-width: 600px) {body: {font-size: 18px}}`
    *   通过媒体查询，可以通过给不同分辨率的设备编写不同的样式来实现响应式的布局，比如我们为不同分辨率的屏幕，设置不同的背景图片
    *   比如给小屏幕手机设置`@2x`图，为大屏幕手机设置`@3x`图，通过媒体查询就能很方便的实现
*   **百分比**
    *   通过百分比单位 " `%` " 来实现响应式的效果
    *   比如当浏览器的宽度或者高度发生变化时，通过百分比单位，可以使得浏览器中的组件的宽和高随着浏览器的变化而变化，从而实现响应式的效果
    *   `height`、`width`属性的百分比依托于父标签的宽高，但是其他盒子属性则不完全依赖父元素
        *   子元素的`top/left`和`bottom/right`如果设置百分比，则相对于直接非`static`定位(默认定位)的父元素的高度/宽度
        *   子元素的`padding`如果设置百分比，不论是垂直方向或者是水平方向，都相对于直接父亲元素的`width`，而与父元素的`height`无关
        *   子元素的`margin`如果设置成百分比，不论是垂直方向还是水平方向，都相对于直接父元素的`width`
        *   `border-radius`不一样，如果设置`border-radius`为百分比，则是相对于自身的宽度
    *   可以看到每个属性都使用百分比，会照成布局的复杂度，所以`不建议使用百分比来实现响应式`
*   **vw/vh**
    *   `vw`表示相对于视图窗口的宽度，`vh`表示相对于视图窗口高度。 任意层级元素，在使用`vw`单位的情况下，`1vw`都等于视图宽度的百分之一
*   **rem**
    *   `rem`是相对于根元素`html`的`font-size`属性，默认情况下浏览器字体大小为`16px`，此时`1rem = 16px`
    *   可以利用前面提到的媒体查询，针对不同设备分辨率改变`font-size`的值，如下：

    ```jsx

         @media screen and (max-width: 414px) {
           html {
             font-size: 18px
           }
         }

         @media screen and (max-width: 375px) {
           html {
             font-size: 16px
           }
         }

         @media screen and (max-width: 320px) {
           html {
             font-size: 12px
           }
         }

    </div>

    *   为了更准确监听设备可视窗口变化，我们可以在`css`之前插入`script`标签，内容如下：

    ```jsx

        //动态为根元素设置字体大小
        function init () {
            // 获取屏幕宽度
            var width = document.documentElement.clientWidth
            // 设置根元素字体大小。此时为宽的10等分
            document.documentElement.style.fontSize = width / 10 + 'px'
        }

        //首次加载应用，设置一次
        init()
        // 监听手机旋转的事件的时机，重新设置
        window.addEventListener('orientationchange', init)
        // 监听手机窗口变化，重新设置
        window.addEventListener('resize', init)

    </div>

    *   无论设备可视窗口如何变化，始终设置`rem`为`width`的`1/10`，实现了百分比布局
    *   除此之外，我们还可以利用主流UI框架，如：`element ui`、`antd`提供的栅格布局实现响应式

**总结**

*   响应式布局优点可以看到：
*   面对不同分辨率设备灵活性强
*   能够快捷解决多设备显示适应问题
*   缺点：
*   仅适用布局、信息、框架并不复杂的部门类型网站
*   兼容各种设备工作量大，效率低下
*   代码累赘，会出现隐藏无用的元素，加载时间加长
*   其实这是一种折中性质的设计解决方案，多方面因素影响而达不到最佳效果
*   一定程度上改变了网站原有的布局结构，会出现用户混淆的情况

##  40 如果要做优化，CSS提高性能的方法有哪些？

实现方式有很多种，主要有如下：

*   **内联首屏关键CSS**
    *   在打开一个页面，页面首要内容出现在屏幕的时间影响着用户的体验，而通过内联`css`关键代码能够使浏览器在下载完html后就能立刻渲染
    *   而如果外部引用`css`代码，在解析`html`结构过程中遇到外部`css`文件，才会开始下载`css`代码，再渲染
    *   所以，CSS内联使用使渲染时间提前
    *   注意：但是较大的`css`代码并不合适内联（初始拥塞窗口、没有缓存），而其余代码则采取外部引用方式
*   **异步加载CSS**
    *   在CSS文件请求、下载、解析完成之前，CSS会阻塞渲染，浏览器将不会渲染任何已处理的内容
    *   前面加载内联代码后，后面的外部引用css则没必要阻塞浏览器渲染。这时候就可以采取异步加载的方案，主要有如下：
        *   使用javascript将`link`标签插到`head`标签最后

        ```jsx

            // 创建link标签
            const myCSS = document.createElement( "link" );
            myCSS.rel = "stylesheet";
            myCSS.href = "mystyles.css";
            // 插入到header的最后位置
            document.head.insertBefore( myCSS, document.head.childNodes[ document.head.childNodes.length - 1 ].nextSibling )

        </div>

        *   设置`link`标签`media`属性为`noexis`，浏览器会认为当前样式表不适用当前类型，会在不阻塞页面渲染的情况下再进行下载。加载完成后，将media的值设为`screen`或`all`，从而让浏览器开始解析CSS

        ```jsx

            <link rel="stylesheet" href="mystyles.css" media="noexist" onload="this.media='all'">

        </div>

        *   通过`rel`属性将`link`元素标记为`alternate`可选样式表，也能实现浏览器异步加载。同样别忘了加载完成之后，将`rel`设回`stylesheet`

        ```jsx

            <link rel="alternate stylesheet" href="mystyles.css" onload="this.rel='stylesheet'">

        </div>

*   **资源压缩**
    *   利用`webpack`、`gulp/grunt`、`rollup`等模块化工具，将`css`代码进行压缩，使文件变小，大大降低了浏览器的加载时间
*   **合理使用选择器**
    *   css匹配的规则是从右往左开始匹配，例如`#markdown .content h3`匹配规则如下：
        *   先找到`h3`标签元素
        *   然后去除祖先不是`.content`的元素
        *   最后去除祖先不是`#markdown`的元素
    *   如果嵌套的层级更多，页面中的元素更多，那么匹配所要花费的时间代价自然更高
    *   所以我们在编写选择器的时候，可以遵循以下规则：
        *   不要嵌套使用过多复杂选择器，最好不要三层以上
        *   使用id选择器就没必要再进行嵌套
        *   通配符和属性选择器效率最低，避免使用
*   **减少使用昂贵的属性**
    *   在页面发生重绘的时候，昂贵属性如`box-shadow/border-radius/filter/透明度/:nth-child`等，会降低浏览器的渲染性能
*   **不要使用@import**
    *   css样式文件有两种引入方式，一种是`link`元素，另一种是`@import`
    *   `@import`会影响浏览器的并行下载，使得页面在加载时增加额外的延迟，增添了额外的往返耗时
    *   而且多个`@import`可能会导致下载顺序紊乱
    *   比如一个css文件`index.css`包含了以下内容：`@import url("reset.css")`
    *   那么浏览器就必须先把`index.css`下载、解析和执行后，才下载、解析和执行第二个文件`reset.css`
*   **其他**
    *   减少重排操作，以及减少不必要的重绘
    *   了解哪些属性可以继承而来，避免对这些属性重复编写
    *   `css Sprite`，合成所有`icon`图片，用宽高加上b`ackgroud-position`的背景图方式显现出我们要的`icon`图，减少了`http`请求
    *   把小的`icon`图片转成`base64`编码
    *   CSS3动画或者过渡尽量使用`transform`和o`pacity`来实现动画，不要使用`left`和`top`属性

##  41 如何实现单行／多行文本溢出的省略样式？

对于文本的溢出，我们可以分成两种形式：

*   单行文本溢出
    *   涉及的css属性有：
        *   `text-overflow`：规定当文本溢出时，显示省略符号来代表被修剪的文本
        *   `white-space`：设置文字在一行显示，不能换行
        *   `overflow`：文字长度超出限定宽度，则隐藏超出的内容
    *   `overflow`设为`hidden`，普通情况用在块级元素的外层隐藏内部溢出元素，或者配合下面两个属性实现文本溢出省略
    *   `white-space:nowrap`，作用是设置文本不换行，是`overflow:hidden`和`text-overflow：ellipsis`生效的基础
    *   `text-overflow` 属性值有如下
        *   `clip`：当对象内文本溢出部分裁切掉
        *   `ellipsis`：当对象内文本溢出时显示省略标记（...）
    *   `text-overflow`只有在设置了`overflow:hidden`和`white-space:nowrap`才能够生效的

    ```jsx

        <style>
            p{
                overflow: hidden;
                line-height: 40px;
                width:400px;
                height:40px;
                border:1px solid red;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        </style>
        <p 这是一些文本这是一些文本这是一些文本这是一些文本这是一些文本这是一些文本这是一些文本这是一些文本这是一些文本这是一些文本</p >

    </div>

    ![](https://s.poetries.work/uploads/2022/09/25ff36e3de8eaa54.png)
*   多行文本溢出：多行文本溢出的时候，我们可以分为两种情况：
    *   基于高度截断
        *   伪元素 + 定位：核心的css代码结构如下：
            *   `position: relative`：为伪元素绝对定位
            *   `overflow: hidden`：文本溢出限定的宽度就隐藏内容）
            *   `position: absolute`：给省略号绝对定位
            *   `line-height: 20px`：结合元素高度,高度固定的情况下,设定行高, 控制显示行数
            *   `height: 40px`：设定当前元素高度
            *   `::after {}` ：设置省略号样式

            ```jsx

                  <style>
                      .demo {
                          position: relative;
                          line-height: 20px;
                          height: 40px;
                          overflow: hidden;
                      }
                      .demo::after {
                          content: "...";
                          position: absolute;
                          bottom: 0;
                          right: 0;
                          padding: 0 20px 0 10px;
                      }
                  </style>

                  <body>
                      <div class='demo'>这是一段很长的文本</div>
                  </body>

            </div>

            *   实现原理很好理解，就是通过伪元素绝对定位到行尾并遮住文字，再通过 `overflow: hidden` 隐藏多余文字
            *   这种实现具有以下优点：
                *   兼容性好，对各大主流浏览器有好的支持
                *   响应式截断，根据不同宽度做出调整
            *   一般文本存在英文的时候，可以设置`word-break: break-all`使一个单词能够在换行时进行拆分
    *   基于行数截断：纯css实现也非常简单，核心的css代码如下：
        *   `-webkit-line-clamp: 2`：用来限制在一个块元素显示的文本的行数，为了实现该效果，它需要组合其他的`WebKit`属性）
        *   `display: -webkit-box`：和1结合使用，将对象作为弹性伸缩盒子模型显示
        *   `-webkit-box-orient: vertical`：和1结合使用 ，设置或检索伸缩盒对象的子元素的排列方式
        *   `overflow: hidden`：文本溢出限定的宽度就隐藏内容
        *   `text-overflow: ellipsis`：多行文本的情况下，用省略号“…”隐藏溢出范围的文本

        ```jsx

            <style>
                p {
                    width: 400px;
                    border-radius: 1px solid red;
                    -webkit-line-clamp: 2;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            </style>
            <p>
                这是一些文本这是一些文本这是一些文本这是一些文本这是一些文本
                这是一些文本这是一些文本这是一些文本这是一些文本这是一些文本
            </p >

        </div>

        *   可以看到，上述使用了`webkit`的CSS属性扩展，所以兼容浏览器范围是PC端的`webkit`内核的浏览器，由于移动端大多数是使用`webkit`，所以移动端常用该形式
        *   需要注意的是，如果文本为一段很长的英文或者数字，则需要添加`word-wrap: break-word`属性
        *   还能通过使用javascript实现配合css，实现代码如下所示：

        ```jsx

              p {
                  position: relative;
                  width: 400px;
                  line-height: 20px;
                  overflow: hidden;

              }
              .p-after:after{
                  content: "..."; 
                  position: absolute; 
                  bottom: 0; 
                  right: 0; 
                  padding-left: 40px;
                  background: -webkit-linear-gradient(left, transparent, #fff 55%);
                  background: -moz-linear-gradient(left, transparent, #fff 55%);
                  background: -o-linear-gradient(left, transparent, #fff 55%);
                  background: linear-gradient(to right, transparent, #fff 55%);
              } 

        </div>

        ```jsx

            $(function(){
              //获取文本的行高，并获取文本的高度，假设我们规定的行数是五行，那么对超过行数的部分进行限制高度，并加上省略号
                $('p').each(function(i, obj){
                      var lineHeight = parseInt($(this).css("line-height"));
                      var height = parseInt($(this).height());
                      if((height / lineHeight) >3 ){
                          $(this).addClass("p-after")
                          $(this).css("height","60px");
                      }else{
                          $(this).removeClass("p-after");
                      }
                  });
              })

        </div>

##  42 让Chrome支持小于12px 的文字方式有哪些

*   **背景**
    *   Chrome 中文版浏览器会默认设定页面的最小字号是`12px`，英文版没有限制
    *   原由 Chrome 团队认为汉字小于`12px`就会增加识别难度
    *   中文版浏览器
        *   与网页语言无关，取决于用户在Chrome的设置里（`chrome://settings/languages`）把哪种语言设置为默认显示语言
    *   系统级最小字号
        *   浏览器默认设定页面的最小字号，用户可以前往 `chrome://settings/fonts` 根据需求更改
        *   而我们在实际项目中，不能奢求用户更改浏览器设置
        *   对于文本需要以更小的字号来显示，就需要用到一些小技巧
*   **常见的解决方案**
    *   **zoom** 非标属性，有兼容问题，缩放会改变了元素占据的空间大小，触发重排
        *   `zoom` 的字面意思是“变焦”，可以改变页面上元素的尺寸，属于真实尺寸
        *   其支持的值类型有：
            *   `zoom:50%`，表示缩小到原来的一半
            *   `zoom:0.5`，表示缩小到原来的一半
        *   使用 `zoom` 来”支持“ `12px` 以下的字体

        ```jsx

            <style type="text/css">
            .span1{
                font-size: 12px;
                display: inline-block;
                zoom: 0.8;
            }
            .span2{
                display: inline-block;
                font-size: 12px;
            }
            </style>
            <body>
                <span class="span1">测试10px</span>
                <span class="span2">测试12px</span>
            </body>

        </div>

        *   需要注意的是，`Zoom` 并不是标准属性，需要考虑其兼容性 ![](https://s.poetries.work/uploads/2022/09/09eaff33b52d18d5.png)
    *   **-webkit-transform:scale()** 大部分现代浏览器支持，并且对英文、数字、中文也能够生效，缩放不会改变了元素占据的空间大小，页面布局不会发生变化
        *   针对`chrome`浏览器,加`webkit`前缀，用`transform:scale()`这个属性进行放缩
        *   当我们在使用`transform: scale`缩小元素的时候，顺便把`transform-origin`改成`left top`，才能保证左上角不动，因为左上角一动就导致定位就不准了（`top`、`left`、`margin`等都不准了）
        *   注意的是，使用`scale`属性**只对可以定义宽高的元素生效**，所以，下面代码中将`span`元素转为行内块元素

        ```jsx

            <style type="text/css">
              .span1{
                font-size: 12px;
                display: inline-block;
                -webkit-transform:scale(0.8);
              }
              .span2{
                display: inline-block;
                font-size: 12px;
              }
            </style>
            <body>
              <span class="span1">测试10px</span>
              <span class="span2">测试12px</span>
            </body>

        </div>

    *   **-webkit-text-size-adjust:none** 对谷歌浏览器有版本要求，在`27`之后，就取消了该属性的支持，并且只对英文、数字生效
        *   该属性用来设定文字大小是否根据设备(浏览器)来自动调整显示大小
        *   属性值：
            *   `percentage`：字体显示的大小；
            *   `auto`：默认，字体大小会根据设备/浏览器来自动调整；
            *   `none`:字体大小不会自动调整

        ```jsx

            html { -webkit-text-size-adjust: none; }

        </div>

        *   这样设置之后会有一个问题，就是当你放大网页时，一般情况下字体也会随着变大，而设置了以上代码后，字体只会显示你当前设置的字体大小，不会随着网页放大而变大了
        *   所以，我们不建议全局应用该属性，而是单独对某一属性使用
        *   需要注意的是，自从`chrome 27`之后，就取消了对这个属性的支持。同时，该属性只对英文、数字生效，对中文不生效

##  43 说说对CSS预编语言的理解？有哪些区别?

*   **前言**
    *   Css 作为一门标记性语言，语法相对简单，对使用者的要求较低，但同时也带来一些问题
    *   需要书写大量看似没有逻辑的代码，不方便维护及扩展，不利于复用，尤其对于非前端开发工程师来讲，往往会因为缺少 Css 编写经验而很难写出组织良好且易于维护的 Css 代码
    *   Css预处理器便是针对上述问题的解决方案
    *   预处理语言
        *   扩充了 Css 语言，增加了诸如变量、混合（mixin）、函数等功能，让 Css 更易维护、方便
        *   本质上，预处理是Css的超集
        *   包含一套自定义的语法及一个解析器，根据这些语法定义自己的样式规则，这些规则最终会通过解析器，编译生成对应的 Css 文件
*   **Css预编译语言在前端里面有三大优秀的预编处理器，分别是**
    *   **sass**
        *   2007 年诞生，最早也是最成熟的 Css预处理器，拥有 `Ruby` 社区的支持和 `Compass` 这一最强大的 `Css`框架，目前受 `LESS` 影响，已经进化到了全面兼容 `Css` 的 `Scss`
        *   文件后缀名为`.sas`s与`.scss`，可以严格按照 `sass` 的缩进方式省去大括号和分号
    *   **less**
        *   2009年出现，受`SASS`的影响较大，但又使用 `Css` 的语法，让大部分开发者和设计师更容易上手，在 `Ruby`社区之外支持者远超过 `SASS`
        *   其缺点是比起 `SASS`来，可编程功能不够，不过优点是简单和兼容 `Css`，反过来也影响了 `SASS`演变到了`Scss` 的时代
    *   **stylus**
        *   `Stylus`是一个`Css`的预处理框架，`2010` 年产生，来自 `Node.js`社区，主要用来给 `Node` 项目进行 `Css` 预处理支持
        *   所以`Stylus` 是一种新型语言，可以创建健壮的、动态的、富有表现力的`Css`。比较年轻，其本质上做的事情与`SASS/LESS`等类似
*   **区别**
    *   虽然各种预处理器功能强大，但使用最多的，还是以下特性：
        *   变量（`variables`）
        *   作用域（`scope`）
        *   代码混合（`mixins`）
        *   嵌套（`nested rules`）
        *   代码模块化（`Modules`）
    *   **基本使用**
        *   less和scss

            ```jsx

                .box {
                  display: block;
                }

            </div>

        *   sass

            ```jsx

                .box
                  display: block

            </div>

        *   stylus

            ```jsx

                .box
                  display: block

            </div>

    *   **嵌套**
        *   三者的嵌套语法都是一致的，甚至连引用父级选择器的标记 `&` 也相同
        *   区别只是 `Sass` 和 `Stylus` 可以用没有大括号的方式书写
        *   less

            ```jsx

                .a {
                  &.b {
                    color: red;
                  }
                }

            </div>

    *   **变量**
        *   变量无疑为 `Css` 增加了一种有效的复用方式，减少了原来在 `Css` 中无法避免的重复「硬编码」
        *   `less`声明的变量必须以`@`开头，后面紧跟变量名和变量值，而且变量名和变量值需要`使用冒号:分隔开`

            ```jsx

                @red: #c00;

                strong {
                  color: @red;
                }

            </div>

        *   `sass`声明的变量跟`less`十分的相似，只是变量名前面使用`<div class="content__default"开头

            ```jsx

                $red: #c00;

                strong {
                  color: $red;
                }

            </div>

        *   `stylus`声明的变量没有任何的限定，可以使用`<div class="content__default"开头，结尾的分号;可有可无，但变量与变量值之间需要使用`=`。在`stylus`中我们不建议使用`@`符号开头声明变量

            ```jsx

                red = #c00

                strong
                  color: red

            </div>

    *   **作用域**
        *   Css 预编译器把变量赋予作用域，也就是存在生命周期。就像 js一样，它会先从局部作用域查找变量，依次向上级作用域查找
        *   `sass`中不存在全局变量

            ```jsx

                $color: black;
                .scoped {
                  $bg: blue;
                  $color: white;
                  color: $color;
                  background-color:$bg;
                }
                .unscoped {
                  color:$color;
                } 

            </div>

            ```jsx

                /**编译后 */
                .scoped {
                  color:white;/*是白色*/
                  background-color:blue;
                }
                .unscoped {
                  color:white;/*白色（无全局变量概念）*/
                } 

            </div>

            *   所以，在`sass`中最好不要定义相同的变量名
        *   `less`与`stylus`的作用域跟javascript十分的相似，首先会查找局部定义的变量，如果没有找到，会像冒泡一样，一级一级往下查找，直到根为止

            ```jsx

                @color: black;
                .scoped {
                  @bg: blue;
                  @color: white;
                  color: @color;
                  background-color:@bg;
                }
                .unscoped {
                  color:@color;
                }

            </div>

            ```jsx

                /**编译后 */
                .scoped {
                  color:white;/*白色（调用了局部变量）*/
                  background-color:blue;
                }
                .unscoped {
                  color:black;/*黑色（调用了全局变量）*/
                } 

            </div>

    *   **混入**
        *   混入（`mixin`）应该说是预处理器最精髓的功
        *   可以在`Mixins`中定义变量或者默认参数
        *   在`less`中，混合的用法是指将定义好的`ClassA`中引入另一个已经定义的`Class`，也能使用够传递参数，参数变量为`@`声明

            ```jsx

                .alert {
                  font-weight: 700;
                }

                .highlight(@color: red) {
                  font-size: 1.2em;
                  color: @color;
                }

                .heads-up {
                  .alert;
                  .highlight(red);
                }

            </div>

            ```jsx

                /**编译后 */
                .alert {
                  font-weight: 700;
                }
                .heads-up {
                  font-weight: 700;
                  font-size: 1.2em;
                  color: red;
                }

            </div>

        *   `Sass`声明`mixins`时需要使用`@mixin`，后面紧跟`mixin`的名，也可以设置参数，参数名为变量`<div class="content__default"声明的形式

            ```jsx

                  @mixin large-text {
                    font: {
                      family: Arial;
                      size: 20px;
                      weight: bold;
                    }
                    color: #ff0000;
                  }

                  .page-title {
                    @include large-text;
                    padding: 4px;
                    margin-top: 10px;
                  }

            </div>

        *   `stylus`中的混合和前两款Css预处理器语言的混合略有不同，他可以不使用任何符号，就是直接声明`Mixins`名，然后在定义参数和默认值之间用等号（`=`）来连接

            ```jsx

                error(borderWidth= 2px) {
                  border: borderWidth solid #F00;
                  color: #F00;
                }
                .generic-error {
                  padding: 20px;
                  margin: 4px;
                  error(); /* 调用error mixins */
                }
                .login-error {
                  left: 12px;
                  position: absolute;
                  top: 20px;
                  error(5px); /* 调用error mixins，并将参数$borderWidth的值指定为5px */
                } 

            </div>

    *   **代码模块化**
        *   模块化就是将Css代码分成一个个模块
        *   `scss、less、stylus`三者的使用方法都如下所示

            ```jsx

                @import './common';
                @import './github-markdown';
                @import './mixin';
                @import './variables';

            </div>

##  44 编程题

###  画一条 0.5px 的线

*   采用 `meta viewport` 的方式 `<meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />`
*   采用 `border-image` 的方式
*   采用 `transform: scale()` 的方式

###  如何画一个三角形

三角形原理:边框的均分原理

```jsx

    div {
      width:0px;
      height:0px;
      border-top:10px solid red; 
      border-right:10px solid transparent; 
      border-bottom:10px solid transparent; 
      border-left:10px solid transparent;
    }
```

###  圆？半圆？椭圆？

```jsx

    div {
      width: 100px;
      height: 100px;
      background-color: red;
      margin-top: 20px;
    }
    .box1 { /* 圆 */
      /* border-radius: 50%; */
      border-radius: 50px;
    }
    .box2 { /* 半圆 */
      height: 50px;
      border-radius: 50px 50px 0 0;
    }
    .box3 { /* 椭圆 */
      height: 50px;
      border-radius: 50px/25px; /* x轴/y轴 */
    }
```

###  CSS画圆半圆扇形三角梯形

```jsx

    div{
        margin: 50px;
        width: 100px;
        height: 100px;
        background: red;
    }
    /* 半圆 */
    .half-circle{
        height: 50px;
        border-radius: 50px 50px 0 0;
    }
    /* 扇形 */
    .sector{
        border-radius: 100px 0 0;
    }
    /* 三角 */
    .triangle{
        width: 0px;
        height: 0px;
        background: none;
        border: 50px solid red;
        border-color: red transparent transparent transparent;
    }
    /* 梯形 */
    .ladder{
        width: 50px;
        height: 0px;
        background: none;
        border: 50px solid red;
        border-color: red transparent transparent transparent;
    }
```

###  两栏布局：左边定宽，右边自适应方案

```jsx

    <div class="box">
      <div class="box-left"></div>
      <div class="box-right"></div>
    </div>
```

**利用float + margin实现**

```jsx

    .box {
     height: 200px;
    }

    .box > div {
      height: 100%;
    }

    .box-left {
      width: 200px;
      float: left;
      background-color: blue;
    }

    .box-right {
      margin-left: 200px;
      background-color: red;
    }
```

**利用calc计算宽度**

```jsx

    .box {
     height: 200px;
    }

    .box > div {
      height: 100%;
    }

    .box-left {
      width: 200px;
      float: left;
      background-color: blue;
    }

    .box-right {
      width: calc(100% - 200px);
      float: right;
      background-color: red;
    }
```

**利用float + overflow实现**

```jsx

    .box {
     height: 200px;
    }

    .box > div {
      height: 100%;
    }

    .box-left {
      width: 200px;
      float: left;
      background-color: blue;
    }

    .box-right {
      overflow: hidden;
      background-color: red;
    }
```

**利用flex实现**

```jsx

    .box {
      height: 200px;
      display: flex;
    }

    .box > div {
      height: 100%;
    }

    .box-left {
      width: 200px;
      background-color: blue;
    }

    .box-right {
      flex: 1; // 设置flex-grow属性为1，默认为0
      background-color: red;
    }
```

###  三栏布局：左右两边宽度固定中间自适应

> float，float + calc, 圣杯布局（设置BFC，margin负值法），flex

```jsx

    .wrap {
      width: 100%;
      height: 200px;
    }
    .wrap > div {
      height: 100%;
    }
    /* 方案1：两边使用 float，中间使用 margin */
    .left {
      width: 120px;
      float: left;
    }
    .right {
      float: right;
      width: 120px;
    }
    .center {
      margin: 0 120px; 
    }
    /* 方案2：两边使用 float，中间使用 calc */
    .left {
      width: 120px;
      float: left;
    }
    .right {
      float: right;
      width: 120px;
    }
    .center {
      width: calc(100% - 240px);
      margin-left: 120px;
    }
    /* 方案3：flex实现 */
    .wrap {
      display: flex;
    }
    .left {
      width: 120px;
    }
    .right {
      width: 120px;
    }
    .center {
      flex: 1;
    }
    /* 方案4：grid网格布局 */
    .wrap {
      display: grid;
      width: 100%;
      grid-template-columns: 300px auto 300px;
    }
    .left {
      background: coral;
    }
    .right {
      background: lightblue;
    }
    .center {
      background: #555;
    }
    .left,.right,.center {
      height: 100px;
    }
```

> 圣杯布局和双飞翼布局是前端工程师需要日常掌握的重要布局方式。两者的功能相同，都是为了实现一个两侧宽度固定，中间宽度自适应的三栏布局。

**圣杯布局**

```jsx

    <style>
    body{
        min-width: 550px;
    }
    #container{
        padding-left: 200px;
        padding-right: 150px;
    }
    #container .column{
        float: left;
    }
    #center{
        width: 100%;
    }
    #left{
        width: 200px;
        margin-left: -100%;
        position: relative;
        right: 200px;
    }
    #right{
        width: 150px;
        margin-right: -150px;
    }
    </style>
    <div id="container">
        <div id="center" class="column">center</div>
        <div id="left" class="column">left</div>
        <div id="right" class="column">right</div>
    </div>
```

**双飞翼布局**

```jsx

    <style>
    body {
        min-width: 500px;
    }
    #container {
        width: 100%;
    }
    .column {
        float: left;
    }
    #center {
        margin-left: 200px;
        margin-right: 150px;
    }
    #left {
        width: 200px;
        margin-left: -100%;
    }
    #right {
        width: 150px;
        margin-left: -150px;
    }
    </style>
    <div id="container" class="column">
        <div id="center">center</div>
    </div>
    <div id="left" class="column">left</div>
    <div id="right" class="column">right</div>
```
