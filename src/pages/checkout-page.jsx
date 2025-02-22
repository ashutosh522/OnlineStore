import { useContext } from "react";
import { ShoppingCartContext } from "../context";
import { useNavigate } from "react-router-dom";
function Checkout() {
  const { cartItems, couponCode, tax, shipping, handleDelCoupon, formData, setFormData } = useContext(ShoppingCartContext);
  const isFormIncomplete = !formData.firstName || !formData.phone || !formData.address;
  const navigate = useNavigate()

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Dynamically update the field by using the 'name' of the input
    }));
  };



  function HandleFormSubmit(e) {
    e.preventDefault();
    console.log(formData);
  }


  return (
    <>

      <div class="bg-light">
        <div class="container">
          <div class="py-2 text-center">
            <h2>Checkout form</h2>
          </div>

          <div class="row">
            <div class="col-md-4 order-md-2 mb-4">
              <h4 class="d-flex justify-content-between align-items-center mb-3">
                <span class="text-muted">Your cart</span>
                <span class="badge badge-secondary badge-pill">3</span>
              </h4>
              <ul class="list-group mb-3">
                {cartItems.map((item) =>
                  <li class="list-group-item d-flex justify-content-between lh-condensed" key={item.id}>
                    <div>
                      <h6 class="my-0">{item.title}</h6>
                      <small class="text-muted">Qty: {item.quantity}</small>
                    </div>
                    <span class="text-muted">${item.totalPrice}</span>
                  </li>
                )}

                <li class="list-group-item d-flex justify-content-between">
                  <span>Tax </span>
                  <strong>${tax}</strong>
                </li>

                <li class="list-group-item d-flex justify-content-between">
                  <span>Shipping </span>
                  <strong>${shipping}</strong>
                </li>

                <li class="list-group-item d-flex justify-content-between bg-light" >
                  <div class="text-success" style={{ display: couponCode ? '' : 'none' }}>
                    <h6 class="my-0">Promo code</h6>
                    <small>{JSON.parse(localStorage.getItem('coupon'))} <a style={{ cursor: 'pointer', visibility: couponCode ? '' : 'hidden' }} onClick={handleDelCoupon}>X</a></small>
                  </div>
                  <span class="text-success">{couponCode ? 'Free Shipping & Tax' : 'No coupon code entered'}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between">
                  <span>Total (USD)</span>
                  <strong>$ {(cartItems.reduce((acc, cur) => acc + cur.totalPrice, 0) + tax + shipping).toFixed(2)}</strong>
                </li>
              </ul>

            </div>
            <div class="col-md-8 order-md-1">
              <h4 class="mb-3">Billing address</h4>

              <form class="needs-validation" onSubmit={HandleFormSubmit}>
                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label for="firstName">First name</label>

                    <input type="text"
                      class="form-control"
                      id="firstName"
                      name="firstName"
                      placeholder="Enter your first name"
                      onChange={handleInputChange}
                      value={formData.firstName} />
                    <div class="invalid-feedback">
                      Valid first name is required.
                    </div>



                  </div>
                  <div class="col-md-6 mb-3">
                    <label for="lastName">Last name</label>
                    <input type="text"
                      class="form-control"
                      id="lastName"
                      name="lastName"
                      placeholder="Enter your last name"
                      onChange={handleInputChange}
                      value={formData.lastName}
                    />
                    <div class="invalid-feedback">
                      Valid last name is required.
                    </div>
                  </div>
                </div>

                <div class="mb-3">
                  <label for="username">Phone number</label>
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <span class="input-group-text">+91</span>
                    </div>
                    <input type="text"
                      class="form-control"
                      id="phone"
                      name="phone"
                      placeholder="Enter your phone number"
                      onChange={handleInputChange}
                      value={formData.phone}

                    />
                    <div class="invalid-feedback" style={{ width: '100%' }}>
                      Your username is required.
                    </div>
                  </div>
                </div>

                <div class="mb-3">
                  <label for="email">Email <span class="text-muted">(Optional)</span></label>
                  <input type="email"
                    class="form-control"
                    id="email"
                    name="email"
                    placeholder="you@example.com"
                    onChange={handleInputChange}
                    value={formData.email} />
                  <div class="invalid-feedback">
                    Please enter a valid email address for shipping updates.
                  </div>
                </div>

                <div class="mb-3">
                  <label for="address">Address</label>
                  <input type="text"
                    class="form-control"
                    id="address"
                    name="address"
                    placeholder="1234 Main St"
                    onChange={handleInputChange}
                    value={formData.address} />
                  <div class="invalid-feedback">
                    Please enter your shipping address.
                  </div>
                </div>

                <div class="row">

                  <div class="col-md-4 mb-3">
                    <label for="state">State</label>
                    <select class="custom-select d-block w-100" id="state" name="state" value={formData.state} onChange={handleInputChange}>
                      <option value="">Choose...</option>
                      <option value="Goa">Goa</option>
                      <option value="Gujarat">Gujarat</option>
                      <option value="Haryana">Haryana</option>
                      <option value="Madhya Pradesh">Madhya Pradesh</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Punjab">Punjab</option>
                      <option value="Rajasthan">Rajasthan</option>
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                      <option value="Chandigarh">Chandigarh</option>
                    </select>

                    <div class="invalid-feedback">
                      Please provide a valid state.
                    </div>
                  </div>

                  <div class="col-md-5 mb-3">
                    <label for="country">City</label>
                    <select class="custom-select d-block w-100" id="city" name="city" value={formData.city} onChange={handleInputChange} >
                      <option value="">Choose...</option>
                      <option value="Gwalior">Gwalior</option>
                      <option value="New Delhi">New Delhi</option>
                      <option value="Mumbai">Mumbai</option>
                      <option value="Kolkata">Kolkata</option>
                      <option value="Chennai">Chennai</option>
                      <option value="Bengaluru">Bengaluru</option>
                      <option value="Hyderabad">Hyderabad</option>
                      <option value="Pune">Pune</option>
                    </select>

                    <div class="invalid-feedback">
                      Please select a valid country.
                    </div>
                  </div>

                  <div class="col-md-3 mb-3">
                    <label for="zip">Pincode</label>
                    <input type="text" class="form-control" id="pin" placeholder="" name="pin" value={formData.pin} onChange={handleInputChange} />
                    <div class="invalid-feedback">
                      Pin code required.
                    </div>
                  </div>
                </div>
                <hr class="mb-4" />
                <div class="custom-control custom-checkbox">
                  <input type="checkbox" class="custom-control-input" id="same-address" />
                  <label class="custom-control-label" for="same-address">Shipping address is the same as my billing address</label>
                </div>
                <div class="custom-control custom-checkbox">
                  <input type="checkbox" class="custom-control-input" id="save-info" />
                  <label class="custom-control-label" for="save-info">Save this information for next time</label>
                </div>
                <hr class="mb-4" />

                <h4 class="mb-3">Payment</h4>

                <div class="d-block my-3">
                  <div class="custom-control custom-radio">
                    <input id="credit" name="paymentMethod" type="radio" class="custom-control-input" required="" />
                    <label class="custom-control-label" for="credit">Credit card</label>
                  </div>
                  <div class="custom-control custom-radio">
                    <input id="debit" name="paymentMethod" type="radio" class="custom-control-input" required="" />
                    <label class="custom-control-label" for="debit">Debit card</label>
                  </div>
                  <div class="custom-control custom-radio">
                    <input id="paypal" name="paymentMethod" type="radio" class="custom-control-input" required="" />
                    <label class="custom-control-label" for="paypal">Cash on Delivery</label>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label for="cc-name">Name on card</label>
                    <input type="text" class="form-control" id="cc-name" placeholder="" />
                    <small class="text-muted">Full name as displayed on card</small>
                    <div class="invalid-feedback">
                      Name on card is required
                    </div>
                  </div>
                  <div class="col-md-6 mb-3">
                    <label for="cc-number">Credit card number</label>
                    <input type="text" class="form-control" id="cc-number" placeholder="" required="" />
                    <div class="invalid-feedback">
                      Credit card number is required
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-3 mb-3">
                    <label for="cc-expiration">Expiration</label>
                    <input type="text" class="form-control" id="cc-expiration" placeholder="" required="" />
                    <div class="invalid-feedback">
                      Expiration date required
                    </div>
                  </div>
                  <div class="col-md-3 mb-3">
                    <label for="cc-expiration">CVV</label>
                    <input type="text" class="form-control" id="cc-cvv" placeholder="" required="" />
                    <div class="invalid-feedback">
                      Security code required
                    </div>
                  </div>
                </div>
                <hr class="mb-4" />


                <a onClick={() => navigate('/cart')} className="btn btn-outline-primary" >
                  <i className="bi bi-arrow-left me-2"></i>Back to cart
                </a>

                {/* <button class="btn btn-outline-primary" onClick={() => navigate('/order')} type="submit">Continue to payment
                    <i className="bi bi-arrow-right me-2"></i>
                  </button> */}


                <button class="btn btn-outline-primary" disabled={isFormIncomplete} type="submit" onClick={() => navigate('/order')} style={{ marginLeft: '20px' }}>Continue to checkout  <i className="bi bi-arrow-right me-2"></i></button>
              </form>
            </div>
          </div>
          <footer class="my-5 pt-5 text-muted text-center text-small">
            <p class="mb-1">© 2025-2026 RAthoreeAShutoshh</p>
            <ul class="list-inline">
              <li class="list-inline-item"><a href="#">Privacy</a></li>
              <li class="list-inline-item"><a href="#">Terms</a></li>
              <li class="list-inline-item"><a href="#">Support</a></li>
            </ul>
          </footer>
        </div>

      </div>

    </>
  )
}
export default Checkout;