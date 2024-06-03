import { Button, Divider, Form, Input, message, notification } from "antd";
import "./register.scss";
import bgRegister from "../../images/bgRegister.webp";
import { RegisterUser } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("access_token")) return navigate("/");
  }, []);
  const onFinish = async (values) => {
    const { fullName, email, password, rePassword } = values;
    if (password != rePassword) {
      notification.error({
        message: "Mật khẩu không giống nhau. Hãy kiểm tra lại",
      });
      return;
    }
    setIsSubmit(true);
    let res = await RegisterUser(fullName, email, password);
    if (res?.data?.user) {
      message.success("Đăng ký tài khoản thành công!");
      setIsSubmit(false);
      navigate("/login");
    } else {
      setIsSubmit(false);
      notification.error({
        message: "Có lỗi xảy ra",
        description: res.message,
        duration: 4,
      });
    }
  };
  return (
    <div className="register-container">
      <div className="content">
        <div className="title-register">Đăng Ký Tài Khoản </div>
        <Divider />
        <div className="form-content">
          <Form requiredMark={false} name="basic" onFinish={onFinish} autoComplete="off">
            <Form.Item
              labelCol={{ span: 24 }}
              label="Tên hiển thị"
              
              name="fullName"
              rules={[
                {
                  required: true,
                  message: "Tên không được để trống!",
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
                  message: "Email không được để trống!",
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
                  message: "Password không được để trống!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              labelCol={{ span: 24 }}
              label="Xác nhận mật khẩu"
              name="rePassword"
              rules={[
                {
                  required: true,
                  message: "Xác nhận lại mật khẩu!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
                loading={isSubmit}
              >
                Đăng ký
              </Button>
            </Form.Item>
          </Form>
        </div>
        {/* <div className="image-bg">
          <img src={bgRegister} alt="" />
        </div> */}
        <div className="text">
          Đã có tài khoản?
          <div className="hover:text-blue-600 cursor-pointer" onClick={() => navigate("/login")}>Đăng nhập</div>
        </div>
        <div className="home hover:text-blue-600" onClick={() => navigate("/")}>
          Trang Chủ
        </div>
      </div>
    </div>
  );
};
export default RegisterPage;
