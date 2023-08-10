// 基本配置文件
import { defineUserConfig, defaultTheme } from "vuepress"
import { getDirname, path } from "@vuepress/utils"
import { searchPlugin } from "@vuepress/plugin-search"
import { registerComponentsPlugin } from "@vuepress/plugin-register-components"
import { viteBundler } from "@vuepress/bundler-vite"
import { webpackBundler } from "@vuepress/bundler-webpack"

import themeSidebar from "vuepress-theme-sidebar"

import { head, navbarEn, navbarZh, sidebarEn, sidebarZh } from "./configs/index.js"
export default defineUserConfig({
    base: "/",
    lang: "zh-CN",
    title: " ",
    description: " ",
    head: [["link", { rel: "icon", href: "/images/favicon.ico" }]],
    locales: {},
    // dest: "./dist", //指定 vuepress build 命令的输出目录,默认值： `${sourceDir}/.vuepress/dist`
    // bundler: process.env.DOCS_BUNDLER === "webpack"? webpackBundler(): viteBundler(),
    // public: "./public",
    // temp: "./.temp",
    // cache: "./.cache",
    // Dev 配置项
    // host: "",
    // port: "",
    // open: "",
    // Build 配置项
    // shouldPreload: "",
    // templateBuild: "",
    // Markdown 配置
    shouldPrefetch: false, //如果你将它设置为 true ，所有其它页面所需的文件都会被预拉取。这对于小型站点来说是十分有帮助的，因为它会大大提升页面切换的速度。但是在你的网站有很多页面时不建议你这么做
    markdown: {
        headers: ["h2", "h3", "h4", "h5", "h6"] // 提取标题到侧边栏的级别，默认['h2', 'h3']
    },
    // 设置站点要使用的主题。如果不设置该选项，将会使用默认主题
    // theme: defaultTheme({
    theme: themeSidebar({
        sidebarType: "left",
        // 默认主题配置
        home: "/", // 点击左上跳转
        logo: "/images/favicon.ico", // 左上logo
        repo: "https://gitee.com/new-practice/blog.git", //它将被用作 仓库链接 的链接。仓库链接 将会显示为导航栏的最后一个元素。
        navbar: navbarZh,
        // sidebar: sidebarZh,
        // sidebar: 'auto',
        // sidebarDepth: 4,

        // page meta
        editLink: false, // 启用编辑
        // docsDir: '',//文档源文件存放在仓库中的目录名
        // editLinkText: '在 GitHub 上编辑此页',
        lastUpdatedText: "上次更新",
        contributorsText: "贡献者",
        // custom containers
        tip: "提示",
        warning: "注意",
        danger: "警告",
        // 404 page
        notFound: ["这里什么都没有", "我们怎么到这来了？", "这是一个 404 页面", "看起来我们进入了错误的链接"],
        backToHome: "返回首页",
        // a11y
        openInNewWindow: "在新窗口打开",
        toggleColorMode: "切换颜色模式",
        toggleSidebar: "切换侧边栏",
        themePlugins: {} //设置默认主题使用的插件。
    }),

    // 插件配置,
    plugins: [
        // 配置项
        // 搜索 插件 配置
        searchPlugin({
            maxSuggestions: 10 // 搜索结果显示最大数
        }),
        // 注册vueComponents 插件
        registerComponentsPlugin({
            componentsDir: path.resolve(__dirname, "./components")
        })
    ]
})
