<template>
    <!-- End Navbar -->
    <div class="container-fluid py-4">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <h4 class="font-weight-bolder">All orders</h4>
                    </div>

                    <div class="card-body">

                        <div class="input-group input-group-outline mb-3">
                            <label class="form-label no-left-margin">Search</label>
                            <input type="text" v-model="search" autocomplete="off" class="form-control" required />
                        </div>

                        <div class="table-responsive p-0">
                            <table class="table align-items-center justify-content-center mb-0" id="table">
                                <thead>
                                    <tr>
                                        <th class="text-uppercase text-secondary opacity-7">User</th>
                                        <th class="text-uppercase text-secondary opacity-7">Address</th>
                                        <th class="text-uppercase text-secondary opacity-7">Total</th>
                                        <th class="text-uppercase text-secondary opacity-7">Order</th>
                                        <th class="text-uppercase text-secondary opacity-7">Status</th>
                                        <th class="text-uppercase text-secondary opacity-7">Actions</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr v-for="(order) in orders" v-bind:key="order._id.toString()">
                                        <td>
                                            <template v-if="order.paidVia == 'Stripe'">
                                                <span v-text="order.name"></span> <br />
                                                <span v-text="order.email"></span> <br />
                                                <span v-text="order.mobile"></span>
                                            </template>

                                            <template v-if="order.paidVia == 'PayPal'">
                                                <span v-text="order.details.payer.name.given_name + ' ' + order.details.payer.name.surname"></span> <br />
                                                <span v-text="order.details.payer.email_address"></span>
                                            </template>

                                            <template v-if="order.paidVia == 'COD'">
                                                <span v-text="order.name"></span> <br />
                                                <span v-text="order.email"></span> <br />
                                                <span v-text="order.mobile"></span> <br />
                                                <span v-text="order.country"></span>
                                            </template>
                                        </td>

                                        <td>
                                            <span v-if="order.paidVia == 'Stripe'" v-text="order.address"></span>

                                            <template v-if="order.paidVia == 'PayPal'">
                                                <span v-if="order.details.purchase_units.length > 0" v-text="getPaypalAddress(order.details.purchase_units[0].shipping.address)"></span>
                                            </template>

                                            <span v-if="order.paidVia == 'COD'" v-text="order.address"></span>
                                        </td>

                                        <td>
                                            $<span v-text="getTotal(order.cart, order.shippingCharges || 0)"></span>
                                        </td>

                                        <td>
                                            <a v-if="order.paidVia == 'Stripe'" v-bind:href="'https://dashboard.stripe.com/test/payments/' + order.stripePaymentId" target="_blank" v-text="order.paidVia"></a>

                                            <template v-if="order.paidVia == 'PayPal'">
                                                <template v-if="order.details.purchase_units.length > 0">
                                                    <template v-if="order.details.purchase_units[0].payments.captures.length > 0">
                                                        <a href="https://www.sandbox.paypal.com/mep/dashboard" target="_blank" v-text="order.paidVia"></a>
                                                    </template>
                                                </template>
                                            </template>

                                            <span v-if="order.paidVia == 'COD'" style="color: black;">Cash on delivery</span>
                                        </td>

                                        <td>
                                            <span v-text="order.status"></span>
                                        </td>

                                        <td>
                                            <router-link v-bind:to="'/orderDetail/' + order._id" class="text-secondary">
                                                Detail
                                            </router-link>

                                            <form v-if="typeof order.status == 'undefined' || order.status == 'Processing'" v-on:submit.prevent="markAsCompleted">
                                                <input type="hidden" name="_id" v-bind:value="order._id" required />

                                                <input type="submit" name="submit" value="Mark as complete" class="btn bg-gradient-primary" />
                                            </form>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div class="card-footer">
                        <button type="button" v-on:click="loadMore" class="btn btn-lg bg-gradient-primary btn-lg w-100 mt-4 mb-0" ref="btnLoadMore">Load more</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import axios from "axios"
    import swal from "sweetalert2"
    import store from "../vuex/store"

    export default {
        data() {
            return {
                page: 1,
                orders: [],
                originalOrders: [],
                search: ""
            }
        },

        methods: {
            getPaypalAddress: function (address) {
                let value = address.address_line_1 + " " + address.admin_area_2 + " " + address.admin_area_1 + " " + address.postal_code + " " + address.country_code
                return value
            },

            markAsCompleted: function () {
                const form = event.target
                const self = this

                swal.fire({
                    title: 'Are you sure ?',
                    text: "Do you want to mark this order as completed ?",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes'
                }).then(async function (result) {
                    if (result.isConfirmed) {
                        form.submit.setAttribute("disabled", "disabled")

                        const formData = new FormData(form)
                        const response = await axios.post(
                            self.$apiURL + "/admin/orders/markAsCompleted",
                            formData,
                            {
                                headers: self.$headers
                            }
                        )

                        if (response.data.status == "success") {
                            for (let a = 0; a < self.orders.length; a++) {
                                if (self.orders[a]._id == form._id.value) {
                                    self.orders[a].status = "Completed"
                                    break
                                }
                            }

                            form.submit.removeAttribute("disabled")
                            self.originalOrders = self.orders
                        } else {
                            swal.fire("Error", response.data.message, "error")
                        }
                    }
                })
            },

            getTotal: function (items, shippingCharges) {
                let total = 0
                for (let a = 0; a < items.length; a++) {
                    total += (parseInt(items[a].price) * items[a].units)
                }
                total += shippingCharges
                return total
            },

            loadMore: async function () {
                this.$refs.btnLoadMore.setAttribute("disabled", "disabled")

                this.page++
                this.getOrders()
            },

            getOrders: async function () {
                const formData = new FormData()
                formData.append("page", this.page)

                const response = await axios.post(
                    this.$apiURL + "/admin/orders/fetch",
                    formData,
                    {
                        headers: this.$headers
                    }
                )

                this.$refs.btnLoadMore.removeAttribute("disabled")

                if (response.data.status == "success") {
                    if (response.data.orders.length > 0) {
                        this.orders = response.data.orders
                        this.originalOrders = this.orders
                    }
                    store.commit("setUnReadOrderNotifications", 0)
                } else {
                    swal.fire("Error", response.data.message, "error")
                }
            }
        },

        mounted: function () {
            this.getOrders()
        },

        watch: {
            search: async function (to, from) {
                if (this.search.length < 2) {
                    this.orders = this.originalOrders
                    return
                }

                const formData = new FormData()
                formData.append("search", this.search)

                const response = await axios.post(
                    this.$apiURL + "/admin/orders/search",
                    formData,
                    {
                        headers: this.$headers
                    }
                )

                if (response.data.status == "success") {
                    this.orders = response.data.orders
                } else {
                    swal.fire("Error", response.data.message, "error")
                }
            }
        }
    }
</script>

<style>
    #table th,
    #table td {
        padding-left: 0px !important;
    }
</style>