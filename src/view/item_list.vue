<template>
    <div class="item-content">
    	<div class="item-tab" @click="changeCollapse('0', $event)">
    	    <p>未完成事项</p>
    	    <div class="btn-container">
    	       <button class="done-btn" @click.stop="moveToDone">移至已完成</button>
      	     <button class="cancel-btn" @click.stop="moveCancel">取消事项</button>
         	   <span class="iconfont icon-jiantou8" v-show="!collapse[0]"></span>  
             <span class="iconfont icon-youjiantou" v-show="collapse[0]"></span>
    	    </div>

    	</div>
            <div class="item-box">
                <ul>
                    <li v-for="(item, index) in toDoList" :key="index" class="item-list" @click="select(index)">
                        <input type="checkbox" @click="toggle(index, item.id)" :id="'item'+index"></input>
                        <div class="done-item-content">
                          <span>{{item.content}}</span>
                          <span>{{item.time}}</span>
                        </div>
                    </li>
                </ul>
            </div>    	    
    	
    	
    	<div class="item-tab" @click="changeCollapse('1', $event)">
            <p>已完成事项</p>
            <div class="btn-container">
               <button class="todo-btn" @click.stop="moveToDo">移至未完成</button>          
               <span class="iconfont icon-jiantou8" v-show="!collapse[1]"></span>  
               <span class="iconfont icon-youjiantou" v-show="collapse[1]"></span>
            </div>

        </div>
            <div class="item-box">
                <ul>
                    <li v-for="(item, index) in doneList" :key="index" class="item-list" @click="select(index)">
                        <input type="checkbox" @click="toggle(index, item.id)" :id="'item'+index"></input>
                        <div class="done-item-content">
                            <span>{{item.content}}</span>
                            <span>{{item.time}}</span>
                        </div>
                    </li>
                </ul>
            </div>          
        
        <div class="item-tab" @click="changeCollapse('2', $event)">
            <p>已取消事项</p>
            <div class="btn-container">
               <button class="todo-btn" @click.stop="moveToDo">恢复</button>          
               <span class="iconfont icon-jiantou8" v-show="!collapse[2]"></span>  
               <span class="iconfont icon-youjiantou" v-show="collapse[2]"></span>
            </div>

        </div>
            <div class="item-box">
                <ul>
                    <li v-for="(item, index) in cancelledList" :key="index" class="item-list" @click="select(index)">
                        <input type="checkbox" @click="toggle(index, item.id)" :id="'item'+index"></input>
                        <div>{{item.content}}</div>
                    </li>
                </ul>
            </div>              

    </div>
</template>

