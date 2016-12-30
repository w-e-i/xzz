<template>
  <div>
    <div>
      <keep-alive include="tabProfile">
        <router-view></router-view>
      </keep-alive>
    </div>
    <div class="bottomNavigate">
     <ul>
       <li>
         <router-link active-class="active" to="/tab/qoute" replace>
             <span class="iconfont icon--6 tabnone"></span>
             <br>
             <span>商品行情</span>
         </router-link>
       </li>
       <li>
         <router-link active-class="active" to="/tab/history/0" replace>
             <span class="iconfont icon--7 tabnone"></span>
             <br>
             <span>交易记录</span>
         </router-link>
       </li>
       <li>
         <router-link active-class="active" to="/tab/profile" replace>
             <span class="iconfont icon--8 tabnone"></span>
             <br>
             <span>个人账户</span>
         </router-link>
       </li>
     </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'bottomNavigate',
  data () {
    return {
      bottomNav: 'bullish'
    }
  },
  methods: {
    handleChange (val) {
      this.bottomNav = val
    }
  }
 }

</script>

<style lang="scss">
  @import url("../assets/lib/iconfont/iconfont.css");
  @font-face {
    font-family: 'iconfont';
    src: url('../assets/lib/iconfont/iconfont.eot');
    src: url('../assets/lib/iconfont/iconfont.eot?#iefix') format('embedded-opentype'),
    url('../assets/lib/iconfont/iconfont.woff') format('woff'),
    url('../assets/lib/iconfont/iconfont.ttf') format('truetype'),
    url('../assets/lib/iconfont/iconfont.svg#iconfont') format('svg');
  }
  .iconfont{
    font-family:"iconfont" !important;
    font-size:16px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
  }
  .icon {
    width: 1em; height: 1em;
    fill: currentColor;
    overflow: hidden;
  }
  body {
    background-color: rgb(25, 25, 26);
    font-family: 微软雅黑;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .mu-paper {
    position: fixed;
    bottom: 0;
    width: 100%
  }
  .mu-bottom-nav {
    background-color: #2c2b31;
  }
  .mu-bottom-item-icon,.mu-bottom-item-text {
    color: #fff;
  }
  .mu-bottom-item-active .mu-bottom-item-icon,.mu-bottom-item-active .mu-bottom-item-text {
    color: rgb(236, 181, 64);
  }

  .bottomNavigate {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 50px;
    background-color: #2c2b31;
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      display: -webkit-flex;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: flex-start;
      align-content: space-between;
      li {
        flex: 1;
        a {
          color: #fff;
          &.active{
            color: rgb(236, 181, 64);
          }
          span:nth-of-type(1) {
            font-size: 20px;
          }
        }
      }
    }
  }
</style>
