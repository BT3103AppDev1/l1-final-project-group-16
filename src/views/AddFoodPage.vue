<template>
  <div>
    <NavigationBar/>
  </div>
  <div id="food">
  <TabNav :tabs="['Quick Add', 'Custom Food']" :selected="selected" @selected="setSelected">
    <Tab :isSelected="selected === 'Quick Add'">
  <div class="QuickAdd">
  <img class="images" src="src/assets/images/forkspoon.png" width="130" height="120">
  <h1 class="quickaddtitle">Quick Add</h1>
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
  <h1 class="customfoodtitle"> Custom Food</h1>
</div>
<div class="centeredCustom">

  <button class="addCustomFood" id="addCustomFood" type="submit" v-if="!showForm" v-on:click="addCustomFoodButton">Add Custom Food</button><br><br>
  <!-- <CustomFoodForm v-if="showForm"></CustomFoodForm> -->
  <CustomFoodForm v-if="showForm"/>
  </div>
  <p class="noCustomFood" v-if="haveCustomFood==false && showForm==false"> You currently do not have any custom food :( </p>
  <div class="meal-header" v-if="haveCustomFood==true && showForm==false">
    <p> Your Custom Foods</p>
  </div>

  <CustomFoodCard  v-if="showForm == false" :customFood="food" v-for="(food, index) in customFoodData" :key="index"/>

    </Tab>
  </TabNav>
  </div>
</template>

<script>
import NavigationBar from "@/components/NavigationBar.vue"
import { doc, setDoc, addDoc, getFirestore, collection, query, where, getDocs} from "firebase/firestore"; 
import { getAuth, onAuthStateChanged} from "firebase/auth";
import { onMounted } from 'vue';
import Tab from "@/components/Tab.vue";
import TabNav from "@/components/TabNav.vue";
import CustomFoodForm from "@/components/CustomFoodForm.vue";
import CustomFoodCard from "@/components/CustomFoodCard.vue";
import MealHeader from '@/components/MealHeader.vue';


let currEmail=  "";

export default {
    name:"AddFoodPage" ,
    data() {
      return {
        selected: "Quick Add",
        foodName: "", 
        mealType: null,
        numServings: null,
        numCalories: null, 
        showForm: false,
        haveCustomFood: false,
        customFoodData: []
      };
    },
    components : {
        NavigationBar,
        Tab,
        TabNav,
        CustomFoodForm,
        CustomFoodCard, 
        MealHeader
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

    addCustomFoodButton() {
      this.showForm = true;
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
      const date = `${dd}-${mm}-${current.getFullYear()}`;
      
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
    
    },

    async retrieveCustomFood() {
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
            const mealsRef = collection(getFirestore(), "CustomFood");
            console.log(mealsRef);
            const q = query(mealsRef, where("email", "==", userEmail), where("date","==", today));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
              this.customFoodData.push(doc.data());
            });

            // if more than 0, the change this to true 
            if (this.customFoodData.length > 0) {
              this.haveCustomFood = true;
            }
  
          }
        });

      }

    },
  created() {
      this.foodData = [];
      this.retrieveCustomFood();
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
  justify-content: center;
  margin-left:50px ;
}

#addCustomFood {
  cursor: pointer;
  margin-top: 20px;
  padding-top: 20px;
  padding: 16px 20px;
  border-radius: 20px;
  border:none;
  background-color: rgb(86, 239, 86);
  margin-bottom:20px;
  margin-left: 20px;
  border: 2px solid black;
}

.labels {
text-align: center;
font-size: 15px;
margin-top: 20px;
display: block;


}

.centeredCustom {
  justify-content: center;
  display: flex;
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
margin-top: 60px;
padding-top: 70px;
}




#saveFood:hover {
background-color: red;
}


.centered {
position: fixed;
top: 25%;
left: 50%;
margin-top: 10px;
margin-left: -100px;

}
.quickaddtitle {
  margin-top: -30px;
}

.customfoodtitle {
  margin-top: -30px;
}



.QuickAdd{
display: flex;
font-size: 20;
justify-content: center;
margin-top: 0px;
}

.images {
padding-top: 20px;
justify-content: center;
margin-bottom: 30px;

}



.imagescustom{
margin-top: 30px;
margin-right: 12px;
justify-content: center;

}

/* .newFood {
margin-top: 100px;
} */

#food {
justify-content: center;
display: flex;
flex-direction: row;
padding-top: 30px;

}

.noCustomFood{
  display: flex;
  justify-content: center;
  font-size: 20px;
  font-style: italic;
  align-items: center;
  text-align: center;
  height: 50vh;

  

}

.meal-header {
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

.images {
  margin: 0 5px;
}
</style>