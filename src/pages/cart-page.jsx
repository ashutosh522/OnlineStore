import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ShoppingCartContext } from "../context";
import { useState } from "react";

function Cart() {
  const { cartItems, removeFromCart, handleAddToCartBtn, tax, setTax,shipping, setShipping, couponCode, setCouponCode,handleApplyPromoCode } = useContext(ShoppingCartContext);
  const navigate = useNavigate();

  return (
    <>
      <div className="container py-5">
        <h1 className="mb-5 text-center">Your Shopping Cart</h1>
        <div className="row">
          <div className="col-lg-8">
            {/* Cart Items  */}
            {cartItems.map((item) => (
              <div className="card mb-4" key={item.id}>
                <div className="card-body">
                  <div className="row cart-item mb-3">
                    <div className="col-md-3">
                      <img src={item.images[0]} alt="Product 1" className="img-fluid rounded" />
                    </div>
                    <div className="col-md-5">
                      <h5 className="card-title">{item.title}</h5>
                      <p className="text-muted">Category: {item.category}</p>
                    </div>
                    <div className="col-md-2">
                      <div className="input-group">
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          type="button"
                          onClick={() => handleAddToCartBtn(item, 'decrease')}
                          disabled={item.quantity === 1}
                        >
                          -
                        </button>
                        <input
                          style={{ maxWidth: '100px' }}
                          type="text"
                          className="form-control form-control-sm text-center quantity-input"
                          value={item.quantity}
                        />
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          type="button"
                          onClick={() => handleAddToCartBtn(item, 'increase')}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="col-md-2 text-end">
                      <p className="fw-bold">${item.totalPrice.toFixed(2)}</p>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Continue Shopping Button */}
            <div className="text-start mb-4">
              <a onClick={() => navigate('/products')} className="btn btn-outline-primary">
                <i className="bi bi-arrow-left me-2"></i>Continue Shopping
              </a>
            </div>
            {cartItems.length === 0 ? <h4>Please add something to your cart!</h4> : null}
          </div>
          <div className="col-lg-4" style={{ visibility: cartItems.length === 0 ? 'hidden' : 'visible' }}>
            {/* Cart Summary */}
            <div className="card cart-summary">
              <div className="card-body">
                <h5 className="card-title mb-4">Order Summary</h5>
                <div className="d-flex justify-content-between mb-3">
                  <span>Subtotal</span>
                  <span>${cartItems.reduce((acc, cur) => acc + cur.totalPrice, 0).toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <span>Shipping</span>
                  <span>${shipping}</span>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <span>Tax</span>
                  <span>${tax}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between mb-4">
                  <strong>Total</strong>
                  <strong>${(cartItems.reduce((acc, cur) => acc + cur.totalPrice, 0) + tax + shipping).toFixed(2)}</strong>
                </div>
                <button className="btn btn-primary w-100" onClick={()=> navigate('/checkout')}>Proceed to Checkout</button>
              </div>
            </div>

            {/* Promo Code */}
            <div className="card mt-4">
              <div className="card-body">
                <h5 className="card-title mb-3">Apply Promo Code</h5>
                <div className="input-group mb-3">
                  <input type="text" className="form-control" placeholder="Enter promo code" value={couponCode} onChange={(event) => setCouponCode(event.target.value)} />
                  <button className="btn btn-outline-secondary" type="button" onClick={handleApplyPromoCode} >Apply</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
