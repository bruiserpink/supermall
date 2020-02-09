<template>
  <transition name="fade">
    <div class="toast" v-show="isShow">
      {{message}}
    </div>
  </transition>
</template>

<script>
  export default {
    name: "Toast",
    data() {
      return {
        message: '',
        isShow: false
      }
    },
    methods: {
      //ES6语法设置默认参数
      show(message='默认信息',duration=1500) {
        this.message = message;
        this.isShow = true;
        setTimeout(()=>{
          this.message = '';
          this.isShow = false;
        },duration)
      }
    }
  }
</script>

<style scoped>
  .toast{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    color: #fff;
    background: rgba(0,0,0,0.6);
    padding: 8px 10px;
    border-radius: 8px;
    z-index: 999
  }
  .fade-enter-active {
    transition: opacity 1s;
  }
  .fade-enter{
    opacity: 0;
  }
</style>
