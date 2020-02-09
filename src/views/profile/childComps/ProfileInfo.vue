<template>
  <div class="ProfileInfo">
    <div class="left">
      <img src="~assets/img/common/my.svg" alt="">
    </div>
    <div class="right">
      <span>登录/注册</span>
      <div>暂无绑定手机号</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ProfileInfo"
  }
</script>

<style scoped>
  .ProfileInfo{
    height: 80px;
    width: 100%;
    background: var(--color-tint);
    display: flex;
  }
  .left {
    flex: 1;
    align-items: center;
  }
  .left img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: #fff;
    margin-top: 10px;
    margin-left: 10px;
  }
  .right {
    flex: 4;
    margin-left: 8px;
    line-height: 30px;
    color: #fff;
    margin-top: 12px;
  }
</style>
