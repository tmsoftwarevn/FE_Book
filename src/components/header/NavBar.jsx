import React, { useState } from "react";
import "./NavBar.scss";
import SearchBar from "../search-bar/SearchBar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { doLogoutAction } from "../../redux/account/accountSlice";
import { SlBasket } from "react-icons/sl";
import PreviewCart from "../../pages/cart/PreviewCart";
import { Badge, Space } from "antd";
import { FaRegNewspaper } from "react-icons/fa";

const NavBar = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
  const dispatch = useDispatch();
  const location = useLocation();

  const countProduct = useSelector((state) =>
    state.cart?.listCart ? state.cart.listCart : 0
  );


  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = async () => {
    // const res = await callLogout(idUser);
    // if (res && res.data) {
    //   dispatch(doLogoutAction());
    //   dispatch(doRemoveCartLogout());
    // }
    dispatch(doLogoutAction());
    navigate("/login");
  };

  return (
    <>
      <header className="bg-white sticky top-0 left-0 w-full z-50 shadow">
        <div className="container ">
          <div className="flex items-center justify-between h-16 w-full">
            <div className="left flex items-center ">
              <div
                className="flex-shrink-0 logo cursor-pointer mr-2 flex items-center justify-center"
                onClick={() => navigate("/")}
              >
                <img src={logo}></img>
              </div>
              <div className="hidden lg:flex search-header ">
                <SearchBar />
              </div>

              {/* <div
                className="basket ml-10"
                onClick={() => {
                  navigate("/cart");
                }}
              >
                <PreviewCart />
                <Space size="middle" className="badge">
                  <Badge
                    count={isAuthenticated === true ? countProduct.length : 0}
                    showZero
                  ></Badge>
                </Space>
              </div>
              
              <nav className="hidden lg:flex space-x-4 items-center ml-10">
                <div
                  className={
                    location.pathname.startsWith("/khoa-hoc") === true
                      ? "cursor-pointer text-blue-600 font-medium hover:text-blue-500 px-3 py-2"
                      : "cursor-pointer text-black-100 font-medium hover:text-blue-500 "
                  }
                  onClick={() => navigate("/khoa-hoc")}
                >
                  Tin tức
                </div>

               
              </nav> */}
            </div>

            {/* ======== */}
            <div className="flex items-center">
              {/* gio hang */}
              <div
                className="basket ml-10"
                onClick={() => {
                  navigate("/cart");
                }}
              >
                <PreviewCart />
                <Space size="middle" className="badge">
                  <Badge
                    count={isAuthenticated === true ? countProduct?.length : 0}
                    showZero
                  ></Badge>
                </Space>
              </div>
              {/* ======= */}
              <nav className="hidden lg:flex space-x-4 items-center ml-10">
                <div
                  className={
                    location.pathname.startsWith("/khoa-hoc") === true
                      ? "cursor-pointer flex items-center text-blue-600 font-medium hover:text-blue-500 px-3 py-2"
                      : "cursor-pointer flex items-center text-gray-600 font-medium hover:text-blue-500 "
                  }
                  onClick={() => navigate("/khoa-hoc")}
                >
                  <FaRegNewspaper className="mr-1" />
                  <span>Tin tức</span>
                </div>
              </nav>
            </div>

            {isAuthenticated ? (
              <div className="group-login hidden lg:block">
                <Stack>
                  <Avatar src="/broken-image.jpg" />
                </Stack>
                <div className="box">
                  <div className="flex items-center info py-2 px-3">
                    <Stack>
                      <Avatar src="/broken-image.jpg" />
                    </Stack>
                    <span className="ml-3">test@gmail.com</span>
                  </div>
                  <div className="p-3 leading-loose">
                    <p
                      className="cursor-pointer hover:text-blue-600"
                      onClick={() => {
                        navigate("/account/khoa-hoc");
                      }}
                    >
                      Khóa học
                    </p>
                    <p
                      className="cursor-pointer hover:text-blue-600"
                      onClick={() => {
                        navigate("/account/thong-tin");
                      }}
                    >
                      Thông tin
                    </p>
                    <p
                      className="cursor-pointer hover:text-blue-600"
                      onClick={() => handleLogout()}
                    >
                      Đăng xuất
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="right hidden lg:flex space-x-4 col-md-3 justify-end">
                <div
                  className="text-white px-3 py-2 rounded bg-blue-500 hover:bg-blue-600 cursor-pointer"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Đăng nhập
                </div>
                <div
                  className="text-white px-3 py-2 rounded bg-blue-500 hover:bg-blue-600 cursor-pointer"
                  onClick={() => {
                    navigate("/dang-ky");
                  }}
                >
                  Đăng ký
                </div>
              </div>
            )}
            {/* // btn toggle mobile */}
            <div className="lg:hidden toggle">
              <button
                onClick={toggleMobileMenu}
                className="text-black hover:text-white focus:outline-none"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 8h16M4 12h16M4 16h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-blue-500">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <div
                className="cursor-pointer text-white hover:text-white block px-3 py-2"
                onClick={() => {
                  navigate("/khoa-hoc");
                  toggleMobileMenu();
                }}
              >
                Khóa học
              </div>
              <div
                className="cursor-pointer text-white hover:text-white block px-3 py-2"
                onClick={() => {
                  navigate("/blog");
                  toggleMobileMenu();
                }}
              >
                Blog
              </div>
              <div
                className="cursor-pointer text-white hover:text-white block px-3 py-2"
                onClick={() => {
                  navigate("/lien-he");
                  toggleMobileMenu();
                }}
              >
                Liên hệ
              </div>
            </div>
            <div className="px-4 w-full">
              <SearchBar />
            </div>
            {isAuthenticated ? (
              <div
                className="py-3 px-4"
                onClick={() => {
                  navigate("/account/khoa-hoc");
                  toggleMobileMenu();
                }}
              >
                <Stack>
                  <Avatar src="/broken-image.jpg" />
                </Stack>
              </div>
            ) : (
              <div className="flex space-x-4 px-4 py-3">
                <div
                  className="text-blue-500 px-3 py-2 rounded bg-white cursor-pointer"
                  onClick={() => {
                    navigate("/login");
                    toggleMobileMenu();
                  }}
                >
                  Đăng nhập
                </div>
                <div
                  className="text-blue-500 px-3 py-2 rounded bg-white cursor-pointer"
                  onClick={() => {
                    navigate("/dang-ky");
                    toggleMobileMenu();
                  }}
                >
                  Đăng ký
                </div>
              </div>
            )}
          </div>
        )}
      </header>

      
    </>
  );
};

export default NavBar;
