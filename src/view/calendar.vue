<template>
  <div class="calendar" v-show="isShow">
  	<table v-show="isShow">
  	  <thead>
  	    <tr>
  	      <th @click.stop="goPrev">
  	        <i class="iconfont icon-fanhui"></i>
  	      </th>
  	      <th class="month" colspan="5">{{2018}}年{{month}}月</th>
  	      <th @click.stop="goNext">
  	        <i class="iconfont icon-youjiantou"></i>
  	      </th>
  	    </tr>
  	    <tr>
  	      <th v-for="(value, index) in weekData">{{value}}</th>
  	    </tr>
  	  </thead>
  	  <tbody>
    		<tr v-for="(value, index) in calData" :key="index">
    		  
    		  <td v-for="(value1, index1) in value" :key="index1" @click="selectDate(index*7 +index1)" :class="{'disabled-date':(index*7 +index1)<currentIndex,'active-date': (activeIndex == (index*7 +index1) && month == currentMonth)}">
    		    {{value1}}
    		  </td>
    		</tr>  	  
  	  </tbody>
  	  <tfoot></tfoot>
  	</table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        calData: [],
        weekData: ['一', '二', '三', '四', '五','六', '七'],
        MonthData: ['一', '二', '三', '四', '五','六', '七', '八', '九', '十', '十一', '十二'],
        month: '',
        year: '',
        activeIndex: 9999,
        calendarList:[],
        show: false,
        currentIndex: 9999
      }
    },
    computed: {
//    calendarList() {
//      let curMonth = new Date().getMonth() + 1;
//
//      let list = this.getList(curMonth)
//
//      return list
//    }
      currentMonth() {
        return new Date().getMonth() + 1;
      }
    },
    props: ['isShow'],
    watch: {
     month(val, old) {
       this.getList(val)
     }
    },
    mounted() {
      let curDate = new Date();
      let week = this.buchong();
      let curMonth = new Date().getMonth() + 1;
      this.month = curDate.getMonth() + 1
      this.year = curDate.getFullYear()
      this.currentIndex = this.activeIndex = curDate.getDate() + week
      
      this.calendarList = this.getList(curMonth)
         
      let result = this.split_array(this.calendarList, 7);
      this.calData = result;
    },
    methods:{
      getList(curMonth) {
        let curDate = new Date();
        let days = this.getCountDays(curMonth)
        let arr = []
        let week = this.buchong()
        
        for (let i = 0;i<days; i++) {
          arr.push(i + 1)
        }

        for (let i = 0; i<(week-1); i++) {
          arr.unshift('')
        }

        this.calendarList = arr
           
        let result = this.split_array(this.calendarList, 7);
        this.calData = result;
        
        return arr        
      },
      
      getCountDays(curMonth) {
         let curDate = new Date()
         curDate.setMonth(curMonth);
         /* setDate的有效范围为1-31，当日期设置为0, 返回的是上个月的最后一天 */
         curDate.setDate(0);
         return curDate.getDate();
      },
      
      split_array(arr, len) {
        let arr_length = arr.length;
        let result = [];
        for (let i = 0;i<arr_length;i+=len) {
        	result.push(arr.slice(i, i+len))
        }
        return result
      },
      
      getCurrentMonthFirst(curDate){
        let year = curDate.getFullYear(),
            month = this.month - 1;
        var date = new Date(year, month, 1);

        date.setDate(1);

        return date;
      },
      
      goPrev() {
        if(this.month !== 1) {
          this.month -= 1
        }
      },
      
      goNext() {
        if(this.month !== 12) {
          this.month += 1
        }
      },
      
      selectDate(activeIndex) {
        if(activeIndex < this.currentIndex) return
        
        this.activeIndex = null
        this.activeIndex = activeIndex
        let month = this.month > 9 ? this.month : '0' + this.month
        let day = (this.activeIndex - (this.buchong()-2)) > 9 ? (this.activeIndex - (this.buchong()-2)) : '0' + (this.activeIndex - (this.buchong()-2))
        let date = `${this.year}-${month}-${day}`

        this.$emit('closeCal', date)
      },
      
      buchong() {
        let curDate = new Date();
        let firstDay = this.getCurrentMonthFirst(curDate)
        let week;
        
        week = firstDay.getDay()
        
        if(firstDay.getDay() == 0) {
          week = 7 
        }
        
        return week;
      },
      
      timestampToTime(timestamp) {
          var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
          Y = date.getFullYear() + '-';
          M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
          D = date.getDate() + ' ';
//        h = date.getHours() + ':';
//        m = date.getMinutes() + ':';
//        s = date.getSeconds();
          return Y+M+D;
      },
      
      
    }
  }
</script>

<style lang="scss" scoped="scoped">
.calendar {
  position: absolute;
  z-index: 1;
  right: 0;
  top: 40px;
  table {
    width: 100%;
    height: 100%;
    color: #606266;
    border: 1px solid #e4e7ed;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    background: #fff;
    border-radius: 4px;
    margin: 5px 0;
    thead {
      tr {
        .month {
          padding: 10px 0;
        }
      }
    }
    tbody {
      tr {
        td {
          width: 24px;
          height: 24px;
          text-align: center;
          cursor: pointer;
          padding: 3px;
          &.active-date {
            border-radius: 50%;
          }
          &.disabled-date {
            color: #c0c4cc;
          }
        }
      }
    }
  }
}
</style>