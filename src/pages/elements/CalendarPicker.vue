<template>
  <div v-bind:class="{main1: style === 'small', main2: style === 'medium'}">
    <div class="hours" v-if="hours">
      <select class="hour" v-model="time.hour">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option>
      </select>
      :
      <select class="minute" v-model="time.minute">
        <option value="00">00</option>
        <option value="1">01</option>
        <option value="2">02</option>
        <option value="3">03</option>
        <option value="4">04</option>
        <option value="5">05</option>
        <option value="6">06</option>
        <option value="7">07</option>
        <option value="8">08</option>
        <option value="9">09</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option>
        <option value="13">13</option>
        <option value="14">14</option>
        <option value="15">15</option>
        <option value="16">16</option>
        <option value="17">17</option>
        <option value="18">18</option>
        <option value="19">19</option>
        <option value="20">20</option>
        <option value="21">21</option>
        <option value="22">22</option>
        <option value="23">23</option>
        <option value="24">24</option>
        <option value="25">25</option>
        <option value="26">26</option>
        <option value="27">27</option>
        <option value="28">28</option>
        <option value="29">29</option>
        <option value="30">30</option>
        <option value="31">31</option>
        <option value="32">32</option>
        <option value="33">33</option>
        <option value="34">34</option>
        <option value="35">35</option>
        <option value="36">36</option>
        <option value="37">37</option>
        <option value="38">38</option>
        <option value="39">39</option>
        <option value="40">40</option>
        <option value="41">41</option>
        <option value="42">42</option>
        <option value="43">43</option>
        <option value="44">44</option>
        <option value="45">45</option>
        <option value="46">46</option>
        <option value="47">47</option>
        <option value="48">48</option>
        <option value="49">49</option>
        <option value="50">50</option>
        <option value="51">51</option>
        <option value="52">52</option>
        <option value="53">53</option>
        <option value="54">54</option>
        <option value="55">55</option>
        <option value="56">56</option>
        <option value="57">57</option>
        <option value="58">58</option>
        <option value="59">59</option>
      </select>
      <select class="ampm" v-model="meridian">
        <option value="am">AM</option>
        <option value="pm">PM</option>
      </select>
    </div>
    <div class="calendar" v-if="calendar">
      <div class="month">
        <div class="monthName" v-on:click="jumpTo">{{ this.month.month }}</div>
        <div class="prev" v-on:click="previous">&#10094;</div>
        <div class="next" v-on:click="next">&#10095;</div>
        <div class="year">{{ this.year }}</div>
      </div>
      <div class="weekdays">
        <div class="sunday">Su</div>
        <div class="monday">Mo</div>
        <div class="tuesday">Tu</div>
        <div class="wednesday">We</div>
        <div class="thursday">Th</div>
        <div class="friday">Fr</div>
        <div class="saturday">Sa</div>
      </div>
      <ul class="days">
        <li v-on:click="dayNum = sunday.day; dayClicked = true; dateSet(sunday)" v-bind:key="sunday.day" v-bind:class="{'highlighted': sunday.day===currentDay && sunday.month===currentMonth && sunday.year===currentYear, 'sundayCol': true, 'rowOne': sunday.row === 1, 'rowTwo': sunday.row === 2, 'rowThree': sunday.row === 3, 'rowFour': sunday.row === 4, 'rowFive': sunday.row === 5, 'rowSix': sunday.row === 6}" v-for="sunday in sundays">{{sunday.day}}</li>
        <li v-on:click="dayNum = monday.day; dayClicked = true; dateSet(monday)" v-bind:key="monday.day" v-bind:class="{'highlighted': monday.day===currentDay && monday.month===currentMonth && monday.year===currentYear, 'mondayCol': true, 'rowOne': monday.row === 1, 'rowTwo': monday.row === 2, 'rowThree': monday.row === 3, 'rowFour': monday.row === 4, 'rowFive': monday.row === 5, 'rowSix': monday.row === 6}" v-for="monday in mondays">{{monday.day}}</li>
        <li v-on:click="dayNum = tuesday.day; dayClicked = true; dateSet(tuesday)" v-bind:key="tuesday.day" v-bind:class="{'highlighted': tuesday.day===currentDay && tuesday.month===currentMonth && tuesday.year===currentYear,'tuesdayCol': true, 'rowOne': tuesday.row === 1, 'rowTwo': tuesday.row === 2, 'rowThree': tuesday.row === 3, 'rowFour': tuesday.row === 4, 'rowFive': tuesday.row === 5, 'rowSix': tuesday.row === 6}" v-for="tuesday in tuesdays">{{tuesday.day}}</li>
        <li v-on:click="dayNum = wednesday.day; dayClicked = true; dateSet(wednesday)" v-bind:key="wednesday.day" v-bind:class="{'highlighted': wednesday.day===currentDay && wednesday.month===currentMonth && wednesday.year===currentYear, 'wednesdayCol': true, 'rowOne': wednesday.row === 1, 'rowTwo': wednesday.row === 2, 'rowThree': wednesday.row === 3, 'rowFour': wednesday.row === 4, 'rowFive': wednesday.row === 5, 'rowSix': wednesday.row === 6}" v-for="wednesday in wednesdays">{{wednesday.day}}</li>
        <li v-on:click="dayNum = thursday.day; dayClicked = true; dateSet(thursday)" v-bind:key="thursday.day" v-bind:class="{'highlighted': thursday.day===currentDay && thursday.month===currentMonth && thursday.year===currentYear,'thursdayCol': true, 'rowOne': thursday.row === 1, 'rowTwo': thursday.row === 2, 'rowThree': thursday.row === 3, 'rowFour': thursday.row === 4, 'rowFive': thursday.row === 5, 'rowSix': thursday.row === 6}" v-for="thursday in thursdays">{{thursday.day}}</li>
        <li v-on:click="dayNum = friday.day; dayClicked = true; dateSet(friday)" v-bind:key="friday.day" v-bind:class="{'highlighted': friday.day===currentDay && friday.month===currentMonth && friday.year===currentYear,'fridayCol': true, 'rowOne': friday.row === 1, 'rowTwo': friday.row === 2, 'rowThree': friday.row === 3, 'rowFour': friday.row === 4, 'rowFive': friday.row === 5, 'rowSix': friday.row === 6}" v-for="friday in fridays">{{friday.day}}</li>
        <li v-on:click="dayNum = saturday.day; dayClicked = true; dateSet(saturday)" v-bind:key="saturday.day" v-bind:class="{'highlighted': saturday.day===currentDay && saturday.month===currentMonth && saturday.year===currentYear,'saturdayCol': true, 'rowOne': saturday.row === 1, 'rowTwo': saturday.row === 2, 'rowThree': saturday.row === 3, 'rowFour': saturday.row === 4, 'rowFive': saturday.row === 5, 'rowSix': saturday.row === 6}" v-for="saturday in saturdays">{{saturday.day}}</li>
      </ul>
    </div>
    <button class="shiftEndSubmit" v-on:click="pickShift()" v-if="hours">Submit</button>
  </div>
