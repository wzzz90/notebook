<template>
    <header>
        <h1>
                记事本
            <span class="icon iconfont icon-leimu" @click="showMore"></span> 
        </h1>
        
    </header>
</template>

<script>
    export default{
        data() {
            return {
                
            }
        },
        methods: {
            showMore() {
                this.$emit('showBar')
            }
        }
    }
</script>

<style lang="scss" scoped="scoped">
    header {
        width: 100%;
        height: 70px;
        color: #fff;
        z-index: 100;
        &>h1 {
            text-align: center;
            line-height: 70px;
            height: 70px;
            max-width: 800px;
            margin: 0 auto;
            position: relative;
            span {
                position: absolute;
                top: 0;
                right: 0;
                font-size: 30px;
                margin-right: 10px;
                cursor: pointer;
            }
        }
    }
</style>