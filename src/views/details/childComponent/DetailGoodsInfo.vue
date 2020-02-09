<template>
  <div v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
    <div class="info-desc clear-fix">
      <div class="start">
      </div>
      <div class="desc">{{detailInfo.desc}}</div>
      <div class="end"></div>
    </div>
    <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
    <div class="info-list">
      <img v-for="(item, index) in detailInfo.detailImage[0].list" :src="item" alt=""
      @load="imgsLoad">
    </div>
  </div>
</template>

<script>
	export default {
		name: "DetailGoodsInfo",
    props: {
      detailInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
		  return {
		    counter: 0,
        imagesLength: 0
      }
    },
    methods: {
		  //当每张图片加载成功时执行此方法，counter+1然后将其与imagesLength对比，
      // 当发现所有图片加载完之后，子组件发送一次imagesLoad事件给父组件，
      // 但是在所有图片加载完成之前不会刷新高度，所以依然可能有卡顿
      imgsLoad() {
        if(++this.counter === this.imagesLength){
          this.$emit('imagesLoad');
        }
      },
    },
    watch: {
		  //监听detailInfo对象数据的变化，当从父组件传过来的detailInfo发送变化时，
      // 执行此函数再次获取所有图片的总个数
      detailInfo() {
        this.imagesLength = this.detailInfo.detailImage[0].list.length;
      }
    }
	}
</script>

<style scoped>
  .goods-info {
    padding: 20px 0;
    border-bottom: 5px solid #f2f5f8;
  }

  .info-desc {
    padding: 0 15px;
  }

  .info-desc .start, .info-desc .end {
    width: 90px;
    height: 1px;
    background-color: #a3a3a5;
    position: relative;
  }

  .info-desc .start {
    float: left;
  }

  .info-desc .end {
    float: right;
  }

  .info-desc .start::before, .info-desc .end::after {
    content: '';
    position: absolute;
    width: 5px;
    height: 5px;
    background-color: #333;
    bottom: 0;
  }

  .info-desc .end::after {
    right: 0;
  }

  .info-desc .desc {
    padding: 15px 0;
    font-size: 14px;
  }

  .info-key {
    margin: 10px 0 10px 15px;
    color: #333;
    font-size: 15px;
  }

  .info-list img {
    width: 100%;
  }
</style>
