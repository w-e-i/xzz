<template>
  <mu-popup position="bottom" popupClass="demo-popup-bottom" :open="bottomPopup" class="order-modal">
      <mu-appbar title="用户出金" style="text-align: center">
        <div class="shut_down" @click="close('bottom')" slot="left">
          <i class="iconfont icon-arrow"></i>
        </div>
      </mu-appbar>
      <div class="out_money_content">
        <header class="coldbg" :class="{'hotbg':(money_fee.outmoney_bank[0].name == '中国银行'||money_fee.outmoney_bank[0].name == '中国工商银行'||money_fee.outmoney_bank[0].name == '招商银行'||money_fee.outmoney_bank[0].name == '中信银行'||money_fee.outmoney_bank[0].name == '华夏银行'||money_fee.outmoney_bank[0].name == '长沙银行'||money_fee.outmoney_bank[0].name == '徽商银行'||money_fee.outmoney_bank[0].name == '广发银行'||money_fee.outmoney_bank[0].name == '平安银行')}" v-if="user.bank">
          <p>{{money_fee.outmoney_bank[0].name}}</p>
          <p>{{money_fee.outmoney_bank_card}}</p>
          <i class="iconfont" :class="money_fee.outmoney_bank[0].icon"></i>
          <i class="iconfont" :class="money_fee.outmoney_bank[0].icon"></i>
        </header>
        <header class="ifnone_add_bank" v-else="!user.bank" @click="go_add_bank()">
          <p>+</p>
          <p>添加银行卡</p>
        </header>
        <article>
        <span>
          <i class="iconfont icon--4"></i>
          提现金额：
        </span>
          <input type="number" placeholder="请输入出金金额" v-model="outAmount.outamount" @keydown="only_number()" required/>
        </article>
        <section v-show="money_fee.outmoneymin != '0'">单次提现金额至少{{currency_symbol}}{{money_fee.outmoneymin}}</section>
        <footer>
          余额：<span>{{user.amount.toFixed(2)}}</span>
          手续费：<span v-show="money_fee.outmoney_fee_type == 0">{{money_fee.outmoney_fee}}%</span>
          <span v-show="money_fee.outmoney_fee_type == 1">{{currency_symbol}}{{money_fee.outmoney_fee}}</span>
          实际支付：<span v-show="money_fee.outmoney_fee_type == 0">{{outAmount.outamount>0?(outAmount.outamount*(money_fee.outmoney_fee/100+1)).toFixed(2):0}}</span>
          <span v-show="money_fee.outmoney_fee_type == 1">{{outAmount.outamount>0?outAmount.outamount+money_fee.outmoney_fee:0}}</span>
        </footer>
        <button class="newbutton outmoneybtn" :disabled="outAmount.outamount==''||outAmount.outamount==undefined||(outAmount.outamount<money_fee.outmoneymin)||(user.amount < (money_fee.outmoney_fee_type == 0?outAmount.outamount*(money_fee.outmoney_fee/100+1):outAmount.outamount+money_fee.outmoney_fee))" @click="out_withdraw()">确认出金</button>
        <mu-toast slot="toast" v-if="toast" :message="mes"/>
      </div>
    </mu-popup>
</template>

<script>
    import Bus from '../bus.js';
    export default {
      name: 'capitalWithdrawModal',
      data() {
        return {
          bottomPopup: false,
          toast: false,
          mes: '',
          money_fee: {
            "outmoney_bank_card":"**** **** 68",
            "outmoney_bank":[
              {
                name: '中国银行',
                icon: 'icon-zhongguoyinhang red'
              },
              {
                name: '中国工商银行',
                icon: 'icon-gongshangyinhang red'
              },
              {
                name: '招商银行',
                icon: 'icon-zhaoshangyinhang red'
              },
              {
                name: '中信银行',
                icon: 'icon-zhongxinyinhang red'
              },
              {
                name: '华夏银行',
                icon: 'icon-huaxiayinhang red'
              },
              {
                name: '长沙银行',
                icon: 'icon-04615510 red'
              },
              {
                name: '微商银行',
                icon: 'icon-04403600 red'
              },
              {
                name: '广发银行',
                icon: 'icon-guangfayinxing red'
              },
              {
                name: '平安银行',
                icon: 'icon-pinganyinxing orange'
              }
            ],
            "outmoney_fee_type":"0",
            "outmoney_fee":"12",
            "outmoneymin":"100",
            "outmoneymax":"",
            "inmoney_fee_type":"",
            "inmoney_fee":"",
            "inmoneymin":""
          },
          user: {
            amount: 4895.26,
            bank: false
          },
          outAmount: {
            outamount: ''
          },
          currency_symbol: '$',
        }
      },
      methods: {
        go_add_bank() {
          this.bottomPopup = false;
          Bus.$emit('user_info_modal');
          this.$emit('go_add_bank')
        },
        close (position) {
          this[position + 'Popup'] = false
        },
        only_number() {
          if((event.keyCode<48||event.keyCode>57)&&(event.keyCode<96||event.keyCode>105)&&(event.keyCode!=8)){
            event.preventDefault();
          }
        },
        out_withdraw() {
          this.toast = true;
          this.mes = '出金申请提交成功！';
          if (this.toastTimer) {clearTimeout(this.toastTimer)};
          this.toastTimer = setTimeout(() => { this.toast = false; this.bottomPopup = false  }, 2000)
        }
      },
      mounted() {
        var self = this;
        Bus.$on('change_success',function() {
          self.bottomPopup = true;
          self.user.bank = true
        });
        Bus.$on('show_withdraw_modal',function() {
          self.bottomPopup = true
        })
      }
    }
