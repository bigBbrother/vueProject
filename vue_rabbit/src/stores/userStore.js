import {defineStore} from 'pinia'
import {ref} from 'vue'
import {loginApi} from '@/views/login/api/user.js'
import {useCartStore} from "@/stores/cartStore";
import {mergeCartAPI} from "@/views/cartList/api/cart.js"

export const useUserStore = defineStore('user', () => {
    const cartStore = useCartStore()
    // 1. 定义管理用户数据的state
    const userInfo = ref({})
    // 2. 定义获取接口数据的action函数
    const getUserInfo = async ({account, password}) => {
        loginApi({account, password}).then(({data: res}) => {
            userInfo.value = res.result
            localStorage.setItem("user", JSON.stringify(res.result))
        })
        await mergeCartAPI(cartStore.cartList.map((item) => {
            return {
                skuId: item.skuId, selected: item.selected, count: item.count
            }
        }))
        await cartStore.updateCart()

    }
    const clearUserInfo = () => {
        userInfo.value = {}
        localStorage.removeItem("user")
        cartStore.clearCart()
    }
    // 3. 以对象的格式把state和action return
    return {
        getUserInfo, clearUserInfo, userInfo
    }
})
