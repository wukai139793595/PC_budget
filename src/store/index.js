import Vue from 'vue'
import Vuex from 'vuex'

//购物车 store
import cart from './modules/cart'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    cart
  }
})

export default store
