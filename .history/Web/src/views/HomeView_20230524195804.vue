<template>

  <div class="wrapper">
    <!--Best Sell Section-->
    <div class="padding-top"></div>
    <div class="feature-box">
        <div class="picture">
          <img src="https://images.squarespace-cdn.com/content/v1/5811b29bb8a79b740e329a5c/1625044021495-1TGDZCHZ50V281IX5AXR/front-and-back-t-shirt-mockup-template.png" alt="">
        </div>
        <div class="text">
          <h2>New T-Shirt</h2>
          <p>best nylon quality selected</p><br><br>
          <h2>Price : <span style="color: rgb(44, 187, 170);">$90:00</span></h2><br><br><br>
          <button>Add to cart</button>
        </div>
      </div>


    <!--Hero Section-->
    <div class="padding-top"></div>
      <div class="hero">
        <h1>Famous</h1>
      </div>

      <div class="padding-top"></div>
    <!--Product Section-->
    <div class="product-row" v-for="row in productRows" :key="row[0].name">
      <div v-for="product in row" :key="product.name" class="product-box">
        <img :src="product.pictureUrl" alt="Product image" class="product-image" />
        <h3>{{ product.name }}</h3>
        <p>{{ product.detail }}</p>
        <div class="padding-top"></div>
        <div class="shirt-price">
            <div>Price:</div>
            <div>{{ product.price }}</div>
        </div>
        <button class="product-btn">+</button>
      </div>
    </div>
    <div class="padding-top"></div>
    <footer>
      <div class="footer-container container">
          <div class="content_1">
              <img src="https://i.postimg.cc/htGyQ4JB/footer-logo.png" alt="logo">
              <p>The customer is at the heart of our<br>unique business model, which includes<br>design.</p>
              <img src="https://i.postimg.cc/Nj9dgJ98/cards.png" alt="cards">
          </div>
          <div class="content_2">
              <h4>SHOPPING</h4>
              <a href="#sellers">Clothing Store</a>
              <a href="#sellers">Trending Shoes</a>
              <a href="#sellers">Accessories</a>
              <a href="#sellers">Sale</a>
          </div>
          <div class="content_3">
              <h4>SHOPPING</h4>
              <a href="./contact.html">Contact Us</a>
              <a href="https://payment-method-sb.netlify.app/" target="_blank">Payment Method</a>
              <a href="https://delivery-status-sb.netlify.app/" target="_blank">Delivery</a>
              <a href="https://codepen.io/sandeshbodake/full/Jexxrv" target="_blank">Return and Exchange</a>
          </div>
          <div class="content_4">
              <h4>NEWLETTER</h4>
              <p>Be the first to know about new<br>arrivals, look books, sales & promos!</p>
              <div class="f-mail">
                  <input type="email" placeholder="Your Email">
                  <i class='bx bx-envelope'></i>
              </div>
              <hr>
          </div>
      </div>
      <div class="f-design">
          <div class="f-design-txt container">
              <p>Design and Code by code.sanket</p>
          </div>
      </div>
  </footer>
  </div>
</template>

<script>
import axios from 'axios';
import { computed, onMounted, ref } from 'vue';

export default {
  setup() {
    const products = ref([]);

    onMounted(async () => {
      try {
        const response = await axios.get('http://localhost:3000/');
        products.value = response.data;
      } catch (err) {
        console.error(err);
      }
    });

    const productRows = computed(() => {
      const rows = [];
      for (let i = 0; i < products.value.length; i += 4) {
        rows.push(products.value.slice(i, i + 4));
      }
      return rows;
    });

    return { productRows };
  }
};
</script>

<style>
*{
  margin: 0;
}

.wrapper{
  margin: auto;
}

.padding-box{
  padding-top: 20px;
}
.box-block{
  display: flex;
  }
.box{
  box-shadow: 0 0 10px;
  background-color: whitesmoke;
  width: 25%;
  height: 300px;
  border-radius: 10px;
}

.box>h2{
  text-align: center;
}

.text button{
  border-radius: 10px;
  padding: 20px;
  color: white;
  background-color: blue;
  filter: drop-shadow(5px 5px 1px rgba(0, 0, 0, 0.25));
  cursor: pointer;
}
.text button:hover{
  background-color: rgb(0, 0, 0);
}

body{
  margin: auto;
  width: 100%;
  background-color: rgb(226, 241, 149);
}
.padding-top{
  padding-top: 30px;
}

.feature-box{
  box-shadow: 0 0 30px ;
  align-content: center;
  background-color: whitesmoke;
  width: 100%;
  height: 400px;
  display: flex;
  border-radius: 10px;
}
.text{
  padding: 40px;
}
.picture{
  width: 50%;
}
.picture img{
  margin: 20px;
  width: 90%;
  height: 90%;
}
.hero{
  background-color: whitesmoke;
  width: 100%;
  height: 100px;
  box-shadow: 0 0 10px;
  border-radius: 10px;
  display: table;
}
.hero h1{
  text-align: center;
  display: table-cell;
  vertical-align: middle;
  -webkit-text-stroke: 2px black;
  color: white;
  font-family: Rockwell, "Courier Bold", Courier, Georgia, Times, "Times New Roman", serif;
}
.product-row {
  display: flex;
}

.product-box {
  background-color: whitesmoke;
  box-shadow: 0 0 10px;
  border-radius: 10px;
  padding: 10px;
  margin: 10px;
  flex: 1;
  text-align: center;
}
.product-box:hover{
  background-color: skyblue;
  cursor: pointer;
}
.shirt-price{
  width: 90%;
  display: flex;
  justify-content: space-between;
}

.product-image {
  background-color: antiquewhite;
  margin: auto;
  width: 80%;
  height: 60%;
}
.product-btn{
  border-radius: 50%;
  padding: 10px;
  background-color: blue;
  color: white;
}
.product-btn:hover{
  background-color: red;
  cursor: pointer;
}
.footer{
  background-color: gray;
  width: 100%;
  height: 100px;
  display: table;
}
.footer h1{
  text-align: center;
  display: table-cell;
  vertical-align: middle;
  -webkit-text-stroke: 2px black;
  color: white;
  font-family: Rockwell, "Courier Bold", Courier, Georgia, Times, "Times New Roman", serif;
}

</style>