import {useRoute} from "vue-router/dist/vue-router";
import {computed, onMounted, reactive, ref} from "vue";
import {getHotGoodsApi} from "@/views/detail/api/detail";

export default function useHotGoods(props) {
    const TYPE_MAP = {
        1: "24小时热榜",
        2: "周热榜"
    }
    const route = useRoute()
    const hotList = ref([])
    const getHotGoodsQuery = reactive({
        id: route.params.id,
        type: props.hotType,
    })
    const getHotGoods = () => {
        getHotGoodsApi(getHotGoodsQuery).then(({data: res}) => {
            hotList.value = res.result
        })
    }
    onMounted(() => {
        getHotGoods()
    })
    const title = computed(() => TYPE_MAP[props.hotType])
    return {
        title, hotList
    }
}
