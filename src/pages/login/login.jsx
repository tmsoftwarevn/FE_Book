import { Button, Divider, Form, Input } from "antd";
import "./login.scss";

const LoginPage = () => {

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  return (
    <div className="login-container">
      <div className="content">
        <div className="title">Welcome to Windy Book</div>
        <div className="form-content">
          <Form name="basic" onFinish={onFinish} autoComplete="off">
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
      </div>
    </div>
  );
};
export default LoginPage;
