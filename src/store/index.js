import Vue from 'vue';
import Vuex from 'vuex';
import moduleLogin from './login/index'
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex);
/*线上环境不允许调试修改state*/
//const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    Login: moduleLogin
  },
  plugins: [createPersistedState({
    storage: window.sessionStorage,
    reducer(val) {
      return {
        'Login': val.Login
      }
    }
  })],
  strict: false
})