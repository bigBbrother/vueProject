import http from '@/utils/request';

export const checkOutApi = {
    checkInfo: '/member/order/pre',


}

export function checkInfoAPI() {
    return http({
        url: checkOutApi.checkInfo,
        method: 'get',
    })
}



