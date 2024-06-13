import { useEffect, useState } from "react";
import "../../Order detail/orderDetail.scss";
import { Button, Col, Divider, Form, Image, Input, Modal, Row } from "antd";
import * as XLSX from "xlsx";
import TextArea from "antd/es/input/TextArea";
const ViewDetailOrder = (props) => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataExport, setDataExport] = useState("");
  const { dataView, infoDelivery, idOrder } = props;
  useEffect(() => {
    let arr = [...dataView];
    arr.push({
      fullname: infoDelivery.fullname,
      phone: infoDelivery.phone,
      address: infoDelivery.address,
      idOrder: idOrder,
    });
    setDataExport(arr);
  }, [idOrder]);

  const showModal = () => {
    const init = {
      fullname: infoDelivery.fullname,
      phone: infoDelivery.phone,
      address: infoDelivery.address,
    };
    form.setFieldsValue(init);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleExportData = () => {
    const worksheet = XLSX.utils.json_to_sheet(dataExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "exportdetailOrder.csv");
  };
  //console.log('gggg', dataView)
  if (dataView && dataView[0]?.mainText) {
    return (
      <div className="detail-order">
        <div className="detail-content">
          <div
            className="group-tittle"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div className="title-detail">Chi tiết đơn hàng: {idOrder}</div>
            
            <Button type="primary" onClick={handleExportData}>
              Export đơn hàng
            </Button>
          </div>

          <div className="m-2 text-xl">Mã ID User: {dataView[0]?.idUser}</div>

          <div className="address">
            <div
              style={{
                textTransform: "capitalize",
                marginBottom: 20,
                color: "#3498db",
              }}
            >
              {" "}
              địa chỉ nhận hàng
            </div>
            <div style={{ display: "flex" }}>
              <div
                style={{
                  marginRight: 30,
                }}
                className="address-text"
              >
                <span
                  style={{
                    fontWeight: 500,
                    marginRight: 30,
                  }}
                >
                  {" "}
                  {infoDelivery?.fullname} <Divider type="vertical" />
                  (+84) {+infoDelivery?.phone}
                </span>
                {infoDelivery?.address}
              </div>
              <div
                style={{
                  color: "blue",
                  cursor: "pointer",
                  width: 150,
                  textAlign: "center",
                }}
              >
                <span onClick={showModal}>Chi tiết</span>
                <Modal
                  title="Địa chỉ nhận hàng"
                  open={isModalOpen}
                  onOk={() => {
                    handleOk();
                  }}
                  onCancel={handleCancel}
                  width={window.innerWidth > 576 ? "70%" : "100%"}
                >
                  <Form name="basic" autoComplete="off" form={form}>
                    <Row gutter={10}>
                      <Col span={12}>
                        <Form.Item
                          labelCol={{ span: 24 }}
                          label="Tên người nhận"
                          name="fullname"
                        >
                          <Input disabled={true} />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          labelCol={{ span: 24 }}
                          label="Số Điện Thoại"
                          name="phone"
                        >
                          <Input disabled={true} />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Form.Item
                      labelCol={{ span: 24 }}
                      label="Địa chỉ chi tiết"
                      name="address"
                    >
                      <TextArea showCount maxLength={100} disabled={true} />
                    </Form.Item>
                  </Form>
                </Modal>
              </div>
            </div>
          </div>
          {/* ----- */}
          <div className="row-detail">
            <div className="text-product">tất cả sản phẩm </div>
            <span className="text-price">đơn giá</span>
            <span className="text-count">số lượng</span>
            <span className="text-count-res">SL</span>
            <span className="text-total">thành tiền</span>
          </div>
          <div className="list-detail">
            {dataView.map((item, index) => {
              return (
                <div key={`detail-id${index}`} className="parent">
                  <div className="group">
                    <div className="name">{item.mainText}</div>
                  </div>
                  <div className="price">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(item.price)}
                  </div>
                  <div className="quantity">{item.quantity}</div>
                  <div className="total-price">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(item.quantity * item.price)}
                  </div>
                  <Divider />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};

export default ViewDetailOrder;
