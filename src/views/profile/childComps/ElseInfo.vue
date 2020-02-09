<template>
  <div class="elseInfo">
    <div class="left">
      <span class="number">{{myBalance}}</span>
      <span class="company">元</span>
      <div>我的余额</div>
    </div>
    <div class="center">
      <span class="number">{{myDiscount}}</span>
      <span class="company">个</span>
      <div>我的优惠</div>
    </div>
    <div class="right">
      <span class="number">{{myIntegral}}</span>
      <span class="company">分</span>
      <div>我的积分</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ElseInfo",
    props: {
      myBalance: 0,
      myDiscount: 0,
      myIntegral: 0
    },
  }
</script>

<style scoped>
  .elseInfo {
    text-align: center;
    display: flex;
    height: 80px;
    background: #fff;
    line-height: 20px;
    padding-top: 20px;
    margin-bottom: 10px;
  }
  .left {
    flex: 1;
  }
  .center {
    flex: 1;
  }
  .right {
    flex: 1;
  }
  .company {
    font-size: 13px;
  }
  .number {
    font-size: 24px;
    font-weight: bold;
    color: #FF5F3E;
  }
</style>
