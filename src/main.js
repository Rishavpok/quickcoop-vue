import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router/router.js";
import  { library } from '@fortawesome/fontawesome-svg-core'
import  { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {faLeftRight} from "@fortawesome/free-solid-svg-icons";


library.add(faLeftRight)

const app = createApp(App);
app.use(router);
app.mount('#app');
app.component('font-awesome-icon', FontAwesomeIcon)
