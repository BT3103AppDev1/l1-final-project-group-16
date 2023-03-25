<script>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'

export default {
  components: {
    FullCalendar // make the <FullCalendar> tag available
  },
  data: function() {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin],
        initialView: 'dayGridMonth',
        weekends: true,
        // events: [
        //   { title: 'Meeting', start: new Date() }
        // ]
      }
    }
  },
  mounted() {
    this.calendar = new Calendar(this.$el, this.calendarOptions);
    this.calendar.render();
  },
  beforeDestroy() {
    this.calendar.destroy();
  },
}
</script>

<template>
  <FullCalendar :options='calendarOptions' />
</template>