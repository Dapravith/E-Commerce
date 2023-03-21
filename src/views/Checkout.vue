<template>
    <div class="home">
    <h1>This is an checkout page</h1>
    <br />
    <button @click="$emit('cancel')">Cancel</button>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>