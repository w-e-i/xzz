<template>
    <popupModal :action="hold_action">
      <mu-appbar title="持仓明细" slot="header" style="text-align: center">
        <div class="shut_down" @click="closedown()" slot="left">
          <i class="iconfont icon-close"></i>
        </div>
      </mu-appbar>

      <span slot="slot_one_label">商品</span>
      <span slot="slot_one_content">{{ modal_hold_order.assets.name }}</span>

      <span slot="slot_two_label">类型</span>
      <span slot="slot_two_content">{{ modal_hold_order.direction == "0" ? "买跌" : "买涨" }}</span>

      <span slot="slot_three_label">成交价</span>
      <span slot="slot_three_content">{{ modal_hold_order.buyQoute.toFixed(modal_hold_order.qoute.decimal) }}</span>

      <span slot="slot_four_label">现价</span>
      <span slot="slot_four_content">{{ modal_hold_order.qoute.value.toFixed(modal_hold_order.qoute.decimal) }}</span>

      <span slot="slot_five_label">盈亏</span>
      <span slot="slot_five_content" :class="{ 'rise' : modal_hold_order.profit > 0, 'fall': modal_hold_order.profit < 0 }">{{ modal_hold_order.profit.toFixed(2) }}</span>

      <span slot="slot_six_label">手续费</span>
      <span slot="slot_six_content">{{ modal_hold_order.tax }}</span>

      <span slot="slot_seven_label">成交时间</span>
      <span slot="slot_seven_content">{{ modal_hold_order.created}}</span>

      <span slot="slot_eight_label">到期时间</span>
      <span slot="slot_eight_content">{{ modal_hold_order.expired}}</span>

      <a class="button button-balanced hide" @click="toggle_close_order_panel()" slot="sell">出售</a>
      <a class="button button-dark" @click="closedown()" slot="shutdown">关闭</a>
    </popupModal>
</template>

<script>
  import popupModal from '../components/popup-modal.vue';
  import Bus from '../bus.js';
  export default{
    name: 'holdOrderModal',
    data () {
      return {
        hold_action: false,
        modal_hold_order: {
          direction: 1,
          buyQoute: 115.67,
          profit: 0.5,
          tax: '17%',
          created: '2016-12-10 17:50',
          expired: '2016-12-10 17:52',
          assets: {
            name: '黄金/白银',
            direction: '1',
            buyQoute: 124.22,
          },
          qoute: {
            decimal: 2,
            value: 130.43
          }
        }
      }
    },
     methods: {
      closedown() {
        this.hold_action = false
      }
    },
    components: {
      popupModal
    },
    mounted() {
      var self = this;
      Bus.$on('show_hold_order_modal',function() {
        self.hold_action = true
      })
    }
  }
</script>

<style scoped>

</style>
