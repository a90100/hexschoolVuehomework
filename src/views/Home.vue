<template lang="pug">
#main
  .content
    h1 好置家居
    h3 讓我們的用心陪您度過生活的每一天
  ul.menu(:class="{'noShow': !menuShow}")
    li
      router-link(to='/about') 關於我們
    li
      router-link(to='/products') 所有商品
    li
      router-link(to='/works') 好置作品
    li
      router-link(to='/login') 後臺登入
  .hamburgerMenu(:class="{'noShow': !hamburgerShow, 'active': hamburgerActive}" @click="showMenu")
    .line
    .line
    .line
  .itemMenu
    button.button1.pillows 1
      span.tip 高枕無憂羽絨枕
    button.button2.tables 2
      span.tip 時尚高級客廳桌
    button.button3.cabinets 3
      span.tip 巧妙收納電視櫃
    button.button4.shelves 4
      span.tip 耐重多層置物架
    button.button5.sofas 5
      span.tip 愜意休閒沙發椅
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      windowWidth: 0,
      hamburgerShow: false,
      hamburgerActive: false,
      menuShow: true
    };
  },
  created() {
    // const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_MY}/products`
    // this.$http.get(api).then(response => {
    //   console.log(response.data);
    // });
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  methods: {
    handleResize() {
      let vm = this;
      vm.windowWidth = window.innerWidth;
      if (vm.windowWidth < 768) {
        vm.hamburgerShow = true;
        vm.menuShow = false;
      }
    },
    showMenu() {
      this.hamburgerActive = !this.hamburgerActive;
      this.menuShow = !this.menuShow;
    }
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  }
};
</script>

<style scoped lang="sass">
$white: #fff
$black: #000

@mixin breakpoint($device)
  @if $device == 'pad'
    @media only screen and (max-width: 768px)
      @content
  @if $device == 'phone'
    @media only screen and (max-width: 480px)
      @content

@mixin tipStyle($vis: hidden, $bgc: $white, $w: 150px, $p: 15px)
  visibility: $vis
  background-color: $bgc
  width: $w
  padding: $p

#main
  width: 100vw
  height: 100vh
  background-size: cover
  background-repeat: no-repeat
  background-position: center
  background-image: url('../assets/imgs/indexBg.jpg')
  .content
    position: absolute
    top: 15%
    left: 15%
    background-color: rgba(255, 255, 255, 0.8)
    padding: 20px
    @include breakpoint('pad')
      top: 12%
      left: 8%
      padding: 10px
    @include breakpoint('phone')
      top: 10%
      left: 3%
      padding: 5px
    h1
      font-size: 56px
      color: $black
      opacity: 0.8
      margin-bottom: 20px
      border-top: 5px solid $black
      border-bottom: 5px solid $black
      padding: 10px
      @include breakpoint('pad')
        font-size: 52px
      @include breakpoint('phone')
        font-size: 36px
    h3
      opacity: 0.8
      font-size: 28px
      @include breakpoint('pad')
        font-size: 26px
      @include breakpoint('phone')
        font-size: 18px
  .menu
    position: absolute
    display: flex
    top: 10%
    right: 10%
    height: 40%
    flex-direction: column
    text-align: center
    justify-content: space-between
    transition: 0.5s
    @include breakpoint('pad')
      top: 35%
      right: 50%
      transform: translateX(50%)
    li
      transition: 0.5s
      &:hover
        transform: translateX(-10px)
      a
        color: $black
        text-decoration: none
        padding: 15px 30px
        background-color: rgba(255, 255, 255, 0.8)
        transition: 0.5s
        cursor: pointer
        &:hover
          background-color: rgba(255, 255, 255, 1)
  .menu.noShow
    opacity: 0
  .hamburgerMenu
    padding-top: 20px
    padding-right: 20px
    float: right
    .line
      width: 35px
      height: 4px
      border-radius: 4px
      background-color: #fff
      margin-bottom: 8px
      -webkit-transition: all 0.3s ease-in-out
      transition: all 0.3s ease-in-out
  .hamburgerMenu.noShow
    display: none
  .hamburgerMenu.active 
    .line:nth-child(1)
      transform: translateY(12px) rotate(45deg)
    .line:nth-child(2)
      opacity: 0
    .line:nth-child(3)
      transform: translateY(-12px) rotate(-45deg)
  .itemMenu
    @include breakpoint('phone')
      display: none
    button
      width: 80px
      height: 80px
      border-radius: 50%
      outline: none
      border: none
      background-color: $white
      animation: staring 4s infinite alternate
      transition: 0.5s
      @include breakpoint('pad')
        width: 60px
        height: 60px
      //閃爍效果
      @keyframes staring
        0%
          opacity: 0.9
        50%
          opacity: 0.3
        100%
          opacity: 0.9
      //不同按鈕閃爍時間不同
    @for $i from 1 through 5
      .button#{$i}
        animation-delay: -$i*2s
      .pillows
        position: absolute
        top: 70%
        left: 12%
        .tip
          +tipStyle()
          position: absolute
          bottom: 140%
      .pillows:hover .tip
        visibility: visible
      .tables
        position: absolute
        top: 80%
        right: 45%
        .tip
          +tipStyle()
          position: absolute
          right: 125%
      .tables:hover .tip
        visibility: visible
      .cabinets
        position: absolute
        top: 60%
        right: 40%
        .tip
          +tipStyle()
          position: absolute
          bottom: 120%
          right: 30%
      .cabinets:hover .tip
        visibility: visible
      .shelves
        position: absolute
        top: 50%
        right: 25%
        .tip
          +tipStyle()
          position: absolute
          bottom: 110%
          right: 80%
      .shelves:hover .tip
        visibility: visible
      .sofas
        position: absolute
        top: 75%
        right: 20%
        .tip
          +tipStyle()
          position: absolute
          right: 125%
      .sofas:hover .tip
        visibility: visible
    //按鈕hover
    button:hover
      animation-iteration-count: 1
      box-shadow: 0 0 15px 5px #fff
</style>