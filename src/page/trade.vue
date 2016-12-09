<template>
  <div class="trade">
    <!--<ion-nav-buttons side="left">-->
      <!--<a href="#/tab/qoute" class="back-button">-->
        <!--<i class="icon ion-ios-arrow-left"></i>-->
      <!--</a>-->
    <!--</ion-nav-buttons>-->

    <div class="trade-qoute-header">
      <mu-row gutter>
        <mu-col width="40">
          <mu-row gutter>
            <mu-col width="100">
              <h1 class="main-qoute" :class="{ 'rise' : qoute.state == 'up', 'fall' : qoute.state == 'down' }">
                {{ qoute.value.toFixed(qoute.decimal) }}
              </h1>
            </mu-col>
          </mu-row>
        </mu-col>
        <mu-col width="60">
          <mu-row gutter>
            <mu-col class="qoute-widget" width="33">
              <span class="qoute-widget-title">最低</span>
              <span class="qoute-widget-value" :class="{ 'rise' : qoute.state == 'up', 'fall' : qoute.state == 'down' }">
                              {{ qoute.low.toFixed(qoute.decimal) }}
              </span>
            </mu-col>
            <mu-col class="qoute-widget" width="33">
              <span class="qoute-widget-title">最高</span>
              <span class="qoute-widget-value" :class="{ 'rise' : qoute.state == 'up', 'fall' : qoute.state == 'down' }">
                              {{ qoute.high.toFixed(qoute.decimal) }}
              </span>
            </mu-col>
            <mu-col class="qoute-widget" width="33">
              <span class="qoute-widget-title">开盘</span>
              <span class="qoute-widget-value" :class="{ 'rise' : qoute.state == 'up', 'fall' : qoute.state == 'down' }">
                              {{ qoute.open.toFixed(qoute.decimal) }}
              </span>
            </mu-col>
          </mu-row>
        </mu-col>
      </mu-row>
    </div>
    <div class="trade-chart">
      <div class="trade-chart-bar">
        <mu-row gutter>
          <mu-col width="12.5">
            <span class="trade-chart-type stock active" @click="change_chart_type('stock')">K线</span>
          </mu-col>
          <mu-col width="12.5">
            <span class="trade-chart-type line" @click="change_chart_type('line')">走势</span>
          </mu-col>
          <mu-col width="12.5">
            <span class="trade-chart-period m1 active" @click="change_chart_period('m1')">M1</span>
          </mu-col>
          <mu-col width="12.5">
            <span class="trade-chart-period m5" @click="change_chart_period('m5')">M5</span>
          </mu-col>
          <mu-col width="12.5">
            <span class="trade-chart-period m15" @click="change_chart_period('m15')">M15</span>
          </mu-col>
          <mu-col width="12.5">
            <span class="trade-chart-period m30" @click="change_chart_period('m30')">M30</span>
          </mu-col>
          <mu-col width="12.5">
            <span class="trade-chart-period h1" @click="change_chart_period('h1')">H1</span>
          </mu-col>
          <mu-col width="12.5">
            <span class="trade-chart-period d1" @click="change_chart_period('d1')">D1</span>
          </mu-col>
        </mu-row>
      </div>

      <!--<div class="trade-chart">-->
        <!--<ng-echarts ec-config="chart_config"  ec-option="chart_option" class="history-chart"></ng-echarts>-->
        <!--<div class="chart-tip">-->
          <!--<ul>-->
            <!--<li class="history-time">{{ history_qoute.datetime.split(" ")[1] }}</li>-->
            <!--<li class="history-open">{{ history_qoute.open.toFixed(qoute.decimal) }}</li>-->
            <!--<li class="history-close">{{ history_qoute.close.toFixed(qoute.decimal) }}</li>-->
            <!--<li class="history-high">{{ history_qoute.high.toFixed(qoute.decimal) }}</li>-->
            <!--<li class="history-low">{{ history_qoute.low.toFixed(qoute.decimal) }}</li>-->
          <!--</ul>-->
        <!--</div>-->
        <!--<div class="func-tip">-->
          <!--<ul>-->
            <!--<li class="history-time">DIFF:{{ diff[diff.length - 1].toFixed(4) }}</li>-->
            <!--<li class="history-open">DEA:{{ dea[dea.length - 1].toFixed(4) }}</li>-->
            <!--<li class="history-close">MACD:{{ macd[macd.length - 1].toFixed(4) }}</li>-->
          <!--</ul>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->

    <div class="bar bar-footer trade-footer">
      <mu-row gutter>
        <mu-col width="33">
          <button class="button trade-panel-button" @click="toggle_history_order_panel()">
            <i class="icon--14 iconfont"></i>
            <span class="nav-name">持仓</span>
            <span class="badge badge-assertive">{{ order_list.length }}</span>
          </button>
        </mu-col>
        <mu-col width="33">
          <button class="button trade-lookup-button" @click="toggle_order_confirm_panel('lookup')">
            <i class="iconfont icon--18"></i>
            <span class="nav-name">买涨</span>
          </button>
        </mu-col>
        <mu-col width="33">
          <button class="button trade-lookdown-button" @click="toggle_order_confirm_panel('lookdown')">
            <i class="iconfont icon--17"></i>
            <span class="nav-name">买跌</span>
          </button>
        </mu-col>
      </mu-row>
    </div>
    <!--<div ng-include="'templates/order-confirm-panel.html'"></div>-->
    <!--<div ng-include="'templates/order-state-panel.html'"></div>-->
    <!--<div ng-include="'templates/history-order-panel.html'"></div>-->
    <transition name="popup">
      <history-order-panel v-if="show_history" @toggle_history_order_panel="toggle()"></history-order-panel>
    </transition>
    <order-confirm-panel v-if="show_confirm" @toggle_order_confirm_panel="toggle_confirm()" @order="toggle_state()" :k_direction="buy_direction"></order-confirm-panel>
    <order-state-panel v-if="show_state" :s_direction="buy_direction" @toggle_order_state_panel="toggle_order_state()" @continue_order="continue_buy"></order-state-panel>
  </div>


