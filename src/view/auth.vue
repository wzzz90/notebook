<template>
  <div class="auth">
    <section action="#">
      <div class="user">
        <label>用户名</label>
        <input type="text" name="username" v-model="users.username"/>
      </div>
      <div class="password">
        <label>密码</label>
        <input type="password" name="password" v-model="users.password"/>
      </div>
      <button @click="submit">
        登录
      </button>
    </section>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        users: {
          username: '',
          password: ''
        }
      }
    },
    
    mounted() {
      console.log(this.$store.getters.showMore)
      console.log(document.getElementsByClassName('mask')[0])
      console.log(this.$refs.mask)
//    if(!this.$store.getters.showMore) {
//      document.getElementsByClassName('mask')[0].style.display = 'none'
//    }
    },
    
    methods: {
      submit() {
        if(!this.users.username) {
          this.$toast('请输入用户名')
        } else if (!this.users.password){
          this.$toast('请输入密码')
        } else {
          this.$store.dispatch('saveUser', this.users)
          this.$router.replace('/index')
        }
        
      }
    }
  }
</script>

<style lang="scss" scoped>
  .auth {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: url(../assets/login-bg.jpg) no-repeat;
    background-size: cover;
    section {
      background: rgba(0,0,0,0.3);
      padding: 100px;
      border-radius: 50px;
    }
     .user, .password {
       padding: 20px;
       color: white;
     }
     input {
      height: 40px;
      padding: 7px 10px;
      line-height: 26px;
      border: 1px solid #c0ccda;
      border-radius: 4px;
      transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
      box-sizing: border-box;
      font-size: inherit;  
     }
     label {
        min-width: 100px;
        display: inline-block;
     }
     button {
      display: inline-block;
      line-height: 1;
      white-space: nowrap;
      cursor: pointer;
      background: #fff;
      border: 1px solid #dcdfe6;
      border-color: #dcdfe6;
      color: #606266;
      text-align: center;
      box-sizing: border-box;
      outline: none;
      margin: 0;
      transition: .1s;
      font-weight: 500;
      padding: 12px 20px;
      font-size: 14px;
      border-radius: 4px;
      margin-left: 124px;
      margin-top: 20px;
     }
  }
</style>