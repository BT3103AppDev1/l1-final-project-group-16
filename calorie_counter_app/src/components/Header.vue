<template>
    <header>
        <h1>{{ title }}</h1>
        <Tab text="Dashboard" />
        <Tab text="Food Log" />
        <Tab text="Exercise Log" />
        <Tab text="Profile Page" />
        <Tab text="Sign Out" />

    </header>
</template>


<script>
import Tab from './Tab'

export default {
    name: 'Header',
    props: {
        title: String 
    },
    components: {
        Tab,
    }
}