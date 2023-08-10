import { getDirname, path } from '@vuepress/utils'

const __dirname = getDirname(import.meta.url)

const myTheme = (options) => {
    // 返回一个主题函数
    return (app) => {
        return {
            name: 'vuepress-theme-mytheme',
            // 主题的客户端配置文件的路径
            clientConfigFile: path.resolve(__dirname, 'client.js'),
            // 设置自定义 dev / build 模板
            // 如果没有指定模板，将会使用 `@vuepress/client` 提供的默认模板
            // templateBuild: path.resolve(__dirname, 'templates/build.html'),
            // templateDev: path.resolve(__dirname, 'templates/dev.html'),
            // 使用插件
            plugins: [
                // ...
            ],
            // ...
            // 其他的插件 API 也都可用
        }
    }
}