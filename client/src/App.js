import { BrowserRouter, Routes, Route, } from "react-router-dom";
import { useState, createContext, useEffect } from "react";
import Home from "./pages/home/Home";
import Singup from "./pages/sing/Singup";
import Singin from "./pages/sing/Singin";
import Category from "./pages/admin/Category";
import Project from "./pages/admin/project";
import Cart from "./pages/cart/Cart";
import Single from "./pages/singee/Single";
import './App.css';

export const ThemeContext = createContext({});
function App() {
  const [show, setShow] = useState(false);
  const [cart, setCart] = useState([]); 
  // const [user, setUser] = useState( localStorage.getItem('user') );
  // make user state and get user from local storage and if not found set it to null
  const [user, setUser] = useState( localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null );

  // check user if change 
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);



  return (
    <ThemeContext.Provider value={{
      show, setShow,
      cart, setCart,
      user, setUser
    }}>
      <div className="App">
        <AppUrl />
      </div>
    </ThemeContext.Provider>
  );
}

const AppUrl = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/singup" element={<Singup />} />
        <Route path="/singin" element={<Singin />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admin/category" element={<Category />} />
        <Route path="/admin/project" element={<Project />} />
        <Route path="/product/:idx" element={<Single />} />
        {/* <Route path="search/:name" element={<Search />} />
        <Route path="cat/:name" element={<Cat />} />
        <Route path="cart/" element={<Cart />} /> */}
      </Routes>
    </BrowserRouter>
  );
}


export default App;
