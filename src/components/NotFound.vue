<template>
    <div style = "text-align:center;" v-if="user"> 
        <NavigationBar/>
        <h3>PAGE NOT FOUND !!!</h3>
        <h4>PLEASE CLICK ON THE ABOVE AVAILABLE OPTIONS</h4>
        <br>
    </div>
</template>

<script>

import NavigationBar from "@/components/NavigationBar.vue"
import { getAuth, onAuthStateChanged } from 'firebase/auth'

export default {
  name: 'NotFound',

  components: {
    NavigationBar,
  },

  data() {
    return {
      user: false
    }
  },

  mounted() {
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user
      }
    })
  },
}
</script>
