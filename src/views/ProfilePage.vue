<template>
  <NavigationBar/>
  <div class="maincontainer">
    <div class="picandbutton">
      <div class="profilepic">
      <!-- rng some pic later -->
        <span class="pic" style="font-size: 20px; font-weight: 800;">pic here</span>
      </div>
      <button v-on:click="goToEditProfilePage" class="editprofile">Edit Profile</button>
    </div>
  
    <div class="details">
      <span class="username" style="font-size: 28px; font-weight: 500;">fishfanbloop</span>
        <div class="heightweight">
          <div class="hwdeets">
            <span class="height">
              <span class="heightnum" style="font-size: 20px; font-weight: 800;">Height</span>
              <span style="font-size: 20px; font-weight: 700; color:  grey;">165cm</span>
            </span>
            <span class="weight">
              <span class="weightnum" style="font-size: 20px; font-weight: 800;">Weight</span>
              <span style="font-size: 20px; font-weight: 700; color:  grey;">50kg</span>
            </span>
          </div>
        </div>
        <div class="activity">
          <h4 style="font-size: 20px; font-weight: 800;">Daily Intake Goal</h4>
          <h4 style="font-size: 20px; font-weight: 700; color:  grey;">2000 Calories</h4>
          <h4 style="font-size: 20px; font-weight: 800;">Activity Level</h4>
          <h4 style="font-size: 20px; font-weight: 700; color:  grey;">Moderate</h4>
        </div>
        <div class="program">
          <h4 style="font-size: 20px; font-weight: 800;">Program</h4>
          <h4 style="font-size: 20px; font-weight: 700; color:  grey;">Gradual Weight Loss</h4>
          <h4 style="font-size: 20px; font-weight: 800;">Start Date</h4>
          <h4 style="font-size: 20px; font-weight: 700; color: grey;"> 20 Jul 2022</h4>
        </div>
    </div>
  </div>
</template>

<script>
import NavigationBar from "@/components/NavigationBar.vue"

export default {
    name:"ProfilePage" ,
    components : {
        NavigationBar,
    },
    methods : {
      goToEditProfilePage() {
        this.$router.push("/EditProfilePage");
      }
    }
}
</script>

<style>
.maincontainer {
  margin-top: 250px;
  display: flex;
  justify-content: center;
}

.profilepic {
  background-color: white;
  border-radius: 30px;
  height: 140px;
  width: 140px;
  margin-left: 17px;
}

.picandbutton {
  display: inline-block;
  flex-direction: column;
  margin-right: 50px;
}

.editprofile {
  background-color: #fff6f6; 
  border-radius: 10px; 
  border: 2px solid black; 
  padding: 10px 50px; 
  color: black;
  margin-top: 20px;
}

.details {
  display: inline-block;
  flex-direction: column;
  /* margin-top: 200px; */
}

.username {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  margin-bottom: 20px;
}

.weight {
  margin-left: 100px;
}

.heightnum, .weightnum {
  margin-right: 30px;
}

.hwdeets {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
}

.heightweight, .activity, .program {
  background-color: #e4dede; /* set the background color to grey */
  padding: 25px;
  border-radius: 30px;
  width: 40vw;
}

.activity {
  margin-bottom: 25px;
  margin-top: 25px;
}

.activity h4, .program h4 {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
}
</style>