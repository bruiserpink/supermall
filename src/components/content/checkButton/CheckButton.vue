<template>
  <div class="check-button" :class="{active: isActive}">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
  export default {
    name: "CheckButton",
    props: {
      isActive: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style scoped>
  .check-button{
    background: #fff;
    border-radius: 50%;
    border: 2px solid #ddd;
  }
  .active {
    border-color: var(--color-high-text);
    background: var(--color-high-text);
  }
</style>
