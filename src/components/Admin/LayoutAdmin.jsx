import "./layoutAdmin.scss";
import {
  AppstoreOutlined,
  TeamOutlined,
  ExceptionOutlined,
  DollarCircleOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme, message } from "antd";
import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Dropdown, Space } from "antd";
import { useDispatch } from "react-redux";
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
    <Link to="/admin/dashboard">Dashboard</Link>,
    "/admin/dashboard",
    <AppstoreOutlined />
  ),
  getItem(<Link to="/admin/user">User</Link>, "/admin/user", <TeamOutlined />),
  getItem(
    <Link to="/admin/book">Manager Books</Link>,
    "/admin/book",
    <ExceptionOutlined />
  ),
  getItem(
    <Link to="/admin/order">Manager Orders</Link>,
    "/admin/order",
    <DollarCircleOutlined />
  ),
];

const AccountAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    const res = await callLogout();
    if (res && res.data) {
      dispatch(doLogoutAction());
      message.success("Đăng xuất thành công");
      navigate("/login");
    }
  };
  const location = useLocation();
  const items = [
    {
      label: <Link to="/">Quản lý tài khoản</Link>,
      key: "account",
    },
    {
      label: <p onClick={() => handleLogout()}>Đăng xuất</p>,
      key: "logout",
    },
    {
      label: (
        <p onClick={() => navigate("/", { state: { from: location } })}>
          Trang chủ
        </p>
      ),
      key: "home",
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
  const [keyActive, setKeyActive] = useState("/admin/dashboard");
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
