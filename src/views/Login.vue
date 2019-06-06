<template lang="pug">
#main
  top-menu
  form.form-signin(@submit.prevent="signin")
    h1.h4.mb-3.font-weight-normal 請輸入Email及密碼:
    label.sr-only(for='inputEmail') Email address
    input#inputEmail.form-control(type='email', placeholder='Email address' v-model="user.username")
    label.sr-only(for='inputPassword') Password
    input#inputPassword.form-control(type='password', placeholder='Password' v-model='user.password')
    .checkbox
      label
        input(type='checkbox', value='remember-me')
        | 記得我
    loading(:active.sync="isLoading")
    button.btn.btn-lg.btn-primary.btn-block.mt-3(type='submit' @keyup.enter="submit") 登入
  cart-icon(:Orders="orderNum")
  footer-bar
</template>

<script>
import TopMenu from "@/components/TopMenu.vue";
import FooterBar from "@/components/FooterBar.vue";
import CartIcon from "@/components/CartIcon.vue";

export default {
  name: "login",
  components: {
    TopMenu,
    FooterBar,
    CartIcon
  },
  data() {
    return {
      user: {
        username: "",
        password: ""
      },
      orderNum: 0,
    };
  },
  methods: {
    signin() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/admin/signin`;

      vm.$store.dispatch('uploading', true);
      this.$http.post(api, vm.user).then(response => {
        console.log(response.data);
        if(response.data.success) {
          vm.$router.push('/dashboard/dashboardproducts');
        }
        vm.$store.dispatch('uploading', false);
      });
    },
    getCart() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_MY}/cart`;
      vm.$http.get(api).then(response =>{
        console.log(response);
        vm.orderNum = response.data.data.carts.length;
      })
    }
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    }
  },
  created() {
    this.getCart();
  }
};
</script>

<style lang="sass" scoped>
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
  .form-signin
    width: 100%
    max-width: 330px
    margin: 0 auto
    padding-top: 100px
    height: calc(100vh - 80px - 53px) //減掉topmenu和footbar的高度
    +breakpoint('pad')
      height: calc(100vh - 65px - 53px)
    .checkbox
      font-weight: 400
      margin-bottom: 15px
    .form-control
      position: relative
      box-sizing: border-box
      height: auto
      padding: 10px
      font-size: 16px
      border-radius: 0
      margin: 15px 0
      &:focus
        z-index: 2
        outline: none
    input
      box-shadow：none
      &[type="email"]
        margin-bottom: -1px
        border-bottom-right-radius: 0
        border-bottom-left-radius: 0
      &[type="password"]
        margin-bottom: 20px
        border-top-left-radius: 0
        border-top-right-radius: 0
    .btn
      background-color: $deep-brown
      border: none
</style>