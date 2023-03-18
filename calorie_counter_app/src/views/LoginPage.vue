<template>
    <div>
      <br>
      <img src="@/assets/images/CommonElements/HappyPlatesWord.png" alt="HP Words" style="width: 400px; height: auto" >
      <br><br><br>
      <img src="@/assets/images/CommonElements/HappyPlatesLogo.png" alt="HP Logo" style="width: 500px; height: auto" >
      <h3>Sign in to continue</h3>
      <div id="inputContainer">
          <form id="myForm">
              <div class="formLi">
                  <label class="labels" for="userEmail">EMAIL</label>
                  <input type="text" autocomplete="off" id = "userEmail" required= "" placeholder="Enter your email"> <br><br>
  
                  <label class="labels" for="ticker1">PASSWORD</label>
                  <input type="password" id = "userPass" required= "" placeholder="Enter your password"> <br><br>
                   <div class="signUpPage">
                        <router-link to="/SignUpPage"> Don't have an account? Sign up now!</router-link>
                  </div>
                  <br>
                  <p v-if="errorMessage">{{  errorMessage }}</p>
                  <div class="save">
                      <button id="signInBtn" type="button" v-on:click="verifyUser">SIGN IN</button><br><br>
                  </div>
              </div>
          </form>
      </div>
      </div>
  </template>
  
  
  <script>
  import fireBaseApp from "../firebase.js"
  import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
  const auth = getAuth();
//   const errorMessage = ref();
  
  export default {
    methods: {
        async verifyUser(){
            console.log("VERIFYING USER")
            let userEmail = document.getElementById("userEmail").value
            let userPassword = document.getElementById("userPass").value
            console.log("User Email: " + userEmail)
            console.log("User Password: " + userPassword)
            signInWithEmailAndPassword(auth, userEmail, userPassword)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                alert("Login Success")
                this.$router.push('/HomePage');
              }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                alert(errorMessage);

                // switch(errorCode) {
                //     case "auth/invalid-email":
                //         errorMessage.value = "Invalid Email";
                //         break;
                //     case "auth/user-not-found":
                //         errorMessage.value = "No account with this email found";
                //         break;
                //     case "auth/wrong-password":
                //         errorMessage.value = "Incorrect Password";
                //         break;
                //     default:
                //         errorMessage.value = "Email or Password was Incorrect";
                //         break;
                // }
        
        });
        }
    }
  };
  </script>


  
  <style>
  #signInBtn{
      display: block;
      margin: 0 auto;
      background-color: black;
      color: white;
      padding: 10px;
      height: 50px;
      width: 200px;
      text-align: center;
  }
  #signInBtn:hover {
      box-shadow: 3px 3px rgb(0, 0, 0);
      border-radius: 2px;
  }
  .formLi {
      display: inline-block;
      text-align: right;
  }
  input:hover {
      box-shadow: 3px 3px rgb(0, 0, 0);
      border-radius: 2px;
  }
  #userEmail,#userPass {
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
  </style><!-- <template>
  <div>
    <br>
    <img src="@/assets/images/CommonElements/HappyPlatesWord.png" alt="HP Words" style="width: 400px; height: auto" >
    <br><br><br>
    <img src="@/assets/images/CommonElements/HappyPlatesLogo.png" alt="HP Logo" style="width: 500px; height: auto" >
    <h3>Sign in to continue</h3>
    <div id="inputContainer">
        <form id="myForm">
            <div class="formLi">
                <label class="labels" for="userEmail">EMAIL</label>
                <input type="text" autocomplete="off" id = "userEmail" required= "" placeholder="Enter your email" v-model="email"> <br><br>

                <label class="labels" for="ticker1">PASSWORD</label>
                <input type="password" id = "userPass" required= "" placeholder="Enter your password" v-model="password"> <br><br>

                
                <p v-if="errorMessage"> {{ errorMvessage }}</p>
                <div class="signUpPage">
                      <router-link to="/SignUpPage"> Don't have an account? Sign up now!</router-link>
                </div>
                <br>
                <div class="save">
                    <button id="signInBtn" type="button" @click="signIn" >Sign In</button><br><br>
                </div>
            </div>
        </form>
    </div>
    </div>
</template>



<script setup>
import { ref } from 'vue';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'vue-router';
const router = useRouter()
const email = ref("");
const password = ref("");
const errorMessage = ref("")
const signIn = () => {
    const auth = getAuth(); 
    signInWithEmailAndPassword(auth, email.value, password.value).then((data) => {
        console.log("Successfully Signed In")
      // log current user 
        console.log(auth.currentUser)
        this.$router.push('/HomePage');
        })
        .catch((error) => {
        console.log(error.code);
        switch(error.code) {
            case "auth/invalid-email":
                errorMessage.value = "Invalid Email";
                break;
            case "auth/user-not-found":
                errorMessage.value = "No account with this email found";
                break;
            case "auth/wrong-password":
                errorMessage.value = "Incorrect Password";
                break;
            default:
                errorMessage.value = "Email or Password was Incorrect";
                break;
        }
        
        });
}
</script>




<style>
#signInBtn{
    display: block;
    margin: 0 auto;
    background-color: black;
    color: white;
    padding: 10px;
    height: 50px;
    width: 200px;
    text-align: center;
}
#signInBtn:hover {
    box-shadow: 3px 3px rgb(0, 0, 0);
    border-radius: 2px;
}
.formLi {
    display: inline-block;
    text-align: right;
}
input:hover {
    box-shadow: 3px 3px rgb(0, 0, 0);
    border-radius: 2px;
}
#userEmail,#userPass {
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