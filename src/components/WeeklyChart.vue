<template>
    <line-chart :data="data" />
    
    </template>
    <script>
    export default {
        data() {
            return {
                data : 
                [{
                    name: 'Net Food Intake', data: {
                        "28-03-2023": 3307,
                        "29-03-2023": 3200,
                        "30-03-2023": 2388,
                        "31-03-2023": 707,
                        "01-04-2023": 1313.5,
                        "02-04-2023": 1200,
                        "03-04-2023": 1654.5,
                    }
                },
                {
                    name: 'Calorie Goal', data: {
                        "28-03-2023": 1800,
                        "29-03-2023": 1800,
                        "30-03-2023": 1800,
                        "31-03-2023": 1800,
                        "01-04-2023": 1800,
                        "02-04-2023": 1800,
                        "03-04-2023": 1800,                    
                    }
                }
            ]
            }
        }
    }    
    
    
    </script>
    <style>
    #app {
    /* font-family: Avenir, Helvetica, Arial, sans-serif; */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top:60px;
    }
    </style>