</script>

<style>
    /* 个人中心资金流水样式 */
.order-modal-header{
	height: 0.3rem;
}
.order-modal-header  .title{
	height: 0.3rem !important;
	line-height: 0.3rem !important;
}
.in_money{
	color:#fa2e42 !important;
}
.out_money{
	color:#1fc65b !important;
}
.other_money{
	color:#159aef;
}
.in_money_bg{
	background-color:#fa2e42;
}
.out_money_bg{
	background-color:#1fc65b;
}
.other_money_bg{
	background-color:#159aef;
}
.person_money_list ul{
	width:100%;
	color: white;

}
.person_money_list ul li{
    margin-top:0.1rem;
    width: 94%;
    margin-left: 3%;
    height: auto;
}
.person_money_list ul li .money_list_header{
    width: 100%;
    height:0.8rem;
    border-radius: 0.1rem;
    box-shadow: 0 0 2px #000000;
    background: #232326;
}
.person_money_list ul li .money_list_header section{
    display: inline-block;
    vertical-align: top;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    height:100%;
}
.money_list_header section:nth-of-type(1){
    width: 2%;
    border-top-left-radius: 0.1rem;
    border-bottom-left-radius: 0.1rem;
}
.money_list_header section:nth-of-type(2){
    width: 60%;
    padding: 0.05rem 0.1rem;
}
.money_list_header section:nth-of-type(2) p {
    margin:0;
    height:0.2rem;
    line-height: 0.2rem;
}
.money_list_header section:nth-of-type(2) p:first-child {
    font-size: 0.15rem;
    height:0.3rem;
    line-height: 0.3rem;
}
.money_list_header section:nth-of-type(2) p i{
	display: inline-block;
	width: 0.12rem;
	height: 0.2rem;
	vertical-align: top;
    font-size: 0.1rem;
    text-align: center;
    line-height: 0.2rem;
    color: #FDBE19;
}
.money_list_header section:nth-of-type(2) p:nth-of-type(2) span{
	vertical-align: top;
	display: inline-block;
	height: 0.2rem;
	line-height: 0.2rem;
}
.money_list_header section:nth-of-type(2) p:nth-of-type(2){
    color: white;
    font-size: 0.14rem;
}
.money_list_header section:nth-of-type(2) p:nth-of-type(3){
    color: #b0b0b0;
    font-size: 0.12rem;
}
.money_list_header section:nth-of-type(3){
    width: 30%;
    line-height: 0.8rem;
    font-size: 0.18rem;
}
.money_list_header section:nth-of-type(4){
    width: 7%;
    font-size: 0.2rem;
    line-height: 0.8rem;
}

.person_money_list ul li article{
    width: 100%;
    background-color: #1e1e21;
    height: 0.4rem;
    padding-top:0.1rem;
}

.person_money_list ul li article p{
    margin: 0 0 0 0.2rem !important;
    height:0.3rem;
    font-size: 0.11rem;
    line-height: 0.14rem;
    color: #737373;
}

