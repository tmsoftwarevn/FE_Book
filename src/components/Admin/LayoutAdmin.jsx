import "./layoutAdmin.scss";
import {
  TeamOutlined,
  ExceptionOutlined,
  DollarCircleOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme, message } from "antd";
import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Dropdown, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { callLogout } from "../../services/api";
import { doLogoutAction } from "../../redux/account/accountSlice";

const { Header, Content, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem(
    <Link to="/admin/user">Quản lý người dùng</Link>,
    "/admin/user",
    <TeamOutlined />
  ),
  getItem(
    <Link to="/admin/book">Quản lý sách</Link>,
    "/admin/book",
    <ExceptionOutlined />
  ),
  getItem(
    <Link to="/admin/home">Quản lý banner</Link>,
    "/admin/home",
    <ExceptionOutlined />
  ),
  
  getItem(
    <Link to="/admin/gioi-thieu">Quản lý giới thiệu</Link>,
    "/admin/gioi-thieu",
    <ExceptionOutlined />
  ),
  getItem(
    <Link to="/admin/bai-viet">Quản lý bài viết</Link>,
    "/admin/bai-viet",
    <DollarCircleOutlined />
  ),
  getItem(
    <Link to="/admin/category">Quản lý thể loại</Link>,
    "/admin/category",
    <ExceptionOutlined />
  ),
  getItem(
    <Link to="/admin/order">Quản lý đơn hàng</Link>,
    "/admin/order",
    <DollarCircleOutlined />
  ),
];

const AccountAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const idUser = useSelector((state) => state.account?.user?.id);
  const handleLogout = async () => {
    const res = await callLogout(idUser);
    if (res && res.data) {
      dispatch(doLogoutAction());
      window.open(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/social/logout`,
        "_self"
      );
      message.success("Đăng xuất thành công");
    }
  };
  const location = useLocation();
  const items = [
    {
      label: <Link to="/">Quản lý tài khoản</Link>,
      key: "account",
    },
    {
      label: (
        <p onClick={() => navigate("/", { state: { from: location } })}>
          Trang chủ
        </p>
      ),
      key: "home",
    },
    {
      label: <p onClick={() => handleLogout()}>Đăng xuất</p>,
      key: "logout",
    },
  ];
  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <Space direction="vertical">
        <Space wrap>
          <Dropdown
            menu={{
              items,
            }}
            placement="bottomLeft"
          >
            <div className="admin">Admin</div>
          </Dropdown>
        </Space>
      </Space>
    </div>
  );
};
const LayoutAdmin = () => {
  const [keyActive, setKeyActive] = useState("/admin/book");
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  useEffect(() => {
    setKeyActive(location.pathname);
  }, [keyActive]);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div
          style={{
            margin: 40,
          }}
        ></div>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          selectedKeys={[keyActive]}
          mode="inline"
          items={items}
          onClick={(e) => setKeyActive(e.key)}
        />
      </Sider>
      <Layout>
        <Header
          className="ant-layout-header"
          hidden
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content>
          <AccountAdmin />
          <div
            style={{
              padding: 24,
              minHeight: 500,
              background: colorBgContainer,
            }}
          >
            <Outlet />
          </div>
        </Content>
        {/* <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©2023 Created by Ant UED
        </Footer> */}
      </Layout>
    </Layout>
  );
};
export default LayoutAdmin;
