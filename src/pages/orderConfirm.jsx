import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ShoppingCartContext } from "../context";
import { nanoid } from "nanoid";
function OrderConfirmation() {
  const navigate = useNavigate();
  const { formData } = useContext(ShoppingCartContext);

  const date = new Date;
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const orderID = nanoid(5);
  const orderDate = `${day}-${month}-${year}`;
  

  return (
    <div class="text-center">
      <h3>Thank you for placing your order!</h3>
      <p>Order Confirmation from {formData.firstName} {formData.lastName}</p>
      <p>Order ID: {orderID}</p>
      <p>Order Date: {orderDate}</p>
      <p>Your order will be delivered to {formData.address} within next 5 working days.</p>
      <a className="btn btn-outline-primary" onClick={() => navigate('/products')}>Continue Shopping
      </a>

    </div>
  )
}
export default OrderConfirmation;