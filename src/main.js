import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import 'bootstrap/dist/css/bootstrap.css'
import "bootstrap"
import VueSocketIOExt from 'vue-socket.io-extended';
import { io } from 'socket.io-client';

const socket = io(process.env.VUE_APP_HOST);

createApp(App)
  .use(VueSocketIOExt, socket)
  .mount('#app')
