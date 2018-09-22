<template>
  <div class="main">
    <h1>Logs</h1>
    <div class="logColumn" v-for="log in systems" v-bind:key="log._id">
      <p>{{log.method}}</p>
      <p>{{log.object}}</p>
      <p>{{log.endpoint}}</p>
      <p>{{log.time}}</p>
      <p>{{log.email}}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'logs',
  props: ['user'],
  data: function () {
    return {
      systems: []
    }
  },
  created () {
    let vue = this
    vue.populateSystems()
  },
  methods: {
    populateSystems () {
      let vue = this
      axios.get('https://api.shiftnotification.com/systems/' + vue.user.id, {headers: { 'Authorization': 'JWT ' + vue.user.token }})
        .then(response => {
          vue.systems = response.data
          vue.systems.sort(function (a, b) {
            a = new Date(a.time)
            b = new Date(b.time)
            return a > b ? -1 : a < b ? 1 : 0
          })
        })
        .catch(err => {
          console.log(err, 'Error in getting logs')
        })
    }
  }
}
</script>

<style scoped lang="less">
@blue: #14325C;
@grey: #eaeaea;
@font: 'Monda', sans-serif;
h1 {
font-family: @font;
color: @blue;
text-align:center;
}
.logColumn {
  display: grid;
  grid-template-columns: 5vw 10vw 40vw 25vw 15vw;
  padding-left: 2%;
  border-bottom: 1px solid grey;
}
p {
  margin-bottom: 0;
  margin-top: 10px;
}
</style>
