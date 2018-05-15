export default {
    saveUser({commit}, users) {
      console.log(users)
       commit('SAVEUSER', users) 
    }
}

