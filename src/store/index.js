import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({
  state:{
    counter:0,

  },
  mutations:{//变更
    INCREASE:state => state.counter++,
    RESET: state => state.counter = 0
  },
  actions:{//动作
    inc: context => context.commit('INCREASE'),
    reset: context => context.commit('RESET')
  }
})

export default {
  stateStore: store,
};
