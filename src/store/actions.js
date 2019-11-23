// 导入常量
import {
	ADD_COUNTER,
	ADD_TO_CART
} from './mutations-types'


export default {
	addCart(context, payload) {
    // 可以es6 中的对象结构赋值方法,而context对象的含义，上下文，属性包括state和commit，
    // context.commit('fn_name', param):数据从actions传递到mutations的方法
    // context.state:表示直接被调用的$store.state，但是不提倡使用
		// addCart({state, commit}, payload) {

		//1 判断传入的新的产品是否已经被加入了购物车的数组中,并且获取该相同的商品
		// let OldProduct = null;
		// for (let item of state.cartList) {
		//   if (item.iid === payload.iid) {
		//     OldProduct = item;
		//   }
		// }
		return new Promise((resolve, reject) => {
			let OldProduct = context.state.cartList.find(item => item.iid === payload.iid)

			//2 判断oldproduct是否有值
			if (OldProduct) {
				// 不建议（不能）在actions中直接修改state中的数据，因为无法跟踪到actions中的数据的（数据）状态
				// OldProduct.count += 1;
				context.commit(ADD_COUNTER, OldProduct)
				resolve('当前商品已加入购物车，数量+1')
			} else {
				payload.count = 1;
				// 不建议（不能）在actions中直接修改state中的数据，因为无法跟踪到actions中的数据的（数据）状态
				// state.cartList.push(payload)
				// 在actions中使用commit(fn_name, param)的方法将经过复杂计算的数据传递给mutations
				context.commit(ADD_TO_CART, payload)
				resolve('添加购物车成功')
			}
		})
  }
}

