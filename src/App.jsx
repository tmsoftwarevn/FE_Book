import React, { useEffect, useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Outlet } from "react-router-dom";
import LoginPage from "./pages/login/login";
import Header from "./components/Header/header";
import Footer from "./components/Footer";
import Home from "./pages/Home/index";
import RegisterPage from "./pages/register";
import { useDispatch, useSelector } from "react-redux";
import { callGetAccount, callGetSocial } from "./services/api";
import {
  doGetAccountAction,
  doLoginAction,
} from "./redux/account/accountSlice";
import Loading from "./components/Loading/loading";
import Notfound from "./components/Notfound";
import ManagerUser from "./pages/admin/managerUser/ManagerUser";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import LayoutAdmin from "./components/Admin/LayoutAdmin";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import ManagerBook from "./pages/admin/managerBook/ManagerBook";
import BookPageDetail from "./pages/book/BookPageDetail";
import Cart from "./pages/cart/Cart";
import Checkout from "./pages/checkout/Chekout";
import ManagerOrder from "./pages/admin/order/managerOrder";
import PageOrder from "./pages/order/order";
import { message } from "antd";
import { doLoginSocialFalse } from "./redux/cart/cartSlice";

const Layout = () => {
  const role = useSelector((state) => state.account?.user?.role);
  const navigate = useNavigate();
  const location = useLocation();
  const prevUrl = location.state?.from?.pathname.startsWith("/admin");
  const [searchBook, setSearchBook] = useState("");

  useEffect(() => {
    if (role && role === "ADMIN" && prevUrl !== true) {
      navigate("/admin/dashboard");
    }
  }, []);

  return (
    <div className="layout-app">
      <Header searchBook={searchBook} setSearchBook={setSearchBook} />
      <Outlet context={[searchBook, setSearchBook]} />
      <Footer />
    </div>
  );
};

export default function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.account.isLoading);
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
          path: "book/:slug",
          element: <BookPageDetail />,
        },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "checkout",
          element: (
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          ),
        },
        {
          path: "order",
          element: (
            <ProtectedRoute>
              <PageOrder />
            </ProtectedRoute>
          ),
        },
      ],
    },
    {
      path: "/login/*",
      element: <LoginPage />,
    },
    {
      path: "/register/*",
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
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          path: "user",
          element: <ManagerUser />,
        },
        {
          path: "book",
          element: <ManagerBook />,
        },
        {
          path: "order",
          element: <ManagerOrder />,
        },
      ],
    },
  ]);

  // cho phep vao route, ko check quyen
  const permissionPath = ["/login", "/register", "/book", "/code"];

  const str = window.location.pathname;

  const contains = permissionPath.some((element) => {
    if (window.location.pathname === "/") return true;
    if (str.includes(element)) {
      return true;
    }
    return false;
  });

  /// neu chua dang nhap va vao khac link tren thi ko cho vao, xoay => login
  /// neu chua dang nhap va vao link chứa ở trên  => cho vao, ko ảnh hưởng
  /// neu dang nhap r => lần đầu render khác link trên => xoay rồi vào
  //=> cùng thì ko có gì
  if (isLoading === true && contains === false) {
    return (
      <>
        <Loading />
      </>
    );
  } else {
    return <RouterProvider router={router} />;
  }
}
