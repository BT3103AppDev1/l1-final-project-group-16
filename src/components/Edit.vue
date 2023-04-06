<template>
    <div class="whitebox">
    <div class="buttons">
        <button class="edit">Edit</button>
        <button class="delete" >Delete</button>
    </div>
</div>


</template>

<script>
export default {
    name: "Edit"
};

</script>

<style scoped>
.whitebox{
    background-color: white;
    margin-bottom:150px;
    border: 2px solid grey;
    height: 17vh;
    width: 17vh;
    justify-content: center;
    display: flex;
}

button{
    margin-top:10px;
    justify-content: center;
    align-items: center;
    text-align: center;
    border-radius:40px;
    width: 15vh;
    border: 1px solid black;
    
}

.edit{
    background-color: green;
    justify-content: center;
    display: flex;
}


.delete{
    background-color: red;
    display: flex;
    text-align: center;
}


</style>