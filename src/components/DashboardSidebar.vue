<template lang="pug">
.sidebar.col-xs-2
  ul.list
    li
      a(href="#/dashboard/dashboardproducts")
        i(class="fas fa-box-open")
        | 產品列表
    li
      a(href="#/dashboard/dashboardorders")
        i(class="fas fa-list-ul")
        | 訂單列表
    li
      a(href="#/dashboard/dashboardcoupons")
        i(class="fas fa-ticket-alt")
        | 優惠券
</template>

<script>
export default {
  name: 'DashboardSidebar'
}
</script>

<style lang="sass" scoped>
@mixin breakpoint($device)
  @if $device == 'pad'
    @media only screen and (max-width: 768px)
      @content
  @if $device == 'phone'
    @media only screen and (max-width: 480px)
      @content

.sidebar
  background-color:	#A0522D
  height: 100vh
  position: fixed
  padding-top: 7%
  +breakpoint('pad')
    padding-top: 15%
  +breakpoint('phone')
    display: none
  .list
    li
      font-size: 18px
      padding: 16px 0
      a
        color: #fff
        text-decoration: none
        i
          padding-right: 10px
</style>