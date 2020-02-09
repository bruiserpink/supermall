<template>
  <div class="line-item">
    <div class="icon">
      <slot name="icon"></slot>
    </div>
    <div class="item-name">
      <slot name="item-name"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "LineItem",

  }
</script>

<style scoped>
  .line-item {
    width: 100%;
    height: 45px;
    background: #fff;
    border-bottom: 1px solid #ddd;
    display: flex;
    line-height: 45px;
  }
  .icon {
    flex: 1;
  }
  .icon img{
    width: 20px;
    height: 20px;
    margin-top: 11px;
    margin-left: 11px;
  }
  .item-name {
    flex: 7;
    font-size: 14px;
  }
</style>
