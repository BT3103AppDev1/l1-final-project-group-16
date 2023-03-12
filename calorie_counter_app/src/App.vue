<template>
  <div id="app">
    <LandingPage/>
    <HomePage/>
    <router-view />
  </div>
</template>

<script>
import LandingPage from '@/views/LandingPage.vue'
import HomePage from '@/views/HomePage.vue'

export default {
  name: 'App',
  components: {
  }
}
</script>
<style>
#app {
font-family: Avenir, Helvetica, Arial, sans-serif;
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
text-align: center;
color: #2c3e50;
margin-top: 10px;
}
body {
  background-color:rgb(235, 235, 202);
}
</style>