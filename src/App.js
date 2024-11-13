import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbars from "./component/Navbars";
import HomeScreen from "./component/Screens/HomeScreen";
import LoginScreen from "./component/Screens/LoginScreen";
import SignUp from "./component/Screens/SignUp";
// import Footers from './component/Footers';

import "./App.css";
import CartScreen from "./component/Screens/CartScreen";

function App() {
  return (
    <a>
      <Navbars />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/cart" element={<CartScreen />} />
      </Routes>
      l̥
    </a>
  );
}

export default App;
