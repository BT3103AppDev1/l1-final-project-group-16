<template>
    <div class="card-wrapper">
        <div class="exerName">
            <span>{{ exercise.exerName }}</span>
        </div>
        <div class="duration">
            <span>Duration: {{ exercise.duration }} hrs</span>
        </div>
        <div class="class-right">
            <span >{{ (exercise.numCalories * this.weight).toFixed(2)  }} Calories / hr </span>
        </div>
</div>


</template> 

<script>
import {getAuth, onAuthStateChanged} from "firebase/auth";
import { getFirestore, collection, getDoc, getDocs, query, where, doc} from 'firebase/firestore';
export default {
  
    name: "ExerCard",
    props: ["exercise"],
    data() {
      return {
        weight:0,
      }
    },

    created() {
      this.getUserWeight();
    },

    methods: {

      async getUserWeight() {
        const auth = getAuth();
        let userEmail;
        onAuthStateChanged(auth, async (user) => {
          console.log("Auth state changed:", user);
          if (user) {
            userEmail = user.email;
            console.log("Current user email:", userEmail);
            // console.log(today);
            const userRef = collection(getFirestore(), "Users");
            const q = query(userRef, where("email", "==", userEmail));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
              this.weight = doc.data().weight;
              console.log(this.weight);
            });
  
          }
    
        });
      }

    },
};



</script>


<style scoped > 


.card-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  color: black;
  border-radius: 50px;
  background-color: rgb(196, 247, 198);
  margin-left: 5%;
  margin-right: 5%;
  box-shadow: 2px 2px 6px rgba(154, 244, 154, 0.3);
  height: 120px;
}

.exerName {
  font-size: 20px;
  display: flex;
  align-items: center;
  margin-left: 50px;
  font-weight: bold;
}

.duration {
  display: flex;
  align-items: center;
  margin-left: 40px;
  font-size: 15px;
}

.class-right {
  font-size: 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-left: auto;
  margin-right: 60px;
}





</style>