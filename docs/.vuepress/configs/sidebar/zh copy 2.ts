import type { SidebarConfig } from '@vuepress/theme-default'

export const sidebarZh: SidebarConfig = {
    // 侧边栏数组
    // 所有页面会使用相同的侧边栏
    // 侧边栏对象
    // 不同子路径下的页面会使用不同的侧边栏
    '/guide/': [
        {
            text: '指南',
            children: [
                '/guide/README.md',
               
            ],
        },
    ],
    '/advanced/': [
        {
            text: '深入',
            children: [
                '/advanced/architecture.md',
               
            ],
        },
        {
            text: 'Cookbook',
            children: [
                '/advanced/cookbook/README.md',
               
            ],
        },
    ],
    '/reference/': [
        {
            text: 'VuePress 参考',
            collapsible: true,
            children: [
                '/reference/cli.md',
               
            ],
        },
        {
            text: '打包工具参考',
            collapsible: true,
            children: [
                '/reference/bundler/vite.md',
                '/reference/bundler/webpack.md',
            ],
        },
        {
            text: '默认主题参考',
            collapsible: true,
            children: [
                '/reference/default-theme/config.md',
                '/reference/default-theme/frontmatter.md',
                '/reference/default-theme/components.md',
                '/reference/default-theme/markdown.md',
                '/reference/default-theme/styles.md',
                '/reference/default-theme/extending.md',
            ],
        },
        {
            text: '官方插件参考',
            collapsible: true,
            children: [
                {
                    text: '常用功能',
                    children: [
                        '/reference/plugin/back-to-top.md',
                        '/reference/plugin/container.md',
                        '/reference/plugin/external-link-icon.md',
                        '/reference/plugin/google-analytics.md',
                        '/reference/plugin/medium-zoom.md',
                        '/reference/plugin/nprogress.md',
                        '/reference/plugin/register-components.md',
                    ],
                },
                {
                    text: '内容搜索',
                    children: [
                        '/reference/plugin/docsearch.md',
                        '/reference/plugin/search.md',
                    ],
                },
                {
                    text: 'PWA',
                    children: [
                        '/reference/plugin/pwa.md',
                        '/reference/plugin/pwa-popup.md',
                    ],
                },
                {
                    text: '语法高亮',
                    children: [
                        '/reference/plugin/prismjs.md',
                        '/reference/plugin/shiki.md',
                    ],
                },
                {
                    text: '主题开发',
                    children: [
                        '/reference/plugin/active-header-links.md',
                        '/reference/plugin/git.md',
                        '/reference/plugin/palette.md',
                        '/reference/plugin/theme-data.md',
                        '/reference/plugin/toc.md',
                    ],
                },
            ],
        },
    ],
  
}
