<template>
  <div class="order-state-panel">
    <div class="panel-header">
      <div>
        {{ qoute.name }}
        <div class="close" @click="toggle_order_state_panel()">
          <i class="material-icons icon-close">close</i>
        </div>
      </div>
    </div>
    <div class="panel-body">
      <div class="success" v-show="order_result.status == 'SUCCESS'">
        <div class="circle_wrapper" v-show="order_params.cycle.time.indexOf('-') == -1">
          <div class="right_circle">
            <img src="../assets/img/right_circle1.png"/>
          </div>
          <div class="left_circle">
            <img src="../assets/img/left_circle1.png"/>
          </div>
        </div>
        <div class="row remaining count_remaining" v-show="order_params.cycle.time.indexOf('-') == -1">
          <div class="col">
            <div>{{ order_result.order.remaining.toFixed(0) }}</div>
            <div>现价</div>
            <div>{{qoute.value.toFixed(qoute.decimal)}}</div>
          </div>
        </div>
        <div class="pupil_success" v-show="order_params.cycle.time.indexOf('-') >= 0">
          <p>交易成功，等待结算</p>
          <p>
            <span>剩余时间：</span>
            {{(((order_result.order.remaining*1000-28800000)/86400000) +'天'+(order_result.order.remaining*1000-28800000))}}
          </p>
        </div>
        <mu-row gutter class="info_list">
          <mu-col width="15" class="first_info">
            <p>方向</p>
            <p :class="{ 'rise' : order_result.order.direction == '1', 'fall': order_result.order.direction == '0' }">{{ order_result.order.direction == "1" ? "买涨" : "买跌" }}</p>
          </mu-col>
          <mu-col width="30">
            <p>金额</p>
            <p>&yen; {{ order_result.order.money }}</p>
          </mu-col>
          <mu-col width="30">
            <p>执行价</p>
            <p>  {{ order_result.order.buyQoute }}</p>
          </mu-col>
          <mu-col width="25" class="last_info">
            <p>预测结果</p>
            <p :class="{'rise' : (order_result.order.direction == '0'  && qoute.value < order_result.order.buyQoute) || (order_result.order.direction == '1' && qoute.value   > order_result.order.buyQoute), 'fall':  (order_result.order.direction == '0' && qoute.value > order_result.order.buyQoute) || (order_result.order.direction == '1' && qoute.value < order_result.order.buyQoute)}">  &yen; {{ (order_result.order.direction == '0'  && qoute.value > order_result.order.buyQoute) || (order_result.order.direction == '1' && qoute.value  < order_result.order.buyQoute)? order_result.order.profit - order_result.order.money: order_result.order.profit + order_result.order.money}}</p>
          </mu-col>
        </mu-row>
      </div>
      <div class="wait" v-show="order_result.status == 'POST'">
        <mu-row gutter>
          <mu-col>
            <i class="material-icons airplane">airplanemode_active</i>
            <span>{{ order_result.message }}</span>
          </mu-col>
        </mu-row>
      </div>
      <div class="fail" v-show="order_result.status == 'FAIL'">
        <mu-row gutter>
          <mu-col>
            <i class="ion-close-circled"></i>
            {{ order_result.message }}
          </mu-col>
        </mu-row>
      </div>
      <div class="success" v-show="order_result.status == 'FINISH'">
        <div class="row remaining finish_remaining">
          <div class="col">
            <div class="result_profit" :class="{'rise' : order_result.order.profit > 0, 'fall':  order_result.order.profit < 0}"> &yen;{{ order_result.order.profit < 0 ? order_result.order.profit : order_result.order.profit + order_result.order.money}}</div>
            <div class="expired_statements">到期结算完成</div>
          </div>
        </div>
        <div class="row info_list">
          <div class="col col-20 first_info">
            <p>方向</p>
            <p :class="{ 'rise' : order_result.order.direction == '1', 'fall': order_result.order.direction == '0' }">{{ order_result.order.direction == "1" ? "买涨" : "买跌" }}</p>
          </div>
          <div class="col col-25">
            <p>金额</p>
            <p>&yen; {{ order_result.order.money }}</p>
          </div>
          <div class="col col-30">
            <p>执行价</p>
            <p>  {{ order_result.order.buyQoute }}</p>
          </div>
          <div class="col col-25 last_info">
            <p>成交价</p>
            <p :class="{'rise' : order_result.order.profit > 0, 'fall':  order_result.order.profit < 0}">  &yen; {{order_result.order.endQoute }}</p>
          </div>
        </div>
      </div>
      <mu-row gutter class="button_row">
        <mu-col>
          <button class="button" @click="continue_order()">继续下单</button>
        </mu-col>
      </mu-row>
    </div>
  </div>
