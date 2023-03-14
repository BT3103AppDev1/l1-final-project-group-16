<template>
    <div>
      <NavigationBar/>
    </div>
  
    <div @click="checkClick" class="addFood"></div>
      <form @save="saveFood" class="newFood"> </form>
        <h1>Quick Add</h1>
        <!-- Quick Add Form -->
        <p>Food Name: </p>
        <input  id="foodName" placeholder="What did you eat" v-model="foodName" />
  
  
        <div>Meal Type: {{ mealType }}</div>
        <select v-model="mealType">
          <option disabled value="">Breakfast</option>
          <option>Lunch</option>
          <option>Dinner</option>
          <option>Snacks</option>
        </select>
        
        <div>Number of Servings: {{ numServings }}</div>
        <select v-model="numServings">
          <option disabled value="">1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          <option>6</option>
          <option>7</option>
          <option>8</option>
          <option>9</option>
          <option>10</option>
        </select>

        <!-- Save Button -->
        <div class="save">
            <button>Save</button>
        </div>
  
  
  
  
  
  
  
  </template>
  
  <script>
  import NavigationBar from "@/components/NavigationBar.vue"
  
  export default {
      name:"AddFoodPage" ,
      data() {
        return {
          foodName: null, 
          mealType: null,
          numServings: null,
        };
      },
      components : {
          NavigationBar,
      },
  }
  </script>


<style scoped>
button {
    cursor: pointer;
    padding: 16px 20px;
    border-radius: 20px;
    border:none;
    font-size: 12px;
    color: black;
    background-color: green;
}
</style>