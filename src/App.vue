<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>
<style>
/* @font-face {
  font-family:'Montserrat';
  src: url('Montserrat-VariableFont_wght.ttf') format('opentype'),
      url('Montserrat-VariableFont_wght.ttf') format('woff'),
      url('Montserrat-VariableFont_wght.ttf') format('truetype');
} */

@font-face {
  font-family:'SF Pro';
  src: url('SFPRODISPLAYREGULAR.OTF') format('opentype'),

}

#app {

/* font-family: Avenir, Helvetica, Arial, sans-serif; */
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
text-align: center;
color: #2c3e50;
margin-top: 10px;
}
body {
  background-color:rgb(235, 235, 202);
}

.error {
  text-align: center;
  font-size: 12px;
  color: red
}
</style>