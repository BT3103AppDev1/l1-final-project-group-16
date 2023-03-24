<template>
  <div>
    <NavigationBar/>
    <div class="save">
      <button id="saveButton" type="button" v-on:click="addNewEx">Add New Exercise</button><br><br>
  </div>
  </div>
  <div v-if="sampleFoodCard.length > 0">
    <FoodCard :card="card" v-for="(card, index) in sampleFoodCard" :key="index"/>
  </div>
  <div v-else class="noExerAdded">
      <p>You have not added any Exercise!</p>
  </div>


</template>

<script>
import NavigationBar from "@/components/NavigationBar.vue";
import ExerCard from "@/components/ExerCard.vue";
import AddExerPage from "@/views/AddExerPage.vue";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import firebaseApp from "@/firebase.js";

export default {
    name:"ExerciseLogPage" ,
    data() {
      return {
        foodName: null, 
        mealType: null,
        numServings: null,
        sampleFoodCard: [
          {
            ExerName: "CheeseBurger",
            duration: 2, 
            Calories: 574
          },
          {
            ExerName: "Laksa",
            duration: 1, 
            Calories: 233
          }
        ]
      };
    },
    components : {
        NavigationBar,
        ExerCard
    },

    methods: {
      addNewEx() {
        this.$router.push('/AddExerPage');

      },
   
    }
}
</script>