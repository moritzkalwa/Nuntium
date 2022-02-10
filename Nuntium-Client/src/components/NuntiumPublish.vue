<script lang="ts" setup>
import { computed, ref, inject } from "vue"
import type Nuntium from "@/Nuntium"

let title = ref('')
let text = ref('')

const nuntium = inject<Nuntium>("nuntium")
</script>

<template>
    <div class="publish">
        <div>
            <input v-model="title" placeholder="Title">
        </div>
        <div>
            <textarea v-model="text" placeholder="Content"></textarea>
        </div>
        <button @click.prevent="nuntium?.publishArticle(title, text)"><span>Publish!</span></button>
    </div>
</template>

<style lang="scss" scoped>

@keyframes clicked {
  from {
      width: 20%;
  }
  to {
      width: calc(100% + 2px);
  }
}
.publish {
    text-align: center;
    &>div {
        text-align: center;
        align-items: center;
        padding: 30px;
        &>textarea {
            width: 50vw;
            height: 30vw;
            &:placeholder-shown {
                text-align: center;
            }
        }
        &>input {
            text-align: center;
            width: max(30vw, 150px);
            height: max(4vh, 30px);
        }
    }
    &>button {
        cursor: pointer;
        overflow: hidden;
        padding: 0;
        text-align: center;
        border-radius: 5px;
        border-style: solid;
        width: 40%;
        height: 30px;
        background-color: var(--color-background);
        color: var(--color-text);
        &>* {
            z-index: 4;
        }
        &:hover {
            color: var(--color-background);
            &:before {
                content: "";
                z-index: 3;
                display: block;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 20%;
                aspect-ratio: 1;
                border-radius: 100%;
                background-color: var(--color-text);
                animation: clicked 0.3s forwards;
            }
        }
        &:active {
            transform: translateY(5px);
        }
    }
}
</style>