</template>

<script>
  import HistoryOrderPanel from '../page/history-order-panel.vue';
  import OrderConfirmPanel from '../page/order-confirm-panel.vue';
  import OrderStatePanel from '../page/order-state-panel.vue';
  export default{
    name: 'trade',
    data() {
      return {
        show_history: false,
        show_confirm: false,
        show_state: false,
        buy_direction: '',
        qoute: {
          state: 'up',
          decimal: 4,
          low: 100.6859,
          high: 125.2268,
          value: 144.1157,
          open: 78.2294
        },
        order_list: [1,2,3,4,5,6]
      }
    },
    components: {
      HistoryOrderPanel,OrderConfirmPanel,OrderStatePanel
    },
    methods: {
      toggle_history_order_panel() {
        this.show_history = !this.show_history
      },
      toggle() {
        this.show_history = !this.show_history
      },
      toggle_confirm() {
        this.show_confirm = !this.show_confirm
      },
      toggle_order_confirm_panel(direction) {
        if(this.show_history) {
          this.show_history = !this.show_history
        };
        this.show_confirm = !this.show_confirm;
        this.buy_direction = direction == 'lookup' ? '1' : '0';
      },
      toggle_state() {
        this.show_state = !this.show_state;
        this.show_confirm = !this.show_confirm
      },
      toggle_order_state() {
        if(this.show_state) {
          this.show_state = !this.show_state
        }
      },
      continue_buy() {
        this.show_state = !this.show_state;
        this.show_confirm = !this.show_confirm;
      }
    }
  }
</script>

<style lang="scss">
  /* 交易页面CSS */
.trade-qoute-header {
    padding: 0px;
    color: white;
    height: 80px;
    line-height: 80px;
    background-color: rgb(33, 33, 37);
}

.trade-content .row,
.trade-content .row .col {
    margin: 0px;
    padding: 0px;
    height: 80px;
}

.main-qoute {
    color: red;
    margin: 0px;
    font-size: 30px;
    height: 80px;
    line-height: 80px;
    width: 150px;
    text-align: center;
    color: #ffffff;
}

.row_price{
    float: left;
    margin-top: 10px !important;
}

.qoute-widget {
    text-align: center;
    padding: 15px 0px !important;
}

.qoute-widget .qoute-widget-title {
    display: block;
    height: 25px;
    line-height: 25px;
    font-size: 14px !important;
    text-align: left;
    color: rgb(89, 89, 90);
}

.qoute-widget .qoute-widget-value {
    display: block;
    height: 25px;
    line-height: 25px;
    font-size: 16px !important;
    text-align: left;
}

.row_padding {
    padding: 0 10px !important;
}

.row_buy > div {
    font-size: 20px;
    line-height: 40px;
    height: 40px;
    text-align: center;
}

