<script setup>
import ParentLayout from "@vuepress/theme-default/layouts/Layout.vue";
</script>

<template>
    <ParentLayout>
        4441
        <template #page-bottom>
            
            <div class="my-footer">MyLayout-This is my custom page footer</div>
        </template>
    </ParentLayout>
</template>

<style lang="css">
.my-footer {
    text-align: center;
}
</style>

<!-- 布局插槽
默认主题的 Layout 布局提供了一些插槽：

navbar
navbar-before
navbar-after
sidebar
sidebar-top
sidebar-bottom
page
page-top
page-bottom
page-content-top
page-content-bottom -->
