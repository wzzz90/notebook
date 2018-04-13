<template>
    <div class="dialog" @click.stop.self="cancel">
    	<div class="dialog-wrapper">
    		<div class="dialog-header">
    			提示
    		</div>
    		
    		<div class="dialog-content" v-if="dial_Data.dial_type != 'upload'">
    			{{dial_Data.msg}}
    		</div>
    		<div class="dialog-content" v-else>
    			<input type="file" accept="*.txt" @change="upload" />
    			<p>只允许上传由侧边栏下载的notepad.txt文件</p>
    			<p v-if="up_suc">数据读取成功，是否确定导入？</p>
    		</div>
    		<div class="dialog-btns">
    			<button type="button" class="cancel-btn" @click="cancel">取消</button>
          <button v-if="dial_Data.dial_type !== 'upload'" type="button" class="confirm-btn" @click="confirmEvent">确定</button>
          <button v-else type="button" class="confirm-btn" @click="confirmUpload">确定</button>
    		</div>
    	</div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
               up_suc: false,
               events: ''
            }
        },
        props: {
            'dial_Data': {type: Object, default: () => {return {}}},
        },
        methods: {
            cancel() {
                this.$emit('cancel')
            },
            confirmUpload() {
               if(this.up_suc) {
                 this.$store.dispatch('uploadEvent', this.events)  
                 this.$toast('导入成功')
                 this.$store.commit('changeShow')
                 this.cancel()
               }
            },
            confirmEvent() {
                this.$emit('confirm')
            },
            
            upload(event) {
               const files = event.srcElement.files,
                     reader = new FileReader();
                     
                if(files[0] && files[0].name.indexOf('notepad') !== -1) {
                    reader.onload = (e) => {
                        console.log(e)
                        this.up_suc = true
                        this.events = e.target.result
                    }
                    reader.readAsText(files[0]);
                    
                } else {
                    self.up_suc = false;
                    this.$toast('上传失败，请查看是否按照规范上传')
                }
            }
        }
        
    }
</script>

<style lang="scss">
    .dialog {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        overflow: auto;
        background: rgba(0, 0, 0, .4);
        z-index:999;
        .dialog-wrapper {
            position: absolute;
            left: 50%;
            top: 20%;
            width:100%;
            max-width: 400px;
            transform: translateX(-50%);
            background: #fff;
            border-radius: 2px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, .3);
            box-sizing: border-box;
            animation: dialog .5s;
        }
        .dialog-header {
            padding: 20px 20px 0;
            font-size: 20px;
        }
        .dialog-content {
            padding: 30px 20px;
            color: #475669;
            font-size: 18px;
            text-align: center;
            p{
                font-size: 14px;
                margin-top: 10px;
            }
        }
        .dialog-btns {
            padding: 10px 20px 15px;
            text-align: center;
            button {
                font-size: 14px;
                cursor: pointer;
            }
            .cancel-btn {
                width: 80px;
                background: #fff;
                border: 1px solid #c0ccda;
                color: #1f2d3d;
            }
            .confirm-btn {
                width: 80px;
                margin-left: 20px;
                color: #fff;
                transition: background .3s ease-in;
            }
        }
    }
    @keyframes dialog {
        from{
            top: 15%;
        }
    }
</style>