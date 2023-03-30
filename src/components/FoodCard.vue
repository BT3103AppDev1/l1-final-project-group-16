<template>
    <div class="card-wrapper">
        <div class="FoodName">
            <span>{{ food.foodName }}</span>
        </div>
        <div class="NumServings">
            <span>{{ food.numServings }} Servings</span>
        </div>
        <div class="card-right">
            <span >{{ food.numCalories }} Calories </span>
        </div>
</div>


</template> 

<script>
export default {
    name: "FoodCard",
    props: ["food"],
};

</script>

<style scoped > 

.card-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  color: black;
  border-radius: 50px;
  background-color: rgb(196, 247, 198);
  margin-left: 5%;
  margin-right: 5%;
  box-shadow: 2px 2px 6px rgba(154, 244, 154, 0.3);
  height: 100px;
}

.FoodName {
  font-size: 30px;
  display: flex;
  align-items: center;
  margin-left: 90px;
}

.NumServings {
  display: flex;
  align-items: center;
  margin-left: 20px;
  font-size: 15px;
}

.card-right {
  font-size: 25px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-left: auto;
  margin-right: 50px;
}




</style>