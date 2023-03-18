<template>
  <div>
    <br>
    <img src="@/assets/images/CommonElements/HappyPlatesLogo.png" alt="HP Logo" style="width: 500px; height: auto" >
    <div id="inputContainer">
        <form @submit.prevent="register" id="myForm">
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
                    <button id="registerButton" type="submit" >Register</button><br><br>
                </div>
            </div>
        </form>
    </div>
    </div>
</template>

<script>
import fireBaseApp from "../firebase.js"
import db from "../firebase.js"
import { doc, setDoc } from "firebase/firestore"; 


import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
const auth = getAuth();
import { collection } from 'firebase/firestore'

//   const errorMessage = ref();

export default {
  name: "Register", 
  props: {
    msg: String
  },
  data() {
    return {
      currUser: { 
        email:null, 
        password: null
      }
  
    }
  },
  methods: {
    async register(){
      createUserWithEmailAndPassword(getAuth(), this.email, this.password)
        .then(async (userCred) => {
              await setDoc(doc(db, "cities", "LA"), {
            name: "Los Angeles",
            state: "CA",
            country: "USA"
          });const user = userCred.user;
      


          console.log("uDATABASEFUCKid" +colRef);

          alert("Register Success")
          this.$router.push('/HomePage');
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // console.log(errorCode, errorMessage);
      alert(errorMessage);
    });
  },
  created() {
    this.register();
  }
}}




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