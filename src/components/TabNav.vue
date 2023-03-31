<template>
    <div style="width: 90%">
        <ul class="nav nav-tabs">
            <!-- <img class="images" src="src/assets/images/back.png" width="35" height="35" @click="goBack">
            <i class="fas fa-arrow-left"></i> -->
            <li v-for="tab in tabs" :key="tab" class="nav-item">
                <a class="nav-link" :class="{ active: tab === selected }" @click="setTab(tab)">
                    {{ tab }}
                </a>
            </li>
        </ul>
    
        <slot></slot>
    
    </div>
</template>

<script>
// import 'bootstrap/dist/css/bootstrap.min.css';

export default {
    props: {
        tabs: {
            type: Array, 
            required: true,
        },
        selected: {
            type: String, 
            required: true, 
        }
    },
    methods: {
        setTab(tab) {
            this.$emit('selected', tab);
        }, 

        goBack() {
            this.$router.go(-1);
        }
    }
}

</script>

<style scoped>


.nav-tabs{
    justify-content: center;
    display: flex;
    flex-direction: row;
    zoom: 1.5;
    cursor: pointer;
    background-color: inherit;
}

.nav-tabs:hover{

}

.images {
    margin-left: -50px;
    margin-right: 50px;

}


</style>>
