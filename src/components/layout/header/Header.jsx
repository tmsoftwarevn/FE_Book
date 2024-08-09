import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar1 from "./Navbar1";
import logo from "../../../assets/logo.png";
import { Button, Image, Input, Space } from "antd";
import Search from "antd/es/transfer/search";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";

const Header = () => {
  const countProduct = useSelector((state) =>
    state.cart?.listCart ? state.cart.listCart : 0
  );
  const [searchValue, setSearchValue] = useState("");

  const navigate = useNavigate();

  const handleSearch = () => {
    console.log('vvvvv', searchValue)
  };

  const handleKeyPress = (event) => {
  
    if (event.key === 'Enter') {
      handleSearch();
    }
};
  return (
    <div className="bg-blue-600 text-white">
      <div className="container">
        <Navbar1 />
        <div className="flex justify-between items-center pb-4">
          <div className="w-[70px]">
            <img src={logo} className="w-full h-auto" />
          </div>

          <ul className="flex gap-10 uppercase font-semibold">
            <li className="cursor-pointer" onClick={() => navigate('/')}>trang chủ</li>
            <li className="cursor-pointer">giới thiệu</li>
            <li className="cursor-pointer">tủ sách</li>
            <li className="cursor-pointer">tin tức</li>
          </ul>
          <div>
            <Space direction="vertical" className="w-[400px]">
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
                <Button onClick={()=> handleSearch()} type="primary">
                  <FaSearch />
                </Button>
              </Space.Compact>
            </Space>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