.row_buy > div:nth-of-type(1){
    background-color: rgba(255, 0, 0, 0.8);
    color: #fff;
}

.row_buy > div:nth-of-type(2){
    border: 1px solid rgba(255, 0, 0, 1);
    margin: 0 2.5% !important;
}

.row_buy > div:nth-of-type(3){
    background-color: rgba(0, 255, 0, 0.8);
    color: #fff;
}

.rise {
  color: red !important;
}
.index_scroll {
    width: 585px;
    padding-left: 10px;
    margin-bottom: 10px;
}

.index_scroll ul {
    border:1px solid #ccc;
    border-right: 0;
}

.index_scroll,.index_scroll ul {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    height: 25px;
    line-height: 25px;
}

.index_scroll li {
    float: left;
    color: #fff;
}

.index_scroll a {
    display: inline-block;
    padding: 0 5px;
    border-right: 1px solid #ccc;
    color: #CCCCCC;
    text-decoration: none;
}

.index_ul > li.active a{
    color: #fff;
}

.trade-chart .trade-chart-bar {
    padding: 0px;
    height: 35px;
    line-height: 35px;
    margin-top: 0px !important;
    background-color: rgb(29, 29, 33);
}

.trade-chart .trade-chart-bar .row,
.trade-chart .trade-chart-bar .col {
    height: 35px;
    line-height: 35px;
}

.trade-chart .trade-chart-bar .trade-chart-type {
    margin-top: 3px;
    height: 29px;
    line-height: 29px;
    font-size: 14px;
    text-align: center;
    color: rgb(203, 204, 211);
    display: block;
    width: 100%;
}

.trade-chart .trade-chart-bar .trade-chart-type.active {
    font-weight: bold;
    border-radius: 6px;
    color: rgb(230, 176, 63);
    background-color: rgb(44, 44, 50);
}

.trade-chart .trade-chart-bar .trade-chart-period {
    margin-top: 3px;
    height: 29px;
    line-height: 29px;
    font-size: 14px;
    text-align: center;
    color: rgb(203, 204, 211);
    display: block;
    width: 100%;
}

.trade-chart .trade-chart-bar .trade-chart-period.active {
    font-weight: bold;
    color: rgb(230, 176, 63);
    border-bottom: 1px solid rgb(230, 176, 63);
}

.trade-chart {
    width: 100%;
    height: 440px;
    position: relative;
}

.trade-chart .history-chart {
    position: absolute;
    left: 0px;
    right: 0px;
    top: 0px;
    height: 440px;
}

.trade-chart .chart-tip {
    position: absolute;
    left: 5px;
    top: 5px;
    color: white;
}

.trade-chart .func-tip {
    position: absolute;
    left: 5px;
    top: 340px;
    color: white;
}

.trade-chart .chart-tip > ul > li {
    float: left;
    margin-right: 5px;
    font-size: 12px;
}

.trade-chart .func-tip > ul > li {
    float: left;
    margin-right: 5px;
    font-size: 12px;
}

.trade-chart .history-open {
    color: red;
}

.trade-chart .history-close {
    color: blue;
}

.trade-chart .history-high {
    color: green;
}

.trade-chart .history-low {
    color: yellow;
}

.trade-footer {
    padding: 0px;
    border: none;
    height: 60px;
    background-image: none;
    background-color: rgb(46, 49, 58);
    position: fixed;
    bottom: 0;
    width: 100%
}

.trade-footer .row {
    height: 60px;
    padding: 0px;
    margin: 0px;
}

.trade-footer .row .col {
    padding: 0px;
    margin: 0px;
    height: 60px;
    line-height: 32px;
    text-align: center;
    flex-grow: 1;
}

.trade-footer .row .col .button {
    width: 100%;
    height: 60px;
    border:none;
    font-size: 12px;
    border-radius: 0px;
    padding-top: 5px;
    color: rgb(203, 204, 211);
    background-color: rgb(46, 49, 58);
    border-right: 1px solid rgba(15, 15, 30, 0.3) !important;
}

.trade-footer .row .col .button i {
    display: block;
    font-size: 23px;
    height: 23px;
}

.trade-footer .row .col .button .nav-name {
    font-size: 16px;
}

.trade-footer .trade-lookup-button {
		font-family: "微软雅黑" !important;
    background: #d8404f !important;
    color: #242424 !important;
    font-size: 12px !important;
}

