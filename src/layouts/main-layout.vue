<template>
  <q-layout> <!-- Be sure to play with the Layout demo on docs -->

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
          Header
          <span slot="subtitle">Subtile</span>
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-header>

    <!-- (Optional) A Drawer; you can add one more with side="right" or change this one's side -->
    <q-layout-drawer
      class="sidebar"
      side="left"
      v-model="leftDrawer"
    >
      <!-- QScrollArea is optional -->
      <q-scroll-area class="fit q-pa-sm">
        <div class="item" v-on:click="$router.push('/Account')">Account</div>
        <div class="item" v-on:click="$router.push('/Companies')">Companies</div>
        <div class="item" v-on:click="$router.push('/Roles')">Roles</div>
        <div class="item" v-on:click="$router.push('/Users')">Users</div>
        <div class="item" v-on:click="$router.push('/Logs')">Logs</div>
        <div class="item" v-on:click="$router.push('/CalendarPicker')">CalendarPicker</div>
      </q-scroll-area>
    </q-layout-drawer>

    <q-page-container>
      <!-- This is where pages get injected -->
      <router-view :user="user"/>
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  props: ['user'],
  data () {
    return {
      leftDrawer: true
    }
  }
}
</script>

<style>
.sidebar div.item {
  padding: 15px;
  height: 50px;
  background-color: #ddd;
  margin-bottom: 1px;
  cursor: pointer;
}
.sidebar div.item:hover {
  background-color: #bbb;
}
.q-layout-page-container {
  padding-top: 0px !important;
}
</style>
