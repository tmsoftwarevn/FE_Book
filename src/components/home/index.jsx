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
  Dropdown,
  Space,
} from "antd";
import "./home.scss";
import { useEffect, useState } from "react";
import { callFetchCategory, callGetListBook } from "../../services/api";
import { AiFillFilter } from "react-icons/ai";
import { GrPowerReset } from "react-icons/gr";
import { AiOutlineDown } from "react-icons/ai";
import { AiOutlineUp } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import ScaleLoader from "react-spinners/ScaleLoader";
import HomeSkeleton from "./homeSkeleton";

const Home = () => {
  const [form] = Form.useForm();

  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [dataBook, setDataBook] = useState("");
  const [price, setPrice] = useState([]);

  const [activePrice, setactivePrice] = useState({
    a: false,
    b: false,
    c: false,
    d: false,
  });
  const [activeStar, setActiveStar] = useState([
    {
      five: false,
      four: false,
      three: false,
    },
  ]);

  const [listCategory, setlistCategory] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [modalFilter, setModalFilter] = useState(false);

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      getListBook();
    }, 5000);
    //getListBook();
    window.scrollTo(0, 0);
  }, [current]);

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

  const handleSelectPrice = (name, price) => {
    if (name === "a") {
      setactivePrice({
        a: !activePrice.a,
        b: false,
        c: false,
        d: false,
      });
      if (activePrice.a === true) {
        setPrice([]);
      } else {
        setPrice(price);
      }
    }
    if (name === "b") {
      setactivePrice({
        a: false,
        b: !activePrice.b,
        c: false,
        d: false,
      });
      if (activePrice.b === true) {
        setPrice([]);
      } else {
        setPrice(price);
      }
    }
    if (name === "c") {
      setactivePrice({
        a: false,
        b: false,
        c: !activePrice.c,
        d: false,
      });
      if (activePrice.c === true) {
        setPrice([]);
      } else {
        setPrice(price);
      }
    }
    if (name === "d") {
      setactivePrice({
        a: false,
        b: false,
        c: false,
        d: !activePrice.d,
      });
      if (activePrice.d === true) {
        setPrice([]);
      } else {
        setPrice(price);
      }
    }
  };

  const handleSelectStar = (name) => {
    if (name === "five") {
      setActiveStar({
        five: !activeStar.five,
        four: false,
        three: false,
      });
    }
    if (name === "four") {
      setActiveStar({
        five: false,
        four: !activeStar.four,
        three: false,
      });
    }
    if (name === "three") {
      setActiveStar({
        five: false,
        four: false,
        three: !activeStar.three,
      });
    }
  };
  const onClose = () => {
    setModalFilter(false);
  };
  const getListBook = async () => {
    let res = await callGetListBook(current, pageSize);
    setIsLoading(false);
    if (res && res.data) {
      setDataBook(res.data.result);
      setTotal(res.data.meta.total);
    }
  };

  const handleChangeFilter = (changedValues, values) => {
    //console.log(">>> check handleChangeFilter", changedValues, values);
  };

  const onFinish = (values) => {
    console.log("check value", values);
    console.log("price", price);
    onClose();
  };

  const onChange = (key) => {
    console.log(key);
  };

  const item = [
    {
      key: "1",
      label: `Tất cả`,
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
  ];

  const items = [
    {
      label: <a href="">Thấp đến cao</a>,
      key: "0",
    },
    {
      label: <a href="">Cao đến thấp</a>,
      key: "1",
    },
  ];
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
    setPrice([]);
    setActiveStar({
      five: false,
      four: false,
      three: false,
    });
  };
  const handleShowMore = () => {
    setShowMore(!showMore);
  };
  const nonAccentVietnamese = (str) => {
    str = str.replace(/A|Á|À|Ã|Ạ|Â|Ấ|Ầ|Ẫ|Ậ|Ă|Ắ|Ằ|Ẵ|Ặ/g, "A");
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/E|É|È|Ẽ|Ẹ|Ê|Ế|Ề|Ễ|Ệ/, "E");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/I|Í|Ì|Ĩ|Ị/g, "I");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/O|Ó|Ò|Õ|Ọ|Ô|Ố|Ồ|Ỗ|Ộ|Ơ|Ớ|Ờ|Ỡ|Ợ/g, "O");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/U|Ú|Ù|Ũ|Ụ|Ư|Ứ|Ừ|Ữ|Ự/g, "U");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/Y|Ý|Ỳ|Ỹ|Ỵ/g, "Y");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/Đ/g, "D");
    str = str.replace(/đ/g, "d");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
    return str;
  };

  const convertSlug = (str) => {
    str = nonAccentVietnamese(str);
    str = str.replace(/^\s+|\s+$/g, ""); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    const from =
      "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆĞÍÌÎÏİŇÑÓÖÒÔÕØŘŔŠŞŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇğíìîïıňñóöòôõøðřŕšşťúůüùûýÿžþÞĐđßÆa·/_,:;";
    const to =
      "AAAAAACCCDEEEEEEEEGIIIIINNOOOOOORRSSTUUUUUYYZaaaaaacccdeeeeeeeegiiiiinnooooooorrsstuuuuuyyzbBDdBAa------";
    for (let i = 0, l = from.length; i < l; i++) {
      str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
    }

    str = str
      .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
      .replace(/\s+/g, "-") // collapse whitespace and replace by -
      .replace(/-+/g, "-"); // collapse dashes

    return str;
  };

  const handleRedirectBook = (book) => {
    const slug = convertSlug(book.mainText);
    navigate(`/book/${slug}?id=${book._id}`);
  };

  return (
    <div className="homepage">
      <div className="container">
        {/* <Breadcrumb
            separator=">"
            style={{ padding: "10px 0", fontSize: 16 }}
            items={a}
          /> */}
        {isLoading === true ? (
          <HomeSkeleton />
        ) : (
          <Row style={{ gap: 40, paddingTop: 20 }}>
            <Col lg={4} md={0} sm={0} xs={0} className="homepage-left">
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
                          <AiOutlineDown
                            style={{ color: "rgb(13, 92, 182)" }}
                          />
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
                <div
                  style={{ fontWeight: 600, fontSize: 16, marginBottom: 20 }}
                >
                  Đánh giá
                </div>
                <Form.Item
                  labelCol={{ span: 24 }}
                  style={{ cursor: "pointer" }}
                >
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
                      onClick={() => {
                        handleSelectPrice("a", [40000]);
                      }}
                      // className={activePrice.a === true ? "active" : ""}
                      type={activePrice.a === true ? "primary" : "default"}
                    >
                      Dưới 40.000
                    </Button>
                    <Button
                      onClick={() => {
                        handleSelectPrice("b", [40000, 120000]);
                      }}
                      // className={activePrice.b === true ? "active" : ""}
                      type={activePrice.b === true ? "primary" : "default"}
                    >
                      {" "}
                      40.000 - 120.000
                    </Button>
                    <Button
                      onClick={() => {
                        handleSelectPrice("c", [120000, 300000]);
                      }}
                      // className={activePrice.c === true ? "active" : ""}
                      type={activePrice.c === true ? "primary" : "default"}
                    >
                      {" "}
                      120.000 - 300.000
                    </Button>
                    <Button
                      onClick={() => {
                        handleSelectPrice("d", [300000]);
                      }}
                      // className={activePrice.d === true ? "active" : ""}
                      type={activePrice.d === true ? "primary" : "default"}
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
                        style={{ width: "60%" }}
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

            <Col lg={19} md={24} sm={24} xs={24} className="homepage-right">
              <div className="carousel-homepage">
                <div
                  style={{
                    padding: 20,
                    backgroundColor: "rgb(255 255 255)",
                    fontWeight: 600,
                    fontSize: 16,
                  }}
                  className="popular"
                >
                  Phổ biến
                </div>
                <div className="carousel">
                  <Carousel autoplay>
                    <div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                        className="carousel-1"
                      >
                        {dataBook &&
                          dataBook.length > 0 &&
                          dataBook.slice(0, 4).map((item, index) => {
                            return (
                              <div
                                className="wrapper"
                                key={`item-${item._id}`}
                                onClick={() => handleRedirectBook(item)}
                              >
                                <div className="thumbnail">
                                  <img
                                    src={`${
                                      import.meta.env.VITE_BACKEND_URL
                                    }/images/book/${item?.thumbnail}`}
                                    alt="thumbnail book"
                                  />
                                </div>

                                <div className="text">{item.mainText}</div>
                                <div
                                  className="price-carousel"
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
                              </div>
                            );
                          })}
                      </div>
                    </div>

                    <div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                        className="carousel-1"
                      >
                        {dataBook &&
                          dataBook.length > 0 &&
                          dataBook.slice(4, 8).map((item, index) => {
                            return (
                              <div
                                className="wrapper"
                                key={`item-${item._id}`}
                                onClick={() => handleRedirectBook(item)}
                              >
                                <div className="thumbnail">
                                  <img
                                    src={`${
                                      import.meta.env.VITE_BACKEND_URL
                                    }/images/book/${item?.thumbnail}`}
                                    alt="thumbnail book"
                                  />
                                </div>

                                <div className="text">{item.mainText}</div>
                                <div
                                  className="price-carousel"
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
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </Carousel>

                  <Divider />
                </div>

                <div className="tabs">
                  <Tabs defaultActiveKey="1" items={item} onChange={onChange} />
                  <div className="filter" onClick={() => setModalFilter(true)}>
                    <span style={{ marginRight: 10 }}>Bộ lọc</span>
                    <AiFillFilter />
                  </div>
                </div>
                {/* ---------Reponsive xs tabs -------- */}
                <div className="tab-reponsive">
                  <span>Phổ Biến</span>
                  <span>Hàng Mới</span>
                  <span>
                    <Dropdown
                      menu={{
                        items,
                      }}
                      trigger={["click"]}
                    >
                      <a onClick={(e) => e.preventDefault()}>
                        <Space style={{ color: "black" }}>Giá</Space>
                      </a>
                    </Dropdown>
                  </span>
                  <span onClick={() => setModalFilter(true)}>
                    {" "}
                    <AiFillFilter />
                  </span>
                </div>
              </div>

              <div className="home-list">
                {dataBook &&
                  dataBook.length > 0 &&
                  dataBook.map((item, index) => {
                    return (
                      <div
                        className="column"
                        key={`item-${index}`}
                        onClick={() => handleRedirectBook(item)}
                      >
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
                              <Rate value={5} disabled className="star" />

                              <span className="rate">5</span>
                              <AiFillStar className="responsive-star" />
                              <span
                                style={{ display: "inline-block" }}
                                className="sold"
                              >
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
        )}

        {/* =============responsive============ */}
        <Drawer
          title="Bộ lọc sản phẩm"
          placement="right"
          onClose={onClose}
          open={modalFilter}
          headerStyle={{
            backgroundColor: "rgb(27 168 255)",
          }}
          width={window.innerWidth > 1200 ? 800 : "auto"} ///responsive mobile
        >
          <Form
            className="homepage-left"
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
                    listCategory.slice(0, numberOfItems).map((item, index) => {
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

            <Form.Item>
              <div style={{ lineHeight: 3 }}>
                <span
                  style={{
                    fontWeight: 600,
                    fontSize: 16,
                    display: "block",
                  }}
                >
                  Đánh giá
                </span>
                <Row gutter={10}>
                  <Col span={8}>
                    <div
                      onClick={() => handleSelectStar("five")}
                      className={activeStar?.five ? "active " : "default"}
                    >
                      <AiFillStar
                        style={{ color: "#fadb14", marginRight: 5 }}
                      />
                      <span>5 sao</span>
                    </div>
                  </Col>

                  <Col span={8}>
                    <div
                      onClick={() => handleSelectStar("four")}
                      className={activeStar?.four ? "active" : "default"}
                    >
                      <AiFillStar
                        style={{ color: "#fadb14", marginRight: 5 }}
                      />
                      <span>4 sao</span>
                    </div>
                  </Col>

                  <Col span={8}>
                    <div
                      onClick={() => handleSelectStar("three")}
                      className={activeStar?.three ? "active" : "default"}
                    >
                      <AiFillStar
                        style={{ color: "#fadb14", marginRight: 5 }}
                      />
                      <span>3 sao</span>
                    </div>
                  </Col>
                </Row>
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
                <Row gutter={[10, 10]}>
                  <Col span={12}>
                    <div
                      onClick={() => {
                        handleSelectPrice("a", [40000]);
                      }}
                      className={activePrice.a === true ? "active" : "default"}
                    >
                      Dưới 40.000
                    </div>
                  </Col>
                  <Col span={12}>
                    <div
                      onClick={() => {
                        handleSelectPrice("b", [40000, 120000]);
                      }}
                      className={activePrice.b === true ? "active" : "default"}
                    >
                      {" "}
                      40.000 - 120.000
                    </div>
                  </Col>

                  <Col span={12}>
                    <div
                      onClick={() => {
                        handleSelectPrice("c", [120000, 300000]);
                      }}
                      className={activePrice.c === true ? "active" : "default"}
                    >
                      {" "}
                      120.000 - 300.000
                    </div>
                  </Col>
                  <Col span={12}>
                    <div
                      onClick={() => {
                        handleSelectPrice("d", [300000]);
                      }}
                      className={activePrice.d === true ? "active" : "default"}
                    >
                      {" "}
                      Trên 300.000
                    </div>
                  </Col>
                </Row>
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
                  style={{ width: "70%" }}
                  type="primary"
                >
                  Áp dụng
                </Button>

                <Button onClick={() => handleReset()} style={{ width: "30%" }}>
                  <GrPowerReset />
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Drawer>
      </div>
    </div>
  );
};

export default Home;
