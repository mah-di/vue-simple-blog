import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import './style.css'
// import store from './store/store'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate  from 'pinia-plugin-persistedstate'

const pinia = createPinia().use(piniaPluginPersistedstate)

const app = createApp(App)

// app.use(store)
app.use(pinia)

app.use(router)

app.mount('#app')
