import {onActivated, onMounted, reactive, ref, getCurrentInstance} from "vue";
import {ElMessage} from "element-plus";

export default () => {
    //获取vue原型上面的axios绑定的实例
    let currentInstance = getCurrentInstance();
    const {$http} = currentInstance.appContext.config.globalProperties

//设置属性
    const mixinViewModuleOptions = reactive({
        createdIsNeed: true,       // 此页面是否在创建时，调用查询数据列表接口？
        activatedIsNeed: false,    // 此页面是否在激活（进入）时，调用查询数据列表接口？
        getDataListURL: '',       // 数据列表接口，API地址
        getDataListIsPage: false, // 数据列表接口，是否需要分页？
        deleteURL: '',            // 删除接口，API地址
        deleteIsBatch: false,     // 删除接口，是否需要批量？
        deleteIsBatchKey: 'id',   // 删除接口，批量状态下由那个key进行标记操作？比如：pid，uid...
        exportURL: ''             // 导出接口，API地址
    })
// 默认属性
    const dataForm = ref({})//查询条件
    const dataList = ref([])//数据列表
    const order = ref('')//排序，asc/desc
    const orderField = ref('') // 排序，字段
    const page = ref(1)//当前页码
    const limit = ref(10)//每页数
    const total = ref(0)//总条数
    const dataListLoading = ref(false)//数据列表,loading状态
    const dataListSelections = ref([])//数据列表，多选项
    const addOrUpdateVisible = ref(false)//新增/更新，弹窗visible状态
    onMounted(() => {
        if (mixinViewModuleOptions.createdIsNeed) {
            query()
        }
    })
    onActivated(() => {
        if (mixinViewModuleOptions.activatedIsNeed) {
            query()
        }
    })
    const query = () => {
        dataListLoading.value = true
        $http.get(
            mixinViewModuleOptions.getDataListURL,
            {
                params: {
                    order: order.value,
                    orderField: orderField.value,
                    page: mixinViewModuleOptions.getDataListIsPage ? page.value : null,
                    limit: mixinViewModuleOptions.getDataListIsPage ? limit.value : null,
                    ...dataForm.value
                }
            }
        ).then(({data: res}) => {
            dataListLoading.value = false
            console.log(res)
            dataList.value = res.data
            if (res.code !== 0) {
                dataList.value = []
                total.value = 0
                return ElMessage.error(res.msg)
            }
            // TODO:具体逻辑结合后端返回实体进行修改
            dataList.value = mixinViewModuleOptions.getDataListIsPage ? res.data.list : res.data
            total.value = mixinViewModuleOptions.getDataListIsPage ? res.data.total : 0
        }).catch(() => {
            dataListLoading.value = false
        })
    }
//多选
    const dataListSelectionChangeHandle = (val) => {
        dataListSelections.value = val
    }
// 排序
    const dataListSortChangeHandle = (data) => {
        if (!data.order || !data.prop) {
            order.value = ''
            orderField.value = ''
            return false
        }
        order.value = data.order.replace(/ending$/, '')
        orderField.value = data.prop.replace(/([A-Z])/g, '_$1').toLowerCase()
        query()
    }
// 分页, 每页条数
    const pageSizeChangeHandle = (val) => {
        page.value = 1
        limit.value = val
        query()
    }
// 分页, 当前页
    const pageCurrentChangeHandle = (val) => {
        page.value = val
        query()
    }
    const getDataList = () => {
        page.value = 1
        query()
    }

// 新增 / 修改
    /*const addOrUpdateHandle=(id)=> {
        addOrUpdateVisible.value = true
        this.$nextTick(() => {
            this.$refs.addOrUpdate.dataForm.id = id
            this.$refs.addOrUpdate.init()
        })
    }*/

// 关闭当前窗口
    /*const closeCurrentTab=(data) =>{
        var tabName = this.$store.state.contentTabsActiveName
        this.$store.state.contentTabs = this.$store.state.contentTabs.filter(item => item.name !== tabName)
        if (this.$store.state.contentTabs.length <= 0) {
            this.$store.state.sidebarMenuActiveName = this.$store.state.contentTabsActiveName = 'home'
            return false
        }
        if (tabName === this.$store.state.contentTabsActiveName) {
            this.$router.push({name: this.$store.state.contentTabs[this.$store.state.contentTabs.length - 1].name})
        }
    }*/

// 删除
    const deleteHandle = (id) => {
        if (mixinViewModuleOptions.deleteIsBatch && !id && dataListSelections.value.length <= 0) {
            return ElMessage.warning("请先选择内容")
        }
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }).then(() => {
            this.$message({
                type: 'success',
                message: '删除成功!',
            })
        }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消删除',
            })
        })

    }
    return {
        mixinViewModuleOptions,
        dataForm,
        dataList,
        order,
        orderField,
        page,
        limit,
        total,
        dataListLoading,
        dataListSelections,
        addOrUpdateVisible,
        dataListSelectionChangeHandle,
        dataListSortChangeHandle,
        pageSizeChangeHandle,
        pageCurrentChangeHandle,
        getDataList
    }
}














