import type { SidebarConfig } from '@vuepress/theme-default'

export const sidebarZh: SidebarConfig = {
    // 侧边栏数组
    // 所有页面会使用相同的侧边栏
    // 侧边栏对象
    // 不同子路径下的页面会使用不同的侧边栏
    '/qscaler/': [
        {
            text: '我的笔记',
            children: [
                '/qscaler/README.md',

            ],
        },
    ],
    '/1在线/': [
        {
            text: '基础进阶',
            collapsible: true,
            children: [
                '/1在线/1基础进阶/index.md',
                '/1在线/1基础进阶/1.基础篇.md',
                '/1在线/1基础进阶/2.进阶篇.md',
                '/1在线/1基础进阶/3.高频篇.md',
                '/1在线/1基础进阶/4.手写篇.md',
                '/1在线/1基础进阶/5.综合题型.md',
                '/1在线/1基础进阶/6.精选模块.md',
                '/1在线/1基础进阶/7.其他问题.md',
                '/1在线/1基础进阶/8.设计模式.md',
            ],
        },
        // {
        //     text: '精选模块',
        //     collapsible: true,
        //     // sidebarDepth: 2, // 这里对侧边栏目录显示的标题级别深度起作用
        //     children: [
        //         {
        //             text: '精选篇',
        //             collapsible: true,
        //             children: [
        //                 // {title: 'vue', path: 'framework/vue'},
        //                 '/1在线/2 精选文档/1-HTML模块.md',
        //                 '/1在线/2 精选文档/2-CSS模块.md',
        //             ],
        //         },
        //         {
        //             text: '进阶篇',
        //             collapsible: true,
        //             children: [
        //                 '/1在线/2 精选文档/高频模块.md',
        //             ],
        //         },
        //     ],
        // },
        // {
        //     text: '原理文档',
        //     collapsible: true,
        //     children: [
        //         {
        //             text: 'Vue',
        //             collapsible: true,
        //             children: [
        //                 '/1在线/3 原理文档/1vue/README.md',
        //             ],
        //         },
        //         {
        //             text: 'React',
        //             collapsible: true,
        //             children: [
        //                 '/1在线/3 原理文档/2 react/README.md',
        //             ],
        //         },
        //         {
        //             text: 'Webpack',
        //             collapsible: true,
        //             children: [
        //                 '/1在线/3 原理文档/3 webpack/README.md',
        //             ],
        //         },
        //         {
        //             text: 'Node',
        //             collapsible: true,
        //             children: [
        //                 '/1在线/3 原理文档/4 node/README.md',
        //             ],
        //         },
        //         {
        //             text: 'Javascript',
        //             collapsible: true,
        //             children: [
        //                 '/1在线/3 原理文档/5 Javascript/README.md',
        //             ],
        //         },
        //         {
        //             text: '综合',
        //             collapsible: true,
        //             children: [
        //                 '/1在线/3 原理文档/6 综合/README.md',
        //             ],
        //         },

        //     ],
        // },

    ],
    // '/interview-exp/': [
    //     {
    //         text: '面经篇',
    //         collapsible: true,
    //         children: [
    //             '/interview-exp/README.md',
    //         ],
    //     },
    // ],
    // '/qa/': [
    //     {
    //         text: '1自检100',
    //         collapsible: true,
    //         children: [
    //             '/qa/README.md',
    //         ],
    //     },
    // ],
    // '/days/': [
    //     {
    //         text: '每日一题',
    //         collapsible: true,
    //         children: [
    //             '/days/README.md',
    //         ],
    //     },
    // ],
    // '/algorithm/': [
    //     {
    //         text: '前端算法面试',
    //         collapsible: true,
    //         children: [
    //             '/algorithm/README.md',
    //         ],
    //     },
    // ],
    // '/mind-map/': [
    //     {
    //         text: '思维导图',
    //         collapsible: true,
    //         children: [
    //             '/mind-map/README.md',
    //         ],
    //     },
    // ],
    // '/roadmap/': [
    //     {
    //         text: '学习路线',
    //         collapsible: true,
    //         children: [
    //             '/roadmap/README.md',
    //         ],
    //     },
    // ],
    // '/fe-base-docs/': [
    //     {
    //         text: '学习路线',
    //         collapsible: true,
    //         children: [
    //             '/roadmap/README.md',
    //         ],
    //     },
    // ],
}
