export default {
  showMore(states) {
    return states.state.showMore
  },
  toDoList(states) {
      return states.state.event.filter((item) => {
          if(item.type === 1) return item
      })
  },
  doneList(states) {
      return states.state.event.filter((item) => {
          if(item.type === 2) return item
      })
  },
  cancelledList(states) {
      return states.state.event.filter((item) => {
          if(item.type === 3) return item
      })
  },
  getItemList(states) {
      return states.state.event
  }
}
