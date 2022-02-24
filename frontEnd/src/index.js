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
import {Provider} from 'react-redux'
import store from './Redux/store';
import {CookiesProvider} from 'react-cookie'
import SearchPage from './screens/searchPage';


ReactDOM.render(

   <Router> 
     <Provider store={store} >
     <CookiesProvider>
  <Header/>
  <Routes>
    <Route path="/product/:id" element={<Product />} />
    <Route path="/products/:category" element={<AllProducts />} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/admin" element={<AdminPanel />} />
    <Route path="/auth" element={<Auth />} />
    <Route path="/search" element={<SearchPage />} />
    <Route path="/" element={<Home />} />
   
  </Routes>
  <Footer />
  </CookiesProvider>
  </Provider>
</Router> 
,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
