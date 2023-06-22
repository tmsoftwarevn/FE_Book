import { FilterTwoTone, ReloadOutlined } from "@ant-design/icons";
import {
  Row,
  Col,
  Form,
  Checkbox,
  Divider,
  InputNumber,
  Button,
  Rate,
  Tabs,
  Pagination,
  Breadcrumb,
  Carousel,
} from "antd";
import "./home.scss";
import { useEffect, useState } from "react";
import { callGetListBook } from "../../services/api";

const Home = () => {
  const [form] = Form.useForm();
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [dataBook, setDataBook] = useState("");
  const getListBook = async () => {
    let res = await callGetListBook(current, pageSize);
    if (res && res.data) {
      setDataBook(res.data.result);
      setTotal(res.data.meta.total);
    }
  };
  console.log("current", current);
  useEffect(() => {
    getListBook();
  }, []);

  const handleChangeFilter = (changedValues, values) => {
    console.log(">>> check handleChangeFilter", changedValues, values);
  };

  const onFinish = (values) => {};

  const onChange = (key) => {
    console.log(key);
  };

  const items = [
    {
      key: "1",
      label: `Phổ biến`,
      children: <></>,
    },
    {
      key: "2",
      label: `Hàng Mới`,
      children: <></>,
    },
    {
      key: "3",
      label: `Giá Thấp Đến Cao`,
      children: <></>,
    },
    {
      key: "4",
      label: `Giá Cao Đến Thấp`,
      children: <></>,
    },
  ];
  const a = [
    {
      title: "Trang chủ",
    },
    {
      title: "Application Center",
      href: "",
    },

    {
      title: "An Application",
    },
  ];
  const contentStyle = {
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };

  return (
    <div className="homepage">
      <div className="container">
        <Breadcrumb
          separator=">"
          style={{ padding: "20px 0 20px 0", fontSize: 16 }}
          items={a}
        />
        <Row style={{ gap: 40 }}>
          <Col md={4} sm={0} xs={0} className="homepage-left">
            <Form
              onFinish={onFinish}
              form={form}
              onValuesChange={(changedValues, values) =>
                handleChangeFilter(changedValues, values)
              }
            >
              <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 20 }}>
                Danh mục sản phẩm
              </div>
              <ul style={{ lineHeight: 2 }}>
                <li>English Books</li>
                <li>Sách Tiếng Việt</li>
              </ul>
              <Divider />
              <div
                className="price"
                style={{ lineHeight: 3, marginBottom: 20 }}
              >
                <span
                  style={{
                    fontWeight: 600,
                    fontSize: 16,
                    display: "block",
                  }}
                >
                  Giá
                </span>

                <Button>Dưới 40.000</Button>
                <Button>40.000 - 120.000</Button>
                <Button>120.000 - 280.000</Button>
                <Button>Trên 280.000</Button>
              </div>

              <Form.Item label="Chọn khoảng giá" labelCol={{ span: 24 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Form.Item name={["range", "from"]}>
                    <InputNumber
                      name="from"
                      min={0}
                      placeholder="đ TỪ"
                      formatter={(value) =>
                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                    />
                  </Form.Item>
                  <Form.Item>
                    <span>-</span>
                  </Form.Item>
                  <Form.Item name={["range", "to"]}>
                    <InputNumber
                      name="to"
                      min={0}
                      placeholder="đ ĐẾN"
                      formatter={(value) =>
                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                    />
                  </Form.Item>
                </div>
                <div>
                  <Button
                    onClick={() => form.submit()}
                    style={{ width: "100%" }}
                    type="primary"
                  >
                    Áp dụng
                  </Button>
                </div>
              </Form.Item>
              <Divider />
              <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 20 }}>
                Đánh giá
              </div>
              <Form.Item labelCol={{ span: 24 }} style={{ cursor: "pointer" }}>
                <div>
                  <Rate value={5} disabled style={{ fontSize: 12 }} />
                  <span className="ant-rate-text">từ 5 sao</span>
                </div>
                <div>
                  <Rate value={4} disabled style={{ fontSize: 12 }} />
                  <span className="ant-rate-text">từ 4 sao</span>
                </div>
                <div>
                  <Rate value={3} disabled style={{ fontSize: 12 }} />
                  <span className="ant-rate-text">từ 3 sao</span>
                </div>
              </Form.Item>
            </Form>
          </Col>

          <Col md={19} xs={24} className="homepage-right">
            <div className="carousel-homepage">
              <div className="carousel">
                <Carousel autoplay>
                  <div>
                    <h3 style={contentStyle}>1</h3>
                  </div>
                  <div>
                    <h3 style={contentStyle}>2</h3>
                  </div>
                  <div>
                    <h3 style={contentStyle}>3</h3>
                  </div>
                  <div>
                    <h3 style={contentStyle}>4</h3>
                  </div>
                </Carousel>
              </div>
              <div className="tabs">
                <Row>
                  <Tabs
                    defaultActiveKey="1"
                    items={items}
                    onChange={onChange}
                  />
                </Row>
              </div>
            </div>
            <div className="home-list">
              {dataBook &&
                dataBook.length > 0 &&
                dataBook.map((item, index) => {
                  return (
                    <div className="column" key={`item-${index}`}>
                      <div className="wrapper">
                        <div className="thumbnail">
                          <img
                            src={`${
                              import.meta.env.VITE_BACKEND_URL
                            }/images/book/${item?.thumbnail}`}
                            alt="thumbnail book"
                          />
                        </div>

                        <div className="text">{item.mainText}</div>
                        <div className="group-child">
                          <div
                            className="price"
                            style={{
                              color: "rgb(255 66 78)",
                              fontWeight: 600,
                            }}
                          >
                            {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(item.price)}
                          </div>
                          <div className="rating">
                            <Rate
                              value={5}
                              disabled
                              style={{
                                color: "#ffce3d",
                                fontSize: 8,
                                marginRight: 15,
                              }}
                            />
                            <span style={{ display: "inline-block" }}>
                              Đã bán {item.quantity}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
            <Divider />
            <Row style={{ display: "flex", justifyContent: "center" }}>
              <Pagination
                current={current}
                total={total}
                pageSize={pageSize}
                responsive
              />
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Home;
