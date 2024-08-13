import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Upload,
  message,
} from "antd";
import { call_create_home, callUploadBookImg } from "../../../services/api";

const AddHome = (props) => {
  const { isModalAddHome, setIsModalAddHome, fetchAllHome, listCustomParent } =
    props;

  const [form] = Form.useForm();
  const [fileName, setFileName] = useState("");

  const [fileList, setFileList] = useState([]);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  const handleUploadFile_thumbnail = async ({ file, onSuccess, onError }) => {
    const res = await callUploadBookImg(file);
    if (res && res.EC === 1) {
      setFileName(res.data.fileUploaded);
      onSuccess("ok");
    } else {
      onError("Đã có lỗi khi upload");
    }
  };

  const handleCancel = () => {
    setIsModalAddHome(false);
  };

  const onFinish = (values) => {
    CallAddHome(fileName, "", 1);

    form.resetFields();
    setIsModalAddHome(false);
    setFileList([]);
  };

  const CallAddHome = async (banner, description, is_banner) => {
    const result = await call_create_home(banner, description, is_banner);
    if (result && result.EC == 1) {
      message.success("Thêm thành công");
      fetchAllHome();
    } else {
      message.error("Có lỗi !");
    }
  };

  return (
    <>
      <Modal
        title="Thêm banner"
        open={isModalAddHome}
        onOk={() => {
          form.submit();
        }}
        okText="Thêm mới"
        onCancel={handleCancel}
        maskClosable={false}
        width={1000}
        forceRender
      >
        <Form name="basic" onFinish={onFinish} autoComplete="off" form={form}>
          <Row>
            <Col span={24}>
              <Card title="Ảnh " bordered={true}>
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  customRequest={handleUploadFile_thumbnail}
                  onChange={onChange}
                  onPreview={onPreview}
                  maxCount={1}
                  multiple={false}
                  accept="image/*"
                >
                  Tải lên
                </Upload>
              </Card>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default AddHome;
