<template>
  <footer class="page-footer orange">
    <div class="container">
      <div class="row">
        <div class="col l6 s12">
          <h5 class="white-text">Furniture Shop</h5>
          <p class="grey-text text-lighten-4">
            We are a team of college students working on this project like it's our full-time job. Any amount would help
            support and continue development on this project and is greatly appreciated.
          </p>
        </div>
        <div class="col l3 s12">
          <h5 class="white-text">Settings</h5>
          <ul>
            <li><a class="white-text" href="#!">Link 1</a></li>
            <li><a class="white-text" href="#!">Link 2</a></li>
            <li><a class="white-text" href="#!">Link 3</a></li>
            <li><a class="white-text" href="#!">Link 4</a></li>
          </ul>
        </div>
        <div class="col l3 s12">
          <h5 class="white-text">Connect</h5>
          <ul>
            <li><a class="white-text" href="#!">Link 1</a></li>
            <li><a class="white-text" href="#!">Link 2</a></li>
            <li><a class="white-text" href="#!">Link 3</a></li>
            <li><a class="white-text" href="#!">Link 4</a></li>
          </ul>
        </div>
      </div>
      <div class="row">
        <div class="col l6 s12">
          <h5 class="white-text">Subscribe</h5>
          <p class="grey-text text-lighten-4">Subscribe to our newsletter for the latest updates and promotions:</p>
          <form class="subscribe-form">
            <div class="input-field">
              <input id="subscribe-email" type="email" class="validate">
              <label for="subscribe-email">Email Address</label>
            </div>
            <button class="btn waves-effect waves-light" type="submit" name="action">Subscribe</button>
          </form>
        </div>
        <div class="col l3 s12">
          <h5 class="white-text">Address</h5>
          <p class="grey-text text-lighten-4">123 Main Street, City, Country</p>
        </div>
        <div class="col l3 s12">
          <h5 class="white-text">Location</h5>
          <div id="map" style="height: 200px;"></div>
        </div>
      </div>
    </div>
    <div class="footer-copyright">
      <div class="container">
        Made by <a class="orange-text text-lighten-3" href="http://materializecss.com">Materialize</a>
      </div>
    </div>
  </footer>
</template>

<script>
import axios from "axios";
import swal from "sweetalert2";
import store from "../../vuex/store";

export default {
  name: "AppFooter",

  data() {
    return {
      page: 0,
    };
  },

  computed: {
    user: function () {
      return store.getters.getUser;
    },

    login: function () {
      return store.getters.getLogin;
    },
  },

  mounted() {
    // Initialize and display the map
    this.initMap();
  },

  methods: {
    initMap() {
      // Replace the latitude and longitude with your desired location coordinates
      const latitude = 51.5074;
      const longitude = -0.1278;

      // Create a map instance
      const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: latitude, lng: longitude },
        zoom: 14,
      });

      // Add a marker to the map
      const marker = new google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map: map,
        title: "Furniture Shop",
      });
    },
  },
};
</script>

<style>
.page-footer {
  display: flex;
  flex-direction: column;
  min-height: 60vh; /* Set a reduced minimum height for the footer */
}

.container {
  flex: 1; /* Expand the container to fill available vertical space */
}

.footer-bottom {
  background-color: #f57c00;
  padding: 10px 0;
  text-align: center;
  height: 40px; /* Set a reduced height for the bottom section */
  line-height: 40px; /* Align text vertically in the bottom section */
  font-size: 14px; /* Adjust font size as needed */
}
</style>
