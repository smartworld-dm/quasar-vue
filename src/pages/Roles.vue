<template>
  <div class="main">
    <div class="create" v-if="modal==='create'">
      <input class="name" v-model="activeRole.name" placeholder="Role Name" type="text"/>
      <select class="accessLevel" v-model="activeRole.accessLevel">
        <option value="none">None</option>
        <option value="systemAdmin">System Admin</option>
        <option value="admin">Admin</option>
        <option value="departmentAdmin">Department Admin</option>
        <option value="role">Role</option>
      </select>
      <div class="apps">
        Apps
        <input v-model="activeRole.apps.notify" type="checkbox"/>
      </div>
      <div class="updateAccount">
        Update Account
        <input v-model="activeRole.updateAccount" type="checkbox"/>
      </div>
      <div class="user">
        <h5>User</h5>
        <input v-model="activeRole.users.create" type="checkbox"/>Create
        <input v-model="activeRole.users.read" type="checkbox"/>Read
        <input v-model="activeRole.users.update" type="checkbox"/>Update
        <input v-model="activeRole.users.delete" type="checkbox"/>Delete
      </div>
      <div class="department">
        <h5>Departments</h5>
        <input v-model="activeRole.departments.create" type="checkbox"/>Create
        <input v-model="activeRole.departments.read" type="checkbox"/>Read
        <input v-model="activeRole.departments.update" type="checkbox"/>Update
        <input v-model="activeRole.departments.delete" type="checkbox"/>Delete
      </div>
      <div class="role">
        <h5>Roles</h5>
        <input v-model="activeRole.roles.create" type="checkbox"/>Create
        <input v-model="activeRole.roles.read" type="checkbox"/>Read
        <input v-model="activeRole.roles.update" type="checkbox"/>Update
        <input v-model="activeRole.roles.delete" type="checkbox"/>Delete
      </div>
      <div class="claimableShift">
        <h5>Claimable Shifts</h5>
        <input v-model="activeRole.claimableShifts.create" type="checkbox"/>Create
        <input v-model="activeRole.claimableShifts.read" type="checkbox"/>Read
        <input v-model="activeRole.claimableShifts.update" type="checkbox"/>Update
        <input v-model="activeRole.claimableShifts.delete" type="checkbox"/>Delete
      </div>
      <div class="shift">
        <h5>Shifts</h5>
        <input v-model="activeRole.shifts.create" type="checkbox"/>Create
        <input v-model="activeRole.shifts.read" type="checkbox"/>Read
        <input v-model="activeRole.shifts.update" type="checkbox"/>Update
        <input v-model="activeRole.shifts.delete" type="checkbox"/>Delete
      </div>
      <div class="schedule">
        <h5>Schedules</h5>
        <input v-model="activeRole.schedules.create" type="checkbox"/>Create
        <input v-model="activeRole.schedules.read" type="checkbox"/>Read
        <input v-model="activeRole.schedules.update" type="checkbox"/>Update
        <input v-model="activeRole.schedules.delete" type="checkbox"/>Delete
      </div>
      <button class="createRole" v-on:click="createRole()">Create Role</button>
      <button class="cback" v-on:click="clearActiveRole(); populateRoles(); modal=''">Back</button>
    </div>
    <div class="editOne" v-else-if="modal==='edit'">
      <input class="name" v-model="activeRole.name" placeholder="Role Name" type="text"/>
      <select class="accessLevel" v-model="activeRole.accessLevel">
        <option value="none">None</option>
        <option value="systemAdmin">System Admin</option>
        <option value="admin">Admin</option>
        <option value="departmentAdmin">Department Admin</option>
        <option value="role">Role</option>
      </select>
      <div class="apps">
        Apps
        <input v-model="activeRole.apps.notify" type="checkbox"/>
      </div>
      <div class="updateAccount">
        Update Account
        <input v-model="activeRole.updateAccount" type="checkbox"/>
      </div>
      <div class="user">
        <h5>User</h5>
        <input v-model="activeRole.users.create" type="checkbox"/>Create
        <input v-model="activeRole.users.read" type="checkbox"/>Read
        <input v-model="activeRole.users.update" type="checkbox"/>Update
        <input v-model="activeRole.users.delete" type="checkbox"/>Delete
      </div>
      <div class="department">
        <h5>Departments</h5>
        <input v-model="activeRole.departments.create" type="checkbox"/>Create
        <input v-model="activeRole.departments.read" type="checkbox"/>Read
        <input v-model="activeRole.departments.update" type="checkbox"/>Update
        <input v-model="activeRole.departments.delete" type="checkbox"/>Delete
      </div>
      <div class="role">
        <h5>Roles</h5>
        <input v-model="activeRole.roles.create" type="checkbox"/>Create
        <input v-model="activeRole.roles.read" type="checkbox"/>Read
        <input v-model="activeRole.roles.update" type="checkbox"/>Update
        <input v-model="activeRole.roles.delete" type="checkbox"/>Delete
      </div>
      <div class="claimableShift">
        <h5>Claimable Shifts</h5>
        <input v-model="activeRole.claimableShifts.create" type="checkbox"/>Create
        <input v-model="activeRole.claimableShifts.read" type="checkbox"/>Read
        <input v-model="activeRole.claimableShifts.update" type="checkbox"/>Update
        <input v-model="activeRole.claimableShifts.delete" type="checkbox"/>Delete
      </div>
      <div class="shift">
        <h5>Shifts</h5>
        <input v-model="activeRole.shifts.create" type="checkbox"/>Create
        <input v-model="activeRole.shifts.read" type="checkbox"/>Read
        <input v-model="activeRole.shifts.update" type="checkbox"/>Update
        <input v-model="activeRole.shifts.delete" type="checkbox"/>Delete
      </div>
      <div class="schedule">
        <h5>Schedules</h5>
        <input v-model="activeRole.schedules.create" type="checkbox"/>Create
        <input v-model="activeRole.schedules.read" type="checkbox"/>Read
        <input v-model="activeRole.schedules.update" type="checkbox"/>Update
        <input v-model="activeRole.schedules.delete" type="checkbox"/>Delete
      </div>
      <button class="submitEdit" v-on:click="updateRole()">Update Role</button>
      <button class="deleteRole" v-on:click="modal='sure'">Delete Role</button>
      <button class="editback" v-on:click="clearActiveRole(); populateRoles(); modal=''">Back</button>
    </div>
    <div class="areYouSure" v-else-if="modal==='sure'">
      <h3>Are you Sure?</h3>
      <h4>(This is permanent and irreversable!)</h4>
      <button class="yesSure" v-on:click="deleteRole()">Yes</button>
      <button class="noSure" v-on:click="modal='edit'">No</button>
    </div>
    <div class="viewOne" v-else-if="modal==='view'">
      <div class="viewName">Name: {{activeRole.name}}</div>
      <div class="viewAccessLevel">Access Level: {{activeRole.accessLevel}}</div>
      <div class="viewAppsNotify">Notify: {{activeRole.apps.notify}}</div>
      <div class="viewUpdateAccount">Update: {{activeRole.updateAccount}}</div>
      <div class="viewUsers">
        <h5>Users</h5>
        Create:{{activeRole.users.create}}<br/>
        Read:{{activeRole.users.read}}<br/>
        Update:{{activeRole.users.update}}<br/>
        Delete:{{activeRole.users.delete}}<br/>
      </div>
      <div class="viewDepartments">
        <h5>Departments</h5>
        Create:{{activeRole.departments.create}}<br/>
        Read:{{activeRole.departments.read}}<br/>
        Update:{{activeRole.departments.update}}<br/>
        Delete:{{activeRole.departments.delete}}<br/>
      </div>
      <div class="viewRoles">
        <h5>Roles</h5>
        Create:{{activeRole.roles.create}}<br/>
        Read:{{activeRole.roles.read}}<br/>
        Update:{{activeRole.roles.update}}<br/>
        Delete:{{activeRole.roles.delete}}<br/>
      </div>
      <div class="viewClaimableShifts">
        <h5>ClaimableShifts</h5>
        Create:{{activeRole.claimableShifts.create}}<br/>
        Read:{{activeRole.claimableShifts.read}}<br/>
        Update:{{activeRole.claimableShifts.update}}<br/>
        Delete:{{activeRole.claimableShifts.delete}}<br/>
      </div>
      <div class="viewShifts">
        <h5>Shifts</h5>
        Create:{{activeRole.shifts.create}}<br/>
        Read:{{activeRole.shifts.read}}<br/>
        Update:{{activeRole.shifts.update}}<br/>
        Delete:{{activeRole.shifts.delete}}<br/>
      </div>
      <div class="viewSchedules">
        <h5>Schedules</h5>
        Create:{{activeRole.schedules.create}}<br/>
        Read:{{activeRole.schedules.read}}<br/>
        Update:{{activeRole.schedules.update}}<br/>
        Delete:{{activeRole.schedules.delete}}<br/>
      </div>
      <button class="editbutton" v-on:click="modal='edit'">Edit</button>
      <button class="back" v-on:click="clearActiveRole(); populateRoles(); modal=''">Back</button>
    </div>
    <div class="viewAll">
      <h1>Roles</h1>
      <button class="createNewButton" v-on:click="createNew()">Create New Role</button>
      <div class="rolesBox">
        <div class="roleList" v-on:click="viewRole(role)" v-for="role in roles" v-bind:key="role._id">
          <div class="role">
            <div class="roleName">{{role.name}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'roles',
  props: ['user', 'logged'],
  created () {
    let vue = this
    vue.populateRoles()
  },
  data: function () {
    return {
      roles: [],
      activeRole: {
        id: '',
        companyId: '',
        name: '',
        accessLevel: '',
        apps: {
          notify: false
        },
        updateAccount: false,
        users: {
          create: false,
          read: false,
          update: false,
          delete: false
        },
        departments: {
          create: false,
          read: false,
          update: false,
          delete: false
        },
        roles: {
          create: false,
          read: false,
          update: false,
          delete: false
        },
        claimableShifts: {
          create: false,
          read: false,
          update: false,
          delete: false
        },
        shifts: {
          create: false,
          read: false,
          update: false,
          delete: false
        },
        schedules: {
          create: false,
          read: false,
          update: false,
          delete: false
        }
      },
      modal: ''
    }
  },
  methods: {
    createRole () {
      let vue = this
      axios.post('https://api.shiftnotification.com/roles', {
        adminId: vue.user.id,
        companyId: vue.user.companyId,
        name: vue.activeRole.name,
        accessLevel: vue.activeRole.accessLevel,
        apps: vue.activeRole.apps,
        updateAccount: vue.activeRole.updateAccount,
        users: vue.activeRole.users,
        departments: vue.activeRole.departments,
        roles: vue.activeRole.roles,
        claimableShifts: vue.activeRole.claimableShifts,
        shifts: vue.activeRole.shifts,
        schedules: vue.activeRole.schedules
      }, {headers: { 'Authorization': 'JWT ' + vue.user.token }})
        .then(response => {
          console.log(response)
          vue.activeRole.id = response.data._id
          vue.activeRole.companyId = response.data.companyId
          vue.activeRole.name = response.data.name
          vue.activeRole.accessLevel = response.data.accessLevel
          vue.activeRole.apps = response.data.apps
          vue.activeRole.updateAccount = response.data.updateAccount
          vue.activeRole.users = response.data.users
          vue.activeRole.departments = response.data.departments
          vue.activeRole.roles = response.data.roles
          vue.activeRole.claimableShifts = response.data.claimableShifts
          vue.activeRole.shifts = response.data.shifts
          vue.activeRole.schedules = response.data.schedules
          vue.populateRoles()
          vue.modal = 'view'
        })
        .catch(err => {
          console.log(err)
        })
    },
    updateRole () {
      let vue = this
      axios.put('https://api.shiftnotification.com/roles/' + vue.activeRole.id, {
        adminId: vue.user.id,
        companyId: vue.activeRole.companyId,
        name: vue.activeRole.name,
        accessLevel: vue.activeRole.accessLevel,
        apps: vue.activeRole.apps,
        updateAccount: vue.activeRole.updateAccount,
        users: vue.activeRole.users,
        departments: vue.activeRole.departments,
        roles: vue.activeRole.roles,
        claimableShifts: vue.activeRole.claimableShifts,
        shifts: vue.activeRole.shifts,
        schedules: vue.activeRole.schedules
      }, {headers: { 'Authorization': 'JWT ' + vue.user.token }})
        .then(response => {
          console.log(response)
          vue.modal = 'view'
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteRole () {
      let vue = this
      axios.delete('https://api.shiftnotification.com/roles/' + vue.activeRole.id + '/' + vue.user.id, {headers: { 'Authorization': 'JWT ' + vue.user.token }})
        .then(response => {
          console.log(response)
          vue.clearActiveRole()
          vue.populateRoles()
          vue.modal = ''
        })
        .catch(err => {
          console.log(err)
        })
    },
    populateRoles () {
      let vue = this
      axios.get('https://api.shiftnotification.com/roles/all/' + vue.user.id + '/' + vue.user.companyId, {headers: { 'Authorization': 'JWT ' + vue.user.token }})
        .then(response => {
          vue.roles = response.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    createNew () {
      let vue = this
      vue.clearActiveRole()
      vue.populateRoles()
      vue.modal = 'create'
    },
    viewRole (role) {
      let vue = this
      vue.activeRole.id = role._id
      vue.activeRole.companyId = role.companyId
      vue.activeRole.name = role.name
      vue.activeRole.accessLevel = role.accessLevel
      vue.activeRole.apps = role.apps
      vue.activeRole.updateAccount = role.updateAccount
      vue.activeRole.users = role.users
      vue.activeRole.departments = role.departments
      vue.activeRole.roles = role.roles
      vue.activeRole.claimableShifts = role.claimableShifts
      vue.activeRole.shifts = role.shifts
      vue.activeRole.schedules = role.schedules
      vue.populateRoles()
      vue.modal = 'view'
    },
    clearActiveRole () {
      let vue = this
      vue.activeRole.id = ''
      vue.activeRole.companyId = ''
      vue.activeRole.name = ''
      vue.activeRole.accessLevel = ''
      vue.activeRole.apps = false
      vue.activeRole.updateAccount = false
      vue.activeRole.users = []
      vue.activeRole.departments = []
      vue.activeRole.roles = []
      vue.activeRole.claimableShifts = []
      vue.activeRole.shifts = []
      vue.activeRole.schedules = []
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
  grid-template-rows: 6vh 90vh;
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
h5 {
  margin: 2vh;
  font-size: 2em;
  font-weight: bold;
  text-decoration: underline;
}
.create {
  grid-column-start: 3;
  grid-column-end: 4;
  grid-row-start: 2;
  grid-row-end: 2;
  display: grid;
  grid-template-columns: 30vw 5vw 30vw;
  grid-template-rows: 4vh 4vh 4vh 4vh 12vh 12vh 12vh 4vh 8vh ;
  margin-top: 4vh;
}
.createNewButton {
  grid-column: 2;
  grid-row: 2;
  color: white;
  border: none;
  font-size: 1.3em;
  background: linear-gradient(#39b267, #13724b);
}
button {
  color: white;
  border: none;
  font-size: 1.3em;
  background: linear-gradient(#2b5896, #14325C);
}
.rolesBox {
  grid-row: 4;
  grid-column: 2;
  background-color: white;
  border: 1px solid grey;
  border-radius: 5px;
  overflow-y: scroll;
}
.viewAll {
  grid-row: 2;
  grid-column: 1;
  background-color: #eaeaea;
  display: grid;
  grid-template-columns: 2vw 21vw 2vw;
  grid-template-rows: 10vh 5vh 5vh 65vh 5vh;
  box-shadow: 0px 2px 5px black;
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
  grid-column-end: 2;
  grid-row-start: 4;
  grid-row-end: 4;
  align-self: center;
  font-size: 1.4em;
  text-align: center;
}

.updateAccount {
  grid-column-start: 3;
  grid-column-end: 4;
  grid-row-start: 4;
  grid-row-end: 4;
  align-self: center;
  font-size: 1.4em;
  text-align: center;
}

.user {
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 5;
  grid-row-end: 5;
  text-align: center;
}

.department {
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 6;
  grid-row-end: 6;
  text-align: center;
}

.role {
  grid-column-start: 3;
  grid-column-end: 4;
  grid-row-start: 6;
  grid-row-end: 6;
  text-align: center;
}

.claimableShift {
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 7;
  grid-row-end: 7;
  text-align: center;
}

.shift {
  grid-column-start: 3;
  grid-column-end: 4;
  grid-row-start: 7;
  grid-row-end: 7;
  text-align: center;
}
.schedule {
  grid-column-start: 3;
  grid-column-end: 4;
  grid-row-start: 5;
  grid-row-end: 5;
  text-align: center;
}

.createRole {
  grid-column-start: 3;
  grid-column-end: 4;
  grid-row: 9;
  background: linear-gradient(#39b267, #13724b);
}

.back {
  grid-column-start: 1;
  grid-column-end: 4;
  grid-row: 7;
  height: 4vh;
}
.editbutton {
  grid-column-start: 1;
  grid-column-end: 4;
  grid-row: 3;
  height: 4vh;
}

.editOne {
  grid-row: 2;
  grid-column-start: 2;
  grid-column-end: 4;
  display: grid;
  grid-template-rows: 4vh 4vh 1vh repeat(5, 9.5vh) 1vh 1vh 4vh 4vh 4vh;
  margin-left: 5%;
  margin-top: 4vh;
}

.editback {
  grid-row: 11;
}

.submitEdit {
  grid-row: 11;
  grid-column: 3;
  background: linear-gradient(#39b267, #13724b);
}

.deleteRole {
  grid-row: 13;
  background: linear-gradient(#c22227, #770303);
}

.areYouSure {
  grid-row: 2;
  grid-column-start: 2;
  grid-column-end: 4;
}

.viewOne {
  grid-row: 2;
  grid-column-start: 2;
  grid-column-end: 4;
  display: grid;
  grid-template-columns: 25vw 25vw 25vw;
  align-items: center;
  grid-gap: 1vh;
}

.viewName {
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 1;
  grid-row-end: 1;
  text-align:left;
  padding-left: 5%;
  border-bottom: 1px solid black;
  font-size: 1.5em;
  font-weight: bold;
}

.viewAccessLevel {
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 2;
  grid-row-end: 2;
  text-align:center;
  text-decoration: underline;
}

.viewAppsNotify {
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 2;
  grid-row-end: 2;
  text-align:center;
  text-decoration: underline;
}

.viewUpdateAccount {
  grid-column-start: 3;
  grid-column-end: 4;
  grid-row-start: 2;
  grid-row-end: 2;
  text-align:center;
  text-decoration: underline;
}

.viewUsers {
  border-radius: 3%;
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 5;
  grid-row-end: 5;
  text-align: center;
  background-color: #9fd2ea;
}

.viewDepartments {
  border-radius: 3%;
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 5;
  grid-row-end: 5;
  text-align: center;
  background-color: #9fd2ea;
}

.role {
  margin-bottom: 1.6em;
}

.viewRoles {
  grid-column-start: 3;
  grid-column-end: 4;
  grid-row-start: 5;
  grid-row-end: 5;
  text-align: center;
  background-color: #9fd2ea;
  border-radius: 3%;
}

.roleName {
  font-size: 1.2em;
  line-height: 1.8em;
  background-color: #9fd2ea;
  padding-left: 2%;
}

.viewClaimableShifts {
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 6;
  grid-row-end: 6;
  text-align: center;
  background-color: #9fd2ea;
  border-radius: 3%;
}

.viewShifts {
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 6;
  grid-row-end: 6;
  text-align: center;
  background-color: #9fd2ea;
  border-radius: 3%;
}
.viewSchedules {
  grid-column-start: 3;
  grid-column-end: 4;
  grid-row-start: 6;
  grid-row-end: 6;
  text-align: center;
  background-color: #9fd2ea;
  border-radius: 3%;
}
.cback {
  grid-row: 9;
}
</style>
