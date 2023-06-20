<template>
	<div class="section no-pad-bot" id="index-banner">
		<div class="container">

			<div class="row">
				<div class="col m8">
					<h1 class="text-center">Checkout</h1>
				</div>
			</div>

			<div class="row">
				<div class="col m8">
					<div class="card">

	                    <div class="card-body" style="padding: 20px;">
	                    	<p v-if="cartEmpty">The cart is empty.</p>

	                    	<form v-else>
	                    		<!-- credit card UI will be rendered here -->
								<div id="stripe-card-element" style="padding-top: 20px;"></div>

	                    		<div class="input-field col m6">
									<input id="name" name="name" type="text" required v-model="name" />
									<label for="name">Name</label>
								</div>

								<div class="input-field col m6">
									<input id="email" name="email" type="email" required v-model="email" />
									<label for="email">E-mail</label>
								</div>

								<div class="input-field col m6">
									<input id="mobile" name="mobile" type="text" required v-model="mobile" />
									<label for="mobile">Mobile</label>
								</div>

								<div class="input-field col m6">
									<input id="country" name="country" type="text" required v-model="country" />
									<label for="country">Country</label>
								</div>

								<div class="input-field col m6">
									<textarea id="address" name="address" class="materialize-textarea" required v-model="address"></textarea>
									<label for="address">Address</label>
								</div>

								<button type="button" class="waves-effect waves-light btn" v-on:click="getStripeClientSecret" style="margin-bottom: 20px;" v-bind:disabled="paymentLoading">Pay via stripe</button>

								<p>Or</p>

								<!-- paypal button will be rendered here using Javascript -->
								<div id="btn-paypal-checkout"></div>

								<p v-text="paymentStatus"></p>

								<button type="button" class="waves-effect waves-light btn" v-on:click="cashOnDelivery" style="margin-bottom: 20px;" v-bind:disabled="paymentLoading">Cash on delivery</button>
	                    	</form>
	                    </div>
	                </div>
	            </div>

	            <div class="col m4">
	            	<div class="card">
	            		<div class="card-body">
	            			<div class="table-responsive">
		                        <table class="table align-items-center justify-content-center mb-0" id="products-table">
		                            <thead>
		                                <tr>
		                                    <th>Name</th>
		                                    <th>Price</th>
		                                    <th>Total</th>
		                                </tr>
		                            </thead>

		                            <tbody>
		                                <tr v-for="(product, index) in products" v-bind:key="product._id">
		                                	<td v-text="product.name"></td>
		                                	<td v-text="'$' + product.price + ' x ' + product.units"></td>
		                                	<td v-text="'$' + (product.price * product.units)"></td>
		                                </tr>
		                            </tbody>

		                            <tfoot>

		                            	<tr>
		                            		<td colspan="4" style="text-align: right;">
		                            			<div style="margin-right: 20px;">
		                            				<b>Total: </b>
		                            				$<span v-text="total"></span>
		                            			</div>
		                            		</td>
		                            	</tr>
		                            </tfoot>
		                        </table>
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
	import store from "../vuex/store"
	import { loadScript } from "@paypal/paypal-js"

    export default {
    	data() {
    		return {
    			clientSecret: "",
    			cardElement: null,
    			stripe: null,
    			email: "",
    			name: "",
    			mobile: "",
    			address: "",
    			country: "",
    			paymentLoading: false,
    			paymentStatus: "",
    			cartEmpty: false,
    			total: 0,
    			products: []
    		}
    	},

    	methods: {
    		cashOnDelivery: function () {
    			const self = this
    			swal.fire({
					title: 'Cash on delivery',
					text: "I want to process my order on cash on delivery.",
					icon: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Yes'
				})
    			.then(async function (result) {
					if (result.isConfirmed) {
						let products = []
		    			const cookieParts = document.cookie.split("; ")
		    			for (let a = 0; a < cookieParts.length; a++) {
							const keyValue = cookieParts[a].split("=")
							if (keyValue[0] == "products") {
								products = keyValue[1]
								break
							}
						}

		    			self.paymentLoading = true
		                self.paymentStatus = "Processing your order..."

		                const formData = new FormData()
		                formData.append("products", products)
		                formData.append("name", self.name)
		                formData.append("email", self.email)
		                formData.append("mobile", self.mobile)
		                formData.append("country", self.country)
		                formData.append("address", self.address)

		                const response = await axios.post(
		                    self.$apiURL + "/cashOnDelivery",
		                    formData
		                )

		                self.paymentLoading = false
		                self.paymentStatus = ""

		                if (response.data.status == "success") {
		                	swal.fire("Success", response.data.message, "success")
		                	document.cookie = "products=" + JSON.stringify([])
		                	store.commit("setCartCounter", 0)
		                	self.cartEmpty = true
		                } else {
		                    swal.fire("Error", response.data.message, "error")
		                }
					}
				})
    		},
    		
    		paidViaPaypal: async function(details) {
    			let products = []
    			const cookieParts = document.cookie.split("; ")
    			for (let a = 0; a < cookieParts.length; a++) {
					const keyValue = cookieParts[a].split("=")
					if (keyValue[0] == "products") {
						products = keyValue[1]
						break
					}
				}

    			const formData = new FormData()
                formData.append("products", products)
                formData.append("details", JSON.stringify(details))
                formData.append("name", this.name)
                formData.append("email", this.email)
                formData.append("mobile", this.mobile)
                formData.append("country", this.country)
                formData.append("address", this.address)

                const response = await axios.post(
                    this.$apiURL + "/paidViaPaypal",
                    formData
                )

                this.paymentLoading = false
                this.paymentStatus = ""

                if (response.data.status == "success") {
                	swal.fire("Success", response.data.message, "success")
                	document.cookie = "products=" + JSON.stringify([])
                	store.commit("setCartCounter", 0)
                	this.cartEmpty = true
                } else {
                    swal.fire("Error", response.data.message, "error")
                }
			},

    		confirmPayment: async function(paymentId) {
    			let products = []
    			const cookieParts = document.cookie.split("; ")
    			for (let a = 0; a < cookieParts.length; a++) {
					const keyValue = cookieParts[a].split("=")
					if (keyValue[0] == "products") {
						products = keyValue[1]
						break
					}
				}

    			const formData = new FormData()
                formData.append("paymentId", paymentId)
                formData.append("products", products)
                formData.append("name", this.name)
                formData.append("email", this.email)
                formData.append("mobile", this.mobile)
                formData.append("country", this.country)
                formData.append("address", this.address)

                const response = await axios.post(
                    this.$apiURL + "/confirmStripePayment",
                    formData
                )

                this.paymentLoading = false
                this.paymentStatus = ""

                if (response.data.status == "success") {
                	swal.fire("Success", response.data.message, "success")
                	document.cookie = "products=" + JSON.stringify([])
                	store.commit("setCartCounter", 0)
                	this.cartEmpty = true
                } else {
                    swal.fire("Error", response.data.message, "error")
                }
			},

    		payViaStripe: function() {
    			if (this.cardElement == null || this.stripe == null) {
    				return
    			}

    			const self = this

			    // execute the payment
			    this.stripe.confirmCardPayment(this.clientSecret, {
		            payment_method: {
		                    card: this.cardElement,
		                    billing_details: {
		                        "email": this.email,
		                        "name": this.name,
		                        "phone": this.mobile
		                    },
		                },
		            })
		            .then(function(result) {

		                // Handle result.error or result.paymentIntent
		                if (result.error) {
		                    // console.log(result.error)
		                    self.paymentLoading = false
		                    self.paymentStatus = result.error
		                } else {
		                    // console.log("The card has been verified successfully...", result.paymentIntent.id)

		                    self.confirmPayment(result.paymentIntent.id)
		                }
		            })
			},

    		getStripeClientSecret: async function () {
    			this.paymentLoading = true
    			this.paymentStatus = "Processing your payment..."

    			const formData = new FormData()
                formData.append("total", this.total)

                const response = await axios.post(
                    this.$apiURL + "/getStripeClientSecret",
                    formData
                )

                if (response.data.status == "success") {
                	this.clientSecret = response.data.clientSecret
                	this.payViaStripe()
                } else {
                    swal.fire("Error", response.data.message, "error")

                    this.paymentLoading = false
                    this.paymentStatus = ""
                }
            }
    	},

    	mounted: async function () {
    		const self = this
    		const cookieParts = document.cookie.split("; ")
			this.total = 0
			for (let a = 0; a < cookieParts.length; a++) {
				const keyValue = cookieParts[a].split("=")
				if (keyValue[0] == "products") {
					const products = JSON.parse(keyValue[1])
					this.products = products
					for (let a = 0; a < products.length; a++) {
	        			this.total += (products[a].units * products[a].price)
	        		}
					break
				}
			}

			const response = await axios.post(
                this.$apiURL + "/getConfigurations",
                null
            )

            if (response.data.status == "success") {
                let configurations = response.data.configurations
                if (configurations != null) {
                    const user = store.getters.getUser
                    if (user != null) {
                    	this.name = user.name
                    	this.email = user.email
                    }
                }
            }

			if (this.total == 0) {
				this.cartEmpty = true
			} else {
				this.cartEmpty = false

				const response = await axios.post(
                    this.$apiURL + "/getConfigurations",
                    null
                )

                if (response.data.status == "success") {
                	this.stripe = Stripe(response.data.configurations.stripePublishableKey)
			        let elements = this.stripe.elements()
			        this.cardElement = elements.create('card')
			        this.cardElement.mount('#stripe-card-element')

					try {
					    let paypal = await loadScript({ "client-id": response.data.configurations.paypalClientId })

					    try {
					        await paypal.Buttons({

					            // Set your environment
					            env: 'sandbox', // sandbox | production

					            // Specify the style of the button
					            style: {
					                label: 'checkout',
					                size: 'medium', // small | medium | large | responsive
					                shape: 'pill', // pill | rect
					                color: 'gold', // gold | blue | silver | black,
					                layout: 'horizontal'
					            },

					            // PayPal Client IDs - replace with your own
					            // Create a PayPal app: https://developer.paypal.com/developer/applications/create

					            client: {
					                sandbox: response.data.configurations.paypalClientId,
					                production: response.data.configurations.paypalClientId
					            },

					            funding: {
					                allowed: [
					                    paypal.FUNDING.CARD,
					                    paypal.FUNDING.ELV
					                ]
					            },

					            createOrder: function(data, actions) {
									// Set up the transaction
									return actions.order.create({
										purchase_units: [{
											amount: {
												value: self.total,
											}
										}]
									})
							    },

							    onApprove: function(data, actions) {
									// This function captures the funds from the transaction.

									return actions.order.capture().then(function(details) {
										// This function shows a transaction success message to your buyer.

										self.paidViaPaypal(details)
									})
								},
					            
					            onCancel: function (data, actions) {
					                console.log(data)
					            }

					        }).render("#btn-paypal-checkout")
					    } catch (error) {
					        console.error("failed to render the PayPal Buttons", error)
					    }
					} catch (error) {
					    console.error("failed to load the PayPal JS SDK script", error)
					}
                } else {
                    swal.fire("Error", response.data.message, "error")
                }
			}
    	}
    }
</script>