import React from 'react';
import ProductListPage from "./pages/ProductList";
import { Route, Routes } from "react-router-dom";
import Cart from './pages/cart-page';
import './App.css'
import Details from './pages/details';
import Checkout from './pages/checkout-page';
import OrderConfirmation from './pages/orderConfirm';
import HomePage from './pages/home';

function App() {
  return (
    <>

      <Routes>
        <Route path='/' element={<HomePage></HomePage>}></Route>
        <Route path="/products" element={<ProductListPage></ProductListPage>}></Route>
        <Route path="/details/:id" element={<Details></Details>}></Route>
        <Route path="/cart" element={<Cart></Cart>}></Route>
        <Route path="/checkout" element={<Checkout></Checkout>}></Route>
        <Route path="/order" element={<OrderConfirmation></OrderConfirmation>}></Route>
      </Routes>

    </>
  );
}

export default App;
