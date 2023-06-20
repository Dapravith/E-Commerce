<template>
  <div class="section no-pad-bot" id="index-banner">
    <div class="container-fluid">
      <br /><br />
      <div class="row center">
        <img src="/assets/logo.png" alt="Logo" />
        <h5 class="header col s12 light">Discover the Perfect Furniture for Your Home</h5>
      </div>
      <br /><br />

      <div class="row">
        <div class="col offset-m8 m4">
          <div class="input-field col s12">
            <select v-on:change="onchangeSortBy">
              <option value="newestToOldest">Newest to oldest</option>
              <option value="oldestToNewest">Oldest to newest</option>
              <option value="priceDescending">Price (descending)</option>
              <option value="priceAscending">Price (ascending)</option>
            </select>
            <label>Sort by</label>
          </div>
        </div>
      </div>

      <div class="row" v-if="isLoading">
        <div class="col offset-m6 m4">
          <div class="preloader-wrapper big active">
            <div class="spinner-layer spinner-blue-only">
              <div class="circle-clipper left">
                <div class="circle"></div>
              </div>

              <div class="gap-patch">
                <div class="circle"></div>
              </div>

              <div class="circle-clipper right">
                <div class="circle"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div
            class="swiper-slide col m4"
            v-for="product in products"
            :key="product._id"
          >
            <div class="card blue-grey darken-1">
              <div class="card-content white-text">
                <img
                  v-if="product.images.length > 0"
                  :src="`${this.$apiURL}/${product.images[0]}`"
                  style="width: 100%; height: 300px; object-fit: contain;"
                />
                <span class="card-title" v-text="product.name"></span>
                <p>$<span v-text="product.price"></span></p>
              </div>

              <div class="card-action">
                <router-link :to="`/product/${product._id}`">More detail</router-link>

                <span style="float: right; color: white;">
                  In stock: <span v-text="product.itemsInStock || 0"></span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>

      <div class="row">
        <div class="col offset-m6 m4">
          <button
            type="button"
            class="waves-effect waves-light btn"
            v-on:click="loadMore"
            ref="btnLoadMore"
          >
            Load more
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import swal from "sweetalert2";
import store from "../vuex/store";
import Swiper from "swiper";

export default {
  data() {
    return {
      page: 1,
      products: [],
      sortBy: "",
      categories: [],
      category: "",
      isLoading: false,
      swiper: null,
    };
  },

  computed: {
    search: function () {
      return store.getters.getSearch;
    },
  },

  methods: {
    onchangeSortBy: function () {
      this.page = 1;
      this.sortBy = event.target.value;
      this.getData();
    },

    onclickCategory: function () {
      this.page = 1;
      this.category = event.target.innerHTML;
      this.getData();
    },

    loadMore: function () {
      this.$refs.btnLoadMore.setAttribute("disabled", "disabled");

      this.page++;
      this.getData();
    },

    getConfigurations: async function () {
      const response = await axios.post(this.$apiURL + "/getConfigurations", null);

      if (response.data.status == "success") {
        const configurations = response.data.configurations;
        this.categories = configurations.categories || [];
      }
    },

    getData: async function () {
      this.isLoading = true;

      const formData = new FormData();
      formData.append("page", this.page);
      formData.append("sortBy", this.sortBy);
      formData.append("category", this.category);
      formData.append("search", this.search);

      const response = await axios.post(
        this.$apiURL + "/products/fetch",
        formData
      );

      this.isLoading = false;
      this.$refs.btnLoadMore.removeAttribute("disabled");

      if (response.data.status == "success") {
        this.products = response.data.products;

        // Initialize Swiper after data is loaded
        if (!this.swiper) {
          this.swiper = new Swiper(".swiper-container", {
            slidesPerView: 3,
            spaceBetween: 20,
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },
          });
        } else {
          // Update Swiper if it's already initialized
          this.swiper.update();
        }
      } else {
        swal.fire("Error", response.data.message, "error");
      }
    },
  },

  mounted: function () {
    this.getConfigurations();
    this.getData();

    var elems = document.querySelectorAll("select");
    var instances = M.FormSelect.init(elems, {});
  },

  watch: {
    search: function (to, from) {
      this.getData();
    },
  },
};
</script>

<style>
.swiper-container {
  width: 100%;
  padding-top: 50px;
  padding-bottom: 50px;
}

.swiper-slide {
  width: 33.33%;
  padding: 0 20px;
}
</style>
