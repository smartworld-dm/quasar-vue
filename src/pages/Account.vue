<template>
  <div class="main">
    <div class="accountEdit" v-if="modal==='edit'">
      <h1>Edit Account</h1>
      <div class="accountEditModal">
        <h3 class="emailEditH">Email:</h3>
        <input class="emailEdit" v-model="activeUser.email" placeholder="user@example.com"/>
        <h3 class="titleEditH">Title:</h3>
        <input class="titleEdit" v-model="activeUser.title" placeholder="Title"/>
        <h3 class="firstNameEditH">First Name:</h3>
        <input class="firstNameEdit" v-model="activeUser.firstName" placeholder="First Name"/>
        <h3 class="lastNameEditH">Last Name:</h3>
        <input class="lastNameEdit" v-model="activeUser.lastName" placeholder="Last Name"/>
        <h3 class="addressEditH">Address:</h3>
        <input class="addressEdit" v-model="activeUser.address" placeholder="Address"/>
        <h3 class="phoneEditH">Phone Number:</h3>
        <div class="phoneEdit">
          <input class="phoneEdit1" type="number" maxlength="3" v-model="activeUser.areaCode" placeholder="(XXX)"/>
          <span class="tack1"> - </span>
          <input class="phoneEdit2" type="number" maxlength="3" v-model="activeUser.phone1" placeholder="XXX"/>
          <span class="tack2"> - </span>
          <input class="phoneEdit3" type="number" maxlength="" v-model="activeUser.phone2" placeholder="XXXX"/>
        </div>
      </div>
      <button class="submitEdit" v-on:click="updateUser">Submit</button>
      <button class="back" v-on:click="modal='view'">Back</button>
    </div>
    <div class="updatePass" v-else-if="modal==='pass'">
      <h1>Password</h1>
      <input class="passwordEdit" v-model="activeUser.password" placeholder="********" v-if="!showPass" type="password">
      <input class="passwordEdit" v-model="activeUser.password" placeholder="********" v-if="showPass">
      <div class="barAccount">
        <button class="togglePass" v-on:click="showPass = !showPass" v-if="!showPass">Show Password</button>
        <button class="togglePass" v-on:click="showPass = !showPass" v-if="showPass">Hide Password</button>
        <button class="submitUpdatePass" v-on:click="updatePass">Submit</button>
        <button class="back" v-on:click="modal=''">Back</button>
      </div>
    </div>
    <div class="success" v-else-if="modal==='success'">
      <h1>Success!!</h1>
      <button class="back" v-on:click="modal=''">Back</button>
    </div>
    <div class="accountView" v-else>
      <h1>Update your password here</h1>
      <button class="accountEditButton" v-on:click="modal='edit'">Edit Account</button>
      <div class="accountViewModal">
        <h2 class="email">Email:</h2>
        <h3 class="emailH" >{{activeUser.email}}</h3>
        <h2 class="title">Title:</h2>
        <h3 class="titleH" >{{activeUser.title}}</h3>
        <h2 class="firstName">First Name:</h2>
        <h3 class="firstNameH" >{{activeUser.firstName}}</h3>
        <h2 class="lastName">Last Name:</h2>
        <h3 class="lastNameH" >{{activeUser.lastName}}</h3>
        <h2 class="address">Address:</h2>
        <h3 class="addressH" >{{activeUser.address}}</h3>
        <h2 class="phone">Phone:</h2>
        <h3 class="phoneH" >({{activeUser.areaCode}}) - {{activeUser.phone1}} - {{activeUser.phone2}}</h3>
        <h2 class="role">Role:</h2>
        <h3 class="roleH" >{{activeUser.role}}</h3>
        <h2 class="department">Department:</h2>
        <h3 class="departmentH">{{activeUser.departmentDisplay}}</h3>
        <h2 class="company">Company ID:</h2>
        <h3 class="companyH" >{{activeUser.companyId}}</h3>
      </div>
    </div>
    <div class="accountHome">
      <h1>Account</h1>
      <button class="Companies" v-on:click="$router.push('/Companies')">Companies</button>
      <button class="claimable" v-on:click="$router.push('/claimable')">Shift Claim</button>
      <button class="Users" v-on:click="$router.push('/Users')">Users</button>
      <button class="Roles" v-on:click="$router.push('/Roles')">Roles</button>

      <button class="update" v-on:click="modal='pass'">Update Password</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'account',
  props: ['logged', 'user'],
  data () {
    return {
      modal: '',
      showPass: false,
      activeUser: {
        id: '',
        email: '',
        password: '',
        title: '',
        firstName: '',
        lastName: '',
        address: '',
        areaCode: 0,
        phone1: 0,
        phone2: 0,
        role: '',
        department: '',
        departmentDisplay: '',
        companyId: '',
        departmentAdmin: false,
        admin: false,
        systemAdmin: false
      }
    }
  },
  created () {
    if (this.logged !== true) {
      this.$router.push('/login')
    }
    this.populateActiveUser()
  },
  methods: {
    updateUser () {
      let vue = this
      axios.put('https://api.shiftnotification.com/users/self/' + vue.user.id, {
        email: vue.activeUser.email,
        title: vue.activeUser.title,
        firstName: vue.activeUser.firstName,
        lastName: vue.activeUser.lastName,
        address: vue.activeUser.address,
        phone: vue.activeUser.areaCode + vue.activeUser.phone1 + vue.activeUser.phone2,
        role: vue.activeUser.role
      }, {headers: { 'Authorization': 'JWT ' + vue.user.token }})
        .then(function (response) {
          vue.activeUser.id = response.data.id
          vue.activeUser.email = response.data.email
          vue.activeUser.title = response.data.title
          vue.activeUser.firstName = response.data.firstName
          vue.activeUser.lastName = response.data.lastName
          vue.activeUser.address = response.data.address
          let phone = response.data.phone.toString()
          vue.activeUser.areaCode = Number(phone.substring(0, 3))
          vue.activeUser.phone1 = Number(phone.substring(3, 6))
          vue.activeUser.phone2 = Number(phone.substring(6, 10))
          vue.activeUser.role = response.data.role
          vue.activeUser.department = response.data.department
          vue.activeUser.companyId = response.data.companyId
          vue.activeUser.departmentAdmin = response.data.departmentAdmin
          vue.activeUser.admin = response.data.admin
          vue.activeUser.systemAdmin = response.data.systemAdmin
          vue.modal = 'view'
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    updatePass () {
      let vue = this
      axios.put('https://api.shiftnotification.com/users/' + vue.user.id, {
        password: vue.activeUser.password
      }, {headers: { 'Authorization': 'JWT ' + vue.user.token }})
        .then(function (user) {
          vue.modal = 'success'
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    clearActiveUser () {
      let vue = this
      vue.activeUser.id = ''
      vue.activeUser.email = ''
      vue.activeUser.password = ''
      vue.activeUser.title = ''
      vue.activeUser.firstName = ''
      vue.activeUser.lastName = ''
      vue.activeUser.address = ''
      vue.activeUser.areaCode = 0
      vue.activeUser.phone1 = 0
      vue.activeUser.phone2 = 0
      vue.activeUser.role = ''
      vue.activeUser.department = ''
      vue.activeUser.companyId = ''
      vue.activeUser.departmentAdmin = false
      vue.activeUser.admin = false
      vue.activeUser.systemAdmin = false
    },
    populateActiveUser () {
      let vue = this
      axios.get('https://api.shiftnotification.com/users/self/' + vue.user.id, {headers: { 'Authorization': 'JWT ' + vue.user.token }})
        .then(function (response) {
          vue.activeUser.id = response.data.id
          vue.activeUser.email = response.data.email
          vue.activeUser.title = response.data.title
          vue.activeUser.firstName = response.data.firstName
          vue.activeUser.lastName = response.data.lastName
          vue.activeUser.address = response.data.address
          let phone = response.data.phone.toString()
          vue.activeUser.areaCode = Number(phone.substring(0, 3))
          vue.activeUser.phone1 = Number(phone.substring(3, 6))
          vue.activeUser.phone2 = Number(phone.substring(6, 10))
          vue.activeUser.role = response.data.role
          vue.activeUser.department = response.data.department
          vue.activeUser.companyId = response.data.companyId
          vue.activeUser.departmentAdmin = response.data.departmentAdmin
          vue.activeUser.admin = response.data.admin
          vue.activeUser.systemAdmin = response.data.systemAdmin
          vue.departmentParse()
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    departmentParse () {
      let vue = this
      let url = `https://api.shiftnotification.com/departments/${vue.user.id}/${vue.activeUser.department}`
      axios.get(url, {headers: {'Authorization': 'JWT ' + vue.user.token}})
        .then(response => {
          vue.activeUser.departmentDisplay = response.data.name
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped lang="less">
@blue: #14325C;
@darkBlue: #00578A;
@lightBlue: #78CDFF;
@grey: #323d38;
@font: 'Monda', sans-serif;

  .main {
    width: 300px;
    display: grid;
    grid-template-columns: 30vw 40vw 30vw;
    grid-template-rows: 11vh 80vh;
  }

  h1, h2, h3, h4, h5, h6 {
    padding: 0;
    margin: 0;
  }

  h1 {
    color: @blue;
    font-size: 2em;
    text-align: center;
    width: 100%;
    font-family: @font;
  }

  h2 {
    font-size: 1.3em;
    text-align: left;
  }

  h3 {
    color: #777;
  }

  p {
    text-align: left;
    color: #777;
    width: 90%;
    margin-left: 5%;
  }

  input {
    font-size: 1.5em;
    background-color: #fff;
    padding-left: 1vw;
    margin: 0 1vw;
  }

  select option[data-default] {
    color: #888;
  }

  button {
    border: none;
    font-size: 1.3em;
    background: transparent;
    height: 6vh;
  }
  button:active {
    background-color: @blue;
    color: white;
    box-shadow: none;
  }

  .accountHome {
    width: 100%;
    height: 6vh;
    display: grid;
    grid-template-columns: 19vw repeat(5, 12vw) 13vw;
    background-color: #eaeaea;
    border-bottom: 1px solid grey;
    position: fixed;
    top: 0;
    margin-top: 8vh;
  }

  .accountHome button {
    border-right: 1px solid grey;
  }
  .accountHome button:hover {
    background-color: grey;
    color: #eaeaea;
  }

  .accountHome button.Companies {
    border-left: 1px solid grey;
  }

  .barAccount {
    display:flex;
    justify-content:center;
    margin-top:20px;
  }

  .barAccount button {
    flex:1;
  opacity:1;
  }

  .barAccount button:hover {
    opacity:0.7;
  }
  .accountHome h1 {
    align-self: end;
    line-height: 6vh;
  }
//account View
  .accountView {
    grid-column: 2;
    grid-row: 2;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 12vh 60vh 3vh 8vh;
    justify-self: center;
  }

  .accountView h1 {
    align-self: end;
    text-align: center;
    font-size: 2.8em;
  }

  .accountViewModal {
    grid-row: 2;
    background-color: #e0e0e0;
    border-radius: 5px;
    padding-top: 3vh;
    justify-self: center;
    border: 1px solid grey;
    box-shadow: 3px 3px 4px grey;
    display: grid;
    grid-template-columns: repeat(2, 18vw);
    grid-template-rows: repeat(9, 6vh);
  }

  .accountViewModal h2, .accountViewModal h3 {
    font-size: 1.3em;
    line-height: 6vh;
  }

  .accountViewModal h2 {
    grid-column-start: 1;
    grid-column-end: 3;
    padding-left: 1vw;
    border-bottom: 1px grey solid;
  }

  .accountViewModal h3 {
    grid-column: 2;
    justify-self: right;
    padding-right: 1vh;
  }

  .email, .emailH {
    grid-row: 1;
  }

  .title, .titleH {
    grid-row: 2;
  }

  .firstName, .firstNameH {
    grid-row: 3;
  }

  .lastName, .lastNameH {
    grid-row: 4;
  }

  .address, .addressH {
    grid-row: 5;
  }

  .phone, .phoneH {
    grid-row: 6;
  }

  .role, .roleH {
    grid-row: 7;
  }

  .department, .departmentH {
    grid-row: 8;
  }

  .company, .companyH {
    grid-row: 9;
  }

  .accountEditButton {
    grid-row: 4;
    background: linear-gradient(#2b5896, #14325C);
    color: white;
    height: 8vh;
  }

  .accountEdit {
    grid-column: 2;
    grid-row: 2;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 16vh 56vh 3vh 8vh;
    justify-self: center;
  }

  .accountEdit h1 {
    line-height: 6vh;
    align-self: center;
    font-size: 3em;
  }

  .accountEditModal {
    grid-row: 2;
    background-color: #e0e0e0;
    border-radius: 5px;
    justify-self: center;
    border: 1px solid grey;
    box-shadow: 3px 3px 4px grey;
    display: grid;
    grid-template-columns: 36vw;
    grid-template-rows: repeat(6, 4vh 5vh);
  }

  .accountEditModal input {
    font-size: 1.2em;
  }

  .accountEditModal h3 {
    font-size: .9em;
    line-height: 3vh;
    align-self: end;
    padding-left: 2vh;
  }

  .phoneEdit {
    display: grid;
    grid-template-columns: 7vw 1vw 7vw 1vw 8vw;
    grid-template-rows: 5vh;
  }

  .phoneEdit span {
    line-height: 5vh;
    justify-self: center;
  }

  .accountEdit button{
    grid-row: 4;
    grid-column: 1;
    width: 16vw;
    height: 8vh;
    color: white;
  }

  .accountEdit .back {
    background: linear-gradient(#2b5896, #14325C);
  }

  .accountEdit .submitEdit {
    justify-self: right;
    background: linear-gradient(#39b267, #13724b);
  }
//password view
  .updatePass {
    grid-column: 2;
    grid-row: 2;
    display: grid;
    grid-template-columns: 24vw;
    grid-template-rows: 24vh 8vh repeat(3, 3vh 8vh);
    justify-self: center;
  }

  .updatePass h1 {
    font-size: 3em;
    line-height: 6vh;
    align-self: center;
  }

  .updatePass button {
    height: 8vh;
    color: white;
  }

  .updatePass .passwordEdit {
    margin: 0;
  }

  .togglePass {
    background: linear-gradient(#2b5896, #14325C);
  }

  .updatePass .back {
    background: linear-gradient(#2b5896, #14325C);
  }

  .submitUpdatePass {
    background: linear-gradient(#39b267, #13724b);
  }
  //Ticket Generation Panel
  .helpView {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 20px 140px repeat(12, 40px);
  }

  .helpView h1 {
    grid-column-start: 1;
    grid-column-end: 5;
    grid-row: 2;
    margin-top: 0;
    padding: 0;
  }

  .helpView p {
    grid-column-start: 1;
    grid-column-end: 5;
    grid-row: 3;
    margin-left: 5%;
  }

  .helpView textarea {
    grid-column-start: 1;
    grid-column-end: 5;
    grid-row-start: 5;
    grid-row-end: 9;
    font-size: 1.5em;
    padding: 0;
    width: 90%;
    margin-left: 5%;
  }

  .helpView h5 {
    grid-column: 1;
    grid-row: 10;
    padding: 0;
    margin: 0;
    font-size: 1.1em;
    margin-left: 5%;
    color: @blue;
  }

  .helpView select {
    margin-left: 16px;
    grid-column-start: 2;
    grid-column-end: 5;
    grid-row: 10;
    font-size: 1.1em;
    width: 0%;
    box-shadow: 0px 1px 3px grey;
    color: @blue;
  }

  .helpView .back, .helpView .submitHelpTicket {
    padding: 0;
    margin: 0;
    grid-row: 12;
    font-size: 1.75em
  }

  .helpView .back {
    grid-column-start: 3;
    grid-column-end: 5;
    text-align: center;
    width: 90%;
    margin-right: 5%;
    font-size: 1.2em;
  }

  .helpView .submitHelpTicket {
    grid-column-start: 1;
    grid-column-end: 3;
    text-align: center;
    width: 90%;
    margin-left: 5%;
    font-size: 1.2em;
  }

  //Admin Tickets Panel
  .ticketClass, .adminTicketHeader {
    display: grid;
    grid-template-columns: 1fr 100px;
    grid-gap: 6px;
  }

  .ticketUser, .ticketType {
    text-align: center;
    border: 1px solid #000;
    padding: 10px 0;
    margin-bottom: 12px;
  }

  .ticketType {
    background-color: @blue;
    color: #fff;
    border: none;
  }

  //Admin Ticket in Tickets Panel
  .ticketView {
    display: grid;
    grid-template-rows: 120px 200px 40px;
  }

  .typeHeader {
    grid-row: 1;
    margin: 0;
    margin-top: 40px;
  }

  .viewTicketMessage {
    grid-row: 2;
    text-align: left;
    border: 1px solid black;
    padding: 12px;
  }

  .ticketView .back {
    grid-row: 3;
  }
</style>
