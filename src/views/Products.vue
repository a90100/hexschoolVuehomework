<template lang="pug">
#main
  top-menu
  .content.row
    .col-sm-3
      ul.selectList
        li(@click="getProducts('')") 全部產品
        li(@click="getProducts('床')") 床
        li(@click="getProducts('電視櫃')") 電視櫃
        li(@click="getProducts('枕頭')") 枕頭
        li(@click="getProducts('置物架')") 置物架
        li(@click="getProducts('沙發')") 沙發
        li(@click="getProducts('桌子')") 桌子
    .col-sm-9
      .product(v-for="(item,key) in filterData" :key="item.id")
        .img(:style="{'backgroundImage': `url(${item.imageUrl})`}")
          .title {{ item.title }}
          .content(v-if="item.content") {{ item.content }}
        p.price 折扣價 
          span {{ item.price | currency}} 
          | 元
        .buttons
          button(type="button" class="btn btn-sm btn-outline-success" @click="getProductDetail(item.id)") 查看更多
          button(type="button" class="btn btn-sm btn-success" @click="addToCart(item.id)") 加入購物車
    ul.pagination
      li.page-item(:class="{'disabled': currentPage == 0}")
        a.page-link(href='#', aria-label='Previous' @click.prevent="getCurrentPage(currentPage - 1)")
          span(aria-hidden='true') «
      li.page-item(v-for="page in pages" :key="page")
        a.page-link(href='#' @click.prevent="getCurrentPage(page - 1)" :class="{'active': currentPage == page - 1}") {{ page }}
      li.page-item(:class="{'disabled': currentPage == pages - 1}")
        a.page-link(href='#', aria-label='Next' @click.prevent="getCurrentPage(currentPage + 1)")
          span(aria-hidden='true') »

    loading(:active.sync="isLoading")
    #productModal.modal.fade(tabindex='-1', role='dialog', aria-labelledby='productModalTitle', aria-hidden='true')
      .modal-dialog.modal-dialog-centered(role='document')
        .modal-content
          .modal-header
            h5.h4#productModalTitle.modal-title {{ productDetail.title }}
            button.close(type='button', data-dismiss='modal', aria-label='Close')
              span(aria-hidden='true') ×
          .modal-body
            img(:src=" productDetail.imageUrl ")
            p.description.h5 {{ productDetail.description }}
            .price
              p.origin_price 原價 {{ productDetail.origin_price | currency}} 元
              p.discount_price.h4 折扣價 {{ productDetail.price | currency}} 元
            select(v-model="num")
              option(value="1" selected) 選購 1 {{ productDetail.unit }}
              option(value="2") 選購 2 {{ productDetail.unit }}
              option(value="3") 選購 3 {{ productDetail.unit }}
              option(value="5") 選購 5 {{ productDetail.unit }}
              option(value="10") 選購 10 {{ productDetail.unit }}
          .modal-footer
            p.h3 總計 {{ num * productDetail.price | currency}}元
            button.btn.btn-success(type='button' @click="addToCart(productDetail.id, num)") 加入購物車
  cart-icon(:Orders="orderNum" @getOrders="getCart")
  footer-bar
</template>

<script>
import TopMenu from "@/components/TopMenu.vue";
import FooterBar from "@/components/FooterBar.vue";
import CartIcon from "@/components/CartIcon.vue";
import $ from 'jquery';