</template>

<script>
  export default{
    name: 'orderStatePanel',
    props: ['s_direction'],
    data() {
      return {
        qoute: {
         name: '黄金/白银',
         state: 'up',
         value: 300,
         decimal: 2
       },
       order_result: {
         status: 'POST',
         message: 'test',
         order: {
           remaining: 62,
           direction:  this.s_direction,
           cycle: '60s',
           money: 1000,
           buyQoute: 121.66,
           message: 'test',
           profit: 850,
           endQoute: 125.56
         }
       },
       order_params: {
           cycle: {
             time: '60'
           }
        }
      }
    },
    methods: {
      toggle_order_state_panel() {
        this.$emit('toggle_order_state_panel')
      },
      continue_order() {
        this.$emit('continue_order')
      }
    },
    mounted: function() {
      var that = this;
      if(this.order_result.status == 'POST') {
        setTimeout(function(){
          that.order_result.status = 'SUCCESS'
        },1000)
        if(this.order_result.order.remaining >0) {
        function countdown() {
          that.order_result.order.remaining -= 1;
          var timer = setTimeout(countdown,1000);
          if(that.order_result.order.remaining <= 0) {
            that.order_result.status = 'POST';
            setTimeout(function(){
              that.order_result.status = 'FINISH';
            },1000);
            clearTimeout(timer);
          }
        }
        countdown();
      }
      }



    }
  }
</script>

<style>
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
    -webkit-animation: run 60s linear;
    -moz-animation: run 60s linear;
    -o-animation: run 60s linear;
    animation: run 60s linear;
}
@-webkit-keyframes run{
	0{
		-webkit-transform: rotate(0);
	}
	50%{
		-webkit-transform: rotate(180deg);
	}
	100% {
		-webkit-transform: rotate(180deg);
	}
}
@-moz-keyframes run{
	0{
		-webkit-transform: rotate(0);
	}
	50%{
		-webkit-transform: rotate(180deg);
	}
	100% {
		-webkit-transform: rotate(180deg);
	}
}
@keyframes run{
	0{
		-webkit-transform: rotate(0);
	}
	50%{
		-webkit-transform: rotate(180deg);
	}
	100% {
		-webkit-transform: rotate(180deg);
	}
}
.left_circle > img {
    width: 100%;
    position: absolute;
    left: 50%;
    animation-fill-mode: forwards;
    -webkit-animation: runaway 60s linear;
    -moz-animation: runaway 60s linear;
    -o-animation: runaway 60s linear;
    animation: runaway 60s linear;
}
@-webkit-keyframes runaway{
	0{
		-webkit-transform: rotate(0);
	}
	50%{
		-webkit-transform: rotate(0);
	}
	100% {
		-webkit-transform: rotate(180deg);
	}
}
@keyframes runaway{
	0{
		-webkit-transform: rotate(0);
	}
	50%{
		-webkit-transform: rotate(0);
	}
	100% {
		-webkit-transform: rotate(180deg);
	}
}
@-moz-keyframes runaway{
	0{
		-webkit-transform: rotate(0);
	}
	50%{
		-webkit-transform: rotate(0);
	}
	100% {
		-webkit-transform: rotate(180deg);
	}
}

.trade .order-state-panel .close {
	line-height: 44px;
	color: #6d6d6d;
	font-size: 28px;
	vertical-align: middle;
}

.trade .order-state-panel .success {
    color: white;
    border-top: 1px solid #2b2930;
}

.trade .order-state-panel .success .pupil_success {
    position: relative;
    height: 150px;
    text-align: center;
    padding-left: 0px !important;
}

