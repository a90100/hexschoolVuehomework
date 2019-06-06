import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'bootstrap'
import VeeValidate from 'vee-validate';
import App from './App.vue'
import router from './router'
import store from './store'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import './bus';
import currency from './filters/currency';
import zhTW from 'vee-validate/dist/locale/zh_TW';
import VueI18n from 'vue-i18n';

Vue.config.productionTip = false
axios.defaults.withCredentials = true
Vue.use(VueAxios, axios);
Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: 'zhTW'
});

Vue.use(VeeValidate, {
  i18n,
  dictionary: {
    zhTW
  }
});

//全域引入
Vue.component('Loading', Loading);
Vue.filter('currency', currency);

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to, from, next) => {
  console.log(this); //undefined

  if (to.meta.requiresAuth) {
    const api = `${process.env.VUE_APP_APIPATH}/api/user/check`;
    //this.$http在vue元件才能使用，這裡的this為undefined
    axios.post(api).then(response => {
      console.log(response.data);
      if (response.data.success) {
        next();
      }else {
        next({
          path: '/login'
        })
      }
    });
  } else {
    next();
  }
})