import Toast from "./Toast";
const obj = {}

obj.install = function (Vue) {//当执Vue.use(toast)时，会调用该方法，且将Vue类以参数形式传给install方法
  //1.创建组件构造器
  const toastContrustor = Vue.extend(Toast);
  //2.new的方式根据组件构造器,可以创建出来一个对象
  const toast = new toastContrustor();
  //3.将组件对象手动挂载到某一个元素上
  toast.$mount(document.createElement('div'));
  //4.此时已经创建好了toast.$el就是上面创建的div。将该挂载组件对象的div添加到body中
  document.body.appendChild(toast.$el);
  //5.将生成的已经被挂载的组件绑定在Vue的原型对象上
  Vue.prototype.$toast = toast;
};

export default obj;
