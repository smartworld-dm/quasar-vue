<template>
  <div class="main">
    <div class="peaceOfMind">
      <div class="leftSidePane">
        <button class="updateShiftSchedule" v-on:click="updateShiftSchedule" v-if="activeShift.shifts.length!==0">Update Schedule</button>
        <h5 class="listHeader">Company Directory</h5>
        <div class="companyList">
          <div class="company" v-for="company in companies" v-bind:key="company._id">
            <div class="companyName" v-on:click="shiftCompany(company); company.expand=!company.expand" v-bind:class="{'highlightCompany': company.companyId === pane.company}">{{company.companyName}}</div>
            <div class="locationColumn" v-if="company.expand" v-for="location in company.locations" v-bind:key="location._id">
              <div class="locationColumnName" v-on:click="locationSchedule(location); location.expand=!location.expand" v-bind:class="{'highlight': location._id === pane.location}">{{location.name}}</div>
              <div class="shiftsBox"  v-if="location.expand">
                <div class="shiftColumn" v-for="shift in location.shifts" v-bind:key="shift._id">
                  <div class="shiftColumnName" v-on:click="shiftSchedule(shift, location)" v-bind:class="{'highlight': shift.shiftId === pane.shift}">{{shift.name}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <calendarPicker class="calendarPicker" v-on:pick="populateActiveShift" v-if="startHighlight" :timeProp="activeDate" :activeShift="activeShift" :calendar="calendar" :hours="hours"></calendarPicker>
      </div>
      <div class="emptyView" v-if="activeShift.id === '' && pane.shift === '' && pane.department === ''">
        <h1>Begin by selecting a shift or department on the left</h1>
        <div class="splash"></div>
      </div>
      <div class="emptyView" v-if="activeShift.id === '' && pane.shift !== ''">
        <h1>There is no Schedule for {{activeDate.getDate()}} - {{(activeDate.getMonth() + 1)}} - {{activeDate.getFullYear()}}</h1>
        <div class="splash"></div>
        <button class="newWeekSchedule" v-on:click="createWeekSchedule()" v-if="weekShow">Create Weeks Schedule from Template</button>
        <button class="newTemplateSchedule" v-on:click="newTemplateSchedule()">Create Schedule from Template</button>
        <button class="newShiftSchedule" v-on:click="newShiftSchedule()">Create Blank Schedule for Today</button>
      </div>
      <div class="spreadsheetPane" v-if="activeShift.id!==''">
        <div class="deleteModal" v-if="deleteModal">
          <h2>Are You Sure?</h2>
          <button class="yesDelete" v-on:click="deleteSelected(); deleteModal=false">Yes (Delete all selected)</button>
          <button class="noDelete" v-on:click="deleteModal=false">No</button>
        </div>
        <div class="successModal" v-if="successModal">
          <h2>Success!</h2>
          <button class="noDelete" v-on:click="successModal=false">back</button>
        </div>
        <h1>Shift Spreadsheet Tool</h1>
        <button class="newShift" v-on:click="newShift">Create a New Shift Row</button>
        <button class="selectAll" v-on:click="selectAll()">Select All</button>
        <select class="select" v-model="updateField">
          <option value="name">Name</option>
          <option value="location">Position</option>
          <option value="start">Shift Start</option>
          <option value="end">Shift End</option>
        </select>
        <input class="update" v-model="fieldInput" placeholder="Input Change" v-on:keypress.enter="updateFields()" v-if="updateField==='name'||updateField==='location'"/>
        <div class="update" v-if="massTime!==''">{{massTime}}<span class="updateReset" v-on:click="massTime=''">-</span></div>
        <calendarPicker class="updateTime" @pick="pickMass($event, shift)" :hours="true" :timeProp="activeDate"  v-if="updateField==='start' && massTime===''"></calendarPicker>
        <calendarPicker class="updateTimeEnd" @pick="pickMass($event, shift)" :calendar="true" :hours="true" :timeProp="activeDate" v-if="updateField==='end' && massTime===''"></calendarPicker>
        <button class="submit" v-on:click="updateFields()" v-if="(updateField==='name'||updateField==='location')">Submit</button>
        <button class="submit" v-on:click="updateFieldsTime()" v-if="(updateField==='start'||updateField==='end') && massTime!==''">Submit</button>
        <div class="spreadSheetVar">
          <div class="varUser">User</div>
          <div class="varName">Name</div>
          <div class="varLocal">Position</div>
          <div class="varStart">Time Start</div>
          <div class="varEnd">Time End</div>
          <div class="LetItBe">
            <div class="shift" v-on:click="select(shift, $event)" v-for="shift in activeShift.shifts" v-bind:key="shift._id">
              <div class="shiftSelected" v-if="shift.selected">&#x2714;</div>
              <div class="shiftUser" v-if="shift.userDisplay!==''&&shift.user!==''">{{shift.userDisplay}}</div>
              <div class="ShiftUserClearDisplay" v-on:click="shift.userDisplay=''">-</div>
              <input class="shiftUser" v-model="userSearch" v-on:input="usersSearch(shift)" v-if="shift.userDisplay==='' || shift.user ===''"/>
              <div class="shiftUserSearch" v-if="searchPane.length !== [] && searchShift === shift">
                <span v-if="searchPane.length !== [] && searchShift === shift">&#x1F50D;</span>
                <div class="userSearchOne" v-for="user in searchPane" v-bind:key="user._id">
                  <div v-on:click="userUpdateClick(user)">{{user.firstName}} {{user.lastName}}</div>
                </div>
              </div>
              <input class="shiftName" v-model="shift.shiftName" />
              <input class="shiftLocal" v-model="shift.location" />
              <div class="shiftStart" v-on:click="shift.shiftStartDate=''" v-if="shift.shiftStartDate!=='' && showTime">{{new Date(shift.shiftStartDate).getHours()}}:<span v-if="new Date(shift.shiftStartDate).getMinutes() < 10">0</span>{{new Date(shift.shiftStartDate).getMinutes()}}</div>
              <calendarPicker @pick="pickStart($event, shift)" :hours="true" :timeProp="activeDate"  v-if="shift.shiftStartDate==='' && showTime"></calendarPicker>
              <div class="shiftEnd" v-on:click="shift.shiftEndDate=''" v-if="shift.shiftEndDate!=='' && showTime">{{new Date(shift.shiftEndDate).getDate()}} - {{(new Date(shift.shiftEndDate).getMonth() + 1)}} - {{new Date(shift.shiftEndDate).getFullYear()}} {{new Date(shift.shiftEndDate).getHours()}}:<span v-if="new Date(shift.shiftEndDate).getMinutes() < 10">0</span>{{new Date(shift.shiftEndDate).getMinutes()}}</div>
              <calendarPicker v-on:pick="pickEnd($event, shift)" :calendar="true" :hours="true" :timeProp="activeDate" v-if="shift.shiftEndDate==='' && showTime"></calendarPicker>
              <div v-bind:class="statusLogic(shift)"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import CalendarPicker from './elements/CalendarPicker'
export default {
  name: 'spreadsheet',
  props: ['logged', 'user'],
  components: {
    'calendarPicker': CalendarPicker
  },
  created () {
    let vue = this
    console.log(this.user)
    if (vue.logged === false) {
      vue.$router.push('/login')
    }
    vue.activeDate = new Date().toISOString()
    vue.populateCompanies()
    vue.pane.company = vue.user.companyId
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Delete') {
        event.preventDefault()
        vue.deleteModal = true
      }
    })
  },
  data: function () {
    return {
      modal: '',
      weekShow: false,
      successModal: false,
      showTime: false,
      clicked: '',
      massTime: '',
      pane: {
        company: '',
        location: '',
        shift: '',
        department: ''
      },
      defaultTime: {
        startDate: 0,
        endDate: 0
      },
      deleteModal: false,
      companies: [],
      shifts: [],
      activeCompanyId: '',
      activeDepartment: '',
      activeShift: {
        id: '',
        shifts: []
      },
      startHighlight: true,
      endHighlight: false,
      activeDate: '',
      hours: false,
      calendar: true,
      updateField: '',
      fieldInput: '',
      userSearch: '',
      searchPane: [],
      searchShift: {}
    }
  },
  watch: {
    activeDate: function () {
      let vue = this
      let day = parseInt(vue.defaultTime.startDate)
      if (day === new Date(vue.activeDate).getDay()) {
        vue.weekShow = true
      } else {
        vue.weekShow = false
      }
    }
  },
  methods: {
    nameUpdate () {
      let vue = this
      axios.post('https://api.shiftnotification.com/users/spreadsheet', {
        shifts: vue.activeShift.shifts,
        adminId: vue.user.id
      }, {headers: {'Authorization': 'JWT ' + vue.user.token}})
        .then(response => {
          vue.activeShift.shifts = response.data
          vue.showTime = true
        })
        .catch(err => {
          console.log(err)
        })
    },
    populateCompanies () {
      let vue = this
      axios.get('https://api.shiftnotification.com/companies/all/spreadsheet/' + vue.user.id, {headers: { 'Authorization': 'JWT ' + vue.user.token }})
        .then(response => {
          vue.companies = response.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    shiftCompany (company) {
      let vue = this
      vue.pane.company = company.companyId
      vue.pane.department = ''
      vue.pane.shift = ''
      vue.pane.location = ''
    },
    locationSchedule (location) {
      let vue = this
      vue.pane.location = location._id
      vue.pane.department = ''
      vue.pane.shift = ''
    },
    shiftSchedule (shift, location) {
      let vue = this
      vue.pane.location = location._id
      vue.pane.shift = shift.shiftId
      vue.pane.department = ''
      vue.clicked = 'shift'
      vue.populateActiveShift(vue.activeDate)
    },
    departmentSchedule (department, location) {
      let vue = this
      vue.pane.location = location._id
      vue.pane.department = department.departmentId
      vue.pane.shift = ''
      vue.clicked = 'department'
      vue.populateActiveShift(vue.activeDate)
    },
    statusLogic (shift) {
      return {
        confirmed: shift.shiftStatus === 'confirm',
        away: shift.shiftStatus === 'away',
        opted: shift.shiftStatus === 'optOut'
      }
    },
    select (shift, event) {
      let vue = this
      if (event.ctrlKey) {
        let shiftNum = vue.activeShift.shifts.indexOf(shift)
        vue.activeShift.shifts[shiftNum].selected = !vue.activeShift.shifts[shiftNum].selected
      } else if (event.shiftKey) {
        var startIndex
        let i = 0
        for (i = 0; i < vue.activeShift.shifts.length; i++) {
          if (vue.activeShift.shifts[i].selected === true) {
            startIndex = i
          }
        }
        let endIndex = vue.activeShift.shifts.indexOf(shift)
        if (endIndex > startIndex) {
          let x = startIndex
          for (x = startIndex; x < (endIndex + 1); x++) {
            vue.activeShift.shifts[x].selected = true
          }
        } else {
          let x = startIndex
          for (x = startIndex; x > (endIndex - 1); x--) {
            vue.activeShift.shifts[x].selected = true
          }
        }
      } else {
        let i = 0
        for (i = 0; i < vue.activeShift.shifts.length; i++) {
          vue.activeShift.shifts[i].selected = false
        }
        let shiftNum = vue.activeShift.shifts.indexOf(shift)
        vue.activeShift.shifts[shiftNum].selected = true
      }
    },
    deleteSelected () {
      let vue = this
      let i = 0
      var deleteArray = []
      for (i = 0; i < vue.activeShift.shifts.length; i++) {
        if (vue.activeShift.shifts[i].selected === true) {
          deleteArray.push(i)
        }
      }
      let x = (deleteArray.length - 1)
      for (x = (deleteArray.length - 1); x >= 0; x--) {
        vue.activeShift.shifts.splice(deleteArray[x], 1)
      }
      for (i = 0; i < vue.activeShift.shifts.length; i++) {
        vue.activeShift.shifts[i].selected = false
      }
      vue.updateShiftSchedule()
      vue.deleteModal = false
    },
    populateActiveShift (picked) {
      let vue = this
      vue.activeShift.shifts = []
      vue.showTime = false
      if (picked) {
        vue.activeDate = new Date(picked)
      } else {
        vue.activeDate = new Date(vue.activeDate)
      }
      if (vue.clicked === 'shift') {
        axios.get('https://api.shiftnotification.com/schedules/spreadsheet/' + vue.user.id + '/' + vue.pane.company + '/' + vue.pane.location + '/' + vue.pane.shift + '/' + vue.activeDate, {headers: {'Authorization': 'JWT ' + vue.user.token}})
          .then(response => {
            if (response.data !== 'no Schedule Found') {
              vue.activeShift.id = response.data._id
              vue.activeShift.shifts = response.data.shifts
              vue.nameUpdate()
              vue.activeShift.shifts.sort(function (a, b) {
                a = new Date(a.shiftStartDate)
                b = new Date(b.shiftStartDate)
                return a > b ? -1 : a < b ? 1 : 0
              })
            } else {
              axios.get('https://api.shiftnotification.com/shifts/' + vue.user.id + '/' + vue.pane.shift, {headers: {'Authorization': 'JWT ' + vue.user.token}})
                .then(response => {
                  vue.defaultTime.startDate = response.data.defaultShift.shiftStartDate
                  vue.defaultTime.endDate = response.data.defaultShift.shiftEndDate
                  vue.activeShift.id = ''
                  vue.activeShift.shifts = []
                })
                .catch(err => {
                  console.log(err)
                })
            }
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        axios.get('https://api.shiftnotification.com/schedules/spreadsheet/' + vue.user.id + '/' + vue.pane.company + '/' + vue.pane.location + '/' + vue.pane.shift + '/' + vue.pane.department + '/' + vue.activeDate, {headers: {'Authorization': 'JWT ' + vue.user.token}})
          .then(response => {
            if (response.data !== 'no Schedule Found') {
              vue.activeShift.id = response.data._id
              vue.activeShift.shifts = response.data.shifts
              vue.nameUpdate()
              vue.activeShift.shifts.sort(function (a, b) {
                a = new Date(a.shiftStartDate)
                b = new Date(b.shiftStartDate)
                return a > b ? -1 : a < b ? 1 : 0
              })
            } else {
              axios.get('https://api.shiftnotification.com/shifts/' + vue.user.id + '/' + vue.pane.shift, {headers: {'Authorization': 'JWT ' + vue.user.token}})
                .then(response => {
                  vue.defaultTime.startDate = response.data.defaultShift.shiftStartDate
                  vue.defaultTime.endDate = response.data.defaultShift.shiftEndDate
                  vue.activeShift.id = ''
                  vue.activeShift.shifts = []
                })
                .catch(err => {
                  console.log(err)
                })
            }
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    usersSearch (shift) {
      let vue = this
      if (vue.userSearch !== '') {
        if (vue.pane.department === '') {
          axios.get('https://api.shiftnotification.com/users/search/' + vue.user.id + '/' + vue.userSearch + '/' + vue.pane.company + '/' + vue.pane.shift, {headers: {'Authorization': 'JWT ' + vue.user.token}})
            .then(response => {
              vue.searchPane = response.data
              vue.searchShift = shift
            })
            .catch(err => {
              console.log(err)
            })
        } else {
          axios.get('https://api.shiftnotification.com/users/search/' + vue.user.id + '/' + vue.userSearch + '/' + vue.pane.company + '/' + vue.pane.shift + '/' + vue.pane.department, {headers: {'Authorization': 'JWT ' + vue.user.token}})
            .then(response => {
              vue.searchPane = response.data
              vue.searchShift = shift
            })
            .catch(err => {
              console.log(err)
            })
        }
      } else {
        vue.searchPane = []
        vue.searchShift = {}
      }
    },
    userUpdateClick (user) {
      let vue = this
      let i = vue.activeShift.shifts.indexOf(vue.searchShift)
      vue.activeShift.shifts[i].user = user._id
      vue.searchPane = []
      vue.userSearch = ''
      vue.searchShift = {}
      vue.nameUpdate()
      vue.activeShift.shifts.sort(function (a, b) {
        a = new Date(a.shiftStartDate)
        b = new Date(b.shiftStartDate)
        return a > b ? -1 : a < b ? 1 : 0
      })
    },
    pickStart (picked, shift) {
      let vue = this
      let i = vue.activeShift.shifts.indexOf(shift)
      vue.activeShift.shifts[i].shiftStartDate = new Date(picked)
    },
    pickEnd (picked, shift) {
      let vue = this
      let i = vue.activeShift.shifts.indexOf(shift)
      vue.activeShift.shifts[i].shiftEndDate = new Date(picked)
    },
    pickMass (picked) {
      let vue = this
      vue.massTime = new Date(picked)
    },
    createWeekSchedule () {
      let vue = this
      var length
      let startTime = parseInt(vue.defaultTime.startDate)
      let endTime = parseInt(vue.defaultTime.endDate)
      if (endTime > startTime) {
        length = endTime - startTime
      } else {
        endTime = endTime + 7
        length = endTime - startTime
      }
      axios.post('https://api.shiftnotification.com/schedules/template/week', {
        companyId: vue.pane.company,
        locationId: vue.pane.location,
        shift: vue.pane.shift,
        department: vue.pane.department,
        date: vue.activeDate,
        length: length,
        adminId: vue.user.id
      }, {headers: { 'Authorization': 'JWT ' + vue.user.token }})
        .then(response => {
          vue.populateActiveShift()
        })
        .catch(err => {
          console.log(err)
        })
    },
    newTemplateSchedule () {
      let vue = this
      axios.post('https://api.shiftnotification.com/schedules/template', {
        companyId: vue.pane.company,
        locationId: vue.pane.location,
        shift: vue.pane.shift,
        department: vue.pane.department,
        date: vue.activeDate,
        adminId: vue.user.id
      }, {headers: { 'Authorization': 'JWT ' + vue.user.token }})
        .then(response => {
          vue.populateActiveShift()
        })
        .catch(err => {
          console.log(err)
        })
    },
    newShiftSchedule () {
      let vue = this
      axios.post('https://api.shiftnotification.com/schedules', {
        companyId: vue.pane.company,
        locationId: vue.pane.location,
        shift: vue.pane.shift,
        department: vue.pane.department,
        date: vue.activeDate,
        shifts: [],
        adminId: vue.user.id
      }, {headers: { 'Authorization': 'JWT ' + vue.user.token }})
        .then(response => {
          vue.populateActiveShift()
        })
        .catch(err => {
          console.log(err)
        })
    },
    newShift () {
      let vue = this
      vue.activeShift.shifts.push({
        selected: false,
        department: vue.pane.department,
        user: '',
        shiftName: '',
        location: '',
        shiftStartDate: vue.activeDate,
        shiftEndDate: vue.activeDate,
        shiftStatus: ''
      })
    },
    selectAll () {
      let vue = this
      let i = 0
      for (i = 0; i < vue.activeShift.shifts.length; i++) {
        vue.activeShift.shifts[i].selected = !vue.activeShift.shifts[i].selected
      }
    },
    updateFields () {
      let vue = this
      let i = 0
      for (i = 0; i < vue.activeShift.shifts.length; i++) {
        if (vue.activeShift.shifts[i].selected === true && vue.updateField === 'name') {
          vue.activeShift.shifts[i].shiftName = vue.fieldInput
        } else if (vue.activeShift.shifts[i].selected === true && vue.updateField === 'location') {
          vue.activeShift.shifts[i].location = vue.fieldInput
        }
      }
      vue.updateField = ''
      vue.fieldInput = ''
    },
    updateFieldsTime () {
      let vue = this
      let i = 0
      for (i = 0; i < vue.activeShift.shifts.length; i++) {
        if (vue.activeShift.shifts[i].selected === true && vue.updateField === 'start') {
          vue.activeShift.shifts[i].shiftStartDate = vue.massTime
        } else if (vue.activeShift.shifts[i].selected === true && vue.updateField === 'end') {
          vue.activeShift.shifts[i].shiftEndDate = vue.massTime
        }
      }
      vue.updateField = ''
      vue.fieldInput = ''
      vue.massTime = ''
    },
    updateShiftSchedule () {
      let vue = this
      let i = 0
      for (i = 0; i < vue.activeShift.shifts.length; i++) {
        vue.activeShift.shifts[i].selected = false
      }
      if (vue.pane.department === '') {
        axios.put('https://api.shiftnotification.com/schedules/' + vue.activeShift.id, {
          companyId: vue.pane.company,
          shift: vue.pane.shift,
          date: vue.activeDate,
          shifts: vue.activeShift.shifts,
          adminId: vue.user.id
        }, {headers: { 'Authorization': 'JWT ' + vue.user.token }})
          .then(response => {
            vue.successModal = true
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        axios.put('https://api.shiftnotification.com/schedules/department/' + vue.activeShift.id, {
          companyId: vue.pane.company,
          shift: vue.pane.shift,
          department: vue.pane.department,
          date: vue.activeDate,
          shifts: vue.activeShift.shifts,
          adminId: vue.user.id
        }, {headers: { 'Authorization': 'JWT ' + vue.user.token }})
          .then(response => {
            vue.successModal = true
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    viewSchedule (shift) {
      let vue = this
      vue.activeShift.id = shift._id
      vue.activeShift.shifts = shift.shifts
    },
    shiftStartEdit (activeShift) {
      let vue = this
      vue.hours = true
      vue.calendar = false
    },
    shiftEndEdit (activeShift) {
      let vue = this
      vue.hours = true
      vue.calendar = true
    }
  }
}
</script>

<style scoped lang="less">
@blue: #14325C;
@grey: #eaeaea;
@font: 'Monda', sans-serif;
.else {
  width: 100%;
  height: 92vh;
  background-color: @grey;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  display: grid;
  grid-template-columns: 24vw 76vw;
  grid-template-rows: repeat(20, 4.5vh);
}

.highlightCompany {
  background-color: @blue !important;
  color: white;
}

.highlight {
  background-color: #9fd2ea;
}

h3 {
  font-size: 2em;
}

h1, h2, h3, h4, h5, h6 {
  padding: 0;
  margin: 0;
}

h1 {
  grid-column: 2;
  font-family: @font;
  font-size: 3em;
  text-align: center;
  color: @blue;
}

button {
  color: white;
  border: none;
  font-size: 1.3em;
  background: linear-gradient(#2b5896, #14325C);
}

.calendarPicker {
  grid-column: 3;
  grid-column-end: 2;
  grid-row-start: 9;
  grid-row-end: 9;
}

.peaceOfMind {
  display: grid;
  grid-template-columns: 24vw 76vw;
  grid-template-rows: 8vh 92vh;
}

.emptyView {
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(4, 25vw);
  grid-template-rows: 26vh 8vh 8vh 8vh 46vh 8vh;
}

.emptyView h1 {
  grid-row: 1;
  grid-column-start: 2;
  grid-column-end: 5;
  line-height: 8vh;
  font-size: 2em;
  align-self: end;
  color: #AAD3D5;
  text-align: center;
}

.emptyView h6 {
  grid-row: 3;
  grid-column-start: 2;
  grid-column-end: 5;
  align-self: start;
  color: #AAD3D5;
  text-align: center;
}

.newWeekSchedule {
  grid-row: 2;
  grid-column-start: 3;
  grid-column-end: 4;
  align-self: start;
  color: white;
  text-align: center;
}

.newTemplateSchedule {
  grid-row: 4;
  grid-column-start: 3;
  grid-column-end: 4;
  align-self: start;
  color: white;
  text-align: center;
}

.newShiftSchedule {
  grid-row: 3;
  grid-column-start: 3;
  grid-column-end: 4;
  align-self: start;
  color: white;
  text-align: center;
}

.splash {
  background-image: url("../assets/splash.svg");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  grid-column: 3;
  grid-row: 5;
}

/* width */
::-webkit-scrollbar {
    width: 5px;
    height:5px;
}

/* Track */
::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px transparent;
    border-radius: 15px;
    border: none;
}

/* Handle */
::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 15px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: #555;
}
//Side Panel Start
.leftSidePane {
  grid-row: 2;
  background-color: #eaeaea;
  border-right: 1px solid grey;
  display: grid;
  grid-template-columns: 2vw 20vw 2vw;
  grid-template-rows: 0vh 1vh 5vh 1vh 5vh 1vh 39vh 2vh 36vh 2vh;
}

.newShiftModal {
  position: absolute;
  z-index: 3;
  left: 40vw;
  right: 60vw;
  top: 40vh;
  bottom: 60vh;
  height: 20vh;
  width: 20vw;
  background-color: white;
  border: 1px solid grey;
  align-self: center;
  border-radius: 5px;
}

.leftSidePane button {
  grid-column: 2;
  background: linear-gradient(#2b5896, #14325C);
  color: white;
}

.updateShiftSchedule {
  grid-row: 3;
}

.updateCompanyList {
  grid-row: 5;
}

.listHeader {
  text-align: center;
  text-decoration: underline;
  grid-column: 2;
  grid-row: 5;
  align-self: center;
  font-size: 1.2em;
}

.companyList {
  background-color: white;
  grid-column: 2;
  grid-row-start: 6;
  grid-row-end: 8;
  height: 100%;
  border-radius: 5px;
  border: 1px solid grey;
  overflow-y: scroll;
}

.company {
  margin: 2vh 1vw;
  width: 18vw;
  border: 1px solid grey;
  border-top: none;
  align-items: center;
}

.companyName {
  font-size: 1.2em;
  line-height: 1.8em;
  background-color: #9fd2ea;
  padding-left: 2%;
}

.locationColumn {
  margin-left: 2vh;
  align-items: center;
}

.locationColumnName {
  font-size: 1.2em;
  padding-left: 1vh;
  line-height: 3vh;
  height: 3vh;
  border-bottom: 1px solid grey;
  border-left: 1px solid grey;
}

.shiftsBox {
  grid-column-start: 1;
  grid-column-end: 3;
}

.shiftColumn {
  margin-bottom: 1.2em;
  margin-left: 1vw;
  height: 3vh;
  line-height: 3vh;
  align-items: center;
  display: grid;
  grid-template-columns: 1fr;
}

.shiftColumnName {
  grid-column: 1;
  font-size: 1.2em;
  padding-left: 1vh;
  line-height: 3vh;
  height: 3vh;
  border-top: 1px solid grey;
  border-bottom: 1px solid grey;
  border-left: 1px solid grey;
}

.shiftExpand {
  border: 1px grey solid;
  text-align: center;
  grid-column: 2;
  background-color: #9fd2ea;
  height: 100%;
  align-self: center;
  color: @blue;
}

.companyDepartment, .shiftDate {
  width: 17vw;
  margin-bottom: 0;
}

.companyDepartment {
  font-size: 1em;
  text-align: center;
}

.departmentName {
  font-size: 1em;
  margin-left: 2vw;
  padding-left: 1vh;
  align-self: center;
  border: 1px solid grey;
  border-top: none;
}

.shiftListItem {
  background-color: #eaeaea;
  font-size: 1em;
  margin-top: 1vh;
  margin-left: 1vw;
  margin-right: 1vw;
  height: 60px;
  border: 1px solid grey;
  align-self: center;
  border-radius: 5px;
  color: black;
}

.shiftDate {
  text-align: center;
  font-size: .75em;
  color: grey;
}
//SpreadSheet startHighlight
.spreadsheetPane {
  grid-row: 2;
  grid-column: 2;
  display: grid;
  grid-template-columns: 2vw 30vw 20vw 22vw 2vw;
  grid-template-rows: 4vh 6vh repeat(2, 2vh 6vh) 2vh 62vh 2vh;
}

.deleteModal {
  position: fixed;
  z-index: 3;
  left: 50vw;
  right: 35vw;
  top: 50vh;
  bottom: 60vh;
  height: 15vh;
  width: 22vw;
  background-color: white;
  border: 1px solid grey;
  align-self: center;
  border-radius: 5px;
}

.successModal {
  position: fixed;
  margin-right: 23vw;
  z-index: 3;
  left: 50vw;
  right: 35vw;
  top: 50vh;
  bottom: 60vh;
  height: 15vh;
  width: 22vw;
  background-color: white;
  border: 1px solid grey;
  width: 13vw;
  align-self: start;
  justify-self: right;
  border-radius: 5px;
}

.spreadsheetPane h2 {
  font-size: 2em;
  text-align: center;
}

.successModal button.noDelete {
  width: 13vw;
  border-radius: 5px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.deleteModal button.yesDelete {
  background: linear-gradient(#c22227, #770303);
  width: 100%;
}

.noDelete {
  width: 100%;
  margin-top: 10px;
}

.spreadsheetPane h1, .newShift, .LetItBe {
  grid-column-start: 2;
  grid-column-end: 5;
}

.spreadsheetPane h1 {
  grid-row-start: 1;
  grid-row-end: 3;
  text-align: left;
  line-height: 6vh;
  align-self: end;
}

.spreadsheetPane button, .spreadsheetPane input.update, .spreadsheetPane select {
  grid-column-start: 2;
  grid-column-end: 5;
  width: 22vw;
}

.newShift {
  grid-row: 6;
  justify-self: center;
  background: linear-gradient(#39b267, #13724b);
  color: white;
}

.spreadsheetPane .selectAll {
  grid-row: 6;
}

.spreadsheetPane select {
  grid-row: 2;
  justify-self: right;
}

.spreadsheetPane .update {
  justify-self: right
}

.spreadsheetPane .submit {
  grid-row: 6;
  justify-self: right;
}

.spreadSheetVar {
  grid-column-start: 2;
  grid-column-end: 5;
  grid-row: 8;
  display: grid;
  grid-template-columns: .5vw 6vw repeat(5, 13vw);
  grid-template-rows: 4vh 4vh 64vh;
  background-color: #eaeaea;
  border-radius: 10px;
  border: 1px solid grey;
  box-shadow: 1px 2px 3px grey;
  overflow-x: scroll;
}

.varNum, .varUser, .varName, .varLocal, .varStart, .varEnd {
  grid-row: 2;
  align-self: end;
  font-size: 1.5em;
  color: @blue;
  line-height: 30px;
}

.varNum {
  grid-column: 1;
}

.varUser {
  grid-column: 3;
}

.varName {
  grid-column: 4;
}

.varLocal {
  grid-column: 5;
}

.varStart {
  grid-column: 6;
}

.varEnd {
  grid-column: 7;
}

.LetItBe {
  grid-column-start: 2;
  grid-column-end: 8;
  grid-row: 3;
  background-color: transparent;
  overflow-y: scroll;
  overflow-x: scroll;
}

.shift {
  display: grid;
  grid-template-columns: 40px repeat(5, 13vw);
  grid-template-rows: 30px;
}

.confirmed {
  grid-column: 7;
  background-color: green;
  width: 50%;
}

.away {
  grid-column: 7;
  background-color: red;
  width: 50%;
}

.opted {
  grid-column: 7;
  background-color: grey;
  width: 50%;
}

.shiftUser {
  line-height: 1.6em;
}

.shiftUser, .ShiftUserClearDisplay, .shiftName, .shiftLocal, .shiftStart, .shiftEnd {
  grid-row: 1;
  font-size: 1em;
}

.shiftSelected {
  grid-column: 1;
  height: 26px;
  width: 26px;
  font-size: 1.2em;
  color: white;
  border-radius: 50%;
  background-color: green;
  text-align: center;
  align-self: left;
}

.shiftUser {
  grid-column: 2;
}

.ShiftUserClearDisplay {
  grid-column: 2;
  color: red;
  text-align: right;
  margin-right: 15%;
  font-size: 1.8em;
}

.shiftName {
  grid-column: 3;
}

.shiftLocal {
  grid-column: 4;
}

.shiftStart {
  grid-column: 5;
  font-size: 1em;
  margin-left: 30%;
  align-self: center;
}

.shiftEnd {
  grid-column: 6;
  font-size: 1em;
  align-self: center;
}

.opt {
  grid-column: 2;
  grid-row: 3;
  display: grid;
  grid-template-columns: 25vw 20vw 25vw;
  grid-template-rows: 3vh 1vh 3vh 1vh 3vh;
}

.selectAll {
  grid-row: 5;
  grid-column: 1;
}

.select {
  grid-column: 3;
}

.submit {
  grid-column: 3;
  grid-row: 5;
}

.update {
  grid-column: 4;
  grid-row: 4;
}

.updateTime {
  padding-top: 10px;
  grid-column: 4;
  grid-row: 4;
  height: 10vh;
  background-color: grey;
  z-index: 3;
  border-radius: 4px;
}

.updateTimeEnd {
  padding-top: 10px;
  grid-column: 4;
  grid-row: 4;
  height: 34vh;
  background-color: grey;
  z-index: 3;
  border-radius: 4px;
}

.updateReset {
  text-align: right;
  margin-left: 90%;
}

.opt {
  grid-column: 2;
  grid-row: 3;
  display: grid;
  grid-template-columns: 25vw 20vw 25vw;
  grid-template-rows: 3vh 1vh 3vh 1vh 3vh;
}

.submit {
  grid-column: 3;
  grid-row: 5;
}

.shiftUserSearch, .g {
  grid-row: 2;
  grid-column: 2;
  background-color: #9fd2ea;
  box-shadow: 0px 1px 3px grey;
}
</style>
