import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)


export default new Router({
  routes: [{
      path: '*',
      redirect: '/'
    },
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/products',
      name: 'products',
      component: () => import('./views/Products.vue')
    },
    {
      path: '/works',
      name: 'works',
      component: () => import('./views/Works.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('./views/Dashboard.vue'),

      children: [{
          path: 'dashboardproducts',
          name: 'dashboardproducts',
          component: () => import('./components/DashboardProducts.vue'),
          meta: {
            requiresAuth: true
          },
        },
        {
          path: 'dashboardorders',
          name: 'dashboardorders',
          component: () => import('./components/DashboardOrders.vue'),
        },
        {
          path: 'dashboardcoupons',
          name: 'dashboardcoupons',
          component: () => import('./components/DashboardCoupons.vue'),
        },
      ]
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('./views/Cart.vue')
    },
    {
      path: '/setorder',
      name: 'setorder',
      component: () => import('./views/SetOrder.vue')
    },
    {
      path: '/checkout/:orderId',
      name: 'checkout',
      component: () => import('./views/Checkout.vue')
    },
  ]
})