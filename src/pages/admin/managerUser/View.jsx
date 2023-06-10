import { Button, Drawer, Space } from "antd";
import { useEffect, useState } from "react";
import { Badge, Descriptions } from "antd";
import moment from 'moment';

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
        <Descriptions  bordered>
          <Descriptions.Item label="Email">{dataView.email}</Descriptions.Item>
          <Descriptions.Item label="Tên hiển thị">{dataView.fullName}</Descriptions.Item>
          <Descriptions.Item label="Số điện thoại">{dataView.phone}</Descriptions.Item>
          <Descriptions.Item label="Created At">
          {moment(dataView?.createdAt).format('DD-MM-YY hh:mm:ss')}
          </Descriptions.Item>
          <Descriptions.Item label="Updated At" span={2}>
            {moment(dataView?.updatedAt).utcOffset('+0700').format('DD-MM-YY hh:mm:ss')}
          </Descriptions.Item>
          <Descriptions.Item label="Role" span={3}>
            <Badge status="processing" text="User" />
          </Descriptions.Item>
          
        </Descriptions>
      </Drawer>
    </>
  );
};

export default ViewUser;
