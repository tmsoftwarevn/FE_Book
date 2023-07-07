import {
  Row,
  Col,
  Form,
  Divider,
  InputNumber,
  Button,
  Rate,
  Tabs,
  Pagination,
  Carousel,
  Dropdown,
  Space,
} from "antd";
import "./home.scss";
import { useEffect, useRef, useState } from "react";
import { callFetchCategory, callGetListBook } from "../../services/api";
import { AiFillFilter } from "react-icons/ai";
import { GrPowerReset } from "react-icons/gr";
import { AiOutlineDown } from "react-icons/ai";
import { AiOutlineUp } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import HomeSkeleton from "./homeSkeleton";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import ResponsiveHome from "./responsiveHome";
import { convertSlug } from "../../utils/convertSlug";

const Home = () => {
  const [form] = Form.useForm();
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [dataBook, setDataBook] = useState("");
  const [price, setPrice] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [listCategory, setlistCategory] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [modalFilter, setModalFilter] = useState(false);

  const refCarousel = useRef("");
  const refCheckbox = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchBook, setSearchBook] = useOutletContext();

  const numberOfItems = showMore ? listCategory.length : 5;
  let filterCategory = location.state?.category;
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

  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };
  useEffect(() => {
    getListBook();
    window.scrollTo(0, 0);
  }, [current, searchBook]);
  useEffect(() => {
    const getListCategory = async () => {
      let res = await callFetchCategory();
      if (res && res.data) {
        setlistCategory(res.data);
      }
    };
    getListCategory();
  }, []);

  useEffect(() => {
    if (listCategory) {
      listCategory.map((item, index) => {
        if (item === filterCategory) {
          if (index >= +numberOfItems) {
            setShowMore(true);
          }
          // lần đầu chạy skeleton chưa render được, deps là listcategory
          // chờ để hiển thị category more => để gán ref
          setTimeout(() => {
            refCheckbox.current[index].checked = true;
          }, 400);
          callApiSortDepsCategory(item);
        }
      });
      setTimeout(() => {
        setIsLoading(false); // skeleton hien , doi load xong ref
      }, 300);
    }
  }, [listCategory]);
  const callApiSortDepsCategory = (filterCategory) => {
    //add filtercate vao string api
    if (filterCategory) {
      console.log("goi api co category ", filterCategory);
    }
  };
  const handleSortDepsCategory = (e, category) => {
    // custom string api

    //co chon thi add vao string, ko co thi ko add string=> goi

    console.log("call api catrgory", category);
    callApiSortDepsCategory();
  };

  const getListBook = async () => {
    let res = await callGetListBook(current, pageSize);
    if (res && res.data) {
      setDataBook(res.data.result);
      setTotal(res.data.meta.total);
    }
  };
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

  const handleChangeFilter = (changedValues, values) => {
    //console.log(">>> check handleChangeFilter", changedValues, values);
  };

  const onFinish = (values) => {
    console.log("check value", values);
    console.log("price", price);
    console.log("star", activeStar);
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
    //reset search header
    setSearchBook("");
  };
  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  const handleRedirectBook = (book) => {
    const slug = convertSlug(book.mainText);
    navigate(`/book/${slug}?id=${book._id}`);
  };
  if (isLoading === true) {
    return (
      <div className="container">
        <HomeSkeleton />
      </div>
    );
  } else
    return (
      <div className="homepage">
        <div className="container">
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
                              {/* <Checkbox value={item}>{item}</Checkbox> 
                                ko su dung ref cho antd duoc */}
                              <input
                                ref={(el) => (refCheckbox.current[index] = el)}
                                type="checkbox"
                                style={{ marginRight: 10 }}
                                onChange={(e) =>
                                  handleSortDepsCategory(e, item)
                                }
                              ></input>
                              {item}
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
                      type={activePrice.a === true ? "primary" : "default"}
                    >
                      Dưới 40.000
                    </Button>
                    <Button
                      onClick={() => {
                        handleSelectPrice("b", [40000, 120000]);
                      }}
                      type={activePrice.b === true ? "primary" : "default"}
                    >
                      {" "}
                      40.000 - 120.000
                    </Button>
                    <Button
                      onClick={() => {
                        handleSelectPrice("c", [120000, 300000]);
                      }}
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
                  <Carousel ref={refCarousel} dots={true} autoplay>
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
                  <div
                    className="left-carousel"
                    onClick={() => refCarousel.current.prev()}
                  >
                    <AiOutlineLeft />
                  </div>
                  <div
                    className="right-carousel"
                    onClick={() => refCarousel.current.next()}
                  >
                    <AiOutlineRight />
                  </div>
                  <Divider style={{ borderColor: "grey" }} />
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
                  <span className="text-tab">Phổ Biến</span>
                  <span className="text-tab">Hàng Mới</span>
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

          {/* =============responsive============ */}

          <ResponsiveHome
            onClose={onClose}
            modalFilter={modalFilter}
            onFinish={onFinish}
            form={form}
            handleChangeFilter={handleChangeFilter}
            listCategory={listCategory}
            showMore={showMore}
            setShowMore={setShowMore}
            handleShowMore={handleShowMore}
            handleSelectStar={handleSelectStar}
            activeStar={activeStar}
            activePrice={activePrice}
            handleSelectPrice={handleSelectPrice}
            handleReset={handleReset}
            filterCategory={filterCategory}
            callApiSortDepsCategory={callApiSortDepsCategory}
            setIsLoading={setIsLoading}
          />
        </div>
      </div>
    );
};

export default Home;
