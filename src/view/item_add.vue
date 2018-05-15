<template>
    <div class="item-add">
      <div class="input-box">
      	<input type="text" class="input" v-model.trim="params.content" placeholder="待办事项"/>
    	  <input type="text" class="input" v-model.trim="params.time" placeholder="选择时间" @focus="showCal" ref="datePicker"/>
    	  <Calendar :isShow="showCalendar" @closeCal="closeCalen" ref="cal"></Calendar>
      </div>
    	
    	<button class="add-btn" @click="submit">提交</button>
    </div>
</template>

<script>
  import Calendar from './calendar'
  
    export default {
      data() {
        return {
          content: '',
          params: {
              id: 0,
              type: 1,
              content: '',
              time: ''
          },
          showCalendar: false
        }
      },
      mounted() {
        this.showCalendar = false
        this.$refs.cal.$el.setAttribute('style', `width:${this.$refs.datePicker.offsetWidth}px;height:${this.$refs.datePicker.offsetWidth}px;display:none`)
      },
      components: {
        Calendar
      },
      methods: {
        
        submit() {
          let params = JSON.parse(JSON.stringify(this.params))
          if(params.content) {
            params.content = this.getSaferHTML(params.content)
            if(params.time) {
              if(params.time.indexOf('-') !== -1 && params.time.split('-').length ==3 && params.time.split('-')[0].length == 4 && params.time.split('-')[1].length == 2 && params.time.split('-')[2].length == 2) {
                this.$store.dispatch('addItem', params)
                this.params.content = ''
                this.params.time = ''
                this.$toast('添加成功')
              } else {
                this.$toast('请选择正确的时间格式')
              }
            } else {
              this.$toast('请选择时间')
            }
          } else {
              this.$toast('请输入待办事项')
          }
            
        },
          
        showCal() {
          this.showCalendar = true
        },
        
        closeCalen(date) {
          this.showCalendar = false
          this.params.time = date
        },
        
        //过滤恶意代码
        getSaferHTML(templateData) {
          let s = ''; 
          for (let i = 0; i < arguments.length; i++) {
            let arg = String(arguments[i]);
            
            s += arg.replace(/&/g, "&amp;")
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;");
          }
          return s;
        }
      }
    }
</script>

<style lang="scss" scoped>
    .item-add {
        position: relative;
        padding: 30px 0;
        font-size: 16px;
        display: flex;
        .input-box {
          display: flex;
          width: calc(100% - 6px);
          position: relative;
          &>input {
              flex: 1;
              height: 40px;
              padding: 7px 10px;
              line-height: 26px;
              border: 1px solid #c0ccda;
              border-radius: 4px;
              transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
              box-sizing: border-box;
              font-size: inherit;  
          }  
          &>input:nth-of-type(1) {
            margin-right: 10px;
          }        
        }

        &>button {
           border: 1px solid pink;
           width: 80px;
           height: 40px;
           line-height: 26px;
           text-align: center;
           margin-left: 10px;
           color: #fff;
           background: pink;
        }
    }
</style>