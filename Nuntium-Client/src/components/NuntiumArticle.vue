<script lang="ts" setup>
import { computed, ref, inject, type Ref } from "vue"
import type Nuntium from "@/Nuntium"
import type { NuntiumArticle } from "@/Nuntium";
import { RouterLink, RouterView } from 'vue-router'
import LoadingSpinner from './LoadingSpinner.vue'
const nuntium = inject<Nuntium>("nuntium")

const props = defineProps({
    id: {
        type: Number,
        default: false,
    },
})
    
const article: Ref<NuntiumArticle> = ref({})
nuntium?.getArticle(props.id).then((_article) => {
    article.value = _article 
})

</script>

<template>
    <div class="article" v-if="Object.keys(article).length">
        <h1>{{ article.title }}</h1>
        <span>{{ article.text }}</span>
        <h2>{{ article.publisher }}</h2>
    </div>
    <LoadingSpinner class="spinner" v-else />
</template>

<style lang="scss" scoped>
.spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: 0;
    padding: 0;
}
.article {
    text-align: center;
    overflow-y: auto;
    overflow-x: wrap;
    height: 100%
}
</style>