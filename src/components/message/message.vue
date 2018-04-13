<template>
  <transition name="fade">
    <div :class="['message', `message-${pos}`]" v-show="visible">
        {{message}}
    </div>
  </transition>
</template>

<script>
    export default {
      data() {
         return {
            message: '',
            visible: false,
            duration: 2500,
            pos: 'top'
         }
      },
    }
</script>

<style scoped>
    .message {
        width: 160px;
        height: auto;
        padding: 10px 0;
        border-radius: 6px;
        font-size: 16px;
        position: absolute;
        margin: 0 auto;
        z-index: 1024;
        background: #f7f7f7;
        right: 0;
        left: 0;
        text-align: center;
        opacity: 1;
        transition: opacity 0.3s, transform .4s;
    }
    .message-center {
       top: 50%;
       margin-top: -50px;
    }
    .message-top {
        top: 100px;
    }
    .message-bottom {
        bottom: 100px;
    }
    .fade-enter,
    .fade-leave-active {
      opacity: 0;
      transform: translate(0, -100%); 
    }
    @keyframes show-toast {
        from {
            opacity: 0;
            transform: translate(-50%, -10px);
            -webkit-transform: translate(-50%, -10px);
        }
        to {
            opacity: 1;
            transform: translate(-50%, 0);
            -webkit-transform: translate(-50%, 0);
        }
    }
</style>