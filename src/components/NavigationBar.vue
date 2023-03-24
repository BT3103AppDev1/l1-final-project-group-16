<!-- Navigation Component -->
<!-- Home, Dashboard, Food, Exercise, Profile, Log out-->

<template>
  <div class="navigation-bar">
    <ul>
        <li><router-link to="/HomePage">
          <img src="@/assets/images/HomePageElements/Home.png" class="homeLogo"></router-link></li>
        <li><router-link to="/DashboardPage">Dashboard</router-link></li>
        <li><router-link to="/FoodLogPage">Food Log</router-link></li>
        <li><router-link to="/ExerciseLogPage">Exercise Log</router-link></li>
        <li><router-link to="/ProfilePage">Profile</router-link></li>
        <li @click="handleSignOut"><a>Sign Out</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  methods: {
      handleSignOut() {
        
      this.$router.push('/');
    },
  }
};
</script>

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
.homeLogo {
  width: 30px;
  height: 30px;
}
</style>
