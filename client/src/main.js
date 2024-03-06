// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue3 from 'bootstrap-vue-3';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import store from './store'

const app = createApp(App)
app.use(BootstrapVue3)
app.use(router)
app.use(store)
app.mount('#app')

// Font Awesome
library.add(fas, far);
app.component('font-awesome-icon', FontAwesomeIcon)