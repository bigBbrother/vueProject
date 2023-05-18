<template>
  <el-button @click="setItem">点击存储</el-button>
  <el-button @click="getItem">点击获取</el-button>
</template>

<script setup>

import {set, get} from "@/utils/localstorage.js"

const setItem = () => {
  set("test", "大逼哥", 1)
  console.log("保存成功")
}
const getItem = () => {
  const value = get("test")
  console.log(value)
}
</script>

<style scoped>

</style>
