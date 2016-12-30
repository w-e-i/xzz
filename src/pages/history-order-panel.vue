<template>
  <div class="history-panel">
    <div class="panel-header">
      持仓明细
      <div class="close" @click="toggle_history_order_panel()">
        <i class="iconfont icon-close"></i>
      </div>
    </div>
    <div class="trade_history_list">
      <!--<ion-refresher pulling-text="上拉刷新数据" on-refresh="refresh_order()">-->
      <!--</ion-refresher>-->
      <ul>
        <li v-for="o in trade_order_list" @click="show_hold_order_modal(o);">
          <section>
            <p style="margin: 0">
              <span>{{o.assets.name}}</span>
              <span :class="{'in_money':o.direction === 1,'out_money':o.direction === 0}"><i :class="{'buytop':o.direction === 1,'buydown':o.direction === 0}"></i>{{o.direction === 1 ?"买涨":"买跌"}}（¥{{o.money}}）</span>
            </p>
            <p style="margin: 0">
              {{o.buyQoute}}-<span :class="{'in_money':o.direction === 1,'out_money':o.direction === 0}">{{ o.qoute.value.toFixed(o.qoute.decimal) }}</span>
            </p>
            <p style="margin: 0">{{o.created}}</p>
          </section><section>
          <p style="margin: 0" :class="{'in_money':(o.direction == '0' && o.qoute.value < o.buyQoute) || (o.direction == '1' && o.qoute.value > o.buyQoute) ,'out_money':(o.direction == '1' && o.qoute.value < o.buyQoute) || (o.direction == '0' && o.qoute.value > o.buyQoute)}">{{(o.direction == '0'  && o.qoute.value > o.buyQoute) || (o.direction == '1' && o.qoute.value  < o.buyQoute)? o.profit - o.money: o.profit + o.money}}</p>
          <p style="margin: 0">{{o.remaining*1000-28800000>86400000?(((o.remaining*1000-28800000)/86400000) +'天'+(o.remaining*1000-28800000)):(o.remaining*1000-28800000)}}</p>
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
      <!--<ion-infinite-scroll ng-if="has_more_order" on-infinite="load_more_order()" distance="1%">-->
      <!--</ion-infinite-scroll>-->
    </div>
  </div>
</template>

<script>
  export default{
    name: 'historyOrderPanel',
    props: ['show_history'],
    data () {
      return {
        trade_order_list: [
          {
            assets: {
              name: '黄金/白银'
            },
            direction: 1,
            money: 120,
            buyQoute: 114,
            qoute: {
              value: 110.559,
              decimal: 2
            },
            created: '2016-12-22 18:09',
            profit: 180,
            remaining: 10,
            alltime: 90000
          }
        ]
      }
    },
    methods: {
      toggle_history_order_panel () {
        this.$emit('toggle_history_order_panel')
      }
    }
  }
</script>

<style scoped>
/*历史记录页面*/

.history-panel{
  background: #323232;
  color: #737373;
}
.history-panel p{
  margin: 0;
}
.history-panel header{
  width: 100%;
  height: 0.35rem;
  background: #282828;
  display: flex;
}
.history-panel header article{
  flex: 1;
  height: 100%;
  border-bottom: 1px solid #181818;
}
.history-panel header article:nth-of-type(1) p{
  border-right:1px solid #181818 ;
}
.history-panel header article p{
  height: 0.23rem;
  margin: 0.06rem 0;
  line-height: 0.23rem;
  text-align: center;
  font-size:0.15rem ;

}
.history-panel header article.active{
  color: #f9b729;
  border-bottom: 1px solid #f9b729;
}

.history-panel ul{
  width: 100%;
  height: 100%;
  background: #323232;
  list-style: none;
  padding: 0;
  margin: 0;

}
.history-panel ul li{
  width: 100%;
  height: 0.73rem;
  border-top:1px solid #404040;
  border-bottom:1px solid #171717;
  color: #FFFFFF;
  background: #282828;
  position: relative;
  display: flex;
}
.history-panel ul li article{
  position: absolute;
  z-index: 1000;
  width: 100%;
  height: 0.1rem;
  left: 0;
  bottom: -0.05rem;
  background: transparent;
}
.history-panel ul li article i{
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
.history-panel ul li article i em{
  display: block;
  width: 0.04rem;
  height: 0.04rem;
  margin:0.01rem ;
  background: #ffffcd;
}
.history-panel ul li article span{
  display: inline-block;
  vertical-align: top;
  margin-top:0.05rem ;
  height: 0.02rem;
  background: #159aef;
  float: right;
}
.history-panel ul li section{
  display: inline-block;
  vertical-align: top;
  height: 100%;
  height: 0.7rem;
  padding-top: 0.05rem;
  text-align: center;
  float: left;
}
.history-panel ul li section:nth-of-type(1){
  width: 60%;
  padding-left: 2%;
}

.history-panel ul li section:nth-of-type(1) p{
  height: 0.16rem;
  line-height: 0.16rem;
  text-align: left;
  font-size: 0.12rem;
}
.history-panel ul li section:nth-of-type(1) p:nth-of-type(1){
  height: 0.3rem;
  line-height: 0.3rem;
}
.history-panel ul li section:nth-of-type(1) p:nth-of-type(1) span:nth-of-type(1){
  display: inline-block;
  vertical-align: top;
  width: 45%;
  height: 100%;
  font-size: 0.16rem;
  overflow: hidden;
  white-space:nowrap;
  text-overflow:ellipsis;
}
.history-panel ul li section:nth-of-type(1) p:nth-of-type(1) span:nth-of-type(2){
  font-size:0.12rem ;
}
.history-panel ul li section:nth-of-type(1) p:nth-of-type(1) span:nth-of-type(2) i{
  display: inline-block;
  vertical-align: middle;
  margin-right:0.05rem ;
  width: 0.12rem;
  height: 0.12rem;
}
.history-panel ul li section:nth-of-type(1) p:nth-of-type(1) span:nth-of-type(2) .buytop{
  background: url(../assets/img/buytop.png);
  background-size:100% 100% ;
}
.history-panel ul li section:nth-of-type(1) p:nth-of-type(1) span:nth-of-type(2) .buydown{
  background: url(../assets/img/buydown.png);
  background-size:100% 100% ;
}
.history-panel ul li section:nth-of-type(1) p:nth-of-type(3){
  color: #696969;
}
.history-panel ul li section:nth-of-type(2) {
  width: 40%;
  padding-right: 2%;
  float: right;
}
.history-panel ul li section:nth-of-type(2) p:nth-of-type(1){
  height: 0.35rem;
  line-height: 0.35rem;
  font-size: 0.24rem;
  text-align: right;
}
.history-panel ul li section:nth-of-type(2) p:nth-of-type(2){
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
