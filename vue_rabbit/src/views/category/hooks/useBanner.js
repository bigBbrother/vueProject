import {onMounted, ref} from "vue";
import {getBannerApi} from "@/views/home/api/home";

/**
 * 封装banner轮播图相关代码
 */
export default function useBanner() {
    const bannerList = ref([])
    const getBannerList = () => {
        getBannerApi({
            distributionSite: "2"
        }).then(({data: res}) => {
            bannerList.value = res.result
        })
    }
    onMounted(() => {
        getBannerList()
    })
    return{
        bannerList
    }
}
