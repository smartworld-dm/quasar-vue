<template>
  <div class="main">
    <div class="logo"></div>
    <div class="fail" v-if="loginFail===true">Login Failed, Try Again</div>
    <h1>login</h1>
    <div class="loginBox">
      <input class="email" placeholder="Email" v-model="email" type="email"/>
      <input class="password" placeholder="Password" v-model="password" type="password" v-on:keypress.enter="login"/>
      <h3 class="logged">Stay Logged In?<input type="checkbox" class="checkbox" v-model="stayLogged"/></h3>
      <button class="login" v-on:click="login">Submit</button>
      <button class="forgotLink" v-on:click="$router.push('/forgot')">Forgot Password</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Global from '../global'
export default {
  name: 'Login',
  props: ['logged'],
  data () {
    return {
      email: '',
      password: '',
      stayLogged: false,
      user: {
        token: '',
        id: '',
        shift: '',
        department: '',
        companyId: '',
        departmentAdmin: false,
        admin: false,
        systemAdmin: false
      },
      loginFail: false
    }
  },
  created () {
    if (this.logged === true) {
      this.$router.push('/')
    }
  },
  methods: {
    login () {
      let vue = this
      console.log(Global)
      axios.post(Global.DEBUG_URL + '/users/login', {
        email: vue.email.toLowerCase(),
        password: vue.password
      })
        .then(response => {
          if (response.status !== 401) {
            vue.user.token = response.data.token
            vue.user.id = response.data.userId
            vue.user.companyId = response.data.companyId
            vue.user.shift = response.data.shift
            vue.user.department = response.data.department
            vue.user.departmentAdmin = response.data.departmentAdmin
            vue.user.admin = response.data.admin
            vue.user.systemAdmin = response.data.systemAdmin
            if (vue.stayLogged === true) {
              localStorage.setItem('weightoken', response.data.token)
              localStorage.setItem('weighuserId', response.data.userId)
              localStorage.setItem('weighshift', response.data.shift)
              localStorage.setItem('weighdepartment', response.data.department)
              localStorage.setItem('weighcompanyId', response.data.companyId)
              localStorage.setItem('weighdepartmentAdmin', response.data.departmentAdmin)
              localStorage.setItem('weighadmin', response.data.admin)
              localStorage.setItem('weighsystemAdmin', response.data.systemAdmin)
            } else {
              localStorage.removeItem('weightoken')
              localStorage.removeItem('weighuserId')
              localStorage.removeItem('weighcompanyId')
              localStorage.removeItem('weighshift')
              localStorage.removeItem('weighdepartment')
              localStorage.removeItem('weighdepartmentAdmin')
              localStorage.removeItem('weighadmin')
              localStorage.removeItem('weighsystemAdmin')
            }
            vue.$emit('login', vue.user)
          }
        })
        .catch(response => {
          console.log(response)
          vue.loginFail = true
        })
    }
  }
}
</script>

<style scoped lang="less">
  @blue: #14325C;
  @grey: #b3bfcc;
  @font: 'Arial', sans-serif;
  button:hover {
      background: #9BCCEC;
  }
  .main {
    height: 100%;
    width: 100%;
    text-align: center;
    position: fixed;
    background-color: #b3bfcc;
    display: grid;
    grid-template-columns: 25vw 50vw 25vw;
    grid-template-rows: 10vh 20vh 2vh 12vh 2vh 50vh 5vh;
  }

  h1, h2, h3 {
    padding: 0;
    margin: 0;
  }

  h1 {
    font-family: 'Arial', sans-serif;
    color: @blue;
    font-weight: 400;
    grid-row: 4;
    line-height: 12vh;
    font-size: 5em;
  }

  button {
    font-family: @font;
    border: none;
    border-radius: 35px;
    background: @blue;
    font-size: 1.3em;
    color: white;
    text-align: center;
    margin-left: 0;
    box-shadow: 0px 1px 5px grey;
  }

  .main .logo, .main h1, .main .loginBox {
    grid-column: 2;
  }

  .logo {
    background-image: url('../assets/wlogo.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    grid-row: 2;
  }

  .loginBox {
    grid-row: 6;
    display: grid;
    grid-template-columns: 10vw 30vw 10vw;
    grid-template-rows: repeat(5, 8vh 2vh);
  }

  .loginBox input, .loginBox .logged, .loginBox .login, .loginBox .forgotLink {
    grid-column: 2;
  }

  input.email, input.password {
    border: 1px solid black;
    box-shadow: 0px 1px 5px grey;
    font-size: 1.75em;
    padding-left: 1vw;
  }

  input.password {
    grid-row: 3;
  }

  .logged {
    font-size: 2em;
    grid-row: 5;
    align-self: center;
  }

  input.checkbox {
    width: 3vh;
    height: 3vh;
    margin: 3vh;
  }

  button.forgotLink {
    grid-column: 2;
    grid-row: 8;
    font-family: @font;
    font-size: 1.1em;
    color: black;
    text-decoration: underline;
    text-align: center;
    box-shadow: none;
    background: none;
  }

  .registerlink {
    font-size: 1.2em;
    color: @blue;
    text-decoration: underline;
    text-decoration-color: #0a669b;
  }

  .login {
    grid-row: 7;
  }

  .fail {
    color: red;
    font-size: 1.5em;
    grid-column: 2;
    grid-row: 7;
  }
</style>
