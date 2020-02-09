module.exports = {
  plugins: {
    autoprefixer:{},
    'postcss-px-to-viewport': {
      viewportWidth: 375,//视口的宽度，及设计稿的宽度
      viewportHeight: 667,//视口的高度，也可以不配置
      unitPrecision: 5,//指定px转化单位的小数位个数
      viewportUnit: 'vw',//指定需要转化成的单位，建议vw
      selectorBlackList: ['ignore','tab-bar','tab-bar-item'],//指定不需要转化的类
      minPixelValue: 1,//小于/等于多少px不转化
      mediaQuery: false,//允许在媒体查询中转换px
      exclude: [/^TabBar/]
    },
  }
}