/*出金弹窗页面样式*/
.out_money_content{
	background: #1b1b1d;
}
.out_money_content .coldbg{
	color:#14a17d;
	background: -webkit-linear-gradient(right, #1db292 , #009eb7); /* Safari 5.1 - 6.0 */
	background: -o-linear-gradient(right, #1db292 , #009eb7); /* Opera 11.1 - 12.0 */
	background: -moz-linear-gradient(right, #1db292 , #009eb7); /* Firefox 3.6 - 15 */
	background: linear-gradient(to right, #1db292 , #009eb7); /* 标准的语法 */
}
.out_money_content .coldbg i:nth-of-type(2){
	color: #40c1bf;
}
.out_money_content .hotbg{
	color:#e60012;
	background: -webkit-linear-gradient(right, #e2616b , #e64d7b); /* Safari 5.1 - 6.0 */
	background: -o-linear-gradient(right, #e2616b , #e64d7b); /* Opera 11.1 - 12.0 */
	background: -moz-linear-gradient(right, #e2616b , #e64d7b); /* Firefox 3.6 - 15 */
	background: linear-gradient(to right, #e2616b , #e64d7b); /* 标准的语法 */
}
.out_money_content .hotbg i:nth-of-type(2){
	color: #ec6678;
}
.out_money_content .ifnone_add_bank{
	background: #212124;
	background-clip:border ;
	-webkit-background-clip:border ;
	border: 0.02rem #505050 dashed;
}
.out_money_content .ifnone_add_bank p:nth-of-type(1){
	position: static;
	text-align: center;
	width: 100%;
	font-size: 0.8rem;
	height: 0.6rem;
	line-height: 0.6rem;
	color: #505050 ;
}
.out_money_content .ifnone_add_bank p:nth-of-type(2){
	position: static;
	text-align: center;
	width: 100%;
	font-size: 0.13rem;
	color: #505050 ;
}
.out_money_content header{
	width: 96%;
	height: 1rem;
	border-radius:0.1rem ;
	margin: 0.1rem 2% 0.1rem 2%;
	position: relative;
}
.out_money_content header i:nth-of-type(1){
	position: absolute;
	display: block;
	width: 0.55rem;
	height: 0.55rem;
	background: rgba(255,255,255,0.7);
	font-size: 0.4rem;
	top:0.1rem;
	left:0.1rem;
	line-height: 0.55rem;
	text-align: center;
	border-radius:50% ;
	z-index: 1000;
}
.out_money_content header i:nth-of-type(2){
	position: absolute;
	display: block;
	width: 1.2rem;
	height: 1rem;
	font-size: 1.2rem;
	top:0rem;
	right:0.4rem;
	line-height: 1rem;
	text-align: center;
	overflow: hidden;
	z-index: 100;
}
.out_money_content header p:nth-of-type(1){
	height: 0.2rem;
	font-size: 0.15rem;
	line-height: 0.2rem;
	text-align: left;
	position: absolute;
	top:0.1rem;
	left: 0.7rem;
	color: #FFFFFF;
	z-index: 1000;
	margin: 0;
}
.out_money_content header p:nth-of-type(2){
	height: 0.3rem;
	font-size: 0.2rem;
	line-height: 0.3rem;
	text-align: left;
	position: absolute;
	bottom:0.1rem;
	right: 0.1rem;
	color: #FFFFFF;
	z-index: 1000;
	font-weight: 700;
	margin:0;
}
.out_money_content article{
	widows: 100%;
	height: 0.4rem;
	background: #222225;
}
.out_money_content article span{
	display: inline-block;
	vertical-align: top;
	width: 41%;
	font-size: 0.15rem;
	color: #FFFFFF;
	height: 0.3rem;
	margin-top: 0.05rem;
	line-height: 0.3rem;
}
.out_money_content article span i{
	font-size: 0.2rem;
	color: #ebac34;
	margin-left:0.25rem ;
}
.out_money_content article input{
	display: inline-block;
	vertical-align: top;
	width: 56%;
	height: 0.2rem;
	line-height: 0.2rem;
	margin-top:0.1rem ;
	background: transparent;
	border: none;
	color: #fdbe19;
	font-size: 0.12rem;
}
.out_money_content section{
	width: 100%;
	padding-left: 7%;
	text-align: left;
	color: #4e4e4f;
	height: 0.3rem;
	line-height: 0.3rem;
	margin: 0;
	font-size: 0.12rem;
}
.out_money_content footer{
	width: 100%;
	padding-left:0.25rem;
	height: 0.3rem;
	line-height: 0.3rem;
	color: #4e4e4f;
	font-size: 0.12rem;
	text-align: left;
}
.out_money_content footer span{
	display: inline-block;
	width: 15%;
	height: 100%;
	overflow: hidden;
	vertical-align: top;
	color: #fdbe19;
}
.out_money_content footer span:nth-of-type(1){
	color: #4e4e4f;
}
.out_money_content .outmoneybtn{
	width: 70%;
	margin: 0.3rem 15% 0.3rem 15%;
	border: none;
}

</style>
