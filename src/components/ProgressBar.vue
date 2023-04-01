<template>
  <div class="container" style="display: flex; justify-content: center;">
      <div class="circular-progress" ref="progress">
        <div class="value-container">{{ progressValue }}%</div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        progressValue: 0,
        progressEndValue: 90,
        speed: 4,
      };
    },
    mounted() {
      this.progress();
    },
    methods: {
      progress() {
        const progressBar = this.$refs.progress;
        const valueContainer = progressBar.querySelector(".value-container");
  
        const progress = setInterval(() => {
          this.progressValue++;
          valueContainer.textContent = `${this.progressValue}%`;
          progressBar.style.background = `conic-gradient(
            #4d5bf9 ${this.progressValue * 3.6}deg,
            #cadcff ${this.progressValue * 3.6}deg
          )`;
          if (this.progressValue == this.progressEndValue) {
            clearInterval(progress);
          }
        }, this.speed);
      },
    },
  };
  </script>
  
  <style scoped>
  *,
  *:before,
  *:after {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  .circular-progress {
    position: relative;
    height: 150px;
    width: 150px;
    border-radius: 50%;
    display: grid;
    place-items: center;
  }
  
  .circular-progress:before {
    content: "";
    position: absolute;
    height: 84%;
    width: 84%;
    background-color: #ffffff;
    border-radius: 50%;
  }
  
  .value-container {
    position: relative;
    font-family: "Poppins", sans-serif;
    font-size: 30px;
    color: #231c3d;
  }
  </style>
  