<template>
  <div class="goods-item" @click="itemClick">
    <img v-lazy="showImage" alt="" @load="imagesLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodsListItem",
    props: {
      goodsItem: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    computed: {
      showImage() {
        if(this.$route.path === '/category'){
          return  this.goodsItem.img;
        }else if(this.$route.path === '/home'){
          return this.goodsItem.image || this.goodsItem.show.img;
        }
      }
    },
    methods: {
      //@load函数在图片加载完之后执行
      imagesLoad() {

        /*load函数在每一张图片加载完成时都会执行一次，我们将每次图片加载完成告诉scroll组件，
        然后让其执行一次refresh函数，重新计算可滚动的高度。
        所以引入一个新的概念:事件总线，事件总线类似于vuex,但是用于管理事件的变化，使用this.$bus.emit('aaa')
       发送事件至总线，使用this.$bus.on('aaa',function(){})接收事件总线的aaa事件*/
        this.$bus.$emit('itemImagesLoad');
      },
      itemClick() {
        this.$router.push('/detail/'+ (this.goodsItem.iid || this.goodsItem.item_id));
      }
    }
  }
</script>

<style scoped>
  .goods-item {
    width: 48%;
    padding-bottom: 40px;
    position: relative;
  }
  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: 0;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
