import { Modal, message, notification } from "antd";
import { Form, Input } from "antd";
import { RegisterUser } from "../../../services/api";
const AddUser = (props) => {
  const { isModalAddUser, setIsModalAddUser, getListUser } = props;
  const [form] = Form.useForm();
  const handleOk = () => {
    setIsModalAddUser(false);
  };
  const handleCancel = () => {
    setIsModalAddUser(false);
  };

  const onFinish = async (values) => {
    const { fullName, email, password } = values;
    let res = await RegisterUser(fullName, email, password);
    if (res?.data?.user) {
      message.success("Thêm mới tài khoản thành công!");
    } else {
      notification.error({
        message: "Có lỗi xảy ra",
        description: res.message,
        duration: 4,
      });
    }
    form.resetFields();
    handleOk();
  };

  return (
    <>
      <Modal
        title="Thêm mới người dùng"
        open={isModalAddUser}
        onOk={() => form.submit()}
        onCancel={handleCancel}
      >
        <Form name="basic" onFinish={onFinish} autoComplete="off" form={form}>
          <Form.Item
            labelCol={{ span: 24 }}
            label="Username"
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
        </Form>
      </Modal>
    </>
  );
};

export default AddUser;
