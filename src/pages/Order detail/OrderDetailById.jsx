import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { callGetDetailOrderWithId } from "../../services/api";
import "./orderDetail.scss";
import { Col, Divider, Form, Image, Input, Modal, Row } from "antd";
import { convertSlug } from "../../utils/convertSlug";
import TextArea from "antd/es/input/TextArea";

const DetailOrderById = () => {
  const [form] = Form.useForm();
  const params = useParams();
  const [dataView, setDataView] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const infoDelivery = location.state?.infoDelivery;

  useEffect(() => {
    const fetchDetailOrder = async () => {
      let res = await callGetDetailOrderWithId(params.id);
      console.log('resssss', res)

      if (res && res.data) {
        setDataView(res.data);
      }
    };
    if (!infoDelivery) navigate("/orderHistory");
    fetchDetailOrder();
  }, []);
  
  const handleRedirectDetailBook = (book) => {
    const slug = convertSlug(book.mainText);
    navigate(`/book/${slug}`);
  };

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
  return (
    <div className="detail-order">
      <div className="container">
        <div className="detail-content">
          <div className="title-detail">Chi tiết đơn hàng</div>
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
                    <div
                      className="thumbnail"
                      onClick={() => handleRedirectDetailBook(item)}
                    >
                      <Image
                        width={80}
                        height={80}
                        preview={false}
                        src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${
                          item.thumbnail
                        }`}
                      />
                    </div>
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
    </div>
  );
};

export default DetailOrderById;
