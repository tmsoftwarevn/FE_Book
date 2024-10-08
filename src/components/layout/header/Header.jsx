import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar1 from "./Navbar1";
import logo from "../../../assets/logo.png";
import { Button, Image, Input, Space } from "antd";
import Search from "antd/es/transfer/search";
import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import { callGet_ParentCategory_Home } from "../../../services/api";
import { VscThreeBars } from "react-icons/vsc";
import ResponsiveHeader from "./Responsive";
import "./header.scss";

const Header = () => {
  const countProduct = useSelector((state) =>
    state.cart?.listCart ? state.cart.listCart : 0
  );
  const [searchValue, setSearchValue] = useState("");
  const [dropdown, setDropdown] = useState([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const getListCategory = async () => {
      let res = await callGet_ParentCategory_Home();
      if (res && res.data) {
        let arr = [];
        res.data.map((item, idx) => {
          arr.push(item);
        });
        setDropdown(arr);
      }
    };
    getListCategory();
  }, []);

  const handleSearch = () => {
    console.log("vvvvv", searchValue);
    navigate(`/tim-kiem?text=${searchValue}`);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  return ( 
    // bg-custom
    <div className="bg-gradient-to-tr from-blue-600 to-blue-300 text-white sticky top-0 left-0 w-full z-50 shadow">
      <div className="container">
        <Navbar1 />
        <div className="flex justify-between items-center pb-4 px-5 xl:px-0">
          <div
            className="w-[70px] cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img src={logo} className="w-full h-auto" />
          </div>

          <ul className="flex hidden lg:flex gap-10 uppercase font-semibold">
            <li
              className="group relative cursor-pointer "
              onClick={() => navigate("/")}
            >
              <span>trang chủ</span>
              <span
                className={
                  location.pathname === "/"
                    ? "absolute -bottom-2 left-1/2 w-3/6 transition-all h-0.5 bg-blue-900 group-hover:w-3/6"
                    : "absolute -bottom-2 left-1/2 w-0 transition-all h-0.5 bg-blue-900 group-hover:w-3/6"
                }
              ></span>
              <span
                className={
                  location.pathname === "/"
                    ? "absolute -bottom-2 right-1/2 w-3/6 transition-all h-0.5 bg-blue-900 group-hover:w-3/6"
                    : "absolute -bottom-2 right-1/2 w-0 transition-all h-0.5 bg-blue-900 group-hover:w-3/6"
                }
              ></span>
            </li>

            <li
              className="group relative cursor-pointer"
              onClick={() => navigate("/gioi-thieu")}
            >
              <span>giới thiệu</span>
              <span
                className={
                  location.pathname === "/gioi-thieu"
                    ? "absolute -bottom-2 left-1/2 w-3/6 transition-all h-0.5 bg-blue-900 group-hover:w-3/6"
                    : "absolute -bottom-2 left-1/2 w-0 transition-all h-0.5 bg-blue-900 group-hover:w-3/6"
                }
              ></span>
              <span
                className={
                  location.pathname === "/gioi-thieu"
                    ? "absolute -bottom-2 right-1/2 w-3/6 transition-all h-0.5 bg-blue-900 group-hover:w-3/6"
                    : "absolute -bottom-2 right-1/2 w-0 transition-all h-0.5 bg-blue-900 group-hover:w-3/6"
                }
              ></span>
            </li>

            <li className="group relative cursor-pointer uppercase">
              <div className="dropdown relative inline-flex group">
                <div
                  id="dropdown-hover"
                  type="button"
                  className="relative dropdown-toggle uppercase inline-flex justify-center items-center gap-2 text-white  cursor-pointer text-center shadow-xs transition-all duration-500 "
                >
                  <span>tủ sách</span>
                  <span
                    className={
                      location.pathname.startsWith("/the-loai")
                        ? "absolute -bottom-2 left-1/2 w-3/6 transition-all h-0.5 bg-blue-900 group-hover:w-3/6"
                        : "absolute -bottom-2 left-1/2 w-0 transition-all h-0.5 bg-blue-900 group-hover:w-3/6"
                    }
                  ></span>
                  <span
                    className={
                      location.pathname.startsWith("/the-loai")
                        ? "absolute -bottom-2 right-1/2 w-3/6 transition-all h-0.5 bg-blue-900 group-hover:w-3/6"
                        : "absolute -bottom-2 right-1/2 w-0 transition-all h-0.5 bg-blue-900 group-hover:w-3/6"
                    }
                  ></span>

                  <svg
                    class="dropdown-open:rotate-180 w-2.5 h-2.5 text-white"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                    ></path>
                  </svg>
                </div>
                <div
                  className="dropdown-menu shadow-lg bg-white absolute z-50 top-full w-60 hidden group-hover:block"
                  aria-labelledby="dropdown-hover"
                >
                  <ul className="text-sm">
                    {dropdown &&
                      dropdown.map((item) => {
                        return (
                          <>
                            <li>
                              <span
                                onClick={() =>
                                  navigate(`/the-loai/${item.slug}`)
                                }
                                className="block px-3 py-2 hover:bg-blue-600 text-black hover:text-white "
                              >
                                {item.category}
                              </span>
                            </li>
                          </>
                        );
                      })}
                  </ul>
                </div>
              </div>
            </li>
            <li className="group relative cursor-pointer">
              <span onClick={() => navigate("/tin-tuc")}>Tin tức</span>
              <span
                className={
                  location.pathname.startsWith("/tin-tuc")
                    ? "absolute -bottom-2 left-1/2 w-3/6 transition-all h-0.5 bg-blue-900 group-hover:w-3/6"
                    : "absolute -bottom-2 left-1/2 w-0 transition-all h-0.5 bg-blue-900 group-hover:w-3/6"
                }
              ></span>
              <span
                className={
                  location.pathname.startsWith("/tin-tuc")
                    ? "absolute -bottom-2 right-1/2 w-3/6 transition-all h-0.5 bg-blue-900 group-hover:w-3/6"
                    : "absolute -bottom-2 right-1/2 w-0 transition-all h-0.5 bg-blue-900 group-hover:w-3/6"
                }
              ></span>
            </li>
          </ul>

          <div className="hidden lg:block">
            <Space
              direction="vertical"
              className="w-full sm:w-[400px] max-w-full"
            >
              <Space.Compact
                style={{
                  width: "100%",
                }}
              >
                <Input
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Tìm kiếm sản phẩm"
                  onKeyDown={handleKeyPress}
                />
                <Button onClick={() => handleSearch()} type="primary">
                  <FaSearch />
                </Button>
              </Space.Compact>
            </Space>
          </div>

          <div onClick={() => setOpen(true)} className="lg:hidden">
            <VscThreeBars className="text-4xl" />
          </div>
        </div>

        <ResponsiveHeader dropdown={dropdown} open={open} setOpen={setOpen} />
      </div>
    </div>
  );
};

export default Header;