</template>

<script>
import decimal from 'decimal'
export default {
  name: 'CalendarPicker',
  props: ['activeShift', 'calendar', 'hours', 'timeProp'],
  created () {
    let vue = this
    let time = new Date(vue.timeProp)
    vue.date = new Date(vue.timeProp)
    vue.year = time.getFullYear()
    vue.monthNum = time.getMonth()
    vue.currentYear = time.getFullYear()
    vue.currentMonth = time.getMonth()
    vue.currentDay = time.getDate()
    vue.time.year = time.getFullYear()
    vue.time.month = time.getMonth()
    vue.time.day = time.getDate()
    vue.currentStartingDay = vue.months[vue.monthNum].startingDay
    vue.monthCompute()
    vue.dayClear()
    vue.dayPopulate()
  },
  data () {
    return {
      months: [
        { monthNum: 0, month: 'January', days: 31, startingDay: 'monday' },
        { monthNum: 1, month: 'February', days: 28, startingDay: 'thursday' }, // 29
        { monthNum: 2, month: 'March', days: 31, startingDay: 'thursday' },
        { monthNum: 3, month: 'April', days: 30, startingDay: 'sunday' },
        { monthNum: 4, month: 'May', days: 31, startingDay: 'tuesday' },
        { monthNum: 5, month: 'June', days: 30, startingDay: 'friday' },
        { monthNum: 6, month: 'July', days: 31, startingDay: 'sunday' },
        { monthNum: 7, month: 'August', days: 31, startingDay: 'wednesday' },
        { monthNum: 8, month: 'September', days: 30, startingDay: 'saturday' },
        { monthNum: 9, month: 'October', days: 31, startingDay: 'monday' },
        { monthNum: 10, month: 'November', days: 30, startingDay: 'thursday' },
        { monthNum: 11, month: 'December', days: 31, startingDay: 'saturday' }],
      year: 0,
      date: '',
      month: '',
      monthNum: 0,
      dayNum: 0,
      currentMonth: '',
      currentDay: '',
      currentYear: '',
      currentStartingDay: '',
      mondays: [],
      tuesdays: [],
      wednesdays: [],
      thursdays: [],
      fridays: [],
      saturdays: [],
      sundays: [],
      modal: '',
      currentView: {
        year: 0,
        month: 0,
        monthString: '',
        day: 0
      },
      pickDay: '',
      freeTimes: true,
      time: {
        hour: '12',
        minute: '00'
      },
      meridian: 'am',
      style: ''
    }
  },
  methods: {
    dayPopulate () {
      let vue = this
      let i = 0
      let rowNum = 1
      let dayString = vue.months[vue.monthNum].startingDay
      for (i = 0; i < vue.months[vue.monthNum].days; i++) {
        let dayNum = i + 1
        if (dayString === 'sunday') {
          vue.sundays.push({ day: dayNum, row: rowNum, month: vue.monthNum, year: vue.year, dayString: 'monday' })
          dayString = 'monday'
        } else if (dayString === 'monday') {
          vue.mondays.push({ day: dayNum, row: rowNum, month: vue.monthNum, year: vue.year, dayString: 'tuesday' })
          dayString = 'tuesday'
        } else if (dayString === 'tuesday') {
          vue.tuesdays.push({ day: dayNum, row: rowNum, month: vue.monthNum, year: vue.year, dayString: 'wednesday' })
          dayString = 'wednesday'
        } else if (dayString === 'wednesday') {
          vue.wednesdays.push({ day: dayNum, row: rowNum, month: vue.monthNum, year: vue.year, dayString: 'thursday' })
          dayString = 'thursday'
        } else if (dayString === 'thursday') {
          vue.thursdays.push({ day: dayNum, row: rowNum, month: vue.monthNum, year: vue.year, dayString: 'friday' })
          dayString = 'friday'
        } else if (dayString === 'friday') {
          vue.fridays.push({ day: dayNum, row: rowNum, month: vue.monthNum, year: vue.year, dayString: 'saturday' })
          dayString = 'saturday'
        } else if (dayString === 'saturday') {
          vue.saturdays.push({ day: dayNum, row: rowNum, month: vue.monthNum, year: vue.year, dayString: 'sunday' })
          dayString = 'sunday'
          rowNum++
        }
      }
    },
    dayClear () {
      let vue = this
      vue.mondays = []
      vue.tuesdays = []
      vue.wednesdays = []
      vue.thursdays = []
      vue.fridays = []
      vue.saturdays = []
      vue.sundays = []
    },
    jump () {
      let vue = this
      vue.monthNum = vue.currentMonth
      vue.dayNum = vue.currentDay
      vue.yearNum = vue.currentYear
      this.months = [
        { monthNum: 0, month: 'January', days: 31, startingDay: 'monday' },
        { monthNum: 1, month: 'February', days: 28, startingDay: 'thursday' }, // 29
        { monthNum: 2, month: 'March', days: 31, startingDay: 'thursday' },
        { monthNum: 3, month: 'April', days: 30, startingDay: 'sunday' },
        { monthNum: 4, month: 'May', days: 31, startingDay: 'tuesday' },
        { monthNum: 5, month: 'June', days: 30, startingDay: 'friday' },
        { monthNum: 6, month: 'July', days: 31, startingDay: 'sunday' },
        { monthNum: 7, month: 'August', days: 31, startingDay: 'wednesday' },
        { monthNum: 8, month: 'September', days: 30, startingDay: 'saturday' },
        { monthNum: 9, month: 'October', days: 31, startingDay: 'monday' },
        { monthNum: 10, month: 'November', days: 30, startingDay: 'thursday' },
        { monthNum: 11, month: 'December', days: 31, startingDay: 'saturday' }]
      this.months[vue.monthNum].startingDay = this.currentStartingDay
      vue.monthCompute()
      vue.dayClear()
      vue.dayPopulate()
    },
    monthCompute () {
      let vue = this
      if (vue.monthNum === vue.months[0].monthNum) {
        vue.month = vue.months[0]
      } else if (vue.monthNum === vue.months[1].monthNum) {
        vue.month = vue.months[1]
      } else if (vue.monthNum === vue.months[2].monthNum) {
        vue.month = vue.months[2]
      } else if (vue.monthNum === vue.months[3].monthNum) {
        vue.month = vue.months[3]
      } else if (vue.monthNum === vue.months[4].monthNum) {
        vue.month = vue.months[4]
      } else if (vue.monthNum === vue.months[5].monthNum) {
        vue.month = vue.months[5]
      } else if (vue.monthNum === vue.months[6].monthNum) {
        vue.month = vue.months[6]
      } else if (vue.monthNum === vue.months[7].monthNum) {
        vue.month = vue.months[7]
      } else if (vue.monthNum === vue.months[8].monthNum) {
        vue.month = vue.months[8]
      } else if (vue.monthNum === vue.months[9].monthNum) {
        vue.month = vue.months[9]
      } else if (vue.monthNum === vue.months[10].monthNum) {
        vue.month = vue.months[10]
      } else if (vue.monthNum === vue.months[11].monthNum) {
        vue.month = vue.months[11]
      }
    },
    previous () {
      let vue = this
      if (vue.monthNum > 0) {
        vue.monthNum--
      } else if (vue.monthNum === 0) {
        vue.monthNum = 11
        let x = vue.year - 2000
        if (x % 4 === 0) {
          vue.months[1].days = 29
          vue.drift(true, false)
        } else {
          vue.months[1].days = 28
          vue.drift(false, false)
        }
        vue.year--
      }
      vue.monthCompute()
      vue.dayClear()
      vue.dayPopulate()
    },
    next () {
      let vue = this
      if (vue.monthNum < 11) {
        vue.monthNum++
      } else if (vue.monthNum === 11) {
        vue.monthNum = 0
        vue.year++
        let x = vue.year - 2000
        if (x % 4 === 0) {
          vue.months[1].days = 29
          vue.drift(true, true)
        } else {
          vue.months[1].days = 28
          vue.drift(false, true)
        }
      }
      vue.monthCompute()
      vue.dayClear()
      vue.dayPopulate()
    },
    drift (x, y) {
      let vue = this
      let i = 0
      for (i = 0; i < 12; i++) {
        if (vue.months[i].startingDay === 'monday') {
          if (y === true) {
            if (x === false || i < 2) {
              vue.months[i].startingDay = 'tuesday'
            } else if (x === true && i > 1) {
              vue.months[i].startingDay = 'wednesday'
            }
          } else if (y === false) {
            if (x === false || i < 2) {
              vue.months[i].startingDay = 'sunday'
            } else if (x === true && i > 1) {
              vue.months[i].startingDay = 'saturday'
            }
          }
        } else if (vue.months[i].startingDay === 'tuesday') {
          if (y === true) {
            if (x === false || i < 2) {
              vue.months[i].startingDay = 'wednesday'
            } else if (x === true && i > 1) {
              vue.months[i].startingDay = 'thursday'
            }
          } else if (y === false) {
            if (x === false || i < 2) {
              vue.months[i].startingDay = 'monday'
            } else if (x === true && i > 1) {
              vue.months[i].startingDay = 'sunday'
            }
          }
        } else if (vue.months[i].startingDay === 'wednesday') {
          if (y === true) {
            if (x === false || i < 2) {
              vue.months[i].startingDay = 'thursday'
            } else if (x === true && i > 1) {
              vue.months[i].startingDay = 'friday'
            }
          } else if (y === false) {
            if (x === false || i < 2) {
              vue.months[i].startingDay = 'tuesday'
            } else if (x === true && i > 1) {
              vue.months[i].startingDay = 'monday'
            }
          }
        } else if (vue.months[i].startingDay === 'thursday') {
          if (y === true) {
            if (x === false || i < 2) {
              vue.months[i].startingDay = 'friday'
            } else if (x === true && i > 1) {
              vue.months[i].startingDay = 'saturday'
            }
          } else if (y === false) {
            if (x === false || i < 2) {
              vue.months[i].startingDay = 'wednesday'
            } else if (x === true && i > 1) {
              vue.months[i].startingDay = 'tuesday'
            }
          }
        } else if (vue.months[i].startingDay === 'friday') {
          if (y === true) {
            if (x === false || i < 2) {
              vue.months[i].startingDay = 'saturday'
            } else if (x === true && i > 1) {
              vue.months[i].startingDay = 'sunday'
            }
          } else if (y === false) {
            if (x === false || i < 2) {
              vue.months[i].startingDay = 'thursday'
            } else if (x === true && i > 1) {
              vue.months[i].startingDay = 'wednesday'
            }
          }
        } else if (vue.months[i].startingDay === 'saturday') {
          if (y === true) {
            if (x === false || i < 2) {
              vue.months[i].startingDay = 'sunday'
            } else if (x === true && i > 1) {
              vue.months[i].startingDay = 'monday'
            }
          } else if (y === false) {
            if (x === false || i < 2) {
              vue.months[i].startingDay = 'friday'
            } else if (x === true && i > 1) {
              vue.months[i].startingDay = 'thursday'
            }
          }
        } else if (vue.months[i].startingDay === 'sunday') {
          if (y === true) {
            if (x === false || i < 2) {
              vue.months[i].startingDay = 'monday'
            } else if (x === true && i > 1) {
              vue.months[i].startingDay = 'tuesday'
            }
          } else if (y === false) {
            if (x === false || i < 2) {
              vue.months[i].startingDay = 'saturday'
            } else if (x === true && i > 1) {
              vue.months[i].startingDay = 'friday'
            }
          }
        }
      }
    },
    jumpTo () {
      let vue = this
      this.months = [
        { monthNum: 0, month: 'January', days: 31, startingDay: 'monday' },
        { monthNum: 1, month: 'February', days: 28, startingDay: 'thursday' }, // 29
        { monthNum: 2, month: 'March', days: 31, startingDay: 'thursday' },
        { monthNum: 3, month: 'April', days: 30, startingDay: 'sunday' },
        { monthNum: 4, month: 'May', days: 31, startingDay: 'tuesday' },
        { monthNum: 5, month: 'June', days: 30, startingDay: 'friday' },
        { monthNum: 6, month: 'July', days: 31, startingDay: 'sunday' },
        { monthNum: 7, month: 'August', days: 31, startingDay: 'wednesday' },
        { monthNum: 8, month: 'September', days: 30, startingDay: 'saturday' },
        { monthNum: 9, month: 'October', days: 31, startingDay: 'monday' },
        { monthNum: 10, month: 'November', days: 30, startingDay: 'thursday' },
        { monthNum: 11, month: 'December', days: 31, startingDay: 'saturday' }]
      this.monthNum = this.currentMonth
      this.year = this.currentYear
      this.dayNum = this.currentDay
      this.months[vue.monthNum].startingDay = this.currentStartingDay
      vue.monthCompute()
      vue.dayClear()
      vue.dayPopulate()
    },
    backDay () {
      let vue = this
      if (this.dayNum === 1) {
        vue.previous()
        this.dayNum = this.months[this.monthNum].days
      } else {
        this.dayNum--
      }
    },
    nextDay () {
      let vue = this
      if (this.dayNum === this.months[this.monthNum].days) {
        this.dayNum = 1
        vue.next()
      } else {
        this.dayNum++
      }
    },
    weekview () {
      this.weekviewShow = false
    },
    upcoming () {
      this.upcomingShow = false
    },
    weekView (object) {
      this.currentView.year = object.year
      this.currentView.month = object.month
      this.currentView.monthString = object.monthString
      this.currentView.day = object.day
      this.dayClicked = false
      this.weekviewShow = true
    },
    dayChange () {
      this.weekviewShow = false
      this.dayClicked = true
    },
    shiftStartEdit () {
      let vue = this
      vue.calendar = false
      vue.hours = true
    },
    dateSet (day) {
      let vue = this
      if (vue.calendar === true && vue.hours === true) {
        if (vue.meridian === 'am') {
          vue.date = new Date(day.year, day.month, day.day, vue.time.hour, vue.time.minute)
        } else {
          let hour = decimal(vue.time.hour).add(12).toNumber()
          vue.date = new Date(day.year, day.month, day.day, hour, vue.time.minute)
          console.log(vue.date)
        }
        vue.currentMonth = vue.date.getMonth()
        vue.currentDay = vue.date.getDate()
        vue.currentYear = vue.date.getFullYear()
      } else if (vue.calendar === true && vue.hours === false) {
        vue.date = new Date(day.year, day.month, day.day)
        vue.currentMonth = vue.date.getMonth()
        vue.currentDay = vue.date.getDate()
        vue.currentYear = vue.date.getFullYear()
        vue.$emit('pick', vue.date)
      }
    },
    pickShift () {
      let vue = this
      if (vue.meridian === 'am') {
        vue.date = new Date(vue.currentYear, vue.currentMonth, vue.currentDay, vue.time.hour, vue.time.minute)
      } else {
        let hour = decimal(vue.time.hour).add(12).toNumber()
        vue.date = new Date(vue.currentYear, vue.currentMonth, vue.currentDay, hour, vue.time.minute)
        console.log(vue.date)
      }
      vue.$emit('pick', vue.date)
    }
  }
}
</script>

