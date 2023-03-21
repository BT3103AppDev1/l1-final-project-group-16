<template>
  <div>
    <NavigationBar/>
  </div>
  <div class="save">
      <button id="saveButton" type="button" v-on:click="addNewFood">Add New Food</button><br><br>
  </div>







</template>

<script>
import NavigationBar from "@/components/NavigationBar.vue"

export default {
    name:"FoodLogPage" ,
    data() {
      return {
        foodName: null, 
        mealType: null,
        numServings: null,
      };
    },
    components : {
        NavigationBar,
    },

    methods: {
      addNewFood() {
        this.$router.push('/AddFoodPage');
      }
    }
}
</script>