---
title: 12 Uniapp模块
---

> 入门uniapp

##  1 基础部分总结

###  什么是UniApp？它有哪些特点和优势？

> `uni-app` 是一个使用 [Vue.js<span><span class="sr-only">(opens new window)</span></span>](https://vuejs.org/) 开发所有前端应用的框架，开发者编写一套代码，可发布到iOS、Android、Web（响应式）、以及各种小程序（微信/支付宝/百度/头条/飞书/QQ/快手/钉钉/淘宝）、快应用等多个平台

uni-app简单来说是 `vue的语法` + `小程序的api`，它遵循Vue.js语法规范，组件和API遵循微信小程序命名，这些都属于通用技术栈，学习它们是前端必备技能，uni-app没有太多额外学习成本

**uni-app 支持的手机版本最低到多少**

*   Web端：uni-app没有限制，同vue2和vue3自身能支持的浏览器版本
*   小程序端：uni-app没有限制，同该小程序自身能支持的最低平台
*   App端：
    *   Vue2: Android4.4+、iOS9+。Android4.4已经是2013年发布的手机了。
    *   Vue3: 支持的范围是：Android >=5 （使用nvue和vue有区别。某些老国产Android5的rom无法动态升级Android system webview，此时如果使用vue页面需搭配x5内核） , iOS >= 10

**uniapp特点**

*   跨平台更多
    *   真正做到一套代码、多端发行
    *   条件编译：优雅的在一个项目里调用不同平台的特色功能
*   运行体验更好
    *   组件、`api`与微信小程序一致
    *   兼容`weex`原生渲染
*   通用技术栈，学习成本更低
    *   `vue`的语法、微信小程序的`api`
    *   内嵌`mpvue`
*   开发生态，拥抱社区
    *   支持通过`npm`安装第三方包
    *   支持微信小程序自定义组件及`SDK`
    *   兼容`mpvue`组件及项目
    *   `app`端支持和原生混合编码
    *   `dcloud`插件市场

**uniapp平台功能示意图**

![](https://s.poetries.work/uploads/2023/02/4c2049088d61180e.png)

###  Uniapp的目录结构组成

一个 uni-app 工程，就是一个 Vue 项目，你可以通过 HBuilderX 或 cli 方式快速创建 uni-app 工程

一个uni-app工程，默认包含如下目录及文件

```js

    ┌─uniCloud              云空间目录，阿里云为uniCloud-aliyun,腾讯云为uniCloud-tcb（详见uniCloud）
    │─components            符合vue组件规范的uni-app组件目录
    │  └─comp-a.vue         可复用的a组件
    ├─utssdk                存放uts文件
    ├─pages                 业务页面文件存放的目录
    │  ├─index
    │  │  └─index.vue       index页面
    │  └─list
    │     └─list.vue        list页面
    ├─static                存放应用引用的本地静态资源（如图片、视频等）的目录，注意：静态资源只能存放于此
    ├─uni_modules           存放[uni_module](/uni_modules)。
    ├─platforms             存放各平台专用页面的目录，详见
    ├─nativeplugins         App原生语言插件 详见
    ├─nativeResources       App端原生资源目录
    │  └─android            Android原生资源目录 详见
    ├─hybrid                App端存放本地html文件的目录，详见
    ├─wxcomponents          存放小程序组件的目录，详见
    ├─unpackage             非工程代码，一般存放运行或发行的编译结果
    ├─AndroidManifest.xml   Android原生应用清单文件 详见
    ├─main.js               Vue初始化入口文件
    ├─App.vue               应用配置，用来配置App全局样式以及监听 应用生命周期
    ├─manifest.json         配置应用名称、appid、logo、版本等打包信息，详见
    ├─pages.json            配置页面路由、导航条、选项卡等页面类信息，详见
    └─uni.scss              这里是uni-app内置的常用样式变量
```

**static目录 使用注意**

*   编译到任意平台时，static 目录下除不满足条件编译的文件，会直接复制到最终的打包目录，不会打包编译。非 static 目录下的文件（vue、js、css 等）只有被引用时，才会被打包编译。
*   css、`less/scss` 等资源不要放在 `static` 目录下，建议这些公用的资源放在自建的 `common` 目录下

###  Vue.js和UniApp有什么关系？它们之间有什么区别？

> Vue.js是一种用于构建用户界面的渐进式JavaScript框架，而UniApp是基于Vue.js的跨平台应用开发框架。UniApp在Vue.js的基础上进行了扩展，使得开发者可以使用Vue.js的开发方式和语法来编写跨平台应用。与Vue.js相比，UniApp具有以下区别：

*   **平台适配性**：Vue.js主要用于构建Web应用，而UniApp能够生成多个平台的应用，包括小程序、H5和App等。
*   **原生能力访问**：UniApp提供了对原生平台的API和能力的访问，使得开发者可以更方便地使用平台的特性和功能。
*   **组件库和UI样式**：UniApp提供了一套基于Vue.js的组件库和UI样式，方便开发者快速构建应用的界面和交互。

###  如何在UniApp中进行网络请求？

`UniApp`中可以使用`uni.request`方法进行网络请求。以下是一个基本的网络请求示例：

```js

    uni.request({
      url: 'https://api.example.com/data',
      method: 'GET',
      data: {
        // 请求参数
      },
      success: function(res) {
        // 请求成功回调
        console.log(res.data);
      },
      fail: function(err) {
        // 请求失败回调
        console.log(err);
      }
    });
```

做个简单封装

```js

    import store from '@/store'
    import config from '@/config'
    import { getToken } from '@/utils/auth'
    import errorCode from '@/utils/errorCode'
    import { toast, showConfirm, tansParams } from '@/utils/common'

    let timeout = 10000
    const baseUrl = config.baseUrl

    const request = config => {
      // 是否需要设置 token
      const isToken = (config.headers || {}).isToken === false
      config.header = config.header || {}
      if (getToken() && !isToken) {
        config.header['Authorization'] = 'Bearer ' + getToken()
      }
      // get请求映射params参数
      if (config.params) {
        let url = config.url + '?' + tansParams(config.params)
        url = url.slice(0, -1)
        config.url = url
      }
      return new Promise((resolve, reject) => {
        uni.request({
            method: config.method || 'get',
            timeout: config.timeout ||  timeout,
            url: config.baseUrl || baseUrl + config.url,
            data: config.data,
            header: config.header,
            dataType: 'json'
          }).then(response => {
            let [error, res] = response
            if (error) {
              toast('后端接口连接异常')
              reject('后端接口连接异常')
              return
            }
            const code = res.data.code || 200
            const msg = errorCode[code] || res.data.msg || errorCode['default']
            if (code === 401) {
              showConfirm('登录状态已过期，您可以继续留在该页面，或者重新登录?').then(res => {
                if (res.confirm) {
                  store.dispatch('LogOut').then(res => {
                    uni.reLaunch({ url: '/pages/login' })
                  })
                }
              })
              reject('无效的会话，或者会话已过期，请重新登录。')
            } else if (code === 500) {
              toast(msg)
              reject('500')
            } else if (code !== 200) {
              toast(msg)
              reject(code)
            }
            resolve(res.data)
          })
          .catch(error => {
            let { message } = error
            if (message === 'Network Error') {
              message = '后端接口连接异常'
            } else if (message.includes('timeout')) {
              message = '系统接口请求超时'
            } else if (message.includes('Request failed with status code')) {
              message = '系统接口' + message.substr(message.length - 3) + '异常'
            }
            toast(message)
            reject(error)
          })
      })
    }

    export default request
```

###  css 的引用

如果我们创建自定义的样式文件，例如创建一个`/static/scss/test.css`，想要使其在全局引用。

1、在`App.vue`中全局引用，每个页面都可以使用该样式。

```js

    <style lang="scss">
      @import '@/static/scss/test.css';
    </style>
```

2、在`index.scss`中导入，每个页面都可以使用该样式。

```js

    @import '@/static/scss/test.css';
```

推荐第二种方式，方便所有的样式文件在`index.scss`统一管理和维护。

###  css 的变量

<table>

<thead>

<tr>

<th>css 变量</th>

<th>描述</th>

</tr>

</thead>

<tbody>

<tr>

<td>--status-bar-height</td>

<td>系统状态栏高度</td>

</tr>

<tr>

<td>--window-top</td>

<td>内容区域距离顶部的距离</td>

</tr>

<tr>

<td>--window-bottom</td>

<td>内容区域距离底部的距离</td>

</tr>

</tbody>

</table>

注意：

*   `var(--status-bar-height)`此变量在微信小程序环境为固定`25px`，在`App`里为手机实际状态栏高度。
*   当设置`"navigationStyle":"custom"`取消原生导航栏后，由于窗体为沉浸式，占据了状态栏位置。此时可以使用一个高度为`var(--status-bar-height)`的 view 放在页面顶部，避免页面内容出现在状态栏。
*   由于在 H5 端，不存在原生导航栏和 tabbar，也是前端 div 模拟。如果设置了一个固定位置的居底 view，在小程序和 App 端是在 tabbar 上方，但在 H5 端会与 tabbar 重叠。此时可使用`--window-bottom`，不管在哪个端，都是固定在 tabbar 上方。
*   目前 nvue 在 App 端，还不支持`--status-bar-height`变量，替代方案是在页面 onLoad 时通过`uni.getSystemInfoSync().statusBarHeight`获取状态栏高度，然后通过 style 绑定方式给占位 view 设定高度。下方提供了示例代码

```js

    <template>
      <page-meta>
        <navigation-bar />
      </page-meta>
      <view>
        <view class="status_bar">
          <!-- 这里是状态栏 -->
        </view>
        <view>状态栏下的文字</view>
      </view>
    </template>
    <style>
      .status_bar {
        height: var(--status-bar-height);
        width: 100%;
      }
    </style>
```

nvue 页面获取状态栏高度

```js

    <template>
      <view class="content">
        <view :style="{ height: iStatusBarHeight + 'px'}"></view>
      </view>
    </template>

    <script>
      export default {
        data() {
          return {
            iStatusBarHeight: 0,
          };
        },
        onLoad() {
          this.iStatusBarHeight = uni.getSystemInfoSync().statusBarHeight;
        },
      };
    </script>
```

###  全局变量机制

全局变量机制`globalData`，支持全端通用。

**以下是 App.vue 中定义globalData的相关配置：**

```js

    <script>  
      export default {  
        globalData: {  
          text: 'text'  
        }
      }  
    </script>  
```

**其他页面获取方式**

```js

    console.info(getApp().globalData.text);
```

修改`globalData`变量的方式如下：`getApp().globalData.text = 'test'`

**注意**

globalData是简单的全局变量，如果使用状态管理，请使用vuex（main.js中定义）

> globalData是简单的全局变量，如果使用状态管理，请使用vuex（main.js中定义）

###  屏幕尺寸单位

```js

    uni-app`支持的通用`css`单位包括`px`、`rpx
```

*   `px`即屏幕像素
*   `rpx`即响应式`px`，一种根据屏幕宽度自适应的动态单位。以750宽的屏幕为基准，750rpx恰好为屏幕宽度。屏幕变宽，rpx实际显示效果会等比放大 。

`vue`页面支持下面这些普通`H5`单位，但在`nvue`里不支持

*   `rem`根字体大小可以通过`page-meta`配置
*   `vh viewpoint height`，视窗高度，`1vh`等于视窗高度的`1%`
*   `vw viewpoint width`，视窗宽度，`1vw`等于视窗宽度的`1%`

###  生命周期

**应用生命周期**

`uni-app`支持如下应用生命周期函数

<table>

<thead>

<tr>

<th>函数名</th>

<th>说明</th>

</tr>

</thead>

<tbody>

<tr>

<td>onLaunch</td>

<td>当uni-app初始化完成时触发（全局只触发一次）</td>

</tr>

<tr>

<td>onShow</td>

<td>当uni-app启动，或从后台进入前台显示</td>

</tr>

<tr>

<td>onHide</td>

<td>当uni-app从前台进入后台</td>

</tr>

<tr>

<td>onError</td>

<td>当uni-app报错时触发</td>

</tr>

<tr>

<td>onUniNViewMessage</td>

<td>对nvue页面发送的数据进行监听</td>

</tr>

<tr>

<td>onUnhandledRejection</td>

<td>对未处理的 Promise 拒绝事件监听函数</td>

</tr>

<tr>

<td>onPageNotFound</td>

<td>页面不存在监听函数</td>

</tr>

<tr>

<td>onThemeChange</td>

<td>监听系统主题变化</td>

</tr>

</tbody>

</table>

> 应用生命周期仅可在`App.vue`中监听，在其它页面监听无效

**页面生命周期**

`uni-app`支持如下页面生命周期函数

<table>

<thead>

<tr>

<th>函数名</th>

<th>说明</th>

</tr>

</thead>

<tbody>

<tr>

<td>onInit</td>

<td>监听页面初始化</td>

</tr>

<tr>

<td>onLoad</td>

<td>监听页面加载</td>

</tr>

<tr>

<td>onShow</td>

<td>监听页面显示</td>

</tr>

<tr>

<td>onReady</td>

<td>监听页面初次渲染完成</td>

</tr>

<tr>

<td>onHide</td>

<td>监听页面隐藏</td>

</tr>

<tr>

<td>onUnload</td>

<td>监听页面卸载</td>

</tr>

<tr>

<td>onResize</td>

<td>监听窗口尺寸变化</td>

</tr>

<tr>

<td>onPullDownRefresh</td>

<td>监听用户下拉动作，一般用于下拉刷新</td>

</tr>

<tr>

<td>onReachBottom</td>

<td>页面上拉触底事件的处理函数</td>

</tr>

<tr>

<td>onTabItemTap</td>

<td>点击 tab 时触发</td>

</tr>

<tr>

<td>onShareAppMessage</td>

<td>用户点击右上角分享</td>

</tr>

<tr>

<td>onPageScroll</td>

<td>监听页面滚动</td>

</tr>

<tr>

<td>onNavigationBarButtonTap</td>

<td>监听原生标题栏按钮点击事件</td>

</tr>

<tr>

<td>onBackPress</td>

<td>监听页面返回</td>

</tr>

<tr>

<td>onNavigationBarSearchInputChanged</td>

<td>监听原生标题栏搜索输入框输入内容变化事件</td>

</tr>

<tr>

<td>onNavigationBarSearchInputConfirmed</td>

<td>监听原生标题栏搜索输入框搜索事件，用户点击软键盘上的“搜索”按钮时触发</td>

</tr>

<tr>

<td>onNavigationBarSearchInputClicked</td>

<td>监听原生标题栏搜索输入框点击事件</td>

</tr>

<tr>

<td>onShareTimeline</td>

<td>监听用户点击右上角转发到朋友圈</td>

</tr>

<tr>

<td>onAddToFavorites</td>

<td>监听用户点击右上角收藏</td>

</tr>

</tbody>

</table>

`onInit`使用注意

*   仅百度小程序基础库 3.260 以上支持 onInit 生命周期
*   其他版本或平台可以同时使用 onLoad 生命周期进行兼容，注意避免重复执行相同逻辑
*   不依赖页面传参的逻辑可以直接使用 created 生命周期替代

`onReachBottom`使用注意，可在`pages.json`里定义具体页面底部的触发距离`onReachBottomDistance`，比如设为`50`，那么滚动页面到距离底部`50px`时，就会触发`onReachBottom`事件。

如使用`scroll-view`导致页面没有滚动，则触底事件不会被触发。`scroll-view`滚动到底部的事件请参考`scroll-view`的文档

`onPageScroll`（监听滚动、滚动监听、滚动事件）参数说明：

<table>

<thead>

<tr>

<th>属性</th>

<th>类型</th>

<th>说明</th>

</tr>

</thead>

<tbody>

<tr>

<td>scrollTop</td>

<td>Number</td>

<td>页面在垂直方向已滚动的距离（单位px）</td>

</tr>

</tbody>

</table>

*   onPageScroll里不要写交互复杂的js，比如频繁修改页面。因为这个生命周期是在渲染层触发的，在非h5端，js是在逻辑层执行的，两层之间通信是有损耗的。如果在滚动过程中，频发触发两层之间的数据交换，可能会造成卡顿。

```js

    onPageScroll : function(e) { //nvue暂不支持滚动监听，可用bindingx代替
    	console.log("滚动距离为：" + e.scrollTop);
    },
```

`onTabItemTap`返回的json对象说明：

<table>

<thead>

<tr>

<th>属性</th>

<th>类型</th>

<th>说明</th>

</tr>

</thead>

<tbody>

<tr>

<td>index</td>

<td>String</td>

<td>被点击tabItem的序号，从0开始</td>

</tr>

<tr>

<td>pagePath</td>

<td>String</td>

<td>被点击tabItem的页面路径</td>

</tr>

<tr>

<td>text</td>

<td>String</td>

<td>被点击tabItem的按钮文字</td>

</tr>

</tbody>

</table>

*   onTabItemTap常用于点击当前tabitem，滚动或刷新当前页面。如果是点击不同的tabitem，一定会触发页面切换。
*   如果想在App端实现点击某个tabitem不跳转页面，不能使用onTabItemTap，可以使用plus.nativeObj放一个区块盖住原先的tabitem，并拦截点击事件。
*   支付宝小程序平台onTabItemTap表现为点击非当前tabitem后触发，因此不能用于实现点击返回顶部这种操作

```js

    onTabItemTap : function(e) {
      console.log(e);
      // e的返回格式为json对象： {"index":0,"text":"首页","pagePath":"pages/index/index"}
    },
```

`onNavigationBarButtonTap`参数说明：

<table>

<thead>

<tr>

<th>属性</th>

<th>类型</th>

<th>说明</th>

</tr>

</thead>

<tbody>

<tr>

<td>index</td>

<td>Number</td>

<td>原生标题栏按钮数组的下标</td>

</tr>

</tbody>

</table>

```js

    onNavigationBarButtonTap : function (e) {
      console.log(e);
      // e的返回格式为json对象：{"text":"测试","index":0}
    }
```

`onBackPress`回调参数对象说明：

<table>

<thead>

<tr>

<th>属性</th>

<th>类型</th>

<th>说明</th>

</tr>

</thead>

<tbody>

<tr>

<td>from</td>

<td>String</td>

<td>触发返回行为的来源：'backbutton'——左上角导航栏按钮及安卓返回键；'navigateBack'——uni.navigateBack() 方法。支付宝小程序端不支持返回此字段</td>

</tr>

</tbody>

</table>

```js

    export default {
      data() {
        return {};
      },
      onBackPress(options) {
        console.log('from:' + options.from)
      }
    }
```

**组件生命周期**

`uni-app`组件支持的生命周期，与vue标准组件的生命周期相同。这里没有页面级的onLoad等生命周期：

<table>

<thead>

<tr>

<th>函数名</th>

<th>说明</th>

</tr>

</thead>

<tbody>

<tr>

<td>beforeCreate</td>

<td>在实例初始化之前被调用</td>

</tr>

<tr>

<td>created</td>

<td>在实例创建完成后被立即调用</td>

</tr>

<tr>

<td>beforeMount</td>

<td>在挂载开始之前被调用</td>

</tr>

<tr>

<td>mounted</td>

<td>挂载到实例上去之后调用</td>

</tr>

<tr>

<td>beforeUpdate</td>

<td>数据更新时调用</td>

</tr>

<tr>

<td>updated</td>

<td>由于数据更改时调用</td>

</tr>

<tr>

<td>beforeDestroy</td>

<td>实例销毁之前调用</td>

</tr>

<tr>

<td>destroyed</td>

<td>实例销毁后调用</td>

</tr>

</tbody>

</table>

###  组件定义

**注册**

通过`uni-app`的`easycom`将组件引入精简为一步。只要组件安装在项目的`components`目录下，并符合`components/组件名称/组件名称.vue`目录结构。就可以不用引用、注册，直接在页面中使用。

```js

    <template>
      <view>
    	<uni-badge text="1"></uni-badge>
      </view>
    </template>
    <script>
      // 这里不用import引入，也不需要在components内注册uni-badge组件。template里就可以直接用
      export default {
    	data() {
    	  return {}
    	}
      }
    </script>
```

*   `easycom`是自动开启的，不需要手动开启，有需求时可以在`pages.json`的`easycom`节点进行个性化设置
*   不管`components`目录下安装了多少组件，`easycom`打包后会自动剔除没有使用的组件，对组件库的使用尤为友好。

**props**

`props`可以是数组或对象，用于接收来自父组件的数据。`props`可以是简单的数组，或者使用对象作为替代，对象允许配置高级选项，如类型检测、自定义验证和设置默认值。

<table>

<thead>

<tr>

<th>选项</th>

<th>类型</th>

<th>说明</th>

</tr>

</thead>

<tbody>

<tr>

<td>type</td>

<td>String、Number、Boolean、Array、Object、Date、Function、Symbol，任何自定义构造函数、或上述内容组成的数组</td>

<td>会检查一个 prop 是否是给定的类型，否则抛出警告</td>

</tr>

<tr>

<td>default</td>

<td>any</td>

<td>为该 prop 指定一个默认值。如果该 prop 没有被传入，则换做用这个值。对象或数组的默认值必须从一个工厂函数返回</td>

</tr>

<tr>

<td>required</td>

<td>Boolean</td>

<td>定义该 prop 是否是必填项</td>

</tr>

<tr>

<td>validator</td>

<td>Function</td>

<td>自定义验证函数会将该 prop 的值作为唯一的参数代入。在非生产环境下，如果该函数返回一个 false 的值 (也就是验证失败)，一个控制台警告将会被抛出</td>

</tr>

</tbody>

</table>

示例：子组件定义

```js

    <template>
      <view>
    	<view>{{age}}</view>
      </view>
    </template>
    <script>
      export default {
    	props: {
    	  // 检测类型 + 其他验证
    	  age: {
    		type: Number,
    		default: 0,
    		required: true,
    		validator: function(value) {
    		  return value >= 0
    		}
    	  }
    	}
      }
    </script>
```

**sync 修饰符**

当一个子组件改变了一个`prop`的值时，这个变化也会同步到父组件中所绑定。`.sync`它会被扩展为一个自动更新父组件属性的`v-on`监听器。

```js

    <!-- 父组件 -->
    <template>
      <view>
        <syncA :title.sync="title"></syncA>
      </view>
    </template>
    <script>
      export default {
        data() {
          return {
            title: "hello vue.js"
          }
        }
      }
    </script>
```

```js

    <!-- 子组件 -->
    <template>
      <view>
        <view @click="changeTitle">{{title}}</view>
      </view>
    </template>
    <script>
      export default {
        props: {
          title: {
            default: "hello"
          },
        },
        methods: {
          changeTitle() {
            // 触发一个更新事件
            this.$emit('update:title', "test-app")
          }
        }
      }
    </script>
```

**命名限制**

在`uni-app`中以下这些作为保留关键字，不可作为组件名。

a、canvas、cell、content、countdown、datepicker、div、element、embed、header、image、img、indicator、input、link、list、loading-indicator、loading、marquee、meta、refresh、richtext、script、scrollable、scroller、select、slider-neighbor、slider、slot、span、spinner、style、svg、switch、tabbar、tabheader、template、text、textarea、timepicker、transition-group、transition、video、view、web

###  条件编译

条件编译是用特殊的注释作为标记，在编译时根据这些特殊的注释，将注释里面的代码编译到不同平台。

写法以`#ifdef`或`#ifndef`加`%PLATFORM%`开头，以`#endif`结尾。

*   `#ifdef`：if defined 仅在某平台存在
*   `#ifndef`：if not defined 除了某平台均存在
*   `%PLATFORM%`：平台名称

仅出现在`App平台`下的代码

```js

    #ifdef APP-PLUS
    需条件编译的代码
    #endif
```

除了`H5平台`，其它平台均存在的代码

```js

    #ifndef H5
    需条件编译的代码
    #endif
```

在`H5平台`或`微信小程序平台`存在的代码

```js

    #ifdef H5 || MP-WEIXIN
    需条件编译的代码
    #endif
```

**注意**

多个这里只有`||`，不可能出现`&&`，因为没有交集

**平台名称参数**

`%PLATFORM%`可取值如下：

<table>

<thead>

<tr>

<th>值</th>

<th>生效条件</th>

</tr>

</thead>

<tbody>

<tr>

<td>VUE3</td>

<td>Vue3</td>

</tr>

<tr>

<td>APP-PLUS</td>

<td>App</td>

</tr>

<tr>

<td>APP-PLUS-NVUE或APP-NVUE</td>

<td>App nvue</td>

</tr>

<tr>

<td>H5</td>

<td>H5</td>

</tr>

<tr>

<td>MP-WEIXIN</td>

<td>微信小程序</td>

</tr>

<tr>

<td>MP-ALIPAY</td>

<td>支付宝小程序</td>

</tr>

<tr>

<td>MP-BAIDU</td>

<td>百度小程序</td>

</tr>

<tr>

<td>MP-TOUTIAO</td>

<td>字节跳动小程序</td>

</tr>

<tr>

<td>MP-LARK</td>

<td>飞书小程序</td>

</tr>

<tr>

<td>MP-QQ</td>

<td>QQ小程序</td>

</tr>

<tr>

<td>MP-KUAISHOU</td>

<td>快手小程序</td>

</tr>

<tr>

<td>MP-JD</td>

<td>京东小程序</td>

</tr>

<tr>

<td>MP-360</td>

<td>360小程序</td>

</tr>

<tr>

<td>MP</td>

<td>所有小程序</td>

</tr>

<tr>

<td>QUICKAPP-WEBVIEW</td>

<td>所有快应用</td>

</tr>

<tr>

<td>QUICKAPP-WEBVIEW-UNION</td>

<td>快应用联盟</td>

</tr>

<tr>

<td>QUICKAPP-WEBVIEW-HUAWEI</td>

<td>快应用华为</td>

</tr>

</tbody>

</table>

**注意**

`Vue3`需要在项目的`manifest.json`文件根节点配置`"vueVersion" : "3"`

**API 的条件编译**

```js

    // #ifdef  %PLATFORM%
    平台特有的API实现
    // #endif
```

示例，如下代码仅在`App`下出现:

![](https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/07834e90-4f3c-11eb-b680-7980c8a877b8.png)

示例，如下代码不会在`H5`平台上出现:

![](https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/06a79490-4f3c-11eb-b680-7980c8a877b8.png)

除了支持单个平台的条件编译外，还支持`多平台`同时编译，使用`||`来分隔平台名称。

示例，如下代码会在`App`和`H5`平台上出现:

![](https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/05c1ef80-4f3c-11eb-b680-7980c8a877b8.png)

**组件的条件编译**

```js

    <!--  #ifdef  %PLATFORM% -->
    平台特有的组件
    <!--  #endif -->
```

示例，如下公众号关注组件仅会在微信小程序中出现:

```js

    <view>
      <view>微信公众号关注组件</view>
      <view>
        <!-- #ifdef MP-WEIXIN -->
        <official-account></official-account>
        <!-- #endif -->
      </view>
    </view>
```

**样式的条件编译**

```js

    /*  #ifdef  %PLATFORM%  */
    平台特有样式
    /*  #endif  */
```

**注意：** 样式的条件编译，无论是 css 还是 `sass/scss/less/stylus` 等预编译语言中，必须使用 `/*注释*/` 的写法。

正确写法

![](https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/0bd78d80-4f3c-11eb-a16f-5b3e54966275.png)

错误写法

![](https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/0c9c8b30-4f3c-11eb-8a36-ebb87efcf8c0.png)

**pages.json 的条件编译**

下面的页面，只有运行至`App`时才会编译进去。

![](https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/04ecec40-4f3c-11eb-97b7-0dc4655d6e68.png)

不同平台下的特有功能，以及小程序平台的分包，都可以通过 pages.json 的条件编译来更好地实现。这样，就不会在其它平台产生多余的资源，进而减小包体积。

json的条件编译，如不同平台的key名称相同，cli项目下开发者自己安装的校验器会报错，需自行关闭这些校验器对json相同key的校验规则。如果使用HBuilderX的校验器，无需在意此问题，HBuilderX的语法校验器为此优化过

**static 目录的条件编译**

在不同平台，引用的静态资源可能也存在差异，通过 static 的的条件编译可以解决此问题，static 目录下新建不同平台的专有目录（目录名称同`%PLATFORM%`值域,但字母均为小写），专有目录下的静态资源只有在特定平台才会编译进去。

如以下目录结构，`a.png`只有在微信小程序平台才会编译进去，`b.png`在所有平台都会被编译。

```js

    ┌─static                
    │  ├─mp-weixin
    │  │  └─a.png     
    │  └─b.png
    ├─main.js        
    ├─App.vue      
    ├─manifest.json 
    └─pages.json 
```

**整体目录条件编译**

如果想把各平台的页面文件更彻底的分开，也可以在test-app项目根目录创建`platforms`目录，然后在下面进一步创建`app-plus`、`mp-weixin`等子目录，存放不同平台的文件。

`platforms`目录下只支持放置页面文件（即页面vue文件），如果需要对其他资源条件编译建议使用`static 目录的条件编译`。

###  下拉刷新

`pages.json`设置对应页面`enablePullDownRefresh`属性，激活下拉。

```js

    {
    	"path": "pages/pull_down/index",
    	"style": {
    		"navigationBarTitleText": "下拉测试",
    		"enablePullDownRefresh":true
    	}
    }
```

```js

    <template>
      <view>
        {{ text }}
      </view>
    </template>

    <script>
      // 仅做示例，实际开发中延时根据需求来使用。
      export default {
        data() {
          return {
            text: 'test-app'
          }
        },
        onLoad: function(options) {
          setTimeout(function() {
            console.log('start pulldown');
          }, 1000);
          uni.startPullDownRefresh();
        },
        onPullDownRefresh() {
          console.log('refresh');
          setTimeout(function() {
            uni.stopPullDownRefresh();
          }, 1000);
        }
      }
    </script>
```

**onPullDownRefresh**

在 js 中定义`onPullDownRefresh`处理函数（和onLoad等生命周期函数同级），监听该页面用户下拉刷新事件。

*   需要在`pages.json`里，找到的当前页面的`pages`节点，并在`style`选项中开启`enablePullDownRefresh`
*   当处理完数据刷新后，`uni.stopPullDownRefresh`可以停止当前页面的下拉刷新

**uni.startPullDownRefresh(OBJECT)**

开始下拉刷新，调用后触发下拉刷新动画，效果与用户手动下拉刷新一致。

**OBJECT 参数说明**

<table>

<thead>

<tr>

<th>参数名</th>

<th>类型</th>

<th>必填</th>

<th>说明</th>

</tr>

</thead>

<tbody>

<tr>

<td>success</td>

<td>Function</td>

<td>否</td>

<td>接口调用成功的回调</td>

</tr>

<tr>

<td>fail</td>

<td>Function</td>

<td>否</td>

<td>接口调用失败的回调函数</td>

</tr>

<tr>

<td>complete</td>

<td>Function</td>

<td>否</td>

<td>接口调用结束的回调函数（调用成功、失败都会执行）</td>

</tr>

</tbody>

</table>

**success 返回参数说明**

<table>

<thead>

<tr>

<th>属性</th>

<th>类型</th>

<th>描述</th>

</tr>

</thead>

<tbody>

<tr>

<td>errMsg</td>

<td>String</td>

<td>接口调用结果</td>

</tr>

</tbody>

</table>

**uni.stopPullDownRefresh()**

停止当前页面下拉刷新。

###数据缓存

**uni.setStorage(OBJECT)**

将数据存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个异步接口。

**OBJECT 参数说明**

<table>

<thead>

<tr>

<th>参数名</th>

<th>类型</th>

<th>必填</th>

<th>说明</th>

</tr>

</thead>

<tbody>

<tr>

<td>key</td>

<td>String</td>

<td>是</td>

<td>本地缓存中的指定的 key</td>

</tr>

<tr>

<td>data</td>

<td>Any</td>

<td>是</td>

<td>需要存储的内容，只支持原生类型、及能够通过 JSON.stringify 序列化的对象</td>

</tr>

<tr>

<td>success</td>

<td>Function</td>

<td>否</td>

<td>接口调用成功的回调函数</td>

</tr>

<tr>

<td>fail</td>

<td>Function</td>

<td>否</td>

<td>接口调用失败的回调函数</td>

</tr>

<tr>

<td>complete</td>

<td>Function</td>

<td>否</td>

<td>接口调用结束的回调函数（调用成功、失败都会执行）</td>

</tr>

</tbody>

</table>

**代码示例**

```js

    uni.setStorage({
    	key: 'storage_key',
    	data: 'hello',
    	success: function () {
    		console.log('success');
    	}
    });
```

> `uni-`、`uni_`、`dcloud-`、`dcloud_`为前缀的`key`，为系统保留关键前缀。如`uni_deviceId`、`uni_id_token`，请开发者为key命名时避开这些前缀。

**uni.setStorageSync(KEY,DATA)**

将 data 存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个同步接口。

**参数说明**

<table>

<thead>

<tr>

<th>参数名</th>

<th>类型</th>

<th>必填</th>

<th>说明</th>

</tr>

</thead>

<tbody>

<tr>

<td>key</td>

<td>String</td>

<td>是</td>

<td>本地缓存中的指定的 key</td>

</tr>

<tr>

<td>data</td>

<td>Any</td>

<td>是</td>

<td>需要存储的内容，只支持原生类型、及能够通过 JSON.stringify 序列化的对象</td>

</tr>

</tbody>

</table>

**代码示例**

```js

    try {
    	uni.setStorageSync('storage_key', 'hello');
    } catch (e) {
    	// error
    }
```

**uni.getStorage(OBJECT)**

从本地缓存中异步获取指定 key 对应的内容。

**OBJECT 参数说明**

<table>

<thead>

<tr>

<th>参数名</th>

<th>类型</th>

<th>必填</th>

<th>说明</th>

</tr>

</thead>

<tbody>

<tr>

<td>key</td>

<td>String</td>

<td>是</td>

<td>本地缓存中的指定的 key</td>

</tr>

<tr>

<td>success</td>

<td>Function</td>

<td>是</td>

<td>接口调用的回调函数，res = {data: key对应的内容}</td>

</tr>

<tr>

<td>fail</td>

<td>Function</td>

<td>否</td>

<td>接口调用失败的回调函数</td>

</tr>

<tr>

<td>complete</td>

<td>Function</td>

<td>否</td>

<td>接口调用结束的回调函数（调用成功、失败都会执行）</td>

</tr>

</tbody>

</table>

**代码示例**

```js

    uni.getStorage({
    	key: 'storage_key',
    	success: function (res) {
    		console.log(res.data);
    	}
    });
```

**uni.getStorageSync(KEY)**

从本地缓存中同步获取指定 key 对应的内容。

**参数说明**

<table>

<thead>

<tr>

<th>参数名</th>

<th>类型</th>

<th>必填</th>

<th>说明</th>

</tr>

</thead>

<tbody>

<tr>

<td>key</td>

<td>String</td>

<td>是</td>

<td>本地缓存中的指定的 key</td>

</tr>

</tbody>

</table>

**代码示例**

```js

    try {
    	const value = uni.getStorageSync('storage_key');
    	if (value) {
    		console.log(value);
    	}
    } catch (e) {
    	// error
    }
```

**uni.getStorageInfo(OBJECT)**

异步获取当前 storage 的相关信息。

**OBJECT 参数说明**

<table>

<thead>

<tr>

<th>参数名</th>

<th>类型</th>

<th>必填</th>

<th>说明</th>

</tr>

</thead>

<tbody>

<tr>

<td>success</td>

<td>Function</td>

<td>是</td>

<td>接口调用的回调函数，详见返回参数说明</td>

</tr>

<tr>

<td>fail</td>

<td>Function</td>

<td>否</td>

<td>接口调用失败的回调函数</td>

</tr>

<tr>

<td>complete</td>

<td>Function</td>

<td>否</td>

<td>接口调用结束的回调函数（调用成功、失败都会执行）</td>

</tr>

</tbody>

</table>

**success 返回参数说明**

<table>

<thead>

<tr>

<th>参数名</th>

<th>类型</th>

<th>说明</th>

</tr>

</thead>

<tbody>

<tr>

<td>keys</td>

<td>Array＜String＞</td>

<td>当前 storage 中所有的 key</td>

</tr>

<tr>

<td>currentSize</td>

<td>Number</td>

<td>当前占用的空间大小, 单位：kb</td>

</tr>

<tr>

<td>limitSize</td>

<td>Number</td>

<td>限制的空间大小, 单位：kb</td>

</tr>

</tbody>

</table>

**代码示例**

```js

    uni.getStorageInfo({
    	success: function (res) {
    		console.log(res.keys);
    		console.log(res.currentSize);
    		console.log(res.limitSize);
    	}
    });
```

**uni.getStorageInfoSync()**

同步获取当前 storage 的相关信息。

**代码示例**

```js

    try {
    	const res = uni.getStorageInfoSync();
    	console.log(res.keys);
    	console.log(res.currentSize);
    	console.log(res.limitSize);
    } catch (e) {
    	// error
    }
```

**uni.removeStorage(OBJECT)**

从本地缓存中异步移除指定 key。

**OBJECT 参数说明**

<table>

<thead>

<tr>

<th>参数名</th>

<th>类型</th>

<th>必填</th>

<th>说明</th>

</tr>

</thead>

<tbody>

<tr>

<td>key</td>

<td>String</td>

<td>是</td>

<td>本地缓存中的指定的 key</td>

</tr>

<tr>

<td>success</td>

<td>Function</td>

<td>是</td>

<td>接口调用的回调函数</td>

</tr>

<tr>

<td>fail</td>

<td>Function</td>

<td>否</td>

<td>接口调用失败的回调函数</td>

</tr>

<tr>

<td>complete</td>

<td>Function</td>

<td>否</td>

<td>接口调用结束的回调函数（调用成功、失败都会执行）</td>

</tr>

</tbody>

</table>

**代码示例**

```js

    uni.removeStorage({
    	key: 'storage_key',
    	success: function (res) {
    		console.log('success');
    	}
    });
```

**uni.removeStorageSync(KEY)**

从本地缓存中同步移除指定 key。

**参数说明**

<table>

<thead>

<tr>

<th>参数名</th>

<th>类型</th>

<th>必填</th>

<th>说明</th>

</tr>

</thead>

<tbody>

<tr>

<td>key</td>

<td>String</td>

<td>是</td>

<td>本地缓存中的指定的 key</td>

</tr>

</tbody>

</table>

**代码示例**

```js

    try {
    	uni.removeStorageSync('storage_key');
    } catch (e) {
    	// error
    }
```

**uni.clearStorage()**

清理本地数据缓存。

**代码示例**

```js

    uni.clearStorage();
```

**uni.clearStorageSync()**

同步清理本地数据缓存。

**代码示例**

```js

    try {
    	uni.clearStorageSync();
    } catch (e) {
    	// error
    }
```

###  自定义头部

**pages.json 中设置去掉原生头部**

当`navigationStyle`设为`custom`或`titleNView`设为`false`时，原生导航栏不显示。

```js

    {
      "pages": [{
          "path": "pages/index/index",
          "style": {
            "navigationBarTitleText": "首页",
            // 单个页面设置
            "navigationStyle": "custom"
            /* "app-plus": {
            	"titleNView": false
            } */
          }
        },
        {
          "path": "pages/index/list-news",
          "style": {
            "navigationBarTitleText": "新闻"
          }
        }
      ],
      "globalStyle": {
        "navigationBarTextStyle": "black",
        "navigationBarTitleText": "uni-app",
        "navigationBarBackgroundColor": "#F8F8F8",
        "backgroundColor": "#F8F8F8",
        // 全局设置
        "navigationStyle": "custom"
        /* "app-plus":{
        	"titleNView":false
        } */
      }
    }
```

**状态栏 占位div**

非H5端，手机顶部状态栏区域会被页面内容覆盖。这是因为窗体是沉浸式的原因，即全屏可写内容。`uni-app`提供了状态栏高度的css变量`--status-bar-height`，如果需要把状态栏的位置从前景部分让出来，可写一个占位div，高度设为css变量。

**使用css方式进行控制**

```js

    <template>
      <view>
        <view class="status_bar">
          <!-- 这里是状态栏 -->
        </view>
        <view> 状态栏下的文字 </view>
      </view>
    </template>
    <style>
      .status_bar {
        height: var(--status-bar-height);
        width: 100%;
      }
    </style>
```

**使用js方式进行控制**

```js

    <template>
      <view>
        <view :style="'height:'+statusHeight+'px'">
          <!-- 这里是状态栏 -->
        </view>
        <text> 状态栏下的文字 </text>
      </view>
    </template>
    <script>
      export default {
        data() {
          return {
            statusHeight: 0
          }
        },
        onLoad() {
          this.statusHeight = plus.navigator.getStatusbarHeight();
        }
      }
    </script>
```

###  事件监听注册

uniapp 提供了事件的监听注册以及触发，注册的事件都是 App 全局级别的，可以很方便的跨任意组件，页面，nvue，vue 等。

**相关注册或触发函数**

**uni.$emit(eventName,OBJECT)**

触发全局的自定义事件，附加参数都会传给监听器回调函数。

<table>

<thead>

<tr>

<th>属性</th>

<th>类型</th>

<th>描述</th>

</tr>

</thead>

<tbody>

<tr>

<td>eventName</td>

<td>String</td>

<td>事件名</td>

</tr>

<tr>

<td>OBJECT</td>

<td>Object</td>

<td>触发事件携带的附加参数</td>

</tr>

</tbody>

</table>

**代码示例**

```js

    uni.$emit('update',{msg:'页面更新'})
```

**uni.$on(eventName,callback)**

监听全局的自定义事件，事件由`uni.$emit`触发，回调函数会接收事件触发函数的传入参数。

<table>

<thead>

<tr>

<th>属性</th>

<th>类型</th>

<th>描述</th>

</tr>

</thead>

<tbody>

<tr>

<td>eventName</td>

<td>String</td>

<td>事件名</td>

</tr>

<tr>

<td>callback</td>

<td>Function</td>

<td>事件的回调函数</td>

</tr>

</tbody>

</table>

**代码示例**

```js

    uni.$on('update',function(data){
      console.log('监听到事件来自 update ，携带参数 msg 为：' + data.msg);
    })
```

**uni.$once(eventName,callback)**

监听全局的自定义事件，事件由`uni.$emit`触发，但仅触发一次，在第一次触发之后移除该监听器。

<table>

<thead>

<tr>

<th>属性</th>

<th>类型</th>

<th>描述</th>

</tr>

</thead>

<tbody>

<tr>

<td>eventName</td>

<td>String</td>

<td>事件名</td>

</tr>

<tr>

<td>callback</td>

<td>Function</td>

<td>事件的回调函数</td>

</tr>

</tbody>

</table>

**代码示例**

```js

    uni.$once('update',function(data){
      console.log('监听到事件来自 update ，携带参数 msg 为：' + data.msg);
    })
```

**uni.$off([eventName, callback])**

移除全局自定义事件监听器。

<table>

<thead>

<tr>

<th>属性</th>

<th>类型</th>

<th>描述</th>

</tr>

</thead>

<tbody>

<tr>

<td>eventName</td>

<td>Array＜String＞</td>

<td>事件名</td>

</tr>

<tr>

<td>callback</td>

<td>Function</td>

<td>事件的回调函数</td>

</tr>

</tbody>

</table>

*   如果uni.$off没有传入参数，则移除App级别的所有事件监听器；
*   如果只提供了事件名（eventName），则移除该事件名对应的所有监听器；
*   如果同时提供了事件与回调，则只移除这个事件回调的监听器；
*   提供的回调必须跟$on的回调为同一个才能移除这个回调的监听器

**代码示例**

`$emit`、`$on`、`$off`常用于跨页面、跨组件通讯，这里为了方便演示放在同一个页面

```js

    <template>
      <view class="content">
        <view class="data">
          <text>{{val}}</text>
        </view>
        <button type="primary" @click="comunicationOff">结束监听</button>
      </view>
    </template>

    <script>
      export default {
        data() {
          return {
            val: 0
          }
        },
        onLoad() {
          setInterval(() => {
            uni.$emit('add', {
              data: 2
            })
          }, 1000)
          uni.$on('add', this.add)
        },
        methods: {
          comunicationOff() {
            uni.$off('add', this.add)
          },
          add(e) {
            this.val += e.data
          }
        }
      }
    </script>

    <style>
      .content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }

      .data {
        text-align: center;
        line-height: 40px;
        margin-top: 40px;
      }

      button {
        width: 200px;
        margin: 20px 0;
      }
    </style>
```

*   uni.$emit、 uni.$on 、 uni.$once 、uni.$off 触发的事件都是 App 全局级别的，跨任意组件，页面，nvue，vue 等
*   使用时，注意及时销毁事件监听，比如，页面 onLoad 里边 uni.$on 注册监听，onUnload 里边 uni.$off 移除，或者一次性的事件，直接使用 uni.$once 监听
*   注意 uni.$on 定义完成后才能接收到 uni.$emit 传递的数据

**场景案例**

我们假设一个场景，进入app,是未登陆状态，需要在我的页面点击登陆，进入登陆页面进行登陆。登陆成功之后，返回到我的页面，实时显示登陆后的用户信息。

**监听事件**

在用户中心页面 监听事件。因为事件监听是全局的，所以使用`uni.$on`，需要使用`uni.$off`移除全局的事件监听，避免重复监听。

```js

    <template>
      <view class="content">
        <navigator url="/pages/login/index" hover-class="navigator-hover">
          <button type="default">点我登录</button>
        </navigator>
        <view v-if="usnerInfo !== null">
          <view>
            用户token:{{usnerInfo.token}},用户昵称：{{usnerInfo.nickName}}
          </view>
        </view>
      </view>
    </template>

    <script>
      export default {
        data() {
          return {
            usnerInfo: null
          }
        },
        onLoad() {
          // 监听事件
          console.log('on login....');
          uni.$on('login', (uinfo) => {
            this.usnerInfo = uinfo;
          })
        },
        onUnload() {
          // 移除监听事件
          console.log('off login....');
          uni.$off('login');
        },
        methods: {

        }
      }
    </script>
```

**触发事件**

进入登陆页面，触发事件。使用`uni.$emit`触发事件后，对应的`uni.$on`就会监听到事件触发，在回调中去执行相关的逻辑。

```js

    <template>
      <view>
        <button type="default" @click="login">登录</button>
      </view>
    </template>

    <script>
      export default {
        data() {
          return {};
        },
        methods: {
          login() {
            // 假设用户登录成功，此时调用emit方法触发监听事件，刷新用户登录信息
            uni.$emit('login', {
              token: 'user123456',
              nickName: 'wk123',
            });
          }
        }
      }
    </script>
```

基本上述场景均可以实现，本质上就是一个页面通知另一个面我发生了变化，你需要处理一下。绝大部分页面的通讯都可以使用`uni.$emit`、`uni.$on`、`uni.$once`、`uni.$off`四个事件完成

##  2 Uniapp页面组成

###  页面简介

`uni-app`项目中，一个页面就是一个符合`Vue SFC`规范的`.vue`文件或`.nvue`文件。

`.vue`页面和`.nvue`页面，均全平台支持，差异在于当uni-app发行到App平台时，`.vue`文件会使用`webview`进行渲染，`.nvue`会使用原生进行渲染

###  新建页面

uni-app中的页面，通常会保存在工程根目录下的pages目录下。

每次新建页面，均需在pages.json中配置pages列表；未在pages.json -> pages 中配置的页面，uni-app会在编译阶段进行忽略

通过HBuilderX开发 uni-app 项目时，在 uni-app 项目上右键“新建页面”，HBuilderX会自动在pages.json中完成页面注册，开发更方便。

同时，HBuilderX 还内置了常用的页面模板（如图文列表、商品列表等），选择这些模板，可以大幅提升你的开发效率。

###  删除页面

删除页面时，需做两件工作：

*   删除`.vue`文件或.nvue文件
*   删除`pages.json` -> pages列表项中的配置

###  应用首页

uni-app会将pages.json -> pages配置项中的第一个页面，作为当前工程的首页（启动页）

###  页面生命周期

<table>

<thead>

<tr>

<th style="text-align: left;">函数名</th>

<th style="text-align: left;">说明</th>

<th style="text-align: left;">平台差异说明</th>

<th style="text-align: left;">最低版本</th>

</tr>

</thead>

<tbody>

<tr>

<td style="text-align: left;">onInit</td>

<td style="text-align: left;">监听页面初始化，其参数同 onLoad 参数，为上个页面传递的数据，参数类型为 Object（用于页面传参），触发时机早于 onLoad</td>

<td style="text-align: left;">百度小程序</td>

<td style="text-align: left;">3.1.0+</td>

</tr>

<tr>

<td style="text-align: left;">onLoad</td>

<td style="text-align: left;">监听页面加载，其参数为上个页面传递的数据，参数类型为 Object（用于页面传参），参考[示例<span><span class="sr-only">(opens new window)</span></span>](https://uniapp.dcloud.net.cn/api/router#navigateto)</td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

</tr>

<tr>

<td style="text-align: left;">onShow</td>

<td style="text-align: left;">监听页面显示。页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面</td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

</tr>

<tr>

<td style="text-align: left;">onReady</td>

<td style="text-align: left;">监听页面初次渲染完成。注意如果渲染速度快，会在页面进入动画完成前触发</td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

</tr>

<tr>

<td style="text-align: left;">onHide</td>

<td style="text-align: left;">监听页面隐藏</td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

</tr>

<tr>

<td style="text-align: left;">onUnload</td>

<td style="text-align: left;">监听页面卸载</td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

</tr>

<tr>

<td style="text-align: left;">onResize</td>

<td style="text-align: left;">监听窗口尺寸变化</td>

<td style="text-align: left;">App、微信小程序、快手小程序</td>

<td style="text-align: left;"></td>

</tr>

<tr>

<td style="text-align: left;">onPullDownRefresh</td>

<td style="text-align: left;">监听用户下拉动作，一般用于下拉刷新，参考[示例<span><span class="sr-only">(opens new window)</span></span>](https://uniapp.dcloud.net.cn/api/ui/pulldown)</td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

</tr>

<tr>

<td style="text-align: left;">onReachBottom</td>

<td style="text-align: left;">页面滚动到底部的事件（不是scroll-view滚到底），常用于下拉下一页数据。具体见下方注意事项</td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

</tr>

<tr>

<td style="text-align: left;">onTabItemTap</td>

<td style="text-align: left;">点击 tab 时触发，参数为Object，具体见下方注意事项</td>

<td style="text-align: left;">微信小程序、QQ小程序、支付宝小程序、百度小程序、H5、App、快手小程序、京东小程序</td>

<td style="text-align: left;"></td>

</tr>

<tr>

<td style="text-align: left;">onShareAppMessage</td>

<td style="text-align: left;">用户点击右上角分享</td>

<td style="text-align: left;">微信小程序、QQ小程序、支付宝小程序、字节小程序、飞书小程序、快手小程序、京东小程序</td>

<td style="text-align: left;"></td>

</tr>

<tr>

<td style="text-align: left;">onPageScroll</td>

<td style="text-align: left;">监听页面滚动，参数为Object</td>

<td style="text-align: left;">nvue暂不支持</td>

<td style="text-align: left;"></td>

</tr>

<tr>

<td style="text-align: left;">onNavigationBarButtonTap</td>

<td style="text-align: left;">监听原生标题栏按钮点击事件，参数为Object</td>

<td style="text-align: left;">App、H5</td>

<td style="text-align: left;"></td>

</tr>

<tr>

<td style="text-align: left;">onBackPress</td>

<td style="text-align: left;">监听页面返回，返回 event = {from:backbutton、 navigateBack} ，backbutton 表示来源是左上角返回按钮或 android 返回键；navigateBack表示来源是 uni.navigateBack ；详细说明及使用：[onBackPress 详解<span><span class="sr-only">(opens new window)</span></span>](http://ask.dcloud.net.cn/article/35120)。支付宝小程序只有真机能触发，只能监听非navigateBack引起的返回，不可阻止默认行为。</td>

<td style="text-align: left;">app、H5、支付宝小程序</td>

<td style="text-align: left;"></td>

</tr>

<tr>

<td style="text-align: left;">onNavigationBarSearchInputChanged</td>

<td style="text-align: left;">监听原生标题栏搜索输入框输入内容变化事件</td>

<td style="text-align: left;">App、H5</td>

<td style="text-align: left;">1.6.0</td>

</tr>

<tr>

<td style="text-align: left;">onNavigationBarSearchInputConfirmed</td>

<td style="text-align: left;">监听原生标题栏搜索输入框搜索事件，用户点击软键盘上的“搜索”按钮时触发。</td>

<td style="text-align: left;">App、H5</td>

<td style="text-align: left;">1.6.0</td>

</tr>

<tr>

<td style="text-align: left;">onNavigationBarSearchInputClicked</td>

<td style="text-align: left;">监听原生标题栏搜索输入框点击事件（pages.json 中的 searchInput 配置 disabled 为 true 时才会触发）</td>

<td style="text-align: left;">App、H5</td>

<td style="text-align: left;">1.6.0</td>

</tr>

<tr>

<td style="text-align: left;">onShareTimeline</td>

<td style="text-align: left;">监听用户点击右上角转发到朋友圈</td>

<td style="text-align: left;">微信小程序</td>

<td style="text-align: left;">2.8.1+</td>

</tr>

<tr>

<td style="text-align: left;">onAddToFavorites</td>

<td style="text-align: left;">监听用户点击右上角收藏</td>

<td style="text-align: left;">微信小程序、QQ小程序</td>

<td style="text-align: left;">2.8.1+</td>

</tr>

</tbody>

</table>

`onInit`使用注意

*   仅百度小程序基础库 3.260 以上支持 onInit 生命周期
*   其他版本或平台可以同时使用 onLoad 生命周期进行兼容，注意避免重复执行相同逻辑
*   不依赖页面传参的逻辑可以直接使用 created 生命周期替代

`onInit`使用注意

*   仅百度小程序基础库 3.260 以上支持 onInit 生命周期
*   其他版本或平台可以同时使用 onLoad 生命周期进行兼容，注意避免重复执行相同逻辑
*   不依赖页面传参的逻辑可以直接使用 created 生命周期替代

`onReachBottom`使用注意 可在pages.json里定义具体页面底部的触发距离[onReachBottomDistance<span><span class="sr-only">(opens new window)</span></span>](https://uniapp.dcloud.net.cn/collocation/pages#globalstyle)，比如设为50，那么滚动页面到距离底部50px时，就会触发onReachBottom事件。

如使用scroll-view导致页面没有滚动，则触底事件不会被触发。scroll-view滚动到底部的事件请参考scroll-view的文档

`onPageScroll` （监听滚动、滚动监听、滚动事件）参数说明：

<table>

<thead>

<tr>

<th>属性</th>

<th>类型</th>

<th>说明</th>

</tr>

</thead>

<tbody>

<tr>

<td>scrollTop</td>

<td>Number</td>

<td>页面在垂直方向已滚动的距离（单位px）</td>

</tr>

</tbody>

</table>

**注意**

*   `onPageScroll`里不要写交互复杂的js，比如频繁修改页面。因为这个生命周期是在渲染层触发的，在非h5端，js是在逻辑层执行的，两层之间通信是有损耗的。如果在滚动过程中，频发触发两层之间的数据交换，可能会造成卡顿。
*   如果想实现滚动时标题栏透明渐变，在App和H5下，可在pages.json中配置titleNView下的type为transparent，[参考<span><span class="sr-only">(opens new window)</span></span>](https://uniapp.dcloud.io/collocation/pages?id=app-titlenview)。
*   如果需要滚动吸顶固定某些元素，推荐使用css的粘性布局，参考[插件市场<span><span class="sr-only">(opens new window)</span></span>](https://ext.dcloud.net.cn/plugin?id=715)。插件市场也有其他js实现的吸顶插件，但性能不佳，需要时可自行搜索。
*   在App、微信小程序、H5中，也可以使用wxs监听滚动，[参考<span><span class="sr-only">(opens new window)</span></span>](https://uniapp.dcloud.io/tutorial/miniprogram-subject#wxs)；在app-nvue中，可以使用bindingx监听滚动，[参考<span><span class="sr-only">(opens new window)</span></span>](https://uniapp.dcloud.io/tutorial/nvue-api#nvue-%E9%87%8C%E4%BD%BF%E7%94%A8-bindingx)。
*   `onBackPress`上不可使用`async`，会导致无法阻止默认返回

```js

    onPageScroll : function(e) { //nvue暂不支持滚动监听，可用bindingx代替
    	console.log("滚动距离为：" + e.scrollTop);
    },
```

`onTabItemTap` 返回的json对象说明：

<table>

<thead>

<tr>

<th>属性</th>

<th>类型</th>

<th>说明</th>

</tr>

</thead>

<tbody>

<tr>

<td>index</td>

<td>Number</td>

<td>被点击tabItem的序号，从0开始</td>

</tr>

<tr>

<td>pagePath</td>

<td>String</td>

<td>被点击tabItem的页面路径</td>

</tr>

<tr>

<td>text</td>

<td>String</td>

<td>被点击tabItem的按钮文字</td>

</tr>

</tbody>

</table>

**注意**

*   onTabItemTap常用于点击当前tabitem，滚动或刷新当前页面。如果是点击不同的tabitem，一定会触发页面切换。
*   如果想在App端实现点击某个tabitem不跳转页面，不能使用onTabItemTap，可以使用[plus.nativeObj.view<span><span class="sr-only">(opens new window)</span></span>](http://www.html5plus.org/doc/zh_cn/nativeobj.html)放一个区块盖住原先的tabitem，并拦截点击事件。

```js

    onTabItemTap : function(e) {
    	console.log(e);
    	// e的返回格式为json对象： {"index":0,"text":"首页","pagePath":"pages/index/index"}
    },
```

`onNavigationBarButtonTap` 参数说明：

<table>

<thead>

<tr>

<th>属性</th>

<th>类型</th>

<th>说明</th>

</tr>

</thead>

<tbody>

<tr>

<td>index</td>

<td>Number</td>

<td>原生标题栏按钮数组的下标</td>

</tr>

</tbody>

</table>

```js

    onNavigationBarButtonTap : function (e) {
    	console.log(e);
    	// e的返回格式为json对象：{"text":"测试","index":0}
    }
```

`onBackPress` 回调参数对象说明：

<table>

<thead>

<tr>

<th>属性</th>

<th>类型</th>

<th>说明</th>

</tr>

</thead>

<tbody>

<tr>

<td>from</td>

<td>String</td>

<td>触发返回行为的来源：'backbutton'——左上角导航栏按钮及安卓返回键；'navigateBack'——uni.navigateBack() 方法。**支付宝小程序端不支持返回此字段**</td>

</tr>

</tbody>

</table>

```js

    export default {
    	data() {
    		return {};
    	},
    	onBackPress(options) {
    		console.log('from:' + options.from)
    	}
    }
```

**注意**

*   nvue 页面weex编译模式支持的生命周期同weex，具体参考：[weex生命周期介绍<span><span class="sr-only">(opens new window)</span></span>](https://uniapp.dcloud.io/tutorial/nvue-outline?id=%E7%BC%96%E8%AF%91%E6%A8%A1%E5%BC%8F)。
*   支付宝小程序真机可以监听到非`navigateBack`引发的返回事件（使用小程序开发工具时不会触发`onBackPress`），不可以阻止默认返回行为

###  组件生命周期

`uni-app` 组件支持的生命周期，与vue标准组件的生命周期相同。这里没有页面级的onLoad等生命周期：

<table>

<thead>

<tr>

<th style="text-align: left;">函数名</th>

<th style="text-align: left;">说明</th>

<th style="text-align: left;">平台差异说明</th>

<th style="text-align: left;">最低版本</th>

</tr>

</thead>

<tbody>

<tr>

<td style="text-align: left;">beforeCreate</td>

<td style="text-align: left;">在实例初始化之前被调用。[详见<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#beforeCreate)</td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

</tr>

<tr>

<td style="text-align: left;">created</td>

<td style="text-align: left;">在实例创建完成后被立即调用。[详见<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#created)</td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

</tr>

<tr>

<td style="text-align: left;">beforeMount</td>

<td style="text-align: left;">在挂载开始之前被调用。[详见<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#beforeMount)</td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

</tr>

<tr>

<td style="text-align: left;">mounted</td>

<td style="text-align: left;">挂载到实例上去之后调用。[详见<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#mounted) 注意：此处并不能确定子组件被全部挂载，如果需要子组件完全挂载之后在执行操作可以使用`$nextTick`[Vue官方文档<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#vm-nextTick)</td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

</tr>

<tr>

<td style="text-align: left;">beforeUpdate</td>

<td style="text-align: left;">数据更新时调用，发生在虚拟 DOM 打补丁之前。[详见<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#beforeUpdate)</td>

<td style="text-align: left;">仅H5平台支持</td>

<td style="text-align: left;"></td>

</tr>

<tr>

<td style="text-align: left;">updated</td>

<td style="text-align: left;">由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。[详见<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#updated)</td>

<td style="text-align: left;">仅H5平台支持</td>

<td style="text-align: left;"></td>

</tr>

<tr>

<td style="text-align: left;">beforeDestroy</td>

<td style="text-align: left;">实例销毁之前调用。在这一步，实例仍然完全可用。[详见<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#beforeDestroy)</td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

</tr>

<tr>

<td style="text-align: left;">destroyed</td>

<td style="text-align: left;">Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。[详见<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#destroyed)</td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

</tr>

</tbody>

</table>

###  页面调用接口

#### 

`getApp()` 函数用于获取当前应用实例，一般用于获取globalData 。

**实例**

```js

    const app = getApp()
    console.log(app.globalData)
```

**注意：**

*   不要在定义于 `App()` 内的函数中，或调用 `App` 前调用 `getApp()` ，可以通过 `this.$scope` 获取对应的app实例
*   通过 `getApp()` 获取实例之后，不要私自调用生命周期函数。
*   当在首页`nvue`中使用`getApp()`不一定可以获取真正的`App`对象。对此提供了`const app = getApp({allowDefault: true})`用来获取原始的`App`对象，可以用来在首页对`globalData`等初始化

#### 

`getCurrentPages()` 函数用于获取当前页面栈的实例，以数组形式按栈的顺序给出，第一个元素为首页，最后一个元素为当前页面。

**注意：** `getCurrentPages()`仅用于展示页面栈的情况，请勿修改页面栈，以免造成页面状态错误。

每个页面实例的方法属性列表：

<table>

<thead>

<tr>

<th>方法</th>

<th>描述</th>

<th>平台说明</th>

</tr>

</thead>

<tbody>

<tr>

<td>page.$getAppWebview()</td>

<td>获取当前页面的webview对象实例</td>

<td>App</td>

</tr>

<tr>

<td>page.route</td>

<td>获取当前页面的路由</td>

<td></td>

</tr>

</tbody>

</table>

Tips：

*   `navigateTo`, `redirectTo` 只能打开非 tabBar 页面。
*   `switchTab` 只能打开 `tabBar` 页面。
*   `reLaunch` 可以打开任意页面。
*   页面底部的 `tabBar` 由页面决定，即只要是定义为 `tabBar` 的页面，底部都有 `tabBar`。
*   不能在 `App.vue` 里面进行页面跳转。

#### 

`uni-app` 在 `getCurrentPages()`获得的页面里内置了一个方法 `$getAppWebview()` 可以得到当前webview的对象实例，从而实现对 webview 更强大的控制。在 html5Plus 中，plus.webview具有强大的控制能力，可参考：[WebviewObject<span><span class="sr-only">(opens new window)</span></span>](http://www.html5plus.org/doc/zh_cn/webview.html#plus.webview.WebviewObject)。

但`uni-app`框架有自己的窗口管理机制，请不要自己创建和销毁webview，如有需求覆盖子窗体上去，请使用[原生子窗体subNvue<span><span class="sr-only">(opens new window)</span></span>](https://uniapp.dcloud.net.cn/api/window/subNVues)。

**注意：此方法仅 App 支持**

**示例：**

获取当前页面 webview 的对象实例

```js

    export default {
      data() {
        return {
          title: 'Hello'
        }
      },
      onLoad() {
        // #ifdef APP-PLUS
        const currentWebview = this.$scope.$getAppWebview(); //此对象相当于html5plus里的plus.webview.currentWebview()。在uni-app里vue页面直接使用plus.webview.currentWebview()无效
        currentWebview.setBounce({position:{top:'100px'},changeoffset:{top:'0px'}}); //动态重设bounce效果
        // #endif
      }
    }
```

获取指定页面 webview 的对象实例

`getCurrentPages()`可以得到所有页面对象，然后根据数组，可以取指定的页面webview对象

```js

    var pages = getCurrentPages();
    var page = pages[pages.length - 1];
    // #ifdef APP-PLUS
    var currentWebview = page.$getAppWebview();
    console.log(currentWebview.id);//获得当前webview的id
    console.log(currentWebview.isVisible());//查询当前webview是否可见
    );
    // #endif
```

uni-app自带的web-view组件，是页面中新插入的一个子webview

###  页面通讯

#### 

触发全局的自定义事件。附加参数都会传给监听器回调。

<table>

<thead>

<tr>

<th>属性</th>

<th>类型</th>

<th>描述</th>

</tr>

</thead>

<tbody>

<tr>

<td>eventName</td>

<td>String</td>

<td>事件名</td>

</tr>

<tr>

<td>OBJECT</td>

<td>Object</td>

<td>触发事件携带的附加参数</td>

</tr>

</tbody>

</table>

**代码示例**

```js

    	uni.$emit('update',{msg:'页面更新'})
```

#### 

监听全局的自定义事件。事件可以由 uni.$emit 触发，回调函数会接收所有传入事件触发函数的额外参数。

<table>

<thead>

<tr>

<th>属性</th>

<th>类型</th>

<th>描述</th>

</tr>

</thead>

<tbody>

<tr>

<td>eventName</td>

<td>String</td>

<td>事件名</td>

</tr>

<tr>

<td>callback</td>

<td>Function</td>

<td>事件的回调函数</td>

</tr>

</tbody>

</table>

**代码示例**

```js

    	uni.$on('update',function(data){
    		console.log('监听到事件来自 update ，携带参数 msg 为：' + data.msg);
    	})
```

#### 

监听全局的自定义事件。事件可以由 uni.$emit 触发，但是只触发一次，在第一次触发之后移除监听器。

<table>

<thead>

<tr>

<th>属性</th>

<th>类型</th>

<th>描述</th>

</tr>

</thead>

<tbody>

<tr>

<td>eventName</td>

<td>String</td>

<td>事件名</td>

</tr>

<tr>

<td>callback</td>

<td>Function</td>

<td>事件的回调函数</td>

</tr>

</tbody>

</table>

**代码示例**

```js

    	uni.$once('update',function(data){
    		console.log('监听到事件来自 update ，携带参数 msg 为：' + data.msg);
    	})
```

#### 

移除全局自定义事件监听器。

<table>

<thead>

<tr>

<th>属性</th>

<th>类型</th>

<th>描述</th>

</tr>

</thead>

<tbody>

<tr>

<td>eventName</td>

<td>Array＜String＞</td>

<td>事件名</td>

</tr>

<tr>

<td>callback</td>

<td>Function</td>

<td>事件的回调函数</td>

</tr>

</tbody>

</table>

**Tips**

*   如果没有提供参数，则移除所有的事件监听器；
*   如果只提供了事件，则移除该事件所有的监听器；
*   如果同时提供了事件与回调，则只移除这个回调的监听器；
*   提供的回调必须跟$on的回调为同一个才能移除这个回调的监听器；

**代码示例**

`$emit`、`$on`、`$off`常用于跨页面、跨组件通讯，这里为了方便演示放在同一个页面

```js

    <template>
    		<view class="content">
    			<view class="data">
    				<text>{{val}}</text>
    			</view>
    			<button type="primary" @click="comunicationOff">结束监听</button>
    		</view>
    	</template>

    	<script>
    		export default {
    			data() {
    				return {
    					val: 0
    				}
    			},
    			onLoad() {
    				setInterval(()=>{
    					uni.$emit('add', {
    						data: 2
    					})
    				},1000)
    				uni.$on('add', this.add)
    			},
    			methods: {
    				comunicationOff() {
    					uni.$off('add', this.add)
    				},
    				add(e) {
    					this.val += e.data
    				}
    			}
    		}
    	</script>

    	<style>
    		.content {
    			display: flex;
    			flex-direction: column;
    			align-items: center;
    			justify-content: center;
    		}

    		.data {
    			text-align: center;
    			line-height: 40px;
    			margin-top: 40px;
    		}

    		button {
    			width: 200px;
    			margin: 20px 0;
    		}
    	</style>
```

**注意事项**

*   uni.$emit、 uni.$on 、 uni.$once 、uni.$off 触发的事件都是 App 全局级别的，跨任意组件，页面，nvue，vue 等
*   使用时，注意及时销毁事件监听，比如，页面 onLoad 里边 uni.$on 注册监听，onUnload 里边 uni.$off 移除，或者一次性的事件，直接使用 uni.$once 监听

###  路由

`uni-app`页面路由为框架统一管理，开发者需要在[pages.json<span><span class="sr-only">(opens new window)</span></span>](https://uniapp.dcloud.net.cn/collocation/pages#pages)里配置每个路由页面的路径及页面样式。类似小程序在 app.json 中配置页面路由一样。所以 `uni-app` 的路由用法与 `Vue Router` 不同，如仍希望采用 `Vue Router` 方式管理路由，可在插件市场搜索 [Vue-Router<span><span class="sr-only">(opens new window)</span></span>](https://ext.dcloud.net.cn/search?q=vue-router)

`uni-app` 有两种页面路由跳转方式：使用[navigator<span><span class="sr-only">(opens new window)</span></span>](https://uniapp.dcloud.net.cn/component/navigator)组件跳转、调用[API<span><span class="sr-only">(opens new window)</span></span>](https://uniapp.dcloud.net.cn/api/router)跳转

```js

    <template>
    	<view>
    		<view class="page-body">
    			<view class="btn-area">
    				<navigator url="navigate/navigate?title=navigate" hover-class="navigator-hover">
    					<button type="default">跳转到新页面</button>
    				</navigator>
    				<navigator url="redirect/redirect?title=redirect" open-type="redirect" hover-class="other-navigator-hover">
    					<button type="default">在当前页打开</button>
    				</navigator>
    				<navigator url="/pages/tabBar/extUI/extUI" open-type="switchTab" hover-class="other-navigator-hover">
    					<button type="default">跳转tab页面</button>
    				</navigator>
    			</view>
    		</view>
    	</view>
    </template>
    <script>
    // navigate.vue页面接受参数
    export default {
    	onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
    		console.log(option.id); //打印出上个页面传递的参数。
    		console.log(option.name); //打印出上个页面传递的参数。
    	}
    }
    </script>
```

**uni.navigateTo(OBJECT)**

```js

    //在起始页面跳转到test.vue页面并传递参数
    uni.navigateTo({
    	url: 'test?id=1&name=uniapp'
    });
```

```js

    // 在test.vue页面接受参数
    export default {
    	onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
    		console.log(option.id); //打印出上个页面传递的参数。
    		console.log(option.name); //打印出上个页面传递的参数。
    	}
    }
```

###  页面栈

框架以栈的形式管理当前所有页面， 当发生路由切换的时候，页面栈的表现如下

框架以栈的形式管理当前所有页面， 当发生路由切换的时候，页面栈的表现如下：

<table>

<thead>

<tr>

<th>路由方式</th>

<th>页面栈表现</th>

<th>触发时机</th>

</tr>

</thead>

<tbody>

<tr>

<td>初始化</td>

<td>新页面入栈</td>

<td>uni-app 打开的第一个页面</td>

</tr>

<tr>

<td>打开新页面</td>

<td>新页面入栈</td>

<td>调用 API [uni.navigateTo<span><span class="sr-only">(opens new window)</span></span>](https://uniapp.dcloud.net.cn/api/router#navigateto) 、使用组件 `<navigator open-type="navigate"/>`</td>

</tr>

<tr>

<td>页面重定向</td>

<td>当前页面出栈，新页面入栈</td>

<td>调用 API [uni.redirectTo<span><span class="sr-only">(opens new window)</span></span>](https://uniapp.dcloud.net.cn/api/router#redirectto) 、使用组件 `<navigator open-type="redirectTo"/>`</td>

</tr>

<tr>

<td>页面返回</td>

<td>页面不断出栈，直到目标返回页</td>

<td>调用 API [uni.navigateBack<span><span class="sr-only">(opens new window)</span></span>](https://uniapp.dcloud.net.cn/api/router#navigateback) 、使用组件 `<navigator open-type="navigateBack"/>` 、用户按左上角返回按钮、安卓用户点击物理back按键</td>

</tr>

<tr>

<td>Tab 切换</td>

<td>页面全部出栈，只留下新的 Tab 页面</td>

<td>调用 API [uni.switchTab<span><span class="sr-only">(opens new window)</span></span>](https://uniapp.dcloud.net.cn/api/router#switchtab) 、使用组件 `<navigator open-type="switchTab"/>` 、用户切换 Tab</td>

</tr>

<tr>

<td>重加载</td>

<td>页面全部出栈，只留下新的页面</td>

<td>调用 API [uni.reLaunch<span><span class="sr-only">(opens new window)</span></span>](https://uniapp.dcloud.net.cn/api/router#relaunch) 、使用组件 `<navigator open-type="reLaunch"/>`</td>

</tr>

</tbody>

</table>

###  页面代码规范介绍

`uni-app` 支持在 template 模板中嵌套 `<template/>` 和 `<block/>`，用来进行 [列表渲染<span><span class="sr-only">(opens new window)</span></span>](https://uniapp.dcloud.net.cn/tutorial/vue-basics#listrendering) 和 [条件渲染<span><span class="sr-only">(opens new window)</span></span>](https://uniapp.dcloud.net.cn/tutorial/vue-basics#condition)。

`<template/>` 和 `<block/>` 并不是一个组件，它们仅仅是一个包装元素，不会在页面中做任何渲染，只接受控制属性。

`<block/>` 在不同的平台表现存在一定差异，推荐统一使用 `<template/>`。

```js

    <template>
    	<view>
    		<template v-if="test">
    			<view>test 为 true 时显示</view>
    		</template>
    		<template v-else>
    			<view>test 为 false 时显示</view>
    		</template>
    	</view>
    </template>
```

```js

    <template>
    	<view>
    		<block v-for="(item,index) in list" :key="index">
    			<view>{{item}} - {{index}}</view>
    		</block>
    	</view>
    </template>
```

###  nvue 开发与 vue 开发的常见区别

nvue是什么？native vue的缩写

> Nvue是一个基于weex改进的原生渲染引擎,它在某些方面要比vue更高性能,在app上使用更加流畅,但是缺点也很明显,没有足够的api能力,语法限制太大,所以nvue适用于特定场景

*   nvue 是 uni-app 的一种渲染方式，如果使用vue页面，则使用webview渲染；如果使用nvue页面(native vue的缩写)，则使用原生渲染
*   nvue 页面控制显隐只可以使用`v-if`不可以使用`v-show`
*   nvue 页面只能使用`flex`布局，不支持其他布局方式。页面开发前，首先想清楚这个页面的纵向内容有什么，哪些是要滚动的，然后每个纵向内容的横轴排布有什么，按 flex 布局设计好界面
*   nvue 页面的布局排列方向默认为竖排（`column`），如需改变布局方向，可以在 `manifest.json` -> `app-plus` -> `nvue` -> `flex-direction` 节点下修改，仅在 uni-app 模式下生效
*   nvue 页面编译为 H5、小程序时，会做一件 css 默认值对齐的工作。因为 weex 渲染引擎只支持 flex，并且默认 flex 方向是垂直。而 H5 和小程序端，使用 web 渲染，默认不是 flex，并且设置`display:flex`后，它的 flex 方向默认是水平而不是垂直的。所以 nvue 编译为 H5、小程序时，会自动把页面默认布局设为 flex、方向为垂直。当然开发者手动设置后会覆盖默认设置
*   文字内容，必须、只能在`<text>`组件下。不能在`<div>`、`<view>`的`text`区域里直接写文字。否则即使渲染了，也无法绑定 js 里的变量
*   只有`text`标签可以设置字体大小，字体颜色
*   布局不能使用百分比、没有媒体查询
*   nvue 切换横竖屏时可能导致样式出现问题，建议有 nvue 的页面锁定手机方向
*   支持的 css 有限，不过并不影响布局出你需要的界面，`flex`还是非常强大的
*   不支持背景图。但可以使用`image`组件和层级来实现类似 web 中的背景效果。因为原生开发本身也没有 web 这种背景图概念
*   css 选择器支持的比较少，只能使用 class 选择器
*   nvue 的各组件在安卓端默认是透明的，如果不设置`background-color`，可能会导致出现重影的问题
*   `class` 进行绑定时只支持数组语法
*   `Android` 端在一个页面内使用大量圆角边框会造成性能问题，尤其是多个角的样式还不一样的话更耗费性能。应避免这类使用
*   `nvue` 页面没有`bounce`回弹效果，只有几个列表组件有`bounce`效果，包括 `list`、`recycle-list`、`waterfall`
*   原生开发没有页面滚动的概念，页面内容高过屏幕高度并不会自动滚动，只有部分组件可滚动（`list`、`waterfall`、`scroll-view/scroller`），要滚得内容需要套在可滚动组件下。这不符合前端开发的习惯，所以在 nvue 编译为 uni-app 模式时，给页面外层自动套了一个 `scroller`，页面内容过高会自动滚动。（组件不会套，页面有`recycle-list`时也不会套）。后续会提供配置，可以设置不自动套
*   在 `App.vue` 中定义的全局 js 变量不会在 `nvue` 页面生效。`globalData`和`vuex`是生效的
*   App.vue 中定义的全局 css，对 nvue 和 vue 页面同时生效。如果全局 css 中有些 css 在 nvue 下不支持，编译时控制台会报警，建议把这些不支持的 css 包裹在[条件编译<span><span class="sr-only">(opens new window)</span></span>](https://uniapp.dcloud.io/tutorial/platform)里，`APP-PLUS-NVUE`
*   不能在 `style` 中引入字体文件，nvue 中字体图标的使用参考：[加载自定义字体<span><span class="sr-only">(opens new window)</span></span>](https://uniapp.dcloud.net.cn/tutorial/nvue-api#addrule)。如果是本地字体，可以用`plus.io`的 API 转换路径
*   目前不支持在 nvue 页面使用 `typescript/ts`

##  3 资源互相引用

###  NPM支持

在项目根目录执行命令安装npm包：

```js

    npm install packageName --save
```

**使用**

安装完即可使用npm包，js中引入npm包：

```js

    import package from 'packageName'
    const package = require('packageName')
```

*   为多端兼容考虑，建议优先从 [uni-app插件市场<span><span class="sr-only">(opens new window)</span></span>](https://ext.dcloud.net.cn/) 获取插件。直接从 npm 下载库很容易只兼容H5端。
*   非 H5 端不支持使用含有 `dom`、`window` 等操作的 `vue` 组件和 js 模块，安装的模块及其依赖的模块使用的 API 必须是 uni-app 已有的 [API<span><span class="sr-only">(opens new window)</span></span>](https://uniapp.dcloud.net.cn/api/)（兼容小程序 API），比如：支持[高德地图微信小程序 SDK<span><span class="sr-only">(opens new window)</span></span>](https://www.npmjs.com/package/amap-wx)。类似[jQuery<span><span class="sr-only">(opens new window)</span></span>](https://www.npmjs.com/package/jquery) 等库只能用于H5端。
*   `node_modules` 目录必须在项目根目录下。不管是cli项目还是`HBuilderX`创建的项目

###  模板内引入静态资源

> `template`内引入静态资源，如`image`、`video`等标签的`src`属性时，可以使用相对路径或者绝对路径，形式如下

```js

    <!-- 绝对路径，/static指根目录下的static目录，在cli项目中/static指src目录下的static目录 -->
    <image class="logo" src="/static/logo.png"></image>
    <image class="logo" src="@/static/logo.png"></image>
    <!-- 相对路径 -->
    <image class="logo" src="../../static/logo.png"></image>
```

**注意**

*   `@`开头的绝对路径以及相对路径会经过 base64 转换规则校验
*   引入的静态资源在非 h5 平台，均不转为 `base64`。
*   H5 平台，小于 `4kb` 的资源会被转换成 `base64`，其余不转。
*   自`HBuilderX 2.6.6`起`template`内支持`@`开头路径引入静态资源，旧版本不支持此方式
*   App 平台自`HBuilderX 2.6.9`起`template`节点中引用静态资源文件时（如：图片），调整查找策略为【基于当前文件的路径搜索】，与其他平台保持一致
*   支付宝小程序组件内 image 标签不可使用相对路径

###  css 引入静态资源

> `css`文件或`style标签`内引入`css`文件时（scss、less 文件同理），可以使用相对路径或绝对路径（`HBuilderX 2.6.6`）

```js

    /* 绝对路径 */
    @import url('/common/uni.css');
    @import url('@/common/uni.css');
    /* 相对路径 */
    @import url('../../common/uni.css');
```

**注意**

*   自`HBuilderX 2.6.6`起支持绝对路径引入静态资源，旧版本不支持此方式

> `css`文件或`style标签`内引用的图片路径可以使用相对路径也可以使用绝对路径，需要注意的是，有些小程序端 css 文件不允许引用本地文件（请看注意事项）。

```js

    /* 绝对路径 */
    background-image: url(/static/logo.png);
    background-image: url(@/static/logo.png);
    /* 相对路径 */
    background-image: url(../../static/logo.png);
```

**Tips**

*   引入字体图标请参考，[字体图标<span><span class="sr-only">(opens new window)</span></span>](https://uniapp.dcloud.net.cn/tutorial/syntax-css.html#%E5%AD%97%E4%BD%93%E5%9B%BE%E6%A0%87)
*   `@`开头的绝对路径以及相对路径会经过 `base64` 转换规则校验
*   不支持本地图片的平台，小于 `40kb`，一定会转 `base64`。（共四个平台 mp-weixin, mp-qq, mp-toutiao, app v2）
*   `h5` 平台，小于 `4kb` 会转 `base64`，超出 `4kb` 时不转。
*   其余平台不会转 `base64`

###  引入原生插件

```js

    const PluginName = uni.requireNativePlugin(PluginName); // PluginName 为原生插件名称
```

**内置原生插件**

内置原生插件,uni-app已默认集成，支持直接在内置基座运行。

仅在nvue页面，支持引入BindingX，animation， DOM.addRule等。

在vue页面，支持引入clipboard，storage，stream，deviceInfo等。

使用方式：可通过`uni.requireNativePlugin`直接使用。

```js

    <template>
    		<view>
    			<text class="my-iconfont">&#xe85c;</text>	
    		</view>
    	</template>
    	<script>
    		export default{
    			beforeCreate() {
    				const domModule = uni.requireNativePlugin('dom')
    				domModule.addRule('fontFace', {
    					'fontFamily': "myIconfont",
    					'src': "url('http://at.alicdn.com/t/font_2234252_v3hj1klw6k9.ttf')"
    				});
    			}
    		}
    	</script>
    	<style>
    		.my-iconfont {
    			font-family:myIconfont;
    			font-size:60rpx;
    			color: #00AAFF;
    		}
    	</style>
```

非内置原生插件，分为 [本地插件<span><span class="sr-only">(opens new window)</span></span>](https://uniapp.dcloud.net.cn/api/extend/native-plugin#%E6%9C%AC%E5%9C%B0%E6%8F%92%E4%BB%B6%E9%9D%9E%E5%86%85%E7%BD%AE%E5%8E%9F%E7%94%9F%E6%8F%92%E4%BB%B6) 和 [云端插件<span><span class="sr-only">(opens new window)</span></span>](https://uniapp.dcloud.net.cn/api/extend/native-plugin#%E4%BA%91%E7%AB%AF%E6%8F%92%E4%BB%B6%E9%9D%9E%E5%86%85%E7%BD%AE%E5%8E%9F%E7%94%9F%E6%8F%92%E4%BB%B6) 。集成原生插件后，需要提交云端打包或制作自定义基座运行才会生效

#### 

**本地插件**，是uni-app项目nativeplugins目录(目录不存在则创建)下的原生插件

#####  第一步：获取本地原生插件

*   方式一：插件市场下载免费uni-app原生插件

可以登录[uni原生插件市场<span><span class="sr-only">(opens new window)</span></span>](https://ext.dcloud.net.cn/?cat1=5&cat2=51)，在免费的插件详情页中点击“下载for离线打包”下载原生插件（zip格式），解压到HBuilderX的uni-app项目下的“nativeplugins”目录（如不存在则创建），以下是“DCloud-RichAlert”插件举例，它的下载地址是：https://ext.dcloud.net.cn/plugin?id=36

下载解压后目录结构如下：

![](https://s.poetries.work/uploads/2023/06/9114fad0ae7013b0.png)

*   方式二：开发者自己开发uni-app原生插件

原生插件开发完成后按指定格式压缩为zip包，参考[uni-app原生插件格式说明文档<span><span class="sr-only">(opens new window)</span></span>](https://nativesupport.dcloud.net.cn/NativePlugin/course/package)。 按上图的格式配置到uni-app项目下的“nativeplugins”目录

#####  第二步：配置本地原生插件

在manifest.json -> App原生插件配置 -> 选择本地插件 -> 选择需要打包生效的插件 -> 保存后提交云端打包生效。

![](https://s.poetries.work/uploads/2023/06/cc82b9bd7fccdaea.png)

#####  第三步：开发调试本地原生插件

在vue页面或nvue页面引入这个原生插件。

使用uni.requireNativePlugin的api，参数为插件的id。

```js

    	const dcRichAlert = uni.requireNativePlugin('DCloud-RichAlert')
```

#####  第四步：打包发布

使用自定义基座开发调试本地原生插件后，不可直接将自定义基座apk作为正式版发布。 应该重新提交云端打包（不能勾选“自定义基座”）生成正式版本。

#### 

**云端插件**，已经在插件市场绑定或购买的插件，无需下载插件到工程中，云打包时会直接合并打包原生插件到APP中。（试用插件只能在自定义基座中使用）

#####  第一步：购买或下载uni-app原生插件

使用前需先登录[uni原生插件市场<span><span class="sr-only">(opens new window)</span></span>](https://ext.dcloud.net.cn/?cat1=5&cat2=51)，在插件详情页中购买，免费插件也可以在插件市场0元购。购买后才能够云端打包使用插件。

> 购买插件时请选择正确的appid，以及绑定正确包名

#####  第二步：使用自定义基座打包uni原生插件 （注：请使用真机运行自定义基座）

在manifest.json -> App原生插件配置 -> 选择云端插件 -> 选择需要打包的插件 -> 保存后提交云端打包生效。

![](https://s.poetries.work/uploads/2023/06/e21bf86932d0da66.png)

#####  第三步：开发调试uni-app原生插件

在vue页面或nvue页面引入这个原生插件。

使用uni.requireNativePlugin的api，参数为插件的id。

1.在页面引入原生插件，uni.requireNativePlugin 使用后返回一个对象：

```js

    const dcRichAlert = uni.requireNativePlugin('DCloud-RichAlert')
```

2.使用原生插件

```js

    	dcRichAlert.show({
    		position: 'bottom',
    		title: "提示信息",
    		titleColor: '#FF0000',
    		content: "<a href='https://uniapp.dcloud.io/' value='Hello uni-app'>uni-app</a> 是一个使用 Vue.js 开发跨平台应用的前端框架!\n免费的\n免费的\n免费的\n重要的事情说三遍",
    		contentAlign: 'left',
    		checkBox: {
    			title: '不再提示',
    			isSelected: true
    		},
    		buttons: [{
    			title: '取消'
    		}, {
    			title: '否'
    		}, {
    			title: '确认',
    			titleColor: '#3F51B5'
    		}]
    	}, result => {
    		console.log(result)
    	});
```

##### 第四步：打包发布

使用自定义基座开发调试uni-app原生插件后，不可直接将自定义基座apk作为正式版发布。 应该重新提交云端打包（不能勾选“自定义基座”）生成正式版本。

#####  注意事项

1.可以在 插件市场 查看更多插件，如需开发uni原生插件请参考 [uni原生插件开发文档<span><span class="sr-only">(opens new window)</span></span>](https://nativesupport.dcloud.net.cn/NativePlugin/README)。 2.如果插件需要传递文件路径，则需要传手机文件的绝对路径，可使用 5+ [IO模块<span><span class="sr-only">(opens new window)</span></span>](http://www.html5plus.org/doc/zh_cn/io.html) 的相关 API 得到文件的绝对路径

##  4 JS语法

`uni-app`的js API由标准ECMAScript的js API 和 uni 扩展 API 这两部分组成。

标准ECMAScript的js仅是最基础的js。浏览器基于它扩展了window、document、navigator等对象。小程序也基于标准js扩展了各种wx.xx、my.xx、swan.xx的API。node也扩展了fs等模块。

uni-app基于ECMAScript扩展了uni对象，并且API命名与小程序保持兼容

###  标准js和浏览器js的区别

`uni-app`的js代码，h5端运行于浏览器中。非h5端（包含小程序和App），Android平台运行在v8引擎中，iOS平台运行在iOS自带的jscore引擎中，都没有运行在浏览器或webview里。

非H5端，虽然不支持window、document、navigator等浏览器的js API，但也支持标准ECMAScript。

请注意不要把浏览器里的js扩展对象等价于标准js。

所以uni-app的非H5端，一样支持标准js，支持if、for等语法，支持字符串、数字、时间、布尔值、数组、自定义对象等变量类型及各种处理方法。仅仅是不支持window、document、navigator等浏览器专用对象

###  ES6 支持

uni-app 在支持绝大部分 ES6 API 的同时，也支持了 ES7 的 await/async。

ES6 API 的支持，详见如下表格部分（`x` 表示不支持，无特殊说明则表示支持）：

*   因为iOS上不允许三方js引擎，所以iOS上不区分App、小程序、H5，各端均仅依赖iOS版本。
*   各端Android版本有差异：

<table>

<thead>

<tr>

<th style="text-align: left;">String</th>

<th style="text-align: left;">iOS8</th>

<th style="text-align: left;">iOS9</th>

<th style="text-align: left;">iOS10</th>

<th style="text-align: left;">Android</th>

</tr>

</thead>

<tbody>

<tr>

<td style="text-align: left;">codePointAt</td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

</tr>

<tr>

<td style="text-align: left;">normalize</td>

<td style="text-align: left;">x</td>

<td style="text-align: left;">x</td>

<td style="text-align: left;"></td>

<td style="text-align: left;">仅支持 NFD/NFC</td>

</tr>

<tr>

<td style="text-align: left;">includes</td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

</tr>

<tr>

<td style="text-align: left;">startsWith</td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

</tr>

<tr>

<td style="text-align: left;">endsWith</td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

</tr>

<tr>

<td style="text-align: left;">repeat</td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

</tr>

<tr>

<td style="text-align: left;">String.fromCodePoint</td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

</tr>

</tbody>

</table>

<table>

<thead>

<tr>

<th style="text-align: left;">Array</th>

<th style="text-align: left;">iOS8</th>

<th style="text-align: left;">iOS9</th>

<th style="text-align: left;">iOS10</th>

<th style="text-align: left;">Android</th>

</tr>

</thead>

<tbody>

<tr>

<td style="text-align: left;">copyWithin</td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

</tr>

<tr>

<td style="text-align: left;">find</td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

</tr>

<tr>

<td style="text-align: left;">findIndex</td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

</tr>

<tr>

<td style="text-align: left;">fill</td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

</tr>

<tr>

<td style="text-align: left;">entries</td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

</tr>

<tr>

<td style="text-align: left;">keys</td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

</tr>

<tr>

<td style="text-align: left;">values</td>

<td style="text-align: left;">x</td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;">x</td>

</tr>

<tr>

<td style="text-align: left;">includes</td>

<td style="text-align: left;">x</td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

</tr>

<tr>

<td style="text-align: left;">Array.from</td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

</tr>

<tr>

<td style="text-align: left;">Array.of</td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

</tr>

</tbody>

</table>

<table>

<thead>

<tr>

<th style="text-align: left;">Number</th>

<th style="text-align: left;">iOS8</th>

<th style="text-align: left;">iOS9</th>

<th style="text-align: left;">iOS10</th>

<th style="text-align: left;">Android</th>

</tr>

</thead>

<tbody>

<tr>

<td style="text-align: left;">isFinite</td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

</tr>

<tr>

<td style="text-align: left;">isNaN</td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

</tr>

<tr>

<td style="text-align: left;">parseInt</td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

</tr>

<tr>

<td style="text-align: left;">parseFloat</td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

</tr>

<tr>

<td style="text-align: left;">isInteger</td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

</tr>

<tr>

<td style="text-align: left;">EPSILON</td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

</tr>

<tr>

<td style="text-align: left;">isSafeInteger</td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

</tr>

</tbody>

</table>

<table>

<thead>

<tr>

<th style="text-align: left;">Math</th>

<th style="text-align: left;">iOS8</th>

<th style="text-align: left;">iOS9</th>

<th style="text-align: left;">iOS10</th>

<th style="text-align: left;">Android</th>

</tr>

</thead>

<tbody>

<tr>

<td style="text-align: left;">trunc</td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

</tr>

<tr>

<td style="text-align: left;">sign</td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

</tr>

<tr>

<td style="text-align: left;">cbrt</td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

</tr>

<tr>

<td style="text-align: left;">clz32</td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

</tr>

<tr>

<td style="text-align: left;">imul</td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

</tr>

<tr>

<td style="text-align: left;">fround</td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

</tr>

<tr>

<td style="text-align: left;">hypot</td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

</tr>

<tr>

<td style="text-align: left;">expm1</td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

</tr>

<tr>

<td style="text-align: left;">log1p</td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

</tr>

<tr>

<td style="text-align: left;">log10</td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

</tr>

<tr>

<td style="text-align: left;">log2</td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

</tr>

<tr>

<td style="text-align: left;">sinh</td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

</tr>

<tr>

<td style="text-align: left;">cosh</td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

</tr>

<tr>

<td style="text-align: left;">tanh</td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

</tr>

<tr>

<td style="text-align: left;">asinh</td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

</tr>

<tr>

<td style="text-align: left;">acosh</td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

</tr>

<tr>

<td style="text-align: left;">atanh</td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

</tr>

</tbody>

</table>

<table>

<thead>

<tr>

<th style="text-align: left;">Object</th>

<th style="text-align: left;">iOS8</th>

<th style="text-align: left;">iOS9</th>

<th style="text-align: left;">iOS10</th>

<th style="text-align: left;">Android</th>

</tr>

</thead>

<tbody>

<tr>

<td style="text-align: left;">is</td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

</tr>

<tr>

<td style="text-align: left;">assign</td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

</tr>

<tr>

<td style="text-align: left;">getOwnPropertyDescriptor</td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

</tr>

<tr>

<td style="text-align: left;">keys</td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

</tr>

<tr>

<td style="text-align: left;">getOwnPropertyNames</td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

</tr>

<tr>

<td style="text-align: left;">getOwnPropertySymbols</td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

</tr>

</tbody>

</table>

<table>

<thead>

<tr>

<th style="text-align: left;">Other</th>

<th style="text-align: left;">iOS8</th>

<th style="text-align: left;">iOS9</th>

<th style="text-align: left;">iOS10</th>

<th style="text-align: left;">Android 5</th>

</tr>

</thead>

<tbody>

<tr>

<td style="text-align: left;">Symbol</td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

</tr>

<tr>

<td style="text-align: left;">Set</td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

</tr>

<tr>

<td style="text-align: left;">Map</td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

</tr>

<tr>

<td style="text-align: left;">Proxy</td>

<td style="text-align: left;">x</td>

<td style="text-align: left;">x</td>

<td style="text-align: left;"></td>

<td style="text-align: left;">x</td>

</tr>

<tr>

<td style="text-align: left;">Reflect</td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

</tr>

<tr>

<td style="text-align: left;">Promise</td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

<td style="text-align: left;"></td>

</tr>

</tbody>

</table>

**注意**

*   App端Android支持不依赖Android版本号，即便是Android4.4也是上表数据。因为uni-app的js代码运行在自带的独立jscore中，没有js的浏览器兼容性问题。uni-app的vue页面在Android低端机上只有css浏览器兼容性问题，因为vue页面仍然渲染在webview中，受Android版本影响，太新的css语法在低版本不支持。
*   默认不需要在微信工具里继续开启es6转换。但如果用了微信的wxml自定义组件（wxcomponents目录下），uni-app编译器并不会处理这些文件中的es6代码，需要去微信工具里开启转换。从HBuilderX调起微信工具时，如果发现工程下有wxcomponents目录会自动配置微信工程打开es6转换。

##  5 CSS语法

uni-app 的 css 与 web 的 css 基本一致。本文没有讲解 css 的用法。在你了解 web 的 css 的基础之上，本文讲述一些样式相关的注意事项。

uni-app 有 vue 页面和 nvue 页面。vue 页面是 webview 渲染的、app 端的 nvue 页面是原生渲染的。在 nvue 页面里样式比 web 会限制更多，另见[nvue 样式专项文档<span><span class="sr-only">(opens new window)</span></span>](https://uniapp.dcloud.net.cn/tutorial/nvue-css)

###  尺寸单位

`uni-app` 支持的通用 css 单位包括 px、rpx

*   px 即屏幕像素
*   rpx 即响应式 px，一种根据屏幕宽度自适应的动态单位。以 750 宽的屏幕为基准，750rpx 恰好为屏幕宽度。屏幕变宽，rpx 实际显示效果会等比放大，但在 App（vue2 不含 nvue） 端和 H5（vue2） 端屏幕宽度达到 960px 时，默认将按照 375px 的屏幕宽度进行计算，具体配置参考：[rpx 计算配置<span><span class="sr-only">(opens new window)</span></span>](https://uniapp.dcloud.net.cn/collocation/pages#globalstyle)

vue 页面支持下面这些普通 H5 单位，但在 nvue 里不支持：

*   rem 根字体大小可以通过 [page-meta<span><span class="sr-only">(opens new window)</span></span>](https://uniapp.dcloud.net.cn/component/page-meta#page-meta) 配置
*   vh viewpoint height，视窗高度，1vh 等于视窗高度的 1%
*   vw viewpoint width，视窗宽度，1vw 等于视窗宽度的 1%

nvue 还不支持百分比单位。

App 端，在 pages.json 里的 titleNView 或页面里写的 plus api 中涉及的单位，只支持 px。**注意此时不支持 rpx**

nvue 中，uni-app 模式（[nvue 不同编译模式介绍<span><span class="sr-only">(opens new window)</span></span>](https://ask.dcloud.net.cn/article/36074)）可以使用 px 、rpx，表现与 vue 中基本一致，另外启用 [dynamicRpx<span><span class="sr-only">(opens new window)</span></span>](https://uniapp.dcloud.net.cn/collocation/pages#globalstyle) 后可以适配屏幕大小动态变化。weex 模式目前遵循 weex 的单位，它的单位比较特殊：

*   px:，以 750 宽的屏幕为基准动态计算的长度单位，与 vue 页面中的 rpx 理念相同。（一定要注意 weex 模式的 px，和 vue 里的 px 逻辑不一样。）
*   wx：与设备屏幕宽度无关的长度单位，与 vue 页面中的 px 理念相同

下面对 `rpx` 详细说明：

设计师在提供设计图时，一般只提供一个分辨率的图。

严格按设计图标注的 px 做开发，在不同宽度的手机上界面很容易变形。

而且主要是宽度变形。高度一般因为有滚动条，不容易出问题。由此，引发了较强的动态宽度单位需求。

微信小程序设计了 rpx 解决这个问题。`uni-app` 在 App 端、H5 端都支持了 `rpx`，并且可以配置不同屏幕宽度的计算方式，具体参考：[rpx 计算配置<span><span class="sr-only">(opens new window)</span></span>](https://uniapp.dcloud.io/collocation/pages?id=globalstyle)。

rpx 是相对于基准宽度的单位，可以根据屏幕宽度进行自适应。`uni-app` 规定屏幕基准宽度 750rpx。

开发者可以通过设计稿基准宽度计算页面元素 rpx 值，设计稿 1px 与框架样式 1rpx 转换公式如下：

```js

    设计稿 1px / 设计稿基准宽度 = 框架样式 1rpx / 750rpx
```

换言之，页面元素宽度在 `uni-app` 中的宽度计算公式：

```js

    750 * 元素在设计稿中的宽度 / 设计稿基准宽度
```

**举例说明：**

1   若设计稿宽度为 750px，元素 A 在设计稿上的宽度为 100px，那么元素 A 在 `uni-app` 里面的宽度应该设为：`750 * 100 / 750`，结果为：100rpx。
2   若设计稿宽度为 640px，元素 A 在设计稿上的宽度为 100px，那么元素 A 在 `uni-app` 里面的宽度应该设为：`750 * 100 / 640`，结果为：117rpx。
3   若设计稿宽度为 375px，元素 B 在设计稿上的宽度为 200px，那么元素 B 在 `uni-app` 里面的宽度应该设为：`750 * 200 / 375`，结果为：400rpx。

**Tips**

*   注意 rpx 是和宽度相关的单位，屏幕越宽，该值实际像素越大。如不想根据屏幕宽度缩放，则应该使用 px 单位。
*   如果开发者在字体或高度中也使用了 rpx ，那么需注意这样的写法意味着随着屏幕变宽，字体会变大、高度会变大。如果你需要固定高度，则应该使用 px 。
*   rpx 不支持动态横竖屏切换计算，使用 rpx 建议锁定屏幕方向
*   设计师可以用 iPhone6 作为视觉稿的标准。
*   如果设计稿不是 750px，HBuilderX 提供了自动换算的工具，详见：[HBuilderX中自动转换px为upx<span><span class="sr-only">(opens new window)</span></span>](https://ask.dcloud.net.cn/article/35445)。
*   App 端，在 pages.json 里的 titleNView 或页面里写的 plus api 中涉及的单位，只支持 px，不支持 rpx。
*   早期 uni-app 提供了 upx ，目前已经推荐统一改为 rpx 了，[详见<span><span class="sr-only">(opens new window)</span></span>](http://ask.dcloud.net.cn/article/36130)

###  选择器

目前支持的选择器有：

<table>

<thead>

<tr>

<th style="text-align: left;">选择器</th>

<th style="text-align: left;">样例</th>

<th style="text-align: left;">样例描述</th>

</tr>

</thead>

<tbody>

<tr>

<td style="text-align: left;">.class</td>

<td style="text-align: left;">.intro</td>

<td style="text-align: left;">选择所有拥有 class="intro" 的组件</td>

</tr>

<tr>

<td style="text-align: left;">#id</td>

<td style="text-align: left;">#firstname</td>

<td style="text-align: left;">选择拥有 id="firstname" 的组件</td>

</tr>

<tr>

<td style="text-align: left;">element</td>

<td style="text-align: left;">view</td>

<td style="text-align: left;">选择所有 view 组件</td>

</tr>

<tr>

<td style="text-align: left;">element, element</td>

<td style="text-align: left;">view, checkbox</td>

<td style="text-align: left;">选择所有文档的 view 组件和所有的 checkbox 组件</td>

</tr>

<tr>

<td style="text-align: left;">::after</td>

<td style="text-align: left;">view::after</td>

<td style="text-align: left;">在 view 组件后边插入内容，**仅 vue 页面生效**</td>

</tr>

<tr>

<td style="text-align: left;">::before</td>

<td style="text-align: left;">view::before</td>

<td style="text-align: left;">在 view 组件前边插入内容，**仅 vue 页面生效**</td>

</tr>

</tbody>

</table>

**注意：**

*   在 `uni-app` 中不能使用 `*` 选择器。

*   微信小程序自定义组件中仅支持 class 选择器

*   `page` 相当于 `body` 节点，例如：

    ```js

        <!-- 设置页面背景颜色，使用 scoped 会导致失效 -- > 
          page {
        	background-color: #ccc;
        }

    </div>

###  全局样式与局部样式

定义在 App.vue 中的样式为全局样式，作用于每一个页面。在 pages 目录下 的 vue 文件中定义的样式为局部样式，只作用在对应的页面，并会覆盖 App.vue 中相同的选择器。

**注意：**

*   App.vue 中通过 `@import` 语句可以导入外联样式，一样作用于每一个页面。
*   nvue 页面暂不支持全局样式

###  CSS 变量

uni-app 提供内置 CSS 变量

<table>

<thead>

<tr>

<th style="text-align: left;">CSS 变量</th>

<th style="text-align: left;">描述</th>

<th style="text-align: left;">App</th>

<th style="text-align: left;">小程序</th>

<th style="text-align: left;">H5</th>

</tr>

</thead>

<tbody>

<tr>

<td style="text-align: left;">`--status-bar-height`</td>

<td style="text-align: left;">系统状态栏高度</td>

<td style="text-align: left;">[系统状态栏高度<span><span class="sr-only">(opens new window)</span></span>](http://www.html5plus.org/doc/zh_cn/navigator.html#plus.navigator.getStatusbarHeight)、nvue 注意见下</td>

<td style="text-align: left;">25px</td>

<td style="text-align: left;">0</td>

</tr>

<tr>

<td style="text-align: left;">`--window-top`</td>

<td style="text-align: left;">内容区域距离顶部的距离</td>

<td style="text-align: left;">`0`</td>

<td style="text-align: left;">0</td>

<td style="text-align: left;">NavigationBar 的高度</td>

</tr>

<tr>

<td style="text-align: left;">`--window-bottom`</td>

<td style="text-align: left;">内容区域距离底部的距离</td>

<td style="text-align: left;">`0`</td>

<td style="text-align: left;">0</td>

<td style="text-align: left;">TabBar 的高度</td>

</tr>

</tbody>

</table>

**注意：**

*   `var(--status-bar-height)` 此变量在微信小程序环境为固定 `25px`，在 App 里为手机实际状态栏高度。
*   当设置 `"navigationStyle":"custom"` 取消原生导航栏后，由于窗体为沉浸式，占据了状态栏位置。此时可以使用一个高度为 `var(--status-bar-height)` 的 view 放在页面顶部，避免页面内容出现在状态栏。
*   由于在 H5 端，不存在原生导航栏和 tabbar，也是前端 div 模拟。如果设置了一个固定位置的居底 view，在小程序和 App 端是在 tabbar 上方，但在 H5 端会与 tabbar 重叠。此时可使用`--window-bottom`，不管在哪个端，都是固定在 tabbar 上方。
*   目前 nvue 在 App 端，还不支持 `--status-bar-height`变量，替代方案是在页面 onLoad 时通过 uni.getSystemInfoSync().statusBarHeight 获取状态栏高度，然后通过 style 绑定方式给占位 view 设定高度

**代码块**

快速书写 css 变量的方法是：在 css 中敲 hei，在候选助手中即可看到 3 个 css 变量。（HBuilderX 1.9.6 以上支持）

示例 1 - 普通页面使用 css 变量

```js

    <template>
    	<!-- HBuilderX 2.6.3+ 新增 page-meta, 详情：https://uniapp.dcloud.io/component/page-meta -->
    	<page-meta>
    		<navigation-bar />
    	</page-meta>
    	<view>
    		<view class="status_bar">
    			<!-- 这里是状态栏 -->
    		</view>
    		<view>状态栏下的文字</view>
    	</view>
    </template>
    <style>
    	.status_bar {
    		height: var(--status-bar-height);
    		width: 100%;
    	}
    </style>
```

```js

    <template>
    	<view>
    		<view class="toTop">
    			<!-- 这里可以放一个向上箭头，它距离底部tabbar上浮10px-->
    		</view>
    	</view>
    </template>
    <style>
    	.toTop {
    		bottom: calc(var(--window-bottom) + 10px);
    	}
    </style>
```

示例 2 - nvue 页面获取状态栏高度

```js

    <template>
    	<view class="content">
    		<view :style="{ height: iStatusBarHeight + 'px'}"></view>
    	</view>
    </template>

    <script>
    	export default {
    		data() {
    			return {
    				iStatusBarHeight: 0,
    			};
    		},
    		onLoad() {
    			this.iStatusBarHeight = uni.getSystemInfoSync().statusBarHeight;
    		},
    	};
    </script>
```

###  固定值

`uni-app` 中以下组件的高度是固定的，不可修改：

<table>

<thead>

<tr>

<th style="text-align: left;">组件</th>

<th style="text-align: left;">描述</th>

<th style="text-align: left;">App</th>

<th style="text-align: left;">H5</th>

</tr>

</thead>

<tbody>

<tr>

<td style="text-align: left;">NavigationBar</td>

<td style="text-align: left;">导航栏</td>

<td style="text-align: left;">44px</td>

<td style="text-align: left;">44px</td>

</tr>

<tr>

<td style="text-align: left;">TabBar</td>

<td style="text-align: left;">底部选项卡</td>

<td style="text-align: left;">HBuilderX 2.3.4 之前为 56px，2.3.4 起和 H5 调为一致，统一为 50px。（但可以自主更改高度）</td>

<td style="text-align: left;">50px</td>

</tr>

</tbody>

</table>

各小程序平台，包括同小程序平台的 iOS 和 Android 的高度也不一样

###  Flex 布局

为支持跨平台，框架建议使用 Flex 布局

###  背景图片

`uni-app` 支持使用在 css 里设置背景图片，使用方式与普通 `web` 项目大体相同，但需要注意以下几点：

*   支持 base64 格式图片。

*   支持网络路径图片。

*   小程序不支持在 css 中使用本地文件，包括本地的背景图和字体文件。需以 base64 方式方可使用。

*   使用本地路径背景图片需注意：

    1   为方便开发者，在背景图片小于 40kb 时，`uni-app` 编译到不支持本地背景图的平台时，会自动将其转化为 base64 格式；
    2   图片大于等于 40kb，会有性能问题，不建议使用太大的背景图，如开发者必须使用，则需自己将其转换为 base64 格式使用，或将其挪到服务器上，从网络地址引用。
    3   本地背景图片的引用路径推荐使用以 ~@ 开头的绝对路径。

    ```js

        .test2 {
        	background-image: url('~@/static/logo.png');
        }

    </div>

**注意**

*   微信小程序不支持相对路径（真机不支持，开发工具支持）

###  字体图标

`uni-app` 支持使用字体图标，使用方式与普通 `web` 项目相同，需要注意以下几点：

*   支持 base64 格式字体图标。

*   支持网络路径字体图标。

*   小程序不支持在 css 中使用本地文件，包括本地的背景图和字体文件。需以 base64 方式方可使用。

*   网络路径必须加协议头 `https`。

*   从 [http://www.iconfont.cn<span><span class="sr-only">(opens new window)</span></span>](http://www.iconfont.cn/) 上拷贝的代码，默认是没加协议头的。

*   从 [http://www.iconfont.cn<span><span class="sr-only">(opens new window)</span></span>](http://www.iconfont.cn/) 上下载的字体文件，都是同名字体（字体名都叫 iconfont，安装字体文件时可以看到），在 nvue 内使用时需要注意，此字体名重复可能会显示不正常，可以使用工具修改。

*   使用本地路径图标字体需注意：

    1   为方便开发者，在字体文件小于 40kb 时，`uni-app` 会自动将其转化为 base64 格式；
    2   字体文件大于等于 40kb，仍转换为 base64 方式使用的话可能有性能问题，如开发者必须使用，则需自己将其转换为 base64 格式使用，或将其挪到服务器上，从网络地址引用；
    3   字体文件的引用路径推荐使用以 ~@ 开头的绝对路径。

    ```js

        @font-face {
        	font-family: test1-icon;
        	src: url('~@/static/iconfont.ttf');
        }

    </div>

`nvue`中不可直接使用 css 的方式引入字体文件，需要使用以下方式在 js 内引入。nvue 内不支持本地路径引入字体，请使用网络链接或者`base64`形式。**`src`字段的`url`的括号内一定要使用单引号。**

```js

    var domModule = weex.requireModule('dom');
    domModule.addRule('fontFace', {
    	fontFamily: 'fontFamilyName',
    	src: "url('https://...')",
    });
```

**示例：**

```js

    <template>
    	<view>
    		<view>
    			<text class="test">&#xe600;</text>
    			<text class="test">&#xe687;</text>
    			<text class="test">&#xe60b;</text>
    		</view>
    	</view>
    </template>
    <style>
    	@font-face {
    		font-family: 'iconfont';
    		src: url('https://at.alicdn.com/t/font_865816_17gjspmmrkti.ttf') format('truetype');
    	}
    	.test {
    		font-family: iconfont;
    		margin-left: 20rpx;
    	}
    </style>
```

##  6 uniapp中使用Vue2语法注意

###  基础

####  在 uni-app 中使用vue的差异

`uni-app` 在发布到H5时支持所有vue的语法；发布到App和小程序时，由于平台限制，无法实现全部vue语法，但 `uni-app` 仍是对vue语法支持度最高的跨端框架。

相比Web平台， Vue.js 在 `uni-app` 中使用差异主要集中在两个方面：

*   新增：`uni-app` 除了支持Vue实例的生命周期，还支持[应用生命周期<span><span class="sr-only">(opens new window)</span></span>](https://uniapp.dcloud.io/collocation/App#%E5%BA%94%E7%94%A8%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F)以及[页面生命周期<span><span class="sr-only">(opens new window)</span></span>](https://uniapp.dcloud.io/tutorial/page#lifecycle)。
*   受限：相比web平台，在小程序和App端部分功能受限，[具体见<span><span class="sr-only">(opens new window)</span></span>](https://uniapp.dcloud.net.cn/vue3-api)。

`uni-app` 项目对 vue 3.0 的支持版本情况如下：

*   Web平台：支持。
*   小程序平台：`HBuilderX 3.3.3+` 编译器改为 `vite`，之前版本的编译器为`webpack`。
*   App 平台：`uni-app 3.2.5+`支持。`HBuilderX 3.3.13` 起 `nvue`编译器升级为`vite`。

**注意事项**

*   vue3 响应式基于 `Proxy` 实现，不支持`iOS9`和`ie11`。
*   暂不支持新增的 `Teleport`,`Suspense` 组件。
*   目前 `HBuilderX 3.2` 起已预置，之前的版本只能使用cli方式

####  v-show

`v-show` 是一个根据条件展示元素选项的指令 。用法大致和 `v-if` 一样：

```js

    	<view v-show="ok">Hello!</view>
```

不同的是带有 v-show 的元素始终会被渲染并保留在 DOM 中。v-show 只是简单地切换元素的 `CSS` 属性的 `display` 。

> 注意，v-show 不支持 template 元素，也不支持 v-else。nvue 页面不支持 v-show

####  v-for

*   在H5平台 使用 v-for 循环整数时和其他平台存在差异，如 `v-for="(item, index) in 10"` 中，在H5平台 item 从 1 开始，其他平台 item 从 0 开始，可使用第二个参数 index 来保持一致。
*   在非H5平台 循环对象时不支持第三个参数，如 `v-for="(value, name, index) in object"` 中，index 参数是不支持的

####  v-html

更新元素的 `innerHTML` 。

*   注意：**内容按普通 HTML 插入 - 不会作为 Vue 模板进行编译。**
*   如果试图使用 v-html 组合模板，可以重新考虑是否通过使用组件来替代。
*   App端和H5端支持 `v-html` ，微信小程序会被转为 `rich-text`，其他端不支持 `v-html` 。

跨端的富文本处理方案详见：https://ask.dcloud.net.cn/article/35772

```js

    	<template>
    		<view>
    			<view v-html="rawHtml"></view>
    		</view>
    	</template>
    	<script>
    		export default {
    			data() {
    				return {
    					rawHtml: '<div style="text-align:center;background-color: #007AFF;"><div >我是内容</div><img src="https://web-assets.dcloud.net.cn/unidoc/zh/uni@2x.png"/></div>'
    				}
    			}
    		}
    	</script>
```

####  Class 与 Style 绑定

> 小程序端不支持 `classObject` 和 `styleObject` 语法。

```js

    	<template>
    		<view>
    			<view :class="activeClass">hello uni-app</view>
    			<view :style="styleObject">hello uni-app</view>
    		</view>
    	</template>
    	<script>
    		export default {
    			data() {
    				return {
    					activeClass: {
    						'active': true,
    						'text-danger': false
    					},
    					styleObject: {
    						color: 'red',
    						fontSize: '20px'
    					}
    				}
    			}
    		}
    	</script>
    	<style>
    		.active {
    			background-color: #007AFF;
    		}
    		.text-danger {
    			font-size: 60rpx;
    			color: #DD524D;
    		}
    	</style>
```

####  事件修饰符

修饰符 (modifier) 是以半角句号   指明的特殊后缀，用于指出一个指令应该以特殊方式绑定。例如，`.prevent` 修饰符告诉 @事件对于触发的事件调用 `event.preventDefault()`：

@事件（v-on）提供了事件修饰符:

*   `.stop`: 各平台均支持， 使用时会阻止事件冒泡，在非 H5 端同时也会阻止事件的默认行为
*   `.native`: 监听原生事件，各平台均支持
*   `.prevent`: 仅在 H5 平台支持
*   `.capture`: 仅在 H5 平台支持
*   `.self`: 仅在 H5 平台支持
*   `.once`: 仅在 H5 平台支持
*   `.passive`: 仅在 H5 平台支持

```js

    	<!-- 阻止单击事件继续传播 -->
    	<view @click.stop="doThis"></view>
```

> 使用修饰符时，顺序很重要；相应的代码会以同样的顺序产生。因此，用 `@click.prevent.self` 会阻止所有的点击，而 `@click.self.prevent` 只会阻止对元素自身的点击。

**注意**

*   为兼容各端，事件需使用 **@** 的方式绑定，请勿使用小程序端的 `bind` 和 `catch` 进行事件绑定；也不能在 JS 中使用`event.preventDefault()`和`event.stopPropagation()`方法；
*   若需要禁止蒙版下的页面滚动，可使用 `@touchmove.stop.prevent="moveHandle"`，`moveHandle` 可以用来处理 `touchmove` 的事件，也可以是一个空函数。

```js

    <view class="mask" @touchmove.stop.prevent="moveHandle"></view>
```

*   按键修饰符：`uni-app` 运行在手机端，没有键盘事件，所以不支持按键修饰符

####  表单控件绑定

你可以用 v-model 指令在表单 `input`、`textarea` 及 `select` 元素上创建双向数据绑定。它会根据控件类型自动选取正确的方法来更新元素。尽管有些神奇，但 `v-model` 本质上不过是语法糖。它负责监听用户的输入事件以更新数据，并对一些极端场景进行一些特殊处理。

> v-model 会忽略所有表单元素的 `value`、`checked`、`selected` attribute 的初始值而总是将 Vue 实例的数据作为数据来源。你应该通过 JavaScript 在组件的 data 选项中声明初始值。

建议开发过程中直接使用 `uni-app`：[表单组件<span><span class="sr-only">(opens new window)</span></span>](https://uniapp.dcloud.io/component/button)

**用法示例：**

*   H5 的 `select` 标签用 `picker` 组件进行代替

```js

    <template>
    		<view>
    			<picker @change="bindPickerChange" :value="index" :range="array">
    				<view class="picker">
    					当前选择：{{array[index]}}
    				</view>
    			</picker>
    		</view>
    	</template>
    	<script>
    		export default {
    			data() {
    				return {
    					index: 0,
    					array: ['A', 'B', 'C']
    				}
    			},
    			methods: {
    				bindPickerChange(e) {
    					console.log(e)
    				}
    			}
    		}
    	</script>
```

*   表单元素 `radio` 用 `radio-group` 组件进行代替

```js

    	<template>
    		<view>
    			<radio-group class="radio-group" @change="radioChange">
    				<label class="radio" v-for="(item, index) in items" :key="item.name">
    					<radio :value="item.name" :checked="item.checked" /> {{item.value}}
    				</label>
    			</radio-group>
    		</view>
    	</template>
    	<script>
    		export default {
    			data() {
    				return {
    					items: [{
    							name: 'USA',
    							value: '美国'
    						},
    						{
    							name: 'CHN',
    							value: '中国',
    							checked: 'true'
    						},
    						{
    							name: 'BRA',
    							value: '巴西'
    						},
    						{
    							name: 'JPN',
    							value: '日本'
    						},
    						{
    							name: 'ENG',
    							value: '英国'
    						},
    						{
    							name: 'TUR',
    							value: '法国'
    						}
    					]
    				}
    			},
    			methods: {
    				radioChange(e) {
    					console.log('radio发生change事件，携带value值为：', e.target.value)
    				}
    			}
    		}
    	</script>
```

####  计算属性 vs 侦听属性

Vue 提供了一种更通用的方式来观察和响应 Vue 实例上的数据变动：**侦听属性**。当你有一些数据需要随着其它数据变动而变动时，你很容易滥用 `watch` 。然而，通常更好的做法是使用计算属性而不是命令式的 `watch` 回调。

```js

    	export default {
    		data() {
    			return {
    				firstName: 'Foo',
    				lastName: 'Bar',
    				fullName: 'Foo Bar'
    			}
    		},
    		watch: {
    			firstName: function(val) {
    				this.fullName = val + ' ' + this.lastName
    			},
    			lastName: function(val) {
    				this.fullName = this.firstName + ' ' + val
    			}
    		}
    	}
```

上面代码是命令式且重复的。将它与计算属性的版本进行比较：

```js

    	export default {
    		data() {
    			return {
    				firstName: 'Foo',
    				lastName: 'Bar'
    			}
    		},
    		computed: {
    		    fullName(){
    				return this.firstName + ' ' + this.lastName
    		    }
    		}
    	}
```

####  侦听器watch侦听器watch

*   类型：{ [key: string]: string | Function | Object | Array }
*   一个对象，键是需要观察的表达式，值是对应回调函数。值也可以是方法名，或者包含选项的对象。Vue 实例将会在实例化时调用 `$watch()` ，遍历 `watch` 对象的每一个 `property` 。
*   示例：

```js

    <template>
    	<view>
    		<input type="text" v-model="word">
    	</view>
    </template>
    <script>
    	export default {
    		data() {
    			return {
    				word: 'word'
    			}
    		},
    		watch: {
    			// 使用watch来响应数据的变化
    			word(newVal, oldVal) {
    				console.log('最新值是：'+newVal,"原来的值是："+ oldVal);
    			}
    		},
    	}
    </script>
```

示例：

```js

    <script>
    	export default {
    		data() {
    			return {
    				a: 1,
    				b: 2,
    				c: 3,
    				d: 4,
    				e: {
    					f: {
    						g: 5
    					}
    				}
    			}
    		},
    		watch: {
    			a: function(val, oldVal) {
    				console.log('new: %s, old: %s', val, oldVal)
    			},
    			// 方法名
    			b: 'someMethod',
    			// 该回调会在任何被侦听的对象的 property 改变时被调用，不论其被嵌套多深
    			c: {
    				handler: function(val, oldVal) { /* ..  */ },
    				deep: true
    			},
    			// 该回调将会在侦听开始之后被立即调用
    			d: {
    				handler: 'someMethod',
    				immediate: true
    			},
    			// 你可以传入回调数组，它们会被逐一调用
    			e: [
    				'handle1',
    				function handle2(val, oldVal) { /* ..  */ },
    				{
    					handler: function handle3(val, oldVal) { /* ..  */ },
    					/* ..  */
    				}
    			],
    			// watch vm.e.f's value: {g: 5}
    			'e.f': function(val, oldVal) { /* ..  */ }
    		}
    	}
    </script>
```

###  组件

基础组件是内置在uni-app框架中的，包括view、text、input、button、video等几十个基础组件，列表详见：[uni-app基础组件<span><span class="sr-only">(opens new window)</span></span>](https://uniapp.dcloud.net.cn/component/README?id=%E5%9F%BA%E7%A1%80%E7%BB%84%E4%BB%B6)

但仅有基础组件是不够用的，实际开发中会有很多封装的组件。

比如我们需要一个五角星点击评分的组件，在DCloud的插件市场里可以获取到：https://ext.dcloud.net.cn/plugin?id=33

把这个uni-rate组件导入到你的uni-app项目下，在需要的vue页面里引用它，就可以在指定的地方显示出这个五角星组件。

```js

    	<!-- 在index.vue页面引用 uni-rate 组件-->
    	<template>
    		<view>
    			<uni-rate></uni-rate><!-- 这里会显示一个五角星，并且点击后会自动亮星 -->
    		</view>
    	</template>
```

####  注册

在注册一个组件的时候，我们始终需要给它一个名字。 定义组件名的方式有两种：

*   使用 kebab-case

当使用 kebab-case (短横线分隔命名) 定义一个组件时，你也必须在引用这个自定义元素时使用 kebab-case，例如 `<my-component-name>`。

*   使用 PascalCase

当使用 PascalCase (首字母大写命名) 定义一个组件时，你在引用这个自定义元素时两种命名法都可以使用。 也就是说 `<my-component-name>` 和 `<MyComponentName>` 都是可接受的。

在uni-app工程根目录下的 `components` 目录，创建并存放自定义组件：

```js

    │─components            	符合vue组件规范的uni-app组件目录
    │  └─componentA         	符合‘components/组件名称/组件名称.vue’目录结构，easycom方式可直接使用组件
    │  		└─componentA.vue    可复用的componentA组件
    │  └─component-a.vue      可复用的component-a组件
```

####  全局注册

`uni-app` 支持配置全局组件，需在 `main.js` 里进行全局注册，注册后就可在所有页面里使用该组件。

**注意**

*   Vue.component 的第一个参数必须是静态的字符串。
*   nvue 页面暂不支持全局组件。

`main.js` 里进行全局导入和注册

```js

    	import Vue from 'vue'
    	import pageHead from './components/page-head.vue'
    	Vue.component('page-head',pageHead)
```

`index.vue` 里可直接使用组件

```js

    	<template>
    		<view>
    			<page-head></page-head>
    		</view>
    	</template>
```

####  局部注册

局部注册之前，在需要引用该组件的页面，导入你想使用的组件。

**页面引入组件方式**

如下通过两种方式导入一个角标的组件库，[详见<span><span class="sr-only">(opens new window)</span></span>](https://ext.dcloud.net.cn/plugin?id=21)，推荐使用 `easycom` 方式引入。

1   **传统vue规范：** 在 index.vue 页面中，通过 `import` 方式引入组件 ，在 `components` 选项中定义你想要使用的组件。

```js

    	<!-- 在index.vue引入 uni-badge 组件-->
    	<template>
    		<view>
    			<uni-badge text="1"></uni-badge><!-- 3.使用组件 -->
    		</view>
    	</template>
    	<script>
    		import uniBadge from '@/components/uni-badge/uni-badge.vue';//1.导入组件（这步属于传统vue规范，但在uni-app的easycom下可以省略这步）
    		export default {
    			components:{uniBadge }//2.注册组件（这步属于传统vue规范，但在uni-app的easycom下可以省略这步） 
    		}
    	</script>
```

对于 `components` 对象中的每个 property 来说，其 property 名就是自定义元素的名字，其 property 值就是这个组件的选项对象。

在对象中放一个类似 uniBadge 的变量名其实是 uniBadge : uniBadge 的缩写，即这个变量名同时是：

*   用在模板中的自定义元素的名称
*   包含了这个组件选项的变量名(仅支持驼峰法命名)

1   **通过uni-app的[easycom<span><span class="sr-only">(opens new window)</span></span>](https://uniapp.dcloud.io/collocation/pages?id=easycom)：** 将组件引入精简为一步。只要组件安装在项目的 `components` 目录下，并符合 `components/组件名称/组件名称.vue` 目录结构。就可以不用引用、注册，直接在页面中使用。

```js

    	<!-- 在index.vue引入 uni-badge 组件-->
    	<template>
    		<view>
    			<uni-badge text="1"></uni-badge><!-- 3.使用组件 -->
    		</view>
    	</template>
    	<script>
    		// 这里不用import引入，也不需要在components内注册uni-badge组件。template里就可以直接用
    		export default {
    			data() {
    				return {
    				}
    			}
    		}
    	</script>
```

*   **easycom是自动开启的**，不需要手动开启，有需求时可以在 `pages.json` 的 `easycom` 节点进行个性化设置，[详见<span><span class="sr-only">(opens new window)</span></span>](https://uniapp.dcloud.io/collocation/pages?id=easycom)。
*   不管components目录下安装了多少组件，easycom打包后会自动剔除没有使用的组件，对组件库的使用尤为友好。

组件是 `vue` 技术中非常重要的部分，组件使得与ui相关的轮子可以方便的制造和共享，进而使得 `vue` 使用者的开发效率大幅提升。

`uni-app` 搭建了组件的插件市场，有很多现成的组件，若下载符合components/组件名称/组件名称.vue目录结构的组件，均可直接使用。[uni-app插件市场<span><span class="sr-only">(opens new window)</span></span>](https://ext.dcloud.net.cn/)

> `uni-app`只支持 vue单文件组件（.vue 组件）。其他的诸如：动态组件，自定义 `render` ，和 `<script type="text/x-template">` 字符串模版等，在非H5端不支持

####  ref

被用来给元素或子组件注册引用信息，引用信息将会注册在父组件的 `$refs` 对象上。

如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素；如果用在子组件上，引用就指向组件实例：

```js

    <!-- 非H5端不支持通过this.$refs.content来获取view实例 -->
    <view ref="content">hello</view>

    <!-- 支持通过this.$refs.child来获取child-component实例 -->
    <child-component ref="child"></child-component>
```

当 `ref` 和 `v-for` 一起用于元素或组件的时候，引用信息将是包含 DOM 节点或组件实例的数组

####  小程序不支持列表

*   作用域插槽（HBuilderX 3.1.19 以下仅支持解构插槽且不可使用作用域外数据以及使用复杂的表达式）
*   动态组件
*   异步组件
*   `inline-template`
*   `X-Templates`
*   `keep-alive`（App端也未支持）
*   `transition` （可使用 `animation` 或 CSS 动画替代）

####  命名限制

在 uni-app 中以下这些作为保留关键字，不可作为组件名。

*   `a`
*   `canvas`
*   `cell`
*   `content`
*   `countdown`
*   `datepicker`
*   `div`
*   `element`
*   `embed`
*   `header`
*   `image`
*   `img`
*   `indicator`
*   `input`
*   `link`
*   `list`
*   `loading-indicator`
*   `loading`
*   `marquee`
*   `meta`
*   `refresh`
*   `richtext`
*   `script`
*   `scrollable`
*   `scroller`
*   `select`
*   `slider-neighbor`
*   `slider`
*   `slot`
*   `span`
*   `spinner`
*   `style`
*   `svg`
*   `switch`
*   `tabbar`
*   `tabheader`
*   `template`
*   `text`
*   `textarea`
*   `timepicker`
*   `transition-group`
*   `transition`
*   `video`
*   `view`
*   `web`

Tips

*   除以上列表中的名称外，标准的 HTML 及 SVG 标签名也不能作为组件名。
*   在百度小程序中使用时，不要在 data 内使用 hidden ，可能会导致渲染错误。
*   methods中不可使用与生命周期同名的方法名

###  API

####  全局配置

<table>

<thead>

<tr>

<th>Vue 全局配置</th>

<th>描述</th>

<th>H5</th>

<th>App端</th>

<th>小程序</th>

<th>说明</th>

</tr>

</thead>

<tbody>

<tr>

<td>Vue.config.silent</td>

<td>取消 Vue 所有的日志与警告 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#silent)</td>

<td>√</td>

<td>√</td>

<td>√</td>

<td></td>

</tr>

<tr>

<td>Vue.config.optionMergeStrategies</td>

<td>自定义合并策略的选项 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#optionMergeStrategies)</td>

<td>√</td>

<td>√</td>

<td>√</td>

<td></td>

</tr>

<tr>

<td>Vue.config.devtools</td>

<td>配置是否允许 vue-devtools 检查代码 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#devtools)</td>

<td>√</td>

<td>x</td>

<td>x</td>

<td>只在Web环境下支持</td>

</tr>

<tr>

<td>Vue.config.errorHandler</td>

<td>指定组件的渲染和观察期间未捕获错误的处理函数 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#errorHandler)</td>

<td>√</td>

<td>√</td>

<td>√</td>

<td></td>

</tr>

<tr>

<td>Vue.config.warnHandler</td>

<td>为 Vue 的运行时警告赋予一个自定义处理函数 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#warnHandler)</td>

<td>√</td>

<td>√</td>

<td>√</td>

<td></td>

</tr>

<tr>

<td>Vue.config.ignoredElements</td>

<td>须使 Vue 忽略在 Vue 之外的自定义元素 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#ignoredElements)</td>

<td>√</td>

<td>√</td>

<td>√</td>

<td>强烈不推荐，会覆盖uni-app框架配置的内置组件</td>

</tr>

<tr>

<td>Vue.config.keyCodes</td>

<td>给 v-on 自定义键位别名 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#keyCodes)</td>

<td>√</td>

<td>x</td>

<td>x</td>

<td></td>

</tr>

<tr>

<td>Vue.config.performance</td>

<td>设置为 true 以在浏览器开发工具的性能/时间线面板中启用对组件初始化、编译、渲染和打补丁的性能追踪 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#performance)</td>

<td>√</td>

<td>x</td>

<td>x</td>

<td>只在Web环境下支持</td>

</tr>

<tr>

<td>Vue.config.productionTip</td>

<td>设置为 false 以阻止 vue 在启动时生成生产提示 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#productionTip)</td>

<td>√</td>

<td>√</td>

<td>√</td>

<td>-</td>

</tr>

</tbody>

</table>

####  全局 API

<table>

<thead>

<tr>

<th>Vue 全局 API</th>

<th>描述</th>

<th>H5</th>

<th>App端</th>

<th>小程序</th>

<th>说明</th>

</tr>

</thead>

<tbody>

<tr>

<td>Vue.extend</td>

<td>使用基础 Vue 构造器，创建一个“子类” [详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#Vue-extend)</td>

<td>√</td>

<td>√</td>

<td>x</td>

<td>不可作为组件使用</td>

</tr>

<tr>

<td>Vue.nextTick</td>

<td>在下次 DOM 更新循环结束之后执行延迟回调 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#Vue-nextTick)</td>

<td>√</td>

<td>x</td>

<td>x</td>

<td></td>

</tr>

<tr>

<td>Vue.set</td>

<td>向响应式对象中添加一个 property，并确保这个新 property 同样是响应式的，且触发视图更新 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#Vue-set)</td>

<td>√</td>

<td>√</td>

<td>√</td>

<td></td>

</tr>

<tr>

<td>Vue.delete</td>

<td>删除对象的 property。如果对象是响应式的，确保删除能触发更新视图 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#Vue-delete)</td>

<td>√</td>

<td>√</td>

<td>√</td>

<td></td>

</tr>

<tr>

<td>Vue.directive</td>

<td>注册或获取全局指令 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#Vue-directive)</td>

<td>√</td>

<td>√</td>

<td>x</td>

<td></td>

</tr>

<tr>

<td>Vue.filter</td>

<td>注册或获取全局过滤器 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#Vue-filter)</td>

<td>√</td>

<td>√</td>

<td>x</td>

<td></td>

</tr>

<tr>

<td>Vue.component</td>

<td>注册或获取全局组件。注册还会自动使用给定的 id 设置组件的名称 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#Vue-component)</td>

<td>√</td>

<td>√</td>

<td>√</td>

<td></td>

</tr>

<tr>

<td>Vue.use</td>

<td>安装 Vue.js 插件 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#Vue-use)</td>

<td>√</td>

<td>√</td>

<td>√</td>

<td></td>

</tr>

<tr>

<td>Vue.mixin</td>

<td>全局注册一个混入，影响注册之后所有创建的每个 Vue 实例 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#Vue-mixin)</td>

<td>√</td>

<td>√</td>

<td>√</td>

<td></td>

</tr>

<tr>

<td>Vue.version</td>

<td>提供字符串形式的 Vue 安装版本号 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#Vue-version)</td>

<td>√</td>

<td>√</td>

<td>√</td>

<td></td>

</tr>

<tr>

<td>Vue.compile</td>

<td>将一个模板字符串编译成 render 函数。只在完整版时可用。[详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#Vue-compile)</td>

<td>√</td>

<td>x</td>

<td>x</td>

<td>uni-app使用的vue是只包含运行时的版本</td>

</tr>

</tbody>

</table>

####  选项

<table>

<thead>

<tr>

<th>Vue 选项</th>

<th>描述</th>

<th>H5</th>

<th>App端</th>

<th>小程序</th>

<th>说明</th>

</tr>

</thead>

<tbody>

<tr>

<td>data</td>

<td>Vue 实例的数据对象 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#data)</td>

<td>√</td>

<td>√</td>

<td>√</td>

<td></td>

</tr>

<tr>

<td>props</td>

<td>props 可以是数组或对象，用于接收来自父组件的数据 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#props)</td>

<td>√</td>

<td>√</td>

<td>√</td>

<td></td>

</tr>

<tr>

<td>propsData</td>

<td>创建实例时传递 props。主要作用是方便测试 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#propsData)</td>

<td>√</td>

<td>√</td>

<td>√</td>

<td></td>

</tr>

<tr>

<td>computed</td>

<td>计算属性将被混入到 Vue 实例中 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#computed)</td>

<td>√</td>

<td>√</td>

<td>√</td>

<td></td>

</tr>

<tr>

<td>methods</td>

<td>methods 将被混入到 Vue 实例中 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#methods)</td>

<td>√</td>

<td>√</td>

<td>√</td>

<td></td>

</tr>

<tr>

<td>watch</td>

<td>一个对象，键是需要观察的表达式，值是对应回调函数 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#watch)</td>

<td>√</td>

<td>√</td>

<td>√</td>

<td></td>

</tr>

<tr>

<td>el</td>

<td>提供一个在页面上已存在的 DOM 元素作为 Vue 实例的挂载目标 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#el)</td>

<td>√</td>

<td>x</td>

<td>x</td>

<td></td>

</tr>

<tr>

<td>template</td>

<td>一个字符串模板作为 Vue 实例的标识使用 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#template)</td>

<td>√</td>

<td>x</td>

<td>x</td>

<td>uni-app使用的vue是只包含运行时的版本</td>

</tr>

<tr>

<td>render</td>

<td>字符串模板的代替方案，该渲染函数接收一个 createElement 方法作为第一个参数用来创建 VNode。[详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#render)</td>

<td>√</td>

<td>x</td>

<td>x</td>

<td></td>

</tr>

<tr>

<td>renderError</td>

<td>当 render 函数遭遇错误时，提供另外一种渲染输出，只在开发者环境下工作 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#renderError)</td>

<td>√</td>

<td>x</td>

<td>x</td>

<td></td>

</tr>

<tr>

<td>directives</td>

<td>包含 Vue 实例可用指令的哈希表 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#directives)</td>

<td>√</td>

<td>√</td>

<td>x</td>

<td></td>

</tr>

<tr>

<td>filters</td>

<td>包含 Vue 实例可用过滤器的哈希表 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#filters)</td>

<td>√</td>

<td>√</td>

<td>√</td>

<td></td>

</tr>

<tr>

<td>components</td>

<td>包含 Vue 实例可用组件的哈希表 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#components)</td>

<td>√</td>

<td>√</td>

<td>√</td>

<td></td>

</tr>

<tr>

<td>parent</td>

<td>指定已创建的实例之父实例，在两者之间建立父子关系 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#parent)</td>

<td>√</td>

<td>√</td>

<td>√</td>

<td>不推荐</td>

</tr>

<tr>

<td>mixins</td>

<td>选项接收一个混入对象的数组 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#mixins)</td>

<td>√</td>

<td>√</td>

<td>√</td>

<td></td>

</tr>

<tr>

<td>extends</td>

<td>允许声明扩展另一个组件 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#extends)</td>

<td>√</td>

<td>√</td>

<td>√</td>

<td></td>

</tr>

<tr>

<td>provide/inject</td>

<td>允许一个祖先组件向其所有子孙后代注入一个依赖，不论组件层次有多深，并在其上下游关系成立的时间里始终生效 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#provide-inject)</td>

<td>√</td>

<td>√</td>

<td>√</td>

<td></td>

</tr>

<tr>

<td>name</td>

<td>允许组件模板递归地调用自身 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#name)</td>

<td>√</td>

<td>√</td>

<td>√</td>

<td></td>

</tr>

<tr>

<td>delimiters</td>

<td>改变纯文本插入分隔符 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#delimiters)</td>

<td>√</td>

<td>x</td>

<td>x</td>

<td></td>

</tr>

<tr>

<td>functional</td>

<td>使组件无状态 (没有 data) 和无实例 (没有 this 上下文) [详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#functional)</td>

<td>√</td>

<td>x</td>

<td>x</td>

<td></td>

</tr>

<tr>

<td>model</td>

<td>允许一个自定义组件在使用 v-model 时定制 prop 和 event [详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#model)</td>

<td>√</td>

<td>√</td>

<td>x</td>

<td></td>

</tr>

<tr>

<td>inheritAttrs</td>

<td>inheritAttrs属性默认值为true，表示允许组件的根节点继承$attrs包含的属性 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#inheritAttrs)</td>

<td>√</td>

<td>√</td>

<td>x</td>

<td></td>

</tr>

<tr>

<td>comments</td>

<td>当设为 true 时，将会保留且渲染模板中的 HTML 注释 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#comments)</td>

<td>√</td>

<td>x</td>

<td>x</td>

<td>-</td>

</tr>

</tbody>

</table>

####  生命周期

<table>

<thead>

<tr>

<th>生命周期钩子</th>

<th>描述</th>

<th>H5</th>

<th>App端</th>

<th>小程序</th>

<th>说明</th>

</tr>

</thead>

<tbody>

<tr>

<td>beforeCreate</td>

<td>在实例初始化之后被调用 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#beforeCreate)</td>

<td>√</td>

<td>√</td>

<td>√</td>

<td></td>

</tr>

<tr>

<td>created</td>

<td>在实例创建完成后被立即调用 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#created)</td>

<td>√</td>

<td>√</td>

<td>√</td>

<td></td>

</tr>

<tr>

<td>beforeMount</td>

<td>在挂载开始之前被调用 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#beforeMount)</td>

<td>√</td>

<td>√</td>

<td>√</td>

<td></td>

</tr>

<tr>

<td>mounted</td>

<td>挂载到实例上去之后调用 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#mounted) 注意：此处并不能确定子组件被全部挂载，如果需要子组件完全挂载之后在执行操作可以使用$nextTick [详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#Vue-nextTick)</td>

<td>√</td>

<td>√</td>

<td>√</td>

<td></td>

</tr>

<tr>

<td>beforeUpdate</td>

<td>数据更新时调用，发生在虚拟 DOM 打补丁之前 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#beforeUpdate)</td>

<td>√</td>

<td>√</td>

<td>√</td>

<td></td>

</tr>

<tr>

<td>updated</td>

<td>由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#updated)</td>

<td>√</td>

<td>√</td>

<td>√</td>

<td></td>

</tr>

<tr>

<td>activated</td>

<td>被 keep-alive 缓存的组件激活时调用 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#activated)</td>

<td>√</td>

<td>√</td>

<td>x</td>

<td></td>

</tr>

<tr>

<td>deactivated</td>

<td>被 keep-alive 缓存的组件停用时调用 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#deactivated)</td>

<td>√</td>

<td>√</td>

<td>x</td>

<td></td>

</tr>

<tr>

<td>beforeDestroy</td>

<td>实例销毁之前调用。在这一步，实例仍然完全可用 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#beforeDestroy)</td>

<td>√</td>

<td>√</td>

<td>√</td>

<td></td>

</tr>

<tr>

<td>destroyed</td>

<td>Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#destroyed)</td>

<td>√</td>

<td>√</td>

<td>√</td>

<td></td>

</tr>

<tr>

<td>errorCaptured</td>

<td>当捕获一个来自子孙组件的错误时被调用 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#errorCaptured)</td>

<td>√</td>

<td>√</td>

<td>√</td>

<td>-</td>

</tr>

</tbody>

</table>

####  实例属性

<table>

<thead>

<tr>

<th>Vue 实例属性</th>

<th>描述</th>

<th>H5</th>

<th>App端</th>

<th>小程序</th>

<th>说明</th>

</tr>

</thead>

<tbody>

<tr>

<td>vm.$data</td>

<td>Vue 实例观察的数据对象 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#vm-data)</td>

<td>√</td>

<td>√</td>

<td>√</td>

<td></td>

</tr>

<tr>

<td>vm.$props</td>

<td>当前组件接收到的 props 对象 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#vm-props)</td>

<td>√</td>

<td>√</td>

<td>√</td>

<td></td>

</tr>

<tr>

<td>vm.$el</td>

<td>Vue 实例使用的根 DOM 元素 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#vm-el)</td>

<td>√</td>

<td>x</td>

<td>x</td>

<td></td>

</tr>

<tr>

<td>vm.$options</td>

<td>用于当前 Vue 实例的初始化选项 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#vm-options)</td>

<td>√</td>

<td>√</td>

<td>√</td>

<td></td>

</tr>

<tr>

<td>vm.$parent</td>

<td>父实例，如果当前实例有的话 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#vm-parent)</td>

<td>√</td>

<td>√</td>

<td>√</td>

<td>H5端 `view`、`text` 等内置标签是以 Vue 组件方式实现，`$parent` 会获取这些到内置组件，导致的问题是 `this.$parent` 与其他平台不一致，解决方式是使用 `this.$parent.$parent` 获取或自定义组件根节点由 `view` 改为 `div`</td>

</tr>

<tr>

<td>vm.$root</td>

<td>当前组件树的根 Vue 实例 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#vm-root)</td>

<td>√</td>

<td>√</td>

<td>√</td>

<td></td>

</tr>

<tr>

<td>vm.$children</td>

<td>当前实例的直接子组件 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#vm-children)</td>

<td>√</td>

<td>√</td>

<td>√</td>

<td>H5端 `view`、`text` 等内置标签是以 Vue 组件方式实现，`$children` 会获取到这些内置组件，导致的问题是 `this.$children` 与其他平台不一致，解决方式是使用 `this.$children.$children` 获取或自定义组件根节点由 `view` 改为 `div`</td>

</tr>

<tr>

<td>vm.$slots</td>

<td>用来访问被插槽分发的内容 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#vm-slots)</td>

<td>√</td>

<td>x</td>

<td>√</td>

<td></td>

</tr>

<tr>

<td>vm.$scopedSlots</td>

<td>用来访问作用域插槽 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#vm-scopedSlots)</td>

<td>√</td>

<td>√</td>

<td>√</td>

<td></td>

</tr>

<tr>

<td>vm.$refs</td>

<td>一个对象，持有注册过 ref attribute 的所有 DOM 元素和组件实例[详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#vm-refs)</td>

<td>√</td>

<td>√</td>

<td>√</td>

<td>非H5端只能用于获取自定义组件，不能用于获取内置组件实例（如：view、text）</td>

</tr>

<tr>

<td>vm.$isServer</td>

<td>当前 Vue 实例是否运行于服务器 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#vm-isServer)</td>

<td>√</td>

<td>√</td>

<td>x</td>

<td>App端总是返回false</td>

</tr>

<tr>

<td>vm.$attrs</td>

<td>包含了父作用域中不作为 prop 被识别 (且获取) 的 attribute 绑定 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#vm-attrs)</td>

<td>√</td>

<td>√</td>

<td>x</td>

<td></td>

</tr>

<tr>

<td>vm.$listeners</td>

<td>包含了父作用域中的 (不含 .native 修饰器的) v-on 事件监听器 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#vm-listeners)</td>

<td>√</td>

<td>√</td>

<td>x</td>

<td></td>

</tr>

</tbody>

</table>

####  实例方法

<table>

<thead>

<tr>

<th>实例方法</th>

<th>描述</th>

<th>H5</th>

<th>App端</th>

<th>小程序</th>

<th>说明</th>

</tr>

</thead>

<tbody>

<tr>

<td>vm.$watch()</td>

<td>观察 Vue 实例上的一个表达式或者一个函数计算结果的变化 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#vm-watch)</td>

<td>√</td>

<td>√</td>

<td>√</td>

<td></td>

</tr>

<tr>

<td>vm.$set()</td>

<td>这是全局 Vue.set 的别名 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#vm-set)</td>

<td>√</td>

<td>√</td>

<td>√</td>

<td></td>

</tr>

<tr>

<td>vm.$delete()</td>

<td>这是全局 Vue.delete 的别名 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#vm-delete)</td>

<td>√</td>

<td>√</td>

<td>√</td>

<td></td>

</tr>

<tr>

<td>vm.$on()</td>

<td>监听当前实例上的自定义事件 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#vm-on)</td>

<td>√</td>

<td>√</td>

<td>√</td>

<td></td>

</tr>

<tr>

<td>vm.$once()</td>

<td>监听一个自定义事件，但是只触发一次 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#vm-once)</td>

<td>√</td>

<td>√</td>

<td>√</td>

<td></td>

</tr>

<tr>

<td>vm.$off()</td>

<td>移除自定义事件监听器 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#vm-off)</td>

<td>√</td>

<td>√</td>

<td>√</td>

<td></td>

</tr>

<tr>

<td>vm.$emit()</td>

<td>触发当前实例上的事件 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#vm-emit)</td>

<td>√</td>

<td>√</td>

<td>√</td>

<td></td>

</tr>

<tr>

<td>vm.$mount()</td>

<td>手动地挂载一个未挂载的实例 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#vm-mount)</td>

<td>√</td>

<td>x</td>

<td>x</td>

<td></td>

</tr>

<tr>

<td>vm.$forceUpdate()</td>

<td>迫使 Vue 实例重新渲染 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#vm-forceUpdate)</td>

<td>√</td>

<td>√</td>

<td>√</td>

<td></td>

</tr>

<tr>

<td>vm.$nextTick()</td>

<td>将回调延迟到下次 DOM 更新循环之后执行 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#vm-nextTick)</td>

<td>√</td>

<td>√</td>

<td>√</td>

<td></td>

</tr>

<tr>

<td>vm.$destroy()</td>

<td>完全销毁一个实例 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#vm-destroy)</td>

<td>√</td>

<td>√</td>

<td>√</td>

<td>-</td>

</tr>

</tbody>

</table>

####  模板指令

<table>

<thead>

<tr>

<th>Vue 指令</th>

<th>描述</th>

<th>H5</th>

<th>App端</th>

<th>小程序</th>

<th>说明</th>

</tr>

</thead>

<tbody>

<tr>

<td>v-text</td>

<td>更新元素的 textContent [详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#v-text)</td>

<td>√</td>

<td>√</td>

<td>√</td>

<td></td>

</tr>

<tr>

<td>v-html</td>

<td>更新元素的 innerHTML [详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#v-html)</td>

<td>√</td>

<td>√</td>

<td>x</td>

<td>微信小程序会被转成 `rich-text`</td>

</tr>

<tr>

<td>v-show</td>

<td>根据表达式之真假值，切换元素的 display CSS属性 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#v-show)</td>

<td>√</td>

<td>√</td>

<td>√</td>

<td></td>

</tr>

<tr>

<td>v-if</td>

<td>根据表达式的值的 truthiness 来有条件地渲染元素 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#v-if)</td>

<td>√</td>

<td>√</td>

<td>√</td>

<td></td>

</tr>

<tr>

<td>v-else</td>

<td>为 v-if 或者 v-else-if 添加“else 块” [详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#v-else)</td>

<td>√</td>

<td>√</td>

<td>√</td>

<td></td>

</tr>

<tr>

<td>v-else-if</td>

<td>表示 v-if 的“else if 块”。可以链式调用 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#v-else-if)</td>

<td>√</td>

<td>√</td>

<td>√</td>

<td></td>

</tr>

<tr>

<td>v-for</td>

<td>基于源数据多次渲染元素或模板块 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#v-for)</td>

<td>√</td>

<td>√</td>

<td>√</td>

<td></td>

</tr>

<tr>

<td>v-on</td>

<td>绑定事件监听器 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#v-on)</td>

<td>√</td>

<td>√</td>

<td>√</td>

<td></td>

</tr>

<tr>

<td>v-bind</td>

<td>动态地绑定一个或多个 attribute，或一个组件 prop 到表达式 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#v-bind)</td>

<td>√</td>

<td>√</td>

<td>√</td>

<td></td>

</tr>

<tr>

<td>v-model</td>

<td>在表单控件或者组件上创建双向绑定 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#v-model)</td>

<td>√</td>

<td>√</td>

<td>√</td>

<td></td>

</tr>

<tr>

<td>v-pre</td>

<td>跳过这个元素和它的子元素的编译过程 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#v-pre)</td>

<td>√</td>

<td>√</td>

<td>x</td>

<td></td>

</tr>

<tr>

<td>v-cloak</td>

<td>这个指令保持在元素上直到关联实例结束编译 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#v-cloak)</td>

<td>√</td>

<td>x</td>

<td>x</td>

<td></td>

</tr>

<tr>

<td>v-once</td>

<td>只渲染元素和组件一次 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#v-once)</td>

<td>√</td>

<td>√</td>

<td>x</td>

<td>-</td>

</tr>

</tbody>

</table>

####  特殊属性

<table>

<thead>

<tr>

<th>特殊属性</th>

<th>描述</th>

<th>H5</th>

<th>App端</th>

<th>小程序</th>

<th>说明</th>

</tr>

</thead>

<tbody>

<tr>

<td>key</td>

<td>主要用在 Vue 的虚拟 DOM 算法，在新旧 nodes 对比时辨识 VNodes [详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#key)</td>

<td>√</td>

<td>√</td>

<td>√</td>

<td></td>

</tr>

<tr>

<td>ref</td>

<td>ref 被用来给元素或子组件注册引用信息 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#ref)</td>

<td>√</td>

<td>√</td>

<td>√</td>

<td>非 H5 平台只能获取 vue 组件实例不能获取到内置组件实例</td>

</tr>

<tr>

<td>is</td>

<td>用于动态组件且基于 DOM 内模板的限制来工作 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#is)</td>

<td>√</td>

<td>√ (需传入 String 类型)</td>

<td>x</td>

<td>-</td>

</tr>

</tbody>

</table>

####  内置组件

<table>

<thead>

<tr>

<th>内置组件</th>

<th>描述</th>

<th>H5</th>

<th>App端</th>

<th>小程序</th>

<th>说明</th>

</tr>

</thead>

<tbody>

<tr>

<td>component</td>

<td>渲染一个“元组件”为动态组件。依 is 的值，来决定哪个组件被渲染 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#component)</td>

<td>√</td>

<td>√</td>

<td>x</td>

<td></td>

</tr>

<tr>

<td>transition</td>

<td>作为单个元素/组件的过渡效果 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#transition)</td>

<td>√</td>

<td>x</td>

<td>x</td>

<td></td>

</tr>

<tr>

<td>transition-group</td>

<td>作为多个元素/组件的过渡效果 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#transition-group)</td>

<td>√</td>

<td>x</td>

<td>x</td>

<td></td>

</tr>

<tr>

<td>keep-alive</td>

<td>包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#keep-alive)</td>

<td>√</td>

<td>x</td>

<td>x</td>

<td></td>

</tr>

<tr>

<td>slot</td>

<td>作为组件模板之中的内容分发插槽 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v2.cn.vuejs.org/v2/api/#slot)</td>

<td>√</td>

<td>√</td>

<td>√</td>

<td>-</td>

</tr>

<tr>

<td>template</td>

<td>并不是一个组件，它仅仅是一个包装元素，不会在页面中做任何渲染，只接受控制属性 [详情<span><span class="sr-only">(opens new window)</span></span>](https://uniapp.dcloud.io/component/vue-component?id=template)</td>

<td>√</td>

<td>√</td>

<td>√</td>

<td>-</td>

</tr>

</tbody>

</table>

####  uni-app 全局变量的几种实现方式

**挂载 Vue.prototype**

将一些使用频率较高的常量或者方法，直接扩展到 Vue.prototype 上，每个 Vue 对象都会“继承”下来。

**注意这种方式只支持vue页面**

示例如下： 在 main.js 中挂载属性/方法

```js

    Vue.prototype.websiteUrl = 'http://uniapp.dcloud.io';  
    Vue.prototype.now = Date.now || function () {  
        return new Date().getTime();  
    };  
    Vue.prototype.isArray = Array.isArray || function (obj) {  
        return obj instanceof Array;  
    };
```

然后在 pages/index/index.vue 中调用

```js

    <script>  
        export default {  
            data() {  
                return {};  
            },  
            onLoad(){  
                console.log('now:' + this.now());  
            },  
            methods: {  
            }  
        }  
    </script>
```

这种方式，只需要在 main.js 中定义好即可在每个页面中直接调用。

**globalData**

小程序中有个globalData概念，可以在 App 上声明全局变量。 Vue 之前是没有这类概念的，但 uni-app 引入了globalData概念，并且在包括H5、App等平台都实现了。 在 App.vue 可以定义 globalData ，也可以使用 API 读写这个值。

globalData支持vue和nvue共享数据。

globalData是一种比较简单的全局变量使用方式。

定义：App.vue

```js

    <script>  
        export default {  
            globalData: {  
                text: 'text'  
            },  
            onLaunch: function() {  
                console.log('App Launch')  
            },  
            onShow: function() {  
                console.log('App Show')  
            },  
            onHide: function() {  
                console.log('App Hide')  
            }  
        }  
    </script>  

    <style>  
        /*每个页面公共css */  
    </style>  
```

js中操作globalData的方式如下：

赋值：`getApp().globalData.text = 'test'`

取值：`console.log(getApp().globalData.text) // 'test'`

如果需要把globalData的数据绑定到页面上，可在页面的onshow声明周期里进行变量重赋值。HBuilderX 2.0.3起，nvue页面在`uni-app`编译模式下，也支持onshow。

**Vuex**

Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。

**HBuilderX 2.2.5+起，支持vue和nvue之间共享。[参考<span><span class="sr-only">(opens new window)</span></span>](https://uniapp.dcloud.io/use-weex?id=vue-%E5%92%8C-nvue-%E5%85%B1%E4%BA%AB%E7%9A%84%E5%8F%98%E9%87%8F%E5%92%8C%E6%95%B0%E6%8D%AE)**

这里以登录后同步更新用户信息为例，简单说明下 Vuex 的用法，更多更详细的 Vuex 的内容，建议前往其官网 [Vuex<span><span class="sr-only">(opens new window)</span></span>](https://vuex.vuejs.org/zh/) 学习下。

举例说明：

在 uni-app 项目根目录下新建 store 目录，在 store 目录下创建 index.js 定义状态值

```js

    const store = new Vuex.Store({  
        state: {  
            login: false,  
            token: '',  
            avatarUrl: '',  
            userName: ''  
        },  
        mutations: {  
            login(state, provider) {  
                console.log(state)  
                console.log(provider)  
                state.login = true;  
                state.token = provider.token;  
                state.userName = provider.userName;  
                state.avatarUrl = provider.avatarUrl;  
            },  
            logout(state) {  
                state.login = false;  
                state.token = '';  
                state.userName = '';  
                state.avatarUrl = '';  
            }  
        }  
    })
```

然后，需要在 main.js 挂载 Vuex

```js

    import store from './store'  
    Vue.prototype.$store = store
```

最后，在 pages/index/index.vue 使用

```js

    <script>  
        import {  
            mapState,  
            mapMutations  
        } from 'vuex';  

        export default {  
            computed: {  
                ...mapState(['avatarUrl', 'login', 'userName'])  
            },  
            methods: {  
                ...mapMutations(['logout'])  
            }  
        }  
    </script>
```

> .vue 和 .nvue 并不是一个规范，因此一些在 .vue 中适用的方案并不适用于 .nvue。 Vue 上挂载属性，不能在 .nvue 中使用

####  其他配置

Vue 组件编译到小程序平台的时候会编译为对应平台的组件，部分小程序平台支持 options 选项（具体选项参考对应小程序平台文档的自定义组件部分），一般情况默认即可，如有特殊需求可在 Vue 组件中增加 options 属性。

```js

    export default {
      props: ['data'],
      data(){ return { } },
      options: {
        // 微信小程序中 options 选项
        multipleSlots: true, //  在组件定义时的选项中启动多slot支持，默认启用
        styleIsolation: "isolated",  //  启动样式隔离。当使用页面自定义组件，希望父组件影响子组件样式时可能需要配置。具体配置选项参见：微信小程序自定义组件的样式
        addGlobalClass: true, //  表示页面样式将影响到自定义组件，但自定义组件中指定的样式不会影响页面。这个选项等价于设置 styleIsolation: apply-shared
        virtualHost: true,  //  将自定义节点设置成虚拟的，更加接近Vue组件的表现。我们不希望自定义组件的这个节点本身可以设置样式、响应 flex 布局等，而是希望自定义组件内部的第一层节点能够响应 flex 布局或者样式由自定义组件本身完全决定
      }
    }
```

####  常见问题

#####  如何获取上个页面传递的数据

在 onLoad 里得到，onLoad 的参数是其他页面打开当前页面所传递的数据

#####  如何设置全局的数据和全局的方法

uni-app 内置了 [Vuex<span><span class="sr-only">(opens new window)</span></span>](https://uniapp.dcloud.io/vue-vuex) ，在app里的使用，可参考 `hello-uniapp` `store/index.js`。

```js

    	//store.js
    	import Vue from 'vue'
    	import Vuex from 'vuex'
    	Vue.use(Vuex)
    	const store = new Vuex.Store({
    		state: {...},
    		mutations: {...},
    		actions: {...}
    	})

    	export default store

    	//main.js
    	...
    	import store from './store'
    	Vue.prototype.$store = store
    	const app = new Vue({
    		store,...
    	})
    	...

    	//test.vue 使用时：
    	import {mapState,mapMutations} from 'vuex'
```

#####  如何捕获 app 的 onError

由于 onError 并不是完整意义的生命周期，所以只提供一个捕获错误的方法，在 app 的根组件上添加名为 onError 的回调函数即可。如下

```js

    export default {
    	   // 只有 app 才会有 onLaunch 的生命周期
    		onLaunch () {
    		   // ...
    		},

    		// 捕获 app error
    		onError (err) {
    		   console.log(err)
    		}
    	}
```

####  组件属性设置不生效解决办法

当重复设置某些属性为相同的值时，不会同步到view层。 例如：每次将scroll-view组件的scroll-top属性值设置为0，只有第一次能顺利返回顶部。 这和props的单向数据流特性有关，组件内部scroll-top的实际值改动后，其绑定的属性并不会一同变化。

解决办法有两种（以scroll-view组件为例）：

1   监听scroll事件，记录组件内部变化的值，在设置新值之前先设置为记录的当前值

```js

    <scroll-view scroll-y="true" :scroll-top="scrollTop" @scroll="scroll"></scroll-view>
```

```js

    export default {
        data() {
            return {
                scrollTop: 0,
                old: {
                    scrollTop: 0
                }
            }
        },
        methods: {
            scroll: function(e) {
                this.old.scrollTop = e.detail.scrollTop
            },
            goTop: function(e) {
                this.scrollTop = this.old.scrollTop
                this.$nextTick(function() {
                    this.scrollTop = 0
                });
            }
        }
    }
```

1   监听`scroll`事件，获取组件内部变化的值，实时更新其绑定值

```js

    	<scroll-view scroll-y="true" :scroll-top="scrollTop" @scroll="scroll"></scroll-view>
```

```js

    	export default {
    		data() {
    			return {
    				scrollTop: 0,
    			}
    		},
    		methods: {
    			scroll: function(e) {
    				// 如果使用此方法，请自行增加防抖处理
    				this.scrollTop = e.detail.scrollTop
    			},
    			goTop: function(e) {
    				this.scrollTop = 0
    			}
    		}
    	}
```

第二种解决方式在某些组件可能造成抖动，**推荐第一种解决方式**

####  组合式 API

目前 uni-app（Vue2） 基于 Vue 2.6，组合式 API 由 [@vue/composition-api<span><span class="sr-only">(opens new window)</span></span>](https://github.com/vuejs/composition-api) 支持，script setup 由 [unplugin-vue2-script-setup<span><span class="sr-only">(opens new window)</span></span>](https://github.com/antfu/unplugin-vue2-script-setup) 支持

升级 uni-app 编译器到 3.6.8+

*   HBuilderX 创建的项目直接升级 HBuilderX 到最新版即可
*   CLI 创建的项目参考 https://uniapp.dcloud.net.cn/quickstart-cli.html#cliversion 升级依赖到最新版

1   在 main.js/ts 文件内增加安装 @vue/composition-api 插件。如果使用 nvue 页面，也需要在每个 nvue 页面安装，且每个 nvue 页面之间插件状态默认不会共享。

```js

    import Vue from 'vue'
    import App from './App.vue'

    Vue.config.productionTip = false

    import VueCompositionAPI from '@vue/composition-api'

    Vue.use(VueCompositionAPI)

    const app = new (typeof App === 'function' ? App : Vue.extend(Object.assign({ mpType: 'app' }, App)))
    app.$mount()
```

```js

    // pages/index.vue
    import { defineComponent } from '@vue/composition-api'
    import { onReady } from '@dcloudio/uni-app'
    export default defineComponent({
      setup() {
        onReady(() => {
          console.log('onReady')
        })
      }
    }
```

1   从 @vue/composition-api 包内导入并使用基础的组合式API，具体的兼容性仍需参考：[@vue/composition-api<span><span class="sr-only">(opens new window)</span></span>](https://github.com/vuejs/composition-api#browser-compatibility)。从 @dcloudio/uni-app 包内导入 uni-app 其他生命周期API。

```js

    import { defineComponent, ref } from '@vue/composition-api'
    import { onReady } from '@dcloudio/uni-app'
    export default defineComponent({
      setup() {
        const title = ref('Hello')
        onReady(() => {
          console.log('onReady')
        })
        return {
          title
        }
      }
    })
```

#####  使用 Script Setup

1   使用 npm/yarn 安装 unplugin-vue2-script-setup 插件，此插件暂不支持 nvue 页面。

```js

    npm install unplugin-vue2-script-setup -D
    # or
    yarn add unplugin-vue2-script-setup -D
```

1   在 vue.config.js 配置 ScriptSetup 插件，以下为基础配置，其他具体配置请参考 [unplugin-vue2-script-setup<span><span class="sr-only">(opens new window)</span></span>](https://github.com/antfu/unplugin-vue2-script-setup)

```js

    const ScriptSetup = require('unplugin-vue2-script-setup/webpack').default
    module.exports = {
      parallel: false,
      configureWebpack: {
        plugins: [
          ScriptSetup({ /* options */ }),
        ],
      },
      chainWebpack (config) {
        // disable type check and let `vue-tsc` handles it
        config.plugins.delete('fork-ts-checker')
      },
    }
```

1   改用 Script Setup 写法导入 API

```js

    <script setup lang="ts">
    import { ref } from '@vue/composition-api'
    import { onReady } from '@dcloudio/uni-app'
    const title = ref('Hello')
    onReady(() => {
      console.log('onReady')
    })
    </script>
```

##  7 uniapp中使用Vue3语法注意

###  基础

`uni-app` 项目对 vue 3.0 的支持版本情况如下

*   Web平台：支持。
*   小程序平台：`HBuilderX 3.3.3+` 编译器改为 `vite`，之前版本的编译器为`webpack`。
*   App 平台：`uni-app 3.2.5+`支持。`HBuilderX 3.3.13` 起 `nvue`编译器升级为`vite`

**注意事项**

*   vue3 响应式基于 `Proxy` 实现，不支持`iOS9`和`ie11`。
*   暂不支持新增的 `Teleport`,`Suspense` 组件。
*   目前 `HBuilderX 3.2` 起已预置，之前的版本只能使用`cli`方式

###  组件

####  定义自定义事件

可以通过 `emits` 选项在组件上定义已发出的事件。

```js

    	// 在组件内
    	export default {
    		emits: ['in-focus', 'submit']
    	}
```

当在 `emits` 选项中定义了原生事件 (如 `click`) 时，将使用组件中的事件替代原生事件侦听器。

> 建议定义所有发出的事件，以便更好地记录组件应该如何工作。

示例

```js

    	<template>
    		<view>
    			<!-- 我是counter组件 -->
    			<view>counter的值是：{{count}}</view>
    			<button type="default" @click="add">+1</button>
    		</view>
    	</template>
    	<script>
    		export default {
    			//1.声明自定义事件：组件的自定义事件，必须事先声明在emits节点中
    			emits:['count-change'],
    			data() {
    				return {
    					count:0
    				};
    			},
    			methods:{
    				add(){
    					this.count++
    					//2.触发自定义事件：当点击+1按钮时，调用this.$emit()方法，触发自定义count-change事件
    					this.$emit('count-change')
    				}
    			}
    		}
    	</script>
```

```js

    	<template>
    		<view>
    			<!-- 我是父组件 -->
    			<!-- 3、监听自定义事件：通过v-on的形式监听自定义事件 -->
    			<counter @count-change="getCount"></counter>
    		</view>
    	</template>
    	<script>
    		export default {
    			methods: {
    				getCount(){
    					console.log("触发了count-change自定义事件")
    				}
    			}
    		}
    	</script>
```

**验证抛出的事件**

与 `prop` 类型验证类似，如果使用对象语法而不是数组语法定义发出的事件，则可以验证它。

要添加验证，将为事件分配一个函数，该函数接收传递给 `$emit` 调用的参数，并返回一个布尔值以指示事件是否有效。

```js

    	export default {
    		emits: {
    			// 没有验证
    			click: null,

    			// 验证submit 事件
    			submit: ({ email, password }) => {
    				if (email && password) {
    					return true
    				} else {
    					console.warn('Invalid submit event payload!')
    					return false
    				}
    			}
    		},
    		methods: {
    			submitForm() {
    				this.$emit('submit', { email, password })
    			}
    		}
    	}
```

####  v-model 参数

默认情况下，组件上的 `v-model` 使用 `modelValue` 作为 `prop` 和 `update:modelValue` 作为事件。我们可以通过向 `v-model` 传递参数来修改这些名称：

```js

    	<my-component v-model:foo="bar"></my-component>
```

在本例中，子组件将需要一个 foo prop 并发出 `update:foo` 要同步的事件：

```js

    	<template>
    		<view>
    			<input type="text" :value="foo" @input="$emit('update:foo', $event.target.value)" >
    		</view>
    	</template>
    	<script>
    		export default {
    			props: {
    			  foo: String
    			}
    		}
    	</script>
```

```js

    	<my-component v-model:foo="bar"></my-component>
```

**示例**

```js

    	<template>
    		<view>
    			<view>父组件-count的值是：{{count}}</view>
    			<button type="default" @click="count +=1">+1</button>
    			<counter v-model:number="count"></counter>
    		</view>
    	</template>
    	<script>
    		export default {
    			data() {
    				return {
    					count:0
    				}
    			}
    		}
    	</script>
```

```js

    	<!-- 我是counter组件 -->
    	<template>
    		<view>
    			  <view>子组件-count的值是：{{number}}</view>
    			  <button type="default" @click="add">+1</button>
    		</view>
    	</template>
    	<script>
    		export default {
    			props:['number'],
    			emits:['update:number'],
    			methods:{
    				add(){
    					this.$emit('update:number',this.number +1)//子组件通过this.$emit()方法修改number值
    				}
    			}
    		}
    	</script>
```

####  多个 v-model 绑定

通过利用以特定 `prop` 和事件为目标的能力，正如我们之前在 `v-model` 参数中所学的那样，我们现在可以在单个组件实例上创建多个 `v-model` 绑定。

每个 `v-model` 将同步到不同的 `prop`，而不需要在组件中添加额外的选项：

```js

    <template>
    		<view>
    			<!-- 父组件 -->
    			<user-name
    			  v-model:first-name="firstName"
    			  v-model:last-name="lastName"
    			></user-name>
    		</view>
    	</template>
    	<script>
    		export default {
    			data() {
    				return {
    					firstName:"",
    					lastName:""
    				}
    			}
    		}
    	</script>
```

```js

    	<!-- 我是user-name子组件 -->
    	<template>
    		<view>
    			<input type="text" :value="firstName" @input="$emit('update:firstName', $event.target.value)">
    			<input type="text" :value="lastName" @input="$emit('update:lastName', $event.target.value)">
    		</view>
    	</template>
    	<script>
    		export default {
    			props: {
    				firstName: String,
    				lastName: String
    			}
    		}
    	</script>
```

####  处理 v-model 修饰符

让我们创建一个示例自定义修饰符 `capitalize`，它将 `v-model` 绑定提供的字符串的第一个字母大写。

添加到组件 `v-model` 的修饰符将通过 `modelModifiers` prop 提供给组件。在下面的示例中，我们创建了一个组件，其中包含默认为空对象的 `modelModifiers` prop。

请注意，当组件的 created 生命周期钩子触发时，`modelModifiers` prop 包含 `capitalize`，其值为 `true`——因为它被设置在 `v-model` 绑定 `v-model.capitalize="bar"`。

```js

    	<!-- 我是父组件 -->
    	<template>
    		<view>
    			<my-component v-model.capitalize="myText"></my-component>
    		</view>
    	</template>
    	<script>
    		export default {
    			data() {
    				return {
    					myText:""
    				}
    			}
    		}
    	</script>
```

```js

    	<!-- 我是 my-component子组件-->
    	<template>
    		<view>
    			<input type="text" :value="modelValue" @input="emitValue" style="border: red solid 1px;">
    		</view>
    	</template>
    	<script>
    		export default {
    			props: {
    				modelValue: String,
    				modelModifiers: {
    					default: () => ({})
    				}
    			},
    			created() {
    				console.log(this.modelModifiers) // { capitalize: true }
    			},
    			methods: {
    				emitValue(e) {
    					let value = e.target.value
    					if (this.modelModifiers.capitalize) {
    						value = value.charAt(0).toUpperCase() + value.slice(1)
    					}
    					//charAt() 方法可返回指定位置的字符
    					//toUpperCase() 方法用于把字符串转换为大写
    					//slice() 方法可从已有的数组中返回选定的元素
    					console.log("value: ",value);
    					this.$emit('update:modelValue', value)
    				}
    			}
    		}
    	</script>
```

对于带参数的 `v-model` 绑定，生成的 `prop` 名称将为 `arg + "Modifiers"`：

```js

    	<my-component v-model:foo.capitalize="bar"></my-component>
```

```js

    	<!-- 我是 my-component子组件-->
    	<template>
    		<view>
    			<input type="text"
    			  :value="foo"
    			  @input="$emit('update:foo', $event.target.value)">
    		</view>
    	</template>
    	<script>
    		export default {
    			props: ['foo', 'fooModifiers'],
    			created() {
    			  console.log(this.fooModifiers) // { capitalize: true }
    			}
    		}
    	</script>
```

####  插槽

#####  具名插槽

有时我们需要多个插槽。例如对于一个带有如下模板的 `base-layout` 组件：

```js

    	<!-- base-layout组件 -->
    	<view class="container">
    		<header>
    		<!-- 我们希望把页头放这里 -->
    		</header>
    		<main>
    		<!-- 我们希望把主要内容放这里 -->
    		</main>
    		<footer>
    		<!-- 我们希望把页脚放这里 -->
    		</footer>
    	</view>
```

对于这样的情况，`slot` 元素有一个特殊的 `attribute：name`。这个 `attribute` 可以用来定义额外的插槽：

```js

    	<view class="container">
    		<header>
    			<slot name="header"></slot>
    		</header>
    		<main>
    			<slot></slot>
    		</main>
    		<footer>
    			<slot name="footer"></slot>
    		</footer>
    	</view>
```

**一个不带 `name` 的 `slot` 出口会带有隐含的名字`“default”`。**

在向具名插槽提供内容的时候，我们可以在一个 `template` 元素上使用 `v-slot` 指令，并以 `v-slot` 的参数的形式提供其名称：

```js

    	<template>
    		<view>
    		<!-- 父组件使用子组件`<base-layout>`，节点上使用v-slot特性： -->
    			<base-layout>
    				<template v-slot:header>
    					<view>Here might be a page title</view>
    				</template>
    				<template v-slot:default>
    					<view>A paragraph for the main content.</view>
    					<view>And another one.</view>
    				</template>
    				<template v-slot:footer>
    					<view>Here's some contact info</view>
    				</template>
    			</base-layout>
    		</view>
    	</template>
```

现在 `template` 元素中的所有内容都将会被传入相应的插槽。

渲染的 `HTML` 将会是：

```js

    	<div class="container">
    		<header>
    			<div>Here might be a page title</div>
    		</header>
    		<main>
    			<div>A paragraph for the main content.</div>
    			<div>And another one.</div>
    		</main>
    		<footer>
    			<div>Here's some contact info</div>
    		</footer>
    	</div>
```

注意，`v-slot` 只能添加在 `template` 上 (只有一种例外情况)

**具名插槽的缩写**

跟 `v-on` 和 `v-bind` 一样，`v-slot` 也有缩写，即把参数之前的所有内容 (v-slot:) 替换为字符 **#**。例如 `v-slot:header` 可以被重写为 `#header`：

```js

    	<base-layout>
    		<template #header>
    			<view>Here might be a page title</view>
    		</template>

    		<template #default>
    			<view>A paragraph for the main content.</view>
    			<view>And another one.</view>
    		</template>

    		<template #footer>
    			<view>Here's some contact info</view>
    		</template>
    	</base-layout>
```

然而，和其它指令一样，该缩写只在其有参数的时候才可用。这意味着以下语法是无效的：

```js

    	<!-- This will trigger a warning -->
    	<todo-list #="{ item }">
    		<i class="fas fa-check"></i>
    		<view class="green">{{ item }}</view>
    	</todo-list>
```

如果你希望使用缩写的话，你必须始终以明确插槽名取而代之：

```js

    	<todo-list #default="{ item }">
    		<i class="fas fa-check"></i>
    		<view class="green">{{ item }}</view>
    	</todo-list>
```

#####  作用域插槽

有时让插槽内容能够访问子组件中才有的数据是很有用的。当一个组件被用来渲染一个项目数组时，这是一个常见的情况，我们希望能够自定义每个项目的渲染方式。

例如，我们有一个组件，包含 `todo-items` 的列表。

```js

    <template>
    	<view>
    		<view v-for="(item, index) in items">
            {{ item }}
          </view>
    	</view>
    </template>
    <script>
    	export default {
    		data() {
    			return {
    				items: ['Feed a cat', 'Buy milk']
    			};
    		}
    	}
    </script>
```

我们可能需要替换插槽以在父组件上自定义它：

```js

    	<todo-list>
    		<i class="fas fa-check">before--</i>
    		<view class="green">{{ item }}</view>
    	</todo-list>
```

但是，这是行不通的，因为只有 `todo-list` 组件可以访问 `item`，我们将从其父组件提供槽内容。

要使 `item` 可用于父级提供的 `slot` 内容，我们可以添加一个 `slot` 元素并将其绑定为属性：

```js

    <template>
    	<view>
    		<view v-for="(item, index) in items">
    		   <slot :item="item"></slot>
    		</view>
    	</view>
    </template>
    <script>
    	export default {
    		data() {
    			return {
    				items: ['Feed a cat', 'Buy milk']
    			}
    		}
    	}
    </script>
```

绑定在 `slot` 元素上的 `attribute` 被称为**插槽 prop**。现在在父级作用域中，我们可以使用带值的 `v-slot` 来定义我们提供的插槽 `prop` 的名字：

```js

    <template>
    	<view>
    		<todo-list>
    			<template v-slot:default="slotProps">
    				<i class="fas fa-check"></i>
    				<view class="green">{{ slotProps.item }}</view>
    			</template>
    		</todo-list>
    	</view>
    </template>
```

![](https://s.poetries.work/uploads/2023/06/3f31c0ea3122de49.png)

在这个例子中，我们选择将包含所有插槽 `prop` 的对象命名为 `slotProps`，但你也可以使用任意你喜欢的名字。

**独占默认插槽的缩写语法**

在上述情况下，当被提供的内容只有默认插槽时，组件的标签才可以被当作插槽的模板来使用。这样我们就可以把 `v-slot` 直接用在组件上：

```js

    	<todo-list v-slot:default="slotProps">
    		<i class="fas fa-check"></i>
    		<view class="green">{{ slotProps.item }}</view>
    	</todo-list>
```

这种写法还可以更简单。就像假定未指明的内容对应默认插槽一样，不带参数的 `v-slot` 被假定对应默认插槽：

```js

    	<todo-list v-slot="slotProps">
    		<i class="fas fa-check"></i>
    		<view class="green">{{ slotProps.item }}</view>
    	</todo-list>
```

注意**默认插槽的缩写语法不能和具名插槽混用**，因为它会导致作用域不明确：

```js

    <!-- 无效，会导致警告 -->
    	<todo-list v-slot="slotProps">
    		<todo-list v-slot:default="slotProps">
    			<i class="fas fa-check"></i>
    			<view class="green">{{ slotProps.item }}</view>
    		</todo-list>
    		<template v-slot:other="otherSlotProps">
    			slotProps is NOT available here
    		</template>
    	</todo-list>
```

只要出现多个插槽，请始终为所有的插槽使用完整的基于 `template` 的语法：

```js

    	<todo-list>
    		<template v-slot:default="slotProps">
    			<i class="fas fa-check"></i>
    			<view class="green">{{ slotProps.item }}</view>
    		</template>

    		<template v-slot:other="otherSlotProps">
    			...
    		</template>
    	</todo-list>
```

**解构插槽 Prop**

作用域插槽的内部工作原理是将你的插槽内容包括在一个传入单个参数的函数里：

```js

    function (slotProps) {
      // ..  插槽内容 ...
    }
```

这意味着 `v-slot` 的值实际上可以是任何能够作为函数定义中的参数的 `JavaScript` 表达式。你也可以使用 [ES2015<span><span class="sr-only">(opens new window)</span></span>](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Object_destructuring) 解构来传入具体的插槽 `prop`，如下：

```js

    	<todo-list v-slot="{ item }">
    		<i class="fas fa-check"></i>
    		<view class="green">{{ item }}</view>
    	</todo-list>
```

这样可以使模板更简洁，尤其是在该插槽提供了多个 `prop` 的时候。它同样开启了 `prop` 重命名等其它可能，例如将 `item` 重命名为 `todo`：

```js

    	<todo-list v-slot="{ item: todo }">
    		<i class="fas fa-check"></i>
    		<view class="green">{{ todo }}</view>
    	</todo-list>
```

你甚至可以定义后备内容，用于插槽 `prop` 是 `undefined` 的情形：

```js

    	<todo-list v-slot="{ item = 'Placeholder' }">
    		<i class="fas fa-check"></i>
    		<view class="green">{{ item }}</view>
    	</todo-list>
```

###  API

####  应用配置

`config` 是一个包含了 `Vue` 应用全局配置的对象。你可以在应用挂载前修改其以下 `property`：

```js

    const app = Vue.createApp({})

    app.config = {...}
```

<table>

<thead>

<tr>

<th>应用配置</th>

<th>描述</th>

<th>H5</th>

<th>App端</th>

<th>微信小程序</th>

<th>说明</th>

</tr>

</thead>

<tbody>

<tr>

<td>errorHandler</td>

<td>指定一个处理函数，来处理组件渲染方法执行期间以及侦听器抛出的未捕获错误。[详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/application-config.html#errorhandler)</td>

<td>√</td>

<td>√</td>

<td>√</td>

<td></td>

</tr>

<tr>

<td>warnHandler</td>

<td>为 `Vue` 的运行时警告指定一个自定义处理函数。[详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/application-config.html#warnhandler)</td>

<td>√</td>

<td>√</td>

<td>√</td>

<td></td>

</tr>

<tr>

<td>globalProperties</td>

<td>添加可以在应用程序内的任何组件实例中访问的全局 `property`。[详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/application-config.html#globalproperties)</td>

<td>√</td>

<td>√</td>

<td>√</td>

<td></td>

</tr>

<tr>

<td>isCustomElement</td>

<td>指定一个方法，用来识别在 `Vue` 之外定义的自定义元素。[详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/application-config.html#iscustomelement)</td>

<td>√</td>

<td>√</td>

<td>√</td>

<td></td>

</tr>

<tr>

<td>optionMergeStrategies</td>

<td>为自定义选项定义合并策略。[详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/application-config.html#optionmergestrategies)</td>

<td>√</td>

<td>√</td>

<td>√</td>

<td></td>

</tr>

<tr>

<td>performance</td>

<td>设置为 `true` 以在浏览器开发工具的 `performance/timeline` 面板中启用对组件初始化、编译、渲染和更新的性能追踪。[详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/application-config.html#performance)</td>

<td>√</td>

<td>x</td>

<td>x</td>

<td>只在Web环境下支持</td>

</tr>

</tbody>

</table>

####  应用 API

在 Vue 3 中，改变全局 `Vue` 行为的 `API` 现在被移动到了由新的 `createApp` 方法所创建的应用实例上。此外，现在它们的影响仅限于该特定应用实例：

```js

    import { createApp } from 'vue'

    const app = createApp({})
```

调用 `createApp` 返回一个应用实例。该实例提供了一个应用上下文。应用实例挂载的整个组件树共享相同的上下文，该上下文提供了之前在 `Vue 2.x` 中“全局”的配置。

另外，由于 `createApp` 方法返回应用实例本身，因此可以在其后链式调用其它方法，这些方法可以在以下部分中找到。

<table>

<thead>

<tr>

<th>应用 API</th>

<th>描述</th>

<th>H5</th>

<th>App端</th>

<th>微信小程序</th>

</tr>

</thead>

<tbody>

<tr>

<td>component</td>

<td>注册或检索全局组件。[详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/application-api.html#component)</td>

<td>√</td>

<td>√</td>

<td>√</td>

</tr>

<tr>

<td>config</td>

<td>包含应用配置的对象。[详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/application-api.html#config)</td>

<td>√</td>

<td>√</td>

<td>√</td>

</tr>

<tr>

<td>directive</td>

<td>注册或检索全局指令。[详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/application-api.html#directive)</td>

<td>√</td>

<td>√</td>

<td>x</td>

</tr>

<tr>

<td>mixin</td>

<td>在整个应用范围内应用混入。[详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/application-api.html#mixin)</td>

<td>√</td>

<td>√</td>

<td>√</td>

</tr>

<tr>

<td>provide</td>

<td>设置一个可以被注入到应用范围内所有组件中的值。[详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/application-api.html#provide)</td>

<td>√</td>

<td>√</td>

<td>√</td>

</tr>

<tr>

<td>use</td>

<td>安装 `Vue.js` 插件。[详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/application-api.html#use)</td>

<td>√</td>

<td>√</td>

<td>√</td>

</tr>

</tbody>

</table>

####  全局 API

<table>

<thead>

<tr>

<th>全局 API</th>

<th>描述</th>

<th>H5</th>

<th>App端</th>

<th>微信小程序</th>

</tr>

</thead>

<tbody>

<tr>

<td>createApp</td>

<td>返回一个提供应用上下文的应用实例。应用实例挂载的整个组件树共享同一个上下文。[详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/global-api.html#createapp)</td>

<td>√</td>

<td>√</td>

<td>√</td>

</tr>

<tr>

<td>h</td>

<td>返回一个”虚拟节点“，通常缩写为 `VNode`：一个普通对象，其中包含向 `Vue` 描述它应在页面上渲染哪种节点的信息，包括所有子节点的描述。[详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/global-api.html#h)</td>

<td>√</td>

<td>x</td>

<td>x</td>

</tr>

<tr>

<td>defineComponent</td>

<td>从实现上看，`defineComponent` 只返回传递给它的对象。但是，就类型而言，返回的值有一个合成类型的构造函数，用于手动渲染函数、`TSX` 和 `IDE` 工具支持。[详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/global-api.html#definecomponent)</td>

<td>√</td>

<td>x</td>

<td>x</td>

</tr>

<tr>

<td>defineAsyncComponent</td>

<td>创建一个只有在需要时才会加载的异步组件。[详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/global-api.html#defineasynccomponent)</td>

<td>√</td>

<td>x</td>

<td>x</td>

</tr>

<tr>

<td>resolveComponent</td>

<td>如果在当前应用实例中可用，则允许按名称解析 `component`。返回一个 `Component`。[详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/global-api.html#resolvecomponent)</td>

<td>√</td>

<td>x</td>

<td>x</td>

</tr>

<tr>

<td>resolveDynamicComponent</td>

<td>允许使用与 `component :is=""` 相同的机制来解析一个 `component`。[详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/global-api.html#resolvedynamiccomponent)</td>

<td>√</td>

<td>x</td>

<td>x</td>

</tr>

<tr>

<td>resolveDirective</td>

<td>如果在当前应用实例中可用，则允许通过其名称解析一个 `directive`。返回一个 `Directive`。[详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/global-api.html#resolvedirective)</td>

<td>√</td>

<td>x</td>

<td>x</td>

</tr>

<tr>

<td>withDirectives</td>

<td>允许将指令应用于 `VNode`。返回一个包含应用指令的 `VNode`。[详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/global-api.html#withdirectives)</td>

<td>√</td>

<td>x</td>

<td>x</td>

</tr>

<tr>

<td>createRenderer</td>

<td>createRenderer 函数接受两个泛型参数： `HostNode` 和 `HostElement`，对应于宿主环境中的 `Node` 和 `Element` 类型。[详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/global-api.html#createrenderer)</td>

<td>√</td>

<td>x</td>

<td>x</td>

</tr>

<tr>

<td>nextTick</td>

<td>将回调推迟到下一个 `DOM` 更新周期之后执行。在更改了一些数据以等待 `DOM` 更新后立即使用它。[详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/global-api.html#nexttick)</td>

<td>√</td>

<td>x</td>

<td>x</td>

</tr>

</tbody>

</table>

####  选项/Data

<table>

<thead>

<tr>

<th>Data</th>

<th>描述</th>

<th>H5</th>

<th>App端</th>

<th>微信小程序</th>

</tr>

</thead>

<tbody>

<tr>

<td>data</td>

<td>返回组件实例的 `data` 对象的函数。[详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/options-data.html)</td>

<td>√</td>

<td>√</td>

<td>√</td>

</tr>

<tr>

<td>props</td>

<td>`props` 可以是数组或对象，用于接收来自父组件的数据。[详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/options-data.html#props)</td>

<td>√</td>

<td>√</td>

<td>√</td>

</tr>

<tr>

<td>computed</td>

<td>计算属性将被混入到组件实例中。所有 `getter` 和 `setter` 的 `this` 上下文自动地绑定为组件实例。[详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/options-data.html#computed)</td>

<td>√</td>

<td>√</td>

<td>√</td>

</tr>

<tr>

<td>methods</td>

<td>methods 将被混入到组件实例中。可以直接通过 `VM` 实例访问这些方法，或者在指令表达式中使用。方法中的 `this` 自动绑定为组件实例。[详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/options-data.html#methods)</td>

<td>√</td>

<td>√</td>

<td>√</td>

</tr>

<tr>

<td>watch</td>

<td>一个对象，键是需要观察的表达式，值是对应回调函数。值也可以是方法名，或者包含选项的对象。[详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/options-data.html#watch)</td>

<td>√</td>

<td>√</td>

<td>√</td>

</tr>

<tr>

<td>emits</td>

<td>emits 可以是数组或对象，从组件触发自定义事件，`emits` 可以是简单的数组，或者对象作为替代，允许配置和事件验证。[详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/options-data.html#emits)</td>

<td>√</td>

<td>√</td>

<td>√</td>

</tr>

</tbody>

</table>

####  选项/DOM

<table>

<thead>

<tr>

<th>DOM</th>

<th>描述</th>

<th>H5</th>

<th>App端</th>

<th>微信小程序</th>

<th>说明</th>

</tr>

</thead>

<tbody>

<tr>

<td>template</td>

<td>一个字符串模板作为 `component` 实例的标识使用。[详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/options-dom.html#template)</td>

<td>√</td>

<td>x</td>

<td>x</td>

<td>uni-app使用的vue是只包含运行时的版本</td>

</tr>

<tr>

<td>render</td>

<td>字符串模板的另一种选择，允许你充分利用 `JavaScript` 的编程功能。[详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/options-dom.html#render)</td>

<td>√</td>

<td>x</td>

<td>x</td>

<td>-</td>

</tr>

</tbody>

</table>

####  选项/生命周期钩子

<table>

<thead>

<tr>

<th>生命周期钩子</th>

<th>描述</th>

<th>H5</th>

<th>App端</th>

<th>微信小程序</th>

</tr>

</thead>

<tbody>

<tr>

<td>beforeCreate</td>

<td>在实例初始化之后，数据观测`(data observer)`和 `event/watcher` 事件配置之前被调用。[详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/options-lifecycle-hooks.html#beforecreate)</td>

<td>√</td>

<td>√</td>

<td>√</td>

</tr>

<tr>

<td>created</td>

<td>在实例创建完成后被立即调用。[详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/options-lifecycle-hooks.html#created)</td>

<td>√</td>

<td>√</td>

<td>√</td>

</tr>

<tr>

<td>beforeMount</td>

<td>在挂载开始之前被调用：相关的 `render` 函数首次被调用。[详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/options-lifecycle-hooks.html#beforemount)</td>

<td>√</td>

<td>√</td>

<td>√</td>

</tr>

<tr>

<td>mounted</td>

<td>实例被挂载后调用，这时 `Vue.createApp({}).mount()` 被新创建的 `vm.$el` 替换了。[详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/options-lifecycle-hooks.html#mounted)</td>

<td>√</td>

<td>√</td>

<td>√</td>

</tr>

<tr>

<td>beforeUpdate</td>

<td>数据更新时调用，发生在虚拟 `DOM` 打补丁之前。[详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/options-lifecycle-hooks.html#beforeupdate)</td>

<td>√</td>

<td>√</td>

<td>√</td>

</tr>

<tr>

<td>updated</td>

<td>由于数据更改导致的虚拟 `DOM` 重新渲染和打补丁，在这之后会调用该钩子。[详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/options-lifecycle-hooks.html#updated)</td>

<td>√</td>

<td>√</td>

<td>√</td>

</tr>

<tr>

<td>activated</td>

<td>被 `keep-alive` 缓存的组件激活时调用。[详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/options-lifecycle-hooks.html#activated)</td>

<td>√</td>

<td>√</td>

<td>x</td>

</tr>

<tr>

<td>deactivated</td>

<td>被 `keep-alive` 缓存的组件停用时调用。[详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/options-lifecycle-hooks.html#deactivated)</td>

<td>√</td>

<td>√</td>

<td>x</td>

</tr>

<tr>

<td>beforeUnmount</td>

<td>在卸载组件实例之前调用。在这个阶段，实例仍然是完全正常的。[详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/options-lifecycle-hooks.html#beforeunmount)</td>

<td>√</td>

<td>√</td>

<td>√</td>

</tr>

<tr>

<td>unmounted</td>

<td>卸载组件实例后调用。调用此钩子时，组件实例的所有指令都被解除绑定，所有事件侦听器都被移除，所有子组件实例被卸载。[详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/options-lifecycle-hooks.html#unmounted)</td>

<td>√</td>

<td>√</td>

<td>√</td>

</tr>

<tr>

<td>errorCaptured</td>

<td>当捕获一个来自子孙组件的错误时被调用。此钩子会收到三个参数：错误对象、发生错误的组件实例以及一个包含错误来源信息的字符串。[详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/options-lifecycle-hooks.html#errorcaptured)</td>

<td>√</td>

<td>√</td>

<td>√</td>

</tr>

<tr>

<td>renderTracked</td>

<td>跟踪虚拟 `DOM` 重新渲染时调用。钩子接收 `debugger event` 作为参数。此事件告诉你哪个操作跟踪了组件以及该操作的目标对象和键。[详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/options-lifecycle-hooks.html#rendertracked)</td>

<td>√</td>

<td>√</td>

<td>√</td>

</tr>

<tr>

<td>renderTriggered</td>

<td>当虚拟 `DOM` 重新渲染为 `triggered.Similarly` 为`renderTracked`，接收 `debugger event` 作为参数。此事件告诉你是什么操作触发了重新渲染，以及该操作的目标对象和键。[详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/options-lifecycle-hooks.html#rendertriggered)</td>

<td>√</td>

<td>√</td>

<td>√</td>

</tr>

</tbody>

</table>

####  选项/资源

<table>

<thead>

<tr>

<th>资源</th>

<th>描述</th>

<th>H5</th>

<th>App端</th>

<th>微信小程序</th>

</tr>

</thead>

<tbody>

<tr>

<td>directives</td>

<td>包含组件实例可用指令的哈希表。[详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/options-assets.html#directives)</td>

<td>√</td>

<td>√</td>

<td>x</td>

</tr>

<tr>

<td>components</td>

<td>包含组件实例可用组件的哈希表。[详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/options-assets.html#components)</td>

<td>√</td>

<td>√</td>

<td>√</td>

</tr>

</tbody>

</table>

####  选项/组合

<table>

<thead>

<tr>

<th>组合</th>

<th>描述</th>

<th>H5</th>

<th>App端</th>

<th>微信小程序</th>

</tr>

</thead>

<tbody>

<tr>

<td>mixins</td>

<td>接收一个混入对象的数组。这些混入对象可以像正常的实例对象一样包含实例选项，这些选项将会被合并到最终的选项中，使用特定的选项合并逻辑。[详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/options-composition.html#mixins)</td>

<td>√</td>

<td>√</td>

<td>√</td>

</tr>

<tr>

<td>extends</td>

<td>允许声明扩展另一个组件 (可以是一个简单的选项对象或构造函数)。这主要是为了便于扩展单文件组件。[详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/options-composition.html#extends)</td>

<td>√</td>

<td>√</td>

<td>√</td>

</tr>

<tr>

<td>provide / inject</td>

<td>这对选项需要一起使用，以允许一个祖先组件向其所有子孙后代注入一个依赖，不论组件层次有多深，并在起上下游关系成立的时间里始终生效。[详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/options-composition.html#provide-inject)</td>

<td>√</td>

<td>√</td>

<td>√</td>

</tr>

<tr>

<td>setup</td>

<td>`setup` 函数是一个新的组件选项。它作为在组件内部使用组合式 `API` 的入口点。[详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/options-composition.html#setup)</td>

<td>√</td>

<td>√</td>

<td>√</td>

</tr>

</tbody>

</table>

####  选项/杂项

<table>

<thead>

<tr>

<th>杂项</th>

<th>描述</th>

<th>H5</th>

<th>App端</th>

<th>微信小程序</th>

</tr>

</thead>

<tbody>

<tr>

<td>name</td>

<td>允许组件模板递归地调用自身。注意，组件在全局用 `Vue.createApp({}).component({})` 注册时，全局 `ID` 自动作为组件的 `name`。[详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/options-misc.html#name)</td>

<td>√</td>

<td>√</td>

<td>√</td>

</tr>

<tr>

<td>delimiters</td>

<td>设置用于模板内文本插入的分隔符。[详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/options-misc.html#delimiters)</td>

<td>√</td>

<td>x</td>

<td>x</td>

</tr>

<tr>

<td>inheritAttrs</td>

<td>默认情况下父作用域的不被认作 `props` 的 `attribute` 绑定 (`attribute bindings`) 将会“回退”且作为普通的 `HTML attribute` 应用在子组件的根元素上。当撰写包裹一个目标元素或另一个组件的组件时，通过设置 `inheritAttrs` 到 `false`，这些默认行为将会被去掉。[详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/options-misc.html#inheritattrs)</td>

<td>√</td>

<td>√</td>

<td>x</td>

</tr>

</tbody>

</table>

####  实例 property

<table>

<thead>

<tr>

<th>实例 property</th>

<th>描述</th>

<th>H5</th>

<th>App端</th>

<th>微信小程序</th>

<th>说明</th>

</tr>

</thead>

<tbody>

<tr>

<td>$data</td>

<td>组件实例观察的数据对象。组件实例代理了对其 `data` 对象 `property` 的访问。[详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/instance-properties.html#data)</td>

<td>√</td>

<td>√</td>

<td>√</td>

<td></td>

</tr>

<tr>

<td>$props</td>

<td>当前组件接收到的 `props` 对象。组件实例代理了对其 `props` 对象 `property` 的访问。[详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/instance-properties.html#props)</td>

<td>√</td>

<td>√</td>

<td>√</td>

<td></td>

</tr>

<tr>

<td>$el</td>

<td>组件实例使用的根 `DOM` 元素。[详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/instance-properties.html#el)</td>

<td>√</td>

<td>x</td>

<td>x</td>

<td></td>

</tr>

<tr>

<td>$options</td>

<td>用于当前组件实例的初始化选项。需要在选项中包含自定义 `property` 时会有用处。[详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/instance-properties.html#options)</td>

<td>√</td>

<td>√</td>

<td>√</td>

<td></td>

</tr>

<tr>

<td>$parent</td>

<td>父实例，如果当前实例有的话。[详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/instance-properties.html#parent)</td>

<td>√</td>

<td>√</td>

<td>√</td>

<td>H5端 `view`、`text` 等内置标签是以 `Vue` 组件方式实现，`$parent` 会获取这些到内置组件，导致的问题是 `this.$parent` 与其他平台不一致，解决方式是使用 `this.$parent.$parent` 获取或自定义组件根节点由 `view` 改为 `div`</td>

</tr>

<tr>

<td>$root</td>

<td>当前组件树的根组件实例。如果当前实例没有父实例，此实例将会是其自己。[详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/instance-properties.html#root)</td>

<td>√</td>

<td>√</td>

<td>√</td>

<td></td>

</tr>

<tr>

<td>$slots</td>

<td>用来访问被插槽分发的内容。每个具名插槽有其相应的 `property` (例如：`v-slot:foo` 中的内容将会在 `this.$slots.foo` 中被找到)。[详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/instance-properties.html#slots)</td>

<td>√</td>

<td>x</td>

<td>√</td>

<td></td>

</tr>

<tr>

<td>$refs</td>

<td>一个对象，持有注册过 `ref attribute` 的所有 `DOM` 元素和组件实例。[详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/instance-properties.html#refs)</td>

<td>√</td>

<td>√</td>

<td>√</td>

<td>非H5端只能用于获取自定义组件，不能用于获取内置组件实例（如：`view`、`text`）</td>

</tr>

<tr>

<td>$attrs</td>

<td>包含了父作用域中不作为组件 `props` 或自定义事件。[详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/instance-properties.html#attrs)</td>

<td>√</td>

<td>√</td>

<td>x</td>

<td>-</td>

</tr>

</tbody>

</table>

####  实例方法

<table>

<thead>

<tr>

<th>实例方法</th>

<th>描述</th>

<th>H5</th>

<th>App端</th>

<th>微信小程序</th>

</tr>

</thead>

<tbody>

<tr>

<td>$watch</td>

<td>侦听组件实例上的响应式 `property` 或函数计算结果的变化。[详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/instance-methods.html#watch)</td>

<td>√</td>

<td>√</td>

<td>√</td>

</tr>

<tr>

<td>$emit</td>

<td>触发当前实例上的事件。附加参数都会传给监听器回调。[详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/instance-methods.html#emit)</td>

<td>√</td>

<td>√</td>

<td>√</td>

</tr>

<tr>

<td>$forceUpdate</td>

<td>迫使组件实例重新渲染。注意它仅仅影响实例本身和插入插槽内容的子组件，而不是所有子组件。[详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/instance-methods.html#forceupdate)</td>

<td>√</td>

<td>√</td>

<td>√</td>

</tr>

<tr>

<td>$nextTick</td>

<td>将回调延迟到下次 `DOM` 更新循环之后执行。在修改数据之后立即使用它，然后等待 `DOM` 更新。[详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/instance-methods.html#nexttick)</td>

<td>√</td>

<td>√</td>

<td>√</td>

</tr>

</tbody>

</table>

####  指令

<table>

<thead>

<tr>

<th>Vue 指令</th>

<th>描述</th>

<th>H5</th>

<th>App端</th>

<th>微信小程序</th>

<th>说明</th>

</tr>

</thead>

<tbody>

<tr>

<td>v-text</td>

<td>更新元素的 `textContent`。 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/directives.html#v-text)</td>

<td>√</td>

<td>√</td>

<td>x</td>

<td></td>

</tr>

<tr>

<td>v-html</td>

<td>更新元素的 `innerHTML`。 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/directives.html#v-html)</td>

<td>√</td>

<td>√</td>

<td>√</td>

<td>微信小程序会被转成 `rich-text`</td>

</tr>

<tr>

<td>v-show</td>

<td>根据表达式的真假值，切换元素的 `display CSS property`。 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/directives.html#v-show)</td>

<td>√</td>

<td>√</td>

<td>√</td>

<td></td>

</tr>

<tr>

<td>v-if</td>

<td>根据表达式的真假值来有条件地渲染元素。 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/directives.html#v-if)</td>

<td>√</td>

<td>√</td>

<td>√</td>

<td></td>

</tr>

<tr>

<td>v-else</td>

<td>为 `v-if` 或者 `v-else-if` 添加`“else 块”`。[详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/directives.html#v-else)</td>

<td>√</td>

<td>√</td>

<td>√</td>

<td></td>

</tr>

<tr>

<td>v-else-if</td>

<td>表示 `v-if` 的`“else if 块”`。可以链式调用。 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/directives.html#v-else-if)</td>

<td>√</td>

<td>√</td>

<td>√</td>

<td></td>

</tr>

<tr>

<td>v-for</td>

<td>基于源数据多次渲染元素或模板块。 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/directives.html#v-for)</td>

<td>√</td>

<td>√</td>

<td>√</td>

<td></td>

</tr>

<tr>

<td>v-on</td>

<td>绑定事件监听器。 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/directives.html#v-on)</td>

<td>√</td>

<td>√</td>

<td>√</td>

<td></td>

</tr>

<tr>

<td>v-bind</td>

<td>动态地绑定一个或多个 `attribute`，或一个组件 `prop` 到表达式。 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/directives.html#v-bind)</td>

<td>√</td>

<td>√</td>

<td>√</td>

<td></td>

</tr>

<tr>

<td>v-model</td>

<td>在表单控件或者组件上创建双向绑定。 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/directives.html#v-model)</td>

<td>√</td>

<td>√</td>

<td>√</td>

<td></td>

</tr>

<tr>

<td>v-slot</td>

<td>提供具名插槽或需要接收 `prop` 的插槽。 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/directives.html#v-slot)</td>

<td>√</td>

<td>√</td>

<td>√</td>

<td></td>

</tr>

<tr>

<td>v-pre</td>

<td>跳过这个元素和它的子元素的编译过程。 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/directives.html#v-pre)</td>

<td>√</td>

<td>√</td>

<td>x</td>

<td></td>

</tr>

<tr>

<td>v-cloak</td>

<td>这个指令保持在元素上直到关联组件实例结束编译。 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/directives.html#v-cloak)</td>

<td>√</td>

<td>x</td>

<td>x</td>

<td></td>

</tr>

<tr>

<td>v-once</td>

<td>只渲染元素和组件一次。 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/directives.html#v-once)</td>

<td>√</td>

<td>√</td>

<td>x</td>

<td></td>

</tr>

<tr>

<td>v-is</td>

<td>在 `DOM` 内模板使用时，模板受原生 `HTML` 解析规则的约束。 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/directives.html#v-is)</td>

<td>√</td>

<td>x</td>

<td>x</td>

<td>-</td>

</tr>

</tbody>

</table>

####  特殊属性

<table>

<thead>

<tr>

<th>特殊属性</th>

<th>描述</th>

<th>H5</th>

<th>App端</th>

<th>微信小程序</th>

<th>说明</th>

</tr>

</thead>

<tbody>

<tr>

<td>key</td>

<td>`key` 的特殊 `attribute` 主要用在 `Vue` 的虚拟 `DOM` 算法，在新旧 `nodes` 对比时辨识 `VNodes`。 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/special-attributes.html#key)</td>

<td>√</td>

<td>√</td>

<td>√</td>

<td></td>

</tr>

<tr>

<td>ref</td>

<td>ref 被用来给元素或子组件注册引用信息。 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/special-attributes.html#ref)</td>

<td>√</td>

<td>√</td>

<td>√</td>

<td>非 H5 平台只能获取 `vue` 组件实例不能获取到内置组件实例</td>

</tr>

<tr>

<td>is</td>

<td>使用[动态组件<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/guide/component-dynamic-async.html)。 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/special-attributes.html#is)</td>

<td>√</td>

<td>√</td>

<td>x</td>

<td>-</td>

</tr>

</tbody>

</table>

####  内置组件

<table>

<thead>

<tr>

<th>内置组件</th>

<th>描述</th>

<th>H5</th>

<th>App端</th>

<th>微信小程序</th>

</tr>

</thead>

<tbody>

<tr>

<td>component</td>

<td>渲染一个“元组件”为动态组件。依 `is` 的值，来决定哪个组件被渲染。 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/built-in-components.html#component)</td>

<td>√</td>

<td>√</td>

<td>x</td>

</tr>

<tr>

<td>transition</td>

<td>作为单个元素/组件的过渡效果。 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/built-in-components.html#transition)</td>

<td>√</td>

<td>x</td>

<td>x</td>

</tr>

<tr>

<td>transition-group</td>

<td>作为多个元素/组件的过渡效果。 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/built-in-components.html#transition-group)</td>

<td>√</td>

<td>x</td>

<td>x</td>

</tr>

<tr>

<td>keep-alive</td>

<td>包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们，主要用于保留组件状态或避免重新渲染。 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/built-in-components.html#keep-alive)</td>

<td>√</td>

<td>x</td>

<td>x</td>

</tr>

<tr>

<td>slot</td>

<td>作为组件模板之中的内容分发插槽。`slot` 元素自身将被替换。 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/built-in-components.html#slot)</td>

<td>√</td>

<td>√</td>

<td>√</td>

</tr>

<tr>

<td>teleport</td>

<td>将模板的一部分移动到 `DOM` 中 `Vue app` 之外的其他位置。 [详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/built-in-components.html#teleport)</td>

<td>√</td>

<td>x</td>

<td>x</td>

</tr>

</tbody>

</table>

####  响应性 API

#####  响应性基础 API

<table>

<thead>

<tr>

<th>响应性基础 API</th>

<th>描述</th>

<th>H5</th>

<th>App端</th>

<th>微信小程序</th>

</tr>

</thead>

<tbody>

<tr>

<td>reactive</td>

<td>返回对象的响应式副本。[详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/basic-reactivity.html#reactive)</td>

<td>√</td>

<td>√</td>

<td>√</td>

</tr>

<tr>

<td>readonly</td>

<td>获取一个对象 (响应式或纯对象) 或 `ref` 并返回原始代理的只读代理。[详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/basic-reactivity.html#readonly)</td>

<td>√</td>

<td>√</td>

<td>√</td>

</tr>

<tr>

<td>isProxy</td>

<td>检查对象是 `reactive` 还是 `readonly`创建的代理。[详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/basic-reactivity.html#isproxy)</td>

<td>√</td>

<td>√</td>

<td>√</td>

</tr>

<tr>

<td>isReactive</td>

<td>检查对象是否是 `reactive`创建的响应式 `proxy`。[详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/basic-reactivity.html#isreactive)</td>

<td>√</td>

<td>√</td>

<td>√</td>

</tr>

<tr>

<td>isReadonly</td>

<td>检查对象是否是由`readonly`创建的只读代理。[详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/basic-reactivity.html#isreadonly)</td>

<td>√</td>

<td>√</td>

<td>√</td>

</tr>

<tr>

<td>toRaw</td>

<td>返回 `reactive` 或 `readonly` 代理的原始对象。[详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/basic-reactivity.html#toraw)</td>

<td>√</td>

<td>√</td>

<td>√</td>

</tr>

<tr>

<td>markRaw</td>

<td>标记一个对象，使其永远不会转换为代理。返回对象本身。[详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/basic-reactivity.html#markraw)</td>

<td>√</td>

<td>√</td>

<td>√</td>

</tr>

<tr>

<td>shallowReactive</td>

<td>创建一个响应式代理，该代理跟踪其自身 `property` 的响应性，但不执行嵌套对象的深度响应式转换 (暴露原始值)。[详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/basic-reactivity.html#shallowreactive)</td>

<td>√</td>

<td>√</td>

<td>√</td>

</tr>

<tr>

<td>shallowReadonly</td>

<td>创建一个代理，使其自身的 `property` 为只读，但不执行嵌套对象的深度只读转换 (暴露原始值)。[详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/basic-reactivity.html#shallowreadonly)</td>

<td>√</td>

<td>√</td>

<td>√</td>

</tr>

</tbody>

</table>

#####  Refs

<table>

<thead>

<tr>

<th>Refs</th>

<th>描述</th>

<th>H5</th>

<th>App端</th>

<th>微信小程序</th>

</tr>

</thead>

<tbody>

<tr>

<td>ref</td>

<td>接受一个内部值并返回一个响应式且可变的 `ref` 对象。`ref` 对象具有指向内部值的单个 property `.value`。[详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/refs-api.html#ref)</td>

<td>√</td>

<td>√</td>

<td>√</td>

</tr>

<tr>

<td>unref</td>

<td>如果参数为 `ref`，则返回内部值，否则返回参数本身。这是 `val = isRef(val) ? val.value : val`。[详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/refs-api.html#unref)</td>

<td>√</td>

<td>√</td>

<td>√</td>

</tr>

<tr>

<td>toRef</td>

<td>可以用来为源响应式对象上的 `property` 性创建一个 `ref`。然后可以将 `ref` 传递出去，从而保持对其源 `property` 的响应式连接。[详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/refs-api.html#toref)</td>

<td>√</td>

<td>√</td>

<td>√</td>

</tr>

<tr>

<td>toRefs</td>

<td>将响应式对象转换为普通对象，其中结果对象的每个 `property` 都是指向原始对象相应 `property` 的`ref`。[详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/refs-api.html#torefs)</td>

<td>√</td>

<td>√</td>

<td>√</td>

</tr>

<tr>

<td>isRef</td>

<td>检查值是否为`ref`对象[详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/refs-api.html#isref)</td>

<td>√</td>

<td>√</td>

<td>√</td>

</tr>

<tr>

<td>customRef</td>

<td>创建一个自定义的 `ref`，并对其依赖项跟踪和更新触发进行显式控制。[详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/refs-api.html#customref)</td>

<td>√</td>

<td>√</td>

<td>√</td>

</tr>

<tr>

<td>shallowRef</td>

<td>创建一个 `ref`，它跟踪自己的 `.value` 更改，但不会使其值成为响应式的。[详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/refs-api.html#shallowref)</td>

<td>√</td>

<td>√</td>

<td>√</td>

</tr>

<tr>

<td>triggerRef</td>

<td>手动执行与 `shallowRef` 关联的任何效果。[详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/refs-api.html#triggerref)</td>

<td>√</td>

<td>√</td>

<td>√</td>

</tr>

</tbody>

</table>

####  Computed 与 watch

<table>

<thead>

<tr>

<th>Computed 与 watch</th>

<th>描述</th>

<th>H5</th>

<th>App端</th>

<th>微信小程序</th>

</tr>

</thead>

<tbody>

<tr>

<td>computed</td>

<td>使用 `getter` 函数，并为从 `getter` 返回的值返回一个不变的响应式 `ref` 对象。[详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/computed-watch-api.html#computed)</td>

<td>√</td>

<td>√</td>

<td>√</td>

</tr>

<tr>

<td>watchEffect</td>

<td>在响应式地跟踪其依赖项时立即运行一个函数，并在更改依赖项时重新运行它。[详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/computed-watch-api.html#watcheffect)</td>

<td>√</td>

<td>√</td>

<td>√</td>

</tr>

<tr>

<td>watch</td>

<td>`watch` API 与选项式 API `this.$watch` (以及相应的 `watch` 选项) 完全等效。`watch` 需要侦听特定的 `data` 源，并在单独的回调函数中副作用。[详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/computed-watch-api.html#watch)</td>

<td>√</td>

<td>√</td>

<td>√</td>

</tr>

</tbody>

</table>

####  组合式 API

<table>

<thead>

<tr>

<th>组合式 API</th>

<th>描述</th>

<th>H5</th>

<th>App端</th>

<th>微信小程序</th>

</tr>

</thead>

<tbody>

<tr>

<td>setup</td>

<td>一个组件选项，在创建组件之前执行，一旦 `props` 被解析，并作为组合式 `API` 的入口点。[详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/composition-api.html#setup)</td>

<td>√</td>

<td>√</td>

<td>√</td>

</tr>

<tr>

<td>生命周期钩子</td>

<td>可以使用直接导入的 `onX` 函数注册生命周期钩子。[详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/composition-api.html#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E9%92%A9%E5%AD%90)</td>

<td>√</td>

<td>√</td>

<td>√</td>

</tr>

<tr>

<td>Provide / Inject</td>

<td>provide 和 inject 启用依赖注入。只有在使用当前活动实例的 `setup()` 期间才能调用这两者。[详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/composition-api.html#provide-inject)</td>

<td>√</td>

<td>√</td>

<td>√</td>

</tr>

<tr>

<td>getCurrentInstance</td>

<td>允许访问对高级使用或库创建者有用的内部组件实例。[详情<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/api/composition-api.html#getcurrentinstance)</td>

<td>√</td>

<td>√</td>

<td>√</td>

</tr>

</tbody>

</table>

##  8 Vue2升级Vue3

###  main.js

```js

    // 之前 - Vue 2
    import Vue from 'vue'
    import App from './App'
    Vue.config.productionTip = false    // vue3 不再需要
    App.mpType = 'app'    // vue3 不再需要
    const app = new Vue({
    ...App
    })
    app.$mount()
```

```js

    import App from './App'
    import { createSSRApp } from 'vue'
    // 不能修改导出的 createApp 方法名，不能修改从 Vue 中导入的 createSSRApp。
    export function createApp() {
      const app = createSSRApp(App)
      return {
          app
      }
    }
```

###  环境变量

```js

    // 配置环境变量
    // 根目录.env文件 必须 VUE_APP_ 开头
    VUE_APP_SOME_KEY = 123

    // 获取环境变量
    process.env.NODE_ENV         // 应用运行的模式
    process.env.VUE_APP_SOME_KEY // 123

    // vue3
    // 配置环境变量
    // 根目录.env文件 必须 VITE_ 开头
    VITE_SOME_KEY = 123

    // 获取环境变量
    process.env.NODE_ENV          // 应用运行的模式
    import.meta.env.VITE_SOME_KEY // 123
```

*   Vue2 更多 [设置环境变量方式<span><span class="sr-only">(opens new window)</span></span>](https://uniapp.dcloud.net.cn/tutorial/env.html#env)
*   Vue3 非H5端，应直接访问 process.env.* 获取环境变量，不支持访问 process

###  全局属性

例如：全局网络请求

```js

    // 之前 - Vue 2
    Vue.prototype.$http = () => {};

    // 之后 - Vue 3
    const app = createApp({});
    app.config.globalProperties.$http = () => {};
```

###  插件使用

例如：使用 vuex 的 store

```js

    // 之前 - Vue 2
    import store from "./store";
    Vue.prototype.$store = store;

    // 之后 - Vue 3
    import store from "./store";
    const app = createApp(App);
    app.use(store);
```

###  项目根目录必需创建 index.html 文件

粘贴复制如下内容：

```js

    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
        />
        <title></title>
        <!--preload-links-->
        <!--app-context-->
      </head>
      <body>
        <div id="app"><!--app-html--></div>
        <script type="module" src="/main.js"></script>
      </body>
    </html>
```

###  只支持使用 ES6 模块规范

commonJS 需改为 ES6 模块规范

####  模块导入

```js

    // 之前 - Vue 2, 使用 commonJS
    var utils = require("../../../common/util.js");

    // 之后 - Vue 3， 只支持 ES6 模块
    import utils from "../../../common/util.js";
```

####  模块导出

```js

    // 之前 - Vue 2, 依赖如使用 commonJS 方式导出
    module.exports.X = X;

    // 之后 - Vue 3， 只支持 ES6 模块
    export default { X };
```

###  vuex 用法

```js

    // vue2
    import Vue from "vue";
    import Vuex from "vuex";
    Vue.use(Vuex);
    const store = new Vuex.Store({
      state: {},
    });
    export default store;

    // vue3
    import { createStore } from "vuex";
    const store = createStore({
      state: {},
    });
    export default store;
```

###  生命周期的适配

在 Vue3 中组件卸载的生命周期被重新命名

*   `destroyed` 修改为 `unmounted`
*   `beforeDestroy` 修改为 `beforeUnmount`

###  事件的适配

Vue3 现在提供了一个`emits`选项，类似于现有`props`选项。此选项可用于定义组件可以向其父对象发出的事件， [更多<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/guide/migration/emits-option.html#overview)

**强烈建议使用`emits`记录每个组件发出的所有事件。**

这一点特别重要，因为去除了`.native`修饰符。`emits` 现在在未使用声明的事件的所有侦听器都将包含在组件的中`$attrs`，默认情况下，该侦听器将绑定到组件的根节点。

```js

    <template>
      <button @click="onClick">OK</button>
    </template>
    <script>
      export default {
        emits: ["click"],
        methods: {
          onClick() {
            this.$emit("click", "OK");
          },
        },
      };
    </script>
```

###  Vue3 项目部分小程序端事件延迟或调用失败

可在执行事件的元素上添加 `data-eventsync="true"` 属性以解决此问题，如：

```js

    <template>
      <button @click="onClick" data-eventsync="true">OK</button>
    </template>
```

###  v-model 的适配

Vue3 的 v-model 相对 Vue2 来说 ，有了较大的改变。可以使用多 `model`,相应语法也有变化。[更多<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/guide/migration/v-model.html#%E6%A6%82%E8%A7%88)

####  修改 modelValue

用于自定义组件时，Vue3 v-model prop 和事件默认名称已更改 `props.value` 修改为 `props.modelValue` ,`event.value` 修改为 `update:modelValue`

```js

    export default {
      props: {
        // value:String,
        // 替换 value 为 modelValue
        modelValue: String,
      },
    };
```

####  事件返回

将之前的 `this.$emit('input')` 修改为 `this.$emit('update:modelValue')` ，vue3 中将省略这一步骤

自定义组件上的 v-model 相当于传递了 modelValue prop 并接收抛出的 update:modelValue 事件：

```js

    <ChildComponent v-model="pageTitle" />

    <!-- 是以下的简写: -->

    <ChildComponent
      :modelValue="pageTitle"
      @update:modelValue="pageTitle = $event"
    />
```

若需要更改 model 名称，作为组件内 model 选项的替代，现在我们可以将一个 argument 传递给 v-model：

```js

    <ChildComponent v-model:title="pageTitle" />

    <!-- 是以下的简写: -->

    <ChildComponent :title="pageTitle" @update:title="pageTitle = $event" />
```

###  插槽的适配

Vue3 将不支持 `slot="xxx"` 的用法 ，请使用 `v-slot:xxx` 用法。[更多<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/guide/component-slots.html#%E5%85%B7%E5%90%8D%E6%8F%92%E6%A7%BD)

```js

    <!--  Vue2 支持的用法 -->
    <uni-nav-bar>
      <view slot="left" class="city">
        <!-- ..  -->
      </view>
    </uni-nav-bar>
```

```js

    <!--  Vue3 支持的用法 -->
    <uni-nav-bar>
      <template v-slot:left>
        <view class="city">
          <!-- ..  -->
        </view>
      </template>
    </uni-nav-bar>
```

###  不再支持过滤器

从 Vue 3.0 开始，过滤器已删除，不再支持，建议用方法调用或计算属性替换它们。[更多<span><span class="sr-only">(opens new window)</span></span>](https://v3.cn.vuejs.org/guide/migration/filters.html#%E6%A6%82%E8%A7%88)

###  API `Promise 化` 调用结果的方式

在 Vue3 中，处理 API `Promise 化` 调用结果的方式不同于 Vue2。[更多<span><span class="sr-only">(opens new window)</span></span>](https://uniapp.dcloud.io/api/#api-promise-%E5%8C%96)

*   Vue3 中，调用成功会进入 then 方法，调用失败会进入 catch 方法
*   Vue2 中，调用无论成功还是失败，都会进入 then 方法，返回数据的第一个参数是错误对象，第二个参数是返回数据

**转换方法**

```js

    // Vue 2 转 Vue 3, 在 main.js 中写入以下代码即可
    function isPromise(obj) {
      return (
        !!obj &&
        (typeof obj === "object" || typeof obj === "function") &&
        typeof obj.then === "function"
      );
    }

    uni.addInterceptor({
      returnValue(res) {
        if (!isPromise(res)) {
          return res;
        }
        return new Promise((resolve, reject) => {
          res.then((res) => {
            if (res[0]) {
              reject(res[0]);
            } else {
              resolve(res[1]);
            }
          });
        });
      },
    });
```

```js

    // Vue 3 转 Vue 2, 在 main.js 中写入以下代码即可
    function isPromise(obj) {
      return (
        !!obj &&
        (typeof obj === "object" || typeof obj === "function") &&
        typeof obj.then === "function"
      );
    }

    uni.addInterceptor({
      returnValue(res) {
        if (!isPromise(res)) {
          return res;
        }
        const returnValue = [undefined, undefined];
        return res
          .then((res) => {
            returnValue[1] = res;
          })
          .catch((err) => {
            returnValue[0] = err;
          })
          .then(() => returnValue);
      },
    });
```

###  生命周期钩子的组合式 API 使用方式

在 Vue3 组合式 API 中，也需要遵循 uni-app 生命周期钩子规范, 如 onLaunch 等应用生命周期仅可在 App.vue 中监听，使用中请注意生命周期钩子的适用范围。[查看全部生命周期钩子<span><span class="sr-only">(opens new window)</span></span>](https://uniapp.dcloud.net.cn/collocation/frame/lifecycle)

只能在 `<script setup>` 单文件语法糖或 `setup()` 方法中使用生命周期钩子，以 A 页面跳转 B 页面传递参数为例：

```js

    // 从 A 页面跳转 B 页面时传递参数 ?id=1&name=uniapp，xxx 为跳转的页面路径
    //uni.navigateTo({
    //  url: 'xxx?id=1&name=uniapp'
    //})

    // 方法一：在 B 页面 <script setup> 中
    <script setup>
      import {
        onLoad,
        onShow
      } from "@dcloudio/uni-app";

      // onLoad 接受 A 页面传递的参数
      onLoad((option) => {
        console.log("B 页面 onLoad:", option); //B 页面 onLoad: {id: '1', name: 'uniapp'}
      });

      onShow(() => {
        console.log("B 页面 onShow");
      });
    </script>
```

```js

    // 方法二：在 B 页面 setup() 中
    <script>
      import {
        onLoad,
        onShow,
      } from "@dcloudio/uni-app";

      export default {
        setup() {
          // onLoad 接受 A 页面传递的参数
          onLoad((option) => {
            console.log("B 页面 onLoad:", option); //B 页面 onLoad: {id: '1', name: 'uniapp'}
          });

          onShow(() => {
            console.log("B 页面 onShow");
          });
        }
      }
    </script>
```

###  $mp调整为 $scope

在 Vue3 中，this 对象下的 `$mp` 调整为 `$scope`

###  在 nvue 使用 Vuex

在 Vue3 中，如果 nvue 使用了 Vuex 的相关 API，需要在 main.js 的 createApp 的返回值中 return 一下 Vuex 示例：

```js

    import Vuex from "vuex";
    export function createApp() {
      const app = createSSRApp(App);
      app.use(store);
      return {
        app,
        Vuex, // 如果 nvue 使用 vuex 的各种map工具方法时，必须 return Vuex
      };
    }
```

###  需主动开启 sourcemap

App，小程序端源码调试，需要在 vite.config.js 中主动开启 sourcemap

```js

    import { defineConfig } from "vite";
    import uni from "@dcloudio/vite-plugin-uni";

    /**
     * @type {import('vite').UserConfig}
     */

    export default defineConfig({
      build: {
        sourcemap: true,
      },

      plugins: [uni()],
    });
```

###  小程序平台中监听原生的点击事

在 vue3 的小程序平台中，监听原生的点击事件可以先使用 tap。 在 vue3 中，移除了.native 修饰符，所以编译器无法预知 click 是要触发原生事件，还是组件的自定义事件，故并未转换成小程序的 tap 事件。

###  vue3 支持的手机版本最低到多少

> vue3 支持的范围是：Android > 4.4（具体因系统 webview 版本而异，原生安卓系统升级过系统 webview 一般 5.0 即可，国产安卓系统未使用 x5 内核时一般需 7.0 以上）, ios >= 10

> Android < 4.4，配置 X5 内核支持，首次需要联网下载，可以配置下载 X5 内核成功后启动应用，[详情<span><span class="sr-only">(opens new window)</span></span>](https://uniapp.dcloud.net.cn/collocation/manifest.html#appwebview)

###  vue3 nvue 暂不支持 recycle-list 组件

vue3 nvue 暂不支持 recycle-list 组件

###  h5 平台发行时，会默认启动摇树

vue3 在 h5 平台发行时，为了优化包体积大小，会默认启动摇树，仅打包明确使用的 api， 如果要关闭摇树，可以在 manifest.json 中配置：

```js

    "h5": {
        "optimization": {
            "treeShaking": {
                "enable": false
            }
        }
    }
```

###  通过 props 来获取页面参数

vue3 全平台新增：通过 props 来获取页面参数的使用方式

```js

    <script setup>
      // 页面可以通过定义 props 来直接接收 url 传入的参数
      // 如：uni.navigateTo({ url: '/pages/index/index?id=10' })
      const props = defineProps({
        id: String,
      });
      console.log("id=" + props.id); // id=10
    </script>
```

```js

    <script>
      // 页面可以通过定义 props 来直接接收 url 传入的参数
      // 如：uni.navigateTo({ url: '/pages/index/index?id=10' })
      export default {
        props: {
          id: {
            type: String,
          },
        },
        setup(props) {
          console.log("id=" + props.id); // id=10
        },
      };
    </script>
```

##  9 跨平台兼容

**关于各端的管理规则需要耐心学习**

每个端，有每个端的管理规则，这不是uni-app在技术层面上可以抹平的：

*   比如H5端的浏览器有跨域限制；
*   比如微信小程序会强制要求https链接，并且所有要联网的服务器域名都要配到微信的白名单中；
*   比如App端，iOS对隐私控制和虚拟支付控制非常严格；
*   比如App端，Android、国产rom各种兼容性差异，尤其是因为谷歌服务被墙，导致的push、定位等开发混乱的坑

###  H5正常但App异常的可能性

*   body的元素选择器请改为page，同样，div和ul和li等改为view、span和font改为text、a改为navigator、img改为image...
*   使用了非H5端不支持的API 小程序和App的js运行在jscore下而不是浏览器里，没有浏览器专用的js对象，比如document、xmlhttp、cookie、window、location、navigator、localstorage、websql、indexdb、webgl等对象。

###  H5正常但小程序异常的可能性

*   同上
*   v-html在h5和app-vue均支持，但小程序不支持
*   小程序要求连接的网址都要配白名单

###  小程序正常但App异常的可能性

*   vue页面在App端的渲染引擎默认是系统webview（不是手机自带浏览器，是rom的webview），在较老的手机上，比如Android4.4、5.0或iOS8，一些新出的css语法是不支持的。注意这不意味着不能使用flex，Android4.4也支持flex，只是不要使用太新的css。可以找Android4.4手机或使用pc模拟器实际测试下，大多数国产Android模拟器都是4.4或5.0

小程序不存在浏览器兼容问题，它内置了几十M自己的定制webview。所以如果你的H5和小程序界面正常，而App界面异常，大多是因为css兼容性

**解决这类问题：**

放弃老款手机支持 不用使用太新的css语法，可以在caniuse查询 从 uni-app 2.5.3 起，Android端支持引入腾讯x5浏览器内核，可以抹平低端Android的浏览器兼容性问题

###  小程序或App正常，但H5异常的可能性

*   在 uni-app 2.4.7 以前，H5端不支持微信小程序自定义组件，即 wxcomponents 下的组件，此时可能产生兼容问题。从 2.4.7 起，H5也支持微信自定义组件，不再存在这这方面兼容问题。
*   App端使用了App特有的API和功能，比如plus、Native.js、subNVue、原生插件等
*   使用了小程序专用的功能，比如微信卡券、小程序插件、微信小程序云开发。对于云开发，建议使用可跨端的uniCloud

###  App正常，小程序、H5异常的可能性

*   代码中使用了App端特有的plus、Native.js、subNVue、原生插件等功能

###  区别于传统 web 开发的注意

**JS注意**

*   非H5端，不能使用浏览器自带对象，比如document、window、localstorage、cookie等，更不能使用jquery等依赖这些浏览器对象的框架。因为各家小程序快应用都不支持这些对象。
*   没有这些浏览器自带对象并不影响业务开发，uni提供的api足够完成业务。
*   uni的api在编译到web平台运行时，其实也会转为浏览器的js api。

> *   App端若要使用操作window、document的库，需要通过renderjs来实现。
> *   uni的api是多端可用的。在条件编译区，每个平台的专有api也可以使用，比如wx.、plus.等api可以分别在微信下和app下使用。
> *   出于降低小程序向uni-app迁移成本的考虑，wx的api在app里也可以直接运行，比如写wx.request和uni.request是一样的，但仍然建议仅在微信的条件编译区使用wx的api。

**Tag注意**

*   uni-app的tag同小程序的tag，和HTML的tag不一样，比如div要改成view，span要改成text、a要改成navigator。
*   出于降低h5应用向uni-app迁移成本的考虑，写成div、span也可以运行在app和小程序上，因为uni-app编译器会把这些HTML标签编译为小程序标签。但仍然建议养成新习惯。

**Css注意**

*   虽然大部分css样式在微信小程序和app中都可以支持，但推荐使用flex布局模型，这种布局更灵活高效且支持更多平台(比如nvue、快应用只支持flex布局)
*   单位方面，uni-app默认为rpx。这是一种可跨端的通用单位

**工程目录注意**

*   页面文件：放到pages目录下；推荐方案：新建一个页面目录，然后创建一个目录同名的.vue文件，如/pages/list/list.vue，接着在pages.json里完成注册。这与小程序的策略相同。
*   自定义组件：放到component目录
*   静态资源：如图片，固定放到static目录下。这是webpack的规则

###  H5 开发注意

**H5 发布到服务器注意**

*   配置发行后的路径（发行在网站根目录可不配置），比如发行网站路径是 www.xxx.com/html5，在 manifest.json 文件内编辑 h5 节点，router 下增加 base 属性为 html5

![](https://s.poetries.work/uploads/2023/02/81d1e7501f69bfb2.png)

*   点击菜单 发行-> H5
*   在当下项目下的 unpackage/dist/build/h5 目录找到出的资源，部署服务器（或者使用本地服务器预览），如需部署到相对路径（支持本地file协议打开）参考：https://ask.dcloud.net.cn/article/37432

**引用第三方 js 的方式：**

*   通过 npm 引入（通过条件编译，只有是 h5 平台才 import 相应的库）
*   在 manifest.json 文件编辑 h5 节点的 `template` 属性，填写 html 模版路径，在 html 模版里面可以使用 script 的方式引入三方的 js，如下示例是加了百度统计的 html 模板部分代码

```js

    <!-- ..  -->
    <body>
                <noscript>
                    <strong>Please enable JavaScript to continue.</strong>
                </noscript>
                <div id="app"></div>
                <!-- built files will be auto injected -->
                <script>
                    var _hmt = _hmt || [];
                    (function() {
                        var hm = document.createElement("script");
                        hm.src = "https://hm.baidu.com/hm.js?xxxxxx";
                        var s = document.getElementsByTagName("script")[0];
                        s.parentNode.insertBefore(hm, s);
                    })();
                </script>
    </body>
    <!-- ..  -->
```

*   H5 版 uni-app 全支持 vue 语法，所以可能造成部分写法在 H5 端生效，在小程序或 App 端不生效
*   H5 校验了更严格的 vue 语法，有些写法不规范会报警，比如： data 后面写对象会报警，必须写 function；不能修改 props 的值；组件最外层 template 节点下不允许包含多个节点等
*   编译为 H5 版后生成的是单页应用（SPA）
*   如果遇到跨域造成js无法联网，注意网络请求（request、uploadFile、downloadFile等）在浏览器存在跨域限制，解决方案有详见：https://ask.dcloud.net.cn/article/35267
*   APP 和小程序的导航栏和 tabbar 均是原生控件，元素区域坐标是不包含原生导航栏和 tabbar 的；而 H5 里导航栏和 tabbar 是 div 模拟实现的，所以元素坐标会包含导航栏和tabbar的高度。为了优雅的解决多端高度定位问题，uni-app 新增了2个css变量：--window-top 和 --window-bottom，这代表了页面的内容区域距离顶部和底部的距离。举个实例，如果你想在原生tabbar 上方悬浮一个菜单，之前写 bottom:0。这样的写法编译到 h5 后，这个菜单会和 tabbar 重叠，位于屏幕底部。而改为使用 bottom:var(--window-bottom)，则不管在 app 下还是在h5下，这个菜单都是悬浮在 tabbar 上浮的。这就避免了写条件编译代码。当然仍然也可以使用 H5 的条件编译处理界面的不同
*   CSS 內使用 vh 单位的时候注意 100vh 包含导航栏，使用时需要减去导航栏和 tabBar 高度，部分浏览器还包含浏览器操作栏高度，使用时请注意
*   正常支持 rpx，px 是真实物理像素。暂不支持通过设 manifest.json 的 "transformPx" : true，把 px 当动态单位使用
*   使用罗盘、地理位置、加速计等相关接口需要使用 https 协议，本地预览（localhost）可以使用 http 协议
*   组件内（页面除外）不支持 onLoad、onShow 等页面生命周期
*   为避免和内置组件冲突，自定义组件请加上前缀（但不能是 u 和 uni）。比如可使用的自定义组件名称：my-view、m-input、we-icon，例如不可使用的自定义组件名称：u-view、uni-input，如果已有项目使用了可能造成冲突的名称，请修改名称，另外微信小程序下自定义组件名称不能以 wx 开头

###  小程序开发注意

**vendor.js 过大的处理方式**

小程序工具提示vendor.js过大，已经跳过es6向es5转换。这个转换问题本身不用理会，因为vendor.js已经是es5的了。

关于体积控制，参考如下

*   HBuilderX创建的项目勾选运行-->运行到小程序模拟器-->运行时是否压缩代码
*   cli创建的项目可以在package.json中添加参数--minimize，示例："dev:mp-weixin": "cross-env NODE_ENV=development UNI_PLATFORM=mp-weixin vue-cli-service uni-build --watch --minimize"
*   使用分包优化

建议关注微信[小程序当前bug列表<span><span class="sr-only">(opens new window)</span></span>](https://developers.weixin.qq.com/community/develop/issueList?type=&status=develop&search=)，对已知Bug，想办法避让。

##  10 uni-app存储

uni-app的存储方案比5+app要少，因为cookie、localstorage、sessionstorage、websql、indexedDB只有h5端支持，其他端都不支持。

*   `uni.storage`的键值对存储，这个是全端支持的。

*   uni-app的Storage在不同端的实现不同，`uni.storage`在app侧，映射为plus.storage；h5侧映射为localstorage；各个小程序平台映射为其自带的storage键值对存储：

*   H5端为localStorage，浏览器限制5M大小，是缓存概念，可能会被清理

*   App端为原生的plus.storage，无大小限制，不是缓存，持久化

*   各个小程序端为其自带的storage api，数据存储生命周期跟小程序本身一致，即除用户主动删除或超过一定时间被自动清理，否则数据都一直可用。

*   微信小程序单个 key 允许存储的最大数据长度为 1MB，所有数据存储上限为 10MB。

*   支付宝小程序单条数据转换成字符串后，字符串长度最大200*1024。同一个支付宝用户，同一个小程序缓存总上限为10MB。

*   百度、头条小程序文档未说明大小限制

##  11 判断平台

平台判断有 2 种场景，一种是在编译期判断，一种是在运行期判断。

*   编译期判断 编译期判断，即条件编译，不同平台在编译出包后已经是不同的代码

```js

    // #ifdef H5
    alert('只有h5平台才有alert方法');
    // #endif
```

如上代码只会编译到 H5 的发行包里，其他平台的包不会包含如上代码

*   运行期判断 运行期判断是指代码已经打入包中，仍然需要在运行期判断平台，此时可使用 uni.getSystemInfoSync().platform 判断客户端环境是 Android、iOS 还是小程序开发工具（在百度小程序开发工具、微信小程序开发工具、支付宝小程序开发工具中使用 uni.getSystemInfoSync().platform 返回值均为 devtools）

```js

    switch (uni.getSystemInfoSync().platform) {
    	case 'android':
    		console.log('运行Android上');
    		break;
    	case 'ios':
    		console.log('运行iOS上');
    		break;
    	default:
    		console.log('运行在开发者工具上');
    		break;
    }
```

如有必要，也可以在条件编译里自己定义一个变量，赋不同值。在后续运行代码中动态判断环境

##  12 条件编译

###  什么是编译器

`uni-app`能实现一套代码、多端运行，核心是通过`编译器 + 运行时`实现的

*   编译器：将`uni-app`统一代码编译生成每个平台支持的特有代码；如在小程序平台，编译器将`.vue`文件拆分生成`wxml`、`wxss`、`js`等代码。
*   运行时：动态处理数据绑定、事件代理，保证Vue和平台宿主数据的一致性

`uni-app`项目根据所依赖的`Vue`版本不同，编译器的实现也不同：

*   vue2：`uni-app`编译器基于wepback实现
*   vue3：`uni-app`编译器基于Vite实现，编译速度更快，详见：[vue3和vite双向加持，uni-app性能再次提升<span><span class="sr-only">(opens new window)</span></span>](https://ask.dcloud.net.cn/article/39628)

###  条件编译

条件编译是用特殊的注释作为标记，在编译时根据这些特殊的注释，将注释里面的代码编译到不同平台。

**写法：**以 #ifdef 或 #ifndef 加 **%PLATFORM%** 开头，以 #endif 结尾。

*   #ifdef：if defined 仅在某平台存在
*   #ifndef：if not defined 除了某平台均存在
*   **%PLATFORM%**：平台名称

<table>

<thead>

<tr>

<th>条件编译写法</th>

<th>说明</th>

</tr>

</thead>

<tbody>

<tr>

<td>#ifdef **APP-PLUS** 需条件编译的代码 #endif</td>

<td>仅出现在 App 平台下的代码</td>

</tr>

<tr>

<td>#ifndef **H5** 需条件编译的代码 #endif</td>

<td>除了 H5 平台，其它平台均存在的代码</td>

</tr>

<tr>

<td>#ifdef **H5** || **MP-WEIXIN** 需条件编译的代码 #endif</td>

<td>在 H5 平台或微信小程序平台存在的代码（这里只有||，不可能出现&&，因为没有交集）</td>

</tr>

</tbody>

</table>

**%PLATFORM%** **可取值如下：**

<table>

<thead>

<tr>

<th style="text-align: left;">值</th>

<th style="text-align: left;">生效条件</th>

</tr>

</thead>

<tbody>

<tr>

<td style="text-align: left;">VUE3</td>

<td style="text-align: left;">HBuilderX 3.2.0+ [详情<span><span class="sr-only">(opens new window)</span></span>](https://ask.dcloud.net.cn/article/37834)</td>

</tr>

<tr>

<td style="text-align: left;">APP-PLUS</td>

<td style="text-align: left;">App</td>

</tr>

<tr>

<td style="text-align: left;">APP-PLUS-NVUE或APP-NVUE</td>

<td style="text-align: left;">App nvue 页面</td>

</tr>

<tr>

<td style="text-align: left;">APP-ANDROID</td>

<td style="text-align: left;">App Android 平台 仅限 uts文件</td>

</tr>

<tr>

<td style="text-align: left;">APP-IOS</td>

<td style="text-align: left;">App iOS 平台 仅限 uts文件</td>

</tr>

<tr>

<td style="text-align: left;">H5</td>

<td style="text-align: left;">H5</td>

</tr>

<tr>

<td style="text-align: left;">MP-WEIXIN</td>

<td style="text-align: left;">微信小程序</td>

</tr>

<tr>

<td style="text-align: left;">MP-ALIPAY</td>

<td style="text-align: left;">支付宝小程序</td>

</tr>

<tr>

<td style="text-align: left;">MP-BAIDU</td>

<td style="text-align: left;">百度小程序</td>

</tr>

<tr>

<td style="text-align: left;">MP-TOUTIAO</td>

<td style="text-align: left;">字节跳动小程序</td>

</tr>

<tr>

<td style="text-align: left;">MP-LARK</td>

<td style="text-align: left;">飞书小程序</td>

</tr>

<tr>

<td style="text-align: left;">MP-QQ</td>

<td style="text-align: left;">QQ小程序</td>

</tr>

<tr>

<td style="text-align: left;">MP-KUAISHOU</td>

<td style="text-align: left;">快手小程序</td>

</tr>

<tr>

<td style="text-align: left;">MP-JD</td>

<td style="text-align: left;">京东小程序</td>

</tr>

<tr>

<td style="text-align: left;">MP-360</td>

<td style="text-align: left;">360小程序</td>

</tr>

<tr>

<td style="text-align: left;">MP</td>

<td style="text-align: left;">微信小程序/支付宝小程序/百度小程序/字节跳动小程序/飞书小程序/QQ小程序/360小程序</td>

</tr>

<tr>

<td style="text-align: left;">QUICKAPP-WEBVIEW</td>

<td style="text-align: left;">快应用通用(包含联盟、华为)</td>

</tr>

<tr>

<td style="text-align: left;">QUICKAPP-WEBVIEW-UNION</td>

<td style="text-align: left;">快应用联盟</td>

</tr>

<tr>

<td style="text-align: left;">QUICKAPP-WEBVIEW-HUAWEI</td>

<td style="text-align: left;">快应用华为</td>

</tr>

</tbody>

</table>

**支持的文件**

*   .vue
*   .js
*   .css
*   pages.json
*   各预编译语言文件，如：.scss、.less、.stylus、.ts、.pug

**注意：**

*   条件编译是利用注释实现的，在不同语法里注释写法不一样，js使用 `// 注释`、css 使用 `/* 注释 */`、vue/nvue 模板里使用 `<!-- 注释 -->`；

*   条件编译APP-PLUS包含APP-NVUE和APP-VUE，APP-PLUS-NVUE和APP-NVUE没什么区别，为了简写后面出了APP-NVUE ；

*   使用条件编译请保证`编译前`和`编译后`文件的正确性，比如json文件中不能有多余的逗号；

*   `VUE3` 需要在项目的 `manifest.json` 文件根节点配置 `"vueVersion" : "3"`

####  API 的条件编译

```js

    // #ifdef  %PLATFORM%
    平台特有的API实现
    // #endif
```

![](https://s.poetries.work/uploads/2023/06/e9e00dcd9be42e3f.png)

示例，如下代码不会在 H5 平台上出现：

![](https://s.poetries.work/uploads/2023/06/a08d7d37595b1ae4.png)

除了支持单个平台的条件编译外，还支持**多平台**同时编译，使用 || 来分隔平台名称。

示例，如下代码会在 App 和 H5 平台上出现：

![](https://s.poetries.work/uploads/2023/06/51cc60da10050ef9.png)

####  组件的条件编译

```js

    <!--  #ifdef  %PLATFORM% -->
    平台特有的组件
    <!--  #endif -->
```

示例，如下公众号关注组件仅会在微信小程序中出现：

```js

    <view>
        <view>微信公众号关注组件</view>
        <view>
            <!-- uni-app未封装，但可直接使用微信原生的official-account组件-->
            <!-- #ifdef MP-WEIXIN -->
    		        <official-account></official-account>
    		    <!-- #endif -->
        </view>
    </view>
```

####  样式的条件编译

```js

    /*  #ifdef  %PLATFORM%  */
    平台特有样式
    /*  #endif  */
```

**注意：** 样式的条件编译，无论是 css 还是 sass/scss/less/stylus 等预编译语言中，必须使用 `/*注释*/` 的写法。

正确写法

![](https://s.poetries.work/uploads/2023/06/2eb7f7f5ed83f921.png)

错误写法

![](https://s.poetries.work/uploads/2023/06/12668fa0fe4f8081.png)

####  pages.json 的条件编译

下面的页面，只有运行至 App 时才会编译进去。

![](https://s.poetries.work/uploads/2023/06/60afa102514d0e41.png)

不同平台下的特有功能，以及小程序平台的分包，都可以通过 pages.json 的条件编译来更好地实现。这样，就不会在其它平台产生多余的资源，进而减小包体积。

json的条件编译，如不同平台的key名称相同，cli项目下开发者自己安装的校验器会报错，需自行关闭这些校验器对json相同key的校验规则。如果使用HBuilderX的校验器，无需在意此问题，HBuilderX的语法校验器为此优化过

####  static 目录的条件编译

在不同平台，引用的静态资源可能也存在差异，通过 static 的条件编译可以解决此问题，static 目录下新建不同平台的专有目录

<table>

<thead>

<tr>

<th style="text-align: center;">目录名称</th>

<th style="text-align: center;">说明</th>

</tr>

</thead>

<tbody>

<tr>

<td style="text-align: center;">app-plus</td>

<td style="text-align: center;">App</td>

</tr>

<tr>

<td style="text-align: center;">h5</td>

<td style="text-align: center;">H5</td>

</tr>

<tr>

<td style="text-align: center;">mp-weixin</td>

<td style="text-align: center;">微信小程序</td>

</tr>

<tr>

<td style="text-align: center;">mp-alipay</td>

<td style="text-align: center;">支付宝小程序</td>

</tr>

<tr>

<td style="text-align: center;">mp-baidu</td>

<td style="text-align: center;">百度小程序</td>

</tr>

<tr>

<td style="text-align: center;">mp-qq</td>

<td style="text-align: center;">QQ小程序</td>

</tr>

<tr>

<td style="text-align: center;">mp-toutiao</td>

<td style="text-align: center;">字节小程序</td>

</tr>

<tr>

<td style="text-align: center;">mp-lark</td>

<td style="text-align: center;">飞书小程序</td>

</tr>

<tr>

<td style="text-align: center;">mp-kuaishou</td>

<td style="text-align: center;">快手小程序</td>

</tr>

<tr>

<td style="text-align: center;">mp-jd</td>

<td style="text-align: center;">京东小程序</td>

</tr>

</tbody>

</table>

专有目录下的静态资源只有在特定平台才会编译进去。

如以下目录结构，`a.png` 只有在微信小程序平台才会编译进去，`b.png` 在所有平台都会被编译。

```js

    ┌─static
    │  ├─mp-weixin
    │  │  └─a.png
    │  └─b.png
    ├─main.js
    ├─App.vue
    ├─manifest.json
    └─pages.json
```

####  整体目录条件编译

如果想把各平台的页面文件更彻底的分开，也可以在uni-app项目根目录创建`platforms`目录，然后在下面进一步创建`app-plus`、`mp-weixin`等子目录，存放不同平台的文件

**注意**

*   `platforms`目录下只支持放置页面文件（即页面vue文件），如果需要对其他资源条件编译，建议使用[static 目录的条件编译<span><span class="sr-only">(opens new window)</span></span>](https://uniapp.dcloud.net.cn/tutorial/platform.html#static-%E7%9B%AE%E5%BD%95%E7%9A%84%E6%9D%A1%E4%BB%B6%E7%BC%96%E8%AF%91)。

####  HBuilderX 支持

HBuilderX 为 `uni-app` 的条件编译提供了丰富的支持:

**代码块支持**

在 HBuilderX 中开发 `uni-app` 时，通过输入 **ifdef** 可快速生成条件编译的代码片段

![](https://s.poetries.work/uploads/2023/06/e8036139c9c30f67.png)

**语法高亮**

在 HBuilderX 中对条件编译的代码注释部分提供了语法高亮，可分辨出写法是否正确，使得代码更加清晰（独立js文件需在编辑器右下角切换javascript es6+编辑器，独立css文件暂不支持高亮，但不高亮不影响使用）

![](https://s.poetries.work/uploads/2023/06/e807ecfcedc78113.png)

**正确注释和快速选中**

在 HBuilderX 中，ctrl+alt+/ 即可生成正确注释（js：`// 注释`、css：`/* 注释 */`、vue/nvue模板： `<!-- 注释 -->`）

![](https://s.poetries.work/uploads/2023/06/a088c2f4f839d434.png)

点击 **ifdef** 或 **endif** 可快速选中条件编译部分；点击左侧的折叠图标，可折叠条件编译部分代码。

![](https://s.poetries.work/uploads/2023/06/64e8271d2042f585.png)

####  注意

*   Android 和 iOS 平台不支持通过条件编译来区分，如果需要区分 Android、iOS 平台，请通过调用 uni.getSystemInfo 来获取平台信息。支持`ifios`、`ifAndroid`代码块，可方便编写判断。
*   有些跨端工具可以提供js的条件编译或多态，但这对于实际开发远远不够。uni-app不止是处理js，任何代码都可以多端条件编译，才能真正解决实际项目的跨端问题。另外所谓多态在实际开发中会造成大量冗余代码，很不利于复用和维护。举例，微信小程序主题色是绿色，而百度支付宝小程序是蓝色，你的应用想分平台适配颜色，只有条件编译是代码量最低、最容易维护的。
*   有些公司的产品运营总是给不同平台提不同需求，但这不是拒绝uni-app的理由。关键在于项目里，复用的代码多还是个性的代码多，正常都是复用的代码多，所以仍然应该多端。而个性的代码放到不同平台的目录下，差异化维护。

###  环境变量

uni-app 项目中配置环境变量主要有如下三种方式

**vue-config.js**

在 vue.config.js 中可以修改 webpack 配置，包括环境变量，具体参考 [vue-config.js<span><span class="sr-only">(opens new window)</span></span>](https://uniapp.dcloud.net.cn/collocation/vue-config)。

**package.json**

在自定义条件编译平台时，可以在 package.json 文件的 env 节点下配置环境变量，具体参考 [package.json<span><span class="sr-only">(opens new window)</span></span>](https://uniapp.dcloud.net.cn/collocation/package)

###  编译器配置

你可以通过如下入口，对`uni-app`编译器进行配置：

**manifest.json**

在manifest.json中，你可以配置Vue的版本（Vue2/Vue3），以及发行H5平台路由模式，详见： [manifest.json<span><span class="sr-only">(opens new window)</span></span>](https://uniapp.dcloud.net.cn/collocation/manifest)

**vue.config.js**

在 vue.config.js 中可以修改 webpack 配置，包括环境变量，具体参考 [vue-config.js<span><span class="sr-only">(opens new window)</span></span>](https://uniapp.dcloud.net.cn/collocation/vue-config)。

**vite.config.js**

在 vite.config.js 中可以修改 Vite 配置，包括环境变量，具体参考 [vite.config.js<span><span class="sr-only">(opens new window)</span></span>](https://uniapp.dcloud.net.cn/collocation/vite-config)。

**package.json**

在自定义条件编译平台时，可以在 package.json 文件的 env 节点下配置环境变量，具体参考 [package.json<span><span class="sr-only">(opens new window)</span></span>](https://uniapp.dcloud.net.cn/collocation/package)

**.env**

CLI 创建的项目中可以在根目录中放置 `.env` 文件来指定环境变量，具体参考：[环境变量](https://cli.vuejs.org/zh/guide/mode-and-env.html#环境变量

##  13 web专题

###  宽屏适配指南

uni-app是以移动为先的理念诞生的。从uni-app 2.9起，提供了PC等宽屏的适配方案，完成了全端统一。

PC适配和屏幕适配略有差异。PC适配包含`宽屏适配`和`uni-app内置组件适配PC`两方面的工作。

uni-app内置组件的PC适配，又包括`PC交互习惯的UI调整`和`非webkit浏览器适配`这两部分。这块工作不在本文的讨论范围内，尤其是开发者在PC端可以随意使用普通html元素和组件，不局限于uni-app内置组件。所以本文重点讨论屏幕适配。

uni-app提供的屏幕适配方案，包括3部分：

**1  页面窗体级适配方案：leftWindow、rightWindow、topWindow**

以目前手机屏幕为主window，在左右上，可新扩展 leftWindow、rightWindow、topWindow，这些区域可设定在一定屏幕宽度范围自动出现或消失。这些区域各自独立，切换页面支持在各自的window内刷新，而不是整屏刷新。

各个window之间可以交互通信。

这里有2个例子：

*   hello uni-app：https://hellouniapp.dcloud.net.cn/
*   分栏式的新闻模板：https://static-1fdf8972-67c0-42b4-8790-2021eb9134d1.bspapp.com/#/，这个示例对应的源码在：https://github.com/dcloudio/uni-template-news

新闻示例项目，预览地址https://static-7d133019-9a7e-474a-b7c2-c01751f00ca5.bspapp.com/#/显示The requested file was not found on this server.

以上示例建议使用最新版的chrome、Safari、或firefox访问。可以在PC模式和手机模式分别体验。以上示例源码的运行需使用HBuilderX 2.9+

这些例子特点如下：

*   hello uni-app使用了topWindow和leftWindow，分为上左右3栏。新闻模板使用了rightWindow区域，分为左右2栏。宽屏下点击左边的列表在右边显示详情内容。而窄屏下仍然是点击列表后新开一个页面显示详情内容。
*   leftWindow或rightWindow 里的页面是复用的，不需要重写新闻详情页面，支持把已有详情页面当组件放到 leftWindow或rightWindow 页面中。

这套方案是已知的、最便捷的分栏式宽屏应用适配方案。

**H5 宽屏下 tabBar(选项卡) 的显示与隐藏**

如果在 PC 上不想显示 tabbar 页面可以参考 hello-uniapp，在 app 的首页加载时跳转一个 非tabbar 页, [hello-uniapp<span><span class="sr-only">(opens new window)</span></span>](https://hellouniapp.dcloud.net.cn/) 的隐藏 tabbar 不是媒体查询实现的，当前页不是 tabbar 页面（是pages/component/view/view页），所以没有显示tabbar。

如果是想在有 leftwindow 等窗体的时候，隐藏 tabar 页面的 tabbar，可以用 css 实现（好处是可以和leftwindow等窗体联动）：

```js

      .uni-app--showleftwindow + .uni-tabbar-bottom {
      	display: none;
      }
```

leftWindow等配置，在pages.json里进行。文档见：https://uniapp.dcloud.net.cn/collocation/pages?id=topwindow

pages.json 配置样例

```js

    {
      "globalStyle": {

      },
      "topWindow": {
        "path": "responsive/top-window.vue", // 指定 topWindow 页面文件
        "style": {
          "height": "44px"
        }
      },
      "leftWindow": {
        "path": "responsive/left-window.vue", // 指定 leftWindow 页面文件
        "style": {
          "width": 300
        }
      },
      "rightWindow": {
        "path": "responsive/right-window.vue", // 指定 rightWindow 页面文件
        "style": {
          "width": "calc(100vw - 400px)" // 页面宽度
        },
        "matchMedia": {
          "minWidth": 768 //生效条件，当窗口宽度大于768px时显示
        }
      }
    }
```

*   leftWindow等方案的使用教程

如果已经有了一个为小屏设计的uni-app，在使用leftWindow等窗体适配大屏时，需理清一个思路：现有的小屏内容，放在哪个window里？

如果应用的首页是列表，二级页是详情，此时适合的做法是，将原有的小屏列表作为主window，在右边扩展rightWindow来显示详情。

以新闻示例项目为例，预览地址https://static-1fdf8972-67c0-42b4-8790-2021eb9134d1.bspapp.com/#/。这个项目的源码已经内置于HBuilderX 2.9中，新建uni-app项目时选择新闻/资讯模板。

首先在这个项目的`pages.json`文件中，配置[`rightWindow`选项<span><span class="sr-only">(opens new window)</span></span>](https://uniapp.dcloud.net.cn/collocation/pages?id=rightwindow)，放置一个新页面`right-window.vue`。

```js

    # pages.json
    "rightWindow": {
        "path": "responsive/right-window.vue",
        "style": {
          "width": "calc(100vw - 450px)"
        },
        "matchMedia": {
          "minWidth": 768
        }
      }
```

`rightWindow`对应的页面不需要重写一遍新闻详情的页面逻辑，只需要引入之前的详情页面组件（详情页面`/pages/detail/detail`可自动转化为`pages-detail-detail`组件使用）。

```js

    <!--responsive/right-window.vue-->
    <template>
      <view>
        <!-- 这里将 /pages/detail/detail.nvue 页面作为一个组件使用 -->
        <!-- 路径 “/pages/detail/detail” 转为 “pages-detail-detail” 组件 -->
        <pages-detail-detail ref="detailPage"></pages-detail-detail>
      </view>
    </template>

    <script>
      export default {
        created(e) {
          //监听自定义事件，该事件由详情页列表的点击触发
          uni.$on('updateDetail', (e) => {
            // 执行 detailPage组件，即：/pages/detail/detail.nvue 页面的load方法
            this.$refs.detailPage.load(e.detail);
          })
        },
        onLoad() {},
        methods: {}
      }
    </script>
```

然后在新闻列表页面，处理点击列表后与rightWindow交互通信的逻辑。

```js

    // pages/news/news-page.nvue
    goDetail(detail) {
    	if (this._isWidescreen) { //若为宽屏，则触发右侧详情页的自定义事件，通知右侧窗体刷新新闻详情
    		uni.$emit('updateDetail', {
    			detail: encodeURIComponent(JSON.stringify(detail))
    		})
    	} else { // 若为窄屏，则打开新窗体，在新窗体打开详情页面
    		uni.navigateTo({
    			url: '/pages/detail/detail?query=' + encodeURIComponent(JSON.stringify(detail))
    		});
    	}
    },
```

可以看到，无需太多工作量，就可以快速把一个为手机窄屏开发的应用，快速适配为PC宽屏应用。并且以后的代码维护，仍然是同一套，当业务迭代时不需要多处升级。

rightWindow适用于分栏式应用，那leftWindow一般用于什么场景？

leftWindow比较适合放置导航页面。如果你的应用首页有很多tab和宫格导航，那么可以把它们重组，放在leftWindow作为导航。之前在手机竖屏上依靠多级tab和宫格导航的场景，可以在leftWindow里通过tree或折叠面板方式导航。

leftWindow除了适用于手机应用适配大屏，也适用于重新开发的PC应用，尤其是PC Admin管理控制台。

DCloud官方基于uni-app的pc版，推出了unicloud Admin：https://uniapp.dcloud.net.cn/uniCloud/admin

目前的leftWindow、rightWindow、topWindow 只支持web端。计划后续在Pad App上实现该配置。小程序无法支持该配置。

**2  组件级适配方案：match-media组件**

leftWindow等方案是页面窗体级适配方案。适于独立的页面。那么在同一个页面中，是否可以适配不同屏宽？当然可以，此时可以使用组件级适配方案。

uni-app提供了 [match-media组件<span><span class="sr-only">(opens new window)</span></span>](https://uniapp.dcloud.net.cn/component/match-media) 和配套的 [uni.createMediaQueryObserver<span><span class="sr-only">(opens new window)</span></span>](https://uniapp.dcloud.net.cn/api/ui/media-query-observer) 方法。

这是一个媒体查询适配组件，可以更简单的用于动态屏幕适配。

在`match-media`组件中放置内容，并为组件指定一组 media query 媒体查询规则，如屏幕宽度。运行时，如屏幕宽度满足查询条件，这个组件就会被展示，反之则隐藏。

`match-media`组件的优势包括：

1   开发者能够更方便、显式地使用 Media Query 能力，而不是耦合在 CSS 文件中，难以复用。
2   能够在模板中结合数据绑定动态地使用，不仅能做到组件的显示或隐藏，在过程式 API 中可塑性更高，例如能够根据尺寸变化动态地添加 class 类名，改变样式。
3   能够嵌套式地使用 Media Query 组件，即能够满足局部组件布局样式的改变。
4   组件化之后，封装性更强，能够隔离样式、模版以及绑定在模版上的交互事件，还能够提供更高的可复用性。

它的详细文档参考：https://uniapp.dcloud.net.cn/component/match-media

当然，开发者也可以继续使用css媒体查询来适配屏幕，或者使用一些类似mobilehide、pcshow之类的css样式。

uni-app的屏幕适配推荐方案是运行时动态适配，而不是为PC版单独条件编译（虽然您也可以通过自定义条件编译来实现单独的PC版）。这样设计的好处是在ipad等设备的浏览器上可以方便的横竖屏切换。

**3  内容缩放拉伸的处理**

除了根据屏宽动态显示和隐藏内容，其实还有一大类屏幕适配需求，即：内容不会根据屏宽动态显示隐藏，而是缩放或拉伸。

具体来说，内容适应又有两种细分策略：

1   局部拉伸：页面内容划分为固定区域和长宽动态适配区域，固定区域使用固定的px单位约定宽高，长宽适配区域则使用flex自动适配。当屏幕大小变化时，固定区域不变，而长宽适配区域跟着变化
2   等比缩放：根据页面屏幕宽度缩放。rpx其实属于这种类型。在宽屏上，rpx变大，窄屏上rpx变小。

举个实际的例子，比如一个列表页面，左边有一个图标，右边是2行文字。

*   如果使用策略1，即局部拉伸，那么左边的图标部分固定一个宽高，右边的2行文字的大小也固定，但2行文字的宽度自适应，占满屏幕右侧的空间。也就是屏宽宽度变化后，只有2行文字的宽度在变化，其他一切不变。
*   如果使用策略2，即等比缩放，那么整个列表均使用rpx，在宽屏上，图标变大、右边的2行文字变大，列表项行高变大。而在窄屏上，一切又都变小。

策略2省事，设计师按750px屏宽出图，程序员直接按rpx写代码即可。但策略2的实际效果不如策略1好。程序员使用策略1，分析下界面，设定好局部拉伸区域，这样可以有更好的用户体验。

这里需要对rpx的使用特别强调一下。

在移动设备上也有很多屏幕宽度，设计师一般只会按照750px屏幕宽度出图。此时使用rpx的好处在于，各种移动设备的屏幕宽度差异不是很大，相对于750px微调缩放后的效果，尽可能的还原了设计师的设计。

但是，一旦脱离移动设备，在pc屏幕，或者pad横屏状态下，因为屏幕宽度远大于750了。此时rpx根据屏幕宽度变化的结果就严重脱离了预期，大的惨不忍睹。

为此，在uni-app 2.9+起，新增了 rpx 按750px做基准屏宽的生效范围控制，并且将 rpx 的默认最大适配宽度设为了 960 px。

也就是设计师按750px出具的设计图，可适配的最大屏幕宽度为960px，在这个范围内，rpx可以根据屏幕宽度缩放。一旦超过960，rpx再根据屏幕宽度缩放就变的没有意义了。按如下配置，在超过960宽的屏幕上，会按375px作为基准宽度，这是最大程度上保持界面不失真的策略。

当然这些配置您都可以自己定义调整，在 pages.json 的 globeStyle 里配置 rpx 的如下参数。

```js

    {
      "globalStyle": {
        "rpxCalcMaxDeviceWidth": 960, // rpx 计算所支持的最大设备宽度，单位 px，默认值为 960
        "rpxCalcBaseDeviceWidth": 375, // rpx 计算使用的基准设备宽度，设备实际宽度超出 rpx 计算所支持的最大设备宽度时将按基准宽度计算，单位 px，默认值为 375
        "rpxCalcIncludeWidth": 750 // rpx 计算特殊处理的值，始终按实际的设备宽度计算，单位 rpx，默认值为 750
      },
    }
```

通过上述配置中的前2个，即rpxCalcMaxDeviceWidth和rpxCalcBaseDeviceWidth，即可有效解决使用了rpx后，在宽屏下界面变的奇大无比的问题。如果你不需要特别定义这2个参数的数值，则无需在`pages.json`中配置它们，保持默认的960和375即可。

但是，rpx的最大适配宽度被限定后，会带来一个新问题：如果您的代码中把750rpx当做100%来使用（官方强烈不推荐这种写法，即便是nvue不支持百分比，也应该使用flex来解决撑满问题），此时不管屏幕宽度为多少，哪怕超过了960px，您的预期仍然是要占满整个屏幕宽度，但如果按rpxCalcBaseDeviceWidth的375px的策略执行将不再占满屏宽。

此时您有两种解决方案，一种是修改代码，将里面把rpx当做百分比的代码改掉；另一种是配置rpxCalcIncludeWidth，设置某个特定数值不受rpxCalcMaxDeviceWidth约束。如上述例子中的"rpxCalcIncludeWidth": 750，代表着如果写了 750rpx，始终将按屏幕宽度百分百占满来计算。

*   关于 rpx 转 px

不少开发者之前对rpx的使用过于没有节制，后来为了适配宽屏，想要改用“局部拉伸：页面内容划分为固定区域和长宽动态适配区域”的策略，此时将回归px。

比如[DCloud社区的宽屏适配示例<span><span class="sr-only">(opens new window)</span></span>](https://static-1afcc27f-ce2f-4a6d-9416-c65a6f87d24e.bspapp.com/#/)和[新闻模板<span><span class="sr-only">(opens new window)</span></span>](https://static-7d133019-9a7e-474a-b7c2-c01751f00ca5.bspapp.com/)都没有使用rpx。

如果想把rpx转px，可以在源码里正则替换，也可以使用三方已经写好的单位转换库。下面介绍下三方库的用法。

项目根目录新增文件 `postcss.config.js`，内容如下。则在编译时，编译器会自动转换rpx单位为px。

**注意：将rpx作为百分比的用法需要手动处理**

```js

    // postcss.config.js

    const path = require('path')
    module.exports = {
      parser: 'postcss-comment',
      plugins: {
        'postcss-import': {
          resolve(id, basedir, importOptions) {
            if (id.startsWith('~@/')) {
              return path.resolve(process.env.UNI_INPUT_DIR, id.substr(3))
            } else if (id.startsWith('@/')) {
              return path.resolve(process.env.UNI_INPUT_DIR, id.substr(2))
            } else if (id.startsWith('/') && !id.startsWith('//')) {
              return path.resolve(process.env.UNI_INPUT_DIR, id.substr(1))
            }
            return id
          }
        },
        'autoprefixer': {
          overrideBrowserslist: ["Android >= 4", "ios >= 8"],
          remove: process.env.UNI_PLATFORM !== 'h5'
        },
        // 借助postcss-px-to-viewport插件，实现rpx转px，文档：https://github.com/evrone/postcss-px-to-viewport/blob/master/README_CN.md
        // 以下配置，可以将rpx转换为1/2的px，如20rpx=10px，如果要调整比例，可以调整 viewportWidth 来实现
        'postcss-px-to-viewport': {
          unitToConvert: 'rpx',
          viewportWidth: 200,
          unitPrecision: 5,
          propList: ['*'],
          viewportUnit: 'px',
          fontViewportUnit: 'px',
          selectorBlackList: [],
          minPixelValue: 1,
          mediaQuery: false,
          replace: true,
          exclude: undefined,
          include: undefined,
          landscape: false
        },
        '@dcloudio/vue-cli-plugin-uni/packages/postcss': {}
      }
    }
```

**非webkit浏览器适配**

uni-app理论上不限定浏览器。在HBuilderX 2.9发版时，就新闻示例项目，在chrome、Safari、firefox、edge的最新版上均测试过，可以正常使用。

一般国内的浏览器，如360浏览器、搜狗浏览器，均支持chrome内核，只要版本够新，应该都可以访问。

如果你的应用在其他PC浏览器下异常，请检查自己代码的浏览器兼容问题。

如果你发现了uni-app框架层面、内置组件有浏览器兼容问题，欢迎在github上给我们提交pr。

一般情况下，只要基础框架没有浏览器兼容问题，那么组件层面的问题也可以通过更换组件来解决。当uni-app编译到PC浏览器端时，支持所有的vue组件，包含那些操作了dom、window的ui库，比如elementUI等。

**一个让手机版网页临时可用于pc浏览器的方案**

如果你的h5版已经开发完毕，还没来得及适配pc，但想在pc上先用起来。那么可以在pc网页里使用iframe，约定好宽度，在里面套用uni-app的窄屏版。

当然还可以在iframe旁边放置二维码，提供手机版扫码地址，例如：

![](https://s.poetries.work/uploads/2023/06/ba795d0c41e31483.png)

**通过electron打包为windows、mac、linux客户端**

有了宽屏适配，uni-app的应用就可以方便的通过electron打包为电脑客户端应用，windows、mac、linux均支持。

开发者可以随意调用electron的API，以调用更多操作系统的能力（为方便多端兼容，可以将这些特殊API写在自定义的条件编译里）

插件市场有已经封装好的一些插件，详见：https://ext.dcloud.net.cn/search?q=electron

**响应式布局组件：uni-row**

流式栅格系统，随着屏幕或视口分为 24 份，可以迅速简便地创建布局。

该插件将屏幕分为五个档位：`<768px`、`>=768px`、`>=992px`、`>=1200px`、`>=1920px`。

对应的可以使用`xs`、`sm`、`md`、`lg`、`xl`来控制在不同分辨率下的显示效果。详情可在插件市场查看。

插件地址：https://ext.dcloud.net.cn/plugin?id=3958

##  14 App相关

###  nvue原生渲染

####  概述

`uni-app` App 端内置了一个基于 weex 改进的原生渲染引擎，提供了原生渲染能力。

在 App 端，如果使用 vue 页面，则使用 webview 渲染；如果使用 nvue 页面(native vue 的缩写)，则使用原生渲染。一个 App 中可以同时使用两种页面，比如首页使用 nvue，二级页使用 vue 页面，hello uni-app 示例就是如此。

虽然 nvue 也可以多端编译，输出 H5 和小程序，但 nvue 的 css 写法受限，所以如果你不开发 App，那么不需要使用 nvue。

以往的 weex ，有个很大的问题是它只是一个高性能的渲染器，没有足够的 API 能力（比如各种 push sdk 集成、蓝牙等能力调用），使得开发时非常依赖原生工程师协作，开发者本来想节约成本，结果需要前端、iOS、Android 3 拨人开发，适得其反。 nvue 解决了这个问题，让前端工程师可以直接开发完整 App，并提供丰富的插件生态和云打包。这些组合方案，帮助开发者切实的提高效率、降低成本。

同时`uni-app`扩展了 weex 原生渲染引擎的很多排版能力，修复了很多 bug。比如

*   Android 端良好支持边框阴影，[详情<span><span class="sr-only">(opens new window)</span></span>](https://uniapp.dcloud.net.cn/tutorial/nvue-css#android-box-shadow)
*   iOS 端支持高斯模糊，[详情<span><span class="sr-only">(opens new window)</span></span>](https://ask.dcloud.net.cn/article/36617#view)
*   可实现区域滚动长列表+左右拖动列表+吸顶的复杂排版效果
*   优化圆角边框绘制性能
*   扩展了更多的 css

#####  适用场景

nvue 的组件和 API 写法与 vue 页面一致，其内置组件还比 vue 页面内置组件增加了更多，[详见<span><span class="sr-only">(opens new window)</span></span>](https://uniapp.dcloud.io/component/list)。

如果你熟悉 weex 或 react native 开发，那么 nvue 是你的更优选择，能切实提升你的开发效率，降低成本。

如果你是 web 前端，不熟悉原生排版，那么建议你仍然以使用 vue 页面为主，在 App 端某些 vue 页面表现不佳的场景下使用 nvue 作为强化补充。这些场景如下：

1   需要高性能的区域长列表或瀑布流滚动。webview 的页面级长列表滚动是没有性能问题的（就是滚动条覆盖 webview 整体高度），但页面中某个区域做长列表滚动，则需要使用 nvue 的`list`、`recycle-list`、`waterfall`等组件([详见<span><span class="sr-only">(opens new window)</span></span>](https://uniapp.dcloud.io/component/list))。这些组件的性能要高于 vue 页面里的区域滚动组件`scroll-view`。
2   复杂高性能的自定义下拉刷新。uni-app 的 pages.json 里可以配置原生下拉刷新，但引擎内置的下拉刷新样式只有雪花和 circle 圈 2 种样式。如果你需要自己做复杂的下拉刷新，推荐使用 nvue 的 refresh 组件。当然[插件市场<span><span class="sr-only">(opens new window)</span></span>](https://ext.dcloud.net.cn/search?q=%E4%B8%8B%E6%8B%89%E5%88%B7%E6%96%B0)里也有很多 vue 下的自定义下拉刷新插件，只要是基于 renderjs 或 wxs 的，性能也可以商用，只是没有 nvue 的`refresh`组件更极致。
3   左右拖动的长列表。在 webview 里，通过`swiper`+`scroll-view`实现左右拖动的长列表，前端模拟下拉刷新，这套方案的性能不好。此时推荐使用 nvue，比如新建 uni-app 项目时的[新闻示例模板<span><span class="sr-only">(opens new window)</span></span>](https://ext.dcloud.net.cn/plugin?id=103)，就采用了 nvue，切换很流畅。
4   实现区域滚动长列表+左右拖动列表+吸顶的复杂排版效果，效果可参考 hello uni-app 模板里的`swiper-list`。[详见<span><span class="sr-only">(opens new window)</span></span>](https://ext.dcloud.net.cn/plugin?id=2128)
5   如需要将软键盘右下角按钮文字改为“发送”，则需要使用 nvue。比如聊天场景，除了软键盘右下角的按钮文字处理外，还涉及聊天记录区域长列表滚动，适合 nvue 来做。
6   解决前端控件无法覆盖原生控件的层级问题。当你使用`map`、`video`、`live-pusher`等原生组件时，会发现前端写的`view`等组件无法覆盖原生组件，层级问题处理比较麻烦，此时使用 nvue 更好。或者在 vue 页面上也可以覆盖一个 subnvue（一种非全屏的 nvue 页面覆盖在 webview 上），以解决 App 上的原生控件层级问题。[详见<span><span class="sr-only">(opens new window)</span></span>](https://uniapp.dcloud.io/component/native-component)
7   如深度使用`map`组件，建议使用 nvue。除了层级问题，App 端 nvue 文件的 map 功能更完善，和小程序拉齐度更高，多端一致性更好。
8   如深度使用`video`，建议使用 nvue。比如如下 2 个场景：video 内嵌到 swiper 中，以实现抖音式视频滑动切换，例子见[插件市场<span><span class="sr-only">(opens new window)</span></span>](https://ext.dcloud.net.cn/search?q=%E4%BB%BF%E6%8A%96%E9%9F%B3)；nvue 的视频全屏后，通过`cover-view`实现内容覆盖，比如增加文字标题、分享按钮。
9   直播推流：nvue 下有`live-pusher`组件，和小程序对齐，功能更完善，也没有层级问题。
10   对 App 启动速度要求极致化。App 端如果首页使用 nvue 且在 manifest 里配置 fast 模式，那么 App 的启动速度可以控制在 1 秒左右。而使用 vue 页面的话，App 的启动速度一般是 3 秒起，取决于你的代码性能和体积。

但注意，在某些场景下，nvue 不如 vue 页面，如下：

1   `canvas`。nvue 的 canvas 性能不高，尤其是 Android App 平台，所以这个组件干脆没有内置，而是需要单独引入。操作 canvas 动画，最高性能的方式是使用 vue 页面的 renderjs 技术，在 hello uni-app 里的 canvas 示例就是如此。
2   动态横竖屏。nvue 页面的 css 不支持媒体查询，所以横竖屏动态切换、动态适配屏幕是很困难的

#####  纯原生渲染模式

uni-app 在 App 端，支持 vue 页面和 nvue 页面混搭、互相跳转。也支持纯 nvue 原生渲染。

启用纯原生渲染模式，可以减少 App 端的包体积、减少使用时的内存占用。因为 webview 渲染模式的相关模块将被移除。

在 manifest.json 源码视图的`"app-plus"`下配置`"renderer":"native"`，即代表 App 端启用纯原生渲染模式。此时 pages.json 注册的 vue 页面将被忽略，vue 组件也将被原生渲染引擎来渲染。

如果不指定该值，默认是不启动纯原生渲染的。

```js

    	// manifest.json
    	{
    	   // ...
    		// App平台特有配置
    	   "app-plus": {
    	      "renderer": "native", //App端纯原生渲染模式
    	   }
    	}
```

#####  编译模式

**weex 编译模式和 uni-app 编译模式**

如你之前是 weex 开发者，可以继续查阅本章节，否则可以跳过看下一节[快速上手<span><span class="sr-only">(opens new window)</span></span>](https://uniapp.dcloud.net.cn/tutorial/nvue-outline.html#%E5%BF%AB%E9%80%9F%E4%B8%8A%E6%89%8B)。

weex 的组件和 JS API，与 uni-app 不同。uni-app 与微信小程序相同。

考虑到 weex 用户的迁移，uni-app 也支持 weex 的代码写法。在 manifest.json 中可以配置使用**weex 编译模式**或**uni-app 编译模式**。选择 weex 编译模式时将不支持 uni-app 的组件和 jsapi，需要开发者参考 weex 官方文档的写法来写代码。 比如 weex 编译模式用`<div>`。uni-app 编译模式则使用`<view>`。

一般情况建议使用`uni-app`模式，除非历史 weex 代码较多，需要逐步过渡。同时注意 weex 编译模式的切换是项目级的，不支持同项目下某个 nvue 页面使用 weex 模式，另一个 nvue 页面使用 uni-app 模式。

<table>

<thead>

<tr>

<th>weex 编译模式</th>

<th>uni-app 编译模式</th>

<th></th>

</tr>

</thead>

<tbody>

<tr>

<td>平台</td>

<td>仅 App</td>

<td>所有端，包含小程序和 H5</td>

</tr>

<tr>

<td>组件</td>

<td>weex 组件如 div</td>

<td>uni-app 组件如 view</td>

</tr>

<tr>

<td>生命周期</td>

<td>只支持 weex 生命周期</td>

<td>支持所有 uni-app 生命周期</td>

</tr>

<tr>

<td>JS API</td>

<td>weex API、uni API、Plus API</td>

<td>weex API、uni API、Plus API</td>

</tr>

<tr>

<td>单位</td>

<td>750px 是屏幕宽度，wx 是固定像素单位</td>

<td>750rpx 是屏幕宽度，px 是固定像素单位</td>

</tr>

<tr>

<td>全局样式</td>

<td>手动引入</td>

<td>app.vue 的样式即为全局样式</td>

</tr>

<tr>

<td>页面滚动</td>

<td>必须给页面套或组件</td>

<td>默认支持页面滚动</td>

</tr>

</tbody>

</table>

在 manifest.json 中修改 2 种编译模式，`manifest.json` -> `app-plus` -> `nvueCompiler` 切换编译模式。

`nvueCompiler` 有两个值：

*   weex
*   uni-app

```js

    	// manifest.json
    	{
    		// ...
    		// App平台特有配置
    		"app-plus": {
    			"nvueCompiler":"uni-app" //是否启用 uni-app 模式
    		}
    	}
```

在 `manifest.json` 配置文件中，HBuilderX2.4 之前版本，默认值为 `weex` 模式，HBuilderX2.4+版本默认值改为 `uni-app` 模式。

weex 编译模式不支持 `onNavigationBarButtonTap` 生命周期函数的写法。在 nvue 中监听原生标题栏按钮点击事件，详见：[uni.onNavigationBarButtonTap<span><span class="sr-only">(opens new window)</span></span>](https://uniapp.dcloud.net.cn/tutorial/page#lifecycle)。

weex 编译模式不支持 onShow 生命周期，但熟悉 5+的话，可利用监听 webview 的`addEventListener` show 事件实现 onShow 效果。

weex 编译模式不支持`vuex`。

nvue 的页面跳转，与 weex 不同，仍然遵循 uni-app 的路由模型。vue 页面和 nvue 页面之间不管怎么跳转，都遵循这个模型。包括 nvue 页面跳向 nvue 页面。每个页面都需要在 pages.json 中注册，调用 uni-app 的 [路由 API<span><span class="sr-only">(opens new window)</span></span>](https://uniapp.dcloud.net.cn/api/router) 进行跳转。

原生开发没有页面滚动的概念，页面内容高过屏幕高度时，内容并不会自动滚动；只有将页面内容放在`list`、`waterfall`、`scroll-view/scroller`这几个组件下内容才可滚动。这不符合前端开发的习惯，所以在 nvue 编译为 `uni-app`模式时，`uni-app`框架会给 nvue 页面外层自动嵌套一个 `scroller`，从而实现页面内容的自动滚动。

注意：

*   `uni-app`框架仅对 nvue 页面嵌套`scroller`容器，不会给组件自动套`scroller`容器；
*   若 nvue 页面有`recycle-list`组件时，`uni-app`框架也不会自动给页面嵌套`scroller`容器
*   若你不希望自动嵌套`scroller`容器，可在`pages.json`中通过如下配置进行关闭：

```js

    {
        "path": "",
        "style": {
            "disableScroll": true // 不嵌套 scroller
        }
    }
```

weex 编译模式下支持使用 weex ui ，例子[详见<span><span class="sr-only">(opens new window)</span></span>](https://ext.dcloud.net.cn/plugin?id=442)。但相比 uni-app 插件市场及官方[uni ui<span><span class="sr-only">(opens new window)</span></span>](https://ext.dcloud.net.cn/plugin?id=55)而言，weex 语法的组件生态还是比较欠缺的。

**HBuilderX 3.1.0+ 开始支持新的样式编译模式**

*   weex 编译模式：老模式，样式支持与普通 weex 相同
*   uni-app 编译模式：新模式，在 weex 原有样式基础上支持组合选择器（相邻兄弟选择器、普通兄弟选择器、子选择器、后代选择器）[详见<span><span class="sr-only">(opens new window)</span></span>](https://ask.dcloud.net.cn/article/38751)

```js

      // manifest.json
      {
          // ...
          // App平台特有配置
          "app-plus":  {
              "nvueStyleCompiler": "uni-app"
          }
      }
```

#####  快速上手

**1.新建 nvue 页面**

在 HBuilderX 的 `uni-app` 项目中，新建页面，弹出界面右上角可以选择是建立`vue`页面还是`nvue`页面，或者 2 个同时建。

不管是 vue 页面还是 nvue 页面，都需要在`pages.json`中注册。如果在 HBuilderX 中新建页面是会自动注册的，如果使用其他编辑器，则需要自行在 pages.json 里注册。

如果一个页面路由下同时有 vue 页面和 nvue 页面，即出现同名的 vue 和 nvue 文件。那么在 App 端，会仅使用 nvue 页面，同名的 vue 文件将不会被编译到 App 端。而在非 App 端，会优先使用 vue 页面。

如果不同名，只有 nvue 页面，则在非 app 端，只有 uni-app 编译模式的 nvue 文件才会编译

**2.开发 nvue 页面**

`nvue` 页面结构同 `vue`, 由 `template`、`style`、`script` 构成。

*   template： 模板写法、数据绑定同 vue。组件支持 2 种模式，
    *   weex 组件，同 weex 写法，参考：[weex 内置组件<span><span class="sr-only">(opens new window)</span></span>](http://emas.weex.io/zh/docs/components/a.html)；
    *   uni-app 组件，同 uni-app 写法。
    *   App 端 nvue 专用组件，详见https://uniapp.dcloud.io/component/barcode。
*   style：由于采用原生渲染，**并非所有浏览器的 css 均支持，布局模型只支持 flex 布局**，虽然不会造成某些界面布局无法实现，但写法要注意。详见：[样式<span><span class="sr-only">(opens new window)</span></span>](https://uniapp.dcloud.net.cn/tutorial/nvue-css)
*   script：写法同 vue，并支持 3 种 API：
    *   nvue API ：仅支持 App 端，uni-app 编译模式也可使用。使用前需先引入对应模块，参考：[模块引入 API<span><span class="sr-only">(opens new window)</span></span>](https://uniapp.dcloud.net.cn/tutorial/nvue-api)
    *   uni API：https://uniapp.dcloud.io/api/README
    *   plus API：仅支持 App 端。http://www.html5plus.org/doc/h5p.html

**3  调试 nvue 页面**

HBuilderX 内置了 weex 调试工具的强化版，包括审查界面元素、看 log、debug 打断点，[详见<span><span class="sr-only">(opens new window)</span></span>](https://uniapp.dcloud.io/tutorial/snippet#app-debug)

#####  nvue开发与vue开发的常见区别

基于原生引擎的渲染，虽然还是前端技术栈，但和web开发肯定是有区别的。

1   nvue 页面控制显隐只可以使用`v-if`不可以使用`v-show`
2   nvue 页面只能使用`flex`布局，不支持其他布局方式。页面开发前，首先想清楚这个页面的纵向内容有什么，哪些是要滚动的，然后每个纵向内容的横轴排布有什么，按 flex 布局设计好界面。
3   nvue 页面的布局排列方向默认为竖排（`column`），如需改变布局方向，可以在 `manifest.json` -> `app-plus` -> `nvue` -> `flex-direction` 节点下修改，仅在 uni-app 模式下生效。[详情<span><span class="sr-only">(opens new window)</span></span>](https://uniapp.dcloud.io/collocation/manifest?id=nvue)。
4   nvue页面编译为H5、小程序时，会做一件css默认值对齐的工作。因为weex渲染引擎只支持flex，并且默认flex方向是垂直。而H5和小程序端，使用web渲染，默认不是flex，并且设置`display:flex`后，它的flex方向默认是水平而不是垂直的。所以nvue编译为H5、小程序时，会自动把页面默认布局设为flex、方向为垂直。当然开发者手动设置后会覆盖默认设置。
5   文字内容，必须、只能在`<text>`组件下。不能在`<div>`、`<view>`的`text`区域里直接写文字。否则即使渲染了，也无法绑定js里的变量。
6   只有`text`标签可以设置字体大小，字体颜色。
7   布局不能使用百分比、没有媒体查询。
8   nvue 切换横竖屏时可能导致样式出现问题，建议有 nvue 的页面锁定手机方向。
9   支持的css有限，不过并不影响布局出你需要的界面，`flex`还是非常强大的。[详见<span><span class="sr-only">(opens new window)</span></span>](https://uniapp.dcloud.net.cn/nvue-css#flex)
10   不支持背景图。但可以使用`image`组件和层级来实现类似web中的背景效果。因为原生开发本身也没有web这种背景图概念
11   css选择器支持的比较少，只能使用 class 选择器。[详见<span><span class="sr-only">(opens new window)</span></span>](https://uniapp.dcloud.net.cn/nvue-css)
12   nvue 的各组件在安卓端默认是透明的，如果不设置`background-color`，可能会导致出现重影的问题。
13   `class` 进行绑定时只支持数组语法。
14   Android端在一个页面内使用大量圆角边框会造成性能问题，尤其是多个角的样式还不一样的话更耗费性能。应避免这类使用。
15   nvue页面没有`bounce`回弹效果，只有几个列表组件有`bounce`效果，包括 `list`、`recycle-list`、`waterfall`。
16   原生开发没有页面滚动的概念，页面内容高过屏幕高度并不会自动滚动，只有部分组件可滚动（`list`、`waterfall`、`scroll-view/scroller`），要滚的内容需要套在可滚动组件下。这不符合前端开发的习惯，所以在 nvue 编译为 uni-app模式时，给页面外层自动套了一个 `scroller`，页面内容过高会自动滚动。（组件不会套，页面有`recycle-list`时也不会套）。后续会提供配置，可以设置不自动套。
17   在 App.vue 中定义的全局js变量不会在 nvue 页面生效。`globalData`和`vuex`是生效的。
18   App.vue 中定义的全局css，对nvue和vue页面同时生效。如果全局css中有些css在nvue下不支持，编译时控制台会报警，建议把这些不支持的css包裹在[条件编译<span><span class="sr-only">(opens new window)</span></span>](https://uniapp.dcloud.io/platform)里，`APP-PLUS-NVUE`
19   不能在 `style` 中引入字体文件，nvue 中字体图标的使用参考：[加载自定义字体<span><span class="sr-only">(opens new window)</span></span>](https://uniapp.dcloud.net.cn/nvue-api#addrule)。如果是本地字体，可以用`plus.io`的API转换路径。
20   目前不支持在 nvue 页面使用 `typescript/ts`。
21   nvue 页面关闭原生导航栏时，想要模拟状态栏，可以[参考文章<span><span class="sr-only">(opens new window)</span></span>](https://ask.dcloud.net.cn/article/35111)。但是，仍然强烈建议在nvue页面使用原生导航栏。nvue的渲染速度再快，也没有原生导航栏快。原生排版引擎解析`json`绘制原生导航栏耗时很少，而解析nvue的js绘制整个页面的耗时要大的多，尤其在新页面进入动画期间，对于复杂页面，没有原生导航栏会在动画期间产生整个屏幕的白屏或闪屏

#####  iOS 平台下拉组件 refresh 组件注意问题

iOS 平台默认情况下滚动容器组件（如`list`、`waterfall`组件）内容不足时，由于没有撑满容器的可视区域会导致无法上下滚动，此时无法操作下拉刷新功能，无法触发`refresh`组件的`@refresh`、`@pullingdown`事件。 此时可在容器组件中配置`alwaysScrollableVertical`属性值为`true`来设置支持上下滚动，支持下拉刷新操作。

**用法**

```js

    <list class="scroll-v list" enableBackToTop="true" scroll-y alwaysScrollableVertical="true">
    	<refresh class="refresh" @refresh="onrefresh()" @pullingdown="onpullingdown">
    		<!-- refresh content -->
    	</refresh>
    	<cell v-for="(newsitem,index) in list" :key="newsitem.id">
    		<!-- cell content -->
    	</cell>
    </list>
```

> Android 平台不存在此问题

####  样式

#####  注意事项

*   nvue的css**仅支持flex布局**，是webview的css语法的子集。这是因为操作系统原生排版不支持非flex之外的web布局。当然flex足以排布出各种页面，只是写法需要适应。
*   class 进行绑定时只支持数组语法。
*   不支持媒体查询
*   不能在 style 中引入字体文件
*   不能使用百分比布局，如`width：100%`
*   不支持在css里写背景图`background-image`，但可以使用image组件和层级来实现类似web中的背景效果。因为原生开发本身也没有web这种背景图概念
*   使用`image`标签，支持使用base64，不支持svg格式图片
*   nvue 的各组件在安卓端默认是透明的，如果不设置`background-color`，可能会导致出现重影的问题
*   文字内容，必须只能在`text`组件下，`text`组件不能换行写内容，否则会出现无法去除的周边空白
*   只有`text`标签可以设置字体大小，字体颜色

#####  盒模型

nvue盒模型基于 CSS 盒模型，每个 nvue 元素都可视作一个盒子。我们一般在讨论设计或布局时，会提到「盒模型」这个概念。

盒模型描述了一个元素所占用的空间。每一个盒子有四条边界：外边距边界 `margin edge`, 边框边界 `border edge`, 内边距边界 `padding edge` 与内容边界 `content edge`。这四层边界，形成一层层的盒子包裹起来，这就是盒模型大体上的含义。

![](https://s.poetries.work/uploads/2023/06/bab2de613334e64f.png)

> nvue盒模型的 `box-sizing` 默认为 `border-box`，即盒子的宽高包含内容、内边距和边框的宽度，不包含外边距的宽度。

> 在 Android 平台，nvue只支持 `overflow:hidden`。

> 在 iOS 上，nvue支持 `overflow:hidden` 和 `overflow:visible`，默认是 `overflow:visible`。

#####  Flexbox

flexbox 属性**均不支持**：如 `order`、`flex-grow` 、`flex-shrink` 、 `flex-basis`、`align-content`、`align-self` 等

**在 nvue中，Flexbox 是默认且唯一的布局模型，所以你不需要手动为元素添加 `display: flex;` 属性。**

**Flex 成员项暂不支持 `flex-shrink` 、 `flex-basis`、`align-content` 属性**。

**该属性不支持 flex: flex-grow | flex-shrink | flex-basis 的简写**

#####  position 定位

> Android 兼容性

如果定位元素超过容器边界，在 Android 下，超出部分将不可见，原因在于 Android 端元素 `overflow` 默认值为 `hidden`，但目前 Android 暂不支持设置 `overflow: visible`

#####  伪类

<table>

<thead>

<tr>

<th>参数名</th>

<th>描述</th>

</tr>

</thead>

<tbody>

<tr>

<td>active</td>

<td>所有组件都支持</td>

</tr>

<tr>

<td>focus</td>

<td>只有 `input` 组件和 `textarea` 组件支持</td>

</tr>

<tr>

<td>disabled</td>

<td>只有 `input` 组件和 `textarea` 组件支持</td>

</tr>

<tr>

<td>enabled</td>

<td>只有 `input` 组件和 `textarea` 组件支持</td>

</tr>

</tbody>

</table>

**注意**

> 同时生效的时候，优先级高覆盖优先级低。 例如：`input:active:enabled` 和 `input:active` 同时生效，前者覆盖后者

#####  线性渐变

所有组件均支持线性渐变。[CSS3 渐变<span><span class="sr-only">(opens new window)</span></span>](https://www.w3cschool.cn/css3/oj26bfli.html) 你可以通过 `background-image`属性创建线性渐变。

```js

    	background-image:linear-gradient(to bottom right,#AD18F9,#05DFC7);
```

只支持两种颜色的渐变，渐变方向如下：

<table>

<thead>

<tr>

<th>渐变方向</th>

<th>描述</th>

</tr>

</thead>

<tbody>

<tr>

<td>to right</td>

<td>从左向右渐变</td>

</tr>

<tr>

<td>to left</td>

<td>从右向左渐变</td>

</tr>

<tr>

<td>to bottom</td>

<td>从上到下渐变</td>

</tr>

<tr>

<td>to top</td>

<td>从下到上渐变</td>

</tr>

<tr>

<td>to bottom right</td>

<td>从左上角到右下角</td>

</tr>

<tr>

<td>to top left</td>

<td>从右下角到左上角</td>

</tr>

</tbody>

</table>

**注意**

> `background-image` 优先级高于 `background-color`，这意味着同时设置 `background-image` 和 `background-color`，`background-color` 被覆盖。 `background` 不支持简写。
> 
> **目前暂不支持 radial-gradient（径向渐变）。**

![](https://s.poetries.work/uploads/2023/06/c5900cc9da942846.png)

#####  阴影box-shadow

*   Android平台 设置`box-shadow`的组件需要让出阴影渲染位置，否则会出现阴影显示不全的问题。

```js

    <template>
    	<view class="wrapper">
    		<view>
    			<view class="box">
    				<text class="title" style="text-align: center">Hello World</text>
    			</view>
    		</view>
    	</view>
    </template>
    <style>
    	.box {
    		width: 300px;
    		height: 100px;
    		background-color: #FFE4C4;
    		border-radius: 10px;
    		box-shadow: 3px 5px 2px rgb(255, 69, 0);
    		margin: 10px;//让出阴影位置
    	}
    </style>
```

#####  文本样式

color {color}：文字颜色，支持如下字段：

*   RGB（ rgb(255, 0, 0) ）
*   RGBA（ rgba(255, 0, 0, 0.5) ）
*   十六进制（ #ff0000 ）；
*   精简写法的十六进制（ #f00 ）
*   色值关键字（red）

> 只有`text`标签可以设置字体颜色

**font-size**

font-size {number}：文字大小，只有`text`标签可以设置字体大小

**font-weight**

font-weight {string}：字体粗细程度。默认值: `normal`；

*   可选值: `normal`, `bold`, 100, 200, 300, 400, 500, 600, 700, 800, 900
*   `normal` 等同于 400, `bold` 等同于 700；
*   iOS 支持 9 种 `font-weight`值；Android 仅支持 400 和 700, 其他值会设为 400 或 700
*   类似 `lighter`, `bolder` 这样的值暂时不支持

**text-overflow**

`text-overflow {string}`：设置内容超长时的省略样式。

<table>

<thead>

<tr>

<th>可选值</th>

<th>描述</th>

</tr>

</thead>

<tbody>

<tr>

<td>clip</td>

<td>修剪文本</td>

</tr>

<tr>

<td>ellipsis</td>

<td>显示省略符号来代表被修剪的文本</td>

</tr>

</tbody>

</table>

> 只支持 `text` 和 `richtext`

####  API

#####  DOM

对于那些不依赖 UI 交互的原生功能，nvue将其封装成模块，这是一种通过 javascript 调用原生能力的方法。

*   uni-app默认内置集成原生模块，如：BindingX，animation， DOM.addRule等。 通过`uni.requireNativePlugin`引入 App 原生插件

```js

    //使用方式
    	const PluginName = uni.requireNativePlugin(PluginName); // PluginName 为原生插件名称
```

*   支持项目nativeplugins目录下和插件市场原生云打包的第三方原生插件。你可以将已有原生模块移植到nvue平台也很方便。 使用方式：在manifest.json->App原生插件配置->选择本地插件或者云端插件->打自定义基座才能使用。[详见<span><span class="sr-only">(opens new window)</span></span>](https://uniapp.dcloud.net.cn/plugin/native-plugin)
*   nvue还支持uni-app的js API接口，若无特殊说明，则表示vue文件和nvue文件均支持。[详见<span><span class="sr-only">(opens new window)</span></span>](https://uniapp.dcloud.net.cn/api/)。
*   nvue 里不支持的 uni-app API，[详见<span><span class="sr-only">(opens new window)</span></span>](https://uniapp.dcloud.net.cn/tutorial/nvue-api.html#nvue-%E9%87%8C%E4%B8%8D%E6%94%AF%E6%8C%81%E7%9A%84-uni-app-api)

#####  addRule

Weex 提供 DOM.addRule 以**加载自定义字体**。开发者可以通过指定 font-family加载 iconfont 和 custom font。开发者可以使用下面的代码加载自定义字体：

```js

    	<template>
    		<view>
    			<text class="my-iconfont">&#xe85c;</text>	
    		</view>
    	</template>
    	<script>
    		export default{
    			beforeCreate() {
    				const domModule = uni.requireNativePlugin('dom')
    				domModule.addRule('fontFace', {
    					'fontFamily': "myIconfont",
    					'src': "url('http://at.alicdn.com/t/font_2234252_v3hj1klw6k9.ttf')"
    				});
    			}
    		}
    	</script>
    	<style>
    		.my-iconfont {
    			font-family:myIconfont;
    			font-size:60rpx;
    			color: #00AAFF;
    		}
    	</style>
```

![](https://s.poetries.work/uploads/2023/06/ac8ed681a3a014b2.png)

**addRule(type, contentObject)**

*   @fontFace 协议名称，不可修改。
*   @fontFamily `font-family`的名称。
*   @src 字体地址，url('') 是保留字段，其参数如下:
    *   http  从HTTP请求加载, e.g  `url('http://at.alicdn.com/t/font_1469606063_76593.ttf')`
    *   https  从HTTPS请求加载, e.g  `url('https://at.alicdn.com/t/font_1469606063_76593.ttf')`
    *   local, Android ONLY  从assets目录读取, e.g  url('local://foo.ttf'), foo.ttf 是文件名在你的assets目录中.
    *   file  从本地文件读取, e.g  `url('file://storage/emulated/0/Android/data/com.alibaba.weex/cache/http:__at.alicdn.com_t_font_1469606063_76593.ttf')`
    *   data  从base64读取, e.g  `url('data:font/truetype;charset=utf-8;base64,AAEAAAALAIAAAwAwR1NVQrD+....')`, 上述data字段不全。

**注意**

> addRule 方法里的 fontFamily 可以随意取。这个名字不是字体真正的名字。字体真正的名字（font-family），也就是注册到系统中的名字是保存在字体二进制文件中的。你需要确保你使用的字体的真正名字（font-family）足够特殊，否则在向系统注册时可能发生冲突，导致注册失败，你的字符被显示为‘?’。 如果你使用 http://www.iconfont.cn/ 来构建你的 iconfont。确保在项目设置中，设置一个特殊的 font-family 名字。默认是 “iconfont”，但极大可能发生冲突。 调用addRule 在 beforeCreate 中是被推荐的

#####  scrollToElement

让页面滚动到 ref 对应的组件，这个 API 只能用于可滚动组件的子节点，例如 `<scroller>`，`<list>`, `<waterfall>` 等可滚动组件中。

**scrollToElement(ref, options)**

*   @ref，要滚动到的那个节点。
*   @options
    *   offset，一个到其可见位置的偏移距离，默认是 0。
    *   animated，是否需要附带滚动动画，默认是 true

```js

     <template>
        <view class="wrapper">
          <scroller class="scroller">
            <view class="row" v-for="(name, index) in rows" :ref="'item'+index">
              <text class="text" :ref="'text'+index">{{name}}</text>
            </view>
          </scroller>
          <view class="group">
            <text @click="goto10" class="button">Go to 10</text>
            <text @click="goto20" class="button">Go to 20</text>
          </view>
        </view>
      </template>
      <script>
        const dom = uni.requireNativePlugin('dom')
        export default {
          data() {
            return {
              rows: []
            }
          },
          created() {
            for (let i = 0; i < 30; i++) {
              this.rows.push('row ' + i)
            }
          },
          methods: {
            goto10(count) {
              const el = this.$refs.item10[0]
              dom.scrollToElement(el, {})
            },
            goto20(count) {
              const el = this.$refs.item20[0]
              dom.scrollToElement(el, {
                offset: 0
              })
            }
          }
        }
      </script>
      <style scoped>
        .scroller {
          width:700rpx;
          height:500px;
          border-width: 3px;
          border-style: solid;
          border-color: rgb(162, 217, 192);
          margin:0 25rpx;
        }
        .row {
          height: 100rpx;
          flex-direction: column;
          justify-content: center;
          padding-left: 30rpx;
          border-bottom-width: 2px;
          border-bottom-style: solid;
          border-bottom-color: #DDDDDD;
        }
        .text {
          font-size: 45rpx;
          color: #666666;
        }
        .group {
          flex-direction: row;
          justify-content: center;
          margin-top: 60rpx;
        }
        .button {
          width: 200rpx;
          padding-top: 20rpx;
          padding-bottom: 20rpx;
          font-size: 40rpx;
          margin-left: 30rpx;
          margin-right: 30rpx;
          text-align: center;
          color: #41B883;
          border-width: 2px;
          border-style: solid;
          border-color: rgb(162, 217, 192);
          background-color: rgba(162, 217, 192, 0.2);
        }
      </style>
```

![](https://s.poetries.work/uploads/2023/06/56735731fc1caa78.png)

#####  getComponentRect

获取某个元素 View 的外框。

**getComponentRect(ref, callback)**

*   @ref，要获取外框的那个节点。
*   @callback，异步方法，通过回调返回信息。

回调方法中的数据样例：

```js

      {
        result: true,
        size: {
            bottom: 60,
            height: 15,
            left: 0,
            right: 353,
            top: 45,
            width: 353
        }
      }
```

> 此方法需要在节点渲染后调用才能获取正确的信息，可在 mounted 或 更新数据后 updated 中调用
> 
> 如果想要获取到 Weex 视口容器的布局信息，可以指定 ref 为字符串 'viewport'，即 getComponentRect('viewport', callback)

#####  animation

`animation`模块可以用来在组件上执行动画。JS-Animation可以对组件执行一系列简单的变换 (位置、大小、旋转角度、背景颜色和不透明度)。

举个例子，如果有一个`image`组件，通过动画你可以对其进行移动、旋转、拉伸或收缩等动作。

```js

      <template>
        <view class="box">
          <view ref="test" @click="move" class="box-item"></view>
        </view>
      </template>
      <script>
          const animation = uni.requireNativePlugin('animation')
          export default {
              methods: {
                  move() {
                      var testEl = this.$refs.test;
                      animation.transition(testEl, {
                          styles: {
                              backgroundColor: '#007AFF',
                              transform: 'translate(100px, 80px)',
                              transformOrigin: 'center center'
                          },
                          duration: 800, //ms
                          timingFunction: 'ease',
                          delay: 0 //ms
                      },()=>{
                          uni.showToast({
                              title: 'finished',
                              icon:'none'
                          });
                      })
                  }
              }
          }
      </script>
      <style scoped>
        .box{
            width:750rpx;
            height:750rpx;
        }
        .box-item{
          width: 250rpx;
          height: 250rpx;
          background-color: #00aaff;
        }
      </style>
```

![](https://s.poetries.work/uploads/2023/06/904d023357f0769f.png)

#####  transition

*   @ref，将要执行动画的元素。例如指定动画的元素 ref 属性为 test，可以通过调用 this.$refs.test 来获取元素的引用。
*   @options，动画参数。

下表列出了options所有合法的参数：

<table>

<thead>

<tr>

<th>可选值</th>

<th>描述</th>

</tr>

</thead>

<tbody>

<tr>

<td>styles</td>

<td>设置不同样式过渡效果的键值对</td>

</tr>

<tr>

<td>duration</td>

<td>指定动画的持续时间 (单位是毫秒)，默认值是 0，表示瞬间达到动画结束状态。</td>

</tr>

<tr>

<td>delay</td>

<td>指定请求动画操作到执行动画之间的时间间隔 (单位是毫秒)，默认值是 0，表示没有延迟，在请求后立即执行动画。</td>

</tr>

<tr>

<td>needLayout</td>

<td>动画执行是否影响布局，默认值是false。</td>

</tr>

<tr>

<td>timingFunction</td>

<td>描述动画执行的速度曲线，用于描述动画已消耗时间和动画完成进度间的映射关系。默认值是 `linear`，表示动画从开始到结束都拥有同样的速度。详见下</td>

</tr>

</tbody>

</table>

下表列出了styles所有合法的参数：

<table>

<thead>

<tr>

<th>可选值</th>

<th>描述</th>

</tr>

</thead>

<tbody>

<tr>

<td>width</td>

<td>表示动画执行后应用到组件上的宽度值。如果你需要影响布局，设置needLayout为true。默认值为computed width。</td>

</tr>

<tr>

<td>height</td>

<td>表示动画执行后应用到组件上的高度值。如果你需要影响布局，设置设置为 needLayout为true。默认值为computed width。</td>

</tr>

<tr>

<td>backgroundColor</td>

<td>动画执行后应用到组件上的背景颜色，默认值为computed backgroundColor。</td>

</tr>

<tr>

<td>opacity</td>

<td>表示动画执行后应用到组件上的不透明度值，默认值为computed opacity。</td>

</tr>

<tr>

<td>transformOrigin</td>

<td>`transformOrigin` 定义变化过程的中心点，如transformOrigin: x-axis y-axis 参数 x-axis 可能的值为 left、center、right、长度值或百分比值，参数 y-axis 可能的值为 top、center、bottom、长度值或百分比。默认值为center center。</td>

</tr>

<tr>

<td>transform</td>

<td>`transform` 变换类型，可能包含rotate，translate，scale及其他属性。默认值为空。详见下</td>

</tr>

</tbody>

</table>

**transform**

<table>

<thead>

<tr>

<th>可选值</th>

<th>描述</th>

</tr>

</thead>

<tbody>

<tr>

<td>translate/translateX/translateY</td>

<td>指定元素要移动到的位置。单位是长度或百分比，默认值是0.</td>

</tr>

<tr>

<td>rotate/rotateX/rotateY</td>

<td>v0.16+ 指定元素将被旋转的角度。单位是度 角度度，默认值是0</td>

</tr>

<tr>

<td>scale/scaleX/scaleY</td>

<td>按比例放大或缩小元素。单位是数字，默认值是1</td>

</tr>

<tr>

<td>perspective</td>

<td>v0.16+ 观察者距离z=0平面的距离，在Android 4.1及以上有效。单位值数字，默认值为正无穷。</td>

</tr>

</tbody>

</table>

**timingFunction**

<table>

<thead>

<tr>

<th>可选值</th>

<th>描述</th>

</tr>

</thead>

<tbody>

<tr>

<td>linear</td>

<td>动画从头到尾的速度是相同的</td>

</tr>

<tr>

<td>ease-in</td>

<td>动画速度由慢到快</td>

</tr>

<tr>

<td>ease-out</td>

<td>动画速度由快到慢</td>

</tr>

<tr>

<td>ease-in-out</td>

<td>动画先加速到达中间点后减速到达终点</td>

</tr>

<tr>

<td>cubic-bezier(x1, y1, x2, y2)</td>

<td>在三次贝塞尔函数中定义变化过程，函数的参数值必须处于 0 到 1 之间。更多关于三次贝塞尔的信息请参阅 cubic-bezier 和 Bézier curve。</td>

</tr>

</tbody>

</table>

*   @callback，callback是动画执行完毕之后的回调函数。在iOS平台上，你可以获取动画执行是否成功的信息。

**注意**

*   iOS上可以获取 `animation` 是否执行成功的信息，callback中的result参数会有两种，分别是是Success与Fail。
*   Android 的callback 函数不支持result参数。

> 如果需要使用CSS动画，参考[transition<span><span class="sr-only">(opens new window)</span></span>](https://uniapp.dcloud.net.cn/tutorial/nvue-css#transition)和[transform<span><span class="sr-only">(opens new window)</span></span>](https://uniapp.dcloud.net.cn/tutorial/nvue-css#transform)。

#####  nvue 里使用 BindingX

`uni-app` 是逻辑层和视图层分离的。此时会产生两层通信成本。比如拖动视图层的元素，如果在逻辑层不停接收事件，因为通信损耗会产生不顺滑的体验。

[BindingX<span><span class="sr-only">(opens new window)</span></span>](https://alibaba.github.io/bindingx/) 是weex提供的一种预描述交互语法。由原生解析BindingX规则，按此规则处理视图层的交互和动效。不再实时去js逻辑层运行和通信。

BindingX是一种规则，解析快，但没有js那样足够强的编程灵活性。

`uni-app` 内置了 BindingX，可在 `nvue` 中使用 BindingX 完成复杂的动画效果。

*   从HBuilderX 2.3.4起，`uni-app` 编译模式可直接引用 `uni.requireNativePlugin('bindingx')` 模块，weex 模式还需使用 npm 方式引用。
*   BindingX demo示例可参考 BindingX 示例里 vue 的相关示例，将相关 vue 代码拷贝到 `nvue` 文件里即可。

**注意**

*   暂时不要在 `expression` 内使用 `origin`

```js

    <template>
    	    <view class="container">
    	        <view ref="b1" class="btn" style="background-color:#6A1B9A" @click="clickBtn">
    	            <text class="text">A</text>
    	        </view>
    	        <view ref="b2" class="btn" style="background-color:#0277BD" @click="clickBtn">
    	            <text class="text">B</text>
    	        </view>
    	        <view ref="b3" class="btn" style="background-color:#FF9800" @click="clickBtn">
    	            <text class="text">C</text>
    	        </view>
    	        <view ref="main_btn" class="btn" @click="clickBtn">
    	            <image class="image" ref="main_image" src="https://gw.alicdn.com/tfs/TB1PZ25antYBeNjy1XdXXXXyVXa-128-128.png" />
    	        </view>
    	    </view>
    	</template>
    	<script>
    	    const Binding = uni.requireNativePlugin('bindingx');
    	    module.exports = {
    	        data() {
    	            return {
    	                isExpanded: false
    	            }
    	        },
    	        methods: {
    	            getEl: function(el) {
    	                if (typeof el === 'string' || typeof el === 'number') return el;
    	                if (WXEnvironment) {
    	                    return el.ref;
    	                } else {
    	                    return el instanceof HTMLElement ? el : el.$el;
    	                }
    	            },
    	            collapse: function() {
    	                let main_btn = this.getEl(this.$refs.main_btn);
    	                let main_image = this.getEl(this.$refs.main_image);
    	                let b1 = this.getEl(this.$refs.b1);
    	                let b2 = this.getEl(this.$refs.b2);
    	                let b3 = this.getEl(this.$refs.b3);
    	                let main_binding = Binding.bind({
    	                    eventType: 'timing',
    	                    exitExpression: 't>800',
    	                    props: [{
    	                        element: main_image,
    	                        property: 'transform.rotateZ',
    	                        expression: 'easeOutQuint(t,45,0-45,800)'

    	                    }, {
    	                        element: main_btn,
    	                        property: 'background-color',
    	                        expression: "evaluateColor('#607D8B','#ff0000',min(t,800)/800)"
    	                    }]
    	                }, function(res) {
    	                    if (res.state === 'exit') {
    	                        Binding.unbind({
    	                            token: main_binding.token,
    	                          eventType: 'timing'
    	                        })
    	                    }
    	                });
    	                let btn_binding = Binding.bind({
    	                    eventType: 'timing',
    	                    exitExpression: 't>800',
    	                    props: [{
    	                        element: b1,
    	                        property: 'transform.translateY',
    	                        expression: "easeOutQuint(t,-150,150,800)"
    	                    }, {
    	                        element: b2,
    	                        property: 'transform.translateY',
    	                        expression: "t<=100?0:easeOutQuint(t-100,-300,300,700)"
    	                    }, {
    	                        element: b3,
    	                        property: 'transform.translateY',
    	                        expression: "t<=200?0:easeOutQuint(t-200,-450,450,600)"
    	                    }]
    	                }, function(res) {
    	                    if (res.state === 'exit') {
    	                        Binding.unbind({
    	                            token: btn_binding.token,
    	                          eventType: 'timing'
    	                        })
    	                    }
    	                })
    	            },
    	            expand: function() {
    	                let main_btn = this.getEl(this.$refs.main_btn);
    	                let main_image = this.getEl(this.$refs.main_image);
    	                let b1 = this.getEl(this.$refs.b1);
    	                let b2 = this.getEl(this.$refs.b2);
    	                let b3 = this.getEl(this.$refs.b3);
    	                let main_binding = Binding.bind({
    	                    eventType: 'timing',
    	                    exitExpression: 't>100',
    	                    props: [{
    	                        element: main_image,
    	                        property: 'transform.rotateZ',
    	                        expression: 'linear(t,0,45,100)'
    	                    }, {
    	                        element: main_btn,
    	                        property: 'background-color',
    	                        expression: "evaluateColor('#ff0000','#607D8B',min(t,100)/100)"
    	                    }]
    	                }, function(res) {
    	                    if (res.state === 'exit') {
    	                        Binding.unbind({
    	                            token: main_binding.token,
    	                          eventType: 'timing'
    	                        })
    	                    }
    	                });
    	                let btn_binding = Binding.bind({
    	                    eventType: 'timing',
    	                    exitExpression: 't>800',
    	                    props: [{
    	                        element: b1,
    	                        property: 'transform.translateY',
    	                        expression: "easeOutBounce(t,0,0-150,800)"
    	                    }, {
    	                        element: b2,
    	                        property: 'transform.translateY',
    	                        expression: "t<=100?0:easeOutBounce(t-100,0,0-300,700)"
    	                    }, {
    	                        element: b3,
    	                        property: 'transform.translateY',
    	                        expression: "t<=200?0:easeOutBounce(t-200,0,0-450,600)"
    	                    }]
    	                }, function(res) {
    	                    if (res.state === 'exit') {
    	                        Binding.unbind({
    	                            token: btn_binding.token,
    	                          eventType: 'timing'
    	                        })
    	                    }
    	                })
    	            },
    	            clickBtn: function(e) {
    	                if (this.isExpanded) {
    	                    this.collapse();
    	                } else {
    	                    this.expand();
    	                }
    	                this.isExpanded = !this.isExpanded;
    	            }
    	        }
    	    }
    	</script>
    	<style>
    	    .container {
    	        flex: 1;
    	    }
    	    .image {
    	        width: 60px;
    	        height: 60px;
    	    }
    	    .text {
    	        color: #ffffff;
    	        font-size: 30px;
    	    }
    	    .btn {
    	        width: 100px;
    	        height: 100px;
    	        background-color: #ff0000;
    	        align-items: center;
    	        justify-content: center;
    	        position: absolute;
    	        border-radius: 50px;
    	        bottom: 25px;
    	        right: 25px;
    	    }
    	</style>
```

![](https://s.poetries.work/uploads/2023/06/adac4c62e7694a46.png)

#####  nvue 和 vue 相互通讯

在 uni-app 中，nvue 和 vue 页面可以混搭使用。

推荐使用 `uni.$on` , `uni.$emit` 的方式进行页面通讯，旧的通讯方式（uni.postMessage及plus.webview.postMessageToUniNView）不再推荐使用

```js

    	// 接收信息的页面
    	// $on(eventName, callback)  
    	uni.$on('page-popup', (data) => {  
    	    console.log('标题：' + data.title)
    	    console.log('内容：' + data.content)
    	})  

    	// 发送信息的页面
    	// $emit(eventName, data)  
    	uni.$emit('page-popup', {  
    	    title: '我是title',  
    	    content: '我是content'  
    	});
```

**使用此页面通讯时注意事项：要在页面卸载前，使用 uni.$off 移除事件监听器。**[参考<span><span class="sr-only">(opens new window)</span></span>](https://uniapp.dcloud.io/tutorial/page.html#off)

#####  vue 和 nvue 共享的变量和数据

除了通信事件，vue 和 nvue 页面之间还可以共享变量和存储。 `uni-app`提供的共享变量和数据的方案如下：

1   **vuex:** 自HBuilderX 2.2.5起，nvue支持`vuex`。这是vue官方的状态管理工具。

> 注意：不支持直接引入`store`使用，可以使用`mapState`、`mapGetters`、`mapMutations`等辅助方法或者使用`this.$store`

1   uni.storage:
    *   vue和nvue页面可以使用相同的`uni.storage`存储。这个存储是持久化的。 比如登录状态可以保存在这里。
    *   App端还支持`plus.sqlite`，也是共享通用的。
2   **globalData:** 小程序有`globalData`机制，这套机制在`uni-app`里也可以使用，全端通用。 在App.vue文件里定义`globalData`，如下：

```js

    	<script>  
    	    export default {  
    	        globalData: {  
    	            text: 'text'  
    	        },  
    	        onLaunch: function() {  
    	            console.log('App Launch')  
    	        },  
    	        onShow: function() {  
    	            console.log('App Show')  
    	        },  
    	        onHide: function() {  
    	            console.log('App Hide')  
    	        }  
    	    }  
    	</script>
```

*   js中操作`globalData`的方式如下： `getApp().globalData.text = 'test'`
*   如果需要把`globalData`的数据绑定到页面上，可在页面的onShow生命周期里进行变量重赋值

#####  nvue 里使用 HTML5Plus API

nvue页面可直接使用plus的API，并且不需要等待plus ready

#####  nvue 里不支持的 uni-app API

nvue 支持大部分 uni-app API ，下面只列举目前还**不支持的 API**

**动画**

<table>

<thead>

<tr>

<th>API</th>

<th>说明</th>

<th>解决方案</th>

</tr>

</thead>

<tbody>

<tr>

<td>uni.createAnimation()</td>

<td>创建一个动画实例</td>

<td>[animation<span><span class="sr-only">(opens new window)</span></span>](https://uniapp.dcloud.net.cn/tutorial/nvue-api#animation)</td>

</tr>

</tbody>

</table>

**滚动**

<table>

<thead>

<tr>

<th>API</th>

<th>说明</th>

<th>解决方案</th>

</tr>

</thead>

<tbody>

<tr>

<td>uni.pageScrollTo()</td>

<td>将页面滚动到目标位置</td>

<td>[scrollToElement<span><span class="sr-only">(opens new window)</span></span>](https://uniapp.dcloud.net.cn/tutorial/nvue-api.html#scrolltoelement)</td>

</tr>

</tbody>

</table>

**节点布局交互**

<table>

<thead>

<tr>

<th>API</th>

<th>说明</th>

</tr>

</thead>

<tbody>

<tr>

<td>uni.createIntersectionObserver()</td>

<td>创建并返回一个 IntersectionObserver 对象实例</td>

</tr>

</tbody>

</table>

**绘画**

canvas API使用，[详见canvas文档<span><span class="sr-only">(opens new window)</span></span>](https://uniapp.dcloud.net.cn/api/canvas/createCanvasContext)。

####  事件

`Weex` 提供了通过事件触发动作的能力，例如在用户点击组件时执行 `JavaScript`。 下面列出了可被添加到 `Weex` 组件上以定义事件动作的属性：

#####  事件穿透

> Android和iOS下原生事件传递机制不同，这里仅针对iOS

当一个父View存在多个同级子View时，由于iOS会选择层级最高的View来响应事件，底层的View的事件永远都不会响应。

Weex在`view`组件中增加了`eventPenetrationEnabled`属性，当值为true（默认为false）时，View的子View仍能正常响应事件，但View自身将不会响应事件

#####  View交互性

> 仅iOS支持

Weex在`view`组件中增加了`userInteractionEnabled`属性，当值为false（默认为true）时，View及其子View均不响应事件，事件向下层View传递。

**longpress**

如果一个组件被绑定了 longpress 事件，那么当用户长按这个组件时，该事件将会被触发。

**事件对象**

<table>

<thead>

<tr>

<th>key</th>

<th>value</th>

<th>备注</th>

</tr>

</thead>

<tbody>

<tr>

<td>type</td>

<td>longpress</td>

<td></td>

</tr>

<tr>

<td>target</td>

<td></td>

<td>触发长按事件的目标组件</td>

</tr>

<tr>

<td>timestamp</td>

<td></td>

<td>长按事件触发时的时间戳(不支持 H5)</td>

</tr>

</tbody>

</table>

**Appear**

如果一个位于某个可滚动区域内的组件被绑定了 appear 事件，那么当这个组件的状态变为在屏幕上可见时，该事件将被触发。

**事件对象**

<table>

<thead>

<tr>

<th>key</th>

<th>value</th>

<th>备注</th>

</tr>

</thead>

<tbody>

<tr>

<td>type</td>

<td>appear</td>

<td></td>

</tr>

<tr>

<td>target</td>

<td></td>

<td>触发 Appear 事件的组件对象</td>

</tr>

<tr>

<td>timestamp</td>

<td></td>

<td>事件被触发时的时间戳(不支持 H5)</td>

</tr>

<tr>

<td>direction</td>

<td>`up`或 `down`</td>

<td>触发事件时屏幕的滚动方向</td>

</tr>

</tbody>

</table>

**Disappear**

如果一个位于某个可滚动区域内的组件被绑定了 `disappear` 事件，那么当这个组件被滑出屏幕变为不可见状态时，该事件将被触发。

**事件对象**

<table>

<thead>

<tr>

<th>key</th>

<th>value</th>

<th>备注</th>

</tr>

</thead>

<tbody>

<tr>

<td>type</td>

<td>disappear</td>

<td></td>

</tr>

<tr>

<td>target</td>

<td></td>

<td>触发 Disappear 事件的组件对象</td>

</tr>

<tr>

<td>timestamp</td>

<td></td>

<td>事件被触发时的时间戳(不支持 H5)</td>

</tr>

<tr>

<td>direction</td>

<td>`up`或 `down`</td>

<td>触发事件时屏幕的滚动方向</td>

</tr>

</tbody>

</table>

###  HTML5 Plus

`uni-app` App 端内置 [HTML5+<span><span class="sr-only">(opens new window)</span></span>](https://www.html5plus.org/doc/) 引擎，让 js 可以直接调用丰富的原生能力

**条件编译调用 HTML5+**

小程序及 H5 等平台是没有 HTML5+ 扩展规范的，因此在 `uni-app` 调用 HTML5+ 的扩展规范时，需要注意使用条件编译。否则运行到h5、小程序等平台会出现 `plus is not defined`错误。

```js

    // #ifdef APP-PLUS
    var appid = plus.runtime.appid;
    console.log('应用的 appid 为：' + appid);
    // #endif
```

**`uni-app`不需要 `plus ready`**

在html中使用plus的api，需要等待plus ready。 而`uni-app`不需要等，可以直接使用。而且如果你调用plus ready，反而不会触发。

`uni-app` 中的事件监听

在普通的 H5+ 项目中，需要使用 `document.addEventListener` 监听原生扩展的事件。

`uni-app` 中，没有 document。可以使用 `plus.globalEvent.addEventListener` 来实现

```js

    // #ifdef APP-PLUS
    // 监听新意图事件
    plus.globalEvent.addEventListener('newintent', function(){});
    // #endif
```

同理，在 `uni-app` 中使用 Native.js 时，一些 Native.js 中对于原生事件的监听同样需要按照上面的方法去实现

###  Native.js

https://uniapp.dcloud.net.cn/tutorial/native-js.html

###  renderjs

`renderjs`是一个运行在视图层的js。它比[WXS<span><span class="sr-only">(opens new window)</span></span>](https://uniapp.dcloud.net.cn/tutorial/miniprogram-subject#wxs)更加强大。它只支持app-vue和web。

`renderjs`的主要作用有2个：

1   大幅降低逻辑层和视图层的通讯损耗，提供高性能视图交互能力
2   在视图层操作dom，运行 for web 的 js库

**平台差异说明**

<table>

<thead>

<tr>

<th style="text-align: center;">App</th>

<th style="text-align: center;">H5</th>

<th style="text-align: center;">微信小程序</th>

<th style="text-align: center;">支付宝小程序</th>

<th style="text-align: center;">百度小程序</th>

<th style="text-align: center;">字节跳动小程序、飞书小程序</th>

<th style="text-align: center;">QQ小程序</th>

</tr>

</thead>

<tbody>

<tr>

<td style="text-align: center;">√(2.5.5+，仅支持vue)</td>

<td style="text-align: center;">√</td>

<td style="text-align: center;">x</td>

<td style="text-align: center;">x</td>

<td style="text-align: center;">x</td>

<td style="text-align: center;">x</td>

<td style="text-align: center;">x</td>

</tr>

</tbody>

</table>

*   nvue的视图层是原生的，无法运行js。但提供了bindingx技术来解决通信阻塞。[详见<span><span class="sr-only">(opens new window)</span></span>](https://uniapp.dcloud.net.cn/tutorial/nvue-api#bindingx)
*   微信小程序下替代方案是wxs，这是微信提供的一个裁剪版renderjs。[详见<span><span class="sr-only">(opens new window)</span></span>](https://uniapp.dcloud.net.cn/tutorial/miniprogram-subject#wxs)
*   web下不存在逻辑层和视图层的通信阻塞，也可以直接操作dom，所以在web端使用renderjs主要是为了跨端复用代码。如果只开发web端，没有必要使用renderjs。

**使用方式**

设置 script 节点的 lang 为 renderjs

```js

    <script module="test" lang="renderjs">
    	export default {
    		mounted() {
    			// ...
    		},
    		methods: {
    			// ...
    		}
    	}
    </script>
```

*   [通过renderjs，在app和h5端使用完整的 `echarts`<span><span class="sr-only">(opens new window)</span></span>](https://ext.dcloud.net.cn/plugin?id=1207)

**功能详解**

*   大幅降低逻辑层和视图层的通讯损耗，提供高性能视图交互能力

uni-app的app端逻辑层和视图层是分离的，这种机制有很多好处，但也有一个副作用是在造成了两层之间通信阻塞。尤其是App的Android端阻塞问题影响了高性能应用的制作。

`renderjs`运行在视图层，可以直接操作视图层的元素，避免通信折损。

在hello uni-app的canvas示例中，App端使用了`renderjs`，由运行在视图层的`renderjs`直接操作视图层的canvas，实现了远超微信小程序的流畅canvas动画示例。具体在[hello uni-app<span><span class="sr-only">(opens new window)</span></span>](https://m3w.cn/uniapp)示例中体验，对比App端和小程序端的性能差异。

*   在视图层操作dom，运行for web的js库

官方不建议在uni-app里操作dom，但如果你不开发小程序，想使用一些操作了dom、window的库，其实可以使用`renderjs`来解决。

在app-vue环境下，视图层由webview渲染，而`renderjs`运行在视图层，自然可以操作dom和window。

这是一个基于`renderjs`运行echart完整版的示例：[renderjs版echart<span><span class="sr-only">(opens new window)</span></span>](https://ext.dcloud.net.cn/plugin?id=1207)

同理，`f2`、`threejs`等库都可以这么用

**注意事项**

*   目前仅支持内联使用。
*   不要直接引用大型类库，推荐通过动态创建 script 方式引用。
*   可以使用 vue 组件的生命周期(不支持 beforeDestroy、destroyed、beforeUnmount、unmounted)，不可以使用 App、Page 的生命周期
*   视图层和逻辑层通讯方式与 [WXS<span><span class="sr-only">(opens new window)</span></span>](https://uniapp.dcloud.net.cn/tutorial/miniprogram-subject.html#wxs) 一致，另外可以通过 this.$ownerInstance 获取当前组件的 ComponentDescriptor 实例。
*   注意逻辑层给数据时最好一次性给到渲染层，而不是不停从逻辑层向渲染层发消息，那样还是会产生逻辑层和视图层的多次通信，还是会卡
*   观测更新的数据在视图层可以直接访问到。
*   APP 端视图层的页面引用资源的路径相对于根目录计算，例如：./static/test.js。
*   APP 端可以使用 dom、bom API，不可直接访问逻辑层数据，不可以使用 uni 相关接口（如：uni.request）
*   H5 端逻辑层和视图层实际运行在同一个环境中，相当于使用 mixin 方式，可以直接访问逻辑层数据。

##  15 小程序相关

###  小程序自定义组件支持

`uni-app` 支持在 App 和 小程序 中使用**小程序自定义组件**，从HBuilderX2.4.7起，H5端也可以运行微信小程序组件。

小程序组件不是vue组件，并且每家小程序都有自己的组件规范，比如微信小程序的组件是wxml格式。

**平台差异说明**

<table>

<thead>

<tr>

<th>平台</th>

<th>支持情况</th>

<th>小程序组件存放目录</th>

</tr>

</thead>

<tbody>

<tr>

<td>H5</td>

<td>支持微信小程序组件（2.4.7+）</td>

<td>wxcomponents</td>

</tr>

<tr>

<td>App（不含nvue）</td>

<td>支持微信小程序组件</td>

<td>wxcomponents</td>

</tr>

<tr>

<td>微信小程序</td>

<td>支持微信小程序组件</td>

<td>wxcomponents</td>

</tr>

<tr>

<td>支付宝小程序</td>

<td>支持支付宝小程序组件</td>

<td>mycomponents</td>

</tr>

<tr>

<td>百度小程序</td>

<td>支持百度小程序组件</td>

<td>swancomponents</td>

</tr>

<tr>

<td>字节跳动小程序、飞书小程序</td>

<td>支持字节跳动小程序、飞书小程序组件</td>

<td>ttcomponents</td>

</tr>

<tr>

<td>QQ小程序</td>

<td>支持QQ小程序组件</td>

<td>wxcomponents</td>

</tr>

<tr>

<td>快手小程序</td>

<td>支持快手小程序组件</td>

<td>kscomponents</td>

</tr>

<tr>

<td>京东小程序</td>

<td>支持京东小程序组件</td>

<td>jdcomponents</td>

</tr>

</tbody>

</table>

此文档要求开发者对各端小程序的**自定义组件**有一定了解，没接触过小程序**自定义组件**的可以参考：

*   [微信小程序自定义组件<span><span class="sr-only">(opens new window)</span></span>](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/)
*   [百度小程序自定义组件<span><span class="sr-only">(opens new window)</span></span>](https://smartprogram.baidu.com/docs/develop/framework/custom-component/)
*   [支付宝小程序自定义组件<span><span class="sr-only">(opens new window)</span></span>](https://docs.alipay.com/mini/framework/custom-component-overview)
*   [字节跳动小程序自定义组件<span><span class="sr-only">(opens new window)</span></span>](https://developer.toutiao.com/docs/framework/custom_component_intro.html)
*   [飞书小程序自定义组件<span><span class="sr-only">(opens new window)</span></span>](https://open.feishu.cn/document/uYjL24iN/ugTOugTOugTO)
*   [QQ小程序自定义组件<span><span class="sr-only">(opens new window)</span></span>](https://q.qq.com/wiki/develop/miniprogram/frame/diy_components/)
*   [快手小程序自定义组件<span><span class="sr-only">(opens new window)</span></span>](https://mp.kuaishou.com/docs/develop/frame/custom_comp/component_temp_style.html)
*   [京东小程序自定义组件<span><span class="sr-only">(opens new window)</span></span>](https://mp-docs.jd.com/framework/customcomponent/)

**目录结构**

```js

    ┌─wxcomponents                  微信小程序自定义组件存放目录
    │   └──custom                   微信小程序自定义组件
    │		├─index.js
    │		├─index.wxml
    │		├─index.json
    │		└─index.wxss
    ├─mycomponents                  支付宝小程序自定义组件存放目录
    │   └──custom                   支付宝小程序自定义组件
    │		├─index.js
    │		├─index.axml
    │		├─index.json
    │		└─index.acss
    ├─swancomponents                百度小程序自定义组件存放目录
    │   └──custom                   百度小程序自定义组件
    │		├─index.js
    │		├─index.swan
    │		├─index.json
    │		└─index.css
    ├─pages
    │  └─index
    │		└─index.vue
    │
    ├─static
    ├─main.js
    ├─App.vue
    ├─manifest.json
    └─pages.json
```

**使用方式**

在 `pages.json` 对应页面的 style -> usingComponents 引入组件：

```js

    {
    	"pages": [{
    		"path": "index/index",
    		"style": {
    			// #ifdef APP-PLUS || H5 || MP-WEIXIN || MP-QQ
    			"usingComponents": {
    				"custom": "/wxcomponents/custom/index"
    			},
    			// #endif
    			// #ifdef MP-BAIDU
    			"usingComponents": {
    				"custom": "/swancomponents/custom/index"
    			},
    			// #endif
    			// #ifdef MP-ALIPAY
    			"usingComponents": {
    				"custom": "/mycomponents/custom/index"
    			},
    			// #endif
    			"navigationBarTitleText": "uni-app"
    		}
    	}]
    }
```

在页面中使用

```js

    <!-- 页面模板 (index.vue) -->
    <view>
        <!-- 在页面中对自定义组件进行引用 -->
        <custom name="uni-app"></custom>
    </view>
```

**代码示例**

下面以微信小程序官方自定义组件示例 [miniprogram-slide-view<span><span class="sr-only">(opens new window)</span></span>](https://github.com/wechat-miniprogram/slide-view) 为例演示小程序自定义组件的使用方式。 其他组件使用示例见GitHub：[wxcomponents-template<span><span class="sr-only">(opens new window)</span></span>](https://github.com/dcloudio/uni-app/tree/master/examples/wxcomponents-template)。 插件市场有一个完整的`vant weapp` 引用好的示例工程，详见https://ext.dcloud.net.cn/plugin?id=302。

目录结构

```js

    ┌─components
    ├─wxcomponents
    │   └──miniprogram-slide-view
    │		├─index.js
    │		├─index.wxml
    │		├─index.json
    │		└─index.wxss
    │
    ├─pages
    │  └─slide-view
    │		└─slide-view.vue
    │
    ├─static
    ├─main.js
    ├─App.vue
    ├─manifest.json
    └─pages.json
```

pages.json

```js

    {
        "pages": [
            {
            	"path": "slide-view/slide-view",
            	"style": {
            		"navigationBarTitleText": "slide-view",
            		"usingComponents": {
            			"slide-view": "/wxcomponents/miniprogram-slide-view/index"
            		}
            	}
            }
        ]
    }
```

slide-view.vue

```js

    <template>
    	<view class='slide'>
    		<slide-view width="750" height="110" slide-width="500">
    			<view slot="left" class="l">
    				<image src="/static/file_transfer.jpg" class="img"></image>
    				<view class='text'>
    					<view class='title'>文件传输助手</view>
    					<view class='time'>7:00 PM</view>
    				</view>
    			</view>
    			<view slot="right" class="r">
    				<view class='read'>标为已读</view>
    				<view class='delete'>删除</view>
    			</view>
    		</slide-view>
    	</view>
    </template>
    <script>
    	export default {}
    </script>
    <style>
    	.slide {
    		border-bottom: 1px solid #DEDEDE;
    	}
    	.l {
    		background-color: white;
    		height: 110rpx;
    		width: 750rpx;
    		display: flex;
    		flex-direction: row;
    	}
    	.r {
    		height: 110rpx;
    		display: flex;
    		direction: row;
    		text-align: center;
    		vertical-align: middle;
    		line-height: 110rpx;
    	}
    	.read {
    		background-color: #ccc;
    		color: #fff;
    		width: 350rpx;
    	}
    	.delete {
    		background-color: red;
    		color: #fff;
    		width: 150rpx;
    	}
    	.img {
    		width: 90rpx;
    		height: 90rpx;
    		border-radius: 10rpx;
    		margin: 10rpx 15rpx;
    	}
    	.text {
    		display: flex;
    		flex-direction: row;
    	}

    	.title {
    		margin-top: 15rpx;
    		font-size: 33rpx;
    	}
    	.time {
    		margin-top: 15rpx;
    		color: #ccc;
    		font-size: 25rpx;
    		margin-left: 330rpx;
    	}
    </style>
```

**注意事项**

*   小程序组件需要放在项目特殊文件夹 `wxcomponents`（或 mycomponents、swancomponents）。HBuilderX 建立的工程 `wxcomponents` 文件夹在 项目根目录下。vue-cli 建立的工程 `wxcomponents` 文件夹在 `src` 目录下。可以在 vue.config.js 中自定义其他目录
*   小程序组件的性能，不如vue组件。使用小程序组件，需要自己手动setData，很难自动管理差量数据更新。而使用vue组件会自动diff更新差量数据。所以如无明显必要，建议使用vue组件而不是小程序组件。比如某些小程序ui组件，完全可以用更高性能的uni ui替代。
*   当需要在 `vue` 组件中使用小程序组件时，注意在 `pages.json` 的 `globalStyle` 中配置 `usingComponents`，而不是页面级配置。
*   注意数据和事件绑定的差异，组件使用时应按照vue的数据和事件绑定方式
    *   属性绑定从 `attr=""`，改为 `:attr="a"`；从 `title="复选框"` 改为 `:title="'复选框' + item"`
    *   事件绑定从 `bind:click="toggleActionSheet1"` 改为 `@click="toggleActionSheet1"`，目前支付宝小程序不支持 `vue` 的事件绑定方式，具体参考：[支付宝小程序组件事件监听示例<span><span class="sr-only">(opens new window)</span></span>](https://github.com/dcloudio/uni-app/issues/917#issuecomment-653329693)
    *   阻止事件冒泡 从 `catch:tap="xx"` 改为 `@tap.native.stop="xx"`
    *   `wx:if` 改为 `v-if`
    *   `wx:for="" wx:key=""` 改为`v-for="(item,index) in list"`

详细的小程序转uni-app语法差异可参考文档https://ask.dcloud.net.cn/article/35786。

##  16 项目结构

###  App.vue

*   应用生命周期仅可在App.vue中监听，在其它页面监听无效
*   应用启动参数，可以在API uni.getLaunchOptionsSync获取
*   App.vue 不能写模
*   onPageNotFound 页面实际上已经打开了（比如通过分享卡片、小程序码）且发现页面不存在，才会触发，api 跳转不存在的页面不会触发（如 uni.navigateTo）

```js

    <!-- https://uniapp.dcloud.net.cn/collocation/App.html -->
    <script>
    	// 只能在App.vue里监听应用的生命周期
    	export default {
    		onLaunch: function() {
    			console.log('App Launch')
    		},
    		onShow: function() {
    			console.log('App Show')
    		},
    		onHide: function() {
    			console.log('App Hide')
    		}
    	}
    </script>
```

###  Main.js

main.js是 uni-app 的入口文件，主要作用是初始化vue实例、定义全局组件、使用需要的插件如 vuex。

首先引入了Vue库和App.vue，创建了一个vue实例，并且挂载vue实例

```js

    import Vue from 'vue'
    import App from './App'
    import pageHead from './components/page-head.vue' //全局引用 page-head 组件

    Vue.config.productionTip = false
    Vue.component('page-head', pageHead) //全局注册 page-head 组件，每个页面将可以直接使用该组件
    App.mpType = 'app'

    const app = new Vue({
    ...App
    })
    app.$mount() //挂载 Vue 实例
```

###  vue.config.js

vue.config.js 是一个可选的配置文件，如果项目的根目录中存在这个文件，那么它会被自动加载，一般用于配置 webpack 等编译选项

###  uni.scss

uni.scss文件的用途是为了方便整体控制应用的风格。比如按钮颜色、边框风格，uni.scss文件里预置了一批scss变量预置

使用时需要在 style 节点上加上 lang="scss"。

```js

    <style lang="scss">
    </style>
```

以下是 uni.scss 的相关变量：

```js

    /* 颜色变量 */

    /* 行为相关颜色 */
    $uni-color-primary: #007aff;
    $uni-color-success: #4cd964;
    $uni-color-warning: #f0ad4e;
    $uni-color-error: #dd524d;

    /* 文字基本颜色 */
    $uni-text-color:#333;//基本色
    $uni-text-color-inverse:#fff;//反色
    $uni-text-color-grey:#999;//辅助灰色，如加载更多的提示信息
    $uni-text-color-placeholder: #808080;
    $uni-text-color-disable:#c0c0c0;

    /* 背景颜色 */
    $uni-bg-color:#ffffff;
    $uni-bg-color-grey:#f8f8f8;
    $uni-bg-color-hover:#f1f1f1;//点击状态颜色
    $uni-bg-color-mask:rgba(0, 0, 0, 0.4);//遮罩颜色

    /* 边框颜色 */
    $uni-border-color:#c8c7cc;

    /* 尺寸变量 */

    /* 文字尺寸 */
    $uni-font-size-sm:24rpx;
    $uni-font-size-base:28rpx;
    $uni-font-size-lg:32rpx;

    /* 图片尺寸 */
    $uni-img-size-sm:40rpx;
    $uni-img-size-base:52rpx;
    $uni-img-size-lg:80rpx;

    /* Border Radius */
    $uni-border-radius-sm: 4rpx;
    $uni-border-radius-base: 6rpx;
    $uni-border-radius-lg: 12rpx;
    $uni-border-radius-circle: 50%;

    /* 水平间距 */
    $uni-spacing-row-sm: 10px;
    $uni-spacing-row-base: 20rpx;
    $uni-spacing-row-lg: 30rpx;

    /* 垂直间距 */
    $uni-spacing-col-sm: 8rpx;
    $uni-spacing-col-base: 16rpx;
    $uni-spacing-col-lg: 24rpx;

    /* 透明度 */
    $uni-opacity-disabled: 0.3; // 组件禁用态的透明度

    /* 文章场景相关 */
    $uni-color-title: #2C405A; // 文章标题颜色
    $uni-font-size-title:40rpx;
    $uni-color-subtitle: #555555; // 二级标题颜色
    $uni-font-size-subtitle:36rpx;
    $uni-color-paragraph: #3F536E; // 文章段落颜色
    $uni-font-size-paragraph:30rpx;
```

###  uni_modules

？？

##  17 运行

> 运行的快捷键是`Ctrl/Command+R`

HBuilderX 还提供了快捷运行菜单，可以按数字快速选择要运行的设备

![](https://s.poetries.work/uploads/2023/02/f08ba22525849c6b.png)

###  运行到App

运行App到手机或模拟器：使用电压足够的usb端口连接手机，设置中开启USB调试，手机上允许电脑设备调试手机，进入hello-uniapp项目，点击工具栏的运行 -> 运行App到手机或模拟器，即可在该设备里面体验uni-app

###  运行到小程序

点击工具栏的运行 -> 运行到小程序模拟器 -> 微信开发者工具，即可在微信开发者工具里面体验uni-app

> 注意：微信开发者工具需要开启服务端口 在微信工具的`设置->安全中`

###  支付宝小程序

在支付宝小程序开发者工具里运行：进入hello-uniapp项目，点击工具栏的运行 -> 运行到小程序模拟器 -> 支付宝小程序开发者工具，即可在支付宝小程序开发者工具里面体验uni-app

##  18 发布

> https://uniapp.dcloud.net.cn/quickstart-hx.html

###  小程序打包

在HBuilderX中顶部菜单依次点击 "发行" => "小程序-微信"，输入小程序名称和appid点击发行即可

如果手动发行，则点击发行按钮后，会在项目的目录 unpackage/dist/build/mp-weixin 生成微信小程序项目代码。在微信小程序开发者工具中，导入生成的微信小程序项目，测试项目代码运行正常后，点击“上传”按钮，之后按照 “提交审核” => “发布” 小程序标准流程，逐步操作即可

如果在发行界面勾选了自动上传微信平台，则无需再打开微信工具手动操作，将直接上传到微信服务器提交审核

###  发布为Web网站

###  App打包

在HBuilderX工具栏，点击发行，选择原生app-云端打包

App打包时，注意如果涉及三方sdk，需进行申请并在manifest.json里配置，否则相关功能无法使用

##  19 uni-app组成和跨端原理

###  基本语言和开发规范

为了实现多端兼容，综合考虑编译速度、运行性能等因素，uni-app 约定了如下开发规范：

*   页面文件遵循 Vue 单文件组件 (SFC) 规范，即每个页面是一个.vue文件
*   组件标签靠近小程序规范，详见uni-app 组件规范
*   接口能力（JS API）靠近小程序规范，但需将前缀 wx、my 等替换为 uni，详见uni-app接口规范
*   数据绑定及事件处理同 Vue.js 规范，同时补充了App及页面的生命周期
*   如需兼容app-nvue平台，建议使用flex布局进行开发

uni-app分编译器和运行时（runtime）。uni-app能实现一套代码、多端运行，是通过这2部分配合完成的。

编译器将开发者的代码进行编译，编译的输出物由各个终端的runtime进行解析，每个平台（Web、Android App、iOS App、各家小程序）都有各自的runtime

###  编译器

*   一般是内置在HBuilderX工具中，也可以使用独立的cli版
*   开发者按uni-app规范编写代码，由编译器将开发者的代码编译生成每个平台支持的特有代码
    *   在web平台，将.vue文件编译为js代码。与普通的vue cli项目类似
    *   在微信小程序平台，编译器将.vue文件拆分生成wxml、wxss、js等代码
    *   在app平台，将.vue文件编译为js代码。进一步，如果涉及uts代码：
        *   在Android平台，将.uts文件编译为kotlin代码
        *   在iOS平台，将.uts文件编译为swift代码
*   编译器分vue2版和vue3版
    *   vue2版：基于webpack实现
    *   vue3版：基于Vite实现，性能更快
*   编译器支持条件编译，即可以指定某部分代码只编译到特定的终端平台。从而将公用和个性化融合在一个工程中

```js

    // #ifdef  App
    console.log("这段代码只有在App平台才会被编译进去。非App平台编译后没有这段代码")
    // #endif
```

###  运行时（runtime）

runtime不是运行在电脑开发环境，而是运行在真正的终端上。

uni-app在每个平台（Web、Android App、iOS App、各家小程序）都有各自的runtime。这是一个比较庞大的工程。

*   在小程序端，uni-app的runtime，主要是一个小程序版的vue runtime，页面路由、组件、api等方面基本都是转义。
*   在web端，uni-app的runtime相比普通的vue项目，多了一套ui库、页面路由框架、和uni对象（即常见API封装）
*   在App端，uni-app的runtime更复杂，可以先简单理解为DCloud也有一套小程序引擎，打包app时将开发者的代码和DCloud的小程序打包成了apk或ipa。当然，事实上DCloud确实有小程序引擎产品，供原生应用实现小程序化

uni-app runtime包括3部分：基础框架、组件、API

**基础框架：**

*   包括语法、数据驱动、全局文件、应用管理、页面管理、js引擎、渲染和排版引擎等
*   在web和小程序上，不需要uni-app提供js引擎和排版引擎，直接使用浏览器和小程序的即可。但app上需要uni-app提供
*   App的js引擎：App-Android上，uni-app的js引擎是v8，App-iOS是jscore
*   App的渲染引擎：同时提供了2套渲染引擎，.vue页面文件由webview渲染，原理与小程序相同；.nvue页面文件由原生渲染，原理与react native相同。开发者可以根据需要自主选择渲染引擎

**组件**

*   runtime中包括的组件只有基础组件，如`<view>`、`<button>`等。扩展组件不包含在uni-app的runtime中，而是下载到用户的项目代码中。
*   为了降低开发者的学习成本，uni-app的组件命名规范与小程序基本相同。
*   这几十个组件不管在哪个平台，已被处理为均有一致表现。
*   在小程序端，基础组件会直接转义为小程序自己的组件。在小程序的runtime中不占体积。
*   在web和android、iOS端，这几十个组件都在uni-app的runtime中，会占用一定体积，相当于内置了一套ui库。
*   组件的扩展
    *   有了几十个基础组件，大多数扩展组件也都是基于这些基础组件封装的。比如官方提供的扩展ui库uni ui。
    *   在web平台，for web的各种ui库（如elementUI）也可以使用，但这些库由于操作了dom，无法跨端在app和小程序中使用。
    *   在App平台，uni-app也支持使用原生编程语言来自行扩展原生组件，比如原生的地图、ar等。
    *   uni-app同时支持将微信自定义组件运行到微信小程序、web、app这3个平台

**API**

uni-app runtime内置了大量常见的、跨端的 API，比如联网(uni.request)、读取存储(uni.getStorage)

*   同时uni-app不限制各端原生平台的API调用。开发者可以在uni-app框架中无限制的调用该平台所有能使用的API。即，在小程序平台，小程序的所有API都可以使用；在web平台，浏览器的所有API都可使用；在iOS和Android平台，os的所有API都可以使用。
*   也就是说，使用uni-app的标准API，可以跨端使用。但对于不跨端的部分，仍可以调用该端的专有API。由于常见的API都已经被封装内置，所以日常开发时，开发者只需关注uni标准API，当需要调用特色端能力时在条件编译里编写特色API调用代码。
*   ext API：web和app的runtime体积不小，如果把小程序的所有API等内置进去会让开发者的最终应用体积变大。所以有部分不常用的API被剥离为- ext API。虽然仍然是uni.开头，但需要单独下载插件到项目下
*   小程序平台：uni对象会转为小程序的自有对象，比如在微信小程序平台，编写uni.request等同于wx.request。那么所有wx.的API都可以这样使用。
*   web平台：window、dom等浏览器专用API仍可以使用
*   app平台：除了uni.的API，还可以使用plus.的API、Native.js，以及通过uts编写原生插件，或者使用java和objectC编写原生插件。这些原生插件调用os的API并封装给js使用。
*   由于历史沿革，DCloud在开发app时有：5+App、wap2app、uni-app等3种模式。这3种方式的runtime在底层能力上是公用的，所有uni-app可以调用5+（也就是plus.xxx）的API。虽然都可以使用5+的系统能力，但uni-app的逻辑层运行在js层，渲染层是webview和原生nvue双选。而5+不区分逻辑层和渲染层，全部运行在webview里，在性能上5+不及uni-app

###  逻辑层和渲染层分离

在web平台，逻辑层（js）和渲染层（html、css），都运行在统一的webview里。

但在小程序和app端，逻辑层和渲染层被分离了。

分离的核心原因是性能。过去很多开发者吐槽基于webview的app性能不佳，很大原因是js运算和界面渲染抢资源导致的卡顿。

不管小程序还是app，逻辑层都独立为了单独的js引擎，渲染层仍然是webview（app上也支持纯原生渲染）。

所以注意小程序和app的逻辑层都不支持浏览器专用的window、dom等API。app只能在渲染层操作window、dom，即renderjs

##  20 需要注意

###  easycom组件规范

> `HBuilderX 2.5.5`起支持

传统vue组件，需要安装、引用、注册，三个步骤后才能使用组件。`easycom`将其精简为一步。

只要组件安装在项目的components目录下或`uni_modules`目录下，并符合`components/组件名称/组件名称.vue`目录结构。就可以不用引用、注册，直接在页面中使用。

比如前述举例的[uni-rate组件<span><span class="sr-only">(opens new window)</span></span>](https://ext.dcloud.net.cn/plugin?id=33)，它导入到uni-app项目后，存放在了目录/components/uni-rate/uni-rate.vue

同时它的组件名称也叫uni-rate，所以这样的组件，不用在script里注册和引用。 如下：

```js

    <template>
    		<view>
    			<uni-rate></uni-rate><!-- 这里会显示一个五角星，并且点击后会自动亮星 -->
    		</view>
    	</template>
    <script>
    	// 这里不用import引入，也不需要在components内注册uni-list组件。template里就可以直接用
    	export default {
    		data() {
    			return {

    			}
    		}
    	}
    </script>
```

不管components目录下安装了多少组件，`easycom`打包后会自动剔除没有使用的组件，对组件库的使用尤为友好。

组件库批量安装，随意使用，自动按需打包。以官方的`uni-ui`为例，在HBuilderX新建项目界面选择`uni-ui`项目模板，只需在页面中敲u，拉出大量组件代码块，直接选择，即可使用。大幅提升开发效率，降低使用门槛。

在[DCloud插件市场<span><span class="sr-only">(opens new window)</span></span>](https://ext.dcloud.net.cn/)下载符合`components/组件名称/组件名称.vue`目录结构的组件，均可直接使用。

`easycom`是自动开启的，不需要手动开启。

如果你的组件名称或路径不符合easycom的默认规范，可以在`pages.json`的`easycom`节点进行个性化设置，自定义匹配组件的策略。[另见<span><span class="sr-only">(opens new window)</span></span>](https://uniapp.dcloud.net.cn/collocation/pages#easycom)

如果不使用easycom，手动引用和注册vue组件，则需要分3步写如下代码：

1   import导入组件
2   components里注册组件
3   template中使用组件

```js

    <template>
    		<view>
    			<uni-rate text="1"></uni-rate><!-- 3.使用组件 -->
    		</view>
    	</template>
    	<script>
    		import uniRate from '@/components/uni-rate/uni-rate.vue';//1.导入组件
    		export default {
    			components:{uniRate }//2.注册组件
    		}
    	</script>
```

###  scroll-view

其实是关于 scroll-view 失效的问题，复制官方代码代码后会发现 scroll-view 横向滚共不生效，其实是没有设置好样式，将 scroll-view 容器设置宽度，并设置 white-space: nowrap; scroll-view 容器的每一项都设置宽度和 `display:inline-block`

```js

    .scroll-view {
        width: 100%;
        white-space: nowrap;
        .item {
            position: relative;
            display: inline-block;
            width: 218rpx;
            padding-bottom:16rpx;
            margin-right: 16rpx;
            line-height: 34rpx;
        }
    }
```

