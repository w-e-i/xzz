<template>
  <popupModal :action="close_action">
    <mu-appbar title="历史明细" slot="header" style="text-align: center">
      <div class="shut_down" @click="closedown()" slot="left">
        <i class="iconfont icon-close"></i>
      </div>
    </mu-appbar>

    <span slot="slot_one_label">商品</span>
    <span slot="slot_one_content">{{ modal_close_order.assets.name }}</span>

    <span slot="slot_two_label">类型</span>
    <span slot="slot_two_content">{{ modal_close_order.direction == "0" ? "买跌" : "买涨" }}</span>

    <span slot="slot_three_label">成交价</span>
    <span slot="slot_three_content">{{ modal_close_order.buyQoute.toFixed(modal_close_order.assets.decimal) }}</span>

    <span slot="slot_four_label">结算价</span>
    <span slot="slot_four_content">{{ modal_close_order.endQoute.toFixed(modal_close_order.assets.decimal) }}</span>

    <span slot="slot_five_label">手续费</span>
    <span slot="slot_five_content">{{ modal_close_order.tax }}</span>

    <span slot="slot_six_label">盈亏</span>
    <span slot="slot_six_content" :class="{ 'rise' : modal_close_order.profit >= 0, 'fall' : modal_close_order.profit < 0 }">{{ modal_close_order.profit.toFixed(2) }}</span>

    <span slot="slot_seven_label">成交时间</span>
    <span slot="slot_seven_content">{{ modal_close_order.created}}</span>

    <span slot="slot_eight_label">结算时间</span>
    <span slot="slot_eight_content">{{ modal_close_order.expired}}</span>

    <a class="button button-dark" @click="closedown()" slot="shutdown">关闭</a>
  </popupModal>
</template>

<script>
  import popupModal from '../components/popup-modal.vue';
  import Bus from '../bus.js';
  export default{
    name: 'closeOrderModal',
    data () {
      return {
        close_action: false,
        modal_close_order: {
          direction: 1,
          buyQoute: 115.67,
          endQoute: 120.956,
          profit: 0.5,
          tax: '17%',
          created: '2016-12-10 17:50',
          expired: '2016-12-10 17:52',
          assets: {
            name: '黄金/白银',
            direction: '1',
            buyQoute: 124.22,
            decimal: 2
          }
        }
      }
    },
    components: {
      popupModal
    },
    methods: {
      closedown() {
        this.close_action = false
      }
    },
    mounted() {
      var self = this;
      Bus.$on('show_close_order_modal',function() {
        self.close_action = true
      })
    }
  }
</script>

<style scoped>
.mu-content-block .button-bar .button-dark {
  width: 100%;
}
</style>
