<template>
    <div class="card-wrapper">
        <div class="FoodName">
            <span>{{ customFood.foodName }}</span>
        </div>
     
        <div class="card-right">
            <span >{{ customFood.numCalories }} Calories </span>
        </div>
</div>


</template> 

<script>
export default {
    name: "CustomFoodCard",
    props: ["customFood"],
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
  font-size: 20px;
  display: flex;
  align-items: center;
  margin-left: 50px;
  font-weight: bold;
}
.card-right {
  font-size: 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-left: auto;
  margin-right: 70px;
}




</style>