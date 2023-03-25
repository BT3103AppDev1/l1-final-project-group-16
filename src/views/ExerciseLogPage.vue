<template>
  <div>
    <NavigationBar/>
    <div class="save">
      <button id="saveButton" type="button" v-on:click="addNewExer">Add New Exercise</button><br><br>
  </div>
  </div>

  <ExerCard :exercise="exercise" v-for="(exercise, index) in exercises" :key="index"/>

  

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
        exercises: [],
        exercise: {
          ExerName: null, 
          duration: null, 
          numCalories: null, 
        }
      };
    },
    components : {
        NavigationBar,
        ExerCard
    },

    created() {
      this.exercises = [];
      this.retrieveExercises();
    },

    methods: {
      addNewExer() {
        this.$router.push('/AddExerPage');

      },

      async retrieveExercises() {
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
        const mealsRef = collection(getFirestore(), "Exercises");
        const q = query(mealsRef, where("email", "==", userEmail), where("date","==", today));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, " => ", doc.data().foodName);

          this.exercises.push(doc.data());

        });
      }

        
  
   
    }
}
</script>