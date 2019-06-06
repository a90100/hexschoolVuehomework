<template lang="pug">
#main
  top-menu
  .content
    h1.h2.serve - 最優質的服務 -
    .card-deck
      .card
        img.card-img-top(src='../assets/imgs/truck.jpg')
        .card-body
          h5.card-title
            i(class="fas fa-truck")
            | 運費介紹
          p.card-text
            | >南部縣市(高雄/台南/屏東) - 免運費
            br
            | >中部縣市(苗栗以南，含南投) - 運費800元
            br
            | >北部/東部縣市/離島 - 依實際運費報價計算
      .card
        img.card-img-top(src='../assets/imgs/people.jpg')
        .card-body
          h5.card-title
            i(class="fas fa-user-friends")
            | 家具規劃師
          p.card-text 讓一群受過室內設計與色彩訓練的專業人士為你規劃家具擺設及顏色搭配。
            br
            br
            | 只要您有需要我們的產品，可以到網頁下方聯絡資訊聯絡我們，家具規劃師將會與您討論預算，到您家中進行空間測量。
      .card
        img.card-img-top(src='../assets/imgs/quality.jpg')
        .card-body
          h5.card-title
            i(class="fas fa-thumbs-up")
            | 品質保證
          p.card-text 為了使消費者享受高品質的家具，我們與國外製作廠商合作，使用木材布料皆為歐洲澳洲進口，並經過工廠及品管師嚴格的檢測。
    .row.info
      iframe(src="https://www.facebook.com/plugins/page.php?href=https://www.facebook.com/%E5%A5%BD%E7%BD%AE%E5%AE%B6%E5%B1%85-299730384282739/?modal=admin_todo_tour" width="450" height="214" style="border:none;overflow:hidden" class="col-md-5 col-xs-12")
      .detail(class="col-md-7 col-xs-12")
        h3
          i(class="fas fa-map-marker-alt") 
          | 本館地址:
        p 高雄市發財區發大財路一段666號
        h3
          i(class="fas fa-clock")
          | 營業時間:
        p 週一 ~ 週六 10:00 ~ 21:30 (週日公休日)
        h3 
          i(class="fas fa-info-circle")
          | 客服專線 Email & Line:
        h3
          i(class="fab fa-line line")
          i(class="fas fa-envelope-square email")
          | makeMoney@gmail.com
  cart-icon(:Orders="orderNum")
  footer-bar
</template>

<script>
// @ is an alias to /src
import TopMenu from "@/components/TopMenu.vue";
import FooterBar from "@/components/FooterBar.vue";
import CartIcon from "@/components/CartIcon.vue";

export default {
  name: "about",
  components: {
    TopMenu, 
    FooterBar,
    CartIcon
  },
  data() {
    return {
      orderNum: 0
    }
  },
  methods: {
    getCart() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_MY}/cart`;
      vm.$http.get(api).then(response =>{
        console.log(response);
        vm.orderNum = response.data.data.carts.length;
      })
    }
  },
  created() {
    this.getCart();
  }
};
</script>

<style lang="sass" scoped>
$black: #000
$gray: #444444
$light-brown: #FFF8DC
$white: #fff

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
  .content
    margin: 60px 8% 0 8%
    +breakpoint('pad')
      margin: 100px 4% 0 4%
    +breakpoint('phone')
      margin: 60px 1% 0 1%
    h1.serve
      text-align: center
      color: $black
    .card-deck
      margin-top: 20px
      .card
        .card-title
          font-size: 26px
          color: $black
          i
            padding-right: 10px
        .card-text
          line-height: 24px
          color: $gray
    .info
      padding: 40px 0
      display: flex
      .detail
        background-image: url('../assets/imgs/store.jpg')
        background-color: rgba(139, 69, 19, 0.5)
        background-size: cover
        background-blend-mode: darken;
        h3
          color: $white
          font-size: 20px
          margin: 15px 0 5px 0
          i
            margin-right: 10px
        p
          color: $white
          line-height: 28px
        .email
          color: #335bbf
        .line
          color: #00B900
        .email,.line
          font-size: 28px
          background-color: $white
          padding: 5px
          border-radius: 10px
        .email,.line:hover
          cursor: pointer
</style>
