<template>
  <q-layout class="layout"> <!-- Be sure to play with the Layout demo on docs -->

    <!-- (Optional) The Header -->
    <q-layout-header>
      <q-toolbar>
        <q-btn
          flat
          round
          dense
          icon="menu"
          @click="leftDrawer = !leftDrawer"
        />
        <q-toolbar-title>
          WeighLabelAdminPortal
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-header>

    <!-- (Optional) A Drawer; you can add one more with side="right" or change this one's side -->
    <q-layout-drawer
      class="sidebar"
      side="left"
      overlay=false
      v-model="leftDrawer"
    >
      <!-- QScrollArea is optional -->
      <q-scroll-area class="fit q-pa-sm">
        <div class="welcome">Welcome, {{user.firstName}} {{user.lastName}}</div>

        <q-collapsible group="schedule" icon="schedule" label="Schedule">
          <q-collapsible group="companies" icon="explore" v-bind:label="company.companyName" v-for="company in companies" v-bind:key="company._id">
            <q-collapsible group="locations" icon="explore" v-bind:label="location.name" v-for="location in company.locations" v-bind:key="location._id">
               <div class="shift" v-on:click="navigateSpreadSheet(shift, location, company)" v-for="shift in location.shifts" v-bind:key="shift._id">
                {{shift.name}}
              </div>
            </q-collapsible>
          </q-collapsible>
        </q-collapsible>
        <q-item link @click.native="$router.push('/Account')">
          <q-item-side icon="perm_identity" />
          <q-item-main label="Account" />
        </q-item>
        <q-item link @click.native="$router.push('/claimable')">
          <q-item-side icon="explore" />
          <q-item-main label="Shift Claim" />
        </q-item>
        <q-item link @click.native="$router.push('/Companies')">
          <q-item-side icon="class" />
          <q-item-main label="Companies" />
        </q-item>
        <q-item link @click.native="$router.push('/Roles')">
          <q-item-side icon="explore" />
          <q-item-main label="Roles" />
        </q-item>
         <q-collapsible group="users" icon="people" label="Users">
          <q-collapsible group="companies" icon="explore" v-bind:label="company.companyName" v-for="company in companies" v-bind:key="company._id">
            <q-collapsible group="locations" icon="explore" v-bind:label="location.name" v-for="location in company.locations" v-bind:key="location._id">
              <q-collapsible group="shifts" icon="explore" label="Shifts">
                <div class="shift" v-on:click="navigateUser(shift, location, company)" v-for="shift in location.shifts" v-bind:key="shift._id">
                  {{shift.name}}
                </div>
              </q-collapsible>
              <q-collapsible group="department" icon="explore" label="Departments">
                <div class="shift" v-on:click="navigateUserWithDepartment(department, location, company)" v-for="department in location.departments" v-bind:key="department._id">
                  {{department.name}}
                </div>
              </q-collapsible>
            </q-collapsible>
          </q-collapsible>
        </q-collapsible>
        <q-item link @click.native="$router.push('/Logs')">
          <q-item-side icon="description" />
          <q-item-main label="Logs" />
        </q-item>
        <!-- <q-item link @click.native="$router.push('/CalendarPicker')">
          <q-item-side icon="event" />
          <q-item-main label="CalendarPicker" />
        </q-item> -->
        <q-item link @click.native="$emit('logout')">
          <q-item-side icon="label" />
          <q-item-main label="Logout" />
        </q-item>
      </q-scroll-area>
    </q-layout-drawer>

    <q-page-container>
      <!-- This is where pages get injected -->
      <router-view :user="user"/>
    </q-page-container>

  </q-layout>
</template>
<script>
import axios from 'axios'
export default {
  props: ['user'],
  data () {
    return {
      leftDrawer: true,
      companies: [],
      pane: {
        company: '',
        location: '',
        shift: '',
        department: ''
      }
    }
  },
  created () {
    console.log('main navigate created')
    this.pane.company = this.user.companyId
    this.populateCompanies()
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
    navigateUser (shift, location, company) {
      console.log('current Route')
      console.log(this.$route.name)
      if (this.$route.name === 'Users') {
        console.log('pop')
      }
      this.leftDrawer = false
      this.$router.push({name: 'Users', params: {shift: shift, location: location, company: company}})
    },
    navigateSpreadSheet (shift, location, company) {
      this.leftDrawer = false
      this.$router.push({name: 'Spreadsheet', params: {shift: shift, location: location, company: company}})
    },
    navigateUserWithDepartment (department, location, company) {
      console.log('current Route')
      console.log(this.$route.name)
      if (this.$route.name === 'Users') {
        console.log('pop')
      }
      this.leftDrawer = false
      this.$router.push({name: 'Users', params: {department: department, location: location, company: company}})
    }
  }
}
</script>

<style>
.sidebar {
  padding: 15px;
  height: 50px;
  background-color: #303947;
  color:#FFFFFF;
  margin-bottom: 1px;
  cursor: pointer;
}
.shift {
  padding:10px !important;
}
.welcome{
  text-align: center;
  padding:20px;
}
.q-item{
  padding:12px !important;
}
.q-layout-drawer-delimiter {
  background-color: #303947;
}
.sidebar div.item:hover {
  background-color: #bbb;
}
.q-layout-page-container {
  padding-top: 0px !important;
}

</style>
