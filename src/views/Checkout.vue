<template lang="pug">
#main
  top-menu
  .checkout
    form(@submit.prevent="payOrder")
      h4.h4 購買產品項目
      table.table
        thead
          tr
            th 品名
            th 數量
            th 單價
        tbody
          tr(v-for='item in orders.products', :key='item.id')
            td.align-middle {{ item.product.title }}
            td.align-middle {{ item.qty }}/{{ item.product.unit }}
            td.align-middle.text-right {{ item.final_total }}
        tfoot
          tr
            td.text-right(colspan='2') 總計
            td.text-right {{ orders.total }}
      hr
      h4.h4 購買人資訊
      table.table.info
        tbody
          tr
            th(width="150") 姓名
            td {{ orders.user.name }}
          tr
            th Email
            td {{ orders.user.email }}
          tr
            th 收件人電話
            td {{ orders.user.tel }}
          tr
            th 收件人地址
            td {{ orders.user.address }}
          tr
            th 付款狀態
            td
              span.text-danger(v-if='!orders.is_paid') 尚未付款
              span.text-success(v-else='') 付款完成
      .text-right(v-if='orders.is_paid === false')
        button.btn.btn-success 確認付款去
  footer-bar
</template>

<script>
import TopMenu from "@/components/TopMenu.vue";
import FooterBar from "@/components/FooterBar.vue";

export default {
  name: 'checkout',
  components: {
    TopMenu,
    FooterBar
  },
  data() {
    return {
      orderId: '',
      orders: {
        user: {

        }
      }
    }
  },
  methods: {
    //獲得指定id的訂單
    getOrder() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_MY}/order/${vm.orderId}`;
      vm.$http.get(api).then(response =>{
        console.log(response.data);
        vm.orders = response.data.order;
        console.log(vm.orders);
      })
    },
    //訂單付款
    payOrder() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_MY}/pay/${vm.orderId}`;
      vm.$http.post(api).then(response =>{
        if(response.data.success) {
          vm.getOrder();
        }
      })
    }
  },
  created() {
    //取得網址上的id
    this.orderId = this.$route.params.orderId;
    this.getOrder();
  }
}
</script>

<style lang="sass" scoped>
$light-brown: #FFF8DC
$light-brown2: #eddac2
$brown: #D2B48C

@mixin breakpoint($device)
  @if $device == 'pad'
    @media only screen and (max-width: 768px)
      @content
  @if $device == 'phone'
    @media only screen and (max-width: 480px)
      @content

#main
  width: 100%
  background-color: $light-brown
  .checkout
    width: 50%
    margin: 20px auto
    +breakpoint('pad')
      width: 80%
    +breakpoint('phone')
      width: 95%
    thead
      background-color: $brown
    tbody,tfoot
      background-color: $light-brown2
    .info
      th
        background-color: $brown
    button:active,button:focus
      box-shadow: 0 0 0 0
</style>
