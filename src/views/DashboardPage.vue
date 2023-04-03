<template>
  <div>
    <NavigationBar/>
  </div>
  <div>
    <br>
    <br>
    <div>
      <h2 style="color:black;font-weight: bold; font-size: 55px;"> Dashboard </h2>
    </div>
  </div>

  <div class = "dashBoardButtons">
    <button class="weekly-button"> Weekly Charts</button>
    <!-- <button class="weekly-button"> Future Charts</button> -->
    <button class="popular-meals-button"> Popular Meals </button>
  </div>
  <br>

  <div class="dashBoardContainer">
    <div class = streaksLogin style="padding-top: 90px;"  v-if="streaks >= 0">
      <img src="@/assets/images/HomePageElements/Streaks.png" style="width: 250px; height: auto">
      <h2 style="font-weight: bold; font-size: 65px; padding-right: 90px;"> {{this.streaks}} DAY STREAK </h2>
    </div>
  </div>
</template>

<script>
import NavigationBar from "@/components/NavigationBar.vue"

export default {
    name:"DashboardPage" ,
    components : {
        NavigationBar,
    },
    data() {
      return {
        streaks:0
      }
    }
}
</script>


<style scoped>

.streaksLogin {
 display: flex;
 align-items: center; 
 justify-content: center;
 grid-template-columns: 0fr 0fr 0fr;
 text-align: center;
}
.dashBoardButtons {
  display: flex;
  justify-content: space-between;
  padding-left: 150px; 
  padding-right: 150px;
}
.dashBoardButtons button:hover {
  text-decoration: underline;
  cursor: pointer;
}
.dashBoardButtons button {
  transition: background-color 0.3s ease, color 0.3s ease;
}

.dashBoardButtons button {
  display: inline-block;
  background-color: #ffffff;
  border: 2px solid #000000;
  border-radius: 20px;
  padding: 10px 20px;
  font-size: 16px;
  color: #000000;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
}

.dashBoardContainer{
  margin: auto;
  width: 90%;
  height: 400px;
  background-color:white;
  border-radius: 30px;
  padding: 10px;
}

</style>