<template>
    <div style="width: 30%">
        <ul class="nav nav-tabs">
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


</style>>
