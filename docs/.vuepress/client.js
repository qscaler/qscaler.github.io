// 在大多数情况下，配置文件已经足够帮助你配置好你的 VuePress 站点。不过，有些时候用户们可能希望直接添加一些客户端代码。 VuePress 通过客户端配置文件来支持这种需求：
import { defineClientConfig } from "@vuepress/client";
// import Layout from "./layouts/Layout.vue";
// import NotFound from "./layouts/NotFound.vue";
// import MyLayout from "./layouts/MyLayout.vue";
// import HomeLayout from "./layouts/HomeLayout.vue";
// import PageLayout from "./layouts/PageLayout.vue";
// import List from "./Layouts/List.vue";
export default defineClientConfig({
    enhance({ app, router, siteData }) {},
    setup() {},
    rootComponents: [],
    layouts: {
        // Layout,
        // NotFound,
        // MyLayout,
        // HomeLayout,
        // PageLayout,
        // List,
    },
});
