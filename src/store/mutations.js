// 导入常量
import {
	ADD_COUNTER,
	ADD_TO_CART
} from './mutations-types'

export default {
	// {
    //mutationa唯一的目的是修改state中的（数据）状态
    // mutations中的每一个方法尽可能完成的事件比较单一一点
    // 当前mutations中执行了两件事，一件是已有的商品+1，另一件是新的商品数量为1
    // 一般这种判断逻辑的方法放到actions中，actions中不仅放异步操作，也放逻辑比较复杂的函数

    // 这种情况下,无法追踪方法addCart中的状态变化
    // addCart(state, payload) {}
    // addCounter(state, payload) {
    //   payload.count++;
    // },
    // addToCart(state, payload) {
    //   state.cartList.push(payload)
    // }
	// }
	
	// 第一版
	// addCounter(state, payload) {
	// 	payload.count++;
	// },
	// addToCart(state, payload) {
	// 	state.cartList.push(payload)
	// }

	// 第二版
	[ADD_COUNTER](state, payload) {
		payload.count++;
	},
	[ADD_TO_CART](state, payload) {
		payload.selected = false;
		state.cartList.push(payload)
		// console.log(payload)
	}

}