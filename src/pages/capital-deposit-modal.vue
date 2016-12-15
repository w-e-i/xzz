<template>
  <mu-popup position="bottom" popupClass="demo-popup-bottom" :open="bottomPopup">
    <mu-appbar title="用户入金" style="text-align: center">
      <div class="shut_down" @click="close('bottom')" slot="left">
        <i class="material-icons icon-arrow">keyboard_arrow_left</i>
      </div>
    </mu-appbar>
    <mu-content-block id="in_money_content">
      <header>
        <div v-show="pay_type_list.indexOf('huichao') != -1">
          <div class="pay_bank_list_header">
            <i class="pay_blue_bg"></i>
            <article>
              <p class="pay_blue"><span class="iconfont icon--19"></span><span>快捷支付</span></p>
              <p><span class="iconfont" :class="inmoneybank.bankmes.icon"></span><span>{{inmoneybank.bankmes.name}}</span></p>
            </article>
          </div>
          <input type="radio" class="radio" name="pay_type" value="'huichao'" :checked="chao_check">
          <!--</div>-->
        </div>

        <div v-show="pay_type_list.indexOf('huanxun') != -1">
          <div class="pay_bank_list_header">
            <i class="pay_blue_bg"></i>
            <article>
              <p class="pay_blue"><span class="iconfont icon--19"></span><span>快捷支付</span></p>
              <p><span class="iconfont" :class="inmoneybank.bankmes.icon"></span><span>{{inmoneybank.bankmes.name}}</span></p>
            </article>
          </div>
          <input type="radio" class="radio" name="pay_type" value="'huanxun'" :checked="xun_check">
        </div>

        <div v-show="pay_type_list.indexOf('ymd') != -1">
          <div class="pay_bank_list_header">
            <i class="pay_blue_bg"></i>
            <article>
              <p class="pay_blue"><span class="iconfont icon--19"></span><span>快捷支付</span></p>
              <p><span class="iconfont" :class="inmoneybank.bankmes.icon"></span><span>{{inmoneybank.bankmes.name}}</span></p>
            </article>
          </div>
          <input type="radio" class="radio" name="pay_type" value="'ymd'" :checked="ymd_check">
        </div>

        <div v-show="pay_type_list.indexOf('zhongyun') != -1">
          <div class="pay_bank_list_header">
            <i class="pay_blue_bg"></i>
            <article>
              <p class="pay_blue"><span class="iconfont icon--19"></span><span>快捷支付</span></p>
              <p><span class="iconfont" :class="inmoneybank.bankmes.icon"></span><span>{{inmoneybank.bankmes.name}}</span></p>
            </article>
          </div>
          <input type="radio" class="radio" name="pay_type" value="'zhongyun'" :checked="yun_check">
        </div>

        <div v-show="pay_type_list.indexOf('zhihui') != -1">
          <div class="pay_bank_list_header">
            <i class="pay_blue_bg"></i>
            <article>
              <p class="pay_blue"><span class="iconfont icon--19"></span><span>快捷支付</span></p>
              <p><span class="iconfont" :class="inmoneybank.bankmes.icon"></span><span>{{inmoneybank.bankmes.name}}</span></p>
            </article>
          </div>
          <input type="radio" class="radio" name="pay_type" value="'zhihui'" :checked="zhi_check">
        </div>

        <div v-show="pay_type_list.indexOf('shangxin') != -1" @click="allrow">
          <div class="pay_bank_list_header">
            <i class="pay_blue_bg"></i>
            <article>
              <p class="pay_blue"><span class="iconfont icon--19"></span><span>快捷支付</span></p>
              <p><span class="iconfont" :class="inmoneybank.bankmes.icon"></span><span>{{inmoneybank.bankmes.name}}</span></p>
            </article>
            <input type="radio" class="radio" name="pay_type" value="'shangxin'" :checked="xin_check">
          </div>

        </div>
        <div v-show="deposit.pay_type == 'huichao' || deposit.pay_type == 'huanxun' ||deposit.pay_type == 'shangxin' && xin_check" class="pay_bank_list_content" >
          <div>
            <ul>
              <li v-for="item in pay_bank_list" @click="trying(item)">
                <!--<div class="kuang"></div>-->
                <div>
                  <p><span class="bankicon iconfont" :class="item.icon"></span><span>{{item.name}}</span></p>
                </div>
                <input type="radio" name="pay_bank_name" class="radio" id="radio" :value="item" :checked="item.status">
              </li>
            </ul>
          </div>
        </div>

        <div class="pay_weixin" v-show="(pay_type_list.indexOf('wechat') != -1)&&iswecat" @click="wechat_pay()">
            <div class="pay_bank_list_header">
              <i class="pay_green_bg"></i>
              <article>
                <p class="pay_green"><span class="iconfont icon-weixin"></span><span>微信支付</span></p>
              </article>
              <input type="radio" class="radio" name="pay_type" :value="'wechat'" :checked="we_check">
            </div>
        </div>

        <div class="pay_weixin" v-show="(pay_type_list.indexOf('weifutong') != -1)&&iswecat">
          <div class="pay_bank_list_header">
            <i class="pay_green_bg"></i>
            <article>
              <p class="pay_green"><span class="iconfont icon-weixin"></span><span>微信支付</span></p>
            </article>
            <input type="radio" class="radio" name="pay_type" :value="'weifutong'" :checked="wei_check">
          </div>
        </div>

        <div class="pay_weixin" v-show="(pay_type_list.indexOf('huanxun_wecat') != -1)&&iswecat">
          <div class="pay_bank_list_header">
            <i class="pay_green_bg"></i>
            <article>
              <p class="pay_green"><span class="iconfont icon-weixin"></span><span>微信支付</span></p>
            </article>
            <input type="radio" class="radio" name="pay_type" :value="'huanxun_wecat'" :checked="huan_check">
          </div>
        </div>

        <div class="pay_weixin" v-show="(pay_type_list.indexOf('zhongyun_wecat') != -1)&&iswecat">
          <div class="pay_bank_list_header">
            <i class="pay_green_bg"></i>
            <article>
              <p class="pay_green"><span class="iconfont icon-weixin"></span><span>微信支付</span></p>
            </article>
            <input type="radio" class="radio" name="pay_type" :value="'zhongyun_wecat'" :checked="zhong_check">
          </div>
        </div>

        <div class="pay_weixin" v-show="(pay_type_list.indexOf('zhihui_wecat') != -1)&&iswecat">
          <div class="pay_bank_list_header">
            <i class="pay_green_bg"></i>
            <article>
              <p class="pay_green"><span class="iconfont icon-weixin"></span><span>微信支付</span></p>
            </article>
            <input type="radio" class="radio" name="pay_type" :value="'zhihui_wecat'" :checked="zhi_check">
          </div>
        </div>

        <div class="pay_weixin" v-show="(pay_type_list.indexOf('alipay') != -1)&&iswecat" @click="ali_pay">
          <div class="pay_bank_list_header">
            <i class="pay_alipay_bg"></i>
            <article>
              <p class="pay_alipay"><span class="iconfont icon-zhifubao"></span><span>支付宝支付</span></p>
            </article>
            <input type="radio" class="radio" name="pay_type" :value="'alipay'" :checked="ali_check">
          </div>
        </div>
      </header>

      <div class="out_money_content">
        <article>
	        	<span>
	        		<i class="iconfont icon--5"></i>
	        		充值金额：
	        	</span>
          <input type="number" placeholder="请输入金额" v-model="deposit.amount" @keydown="only_number()" required/>
        </article>
        <section v-show="money_fee.inmoneymin !='0'">单次充值至少{{currency_symbol}}{{money_fee.inmoneymin}}起</section>
        <footer>
          余额：<span>{{user.amount.toFixed(0)}}</span>
          手续费：<span v-show="money_fee.inmoney_fee_type == 0">{{money_fee.inmoney_fee}}%</span>
          <span v-show="money_fee.inmoney_fee_type == 1">{{currency_symbol}}{{money_fee.inmoney_fee}}</span>
          实际支付：<span v-show="money_fee.inmoney_fee_type == 0">{{deposit.amount>0?(deposit.amount*(money_fee.inmoney_fee/100+1)).toFixed(2):0}}</span>
          <span v-show="money_fee.inmoney_fee_type == 1">{{deposit.amount>0?deposit.amount+money_fee.inmoney_fee:0}}</span>
        </footer>
        <button class="newbutton outmoneybtn" :disabled="deposit.amount==''||deposit.amount==undefined||(deposit.amount<money_fee.inmoneymin)||(deposit.pay_type=='shangxin'&&!inmoneybank.bankmes)" @click="submit_deposit()">确认充值</button>
      </div>
    </mu-content-block>
  </mu-popup>
