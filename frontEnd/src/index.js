import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import reportWebVitals from './reportWebVitals';
import Header from './HomeComponents/Header';
import Footer from './HomeComponents/Footer';
import Home from './screens/Home';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AllProducts from './screens/AllProducts';
import Product from './screens/Product';
import Cart from './screens/Cart';
import Profile from './screens/Profile';
import AdminPanel from './Admin/AdminPanel';
import Auth from './screens/auth';
ReactDOM.render(

   <Router> 
  <Header/>
  <Routes>
    <Route path="/product/:id" element={<Product />} />
    <Route path="/products/:category" element={<AllProducts />} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/admin" element={<AdminPanel />} />
    <Route path="/auth" element={<Auth />} />
    <Route path="/" element={<Home />} />
   
  </Routes>
  <Footer />
</Router> 
,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
