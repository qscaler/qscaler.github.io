export default {
    name: "vuepress-plugin-page",
    onInitialized(app) {
        const lists = [];
        app.pages.forEach((item) => {
            // 排除不需要的页面
            if (/^\/[\s\S]*\/[\s\S]*/.test(item.path)) {
                // 没有直接将整个item放进lists是为了减少传递大量没用的数据
                lists.push({
                    path: item.data.path,
                    title: item.data.title,
                    frontmatter: item.data.frontmatter,
                    git: item.data.git,
                });
            }
            // 将我们组装好的列表传递到list页面
            if (item.path === "/list.html") {
                item.data = {
                    ...item.data,
                    lists,
                };
            }
        });
        // 这里还需要进行下简单的排序
        lists.sort((s1, s2) => {
            return (
                +new Date(s2.git.lastUpdated) - +new Date(s1.git.lastUpdated)
            );
        });
    },
};
