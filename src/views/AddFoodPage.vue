<template>
  <div>
    <NavigationBar/>
  </div>
  <div id="food">
  <TabNav :tabs="['Quick Add', 'Custom Food']" :selected="selected" @selected="setSelected">
    <Tab :isSelected="selected === 'Quick Add'">
  <div class="QuickAdd">
  <img class="images" src="src/assets/images/forkspoon.png" width="130" height="120">
  <h1>Quick Add</h1>
</div>
<div class="centered">
    <form @submit.prevent="saveFood" class="newFood"> 
      <!-- Quick Add Form -->
      <label class="labels" for="foodName">FOOD NAME</label>
      <input  class="formfields"  id="foodName" placeholder="What did you eat" v-model="foodName" />
      
      <label class="labels" for="foodName">MEAL TYPE: {{ mealType }}</label>
      <select class="formfields"  v-model="mealType">
        <option>Breakfast</option>
        <option>Lunch</option>
        <option>Dinner</option>
        <option>Snacks</option>
      </select>


      <label class="labels" for="foodName">NUMBER OF SERVINGS: {{ numServings }}</label>
      <select  type=number  class="formfields" v-model="numServings">
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
        <option>6</option>
        <option>7</option>
        <option>8</option>
        <option>9</option>
        <option>10</option>
      </select>
      <div>
      <label class="labels" for="foodName">NUMBER OF CALORIES</label>
      <input class="formfields" id="numCalories" placeholder="How many calories?" v-model="numCalories" />
    </div>
      
      <!-- Save Button -->
      <button class="button" id="saveFood" type="submit" >Save</button><br><br>

    </form>
  </div>
    </Tab>

    <Tab :isSelected="selected === 'Custom Food'">
      <div class="QuickAdd">
  <img class="imagescustom" src="src/assets/images/customfood.png" width="70" height="70">
  <h1>Custom Food</h1>
</div>
<div class="centered">
    <form @submit.prevent="saveFood" class="newFood"> 
      <!-- Quick Add Form -->
      <label class="labels" for="foodName">FOOD NAME</label>
      <input  class="formfields"  id="foodName" placeholder="Enter Custom Food Name " v-model="foodName" />
   
      
      <div>
      <label class="labels" for="foodName">NUMBER OF CALORIES</label>
      <input class="formfields" id="numCalories" placeholder="Enter Calories Per Serving" v-model="numCalories" />
    </div>
      
      <!-- Save Button -->
      <button class="button" id="saveFood" type="submit" >Save Food</button><br><br>

    </form>
  </div>

    </Tab>
  </TabNav>
  </div>
</template>

<script>
import NavigationBar from "@/components/NavigationBar.vue"
import { doc, setDoc, addDoc, getFirestore, collection} from "firebase/firestore"; 
import { getAuth, onAuthStateChanged} from "firebase/auth";
import { onMounted } from 'vue';
import Tab from "@/components/Tab.vue";
import TabNav from "@/components/TabNav.vue";

let currEmail=  "";

export default {
    name:"AddFoodPage" ,
    data() {
      return {
        selected: "Quick Add",
        foodName: "", 
        mealType: null,
        numServings: null,
      };
    },
    components : {
        NavigationBar,
        Tab,
        TabNav
    },

    async mounted () {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          currEmail = user.email;
        } 
      });
    },

  methods: {
    setSelected(tab)  {
      this.selected = tab;
    },
    async saveFood(){

      const auth = getAuth();
      const user =  auth.currentUser.email;
      console.log("email", user);
      console.log(currEmail);


      let foodData = {
        foodName: this.foodName.value,
        mealType: this.mealType.value,
        numServings: this.numServings.value,
        numCalories: this.numCalories.value

      };
            const current = new Date();
            const yyyy = current.getFullYear();
            let mm = current.getMonth() + 1; // Months start at 0!
            let dd = current.getDate();
            if (dd < 10) dd = '0' + dd;
            if (mm < 10) mm = '0' + mm;
            const date = dd + '-' + mm + '-' + yyyy;
      
      // add the document to the current date based on bf/lunch/dinner
      // add new date document 

      // add to meal collections
      const newDocRef = doc(collection(getFirestore(), "Meals"));
            await setDoc(newDocRef, {
              email: currEmail,
              date: date,
              foodName: this.foodName, 
              mealType: this.mealType, 
              numServings: this.numServings,
              numCalories: this.numCalories
              
              
        });
      alert("Added Food Successfully")

      console.log(date);
      console.log("mealtype", this.mealType);
      const userRef = doc(collection(getFirestore(), "Users"), currEmail);
      const datesRef = doc(collection(userRef, "Date"), date);
      const foodLogRef = doc(collection(datesRef, "FoodLog"), this.mealType);
      const mealLogRef = doc(collection(foodLogRef, this.mealType + "Meals"), this.foodName);
      // "FoodLog", mealTypeDoc, mealTypeMeals, this.foodName);
      await setDoc(mealLogRef, {
        foodName: this.foodName, 
        mealType: this.mealType, 
        numServings: this.numServings,
        numCalories: this.numCalories
      });
    },
  created() {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user = user;
          console.log(this.currentUser.email);
        }
      });
    }
  }
}


</script>

<style scoped>
#saveFood {
  cursor: pointer;
  margin-top: 20px;
  padding-top: 20px;
  padding: 16px 20px;
  border-radius: 20px;
  border:none;
  font-size: 12px;
  color: black;
  background-color: green;
  transition-duration: 0.42s;
}

.labels {
text-align: center;
font-size: 15px;
margin-top: 20px;
display: block;


}

.formfields {
text-align: center;
border-radius: 10px;
width: 225px;
height: 30px;
}

input:hover {
  border-radius: 1px;
  transition: 0.2s ease in;
}

h1 {
margin-top: 30px;
}
.button{
transition-duration: 0.2s;
}

#saveFood:hover {
background-color: red;
}


.centered {
position: fixed;
top: 25%;
left: 50%;
margin-top: -50px;
margin-left: -100px;

}

.QuickAdd{
display: flex;
font-size: 20px;
justify-content: center;
margin-top: 0px;
}

.images {
padding-top: 2px;
justify-content: center;
margin-bottom: 30px;

}

.imagescustom{
margin-top: 10px;
margin-right: 12px;
justify-content: center;
margin-bottom: 30px;

}

.newFood {
margin-top: 100px;
}

#food {
justify-content: center;
display: flex;
flex-direction: row;
padding-top: 30px;

}
</style>