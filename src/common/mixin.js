import {debounce} from "./utils";

import BackTop from "components/content/backTop/BackTop";
//抽取监听图片加载完成，然后刷新scroll可滚动高度mixin
export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null
    }
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh,200);//直接使用utils中导入的防抖函数
    //对home路由下监听的事件进行保存
    this.itemImgListener = ()=>{
      refresh();
    };
    //监听事件总线的itemImgLoad事件
    this.$bus.$emit('itemImgLoad',this.itemImgListener);
  }
};
//抽取回到顶部按钮的方法的mixin
  export const backTopMixin = {
  data() {
    return {
      isShowBackTop: false
    }
  },
  components: {
    BackTop
  },
  methods: {
    backTop () {
      //使用this.$refs.scroll获取到整个scroll组件对象，然后调用其内部变量scroll
      //获取到BScroll对象，然后调用其scrollTo方法，使滚动x,y回到0,且执行时间为1300ms
      // this.$refs.scroll.scroll.scrollTo(0,0,1300);
      //对scroll对象的方法进行封装，提高代码可读性
      this.$refs.scroll.scrollTo(0,0,1300);
    },
    isShowBack(position) {
      if((-position.y)>=1000){
        this.isShowBackTop=true;
      }else {
        this.isShowBackTop=false;
      }
    }
  },
}
