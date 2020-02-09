<template>
  <div class="recommend">
    <tab-control ref="tabcontrol"  @tabClick="tabClick"
                 :titles="['综合','新品','销量']"></tab-control>
    <goods-list :goods="recommendGoods"></goods-list>
  </div>
</template>

<script>
  import {itemListenerMixin} from 'Bcommon/mixin'
  import GoodsList from "components/content/goods/GoodsList";
  import TabControl from "components/content/tabcontrol/TabControl";
  export default {
    name: "Recommend",
    components: {
      GoodsList,
      TabControl
    },
    props: {
      recommendGoods: {
        type: Array,
        default() {
          return []
        }
      }
    },
    methods: {
      tabClick(index) {
        this.$emit('tabControlClick',index);
      }
    },
    mixins: ["itemListenerMixin"],
  }
</script>

<style scoped>
  .recommend {

  }
</style>
