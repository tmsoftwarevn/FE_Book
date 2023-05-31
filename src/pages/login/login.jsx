import { Button, Divider, Form, Input, message, notification } from "antd";
import "./login.scss";
import { FacebookOutlined, GoogleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { ApiLogin } from "../../services/api";
import { useDispatch } from "react-redux";
import {doLoginAction} from "../../redux/account/accountSlice"

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const onFinish = async (values) => {
    const { username, password } = values;
  
    let res = await ApiLogin(username, password);
    console.log('>>>. res', res)
    if (res?.data) {
      localStorage.setItem('access_token', res.data.access_token)
      dispatch(doLoginAction(res.data))
      message.success("Đăng nhập thành công");
      navigate("/");
    } else {
      notification.error({
        message: "Đăng nhập thất bại",
        description:
          res.message && Array.isArray(res.message)
            ? res.message[0]
            : res.message,
        duration: 4,
      });
    }
  };

  return (
    <div className="login-container">
      <div className="content">
        <div className="title">Welcome to Dream Book</div>
        <div className="form-content">
          <Form name="basic" onFinish={onFinish} autoComplete="off">
            <Form.Item
              labelCol={{ span: 24 }}
              label="Email"
              name="username"
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
              label="Password"
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
            {/* <Form.Item>
                <div className="text">Forgot password ?</div>
              </Form.Item> */}

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </div>

        <div className="text">
          <u onClick={() => navigate("/register")}>Sign Up</u>
          <u>Forgot password ?</u>
        </div>
        <div className="group">
          <Divider
            style={{
              fontWeight: "600",
            }}
          >
            Or Sign Up Using
          </Divider>
          <div className="login-with">
            <div className="google">
              <GoogleOutlined />
            </div>
            <div className="faceBook">
              <FacebookOutlined />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
