<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="detailNavBar"></detail-nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imagesLoad="imagesLoad"></detail-goods-info>
      <detail-param-info ref="params" :param-info="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <goods-list :goods="recommends" ref="recommends"></goods-list>
    </scroll>
    <!--给组件监听点击必须用到click.native，即原生点击-->
    <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
  </div>
</template>

<script>
  import DetailNavBar from "./childComponent/DetailNavBar";
  import DetailSwiper from "./childComponent/DetailSwiper";
  import DetailBaseInfo from "./childComponent/DetailBaseInfo";
  import DetailShopInfo from "./childComponent/DetailShopInfo";
  import DetailGoodsInfo from "./childComponent/DetailGoodsInfo";
  import DetailParamInfo from "./childComponent/DetailParamInfo";
  import DetailCommentInfo from "./childComponent/DetailCommentInfo";
  import DetailBottomBar from './childComponent/DetailBottomBar'
  import GoodsList from "components/content/goods/GoodsList";
  import {itemListenerMixin,backTopMixin} from 'Bcommon/mixin'

  import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "network/detail";
  import Scroll from 'components/common/scroll/Scroll';
  export default {
    name: "Detail",
    mixins : [itemListenerMixin,backTopMixin],
    data() {
      return {
        iid: null,
        topImages: [],
        goods:{},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopS: [],
        nowIndex: 0,
        //此属性在mixin进行混入
        // itemImgListener: null
      }
    },
    methods: {
      //当接收到imagesLoad事件时，说明图片加载完毕，执行此函数重新获取高度
      imagesLoad() {
        this.$refs.scroll.refresh();
        //图片加载完毕以后获取各个模块的高度
        this.themeTopS = [];
        this.themeTopS.push(0);
        this.themeTopS.push(this.$refs.params.$el.offsetTop);
        this.themeTopS.push(this.$refs.comment.$el.offsetTop);
        this.themeTopS.push(this.$refs.recommends.$el.offsetTop);
      },
      titleClick(index) {
        this.$refs.scroll.scrollTo(0,-(this.themeTopS[index]-44),300);
      },
      //监听滚动事件position
      contentScroll(position) {
        //1.设置回到顶部按钮的是否显示,此方法被抽取在mixin中
        this.isShowBack(position);
        //
        //设置显示的位置
        const positionY = -(position.y-44);
        if(positionY >= this.themeTopS[0] && positionY < this.themeTopS[1]) {
          this.$refs.detailNavBar.currentIndex = 0;
        }else if(positionY >= this.themeTopS[1] && positionY < this.themeTopS[2]) {
          this.$refs.detailNavBar.currentIndex = 1;
        }else if(positionY >= this.themeTopS[2] && positionY < this.themeTopS[3]) {
          this.$refs.detailNavBar.currentIndex = 2;
        }else if (positionY >= this.themeTopS[3]){
          this.$refs.detailNavBar.currentIndex = 3;
        }
      },
      addToCart() {
        // Product1：获取购物车需要的信息
        const product = {};
        product.topImages = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.nowPrice;
        product.iid = this.iid;
        //Product2：将其放在vuex中进行状态共享
        this.$store.dispatch('addCart',product)
            .then(res => {
              //直接使用挂载在Vue实例上$toast插件的show方法
              this.$toast.show(res,2000);
            });
      }
    },
    mounted() {
      //此处的代码执行mixin里面被抽取的函数
    },

    destroyed() {
      this.$bus.$off('itemImageLoad',this.itemImgListener);
    },
    created() {
      //保存传入的iid
      this.iid = this.$route.params.iid;
      console.log(this.iid);
      //请求详情数据
      getDetail(this.iid).then(res=>{
        //获取顶部图片
        const data = res.data.result;
        this.topImages = data.itemInfo.topImages;
        //获取商品信息
        this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services);
        //创建店铺信息
        this.shop = new Shop(data.shopInfo);
        //商品的详情数据
        this.detailInfo = data.detailInfo;
        //获取商品参数信息
        this.paramInfo =new GoodsParam(data.itemParams.info,data.itemParams.rule);
        //获取评论信息
        if(data.rate.cRate !== 0){
          this.commentInfo = data.rate.list[0];
        }
        /* //此函数在页面渲染完成后执行
        this.$nextTick(() => {

        })*/
      });
      //请求推荐数据
      getRecommend().then(res=>{
        this.recommends = res.data.data.list;
      })
    },
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList,
      DetailBottomBar,
    }
  }
</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 10;
    background: #fff;
    height: 100vh;
    overflow: hidden;
  }
  .detail-nav{
    position: relative;
    z-index :10;
    background: #fff;
  }
  .content {
    height: calc(100% - 93px);
  }
</style>
