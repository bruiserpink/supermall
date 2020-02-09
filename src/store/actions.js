import * as allName from './mutations-types'
export default {
  //Product3：添加商品信息至购物车
  addCart(context,payload) {
    //当需要在某异步操作执行完之后执行某操作，可以使用promise对象传递resolve信息，
    // 然后执行.then方法中进行下一步操作
    return new Promise(((resolve) => {
        /* 方法1
       let oldProduct = null;
       //判断已经添加的商品是否已有
       for(let item of state.cartList){
         if(item.iid===payload.iid){
           //设置oldProduct不为空
           oldProduct = item ;
         }
       }*/
      //方法2
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid);
      //判断旧商品信息不为空时，给其数量+1
      if(oldProduct) {
        //使用context.commit方法将单一状态传递给mutations
        context.commit(allName.ADD_COUNTER,oldProduct);
        resolve('此商品数量+1');
      }else {
        //如果旧商品为空时，为其添加count属性为1
        payload.count = 1;
        context.commit(allName.ADD_TO_CART,payload);
        resolve('添加了新的商品');
      }
    }))
  }
}
