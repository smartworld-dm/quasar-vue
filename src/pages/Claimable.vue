<template>
  <div>
    <div class="success" v-if="success">
      <h2>Success!</h2>
      <button class="back" v-on:click="clearShift(); success=false">Back</button>
    </div>
    <div class="main" v-else>
      <div class="pick1" v-if="active.shiftStartDate!==''">{{active.shiftStartDate}}<span class="pick1" v-on:click="active.shiftStartDate=''">-</span></div>
      <calendarPicker class="pick1" :calendar="true" :hours="true" :timeProp="new Date()" v-on:pick="pickShiftDate" v-if="active.shiftStartDate===''"></calendarPicker>
      <div class="pick2" v-if="active.shiftEndDate!==''">{{active.shiftEndDate}}<span class="pick2" v-on:click="active.shiftEndDate=''">-</span></div>
      <calendarPicker class="pick2" :calendar="true" :hours="true" :timeProp="new Date()" v-on:pick="pickShiftEndDate" v-if="active.shiftEndDate===''"></calendarPicker>
      <div class="create">
        <input v-model="active.shiftName" placeholder="Shift Name" />
        <input v-model="active.location" placeholder="Shift Location" />
        <input v-model="active.quantity" placeholder="Quantity of Shifts" type="number" />
        <button class="createShiftButton" v-on:click="createShift()">Create Shift</button>
      </div>
      <div class="availableBox">
        <div class="noClaimable" v-if="claimableShifts.length===0">
          <h2 class="noClaimableMessage">There are no claimable shifts yet.</h2>
        </div>
        <div class="availableShift" v-on:click="$router.push(`/claim/${claimable._id}`)" v-for="claimable in claimableShifts" v-bind:key="claimable._id">
          <div class="new">!</div>
          <div class="dep">{{claimable.department}}</div>
          <p class="date">{{fixDate(claimable.shiftStartDate)}}</p>
          <p class="dateEnd">{{fixDate(claimable.shiftEndDate)}}</p>
          <p class="shiftName">{{claimable.shiftName}}</p>
          <p class="location">{{claimable.location}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import CalendarPicker from './elements/CalendarPicker'
export default {
  name: 'claimable',
  props: ['logged', 'user'],
  components: {
    'calendarPicker': CalendarPicker
  },
  created () {
    let vue = this
    if (vue.logged === false) {
      vue.$router.push('/login')
    }
  },
  data: function () {
    return {
      modal: '',
      claimableShifts: [],
      success: false,
      active: {
        shiftStartDate: '',
        shiftEndDate: '',
        companyId: '',
        shift: '',
        department: '',
        shiftName: '',
        location: '',
        quantity: 0
      }
    }
  },
  methods: {
    pickShiftDate (picked) {
      let vue = this
      vue.active.shiftStartDate = picked
    },
    pickShiftEndDate (picked) {
      let vue = this
      console.log(picked)
      vue.active.shiftEndDate = picked
    },
    createShift () {
      let vue = this
      axios.post('https://api.shiftnotification.com/claimableshifts', {
        shiftStartDate: vue.active.shiftStartDate,
        shiftEndDate: vue.active.shiftEndDate,
        adminId: vue.user.id,
        companyId: vue.user.companyId,
        shift: vue.user.shift,
        department: vue.user.department,
        shiftName: vue.active.shiftName,
        location: vue.active.location,
        quantity: vue.active.quantity
      }, {headers: { 'Authorization': 'JWT ' + vue.user.token }})
        .then(response => {
          console.log(response.data)
          vue.modal = ''
          vue.success = true
        })
        .catch(err => {
          console.log(err)
        })
    },
    clearShift () {
      let vue = this
      vue.active.shiftStartDate = ''
      vue.active.shiftEndDate = ''
      vue.active.companyId = ''
      vue.active.shift = ''
      vue.active.department = ''
      vue.active.shiftName = ''
      vue.active.location = ''
      vue.active.quantity = 0
    }
  }
}
</script>

<style scoped lang="less">
@blue: #14325C;
@grey: #eaeaea;
@font: 'Monda', sans-serif;
.main {
  width: 100%;
  height: 100%;
  background-color: @grey;
  position: fixed;
  display: grid;
  grid-template-columns: 1vw 32vw 1vw 32vw 1vw 32vw 1vw;
  grid-template-rows:  6vh 8vh 20vh 60vh;
}
.success {
  width: 100%;
  height: 100%;
  background-color: @grey;
  position: fixed;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 10vh 20vh 60vh;
}
.success h2 {
  grid-column: 2;
  grid-row: 2;
}
.success button {
  grid-column: 2;
  grid-row: 3;
  height: 40px;
}
h1 {
  font-family: @font;
  font-size: 2.5em;
  text-align: center;
  color: @blue;
}
button {
  color: white;
  border: none;
  font-size: 1.3em;
  background: linear-gradient(#2b5896, #14325C);
}
input {
  height: 4vh;
}
.shiftEndSubmit {
  width: 100%;
}
.create {
  grid-column: 6;
  grid-row: 3;
  display: grid;
}
.timeEnd {
  grid-row: 3;
  grid-column: 4;
}
.timeStart {
  grid-row: 3;
  grid-column: 2;
}
.pick1 {
  grid-row-start: 3;
  grid-column: 2;
  height: 100vh;
}
.pick1 span {
  grid-row: 3;
  grid-column: 2;
  text-align: right;
  color: red;
}
.pick2 {
  grid-row-start: 3;
  grid-column: 4;
  height: 100vh;
}
.pick2 span {
  grid-row: 3;
  grid-column: 4;
  text-align: right;
  color: red;
}
.availableBox {
  border: 1px solid grey;
  border-radius: 3%;
  background-color: white;
  margin: 5%;
  grid-row: 4;
  grid-column: 6;
}
.dateshow1 {
  grid-row: 2;
  grid-column: 2;
}
.dateshow2 {
  grid-row: 2;
  grid-column: 4;
}
.dateshow1, .dateshow2 {
  font-size: 1.5em;
  text-align: center;
  align-self: center;
  color: #c22227;
}
h2 {
  font-size: 1.5em;
  text-align: center;
}
</style>
