<template>
    <button v-on:click="goToLoginPage">Login</button>
    <button v-on:click="goToSignUpPage">Sign Up</button>  
</template>

<script>
export default {
  methods: {
    goToLoginPage() {
      this.$router.push("/LoginPage");
    },
    goToSignUpPage() {
      this.$router.push("/SignUpPage");
    },
  },
};
</script>

