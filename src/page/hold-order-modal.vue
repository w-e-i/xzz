<template>
    <popupModal>
      <mu-appbar title="持仓明细" slot="header">
        <mu-flat-button slot="right" label="关闭" color="white" @click="close('bottom')"/>
      </mu-appbar>

      <span slot="slot_one_label">商品</span>
      <span slot="slot_one_content">{{ modal_hold_order.assets.name }}</span>

      <span slot="slot_one_label">类型</span>
      <span slot="slot_one_content">{{ modal_hold_order.direction == "0" ? "买跌" : "买涨" }}</span>

      <span slot="slot_one_label">成交价</span>
      <span slot="slot_one_content">{{ modal_hold_order.buyQoute.toFixed(modal_hold_order.qoute.decimal) }}</span>

      <span slot="slot_one_label">现价</span>
      <span slot="slot_one_content">{{ modal_hold_order.qoute.value.toFixed(modal_hold_order.qoute.decimal) }}</span>

      <span slot="slot_one_label">盈亏</span>
      <span slot="slot_one_content" :class="{ 'rise' : modal_hold_order.profit > 0, 'fall': modal_hold_order.profit < 0 }">{{ modal_hold_order.profit.toFixed(2) }}</span>

      <span slot="slot_one_label">手续费</span>
      <span slot="slot_one_content">{{ modal_hold_order.tax }}</span>

      <span slot="slot_one_label">成交时间</span>
      <span slot="slot_one_content">{{ modal_hold_order.created}}</span>

      <span slot="slot_one_label">到期时间</span>
      <span slot="slot_one_content">{{ modal_hold_order.expired}}</span>

      <a class="button button-balanced hide" @click="toggle_close_order_panel()" slot="sell">出售</a>
    </popupModal>
</template>

<script>
  import popupModal from '../components/popup-modal.vue'
  export default{
    name: 'holdOrderModal',
    data () {
      modal_hold_order: {
        tax: '17%',
        created: '2016-12-10 17:50',
        expired: '2016-12-10 17:52',
        assets: {
          name: '黄金/白银',
          direction: '1',
          buyQoute: 124.22,
          profit: 0.5
        },
        qoute: {
          decimal: 2,
          value: 130.43
        }
      }
    },
    componetns: {
      popupModal
    }
  }
</script>

<style>

</style>
