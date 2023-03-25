<template>
    <div class="card-wrapper">
        <div class="ExerName">
            <span>{{ exercise.ExerName }}</span>
        </div>
        <div class="duration">
            <span>{{ exercise.duration }} Servings</span>
        </div>
        <div class="class-right">
            <span >{{ exercise.Calories }} Calories </span>
        </div>
</div>


</template> 

<script>
export default {
    name: "ExerCard",
    props: ["exercise"],
};

</script>

<style scoped > 

.card-wrapper {
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
    color: black;
    border-radius: 50px;
    background-color: rgb(151, 183, 133);
    align-items: center;
 
}

.FoodName {
    display: flex;
    align-items: center;
    flex-basis: 12%;
    gap: 16px;
        
   
    }

.NumServings {
    display: flex;
    align-items: center;
    flex-basis: 12%;
    gap: 12px;

}
.card-content {
    display:flex;
    justify-content: center;
    align-items: center;
}



</style>