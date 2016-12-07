<template>
  <div class="tab_qoute">
    <!--<mu-appbar title="商品行情"></mu-appbar>-->
    <div class="qoute-category">
      <mu-tabs :value="activeTab" @change="handleTabChange">
        <mu-tab v-for="c in category_list" :value="c.name" :title="c.name"/>
      </mu-tabs>
      <!--<ul>-->
        <!--<li v-for="c in category_list" @click="change_category($index)"-->
            <!--:class="{ 'active' : category_index === $index }">-->
          <!--{{ c.name }}-->
        <!--</li>-->
      <!--</ul>-->
    </div>

    <div class="qoute-view">
      <div class="qoute-view-header">
        <ul>
          <li>商品名称</li>
          <li>现价</li>
          <li>最高</li>
          <li>最低</li>
        </ul>
      </div>
      <div class="qoute-view-content">
        <ul v-for="q in qoute_list">
          <li>
            <router-link to="/trade/q.mode/q.market/q.code" replace>
              {{ q.name }}
            </router-link>
            <!--<a v-bind:href="#/trade/q.mode/q.market/q.code">{{ q.name }}</a>-->
          </li>
          <li>
            <a :class="{ 'rise-value' : q.state == 'up', 'fall-value' : q.state == 'down' }" href="#/trade/q.mode/q.market/q.code">
              {{ q.value.toFixed(q.decimal) }}
            </a>
          </li>
          <li>
            <a :class="{ 'rise' : q.state == 'up', 'fall' : q.state == 'down' }" href="#/trade/q.mode/q.market/q.code">
              {{ q.high.toFixed(q.decimal) }}
            </a>
          </li>
          <li>
            <a :class="{ 'rise' : q.state == 'up', 'fall' : q.state == 'down' }" href="#/trade/q.mode/q.market/q.code">
              {{ q.low.toFixed(q.decimal) }}
            </a>
          </li>
        </ul>
      </div>
    </div>
    <!--<div v-if="activeTab === '多空'">-->
      <!--<h2>Tab Two</h2>-->
      <!--<p>-->
        <!--这是第二个 tab-->
      <!--</p>-->
    <!--</div>-->

    <!--<ion-slide-box delegate-handle="slide-qoute" on-slide-changed="slide_change($index)"-->
                   <!--show-pager="false" class="slide-qoute">-->
      <!--<ion-slide ng-repeat="c in category_list">-->
        <!--<div class="qoute-view">-->
          <!--<div class="qoute-view-header">-->
            <!--<ul>-->
              <!--<li>商品名称</li>-->
              <!--<li>现价</li>-->
              <!--<li>最高</li>-->
              <!--<li>最低</li>-->
            <!--</ul>-->
          <!--</div>-->
          <!--<div class="qoute-view-content">-->
            <!--<ion-scroll>-->
              <!--<ul ng-repeat="q in qoute_list | filter: { mode: c.mode }">-->
                <!--<li>-->
                  <!--<a href="#/trade/{{ q.mode }}/{{ q.market }}/{{ q.code }}">{{ q.name }}</a>-->
                <!--</li>-->
                <!--<li>-->
                  <!--<a ng-class="{ 'rise-value' : q.state == 'up', 'fall-value' : q.state == 'down' }" href="#/trade/{{ q.mode }}/{{ q.market }}/{{ q.code }}">-->
                    <!--{{ q.value.toFixed(q.decimal) }}-->
                  <!--</a>-->
                <!--</li>-->
                <!--<li>-->
                  <!--<a ng-class="{ 'rise' : q.state == 'up', 'fall' : q.state == 'down' }" href="#/trade/{{ q.mode }}/{{ q.market }}/{{ q.code }}">-->
                    <!--{{ q.high.toFixed(q.decimal) }}-->
                  <!--</a>-->
                <!--</li>-->
                <!--<li>-->
                  <!--<a ng-class="{ 'rise' : q.state == 'up', 'fall' : q.state == 'down' }" href="#/trade/{{ q.mode }}/{{ q.market }}/{{ q.code }}">-->
                    <!--{{ q.low.toFixed(q.decimal) }}-->
                  <!--</a>-->
                <!--</li>-->
              <!--</ul>-->
            <!--</ion-scroll>-->
          <!--</div>-->
        <!--</div>-->
      <!--</ion-slide>-->
    <!--</ion-slide-box>-->
  </div>
