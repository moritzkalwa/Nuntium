<script lang="ts" setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { provide, computed } from "vue"
import Nuntium from "@/Nuntium"
const nuntium = new Nuntium()
provide('nuntium', nuntium)
if (process.env.NODE_ENV === 'development' || true) (window as any).nuntium = nuntium

const isHome = computed(() => {
  return useRoute().name === 'home'
})
</script>

<template>
  <header :style="{ 'box-shadow': isHome ? 'none' : ''}">

    <div>

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/publish">Publish</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <div class="wrapper" :style="{ 'padding-top': isHome ? '0' : ''}">
    <template v-if="nuntium?.metaMaskEnabled.value">
      <RouterView />
    </template>
    <template v-else>
        <div v-if="nuntium?.metaMaskInstalled.value">
            <button @click.prevent="nuntium.enableMetaMask">Enable MetaMask!</button>
        </div>
        <div v-else>You need MetaMask!</div>
    </template>
  </div>
  
</template>

<style lang="scss">
@import '@/assets/base.css';
.wrapper {
    text-align: center;
    padding: 20px;
    padding-bottom: 2rem;
    overflow-y: auto;
    overflow-x: wrap;
    height: calc(100vh - 4rem);
}
#app {
  max-width: 100vw;
  height: 100vh;
  margin: 0 auto;
  padding: 0 2rem;
  font-weight: normal;
  overflow: hidden;
}
header {
  line-height: 1.5;
  max-height: 100vh;
  position: sticky;
  width: 100vw;
  box-shadow: 0 15px 15px 0 var(--color-background);
  padding-top: 2rem;
  top: -2rem;
  left: 0;
  margin-left: -2rem;
  background-color: var(--color-background);
  z-index: 10;
}
.logo {
  display: block;
  margin: 0 auto 2rem;
}
nav>a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}
@media (hover: hover) {
  a:hover {
    //background-color: hsla(160, 100%, 37%, 0.2);
  }
}
nav {
  width: 100%;
  font-size: 24px;
  text-align: center;
}
nav a.router-link-exact-active {
  color: var(--color-text);
}
nav a.router-link-exact-active:hover {
  background-color: transparent;
}
nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}
nav a:first-of-type {
  border: 0;
}
.scrollbar
{
	height: 300px;
	width: 30px;
	background: var(--color-brackground);
	overflow-y: scroll;
	margin: 25px;
}


::-webkit-scrollbar-track
{
	border-radius: 10px;
	background-color: var(--color-brackground);
}

::-webkit-scrollbar
{
	width: 12px;
	background-color: var(--color-brackground);
}

::-webkit-scrollbar-thumb
{
	border-radius: 10px;
	background-color: #555;
}
</style>