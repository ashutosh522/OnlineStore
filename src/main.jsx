import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import  ShoppingCartContext  from './context/index.jsx'
import { StrictMode } from 'react'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ShoppingCartContext>
        <App />
      </ShoppingCartContext>
    </BrowserRouter>
    </StrictMode>
 
);
//Change the wrapping of App component from strict mode to Browser Router.
//Wrap the app component in the context created using useContext
