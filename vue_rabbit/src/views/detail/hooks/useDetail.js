import {getDetailApi, getHotGoodsApi} from "../api/detail.js"
import {onMounted, reactive, ref} from "vue";
import {useRoute} from "vue-router";

export default function useDetail() {
    const route = useRoute()
    const goodData = ref({})


    const getGoods = () => {
        getDetailApi(route.params.id).then(({data: res}) => {
            goodData.value = res.result
        })
    }
    onMounted(() => {
        getGoods()
    })
    return {
        goodData
    }
}
