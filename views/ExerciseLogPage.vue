<template>
  <div>
    <NavigationBar/>
  </div>
  <div id="food">
  <TabNav :tabs="['Quick Add', 'Custom Food']" :selected="selected" @selected="setSelected">
    <Tab :isSelected="selected === 'Quick Add'">
      <p>quick add stuff</p> 
    </Tab>

    <Tab :isSelected="selected === 'Custom Food'">
      <p> custom food testing </p>
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
      const date = `${current.getDate()}-${current.getMonth()+1}-${current.getFullYear()}`;
      // add the document to the current date based on bf/lunch/dinner
      // add new date document 
      console.log(date);

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
}

.images {
padding-top: 20px;
justify-content: center;
}

#food {
  font-size: 30px;
  display:flex;
  justify-content: center;


}
</style>