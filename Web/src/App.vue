<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
          <img class="logo" src="./assets/images/GreatStore.png" alt="Great Store">
          <router-link to="/">Home</router-link>
          <router-link to="/new">New Product</router-link>
          <router-link to="/bestsell">Best Sell</router-link>
          <router-link to="/discount">Discount</router-link>
          <span class="search">
            <input type="text" placeholder="Search">
            <i class="fas fa-search"></i>
          </span>
          
          <router-link to="/cart">
            <div class="cart">
              <button onclick="addToCart()">
                <i class="fas fa-shopping-cart"></i>
                Cart (0)
              </button>
            </div>
            
          </router-link>
      </nav>
    </div>
  </header>
  <router-view/>
  <footer>
  </footer>
</template>

<style scoped>
*{
  margin: 0;
}

.wrapper{
  width: 100%;
}
header {
  line-height: 1.5;
  max-height: 100vh;
}
.search{
  padding-left: 10rem;
}
.search input{
  padding: 20px;
}
.logo {
  padding-left: 50px;
  padding-right: 100px;
  width: 50px; 
  height: 50px; 
  border-radius: 10px;
}

nav {
  padding: 20px;
  color: rgb(30, 30, 109);
  background-color: rgb(253 186 116);;
  width: 100%;
  font-size: 20px;
  text-align: start;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  color: aliceblue;
  text-decoration: none;
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

 @media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;
    padding: 1rem 0;
    margin-top: 1rem;
  }
}

.cart {
  display: flex;
  align-items: center;
}

.cart button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #333;
}

.cart button i {
  margin-right: 5px;
}

.cart button:hover {
  color: blue;
}

</style>

