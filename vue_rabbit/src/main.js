import {createApp} from 'vue'
import {createPinia} from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import axios from './utils/request.js';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
//引入样式文件
import "@/styles/common.scss"
/**
 * 引入懒加载指令并注册
 */
import {lazyPlugin} from '@/directives'
import {componentPlugin} from '@/components'

const app = createApp(App)
const pinia = createPinia()
// 注册持久化插件
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(componentPlugin)

app.config.globalProperties.$http = axios;
app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.use(lazyPlugin)
app.mount('#app')




