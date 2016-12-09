<template>
  <div class="order-modal">
    <mu-popup position="bottom" popupClass="demo-popup-bottom" :open="bottomPopup" @close="close('bottom')">
      <slot name="header"></slot>
      <mu-content-block>
        <ul class="list">
          <li class="item item-input">
            <span class="input-label">
              <slot name="slot_one_label"></slot>
            </span>
            <span class="input-content">
              <slot name="slot_one_content"></slot>
            </span>
          </li>
          <li class="item item-input">
            <span class="input-label">
              <slot name="slot_two_label"></slot>
            </span>
            <span class="input-content">
              <slot name="slot_two_content"></slot>
            </span>
          </li>
          <li class="item item-input">
            <span class="input-label">
              <slot name="slot_three_label"></slot>
            </span>
            <span class="input-content">
              <slot name="slot_three_content"></slot>
            </span>
          </li>
          <li class="item item-input">
            <span class="input-label">
              <slot name="slot_four_label"></slot>
            </span>
            <span class="input-content">
              <slot name="slot_four_content"></slot>
            </span>
          </li>
          <li class="item item-input">
            <span class="input-label">
              <slot name="slot_five_label"></slot>
            </span>
            <span class="input-content">
              <slot name="slot_five_content"></slot>
            </span>
          </li>
          <li class="item item-input">
            <span class="input-label">
              <slot name="slot_six_label"></slot>
            </span>
            <span class="input-content">
              <slot name="slot_six_content"></slot>
            </span>
          </li>
          <li class="item item-input">
            <span class="input-label">
              <slot name="slot_seven_label"></slot>
            </span>
            <span class="input-content">
              <slot name="slot_seven_content"></slot>
            </span>
          </li>
          <li class="item item-input">
            <span class="input-label">
              <slot name="slot_eight_label"></slot>
            </span>
            <span class="input-content">
              <slot name="slot_eight_content"></slot>
            </span>
          </li>
        </ul>
        <div class="button-bar">
          <slot name="sell"></slot>
          <a class="button button-dark" ng-click="hold_order_modal.hide()">关闭</a>
        </div>
      </mu-content-block>
    </mu-popup>
  </div>
</template>

<script>
  export default{
    name: 'popupModal'
  }
</script>

<style>
.order-modal-header {
    border: none;
    background-image: none;
    background-color: black;
    height: 0.4rem;
    line-height: 0.4rem;
}

.order-modal-header h1 {
    color: white;
    font-size: 0.14rem !important;
}
.order-modal-header  .title{
		height:0.4rem !important;
		line-height: 0.4rem !important;
}
.order-modal-header .close {
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

.order-modal-content {
    background-color: rgb(30, 30, 40);
}

.order-modal-content .list > .item {
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

.order-modal-content .list > .item input {
    color: white;
}

.order-modal .button-bar {
    bottom: 0px;
    left: 0px;
    right: 0px;
    height: 45px;
    line-height: 45px;
    position: absolute;
}

.order-modal .button-bar .button-dark {
    font-size: 14px;
    height: 45px;
    line-height: 45px;
    border: none !important;
    border-radius: 0px 0px 0px 0px;
    background-color: rgb(38, 40, 52);
}

.order-modal .button-bar .button-balanced {
    font-size: 14px;
    border: none !important;
    border-radius: 0px 0px 0px 0px;
    background-color: rgb(185, 60, 65);
}

.order-modal .input-label {
    color: rgb(200, 200, 200);
    font-size: 14px;
    padding-left: 25px;
    padding-top: 0px;
    padding-bottom: 0px;
}

.order-modal .input-content {
    color: rgb(200, 200, 200);
    font-size: 14px;
}

</style>
