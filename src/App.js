import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbars from "./component/Navbars";
import HomeScreen from "./component/Screens/HomeScreen";
import LoginScreen from "./component/Screens/LoginScreen";
import SignUp from "./component/Screens/SignUp";
// import Footers from './component/Footers';
import "./App.css";
import Adminhome from "./component/Screens/Adminhome";
// import UserHome from "./component/Screens/UserHome";
import CategoryForm from "./component/Screens/CategoryForm";
import ProductForm from "./component/Screens/ProductForm";
import CategoryProductsPage from "./component/Screens/CategoryProductsPage";
import ProductDetailPage from "./component/Screens/ProductDetailPage";
import CartPage from "./component/Screens/CartPage";
import AuthRoute from "./component/AuthRoute";
function App() {
  return (
    <>
      <Navbars />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/adminhome" element={<Adminhome />} />
        {/* <Route path="/userhome" element={<UserHome />} /> */}
        <Route path="/add-category" element={<CategoryForm />} />
        <Route path="/category/:categoryId" element={<CategoryProductsPage />} /> {/* Add this route */}
        <Route path="/add-product" element={<ProductForm />} />
        <Route path="/products/:productId" element={<ProductDetailPage />} />
        {/* <Route path="/cart" element={<CartPage />} /> */}
        <Route path="/cart" element={<AuthRoute> <CartPage /> </AuthRoute>
          }
        />
      </Routes>
      l̥
    </>
  );
}

export default App;
