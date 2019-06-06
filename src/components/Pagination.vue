<template lang="pug">
ul.pagination
  li.page-item(:class="{'disabled': !Pages.has_pre}")
    a.page-link(href='#', aria-label='Previous' @click.prevent="getPage(Pages.current_page - 1)")
      span(aria-hidden='true') «
  li.page-item(v-for="page in Pages.total_pages" :key="page")
    a.page-link(href='#' @click.prevent="getPage(page)" :class="{'active': Pages.current_page == page}") {{ page }}
  li.page-item(:class="{'disabled': !Pages.has_next}")
    a.page-link(href='#', aria-label='Next' @click.prevent="getPage(Pages.current_page + 1)")
      span(aria-hidden='true') »
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    Pages: {
      type: Object
    }
  },
  methods: {
    getPage(page) {
      this.$emit('callProducts', page);
    }
  }
}
</script>

<style lang="sass" scoped>
$light-green: #96f28c
$green: #42b54e
$deep-green: #2b7f33
$white: #fff

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
</style>
