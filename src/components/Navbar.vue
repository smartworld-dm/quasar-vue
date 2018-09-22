<template>
  <div class="main">
    <div class="navbar">
      <div class="logo">weighlabel</div>
      <div class="sched" v-on:click="$router.push('/')"></div>
      <div class="accnt" v-on:click="$router.push('/Account')"></div>
      <div class="logt"  v-on:click="$emit('logout')"></div>
      <button class="schedule" v-on:click="$router.push('/')">Schedule</button>
      <button class="account" v-on:click="$router.push('/Account')">Admin</button>
      <button class="logout" v-on:click="$emit('logout')">Log Out</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'navbar',
  props: ['logged', 'user']
}
</script>

<style scoped lang="less">
  @blue: #14325C;
  @darkBlue: #00578A;
  @lightBlue: #78CDFF;
  @grey: #323d38;
  @font: 'Monda', sans-serif;

  .navbar {
    top: 0;
    left: 0;
    position: fixed;
    width: 100%;
    height: 8vh;
    z-index: 10;
    display: grid;
    grid-template-columns: 24vw 30vw repeat(3, 5vw 9vw);
    grid-template-rows: 8vh;
    background: linear-gradient(#A6DDF3, #9BCCEC);
    box-shadow: 1px 2px 7px black;
  }

  .logo {
    grid-column: 1;
    grid-row-start: 1;
    grid-row: 1;
    line-height: 8vh;
    width: auto;
    text-align: center;
    align-self: center;
    color: white;
    font-family: @font;
    font-size: 2.5em;
  }

  .sched {
    background-image: url("../assets/sched.svg");
    grid-column: 3;
    transform: scale(.50, .50);
  }

  .accnt {
    background-image: url("../assets/acct.svg");
    grid-column: 5;
    transform: scale(.50, .50);
  }

  .logt {
    background-image: url("../assets/logt.svg");
    grid-column: 7;
    transform: scale(.50, .50);
  }

  .sched, .accnt, .logt, .logo {
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    z-index: 1;
  }

  .sched, .accnt, .logt {
    grid-row: 1;
  }

  .schedule, .account, .logout {
    grid-row: 1;
    background-color: transparent;
    color: white;
    font-size: 1.5em;
    font-family: @font;
    border: none;
    text-align: left;
    align-self: center;
  }

    .schedule:hover, .account:hover, .logout :hover{
    grid-row: 1;

    color: white;
    font-size: 1.5em;
    font-family: @font;
    border: none;
    text-align: left;
    align-self: center;
  }

  .schedule {
    grid-column: 4;
  }

  .account {
    grid-column: 6;
  }

  .logout {
    grid-column: 8;
  }

  @media (min-width: 1000px) {
  }
</style>
