import React, { useEffect, useState } from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Outlet } from "react-router-dom";
import LoginPage from "./pages/login/login";
import ContactPage from "./pages/contact";
import BookPage from "./pages/book";
import Header from "./components/Header/header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import RegisterPage from "./pages/register";
import { useDispatch, useSelector } from "react-redux";
import { callGetAccount } from "./services/api";
import { doGetAccountAction } from "./redux/account/accountSlice";
import Loading from "./components/Loading/loading";
import Notfound from "./components/Notfound";
import Admin from "./pages/admin/admin";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import LayoutAdmin from "./components/Admin/LayoutAdmin";
const Layout = () => {
  return (
    <div className="layout-app">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
  const isLoading = useSelector((state) => state.account.isLoading);
  console.log("<<< au", isAuthenticated);
  const getAccount = async () => {
    let res = await callGetAccount();
    if (res && res.data) {
      dispatch(doGetAccountAction(res.data));
    }
  };

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      getAccount();
    }
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <Notfound />,
      children: [
        { index: true, element: <Home /> },
        {
          path: "contact",
          element: <ContactPage />,
        },
        {
          path: "book",
          element: 
          <ProtectedRoute>
             <BookPage />
          </ProtectedRoute>
          ,
        },
      ],
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
    {
      path: "/admin",
      element: (
        <ProtectedRoute>
          <LayoutAdmin />
        </ProtectedRoute>
      ),
      errorElement: <Notfound />,
      children: [
        {
          index: true,
          element: <Admin />,
        },
        {
          path: "book",
          element: <BookPage />,
        },
        {
          path: "order",
          element: <ContactPage />,
        },
      ],
    },
  ]);
  const permissionPath = ["/login", "register", "/"];

  if (isLoading === true && !permissionPath.includes(window.location.pathname) ) {
    return (
      <>
        <Loading />
      </>
    );
  } else {
    return (
      
      <RouterProvider router={router} />
    );
  }
}
