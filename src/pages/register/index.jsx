import { Button, Divider, Form, Input, message, notification } from "antd";
import "./register.scss";
import bgRegister from "../../images/bgRegister.webp";
import { RegisterUser } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState(false);
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);

  useEffect(() => {
    if (localStorage.getItem("access_token")) return navigate("/");
  }, []);
  const onFinish = async (values) => {
    const { fullName, email, password, phone } = values;
    setIsSubmit(true);
    let res = await RegisterUser(fullName, email, password, phone);
    if (res?.data?._id) {
      message.success("Đăng ký tài khoản thành công!");
      setIsSubmit(false);
      navigate("/login");
    } else {
      setIsSubmit(false);
      notification.error({
        message: "Có lỗi xảy ra",
        description:
          res.message && Array.isArray(res.message)
            ? res.message[0]
            : res.message,
        duration: 4,
      });
    }
  };
  return (
    <div className="register-container">
      <div className="content">
        <div className="title-register">Đăng Kí Tài Khoản </div>
        <Divider />
        <div className="form-content">
          <Form name="basic" onFinish={onFinish} autoComplete="off">
            <Form.Item
              labelCol={{ span: 24 }}
              label="Tên hiển thị"
              name="fullName"
              rules={[
                {
                  required: true,
                  message: "Please input your fullname!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              labelCol={{ span: 24 }}
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              labelCol={{ span: 24 }}
              label="Mật khẩu"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              labelCol={{ span: 24 }}
              label="Phone"
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Please input your phone!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
                loading={isSubmit}
              >
                Đăng kí
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="image-bg">
          <img src={bgRegister} alt="" />
        </div>
        <div className="text">
          Đã có tài khoản?
          <b onClick={() => navigate("/login")}>Đăng nhập</b>
        </div>
        <div className="home" onClick={() => navigate("/")}>
          &#60;Trang Chủ&#62;
        </div>
      </div>
    </div>
  );
};
export default RegisterPage;
