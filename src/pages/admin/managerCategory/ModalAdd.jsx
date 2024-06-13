import React, { useEffect, useState } from "react";
import { Button, Col, Form, Input, Modal, Row, message } from "antd";

import { useParams } from "react-router-dom";
import { callCreate_Category } from "../../../services/api";

const AddModal = (props) => {
  const { isModalAdd, setIsModalAdd, fetch_listCategory } = props;
  const params = useParams();
  const [form] = Form.useForm();

  const handleCancel = () => {
    setIsModalAdd(false);
  };
  const onFinish = (values) => {
    const { name } = values;
    fetchAdd(name);
    form.resetFields();
  };

  const fetchAdd = async (category) => {
    let res = await callCreate_Category(category);
    if (res && res.EC === 1) {
      message.success("Thêm thành công");
      setIsModalAdd(false);
      fetch_listCategory();
    } else {
      message.error("Thêm thất bại ");
      setIsModalAdd(false);
    }
  };

  return (
    <>
      <Modal
        title="Thêm thể loại"
        open={isModalAdd}
        onOk={() => {
          form.submit();
        }}
        okText="Thêm mới"
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
export default AddModal;
