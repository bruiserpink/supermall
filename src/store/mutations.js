import * as allName from './mutations-types'
export default {
  /*    一般来说，使用mutations一个方法尽量只改变单一的状态，方便于devtool监听状态的改变
    所以设计原则是，如果一个mutations的方法执行多个状态操作时，将其放在action里面，
    然后再在mutations内部进行进一步的分离*/

  [allName.ADD_COUNTER](state,payload) {
    payload.count++;
  },
  [allName.ADD_TO_CART](state,payload) {
    payload.checked = true;
    state.cartList.push(payload);
  }
}