export default {
  name: 'products',
  components: {
    TopMenu,
    FooterBar,
    CartIcon
  },
  data() {
    return {
      products: [],
      productDetail: {},
      pages: 0,
      currentPage: 0,
      category: '',
      num: 1,
      orderNum: 0,
    }
  },
  methods: {
    getProducts(category = '') {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_MY}/products/all`;
      vm.$http.get(api).then(response =>{
        vm.products = response.data.products;

        //過濾產品分類
        if(category != '') {
          vm.products = vm.products.filter((item) =>{
            return item.category == category;
          })
        }else {
          vm.products = response.data.products;
        }
      })
    },
    //獲得點擊的頁數
    getCurrentPage(page) {
      this.currentPage = page;
    },
    //查看產品細節
    getProductDetail(id) {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_MY}/product/${id}`;

      vm.$store.dispatch('uploading', true);
      vm.$http.get(api).then(response =>{
        vm.productDetail = response.data.product;
        vm.$store.dispatch('uploading', false);

        $('#productModal').modal('show');
      })
    },
    //加入產品至購物車
    addToCart(id, qty = 1) {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_MY}/cart`;
      const cart = {
        product_id: id,
        qty
      }

      vm.$store.dispatch('uploading', true);
      vm.$http.post(api, { data: cart }).then(response =>{
        $('#productModal').modal('hide');
        this.getCart();
        vm.$store.dispatch('uploading', false);
      })
    },
    //獲得購物車內的產品
    getCart() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_MY}/cart`;
      vm.$http.get(api).then(response =>{
        vm.orderNum = response.data.data.carts.length;
      })
    },
  },
  computed: {
    filterData() {
      const vm = this;
      const newData = [];

      // 製作分頁
      vm.products.forEach((item, i) =>{
        //推進分組的[]
        if(i % 9 == 0) {
          newData.push([]);
        }
        
        //將資料推入分組的[]
        vm.pages = newData.length;
        let page = parseInt(i / 9);
        newData[page].push(item);
      })
      return newData[vm.currentPage];
    },
    isLoading() {
      return this.$store.state.isLoading;
    }
  },
  created() {
    this.getProducts();
    this.getCart();
  }
}
</script>

<style lang="sass" scoped>
$light-brown: #FFF8DC
$light-green: #96f28c
$green: #42b54e
$deep-green: #2b7f33
$white: #fff
$red: #ff3a3a
$brown: #a0522d

@mixin breakpoint($device)
  @if $device == 'pad'
    @media only screen and (max-width: 768px)
      @content
  @if $device == 'phone'
    @media only screen and (max-width: 480px)
      @content

#main
  background-color: $light-brown
  width: 100%
  .content
    margin: 60px 8% 0 8%
    +breakpoint('pad')
      margin: 60px 4% 0 4%
    .col-sm-3
      .selectList
        text-align: center
        margin: 20px 0
        li
          padding: 20px 0
          border: 2px solid $white
          cursor: pointer
          background-color: $light-green
          border-radius: 5px
          transition: 0.5s
          font-size: 18px
        li:hover
          background-color: $green
    .col-sm-9
      margin: 20px 0
      .product
        float: left
        border: 0.5px solid black
        height: 300px
        width: 30%
        margin: 0 1.66% 20px 1.66%
        box-shadow: 1px 1px 3px #000
        +breakpoint('pad')
          width: 45%
          margin: 0 2.5% 20px 1.66%
        +breakpoint('phone')
          width: 95%
          margin: 0 5% 20px 1.66%
        .img
          height: 200px
          background-size: cover
          background-position: center
          position: relative
          .title
            position: absolute
            background-color: $white
            padding: 5px 10px
            margin: 10px
          .content
            position: absolute
            bottom: 5px
            padding: 5px 10px
            background-color: $red
            color: $white
        .price
          margin: 10px
          font-size: 20px
          span
            color: $red
        .buttons
          display: flex
          justify-content: space-between
          margin: 20px 10px 0 10px
          button
            transition: 0.5s
    .pagination
      margin: 20px auto
      .page-item
        a
          color: $green
        a:hover
          background-color: $light-green
        a.active
          background-color: $deep-green
          color: $white
    #productModal
      .modal-content
        background-color: $brown
        color: $white
        padding: 0 20px
        .modal-body
          img
            width: 100%
            background-size: cover
            background-position: center
          p.description
            margin: 20px 0 0 0
          .price
            display: flex
            justify-content: space-between
            align-items: center
            margin: 10px 0
            .origin_price
              text-decoration: line-through
          select
            outline: none
            padding: 5px 10px
        .modal-footer
          display: flex
          align-items: center
    button:active,button:focus
      box-shadow: none
</style>