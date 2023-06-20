<template>
    <!-- End Navbar -->
    <div class="container-fluid py-4">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <h4 class="font-weight-bolder">Add product</h4>
                    </div>

                    <div class="card-body">
                        <form v-on:submit.prevent="addProduct" enctype="multipart/form-data">
                            <div class="input-group input-group-outline mb-3">
                                <label class="form-label no-left-margin">Name</label>
                                <input type="text" class="form-control" name="name" autocomplete="off" required />
                            </div>

                            <div class="input-group input-group-outline mb-3">
                                <label class="form-label no-left-margin">Description</label>
                                <textarea name="description" class="form-control" style="margin-top: 50px;" required></textarea>
                            </div>

                            <div class="input-group input-group-outline mb-3">
                                <label class="form-label no-left-margin">Price ($)</label>
                                <input type="number" min="0" autocomplete="off" name="price" class="form-control" required />
                            </div>

                            <div class="input-group input-group-outline mb-3">
                                <label class="form-label no-left-margin">Items in stock (0 means unlimited, for digital products)</label>
                                <input type="number" min="0" name="itemsInStock" autocomplete="off" class="form-control" required />
                            </div>

                            <div class="input-group input-group-outline mb-3">
                                <label class="form-label no-left-margin">Categories</label>
                                <select name="categories[]" class="form-control" v-on:change="onchangeCategory">
                                    <option value="">Select category</option>
                                    <option v-for="category in categories" v-text="category" v-bind:value="category"></option>
                                </select>
                            </div>

                            <div class="input-group input-group-outline mb-3">
                                <label class="form-label no-left-margin">Add new category</label>
                                <input type="text" name="category" autocomplete="off" v-bind:value="category" class="form-control" />
                            </div>

                            <h3>Specifications</h3>
                            <div class="row" v-for="(spec, index) in specs">
                                <div class="col-md-6">
                                    <div class="input-group input-group-outline mb-3">
                                        <label class="form-label no-left-margin">Key</label>
                                        <input type="text" v-model="spec.key" autocomplete="off" class="form-control" required />
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="input-group input-group-outline mb-3">
                                        <label class="form-label no-left-margin">Value</label>
                                        <input type="text" v-model="spec.value" autocomplete="off" class="form-control" required />

                                        <i class="fa fa-close" style="position: relative;
                                            top: 50px;
                                            left: 10px;
                                            cursor: pointer;" v-on:click="removeSpec(index)"></i>
                                    </div>
                                </div>
                            </div>

                            <button type="button" v-on:click="addSpec" class="btn bg-gradient-primary mt-4 mb-0">Add specs</button>

                            <div class="input-group input-group-outline mb-3">
                                <label class="form-label no-left-margin">Images</label>
                                <input type="file" multiple accept="image/*" name="images" class="form-control" v-on:change="previewImages" ref="images" required />
                            </div>

                            <div v-for="(image, index) in images" class="row" style="margin-top: 20px;">
                                <div class="col-md-8">
                                    <img v-bind:src="image.src" style="width: 100%;" />
                                </div>
                            </div>

                            <div class="text-center">
                                <button type="submit" class="btn btn-lg bg-gradient-primary btn-lg w-100 mt-4 mb-0" ref="btnAddProduct">Add product</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import axios from "axios"
    import swal from "sweetalert2"

    export default {
        data() {
            return {
                categories: [],
                category: "",
                specs: [],
                images: []
            }
        },

        methods: {
            previewImages: function () {
                const self = this
                const files = this.$refs["images"].files

                for (let a = 0; a < files.length; a++) {
                    const file = files[a]
                    const fileReader = new FileReader()

                    fileReader.onload = function (event) {
                        self.images[a] = {
                            src: event.target.result,
                            size: files[a].size
                        }
                    }

                    fileReader.readAsDataURL(file)
                }
            },

            addSpec: function () {
                this.specs.push({
                    key: '',
                    value: ''
                })
            },

            removeSpec: function (index) {
                this.specs.splice(index, 1)
            },

            onchangeCategory: function () {
                this.category = event.target.value
            },

            addProduct: async function () {
                const form = event.target
                const formData = new FormData(form)
                formData.append("specs", JSON.stringify(this.specs))

                this.$refs["btnAddProduct"].setAttribute("disabled", "disabled")

                const response = await axios.post(
                    this.$apiURL + "/admin/products/add",
                    formData,
                    {
                        headers: this.$headers
                    }
                )

                this.$refs["btnAddProduct"].removeAttribute("disabled")

                if (response.data.status == "success") {
                    form.reset()
                }

                swal.fire("Add product", response.data.message, response.data.status)
            },

            getData: async function () {
                const response = await axios.post(
                    this.$apiURL + "/getConfigurations",
                    null
                )

                if (response.data.status == "success") {
                    const configurations = response.data.configurations
                    this.categories = configurations.categories || []
                }
            }
        },

        mounted: function () {
            this.getData()
        }
    }
</script>

<style>
    .no-left-margin::before {
        width: auto !important;
    }
</style>