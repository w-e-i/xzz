<template>
  <mu-popup position="bottom" popupClass="demo-popup-bottom" :open="bottomPopup" class="order-modal">
    <mu-appbar title="资金流水" style="text-align: center">
      <div class="shut_down" @click="close('bottom')" slot="left">
        <i class="iconfont icon-arrow"></i>
      </div>
    </mu-appbar>
    <mu-content-block class="person_money_list">
      <div>
        <mu-refresh-control :refreshing="refreshing" :trigger="trigger" @refresh="refresh"/>
        <ul>
          <li  v-for="c in moneyList" @click="show_money_list_footer(c)">
            <div class="money_list_header">
              <section :class="{'in_money_bg':c.type===1,'out_money_bg':c.type===3,'other_money_bg':c.type!=1&&c.type!=3}">

              </section><section>
              <p :class="{'in_money':c.type===1,'out_money':c.type===3,'other_money':c.type!=1&&c.type!=3}">{{c.typename}}</p>
              <p>
                <i class="iconfont icon--1" v-show="currency_symbol == '¥'"></i>
                <i class="iconfont icon-30" v-show="currency_symbol == '$'"></i>
                <span>{{ c.balance.toFixed(2) }}</span></p>
              <p>
                <i class="iconfont icon--2 pay_blue"></i>
                <span>{{c.yearTime}}</span>
                <span>{{c.dayTime}}</span>
              </p>
              </section>
              <section :class="{'in_money':c.type===1,'out_money':c.type===3,'other_money':c.type!=1&&c.type!=3}">
                {{ c.amount>0?"+"+c.amount: c.amount}}
              </section>
              <section>
                <i class="clickshow iconfont" :class="c.arrow_direction"></i>
              </section>
            </div>
            <article class="today_list_footer" v-show="c.arrow_direction === 'icon-moreunfold'">
              <p>{{ c.remark }}</p>
            </article>
          </li>
        </ul>
        <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore"/>
      </div>
    </mu-content-block>
    <div class="dataChose" style="display: none;">
      <label>开始：</label>
      <input type="date" v-model="choseDate.startDate" required />
      <label>截止：</label>
      <input type="date" v-model="choseDate.overDate" required />
      <button @click="show_money_list()">查询</button>
    </div>
    <div class="button-bar button-class">
      <a class="button button-dark" @click="capital_history_modal_hide()">关闭</a>
    </div>
  </mu-popup>
</template>

<script>
  import Bus from '../bus.js';
  export default {
    name: 'capitalHistoryModal',
    data() {
      return {
         bottomPopup: false,
         currency_symbol: '¥',
         loading: false,
         scroller: null,
         refreshing: false,
         trigger: null,
         choseDate: {
           startDate: '',
           overDate: ''
         },
         moneyList: [
           {
             id: 1,
             remark: '详情：订单到期获利结算',
             yearTime: '2016-12-20',
             dayTime: '14:23:50',
             amount: 3893,
             user: 'admin',
             balance: 1869.365,
             type: 1,
             typename: '结单',
             arrow_direction: 'icon-less'
           },
           {
             id: 1,
             remark: '详情：下单成功',
             yearTime: '2016-12-20',
             dayTime: '14:23:50',
             amount: 3893,
             user: 'admin',
             balance: 1869.365,
             type: 2,
             typename: '下单',
             arrow_direction: 'icon-less'
           },
           {
             id: 1,
             remark: '详情：用户入金申请',
             yearTime: '2016-12-20',
             dayTime: '14:23:50',
             amount: 3893,
             user: 'admin',
             balance: 1869.365,
             type: 3,
             typename: '入金',
             arrow_direction: 'icon-less'
           },
           {
             id: 1,
             remark: '详情：用户出金申请',
             yearTime: '2016-12-20',
             dayTime: '14:23:50',
             amount: 3893,
             user: 'admin',
             balance: 1869.365,
             type: 4,
             typename: '出金',
             arrow_direction: 'icon-less'
           },
           {
             id: 1,
             remark: '详情：订单到期获利结算',
             yearTime: '2016-12-20',
             dayTime: '14:23:50',
             amount: 3893,
             user: 'admin',
             balance: 1869.365,
             type: 1,
             typename: '结单',
             arrow_direction: 'icon-less'
           },
           {
             id: 1,
             remark: '详情：下单成功',
             yearTime: '2016-12-20',
             dayTime: '14:23:50',
             amount: 3893,
             user: 'admin',
             balance: 1869.365,
             type: 2,
             typename: '下单',
             arrow_direction: 'icon-less'
           },
           {
             id: 1,
             remark: '详情：用户入金申请',
             yearTime: '2016-12-20',
             dayTime: '14:23:50',
             amount: 3893,
             user: 'admin',
             balance: 1869.365,
             type: 3,
             typename: '入金',
             arrow_direction: 'icon-less'
           },
           {
             id: 1,
             remark: '详情：用户出金申请',
             yearTime: '2016-12-20',
             dayTime: '14:23:50',
             amount: 3893,
             user: 'admin',
             balance: 1869.365,
             type: 4,
             typename: '出金',
             arrow_direction: 'icon-less'
           },
           {
             id: 1,
             remark: '详情：订单到期获利结算',
             yearTime: '2016-12-20',
             dayTime: '14:23:50',
             amount: 3893,
             user: 'admin',
             balance: 1869.365,
             type: 1,
             typename: '结单',
             arrow_direction: 'icon-less'
           },
           {
             id: 1,
             remark: '详情：下单成功',
             yearTime: '2016-12-20',
             dayTime: '14:23:50',
             amount: 3893,
             user: 'admin',
             balance: 1869.365,
             type: 2,
             typename: '下单',
             arrow_direction: 'icon-less'
           }
         ]
      }
    },
    methods: {
      show_money_list_footer(c) {
        if(c.arrow_direction === 'icon-less') {
          c.arrow_direction = 'icon-moreunfold'
        }else {
          c.arrow_direction = 'icon-less'
        }
        var i;
        for(i in this.moneyList) {
          if(this.moneyList[i] !== c) {
            this.moneyList[i].arrow_direction ='icon-less'
          }
        }
      },
      loadMore() {
        this.loading = true;
        setTimeout(() => {
          alert(456);
          this.loading = false
        }, 2000)
      },
      close (position) {
        this[position + 'Popup'] = false;
      },
      capital_history_modal_hide() {
        this.bottomPopup = false;
      },
      refresh () {
        this.refreshing = true
        setTimeout(() => {
          this.refreshing = false
        }, 2000)
    }
    },
    mounted() {
      this.trigger = this.$el;
      this.scroller = this.$el;
      var self = this;
      Bus.$on('show_money_list',function() {
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
.person_money_list {
  margin-top: 0;
  overflow-y: scroll;
  padding-bottom: 80px;
}
.person_money_list ul{
	width:100%;
	color: white;
  list-style: none;
  padding: 0;
  margin: 0
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
    width: 24%;
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

.demo-popup-bottom .button-bar {
    bottom: 0px;
    left: 0px;
    right: 0px;
    height: 45px;
    line-height: 45px;
    position: absolute;
}

.demo-popup-bottom .button-class .button-dark {
    font-size: 14px;
    height: 45px;
    width: 100%;
    line-height: 45px;
    border: none !important;
    border-radius: 0px 0px 0px 0px;
    background-color: rgb(38, 40, 52);
}
</style>
