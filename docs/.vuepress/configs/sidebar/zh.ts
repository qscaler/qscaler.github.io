import type { SidebarConfig } from '@vuepress/theme-default'

export const sidebarZh: SidebarConfig = {
    // 侧边栏数组
    // 所有页面会使用相同的侧边栏
    // 侧边栏对象
    // 不同子路径下的页面会使用不同的侧边栏
    '/qscaler/': [
        {
            text: '01 html',
            collapsible: true,
            children: [
                '/qscaler/01 html/1 基础篇.md',
                '/qscaler/01 html/2 进阶篇.md',
            ],
        },
        // {
        //     text: '02 css',
        //     collapsible: true,
        //     children: [
        //         '/qscaler/02 css/index.md',
        //     ],
        // },
        // {
        //     text: '03 js',
        //     collapsible: true,
        //     children: [
        //         '/qscaler/03 js/index.md',
        //     ],
        // },
        // {
        //     text: '04 jquery',
        //     collapsible: true,
        //     children: [
        //         '/qscaler/04 jquery/index.md',
        //     ],
        // },
        // {
        //     text: '05 浏览器',
        //     collapsible: true,
        //     children: [
        //         '/qscaler/05 浏览器/index.md',
        //     ],
        // },
        // {
        //     text: '06 webpack',
        //     collapsible: true,
        //     children: [
        //         '/qscaler/06 webpack/index.md',
        //     ],
        // },
        {
            text: '07 Es6',
            collapsible: true,
            children: [
                '/qscaler/07 Es6/index.md',
            ],
        },
        // {
        //     text: '08 vue',
        //     collapsible: true,
        //     children: [
        //         '/qscaler/08 vue/index.md',
        //     ],
        // },
        // {
        //     text: '09 react',
        //     collapsible: true,
        //     children: [
        //         '/qscaler/09 react/index.md',
        //     ],
        // },
        // {
        //     text: '10 angularjs',
        //     collapsible: true,
        //     children: [
        //         '/qscaler/10 angularjs/index.md',
        //     ],
        // },
        // {
        //     text: '11 TypeScript',
        //     collapsible: true,
        //     children: [
        //         '/qscaler/11 TypeScript/index.md',
        //     ],
        // },
        // {
        //     text: '12 移动web',
        //     collapsible: true,
        //     children: [
        //         '/qscaler/12 移动web/index.md',
        //     ],
        // },
        // {
        //     text: '13 小程序',
        //     collapsible: true,
        //     children: [
        //         '/qscaler/13 小程序/index.md',
        //     ],
        // },
        // {
        //     text: '14 低代码',
        //     collapsible: true,
        //     children: [
        //         '/qscaler/14 低代码/index.md',
        //     ],
        // },
        // {
        //     text: '15 node',
        //     collapsible: true,
        //     children: [
        //         '/qscaler/15 node/index.md',
        //     ],
        // },
        // {
        //     text: '16 性能',
        //     collapsible: true,
        //     children: [
        //         '/qscaler/16 性能/index.md',
        //     ],
        // },
        // {
        //     text: '17 安全',
        //     collapsible: true,
        //     children: [
        //         '/qscaler/17 安全/index.md',
        //     ],
        // },
        // {
        //     text: '18 Redis',
        //     collapsible: true,
        //     children: [
        //         '/qscaler/18 Redis/index.md',
        //     ],
        // },
        // {
        //     text: '19 Canvas',
        //     collapsible: true,
        //     children: [
        //         '/qscaler/19 Canvas/index.md',
        //     ],
        // },
        // {
        //     text: '20 nginx',
        //     collapsible: true,
        //     children: [
        //         '/qscaler/20 nginx/index.md',
        //     ],
        // },
        // {
        //     text: '24 库',
        //     collapsible: true,
        //     children: [
        //         '/qscaler/24 库/index.md',
        //     ],
        // },
        // {
        //     text: '25 模板',
        //     collapsible: true,
        //     children: [
        //         '/qscaler/25 模板/index.md',
        //     ],
        // },
        // {
        //     text: '26 java',
        //     collapsible: true,
        //     children: [
        //         '/qscaler/26 java/index.md',
        //     ],
        // },
        // {
        //     text: '27 other',
        //     collapsible: true,
        //     children: [
        //         '/qscaler/27 other/index.md',
        //     ],
        // },

    ],
    '/online/': [
        {
            text: '基础进阶',
            collapsible: true,
            children: [
                // '/online/1 基础进阶/index.md',
                '/online/1 基础进阶/1.基础篇.md',
                '/online/1 基础进阶/2.进阶篇.md',
                '/online/1 基础进阶/3.高频篇.md',
                '/online/1 基础进阶/4.手写篇.md',
                '/online/1 基础进阶/5.综合题型.md',
                '/online/1 基础进阶/6.精选模块.md',
                '/online/1 基础进阶/7.其他问题.md',
                '/online/1 基础进阶/8.设计模式.md',
            ],
        },
        {
            text: '精选模块',
            collapsible: true,
            children: [
                {
                    text: '精选篇',
                    collapsible: true,
                    children: [
                        '/online/2 精选文档/1 HTML模块.md',
                        '/online/2 精选文档/2 CSS模块.md',
                        '/online/2 精选文档/3 JS模块.md',
                        '/online/2 精选文档/4 ES6模块.md',
                        '/online/2 精选文档/5 浏览器模块.md',
                        '/online/2 精选文档/6 React模块.md',
                        '/online/2 精选文档/7 Vue模块.md',
                        '/online/2 精选文档/8 Node模块.md',
                        '/online/2 精选文档/9 前端工程相关.md',
                        '/online/2 精选文档/10 移动多端开发.md',
                        '/online/2 精选文档/11 小程序模块.md',
                        '/online/2 精选文档/12 Uniapp模块.md',
                        '/online/2 精选文档/13 前端安全模块.md',
                        '/online/2 精选文档/14 性能优化相关.md',
                        '/online/2 精选文档/15 HTTP模块.md',
                        '/online/2 精选文档/16 常用设计模式.md',
                        '/online/2 精选文档/17 框架通识.md',
                        '/online/2 精选文档/18 排序算法.md',
                        '/online/2 精选文档/19 计算机通识.md',
                    ],
                },
                {
                    text: '进阶篇',
                    collapsible: true,
                    children: [
                        '/online/2 精选文档/20 高频模块.md',
                        '/online/2 精选文档/21 面试指南.md',
                        '/online/2 精选文档/22 性能优化.md',
                    ],
                },
            ],
        },
        {
            text: '原理文档',
            collapsible: true,
            children: [
                {
                    text: 'Vue',
                    collapsible: true,
                    children: [
                        // '/online/3 原理文档/1 vue/index.md',
                        '/online/3 原理文档/1 vue/1 从源码解读Vue生命周期.md',
                        '/online/3 原理文档/1 vue/2 组件的本质.md',
                        '/online/3 原理文档/1 vue/3 有状态组件的设计.md',
                        '/online/3 原理文档/1 vue/4 设计 VNode.md',
                        '/online/3 原理文档/1 vue/5 辅助创建 VNode 的 h 函数.md',
                        '/online/3 原理文档/1 vue/6 自定义渲染器和异步渲染.md',
                        '/online/3 原理文档/1 vue/7 渲染器之挂载.md',
                        '/online/3 原理文档/1 vue/8 渲染器的核心 Diff 算法.md',
                        '/online/3 原理文档/1 vue/9 渲染器之patch.md',
                        '/online/3 原理文档/1 vue/10 图解 Vue 响应式原理.md',
                        '/online/3 原理文档/1 vue/11 图解 Vue 异步更新.md',
                        '/online/3 原理文档/1 vue/12 剖析 Vue 内部运行机制.md',
                        '/online/3 原理文档/1 vue/13 vue响应式原理模拟.md',
                        '/online/3 原理文档/1 vue/14 vue状态管理之vuex.md',
                        '/online/3 原理文档/1 vue/15 理解Vue的设计思想及实现Vue.md',
                        '/online/3 原理文档/1 vue/16 diff算法深入.md',
                        '/online/3 原理文档/1 vue/17 vue router vuex原理分析.md',
                        '/online/3 原理文档/1 vue/18 Vue3初探响应式原理.md',
                        '/online/3 原理文档/1 vue/19 vue2源码分析.md',
                        '/online/3 原理文档/1 vue/20 vue组件化实践.md',
                    ],
                },
                {
                    text: 'React',
                    collapsible: true,
                    children: [
                        '/online/3 原理文档/2 react/index.md',
                    ],
                },
                {
                    text: 'Webpack',
                    collapsible: true,
                    children: [
                        '/online/3 原理文档/3 webpack/index.md',
                    ],
                },
                {
                    text: 'Javascript',
                    collapsible: true,
                    children: [
                        '/online/3 原理文档/4 javascript/index.md',
                    ],
                },
                {
                    text: 'node',
                    collapsible: true,
                    children: [
                        '/online/3 原理文档/5 node/index.md',
                    ],
                },
                {
                    text: '综合',
                    collapsible: true,
                    children: [
                        '/online/3 原理文档/6 综合/index.md',
                    ],
                },

            ],
        },
        {
            text: '面经汇总',
            collapsible: true,
            children: [
                '/online/4 面经汇总/1 面经.md',
            ],
        },
        {
            text: '自检题',
            collapsible: true,

            children: [
                // '/online/5 自检/index.md',
                '/online/5 自检/1 自检100题.md',
                '/online/5 自检/2 面试综合汇总.md',
                '/online/5 自检/3 Promise面试题.md',
            ],
        },
        {
            text: '每日一题',
            collapsible: true,
            children: [
                '/online/6 每日一题/index.md',
            ],
        },
        {
            text: '前端算法面试',
            collapsible: true,
            children: [
                '/online/7 前端算法面试/1 快速上手——从0到1掌握算法面试需要的数据结构（一）.md',
                '/online/7 前端算法面试/2 快速上手——从0到1掌握算法面试需要的数据结构（二）.md',
                '/online/7 前端算法面试/3 快速上手——从0到1掌握算法面试需要的数据结构（三）.md',
                '/online/7 前端算法面试/4 递归初相见——二叉树递归遍历的三种姿势.md',
                '/online/7 前端算法面试/5 算法的衡量——轻松理解时间复杂度与空间复杂度.md',
                '/online/7 前端算法面试/6 数组的应用——真题归纳与解读.md',
                '/online/7 前端算法面试/7 字符串的应用——真题归纳与解读.md',
                '/online/7 前端算法面试/8 链表的应用——真题归纳与解读.md',
                '/online/7 前端算法面试/9 快慢指针与多指针——玩转链表复杂操作.md',
                '/online/7 前端算法面试/10 姿势特别的链表——环形链表专题.md',
                '/online/7 前端算法面试/11 栈与队列怎么玩（上）.md',
                '/online/7 前端算法面试/12 栈与队列怎么玩（下）.md',
                '/online/7 前端算法面试/13 遍历专题 DFS 与 BFS.md',
                '/online/7 前端算法面试/14 场景化解读 递归与回溯思想在真题中的应用.md',
                '/online/7 前端算法面试/15 二叉树真题归纳与解读.md',
                '/online/7 前端算法面试/16 特殊的二叉树——二叉搜索树专题.md',
                '/online/7 前端算法面试/17 特殊的二叉树——平衡二叉树专题.md',
                '/online/7 前端算法面试/18 特殊的二叉树——堆结构及其在排序中的应用.md',
                '/online/7 前端算法面试/19 排序算法专题（上）.md',
                '/online/7 前端算法面试/20 排序算法专题（下）.md',
                '/online/7 前端算法面试/21 普通人也能吃透的动态规划思想专题（上）.md',
                '/online/7 前端算法面试/22 普通人也能吃透的动态规划思想专题（下）.md',
            ],
        },
        {
            text: '思维导图',
            collapsible: true,
            children: [
                {
                    text: '1 前端',
                    collapsible: true,
                    children: [
                        '/online/8 思维导图/1 前端/1 Javascript.md',
                        '/online/8 思维导图/1 前端/2 Typescript.md',
                        '/online/8 思维导图/1 前端/3 Jquery.md',
                        '/online/8 思维导图/1 前端/4 CSS.md',
                        '/online/8 思维导图/1 前端/5 框架相关.md',
                        '/online/8 思维导图/1 前端/6 前端综合.md',
                    ],
                },
                {
                    text: '2 后端',
                    collapsible: true,
                    children: [
                        {
                            text: '1 Java',
                            collapsible: true,
                            children: [
                                '/online/8 思维导图/2 后端/1 Java/1 Java基础.md',
                                '/online/8 思维导图/2 后端/1 Java/2 Java总结.md',
                                '/online/8 思维导图/2 后端/1 Java/3 SpringBoot.md',
                                '/online/8 思维导图/2 后端/1 Java/4 SpringCloud.md',
                                '/online/8 思维导图/2 后端/1 Java/5 Zookeeper.md',
                                '/online/8 思维导图/2 后端/1 Java/6 Kafka.md',
                                '/online/8 思维导图/2 后端/1 Java/7 RabbitMQ.md',
                                '/online/8 思维导图/2 后端/1 Java/8 分布式.md',
                            ],
                        },
                        {
                            text: '2 Python',
                            collapsible: true,
                            children: [
                                '/online/8 思维导图/2 后端/2 Python/1 基础.md',
                            ],
                        },
                        '/online/8 思维导图/2 后端/3 综合导图.md',
                    ],
                },
                {
                    text: '3 计算机基础',
                    collapsible: true,
                    children: [
                        '/online/8 思维导图/3 计算机基础/1 数据结构.md',
                        '/online/8 思维导图/3 计算机基础/2 操作系统.md',
                        '/online/8 思维导图/3 计算机基础/3 Redis.md',
                        '/online/8 思维导图/3 计算机基础/4 Mysql.md',
                    ],
                },
                {
                    text: '4 工具',
                    collapsible: true,
                    children: [
                        '/online/8 思维导图/4 工具/1 Git.md',
                        '/online/8 思维导图/4 工具/2 Vim.md',
                        '/online/8 思维导图/4 工具/3 Docker.md',
                    ],
                },
            ],
        },
        {
            text: '学习路线',
            collapsible: true,
            children: [
                '/online/9 学习路线/index.md',
            ],
        },
        {
            text: '前端基础相关',
            collapsible: true,
            children: [
                {
                    text: '1 HTTP相关',
                    collapsible: true,
                    children: [
                        {
                            text: '1 基础篇',
                            collapsible: true,
                            children: [
                                '/online/10 前端基础相关/1 HTTP相关/1 基础篇/1 HTTP的前世今生.md',
                                '/online/10 前端基础相关/1 HTTP相关/1 基础篇/2 HTTP是什么.md',
                                '/online/10 前端基础相关/1 HTTP相关/1 基础篇/3 HTTP世界全览.md',
                                '/online/10 前端基础相关/1 HTTP相关/1 基础篇/4 HTTP分层.md',
                                '/online/10 前端基础相关/1 HTTP相关/1 基础篇/5 键入网址到回车发生什么.md',
                                '/online/10 前端基础相关/1 HTTP相关/1 基础篇/6 HTTP报文是什么样子的.md',
                                '/online/10 前端基础相关/1 HTTP相关/1 基础篇/7 理解请求方法.md',
                                '/online/10 前端基础相关/1 HTTP相关/1 基础篇/8 URI.md',
                                '/online/10 前端基础相关/1 HTTP相关/1 基础篇/9 响应状态码.md',
                                '/online/10 前端基础相关/1 HTTP相关/1 基础篇/10 HTTP有哪些特点.md',
                                '/online/10 前端基础相关/1 HTTP相关/1 基础篇/11 HTTP优缺点.md',
                                '/online/10 前端基础相关/1 HTTP相关/1 基础篇/12 HTTP的实体数据.md',
                                '/online/10 前端基础相关/1 HTTP相关/1 基础篇/13 HTTP传输大文件.md',
                                '/online/10 前端基础相关/1 HTTP相关/1 基础篇/14 HTTP的连接管理.md',
                                '/online/10 前端基础相关/1 HTTP相关/1 基础篇/15 HTTP的重定向.md',
                                '/online/10 前端基础相关/1 HTTP相关/1 基础篇/16 HTTP的Cookie机制.md',
                                '/online/10 前端基础相关/1 HTTP相关/1 基础篇/17 HTTP的缓存控制.md',
                                '/online/10 前端基础相关/1 HTTP相关/1 基础篇/18 HTTP的代理服务.md',
                                '/online/10 前端基础相关/1 HTTP相关/1 基础篇/19 HTTP的缓存代理.md',
                            ],
                        },
                        {
                            text: '2 高级篇',
                            collapsible: true,
                            children: [
                                '/online/10 前端基础相关/1 HTTP相关/2 高级篇/1 对称加密与非对称加密.md',
                                '/online/10 前端基础相关/1 HTTP相关/2 高级篇/2 数字签名与证书.md',
                                '/online/10 前端基础相关/1 HTTP相关/2 高级篇/3 TLS1.2连接过程解析.md',
                                '/online/10 前端基础相关/1 HTTP相关/2 高级篇/4 TLS1.3特性解析.md',
                                '/online/10 前端基础相关/1 HTTP相关/2 高级篇/5 HTTPS的优化.md',
                                '/online/10 前端基础相关/1 HTTP相关/2 高级篇/6 迁移到HTTPS.md',
                                '/online/10 前端基础相关/1 HTTP相关/2 高级篇/7 HTTP2特性概览.md',
                                '/online/10 前端基础相关/1 HTTP相关/2 高级篇/8 HTTP3展望.md',
                                '/online/10 前端基础相关/1 HTTP相关/2 高级篇/9 迁移到HTTP2.md',
                            ],
                        },
                        {
                            text: '3 扩展篇',
                            collapsible: true,
                            children: [
                                '/online/10 前端基础相关/1 HTTP相关/3 扩展篇/1 CDN.md',
                                '/online/10 前端基础相关/1 HTTP相关/3 扩展篇/2 webSocket.md',
                                '/online/10 前端基础相关/1 HTTP相关/3 扩展篇/3 HTTP性能优化上.md',
                                '/online/10 前端基础相关/1 HTTP相关/3 扩展篇/4 HTTP性能优化下.md',
                            ],
                        },

                    ],
                },
                {
                    text: '2 浏览器相关',
                    collapsible: true,
                    children: [
                        '/online/9 学习路线/index.md',
                    ],
                },
                {
                    text: '3 计算机基础',
                    collapsible: true,
                    children: [
                        '/online/9 学习路线/index.md',
                    ],
                },
            ],
        },

    ],
}
