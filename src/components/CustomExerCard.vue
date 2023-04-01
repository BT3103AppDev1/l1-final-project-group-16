<template>
    <div class="card-wrapper">
        <div class="exerName">
            <span>{{ customcustomExer.exerName }}</span>
        </div>
        <div class="card-right">

        <div class="icons">
            <img  @click="showEditButtons=true" class="icon" src="src/assets/images/threedots.png" width="30" height="30">
            <Edit class="editButtons" v-if="showEditButtons == true"/>
            <img @click="quickAddForm" class="icon" src="src/assets/images/greenadd.png" width="30" height="30">

     
        </div>

            <span >{{ customcustomExer.numCalories }} Calories </span>

        </div>

    </div>


</template> 

<script>
import Edit from "@/components/Edit.vue";
export default {
    name: "CustomExerCard",
    props: ["customExer"],
    components: {
        Edit
    }, 
    data() {
        return {
            showEditButtons: false
        }
    }, 

    methods: {
        quickAddForm() {
            this.$router.push('/HomePage');
        }


    }
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

.exerName {
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
    position: fixed;
    display: flex;
    justify-items: flex-end;
    margin-top: -45px;
    margin-right: -15px;
    margin-bottom: 20px;

}

.icon{
    margin-right: 10px;
    margin-left: 10px;
}

.editButtons {
    position: fixed;
    margin-top: -150px;
    margin-left:-70px;
}


</style>