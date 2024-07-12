import React, { useState } from 'react';
import { RouterProvider, createBrowserRouter, createHashRouter } from "react-router-dom";
import MainLayout from './components/Layout/MainLayout';
import HomePage from './components/Pages/HomePage';
import Products from './components/Products/Products';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import { ToastContainer } from 'react-toastify';
import StoreContextProvider from './Context/StoreContext'; 
import Cart from './components/Cart/Cart';
import Checkout from './components/Checkout/Checkout';
import {jwtDecode}  from 'jwt-decode'; 

export default function App() {
  const [userData, setUserData] = useState(null);

  function saveUserData() {
    let encodedToken = localStorage.getItem('token');
    if (encodedToken) {
      let decodedToken = jwtDecode(encodedToken);
      setUserData(decodedToken);
    }
  }

  let routes = createHashRouter([
    {
      path: '',
      element: <MainLayout userData={userData} />,
      children: [
        { index: true, element: <HomePage /> },
        { path: 'products', element: <Products /> },
        { path: 'product-details/:id', element: <ProductDetails /> },
        { path: 'register', element: <Register /> },
        { path: 'reactProject', element: <Register /> },
        { path: 'login', element: <Login saveUserData={saveUserData} /> },
        { path: 'cart', element: <Cart /> },
        { path: 'checkout', element: <Checkout /> },
      ]
    }
  ]);

  return (
    <>
      <ToastContainer theme='colored' />
      <div className='main'>
        <StoreContextProvider>
          <RouterProvider router={routes} />
        </StoreContextProvider>
      </div>
    </>
  );
}
