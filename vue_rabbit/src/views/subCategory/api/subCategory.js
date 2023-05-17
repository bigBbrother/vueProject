import http from '@/utils/request';

export const subCategoryApi = {
    subCategoryById: '/category/sub/filter',
    subCategory: "/category/goods/temporary"


}

export function getSubCategoryByIdApi(id) {
    return http({
        url: subCategoryApi.subCategoryById,
        method: 'get',
        params: {
            id
        }
    })
}

export function getSubCategoryApi(data) {
    return http({
        url: subCategoryApi.subCategory,
        method: 'post',
        data
    })
}
