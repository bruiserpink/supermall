<template>
  <div id="home">
    <router-view></router-view>
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <!--这个tabcontrol用来在滑动到最上面位置的时候，代替原来的tabcontrol-->
    <tab-control ref="tabcontrol1" class="tab-control" @tabClick="tabClick"
    v-show="isTabFixed" :titles="['流行','新款','精选']"></tab-control>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="ContentScroll"
      :pull-up-load="true" @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImagesLoad="swiperImagesLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-views></feature-views>
      <tab-control ref="tabcontrol2"  @tabClick="tabClick"
      :titles="['流行','新款','精选']"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <!--给组件监听点击必须用到click.native，即原生点击-->
    <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureViews from "./childComps/FeatureViews";

  import NavBar from 'components/common/navbar/NavBar';
  import TabControl from "components/content/tabcontrol/TabControl";
  import GoodsList from "components/content/goods/GoodsList";
  import Scroll from "components/common/scroll/Scroll";
  import {debounce} from "Bcommon/utils";
  import {getHomeMultidata,getHomeGoods} from "network/home";
  import {backTopMixin} from 'Bcommon/mixin'
  export default {
    name: "Home",
    mixins: [backTopMixin],
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureViews,
      TabControl,
      GoodsList,
      Scroll,
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {
            page: 0,
            list: []
          },
          'new': {
            page: 0,
            list: []
          },
          'sell': {
            page: 0,
            list: []
          }
        },
        currentType: 'pop',
        tabOffsetTop: 0,
        isTabFixed: false,
        //保存离开home页面时滑动的y值
        saveY: 0,
        itemImgListener: null
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    //首页创建成功后直接发送网络请求
    created() {
      //请求banner和recommends数据
      this.getHomeMultidata();
      //请求三类商品的第一页数据
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');
    },
    //home组件活跃时此函数执行
    activated() {
      this.$refs.scroll.refresh();
      //设置滚动的y值为离开前的值
      this.$refs.scroll.scrollTo(0,this.saveY,0);
    },
    //home组件不活跃时此函数执行
    deactivated() {
      //保存离开时的y值
      this.saveY = this.$refs.scroll.getScrollY();
      //为了让其他路由复用GoodsList组件时，能够监听其他其他页面的itemImageLoad事件然后
      // 刷新scroll的可滚动高度。此处取消全局事件的监听
      this.$bus.$off('itemImageLoad',this.itemImgListener);
    },
    mounted() {
      //由于此处的代码在Detail的代码进行了复用，所以此处使用mixin导入的函数
      /* better-scroll的工作原理是当执行创建实例对象时，其会计算当前页面元素高度DH和
      我们自己指定的视口高度VH差，然后可滚动区域就是DH-VH。由于图片是异步加载的
      如果其计算DH高度时，图片未加载出来，其DH-VH高度会低于实际图片加载出来的高度，
      所以会造成滚动组件会在某处卡住，我们可以在图片异步加载完成后再执行scroll实例对象
      的refresh方法，让其重新计算可滚动高度，这样就解决的滚动问题*/
      /*因为每张item图片加载完成后都会将消息发给$bus事件总线，所以此处会发生连续30次请求。
        但是我们需要的只是所有的图片加载完成再发生请求，所以需要做一个防抖，即隔一小段时
        间检测请求是否发生变化，若在一小段时间内请求变化了就只发出最新的请求。直到请求不再
        改变，说明一次的item图片已经加载完成，再发送最终请求让其执行refresh重新计算可滚动高度*/
      //将this.$refs.scroll.refresh函数传入debounce函数中，生成一个新的函数refresh
      const refresh = debounce(this.$refs.scroll.refresh,200);//直接使用utils中导入的防抖函数
      //对home路由下监听的事件进行保存
      this.itemImgListener = ()=>{
        refresh();
      };
      //监听事件总线里的itemImagesLoad事件。$bus是一个new Vue()的实例，用来做事件总线
      this.$bus.$on('itemImagesLoad',this.itemImgListener)
    },
    methods: {
      //网络请求相关方法
      getHomeMultidata() {
        getHomeMultidata().then(res=>{
          this.banners = res.data.data.banner.list;
          this.recommends = res.data.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page+1;
        getHomeGoods(type,page).then(res=>{
          this.goods[type].list.push(...res.data.data.list);
          this.goods[type].page += 1;
        })
      },
      //事件监听方法
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop';
            break;
          case 1:
            this.currentType = 'new';
            break;
          case 2:
            this.currentType = 'sell';
        }
        //设置两个tabcontrol栏的无论谁修改了状态，另一个状态和第一个一致
        this.$refs.tabcontrol1.currentIndex = index;
        this.$refs.tabcontrol2.currentIndex = index;
      },

      //设置回到顶部功能，因为在detail也要用此方法，所以将其提取在混入中

      //监听滚动事件并传入滚动的值
      ContentScroll(position) {
        //1.设置回到顶部按钮的是否显示,此方法被抽取在mixin中
        this.isShowBack(position);
        //2.决定tabControl是否吸顶
        this.isTabFixed = (-position.y) > this.tabOffsetTop;
      },
      //到底部加载更多
      loadMore() {
        this.getHomeGoods(this.currentType);
        this.$refs.scroll.finishPullUp();
      },
      /*1. 为了获取tabControl的位置，所以需要检测是不是所有的图片都加载完毕了。
      由于此页面在tabControl上面的其他小图一般加载的很快，所以此处仅检测轮播图是否加载完*/
      /*2. 获取tabControl的offsetTop。由于组件内部并没有一个属性offsetTop，所以需要使用
      组件的属性$el获取某个组件中的元素。但是要注意，必须在所有的元素加载完毕后获取的高度才是有效地*/
      swiperImagesLoad() {
        this.tabOffsetTop = this.$refs.tabcontrol2.$el.offsetTop;
      },
    }
  }
</script>

<style scoped>
  #home{
    height: 100vh;
    position: relative;
  }
  .home-nav{
    background: var(--color-tint);
    color: #fff;
    font-size: 16px;
/*    position: fixed;
    left: 0;
    right: 0;
    top: 0;*/
  }
  .tab-control{
    position: relative;
    z-index: 10;
  }
  .content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
  }
</style>
