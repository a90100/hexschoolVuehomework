<template lang="pug">
#main
  top-menu
  .content
    h4.title 好置家居過去為客戶設計的作品，包含多項家具風格
    .room.row#room1
      .info.col-sm-6
        h2 美式風格
        p 舒適的生活觀是美國人對家具的要求，因此美式家具在材質及色調上表現出粗獷、不經加工的質感，而自由組合成各種所需也是美式家具的重點
        p 受到墨西哥傳統手工影響，原住民圖騰夾雜各式草編物，厚重的原木色，都讓美式家具很受國人喜愛。而編織布的使用更讓美式空間更顯特色其編織布以較原質地者為多，在色繫上活潑鮮明抑或溫暖高雅，都可以是美國風的表現。
      .img.col-sm-6
        img(src="../assets/imgs/room1.jpg")
    .room.row#room2
      .img.col-sm-6
        img(src="../assets/imgs/room2.jpg")
      .info.col-sm-6
        h2 北歐風格
        p 北歐風格家具充滿後現代風格的設計感，拋棄了傳統家具的繁複，使用功能多，直角的線和面勾畫出一種簡單的美。
        p 配飾多以外國元素為主，燈光也多為現代風格，布藝也多深咖深灰為主。材質上的精挑細選，工藝上的盡善盡美，回歸自然，崇尚原木韻味。外加現代、實用、精美的設計風格，反映出現代都市人進入後現代社會的另一種思考方向。
    .room.row#room3
      .info.col-sm-6
        h2 古典歐式風格
        p 歐式家具是歐式古典風格裝修的重要元素，以義大利、法國和西班牙風格的家具為主要代表。
        p 延續了17世紀至19世紀皇室貴族家具的特點，講究手工精細的裁切雕刻。輪廓和轉折部分由對稱而富有節奏感的曲線或曲面構成，並裝飾鍍金銅飾、仿皮等，結構簡練，線條流暢，色彩富麗，藝術感強，給人的整體感覺是華貴優雅，十分莊重。
      .img.col-sm-6
        img(src="../assets/imgs/room3.jpg")
    .room.row#room4
      .img.col-sm-6
        img(src="../assets/imgs/room4.jpg")
      .info.col-sm-6
        h2 簡約現代風格
        p 現代簡約的裝修風格，提倡功能第一的原則，空間設計通常含蓄內斂，但往往能達到以少勝多、以簡勝繁的效果。
        p 在建築材料上提倡簡約，將所有設計的元素、色彩、原料、照明等都簡化到最少的程度，但把做工、材質的質感拉高。室內空間開敞且內外通透，室內裝飾與陳設均以簡潔的造型、純潔的質地、精細的工藝為其特徵。
    .room.row#room5
      .info.col-sm-6
        h2 日式風格
        p 傳統日式風格裝修運用了自然界的材質，重視實際功能，以淡雅、禪意為境界，選用材料上也注重自然質感，為室內帶來生機從而與大自然融為一體。
        p 設計風格受到日本和式建築影響，講究空間的流動與分隔，流動則為一室，分隔則分幾個功能空間，空間中總能讓人靜靜地思考，禪意無窮。色彩則多偏重於原木色，以及竹、藤、麻和其他天然材料顏色，樸素感更加深質樸和踏實的風格。
      .img.col-sm-6
        img(src="../assets/imgs/room5.jpg")
  cart-icon(:Orders="orderNum")
  footer-bar
</template>

<script>
import TopMenu from "@/components/TopMenu.vue";
import FooterBar from "@/components/FooterBar.vue";
import CartIcon from "@/components/CartIcon.vue";

export default {
  name: "works",
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
$light-brown: #FFF8DC
$white: #fff
$gray: #444444

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
    .title
      font-size: 28px
      text-align: center
      margin: 50px 20px 0 20px
      line-height: 30px
      +breakpoint('pad')
        font-size: 24px
    .room
      margin: 60px 0 95px 0
      padding: 15px 8%
      background-color: $white
      +breakpoint('pad')
        padding: 15px 0%
      .info
        +breakpoint('pad')
          padding: 0 10px
        h2
          margin: 18px 0
          font-size: 30px
          +breakpoint('pad')
            font-size: 26px
        p
          font-size: 18px
          line-height: 24px
          letter-spacing: 2px
          color: $gray
          margin-bottom: 10px
          +breakpoint('pad')
            font-size: 16px
      .img
        +breakpoint('pad')
          padding: 0 10px
        margin-top: -40px
        @media only screen and (max-width: 576px)
          margin-top: 10px
        img
          width: 100%
</style>