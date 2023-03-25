<template>
    <div class="card-wrapper">
        <div class="exerName">
            <span>{{ exercise.exerName }}</span>
        </div>
        <div class="duration">
            <span>{{ exercise.duration }} Duration</span>
        </div>
        <div class="class-right">
            <span >{{ exercise.numCalories }} Calories </span>
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

.exerName {
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