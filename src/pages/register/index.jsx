import { Button, Divider, Form, Input } from "antd";
import "./register.scss";
const onFinish = (values) => {
  console.log("Success:", values);
};

const RegisterPage = () => (
  <div className="register-container">
    <div className="content">
      <div className="title">Sign up</div>
      <Divider />
      <div className="form-content">

      <Form
          name="basic"
          
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Fullname"
            name="fullname"
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

          <Form.Item
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
          <Form.Item
          

          >
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Register
            </Button>
          </Form.Item>
        </Form>
     
      </div>
    </div>
  </div>
);
export default RegisterPage;
