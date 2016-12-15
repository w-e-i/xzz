import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Vuex from 'vuex'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'

Vue.config.debug = true;

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(Vuex);
Vue.use(MuseUI);

import signin from './pages/signin.vue';
import signup from './pages/signup.vue';
import tabHistory from './pages/tab-history.vue';
import tabProfile from './pages/tab-profile.vue';
import tabQoute from './pages/tab-qoute.vue';
import bottomNavigator from './components/bottom-navigate.vue';
import trade from './pages/trade.vue';

const router = new VueRouter ({
  routes: [
    {
      path: '/',
      redirect:'/signin'
    },
    {
      path:'/signin',
      name: 'signin',
      component: signin
    },
    {
      path: '/signup',
      name: 'signup',
      component: signup
    },
    {
      path: '/tab',
      name: 'bottomNavigator',
      component: bottomNavigator,
      children: [
        {
          path: 'history/0',
          component: tabHistory
        },
        {
          path: 'profile',
          component: tabProfile
        },
        {
          path: 'qoute',
          component: tabQoute
        }
      ]
    },
    {
      path: '/trade/:mode/:market/:code',
      name: 'trade',
      component: trade
    }
  ]
});


/* eslint-disable no-new */
const app = new Vue({
    router: router,
    render: h => h(App)
}).$mount('#app');


