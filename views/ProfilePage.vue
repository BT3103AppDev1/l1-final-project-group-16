<template>
  <div>
    <NavigationBar/>
    <h1>THIS IS PROFILE PAGE</h1>
  </div>
</template>

<script>
import NavigationBar from "@/components/NavigationBar.vue"

export default {
    name:"ProfilePage" ,
    components : {
        NavigationBar,
    },
}
</script>