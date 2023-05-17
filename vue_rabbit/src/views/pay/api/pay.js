import http from '@/utils/request';

export const payApi = {
    createOrder: '/member/order',
    getOrder: `/member/order/`


}

export function createOrderAPI(data) {
    return http({
        url: payApi.createOrder,
        method: 'post',
        data
    })
}

export function getOrderAPI(id) {
    return http({
        url: payApi.getOrder + id,
        method: 'get',
    })
}



