import http from '@/utils/request';

export const categoryApi = {
    getCategory: '/category',


}

export function getCategoryApi(id) {
    return http({
        url: categoryApi.getCategory,
        method: 'get',
        params: {
            id
        }
    })
}