.trade-footer .trade-lookdown-button {
		font-family: "微软雅黑" !important;
    background: #1ec55b !important;
    color: #242424 !important;
    font-size: 12px !important;
}

.trade-view .history-panel {
    position: absolute;
    top: 100%;
    left: 0px;
    right: 0px;
    bottom: 100%;
    background-color: rgb(30, 30, 40);

    -moz-box-shadow:2px 2px 5px #333333;
    -webkit-box-shadow:2px 2px 5px #333333;
    box-shadow:2px 2px 5px #333333;
}

.trade-view .history-panel.open {
    top: 250px;
    bottom: 44px;
    -webkit-transition: top 300ms ease-out;
    -moz-transition: top 300ms ease-out;
    -ms-transition: top 300ms ease-out;
    -o-transition: top 300ms ease-out;
    transition: top 300ms ease-out;
}

.trade-view .order-confirm-panel {
    display: none;
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

.trade-view .order-confirm-panel.open {
    display: block;
}

.trade-view .order-confirm-panel .period {
    width: 100%;
    height: 130px;
    padding: 10px 5px 0px 10px;
    overflow: hidden;
    border-top: 1px solid #2b2930;
}

.trade-view .order-confirm-panel .period .scroll {
    width: 100%;
    height: 100%;
}

.trade-view .order-confirm-panel .period .period-widget-view {
    width: 2000px;
}

.period-widget {
    height: 85px;
    width: 90px;
    float: left;
    padding: 5px;
    margin-right: 10px;
    background-image: url(../assets/img/clock.png);
    background-size: contain;
    background-color: #2c2d31;
    border-radius: 5px;
    box-sizing: border-box;
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

.trade-view .order-confirm-panel .amount {
    width: 100%;
    height: 70px;
    padding: 2px 5px 0px 10px;
    overflow: hidden;
}

.trade-view .order-confirm-panel .amount .scroll-view {
    width: 75%;
    margin-right: 5px;
    height: 50px;
    float: left;
}

.trade-view .order-confirm-panel .amount .scroll {
    width: 100%;
    height: 50px;
    float: left;
}

.trade-view .order-confirm-panel .period .period-widget-view {
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

.trade-view .order-confirm-panel .amount .amount-view {
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
    padding-left: 10px;
    padding-right: 10px;
    text-align: center;
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
}

.trade-view .order-state-panel {
    display: none;
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

/*历史记录页面动画*/
.history-panel {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 375px;
  margin-bottom: -65px;
  z-index: -1;
}

.popup-enter,.popup-leave-active  {
 margin-bottom: -550px;
}

.popup-enter-active,.popup-leave-active  {
  transition: all .3s ease;
}

/*倒计时圆形进度条*/
.circle_wrapper {
	position: relative;
	left: 0;
	right: 0;
	top: 5px;
	bottom: 120px;
	margin: auto;
	width: 110px;
	height: 127px;
	box-sizing: content-box;
}

.right_circle,.left_circle {
	position: absolute;
    width: 110px;
    height: 110px;
    overflow: hidden;
    top: 8px;
}
.right_circle {
    right: -50%;
}
.left_circle {
	left: -50%;
}
.right_circle > img {
    width: 100%;
    position: absolute;
    right: 50%;
    animation-fill-mode: forwards;

}
@keyframes run{
	0{
		transform: rotate(0);
	}
	50%{
		transform: rotate(180deg);
	}
	100% {
		transform: rotate(180deg);
	}
}
.left_circle > img {
    width: 100%;
    position: absolute;
    left: 50%;
    animation-fill-mode: forwards;
}
@keyframes runaway{
	0{
		transform: rotate(0);
	}
	50%{
		transform: rotate(0);
	}
	100% {
		transform: rotate(180deg);
	}
}

.trade-view .order-state-panel .close {
	line-height: 44px;
	color: #6d6d6d;
	font-size: 28px;
	vertical-align: middle;
}

.trade-view .order-state-panel .success {
    color: white;
    border-top: 1px solid #2b2930;
}

.trade-view .order-state-panel .success .pupil_success {
    position: relative;
    height: 150px;
    text-align: center;
    padding-left: 0px !important;
}

.trade-view .order-state-panel .success .pupil_success p:nth-of-type(1) {
    position: absolute;
    top:0;
    bottom:0;
    left:0;
    right:0;
    margin:auto;
    color: #fdbe19;
    font-size: 18px;
    height:20px;
}

.trade-view .order-state-panel .success .pupil_success p:nth-of-type(2) {
    position: absolute;
    top:60%;
    width: 100%;
    color: #fff;
    font-size: 12px;
    height:15px;
    text-align: center;
}

.trade-view .order-state-panel .success .pupil_success p:nth-of-type(2) span {
    color: #6d6d6d;
}

.trade-view .order-state-panel .success .row {
    height: 70px;
    padding-top: 10px !important;
    border-top: 1px solid #333235;
}

.trade-view .order-state-panel .success .row .col {
    height: 30px;
}

.trade-view .order-state-panel .success .info_list .col {
    height: 40px;
    border-right: 1px solid #000;
    border-left: 1px solid #333235;
}

.trade-view .order-state-panel .success .info_list .first_info {
    border-left: 0;
}

.trade-view .order-state-panel .success .info_list .last_info {
    border-right: 0;
}

.trade-view .order-state-panel .success .row .col > p:nth-child(1) {
    font-size: 12px;
    color: #6d6d6d;
    text-align: center;
    margin-bottom: 0;
}

.trade-view .order-state-panel .success .row .col > p:nth-child(2) {
    font-size: 14px;
    color: #fff;
    text-align: center;
}

.trade-view .order-state-panel .success .remaining {
    position: relative;
    height: 138px;
    border-bottom: 1px solid #000;
}

.trade-view .order-state-panel .success .count_remaining {
	margin-top: -128px !important;
}

.trade-view .order-state-panel .success .remaining > div >div:nth-of-type(1) {
    font-size: 40px;
    color: #fdbe19;
    text-align: center;
    margin-top: 19px;
}

.trade-view .order-state-panel .success .remaining > div >div:nth-of-type(2) {
    font-size: 12px;
    color: #6d6d6d;
    text-align: center;
    margin-top: 16px;
}

.trade-view .order-state-panel .success .remaining > div >div:nth-of-type(3) {
    font-size: 14px;
    color: #fa2e42;
    text-align: center;
}

.trade-view .order-state-panel .success .finish_remaining .result_profit {
    margin-top: 0 !important;
    height: 105px;
    line-height: 105px;
}

.trade-view .order-state-panel .success .finish_remaining .expired_statements {
    margin-top: -30px !important;
}


.trade-view .order-state-panel .success .remaining > .col {
    color: red;
    font-size: 40px;
    text-align: center;
    height: 105px;
    padding-left: 0px !important;
    position: absolute;
    top:0;
    bottom:0;
    left:0;
    right:0;
    margin: auto !important;
}

.trade-view .order-state-panel .success .remaining > .col > img {
    width: 100px;
}

.trade-view .order-state-panel .wait .row {
    height: 150px;
    line-height: 150px;
}

.trade-view .order-state-panel .wait .row .col {
    color: white;
    font-size: 20px;
    text-align: center;
    height: 150px;
    line-height: 150px;
    padding-left: 0px !important;
}

.trade-view .order-state-panel .button_row {
	position: absolute;
	bottom: 15px;
	padding-right: 20px !important;
}

.trade-view .order-state-panel .wait .row .col i {
    color: yellow;
    font-size: 25px;
}

.trade-view .order-state-panel .fail .row .col {
    color: white;
    font-size: 20px;
    text-align: center;
    height: 150px;
    line-height: 150px;
    padding-left: 0px !important;
}

.trade-view .order-state-panel .fail .row .col i {
    color: red;
    font-size: 25px;
}

.order-confirm-panel  .trade-view .order-state-panel .button {
    width: 96%;
    color: white;
    margin-left: 2%;
    margin-right: 2%;
    background-color: rgb(255, 91, 45);
}

 .trade-view .order-state-panel .button {
    width: 100%;
    height: 40px;
    min-height: 0;
    line-height: 40px;
    font-size: 15px;
    font-family: "microsoft yahei";
    color: #000000;
    background-color: #fdbe19;
    left: 0;
 }

 /*毛玻璃效果*/
.glass_mask {
    position: fixed;
    width: 100%;
    height: 100%;
    background: -webkit-linear-gradient(left top, rgba(255, 177, 0, 0.49), rgba(0, 161, 255, 0.76));
    background: -moz-linear-gradient(left top, rgba(255, 177, 0, 0.49), rgba(0, 161, 255, 0.76));
    background: linear-gradient(left top, rgba(255, 177, 0, 0.49), rgba(0, 161, 255, 0.76));
    z-index: 20;
    display: block;
}
</style>
