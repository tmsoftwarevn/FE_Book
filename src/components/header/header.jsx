import "./header.scss";
import { GiSpellBook } from "react-icons/gi";
import { AiOutlineSearch } from "react-icons/ai";
import { SlBasket } from "react-icons/sl";
import { AiFillHome } from "react-icons/ai";
import { VscAccount } from "react-icons/vsc";
import { Dropdown , Badge, Space} from "antd";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Header = () => {
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
  const username = useSelector((state) => state.account.user.fullName);
  const userEmail = useSelector((state) => state.account.user.email);
  const [items, setItems] = useState([
    {
      label: <a href="/login">Login</a>,
      key: "login",
    },
    {
      label: <a href="/register">Sign up</a>,
      key: "register",
    },
  ]);

  const listItems = () => {
    if (isAuthenticated === true) {
      setItems([
        {
          label: <a href="/">Quản lý tài khoản</a>,
          key: "account",
        },
        {
          label: <a href="/">Đăng xuất</a>,
          key: "logout",
        },
      ]);
    }else{
      setItems([
        {
          label: <a href="/login">Login</a>,
          key: "login",
        },
        {
          label: <a href="/register">Sign up</a>,
          key: "register",
        },
      ])
    }
  };
  useEffect(() => {
    listItems();
  }, [isAuthenticated]);
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
              <SlBasket style={{ fontSize: "1.125rem", color: "grey" }} />
              <Space size="middle" className="badge">
                <Badge count={3}></Badge>
              </Space>
            </div>
            <div
              className="home"
              style={{ fontSize: "1.125rem", color: "grey" }}
            >
              <AiFillHome />
              <p> Trang chủ</p>
            </div>
            <div className="account">
              <Space direction="vertical">               
                <Space wrap>
                  <Dropdown
                    menu={{
                      items,
                    }}
                    placement="bottomLeft"
                  >
                   {isAuthenticated === true ? (                     
                      <div
                        className="username"
                        style={{ fontSize: "1.125rem", color: "grey" }}
                      >
                        <VscAccount />
                        <p> {username ? username : userEmail}</p>
                      </div>
                    ) : (
                      <div
                        className="name"
                        style={{ fontSize: "1.125rem", color: "grey" }}
                      >                     
                         Tài khoản                                            
                      </div>
                    )}
                  </Dropdown>
                </Space>
              </Space>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
