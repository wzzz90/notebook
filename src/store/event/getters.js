export default {
  showMore(states) {
    console.log(states)
    return states.state.showMore
  },
  toDoList(states) {
      console.log(states)
      return states.state.event.filter((item) => {
          if(item.type === 1) return item
      })
  },
  doneList(states) {
      console.log(states)
      return states.state.event.filter((item) => {
          if(item.type === 2) return item
      })
  },
  cancelledList(states) {
      console.log(states)
      return states.state.event.filter((item) => {
          if(item.type === 3) return item
      })
  },
  getItemList(states) {
      return states.state.event
  }
}