</template>

<script>
  export default {
    name: 'capitalDepositModal',
    data() {
      return {
        bottomPopup: true,
        iswecat: true,
        we_check: false,
        wei_check: false,
        huan_check: false,
        zhong_check: false,
        zhi_check: false,
        ali_check: false,
        chao_check: false,
        xun_check: false,
        ymd_check: false,
        yun_check: false,
        hui_check: false,
        xin_check: false,
        inmoneybank: {
          bankmes: {
            name: '',
            icon: ''
          }
        },
        deposit: {
          "pay_type": 'shangxin',
          "amount": '',
          "body": 'WECHAT RECHARGE',
          "openid": 'admin',
          "user": 'admin',
        },
        pay_type_list: ['shangxin','wechat','alipay'],
        pay_bank_list: [
            {
            	'name': '工商银行',
            	'HCcode': 'ICBC',
            	'HYcode':'1100',
            	'SXcode':'ICBC',
            	'icon':'icon-gongshangyinhang red',
            	'status': false
            },
            {
            	'name': '农业银行',
            	'HCcode': 'ABC',
            	'HYcode':'1101',
            	'SXcode':'ABC',
            	'icon':'icon-nongyeyinxing1 green',
            	'status': false
            },
            {
            	'name': '招商银行',
            	'HCcode': 'CMBC',
            	'HYcode':'1102',
            	'icon':'icon-zhaoshangyinhang red',
            	'status': false
            },
            {
            	'name': '兴业银行',
            	'HCcode': 'CIB',
            	'HYcode':'1103',
            	'SXcode':'CIB',
            	'icon':'icon-xingyeyinhang blue',
            	'status': false
            },
            {
            	'name': '中信银行',
            	'HCcode': 'ECITIC',
            	'HYcode':'1104',
            	'icon':'icon-zhongxinyinhang red',
            	'status': false
            },
            {
            	'name': '建设银行',
            	'HCcode': 'CCB',
            	'HYcode':'1106',
            	'SXcode':'CCB',
            	'icon':'icon-jiansheyinhang blue',
            	'status': false
            },
            {
            	'name': '中国银行',
            	'HCcode': 'BOC',
            	'HYcode':'1107',
            	'SXcode':'BOC',
            	'icon':'icon-zhongguoyinhang red',
            	'status': false
            },
            {
            	'name': '交通银行',
            	'HCcode': 'BOCOM',
            	'HYcode':'1108',
            	'icon':'icon-jiaotongyinhang pay_purple',
            	'status': false
            },
            {
            	'name': '浦发银行',
            	'HCcode': 'SPDB',
            	'HYcode':'1109',
            	'SXcode':'SPDB',
            	'icon':'icon-pufayinhang pay_blue',
            	'status': false
            },
            {
            	'name': '民生银行',
            	'HCcode': 'CMBCS',
            	'HYcode':'1110',
            	'icon':'icon-minshengyinhang pay_blue',
            	'status': false
            },
            {
            	'name': '华夏银行',
            	'HCcode': 'HXB',
            	'HYcode':'1111',
            	'icon':'icon-huaxiayinhang red',
            	'status': false
            },
            {
            	'name': '光大银行',
            	'HCcode': 'CEEBBANK',
            	'HYcode':'1112',
            	'SXcode':'CEB',
            	'icon':'icon-guangdayinhang pay_yellow',
            	'status': false
            },
            {
            	'name': '广发银行',
            	'HCcode': 'CGB',
            	'HYcode':'1114',
            	'icon':'icon-guangfayinxing red',
            	'status': false
            },
            {
            	'name': '邮政储蓄银行',
            	'HCcode': 'PSBC',
            	'HYcode':'1119',
            	'icon':'icon-youzhengyinhang green',
            	'status': false
            },
            {
            	'name': '平安银行',
            	'HCcode': 'PINGAN',
            	'HYcode':'1121',
            	'SXcode':'SPABANK',
            	'icon':'icon-pinganyinxing orange',
            	'status': false
            },
            {
            	'name': '北京银行',
            	'HYcode':'1113',
            	'icon':'icon-beijingyinhang red',
            	'status': false
            },
            {
            	'name': '南京银行',
            	'HYcode':'1115',
            	'icon':'icon-nanjingyinhang red',
            	'status': false
            },
            {
            	'name': '上海银行',
            	'HYcode':'1116',
            	'icon':'icon-shanghaiyinhang orange',
            	'status': false
            },
            {
            	'name': '杭州银行',
            	'HYcode':'1117',
            	'icon':'icon-hangzhouyinhang pay_qing',
            	'status': false
            },
            {
            	'name': '宁波银行',
            	'HYcode':'1118',
            	'icon':'icon-ningboyinxing orange',
            	'status': false
            },
            {
            	'name': '浙商银行',
            	'HYcode':'1120',
            	'icon':'icon-zheshangyinhang pay_yellow',
            	'status': false
            },
            {
            	'name': '东亚银行',
            	'HYcode':'1122',
            	'icon':'icon-dongyayinhang red',
            	'status': false
            },
            {
            	'name': '渤海银行',
            	'HYcode':'1123',
            	'icon':'icon-bohaiyinhang blue',
            	'status': false
            },
            {
            	'name': '北京农商行',
            	'HYcode':'1124',
            	'icon':'icon-beijingnongshangyinhang red',
            	'status': false
            },
            {
            	'name': '浙江泰隆商业银行',
            	'HYcode':'1127',
            	'icon':'icon-zhejiangtailongshangyeyinhang orange',
            	'status': false
            },
            {
            	'name': '徽商银行',
            	'HCcode':'HSB',
            	'icon':'icon-04403600 red',
            	'status': false
            },
            {
            	'name': '长沙银行',
            	'HCcode':'CSCB',
            	'icon':'icon-04615510 red',
            	'status': false
            },
            {
            	'name': '浙江省农村信用社联合社',
            	'HCcode':'ZJRCC',
            	'icon':'icon-xinyonghezuoshe3 green',
            	'status': false
            }
          ],
          money_fee: {
              "outmoney_bank_card":"",
              "outmoney_bank":"",
              "outmoney_fee_type":"",
              "outmoney_fee":"",
              "outmoneymin":"",
              "outmoneymax":"",
              "inmoney_fee_type":"",
              "inmoney_fee": 12,
              "inmoneymin":""
          },
          currency_symbol: '$',
          user: {
            amount: 117852.59
          }
      }
    },
    methods: {
      trying(item) {
        this.inmoneybank.bankmes.name = item.name;
        this.inmoneybank.bankmes.icon = item.icon;
        this.parent_check = true;
        var x;
        for(x in this.pay_bank_list) {
          this.pay_bank_list[x].status = false
        }
        item.status = true;
      },
      wechat_pay() {
        this.we_check = true;
        this.xin_check = false;
        this.ali_check = false
      },
      allrow() {
        this.xin_check = true;
        this.we_check = false;
        this.ali_check = false
      },
      ali_pay() {
        this.ali_check = true;
        this.xin_check = false;
        this.we_check = false
      },
      only_number() {
        if((event.keyCode<48||event.keyCode>57)&&(event.keyCode<96||event.keyCode>105)&&(event.keyCode!=8)){
            event.preventDefault();
          }
      },
      close (position) {
        this[position + 'Popup'] = false;
        this.$emit('close')
      },
      submit_deposit() {
        this.close()
      }
    },
    mounted() {
      this.xin_check = true;
      this.pay_bank_list[0].status = true
    }
  }
