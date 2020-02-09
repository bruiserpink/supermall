<template>
  <div class="cart-bottom-bar">
    <div class="checkContent">
      <check-button class="checkAll" :is-active="isSelectAll"
      @click.native="checkAll"></check-button>
      <span>全选</span>
    </div>
    <div class="totalPrice">
      合计: {{totalPrice}}
    </div>
    <div class="calculate" @click="calcClick">
      去结算: {{checkLength}}
    </div>
  </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton";
  export default {
    name: "CartBottomBar",
    components: {
      CheckButton
    },
    methods:{
      checkAll() {
        if (this.isSelectAll){
          this.$store.state.cartList.forEach(item => item.checked = false);
        }else{
          this.$store.state.cartList.forEach(item => item.checked = true);
        }
      },
      calcClick() {
        if(this.checkLength===0) {
          this.$toast.show('请选择购买的商品');
        }
      }
    },
    computed: {
      //计算总价格
      totalPrice() {
        //遍历cartList内容，返回所有被选中的商品
        return '￥' + this.$store.state.cartList.filter(item =>{
          return item.checked;
        }).reduce((preValue,item) => {//将所有筛选出的商品价格进行汇总
          return preValue +item.price * item.count;
        },0)
      },
      //计算被选中的个数
      checkLength() {
        return this.$store.state.cartList.filter(item => item.checked).length;
      },
      isSelectAll() {
        if(this.$store.state.cartList.length===0){
          return false;
        }else {
          /* //方法1: 只要筛选出来的数组里(cartList未被选中的元素)长度不为0就返回false
          return !(this.$store.state.cartList.filter(item => !item.checked).length);*/
          //方法二:只要查找到有未被选中的元素就返回false
          return !this.$store.state.cartList.find(item => !item.checked);
        }
      }
    }
  }
</script>

<style scoped>
  .cart-bottom-bar {
    font-size: 14px;
    height: 40px;
    position: relative;
    background: #fff;
    line-height: 40px;
    display: flex;
  }
  .checkContent {
    margin-left: 13px;
    display: flex;
    align-items: center;
  }
  .checkContent span {
    padding-top: 3px;
  }
  .checkAll {
    margin-right: 3px;
    width: 20px;
    height: 20px;
    line-height: 20px;
    flex: 1;
  }
  .totalPrice {
    text-align: center;
    margin-left: 20px;
    padding-top: 2px;
    flex: 1;
  }
  .calculate {
    margin-top: 3px;
    line-height: 32px;
    text-align: center;
    font-size: 14px;
    color: #fff;
    width: 70px;
    padding-top: 2px;
    margin-right: 10px;
    border-radius: 18px;
    height: 34px;
    background: linear-gradient(left,#FE7701,#FE4C01);
  }
</style>
