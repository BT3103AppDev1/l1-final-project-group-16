<template>
  <div class="whitebox" ref="whitebox">
    <div class="buttons">
      <button class="edit">Edit</button>
      <button class="delete">Delete</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Edit",
  mounted() {
    // Add a click event listener on the window object
    window.addEventListener("click", this.handleClickOutside);
  },
  beforeUnmount() {
    // Remove the click event listener when the component is unmounted
    window.removeEventListener("click", this.handleClickOutside);
  },
  methods: {
    handleClickOutside(event) {
      // Check if the click event target is outside the whitebox
      if (!this.$refs.whitebox.contains(event.target)) {
        // Emit an event to the parent component to close the whitebox
        this.$emit("close");
      }
    },
  },
};
</script>
<style scoped>
.whitebox {
  background-color: white;
  border: 2px solid grey;
  justify-content: center;
  display: inline-flex;
}

.buttons {
  padding: 5px;
  border: 1px solid black;
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

button {
  margin-top: 10px;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 40px;
  width: 15vh;
  border: none;
}

.edit {
  background-color: green;
  justify-content: center;
  display: flex;
  border: 1px solid black;
}

.delete {
  background-color: red;
  display: flex;
  text-align: center;
  border: 1px solid black;
}
</style>