<template>
  <popupModal>
    <mu-appbar :title="user.username" slot="header" style="text-align: center">
      <div class="shut_down" @click="closedown()" slot="left">
        <i class="material-icons icon-close">close</i>
      </div>
    </mu-appbar>

    <span slot="slot_one_label">旧密码</span>
    <input slot="slot_one_input" type="password" placeholder="输入旧密码" v-model="change_userpass.oldpass" required />

    <span slot="slot_two_label">新密码</span>
    <input slot="slot_two_input" type="password" placeholder="输入新密码" v-model="change_userpass.newpass" required />

    <span slot="slot_three_label">确认新密码</span>
    <input slot="slot_three_input" type="password" placeholder="再输入一次新密码" v-model="change_userpass.newpassangin" required />

    <a class="button button-balanced" @click="update_user_pass()" slot="sell">确定</a>
    <a class="button button-dark" @click="closedown()" slot="shutdown">关闭</a>

    <mu-toast slot="toast" v-if="toast" :message="tips"/>
  </popupModal>
</template>

<script>
  import popupModal from '../components/popup-modal.vue';
  export default{
    name: 'userChangeModal',
    data () {
      return {
         toast: false,
         tips: '',
         user: {
           username: 'admin'
         },
         change_userpass: {
           oldpass: '',
           newpass: '',
           newpassangin: ''
         }
        }
    },
    components: {
      popupModal
    },
    methods: {
      update_user_pass() {
         this.toast = true;
         if (this.toastTimer) clearTimeout(this.toastTimer);
         this.toastTimer = setTimeout(() => { this.toast = false;this.closedown() }, 2000);
        if (this.change_userpass.oldpass == ""||this.change_userpass.newpass == ""||this.change_userpass.newpassangin == "") {
            this.tips = "密码不能为空"
            return;
        };
        if (this.change_userpass.newpass != this.change_userpass.newpassangin) {
            this.tips = "新密码两次输入不一致"
            return;
        };
        if (this.change_userpass.newpass === this.change_userpass.oldpass) {
            this.tips = "新旧密码必须不一致"
            return;
        }
        this.tips = "修改成功！";
      },
      closedown() {
        this.$emit('closedown')
      }
    }
  }
</script>

<style>
.icon-arrow {
  font-size: 0.25rem;
  color: #fff;
  margin-top: 5px;
}

.mu-toast {
  width: 100%;
}

</style>
