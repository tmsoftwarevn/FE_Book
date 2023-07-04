import { Button, Col, Divider, Form, Image, Input, Modal, Row } from "antd";
import "./checkout.scss";
import { useSelector } from "react-redux";
import { useState } from "react";

const { TextArea } = Input;
const Checkout = () => {
  const listProduct = useSelector((state) => state.cart.listCart);
  const address = useSelector((state) => state.account?.address);
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinish = (values) => {
    const { username, phone, address } = values;
    console.log("name", values);
  };
  return (
    <div className="checkout">
      <div className="container">
        <div className="checkout-main">
          <div className="title-checkout">Đặt hàng</div>
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
              {address ? (
                <>
                  <div
                    style={{
                      marginRight: 30,
                      maxWidth: "70%",
                    }}
                  >
                    <span style={{ fontWeight: 600, color: "#222" }}>
                      {" "}
                      name sodienthoai{" "}
                    </span>
                    dia cho chi tiet
                  </div>
                </>
              ) : (
                <>
                  <div style={{ marginRight: 20 }}>
                    Xin Nhập thông tin giao hàng...
                  </div>
                </>
              )}

              <div style={{ color: "blue", cursor: "pointer" }}>
                <span onClick={showModal}>Thay đổi</span>
                <Modal
                  title="Địa chỉ nhận hàng"
                  open={isModalOpen}
                  onOk={() => {
                    form.submit(), handleOk();
                  }}
                  onCancel={handleCancel}
                  width={"50vw"}
                >
                  <Form
                    name="basic"
                    onFinish={onFinish}
                    autoComplete="off"
                    form={form}
                  >
                    <Row gutter={10}>
                      <Col span={12}>
                        <Form.Item
                          labelCol={{ span: 24 }}
                          label="Tên người nhận"
                          name="username"
                          rules={[
                            {
                              required: true,
                              message: "Nhập tên người nhận!",
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          labelCol={{ span: 24 }}
                          label="Số Điện Thoại"
                          name="phone"
                          rules={[
                            {
                              required: true,
                              message: "Nhập số điện thoại!",
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Form.Item
                      labelCol={{ span: 24 }}
                      label="Địa chỉ chi tiết"
                      name="address"
                      rules={[
                        {
                          required: true,
                          message: "Nhập địa chỉ chi tiết!",
                        },
                      ]}
                    >
                      <TextArea showCount maxLength={100} />
                    </Form.Item>
                  </Form>
                </Modal>
              </div>
            </div>
          </div>
          <div className="row-header">
            <div className="text-product">tất cả sản phẩm </div>
            <span className="text-price">đơn giá</span>
            <span className="text-count">số lượng</span>
            <span className="text-total">thành tiền</span>
          </div>

          <div className="list-product">
            {listProduct &&
              listProduct.map((item, index) => {
                return (
                  <>
                    <div className="group">
                      <div className="thumbnail">
                        <Image
                          width={80}
                          height={80}
                          preview={false}
                          src={`${
                            import.meta.env.VITE_BACKEND_URL
                          }/images/book/${item.detail.thumbnail}`}
                        />
                      </div>
                      <div className="name">{item.detail.mainText}</div>
                    </div>
                    <div className="price">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(item.detail.price)}
                    </div>
                    <div className="quantity">{item.quantity}</div>
                    <div className="total-price">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(item.quantity * item.detail.price)}
                    </div>
                    <Divider />
                  </>
                );
              })}
          </div>

          <div className="delivery-totalPrice">
            <div className="group">
              <div className="delivery">
                <span
                  style={{
                    color: "blue",
                    display: "inline-block",
                    width: 200,
                    marginBottom: 10,
                  }}
                >
                  Vận chuyển: &nbsp;
                </span>{" "}
                Miễn phí vận chuyển
              </div>
              <div className="payment ">
                <span
                  style={{ color: "blue", display: "inline-block", width: 200 }}
                >
                  Phương thức thanh toán: &nbsp;
                </span>{" "}
                Thanh toán khi nhận hàng
              </div>
            </div>

            <div
              className="total-price"
              style={{
                lineHeight: 2,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>Tổng tiền hàng:</span>
                <span>
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(11111111)}
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>Phí vận chuyển:</span>
                <span>0 đ</span>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>Tổng thanh toán: &nbsp;</span>
                <span style={{ color: "#ee4d2d" }}>
                  {" "}
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(32434344)}
                </span>
              </div>

              <button className="btn-order">Đặt hàng (3)</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
