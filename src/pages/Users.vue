<template>
  <div class="main">
    <div class="viewAllUsers">
      <button class="updateUsers" v-on:click="updateUser()">Update User</button>
      <h5 class="companyHeader">Company Directory</h5>
      <div class="companyList">
        <div class="company" v-for="company in companies" v-bind:key="company._id">
          <div class="companyName" v-on:click="shiftCompany(company); company.expand=!company.expand; populateCompanyUsers()" v-bind:class="{'highlightCompany': company.companyId === pane.company}">{{company.companyName}}</div>
          <h6 v-if="company.expand">Locations</h6>
          <div class="locationColumn" v-if="company.expand" v-for="location in company.locations" v-bind:key="location._id">
            <div class="locationColumnName" v-on:click="locationSchedule(location); location.expand=!location.expand; populateLocationUsers()" v-bind:class="{'highlight': location._id === pane.location}">{{location.name}}</div>
            <div class="shiftsBox"  v-if="location.expand">
              <h6>Shifts</h6>
              <div class="shiftColumn" v-for="shift in location.shifts" v-bind:key="shift._id">
                <div class="shiftColumnName" v-on:click="shiftSchedule(shift, location); populateShiftUsers()" v-bind:class="{'highlight': shift.shiftId === pane.shift}">{{shift.name}}</div>
              </div>
            </div>
            <div class="departmentsBox" v-if="location.expand">
              <h6>Departments</h6>
              <div class="department" v-on:click="departmentSchedule(department, location); populateDepartmentUsers()" v-for="department in location.departments" v-bind:key="department._id">
                <div class="departmentName" v-bind:class="{'highlight': department.departmentId === pane.department}">{{department.name}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h1>Users</h1>
    </div>
    <div class="areYouSure" v-if="deleteModal">
      <h3>Are you Sure?</h3>
      <h4>(This is permanent and irreversable!)</h4>
      <button class="yesSure" v-on:click="deleteUsers()">Yes</button>
      <button class="noSure" v-on:click="modal='edit'">No</button>
    </div>
    <div class="selectCompany" v-if="modal==='select'">
      <h3>Please select a company from the directory</h3>
      <button v-on:click="modal=''">Back</button>
    </div>
    <div class="importModal" v-else-if="modal==='import'">
      <h1>Import</h1>
      <div class="importModalComp">
        <span>Must be CSV file*</span>
        <input type="file" class="fileInput" @change="onFileChange" />
      </div>
      <button class="importButton" v-on:click="importCsv()">Import Leads</button>
      <button class="back" v-on:click="modal=''">Back</button>
    </div>
    <div class="spreadSheetVar" v-else>
      <div class="massUpdate">
        <h1>Users Panel</h1>

        <button class="createNewButton" v-on:click="createNew()">Create New User</button>
        <button class="selectAll" v-on:click="selectAll()">Select All</button>
        <select class="select" v-model="updateField">
          <option value="location">Location</option>
          <option value="shift">Shift</option>
          <option value="department">Department</option>
          <option value="email">Email</option>
          <option value="password">Password</option>
          <option value="title">Title</option>
          <option value="firstName">FirstName</option>
          <option value="lastName">LastName</option>
          <option value="address">Address</option>
          <option value="phone">Phone</option>
          <option value="role">Role</option>
          <option value="departmentAdmin">DepartmentAdmin</option>
          <option value="admin">Admin</option>
          <option value="systemAdmin">SystemAdmin</option>
        </select>
        <select class="locationUpdate" v-model="fieldInput" v-if="updateField==='location'">
          <option v-for="location in locations" v-bind:key="location._id" v-bind:value="location">{{location.name}}</option>
        </select>
        <select class="shiftUpdate" v-model="fieldInput" v-if="updateField==='shift'">
          <option v-for="shift in shifts" v-bind:key="shift._id" v-bind:value="shift">{{shift.name}}</option>
        </select>
        <select class="departmentUpdate" v-model="fieldInput" v-if="updateField==='department'">
          <option v-for="department in departments" v-bind:key="department._id" v-bind:value="department">{{department.name}}</option>
        </select>
        <select class="roleUpdate" v-model="fieldInput" v-if="updateField==='role'">
          <option v-for="role in roles" v-bind:key="role._id" v-bind:value="role">{{role.name}}</option>
        </select>
        <input class="update" v-model="fieldInput" placeholder="Input Change" v-if="updateField==='' || updateField==='email' || updateField==='password' || updateField==='title' || updateField==='firstName' || updateField==='lastName' || updateField==='address' || updateField==='phone'"/>
        <input class="departmentAdminUpdate" v-model="fieldInput" type="checkbox" v-if="updateField==='departmentAdmin'"/>
        <input class="adminUpdate" v-model="fieldInput" type="checkbox" v-if="updateField==='admin'"/>
        <input class="systemAdminUpdate" v-model="fieldInput" type="checkbox" v-if="updateField==='systemAdmin'"/>
        <button class="submit" v-on:click="updateFields()">Submit</button>
      </div>
      <div class="LetItBe">
        <h2 class="varCompany">Company</h2>
        <h2 class="varLocation">Location</h2>
        <h2 class="varShift">Shift</h2>
        <h2 class="varDepartment">Department</h2>
        <h2 class="varEmail">Email</h2>
        <h2 class="varPassword">Password</h2>
        <h2 class="varTitle">Title</h2>
        <h2 class="varFirstName">FirstName</h2>
        <h2 class="varLastName">LastName</h2>
        <h2 class="varAddress">Address</h2>
        <h2 class="varPhone">Phone</h2>
        <h2 class="varRole">Role</h2>
        <h2 class="varDepartmentAdmin">Dept. Admin</h2>
        <h2 class="varAdmin">Admin</h2>
        <h2 class="varSystemAdmin">Sys. Admin</h2>
        <div class="UserInfo">
        <div class="userModal" v-on:click="select(user, $event)" v-for="user in users" v-bind:key="user._id">
            <div class="userSelected" v-if="user.selected">&#x2714;</div>
            <div class="userCompany" v-on:click="user.companyName=''" v-if="user.companyName!==''">{{user.companyName}}</div>
            <div class="companyChange" v-else>
              <div class="companyList" v-on:click="user.companyName=company.companyName; user.company=company._id" v-for="company in companies" v-bind:key="company._id">{{company.companyName}}</div>
            </div>
            <div class="userLocation" v-on:click="user.locationName=''" v-if="user.locationName!==''">{{user.locationName}}</div>
            <div class="locationChange" v-else>
              <div class="locationList" v-on:click="user.locationName=location.name; user.location=location._id" v-for="location in locations" v-bind:key="location._id">{{location.name}}</div>
            </div>
            <div class="userShift" v-on:click="user.shiftName=''" v-if="user.shiftName!==''">{{user.shiftName}}</div>
            <div class="shiftChange" v-else>
              <div class="shiftList" v-on:click="user.shiftName=shift.name; user.shift=shift._id" v-for="shift in shifts" v-bind:key="shift._id">{{shift.name}}</div>
            </div>
            <div class="userDepartment" v-on:click="user.departmentName=''" v-if="user.departmentName!==''">{{user.departmentName}}</div>
            <div class="departmentChange" v-else>
              <div class="departmentList" v-on:click="user.departmentName=department.name; user.department=department._id" v-for="department in departments" v-bind:key="department._id">{{department.name}}</div>
            </div>
            <div class="userRole" v-on:click="user.roleName=''" v-if="user.roleName!==''">{{user.roleName}}</div>
            <div class="roleChange" v-else>
              <div class="roleList" v-on:click="user.roleName=role.name; user.role=role._id" v-for="role in roles" v-bind:key="role._id">{{role.name}}</div>
            </div>
            <input class="userEmail" v-model="user.email"/>
            <button class="userPassword">Reset</button>
            <input class="userTitle" v-model="user.title"/>
            <input class="userFirstName" v-model="user.firstName"/>
            <input class="userLastName" v-model="user.lastName"/>
            <input class="userAddress" v-model="user.address"/>
            <input class="userPhone" v-model="user.phone"/>
            <input class="userDepartmentAdmin" v-model="user.departmentAdmin" type="checkbox"/>
            <input class="userAdmin" v-model="user.admin" type="checkbox"/>
            <input class="userSystemAdmin" v-model="user.systemAdmin" type="checkbox"/>
          </div>
        </div>
      </div>

      <div class="buttonPanel">
        <button class="importCsv" v-on:click="modal='import'">Import Csv</button>
        <button class="exportCsv" v-on:click="exportUsers()">Export Csv</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import download from 'downloadjs'
export default {
  name: 'users',
  props: ['user', 'logged'],
  created () {
    let vue = this
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Delete') {
        event.preventDefault()
        vue.deleteModal = true
      }
    })
    vue.populateCompanies()
  },
  data: function () {
    return {
      users: [],
      locations: [],
      shifts: [],
      departments: [],
      userSearch: '',
      searchPane: [],
      companies: [],
      roles: [],
      clicked: '',
      modal: '',
      pane: {
        location: '',
        company: '',
        shift: '',
        department: '',
        departmentName: ''
      },
      file: '',
      fileinput: '',
      fieldInput: '',
      updateField: '',
      searchUser: [],
      deleteModal: false,
      massUpdate: false
    }
  },
  methods: {
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
    populateLocations () {
      let vue = this
      axios.get('https://api.shiftnotification.com/locations/all/' + vue.user.id + '/' + vue.pane.company, {headers: { 'Authorization': 'JWT ' + vue.user.token }})
        .then(response => {
          vue.locations = response.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    populateShifts () {
      let vue = this
      axios.get('https://api.shiftnotification.com/shifts/all/' + vue.user.id + '/' + vue.pane.company, {headers: { 'Authorization': 'JWT ' + vue.user.token }})
        .then(response => {
          vue.shifts = response.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    populateDepartments () {
      let vue = this
      axios.get('https://api.shiftnotification.com/departments/all/' + vue.user.id + '/' + vue.pane.company, {headers: { 'Authorization': 'JWT ' + vue.user.token }})
        .then(response => {
          vue.departments = response.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    populateRoles () {
      let vue = this
      axios.get('https://api.shiftnotification.com/roles/all/' + vue.user.id + '/' + vue.pane.company, {headers: { 'Authorization': 'JWT ' + vue.user.token }})
        .then(response => {
          vue.roles = response.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    updateFields () {
      let vue = this
      let i = 0
      for (i = 0; i < vue.users.length; i++) {
        if (vue.users[i].selected === true && vue.updateField === 'location') {
          vue.users[i].location = vue.fieldInput._id
          vue.users[i].locationName = vue.fieldInput.name
        } else if (vue.users[i].selected === true && vue.updateField === 'shift') {
          vue.users[i].shift = vue.fieldInput._id
          vue.users[i].shiftName = vue.fieldInput.name
        } else if (vue.users[i].selected === true && vue.updateField === 'department') {
          vue.users[i].department = vue.fieldInput._id
          vue.users[i].departmentName = vue.fieldInput.name
        } else if (vue.users[i].selected === true && vue.updateField === 'email') {
          vue.users[i].email = vue.fieldInput
        } else if (vue.users[i].selected === true && vue.updateField === 'password') {
          vue.users[i].password = vue.fieldInput
        } else if (vue.users[i].selected === true && vue.updateField === 'title') {
          vue.users[i].title = vue.fieldInput
        } else if (vue.users[i].selected === true && vue.updateField === 'firstName') {
          vue.users[i].firstName = vue.fieldInput
        } else if (vue.users[i].selected === true && vue.updateField === 'lastName') {
          vue.users[i].lastName = vue.fieldInput
        } else if (vue.users[i].selected === true && vue.updateField === 'address') {
          vue.users[i].address = vue.fieldInput
        } else if (vue.users[i].selected === true && vue.updateField === 'phone') {
          vue.users[i].phone = vue.fieldInput
        } else if (vue.users[i].selected === true && vue.updateField === 'role') {
          vue.users[i].role = vue.fieldInput
        } else if (vue.users[i].selected === true && vue.updateField === 'departmentAdmin') {
          vue.users[i].departmentAdmin = vue.fieldInput
        } else if (vue.users[i].selected === true && vue.updateField === 'admin') {
          vue.users[i].admin = vue.fieldInput
        } else if (vue.users[i].selected === true && vue.updateField === 'systemAdmin') {
          vue.users[i].systemAdmin = vue.fieldInput
        }
      }
    },
    refresh () {
      let vue = this
      vue.users = ''
      if (vue.pane.company !== '' && vue.pane.location === '' && vue.pane.shift === '' && vue.pane.department === '') {
        vue.populateCompanyUsers()
      } else if (vue.pane.company !== '' && vue.pane.location !== '' && vue.pane.shift === '' && vue.pane.department === '') {
        vue.populateLocationUsers()
      } else if (vue.pane.company !== '' && vue.pane.location !== '' && vue.pane.shift !== '' && vue.pane.department === '') {
        vue.populateShiftUsers()
      } else if (vue.pane.company !== '' && vue.pane.location !== '' && vue.pane.shift !== '' && vue.pane.department !== '') {
        vue.populateDepartmentUsers()
      }
    },
    selectAll () {
      let vue = this
      let i = 0
      for (i = 0; i < vue.users.length; i++) {
        vue.massUpdate = !vue.massupdate
        vue.users[i].selected = !vue.users[i].selected
      }
    },
    shiftCompany (company) {
      let vue = this
      vue.pane.company = company.companyId
      vue.pane.department = ''
      vue.pane.shift = ''
      vue.pane.location = ''
      vue.populateRoles()
      vue.populateLocations()
      vue.populateShifts()
      vue.populateDepartments()
    },
    locationSchedule (location) {
      let vue = this
      vue.pane.location = location._id
      vue.pane.department = ''
      vue.pane.shift = ''
      vue.populateRoles()
      vue.populateLocations()
      vue.populateShifts()
      vue.populateDepartments()
    },
    shiftSchedule (shift, location) {
      let vue = this
      vue.pane.location = location._id
      vue.pane.shift = shift.shiftId
      vue.pane.department = ''
      vue.populateRoles()
      vue.populateLocations()
      vue.populateShifts()
      vue.populateDepartments()
      vue.clicked = 'shift'
    },
    departmentSchedule (department, location) {
      let vue = this
      vue.pane.location = location._id
      vue.pane.department = department.departmentId
      vue.pane.departmentName = department.name
      vue.pane.shift = ''
      vue.populateRoles()
      vue.populateLocations()
      vue.populateShifts()
      vue.populateDepartments()
      vue.clicked = 'department'
    },
    select (user, event) {
      let vue = this
      if (event.ctrlKey) {
        let userNum = vue.users.indexOf(user)
        vue.users[userNum].selected = !vue.users[userNum].selected
      } else if (event.shiftKey) {
        var startIndex
        let i = 0
        for (i = 0; i < vue.users.length; i++) {
          if (vue.users[i].selected === true) {
            startIndex = i
          }
        }
        let endIndex = vue.users.indexOf(user)
        if (endIndex > startIndex) {
          let x = startIndex
          for (x = startIndex; x < (endIndex + 1); x++) {
            vue.users[x].selected = true
          }
        } else {
          let x = startIndex
          for (x = startIndex; x > (endIndex - 1); x--) {
            vue.users[x].selected = true
          }
        }
      } else {
        let i = 0
        for (i = 0; i < vue.users.length; i++) {
          vue.users[i].selected = false
        }
        let userNum = vue.users.indexOf(user)
        vue.users[userNum].selected = true
      }
    },
    updateUser () {
      let vue = this
      axios.put('https://api.shiftnotification.com/users/mass', {
        adminId: vue.user.id,
        users: vue.users
      }, {headers: { 'Authorization': 'JWT ' + vue.user.token }})
        .then(response => {
          vue.modal = 'view'
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteUsers () {
      let vue = this
      function loop (i) {
        i = i || 0
        if (i < vue.users.length) {
          if (vue.users[i].selected === true) {
            if (vue.users[i]._id !== '') {
              axios.delete('https://api.shiftnotification.com/users/' + vue.users[i]._id + '/' + vue.user.id, {headers: { 'Authorization': 'JWT ' + vue.user.token }})
                .then(response => {
                  i++
                  loop(i)
                })
                .catch(err => {
                  console.log(err)
                })
            } else {
              vue.users.splice(i, 1)
              i++
              loop(i)
            }
          } else {
            i++
            loop(i)
          }
        } else {
          vue.populateCompanyUsers()
          vue.deleteModal = false
          vue.modal = ''
        }
      }
      loop(0)
    },
    populateCompanyUsers () {
      let vue = this
      axios.get('https://api.shiftnotification.com/users/all/' + vue.pane.company + '/' + vue.user.id, {headers: { 'Authorization': 'JWT ' + vue.user.token }})
        .then(response => {
          vue.users = response.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    populateLocationUsers () {
      let vue = this
      axios.get('https://api.shiftnotification.com/users/all/' + vue.user.id + '/' + vue.pane.company + '/' + vue.pane.location, {headers: { 'Authorization': 'JWT ' + vue.user.token }})
        .then(response => {
          vue.users = response.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    populateShiftUsers () {
      let vue = this
      axios.get('https://api.shiftnotification.com/users/all/' + vue.user.id + '/' + vue.pane.company + '/' + vue.pane.location + '/' + vue.pane.shift, {headers: { 'Authorization': 'JWT ' + vue.user.token }})
        .then(response => {
          vue.users = response.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    populateDepartmentUsers () {
      let vue = this
      axios.get('https://api.shiftnotification.com/users/alldep/' + vue.user.id + '/' + vue.pane.company + '/' + vue.pane.location + '/' + vue.pane.department, {headers: { 'Authorization': 'JWT ' + vue.user.token }})
        .then(response => {
          vue.users = response.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    usersSearch () {
      let vue = this
      if (vue.userSearch !== '') {
        axios.get('https://api.shiftnotification.com/users/search/' + vue.user.id + '/' + vue.userSearch + '/' + vue.pane.company + '/' + vue.pane.shift + '/' + vue.pane.department, {headers: {'Authorization': 'JWT ' + vue.user.token}})
          .then(response => {
            let i = 0
            vue.users = []
            for (i = 0; i < response.data.length; i++) {
              let user = {
                email: response.data[i].email,
                password: response.data[i].password,
                title: response.data[i].title,
                firstName: response.data[i].firstName,
                lastName: response.data[i].lastName,
                address: response.data[i].address,
                phone: response.data[i].phone,
                role: response.data[i].role,
                shift: response.data[i].shift,
                department: response.data[i].department,
                location: response.data[i].location,
                departmentAdmin: response.data[i].departmentAdmin,
                admin: response.data[i].admin,
                systemAdmin: response.data[i].systemAdmin,
                endpointARN: response.data[i].endpointARN,
                selected: false
              }
              vue.users.push(user)
            }
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        axios.get('https://api.shiftnotification.com/users/department/' + vue.pane.department + '/' + vue.user.companyId + '/' + vue.user.id, {headers: { 'Authorization': 'JWT ' + vue.user.token }})
          .then(response => {
            let i = 0
            vue.users = []
            for (i = 0; i < response.data.length; i++) {
              let user = {
                email: response.data[i].email,
                password: response.data[i].password,
                title: response.data[i].title,
                firstName: response.data[i].firstName,
                lastName: response.data[i].lastName,
                address: response.data[i].address,
                phone: response.data[i].phone,
                role: response.data[i].role,
                shift: response.data[i].shift,
                department: response.data[i].department,
                location: response.data[i].location,
                departmentAdmin: response.data[i].departmentAdmin,
                admin: response.data[i].admin,
                systemAdmin: response.data[i].systemAdmin,
                endpointARN: response.data[i].endpointARN,
                selected: false
              }
              vue.users.push(user)
            }
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    createNew () {
      let vue = this
      if (vue.pane.company !== '') {
        let user = {
          email: '',
          password: '',
          title: '',
          firstName: '',
          lastName: '',
          address: '',
          phone: 0,
          role: '',
          roleName: '',
          location: vue.pane.location,
          locationName: '',
          shift: vue.pane.shift,
          shiftName: '',
          department: vue.pane.department,
          departmentName: '',
          companyId: vue.pane.company,
          companyName: '',
          departmentAdmin: false,
          admin: false,
          systemAdmin: false
        }
        vue.users.push(user)
      } else {
        vue.modal = 'selectCompany'
      }
    },
    exportCompanyUsers () {
      let vue = this
      axios.get('https://api.shiftnotification.com/users/export/' + vue.pane.company, {headers: { 'Authorization': 'JWT ' + vue.user.token }})
        .then(function (response) {
          download(response.data, 'company_csv.csv', 'text/csv')
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    exportLocationUsers () {
      let vue = this
      axios.get('https://api.shiftnotification.com/users/export/' + vue.pane.company + '/' + vue.pane.location, {headers: { 'Authorization': 'JWT ' + vue.user.token }})
        .then(function (response) {
          download(response.data, 'company_csv.csv', 'text/csv')
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    exportShiftUsers () {
      let vue = this
      axios.get('https://api.shiftnotification.com/users/export/' + vue.pane.company + '/' + vue.pane.location + '/' + vue.pane.shift, {headers: { 'Authorization': 'JWT ' + vue.user.token }})
        .then(function (response) {
          download(response.data, 'company_csv.csv', 'text/csv')
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    exportDepartmentUsers () {
      let vue = this
      axios.get('https://api.shiftnotification.com/users/export/' + vue.pane.company + '/' + vue.pane.location + '/' + vue.pane.shift + '/' + vue.pane.department, {headers: { 'Authorization': 'JWT ' + vue.user.token }})
        .then(function (response) {
          download(response.data, 'company_csv.csv', 'text/csv')
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    exportUsers () {
      let vue = this
      if (vue.pane.company !== '' && vue.pane.location === '' && vue.pane.shift === '' && vue.pane.department === '') {
        vue.exportCompanyUsers()
      } else if (vue.pane.company !== '' && vue.pane.location !== '' && vue.pane.shift === '' && vue.pane.department === '') {
        vue.exportLocationUsers()
      } else if (vue.pane.company !== '' && vue.pane.location !== '' && vue.pane.shift !== '' && vue.pane.department === '') {
        vue.exportShiftUsers()
      } else if (vue.pane.company !== '' && vue.pane.location !== '' && vue.pane.shift !== '' && vue.pane.department !== '') {
        vue.exportDepartmentUsers()
      }
    },
    onFileChange (file) {
      let vue = this
      vue.file = file.target.files || file.dataTransfer.files
    },
    importCsv () {
      let vue = this
      var reader = new FileReader()
      reader.onload = (file) => {
        vue.fileinput = reader.result
        axios.post('https://api.shiftnotification.com/users/import', {
          company: vue.user.companyId,
          file: vue.fileinput
        }, {headers: { 'Authorization': 'JWT ' + vue.user.token }})
          .then(response => {
            vue.populateCompanyUsers()
            vue.modal = ''
          })
          .catch(error => {
            console.log(error)
          })
      }
      reader.readAsText(vue.file[0])
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

.main {
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: 25vw 5vw 65vw 5vw;
  grid-template-rows: 8vh 92vh;
}

h1, h2, h3, h4, h5, h6 {
  margin: 0;
  padding: 0;
}

h1 {
  text-align: center;
  font-size: 3em;
  font-family: @font;
  color: @blue;
  grid-row: 1;
  grid-column: 2;
  align-self: center;
}
//create New User
.create {
  grid-column: 3;
  grid-row: 2;
  display: grid;
  grid-template-columns: 27.5vw 27.5vw;
  grid-template-rows: 12vh 2vh repeat(7, 8vh 2vh) 8vh;
}

.selectCompany {
  grid-column: 3;
  grid-row: 2;
}

.create input {
  padding-left: .5vw;
  width: 30vw;
  justify-self: center;
  border: 1px solid grey;
}

.create h1, .create input, .create button {
  grid-column: 1;
}

.create input.password, .create input.lastName, .create input.address {
  grid-column: 2;
}

.create h1 {
  text-align: left;
  padding: 1vw;
}

.location {
  grid-row: 3;
  width: 30vw;
  justify-self: center;
}

.create .shift, .create .department {
  grid-row: 5;
}

.shift {
  grid-column: 1;
  width: 30vw;
  justify-self: center;
}

.department {
  grid-column: 2;
  justify-self: center;
}

.create .email, .create .password {
  grid-row: 7;
}

.create .title, .create .firstName, .create .lastName {
  grid-row: 9;
}

.create .title {
  width: 4.5vw;
  justify-self: left;
  margin-left: 1.25vw
}

.create .firstName {
  width: 24.5vw;
  justify-self: right;
  margin-right: 1.25vw;
}

.create .phone, .create .address {
  grid-row: 11;
}

.create .role {
  grid-row: 3;
  width: 30vw;
  justify-self: center;
}

.create h3 {
  font-size: 1.2em;
}

.create .normAdH, .create .checkAdmin {
  grid-column: 1;
  grid-row: 13;
  align-self: center;
  margin-left: 1.25vw;
}

.create .depAdH, .create .checkDepAdmin {
  grid-column: 1;
  grid-row: 15;
  align-self: center;
  margin-left: 1.25vw;
}

.create .sysAdH, .create .checkSysAdmin {
  grid-column: 2;
  grid-row: 15;
  align-self: center;
  margin-left: 1.25vw;
}

.create button.back {
  grid-column: 2;
  grid-row: 1;
  width: 12vw;
  height: 8vh;
  justify-self: right;
  align-self: center;
}

.create button.createUser {
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 17;
  grid-row-end: 17;
  width: 30vw;
  justify-self: center;
  background: linear-gradient(#39b267, #13724b);
}

.spreadSheetVar {
  grid-column: 3;
  grid-row: 2;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 7vh 12vh 3vh 50vh 3vh 12vh;
}

.massUpdate {
  grid-column: 1;
  grid-row: 2;
  display: grid;
  grid-template-columns: 10vw 1vw 10vw 1vw 10vw 1vw 10vw 1vw 10vw;
  grid-template-rows: 6vh 1vh 6vh 1vh;
}

.massUpdate h1 {
  grid-column-start: 1;
  grid-column-end: 4;
  grid-row: 1;
  text-align: left;
  align-self: start;
  font-size: 4em;
  line-height: 7vh;
}

.massUpdate button {
  background: #9BCCEC;
  color: white;
  border: none;
  font-size: 1.3em;
  width: 10vw;
  height: 5vh;
}

.buttonPanel button {
  background: #9BCCEC;
  color: white;
  border: none;
  font-size: 1.3em;
  height: 5vh;
}

button.createNewButton {
  grid-column: 1;
  grid-row: 3;
  border: none;
  background: #9BCCEC;
  color: white;
  align-self: center;
}

button:hover {
  background: #095bea;
}

.selectAll {
  grid-column: 3;
  grid-row: 3;
  align-self: center;
}

.submit {
  grid-column: 5;
  grid-row: 3;
  align-self: center;
}

.select {
  grid-column: 9;
  grid-row: 3;
  width: 10vw;
}

.update {
  grid-column: 7;
  grid-row: 3;
  width: 10vw;
  padding-left: 1vh;
}

.importModal {
  grid-column-start: 3;
  grid-column-end: 3;
  grid-row-start: 2;
  grid-row-end: 2;
}

.importCsv {
  grid-column: 1;
  grid-row: 1;
  width: 10vw;
}

.exportCsv {
  grid-column: 1;
  grid-row: 3;
  width: 10vw;
}

.locationUpdate, .shiftUpdate, .departmentUpdate, .roleUpdate, .departmentAdminUpdate, .adminUpdate, .systemAdminUpdate {
  grid-column: 7;
  grid-row: 3;
  width: 10vw;
  justify-self: right
}

.varCompany, .varLocation, .varShift, .varDepartment, .varEmail, .varPassword, .varTitle, .varFirstName, .varLastName, .varAddress, .varPhone, .varRole, .varDepartmentAdmin, .varAdmin, .varSystemAdmin, .varEndpointARN {
  grid-row: 2;
  align-self: end;
  font-size: 1.5em;
  color: @blue;
  line-height: 30px;
}

.buttonPanel {
  display:grid;
  grid-template-columns: 10vw 1vw;
  grid-template-rows: 6vh 1vh 6vh 1vh;
  grid-row:6;
  grid-column: 1;
}
.departmentAdminUpdate, .adminUpdate, .systemAdminUpdate {
  align-self: center;
  height: 3vh;
}

.varCompany {
  grid-column: 2;
}

.varLocation {
  grid-column: 3;
}

.varShift {
  grid-column: 4;
}

.varDepartment {
  grid-column: 5;
}

.varRole {
  grid-column: 6;
}

.varEmail {
  grid-column: 7;
}

.varPassword {
  grid-column: 8;
}

.varTitle {
  grid-column: 9;
}

.varFirstName {
  grid-column: 10;
}

.varLastName {
  grid-column: 11;
}

.varAddress {
  grid-column: 12;
}

.varPhone {
  grid-column: 13;
}

.varDepartmentAdmin {
  grid-column: 14;
  justify-self: center;
}

.varAdmin {
  grid-column: 15;
  justify-self: center;
}

.varSystemAdmin {
  grid-column: 16;
  justify-self: center;
  padding-right: 1vw;
}

.LetItBe h2 {
  align-self: center;
  font-weight: bold;
  grid-row: 1;
}

.LetItBe .UserInfo {
  grid-row: 2;
  grid-column-start: 1;
  grid-column-end: 13;
}

.userModal {
  display: grid;
  grid-template-columns: 5vh repeat(5, 12vw) 16vw repeat(9, 12vw);
  width: 185vw;
  grid-template-rows: 5vh;
  margin-bottom: 1vh;
  align-items: start;
  border-bottom: 1px solid @blue;
}

.userModal div {
  line-height: 4vh;
}

.userModal input, .userModal button {
  width: 11vw;
  justify-self: left;
}

input.userDepartmentAdmin, input.userAdmin, input.userSystemAdmin {
  justify-self: center;
  height: 4vh;
}

.userSelected {
  justify-self: center;
}

.userCompany, .userLocation, .userEmail, .userShift, .userDepartment, .userPassword, .userTitle, .userFirstName, .userLastName, .userAddress, .userPhone, .userRole, .userDepartmentAdmin, .userAdmin, .userSystemAdmin, .userEndpointARN {
  grid-row: 1;
  font-size: 1.1em;
}

.companyChange, .locationChange, .shiftChange, .departmentChange, .roleChange {
  height: fit-content;
  width: 100%;
  border: 1px black solid;
  background-color: white;
  z-index: 4;
}

.userCompany, .companyChange {
  grid-column: 2;
}

.userLocation, .locationChange {
  grid-column: 3;
}

.userShift, .shiftChange {
  grid-column: 4;
}

.userDepartment, .departmentChange{
  grid-column: 5;
}

.userRole {
  grid-column: 6;
}

input.userEmail {
  grid-column: 7;
  width: 15vw;
}

.userPassword {
  margin: 0;
  padding: 0;
  grid-column: 8;
  width: 10vw;
  height: 4vh;
  line-height: 4vh;
  font-size: 1em;
  justify-self: center;
  color: white;
  background: linear-gradient(#2b5896, #14325C);
  border: none;
}

.userTitle {
  grid-column: 9;
}

.userFirstName {
  grid-column: 10;
}

.userLastName {
  grid-column: 11;
}

.userAddress {
  grid-column: 12;
}

.userPhone {
  grid-column: 13;
}

.userDepartmentAdmin {
  grid-column: 14;
}

.userAdmin {
  grid-column: 15;
}

.userSystemAdmin {
  grid-column: 16;
}

.searchPane {
  grid-column: 2;
  grid-row-start: 3;
  grid-row-end: 4;
  background-color: white;
  border: 1px solid grey;
}

.LetItBe {
  grid-column: 1;
  grid-row: 4;
  background-color: transparent;
  overflow: scroll;
  background-color: #eaeaea;
  border-radius: 10px;
  border: 1px solid grey;
  box-shadow: 1px 2px 3px grey;
  display: grid;
  grid-template-columns: 5vh repeat(5, 12vw) 16vw repeat(9, 12vw);
  grid-template-rows: 8vh 1fr;
}

.LetItBe h2 {
  grid-row: 1;
}

.LetItBe .UserInfo {
  grid-row: 2;
  grid-column-start: 1;
  grid-column-end: 13;
}

.userModal {
  height: 6vh;
  display: grid;
  grid-template-columns: 5vh repeat(15, 12vw);
  grid-template-rows: 3vh;
}

input.userName {
  grid-row: 2;
  font-size: 1.2em;
  line-height: 1.8em;
  background-color: #9fd2ea;
  padding-left: 2%;
  grid-column: 2;
}

.userNameClearDisplay, .shiftName, .shiftLocal, .shiftStart, .shiftEnd {
  grid-row: 1;
  font-size: 1.1em;
}

.shiftSelected {
  grid-column: 1;
  height: 90%;
  width: 90%;
  font-size: 1.2em;
  color: white;
  border-radius: 50%;
  background-color: green;
  text-align: center;
  align-self: center;
}

.userNameClearDisplay {
  grid-column: 2;
  text-align: right;
  margin-right: 15%;
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
  align-self: center;
}

.shiftEnd {
  grid-column: 6;
  font-size: 1em;
  align-self: center;
}

.userNameSearch, .g {
  grid-row: 2;
  grid-column: 2;
  box-shadow: 0px 1px 3px grey;
}

.usersBox {
  grid-row: 6;
  grid-column: 2;
  background-color: white;
  border: 1px solid grey;
  border-radius: 5px;
  overflow-y: scroll;
}

.viewAllUsers {
  grid-row: 2;
  grid-column: 1;
  background-color: #eaeaea;
  height: 92vh;
  display: grid;
  grid-template-columns: 2vw 21vw 2vw;
  grid-template-rows: 12vh 3vh 8vh 3vh 5vh 15vh 5vh 30vh 5vh;
  box-shadow: 0px 2px 5px black;
}

.viewAllUsers h1 {
  align-self: end
}

.updateUsers {
  grid-column: 2;
  grid-row: 3;
  background: linear-gradient(#2b5896, #14325C);
  color: white;
  font-size: 1.3em;
  border: none;
}

.viewAllCompanies {
  grid-row: 2;
  grid-column: 1;
  background-color: #eaeaea;
  display: grid;
  grid-template-columns: 2vw 21vw 2vw;
  grid-template-rows: 10vh 5vh 10vh 65vh 5vh;
  box-shadow: 0px 2px 5px black;
}

.companyList {
  background-color: white;
  grid-column: 2;
  grid-row-start: 6;
  grid-row-end: 9;
  height: 100%;
  border-radius: 5px;
  border: 1px solid grey;
  align-self: start;
  overflow-y: scroll;
}

.updateCompanyList {
  grid-row: 4;
  grid-column: 2;
}

.company {
  margin: 2vh 1vw;
  width: 18vw;
  align-items: center;
  border: .1vw solid grey;
  border-top: none;
}

.company h6 {
  padding-left: 1vh;
}

.listHeader {
  grid-row: 3;
  grid-column: 2;
}

.companyHeader {
  grid-column: 2;
  align-self: center;
  grid-row: 5;
}

.companyName {
  grid-row: 1;
  font-size: 1.2em;
  line-height: 1.8em;
  background-color: #9fd2ea;
  padding-left: 1vw;
  width: 17.9vw;
  border: none;
}

.locationColumn {
  align-items: center;
  margin-left: 2vw;
}

.locationColumnName {
  font-size: 1.2em;
  width: 15.9vw;
  line-height: 3vh;
  height: 3vh;
  padding-left: 1vh;
  border-bottom: 1px solid grey;
  border-left: 1px solid grey;
}

.shiftsBox {
  grid-column-start: 1;
  grid-column-end: 3;
  margin-bottom: 1em;
}

.userName {
  grid-row: 1;
  font-size: 1.2em;
  line-height: 1.8em;
  background-color: #9fd2ea;
  padding-left: 1vw;
}

.shiftColumn {
  margin-left: 2vw;
  width: 16vw;
  align-items: center;
  display: grid;
  grid-template-columns: 11.9vw 2vw;
}

.shiftColumnName {
  grid-column: 1;
  font-size: 1em;
  padding-left: 1vh;
  line-height: 3vh;
  width: 13.9vw;
  height: 3vh;
  border-bottom: 1px solid grey;
  border-left: 1px solid grey;
}

.shiftExpand {
  border: 1px grey solid;
  border-top: none;
  text-align: center;
  grid-column: 2;
  background-color: white;
  height: 100%;
  align-self: center;
  color: @blue;
}

.departmentsBox {
  margin-bottom: .6em;
}

.departmentName {
  font-size: 1em;
  width: 13.9vw;
  height: 3vh;
  line-height: 3vh;
  margin-left: 2vw;
  padding-left: 1vh;
  align-self: center;
  border-bottom: 1px solid grey;
  border-left: 1px solid grey;
}

.highlightCompany {
  background-color: @blue !important;
  color: white;
}

.highlight {
  background-color: #9fd2ea;
}

.email {
}

.password {
}

.title {
}

.firstName {
}

.lastName {
}

.address {
}

.phone {
}

.role {
  grid-row: 11;
}

.companyId {
}

.departmentAdmin {
}

.admin {
}

.systemAdmin {
}

.endpointARN {
}

.platform {
}

.name {
  grid-column-start: 1;
  grid-column-end: 4;
  grid-row-start: 1;
  grid-row-end: 1;
}

.accessLevel {
  grid-column-start: 1;
  grid-column-end: 4;
  grid-row-start: 2;
  grid-row-end: 2;
  background-color: #eaeaea;
}

.apps {
  grid-column-start: 1;
  grid-column-end: 4;
  grid-row-start: 3;
  grid-row-end: 3;
}

.updateAccount {
  grid-column-start: 1;
  grid-column-end: 4;
  grid-row-start: 4;
  grid-row-end: 4;
}

.user {
  grid-column-start: 1;
  grid-column-end: 4;
  grid-row-start: 5;
  grid-row-end: 5;
}

.user {
  grid-column-start: 1;
  grid-column-end: 4;
  grid-row-start: 7;
  grid-row-end: 7;
}

.claimableShift {
  grid-column-start: 1;
  grid-column-end: 4;
  grid-row-start: 8;
  grid-row-end: 8;
}

.createRole {
  grid-column-start: 1;
  grid-column-end: 4;
  grid-row-start: 13;
  grid-row-end: 13;
}

.back {
  grid-column-start: 1;
  grid-column-end: 4;
  grid-row-start: 7;
  grid-row-end: 7
}

.editOne {
  grid-row: 2;
  grid-column-start: 2;
  grid-column-end: 4;
}

.areYouSure {
  position: fixed;
  z-index: 7;
  left: 50vw;
  right: 35vw;
  top: 50vh;
  bottom: 80vh;
  height: 35vh;
  width: 22vw;
  background-color: white;
  border: 1px solid grey;
  align-self: center;
  border-radius: 5px;
}

.viewOne {
  grid-row: 2;
  grid-column-start: 2;
  grid-column-end: 4;
}

.viewEmail {
}

.viewPassword {
}

.viewTitle {
}

.viewFirstName {
}

.viewLastName {
}

.viewAddress {
}

.viewPhone {
}

.viewRole {
}

.viewShift {
}

.viewDepartment {
}

.viewCompanyId {
}

.viewDepartmentAdmin {
}

.viewAdmin {
}

.viewSystemAdmin {
}

.viewEndpointARN {
}

.viewPlatform {
}

</style>
