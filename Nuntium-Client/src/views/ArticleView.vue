<script lang="ts" setup>
import NuntiumArticle from '@/components/NuntiumArticle.vue'
const props = defineProps({
  id: {
    type: String,
    default: false,
  },
})
</script>

<template>
  <NuntiumArticle :id="parseInt(id)" />
</template>
