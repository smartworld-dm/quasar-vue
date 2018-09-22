<template>
  <div class="main">
    <div class="shiftModals">
      <div class="companyModals">
        <div class="create" v-if="modal==='create'">
          <h1>New Company</h1>
          <h3 class="newName">Company Name</h3>
          <input class="Name" v-model="activeCompany.companyName" placeholder="Default Name" type="text" />
          <h3 class="newId">Company ID</h3>
          <input class="ID" v-model="activeCompany.companyId" placeholder="ID #" type="text" />
          <h3 class="newRole">Company Role</h3>
          <input class="Role" v-model="activeCompany.defaultRole" placeholder="Default Role" type="text" />
          <span>Notify: </span><input class="check" v-model="activeCompany.apps.notify" type="checkbox" />
          <div class="buttonBar">
            <button class="createCompany" v-on:click="createCompany()">Create Company</button>
            <button class="back" v-on:click="clearActiveCompany(); populateCompanies(); modal=''">Cancel</button>
          </div>
        </div>
        <div class="editOne" v-if="modal==='edit'">
          <h1>Edit Company</h1>
          <h3 class="editNameH">Company Name</h3>
          <input class="editName" v-model="activeCompany.companyName" placeholder="Company Name" type="text" />
          <h3 class="editIdH">Company ID</h3>
          <input class="editId" v-model="activeCompany.companyId" placeholder="Company ID" type="text" />
          <h3 class="editRoleH">Company Role</h3>
          <input class="editRole" v-model="activeCompany.defaultRole" placeholder="Default Role" type="text" />
          <span class="not">Notify:</span><input class="notcheck" v-model="activeCompany.apps.notify" type="checkbox" />
           <div class="buttonBar">
              <button class="submitEdit" v-on:click="updateCompany()">Save</button>
              <button class="back" v-on:click=" populateCompanies(); modal='view'">Cancel</button>
          </div>
        </div>
        <div class="areYouSure" v-else-if="modal==='sure'">
          <h1>Are you Sure?</h1>
          <h4>(This is permanent and irreversable!)</h4>
          <button class="yesSure" v-on:click="deleteCompany()">Yes</button>
          <button class="noSure" v-on:click="modal='edit'">No</button>
        </div>
        <div class="viewOne" v-if="modal==='view'">
          <div class="companyName">
            <span class="companyNameH">Name: {{activeCompany.companyName}}</span>
            <span class="companyIdH"> ID: {{activeCompany.companyId}}</span>
          </div>
          <div class="role">Role: {{activeCompany.defaultRole}}</div>
          <div class="notify">Notify: {{activeCompany.apps.notify}}</div>
          <h6 class="logsH">Logs</h6>
          <div class="logs">{{activeCompany.logs}}</div>
          <h6 class="locationH">Locations</h6>
          <button class="createNewLocation" v-on:click="modal='createLocation'">Create New Location</button>
          <div class="locationsBox">
            <div class="location" v-on:click="viewLocation(location)" v-for="location in locations" v-bind:key="location._id">
              <h2 >{{location.name}}</h2>
            </div>
          </div>
          <button class="editButton" v-on:click="modal='edit'">Edit Company</button>
        </div>
      </div>
      <div class="locationModals">
        <div class="locationView" v-if="modal==='viewLocation'">
          <div class="locationName"><span class="locationNameH">{{activeLocation.name}}</span><span>Company ID: {{activeLocation.companyId}}</span></div>
          <h6 class="shiftsH">Shifts</h6>
          <button class="createNewShift" v-on:click="modal='createShift'">Create New Shift</button>
          <div class="shiftsBox">
            <div class="shift" v-on:click="viewShift(shift)" v-for="shift in shifts" v-bind:key="shift._id">
              <h2 >{{shift.name}}</h2>
            </div>
          </div>
          <button class="createNewDepartment" v-on:click="modal='createDepartment'">Create New Department</button>
          <h6 class="logsH">Departments</h6>
          <div class="departmentsBox">
            <div class="department" v-on:click="viewDepartment(department)" v-for="department in departments" v-bind:key="department._id">
              <h2>{{department.name}}</h2>
            </div>
          </div>
          <button class="editButtonLocation" v-on:click="modal='editLocation'">Edit Location</button>
          <button class="back" v-on:click="clearActiveLocation(); populateLocations(); modal='view'">Back</button>
        </div>
        <div class="locationEdit" v-else-if="modal==='editLocation'">
          <h1>Location Edit</h1>
          <h3 class="editNameH">Name</h3>
          <input class="editName" v-model="activeLocation.name" placeholder="Location Name" type="text" />
          <button class="submitEdit" v-on:click="updateLocation()">Update Location</button>
          <button class="deleteLocation" v-on:click="modal='sureLocation'">Delete Location</button>
          <button class="back" v-on:click="clearActiveLocation(); populateLocations(); modal='view'">Back</button>
        </div>
        <div class="createLocation" v-else-if="modal==='createLocation'">
          <h1>New Location</h1>
          <h3 class="locName">Name</h3>
          <input class="locationNameNew" v-model="activeLocation.name" placeholder="Location Name" type="text" />
          <button class="createLocation" v-on:click="createLocation()">Create Location</button>
          <button class="back" v-on:click="clearActiveLocation(); populateLocations(); modal='view'">Back</button>
        </div>
        <div class="areYouSureLocation" v-else-if="modal==='sureLocation'">
          <h3>Are you Sure?</h3>
          <h4>(This is permanent and irreversable!)</h4>
          <button class="yesSure" v-on:click="deleteLocation()">Yes</button>
          <button class="noSure" v-on:click="modal='editLocation'">No</button>
        </div>
      </div>
      <div class="departmentModals">
        <div class="departmentView" v-if="modal==='viewDepartment'">
          <div class="companyId">ID: {{activeDepartment.companyId}}</div>
          <div class="departmentName"><h1>{{activeDepartment.name}}</h1></div>
          <div class="departmentRole">Department Role: {{activeDepartment.defaultRole}}</div>
          <div class="departmentLocationDefault">Default Position: {{activeDepartment.defaultLocation}}</div>
          <h3>Logs</h3>
          <div class="deplogs">{{activeDepartment.logs}}</div>
          <button class="editButtonDepartment" v-on:click="modal='editDepartment'">Edit Department</button>
          <button class="back" v-on:click="clearActiveDepartment(); populateDepartments(); populateShifts(); modal='viewLocation'">Back</button>
        </div>
        <div class="departmentEdit" v-else-if="modal==='editDepartment'">
          <h1>Department Edit</h1>
          <h3 class="editNameH">Name</h3>
          <input class="editName" v-model="activeDepartment.name" placeholder="Department Name" type="text" />
          <h3 class="editRole">Role</h3>
          <input class="editrole" v-model="activeDepartment.defaultRole" placeholder="Default Role" type="text" />
          <button class="submitEdit" v-on:click="updateDepartment()">Update Department</button>
          <button class="deleteDepartment" v-on:click="modal='sureDepartment'">Delete Department</button>
          <button class="back" v-on:click="clearActiveDepartment(); populateDepartments(); populateShifts(); modal='viewLocation'">Back</button>
        </div>
        <div class="createDepartment" v-else-if="modal==='createDepartment'">
          <h1>New Department</h1>
          <h3 class="depName">Name</h3>
          <input class="departmentNameNew" v-model="activeDepartment.name" placeholder="Department Name" type="text" />
          <h3 class="depRole">Role</h3>
          <input class="departmentRoleNew" v-model="activeDepartment.defaultRole" placeholder="Default Role" type="text" />
          <h3 class="depLocation">Position</h3>
          <input class="DepartmentLocationNew" v-model="activeDepartment.defaultLocation" placeholder="Default Position" type="text" />
          <button class="createDepartment" v-on:click="createDepartment()">Create Department</button>
          <button class="back" v-on:click="clearActiveDepartment(); populateDepartments(); populateShifts(); modal='view'">Back</button>
        </div>
        <div class="areYouSure" v-else-if="modal==='sureDepartment'">
          <h3>Are you Sure?</h3>
          <h4>(This is permanent and irreversable!)</h4>
          <button class="yesSure" v-on:click="deleteDepartment()">Yes</button>
          <button class="noSure" v-on:click="modal='editDepartment'">No</button>
        </div>
      </div>
      <div class="shiftView" v-if="modal==='viewShift'">
        <div  class="shiftName"><h1>Shift: {{activeShift.name}}</h1></div>
        <div class="shiftCompanyId">Company ID: {{activeShift.companyId}}</div>
        <div class="shiftRole">Shift Role: {{activeShift.defaultRole}}</div>
        <h3 class="shiftDetailsH">Shift Details</h3>
        <div class="defaultShift">
          <div class="shiftDefaultName">Default Shift Name: {{activeShift.defaultShift.shiftName}}</div>
          <h4 class="weekdaysH">Weekdays</h4>
          <div class="shiftDate">{{weekDay(activeShift.defaultShift.shiftStartDate)}} - {{weekDay(activeShift.defaultShift.shiftEndDate)}}</div>
          <h4 class="timesH">Times</h4>
          <div class="shiftTime">{{new Date(activeShift.defaultShift.shiftStartTime).getHours()}}:<span v-if="new Date(activeShift.defaultShift.shiftStartTime).getMinutes() < 10">0</span>{{new Date(activeShift.defaultShift.shiftStartTime).getMinutes()}} - {{new Date(activeShift.defaultShift.shiftEndTime).getHours()}}:<span v-if="new Date(activeShift.defaultShift.shiftEndTime).getMinutes() < 10">0</span>{{new Date(activeShift.defaultShift.shiftEndTime).getMinutes()}}</div>
        </div>
        <h3 class="logsH">Logs</h3>
        <div class="shiftlogs">{{activeShift.logs}}</div>
        <button class="editButtonShift" v-on:click="modal='editShift'">Edit Shift</button>
        <button class="back" v-on:click="clearActiveShift(); populateShifts(); populateDepartments(); modal='viewLocation'">Back</button>
      </div>
      <div class="createShift" v-else-if="modal==='createShift'">
        <h1 class="createNewShiftH">Create New Shift</h1>
        <h3 class="shiftNameH">Shift Name</h3>
        <input class="shiftName" v-model="activeShift.name" placeholder="Shift Name" type="text" />
        <h3 class="shiftRoleH">Shift Role</h3>
        <input class="shiftRole" v-model="activeShift.defaultRole" placeholder="Default Role" type="text" />
        <div class="defaultShift">
          <h3 class="shiftNameDefaultH">Deafult Name</h3>
          <input class="shiftNameDefault" v-model="activeShift.defaultShift.shiftName" />
          <h3 class="editDateStartH">Start Day</h3>
          <select class="editDateStart" v-model="activeShift.defaultShift.shiftStartDate">
            <option value="0">Sunday</option>
            <option value="1">Monday</option>
            <option value="2">Tuesday</option>
            <option value="3">Wednesday</option>
            <option value="4">Thursday</option>
            <option value="5">Friday</option>
            <option value="6">Saturday</option>
          </select>
          <h3 class="editDateEndH">End Day</h3>
          <select class="editDateEnd" v-model="activeShift.defaultShift.shiftEndDate">
            <option value="0">Sunday</option>
            <option value="1">Monday</option>
            <option value="2">Tuesday</option>
            <option value="3">Wednesday</option>
            <option value="4">Thursday</option>
            <option value="5">Friday</option>
            <option value="6">Saturday</option>
          </select>
          <h3 class="editTimeStartH">Time Start</h3>
          <div class="editTimeStart" v-if="activeShift.defaultShift.shiftStartTime!==''" v-on:click="activeShift.defaultShift.shiftStartTime=''">{{new Date(activeShift.defaultShift.shiftStartTime).getHours()}}:<span v-if="new Date(activeShift.defaultShift.shiftStartTime).getMinutes() < 10">0</span>{{new Date(activeShift.defaultShift.shiftStartTime).getMinutes()}}</div>
          <calendarPicker class="editTimeStart" @pick="pickStart($event)" :hours="true" :timeProp="activeDate"  v-if="activeShift.defaultShift.shiftStartTime===''"></calendarPicker>
          <h3 class="editTimeEndH">Time End</h3>
          <div class="editTimeEnd" v-if="activeShift.defaultShift.shiftEndTime!==''" v-on:click="activeShift.defaultShift.shiftEndTime=''">{{new Date(activeShift.defaultShift.shiftEndTime).getHours()}}:<span v-if="new Date(activeShift.defaultShift.shiftEndTime).getMinutes() < 10">0</span>{{new Date(activeShift.defaultShift.shiftEndTime).getMinutes()}}</div>
          <calendarPicker class="editTimeEnd" @pick="pickEnd($event)" :hours="true" :timeProp="activeDate"  v-if="activeShift.defaultShift.shiftEndTime===''"></calendarPicker>
        </div>
        <button class="createShift" v-on:click="createShift()">Create Shift</button>
        <button class="back" v-on:click="clearActiveShift(); populateShifts(); populateDepartments(); modal='view'">Back</button>
      </div>
      <div class="shiftEdit" v-else-if="modal==='editShift'">
        <h1>Edit Shift</h1>
        <h3 class="shiftEditNameH">Name</h3>
        <input class="editName" v-model="activeShift.name" placeholder="Shift Name" type="text" />
        <h3 class="shiftEditRoleH">Role</h3>
        <input class="editRole" v-model="activeShift.defaultRole" placeholder="Default Role" type="text" />
        <div class="defaultShift">
          <h3 class="editDefaultNameH">Default Name</h3>
          <input class="editDefaultName" v-model="activeShift.defaultShift.shiftName" />
          <h3 class="editDateStartH">Start Day</h3>
          <select class="editDateStart" v-model="activeShift.defaultShift.shiftStartDate">
            <option value="0">Sunday</option>
            <option value="1">Monday</option>
            <option value="2">Tuesday</option>
            <option value="3">Wednesday</option>
            <option value="4">Thursday</option>
            <option value="5">Friday</option>
            <option value="6">Saturday</option>
          </select>
          <h3 class="editDateEndH">End Day</h3>
          <select class="editDateEnd" v-model="activeShift.defaultShift.shiftEndDate">
            <option value="0">Sunday</option>
            <option value="1">Monday</option>
            <option value="2">Tuesday</option>
            <option value="3">Wednesday</option>
            <option value="4">Thursday</option>
            <option value="5">Friday</option>
            <option value="6">Saturday</option>
          </select>
          <h3 class="editTimeStartH">Time Start</h3>
          <div class="editTimeStart" v-if="activeShift.defaultShift.shiftStartTime!==''" v-on:click="activeShift.defaultShift.shiftStartTime=''">{{new Date(activeShift.defaultShift.shiftStartTime).getHours()}}:<span v-if="new Date(activeShift.defaultShift.shiftStartTime).getMinutes() < 10">0</span>{{new Date(activeShift.defaultShift.shiftStartTime).getMinutes()}}</div>
          <calendarPicker class="editTimeStart" @pick="pickStart($event)" :hours="true" :timeProp="activeDate"  v-if="activeShift.defaultShift.shiftStartTime===''"></calendarPicker>
          <h3 class="editTimeEndH">Time End</h3>
          <div class="editTimeEnd" v-if="activeShift.defaultShift.shiftEndTime!==''" v-on:click="activeShift.defaultShift.shiftEndTime=''">{{new Date(activeShift.defaultShift.shiftEndTime).getHours()}}:<span v-if="new Date(activeShift.defaultShift.shiftEndTime).getMinutes() < 10">0</span>{{new Date(activeShift.defaultShift.shiftEndTime).getMinutes()}}</div>
          <calendarPicker class="editTimeEnd" @pick="pickEnd($event)" :hours="true" :timeProp="activeDate"  v-if="activeShift.defaultShift.shiftEndTime===''"></calendarPicker>
        </div>
        <button class="submitEdit" v-on:click="updateShift()">Update Shift</button>
        <button class="deleteShift" v-on:click="modal='sureShift'">Delete Shift</button>
        <button class="back" v-on:click="clearActiveShift(); populateShifts(); populateDepartments(); modal='view'">Back</button>
      </div>
      <div class="areYouSure areYouSureShift" v-else-if="modal==='sureShift'">
        <h1>Are you Sure?</h1>
        <h4>(This is permanent and irreversable!)</h4>
        <button class="yesSure" v-on:click="deleteShift()">Yes</button>
        <button class="noSure" v-on:click="modal='editShift'">No</button>
      </div>
    </div>
    <div class="companiesBox" v-if="user.systemAdmin">
      <button class="createNewButton" v-on:click="modal='create'">Create New Company</button>
      <div class="companyList">
        <div class="company" v-on:click="viewCompany(company)" v-for="company in companies" v-bind:key="company._id">
          <h2 class="companyNameH">{{company.companyName}}</h2>
          <h3 class="companyIdH">ID: {{company.companyId}}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import CalendarPicker from './elements/CalendarPicker'
