<script setup>
import LayoutNav from '@/views/layout/components/LayoutNav.vue'
import LayoutHeader from '@/views/layout/components/LayoutHeader.vue'
import LayoutFooter from '@/views/layout/components/LayoutFooter.vue'
import LayoutFixed from '@/views/layout/components/LayoutFixed.vue'
import {useCategoryStore} from "@/stores/categoryStore"
import {onMounted} from "vue";

let categoryStore = useCategoryStore();
onMounted(() => {
  categoryStore.getCategory()
})
</script>

<template>
  <LayoutFixed/>
  <LayoutNav/>
  <LayoutHeader/>
  <RouterView/>
  <LayoutFooter/>
</template>
