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
  Drawer,
} from "antd";
import "./home.scss";
import { useEffect, useState } from "react";
import { callFetchCategory, callGetListBook } from "../../services/api";
import { AiFillFilter } from "react-icons/ai";
import { GrPowerReset } from "react-icons/gr";
import { AiOutlineDown } from "react-icons/ai";
import { AiOutlineUp } from "react-icons/ai";

const Home = () => {
  const [form] = Form.useForm();

  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [dataBook, setDataBook] = useState("");
  const [activePrice, setactivePrice] = useState({
    a: false,
    b: false,
    c: false,
    d: false,
  });
  const [listCategory, setlistCategory] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [modalFilter, setModalFilter] = useState(false);

  useEffect(() => {
    const getListCategory = async () => {
      let res = await callFetchCategory();
      if (res && res.data) {
        setlistCategory(res.data);
      }
    };
    getListCategory();
  }, []);
  const numberOfItems = showMore ? listCategory.length : 5;

  const handleSelectPrice = (name) => {
    if (name === "a") {
      setactivePrice({
        a: !activePrice.a,
        b: false,
        c: false,
        d: false,
      });
    }
    if (name === "b") {
      setactivePrice({
        a: false,
        b: !activePrice.b,
        c: false,
        d: false,
      });
    }
    if (name === "c") {
      setactivePrice({
        a: false,
        b: false,
        c: !activePrice.c,
        d: false,
      });
    }
    if (name === "d") {
      setactivePrice({
        a: false,
        b: false,
        c: false,
        d: !activePrice.d,
      });
    }
  };

  const onClose = () => {
    setModalFilter(false);
  };
  const getListBook = async () => {
    let res = await callGetListBook(current, pageSize);
    if (res && res.data) {
      setDataBook(res.data.result);
      setTotal(res.data.meta.total);
    }
  };

  useEffect(() => {
    getListBook();
  }, [current]);

  const handleChangeFilter = (changedValues, values) => {
    //console.log(">>> check handleChangeFilter", changedValues, values);
  };

  const onFinish = (values) => {
    console.log("check value", values);
  };

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
  const handleChangePage = (p, s) => {
    setCurrent(p);
  };
  const handleReset = () => {
    form.resetFields();
    setactivePrice({
      a: false,
      b: false,
      c: false,
      d: false,
    });
  };
  const handleShowMore = () => {
    setShowMore(!showMore);
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
          <Col lg={4} sm={24} md={24} className="homepage-left">
            <Form
              onFinish={onFinish}
              form={form}
              onValuesChange={(changedValues, values) =>
                handleChangeFilter(changedValues, values)
              }
            >
              <div
                style={{
                  fontWeight: 600,
                  fontSize: 16,
                  marginBottom: 20,
                }}
              >
                Danh mục sản phẩm
              </div>
              <Form.Item name="category" labelCol={{ span: 24 }}>
                <Checkbox.Group>
                  <Row>
                    {listCategory?.length > 0 &&
                      listCategory
                        .slice(0, numberOfItems)
                        .map((item, index) => {
                          return (
                            <Col
                              span={24}
                              className="category-group"
                              key={`item-${index}`}
                            >
                              <Checkbox value={item}>{item}</Checkbox>
                            </Col>
                          );
                        })}
                    {showMore === false ? (
                      <div onClick={() => handleShowMore()} className="show">
                        <p>Xem tất cả</p>
                        <AiOutlineDown style={{ color: "rgb(13, 92, 182)" }} />
                      </div>
                    ) : (
                      <div onClick={() => handleShowMore()} className="show">
                        <p>Thu gọn</p>
                        <AiOutlineUp style={{ color: "rgb(13, 92, 182)" }} />
                      </div>
                    )}
                  </Row>
                </Checkbox.Group>
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
              <Divider />
              <Form.Item>
                <div className="price" style={{ lineHeight: 3 }}>
                  <span
                    style={{
                      fontWeight: 600,
                      fontSize: 16,
                      display: "block",
                    }}
                  >
                    Giá
                  </span>

                  <Button
                    value={40000}
                    onClick={() => handleSelectPrice("a")}
                    className={activePrice.a === true ? "active" : ""}
                  >
                    Dưới 40.000
                  </Button>
                  <Button
                    onClick={() => handleSelectPrice("b")}
                    className={activePrice.b === true ? "active" : ""}
                  >
                    {" "}
                    40.000 - 120.000
                  </Button>
                  <Button
                    onClick={() => handleSelectPrice("c")}
                    className={activePrice.c === true ? "active" : ""}
                  >
                    {" "}
                    120.000 - 300.000
                  </Button>
                  <Button
                    onClick={() => handleSelectPrice("d")}
                    className={activePrice.d === true ? "active" : ""}
                  >
                    {" "}
                    Trên 300.000
                  </Button>
                </div>
              </Form.Item>

              <Form.Item label="Chọn khoảng giá từ" labelCol={{ span: 24 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Form.Item name="from">
                    <InputNumber
                      className="input-number"
                      min={0}
                      placeholder="đ"
                      formatter={(value) =>
                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                    />
                  </Form.Item>
                </div>

                <div
                  style={{
                    gap: 20,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Button
                    onClick={() => form.submit()}
                    style={{ width: "60%" }}
                    type="primary"
                  >
                    Áp dụng
                  </Button>

                  <Button
                    onClick={() => handleReset()}
                    style={{ width: "30%" }}
                  >
                    <GrPowerReset />
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </Col>

          <Col lg={19} md={24} className="homepage-right">
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
                <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
                <div className="filter" onClick={() => setModalFilter(true)}>
                  <span style={{ marginRight: 10 }}>Bộ lọc</span>
                  <AiFillFilter />
                </div>
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
                onChange={(p, s) => handleChangePage(p, s)}
              />
            </Row>
          </Col>
        </Row>
        <Drawer
          title="Bộ lọc sản phẩm"
          placement="right"
          onClose={onClose}
          open={modalFilter}
        >
          <Form
            onFinish={onFinish}
            form={form}
            onValuesChange={(changedValues, values) =>
              handleChangeFilter(changedValues, values)
            }
          >
            <div
              style={{
                fontWeight: 600,
                fontSize: 16,
                marginBottom: 20,
              }}
            >
              Danh mục sản phẩm
            </div>
            <Form.Item name="category" labelCol={{ span: 24 }}>
              <Checkbox.Group>
                <Row>
                  <Col span={24} className="category-group">
                    <Checkbox value="A">Truyện cổ tích - Ngụ ngôn</Checkbox>
                  </Col>
                  <Col span={24} className="category-group">
                    <Checkbox value="A">Sách kinh tế</Checkbox>
                  </Col>
                  <Col span={24}>
                    <Checkbox value="A">Sách kinh tế</Checkbox>
                  </Col>
                  <Col span={24}>
                    <Checkbox value="A">Sách kinh tế</Checkbox>
                  </Col>
                  <Col span={24}>
                    <Checkbox value="A">Sách kinh tế</Checkbox>
                  </Col>
                  <Col span={24}>
                    <Checkbox value="A">Sách kinh tế</Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>
            </Form.Item>

            <Divider />
            <div className="price" style={{ lineHeight: 3, marginBottom: 20 }}>
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

            <Form.Item label="Chọn khoảng giá từ" labelCol={{ span: 24 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Form.Item name={["range", "from"]}>
                  <InputNumber
                    className="input-number"
                    name="from"
                    min={0}
                    placeholder="đ"
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
        </Drawer>
      </div>
    </div>
  );
};

export default Home;
