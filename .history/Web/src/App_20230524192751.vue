<template>
  <div>
    <header>
      <h1>Computer Store</h1>
      <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/new">New</router-link>
        <router-link to="/bestsell">Best Sell</router-link>
        <router-link to="/discount">Discount</router-link>
        <span class="search"><input type="text" placeholder="search"></span>
        <router-link to="/cart" />
      </nav>
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<style scoped>
header {
  background-color: #af771e;
  color: white;
  padding: 20px;
  margin: auto;
}

nav {
  margin-top: 10px;
}

nav a {
  color: white;
  margin-right: 10px;
  text-decoration: none;
}
</style>
