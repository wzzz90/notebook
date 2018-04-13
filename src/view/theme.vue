<template>
    <transition name="slideLeft">
        <div class="theme-box">
            <div class="theme">
                <div class="theme-title">
                	点击切换主题色
                </div>
                <div class="theme-list" @click="switchTheme('blue')">
                	<span style="background: #00b0f0"></span>#00b0f0
                </div>
                <div class="theme-list" @click="switchTheme('green')">
                    <span style="background: #00d1b2"></span>#00d1b2
                </div>
                <div class="theme-list" @click="switchTheme('orange')">
                    <span style="background: #f4b976"></span>#f4b976
                </div>
                <div class="theme-list" @click="switchTheme('pink')">
                    <span style="background: #f39894"></span>#f39894
                </div>
                <div class="theme-list" @click="switchTheme('cyan')">
                    <span style="background: #26b6be"></span>#26b6be
                </div>            	
            </div>

        </div> 
    </transition>
</template>

<script>
    export default {
        data() {
            return {
                
            }
        },
        methods: {
            switchTheme(color) {
                this.$store.dispatch('switch_theme', color)
                this.$router.push('/index')
                this.$store.commit('changeShow')
            }
        }
    }
</script>

<style lang="scss" scoped="scoped">
    .slideLeft-enter {
        transform: translate3d(-100%, 0, 0);
    }
    .slideLeft-enter-to, .slideLeft-leave {
       transform: translate3d(0, 0, 0); 
    }
    .slideLeft-leave-to {
       transform: translate3d(-100%, 0, 0); 
    }
    .theme-box{
        /*position: fixed;
        left:0px;
        top:0;
        bottom:0;*/
        width:230px;
/*        margin-top: 70px;*/
        padding: 30px 0;
        /*box-sizing: border-box;
        background: #f8f8f8;
        z-index:9;*/
        transition: transform .4s;
        &::-webkit-scrollbar{
            width:0;
        }
        .theme{
            width: 100%;
            padding: 0 10px;
            max-width: 800px;
            margin: auto;
            box-sizing: border-box;
        }
        .theme-title{
            margin:0 0 20px;
            font-size: 20px;
        }
        .theme-list{
            position: relative;
            width:70px;
            height:36px;
            line-height:36px;
            padding-left: 36px;
            border:1px solid #aaa;
            border-radius: 3px;
            cursor: pointer;
            margin-bottom: 10px;
            background: #fff;
            right: -30px;
            &.theme-list-active{
                border:1px solid #e94545;
            }
            span{
                position: absolute;
                left:8px;
                top:8px;
                width:20px;
                height:20px;
            }
        }
    }
</style>