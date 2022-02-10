<script lang="ts" setup>
import { computed, ref, inject} from "vue"
import type { Ref } from "vue"
import type Nuntium from "@/Nuntium"
import type { Fuse } from "@/Nuntium"

import { RouterLink, RouterView } from 'vue-router'
import LoadingSpinner from './LoadingSpinner.vue'

const nuntium = inject<Nuntium>("nuntium")

let result
const options = {
  includeScore: true,
  keys: ['title', 'text'],
  threshold: 0.6
}
const searchTerm: Ref<string> = ref('')
const resultArticles: Ref<Array<{title: string, text: string, publisher: string, id?: number}>> = ref([])

const search = () => {
    if (searchTerm.value) {
        // @ts-expect-error fuse also sucks
        const fuse: typeof Fuse = new Fuse(nuntium?.articles.value, options)
        result = fuse.search(searchTerm.value)
        resultArticles.value = result.map((res) => { 
            return{ title: res.item.title, text: res.item.text, publisher: res.item.publisher, id: res.refIndex} })
    } else {

    }
}
</script>

<template>
    <div class="search">
        <input placeholder="Search articles" v-model="searchTerm" @input="search">
    </div>
    <div class="article-wrapper" v-if="nuntium?.articles.value.length !== 0">
        <div v-for="[index, article] of (searchTerm ? resultArticles.entries() : nuntium?.articles.value.entries())" class="article">
            <h2><RouterLink :to="{ name: 'article', params: {id: (article as any).id ?? index } }">{{ article.title }}</RouterLink></h2>
            <div class="text"> {{ article.text }} </div>
            <div class="publisher">
                By: 
                <span class="address">
                    {{ article.publisher }}
                </span>
                <span class="name">
                    <br>
                    {{ nuntium?.names[article.publisher] ?? article.publisher }}
                </span>
            </div>
        </div>
    </div>
    <LoadingSpinner class="spinner" v-else />
</template>

<style lang="scss" scoped>
.text {
    height: 70%;
    overflow: hidden;
}
.publisher {
    font-size: smaller;
    position: absolute;
    box-shadow: 20px 0 10px 0 var(--color-background);
    background-color: var(--color-background);
    padding: 5px;
    width: 100%;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    &>.address {
        display:none
    }
    &:hover {
        &>.address {
            display: block;
        }
        &>.name {
            display: none;
        }
    }
}
.spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: 0;
    padding: 0;
}
.search {
    position: sticky;
    top: 0;
    width: 100%;
    z-index: 15;
    padding: 20px;
    background-color: var(--color-background);
    box-shadow: 0 15px 15px 0 var(--color-background);
    &>input {
        text-align: center;
        border-radius: 5px;
        border-style: none;
        width: min(max(100%, 200px), 500px);
        height: 25px;
    }
}
.article-wrapper {
    margin-top: 20px;
    padding-bottom: 4rem;
    margin-bottom: -4rem;
    width: 100%;
    display: grid;
    justify-content: center;
    grid-gap: 20px;
    grid-template-columns: repeat(auto-fit, max(25%, 300px));
}
.article {
    width: max(100%, 300px);
    aspect-ratio: 1;
    overflow: hidden;
    border-style: solid;
    border-radius: 3px;
    padding: 25px;
    text-align: center;
    &>h2>a {
        text-decoration: none;
        color: var(--color-text);
    }
}
</style>