<template>
  <FullCalendar 
    ref="calendar"
    :options="calendarOptions"
    @dateClick="handleDateClick"/>
</template>

<script>
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Calendar } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';

export default {
  components: {
    FullCalendar // make the <FullCalendar> tag available
  },
  data: function() {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin],
        initialView: 'dayGridMonth',
        weekends: true,
        headerToolbar: {
          left: '',
          center: 'title',
          right: 'prev,next',
        },
        selectable: true,
      }
    }
  },
  mounted() {
    this.calendar = new Calendar(this.$el, this.calendarOptions);
    this.calendar.render();
  },
  methods: {
    handleDateClick(info) {
      const dateStr = info.dateStr;
      const dataDate = info.el.getAttribute('data-date');
      console.log('Clicked on: ' + dataDate);
      this.$router.push({ name: 'HomePage', query: { date: dateStr } });
    }
  }
}
</script>
