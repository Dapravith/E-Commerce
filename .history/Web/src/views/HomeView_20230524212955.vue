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
          <h2>Price : <span style="color: rgb(44, 187, 170);">$1100:00</span></h2><br><br><br>
          <button class="pre-order-btn"><i class="fas fa-clock"></i> Pre-Order</button>
        <button class="shop-now-btn"><i class="fas fa-shopping-cart"></i> Shop Now</button>
        </div>
      </div>


    <!--Hero Section-->
    <div class="padding-top"></div>
      <div class="hero">
        <h1>Best Sell Product</h1>
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

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  max-width: 1200px;
  width: 90%;
  margin: 0 auto;
}

.wrapper{
  margin: auto;
}

.padding-box{
  padding-top: 50px;
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

/* //........ Footer ...... // */

footer {
  background-color: #333;
  color: white;
  padding: 40px 0;
}

.footer-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.footer-container .content_1 img {
  width: 150px;
}

.footer-container .content_1 p {
  margin-top: 20px;
  line-height: 1.5;
}

.footer-container .content_1 img,
.footer-container .content_1 p {
  margin-bottom: 20px;
}

.footer-container .content_2,
.footer-container .content_3,
.footer-container .content_4 {
  flex-basis: 20%;
}

.footer-container h4 {
  font-size: 18px;
  margin-bottom: 10px;
}

.footer-container a {
  display: block;
  margin-bottom: 5px;
  color: white;
  text-decoration: none;
}

.footer-container a:hover {
  text-decoration: underline;
}

.f-mail {
  display: flex;
  margin-bottom: 10px;
}

.f-mail input[type="email"] {
  width: 100%;
  padding: 8px;
  border: none;
  border-radius: 4px;
  margin-right: 5px;
}

.f-mail i.bx {
  font-size: 20px;
  color: white;
  background-color: #666;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
}

hr {
  border: none;
  border-top: 1px solid #666;
  margin: 10px 0;
}

.f-design {
  background-color: #222;
  padding: 10px 0;
}

.f-design-txt {
  text-align: center;
}

.f-design-txt p {
  margin: 0;
  color: #999;
  font-size: 12px;
}

</style>