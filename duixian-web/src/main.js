import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import element from './libs/element/index'
import './libs/iconfont/iconfont.css'
import AutoImportComponent from './utils/auto-import-component'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(AutoImportComponent)

app.use(element)
app.mount('#app')

