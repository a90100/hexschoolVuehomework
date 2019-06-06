<template lang="pug">
#app
  transition(name="fade")
    router-view(to="/")
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="sass">
@import "./assets/all"
@import url('https://fonts.googleapis.com/css?family=Noto+Sans+TC&display=swap')

#app
  font-family: 'Noto Sans TC', sans-serif
  .fade-enter-active, .fade-leave-active
    transition-duration: 0.8s
    transition-property: opacity
  .fade-enter, .fade-leave-active
    opacity: 0
</style>
