import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import store from './store'
 axios.defaults.baseURL = "https://my-shope-app.herokuapp.com";

createApp(App).use(store).use(router).mount('#app')

/* const plugin = {
  install () {
    Vue.helpers = helpers
    Vue.prototype.$helpers = helpers
  }
}

Vue.use(plugin)
Vue.use(VueRouter)
Vue.use(VueAxios, axios) */


////Check Token user Is Auth Or is Not
 let token = localStorage.getItem('token')
if(token == null){
  createApp(App).use(store).use(router).mount('#app')
}
else
  axios.get('/api/user',{headers:{'Authorization':`Bearer ${token}`}})
  .then(res =>{
      store.commit('SET_USER',res.data)
      store.commit('SET_TOKEN',token)
  }).catch( err =>{
  /// if Token expected or server not work
  }).finally(()=>{
    createApp(App).use(store).use(router).mount('#app')
  })