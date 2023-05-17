import http from '@/utils/request';

export const detailApi = {
    getDetailInfo: '/goods',
    getHotGoods: "/goods/hot"
}

export function getDetailApi(id) {
    return http({
        url: detailApi.getDetailInfo,
        method: 'get',
        params: {
            id
        }
    })
}

export function getHotGoodsApi({id, type, limit = 3}) {
    return http({
        url: detailApi.getHotGoods,
        method: 'get',
        params: {
            id,
            type,
            limit
        }
    })
}
