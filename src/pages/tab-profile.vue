<template>
  <div class="tab_profile">
    <header>
      <router-link to="/signin" replace>
        <i @click="app_exit" class="iconfont icon--9"></i>
      </router-link>
      <!--<i @click="app_exit()" class="iconfont icon&#45;&#45;9"></i>-->
      <article>
        <img :src="logobg" />
      </article>
      <p>{{ user.username }}<span class="iconfont icon--3" @click="show_user_modal()"></span></p>
      <p>¥{{user.amount.toFixed(0)}}</p>
    </header>
    <ul>
      <li>
        <section @click="show_user_bank_modal()">
          <i class="iconfont icon--19"></i>
          <p>签约</p>
        </section>
      </li>
      <li>
        <section @click="show_deposit_modal()">
          <i class="iconfont icon--5"></i>
          <p>用户入金</p>
        </section>
      </li>
      <li>
        <section @click="show_withdraw_modal()">
          <i class="iconfont icon--4"></i>
          <p>用户出金</p>
        </section>
      </li>
      <li>
        <section @click="show_money_list()">
          <i class="iconfont icon---"></i>
          <p>资金流水</p>
        </section>
      </li>
    </ul>
    <footer>
      <div class="erwema_img">
        <img :src="qrcode_url" alt="我的二维码" />
      </div>
      <p>
        <span>扫描二维码注册</span>
        <span style="display: none;">分享<i class="iconfont">&#xe651;</i></span>
      </p>
    </footer>
    <userInfoModal></userInfoModal>
    <userChangeModal></userChangeModal>
    <capitalDepositModal></capitalDepositModal>
    <capitalWithdrawModal @go_add_bank="add_bank"></capitalWithdrawModal>
    <capitalHistoryModal></capitalHistoryModal>
  </div>
</template>

<script>
    import userInfoModal from './user-info-modal.vue';
    import userChangeModal from './user-change-modal.vue';
    import capitalDepositModal from './capital-deposit-modal.vue';
    import capitalWithdrawModal from './capital-withdraw-modal.vue';
    import capitalHistoryModal from './capital-history-modal.vue';
    import Bus from '../bus.js';
    export default {
      name: 'tabProfile',
      data () {
        return {
          user: {
            username: '张三',
            amount: 200.999
          },
          logobg: require('../assets/img/logobg.jpg'),
          qrcode_url: require('../assets/img/test.jpg')
        }
      },
      methods: {
        show_user_bank_modal() {
          Bus.$emit('show_user_bank_modal');
        },
        show_user_modal() {
          Bus.$emit('show_user_modal');
        },
        show_deposit_modal() {
          Bus.$emit('show_deposit_modal');
        },
        add_bank() {
          Bus.$emit('add_bank');
        },
        show_withdraw_modal() {
          Bus.$emit('show_withdraw_modal');
        },
        show_money_list() {
          Bus.$emit('show_money_list');
        },
        app_exit() {
          this.$router.go(-100)
        },
        handling() {
          this.show_info = true
        }
      },
      components: {
        userInfoModal,userChangeModal,capitalDepositModal,capitalWithdrawModal,capitalHistoryModal
      }
    }
</script>

