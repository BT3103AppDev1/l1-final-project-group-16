<template>
  <div class="meal-header">
    <p> {{ meal }} - {{ calories }} Calories</p>
  </div>
</template>

<script>
export default {
  props: {
    calories: Number,
    meal: String
  }
}
</script>

<style scoped>
.meal-header {
  background-color: lightsteelblue;
  margin-bottom: 20px;
  font-size: 25px;
  max-width: 95%;
  margin: 0 auto;
}
</style>