//create context
//provide the state to the context
//wrap the context into root component
//consume the context using useContext()

import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export const ShoppingCartContext = createContext(null)
function ShoppingCartProvider({ children }) {

  const [listOfProducts, setListOfProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [productsDetails, setProductsDetails] = useState(null)
  const [cartItems, setCartItems] = useState([])
  const navigate = useNavigate()

  function handleAddToCartBtn(getProductDetails, action) {
    console.log(getProductDetails)
    let copyExistingCartItems = [...cartItems];
    const findIndexOfCurrentItem = copyExistingCartItems.findIndex((cartItems) => cartItems.id === getProductDetails.id
    )
    console.log(findIndexOfCurrentItem)

    if (findIndexOfCurrentItem === -1) {
      copyExistingCartItems.push({
        ...getProductDetails,
        quantity: 1,  // Set initial quantity to 1
        totalPrice: getProductDetails?.price,
      });
    } else {
      // If product is in the cart, update the quantity
      const currentItem = copyExistingCartItems[findIndexOfCurrentItem];

      if (action === 'increase') {
        // Increase quantity by 1
        currentItem.quantity += 1;
      } else if (action === 'decrease' && currentItem.quantity > 1) {
        // Decrease quantity by 1, but not below 1
        currentItem.quantity -= 1;
      }

      // Update the total price based on the new quantity
      currentItem.totalPrice = currentItem.quantity * currentItem.price;
    }

    setCartItems(copyExistingCartItems)
    localStorage.setItem("cartItems", JSON.stringify(copyExistingCartItems))
    navigate('cart')
    console.log(copyExistingCartItems);
  }

  function removeFromCart(productId) {
    setCartItems((prevCartItems) => {
      const updatedCartItems = prevCartItems.filter(item => item.id !== productId);

      // Save the updated cart to localStorage
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));

      return updatedCartItems;
    });
  }

  async function fetchListOfProducts() {
    const apiResponse = await fetch('https://dummyjson.com/products')
    const result = await apiResponse.json();
    setListOfProducts(result.products)
    setLoading(false)
  }

  useEffect(() => {
    fetchListOfProducts();
    const savedCartItems = localStorage.getItem("cartItems");
    if (savedCartItems) {
      setCartItems(JSON.parse(savedCartItems));
    }
  }, [])



  const [couponCode, setCouponCode] = useState('')
  const [shipping, setShipping] = useState(10)
  const [tax, setTax] = useState(20)

  function handleApplyPromoCode() {
    if (couponCode === 'SUPER30') {
      setShipping(0)
      setTax(0)
      alert(`${couponCode} is a valid coupon for us!`)
      localStorage.setItem('coupon', JSON.stringify(couponCode));
      // setCouponCode('')
    }
    else {
      setShipping(10)
      setTax(20)
      alert(`The coupon ${couponCode} is invalid!`)
      setCouponCode('')
    }
  }

  function handleDelCoupon() {
    localStorage.removeItem('coupon')
    setShipping(10)
    setTax(20)
    setCouponCode('')
    console.log('Coupon Deleted')
  }
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    pin: '',
    phone: '',
    email: '',
    paymentMethod: '',
  });

  return (
    <ShoppingCartContext.Provider value={{ listOfProducts, loading, setLoading, productsDetails, setProductsDetails, handleAddToCartBtn, cartItems, removeFromCart, couponCode, setCouponCode, shipping, setShipping, tax, setTax, handleApplyPromoCode, handleDelCoupon,formData, setFormData  }}>{children}</ShoppingCartContext.Provider>
  );
}
export default ShoppingCartProvider
