// 在getters中创建读取和使用state中的数据的方法

export default {
	cartLength(state) {
		return state.cartList.length
	},
	cartList(state) {
		return state.cartList
	}

}