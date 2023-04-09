<template>
  <NavigationBar/>
  <div class="userProfile">
    <form @submit.prevent="editProfile" id="editProfile">
      <h5 style="color: #084298"><b>Account Information</b></h5>

      <div class="form-group">
        <label class="labels" for="username">Account name: </label>
        <input type="text" id = "username" placeholder="username" v-model="username" required>
      </div>

      <div class="form-group">
        <label class="labels" for="password">Password: </label>
        <input v-if="showPassword" type="text" v-model="password" id="password" required/>
        <input v-else type="password" v-model="password" id="password" required>
        <input type="checkbox" @click="showPasswordMethod()" style="width: 15px"> Show Password
      </div>

      <h5 style="color: #084298"><b>My Details</b></h5>

      <div class="form-group">
        <label class="labels" for="gender">Gender: </label>

        <label for="female" class="radioLabels">Female</label>
        <input type="radio" name="gender" id="female" value="Female" v-model="gender">

        <label for="male" class="radioLabels">Male</label>
        <input type="radio" name="gender" id="male" value="Male" v-model="gender">

        <label for="other" class="radioLabels">Other</label>
        <input type="radio" name="gender" id="other" value="Other" v-model="gender">

      </div>

      <div class="form-group">
        <label class="labels" for="weight">Weight (KG):  </label>
        <input type="number" id = "weight" v-model="weight">
      </div>

      <div class="form-group">
        <label class="labels" for="height">Height (CM): </label>
        <input type="number" id = "height" v-model="height">
      </div>

      <div class="form-group">
        <label class="labels" for="email">Email: </label>
        <input type="email" id = "email" placeholder="user email" v-model="email" required>
      </div>

      <h5 style="color: #084298"><b>My Goal</b></h5>

      <div class="form-group">
        <label class="labels" for="dailyCal">Daily Calories Intake: </label>
        <input type="number" id = "dailyCal" v-model="dailyCal">
      </div>

      <div class="form-group">
        <label class="labels" for="dietGoal">Diet Goal: </label>
        <select id="dietGoal" name="dietGoal" v-model="dietGoal" required>
          <option value="Slow Weight Loss">Slow Weight Loss</option>
          <option value="Gradually Weight Loss">Gradually Weight Loss</option>
          <option value="Rapid Weight Loss">Rapid Weight Loss</option>
        </select>
      </div>

      <div class="form-group">
        <label class="labels" for="goalWeight">Goal Weight (KG): </label>
        <input type="number" id = "goalWeight" v-model="goalWeight">
      </div>

    </form>
    <button class="btnGrp" type="button" style="background-color: floralwhite" v-on:click="cancelEdit">Cancel</button>
    <button class="btnGrp" type="submit" v-on:click="editProfile">Save</button>
  </div>

</template>

<script>
import NavigationBar from "@/components/NavigationBar.vue"
import { getAuth} from "firebase/auth";
import { getFirestore, collection, getDoc, getDocs, query, where, doc,updateDoc} from 'firebase/firestore';

const auth = getAuth();

export default {
  name:"EditProfilePage" ,
  components : {
    NavigationBar,
  },
  data() {
    return {
      showPassword:false,
      email:'',
      password: '',
      username:'',
      gender:'',
      weight:0,
      height:0,
      dailyCal:0,
      dietGoal:'Gradually Weight Loss',
      goalWeight:0
    }
  },
  created() {
    this.renderProfile();
  },

  methods : {
    async renderProfile(){
      const currentUser = auth.currentUser
      if (currentUser){
        this.email = currentUser.email
        console.log("Current User: ",this.email)

        const userCollection = collection(getFirestore(), "Users");
        const profileQuery = query(
            userCollection,
            where("email", "==", this.email),
        );

        const querySnapshot = await getDocs(profileQuery);
        const userDocument = (querySnapshot.docs)[0]
        const userData = userDocument.data()
        this.password = userData.password;
        this.username = userData.userName;
        this.gender = userData.gender;
        //fields may not exist
        this.height = userData?.height || 0;
        this.weight = userData?.weight || 0;
        this.dailyCal = userData?.dailyIntakeGoal || 0;
        this.dietGoal = userData?.goal || 'Gradually Weight Loss';
        this.goalWeight = userData?.goalWeight || 0;

      }else{
        console.log('No user is signed in')
      }

    },
    async editProfile(){
      const currentUser = auth.currentUser
      const email = currentUser.email
      //get page input data

      const userCollection = doc(collection(getFirestore(), "Users"), email);

      await updateDoc(userCollection, {
        userName:this.username,
        gender:this.gender,
        height:this.height,
        weight:this.weight,
        dailyIntakeGoal:this.dailyCal,
        goal:this.dietGoal,
        goalWeight:this.goalWeight

      })
          .then(() => {
            console.log('User document updated successfully');
          })
          .catch((error) => {
            console.error('Error updating document: ', error);
          });

      alert("Your profile has update successfully!")
      this.$router.push("/ProfilePage");
    },
    cancelEdit(){
      this.$router.push("/ProfilePage");
    },
    showPasswordMethod(){
      this.showPassword = !this.showPassword;
    },
  },
}
</script>

<style>
.userProfile{
  margin-top: 40px;
  float: left;
  margin-left: 150px;
  width: fit-content;
}
.userProfile h5{
  text-align: left;
  margin-top: 20px;
  margin-bottom: 10px;
}
#editProfile{
  display: grid;
}
.form-group {
  display: flex;
  align-items: flex-start;
  float: left;
  margin-bottom: 10px;
}
.labels{
  width: 200px;
  float: left;
}
.form-group input{
  width: 250px;
  height: 27px;
}
#password{
  padding-right: 5px;
}
#female,#male,#other{
  width: fit-content;
  margin-left: 10px;
  margin-right: 30px;
}
#dietGoal{
  width: fit-content;
  height: 25px;
}
.btnGrp{
  float: left;
  display: block;
  border-color: #2c3034;
  border-width: thin;
  color: #333333;
  margin-right: 40px;
  margin-top: 20px;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  font-size: 17px;
  border-radius: 30px;
  width: 100px;
}
</style>