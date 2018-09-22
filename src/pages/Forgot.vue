<template>
  <div class="main">
    <div class="success" v-if="modal==='success'">
      <h4>Success! An email has been sent with a link to reset your password!</h4>
      <button class="back" v-on:click="$router.push('/login')">Back</button>
    </div>
    <div class="fail" v-else-if="modal==='fail'">
      <h4>Failed, Try Again.</h4>
      <button class="back" v-on:click="modal=''">Back</button>
    </div>
    <div class="else" v-else>
      <h1>Forgot Password?</h1>
      <h4>Input your email Below</h4>
      <input v-model="email" placeholder="user@email.com" v-on:keypress.enter="recover()" />
      <button class="submit" v-on:click="recover()">Submit</button>
      <button class="back" v-on:click="$router.push('/login')">Back</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'forgot',
  data: function () {
    return {
      email: '',
      modal: ''
    }
  },
  methods: {
    recover () {
      let vue = this
      axios.post('https://api.shiftnotification.com/users/recover', {
        email: vue.email
      })
        .then(response => {
          console.log(response)
          vue.modal = 'success'
        })
        .catch(err => {
          console.log(err)
          vue.modal = 'fail'
        })
    }
  }
}
</script>

<style scoped lang="less">
@blue: #14325C;
@grey: #eaeaea;
@font: 'Monda', sans-serif;
.main {
  background-color: #eaeaea;
  height: 100vh;
  position: fixed;
}

.else {
  display: grid;
  grid-template-columns: 25vw 50vw 25vw;
  grid-template-rows: 25vh 15vh 10vh repeat(2, 2vh 8vh)
}

h1, h2, h3, h4, h5, h6, input, button {
  margin: 0;
}

h1, h4, input, button {
  grid-column: 2;
}

h1 {
  text-align: center;
}

h4 {
  text-align: center;
}

input {
  align-self: center;
  width: 100%;
}

button {
  background: linear-gradient(#2b5896, #14325C);
  color: white;
  border: 1px solid @grey;
  font-family: @font;
  font-size: 1.25em;
  width: 22.5vw;
}

.success, .fail {
  width: 100vw;
  display: grid;
  grid-template-rows: 45vh 8vh 2vh 8vh;
}

.success h4, .fail h4 {
  grid-row: 2;
  grid-column: 1;
  font-size: 1.5em;
}

.success .back, .fail .back {
  grid-column: 1;
  grid-row: 4;
  justify-self: center;
}

.else h1 {
  grid-row: 2;
  font-size: 4em;
}

.else h4 {
  grid-row: 3;
}

.else input {
  grid-row: 5;
  height: 8vh;
  font-size: 1.5em;
  padding-left: 1vw;
}

.else .back, .else .submit {
  grid-row: 7;
}

.else .submit {
  justify-self: right;
  background: linear-gradient(#39b267, #13724b);
}
</style>
