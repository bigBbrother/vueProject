import axios from "axios";
import {ElMessage} from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import {useUserStore} from "@/stores/userStore";
import router from "@/router/index.js"

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
axios.defaults.headers.put['Content-Type'] = 'application/json;charset=UTF-8'
axios.defaults.headers.delete['Content-Type'] = 'application/json;charset=UTF-8'
const http = axios.create({
    baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
    //baseURL: 'http://localhost:8080',
    timeout: 1000 * 180, withCredentials: false, headers: {
        'Cache-Control': 'no-store, no-cache'
    }
})
/**
 * 请求拦截
 */
http.interceptors.request.use(config => {
    //获取token
    const userStore = useUserStore()
    const token = userStore.userInfo.token
    if (token) {
        config.headers.Authorization = `Bearer  ${token}`
    }
    return config


})

/**
 * 响应拦截
 */
http.interceptors.response.use(response => {
    //if (response.headers.login == "false") {
    //    router.push("/login")
    //}
    return response
}, e => {
    //统一错误处理
    ElMessage({
        type: "warning", message: e.response.data.message
    })

})

export default http
