import { useState } from "react";
import "./getPassword.scss";
import { Button, Form, Input, message, Steps } from "antd";

const GetPassword = () => {
  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const contentStyle = {
    marginTop: 16,
  };
  const onFinish = async (values) => {
    console.log("vvvvvv", values);
  };
  const steps = [
    {
      title: "Nhập email",
      content: (
        <>
          <div>
            <Input></Input>
            <Button style={{ marginTop: 20 }} type="primary">
              Gửi mã xác nhận
            </Button>
          </div>
        </>
      ),
    },
    {
      title: "Nhập mã code",
      content: (
        <>
          <div>
            <Input></Input>
          </div>
        </>
      ),
    },
    {
      title: "Đổi mật khẩu mới",
      content: (
        <>
          <Form name="basic" onFinish={onFinish} autoComplete="off">
            <Form.Item
              labelCol={{ span: 24 }}
              label="Mật khẩu mới"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Nhập mật khẩu",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              labelCol={{ span: 24 }}
              label="Xác nhận lại mật khẩu"
              name="re-password"
              rules={[
                {
                  required: true,
                  message: " Hãy xác nhận lại mật khẩu",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
          </Form>
        </>
      ),
    },
  ];
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));
  return (
    <div className="forgot">
      <div className="forgot-content">
        <Steps current={current} items={items} />
        <div style={contentStyle}>{steps[current].content}</div>
        <div
          style={{
            marginTop: 24,
          }}
        >
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              type="primary"
              onClick={() => message.success("Processing complete!")}
            >
              Done
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GetPassword;
