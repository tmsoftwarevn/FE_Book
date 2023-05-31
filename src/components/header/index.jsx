import "./header.scss";
import { GiSpellBook } from "react-icons/gi";
import { AiOutlineSearch } from "react-icons/ai";
import { SlBasket } from "react-icons/sl";
import { AiFillHome } from "react-icons/ai";
import { VscAccount } from "react-icons/vsc";
import { Badge, Space } from "antd";
const Header = () => {
  return (
    <div className="header-main">
      <div className="container">
        <div className="header-content">
          <div className="header-left">
            <div className="icon-header">
              <GiSpellBook />
            </div>
            <div className="search-header">
              <div className="group">
                <AiOutlineSearch className="icon-search" />
                <input type="text" placeholder="Bạn tìm gì hôm nay " />
              </div>
              <button>Tìm kiếm</button>
            </div>
          </div>

          <div className="header-right">
            <div className="basket">
              <SlBasket />
              <Space size="middle" className="badge">
                <Badge count={3}></Badge>
              </Space>
            </div>
            <div className="home">
              <AiFillHome />
              <span> Trang chủ</span>
            </div>
            <div className="account">
              <VscAccount />
              <span>Tài khoản</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
