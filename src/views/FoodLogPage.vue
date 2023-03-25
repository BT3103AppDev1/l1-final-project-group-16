<template>
  <div>
    <NavigationBar/>
    <div class="save">
      <button id="saveButton" type="button" v-on:click="addNewFood">Add New Food</button><br><br>
  </div>
  </div>
  <!-- <div v-if="sampleFoodCard.length > 0">
    <FoodCard :card="card" v-for="(card, index) in foods" :key="index"/>
  </div> -->
  <!-- <div v-else class="noFoodAdded">
      <p>You have not added any food!</p>
  </div> -->
  <FoodCard :food="food" v-for="(food, index) in foods" :key="index"/>

  

</template>

<script>
import NavigationBar from "@/components/NavigationBar.vue";
import FoodCard from "@/components/FoodCard.vue";
import AddFoodPage from "@/views/AddFoodPage.vue";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import firebaseApp from "@/firebase.js";
import { getFirestore, collection, getDoc, getDocs, query, where, doc} from 'firebase/firestore';
let currEmail=  "";

export default {
    name:"FoodLogPage" ,
    data() {
      return {
        foodName: null, 
        mealType: null,
        numServings: null,
        foods: [],
        food: {
          FoodName: null, 
          numServings: null, 
          numCalories: null, 
        }
      };
    },
    components : {
        NavigationBar,
        FoodCard
    },

    created() {
      this.foods = [];
      this.retrieveFood();
    },

    methods: {
      addNewFood() {
        this.$router.push('/AddFoodPage');

      },

      async retrieveFood() {
        const auth = getAuth();

        const currentUser = auth.currentUser;
        if (!currentUser) {
        // User not logged in
          return;
        }

        const userEmail = currentUser.email;
        const current = new Date();
        const today = `${current.getDate()}-${current.getMonth()+1}-${current.getFullYear()}`;
        // console.log(today);
        console.log(currEmail);
        const mealsRef = collection(getFirestore(), "Meals");
        const q = query(mealsRef, where("email", "==", userEmail), where("date","==", today));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, " => ", doc.data().foodName);

          this.foods.push(doc.data());

        });
      }

        
  
   
    }
}
</script>