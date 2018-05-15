<template>
  <div class="item-tools">
    <ul class="tools-sidebar">
        <li>
            <button class="tools-btn" @click="switchTheme">切换主题</button>
        </li>
        <li>
            <button class="tools-btn" @click="downloadData('notepad.txt',getData)">下载数据</button>
        </li>
        <li>
            <button class="tools-btn" @click="uploadData()">导入数据</button>
        </li>
        <li>
            <button class="tools-btn" @click="openTable">编辑数据</button>
        </li>
        <li>
            <button class="tools-btn" @click="clearData">清空数据</button>
        </li>
        <li>
            <button class="tools-btn" @click="loginOut">注销用户</button>
        </li>
    </ul> 
        <div class="touxiang">
          <img src="../assets/login-bg.jpg"/>
          <p>{{this.$store.getters.getUser}}</p>
        </div>
    <transition name="dialog">
        <Dialog v-show="dialog" :dial_Data="dial_Data" @cancel="dialog = false" @confirm="confirmDial"></Dialog>
    </transition>    
  </div>

</template>

<script>
      import Dialog from './dialog'
    export default {
        data() {
            return {
                dial_Data: {
                  dial_type: '',
                  msg: '',  
                },
                dialog: false,  
            }
        },
        components: {
          Dialog,
        },
        computed: {
            getData() {
               return JSON.stringify(this.$store.state.event.state)
            },
        },
        mounted() {
        },
        
        methods: {
           clearData() {
                this.dial_Data.dial_type = 'clearData'
                this.dial_Data.msg = '您确定要清空数据？'
                this.dialog = true
           },
           
           loginOut() {
              this.dial_Data.dial_type = 'loginOut'
              this.dial_Data.msg = '您确定要退出登录吗？'
              this.dialog = true
           },
           
           openTable() {
               this.$router.push('table')
           },
           switchTheme() {
               this.$router.push('theme')
           },
           downloadData(fileName, content){
               if(JSON.parse(content).event.length > 0) {
                    let aTag = document.createElement('a');
                    let blob = new Blob([content]);
                
                    aTag.download = fileName;
                    aTag.href = URL.createObjectURL(blob);//根据传入的参数创建一个指向该参数对象的URL
                    aTag.click();
                    this.$toast('下载成功')
                    URL.revokeObjectURL(blob);//释放一个通过URL.createObjectURL()创建的对象URL                
               } else {
                   this.$toast('暂无数据，无法下载')
               }

            },
            uploadData() {
                this.dial_Data.dial_type = 'upload'
                this.dialog = true
            },
            confirmDial() {
                switch (this.dial_Data.dial_type){
                  case 'clearData':
                      this.$store.commit('clearData')
                      this.dialog = false
                      this.$toast('清空数据成功')
                    break;
                  case 'loginOut':
                    this.dialog = false
                    this.$store.commit('loginOut')
                    //this.$store.commit('changeShow')
                    this.$toast('退出成功')
                    break;
                  case 'delData':
                    this.dialog = false
                    this.$store.commit('delItem', this.del_info)
                    this.$toast('删除成功')
                    break;
                  default:
                    break;
                }
            },
        }
    }
</script>

<style lang="scss" scoped="scoped">
    .item-tools{
        width:250px;
        position: relative;
        height: 100%;
        .tools-sidebar{
          height: 100%;
            & > li{
                line-height: 60px;
            }
        }
        .tools-btn{
            width:100px;
            height:40px;
            line-height: 26px;
            color: #fff;
            transition: background .3s ease-in;
            cursor: pointer;
        }
        pre{
            white-space: pre-wrap;
            font: {
                size: 14px;
                family:  arial,"microsoft yahei";
            }
            line-height: 20px;
        }
        .touxiang {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 80px;
          img {
            width: 100px;
            height: 100px;
            border-radius: 100%;  
            margin-bottom: 5px;          
          }
        }
    }
    .mask {
        width: calc(100%-250px);
        background: rgba(0,0,0,.5);
    }
</style>