<template>
    <!-- End Navbar -->
    <div class="container-fluid py-4" v-if="order != null">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <h2 class="font-weight-bolder">Order detail</h2>
                    </div>

                    <div class="card-body">
                        <div class="table-responsive p-0">
                            <table class="table align-items-center justify-content-center mb-0" id="table">
                                <thead>
                                    <tr>
                                        <th class="text-uppercase text-secondary opacity-7">Name</th>
                                        <th class="text-uppercase text-secondary opacity-7">Price</th>
                                        <th class="text-uppercase text-secondary opacity-7">Units</th>
                                        <th class="text-uppercase text-secondary opacity-7">Total</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr v-for="(item) in order.cart" v-bind:key="item._id.toString()">
                                        <td>
                                            <span v-text="item.name"></span>
                                        </td>

                                        <td>
                                            $<span v-text="item.price"></span>
                                        </td>

                                        <td>
                                            <span v-text="item.units"></span>
                                        </td>

                                        <td>
                                            $<span v-text="parseInt(item.price) * item.units"></span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div class="card-footer">
                        <h3>Total: $<span v-text="totalOrder"></span></h3>
                    </div>
                </div>
            </div>
        </div>

        <div class="row" style="margin-top: 30px;">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <h2 class="font-weight-bolder">Customer detail</h2>
                    </div>

                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6">
                                <template v-if="order.paidVia == 'Stripe'">
                                    <p>User: <span v-text="order.name"></span> <br />
                                        <span v-text="order.email"></span> <br />
                                        <span v-text="order.mobile"></span> <br />
                                        <span v-text="order.address"></span>
                                    </p>
                                </template>

                                <template v-if="order.paidVia == 'PayPal'">
                                    <span v-text="order.details.payer.name.given_name + ' ' + order.details.payer.name.surname"></span> <br />
                                    <span v-text="order.details.payer.email_address"></span> <br />
                                    <span v-if="order.details.purchase_units.length > 0" v-text="getPaypalAddress(order.details.purchase_units[0].shipping.address)"></span>
                                </template>

                                <template v-if="order.paidVia == 'COD'">
                                    <span v-text="order.name"></span> <br />
                                    <span v-text="order.email"></span> <br />
                                    <span v-text="order.mobile"></span> <br />
                                    <span v-text="order.country"></span>
                                </template>
                            </div>

                            <div class="col-md-6">
                                <template v-if="order.paidVia == 'PayPal'">
                                    <p>
                                        <a href="https://www.sandbox.paypal.com/mep/dashboard" target="_blank" v-text="order.paidVia"></a>
                                    </p>
                                </template>

                                <template v-if="order.paidVia == 'Stripe'">
                                    <a v-bind:href="'https://dashboard.stripe.com/test/payments/' + order.stripePaymentId" target="_blank" v-text="order.paidVia"></a>
                                </template>

                                <span v-if="order.paidVia == 'COD'" style="color: black;">Cash on delivery</span>

                                <p v-text="order.status"></p>
                            </div>
                        </div>
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
                order: null,
                orderId: this.$route.params._id
            }
        },

        computed: {
            totalOrder() {
                if (this.order == null) {
                    return 0
                }

                let total = 0
                for (let a = 0; a < this.order.cart.length; a++) {
                    total += (parseInt(this.order.cart[a].price) * this.order.cart[a].units)
                }
                return total
            }
        },

        methods: {
            getPaypalAddress: function (address) {
                let value = address.address_line_1 + " " + address.admin_area_2 + " " + address.admin_area_1 + " " + address.postal_code + " " + address.country_code
                return value
            },
            
            getData: async function () {
                const formData = new FormData()
                formData.append("orderId", this.orderId)

                const response = await axios.post(
                    this.$apiURL + "/admin/orders/fetchSingle",
                    formData,
                    {
                        headers: this.$headers
                    }
                )

                if (response.data.status == "success") {
                    this.order = response.data.order
                } else {
                    swal.fire("Error", response.data.message, "error")
                }
            }
        },

        mounted: function () {
            this.getData()
        }
    }
</script>

<style>
    #table th,
    #table td {
        padding-left: 0px !important;
    }
</style>