import { MdCall } from "react-icons/md";
import { IoMdMail } from "react-icons/io";
import { IoIosLogIn } from "react-icons/io";
import { MdKey } from "react-icons/md";
import PreviewCart from "../../../pages/cart/PreviewCart";
import { Badge, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Navbar1 = () => {
  const countProduct = useSelector((state) =>
    state.cart?.listCart ? state.cart.listCart : 0
  );
  const navigate = useNavigate();

  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
  const dispatch = useDispatch();
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
        <div className="flex items-center gap-1 cursor-pointer hover:underline ">
          <IoIosLogIn />
          Đăng nhập
        </div>

        <div className="flex items-center gap-1 cursor-pointer hover:underline">
          <MdKey />
          Đăng ký
        </div>

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
