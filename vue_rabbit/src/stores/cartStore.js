import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import {useUserStore} from "@/stores/userStore.js";
import {insertCartAPI, findCartAPI, delCartAPI} from "@/views/cartList/api/cart"

export const useCartStore = defineStore('cart', () => {
    const userStore = useUserStore()
    const cartList = ref([])
    const addCart = async (goods) => {
        if (userStore.userInfo.token) {
            const {skuId, count} = goods
            await insertCartAPI({skuId, count})
            await updateCart()
        } else {
            const item = cartList.value.find((item) => goods.skuId === item.skuId)
            if (item) {
                // 找到了
                item.count++
            } else {
                // 没找到
                cartList.value.push(goods)
            }
            //保存到缓存当中
            localStorage.setItem("goods", JSON.stringify(cartList.value))
        }

    }
    const removeCartById = async (skuId) => {
        if (userStore.userInfo.token) {
            await delCartAPI([skuId])
            await updateCart()
        } else {
            const index = cartList.value.findIndex(item => skuId === item.skuId)
            cartList.value.splice(index, 1)
            localStorage.setItem("goods", JSON.stringify(cartList.value))
        }


    }
    const updateCart = async () => {
        const res = await findCartAPI()
        cartList.value = res.data.result
        localStorage.setItem("goods", JSON.stringify(cartList.value))
    }
    const clearCart = () => {
        cartList.value = []
    }
    const singleCheck = (skuId, selected) => {
        const item = cartList.value.find(item => item.skuId === skuId)
        item.selected = selected
        localStorage.setItem("goods", JSON.stringify(cartList.value))
    }
    const allCheck = (selected) => {
        cartList.value.forEach(item => item.selected = selected)
    }
    const allCount = computed(() => cartList.value.reduce((a, c) => a + c.count, 0))
    const allPrice = computed(() => cartList.value.reduce((a, c) => a + c.count * c.price, 0))
    const isAll = computed(() => cartList.value.every(item => item.selected))
    const selectedCount = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count, 0))
    const selectedPrice = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count * c.price, 0))
    return {
        allCount,
        allPrice,
        cartList,
        isAll,
        selectedCount,
        selectedPrice,
        addCart,
        removeCartById,
        singleCheck,
        allCheck, clearCart,updateCart
    }
})
