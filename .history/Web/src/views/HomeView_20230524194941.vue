<template>
  <div>
    <header>
      <nav>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Product</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
        <div class="icons">
          <span class="search-icon"><i class="fa fa-search"></i></span>
          <span class="account-icon" @click="toggleAuthentication">
            <i v-if="authenticated" class="fa fa-user"></i>
            <i v-else class="fa fa-sign-in"></i>
          </span>
        </div>
      </nav>
      <div class="homepage-content">
        <!-- Rest of your homepage content goes here -->
        <h1>Welcome to our website!</h1>
        <p>Explore our products and get in touch with us.</p>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  data() {
    return {
      authenticated: false
    };
  },
  methods: {
    toggleAuthentication() {
      this.authenticated = !this.authenticated;
    }
  }
};
</script>

<style scoped>
header {
  background: #f2f2f2;
  padding: 10px;
}

nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
}

nav ul li {
  margin-right: 10px;
}

nav ul li a {
  text-decoration: none;
  color: #333;
}

.icons {
  display: flex;
}

.search-icon,
.account-icon {
  margin-left: 10px;
  cursor: pointer;
}

.fa {
  font-size: 18px;
}

.homepage-content {
  padding: 20px;
}
</style>
