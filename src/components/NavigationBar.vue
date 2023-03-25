<!-- Navigation Component -->
<!-- Home, Dashboard, Food, Exercise, Profile, Log out-->

<template>
  <div class="navigation-bar">
    <ul>
        <li><router-link to="/HomePage">
          <img src="@/assets/images/HomePageElements/Home.png" class="logo"></router-link></li>
        <li><router-link to="/DashboardPage">Dashboard</router-link></li>
        <li><router-link to="/FoodLogPage">Food Log</router-link></li>
        <li><router-link to="/ExerciseLogPage">Exercise Log</router-link></li>
        <li><router-link to="/ProfilePage">Profile</router-link></li>
        <li @click="handleSignOut"><a>Sign Out</a></li>
    </ul>
  </div>
</template>
<!-- 
<script setup>
import { onMounted, ref } from 'vue';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const loggedIn = ref(false);

// Define Auth 
let auth;
onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    // if user is not null -> set to true 
    if (user) {
      loggedIn.value = true;
    } else {
      loggedIn.value = false;
    }
  });

}); -->

<script>
export default {
  // created() {
  //       console.log("hihihi");
  //       const auth = getAuth();
  //       onAuthStateChanged(auth, (user) => {
  //         if (user) {
  //           this.user = user;
  //           console.log(this.currentUser.email);
  //         }
  //       });
  //     }, 
  methods: {
      handleSignOut() {
      // navigate to landing page
      // history.go(-(history.length - 1));
      this.$router.push('/');
    },
  }
};
</script>


// const handleSignOut = () => {
//   // signOut(auth).then(() => {
//     this.$router.push('/');
//   // });
// };


<!-- </script> -->

<style>

.navigation-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  background-color:greenyellow;
  padding: 0 20px;
  width: 100%;
}

.navigation-bar ul {
  display: flex;
  justify-content: space-between;
  list-style-type: none;
  margin: 0;
  padding: 0;
  width: 100%;
}

.navigation-bar li {
  flex: 1;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #333;
  border-radius: 20px;
  background-color: white;
  margin: 30px;
}

.navigation-bar a {
  color: #333;
  text-decoration: none;
  font-weight: bold;
}

.navigation-bar a:hover {
  text-decoration: underline;
  color: red;
}
.logo {
  width: 30px;
  height: 30px;
}
</style>
