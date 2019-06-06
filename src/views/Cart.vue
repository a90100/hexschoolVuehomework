<template lang="pug">
#main
  top-menu
  p.h2.title 您的購物車
  .content
    table.table
      thead
        tr
          th(scope='col' width="100")
          th(scope='col') 品名
          th(scope='col') 數量
          th(scope='col') 單價
          th(scope='col' width="100")
      tbody
        tr(v-for="item in ordersList" :key="item.id")
          th
            img(:src="item.product.imageUrl")
          td {{ item.product.title }}
          td {{ item.qty }}
          td {{ item.product.price | currency}} 元
          td
            button.btn.btn-outline-danger(@click="deleteOrder(item)") 刪除 
              i.fas.fa-trash
    .input-group
      input.form-control(type="text" placeholder="請輸入優惠碼" v-model="coupon_code")
      button.btn(type="button" @click="addCoupon") 套用優惠碼
    p 本公司正好周年慶，試試coupon : oneyear 吧 ~
    br
    p.text-danger {{ couponMessage }}
    hr
    .check-group
      p.h5 原總計 {{ total | currency}} 元
      p.h4.text-success(v-if="showDiscount") 折扣後 {{ final_total | currency}} 元
      .input-group
        router-link(to='/setorder')
          button.btn.btn-lg.checkout(type="button") 結帳去
    .clear
  footer-bar
</template>

<script>
import TopMenu from "@/components/TopMenu.vue";
import FooterBar from "@/components/FooterBar.vue";

export default {
  name: 'cart',
  components: {
    TopMenu,
    FooterBar
  },
  data() {
    return {
      ordersList: [],
      total: 0,
      final_total: 0,
      tempOrder: {},
      coupon_code: '',
      couponMessage: '',
      showDiscount: false
    }
  },
  methods: {
    getCart() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_MY}/cart`;
      vm.$http.get(api).then(response =>{
        console.log(response);
        vm.ordersList = response.data.data.carts;
        vm.total = response.data.data.total;
        vm.final_total = response.data.data.final_total;
      })
    },
    deleteOrder(item) {
      const vm = this;
      vm.tempOrder = Object.assign({}, item);
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_MY}/cart/${vm.tempOrder.id}`

      vm.$http.delete(api, { data: vm.tempOrder }).then(response =>{
        console.log(response.data);
        vm.getCart();
      })
    },
    addCoupon() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_MY}/coupon`
      const coupon = {
        code: vm.coupon_code
      }
      vm.$http.post(api, { data: coupon }).then(response =>{
        console.log(response.data);
        vm.getCart();
        vm.couponMessage = response.data.message;
        if(response.data.success) {
          vm.showDiscount = true;
        }
      })
    }
  },
  created() {
    this.getCart();
  }
}
</script>

<style lang="sass" scoped>
$light-brown: #FFF8DC
$deep-brown: #A0522D

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
  .title
    text-align: center
    margin: 40px 0
  .content
    width: 80%
    margin: 0 auto
    +breakpoint('pad')
      width: 90%
    +breakpoint('phone')
      width: 95%
    .table
      tbody
        img
          width: 100px
          height: 80px
          background-size: cover
          background-position: center
        button
          transition: 0.5s
        button:active,button:focus
          box-shadow: none
    .input-group
      margin: 10px 0 5px 0
      .form-control
        border-radius: 5px
        margin-right: 20px
      button.btn
        background-color: $deep-brown
        color: #fff
        transition: 0.8s
        &:hover
          box-shadow: 0 0 3px 2px $deep-brown
    .check-group
      float: right
      p.h4
        margin: 10px 0 20px 0
    .clear
      clear: both
</style>
