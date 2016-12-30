<template>
  <div class="tab_history">
    <!--<mu-appbar title="交易历史"></mu-appbar>-->
    <header>
      <mu-tabs :value="activeTab" @change="handleTabChange">
        <mu-tab value="持仓明细" title="持仓明细"/>
        <mu-tab value="历史明细" title="历史明细"/>
      </mu-tabs>
    </header>
      <!--持仓明细-->
      <ul v-if="activeTab === '持仓明细'" class="refresh-container">
        <li v-for="o in order_list" @click="show_hold_order_modal();">
          <section>
            <p>
              <span>{{o.assets.name}}</span>
              <span :class="{'in_money':o.direction === 1,'out_money':o.direction === 0}"><i :class="{'buytop':o.direction === 1,'buydown':o.direction === 0}"></i>{{o.direction === 1 ?"买涨":"买跌"}}（¥{{o.money}}）</span>
            </p>
            <p>
              {{o.buyQoute}}-<span :class="{'in_money':o.direction === 1,'out_money':o.direction === 0}">{{ o.qoute.value.toFixed(o.qoute.decimal) }}</span>
            </p>
            <p>{{o.created}}</p>
          </section>
          <section>
            <p style="margin: 0" :class="{'in_money':(o.direction == '0' && o.qoute.value < o.buyQoute) || (o.direction == '1' && o.qoute.value > o.buyQoute) ,'out_money':(o.direction == '1' && o.qoute.value < o.buyQoute) || (o.direction == '0' && o.qoute.value > o.buyQoute)}">{{(o.direction == '0'  && o.qoute.value > o.buyQoute) || (o.direction == '1' && o.qoute.value  < o.buyQoute)? o.profit - o.money: o.profit + o.money}}</p>
            <!--<p style="margin: 0">{{o.remaining*1000-28800000>86400000?(((o.remaining*1000-28800000)/86400000|number:0) +'天'+(o.remaining*1000-28800000|date:'HH:mm:ss')):(o.remaining*1000-28800000|date:'HH:mm:ss')}}</p>-->
          </section>
          <article v-show="o.remaining !== 0">
              <span class="move_width" :style="{'width':o.remaining*100000/o.alltime-2+'%','transition-duration':1+'s'}">
              </span>
            <i>
              <em></em>
            </i>
          </article>
        </li>
      </ul>
       <!--历史明细-->
      <ul v-if="activeTab === '历史明细'" class="refresh-container">
        <li v-for="o in close_order_list" @click="show_close_order_modal();">
          <section>
            <p>
              <span>{{o.assets.name}}</span>
              <span :class="{'in_money':o.profit>0,'out_money':o.profit<0}"><i :class="{'buytop':o.direction === 1,'buydown':o.direction === 0}"></i>{{o.direction === 1 ?"买涨":"买跌"}}（¥{{o.money}}）</span>
            </p>
            <p>
              {{o.buyQoute}}-<span :class="{'in_money':o.profit>0,'out_money':o.profit<0}">{{o.endQoute}}</span>
            </p>
            <p>{{o.created}}</p>
          </section><section>
          <p :class="{'in_money':o.profit>0,'out_money':o.profit<0}">{{o.profit>0?"+"+o.profit:o.profit}}</p>
          <p>{{o.closed}}</p>
        </section>
        </li>
      </ul>
      <holdOrderModal></holdOrderModal>
      <closeOrderModal></closeOrderModal>
  </div>
</template>

<script>
  import holdOrderModal from './hold-order-modal.vue';
  import closeOrderModal from './close-order-modal.vue';
  import Bus from '../bus.js';
  export default {
    name: 'tabHistory',
    data () {
      return {
         activeTab: '持仓明细',
         order_list: [
           {
             assets: {
               name: '石油',
             },
             direction: 1,
             money: 7000,
             buyQoute: 121.33,
             qoute: {
               value: 230,
               demical: 2
             },
             created: '2016-12-22 17:45',
             profit: 100,
             remaining: 60,
             alltime: 100000
           },
           {
             assets: {
               name: '英镑/美元',
             },
             direction: 0,
             money: 4396,
             buyQoute: 145.33,
             qoute: {
               value: 230,
               demical: 2
             },
             created: '2016-12-22 17:45',
             profit: 0,
             remaining: 60,
             alltime: 70000
           }
         ],
         close_order_list: [
           {
             assets: {
               name: '天然气',
             },
             direction: 1,
             money: 7000,
             buyQoute: 117.5905,
             endQoute: 117.5855,
             qoute: {
               value: 230,
               demical: 2
             },
             created: '2016-12-22 17:39',
             closed: '2016-12-22 17:40',
             profit: 100,
             remaining: 60,
             alltime: 120
           },
           {
             assets: {
               name: '石油',
             },
             direction: 0,
             money: 7000,
             buyQoute: 114.5405,
             endQoute: 114.5855,
             qoute: {
               value: 230,
               demical: 2
             },
             created: '2016-12-22 17:39',
             closed: '2016-12-22 17:40',
             profit: -100,
             remaining: 60,
             alltime: 120
           },
           {
             assets: {
               name: '伦敦黄金',
             },
             direction: 0,
             money: 7000,
             buyQoute: 659.5405,
             endQoute: 711.5855,
             qoute: {
               value: 230,
               demical: 2
             },
             created: '2016-12-22 17:39',
             closed: '2016-12-22 17:40',
             profit: -2000,
             remaining: 60,
             alltime: 120
           },
           {
             assets: {
               name: '美元/加元',
             },
             direction: 1,
             money: 7000,
             buyQoute: 147.5795,
             endQoute: 169.5485,
             qoute: {
               value: 230,
               demical: 2
             },
             created: '2016-12-22 17:39',
             closed: '2016-12-22 17:40',
             profit: 4100,
             remaining: 60,
             alltime: 120
           }
         ]
      }
    },
    components: {
      holdOrderModal,closeOrderModal
    },
    methods: {
      handleTabChange (val) {
        this.activeTab = val
      },
      show_hold_order_modal () {
        Bus.$emit('show_hold_order_modal')
      },
      show_close_order_modal() {
        Bus.$emit('show_close_order_modal')
      }
    }
  }
