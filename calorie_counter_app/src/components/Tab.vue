<template>
    <button @click="onClick()"
    class="btn"> {{ text }}</button>

</template>

<script> 
export default {
    name: 'Tag',
    props: {
        text: String
    },

    methods: {
        onClick() {
            console.log('click')
        }
    }
}
</script>