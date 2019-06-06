<template lang="pug">
nav.navbar.navbar-expand-sm.navbar-dark.bg-dark
  .h2.text-white 好置家居
  button.navbar-toggler(type='button', data-toggle='collapse', data-target='#dashboardMenu', aria-controls='navbarTogglerDemo02', aria-expanded='false', aria-label='Toggle navigation')
    span.navbar-toggler-icon
  #dashboardMenu.collapse.navbar-collapse
    ul.navbar-nav
      li.nav-item
        a.text-white.nav-link(href='/#/dashboard/dashboardproducts') 產品列表
      li.nav-item
        a.text-white.nav-link(href='/#/dashboard/dashboardorders') 訂單列表
      li.nav-item
        a.text-white.nav-link(href='/#/dashboard/dashboardcoupons') 優惠券
      li.nav-item
        a.text-white.nav-link(href='#' @click.prevent='signout') 
          span
            i(class="fas fa-sign-out-alt") 登出
</template>

<script>
export default {
  name: 'DashboardMenu',
  methods: {
    signout() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/logout`
      this.$http.post(api).then(response => {
        console.log(response.data);
        if(response.data.success) {
          vm.$router.push('/login');
        }
      });
    }
  }
}
</script>

<style lang="sass" scoped>
nav.navbar
  position: fixed
  width: 100%
  box-shadow: 0 1px 1px #000
  .navbar-toggler
    outline: none
  .navbar-nav
    margin-left: auto
    .nav-item
      margin: 0 10px
    .nav-item::after
      content: ''
      display: block
      width: 0
      height: 2px
      background: #fff
      transition: 0.3s
    .nav-item:hover::after
      width: 100%;
</style>