</script>

<style lang="scss">
  /*历史记录页面*/

  .tab_history{
    background: #323232;
    color: #737373;
  }
  .tab_history p{
    margin: 0;
  }
  .tab_history header{
    width: 100%;
    height: 0.35rem;
    background: #282828;
    display: flex;
  }
  .tab_history header article{
    flex: 1;
    height: 100%;
    border-bottom: 1px solid #181818;
  }
  .tab_history header article:nth-of-type(1) p{
    border-right:1px solid #181818 ;
  }
  .tab_history header article p{
    height: 0.23rem;
    margin: 0.06rem 0;
    line-height: 0.23rem;
    text-align: center;
    font-size:0.15rem ;

  }
  .tab_history header article.active{
    color: #f9b729;
    border-bottom: 1px solid #f9b729;
  }

  .tab_history ul{
    width: 100%;
    height: 100%;
    background: #323232;
    list-style: none;
    padding: 0;
    margin: 0;

  }
  .tab_history ul li{
    width: 100%;
    height: 0.73rem;
    border-top:1px solid #404040;
    border-bottom:1px solid #171717;
    color: #FFFFFF;
    background: #282828;
    position: relative;
    display: flex;
  }
  .tab_history ul li article{
    position: absolute;
    z-index: 1000;
    width: 100%;
    height: 0.1rem;
    left: 0;
    bottom: -0.05rem;
    background: transparent;
  }
  .tab_history ul li article i{
    display: inline-block;
    vertical-align: top;
    margin-top:0.02rem ;
    width: 0.06rem;
    height: 0.06rem;
    border-radius:50% ;
    background: #ffe88a;
    box-shadow: 0 0 0.05rem yellow;
    float: right;
  }
  .tab_history ul li article i em{
    display: block;
    width: 0.04rem;
    height: 0.04rem;
    margin:0.01rem ;
    background: #ffffcd;
  }
  .tab_history ul li article span{
    display: inline-block;
    vertical-align: top;
    margin-top:0.05rem ;
    height: 0.02rem;
    background: #159aef;
    float: right;
  }
  .tab_history ul li section{
    display: inline-block;
    vertical-align: top;
    height: 100%;
    height: 0.7rem;
    padding-top: 0.05rem;
    text-align: center;
    float: left;
  }
  .tab_history ul li section:nth-of-type(1){
    width: 60%;
    padding-left: 2%;
  }

  .tab_history ul li section:nth-of-type(1) p{
    height: 0.16rem;
    line-height: 0.16rem;
    text-align: left;
    font-size: 0.12rem;
  }
  .tab_history ul li section:nth-of-type(1) p:nth-of-type(1){
    height: 0.3rem;
    line-height: 0.3rem;
  }
  .tab_history ul li section:nth-of-type(1) p:nth-of-type(1) span:nth-of-type(1){
    display: inline-block;
    vertical-align: top;
    width: 45%;
    height: 100%;
    font-size: 0.16rem;
    overflow: hidden;
    white-space:nowrap;
    text-overflow:ellipsis;
  }
  .tab_history ul li section:nth-of-type(1) p:nth-of-type(1) span:nth-of-type(2){
    font-size:0.12rem ;
  }
  .tab_history ul li section:nth-of-type(1) p:nth-of-type(1) span:nth-of-type(2) i{
    display: inline-block;
    vertical-align: middle;
    margin-right:0.05rem ;
    width: 0.12rem;
    height: 0.12rem;
  }
  .tab_history ul li section:nth-of-type(1) p:nth-of-type(1) span:nth-of-type(2) .buytop{
    background: url(../assets/img/buytop.png);
    background-size:100% 100% ;
  }
  .tab_history ul li section:nth-of-type(1) p:nth-of-type(1) span:nth-of-type(2) .buydown{
    background: url(../assets/img/buydown.png);
    background-size:100% 100% ;
  }
  .tab_history ul li section:nth-of-type(1) p:nth-of-type(3){
    color: #696969;
  }
  .tab_history ul li section:nth-of-type(2) {
    width: 40%;
    padding-right: 2%;
    float: right;
  }
  .tab_history ul li section:nth-of-type(2) p:nth-of-type(1){
    height: 0.35rem;
    line-height: 0.35rem;
    font-size: 0.24rem;
    text-align: right;
  }
  .tab_history ul li section:nth-of-type(2) p:nth-of-type(2){
    height: 0.25rem;
    line-height: 0.25rem;
    font-size: 0.13rem;
    text-align: right;
  }

  .mu-tabs {
    position: absolute;
    top: 0;
  }

</style>
