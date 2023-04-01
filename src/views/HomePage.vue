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
      <tr>
        <th>Calories Burnt</th>
      </tr>
      <tr>
        <td>{{ this.caloriesBurnt }} CAL</td>
      </tr>
  </table>
  </div>
  
  <div class="homepagetable3">
    <table id = "displayNetCalorieTable">
      <tr>
        <th>Net Calorie intake</th>
      </tr>
      <tr>
        <td>{{ this.caloriesNet }} CAL</td>
      </tr>
  </table>
  </div>
  
  <div class="homepagetable4">
    <table id = "displayGoalTable">
      <tr>
        <th>GOAL</th>
      </tr>
      <tr>
        <td>
          <ProgressBar />
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
  Promise.all([breakfastCalPromise, lunchCalPromise, dinnerCalPromise, snacksCalPromise, calBurntPromise])
    .then((values) => {
      const netCalorie = values[0] + values[1] + values[2] + values[3] - values[4];
      console.log("Total calories for Breakfast:", values[0]);
      console.log("Total calories for Lunch:", values[1]);
      console.log("Total calories for Dinner:", values[2]);
      console.log("Total calories for Snacks:", values[3]);
      console.log("Total calories burnt:", values[4]);
      this.caloriesNet = netCalorie
    })
    .catch((error) => {
      console.error("Error updating meal and burn calories:", error);
    });

  // this.updateMealCal('Breakfast').then((totalCalories) => {
  // console.log("Total calories for Breakfast:", totalCalories);
  // }).catch((error) => {
  //   console.error("Error updating meal calories:", error);
  // });

  // this.updateMealCal('Lunch').then((totalCalories) => {
  // console.log("Total calories for Lunch:", totalCalories);
  // }).catch((error) => {
  //   console.error("Error updating meal calories:", error);
  // });

  // this.updateMealCal('Dinner').then((totalCalories) => {
  // console.log("Total calories for Dinner:", totalCalories);
  // }).catch((error) => {
  //   console.error("Error updating meal calories:", error);
  // });

  // this.updateMealCal('Snacks').then((totalCalories) => {
  // console.log("Total calories for Snacks:", totalCalories);
  // }).catch((error) => {
  //   console.error("Error updating meal calories:", error);
  // });

  // this.updateCalBurnt().then((totalCalories) => {
  //   console.log("Total calories burnt:", totalCalories);
  // }).catch((error) => {
  //   console.error("Error updating calories:", error);
  // });
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
      }; 
  }
  ,
  methods: {
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

<style>


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


.circular-progress {
position: relative;
height: 150px;
width: 150px;
border-radius: 50%;
display: grid;
place-items: center;
}
.circular-progress:before {
content: "";
position: absolute;
height: 84%;
width: 84%;
background-color: #000000;
border-radius: 50%;
}
.value-container {
position: relative;
font-family: "Poppins", sans-serif;
font-size: 50px;
color: #231c3d;
}

</style>