export default {
  name: 'companies',
  props: ['user', 'logged'],
  components: {
    'calendarPicker': CalendarPicker
  },
  created () {
    let vue = this
    if (vue.user.systemAdmin) {
      vue.populateCompanies()
    }
    vue.activeDate = new Date()
    vue.activeShift.defaultShift.shiftStartDate = new Date()
    vue.activeShift.defaultShift.shiftEndDate = new Date()
    vue.activeShift.defaultShift.shiftStartTime = new Date()
    vue.activeShift.defaultShift.shiftEndTime = new Date()
  },
  data: function () {
    return {
      modal: '',
      companies: [],
      locations: [],
      shifts: [],
      departments: [],
      activeDate: '',
      activeCompany: {
        id: '',
        companyId: '',
        companyName: '',
        defaultRole: '',
        apps: {
          notify: false
        },
        logs: [],
        expand: false
      },
      activeLocation: {
        id: '',
        companyId: '',
        name: '',
        logs: []
      },
      activeShift: {
        id: '',
        companyId: '',
        locationId: '',
        name: '',
        defaultRole: '',
        defaultShift: {
          shiftName: '',
          shiftStartDate: '',
          shiftEndDate: '',
          shiftStartTime: '',
          shiftEndTime: ''
        },
        logs: []
      },
      activeDepartment: {
        id: '',
        companyId: '',
        locationId: '',
        name: '',
        defaultRole: '',
        defaultLocation: '',
        logs: []
      }
    }
  },
  methods: {
    createCompany () {
      let vue = this
      axios.post('https://api.shiftnotification.com/companies', {
        adminId: vue.user.id,
        companyId: vue.activeCompany.companyId,
        companyName: vue.activeCompany.companyName,
        defaultRole: vue.activeCompany.defaultRole,
        apps: {
          notify: vue.activeCompany.apps.notify
        },
        logs: [],
        expand: false
      }, {headers: { 'Authorization': 'JWT ' + vue.user.token }})
        .then(response => {
          vue.activeCompany.id = response.data._id
          vue.activeCompany.companyId = response.data.companyId
          vue.activeCompany.companyName = response.data.companyName
          vue.activeCompany.defaultRole = response.data.defaultRole
          vue.activeCompany.apps.notify = response.data.apps.notify
          vue.activeCompany.logs = response.data.logs
          vue.activeCompany.expand = response.data.expand
          vue.populateCompanies()
          vue.modal = 'view'
        })
        .catch(err => {
          console.log(err)
        })
    },
    updateCompany () {
      let vue = this
      axios.put('https://api.shiftnotification.com/companies/' + vue.activeCompany.id, {
        adminId: vue.user.id,
        companyId: vue.activeCompany.companyId,
        companyName: vue.activeCompany.companyName,
        defaultRole: vue.activeCompany.defaultRole,
        apps: {
          notify: vue.activeCompany.apps.notify
        }
      }, {headers: { 'Authorization': 'JWT ' + vue.user.token }})
        .then(response => {
          vue.modal = 'view'
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteCompany () {
      let vue = this
      axios.delete('https://api.shiftnotification.com/companies/' + vue.activeCompany.id + '/' + vue.user.id, {headers: { 'Authorization': 'JWT ' + vue.user.token }})
        .then(response => {
          vue.clearActiveCompany()
          vue.populateCompanies()
          vue.modal = ''
        })
        .catch(err => {
          console.log(err)
        })
    },
    populateCompanies () {
      let vue = this
      axios.get('https://api.shiftnotification.com/companies/all/' + vue.user.id, {headers: { 'Authorization': 'JWT ' + vue.user.token }})
        .then(response => {
          vue.companies = response.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    viewCompany (company) {
      let vue = this
      vue.departments = []
      vue.shifts = []
      vue.activeCompany.id = company._id
      vue.activeCompany.companyId = company.companyId
      vue.activeCompany.companyName = company.companyName
      vue.activeCompany.defaultRole = company.defaultRole
      vue.activeCompany.apps.notify = company.apps.notify
      vue.activeCompany.logs = company.logs
      vue.activeCompany.expand = company.expand
      vue.populateLocations()
      vue.modal = 'view'
    },
    clearActiveCompany () {
      let vue = this
      vue.activeCompany.id = ''
      vue.activeCompany.companyId = ''
      vue.activeCompany.companyName = ''
      vue.activeCompany.defaultRole = ''
      vue.activeCompany.apps.notify = false
      vue.activeCompany.logs = []
      vue.activeCompany.expand = false
      vue.locations = []
      vue.departments = []
      vue.shifts = []
    },
    createLocation () {
      let vue = this
      axios.post('https://api.shiftnotification.com/locations', {
        adminId: vue.user.id,
        companyId: vue.activeCompany.companyId,
        name: vue.activeLocation.name,
        logs: []
      }, {headers: { 'Authorization': 'JWT ' + vue.user.token }})
        .then(response => {
          vue.activeLocation.id = response.data._id
          vue.activeLocation.companyId = response.data.companyId
          vue.activeLocation.companyName = response.data.name
          vue.activeLocation.logs = response.data.logs
          vue.populateLocations()
          vue.modal = 'viewLocation'
        })
        .catch(err => {
          console.log(err)
        })
    },
    updateLocation () {
      let vue = this
      axios.put('https://api.shiftnotification.com/locations/' + vue.activeLocation.id, {
        adminId: vue.user.id,
        companyId: vue.activeLocation.companyId,
        name: vue.activeLocation.name
      }, {headers: { 'Authorization': 'JWT ' + vue.user.token }})
        .then(response => {
          vue.modal = 'viewLocation'
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteLocation () {
      let vue = this
      axios.delete('https://api.shiftnotification.com/locations/' + vue.activeLocation.id + '/' + vue.user.id, {headers: { 'Authorization': 'JWT ' + vue.user.token }})
        .then(response => {
          vue.clearActiveLocation()
          vue.populateLocations()
          vue.modal = 'view'
        })
        .catch(err => {
          console.log(err)
        })
    },
    populateLocations () {
      let vue = this
      axios.get('https://api.shiftnotification.com/locations/all/' + vue.user.id + '/' + vue.activeCompany.companyId, {headers: { 'Authorization': 'JWT ' + vue.user.token }})
        .then(response => {
          vue.locations = response.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    viewLocation (location) {
      let vue = this
      vue.departments = []
      vue.shifts = []
      vue.activeLocation.id = location._id
      vue.activeLocation.companyId = location.companyId
      vue.activeLocation.name = location.name
      vue.activeLocation.logs = location.logs
      vue.populateShifts()
      vue.populateDepartments()
      vue.modal = 'viewLocation'
    },
    clearActiveLocation () {
      let vue = this
      vue.activeLocation.id = ''
      vue.activeLocation.companyId = ''
      vue.activeLocation.name = ''
      vue.activeLocation.logs = []
      vue.departments = []
      vue.shifts = []
    },
    pickStart (picked) {
      let vue = this
      vue.activeShift.defaultShift.shiftStartTime = new Date(picked)
    },
    pickEnd (picked) {
      let vue = this
      vue.activeShift.defaultShift.shiftEndTime = new Date(picked)
    },
    weekDay (day) {
      day = parseInt(day)
      if (day === 0) {
        return 'Sunday'
      } else if (day === 1) {
        return 'Monday'
      } else if (day === 2) {
        return 'Tuesday'
      } else if (day === 3) {
        return 'Wednesday'
      } else if (day === 4) {
        return 'Thursday'
      } else if (day === 5) {
        return 'Friday'
      } else if (day === 6) {
        return 'Saturday'
      }
    },
    createShift () {
      let vue = this
      axios.post('https://api.shiftnotification.com/shifts', {
        adminId: vue.user.id,
        companyId: vue.activeCompany.companyId,
        locationId: vue.activeLocation.id,
        name: vue.activeShift.name,
        defaultRole: vue.activeShift.defaultRole,
        defaultShift: {
          shiftName: vue.activeShift.defaultShift.shiftName,
          shiftStartDate: vue.activeShift.defaultShift.shiftStartDate,
          shiftEndDate: vue.activeShift.defaultShift.shiftEndDate,
          shiftStartTime: vue.activeShift.defaultShift.shiftStartTime,
          shiftEndTime: vue.activeShift.defaultShift.shiftEndTime
        },
        logs: []
      }, {headers: { 'Authorization': 'JWT ' + vue.user.token }})
        .then(response => {
          vue.activeShift.id = response.data._id
          vue.activeShift.companyId = response.data.companyId
          vue.activeShift.name = response.data.name
          vue.activeShift.defaultRole = response.data.defaultRole
          vue.activeShift.defaultShift.shiftName = response.data.defaultShift.shiftName
          vue.activeShift.defaultShift.shiftStartDate = response.data.defaultShift.shiftStartDate
          vue.activeShift.defaultShift.shiftEndDate = response.data.defaultShift.shiftEndDate
          vue.activeShift.defaultShift.shiftStartTime = response.data.defaultShift.shiftStartTime
          vue.activeShift.defaultShift.shiftEndTime = response.data.defaultShift.shiftEndTime
          vue.activeShift.logs = response.data.logs
          vue.populateShifts()
          vue.modal = 'viewShift'
        })
        .catch(err => {
          console.log(err)
        })
    },
    updateShift () {
      let vue = this
      axios.put('https://api.shiftnotification.com/shifts/' + vue.activeShift.id, {
        adminId: vue.user.id,
        companyId: vue.activeCompany.companyId,
        locationId: vue.activeLocation.id,
        name: vue.activeShift.name,
        defaultRole: vue.activeShift.defaultRole,
        defaultShift: {
          shiftName: vue.activeShift.defaultShift.shiftName,
          shiftStartDate: vue.activeShift.defaultShift.shiftStartDate,
          shiftEndDate: vue.activeShift.defaultShift.shiftEndDate,
          shiftStartTime: vue.activeShift.defaultShift.shiftStartTime,
          shiftEndTime: vue.activeShift.defaultShift.shiftEndTime
        }
      }, {headers: { 'Authorization': 'JWT ' + vue.user.token }})
        .then(response => {
          vue.modal = 'viewShift'
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteShift () {
      let vue = this
      axios.delete('https://api.shiftnotification.com/shifts/' + vue.activeShift.id + '/' + vue.user.id, {headers: { 'Authorization': 'JWT ' + vue.user.token }})
        .then(response => {
          vue.clearActiveShift()
          vue.populateShifts()
          vue.modal = 'view'
        })
        .catch(err => {
          console.log(err)
        })
    },
    populateShifts () {
      let vue = this
      axios.get('https://api.shiftnotification.com/Shifts/all/' + vue.user.id + '/' + vue.activeCompany.companyId + '/' + vue.activeLocation.id, {headers: { 'Authorization': 'JWT ' + vue.user.token }})
        .then(response => {
          vue.shifts = response.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    viewShift (shift) {
      let vue = this
      vue.activeShift.id = shift._id
      vue.activeShift.companyId = shift.companyId
      vue.activeShift.locationId = shift.locationId
      vue.activeShift.name = shift.name
      vue.activeShift.defaultRole = shift.defaultRole
      vue.activeShift.defaultShift.shiftName = shift.defaultShift.shiftName
      vue.activeShift.defaultShift.shiftStartDate = shift.defaultShift.shiftStartDate
      vue.activeShift.defaultShift.shiftEndDate = shift.defaultShift.shiftEndDate
      vue.activeShift.defaultShift.shiftStartTime = shift.defaultShift.shiftStartTime
      vue.activeShift.defaultShift.shiftEndTime = shift.defaultShift.shiftEndTime
      vue.activeShift.logs = shift.logs
      vue.modal = 'viewShift'
    },
    clearActiveShift () {
      let vue = this
      vue.activeShift.id = ''
      vue.activeShift.companyId = ''
      vue.activeShift.locationId = ''
      vue.activeShift.name = ''
      vue.activeShift.defaultRole = ''
      vue.activeShift.defaultShift.shiftName = ''
      vue.activeShift.defaultShift.shiftStartDate = ''
      vue.activeShift.defaultShift.shiftEndDate = ''
      vue.activeShift.defaultShift.shiftStartTime = ''
      vue.activeShift.defaultShift.shiftEndTime = ''
      vue.activeShift.logs = []
      vue.departments = []
    },
    createDepartment () {
      let vue = this
      axios.post('https://api.shiftnotification.com/departments', {
        adminId: vue.user.id,
        companyId: vue.activeCompany.companyId,
        locationId: vue.activeLocation.id,
        shift: vue.activeShift.id,
        name: vue.activeDepartment.name,
        defaultRole: vue.activeDepartment.defaultRole,
        defaultLocation: vue.activeDepartment.defaultLocation,
        logs: []
      }, {headers: { 'Authorization': 'JWT ' + vue.user.token }})
        .then(response => {
          vue.activeDepartment.id = response.data._id
          vue.activeDepartment.companyId = response.data.companyId
          vue.activeDepartment.locationId = response.data.locationId
          vue.activeDepartment.shift = response.data.shift
          vue.activeDepartment.name = response.data.name
          vue.activeDepartment.defaultRole = response.data.defaultRole
          vue.activeDepartment.defaultLocation = response.data.defaultLocation
          vue.activeDepartment.logs = response.data.logs
          vue.populateDepartments()
          vue.modal = 'viewDepartment'
        })
        .catch(err => {
          console.log(err)
        })
    },
    updateDepartment () {
      let vue = this
      axios.put('https://api.shiftnotification.com/departments/' + vue.activeDepartment.id, {
        adminId: vue.user.id,
        companyId: vue.activeDepartment.companyId,
        locationId: vue.activeLocation.id,
        shift: vue.activeDepartment.shift,
        name: vue.activeDepartment.name,
        defaultRole: vue.activeDepartment.defaultRole,
        defaultLocation: vue.activeDepartment.defaultLocation
      }, {headers: { 'Authorization': 'JWT ' + vue.user.token }})
        .then(response => {
          vue.modal = 'viewDepartment'
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteDepartment () {
      let vue = this
      axios.delete('https://api.shiftnotification.com/departments/' + vue.activeDepartment.id + '/' + vue.user.id, {headers: { 'Authorization': 'JWT ' + vue.user.token }})
        .then(response => {
          vue.clearActiveDepartment()
          vue.populateDepartments()
          vue.modal = 'view'
        })
        .catch(err => {
          console.log(err)
        })
    },
    populateDepartments () {
      let vue = this
      axios.get('https://api.shiftnotification.com/departments/all/' + vue.user.id + '/' + vue.activeCompany.companyId + '/' + vue.activeLocation.id, {headers: { 'Authorization': 'JWT ' + vue.user.token }})
        .then(response => {
          vue.departments = response.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    viewDepartment (department) {
      let vue = this
      vue.activeDepartment.id = department._id
      vue.activeDepartment.companyId = department.companyId
      vue.activeDepartment.locationId = department.locationId
      vue.activeDepartment.shift = department.shift
      vue.activeDepartment.name = department.name
      vue.activeDepartment.defaultRole = department.defaultRole
      vue.activeDepartment.defaultLocation = department.defaultLocation
      vue.activeDepartment.logs = department.logs
      vue.modal = 'viewDepartment'
    },
    clearActiveDepartment () {
      let vue = this
      vue.activeDepartment.id = ''
      vue.activeDepartment.companyId = ''
      vue.activeDepartment.locationId = ''
      vue.activeDepartment.shift = ''
      vue.activeDepartment.name = ''
      vue.activeDepartment.defaultRole = ''
      vue.activeDepartment.defaultLocation = ''
      vue.activeDepartment.logs = []
    }
  }
}
</script>

<style scoped lang="less">
@blue-gray: #D7EFFF;
@lightGray: #efefef;

  .main {
    margin-top: 8vh;
    display: grid;
    grid-template-columns: 25vw 75vw;
    grid-template-rows: 92vh;
    position: absolute;
    overflow: hidden;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    padding: 0;
  }

  h1 {
    font-weight: bold;
    font-size: 3em;
    align-self: end;
  }

  h2 {
    font-size: 1.5em;
    background-color: #9fd2ea;
    padding-left: 3%;
  }

  h3 {
    grid-column: 2;
    font-size: 1.2em;
    align-self: center;
    color: #555;
  }

  h6 {
    font-size: 1.2em;
    align-self: center;
    color: #555;
  }

  button {
    color: white;
    border: none;
    font-size: 1.3em;
    background: linear-gradient(#2b5896, #14325C);
  }
  ::-webkit-scrollbar {
      width: 5px;
      height:5px;
  }

  ::-webkit-scrollbar-track {
      box-shadow: inset 0 0 5px transparent;
      border-radius: 15px;
      border: none;
  }

  ::-webkit-scrollbar-thumb {
      background: #888;
      border-radius: 15px;
  }

  ::-webkit-scrollbar-thumb:hover {
      background: #555;
  }

  button.back {
    grid-row: 11;
    grid-column: 3;
    width: 10vw;
    height: 5vh;
    align-self: end;
    justify-self: right;
    background: #9BCCEC;
  }

  .create .createCompany {
    grid-column: 2;
    grid-row: 11;
    width:10vw;
    height: 5vh;
    background: #9BCCEC;
  }

  .submitEdit {
    width:10vw;
    height: 5vh;
    background: #9BCCEC;
  }

  .createCompany:hover {
    background: #095bea;
  }

  button.back:hover {
    background: #095bea;
  }

  .submitEdit:hover {
    background: #095bea;
  }

//company Splash view
  .emptyCompanyView {
    display: grid;
    grid-template-columns: repeat(3, 25vw);
    grid-template-rows: 20vh 62vh 10vh;
  }

  .emptyCompanyView h1 {
    grid-row: 1;
    grid-column-start: 1;
    grid-column-end: 4;
    font-size: 2em;
    align-self: end;
    color: @blue-gray;
    text-align: center;
  }

  .splash {
    background-image: url("../assets/splash.svg");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    grid-column: 2;
    grid-row: 2;
  }

  .companyModals, .shiftModals, .departmentModals {
    grid-column: 2;
    grid-row: 1;
  }
//Side Panel
  .companiesBox {
    grid-column: 1;
    grid-row: 1;
    background-color: #eaeaea;
    display: grid;
    grid-template-columns: 2vw 21vw 2vw;
    grid-template-rows: 8vh 8vh 5vh 65vh 5vh;
    box-shadow: 0px 2px 5px black;
  }

  .createNewButton {
    grid-row: 2;
    grid-column: 2;
  }

  .companyList {
    grid-row: 4;
    grid-column: 2;
    background-color: white;
    border: 1px solid grey;
    border-radius: 5px;
    overflow-y: scroll;
  }

  .company {
    width: 19vw;
    margin: 1vw 0 0 1vw;
    display: grid;
    grid-template-columns: 19vw;
    grid-template-rows: 6vh 3vh;
  }

  .company h2 {
    grid-column: 1;
    grid-row: 1;
    height: 6vh;
    line-height: 6vh;
    font-size: 1.5em;
    border-radius: 5px;
  }

  .company h3 {
    font-size: .9em;
    grid-column: 1;
    grid-row: 2;
    justify-self: right;
  }
// create Company Screen
  .create {
    display: grid;
    grid-template-columns: 2.5vw 30vw 30vw 2.5vw ;
    grid-template-rows: 12vh repeat(4, 5vh 5vh) 4vh 5vh;
  }

  .create h1, .create h3, .create span, .create input, .create button.createCompany {
    grid-column: 2;
  }

  .create h3 {
    align-self: end;
    line-height: 3vh
  }

  .create input {
    border: 1px black solid;
    padding: 0 1vw;
    font-size: 1.5em;
    color: #323535;
  }

  .create .newName {
    grid-row: 2;
  }

  .create .Name {
    grid-row: 3;
  }

  .create .newId {
    grid-row: 4;
  }

  .create .ID {
    grid-row: 5;
  }

  .create .newRole {
    grid-row: 6;
  }

  .create .Role {
    grid-row: 7;
  }

  .create span {
    grid-row: 9;
    align-self: center;
    font-size: 1.3em;
  }

  .create .check {
    grid-row: 9;
    height: 3vh;
  }

  .buttonBar {
    grid-column: 2;
    grid-row: 11;
  }
//Company Shift View
  .viewOne {
    display: grid;
    grid-template-columns: 2.5vw 35vw 35vw 2.5vw ;
    grid-template-rows: 12vh 5vh 3vh 5vh 50vh 4vh 8vh;
  }

  .createNewLocation {
    grid-column: 2;
    grid-row: 7;
    width: 33vw;
    justify-self: center;
  }

  .editButton {
    grid-column: 3;
    grid-row: 7;
    width: 33vw;
    justify-self: center;
  }

  .departmentsBox {
    grid-column: 2;
    grid-row: 9;
    border: 1px solid grey;
  }

  .role, .notify {
    grid-column: 2;
    align-self: center;
    align-self: end;
  }

  .companyName {
    grid-row: 1;
    grid-column-start: 2;
    grid-column-end: 4;
    align-self: end;
    border-bottom: 1px solid grey;
  }

  .companyNameH {
    font-weight: bold;
    font-size: 3em;
  }

  .companyIdH {
    font-style: italic;
  }

  .notify {
    padding-left: 1vw;
    grid-row: 2;
  }

  .role {
    grid-row: 2;
    justify-self: center;
  }
  .locationH {
    grid-row: 4;
    grid-column: 2;
    padding-left: 1vw;
  }

  .viewOne .shiftsH {
    grid-row: 4;
    grid-column: 2;
    padding-left: 1vw;
  }

  .viewOne .logsH {
    grid-row: 4;
    grid-column: 3;
    padding-left: 1vw;
  }

  .locationsBox {
    grid-column: 2;
    grid-row: 5;
    border: 1px solid grey;
    width: 33vw;
    justify-self: center;
    box-shadow: 2px 2px 3px grey;
    overflow-y: scroll;
    background-color: @lightGray
  }

  .locationsBox h2 {
    width: 31vw;
    margin: 1vw 1vw 0 1vw;
    padding: 1vh 1vw;
    border-radius: 5px;
  }

  .logs {
    grid-column: 3;
    grid-row: 5;
    border: 1px solid grey;
    width: 33vw;
    box-shadow: 2px 2px 3px grey;
    justify-self: center;
    background-color: @lightGray
  }
//createLocation View
  .createLocation {
    display: grid;
    grid-template-columns: 2.5vw 35vw 35vw 2.5vw ;
    grid-template-rows: 12vh repeat(2, 5vh 8vh) 39vh 4vh 8vh;
  }

  .createLocation h1, .createLocation h3, .createLocation input, .createLocation button.createLocation, .defaultLocation {
    grid-column: 2;
  }

  .createNewLocationH {
    font-weight: bold;
    font-size: 3em;
    align-self: end;
  }

  .createLocation h3 {
    line-height: 3vh;
    font-size: .9em;
    align-self: end;
  }

  .createLocation input {
    border: 1px solid black;
    padding: 0 1vw;
    font-size: 1.3em;
  }

  button.createLocation {
    grid-row: 8;
    background: linear-gradient(#39b267, #13724b);
  }
//createShift View
  .createShift {
    display: grid;
    grid-template-columns: 2.5vw 35vw 35vw 2.5vw ;
    grid-template-rows: 12vh repeat(2, 5vh 8vh) 39vh 4vh 8vh;
  }

  .createShift h1, .createShift h3, .createShift input, .createShift button.createShift, .defaultShift {
    grid-column: 2;
  }

  .createNewShiftH {
    font-weight: bold;
    font-size: 3em;
    align-self: end;
  }

  .createShift h3 {
    line-height: 3vh;
    font-size: .9em;
    align-self: end;
  }

  .createShift input {
    border: 1px solid black;
    padding: 0 1vw;
    font-size: 1.3em;
  }

  .createShift .defaultShift {
    grid-column-start: 2;
    grid-column-end: 4;
    grid-row: 6;
    display: grid;
    grid-template-columns: 17vw 1vw 17vw;
    grid-template-rows: repeat(3, 4vh 6vh);
  }

  .createShift .editDefaultNameH {
    grid-row: 1;
    grid-column: 1;
  }

  .createShift .editDateStartH, .createShift .editDateStart, .createShift .editTimeStartH, .createShift .editTimeStart {
    grid-column: 1;
  }

  .createShift .editDateEndH, .createShift .editDateEnd, .createShift .editTimeEndH, .createShift .editTimeEnd {
    grid-column: 3;
  }

  .createShift .editDateStartH, .createShift .editDateEndH {
    grid-row: 3;
  }

  .createShift .editDateStart, .createShift .editDateEnd {
    grid-row: 4;
  }

  .createShift .editTimeStartH, .createShift .editTimeEndH {
    grid-row: 5;
  }

  .createShift .shiftStartDateH, .createShift .shiftStartDate, .createShift .shiftStartTimeH, .createShift .shiftStartTime {
    grid-column: 1;
  }

  .createShift .shiftEndDateH, .createShift .shiftEndDate, .createShift .shiftEndTime, .createShift .shiftEndTimeH {
    grid-column: 3;
  }

  .defaultShift .shiftNameDefaultH, .defaultShift .shiftNameDefault {
    grid-column-start: 1;
    grid-column-end: 4;
  }

  .defaultShift .shiftEndDateH {
    grid-row: 3;
  }

  .defaultShift .shiftEndDate {
    grid-row: 4;
  }

  .defaultShift .shiftEndTimeH {
    grid-row: 5;
  }

  .defaultShift .shiftEndTime {
    grid-row: 6;
  }

  button.createShift {
    grid-row: 8;
    background: linear-gradient(#39b267, #13724b);
  }
  //edit Company Screen
  .editOne {
    display: grid;
    grid-template-columns: 2.5vw 35vw 35vw 2.5vw ;
    grid-template-rows: 12vh repeat(5, 5vh 5vh) 4vh 5vh;
  }

  .editOne h1, .editOne h3, .editOne .not, .editOne input, .editOne button.submitEdit, .editOne button.deleteCompany {
    grid-column: 2;
  }

  .editOne input {
    border: 1px black solid;
    padding: 0 1vw;
    font-size: 1.5em
  }

  .editOne h3 {
    line-height: 3vh;
    align-self: end;
  }

  .editOne .editNameH {
    grid-row: 2;
  }

  .editOne .editName {
    grid-row: 3;
  }

  .editOne .editIdH {
    grid-row: 4;
  }

  .editOne .editId {
    grid-row: 5;
  }

  .editOne .editRoleH {
    grid-row: 6
  }

  .editOne .editRole {
    grid-row: 7
  }

  .not {
    grid-row: 9;
    align-self: center;
    font-size: 1.3em;
  }

  .notcheck {
    grid-row: 9;
    margin-left: 5vw;
    align-self: center;
    height: 3vh;
    width: 2vw;
  }

  .check {
    grid-row: 9;
    margin-left: 5vw;
    align-self: center;
    height: 3vh;
    width: 2vw;
  }
// location View Screen
  .locationView {
    display: grid;
    grid-template-columns: 2.5vw 35vw 35vw 2.5vw ;
    grid-template-rows: 12vh 1vh 6vh 45vh 4vh 8vh 4vh 8vh;
  }

  .locationView .locationCompanyId, .locationView .locationRole, .locationView .defaultLocation {
    grid-column: 2;
  }

  .locationView .locationName {
    grid-column-start: 2;
    grid-column-end: 4;
    grid-row: 1;
    align-self: end;
    border-bottom: 1px black solid;
  }

  .locationNameH {
    font-size: 3em;
    font-weight: bold;
  }

  .locationView h3 {
    line-height: 6vh;
    padding-left: 1vw;
  }

  .locationView .defaultLocation {
    grid-row: 5;
    display: grid;
    grid-template-columns: repeat(2, 16.5vw);
    grid-template-rows: 5vh 5vh 5vh;
    justify-self: center;
    align-self: center;
    background-color: @lightGray;
    padding: 1vw 0;
    border: 1px grey solid;
    box-shadow: 2px 2px 3px grey;
  }

  .defaultLocation .locationDefaultName {
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row: 1;
    line-height: 5vh;
    font-size: 1.3em;
    padding-left: 1vw;
  }

  .defaultLocation h4 {
    grid-row: 2;
    font-size: 1.5em;
    text-decoration: underline;
    justify-self: center;
    line-height: 5vh;
  }

  .defaultLocation .locationDate, .defaultLocation .locationTime {
    grid-row: 3;
    line-height: 5vh;
    font-size: 1.3em;
    justify-self: center;
  }

  .defaultLocation .locationdate {
    grid-column: 1;
  }

  .defaultLocation .locationTime {
    grid-column: 2;
  }

  .locationView .shiftsH {
    text-align: center;
    grid-column: 2;
    grid-row: 3;
  }

  .locationView .logsH {
    grid-column: 3;
    grid-row: 3;
    text-align: center;
  }

  .shiftsBox {
    grid-column: 2;
    grid-row: 4;
    border: 1px solid grey;
    width: 33vw;
    justify-self: center;
    box-shadow: 2px 2px 3px grey;
    overflow-y: scroll;
    background-color: @lightGray
  }

  .shiftsBox h2 {
    width: 31vw;
    margin: 1vw 1vw 0 1vw;
    padding: 1vh 1vw;
    border-radius: 5px;
  }

  .locationView .departmentsBox {
    grid-column: 3;
    grid-row: 4;
    width: 33vw;
    justify-self: center;
    background-color: @lightGray;
    border: 1px solid grey;
    box-shadow: 2px 2px 3px grey;
    overflow-y: scroll;
  }

  .departmentsBox h2 {
    width: 31vw;
    margin: 1vw 0 0 1vw;
    padding: 1vh 1vw;
    border-radius: 5px;
  }

  .locationView, .createNewShift {
    grid-column: 2;
    grid-row: 6;
    width: 33vw;
    justify-self: center;
  }

  .locationView .createNewDepartment {
    grid-column: 3;
    grid-row: 6;
    width: 33vw;
    justify-self: center;
  }

  .locationView .editButtonLocation {
    grid-column-start: 2;
    grid-column-end: 4;
    grid-row: 8;
    width: 33vw;
    justify-self: center;
  }

//location edit view
  .locationEdit {
    display: grid;
    grid-template-columns: 2.5vw 35vw 35vw 2.5vw ;
    grid-template-rows: 12vh repeat(2, 5vh 8vh) 39vh 4vh 8vh;
  }

  .locationEdit h1, .locationEdit h3, .locationEdit input, .locationEdit .defaultLocation, .locationEdit .submitEdit, .locationEdit .deleteLocation {
    grid-column: 2;
  }

  .locationEdit .defaultLocation {
    grid-column-start: 2;
    grid-column-end: 4;
    grid-row: 6;
    display: grid;
    grid-template-columns: 17vw 1vw 17vw;
    grid-template-rows: repeat(3, 5vh 8vh);
  }

  .locationEdit input {
    line-height: 8vh;
    font-size: 1.5em;
    height: 100%;
    padding: 0 1vw
  }

  .locationEdit h3 {
    line-height: 3vh;
    align-self: end;
  }

  .locationEdit .editDefaultName {
    grid-column-start: 1;
    grid-column-end: 4;
    grid-row: 2;
  }

  .locationEdit .editDefaultNameH {
    grid-row: 1;
    grid-column: 1;
  }

  .locationEdit .editDateStartH, .locationEdit .editDateStart, .locationEdit .editTimeStartH, .locationEdit .editTimeStart {
    grid-column: 1;
  }

  .locationEdit .editDateEndH, .locationEdit .editDateEnd, .locationEdit .editTimeEndH, .locationEdit .editTimeEnd {
    grid-column: 3;
  }

  .locationEdit .editDateStartH, .locationEdit .editDateEndH {
    grid-row: 3;
  }

  .locationEdit .editDateStart, .locationEdit .editDateEnd {
    grid-row: 4;
  }

  .locationEdit .editTimeStartH, .locationEdit .editTimeEndH {
    grid-row: 5;
  }

  .locationEdit .deleteLocation, .locationEdit .submitEdit {
    grid-row: 8;
    width: 33vw;
    justify-self: center;
  }

  .locationEdit .deleteLocation {
    grid-column: 3;
    background: linear-gradient(#c22227, #770303);
  }

// shift View Screen
  .shiftView {
    display: grid;
    grid-template-columns: 2.5vw 35vw 35vw 2.5vw ;
    grid-template-rows: 12vh repeat(2, 4vh) 6vh 19vh 6vh 12vh 4vh 8vh 4vh 8vh;
  }

  .shiftView .shiftCompanyId, .shiftView .shiftRole, .shiftView .defaultShift {
    grid-column: 2;
  }

  .shiftView .shiftName {
    grid-column-start: 2;
    grid-column-end: 4;
    grid-row: 1;
    align-self: end;
    border-bottom: 1px black solid;
  }

  .shiftView .shiftCompanyId, .shiftView .shiftRole {
    line-height: 4vh;
  }

  .shiftView h3 {
    line-height: 6vh;
    padding-left: 1vw;
  }

  .shiftView .defaultShift {
    grid-row: 5;
    display: grid;
    grid-template-columns: repeat(2, 16.5vw);
    grid-template-rows: 5vh 5vh 5vh;
    justify-self: center;
    align-self: center;
    background-color: @lightGray;
    padding: 1vw 0;
    border: 1px grey solid;
    box-shadow: 2px 2px 3px grey;
  }

  .defaultShift .shiftDefaultName {
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row: 1;
    line-height: 5vh;
    font-size: 1.3em;
    padding-left: 1vw;
  }

  .defaultShift h4 {
    grid-row: 2;
    font-size: 1.5em;
    text-decoration: underline;
    justify-self: center;
    line-height: 5vh;
  }

  .defaultShift .shiftDate, .defaultShift .shiftTime {
    grid-row: 3;
    line-height: 5vh;
    font-size: 1.1em;
    justify-self: center;
  }

  .defaultShift .shiftdate {
    grid-column: 1;
  }

  .defaultShift .shiftTime {
    grid-column: 2;
  }

  .shiftView .logsH {
    grid-column: 3;
    grid-row: 4;
  }

  .shiftView .shiftlogs {
    grid-column: 3;
    grid-row-start: 5;
    grid-row-end: 8;
    background-color: @lightGray;
    border: 1px solid grey;
    box-shadow: 2px 2px 3px grey;
    width: 33vw;
    justify-self: center;
    overflow-y: scroll;
  }

  .shiftView .departmentsBox {
    grid-column: 2;
    grid-row-start: 7;
    grid-row-end: 13;
    width: 33vw;
    justify-self: center;
    background-color: @lightGray;
    border: 1px solid grey;
    box-shadow: 2px 2px 3px grey;
    overflow-y: scroll;
  }

  .departmentsBox h2 {
    width: 31vw;
    margin: 1vw 0 0 1vw;
    padding: 1vh 1vw;
    border-radius: 5px;
  }

  .shiftView .createNewDepartment {
    grid-column: 3;
    grid-row: 9;
    width: 33vw;
    justify-self: center;
  }

  .shiftView .editButtonShift {
    grid-column: 3;
    grid-row: 11;
    width: 33vw;
    justify-self: center;
  }

//shift edit view
  .shiftEdit {
    display: grid;
    grid-template-columns: 2.5vw 35vw 35vw 2.5vw ;
    grid-template-rows: 12vh repeat(2, 5vh 8vh) 39vh 4vh 8vh;
  }

  .shiftEdit h1, .shiftEdit h3, .shiftEdit input, .shiftEdit .defaultShift, .shiftEdit .submitEdit, .shiftEdit .deleteShift {
    grid-column: 2;
  }

  .shiftEdit .defaultShift {
    grid-column-start: 2;
    grid-column-end: 4;
    grid-row: 6;
    display: grid;
    grid-template-columns: 17vw 1vw 17vw;
    grid-template-rows: repeat(3, 4vh 6vh);
  }

  .shiftEdit input {
    line-height: 8vh;
    font-size: 1.5em;
    height: 100%;
    padding: 0 1vw
  }

  .shiftEdit h3 {
    line-height: 3vh;
    align-self: end;
  }

  .shiftEdit .editDefaultName {
    grid-column-start: 1;
    grid-column-end: 4;
    grid-row: 2;
  }

  .shiftEdit .editDefaultNameH {
    grid-row: 1;
    grid-column: 1;
  }

  .shiftEdit .editDateStartH, .shiftEdit .editDateStart, .shiftEdit .editTimeStartH, .shiftEdit .editTimeStart {
    grid-column: 1;
  }

  .shiftEdit .editDateEndH, .shiftEdit .editDateEnd, .shiftEdit .editTimeEndH, .shiftEdit .editTimeEnd {
    grid-column: 3;
  }

  .shiftEdit .editDateStartH, .shiftEdit .editDateEndH {
    grid-row: 3;
  }

  .shiftEdit .editDateStart, .shiftEdit .editDateEnd {
    grid-row: 4;
  }

  .shiftEdit .editTimeStartH, .shiftEdit .editTimeEndH {
    grid-row: 5;
  }

  .shiftEdit .deleteShift, .shiftEdit .submitEdit {
    grid-row: 8;
    width: 33vw;
    justify-self: center;
  }

  .shiftEdit .deleteShift {
    grid-column: 3;
    background: linear-gradient(#c22227, #770303);
  }

// Department View Screen
  .departmentView {
    display: grid;
    grid-template-columns: 2.5vw 35vw 35vw 2.5vw ;
    grid-template-rows: 12vh repeat(2, 4vh) 6vh 39vh 4vh 8vh;
  }

  .departmentView .departmentName, .departmentView .departmentRole, .departmentView  .companyId, .departmentView h3, .departmentView .deplogs, .departmentView .editButtonDepartment {
    grid-column: 2;
  }

  .departmentView .departmentName {
    grid-row: 1;
    align-self: end;
  }

  .departmentView .companyId, .departmentView .departmentRole {
    margin-left: 1vw;
    line-height: 4vh;
  }

  .createNewDepartment {
    grid-row: 7;
    grid-column: 2;
  }

  .editButtonDepartment {
    grid-row: 7;
    grid-column: 2;
    width: 33vw;
    justify-self: center;
  }

  .departmentView h3 {
    grid-row: 4;
    margin-left: 1vw;
  }

  .deplogs {
    grid-row: 5;
    grid-column: 2;
    border: 1px solid grey;
    width: 33vw;
    justify-self: center;
    background-color: @lightGray;
    border: 1px solid grey;
    box-shadow: 2px 2px 3px grey;
  }
// department Edit Screen
  .departmentEdit {
    display: grid;
    grid-template-columns: 2.5vw 35vw 35vw 2.5vw ;
    grid-template-rows: 12vh repeat(4, 4vh 8vh);
  }

  .departmentEdit h3, .departmentEdit h1, .departmentEdit input, .deleteDepartment, .departmentEdit .submitEdit {
    grid-column: 2;
  }

  .departmentEdit input {
    border: 1px solid black;
    padding-left: 1vw;
    font-size: 1.3em;
  }

  .deleteDepartment {
    grid-row: 7;
    background: linear-gradient(#c22227, #770303);
  }

  .departmentEdit .submitEdit {
    grid-row: 9;
  }
  //createDepartment Screen;
  .createDepartment {
    display: grid;
    grid-template-columns: 2.5vw 35vw 35vw 2.5vw ;
    grid-template-rows: 12vh repeat(4, 5vh 8vh);
  }

  .createDepartment h1, .createDepartment h3, .createDepartment input, .createDepartment button.createDepartment {
    grid-column: 2;
  }

  .createDepartment h3 {
    line-height: 3vh;
    align-self: end;
  }

  .createDepartment .departmentNameNew {
    grid-row: 3;
  }

  .createDepartment .departmentRoleNew {
    grid-row: 5;
  }

  .createDepartment .DepartmentLocationNew {
    grid-row: 7;
  }

  button.createDepartment {
    grid-row: 9;
    background: linear-gradient(#39b267, #13724b);
  }
  //assurance Screens
  .areYouSure  {
    display: grid;
    grid-template-columns: 2.5vw 70vw 2.5vw ;
    grid-template-rows: 20vh 12vh 8vh 4vh 10vh 4vh 10vh;
  }

  .areYouSure h1, .areYouSure h4, .areYouSure button {
    grid-column: 2;
    justify-self: center;
    align-self: center;
  }

  .areYouSure h1 {
    grid-row: 2;
  }

  .areYouSure h4 {
    grid-row: 3;
    font-size: 1.5em;
  }

  .areYouSure button.yesSure {
    grid-row: 5;
    background-color: white;
  }

  .areYouSure .noSure {
    grid-row: 7;
  }

  .areYouSure button {
    width: 35vw;
    height: 10vh;
  }
</style>
