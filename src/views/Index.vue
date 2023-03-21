<template>
    <header>
      <!-- <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" /> -->
  
      <div class="wrapper">
        <HelloWorld msg="You did it!" />
  
        <nav>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/about">About</RouterLink>
          <RouterLink to="/product">Product</RouterLink>
          <button @click="$emit('checkout')">Go to checkout</button>
        </nav>
      </div>
    </header>
  
    <RouterView />
  </template>