</template>

<script>
  export default {
    name: 'tabQOute',
    data () {
      return {
        activeTab: '按需',
        category_list: [
          {
            name: '按需'
          },
          {
            name: '多空'
          }
        ],
        qoute_list: [
          {
            trade: 11,
            market: 111,
            mode: 1,
            code: 1111,
            name: '按需',
            state: 'up',
            value: 11111,
            high: 11111,
            low: 11111,
            decimal: 2
          },
          {
            trade: 11,
            market: 111,
            mode: 1,
            code: 1111,
            name: '按需',
            state: 'up',
            value: 11111,
            high: 11111,
            low: 11111,
            decimal: 2
          },
          {
            trade: 11,
            market: 111,
            mode: 1,
            code: 1111,
            name: '按需',
            state: 'up',
            value: 11111,
            high: 11111,
            low: 11111,
            decimal: 2
          },
          {
            trade: 11,
            market: 111,
            mode: 1,
            code: 1111,
            name: '按需',
            state: 'up',
            value: 11111,
            high: 11111,
            low: 11111,
            decimal: 2
          },
          {
            trade: 11,
            market: 111,
            mode: 1,
            code: 1111,
            name: '按需',
            state: 'up',
            value: 11111,
            high: 11111,
            low: 11111,
            decimal: 2
          },
          {
            trade: 11,
            market: 111,
            mode: 1,
            code: 1111,
            name: '按需',
            state: 'up',
            value: 11111,
            high: 11111,
            low: 11111,
            decimal: 2
          },
          {
            trade: 11,
            market: 111,
            mode: 1,
            code: 1111,
            name: '按需',
            state: 'up',
            value: 11111,
            high: 11111,
            low: 11111,
            decimal: 2
          },
          {
            trade: 11,
            market: 111,
            mode: 1,
            code: 1111,
            name: '按需',
            state: 'up',
            value: 11111,
            high: 11111,
            low: 11111,
            decimal: 2
          },
          {
            trade: 11,
            market: 111,
            mode: 1,
            code: 1111,
            name: '按需',
            state: 'up',
            value: 11111,
            high: 11111,
            low: 11111,
            decimal: 2
          },
          {
            trade: 11,
            market: 111,
            mode: 1,
            code: 1111,
            name: '按需',
            state: 'up',
            value: 11111,
            high: 11111,
            low: 11111,
            decimal: 2
          },
          {
            trade: 11,
            market: 111,
            mode: 1,
            code: 1111,
            name: '按需',
            state: 'up',
            value: 11111,
            high: 11111,
            low: 11111,
            decimal: 2
          },
          {
            trade: 11,
            market: 111,
            mode: 1,
            code: 1111,
            name: '按需',
            state: 'up',
            value: 11111,
            high: 11111,
            low: 11111,
            decimal: 2
          },
          {
            trade: 11,
            market: 111,
            mode: 1,
            code: 1111,
            name: '按需',
            state: 'up',
            value: 11111,
            high: 11111,
            low: 11111,
            decimal: 2
          },
          {
            trade: 11,
            market: 111,
            mode: 1,
            code: 1111,
            name: '按需',
            state: 'up',
            value: 11111,
            high: 11111,
            low: 11111,
            decimal: 2
          },
          {
            trade: 11,
            market: 111,
            mode: 1,
            code: 1111,
            name: '按需',
            state: 'up',
            value: 11111,
            high: 11111,
            low: 11111,
            decimal: 2
          },
          {
            trade: 11,
            market: 111,
            mode: 1,
            code: 1111,
            name: '按需',
            state: 'up',
            value: 11111,
            high: 11111,
            low: 11111,
            decimal: 2
          }
        ]

      }
    },
    methods: {
      handleTabChange (val) {
        this.activeTab = val
      },
      changeUrl: function(item) {
        this.qoute_list.forEach(function(item) {
          return '/trade/item.mode/item.market/item.code'
        })
      }
    }
  }
