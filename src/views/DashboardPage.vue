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
    <button class="weekly-button" @click="displayWeeklyCharts()">Weekly Charts</button>
    <button class="popular-meals-button" @click="displayPopularFoods()"> Popular Meals </button>
  </div>
  <br>

  <div class="dashBoardContainer">
    <div class = streaksLogin style="padding-top: 90px;"  v-if="streaks >= 0" id="streaksDiv">
      <img src="@/assets/images/HomePageElements/Streaks.png" style="width: 250px; height: auto">
      <h2 style="font-weight: bold; font-size: 65px; padding-right: 90px;"> {{this.streaks}} DAY STREAK </h2>
    </div>
  </div>
</template>

<script>
import NavigationBar from "@/components/NavigationBar.vue"
import { getAuth, onAuthStateChanged } from "@firebase/auth";

export default {
    name:"DashboardPage" ,
    components : {
        NavigationBar,
    },
    data() {
      return {
        streaks:0
      }
    },
    async mounted() {
      const auth = getAuth()
      onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user
      }})
    },
    methods: {
      displayWeeklyCharts() {
      }
      
      ,

      displayPopularFoods() {
        let divStreaks = document.getElementById("streaksDiv")
        divStreaks.innerHTML =""
        // display a table
        divStreaks.style.paddingTop = "40px"
        let table = document.createElement("table")
        table.setAttribute("id", "table")
        table.setAttribute("class", "auto-index")
        table.setAttribute("style", "border-collapse: collapse; width: 90%; height: auto")

        // add header row
        let headerRow = table.insertRow()
        let headers = ["Food", "Meals/Calories","Frequency"]
        for (let i = 0; i < headers.length; i++) {
            let headerCell = headerRow.insertCell(i)
            headerCell.innerHTML = headers[i]
            headerCell.setAttribute("style", "background-color: #4CAF50; color: white; font-weight: bold; padding: 10px; text-align: center; border: 1px solid #ddd;")
        }
        // add sample data rows
        let dataRows = [        ["Pizza", "2/1500", "5"],
            ["Burger", "1/800", "4"],
            ["Salad", "1/500", "3"],
            ["Fried Rice", "2/1200", "2"],
            ["Sushi", "3/1000", "1"]
        ]
        for (let i = 0; i < dataRows.length; i++) {
            let row = table.insertRow()
            for (let j = 0; j < dataRows[i].length; j++) {
                let cell = row.insertCell(j)
                cell.innerHTML = dataRows[i][j]
                cell.setAttribute("style", "padding: 10px; text-align: center; border: 1px solid #ddd;")
            }
        }
        // append table to HTML element
        divStreaks.appendChild(table)
      },
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