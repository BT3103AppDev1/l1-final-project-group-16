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
                <h1 v-if="this.date === new Date().toLocaleDateString()">TODAY'S SUMMARY</h1>
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
          <td></td>
        </tr>
    </table>
    </div>
    </div>
    </template>
    
    <script>
    import NavigationBar from "@/components/NavigationBar.vue"
    import fireBaseApp from "../firebase";
    import { getAuth, onAuthStateChanged } from "@firebase/auth";
    
    export default {
        data() {
        return {
          user: null, 
          date: new Date().toLocaleDateString(),
          breakfastCal: 0,
          lunchCal: 0,
          dinnerCal: 0,
          snacksCal: 0,
          caloriesBurnt: 0,
          caloriesNet: 0
        };
        },
        mounted() {
            const auth = getAuth();
            onAuthStateChanged(auth,(user) => {
                if (user){
                    this.user = user
                }
            })
        },
        name:"HomePage" ,
        components : {
            NavigationBar,
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
    
    </style>
    
    
    