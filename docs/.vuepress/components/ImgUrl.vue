<template>
    <img :src="withBase(logoPath)" />
</template>

<script setup>
import { ref } from "vue"
import { withBase } from "@vuepress/client"

const logoPath = ref("/images/favicon.ico")
</script>
