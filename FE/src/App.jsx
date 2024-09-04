import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Recommendations from './pages/Recommendations';
import Wishlist from './pages/Wishlist';
import Account from './pages/Account';
import SearchResults from './pages/SearchResults';
import Signup from './pages/SignUp';
import Login from './pages/Login';
import Footer from './components/Footer';
import Gamedetails from './pages/GameDetails';
import { AuthContextProvider } from './context';
import ProtectedLayout from './layouts/ProtectedLayout.jsx';

const App = () => {
  return (
    <AuthContextProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/SearchResults" element={<SearchResults />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Gamedetails" element={<Gamedetails />} />
          
{/* Wenn die Rout gesperrt werden soll: Zuerst unter "Still unprotected routes" die jeweilige Route auskommentieren 
und dann unter "Protected routes" das auskommentierte der Route entfernen. */}
        {/* Still unprotected routes */}
          <Route path="/Recommendations" element={<Recommendations />} />
          <Route path="/Wishlist" element={<Wishlist />} />
          {/* <Route path="/Account" element={<Account />} /> */}

        {/* Protected routes */}
          <Route element={<ProtectedLayout />}>
            {/* <Route path="/Recommendations" element={<Recommendations />} /> */}
            {/* <Route path="/Wishlist" element={<Wishlist />} /> */}
            <Route path="/Account" element={<Account />} />
            
          </Route>
        </Routes>
        <Footer />
      </Router>
    </AuthContextProvider>
  );
};

export default App;