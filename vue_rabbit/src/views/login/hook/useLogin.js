import {ElMessage} from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import {useRouter} from "vue-router"
import {useUserStore} from "@/stores/userStore.js"
import {reactive} from "vue";

export default function useLogin(formRef) {
    const router = useRouter()
    const userStore = useUserStore()
    // 表单数据对象
    const userInfo = reactive({
        account: '18610848230',
        password: '123456',
        agree: true
    })
// 规则数据对象
    const rules = {
        account: [
            {required: true, message: '用户名不能为空'}
        ],
        password: [
            {required: true, message: '密码不能为空'},
            {min: 6, max: 24, message: '密码长度要求6-14个字符'}
        ],
        agree: [
            {
                validator: (rule, val, callback) => {
                    return val ? callback() : new Error('请先同意协议')
                }
            }
        ]
    }
    const login = () => {
        formRef.value.validate((valid) => {
            if (valid) {
                const {account, password} = userInfo
                userStore.getUserInfo({account, password})
                ElMessage({type: 'success', message: '登录成功'})
                router.push({path: '/'})
            }
        })
    }
    return {
        userInfo, rules, login
    }
}
