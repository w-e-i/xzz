<template>
    <div class="signin-view">
      <div class="signin">
        <div class="signin-header">
          <div class="system-logo" v-show="show_system_logo">
            <img :src="system_logo" alt="system_name" />
          </div>
          <div class="system-name" v-show="show_system_name">
            {{ system_name }}
          </div>
        </div>
        <div class="signin-content">
          <div class="list">
            <mu-text-field hintText="用户名" type="text" v-model="phone" icon="person" required/><br/>
            <mu-text-field hintText="密码" type="password" v-model="passwd" icon="lock outline" required/><br/>
          </div>
          <p>
            <span style="display: none;">忘记密码？</span>
            <span class="ion-android-warning" v-show="show_sign_in_mistake">&nbsp账号或者密码错误，请重新输入!</span>
          </p>
          <div class="signin-action">
            <button class="newbutton sign_button" @click="signin">
              登&nbsp;&nbsp;录
            </button>
          </div>
        </div>
        <div class="signin-footer">
          <a href="#/signup">——&nbsp;&nbsp;立即开户&nbsp;&nbsp;——</a>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      name: 'signin',
      data () {
        return {
          system_logo: require('../assets/img/logo/logo2.png'),
          system_name: '微交易系统',
          phone: window.localStorage.id,
          passwd: "",
          show_system_logo: true,
          show_system_name: true,
          show_sign_in_mistake: false
        }
      },
      methods: {
        signin: function() {
          this.$router.push('/tab/qoute')
        }
      }
    }
</script>

<style lang="scss">

  html {
    font-size: 100px;;
  }

  .signin-view {
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    background: url(../assets/img/sign-bg.png) no-repeat;
    background-size:100% 100% ;
  }

  .signin {
    width: 70%;
    height: 100%;
    margin-left: 15%;
    text-align: center;
  }
  .signin-header {
    margin-top: 0.8rem;
    margin-bottom:0.2rem;
  }
  .signin-header .system-logo{
    width: auto;
    height: auto;
    margin: 0 auto;
  }
  .signin-header .system-logo img {
    width: 50%;
    height: 50%;
  }
  .signin-header .system-name{
    width: 100%;
    height: 0.3rem;
    line-height: 0.3rem;
    text-align: center;
    color: #e9b747;
    font-size: 0.2rem;
    font-family: "微软雅黑";
  }
  .signin-content > .list {
    width: 100%;
    height: 1rem;
    margin-bottom: 0.1rem;
  }
  .signin-content > p{
    width: 100%;
    height: 0.25rem;
  }
  .signin-content > p > span{
    display: block;
    width: 100%;
    height: 0.25rem;
    line-height: 0.25rem;
    font-size: 0.14rem;
    text-align: center;
    color: #fa2e42;
  }

  .signin-content > .list > .mu-text-field {
    color: #e9b747;
  }

  .signin-content > .list .mu-text-field-hint {
    color: #fff;
  }

  /*.signin-content > .list > .item {*/
    /*height: 0.45rem;*/
    /*line-height: 0.45rem;*/
    /*margin-bottom: 0.1rem;*/
    /*border-width: 0px;*/
    /*border-radius: 0.05rem;*/
    /*background: rgba(0, 0, 0, 0.2);*/
    /*padding: 0;*/
  /*}*/

  /*.signin-content > .list > .item > .input-icon {*/
    /*display:inline-block ;*/
    /*vertical-align: top;*/
    /*font-size: 0.2rem;*/
    /*width: 0.4rem;*/
    /*color: #e9b747;*/
    /*text-align: center;*/
    /*height: 0.45rem;*/
  /*}*/

  /*.signin-content > .list > .item > input {*/
    /*color: white;*/
    /*font-size: 0.14rem;*/
    /*padding: 0rem;*/
    /*border: none;*/
    /*background-color: transparent !important;*/
  /*}*/

  .signin-content > .signin-action {
    padding: 0.05rem 0.1rem;
  }

  .signin-action .sign_button{
    width: 100%;
  }

  .signin-footer {
    text-align: center;
    margin-top: 0.2rem;
  }

  .signin-footer > a {
    color: #e8af2e;
    font-size: .14rem;
    text-decoration: none;
  }
  .signin-tools {
    padding: 0px;
    height: 30px !important;
  }

  .signin-tools p {
    font-size: 12px;
    white-space: normal;
    text-align: left;
    padding: 5px;
    padding-left: 10px;
  }

  .signin-tools p a {
    color: #666;
  }

  .signin-tools.item-select {
    padding: 16px;
  }

  .signin-tools select {
    left: 0px;
    color: rgb(200, 200, 200);
    font-size: 12px;
    background-color: #1d1d25;
  }

  .signin-tools.item-checkbox {
    border: none !important;
  }

  .signin-tools .item-checkbox {
    padding: 5px;
    padding-top: 10px;
    padding-left: 35px;
    font-size: 12px;
    text-align: left;
    border: none;
    color: rgb(200, 200, 200);
    background-color: rgba(0, 0, 0, 0);
  }

  .signin-tools .item-checkbox .checkbox-icon:before {
    width: 14px;
    height: 14px;
    margin-top: 9px;
    border-radius: 2px !important;
  }

  .signin-tools .item-checkbox .checkbox-icon:after {
    position: static;
    margin-top: -12px;
  }

  .spinner-view {
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    z-index: 4;
    opacity: 0;
    background-color: rgb(31, 32, 36);
    -webkit-transition: opacity 300ms linear;
    -moz-transition: opacity 300ms linear;
    -ms-transition: opacity 300ms linear;
    -o-transition: opacity 300ms linear;
    transition: opacity 300ms linear;
  }

  .spinner-view.open {
    opacity: 100;
    background-color: rgb(31, 32, 36);
  }

  .spinner-view .message {
    top:50%;
    width:100%;
    opacity: 0;
    padding-top:30px;
    text-align: center;
    position: absolute;
    color: rgb(200, 200, 200);
    -webkit-transition: opacity 300ms linear;
    -moz-transition: opacity 300ms linear;
    -ms-transition: opacity 300ms linear;
    -o-transition: opacity 300ms linear;
    transition: opacity 300ms linear;
  }

  .spinner-view .message.fadein {
    opacity: 100;
  }

</style>