<style lang="scss" scoped>
  /*图标库*/
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


  ul {
    padding: 0;
  }
  .tab_profile{
    background: #323232;
  }
  .tab_profile header{
    width: 100%;
    height: 1.4rem;
    padding-top: 0.2rem;
    background: url(../assets/img/personalbg.png) no-repeat;
    background-size:100% 100% ;
    position: relative;
  }
  .tab_profile header i{
    position: absolute;
    display: block;
    width: 0.3rem;
    height: 0.3rem;
    top:0.1rem;
    right: 0.2rem;
    color: #FFFFFF;
    font-size: 0.2rem;
    text-align: center;
    line-height: 0.3rem;
  }
  .tab_profile header article{
    width: 0.6rem;
    height: 0.6rem;
    border-radius:50% ;
    margin: 0 auto;
    border: 0.03rem solid #ccc9c6;
  }
  .tab_profile header article img{
    width: 100%;
    height: 100%;
    border-radius:50% ;
  }
  .tab_profile header p{
    text-align: center;
    height: 0.2rem;
    line-height: 0.2rem;
    font-size: 0.14rem;
    color: #787878;
    margin: 0;
    color: #fdbe19;
  }
  .tab_profile header p:nth-of-type(1){
    font-size: 0.13rem;
    color: #FFFFFF;
    font-weight: 700;
    margin-top: 0.1rem;
  }
  .tab_profile header p:nth-of-type(1) span{
    font-size: 0.13rem;
    margin-left: 0.05rem;
  }
  .tab_profile ul{
    width: 100%;
    height: 0.8rem;
    background: #282828;
    margin-top:0.05rem ;
    display: flex;
    list-style: none;
  }
  .tab_profile ul li{
    flex: 1;
    height: 100%;
  }
  .tab_profile ul li section{
    width: 100%;
    height: 0.6rem;
    padding-top:0.05rem ;
    margin-bottom:0.1rem ;
    margin-top:0.1rem ;
    border-right:1px solid #171717 ;
    border-left: 1px solid #404040;
  }
  .tab_profile ul li:nth-of-type(1) section{
    border-left:none;
  }
  .tab_profile ul li:nth-of-type(4) section{
    border-right:none ;
  }
  .tab_profile ul li section i{
    display: block;
    width: 0.3rem;
    height: 0.3rem;
    margin: 0 auto;
    font-size: 0.25rem;
    line-height: 0.25rem;
    text-align: center;

  }
  .tab_profile ul li:nth-of-type(1) section i{
    color: #1fc65b;
  }
  .tab_profile ul li:nth-of-type(2) section i{
    color: #eb3445;
  }
  .tab_profile ul li:nth-of-type(3) section i{
    color: #ebac34;
  }
  .tab_profile ul li:nth-of-type(4) section i{
    color: #3c9bf3;
  }
  .tab_profile ul li section p{
    text-align: center;
    height: 0.2rem;
    line-height: 0.2rem;
    margin: 0;
    font-size: 0.12rem;
    color:#5a5a5a ;
  }
  .tab_profile footer{
    width: 60%;
    height: 3.5rem;
    margin: 0.5rem auto 0 auto;
    background: url(../assets/img/erweimabg.png) no-repeat;
    background-size:100% 100% ;
    padding-top: 0.8rem;
  }
  .tab_profile footer .erwema_img{
    width:1.5rem ;
    height: 1.5rem;
    margin: 0 auto;
  }
  .tab_profile footer .erwema_img img{
    width: 100%;
    height: 100%;
  }
  .tab_profile footer p{
    height: 0.2rem;
    margin-top: 0.05rem;
    line-height: 0.2rem;
    font-size: 0.12rem;
    text-align: center;
  }
  .tab_profile footer p span{
    margin-right:0.05rem ;
    color: #d1d1d1;
  }
  .tab_profile footer p span i{
    font-size: 0.12rem;
  }

  /* 个人中心资金流水样式 */
  .order-modal-header{
    height: 0.3rem;
  }
  .order-modal-header  .title{
    height: 0.3rem !important;
    line-height: 0.3rem !important;
  }
  .in_money{
    color:#fa2e42;
  }
  .out_money{
    color:#1fc65b;
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
    width: 0.11rem;
    height:0.11rem;
    vertical-align: top;
  }
  .money_list_header section:nth-of-type(2) p:nth-of-type(2){
    color: white;
    font-size: 0.14rem;
  }
  .money_list_header section:nth-of-type(2) p:nth-of-type(3){
    color: #b0b0b0;
    font-size: 0.12rem;
  }
  .money_list_header section:nth-of-type(2) p i img{
    width: 100%;
    height:100%;
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
    display: none;
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
  .btndisabled{
    background: #000000;
  }

  /*入金弹框样式*/

  .red{
    color: #cc0011 !important;
  }
  .blue{
    color: #1358bd !important;
  }
  .qing{
    color: #19725d !important;
  }
  .green{
    color: #007e3d !important;
  }
  .orange{
    color: orangered !important;
  }
  .pay_blue{
    color: #159aef !important;
  }
  .pay_green{
    color: #1fc65b !important;
  }
  .pay_purple{
    color: #1d2087 !important;
  }
  .pay_yellow{
    color: #fbe900 !important;
  }
  .pay_qing{
    color: #00a5d7 !important;
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
  #in_money_content{
    background: #1b1b1d;
  }
  #in_money_content header{
    margin-bottom:0.1rem ;
  }
  #in_money_content article span i{
    color: #eb3445;
  }
  #in_money_content .item{
    border: none;
    background: #1b1b1d ;
  }
  #in_money_content .item .item-content{
    background: #1b1b1d ;
    padding: 0;
  }
  #in_money_content .item .item-content {
    width: 96%;
    margin-left: 2%;
  }
  #in_money_content .item .item-content  .pay_bank_list_header{
    border-radius:0.05rem;
    background: #28282b;
    width: 100%;
    height: 0.7rem;
    position: relative;
  }
  #in_money_content .item .item-content  .pay_bank_list_header i{
    display: inline-block;
    vertical-align: top;
    width: 0.05rem;
    height: 0.7rem;
    border-bottom-left-radius:0.05rem;
    border-top-left-radius:0.05rem;
  }
  #in_money_content .item .item-content  .pay_bank_list_header article{
    display: inline-block;
    width: 80%;
    height: 0.7rem;
  }
  #in_money_content .item .item-content  .pay_bank_list_header article p span{
    display: inline-block;
    vertical-align: top;
    height: 0.3rem;
    line-height: 0.3rem;
    text-align: left;
  }
  #in_money_content .item .item-content  .pay_bank_list_header p:nth-of-type(1){
    margin-top:0.05rem;
    font-size:0.15rem;
    height: 0.3rem;
  }
  #in_money_content .item .item-content  .pay_bank_list_header p:nth-of-type(1) span:nth-of-type(1){
    width:0.5rem;
    font-size: 0.25rem;
    text-align: center;
  }
  #in_money_content .item .item-content  .pay_bank_list_header p:nth-of-type(1) span:nth-of-type(2){
    width: 1rem;
  }
  #in_money_content .item .item-content  .pay_bank_list_header p:nth-of-type(2){
    margin:0;
    font-size:0.12rem;
    height: 0.3rem;
  }
  #in_money_content .item .item-content  .pay_bank_list_header p:nth-of-type(2) span:nth-of-type(1){
    width: 0.5rem;
    text-align: center;
  }
  #in_money_content .item .item-content  .pay_bank_list_header p:nth-of-type(2) span:nth-of-type(2){
    width: 1rem;
    color: #ffffff;
  }
  #in_money_content .item-radio .radio-icon{
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
  #in_money_content .pay_bank_list_content .item .item-content{
    width: 100%;
    margin: 0;
  }
  #in_money_content .pay_bank_list_content ul{
    width: 98%;
    margin-left: 1%;
    background: #222225;
    border-bottom-left-radius:0.03rem ;
    border-bottom-right-radius:0.03rem ;
  }
  #in_money_content .pay_bank_list_content ul li{
    margin-left:3% ;
    height: 0.32rem;
    width: 94%;
    border-bottom:1px solid #343438 ;
    margin-bottom: 2px;
    position: relative;
  }
  #in_money_content .pay_bank_list_content ul li .item .item-content{
    background: #222225;
  }
  #in_money_content .pay_bank_list_content ul li .item-radio .radio-icon{
    top:0.11rem;
    right: 0.21rem;
  }
  #in_money_content .pay_bank_list_content ul li p{
    font-size: 0.13rem;
  }
  #in_money_content .pay_bank_list_content ul li p span{
    display: inline-block;
    height: 0.3rem;
    line-height: 0.3rem;
    vertical-align: top;
    font-size: 0.13rem;
    color: #aaaaaa;
    width: 2rem;
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


  /*微信支付页面*/
  .pay_weixin_code{
    width: 100%;
    height: 100%;
    background:#1b1b1d ;
    text-align: center;
  }
  .pay_weixin_code header{
    width: 2.9rem;
    height: 3.3rem;
    background: url(../assets/img/payweixinbg.png) no-repeat;
    background-size:100% 100% ;
    margin: 0.4rem auto 0 auto;
  }
  .pay_weixin_code header p{
    height: 0.37rem;
    line-height: 0.37rem;
    margin: 0;
    color: white;
    font-size: 0.13rem;
  }
  .pay_weixin_code header p span{
    display: inline-block;
    width: auto;
    vertical-align: top;
    height: 0.37rem;
    color: #fdbe19;
    font-size: 0.18rem;
    line-height: 0.37rem;
  }
  .pay_weixin_code header article{
    margin: 0.2rem auto 0 auto;
    width: 1.8rem;
    height: 1.8rem;
    background: #FFFFFF;
  }
  .pay_weixin_code header article img{
    width: 100%;
    height: 100%;
  }
  .pay_weixin_code section{
    font-size: 0.13rem;
    color: white;
    height: 0.2rem;
    line-height: 0.2rem;
  }
  .pay_weixin_code footer{
    margin-top:1.5rem;
    color: #969696;
    font-size: 0.12rem;
  }

</style>
