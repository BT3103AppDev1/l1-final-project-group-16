<template>
  <div class="calendarComponent">
    <FullCalendar 
      ref="calendar"
      :options="calendarOptions"/><br>
      <button v-on:click="logSelectedDate">Enter</button>
  </div>
</template>
<script>
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Calendar } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';

export default {
  components: {
    FullCalendar 
  },
  data() {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin],
        initialView: 'dayGridMonth',
        weekends: true,
        select: this.handleDateSelect,
        headerToolbar: {
          left: '',
          center: 'title',
          right: 'prev,next',
        },
        selectable: true,
      },
      selectedDate: null,
      date: new Date().toLocaleDateString(),
    }
  },
  methods: {
    handleDateSelect(info) {
      let dateSelected = info.startStr
      this.selectedDate = dateSelected
      // console.log(this.selectedDate)
    },
    logSelectedDate() {
      this.date = this.selectedDate;
      console.log(this.date);
    }
  }
}
</script> 

<style>
  button {
    background-color: rgb(126, 216, 87); /* change the background color of the button to lime green */
    border-radius: 10px; /* make the edges of the button rounded */
    border: 2px solid rgb(126, 216, 87); /* add a lime green border to the button */
    padding: 10px 50px; /* add some padding to the button */
    color: white;
  }
</style>