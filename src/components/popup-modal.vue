<template>
  <div class="order-modal">
    <mu-popup position="bottom" popupClass="demo-popup-bottom" :open="true">
      <slot name="header"></slot>
      <slot name="toast"></slot>
      <mu-content-block>
        <ul class="list">
          <li class="item item-input">
            <span class="input-label">
              <slot name="slot_one_label"></slot>
            </span>
            <span class="input-content">
              <slot name="slot_one_content"></slot>
            </span>
            <slot name="slot_one_input"></slot>
          </li>
          <li class="item item-input">
            <span class="input-label">
              <slot name="slot_two_label"></slot>
            </span>
            <span class="input-content">
              <slot name="slot_two_content"></slot>
            </span>
            <slot name="slot_two_input"></slot>
          </li>
          <li class="item item-input">
            <span class="input-label">
              <slot name="slot_three_label"></slot>
            </span>
            <span class="input-content">
              <slot name="slot_three_content"></slot>
            </span>
            <slot name="slot_three_input"></slot>
          </li>
          <li class="item item-input">
            <span class="input-label">
              <slot name="slot_four_label"></slot>
            </span>
            <span class="input-content">
              <slot name="slot_four_content"></slot>
            </span>
            <slot name="slot_four_input"></slot>
          </li>
          <li class="item item-input">
            <span class="input-label">
              <slot name="slot_five_label"></slot>
            </span>
            <span class="input-content">
              <slot name="slot_five_content"></slot>
            </span>
            <slot name="slot_five_input"></slot>
          </li>
          <li class="item item-input">
            <span class="input-label">
              <slot name="slot_six_label"></slot>
            </span>
            <span class="input-content">
              <slot name="slot_six_content"></slot>
            </span>
            <slot name="slot_six_input"></slot>
          </li>
          <li class="item item-input">
            <span class="input-label">
              <slot name="slot_seven_label"></slot>
            </span>
            <span class="input-content">
              <slot name="slot_seven_content"></slot>
            </span>
            <slot name="slot_seven_input"></slot>
          </li>
          <li class="item item-input">
            <span class="input-label">
              <slot name="slot_eight_label"></slot>
            </span>
            <span class="input-content">
              <slot name="slot_eight_content"></slot>
            </span>
            <slot name="slot_eight_input"></slot>
          </li>
        </ul>
        <div class="button-bar">
          <slot name="sell"></slot>
          <slot name="shutdown"></slot>
        </div>
      </mu-content-block>
    </mu-popup>
  </div>
</template>

<script>
  export default{
    name: 'popupModal',
    data() {
      return {
        bottomPopup: true
      }
    }
  }
</script>

<style>
.mu-popup {
   font-family: monospace;
}

.mu-content-block-header {
    border: none;
    background-image: none;
    background-color: black;
    height: 0.4rem;
    line-height: 0.4rem;
}

.mu-appbar {
    background-color: black !important;
}

.mu-content-block-header h1 {
    color: white;
    font-size: 0.14rem !important;
}
.mu-content-block-header  .title{
		height:0.4rem !important;
		line-height: 0.4rem !important;
}
.mu-content-block-header .close {
    position: absolute;
    top: 0px;
    left: 0px;
    bottom: 0px;
    width: 0.4rem;
    font-size: 0.2rem;
    cursor: pointer;
    line-height: 0.4rem;
    text-align: center;
    color: white;
}

.mu-content-block {
    background-color: rgb(30, 30, 40);
    height: 100%;
    padding: 0;
    margin-top: -15px;
}

.mu-content-block .list {
    list-style: none;
    padding: 0;

}

.mu-content-block .list > .item {
    border: none;
    font-size: 12px;
    padding: 0px;
    height: 51px;
    line-height: 51px;
    margin-bottom: 1px;
    color: rgb(200, 200, 200);
    background-color: rgb(30, 30, 40);
    border-bottom: 1px solid rgb(38, 40, 52) !important;
}

.item-input {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    position: relative;
    overflow: hidden;
}

.mu-content-block .list > .item input {
    color: white;
}

.mu-content-block .button-bar {
    bottom: 0px;
    left: 0px;
    right: 0px;
    height: 45px;
    line-height: 45px;
    position: absolute;
}

.button-bar > a {
    float: left;
    width: 50%;
    color: #fff;
    line-height: 47px;
}

.mu-content-block .button-bar .button-dark {
    font-size: 14px;
    height: 45px;
    line-height: 45px;
    border: none !important;
    border-radius: 0px 0px 0px 0px;
    background-color: rgb(38, 40, 52);
}

.mu-content-block .button-bar .button-balanced {
    font-size: 14px;
    border: none !important;
    border-radius: 0px 0px 0px 0px;
    background-color: rgb(185, 60, 65);
}

.input-label {
    display: table;
    padding: 7px 10px 7px 0px;
    max-width: 200px;
    width: 35%;
}

.mu-content-block .input-label {
    color: rgb(200, 200, 200);
    font-size: 14px;
    padding-left: 25px;
    padding-top: 0px;
    padding-bottom: 0px;
}

.mu-content-block .input-content {
    color: rgb(200, 200, 200);
    font-size: 14px;
}

/*银行选择*/

.mu-content-block .mu-text-field {
    line-height: 48px;
    margin-top: 12px;
    text-align: right;
    padding-right: 23px;
}

.mu-content-block .mu-select-field .mu-dropDown-menu-icon {
    color: #fff;
}

.mu-content-block .mu-select-field .mu-dropDown-menu-text {
    color: #fff;
    margin-right: 10px;
}

.mu-popover {
    top: 81px !important;
    background-color: rgb(39, 79, 82);
    right: 0;
}

/*修改银行资料input项*/

.mu-content-block .item-input > input {
    display: block;
    padding-top: 2px;
    padding-left: 0;
    height: 34px;
    vertical-align: middle;
    font-size: 14px;
    line-height: 16px;
    color: #fff;
    width: 100%;
    padding-right: 24px;
    background-color: transparent;
    border: 0;
    outline: none;
}

.mu-popover .mu-menu-destop {
    padding-top: 0;
}

.mu-popover .mu-menu-destop .mu-menu-item {
    color: #fff;
}

.demo-popup-bottom {
  width: 100%;
  max-width: 375px;
  height: 100%;
}

.mu-paper-1 .mu-appbar-title {
  font-size: 0.14rem;
  color: #fff;
}

.mu-appbar {
  height: 40px !important;
}
.material-icons.icon-close {
  font-size: 0.15rem;
  color: white;
  margin-top: 5px;
}
.shut_down {
  width: 40px;
  heigth: 40px;
}

.mu-toast {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
  width: 150px;
}

</style>
