import React, { useEffect, useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Outlet } from "react-router-dom";

import Header from "./components/layout/header/Header";
import Footer from "./components/layout/footer/Footer";

import HomeFix from "./pages/Home fix/index";

import { useDispatch, useSelector } from "react-redux";
import { callGetAccount } from "./services/api";
import { doGetAccountAction } from "./redux/account/accountSlice";
import Loading from "./components/Loading/loading";
import Notfound from "./components/Notfound";
import ManagerUser from "./pages/admin/managerUser/ManagerUser";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import LayoutAdmin from "./components/Admin/LayoutAdmin";
import ManagerBook from "./pages/admin/managerBook/ManagerBook";
import BookPageDetail from "./pages/book/BookPageDetail";
import Cart from "./pages/cart/Cart";
import Checkout from "./pages/checkout/Chekout";
import PageOrder from "./pages/order/order";
import OrderHistory from "./pages/order history/OrderHistory";
import DetailOrderById from "./pages/Order detail/OrderDetailById";
import ManagerOrder from "./pages/admin/managerOrder/managerOrder";

import Search from "./pages/search/search";
import QuanliCategory from "./pages/admin/managerCategory/QuanlyCategory";
import Account from "./pages/account/Account";
import SignIn from "./pages/login/Login";
import SignUp from "./pages/signup/Signup";
import QuenMatkhau from "./pages/quen-mat-khau/QuenMatkhau";
import MenuHeader from "./components/danh muc/DropdownMenu";
import TheLoai from "./pages/the loai/TheLoai";
import QuanliHome from "./pages/admin/managerHome/QuanliHome";
import ScrollToTop from "./utils/ScrollToTop"
import GioiThieu from "./pages/admin/managerHome/GioiThieu";
import GioiThieuHome from "./pages/gioi-thieu/GioiThieuHome";
import DetailBlog from "./pages/blog/DetailBlog";
import SearchBlog from "./pages/blog/SearchBlog";
import ListBlog from "./pages/blog/ListBlog";
import QuanlyBaiviet from "./pages/admin/quan ly bai viet/QuanlyBaiviet";

const Layout = () => {
  const role = useSelector((state) => state.account?.user?.role);
  const navigate = useNavigate();
  const location = useLocation();
  const prevUrl = location.state?.from?.pathname.startsWith("/admin");
  const [searchBook, setSearchBook] = useState("");

  useEffect(() => {
    if (role && role === "ADMIN" && prevUrl !== true) {
      //navigate("/admin/book");
    }
  }, []);

  return (
    <div className="layout-app">
      {/* <Header /> */}
      {/* <NavBar /> */}

      <ScrollToTop />

      <Header />

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

  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <Layout />,
        errorElement: <Notfound />,
        children: [
          //<Home />
          { index: true, element: <HomeFix /> },

          {
            path: "book/:slug",
            element: <BookPageDetail />,
          },
          {
            path: "the-loai/:slug",
            element: <TheLoai />,
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
            path: "check-out",
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
          {
            path: "orderHistory",
            element: (
              <ProtectedRoute>
                <OrderHistory />
              </ProtectedRoute>
            ),
          },
          {
            path: "orderHistory/:id",
            element: (
              <ProtectedRoute>
                <DetailOrderById />
              </ProtectedRoute>
            ),
          },
          {
            path: "tim-kiem/*",
            element: <Search />,
          },
          {
            path: "account",
            element: <Account />
          },
          {
            path: "gioi-thieu",
            element: <GioiThieuHome />,
          },
          {
            path: "tin-tuc",
            element: <ListBlog />,
          },
          {
            path: "tin-tuc/:slug",
            element: <DetailBlog />,
          },
          {
            path: "tin-tuc/tim-kiem",
            element: <SearchBlog />,
          },
        ],
      },
      {
        path: "/login/*",
        element: <SignIn />,
      },
      {
        path: "/register/*",
        element: <SignUp />,
      },
      {
        path: "/quen-mat-khau",
        element: <QuenMatkhau />,
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
            path: "book",
            element: <ManagerBook />,
          },
          {
            path: "user",
            element: <ManagerUser />,
          },
          {
            path: "order",
            element: <ManagerOrder />,
          },
          {
            path: "category",
            element: <QuanliCategory />,
          },
          {
            path: "home",
            element: <QuanliHome />,
          },
          {
            path: "gioi-thieu",
            element: <GioiThieu />,
          },
          {
            path: "bai-viet",
            element: <QuanlyBaiviet />,
          },
        ],
      },
     {
      path: "/test",
      element: <MenuHeader />
     }
    ],
    {
      basename: import.meta.env.VITE_BASE_NAME,
    }
  );

  // cho phep vao route, ko check quyen
  const permissionPath = ["/","/login", "/register", "/book", "/forgot-password"];

  const str = window.location.pathname;

  const contains = permissionPath.some((element) => {
    if (window.location.pathname === "/") return true;
    //if (window.location.pathname === "/FE-book-deploy/") return true;
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
