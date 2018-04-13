import * as type from './mutations_types.js'

const getDate = () => {//获取当天日期
   const date = new Date(),
         month = (parseInt(date.getMonth()) + 1) > 9 ? (parseInt(date.getMonth()) + 1) : '0' + (parseInt(date.getMonth()) + 1);
   return date.getFullYear() + '-' + month + '-' + date.getDate()
   
}

export default {
  changeShow(states) {
    states.state.showMore = !states.state.showMore
  },
  
  clearData(states) {
    states.state.count = 0
      states.state.event = []
  },
  
  delItem(states, params) {
      states.state.event.splice(params.index, 1)
  },
  
  editItem(states, params) {
      states.state.event.forEach((value, index) => {
          if(value.id === params.id) {
             states.state.event.splice(index, 1, params) 
          }
      })
  },
  
  [type.ADDITEM](states, obj) {
    states.state.count ++
    obj.id = states.state.count
    states.state.event.unshift(obj)
  },
  [type.ITEMDONE](states, arr) {
    console.log(states)
    console.log(arr)
      let item;
      
      states.state.event.forEach((value, index) => {
         arr.ids.forEach(value1 => {
             if(value1 == value.id) {
                states.state.event[index].time = getDate();
                states.state.event[index].type = 2
                item = states.state.event[index]
                states.state.event.splice(index, 1, item)
             }
         })
      })  
  },
  
  [type.ITEMTODO](states, arr) {
      let item;
      
      states.state.event.forEach((value, index) => {
         arr.ids.forEach(value1 => {
             if(value1 == value.id) {
                states.state.event[index].type = 1
                item = states.state.event[index]
                states.state.event.splice(index, 1, item)
             }
         })
      }) 
  },
  
  [type.ITEMCANCEL](states, arr) {
      let item;
      
      states.state.event.forEach((value, index) => {
         arr.ids.forEach(value1 => {
             if(value1 == value.id) {
                states.state.event[index].type = 3
                item = states.state.event[index]
                states.state.event.splice(index, 1, item)
             }
         })
      })
  },
  
  [type.UPLOADEVENT](states, params) {
    params = JSON.parse(params)

    states.state.count = params.count
    states.state.event = params.event
  
  }, 
}