<style scoped lang="less">
@blue: #14325C;
@grey: #323d38;
@blue-gray: #D7EFFF;
@font: 'Roboto', sans-serif;
@titlefont: 'Timmana', sans-serif;
.main1 {
  width: 50%;
  height: 50%;
  display: grid;
  position: relative;
  grid-template-rows: 9vh 5vh 21vh;
  grid-template-columns: 21vw;
}

.main2 {
  width: 100%;
  height: 100%;
  display: grid;
  position: relative;
  grid-template-rows: 9vh 5vh 21vh;
  grid-template-columns: 21vw;
}

h2 {
  font-size: 1em;
  color: #fff;
  margin-left: 5%;
}

button {
  border: none;
  background: linear-gradient(#2b5896, #14325C);
  font-size: 1em;
  color: white;
  height: 40px;
  text-align: center;
  width: 100%;
  box-shadow: 0px 1px 3px grey;
  align-self: center;
  justify-self: center;
}

button:active {
  background-color: @blue;
  color: white;
  box-shadow: none;
}

p {
  grid-row: 11;
  text-align: center;
  color: #777;
  grid-column-start: 1;
  grid-column-end: 8;
}

.view {
  grid-column: 5;
  background: #fff;
}

.calendar {
  grid-column-start: 1;
  grid-column-end: 8;
  grid-row-start: 2;
  grid-row-end: 2;
  display: grid;
  grid-template-rows: 9vh 3vh 23vh;
  grid-template-columns: 1fr;
}

.hours {
  grid-column: 1;
  grid-row: 1;
  font-size: 2em;
  text-align: center;
}

.time {
}

.hour {
}

.minute {
}

.ampm {
}

.am {
}

.pm {
}

.month {
  width: 100%;
  height: 60%;
  background: transparent;
  color: @blue;
  text-align: center;
  position: relative;
  grid-column: 1;
  grid-row: 1;
  display: grid;
  grid-template-columns: repeat(5, 20fr);
  grid-template-rows: 5vh 4vh;
  margin-bottom: 0px;
}

.monthName {
  font-weight: bold;
  position: relative;
  font-size: 2em;
  color: @blue;
  grid-column-start: 1;
  grid-column-end: 6;
  grid-row: 1;
  align-self: center;
}

/* Month list */
.month ul {
  margin: 0;
  padding: 0;
}

.month ul li {
  margin: 5px;
  color: white;
  font-size: 20px;
  text-transform: uppercase;
  letter-spacing: 3px;
}

.year {
  color: @blue;
  grid-column: 3;
  grid-row: 2;
  font-size: 1.5em;
  line-height: 4vh;
}

.month .prev, .month .next {
  grid-row: 2;
  font-size: 1.5em;
  align-self: end;
}

/* Previous button inside month header */
.month .prev {
  color: @blue;
  grid-column: 2;
  grid-row: 2;
}

/* Next button */
.month .next {
  color: @blue;
  grid-column: 4;
  grid-row: 2;
}

.newAppointment, .list, .jumpToMonth {
  background: none;
  grid-row: 1;
  color: @blue;
  height: 8vh;
  align-self: center;
  justify-self: center;
}

.newAppointment {
  grid-column: 1;
}

.list {
  grid-column: 2;
}

.jumpToMonth {
  grid-row: 2;
  grid-column: 5;
  background-color: white;
}

/* Weekdays (Mon-Sun) */
.weekdays {
  height: 100%;
  grid-column:1;
  grid-row: 2;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: 3vh;
}

.weekdays li {
  color: @blue;
}

/* Days (1-31) */
.days {
  border: 1px solid grey;
  padding: 0;
  background: #fff;
  margin: 0;
  width: 100%;
  height: 100%;
  grid-column-start: 1;
  grid-column-end: 8;
  grid-row: 3;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

.title {
  display: none;
  grid-column-start: 4;
  grid-column-end: 6;
  grid-row: 1;
  font-size: 1.5em;
}

.sunday, .monday, .tuesday, .wednesday, .thursday, .friday, .saturday {
  grid-row: 1;
  text-align: center;
  color: black;
  font-size: 1em;
  align-self: end;
}

.sunday {
  grid-column: 1;
}

.monday {
  grid-column: 2;
}

.tuesday {
  grid-column: 3;
}

.wednesday {
  grid-column: 4;
}

.thursday {
  grid-column: 5;
}

.friday {
  grid-column: 6;
}

.saturday {
  grid-column: 7;
}

.sundayCol, .mondayCol, .tuesdayCol, .wednesdayCol, .thursdayCol, .fridayCol, .saturdayCol,  {
  width: 100%;
  text-align: center;
  font-size: 1em;
  border: 1px solid grey;
}

.sundayCol {
  grid-column: 1;
}

.mondayCol {
  grid-column: 2;
}

.tuesdayCol {
  grid-column: 3;
}

.wednesdayCol {
  grid-column: 4;
}

.thursdayCol {
  grid-column: 5;
}

.fridayCol {
  grid-column: 6;
}

.saturdayCol {
  grid-column: 7;
}

.rowOne {
  grid-row: 1;
}

.rowTwo {
  grid-row: 2;
}

.rowThree {
  grid-row: 3;
}

.rowFour {
  grid-row: 4;
}

.rowFive {
  grid-row: 5;
}

.rowSix {
  grid-row: 6;
  border: 1px solid grey;
}

.highlighted {
  background: @blue-gray;
}

.days li {
    list-style-type: none;
    text-align: center;
    color:#666;
}

.options {
  width: 100%;
  grid-row: 2;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 10vh;
  background-color: white;
  align-self: center;
}

/* Highlight the "current" day */
.days li .active {
    padding: 5px;
    background: #f4c20d;
    color: white !important
}

.colorCode {
  border: 5px;
}

.hidden {
  display: none;
}

.day {
  overflow-y: scroll;
  position: absolute;
  width: 100%;
  height: 100%;
}

.weekView {
  margin-top: 0px;
}

.monthview, .appts {
  color: #fff;
  font-size: 1em;
}

</style>