.trade .order-state-panel .success .pupil_success p:nth-of-type(1) {
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

.trade .order-state-panel .success .pupil_success p:nth-of-type(2) {
    position: absolute;
    top:60%;
    width: 100%;
    color: #fff;
    font-size: 12px;
    height:15px;
    text-align: center;
}

.trade .order-state-panel .success .pupil_success p:nth-of-type(2) span {
    color: #6d6d6d;
}

.trade .order-state-panel .success .row {
    height: 70px;
    padding-top: 10px !important;
    border-top: 1px solid #333235;
}

.trade .order-state-panel .success .row .col {
    height: 30px;
}

.trade .order-state-panel .success .info_list .col {
    height: 40px;
    border-right: 1px solid #000;
    border-left: 1px solid #333235;
}

.trade .order-state-panel .success .info_list > div:nth-of-type(1) {
    width: 20%;
}

.trade .order-state-panel .success .info_list > div:nth-of-type(2) {
    width: 25%;
}

.trade .order-state-panel .success .info_list > div:nth-of-type(3) {
    width: 30%;
}

.trade .order-state-panel .success .info_list > div:nth-of-type(4) {
    width: 25%;
}

.trade .order-state-panel .success .info_list .first_info {
    border-left: 0;
}

.trade .order-state-panel .success .info_list .last_info {
    border-right: 0;
}

.trade .order-state-panel .success .row .col > p:nth-child(1) {
    font-size: 12px;
    color: #6d6d6d;
    text-align: center;
    margin-bottom: 0;
    margin-top: 0;
}

.trade .order-state-panel .success .row .col > p:nth-child(2) {
    font-size: 14px;
    color: #fff;
    text-align: center;
    margin-top: 0;
}

.trade .order-state-panel .success .remaining {
    position: relative;
    height: 138px;
    border-bottom: 1px solid #000;
}

.trade .order-state-panel .success .count_remaining {
	margin-top: -128px !important;
}

.trade .order-state-panel .success .remaining > div >div:nth-of-type(1) {
    font-size: 40px;
    color: #fdbe19;
    text-align: center;
    margin-top: 10px;
    height: 20px;
}

.trade .order-state-panel .success .remaining > div >div:nth-of-type(2) {
    font-size: 12px;
    color: #6d6d6d;
    text-align: center;
    margin-top: 27px;
}

.trade .order-state-panel .success .remaining > div >div:nth-of-type(3) {
    font-size: 14px;
    color: #fa2e42;
    text-align: center;
}

.trade .order-state-panel .success .finish_remaining > div >div:nth-of-type(1) {
    height: auto;
}

.trade .order-state-panel .success .finish_remaining .result_profit {
    margin-top: 0 !important;
    height: 105px;
    line-height: 105px;
}

.trade .order-state-panel .success .finish_remaining .expired_statements {
    margin-top: -30px !important;
}


.trade .order-state-panel .success .remaining > .col {
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

.trade .order-state-panel .success .remaining > .col > img {
    width: 100px;
}

.trade .order-state-panel .wait .row {
    height: 150px;
    line-height: 150px;
}

.trade .order-state-panel .wait .row .col {
    color: white;
    font-size: 20px;
    text-align: center;
    height: 150px;
    line-height: 150px;
    padding-left: 0px !important;
}

.trade .order-state-panel .wait .row .col span {
    font-size: 30px;
}

.trade .order-state-panel .button_row {
	position: absolute;
	bottom: 15px;
	padding-right: 20px !important;
	width: 100%;
}

.trade .order-state-panel .wait .row .col i {
    color: yellow;
    font-size: 25px;
}

.trade .order-state-panel .fail .row .col {
    color: white;
    font-size: 20px;
    text-align: center;
    height: 150px;
    line-height: 150px;
    padding-left: 0px !important;
}

.trade .order-state-panel .fail .row .col i {
    color: red;
    font-size: 25px;
}

.order-confirm-panel  .trade .order-state-panel .button {
    width: 96%;
    color: white;
    margin-left: 2%;
    margin-right: 2%;
    background-color: rgb(255, 91, 45);
}

 .trade .order-state-panel .button {
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

 .trade .order-state-panel.open {
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

.order-state-panel .panel-header > div{
	color: #fdbe19;
    border-bottom: 1px solid #000;
}

.order-confirm-panel .panel-header > div {
    border-bottom: 1px solid #000;
}

.invest_account span{
	text-align: right;
	color: #FF0000;
	display: inline-block;
	width: 78%;
}

.panel-header {
	position: relative;
    font-size: 15px;
    height: 45px;
    line-height: 45px;
    color: white;
    text-align: center;
    background-color: #282828;
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

.panel-body {
	position: absolute;
    top: 45px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    background-color: #1b1a1e;
    border-top: 1px solid #2b2930;
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
    line-height: 35px;
}

.order-panel {
    position: absolute;
    left: 0px;
    right: 0px;
    bottom: -160px;
    height: 181px;
    background-color: rgb(30, 30, 40);
}

</style>
