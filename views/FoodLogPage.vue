<template>
  <div>
    <NavigationBar/>
    <div class="save">
      <button id="saveButton" type="button" v-on:click="addNewFood">Add New Food</button><br><br>
  </div>
  </div>
  <div v-if="sampleFoodCard.length > 0">
    <FoodCard :card="card" v-for="(card, index) in sampleFoodCard" :key="index"/>
  </div>
  <div v-else class="noFoodAdded">
      <p>You have not added any food!</p>
  </div>


</template>

<script>
import NavigationBar from "@/components/NavigationBar.vue";
import FoodCard from "@/components/FoodCard.vue";
import AddFoodPage from "@/views/AddFoodPage.vue";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import firebaseApp from "@/firebase.js";

export default {
    name:"FoodLogPage" ,
    data() {
      return {
        foodName: null, 
        mealType: null,
        numServings: null,
        sampleFoodCard: [
          {
            FoodName: "CheeseBurger",
            numServings: 2, 
            Calories: 574
          },
          {
            FoodName: "Laksa",
            numServings: 1, 
            Calories: 233
          }
        ]
      };
    },
    components : {
        NavigationBar,
        FoodCard
    },

    methods: {
      addNewFood() {
        this.$router.push('/AddFoodPage');

      },
   
    }
}
</script>