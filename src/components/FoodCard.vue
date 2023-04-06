<template>
    <div class="card-wrapper">

 
        <div class="FoodName">
            <span>{{ food.foodName }}</span>
        </div>
        <div class="NumServings" v-if="food.numServings > 1">
            <span>{{ food.numServings }} Servings</span>
        </div>
        <div class="NumServings" v-else>
          <span>{{ food.numServings }} Serving</span>
        </div>
        <div class="card-right">
            <span >{{ food.numCalories }} Calories / Serving </span>
            <div class="icons">
            <img  @click="showEditButtons=true" class="icon" src="src/assets/images/threedots.png" width="30" height="30">
            <Edit class="editButtons" v-if="showEditButtons == true"/>
     
        </div>
        </div>
</div>


</template> 

<script>
import Edit from "@/components/Edit.vue";

export default {
    name: "FoodCard",
    props: ["food"],
    components: {
        Edit
    }, 
    data() {
        return {
            showEditButtons: false
        }
    },
};

</script>


<style scoped > 

.card-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  color: black;
  border-radius: 50px;
  background-color: rgb(196, 247, 198);
  margin-left: 5%;
  margin-right: 5%;
  box-shadow: 2px 2px 6px rgba(154, 244, 154, 0.3);
  height: 120px;
}

.FoodName {
  font-size: 20px;
  display: flex;
  align-items: center;
  margin-left: 50px;
  font-weight: bold;
}

.NumServings {
  display: flex;
  align-items: center;
  margin-left: 40px;
  font-size: 15px;
}

.card-right {
  font-size: 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-left: auto;
  margin-right: 70px;
}

.icons{
    display: flex;
    justify-items: flex-end;
    margin-top: -45px;
    margin-right: -15px;
    margin-bottom: 20px;

}

.editButtons {
    margin-top: -150px;
    margin-left:-70px;
    position: absolute;
}

.icon{
    margin-right: 10px;
    margin-left: 10px;
}




</style>