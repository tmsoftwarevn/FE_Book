import { MdCall } from "react-icons/md";
import { IoMdMail } from "react-icons/io";
import { IoIosLogIn } from "react-icons/io";
import { MdKey } from "react-icons/md";
import PreviewCart from "../../../pages/cart/PreviewCart";
import { Badge, message, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { doLogoutAction } from "../../../redux/account/accountSlice";
import { doRemoveCartLogout } from "../../../redux/cart/cartSlice";
import { callLogout } from "../../../services/api";

const Navbar1 = () => {
  const countProduct = useSelector((state) =>
    state.cart?.listCart ? state.cart.listCart : 0
  );
  const navigate = useNavigate();

  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
  const username = useSelector((state) => state.account.user?.fullName);
  const userEmail = useSelector((state) => state.account.user?.email);
  const role = useSelector((state) => state.account.user.role);
  const dispatch = useDispatch();
  const idUser = useSelector((state) => state.account?.user?.id);

  const handleLogout = async () => {
    const res = await callLogout(idUser);
    if (res && res.data) {
      dispatch(doLogoutAction());
      dispatch(doRemoveCartLogout());
      window.open(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/social/logout`,
        "_self"
      );
      message.success("Đăng xuất thành công");
    }
  };

  return (
    <div className="flex px-5 xl:px-0 justify-between xs:text-xs sm:text-md font-semibold ">
      <div className="flex hidden md:flex pt-4 pb-2 items-center gap-5">
        <div className="flex items-center gap-2 ">
          <MdCall />
          0987654321
        </div>

        <div className="flex items-center gap-2">
          <IoMdMail />
          book@gmail.com
        </div>
      </div>

      <div className="flex justify-between md:justify-end py-2 items-center gap-10 w-full">
        {isAuthenticated ? (
          <>
            <div class="dropdown relative inline-flex group">
              <button
                type="button"
                data-target="dropdown-with-header"
                class="dropdown-toggle inline-flex justify-center items-center gap-2 py-2 px-5 text-md bg-blue-600 text-white rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:bg-blue-700 "
              >
                Tài khoản
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
              </button>
              <div
                id="dropdown-with-header"
                class="dropdown-menu rounded-xl shadow-lg bg-white absolute top-full w-72 divide-y divide-gray-200 hidden group-hover:block z-50"
                aria-labelledby="dropdown-with-header"
              >
                <div class="px-4 py-3 flex gap-3 ">
                  <div class="block mt-1">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.3331 5.83333C13.3331 7.67428 11.8407 9.16667 9.99976 9.16667C8.15881 9.16667 6.66642 7.67428 6.66642 5.83333C6.66642 3.99238 8.15881 2.5 9.99976 2.5C11.8407 2.5 13.3331 3.99238 13.3331 5.83333Z"
                        stroke="black"
                        stroke-width="1.6"
                      />
                      <path
                        d="M9.99976 11.6667C7.62619 11.6667 5.54235 12.752 4.36109 14.3865C3.73609 15.2513 3.42359 15.6837 3.88775 16.5918C4.35192 17.5 5.12342 17.5 6.66642 17.5H13.3331C14.8761 17.5 15.6476 17.5 16.1118 16.5918C16.5759 15.6837 16.2634 15.2513 15.6384 14.3865C14.4572 12.752 12.3733 11.6667 9.99976 11.6667Z"
                        stroke="black"
                        stroke-width="1.6"
                      />
                    </svg>
                  </div>
                  <div class="block">
                    <div class="text-blue-600 font-normal mb-1">{username}</div>
                    <div class="text-sm text-gray-500 font-medium truncate">
                      {userEmail}
                    </div>
                  </div>
                </div>
                <ul class="">
                  {isAuthenticated && role === "ADMIN" && (
                    <li>
                      <span
                        class="block px-6 py-2 hover:text-blue-600 cursor-pointer text-gray-900 font-medium"
                        onClick={() => navigate("/admin")}
                      >
                        Trang quản trị
                      </span>
                    </li>
                  )}
                  <li>
                    <span
                    onClick={() => navigate('/account/thong-tin')}
                     class="block px-6 py-2 hover:text-blue-600 cursor-pointer text-gray-900 font-medium">
                      Quản lý tài khoản
                    </span>
                  </li>
                  <li>
                    <span
                    onClick={() => navigate('/lich-su-mua-hang')}
                     class="block px-6 py-2 hover:text-blue-600 cursor-pointer text-gray-900 font-medium">
                      Lịch sử mua hàng
                    </span>
                  </li>
                </ul>
                <div class="cursor-pointer">
                  <div
                    onClick={() => handleLogout()}
                    class="block px-6 py-2 text-red-500 hover:text-red-400 font-medium"
                  >
                    Đăng xuất
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div
              className="flex items-center gap-1 cursor-pointer hover:underline "
              onClick={() => navigate("/login")}
            >
              <IoIosLogIn />
              Đăng nhập
            </div>

            <div
              className="flex items-center gap-1 cursor-pointer hover:underline"
              onClick={() => navigate("/register")}
            >
              <MdKey />
              Đăng ký
            </div>
          </>
        )}

        <div
          className="relative cursor-pointer"
          onClick={() => {
            navigate("/cart");
          }}
        >
          <PreviewCart />

          <Badge
            count={isAuthenticated === true ? countProduct?.length : 0}
            showZero
            size="small"
            className="absolute -top-2 -right-3"
          ></Badge>
        </div>
      </div>
    </div>
  );
};

export default Navbar1;
