import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import "@fortawesome/fontawesome-free/css/all.min.css";
import SignUp from "./pages/SignUp";
import MyOrder from "./pages/MyOrder";
import { CartProvider } from "./component/ContextReducer";
import Cart from "./component/Cart";

const root = ReactDOM.createRoot(document.getElementById("root"));
let allRoute = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/myorder",
    element: <MyOrder />,
  },
]);

root.render(
  <React.StrictMode>
    <CartProvider> 
        <RouterProvider router={allRoute} />   
    </CartProvider>
  </React.StrictMode>
);

reportWebVitals();
