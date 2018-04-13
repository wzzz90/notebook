import Vue from 'vue';
import Main from './message.vue';



let Toast = {}
let Message;

Toast.install = (Vue, options = {}) => {
    Vue.prototype.$toast = (options) => {
        if(!Message) {
            let MessageConstructor = Vue.extend(Main);
            
            Message = new MessageConstructor()
            document.body.appendChild(Message.$mount().$el);            
        }

        if(typeof options == 'string') {
          Message.message = options
        } 
        Message.visible = true
        
        setTimeout(() => {
           Message.visible = false
        }, Message.duration)

    }
    
    ['bottom', 'center', 'top'].forEach(pos => {
        Vue.prototype.$toast[pos] = options => {
            
          if (typeof options === 'string') {
            options.message = options
          } 
          options.pos = pos
          
          return Vue.prototype.$toast(options);
        }
    })
    
}

export default Toast;

