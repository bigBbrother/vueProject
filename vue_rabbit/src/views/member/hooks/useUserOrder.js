import {onMounted, ref} from "vue";
import {getUserOrder} from "@/views/login/api/user";

export default function (){
    // tab列表
    const tabTypes = [
        {name: "all", label: "全部订单"},
        {name: "unpay", label: "待付款"},
        {name: "deliver", label: "待发货"},
        {name: "receive", label: "待收货"},
        {name: "comment", label: "待评价"},
        {name: "complete", label: "已完成"},
        {name: "cancel", label: "已取消"}
    ]
// 获取订单列表
    const orderList = ref([])
    const total = ref(0)
    const params = ref({
        orderState: 0,
        page: 1,
        pageSize: 2
    })
    const getOrderList = async () => {
        const {data: res} = await getUserOrder(params.value)
        orderList.value = res.result.items
        total.value = res.result.counts
    }
    onMounted(() => getOrderList())
// tab切换
    const tabChange = (type) => {
        params.value.orderState = type
        getOrderList()
    }
// 页数切换
    const pageChange = (page) => {
        params.value.page = page
        getOrderList()
    }
// 创建格式化函数
    const fomartPayState = (payState) => {
        const stateMap = {
            1: '待付款',
            2: '待发货',
            3: '待收货',
            4: '待评价',
            5: '已完成',
            6: '已取消'
        }
        return stateMap[payState]
    }
    return{tabTypes,orderList,total,params,
        tabChange,
        pageChange,
        fomartPayState
    }
}
