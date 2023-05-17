import http from '@/utils/request';

export const cartApi = {
    insertCart: '/member/cart',
    delCart: '/member/cart',
    findCart: "/member/cart",
    mergeCart: "/member/cart/merge",


}

export function insertCartAPI(data) {
    return http({
        url: cartApi.insertCart,
        method: 'POST',
        data
    })
}

export function findCartAPI() {
    return http({
        url: cartApi.findCart,
        method: 'get',
    })
}

export function delCartAPI(ids) {
    return http({
        url: cartApi.delCart,
        method: 'DELETE',
        data: {
            ids
        }
    })
}

export function mergeCartAPI(data) {
    return http({
        url: cartApi.mergeCart,
        method: 'post',
        data
    })
}
