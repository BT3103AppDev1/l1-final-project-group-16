<template> 
    <div>
      <NavigationBar/>
      <div class="calendar-wrapper">
        <FullCalendar class="calendar-container" :dateClick="handleDateClick"/>
      </div>
      <!-- <full-calendar :plugins="calendarPlugins" :initialView="'dayGridMonth'"/> -->
    </div>
  </template>
    
  <script>
  import NavigationBar from "@/components/NavigationBar.vue";
  import FullCalendar from "@/components/FullCalendar.vue";
//   import dayGridPlugin from "@fullcalendar/daygrid";
//   import "@fullcalendar/common/main.css";
//   import "@fullcalendar/daygrid/main.css";
  
  export default {
    name: "CalendarPage",
    components: {
      NavigationBar,
      FullCalendar,
    },
    methods: {
        handleDateClick(info) {
        // info.date is the clicked date
        this.$router.push({ path: "/HomePage" }); 
        }
    },
    data() {
      return {
        // calendarPlugins: [dayGridPlugin],
      };
    },
  };
  </script>
  
<style>
.calendar-wrapper {
  display: flex;
  justify-content: center;
  margin: 0 auto;
  width: 100%;
}

.calendar-container {
  width: 60%;
  height: auto;
  background-color: white;
  font-family: Avenir, Helvetica, Arial, sans-serif;}

</style>