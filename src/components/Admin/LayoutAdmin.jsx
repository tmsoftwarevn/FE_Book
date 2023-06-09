import "./layoutAdmin.scss";
import {
  UserOutlined,
  AppstoreOutlined,
  TeamOutlined,
  ExceptionOutlined,
  DollarCircleOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme, message } from "antd";
import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Dropdown, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { callLogout } from "../../services/api";
import { doLogoutAction } from "../../redux/account/accountSlice";

const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem(<Link to="/admin">Dashboard</Link>, "1", <AppstoreOutlined />),
  getItem("Manager Users", "sub1", <UserOutlined />, [
    getItem("CRUD", "2", <TeamOutlined />),
    getItem("File", "3", <TeamOutlined />),
  ]),
  getItem(
    <Link to="/admin/book">Manager Books</Link>,
    "4",
    <ExceptionOutlined />
  ),
  getItem(
    <Link to="/admin/order">Manager Orders</Link>,
    "5",
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
      label: <Link to="/">Trang chủ</Link>,
      key: "home",
    },
  ];
  return (
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
  );
};
const LayoutAdmin = () => {
  const [keyActive, setKeyActive] = useState("1");
  const [collapsed, setCollapsed] = useState(false);
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
          defaultSelectedKeys={[keyActive]}
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
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
export default LayoutAdmin;
