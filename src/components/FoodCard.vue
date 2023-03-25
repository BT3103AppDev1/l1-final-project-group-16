<template>
    <div class="card-wrapper">
        <div class="FoodName">
<<<<<<< HEAD
            <span>{{ food.foodName }}</span>
        </div>
        <div class="NumServings">
            <span>{{ food.numServings }} Servings</span>
        </div>
        <div class="card-right">
            <span >{{ food.numCalories }} Calories </span>
=======
            <span>{{ card.FoodName }}</span>
        </div>
        <div class="NumServings">
            <span>{{ card.numServings }} Servings</span>
        </div>
        <div class="class-right">
            <span >{{ card.Calories }} Calories </span>
>>>>>>> 84e95be885173b61bf4a3dbd5f87e4fb2ff40a80
        </div>
</div>


</template> 

<script>
export default {
    name: "FoodCard",
<<<<<<< HEAD
    props: ["food"],
=======
    props: ["card"],
>>>>>>> 84e95be885173b61bf4a3dbd5f87e4fb2ff40a80
};

</script>

<style scoped > 

.card-wrapper {
<<<<<<< HEAD
    display: block;
    justify-content: center;
    margin-bottom: 10px;
    color: black;
    border-radius: 50px;
    background-color: rgb(196, 247, 198);
    align-items: center;
    margin-left: 10%;
    margin-right: 10%;
    box-shadow: 2px 2px 6px rgba(154, 244, 154, 0.3);

=======
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
    color: black;
    border-radius: 50px;
    background-color: rgb(151, 183, 133);
    align-items: center;
>>>>>>> 84e95be885173b61bf4a3dbd5f87e4fb2ff40a80
 
}

.FoodName {
    display: flex;
    align-items: center;
    flex-basis: 12%;
<<<<<<< HEAD
    flex-grow: 1;
    margin-left: 20px;
    font-weight: bold;
}
=======
    gap: 16px;
        
   
    }
>>>>>>> 84e95be885173b61bf4a3dbd5f87e4fb2ff40a80

.NumServings {
    display: flex;
    align-items: center;
    flex-basis: 12%;
<<<<<<< HEAD
    margin-left: 130px;
    gap: 12px;

}
.card-right {
    display:flex;
    justify-content: flex-end;
    align-items: flex-end;
    margin-right: 30px;
=======
    gap: 12px;

}
.card-content {
    display:flex;
    justify-content: center;
    align-items: center;
>>>>>>> 84e95be885173b61bf4a3dbd5f87e4fb2ff40a80
}



</style>