import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Recommendations from './pages/Recommendations';
import Wishlist from './pages/Wishlist';
import Account from './pages/Account';
import Search from './pages/Search';
import Signup from './pages/SignUp';
import Login from './pages/Login';
import Footer from './components/Footer';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/Recommendations"
          element={<Recommendations />}
        />
        <Route
          path="/Wishlist"
          element={<Wishlist />}
        />
        <Route
          path="/Account"
          element={<Account />}
        />
        <Route
          path="/Search"
          element={<Search />}
        />
        <Route
          path="/Login"
          element={<Login />}
        />
        <Route
          path="/Signup"
          element={<Signup />}
        />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
