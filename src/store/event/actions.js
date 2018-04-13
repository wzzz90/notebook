export default {
  addItem({commit}, params) {
     commit('ADDITEM', params) 
  },
  itemDone({commit}, params) {
     commit('ITEMDONE', {ids: params}) 
  },
  itemToDo({commit}, params) {
     commit('ITEMTODO', {ids: params}) 
  },
  itemCancel({commit}, params) {
     commit('ITEMCANCEL', {ids: params}) 
  },
  uploadEvent({commit}, params) {
     commit('UPLOADEVENT', params) 
  }
}
