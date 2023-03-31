<template>
    <div class="card-wrapper">
        <div class="FoodName">
            <span>{{ customFood.foodName }}</span>
        </div>
        <div class="card-right">

        <div class="icons">
            <img class="icon" src="src/assets/images/threedots.png" width="30" height="30">
            <img class="icon" src="src/assets/images/add.png" width="30" height="30">
     
        </div>

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
  height: 110px;
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
  margin-right: 30px;
}

.icons{
    display: flex;
    justify-items: flex-end;
    margin-top: -45px;
    margin-right: -125px;
    margin-bottom: 20px;

}

.icon{
    margin-right: 10px;
    margin-left: 10px;
}


</style>