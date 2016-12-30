<template>
  <div class="order-confirm-panel">
    <div class="panel-header">
      <div>
        订单确认
        <div class="close" @click="toggle_order_confirm_panel()">
          <i class="iconfont icon-close"></i>
        </div>
      </div>
    </div>
    <div class="panel-body">
      <div class="period">
        <p class="end_time">到期时间</p>
        <div class="scrollfield">
          <div class="period-widget-view">
            <div class="period-widget" :class="{ 'active' : order_params.cycle == c , 'hover' : c.time.indexOf('-') >= 0}" v-for="c in trade.cycle" @click="change_cycle(c)">
              <div class="period-widget-header">
                结算时间
              </div>
              <div class="period-widget-content" :class="{'active' : c.time.indexOf('-') >= 0}">
                <span v-show="c.time<1000" class="final_time">{{ c.time }}</span>
                <span v-show="c.time<3600&&c.time>=1000" class="final_time">{{ c.time/60 }}</span>
                <span v-show="c.time>=3600" class="final_time">{{ c.time/3600 }}</span>
                <span v-show="c.time<1000" class="final_unit">秒</span>
                <span v-show="c.time<3600&&c.time>=1000" class="final_unit">分钟</span>
                <span v-show="c.time>=3600" class="final_unit">小时</span>
                <span v-show="c.time.indexOf('-') >= 0">{{c.time}}</span>
              </div>
              <div class="period-widget-footer period_footer">
                收益  {{ c.inprice * 100 }}%
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="amount">
        <p class="invest_account">
          投资金额
          <span v-show="((order_params.other_amount == '' || order_params.other_amount == '0') ? order_params.amount : order_params.other_amount) > user.amount" >投资金额余额不足，请充值！</span>
          <span v-show="order_params.other_amount > trade_money.max_money/10 && user.amount > trade_money.max_money" >单笔投资金额不超过{{trade_money.max_money}}</span>
          <span v-show="order_params.other_amount < trade_money.min_money && order_params.other_amount != ''" >单笔投资金额不少于{{trade_money.min_money}}</span>
        </p>
        <div class="scroll_area">
          <div class="amount-view">
            <div class="amount-box" :class="{ 'active' : (order_params.other_amount == '' || order_params.other_amount == '0') &&a == order_params.amount }"
                 v-for="a in trade.amounts" @click="change_amount(a)">
              &yen;{{ a }}
            </div>
          </div>
        </div>
        <label class="other-amount">
          <input type="number" placeholder="其他金额" v-model="order_params.other_amount" :keydown="min_money()"/>
        </label>
      </div>
      <div class="info-view">
        <div>余额:  &yen; {{ user.amount.toFixed(2) }}</div>
        <div>手续费： {{boundage * 100 }}%</div>
      </div>
      <div class="order-detail-view">
        <div class="order-detail">
          <mu-row gutter class="fields">
            <mu-col width="25">名称</mu-col>
            <mu-col width="25">方向</mu-col>
            <mu-col width="25">现价</mu-col>
            <mu-col width="25">金额</mu-col>
          </mu-row>
          <mu-row gutter>
            <mu-col width="25" class="qoute_name">{{ qoute.name }}</mu-col>
            <mu-col width="25" :class="{ 'rise' : order_params.direction == '1', 'fall': order_params.direction == '0' }">{{ order_params.direction == "1" ? "买涨" : "买跌" }}</mu-col>
            <mu-col width="25" :class="{ 'rise' : qoute.state == 'up', 'fall' : qoute.state == 'down' }">{{ qoute.value.toFixed(qoute.decimal) }}</mu-col>
            <mu-col width="25" id="money"> &yen;{{ (order_params.other_amount == "" || order_params.other_amount == "0") ? order_params.amount : order_params.other_amount }}</mu-col>
          </mu-row>
          <mu-row gutter class="btn_confirm">
            <mu-col>
              <button class="button" @click="order()">确认下单</button>
            </mu-col>
          </mu-row>
          <p class="expect_profit">
            <span>预期收益 :  &yen; {{ (order_params.other_amount == "" || order_params.other_amount == "0") ? (order_params.amount * order_params.cycle.inprice + order_params.amount) : (order_params.other_amount * order_params.cycle.inprice + order_params.other_amount).toFixed(2) }}</span>
            &nbsp;&nbsp;
            <span>保底金额 :  &yen; {{ (order_params.amount * order_params.cycle.outprice).toFixed(2) }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
     name: 'orderConfirmPanel',
     props: ['show_confirm','k_direction'],
     data () {
       return {
         boundage: 0.17,
         trade: {
           amounts: [100,500,1000,2000,5000],
           cycle: [
             {
               time: '30',
               inprice: 0.85,
               outprice: 0.05
             },
             {
               time: '60',
               inprice: 0.85,
               outprice: 0.05
             },
             {
               time: '120',
               inprice: 0.85,
               outprice: 0.05
             },
             {
               time: '180',
               inprice: 0.85,
               outprice: 0.05
             },
             {
               time: '300',
               inprice: 0.85,
               outprice: 0.05
             }
           ]
         },
         user: {
           amount: 20000
         },
         order_params: {
           amount: '',
           other_amount: '',
           direction: this.k_direction,
           cycle: {}
         },
         trade_money: {
           min_money: 10,
           max_money: 5000
         },
         qoute: {
           name: '黄金/白银',
           state: 'up',
           value: 300,
           decimal: 2
         }
       }
     },
     methods: {
       min_money () {
        if((this.order_params.other_amount>500)&&(event.keyCode!=8)) {
            event.preventDefault()
         }
       },
       change_cycle (c) {
         this.order_params.cycle = c
       },
       change_amount (a) {
         this.order_params.amount = a;
         this.order_params.other_amount = "";
       },
       toggle_order_confirm_panel () {
         this.$emit('toggle_order_confirm_panel')
       },
       order () {
         this.$emit('order');
       }
     },
     mounted: function() {
       this.order_params.cycle = this.trade.cycle[0];
       this.order_params.amount = this.trade.amounts[0];
     }
  }
