<template>
  <div>
    <NavigationBar/>
    <div class="save">
      <button id="saveButton" type="button" v-on:click="addNewFood" class="my-button">Add New Food</button><br><br>
    </div>

    <meal-header :calories="breakfastCalories" meal="Breakfast" mealSrc="mealSource"/>
    <FoodCard :food="food" v-for="(food, index) in breakfastFoods" :key="index" :isEmpty="breakfastIsEmpty"/>
    <template v-if="breakfastCalories === 0">
      <div class = "noteaten">You have not eaten breakfast :(</div>
    </template>

    <meal-header :calories="lunchCalories" meal="Lunch"/>
    <FoodCard :food="food" v-for="(food, index) in lunchFoods" :key="index"/>
    <template v-if="lunchCalories === 0">
      <div class = "noteaten">You have not eaten lunch :(</div>
    </template>

    <meal-header :calories="dinnerCalories" meal="Dinner"/>
    <FoodCard :food="food" v-for="(food, index) in dinnerFoods" :key="index"/>
    <template v-if="dinnerCalories === 0">
      <div class = "noteaten">You have not eaten dinner :(</div>
    </template>

    <meal-header :calories="snacksCalories" meal="Snacks"/>
    <FoodCard :food="food" v-for="(food, index) in snacksFoods" :key="index"/>
    <template v-if="snacksCalories === 0">
      <div class = "noteaten">You have not eaten any snacks :)</div>
    </template>

  </div>

</template>


<script>
import NavigationBar from "@/components/NavigationBar.vue";
import FoodCard from "@/components/FoodCard.vue";
import AddFoodPage from "@/views/AddFoodPage.vue";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import firebaseApp from "@/firebase.js";
import { getFirestore, collection, getDoc, getDocs, query, where, doc} from 'firebase/firestore';
import MealHeader from '@/components/MealHeader.vue';
let currEmail=  "";


export default {
    name:"FoodLogPage" ,
    data() {
      return {
      foodData: [],
      };
    },

    computed: {

    breakfastIsEmpty() {
    return this.breakfastFoods.length === 0;
  },
  lunchIsEmpty() {
    return this.lunchFoods.length === 0;
  },
  dinnerIsEmpty() {
    return this.dinnerFoods.length === 0;
  },
  snacksIsEmpty() {
    return this.snacksFoods.length === 0;
  },

    
     totalCalories() {
    let sum = 0;
    for (let i = 0; i < this.foodData.length; i++) {
      sum += this.foodData[i].numCalories * this.foodData[i].numServings;
    }
    return sum;
  },

    breakfastFoods() {
      return this.foodData.filter((food) => food.mealType === "Breakfast");
    },
    breakfastCalories() {
      return this.breakfastFoods.reduce(
        (total, food) => total + food.numCalories * food.numServings,
        0
      );
    },

    lunchFoods() {
      return this.foodData.filter((food) => food.mealType === "Lunch");
    },
    lunchCalories() {
      return this.lunchFoods.reduce(
        (total, food) => total + food.numCalories * food.numServings,
        0
      );
    },

    dinnerFoods() {
      return this.foodData.filter((food) => food.mealType === "Dinner");
    },
    dinnerCalories() {
      return this.dinnerFoods.reduce(
        (total, food) => total + food.numCalories * food.numServings,
        0
      );
    },

    snacksFoods() {
      return this.foodData.filter((food) => food.mealType === "Snacks");
    },
    snacksCalories() {
      return this.snacksFoods.reduce(
        (total, food) => total + food.numCalories * food.numServings,
        0
      );
    },
  },
  
    components : {
        NavigationBar,
        FoodCard,
        MealHeader
    },

    created() {
      this.foodData = [];
      this.retrieveFood();
    },

    methods: {
      addNewFood() {
        this.$router.push('/AddFoodPage');
      },

      async retrieveFood() {
        const auth = getAuth();
        let userEmail;
        onAuthStateChanged(auth, async (user) => {
          console.log("Auth state changed:", user);
          if (user) {
            userEmail = user.email;
            console.log("Current user email:", userEmail);
            const current = new Date();
            const yyyy = current.getFullYear();
            let mm = current.getMonth() + 1; // Months start at 0!
            let dd = current.getDate();
            if (dd < 10) dd = '0' + dd;
            if (mm < 10) mm = '0' + mm;
            const today = dd + '-' + mm + '-' + yyyy;
            // console.log(today);
            const mealsRef = collection(getFirestore(), "Meals");
            console.log(mealsRef);
            const q = query(mealsRef, where("email", "==", userEmail), where("date","==", today));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
              this.foodData.push(doc.data());
            });
  
          }
        });
      }
    }
  }

        
      
    
    

</script>


<style>

.save {
  display: flex;
  justify-content: center;
  height: 10vh;
}

.my-button {
  background-color: greenyellow;
  color: black;
  font-size: 30px;
  border-radius: 30px;
  width: 280px;
  height: 70px;
  margin-top: 30px;
  border:3px solid black;
}

.noteaten {
  font-size: 30px;
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  color: black;
  border-radius: 50px;
  background-color: rgb(196, 247, 198);
  align-items: center;
  margin-left: 5%;
  margin-right: 5%;
  box-shadow: 2px 2px 6px rgba(154, 244, 154, 0.3);
  height: 100px;
}

</style>