<template lang="pug">
#main
  alert
  dashboard-sidebar
  dashboard-menu
  .content.col-xs-10
    transition(name="fade")
      router-view
</template>

<script>
import DashboardSidebar from "@/components/DashboardSidebar.vue";
import DashboardMenu from "@/components/DashboardMenu.vue";
import DashboardProducts from "@/components/DashboardProducts.vue";
import DashboardOrders from "@/components/DashboardOrders.vue";
import DashboardCoupons from "@/components/DashboardCoupons.vue";
import Alert from "@/components/AlertMessage.vue";

export default {
  name: "dashboard",
  components: {
    DashboardSidebar,
    DashboardMenu,
    DashboardProducts,
    DashboardOrders,
    DashboardCoupons,
    Alert
  }
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

.content
  margin-top: 9%
  float: right
  z-index: -100
  +breakpoint('pad')
    margin-top: 15%
  +breakpoint('phone')
    margin-top: 15%
  .fade-enter-active, .fade-leave-active
    transition-duration: 0.3s
    transition-property: opacity
    transition-timing-function: ease
  .fade-enter, .fade-leave-active
    opacity: 0
</style>
