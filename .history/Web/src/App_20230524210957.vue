<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <header>
    <div class="wrapper">
      <!--RouterLink use to route the page that you want it to go to-->
      <nav>
          <img class="logo" src="./assets/images/logo.png" alt="">
          <router-link to="/">Home</router-link>
          <router-link to="/new">New</router-link>
          <router-link to="/bestsell">Best Sell</router-link>
          <router-link to="/discount">Discount</router-link>
          <span class="search"><input type="text" placeholder="search"></span>
          <router-link to="/cart">
          <div class="cart">
            <img  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAA5UlEQVR4nN2UsQ7BUBSGPwsGAxEziweQiGdQEpNX8QzSd5B0EJ7AKGG3moytCSPBQKXJGZpI6tzmVsKX3O075z+3PS38C08glONlEfCIBdyAGhmxiAWlPaukgJ6FgG1SQA7YiRiFaSkDR6kbfJJHIkaPS4srNWuNXAEusllNhd8AruK3tRN5MpGrcOfiTjGgJUUnoJjgdWTy6AZ1DNkYbM7YtHkVOCgaR5PPgIJpwEQaLGV1rVKS38VduUXG5IFzyq9YzVD5DsK0AZnTB/ZAADgWvDeC2LV9C973Axwp9oGuBe+HeQGdhY4nafPkOQAAAABJRU5ErkJggg==">
            Cart (0)
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
  padding: 10px;
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
  background-color: grey;
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
</style>
