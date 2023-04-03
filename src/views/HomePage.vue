<template>
  <NavigationBar/>
  <div class="homePageContainer1">
      <div class="childContainer1">
          <div class="calendar">
              <ul>
                  <router-link to="/CalendarPage">
                  <img src="@/assets/images/HomePageElements/Calender.png" class="calendar">
                  </router-link>
              </ul>    
          </div>
      </div>
      <div class="childContainer1">
           <div class="homePageDate">
              <h1 v-if="this.todayDate === this.date">TODAY'S SUMMARY</h1>
              <h1 v-else>{{ this.date }} SUMMARY</h1>
          </div> 
      </div>
  </div>
  <div class="homePageContainer2">
    <img src="@/assets/images/CommonElements/HappyPlatesLogo.png" alt="HP Logo" style="width: 300px; height: auto">
  </div>
  <div class="homePageContainer3">
      <!-- 4 tables side by side -->
  <div class="homepagetable1">
    <table id = "displayCalorieTable">
      <tr>
      <th>Meal</th>
      <th>Calories</th>
    </tr>
    
    <tr>
      <td style="background-image: url('src/assets/images/MealIcons/Breakfast.png'); background-size: cover;"></td>
      <td>{{ this.breakfastCal }} CALS</td>
    </tr>
    
    <tr>
      <td style="background-image: url('src/assets/images/MealIcons/Lunch.png'); background-size: cover;"></td>
      <td>{{ this.lunchCal }} CALS</td>
    </tr>
    
    <tr>
      <td style="background-image: url('src/assets/images/MealIcons/Dinner.png'); background-size: cover;"></td>
      <td>{{ this.dinnerCal }} CALS</td>
    </tr>
    
    <tr>
      <td style="background-image: url('src/assets/images/MealIcons/Snacks.png'); background-size: cover;"></td>
      <td>{{ this.snacksCal }} CALS</td>
    </tr>
  
  </table>
  </div>
  
  <div class="homepagetable2">  
    <table id = "displayCalorieBurntTable">
      <div class = calorieBurntIcon>
        <img src="@/assets/images/HomePageElements/Calories.png" style="width: 100px; height: auto">
        <h2 style="font-weight: bold; font-size: 35px;"> Calories Burnt </h2>
      </div>
      <br><br><br><br><br>
      <h2>{{ this.caloriesBurnt }} CAL</h2>
  </table>
  </div>
  
  <div class="homepagetable3">
    <table id = "displayNetCalorieTable">
      <div class = netCalorieIcon>
        <img src="@/assets/images/HomePageElements/Streaks.png" style="width: 100px; height: auto">
        <h2 style="color:#FF5712;font-weight: bold; font-size: 35px;"> Net Calorie Intake </h2>
      </div>
      <br><br><br><br><br>
      <h2>{{ this.caloriesNet }} CAL</h2>
  </table>
  </div>
  
  <div class="homepagetable4">
    <table id = "displayGoalTable">
      <br>
      <div class = "goalIcon">
        <img src="@/assets/images/HomePageElements/Target.png" style="width: 100px; height: auto">
        <h2 style="color:#FF5712;font-weight: bold; font-size: 35px;"> Goal </h2>
      </div>
      <tr>
        <td>
          <ProgressBar v-bind:prog-val="myProgress" v-bind:col-flag="flag" :key="keyValue"/>
        </td>
      </tr>
  </table>
  </div>
  </div>
</template>
  
<script>

import NavigationBar from "@/components/NavigationBar.vue"
import ProgressBar from "@/components/ProgressBar.vue"

import fireBaseApp from "../firebase";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { getFirestore, collection, getDoc, getDocs, query, where, doc} from 'firebase/firestore';

