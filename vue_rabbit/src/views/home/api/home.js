import http from '@/utils/request';

export const homeApi = {
    getBanner: '/home/banner',
    getNew: "/home/new",
    getHot: "/home/hot",
    getGoods: "/home/goods",

}

export function getBannerApi(params = {}) {
    const {distributionSite = "1"} = params
    return http({
        url: homeApi.getBanner,
        method: 'get',
        params: {
            distributionSite
        }
    })
}

export function getNewApi() {
    return http({
        url: homeApi.getNew,
        method: 'get',
    })
}

export function getHotApi() {
    return http({
        url: homeApi.getHot,
        method: 'get',
    })
}

export function getGoodsApi() {
    return http({
        url: homeApi.getGoods,
        method: 'get',
    })
}