</script>

<style>
   .trade .order-confirm-panel {
    position: absolute;
    width: 90%;
    top: 50%;
    left: 50%;
    margin-left: -45%;
    height: 424px;
    margin-top: -212px;
    background-color: #1b1a1e;
    border: 1px solid #585352;
    border-radius: 10px;
    z-index: 20;
}

.trade .order-confirm-panel.open {
    display: block;
}

.order-confirm-panel .panel-header,.order-state-panel .panel-header {
    position: relative;
    font-size: 15px;
    height: 45px;
    line-height: 45px;
    color: white;
    text-align: center;
    background-color: #1b1a1e;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    width: 100%;
    padding: 0 10px;
    font-family: "microsoft yahei";
}

.panel-header .close {
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    width: 40px;
    font-size: 25px;
    text-align: center;
    cursor: pointer;
    line-height: 45px;
}

.panel-header .icon-close {
    font-size: 18px;
 }

.order-confirm-panel .panel-body,.order-state-panel .panel-body {
    position: absolute;
    top: 45px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    background-color: #1b1a1e;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    border-top: 0;
    border-bottom: 1px solid #000;
    width: 100%;
    padding: 0 10px;
    margin-top: 1px;
    background-image: url(../assets/img/back_logo.png);
    background-size: 150px;
    background-position: bottom right;
    background-repeat: no-repeat;
}

.end_time,.invest_account {
	color: #6D6D6D;
	margin-top: 0;
	text-align: left;
}

.end_time,.invest_account,.info-view > div {
	font-size: 12px;
	color: #6D6D6D;
	font-family: "microsoft yahei";
}

.order-confirm-panel .period_footer {
    background-color: #232227;
    width: 100%;
    margin-top: 3px;
    height: 23px;
    line-height: 23px;
    background-image: url(../assets/img/profit_logo.png);
    background-repeat: no-repeat;
    background-size: 12px;
    background-position: 5px;
}

.trade .order-confirm-panel .period {
    width: 100%;
    height: 130px;
    padding: 10px 5px 0px 10px;
    overflow: hidden;
    border-top: 1px solid #2b2930;
}

.trade .order-confirm-panel .period .scrollfield,.trade .order-confirm-panel .amount .scroll_area {
    overflow-x: scroll;
}

.trade .order-confirm-panel .amount .scroll_area {
    width: 75%;
    margin-right: 5px;
    height: 50px;
    float: left;
}

.trade .order-confirm-panel .period .scroll {
    width: 100%;
    height: 100%;
}

.trade .order-confirm-panel .period .period-widget-view {
    width: 2000px;
}

.rise {
    color: red !important;
}

.fall {
    color: green !important;
}

.period-widget {
    height: 85px;
    width: 90px;
    float: left;
    padding: 0;
    padding-top: 5px;
    margin-right: 10px;
    background-image: url(../assets/img/clock.png);
    background-size: contain;
    background-color: #2c2d31;
    border-radius: 5px;
    box-sizing: border-box;
    overflow: hidden;
}

.period-widget.active {
    border: 1px solid #fdbe19;
    background-image: url(../assets/img/sele.png);
    background-size: contain;
    background-position: right top;
    background-repeat: no-repeat;
}

