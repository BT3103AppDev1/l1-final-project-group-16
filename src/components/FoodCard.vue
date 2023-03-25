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

 
}

.FoodName {
    display: flex;
    align-items: center;
    flex-basis: 12%;
    flex-grow: 1;
    margin-left: 20px;
    font-weight: bold;
}

.NumServings {
    display: flex;
    align-items: center;
    flex-basis: 12%;
    margin-left: 130px;
    gap: 12px;

}
.card-right {
    display:flex;
    justify-content: flex-end;
    align-items: flex-end;
    margin-right: 30px;
}



</style>