<script>
    export default {
        data() {
            return {
                collapse: [false, false, false],
                ids: []
            }
        },
        computed: {
            toDoList() {
                return this.$store.getters.toDoList
            },
            doneList() {
                return this.$store.getters.doneList  
            },
            cancelledList() {
                return this.$store.getters.cancelledList  
            }
        },
        
        mounted() {
          const that = this
          if(this.toDoList.length > 0) {
            const year = new Date().getFullYear(),
                  month = (new Date().getMonth() + 1) > 9 ? (new Date().getMonth() + 1) : '0' + (new Date().getMonth() + 1),
                  day = new Date().getDate() > 9 ? new Date().getDate() : '0' + new Date().getDate();
            let date = `${year}-${month}-${day}`
            
            this.toDoList.forEach((value, index) => {
              if(value.time == date) {
                Notification.requestPermission(function (permission) {  
                  var notification = new Notification("您有一条新的消息",{  
                      dir: "auto",  //表示提示主体内容的水平书写顺序
                      lang: "zh-CN",  
                      tag: value.id,//实例化的id  
                      icon: '@/assets/logo.png',  
                      body: value.content,
                      renotify: false
                  })  
                })
              }
            })
          } else {
            Notification.requestPermission(function (permission) {  
              var notification = new Notification("您有一条新的消息",{  
                  dir: "auto",  //表示提示主体内容的水平书写顺序
                  lang: "zh-CN",  
                  tag: "待办事项",  
                  icon:'ant.png',  
                  body: '亲，您没有待办事项，快去创建一个吧',
                  renotify: false
              });   
                
            })            
          }
        },
        
        methods: {
            select(index) {
                //document.getElementById(`item${index}`).checked = true
                console.log(this.ids)
            },
            
            toggle(index, id) {
                let i;
               let data = this.ids.filter((value, index1) => {
                   if(value == id) {
                       i = index1
                   }
                   return value == id
               })
               if(data.length > 0) {
                  this.ids.splice(index, 1) 
               } else {
                   this.ids.push(id)
               }
            },
            
            changeCollapse(index, event) {
                const show = !this.collapse[index]
                if(show) {
                    this.openCollapse(event);
                } else {
                    this.closeCollapse(event);
                }
                this.collapse.splice(index, 1, !this.collapse[index])
            },
            
             // 关闭折叠面板
            closeCollapse(event){
                let ulElement = event.currentTarget.nextElementSibling,
                    children = ulElement.getElementsByTagName('ul')[0];
                ulElement.style.height = children.offsetHeight + 'px';
                setTimeout(() => {
                    ulElement.style.height = '0px';
                    setTimeout(() => {
                        ulElement.style.display = 'none';
                    }, 300)
                },10)
            },
            
            // 打开折叠面板
            openCollapse(event){ 
                let ulElement = event.currentTarget.nextElementSibling,
                    children = ulElement.getElementsByTagName('ul')[0];
                    ulElement.style.display = 'block';
                    ulElement.style.height = children.offsetHeight + 'px';
                setTimeout(() => {
                    ulElement.style.height = 'auto';
                }, 300)
            },            
            
            
            moveToDone() {
                this.event('itemDone')
            },
            
            moveToDo() {
                this.event('itemToDo')
            },
            
            moveCancel() {
                this.event('itemCancel')
            },
            
            event(action) {
               if(this.ids.length == 0) {
                    this.$toast('请选择待办事项')
                    return
                } else {
                    this.$store.dispatch(action, this.ids)
                    this.ids = []
                    this.toDoList.forEach((value, index) => {
                      
                      console.log(document.getElementById(`item${index}`))
                      if(document.getElementById(`item${index}`)) document.getElementById(`item${index}`).checked = false 
                       
                    })
                    this.doneList.forEach((value, index) => {
                       if(document.getElementById(`item${index}`)) document.getElementById(`item${index}`).checked = false 
                    })
                    this.cancelledList.forEach((value, index) => {
                       if(document.getElementById(`item${index}`)) document.getElementById(`item${index}`).checked = false 
                    })
                } 
            },
            notification(content) {
                Notification.requestPermission(function (permission) {  
                  var notification = new Notification("您有一条新的消息",{  
                      dir: "auto",  //表示提示主体内容的水平书写顺序
                      lang: "zh-CN",  
                      tag: "待办事项",  
                      icon: '@/assets/logo.png',  
                      body: content,
                      renotify: false
                  })  
                })              
            }
            
        }
    }
</script>

<style lang="scss" scoped="scoped">
     /*.fade-enter,
    .fade-leave-active {
      opacity: 0;
      transform: translate(-50%, -100%); 
    } */
    .fade-enter, .fade-leave-to {
        opacity: 0.6;
        transform: translate3d(0, -10px, 0); 
    }
    .fade-enter-to, .fade-leave {
        opacity: 1;
        transform: translate3d(0, 0, 0); 
    }
    
   .item-content {
        .item-tab {
            position: relative;
            height: 44px;
            line-height: 44px;
            padding-left: 20px;
            border-bottom: 1px solid #fff;
            box-sizing: border-box;
            color: #fff;
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            .btn-container { 
              &>span {
                  margin: 0 10px;
              }
              &>button {
                margin-left: 10px;
                color: #0000ff;
                padding: 5px;
                border: none;
                cursor: pointer;
              }
            }
        }     
        .item-box {
            list-style: none;
            overflow: hidden;
            border: {
                left: 1px solid #eee;
                right: 1px solid #eee;
            }
            transition: height .3s;
            display: none;
            height: 0;
            .item-list {
                position: relative;
                min-height: 44px;
                line-height: 25px;
                padding: 10px 15px 10px 50px;
                box-sizing: border-box;
                border-bottom: 1px solid #eee;
                color: #373e40;
                input[type=checkbox] {
                    position: absolute;
                    left: 15px;
                    top: 12px;
                    width: 20px;
                    height: 20px;
                }
                .done-item-content {
                    display: flex;
                    justify-content: space-between;
                }
                .cancel-btn {
                    position: absolute;
                    right: 10px;
                    top: 7px;
                    width: 50px;
                    height: 30px;
                    line-height: 30px;
                    padding: 0;
                    background: #fff;
                    border: 1px solid #c0ccda;
                    color: #666;
                    font-size: 12px;
                }
                .event-time {
                    position: absolute;
                    right: 10px;
                    top: 0;
                    line-height: 44px;
                    font-size: 12px;
                    color: #aaa;
                }
                .event-delete {
                    text-decoration: line-through;
                    color: #999;
                }
            }
        }
    }
</style>