<template lang="pug">
#main
  button.btn.btn-success(type="button" @click="opencloseModal(true)") 新增優惠券
  #couponModal(v-if=" modalShow == true ")
    h4.h4 新增優惠券
    .form-group
      label(for='title') 標題
      input#title.form-control(type='text', placeholder='請輸入優惠券名稱' v-model="tempCoupon.title")
    .form-row
      .form-group.col-md-6
        label(for='category') 折扣 % 數
        input#category.form-control(type='number', placeholder='請輸入數字' v-model="tempCoupon.percent")
      .form-group.col-md-6
        label(for='price') 到期日
        input#unit.form-control(type='date', placeholder='請輸入日期' v-model="tempCoupon.due_date")
    .form-group
      label(for='title') 優惠券號碼
      input#title.form-control(type='text', placeholder='請輸入優惠券號碼' v-model="tempCoupon.code")
    .form-group
      .form-check
        input#is_enabled.form-check-input(type='checkbox' v-model="tempCoupon.is_enabled" :true-value="1" :false-value="0")
        label.form-check-label(for='is_enabled')
          | 是否啟用
    .modal-footer
      button.btn.btn-outline-secondary(type='button', data-dismiss='modal' @click="opencloseModal") 取消
      button.btn.btn-primary(type='button' @click="updateCoupon") 確認
  table.table
    thead
      tr
        th 優惠券名稱
        th 優惠券號碼
        th(width="80") 折扣
        th(width="120") 到期日
        th(width="90") 是否啟用
        th(width="80")
        th(width="80")
    tbody
      tr(v-for="(item, key) in coupons" :key="key")
        td {{ item.title }}
        td {{ item.code}}
        td {{ item.percent}}
        td {{ item.due_date }}
        td
          span.text-success(v-if=" item.is_enabled == 1 ") 啟用
          span.text-danger(v-else) 未啟用
        td
          button.btn.btn-sm.btn-outline-info(type="button" @click="opencloseModal(false, item)") 編輯
        td
          button.btn.btn-sm.btn-info(type="button" @click="deleteCoupon(item)") 刪除
</template>

<script>
export default {
  name: "DashboardCoupons",
  data() {
    return {
      coupons: [],
      tempCoupon: {},
      modalShow: false,
      isNew: false
    }
  },
  methods: {
    getCoupons() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${
        process.env.VUE_APP_MY
      }/admin/coupons`;

      this.$http.get(api).then(response => {
        console.log(response.data);
        vm.coupons = response.data.coupons;
      });
    },
    opencloseModal(isNew, item) {
      if(isNew) {
        this.tempCoupon = {}
        this.isNew = true;
      }else {
        this.tempCoupon = Object.assign({}, item);
        this.isNew = false;
      }
      this.modalShow = !this.modalShow;
    },
    updateCoupon() {
      this.modalShow = !this.modalShow;
      const vm = this;

      //新增優惠券時用這個api
      let api = `${process.env.VUE_APP_APIPATH}/api/${
        process.env.VUE_APP_MY
      }/admin/coupon`;
      let httpMethod = 'post';

      //編輯優惠券時用這個api
      if(!vm.isNew) {
        api = `${process.env.VUE_APP_APIPATH}/api/${
          process.env.VUE_APP_MY
        }/admin/coupon/${vm.tempCoupon.id}`;
        httpMethod = 'put';
      }

      this.$http[httpMethod](api, { data: vm.tempCoupon }).then(response =>{
        console.log(response);
        vm.getCoupons();
      })
    },
    deleteCoupon(item) {
      const vm = this;
      vm.tempCoupon = Object.assign({}, item);

      const api = `${process.env.VUE_APP_APIPATH}/api/${
        process.env.VUE_APP_MY
      }/admin/coupon/${vm.tempCoupon.id}`;

      this.$http.delete(api, { data: vm.tempCoupon }).then(response => {
        console.log(response.data);
        if (response.data.success) {
          vm.getCoupons();
        }
      });
    }
  },
  created() {
    this.getCoupons();
  },
}
</script>

<style lang="sass">
@mixin breakpoint($device)
  @if $device == 'pad'
    @media only screen and (max-width: 768px)
      @content
  @if $device == 'phone'
    @media only screen and (max-width: 480px)
      @content

#main
  button.btn
    transition: 0.5s
    margin-bottom:  20px
  #couponModal
    width: 70%
    height: auto
    position: absolute
    left: 50%
    margin-left: -35%
    background-color: #DCDCDC
    padding: 15px
    border: 1px solid #808080
    border-radius: 5px
    +breakpoint('phone')
      width: 90%
      margin-left: -45% 
    label
      padding-bottom: 5px
    .modal-footer
      button.btn
        margin-bottom: 0
</style>