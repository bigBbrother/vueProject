import {ref} from 'vue'
import {defineStore} from 'pinia'
import {getCategoryApi} from "@/views/layout/api/layout";

export const useCategoryStore = defineStore('category', () => {
    //导航数据列表逻辑
    const categoryList = ref([])
    const getCategory = () => {
        getCategoryApi().then(({data: res}) => {
            if (res.code !== "1") {
                return
            }
            categoryList.value = res.result
        })
    }
    return {
        categoryList,
        getCategory
    }
})
