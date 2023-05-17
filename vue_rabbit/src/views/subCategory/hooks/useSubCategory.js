import {getSubCategoryByIdApi, getSubCategoryApi} from "../api/subCategory"
import {useRoute, onBeforeRouteUpdate} from "vue-router"
import {onMounted, reactive, ref} from "vue";

export default function useSubCategory() {
    const route = useRoute()
    const SubCategoryData = ref({})
    const goodList = ref([])
    const disabled = ref(false)
    const queryData = reactive({
        categoryId: route.params.id, page: 1, pageSize: 20, sortField: 'publishTime'
    })
    const getSubCategoryById = (id = route.params.id) => {
        getSubCategoryByIdApi(id).then(({data: res}) => {
            SubCategoryData.value = res.result;
        })

    }
    const getGoodList = () => {
        getSubCategoryApi(queryData).then(({data: res}) => {
            goodList.value = res.result.items
        })
    }
    /**
     * tab栏切换回调
     */
    const tabChange = () => {
        queryData.page = 1
        getGoodList()
    }
    /**
     * 加载更多数据
     */
    const load = () => {
        //获取下一页数据
        ++queryData.page
        getSubCategoryApi(queryData).then(({data: res}) => {
            //数据拼接
            goodList.value = [...goodList.value, ...res.result.items]
            //数据不够停止监听
            if (res.result.items.length === 0) {
                disabled.value = true
            }
        })
    }
    onMounted(() => {
        getSubCategoryById()
        getGoodList()
    })
    onBeforeRouteUpdate((to) => {
        getSubCategoryById(to.params.id)
    })
    return {
        SubCategoryData, goodList, queryData, tabChange, load, disabled
    }
}
