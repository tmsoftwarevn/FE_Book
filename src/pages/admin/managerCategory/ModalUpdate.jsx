import React, { useEffect, useState } from "react";
import { Select, Col, Form, Input, Modal, Row, message, Checkbox } from "antd";

import { callUpdate_Category } from "../../../services/api";
import SelectCategory from "../util/select category/SelectCategory";

const UpdateModal = (props) => {
  const {
    isModalUpdate,
    setIsModalUpdate,
    dataUpdate,
    fetch_listCategory,
    list,
  } = props;

  const [form] = Form.useForm();
  const [active, setActive] = useState(dataUpdate.active);
  const [idCategoryParent, setIdCategoryParent] = useState();

  const handleCancel = () => {
    setIsModalUpdate(false);
  };
  const onFinish = async (values) => {
    const { name } = values;

    fetchUpdate(name, active);
  };

  useEffect(() => {
    form.resetFields();
    setIdCategoryParent(dataUpdate?.parentId)
    setActive(dataUpdate.active);
  }, [dataUpdate]);

  const fetchUpdate = async (category, active) => {
    console.log('aaaaaa', active)
    let res = await callUpdate_Category(
      dataUpdate?.id,
      category,
      idCategoryParent,
      active
    );
    if (res && res.EC === 1) {
      message.success("Cập nhật thành công");
      setIsModalUpdate(false);
      fetch_listCategory();
    } else {
      message.error("Cập nhật thất bại ");
    }
  };
  const onChangeActive = (e) => {
    if (e.target.checked) setActive(1);
    else setActive(0);
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
            <Col span={24}>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Tên thể loại cha"
                name="parentName"
                
              >
                <SelectCategory
                  dataUpdate={dataUpdate}
                  setIdCategoryParent={setIdCategoryParent}
                 
                  list={list}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Checkbox
                checked={+active === 1 ? true : false}
                onChange={onChangeActive}
              >
                Hiện
              </Checkbox>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateModal;
