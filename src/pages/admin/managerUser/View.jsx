import { Button, Drawer, Space } from "antd";
import { useEffect, useState } from "react";
import { Badge, Descriptions } from "antd";
import moment from "moment";

const ViewUser = (props) => {
  const { view, setView, dataView } = props;

  const onClose = () => {
    setView(false);
  };
  return (
    <>
      <Drawer
        title="Thông tin chi tiết User"
        placement={"top"}
        width={500}
        onClose={onClose}
        open={view}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" onClick={onClose}>
              OK
            </Button>
          </Space>
        }
      >
        <Descriptions bordered column={2}>
          <Descriptions.Item label="Email">{dataView.email}</Descriptions.Item>
          <Descriptions.Item label="Tên hiển thị">
            {dataView.fullName}
          </Descriptions.Item>
          <Descriptions.Item label="Created At">
            {dataView?.createdAt}
          </Descriptions.Item>
          <Descriptions.Item label="Updated At">
            {dataView?.updatedAt}
          </Descriptions.Item>
          <Descriptions.Item label="Role">
            <Badge status="processing" text={dataView?.role} />
          </Descriptions.Item>
          <Descriptions.Item label="Type">
            <Badge status="processing" text={dataView?.type} />
          </Descriptions.Item>
        </Descriptions>
      </Drawer>
    </>
  );
};

export default ViewUser;
