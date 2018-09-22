<template>
  <div id="q-app">
    <div class="main">
      <navbar v-on:logout="logOut" :logged="logged" :user="user" v-if="logged"></navbar>
          <router-view v-on:login="log" v-on:register="register" v-on:logout="logOut" :logged="logged" :user="user"/>
    </div>
  </div>
</template>

<script>
// import navbar from './components/Navbar'
export default {
  name: 'app',
  components: {
    // 'navbar': navbar
  },
  created () {
    let vue = this
    vue.user.token = localStorage.getItem('weightoken')
    vue.user.id = localStorage.getItem('weighuserId')
    vue.user.companyId = localStorage.getItem('weighcompanyId')
    vue.user.shift = localStorage.getItem('weighshift')
    vue.user.department = localStorage.getItem('weighdepartment')
    vue.user.departmentAdmin = Boolean(localStorage.getItem('weighdepartmentAdmin'))
    vue.user.admin = Boolean(localStorage.getItem('weighadmin'))
    vue.user.systemAdmin = Boolean(localStorage.getItem('weighsystemAdmin'))
    if (vue.user.token !== null) {
      vue.logged = true
    } else {
      vue.$router.push('/Login')
    }
  },
  data: function () {
    return {
      logged: false,
      swipeNum: 0,
      user: {
        id: '',
        token: '',
        companyId: '',
        shift: '',
        department: '',
        departmentAdmin: false,
        admin: false,
        systemAdmin: false
      }
    }
  },
  methods: {
    log (user) {
      let vue = this
      if (user.token !== null) {
        vue.user.token = user.token
        vue.user.id = user.id
        vue.user.departmentAdmin = user.departmentAdmin
        vue.user.admin = user.admin
        vue.user.systemAdmin = user.systemAdmin
        vue.user.companyId = user.companyId
        vue.user.department = user.department
        vue.user.shift = user.shift
        vue.logged = true
        vue.$router.push('/')
      } else {
        vue.logged = false
      }
    },
    register (user) {
      let vue = this
      if (user.token !== null) {
        vue.user.token = user.token
        vue.user.id = user.id
        vue.user.departmentAdmin = user.departmentAdmin
        vue.user.admin = user.admin
        vue.user.systemAdmin = user.systemAdmin
        vue.user.companyId = user.companyId
        vue.user.department = user.department
        vue.user.shift = user.shift
        vue.logged = true
        vue.$router.push('/')
      } else {
        vue.logged = false
      }
    },
    logOut () {
      let vue = this
      vue.user.token = ''
      vue.user.id = ''
      vue.user.shift = ''
      vue.user.department = ''
      vue.user.companyId = ''
      vue.user.admin = false
      vue.user.systemAdmin = false
      vue.logged = false
      localStorage.removeItem('weightoken')
      localStorage.removeItem('weighuserId')
      localStorage.removeItem('weighshift')
      localStorage.removeItem('weighdepartment')
      localStorage.removeItem('weighcompanyId')
      localStorage.removeItem('weighdepartmentAdmin')
      localStorage.removeItem('weighadmin')
      localStorage.removeItem('weighsystemAdmin')
      vue.$router.push('/login')
    }
  }
}
</script>

<style scoped lang="less">

body {
  height: 100vh;
}

.fade-enter-active, .fade-leave-active {
  transition: all .25s ease;
  transition: all .25s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.fade-enter, .fade-leave-active {
  opacity: 0;
  transform: translateY(20px);
}
</style>
