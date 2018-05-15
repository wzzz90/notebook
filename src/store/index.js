import Vue from 'vue'
import Vuex from 'vuex'
import createPersist from 'vuex-localstorage'
import packageJson from '../../package.json'

import event from './event'
import theme from './theme'
import auth from './auth'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    event,
    theme,
    auth
  },
    
      // 使用 vuex-localStorage 持久化页面状态
  plugins: [createPersist({
      namespace: 'notebook',
      expires: 7 * 24 * 60 * 60 * 1e3
  })]
})
