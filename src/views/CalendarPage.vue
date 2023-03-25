<template> 
  <div>
    <NavigationBar/>
    <div class="calendar-wrapper">
      <FullCalendar class="calendar-container" :dateClick="handleDateClick"/>
    </div>
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
margin: 40px auto 0 auto;
width: 100%;
}

.calendar-container {
width: 60%;
height: 50%;
background-color: white;
font-family: Avenir, Helvetica, Arial, sans-serif;
}

.fc-daygrid-day-number, .fc-col-header-cell-cushion {
  color: rgb(19, 3, 53);
  text-decoration: none;
}
</style>