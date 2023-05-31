import React, { useEffect, useState } from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Outlet } from "react-router-dom";
import LoginPage from "./pages/login/login";
import ContactPage from "./pages/contact";
import BookPage from "./pages/book";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import RegisterPage from "./pages/register";
import { useDispatch, useSelector } from "react-redux";
import { callGetAccount } from "./services/api";
import { doGetAccountAction } from "./redux/account/accountSlice";
import Loading from "./components/loading/loading";
import Notfound from "./components/Notfound";
import Admin from "./pages/admin/admin";
import ProtecedRoute from "./components/ProtectedRoute/ProtectedRoute";
const Layout = () => {
  return (
    <div className="layout-app">
      <Header />
      {/* <Outlet />
      <Footer /> */}
    </div>
  );
};

const LayoutAdmin = () => {
  const isAdminRoute = window.location.pathname.startsWith('/admin');
  const user = useSelector(state => state.account.user);
  const userRole = user.role;

  return (
    <div className="layout-admin">
      {
        isAdminRoute && userRole === 'ADMIN' &&  <Header />
      }
      <Outlet />
      {
        isAdminRoute && userRole === 'ADMIN' &&  <Footer />
      }
    </div>
  );
};
export default function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
  const getAccount = async () => {
    if (
      window.location.pathname === "/login" ||
      window.location.pathname === "/register" ||
      window.location.pathname === "/"
    )
      return;
    let res = await callGetAccount();
    if (res && res.data) {
      dispatch(doGetAccountAction(res.data));
    }
  };

  useEffect(() => {
    getAccount();
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
          element: <BookPage />,
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
      element: <LayoutAdmin />,
     
      children: [
        {
          index: true,
          element: (
            <ProtecedRoute>
              <Admin />
            </ProtecedRoute>
          ),
        },
        {
          path: "contact",
          element: <ContactPage />,
        },
        {
          path: "book",
          element: <BookPage />,
        },
      ],
    },
  ]);

  return (
    <>
      {isAuthenticated === true ||
      window.location.pathname === "/login" ||
      window.location.pathname === "/register" ||
      window.location.pathname === "/" ? (
        <RouterProvider router={router} />
      ) : (
        <Loading />
      )}
    </>
  );
}
