<template lang="pug">
router-link(to='/cart')
  p {{ Orders }}
  img.cart(src="../assets/imgs/cart.svg")
</template>

<script>
export default {
  name: 'CartIcon',
  props: {
    Orders: {
      type: Number
    }
  },
  methods: {
    getOrders() {
      this.$emit('getOrders', Orders);
    }
  }
}
</script>

<style lang="sass" scoped>
a
  position: fixed
  width: 80px
  height: 80px
  bottom: 20px
  right: 20px
  cursor: pointer
  transition: 0.5s
  &:hover
    width: 90px
    height: 90px
    bottom: 25px
    right: 25px
  p
    text-decoration: none
    position: absolute
    top: 5px
    left: 10px
    color: #fff
    background-color: red
    padding: 8px
    border-radius: 50%
</style>
