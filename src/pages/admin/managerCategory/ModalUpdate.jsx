import React, { useEffect, useState } from "react";
import { Button, Checkbox, Col, Form, Input, Modal, Row, message } from "antd";

import { callUpdate_Category } from "../../../services/api";
const UpdateModal = (props) => {
  const {
    isModalUpdate,
    setIsModalUpdate,
    dataUpdate,
    fetch_listCategory
  } = props;
 
  const [form] = Form.useForm();

  const handleCancel = () => {
    setIsModalUpdate(false);
  };
  const onFinish = async (values) => {
    const { name } = values;
    
    fetchUpdate(name);
  };
  useEffect(() => {
    form.resetFields();
    
  }, [dataUpdate]);

  
  const fetchUpdate = async (category) => {
    let res = await callUpdate_Category(dataUpdate?.id, category);
    if (res && res.EC === 1) {
      message.success("Cập nhật thành công");
      setIsModalUpdate(false);
      fetch_listCategory()

    } else {
      message.error("Cập nhật thất bại ");
    }
  };

  return (
    <>
      <Modal
        title="Cập nhật thể loại"
        open={isModalUpdate}
        onOk={() => {
          form.submit();
        }}
        okText="Cập nhật"
        onCancel={handleCancel}
        maskClosable={false}
        forceRender
      >
        <Form name="basic" onFinish={onFinish} autoComplete="off" form={form}>
          <Row>
            <Col span={24}>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Tên"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Tên không được để trống !",
                  },
                ]}
                initialValue={dataUpdate.name}
              >
                <Input />
              </Form.Item>
            </Col>
           
          </Row>
        </Form>
      </Modal>
    </>
  );
};
export default UpdateModal;
