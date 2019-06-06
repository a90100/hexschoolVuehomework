<template lang="pug">
#main
  button.btn.btn-success(type="button" @click="opencloseModal(true)") 新增產品
  #productModal(v-if=" modalShow == true ")
    h4.h4 新增產品
    .row
      .col-sm-4
        .form-group
          label(for='image') 輸入圖片網址
          input#image.form-control(type='text', placeholder='請輸入圖片連結' v-model="tempProduct.imageUrl")
        .form-group
          label(for='customFile')
            | 或 上傳圖片
            i.fas.fa-circle-notch.fa-spin(v-if="status.fileUploading")
          input#customFile.form-control(type='file', ref='files' @change='uploadFile')
        img.img-fluid(alt="" :src="tempProduct.imageUrl")
      .col-sm-8
        .form-group
          label(for='title') 標題
          input#title.form-control(type='text', placeholder='請輸入標題' v-model="tempProduct.title")
        .form-row
          .form-group.col-md-6
            label(for='category') 分類
            input#category.form-control(type='text', placeholder='請輸入分類' v-model="tempProduct.category")
          .form-group.col-md-6
            label(for='price') 單位
            input#unit.form-control(type='unit', placeholder='請輸入單位' v-model="tempProduct.unit")
        .form-row
          .form-group.col-md-6
            label(for='origin_price') 原價
            input#origin_price.form-control(type='number', placeholder='請輸入原價' v-model="tempProduct.origin_price")
          .form-group.col-md-6
            label(for='price') 售價
            input#price.form-control(type='number', placeholder='請輸入售價' v-model="tempProduct.price")
        .form-group
          label(for='description') 產品描述
          textarea#description.form-control(type='text', placeholder='請輸入產品描述' v-model="tempProduct.description")
        .form-group
          label(for='content') 說明內容
          textarea#content.form-control(type='text', placeholder='請輸入產品說明內容' v-model="tempProduct.content")
        .form-group
          .form-check
            input#is_enabled.form-check-input(type='checkbox' v-model="tempProduct.is_enabled" :true-value="1" :false-value="0")
            label.form-check-label(for='is_enabled')
              | 是否啟用
    .modal-footer
      button.btn.btn-outline-secondary(type='button', data-dismiss='modal' @click="opencloseModal") 取消
      button.btn.btn-primary(type='button' @click="updateProduct") 確認
  table.table
    thead
      tr
        th(width="150") 分類
        th 產品名稱
        th(width="150") 原價
        th(width="150") 售價
        th(width="90") 是否啟用
        th(width="70") 編輯
        th(width="70") 刪除
    tbody
      tr(v-for="(item, key) in products" :key="item.id")
        td {{ item.category }}
        td {{ item.title }}
        td.text-right {{ item.origin_price | currency}}
        td.text-right {{ item.price | currency}}
        td
          span.text-success(v-if=" item.is_enabled == 1 ") 啟用
          span.text-danger(v-else) 未啟用
        td
          button.btn.btn-sm.btn-outline-info(type="button" @click="opencloseModal(false, item)" @change='uploadFile') 編輯
        td
          button.btn.btn-sm.btn-info(type="button" @click="deleteProduct(item)") 刪除
  Pagination(:Pages="pagination" @callProducts="getProducts")
</template>

<script>
import $ from "jquery";
import Pagination from '@/components/Pagination.vue';

export default {
  name: "DashboardProducts",
  data() {
    return {
      products: [],
      tempProduct: {},
      modalShow: false,
      isNew: false,
      status: {
        fileUploading: false
      },
      pagination: {},
    };
  },
  components: {
    Pagination
  },
  methods: {
    //取得產品列表，page預設值為1
    getProducts(page = 1) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${
        process.env.VUE_APP_MY
      }/admin/products?page=${page}`;
      const vm = this;

      this.$http.get(api).then(response => {
        console.log(response.data);
        vm.products = response.data.products;
        vm.pagination = response.data.pagination;
      });
    },
    //開合modal
    opencloseModal(isNew, item) {
      if (isNew) {
        //把之前存的temp清空
        this.tempProduct = {};
        this.isNew = true;
      } else {
        //只將值傳入tempProduct，避免item和tempProduct為同一個參考
        this.tempProduct = Object.assign({}, item);
        this.isNew = false;
      }
      this.modalShow = !this.modalShow;
    },
    //更新產品列表
    updateProduct() {
      this.modalShow = !this.modalShow;
      let httpMethod = "post";
      const vm = this;
      //新增產品用的api
      let api = `${process.env.VUE_APP_APIPATH}/api/${
        process.env.VUE_APP_MY
      }/admin/product`;

      //編輯產品時，換成編輯產品的api
      if (!vm.isNew) {
        api = `${process.env.VUE_APP_APIPATH}/api/${
          process.env.VUE_APP_MY
        }/admin/product/${vm.tempProduct.id}`;
        httpMethod = "put";
      }

      //{ data: vm.tempProduct } 是為了讓傳出的資料以物件的方式傳送
      this.$http[httpMethod](api, { data: vm.tempProduct }).then(response => {
        console.log(response.data);
        if (response.data.success) {
          vm.getProducts();
        } else {
          vm.getProducts();
          console.log("新增失敗");
        }
      });
    },
    //刪除產品
    deleteProduct(item) {
      const vm = this;
      //將取到的item存到tempProduct
      vm.tempProduct = Object.assign({}, item);

      const api = `${process.env.VUE_APP_APIPATH}/api/${
        process.env.VUE_APP_MY
      }/admin/product/${vm.tempProduct.id}`;

      this.$http.delete(api, { data: vm.tempProduct }).then(response => {
        console.log(response.data);
        if (response.data.success) {
          vm.getProducts();
          console.log("已刪除商品");
        } else {
          console.log("找不到商品");
        }
      });
    },
    //上傳圖片檔案
    uploadFile() {
      console.log(this);
      const vm = this;
      const uploadedFile = this.$refs.files.files[0];
      let formData = new FormData();
      formData.append("file-to-upload", uploadedFile);
      const api = `${process.env.VUE_APP_APIPATH}/api/${
        process.env.VUE_APP_MY
      }/admin/upload`;

      vm.status.fileUploading = true;
      //將post的Content-Type改成multipart/form-data這個類型
      this.$http
        .post(api, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(response => {
          console.log(response.data);
          if (response.data.success) {
            //新增tempProduct原本沒有的屬性，用$set
            vm.$set(vm.tempProduct, "imageUrl", response.data.imageUrl);
          } else {
            this.$bus.$emit('message:push', response.data.message, 'danger');
          }

          vm.status.fileUploading = false;
        });
    }
  },
  created() {
    this.getProducts();
  }
};
</script>

<style lang="sass" scoped>
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
  #productModal
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
    input#customFile
      padding: 3px
    .modal-footer
      button.btn
        margin-bottom: 0
</style>