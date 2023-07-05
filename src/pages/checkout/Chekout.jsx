import {
  Badge,
  Button,
  Col,
  Descriptions,
  Divider,
  Form,
  Image,
  Input,
  Modal,
  Row,
} from "antd";
import "./checkout.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { doUpdateAddressUser } from "../../redux/account/accountSlice";
import {
  doRemoveAfterOrder,
  saveInfoCartUser,
} from "../../redux/cart/cartSlice";

const { TextArea } = Input;
const validKeyForPayment = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "Backspace",
];
const Checkout = () => {
  let listCart = useSelector((state) => state.cart.listCart);
  const address = useSelector((state) => state.account?.user?.address);
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const listProductBuy = location.state?.listBook;
  const dispatch = useDispatch();
  let totalPriceProduct = 0;
  let totalFinal = 0;

  useEffect(() => {
    if (!listProductBuy) {
      navigate("/cart");
    }
  }, [listProductBuy]);
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
    dispatch(doUpdateAddressUser(values));
  };
  const handleOrderProduct = () => {
    // call api dat hang
    dispatch(doRemoveAfterOrder(listProductBuy));
    dispatch(saveInfoCartUser());
    navigate("/order", { state: { isCheckout: true } });
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
                      {address.username} <Divider type="vertical" />
                      {address.phone}
                    </span>
                    {address.address}
                  </div>
                </>
              ) : (
                <>
                  <div style={{ marginRight: 20 }}>
                    Chưa Nhập thông tin giao hàng...
                  </div>
                </>
              )}

              <div
                style={{
                  color: "blue",
                  cursor: "pointer",
                  width: 150,
                  textAlign: "center",
                }}
              >
                <span onClick={showModal}>Thay đổi</span>
                <Modal
                  title="Địa chỉ nhận hàng"
                  open={isModalOpen}
                  onOk={() => {
                    form.submit(), handleOk();
                  }}
                  onCancel={handleCancel}
                  width={window.innerWidth > 576 ? "70%" : "100%"}
                  maskClosable={false}
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
                          onKeyDown={(e) => {
                            if (!validKeyForPayment.includes(e.key)) {
                              e.preventDefault();
                            }
                          }}
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
            <span className="text-count-res">SL</span>
            <span className="text-total">thành tiền</span>
          </div>
          <div className="list-product">
            {listCart.length > 0 &&
              listProductBuy?.length > 0 &&
              listCart.map((item, index) => {
                return listProductBuy.map((idBuy, i) => {
                  if (item.id === idBuy) {
                    totalPriceProduct += item.quantity * item.detail.price;
                    return (
                      <div key={`buyid${i}`} className="parent">
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
                      </div>
                    );
                  }
                });
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
                  className="text-res"
                >
                  Vận chuyển:
                </span>
                <Descriptions.Item label="Status">
                  <Badge status="processing" style={{ marginRight: 10 }} />
                </Descriptions.Item>
                Miễn phí vận chuyển
              </div>
              <div className="delivery-res">
                {" "}
                <Descriptions.Item label="Status">
                  <Badge status="processing" style={{ marginRight: 10 }} />
                </Descriptions.Item>
                Miễn phí vận chuyển
              </div>
              <div className="payment ">
                <span
                  style={{ color: "blue", display: "inline-block", width: 200 }}
                >
                  Phương thức thanh toán:
                </span>
                <Descriptions.Item label="Status">
                  <Badge status="processing" style={{ marginRight: 10 }} />
                </Descriptions.Item>
                Thanh toán khi nhận hàng
              </div>
              <div className="payment-res">
                <Descriptions.Item label="Status">
                  <Badge status="processing" style={{ marginRight: 10 }} />
                </Descriptions.Item>
                Thanh toán khi nhận hàng
              </div>
            </div>

            <div
              className="total-price"
              style={{
                lineHeight: 2,
              }}
            >
              <div className="tienhang">
                <span>Tổng tiền hàng: </span>
                <span>
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(totalPriceProduct)}
                </span>
              </div>

              <div className="phivanchuyen">
                <span>Phí vận chuyển: </span>
                <span>0 đ</span>
              </div>

              <div className="tongthanhtoan">
                <span>Tổng thanh toán: &nbsp;</span>
                <span style={{ color: "#ee4d2d" }}>
                  {" "}
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(totalPriceProduct)}
                </span>
              </div>

              <button
                className="btn-order"
                onClick={() => handleOrderProduct()}
              >
                Đặt hàng ({listProductBuy && listProductBuy?.length})
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
