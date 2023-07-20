import "./header.scss";
import { GiSpellBook } from "react-icons/gi";
import { AiOutlineSearch } from "react-icons/ai";
import { SlBasket } from "react-icons/sl";
import { AiFillHome } from "react-icons/ai";
import { VscAccount } from "react-icons/vsc";
import {
  Dropdown,
  Badge,
  Space,
  message,
  Modal,
  Tabs,
  Input,
  Row,
  Col,
  Form,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { callLogout } from "../../services/api";
import { doLogoutAction } from "../../redux/account/accountSlice";
import {
  doRemoveCartLogout,
  doSetListCartLogin,
} from "../../redux/cart/cartSlice";
import PreviewCart from "../../pages/cart/PreviewCart";

const Header = () => {
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
  const username = useSelector((state) => state.account.user.fullName);
  const userEmail = useSelector((state) => state.account.user.email);
  const role = useSelector((state) => state.account.user.role);
  const countProduct = useSelector((state) =>
    state.cart?.listCart ? state.cart.listCart : 0
  );
  const idUser = useSelector((state) => state.account?.user?.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    listItems();
    if (localStorage.getItem(`cart${idUser}`)) {
      const myArr = JSON.parse(localStorage.getItem(`cart${idUser}`));
      dispatch(doSetListCartLogin(myArr));
    }
  }, [isAuthenticated]);

  const [items, setItems] = useState([
    {
      label: <Link to="/login">Đăng nhập</Link>,
      key: "login",
    },
    {
      label: <Link to="/register">Đăng kí</Link>,
      key: "register",
    },
  ]);

  const listItems = () => {
    if (isAuthenticated === true && role === "USER") {
      setItems([
        {
          label: <p onClick={showModal}>Quản Lý Tài Khoản</p>,
          key: "account",
        },
        {
          label: <Link to="/orderHistory">Đơn Mua</Link>,
          key: "orderHistory",
        },
        {
          label: <p onClick={() => handleLogout()}>Đăng Xuất</p>,
          key: "logout",
        },
      ]);
    } else if (isAuthenticated === true && role === "ADMIN") {
      setItems([
        {
          label: <p onClick={showModal}>Quản Lý Tài Khoản</p>,
          key: "account",
        },
        {
          label: <Link to="/admin/book">Trang Quản Trị</Link>,
          key: "admin",
        },
        {
          label: <p onClick={() => handleLogout()}>Đăng Xuất</p>,
          key: "logout",
        },
      ]);
    } else {
      setItems([
        {
          label: <Link to="/login">Đăng Nhập</Link>,
          key: "login",
        },
        {
          label: <Link to="/register">Đăng Kí</Link>,
          key: "register",
        },
      ]);
    }
  };

  const handleLogout = async () => {
    const res = await callLogout(idUser);
    if (res && res.data) {
      dispatch(doLogoutAction());
      dispatch(doRemoveCartLogout());
      window.open("http://localhost:8086/api/v1/social/logout", "_self");
      message.success("Đăng xuất thành công");
    }
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const showModal = () => {
    let init = {
      email: userEmail,
      fullname: username,
    };
    form.setFieldsValue(init);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="header-main">
      <div className="container">
        <div className="header-content">
          <div className="header-left ">
            <div className="search-header">
              <div
                className="icon-header"
                onClick={() => {
                  navigate("/");
                }}
              >
                <GiSpellBook />
              </div>
              <div className="group">
                <AiOutlineSearch className="icon-search" />
                <input type="text" placeholder="Bạn tìm gì hôm nay " />
              </div>
              <button className="button">Tìm kiếm</button>
            </div>
          </div>

          <div className="header-right">
            <div
              className="basket"
              onClick={() => {
                navigate("/cart");
              }}
            >
              <div className="basket-sm">
                <SlBasket />
              </div>
              <PreviewCart />
              <Space size="middle" className="badge">
                <Badge
                  count={isAuthenticated === true ? countProduct.length : 0}
                  showZero
                ></Badge>
              </Space>
            </div>
            <div className="home">
              <AiFillHome />
              <p onClick={() => navigate("/")}> Trang chủ</p>
            </div>
            <div className="account">
              <Space direction="vertical">
                <Space wrap>
                  <Dropdown
                    menu={{
                      items,
                    }}
                    placement="bottomRight"
                  >
                    {isAuthenticated === true ? (
                      <div className="username">
                        <div style={{ marginTop: "3px" }}>
                          <VscAccount />
                        </div>
                        <div className="user">
                          {username ? username : userEmail}
                        </div>
                      </div>
                    ) : (
                      <div className="username">
                        <VscAccount className="icon-acount" />
                        <div className="name">Tài khoản</div>
                      </div>
                    )}
                  </Dropdown>
                </Space>
              </Space>
            </div>
          </div>
        </div>
      </div>
      <Modal
        title="Thông tin tài khoản"
        open={isModalOpen}
        onOk={handleOk}
        okText="Update"
        onCancel={handleCancel}
      >
        <Tabs
          defaultActiveKey="1"
          items={[
            {
              key: "1",
              label: `Thông tin`,
              children: (
                <div>
                  <Form name="basic" autoComplete="off" form={form}>
                    <Row gutter={20}>
                      <Col span={12}>
                        <Form.Item
                          labelCol={{ span: 24 }}
                          label="Email"
                          name="email"
                        >
                          <Input disabled={true} />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          labelCol={{ span: 24 }}
                          label="Tên hiển thị"
                          name="fullname"
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form>
                </div>
              ),
            },
            {
              key: "2",
              label: "Đổi mật khẩu",
              children: <></>,
            },
          ]}
          //onChange={onChange}
        />
      </Modal>
    </div>
  );
};
export default Header;
