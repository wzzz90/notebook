<template>
    <transition name="slideLeft">
        <section class="event-all">
            <div class="table-box">
                <div class="screen-box">
                    <div class="div-select" @click="active=!active" :class="{'active': active}">
                    	<div class="div-value">
                            {{getTypeName}}
                            <span class="iconfont icon-jiantou8" v-show="!active"></span>
                            <span class="iconfont icon-xiangshangjiantou1" v-show="active"></span>
                    	</div>
                	    <div class="div-select-body">
                            <div class="div-option" @click="doSelect(0)">筛选类型</div>
                            <div class="div-option" @click="doSelect(1)">未完成</div>
                            <div class="div-option" @click="doSelect(2)">已完成</div>
                            <div class="div-option" @click="doSelect(3)">已取消</div>                          
                        </div>                    	
                    </div>
                    <input type="text" class="div-search" v-model="serach_content" placeholder="筛选关键词">
                </div>
                
                <table class="event-table">
                    <thead>
                        <th>#</th>
                        <th>所有事项</th>
                        <th width="">类型</th>
                        <th width="">操作</th>
                    </thead>
                    <tbody>
                        <tr v-for="(value, index) in eventList" :key="index">
                            <td align="center">{{index + 1}}</td>
                            <td>
                                <span v-show="!eventEdits[index]">{{value.content}}</span>
                                <input type="text" v-model="info.content" v-show="eventEdits[index]"/>
                            </td>
                            <td align="center">{{options[value.type]}}</td>
                            <td align="center" style="font-size: 0;">
                                <button @click="edit(index)" v-show="!eventEdits[index]">编辑</button>
                                <button @click="save(index)" v-show="eventEdits[index]">保存</button>
                                <button class="del-btn" @click="showDialog(index,value.id)">删除</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section> 
    </transition>
</template>

<script>
    export default {
        data() {
            return {
               getTypeName: '筛选类型',
               serach_content: '',
               item_type: 0,
               active: false,
               options: ['筛选类型', '未完成', '已完成', '已取消'],
               change: false,
               info: {
                   content: '',
               },
               eventEdits: []
            }
        },
        computed: {
            eventList() {
                return this.$store.getters.getItemList.filter((value) => {
                    if(this.item_type !== 0 && this.serach_content == '') {
                        if(value.type === this.item_type) {
                            return value
                        }
                    } else if(this.item_type == 0 && this.serach_content !== '') {
                       if(value.content.indexOf(this.serach_content) !== -1) {
                           return value
                       }
                    } else if(this.item_type !== 0 && this.serach_content !== '') {
                        if(value.type === this.item_type && value.content.indexOf(this.serach_content) !== -1) {
                            return value
                        }
                    } else {
                        return value
                    }
                })
            }
        },
        mounted() {
            this.eventEdits = this.eventList.map((value) => {
                return false
            }) 
        },
        
        methods: {
            edit(index) {
                this.eventEdits = this.eventList.map((value) => {
                    return false
                })
                this.eventEdits.splice(index, 1, true)
                this.info = this.eventList[index]
            },
            
            save(index) {
                if(!this.info.content) {
                    this.$toast('请输入事项内容')
                } else {
                    this.$store.commit('editItem', this.info)
                    this.$toast('保存成功')
                    this.eventEdits.splice(index, 1, false)
                }
            },
            
            doSelect(value) {
                this.getTypeName = this.options[value]
                this.item_type = value
                //this.active = false
            },
            showDialog(index, id) {
               let del_info = {
                   index: index,
                   id: id
               }
               this.$emit('delDial', del_info) 
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
    .event-all{
        position: absolute;
        left:0;
        top:0;
        right:0;
        bottom:0;
        transition: transform .8s;
        overflow-Y: scroll;
        background: #fff;
        width: 100vw;
        &::-webkit-scrollbar{
            width:0;
        }
        .table-box{
            width:100%;
            max-width:1000px;
            margin: 20px auto 70px;
            .event-table{
                width:100%;
                padding:0;
                border:{
                    left:1px solid #eee;
                    top:1px solid #eee;
                }
                border-spacing: 0px;
                td,th{
                    position: relative;
                    height: 40px;
                    min-width: 0;
                    padding:5px 10px;
                    box-sizing: border-box;
                    text-overflow: ellipsis;
                    vertical-align: middle;
                    border:{
                        right:1px solid #eee;
                        bottom:1px solid #eee;
                    }
                    &>input {
                        border: 1px solid #eee;
                        width: 100%;
                        height: 100%;
                    }
                }
                button{
                    padding:3px 7px;
                    font-size: 12px;
                    color: #fff;
                    border:0;
                    margin: 0 3px 3px 0;
                    &.del-btn{
                        background: #f57067 !important;
                    }
                }
            }
            .edit-input{
                position: fixed;
                top:0;
                width:100%;
                max-width: 1000px;
                margin:auto;
                height:60px;
                padding:10px 100px 10px 10px;
                box-sizing: border-box;
                z-index:10;
                transform: translateY(-260px);
                transition: transform .3s;
                background: #f3f3f3;
                border:1px solid #eee;
                border-radius:4px;
                &.edit-input-show{
                    transform: translateY(0);
                }
                input{
                    float: left;
                    width:100%;
                    height:40px;
                    padding:5px 10px;
                    box-sizing: border-box;
                    border: 1px solid #ddd;
                }
                button{
                    position: absolute;
                    right: 10px;
                    width:80px;
                    height:40px;
                    color: #fff;
                    border:0;
                }
            }
            .screen-box{
                position: relative;
                padding: 0 0 10px 95px;
                height:35px;
                .div-select{
                    position: absolute;
                    left:0;
                    top:0;
/*                    width:85px;*/
                    height:35px;
                    padding:0 10px;
                    box-sizing: border-box;
                    border:1px solid #eee;
                    font-size:12px;
                    color: #999;
                    cursor: pointer;
                    &.active{
                        .div-select-body{
                            height:122px;
                            border:1px solid #eee;
                            box-shadow: 0 0 1px #ddd;
                        }
                    }
                }
                .div-value{
                    line-height: 35px;
                    display: flex;
                    &>span {
                        margin-left: 5px;
                        font-size: 12px;
                    }
                }
                .div-select-body{
                    position: absolute;
                    left:0;
                    top:38px;
                    width:85px;
                    height: 0;
                    padding-left: 10px;
                    line-height: 30px;
                    box-sizing: border-box;
                    overflow: hidden;
                    z-index:10;
                    box-shadow: none;
                    border: none;
                    border-radius: 3px;
                    background: #fff;
                    transition: all .3s;
                }
                .slide {
                    height: auto;
                }
                .div-search{
                    width:100%;
                    height:35px;
                    line-height: 25px;
                    padding:5px 10px;
                    box-sizing: border-box;
                    border:1px solid #eee;
                    font:{
                        size:12px;
                        family: Arial,'Microsoft YaHei';
                    }
                    color: #999;
                }
            }
        }
    }
</style>