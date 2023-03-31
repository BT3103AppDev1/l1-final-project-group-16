<template>
    <div class="card-wrapper">
        <div class="exerName">
            <span>{{ exercise.exerName }}</span>
        </div>
        <div class="duration">
            <span>Duration: {{ exercise.duration }}</span>
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

.exerName {
  font-size: 20px;
  display: flex;
  align-items: center;
  margin-left: 50px;
  font-weight: bold;
}

.duration {
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





</style>