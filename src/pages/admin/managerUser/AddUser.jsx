import { Button, Modal, message, notification } from "antd";
import { Form, Input } from "antd";
import { callCreateUser } from "../../../services/api";
const AddUser = (props) => {
  const { isModalAddUser, setIsModalAddUser } = props;
  const [form] = Form.useForm();
  const handleOk = () => {
    setIsModalAddUser(false);
  };
  const handleCancel = () => {
    setIsModalAddUser(false);
  };
  
  const onFinish = async(values) => {
    const {fullName, email, phone, password} = values;
    let res = await callCreateUser(fullName, email, password, phone)
    if(res && res.data){
        message.success('Tạo thành công user')
    }
    else{
        notification.error('Có lỗi xảy ra')
    }
    form.resetFields();
    handleOk()
   
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
        </Form>
      </Modal>
    </>
  );
};

export default AddUser;
