import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'



Vue.use(Vuex)
// 还可以把state对象也抽取出来
const state = {
  cartList: []
}
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

export default store;
