<template> 
    <div>
      <NavigationBar/>
      <div class="calendar-wrapper">
        <FullCalendar class="calendar-container" />
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
}
</style>