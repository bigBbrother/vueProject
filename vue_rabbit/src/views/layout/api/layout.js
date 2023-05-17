import http from '@/utils/request';

export const layoutApi = {
    getCategory: '/home/category/head',

}

export function getCategoryApi() {
    return http({
        url: layoutApi.getCategory,
        method: 'get',
    })
}