</script>

<style>
.radio {
    color:white;
    display: inline-block;
    vertical-align: middle;
    width: 20px;
    height: 20px;
    -webkit-appearance: none;
    background-color: transparent;
    border: 0;
    outline: 0 !important;
    line-height: 20px;
    color: #d8d8d8;
}
#radio:after {
    position: absolute;
    right: 18px;
    top: 10px;
}
.radio:after {
    content: "";
    text-align: center;
    line-height: 14px;
    font-size: 16px;
    box-sizing:border-box;

    position: absolute;
    width: 0.12rem;
    height: 0.12rem;
    border-radius:2px ;
    border: 1px solid #343438;
    top:0.3rem;
    right: 0.2rem;
    z-index: 100;
}
.radio:checked:after {
    content: "√";
    color: #fdbe19;
    font-size: 0.1rem;
}

/*入金弹框样式*/

.red{
	color: #cc0011 ;
}
.blue{
	color: #1358bd ;
}
.qing{
	color: #19725d ;
}
.green{
	color: #007e3d ;
}
.orange{
	color: orangered ;
}
.pay_blue{
	color: #159aef !important;
}
.pay_green{
	color: #1fc65b !important;
}
.pay_purple{
	color: #1d2087 ;
}
.pay_yellow{
	color: #fbe900 ;
}
.pay_qing{
	color: #00a5d7 ;
}
.pay_blue_bg{
	background: #159aef;
}
.pay_green_bg{
	background: #1fc65b;
}
.pay_alipay_bg{
	background: #00a3ee;
}
.pay_alipay{
	color: #00a3ee !important;
}
.demo-popup-bottom {
  background-color:#1b1b1d;
}

