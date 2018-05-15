import router from '@/router'

export default {
  SAVEUSER(states, users) {
      states.state = users
  },
  loginOut(states) {
    states.state.password = ''
    states.state.username = ''
    router.push('/auth')
  }
}

