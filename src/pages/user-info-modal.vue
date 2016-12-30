<template>
  <popupModal :action="click_action">
    <mu-appbar title="修改银行资料" slot="header" style="text-align: center">
      <div class="shut_down" @click="closedown()" slot="left">
        <i class="iconfont icon-arrow"></i>
      </div>
    </mu-appbar>

    <span slot="slot_one_label">开户银行</span>
    <mu-select-field slot="slot_one_input" v-model="bank">
      <mu-menu-item v-for="r in bank_list" ccc="dddd" ttt="ddd" :value="r.name" :title="r.name" />
    </mu-select-field>

    <span slot="slot_two_label">支行名称</span>
    <input slot="slot_two_input" type="text" placeholder="支行名称" v-model="user_info.bank_brand" required />

    <span slot="slot_three_label">银行户名</span>
    <input slot="slot_three_input" type="text" placeholder="银行户名" v-model="user_info.bank_user" required />

    <span slot="slot_four_label">银行卡号</span>
    <input slot="slot_four_input" type="text" placeholder="银行卡号" v-model="user_info.bank_card" @keydown="only_number()" required />

    <span slot="slot_five_label">身份证号</span>
    <input slot="slot_five_input" type="text" placeholder="身份证号" v-model="user_info.id_card" required />

    <a class="button button-balanced" @click="update_user()" slot="sell">确定</a>
    <a class="button button-dark" @click="closedown()" slot="shutdown">关闭</a>

    <mu-toast slot="toast" v-if="toast" :message="mes"/>
  </popupModal>
</template>

<script>
  import popupModal from '../components/popup-modal.vue';
  import Bus from '../bus.js';
  export default{
    name: 'userInfoModal',
    data () {
      return {
        mes: '',
        bank: '中国农业银行',
        click_action: false,
        toast: false,
        bank_list: [
          { "name": "中国农业银行", "code": "ABC" },
          { "name": "中国银行", "code": "BOC"},
          { "name": "中国工商银行", "code": "ICBC"},
          { "name": "交通银行", "code": "BOCOM"},
          { "name": "中国建设银行", "code": "CCB" },
          { "name": "中国邮政储蓄银行", "code": "PSBC" },
          { "name": "招商银行", "code": "CMBC" },
          { "name": "浦发银行", "code": "SPDB" },
          { "name": "中国光大银行", "code": "CEEBBANK" },
          { "name": "中信银行", "code": "ECITIC" },
          { "name": "平安银行", "code": "PINGAN" },
          { "name": "中国民生银行", "code": "CMBCS" },
          { "name": "华夏银行", "code": "HXB" },
          { "name": "广发银行", "code": "CGB" },
          { "name": "兴业银行", "code": "CIB" },
          { "name": "徽商银行", "code": "HSB" },
          { "name": "长沙银行", "code": "CSCB" },
			    { "name": "浙江省农村信用社联合社", "code": "ZJRCC" }
        ],
        selected: '中国农业银行',
        user_info: {
          bank_brand: '',
          bank_user: '',
          bank_card: '',
          id_card: ''
        },
        saved_info: {
          bank_brand: '',
          bank_user: '',
          bank_card: '',
          id_card: ''
        }
      }
    },
    components: {
      popupModal
    },
    methods: {
      update_user() {
        this.toast = true;
        if(this.user_info.bank_brand && this.user_info.bank_user && this.user_info.bank_card && this.user_info.id_card && this.saved_info !== this.user_info) {
          this.mes = '修改成功！';
          this.saved_info = this.user_info
        }else if(this.user_info.bank_brand && this.user_info.bank_user && this.user_info.bank_card && this.user_info.id_card && this.saved_info === this.user_info){
          this.mes = '信息无修改'
        }else if(!this.user_info.bank_brand){
          this.mes = '银行名称不能为空！'
        }else if(!this.user_info.bank_user) {
          this.mes = '银行户名不能为空！'
        }else if(!this.user_info.bank_card) {
          this.mes = '银行卡号不能为空！'
        }else if (!this.user_info.id_card) {
          this.mes = '身份证号不能为空！'
        }
        if (this.toastTimer) clearTimeout(this.toastTimer)
        this.toastTimer = setTimeout(() => { this.toast = false;if(this.mes === '修改成功！'){ if(Bus.$on('add_bank')){Bus.$emit('change_success');}this.closedown()};if(this.mes ==='信息无修改'){
          this.closedown()
        } }, 2000)
      },
      closedown() {
        this.click_action = false
      },
      only_number() {
        if((event.keyCode<48||event.keyCode>57)&&(event.keyCode<96||event.keyCode>105)&&(event.keyCode!=8)){
            event.preventDefault();
         }
      }
    },
    mounted() {
      var self = this;
      Bus.$on('show_user_bank_modal',function() {
        self.click_action = true;
        Bus.$emit('user_info_modal')
      });
      Bus.$on('add_bank',function() {
        self.click_action = true;
      });

    }
  }
</script>

<style>
.mu-popover {
  overflow-y: scroll;
}

.mu-content-block {
  overflow-y: scroll;
  margin-top: 0;
}

</style>
