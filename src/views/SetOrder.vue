<template lang="pug">
#main
  top-menu
  form.col-md-6(@submit.prevent="createOrder")
    .form-row
      .form-group.col-sm-6
        label(for='username') 收件人姓名
        input#username.form-control(type='text', name='name', v-model='form.user.name', placeholder='輸入姓名' :class="{'is-invalid': errors.has('name')}" v-validate="'required'")
        span.text-danger(v-if="errors.has('name')") 必須輸入姓名
      .form-group.col-sm-6
        label(for='usertel') 收件人電話
        input#usertel.form-control(type='tel', name='phone' v-model='form.user.tel', placeholder='請輸入電話' :class="{'is-invalid': errors.has('phone')}" v-validate="'required'")
        span.text-danger(v-if="errors.has('phone')") 必須輸入電話
    .form-group
      label(for='useraddress') 收件人地址
      input#useraddress.form-control(type='text', name='address', v-model='form.user.address', placeholder='請輸入地址' :class="{'is-invalid': errors.has('address')}" v-validate="'required'")
      span.text-danger(v-if="errors.has('address')") 必須輸入地址
    .form-group
      label(for='useremail') Email
      input#useremail.form-control(type='email', name='email', v-model='form.user.email', placeholder='請輸入 Email', :class="{'is-invalid': errors.has('email')}" required='' v-validate="'required|email'")
      span.text-danger(v-if="errors.has('email')") {{ errors.first('email') }}
    .form-group
      label(for='comment') 留言
      textarea#comment.form-control(name='', cols='10', rows='5', v-model='form.message')
    .text-right
      button.btn.btn-danger 送出訂單
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
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
    }
  },
  methods: {
    createOrder() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_MY}/order`;
      const order = vm.form;

      this.$validator.validate().then(valid => {
        // valid == true，才建立訂單
        if (valid) {
          vm.$http.post(api, { data: order }).then(response =>{
            console.log(response);
            if(response.data.success) {
              vm.$router.push(`checkout/${response.data.orderId}`);
            }
          })
        }
      });
    }
  }
}
</script>

<style lang="sass" scoped>
$light-brown: #FFF8DC
$light-brown2: #eddac2

#main
  width: 100%
  background-color: $light-brown
  form
    margin: 20px auto 30px auto
    background-color: $light-brown2
    padding: 20px
    border-radius: 5px
    .form-group
      label
        margin-bottom: 10px
      input
        margin-bottom: 5px
    button:active,button:focus
      box-shadow: none
</style>
