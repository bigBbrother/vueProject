<template>
  <h2>{{ count }}</h2>
  <h2>计算属性{{ doubleCount }}</h2>
  <el-button @click="increment">点击++</el-button>
</template>

<script setup>
import {storeToRefs} from "pinia";
import {useTestStore} from "./useTest.js"

const store = useTestStore();
const {count, doubleCount, increment} = storeToRefs(store)

</script>

<style scoped>

</style>
