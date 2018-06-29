const mutations = {
  switchMenu(state){
    state.isSpread = !state.isSpread
  },
  login(state){
    state.isLogin = !state.isLogin
  },
  getRecords(state,records){
    state.records = records;
  },
  userData(state,userData){
    state.userData = userData;
  },
  Progress_Show(state,Progress_Show){
    state.Progress_Show = Progress_Show;
  },
  isFixed(state){
    state.isFixed = !state.isFixed;
  },
}

export default mutations
