<template>
    <div id="app" :class="[getTheme]">
       <Header @showBar="changeBar"></Header>
       <section class="container" v-show="!showTable">
           <AddItem></AddItem>
           <ItemList></ItemList>
       </section>
        <transition name="slideLeft">
          <div class="sub-router" v-show="showSidebar">
            <router-view></router-view>
          </div>
        </transition>
<!--       <Footer></Footer>-->
        
        <div class="mask" v-show="showSidebar" @click.stop="goback" ref="mask"></div>
        <!--<div id="promoNode">
        	<video id="video" width="640" height="480" autoplay></video>
          <button id="snap" class="sexyButton">Snap Photo</button>
          <canvas id="canvas" width="640" height="480"></canvas>
        </div>-->
    </div>
</template>

<script>
    
    const DETAILS_PATH = '/index/sidebar'
    
    import Header from './header'
    import Footer from './footer'
    import AddItem from './item_add'
    import ItemList from './item_list'
    
    import Calendar from './calendar'
    
    export default {
        data(){
            return {
                dial_Data: {
                  dial_type: '',
                  msg: '',  
                },
                dialog: false,
                showTheme: false,
                showTable: false,
                showCalendar: false,
                del_info: {},
                selDate: '',
            }
        },
        
        components: {
          Header,
          Footer,
          AddItem,
          ItemList,
          Calendar
        },
        computed:{
            getTheme() {
              return this.$store.getters.getTheme
            },
            showSidebar() {
                return this.$store.getters.showMore
            }
        },
        watch: {
          showSidebar(val) {
            const mask = this.$refs.mask
            
            console.log(val)
            if(val) {
              if(mask) document.body.appendChild(mask)
            } else {
              if(mask) document.body.removeChild(mask)
              
              setTimeout(() => {
                this.$router.push('/index')
                //window.history.back()
              }, 300)
            }
          },
          
        },
        beforeDestroy() {
          const mask = this.$refs.mask
          if(mask) document.body.removeChild(mask)
          
        },
        
        mounted() {
          
          if((this.$route.path == '/' || this.$route.path == '/index') && this.showSidebar === true) {
            this.$store.commit('changeShow');
          }
          if((this.$route.path == '/index/sidebar' || this.$route.path == '/index/table') && this.showSidebar === false) {
            this.$store.commit('changeShow');
          }
          
//        window.addEventListener("DOMContentLoaded", function() {
//          var canvas = document.getElementById('canvas');
//          var context = canvas.getContext('2d');
//          var video = document.getElementById('video');
//          var mediaConfig =  { video: true };
//          var errBack = function(e) {
//            console.log('An error has occurred!', e)
//          };
//
//          if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
//              navigator.mediaDevices.getUserMedia(mediaConfig).then(function(stream) {
//                  video.src = window.URL.createObjectURL(stream);
//                  video.play();
//              });
//          } else if(navigator.getUserMedia) { // Standard
//            navigator.getUserMedia(mediaConfig, function(stream) {
//              video.src = stream;
//              video.play();
//            }, errBack);
//          } else if(navigator.webkitGetUserMedia) { // WebKit-prefixed
//            navigator.webkitGetUserMedia(mediaConfig, function(stream){
//              video.src = window.webkitURL.createObjectURL(stream);
//              video.play();
//            }, errBack);
//          } else if(navigator.mozGetUserMedia) { // Mozilla-prefixed
//            navigator.mozGetUserMedia(mediaConfig, function(stream){
//              video.src = window.URL.createObjectURL(stream);
//              video.play();
//            }, errBack);
//          }
//    
//          document.getElementById('snap').addEventListener('click', function() {
//            context.drawImage(video, 0, 0, 640, 480);
//          });
//        }, false);
          
        },
        
        
        methods: {
            
            //删除数据
            delData(del_info) {
              this.dialog = true
              this.dial_Data.dial_type = 'delData'
              this.dial_Data.msg = '您确定要删除数据？'
              this.del_info = del_info
            },
            
            changeBar() {
              this.$store.commit('changeShow');
              if(this.$route.path == '/index') {
                this.$router.push(DETAILS_PATH)
              }
            },
            goback() {              
              this.$store.commit('changeShow');
            },
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss" src="../../static/theme.scss"></style>
<style lang="scss" rel="stylesheet/scss" scoped="scoped">
    .slideLeft-enter {
        transform: translate3d(-100%, 0, 0);
    }
    .slideLeft-enter-to, .slideLeft-leave {
       transform: translate3d(0, 0, 0); 
    }
    .slideLeft-leave-to {
       transform: translate3d(-100%, 0, 0); 
    }
    .sub-router {
        position: fixed;
        top:0;
        left:0;
        bottom:0;
        margin-top: 70px;
        height: 100%;
        padding: 30px 0;
        box-sizing: border-box;
        transition: transform .4s;
        text-align: center;
        background: #fff;
        font-size: 16px;
        z-index:9;
    }
    
    .mask {
      width: 100%;
      height: calc(100%-70px);
      height: 100%;
      background: rgba(0,0,0,.3);
      position: absolute;
      top: 0;
      z-index: 5;
      margin-top: 70px;
    }

</style>