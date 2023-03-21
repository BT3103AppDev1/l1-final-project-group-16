<template>
  <div>
    <NavigationBar/>
    <h1>THIS IS DASHBOARD PAGE</h1>
  </div>
</template>

<script>
import NavigationBar from "@/components/NavigationBar.vue"

export default {
    name:"DashboardPage" ,
    components : {
        NavigationBar,
    },
}
</script>