<template>
  <div>
    <h1>THIS IS LANDING PAGE</h1>
    <p>Please sign in or create an account to continue:</p>
    <div>
      <button v-on:click="goToLoginPage">Login</button>
      <button v-on:click="goToSignUpPage">Sign Up</button>
    </div>
  </div>
</template>

<script>

export default {
  methods: {
    goToLoginPage() {
      this.$router.push('/LoginPage');
    },
    goToSignUpPage() {
      this.$router.push('/SignUpPage');
    },
  },
};
</script>

<style>
</style>