export default {
  mounted() {

  },
  created() {
    if (this.$route.query.updatedDate) {
      this.date = this.$route.query.updatedDate;
      console.log(this.date)
    }
  const breakfastCalPromise = this.updateMealCal('Breakfast');
  const lunchCalPromise = this.updateMealCal('Lunch');
  const dinnerCalPromise = this.updateMealCal('Dinner');
  const snacksCalPromise = this.updateMealCal('Snacks');
  const calBurntPromise = this.updateCalBurnt();
  const calorieGoal = this.calorieGoal();
  Promise.all([breakfastCalPromise, lunchCalPromise, dinnerCalPromise, snacksCalPromise, calBurntPromise, calorieGoal])
    .then((values) => {
      const netCalorie = values[0] + values[1] + values[2] + values[3] - values[4];
      this.caloriesNet = netCalorie;
      console.log("Total calories for Breakfast:", values[0]);
      console.log("Total calories for Lunch:", values[1]);
      console.log("Total calories for Dinner:", values[2]);
      console.log("Total calories for Snacks:", values[3]);
      console.log("Total calories burnt:", values[4]);
      console.log("Net calories intake:", netCalorie);
      const targetGoal = values[5]
      const progressValue = Math.ceil(netCalorie/targetGoal * 100)
      if (progressValue >= 0){
        this.myProgress = progressValue;
        console.log("Progress %:", progressValue)
      }
      if (new Date().toLocaleDateString().replaceAll("/","-") != this.date) {
        console.log("PAST DATE")
        this.flag = false
      }
      this.keyValue += 1
    })
    .catch((error) => {
      console.error("Error updating calories:", error);
    });
  },
  data() {
    return {
      user: null, 
      date: new Date().toLocaleDateString().replaceAll("/","-"),
      todayDate: new Date().toLocaleDateString().replaceAll("/","-"), 
      breakfastCal: 0,
      lunchCal: 0,
      dinnerCal: 0,
      snacksCal: 0,
      caloriesBurnt: 0,
      caloriesNet: 0,
      myProgress: 0,
      flag : true,
      keyValue: 1
      }; 
  }
  ,
  methods: {
    async calorieGoal() {
      return new Promise(async (resole, reject) => {
        const auth = getAuth();
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            // steps to retrieve from questionnaire
            resole(1800);
          } else {
            reject("User not authenticated.");
          }
        }
        )
      })
    },

    async updateCalBurnt() {
      return new Promise(async (resolve, reject) => {
        var totalCalorieBurnt = 0;
        const auth = getAuth();
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            const queryDate = this.date
            const exercisesCollection = collection(getFirestore(), "Exercises");
            const exerciseQuery = query(
              exercisesCollection,
              where("email", "==", this.useremail),
              where("date", "==", queryDate)
            );
            const querySnapshot = await getDocs(exerciseQuery);
            querySnapshot.forEach((doc) => {
              const docdata = doc.data();
              const dur = docdata.duration;
              const calorie = docdata.numCalories;
              const caloriesBurnt = calorie * dur
              totalCalorieBurnt += caloriesBurnt
              this.caloriesBurnt = totalCalorieBurnt;
            })
            resolve(totalCalorieBurnt);
          } else {
            reject("User not authenticated.");
          }
        })
      });
    },
    async updateMealCal(mealType) {
      return new Promise(async (resolve, reject) => {
        const auth = getAuth();
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            this.useremail = user.email;
            const queryDate = this.date;
            const mealsCollection = collection(getFirestore(), "Meals");
            const mealQuery = query(
              mealsCollection,
              where("email", "==", this.useremail),
              where("date", "==", queryDate),
              where("mealType", "==", mealType)
            );
            const querySnapshot = await getDocs(mealQuery);
            var totalMealCalorie = 0;
            querySnapshot.forEach((doc) => {
              const docdata = doc.data();
              const nCal = docdata.numCalories;
              const nSer = docdata.numServings;
              var totalCal = nCal * nSer;
              totalMealCalorie += totalCal;
            });
            if (mealType === 'Breakfast') {
              this.breakfastCal = totalMealCalorie;
            } else if (mealType === 'Lunch') {
              this.lunchCal = totalMealCalorie;
            } else if (mealType === 'Dinner') {
              this.dinnerCal = totalMealCalorie;
            } else if (mealType === 'Snacks') {
              this.snacksCal = totalMealCalorie;
            }
            resolve(totalMealCalorie);
          } else {
            reject("User not authenticated.");
          }
        });
      });
    },
    // async updateMealCal(mealType) {
    //   const auth = getAuth();
    //   onAuthStateChanged(auth, async (user) => {
    //     if (user) {
    //       this.useremail = user.email;
    //       const queryDate = this.date
    //       const mealsCollection = collection(getFirestore(), "Meals");
    //       const mealQuery = query(
    //         mealsCollection,
    //         where("email", "==", this.useremail),
    //         where("date", "==", queryDate),
    //         where("mealType", "==", mealType)
    //       );
    //       const querySnapshot = await getDocs(mealQuery);
    //       var totalMealCalorie = 0;
    //       querySnapshot.forEach((doc) => {
    //         const docdata = doc.data();
    //         const nCal = docdata.numCalories;
    //         const nSer = docdata.numServings;
    //         var totalCal = nCal * nSer;
    //         totalMealCalorie += totalCal;
    //       });
    //       if (mealType === 'Breakfast') {
    //         this.breakfastCal = totalMealCalorie;
    //         return totalMealCalorie
    //       } else if (mealType === 'Lunch') {
    //         this.lunchCal = totalMealCalorie;
    //       } else if (mealType === 'Dinner') {
    //         this.dinnerCal = totalMealCalorie;
    //       } else if (mealType === 'Snacks') {
    //         this.snacksCal = totalMealCalorie;
    //       }
    //       }
    //   });
    // }
  },
  name:"HomePage" ,
  components : {
      NavigationBar,
      ProgressBar,
  },
}
</script>

<style scoped>
.goalIcon {
 display: grid;
 align-items: center; 
 justify-content: center;
 grid-template-columns: 0fr 0fr 0fr;
}

.homePageDate h1 {
  font-size: 50px;
}

.homePageDate{
  text-align: center;
}
.calendar {
width: 160px;
height: 120px; 
}

.homePageContainer3{
  margin: auto;
  width: 90%;
  height: 400px;
  background-color:white;
  border-radius: 30px;
  padding: 10px;
}

.homepagetable1,
.homepagetable2,
.homepagetable3,
.homepagetable4 {
float: left;
width: 24.8%;
height: 100%;
/* border: 1px solid black; */
}

.homepagetable1 table {
height: 100%; /* Set the height of the table to 100% */
width: 100%; /* Set the width of the table to 100% */
font-size: 20px;
}
.homepagetable2 table {
height: 100%; /* Set the height of the table to 100% */
width: 100%; /* Set the width of the table to 100% */
}
.homepagetable3 table {
height: 100%; /* Set the height of the table to 100% */
width: 100%; /* Set the width of the table to 100% */
}
.homepagetable4 table {
height: 100%; /* Set the height of the table to 100% */
width: 100%; /* Set the width of the table to 100% */
}

</style>



