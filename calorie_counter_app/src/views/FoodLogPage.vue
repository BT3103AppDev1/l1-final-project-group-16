<template>
  <div>
    <NavigationBar/>
    <h1>THIS IS FOOD LOG PAGE</h1>
  </div>
</template>

<script>
import NavigationBar from "@/components/NavigationBar.vue"

export default {
    name:"FoodLogPage" ,
    components : {
        NavigationBar,
    },
}
</script>