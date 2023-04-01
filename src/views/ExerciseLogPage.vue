<template>
  <div>
    <NavigationBar/>
  
    <div class="save">
      <button class="addButton"  v-on:click="addNewExer">
        <div class="button-content">
        <img class="plusimage" src="src/assets/images/greenadd.png"  id="saveButton" >
        <span class="button-text"> Add New Exercise</span>
        </div>
        </button>
          
      <br><br>
    </div>

    <p class="exercise-header">Exercise - {{ cal }} calories</p>
    <ExerCard :exercise="exercise" v-for="(exercise, index) in exerciseData" :key="index"/>



  </div>

</template>


<script>
import NavigationBar from "@/components/NavigationBar.vue";
import ExerCard from "@/components/ExerCard.vue";
import AddExerPage from "@/views/AddExerPage.vue";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import firebaseApp from "@/firebase.js";
import { getFirestore, collection, getDoc, getDocs, query, where, doc} from 'firebase/firestore';
import MealHeader from '@/components/MealHeader.vue';
let currEmail=  "";


export default {
    name:"ExerciseLog" ,
    data() {
      return {
      exerciseData: [],
      exerName: null, 
      numCalories: null, 
      duration: 0,
      cal: 0,
      };
    },
  
    components : {
        NavigationBar,
        ExerCard,
    },

    created() {
      this.exerciseData = [];
      this.retrieveExer();
    },

    methods: {
      addNewExer() {
        this.$router.push('/AddExerPage');
      },

    // totalCalories() {
    //   let sum = 0;
    //   for (let i = 0; i < this.exerciseData.length; i++) {
    //     sum += this.exerciseData[i].numCalories * this.exerciseData[i].duration;
    //   }
    //   this.cal = sum;
    //   console.log(this.exerciseData[0].date);
    // },

      async retrieveExer() {
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
            const exerRef = collection(getFirestore(), "Exercises");
            console.log(exerRef);
            const q = query(exerRef, where("email", "==", userEmail), where("date","==", today));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
              this.exerciseData.push(doc.data());
            });
  
          }
          // get the total calories
          let total = 0;
          length = this.exerciseData.length;
          for (let i = 0; i < length; i++) {
            let cal = this.exerciseData[i].numCalories
            let dur = this.exerciseData[i].duration
            total += cal * dur;
          }
          this.cal = total;


        });
      }
    }
  }

        
      
    
    

</script>


<style scoped>
button{
  margin-top: 20px;
}
.button-content { 
  margin-top: 8px;
  display: block;
}

.button-text{
  margin-left: 4px;
  justify-content: center;
  display:flexbox;
  font-weight:600;
  font-size: 22px;
}

.save {
  display: flex;
  justify-content: center;
  height: 10vh;
}

.plusimage {
  background-color: greenyellow;
  color: black;
  font-size: 30px;
  border-radius: 30px;
  width: 6vh;
  height: 6vh;
  margin-top: -10px;
  justify-content: center;
  align-items: center;
  display: flexbox;
  margin-right: 5px;

}


.exercise-header {
  background-color: rgb(135, 187, 255);
  font-size: 25px;
  max-width: 95%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  display: flex;
  margin-bottom: 25px;
  box-shadow: 2px px 6px rgba(121, 124, 126, 0.3);
  margin-top: 10px;

}

</style>