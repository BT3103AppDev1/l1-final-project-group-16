<template>
  <div>
    <br>
    <img src="@/assets/images/CommonElements/HappyPlatesLogo.png" alt="HP Logo" style="width: 500px; height: auto" >
    <div id="inputContainer">
        <form id="myForm">
            <div class="register">
              <h2>CREATE AN ACCOUNT</h2>
                <label class="labels" for="userEmail">EMAIL</label>
                <input type="email" autocomplete="off" id = "userEmail"  placeholder="Enter your email" v-model="email"> <br><br>

                <label class="labels" for="ticker1">PASSWORD</label>
                <input type="password" id = "userPass" placeholder="Enter your password" v-model="password"> <br><br>


                <label class="labels" for="ticker1">USERNAME</label>
                <input type="userName" id = "userName" placeholder="Enter your Username" v-model="userName"> <br><br>
     
                 <div class="signUpPage">
                      <router-link to="/SignUpPage"> Don't have an account? Sign up now!</router-link>
                </div>
                <div v-show="error" class="error">{{ this.errorMsg }}</div>
                <br>
                <div class="save">
                    <button id="registerButton" type="button" @click.prevent="register" >Register</button><br><br>
                </div>
            </div>
        </form>
    </div>
    </div>
</template>


<script setup>
import { ref } from 'vue';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'vue-router';
const router = useRouter  ()
const email = ref("");
const password = ref("");
const register = () => {
  createUserWithEmailAndPassword(getAuth(), email.value, password.value).then((data) => {
      console.log("Successfully Registered")
      router.push('/HomePage');
    })
    .catch((error) => {
      console.log(error.code);
      alert(error.message)
    });
  
}
</script>


<style>
#registerButton{
    display: block;
    margin: 0 auto;
    background-color: black;
    color: white;
    padding: 10px;
    height: 50px;
    width: 200px;
    text-align: center;
}
#registerButton:hover {
    box-shadow: 3px 3px rgb(0, 0, 0);
    border-radius: 2px;
}
.register {
    display: inline-block;
    text-align: right;
}
input:hover {
    box-shadow: 3px 3px rgb(0, 0, 0);
    border-radius: 2px;
}
#userEmail,#userPass, #userName {
  border-radius: 10px;
  font-size: 16px;
  padding: 10px;
  width: 300px;
  background-color: #e9e9e9;
}
.labels {
  display: block;
  font-size: 16px;
  margin-bottom: 5px;
  text-align: left;
  border-block-color: #e9e9e9;
}
.signUpPage{
    text-align: center;
}
.signUpPage:hover {
    text-shadow: blue;
}
</style> -->