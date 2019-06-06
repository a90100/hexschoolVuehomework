<template lang="pug">
#main
  table.table
    thead
      tr
        th 訂購者姓名
        th 訂購者資訊
        th 購買品項
        th 應付金額
        th 訂購日期
        th(width="100") 是否付款
    tbody
      tr(v-for="(item, key) in orders" :key="key")
        td {{ item.user.name }}
        td Email: {{ item.user.email }} <br><br> 電話: {{ item.user.tel }}
        td
          p(v-for="product in item.products") {{ product.product.title }} {{ product.product.num }} {{ product.product.unit }}
        td {{ item.total | currency}} 元
        td {{ item.create_at }}
        td.text-danger(v-if="!item.is_paid") 尚未付款
        td.text-success(v-if="item.is_paid") 已付款
</template>

<script>
export default {
  name: "DashboardOrders",
  data() {
    return {
      orders: [],
      ordersProduct: []
    }
  },
  methods: {
    getOrders() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${
        process.env.VUE_APP_MY
      }/admin/orders`;

      this.$http.get(api).then(response => {
        console.log(response.data.orders);
        vm.orders = response.data.orders;
      });
    }
  },
  created() {
    this.getOrders();
  }
}
</script>

<style lang="sass">
#main
  table
    p
      margin-bottom: 10px
</style>