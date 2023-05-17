import {onMounted, ref} from "vue";
import {onBeforeRouteUpdate, useRoute} from "vue-router/dist/vue-router";
import {getCategoryApi} from "@/views/category/api/category";

/**
 * 封装业务数据相关代码
 */
export default function useCategory() {
    let categoryData = ref({})
    const route = useRoute()
    const getCategoryInfoById = (id = route.params.id) => {
        getCategoryApi(id).then(({data: res}) => {
            categoryData.value = res.result;
        })
    }
    onMounted(() => {
        getCategoryInfoById()
    })
    onBeforeRouteUpdate((to) => {
        getCategoryInfoById(to.params.id)
    })
    return {
        categoryData
    }
}