#in_money_content{
	background: #1b1b1d;
	margin-top: 10px;
}
#in_money_content header{
	margin-bottom:0.1rem ;
	margin-top: 0.1rem;
}
#in_money_content header > div {
    width: 96%;
    margin-left: 2%;
    background: #1b1b1d;
    padding: 0;
}

#in_money_content article span i{
	color: #eb3445;
}
#in_money_content .item{
	border: none;
	background: #1b1b1d ;
}
#in_money_content {
	background: #1b1b1d ;
	padding: 0;
}

#in_money_content .pay_bank_list_header{
	border-radius:0.05rem;
	background: #28282b;
	width: 100%;
	height: 0.7rem;
	position: relative;
}
#in_money_content .pay_bank_list_header i{
	display: inline-block;
	vertical-align: top;
	width: 0.05rem;
	height: 0.7rem;
	border-bottom-left-radius:0.05rem;
	border-top-left-radius:0.05rem;
}
#in_money_content .pay_bank_list_header article{
	display: inline-block;
	width: 80%;
	height: 0.7rem;
}
#in_money_content .pay_bank_list_header article p span{
	display: inline-block;
	vertical-align: top;
	height: 0.3rem;
	line-height: 0.3rem;
	text-align: left;
}
#in_money_content .pay_bank_list_header p:nth-of-type(1){
	margin-top:0.05rem;
	font-size:0.15rem;
	height: 0.3rem;
	margin-bottom: 2px;
}
#in_money_content .pay_bank_list_header p:nth-of-type(1) span:nth-of-type(1){
	width:0.5rem;
	font-size: 0.25rem;
	text-align: center;
}
#in_money_content .pay_bank_list_header p:nth-of-type(1) span:nth-of-type(2){
	width: 1rem;
}
#in_money_content .pay_bank_list_header p:nth-of-type(2){
	margin:0;
	font-size:0.12rem;
	height: 0.3rem;
}
#in_money_content .pay_bank_list_header p:nth-of-type(2) span:nth-of-type(1){
	width: 0.5rem;
	text-align: center;
}
#in_money_content .pay_bank_list_header p:nth-of-type(2) span:nth-of-type(2){
	width: 1rem;
	color: #ffffff;
}
#in_money_content .radio-icon{
	padding: 0;
	width: 0.15rem;
	height:0.15rem;
	text-align: center;
	line-height: 0.15rem;
	font-size: 0.1rem;
	top:0.3rem;
	color: #fdbe19;
	right:0.2rem;
	z-index: 1000;
}
.pay_bank_list_content{
	height: 2rem;
	width: 96%;
	margin-left:2% ;
	background: #222225;
	border-bottom-left-radius: 0.05rem;
	border-bottom-right-radius: 0.05rem;
}
#in_money_content .pay_bank_list_content {
	width: 100%;
	margin: 0;
	overflow-y: auto;
}
#in_money_content .pay_bank_list_content > div {
    height: 100%;
    width: 96%;
    margin-left: 2%;
}
#in_money_content .pay_bank_list_content ul{
	width: 98%;
	margin: 0;
	margin-left: 1%;
	background: #222225;
	border-bottom-left-radius:0.03rem ;
	border-bottom-right-radius:0.03rem ;
	list-style: none;
	padding: 0;
}
#in_money_content .pay_bank_list_content ul li{
	margin-left:3% ;
	height: 0.32rem;
	width: 94%;
	border-bottom:1px solid #343438 ;
	margin-bottom: 2px;
	position: relative;
}
#in_money_content .pay_bank_list_content ul li {
	background: #222225;
}
#in_money_content .pay_bank_list_content ul li .item-radio .radio-icon{
	top:0.11rem;
	right: 0.21rem;
}
#in_money_content .pay_bank_list_content ul li p{
	font-size: 0.13rem;
	margin-bottom: 0;
}
#in_money_content .pay_bank_list_content ul li p span{
	display: inline-block;
	height: 0.3rem;
	line-height: 0.3rem;
	vertical-align: top;
	font-size: 0.13rem;
	width: 2rem;
}
#in_money_content .pay_bank_list_content ul li p span:nth-of-type(2) {
  color: #666;
}
#in_money_content .pay_bank_list_content ul li p span:nth-of-type{
	color: #aaaaaa;
}
#in_money_content .pay_bank_list_content ul li p .bankicon{
	width: 0.4rem;
	text-align: center;
}
#in_money_content .pay_weixin{
	margin-top:0.1rem ;
}
#in_money_content .pay_weixin  article p{
	height: 0.7rem !important;
	line-height: 0.7rem !important;
	margin: 0 !important;
	font-size: 0.15rem !important;
}
#in_money_content .pay_weixin  article p span{
	height: 0.7rem !important;
	line-height: 0.7rem !important;
}
.pay_bank_list_header .kuang{
	position: absolute;
	width: 0.15rem;
	height: 0.15rem;
	border-radius:3px ;
	border: 1px solid #343438;
	top:0.3rem;
	right: 0.13rem;
	z-index: 100;
}
#in_money_content .pay_bank_list_content ul li .kuang{
	position: absolute;
	width: 0.12rem;
	height: 0.12rem;
	border-radius:2px ;
	border: 1px solid #343438;
	top:0.1rem;
	right: 0.2rem;
	z-index: 100;
}
#in_money_content .pay_bank_list_content ul li .item-radio .radio-icon{
	font-size: 0.08rem;
	width: 0.12rem;
	height: 0.12rem;
	line-height: 0.12rem;
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
	width: 34%;
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
	width: 60%;
	height: 0.2rem;
	line-height: 0.2rem;
	margin-top:0.1rem ;
	background: transparent;
	border: none;
	color: #fdbe19;
	font-size: 0.12rem;
	padding-top: 2px;
	outline: none
}
.out_money_content article input::-webkit-input-placeholder {
  color: #fff;
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
button:disabled {
  background: #515151;
}

.newbutton {
  height: 0.4rem;
  border-radius: 0.05rem;
  background: #fdbe19;
  color: #000000;
  line-height: 0.4rem;
  text-align: center;
  font-size: 0.15rem;
  border: none;
}

</style>
