<template>
    <Navbar />
    <div class="contain">
        <div class="lists" v-for="item in lists" :key="item.path">
            <a :href="item.path" class="link" :title="item.title">{{
                item.title
            }}</a>
            <div>{{ item.frontmatter.description }}</div>
        </div>
    </div>
</template>
<script>
import { usePageData } from "@vuepress/client";
import Navbar from "@theme/Navbar.vue";
import { ref } from "vue";
export default {
    components: {
        Navbar, // 官方原生的header,可以直接拿来用
    },
    setup() {
        const page = usePageData();
        const allList = ref(page.value.lists || []); // 我们在上一步传递进来的所有文章列表
        return {
            allList,
        };
    },
};
</script>
<style lang="scss" scoped></style>