.period-widget.hover {
    width: 100px;
}

.trade .order-confirm-panel .amount {
    width: 100%;
    height: 70px;
    padding: 2px 5px 0px 10px;
    overflow: hidden;
}

.trade .order-confirm-panel .amount .scroll-view {
    width: 75%;
    margin-right: 5px;
    height: 50px;
    float: left;
}

.trade .order-confirm-panel .amount .scroll {
    width: 100%;
    height: 50px;
    float: left;
}

.trade .order-confirm-panel .period .period-widget-view {
    width: 2000px;
}

.amount-box {
    font-size: 12px;
    color: white;
    height: 30px;
    line-height: 30px;
    float: left;
    padding: 0px 8px;
    text-align: center;
    margin-right: 5px;
    background-color: #38373e;
    border-radius: 3px;
}


.amount-box.active {
    border: 1px solid #fdbe19;
    background-image: url(../assets/img/selection.png);
    background-size: 15px;
    background-position: right top;
    background-repeat: no-repeat;
    color: #fdbe19;
}

.trade .order-confirm-panel .amount .amount-view {
    width: 2000px;
}

.period-widget-header {
    font-size: 12px;
    color: #6d6d6d;
    height: 20px;
    line-height: 20px;
    text-align: center;
}

.period-widget-content {
    font-size: 15px;
    text-align: center;
    color: #e1ab32;
    height: 34px;
    line-height: 34px;
    padding-right: 5px;
}

.period-widget-content.active {
    line-height: 17px;
}

.period-widget-content > .final_unit {
    font-size: 15px;
    color: #e1ab32;
}

.period-widget-content > .final_time {
	font-size: 28px;
    font-weight: bold;
    color: #fdbe19;
}

.period-widget-footer {
    font-size: 14px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    color: #fa2e42;
}

.info-view {
    padding-left: 10px;
    padding-right: 10px;
    color: white;
    width: 100%;
    display: table;
}

.info-view div {
    display: table-cell;
    text-align: left;
}

.order-detail-view {
    width: 100%;
    height: 125px;
    clear: both;
    padding: 5px;
    color: white;
}

.order-detail-view .order-detail {
    height: 100%;
    width: 100%;
    border-top: 1px solid #333235;
}

.order-detail-view .order-detail .row {
    height: 30px;
    line-height: 30px;
}

.fields  > div{
	color: #6d6d6d;
	font-size: 12px;
}

.fields {
	margin-top: 5px !important;
	height: 24px !important;
	line-height: 24px !important;
}

.order-detail-view .order-detail .row > div {
	font-size: 14px;
  text-align: center;
  padding: 0;
}

.order-detail-view .order-detail .row > .qoute_name {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}

#money {
	color: #fdbe19;
}

.order-detail-view .order-detail .row:last-child > div {
    padding-left: 10px;
    padding-right: 10px;
    text-align: center;
}

.button {
    border-color: transparent;
    background-color: #f8f8f8;
    color: #444;
    position: relative;
    display: inline-block;
    margin: 0;
    padding: 0 12px;
    min-width: 52px;
    min-height: 47px;
    border-width: 1px;
    border-style: solid;
    border-radius: 4px;
    vertical-align: top;
    text-align: center;
    text-overflow: ellipsis;
    font-size: 16px;
    line-height: 42px;
    cursor: pointer;
}

.order-detail-view .button {
    width: 90%;
    color: #000000;
    background-color: #fdbe19;
    min-height: 0;
    height: 40px;
    font-size: 15px;
   line-height: 40px;
   font-family: "microsoft yahei";
}

.btn_confirm {
	margin-top: 12px !important;

}

.expect_profit {
    color: #fdbe19;
	width: 90%;
	margin: 0 auto;
	text-align: center;
	margin-top: 15px;
	font-size: 12px;
}

.other-amount {
    width: 22%;
    float: left;
    height: 29px;
}

.other-amount.active {
    border: 1px solid #fdbe19;
    border-radius: 3px;
    overflow: hidden;
}

.other-amount input {
    color: white !important;
    width: 100%;
    font-size: 12px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    background-color: #38373e;
    border-radius: 3px;
    border: 0;
}

.trade .order-state-panel {
    position: absolute;
    width: 90%;
    top: 50%;
    left: 50%;
    margin-left: -45%;
    height: 310px;
    margin-top: -155px;
    background-color: #1b1a1e;
    border-radius: 10px;
    z-index: 20;
}

label {
    font-weight: normal;
    font-size: 14px;
    line-height: 1.42857;
}
</style>
