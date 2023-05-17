import http from '@/utils/request';

export const userApi = {
    login: '/login',
    getLikeList: '/goods/relevant',
    getUserOrder: '/member/order'


}

export function getUserOrder(params) {
    return http({
        url: userApi.getUserOrder,
        method: 'get',
        params
    })
}

export function loginApi(data) {
    return http({
        url: userApi.login,
        method: 'POST',
        data
    })
}

export function getLikeListAPI({limit = 4}) {
    return http({
        url: userApi.getLikeList,
        method: 'get',
        params: {
            limit
        }
    })
}
