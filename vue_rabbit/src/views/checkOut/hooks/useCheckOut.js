import {onMounted, ref} from "vue";
import {checkInfoAPI} from "@/views/checkOut/api/checkOut";
import {createOrderAPI} from "@/views/pay/api/pay.js"
import {useRouter} from "vue-router";
import {useCartStore} from "@/stores/cartStore";

export default function () {
    const router = useRouter()
    const cartStore = useCartStore()
    const checkInfo = ref({}) // 订单对象
    const curAddress = ref({})  // 地址对象
    const showDialog = ref(false)
    const activeAddress = ref({}) //
    const getCheckInfo = async () => {
        const {data: res} = await checkInfoAPI()
        checkInfo.value = res.result
        const item = checkInfo.value.userAddresses.find(item => item.isDefault === 0)
        curAddress.value = item
    }
    const switchAddress = (item) => {
        activeAddress.value = item
    }
    const confirmFn = () => {
        curAddress.value = activeAddress.value
        activeAddress.value = {}
        showDialog.value = false

    }
    // 创建订单
    const createOrder = async () => {
        const res = await createOrderAPI({
            deliveryTimeType: 1,
            payType: 1,
            payChannel: 1,
            buyerMessage: '',
            goods: checkInfo.value.goods.map(item => {
                return {
                    skuId: item.skuId,
                    count: item.count
                }
            }),
            addressId: curAddress.value.id
        })
        const orderId = res.data.result.id
        await router.push({
            path: '/pay',
            query: {
                id: orderId
            }
        })
        //更新购物车
        cartStore.updateCart()
    }
    onMounted(async () => {
        await getCheckInfo()
    })
    return {
        checkInfo, curAddress, showDialog, activeAddress, switchAddress, confirmFn, createOrder
    }

}
