const cart = {
  state: {
    isLoading:false
  },

  // mutation是必须的, state的值, 只能通过mutation来改变
  // mutations 约定：大写 +
  mutations: {
    // 修改loading状态
    UPDATA_LOADINGSTATUS(state, flag) {
      state.isLoading = flag
    },
  },

  // Action 类似于 mutation，不同在于：
  // Action 提交的是 mutation，而不是直接变更状态
  // Action 可以包含任意异步操作
  actions: {
    

  },

}

export default cart
