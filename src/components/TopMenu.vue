<template lang="pug">
.topBar
  ul.topMenu
    .title(:class="{'noShow': !titleShow}")
      router-link(to='/' ) 好置家居
    li.menu(:class="{'noShow': !menuShow}")
      router-link(to='/about' @click.native="linkActive = 'link1'" :class="{active: linkActive == 'link1'}") 關於我們
    li.menu(:class="{'noShow': !menuShow}")
      router-link(to='/products' @click.native="linkActive = 'link2'" :class="{active: linkActive == 'link2'}") 所有商品
    li.menu(:class="{'noShow': !menuShow}")
      router-link(to='/works' @click.native="linkActive = 'link3'" :class="{active: linkActive == 'link3'}") 好置作品
    li.menu(:class="{'noShow': !menuShow}")
      router-link(to='/login' @click.native="linkActive = 'link4'" :class="{active: linkActive == 'link4'}") 後臺登入
    .hamburgerMenu(:class="{'noShow': !hamburgerShow, 'active': hamburgerActive}" @click="showMenu")
      .line
      .line
      .line
</template>

<script>
export default {
  name: "TopMenu",
  data() {
    return {
      hamburgerShow: false,
      hamburgerActive: false,
      menuShow: true,
      titleShow: true,
      linkActive: ''
    };
  },
  created() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  methods: {
    handleResize() {
      let vm = this;
      vm.windowWidth = window.innerWidth;
      if (vm.windowWidth < 576) {
        vm.hamburgerShow = true;
        vm.menuShow = false;
      }
    },
    showMenu() {
      this.hamburgerActive = !this.hamburgerActive;
      this.menuShow = !this.menuShow;
      this.titleShow = !this.titleShow;
    }
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
$light-brown: #D2B48C
$deep-brown: #A0522D
$black: #000
$white: #fff

@mixin breakpoint($device)
  @if $device == 'pad'
    @media only screen and (max-width: 768px)
      @content
  @if $device == 'phone'
    @media only screen and (max-width: 480px)
      @content

.topBar
  width: 100%
  height: 80px
  line-height: 80px
  +breakpoint('pad')
    height: 65px
    line-height: 65px
  .topMenu
    width: 100%
    background-color: $light-brown
    display: flex
    a
      color: $white
      text-decoration: none
      border-left: 0.5px solid $white
      border-right: 0.5px solid $white
      padding: 5px 10px
      transition: 0.5s
    a:hover,a.active
      border-radius: 10px
      background-color: $deep-brown
      border-left: 0.5px solid $deep-brown
      border-right: 0.5px solid $deep-brown
      +breakpoint('phone')
        border: none
        padding: 0
    .title
      font-size: 36px
      margin-right: auto
      margin-left: 5%
      +breakpoint('pad')
        font-size: 32px
        margin-left: 3%
      +breakpoint('phone')
        font-size: 24px
    .title.noShow
      display: none
    li
      margin-right: 3%
      font-size: 18px
      +breakpoint('pad')
        font-size: 16px
        margin-right: 1.5%
      +breakpoint('phone')
        margin-right: auto
        margin-left: 2%
    li.noShow
      display: none
    li:last-child
      margin-right: 8%
      +breakpoint('pad')
        margin-right: 3%
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
</style>
