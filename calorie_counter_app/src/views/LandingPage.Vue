<template>
  <div>
    <h1>Welcome to My App</h1>
    <p>Please sign in or create an account to continue:</p>
    <div>
      <button v-on:click="goToHomePage">Login</button>
      <button v-on:click="goToHomePage">Sign Up</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goToHomePage() {
      this.$router.push('/HomePage');
    },
  },
};
</script>

<style>
</style>