</script>

<style lang="scss">
  /*框架样式设置*/
  .mu-appbar {
    background: rgb(46, 49, 58);
    color: rgb(236, 181, 64);
    height:0.3rem;
  }

  .mu-appbar-title {
    height:0.3rem;
    line-height: 0.3rem;
    font-size: 0.2rem;
    font-weight: 600;
  }

  .mu-tabs {
    background-color: rgb(31, 32, 36);
    color: #fff;
    height:40px;
    line-height:40px;
    font-size: 0.16rem;;
  }

  .mu-tab-active {
    /*border-bottom: 2px solid rgb(236, 181, 64);*/
    color: rgb(236, 181, 64);
  }
  /*展示内容样式*/
  .qoute-category {
    width: 100%;
    margin-bottom: -5px;
    position: absolute;
    top: 0;
  }

  .qoute-category > ul {
    width: 100%;
    height: 40px;
    padding: 0px;
    display: flex;
    line-height: 40px;
    text-align: center;
    padding-left: auto;
    margin-bottom: 4px;
    background-color: rgb(31, 32, 36);
  }

  .qoute-category > ul > li {
    float: left;
    color: white;
    width: 100%;
    height: 40px;
    line-height: 40px;
    cursor: pointer;
    padding: 0px;
    font-size: 16px;
    text-align: center;
    background-color: rgb(31, 32, 36);
  }

  .qoute-category > ul > li.active {
    color: rgb(236, 181, 64);
    border-bottom: 2px solid rgb(236, 181, 64);
  }

  .scroll-view {
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
  }

  .order-view,
  .qoute-view {
    width: 100%;
    height: 100%;
    padding: 0px;
    position: relative;
    top: -10px;
  }

  .order-view > .order-view-header > ul,
  .qoute-view > .qoute-view-header > ul {
    width: 100%;
    display: flex;
    padding: 0;
    list-style: none;
  }

  .order-view > .order-view-header > ul > li,
  .qoute-view > .qoute-view-header > ul > li {
    color: rgb(94, 95, 96);
    width: 100%;
    height: 35px;
    font-size: 14px;
    line-height: 35px;
    cursor: pointer;
    text-align: center;
    background-color: rgb(38, 40, 52);
    border-bottom: 1px solid rgb(41, 44, 49);
  }

  .slide-history.slider,
  .slide-qoute.slider {
    position: absolute;
    top: 40px;
    bottom: 0px;
    left: 0px;
    right: 0px;
  }

  .order-view .order-view-content,
  .qoute-view .qoute-view-content {
    position: absolute;
    top: 35px;
    bottom: 0px;
    left: 0px;
    right: 0px;
  }

  .order-view .order-view-content .scroll-view,
  .qoute-view .qoute-view-content .scroll-view {
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    overflow: hidden;
  }

  .order-view .order-view-content ul,
  .qoute-view .qoute-view-content ul {
    width: 100%;
    display: flex;
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .order-view .order-view-content ul > li,
  .qoute-view .qoute-view-content ul > li {
    color: white;
    width: 100%;
    height: 45px;
    line-height: 45px;
    cursor: pointer;
    text-align: center;
    font-size: 14px;
    background-color: rgb(17, 20, 29);
    border-bottom: 1px solid rgb(29, 32, 41);
  }

  .order-view .order-view-content ul > li:first-child a,
  .qoute-view .qoute-view-content ul > li:first-child a {
    text-align: left;
    padding-left: 15px;
  }

  .qoute-view .qoute-view-content ul > li > a {
    color: white;
    width: 100%;
    height: 45px;
    font-size: 14px;
    display: block;
    line-height: 45px;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
  }
</style>
