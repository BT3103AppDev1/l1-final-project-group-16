<template>
  <form @submit.prevent="addCustomExer" class="newExer">
    <!-- Quick Add Form -->
    <label class="labels" for="exerName">EXERCISE NAME</label>
    <input
      class="formfields"
      id="exerName"
      placeholder="Enter Custom Exercise Name "
      v-model="exerName"
    />

    <div>
      <label class="labels" for="exerName">NUMBER OF CALORIES</label>
      <input
        class="formfields"
        id="numCalories"
        placeholder="Enter Calories Per Serving"
        v-model="numCalories"
      />
    </div>

    <!-- Save Button -->
    <button class="button" id="saveExer" type="submit">Save Exercise</button
    ><br /><br />
  </form>
</template>

<script>
  import NavigationBar from "@/components/NavigationBar.vue";
  import ExerCard from "@/components/ExerCard.vue";
  import AddExerPage from "@/views/AddExerPage.vue";
  import { getAuth, onAuthStateChanged } from "firebase/auth";
  import firebaseApp from "@/firebase.js";
  import {
    getFirestore,
    collection,
    getDoc,
    getDocs,
    query,
    where,
    doc,
    setDoc,
  } from "firebase/firestore";

  let currEmail = "";
  export default {
    name: "CustomExerForm",
    data() {
      return {
        selected: "Quick Add",
        exerName: "",
        numServings: null,
        showForm: false,
      };
    },
    components: {
      NavigationBar,
    },

    async mounted() {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          currEmail = user.email;
        }
      });
    },

    methods: {
      setSelected(tab) {
        this.selected = tab;
      },

      addCustomExerButton() {
        this.showForm = true;
      },

      async addCustomExer() {
        const auth = getAuth();
        const user = auth.currentUser.email;
        console.log("email", user);
        console.log(currEmail);

        let cutomExerData = {
          exerName: this.exerName.value,
          numCalories: this.numCalories.value,
        };
        const current = new Date();
        const yyyy = current.getFullYear();
        let mm = current.getMonth() + 1; // Months start at 0!
        let dd = current.getDate();
        if (dd < 10) dd = "0" + dd;
        if (mm < 10) mm = "0" + mm;
        const date = `${dd}-${mm}-${current.getFullYear()}`;
        // add the document to the current date based on bf/lunch/dinner
        // add new date document

        // add to meal collections
        const newDocRef = doc(collection(getFirestore(), "CustomExer"));
        await setDoc(newDocRef, {
          email: currEmail,
          date: date,
          exerName: this.exerName,
          numCalories: this.numCalories,
        });
        alert("Added Custom Exercise Successfully");

        console.log(date);
        console.log(this.exerName);
        console.log(this.numCalories);
      },
      created() {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
          if (user) {
            this.user = user;
            console.log(this.currentUser.email);
          }
        });
      },
    },
  };
</script>

<style scoped>
  #saveExer {
    cursor: pointer;
    margin-top: 20px;
    padding-top: 20px;
    padding: 16px 20px;
    border-radius: 20px;
    border: none;
    font-size: 12px;
    color: black;
    background-color: green;
    transition-duration: 0.42s;
    justify-content: center;
    margin-left: 50px;
  }

  #addCustomExer {
    cursor: pointer;
    margin-top: 20px;
    padding-top: 20px;
    padding: 16px 20px;
    border-radius: 20px;
    border: none;
    background-color: rgb(86, 239, 86);
    margin-bottom: 20px;
    margin-left: 20px;
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

  #saveExer:hover {
    background-color: red;
  }
</style>
