<template>
    <div>
      <NavigationBar/>
    </div>
    <div id="exercise">
    <TabNav :tabs="['Add Exercise']" :selected="selected" @selected="setSelected">
      <Tab :isSelected="selected === 'Add Exercise'">
    <div class="AddExer">
    <img class="images" src="src/assets/images/forkspoon.png" width="130" height="120">
    <h1>Add Exercise</h1>
  </div>
  <div class="centered">
      <form @submit.prevent="saveExer" class="newExer"> 
        <!-- Quick Add Form -->
        <label class="labels" for="exerName">EXERCISE</label>
        <input  class="formfields"  id="exerName" placeholder="What Exercise?" v-model="exerName" />
        
        <label class="labels" for="exerName">DURATION: {{ duration }}</label>
        <select class="formfields"  v-model="duration">
          <option default value="">0.5 hrs</option>
          <option>1 hrs </option>
          <option>1.5 hrs</option>
          <option>2 hrs</option>
        </select>
        <div></div>

        <div>
      <label class="labels" for="foodName">NUMBER OF CALORIES</label>
      <input class="formfields" id="numCalories" placeholder="How many calories?" v-model="numCalories" />
        </div>

        
        <!-- Save Button -->
        <button class="button" id="saveExer" type="submit" >Save</button><br><br>

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
      name:"AddExerPage" ,
      data() {
        return {
          selected: "Add Exercise",
          exerName: "", 
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

      async saveExer(){

        const auth = getAuth();
        const user =  auth.currentUser.email;
        console.log("email", user);
        console.log(currEmail);


        let exerData = {
          exerName: this.exerName.value,
          duration: this.duration.value,
          numCalories: this.numCalories.value

        };

        const current = new Date();
        const date = `${current.getDate()}-${current.getMonth()+1}-${current.getFullYear()}`;
        // add the document to the current date based on bf/lunch/dinner
        // add new date document 
        console.log(date);

        // add to meal collections
        const newDocRef = doc(collection(getFirestore(), "Exercises"));
            await setDoc(newDocRef, {
                email: currEmail,
                date: date,
                exerName: this.exerName, 
                duration: this.duration, 
                numCalories: this.numCalories
        });
        alert("Added Exercise Successfully")


        // const userRef = doc(collection(getFirestore(), "Users"), currEmail);
        // const datesRef = doc(collection(userRef, "Date"), date);
        // const exerLogRef = doc(collection(datesRef, "ExerciseLog"), "Exercises");
        // const exerRef = doc(collection(exerLogRef, this.mealType + "Meals"), this.exerName);
        // // "FoodLog", mealTypeDoc, mealTypeMeals, this.exerName);
        // await setDoc(mealLogRef, {
        //   exerName: this.exerName, 
        //   mealType: this.mealType, 
        //   numServings: this.numServings,
        //   numCalories: this.numCalories
        // });
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
#saveExer {
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

#saveExer:hover {
  background-color: red;
}


.centered {
  position: fixed;
  top: 25%;
  left: 50%;
  margin-top: -50px;
  margin-left: -100px;

}

.AddExer{
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

.newExer {
  margin-top: 100px;
}

#exercise {
  justify-content: center;
  display: flex;
  flex-direction: row;
  padding-top: 30px;

}
</style>