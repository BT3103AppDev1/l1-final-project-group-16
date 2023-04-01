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
    height: 15vh;
    width: 15vh;
    justify-content: center;
    display: flex;
}

button{
    margin-top:10px;
    justify-content: center;
    align-items: center;
    text-align: center;
    border-radius:40px;
    width: 13vh;
    border: 1px solid black;
    
}

.edit{
    background-color: green;
}


.delete{
    background-color: red;
}


</style>