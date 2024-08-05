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
import {
  callFetchCategory,
  callGetListBookHome,
  callListBookPopularAll,
} from "../../services/api";
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

import { useDispatch, useSelector } from "react-redux";
import {
  doSetCurrentPageAction,
  doSetKeyTabHomeAction,
  doSetPriceAction,
  doSetQuerySortHomeAction,
  doSetRateReduxAction,
  doSetSearchPriceAction,
} from "../../redux/category/categorySlice";
import CarouselBanner from "../../components/carousel/carousel-banner/CarouselBanner";
import CarouselSanpham from "../../components/carousel/carousel-sanpham/CarouselSanpham";
import banner_quangcao from "../../images/banner_qc.jpg";
import DanhMuc from "../../components/danh muc/DanhMuc";

const Home = () => {
  const [form] = Form.useForm();
  const [total, setTotal] = useState(1);
  const [pageSize, setPageSize] = useState(16);
  const [dataBook, setDataBook] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [listCategory, setlistCategory] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [modalFilter, setModalFilter] = useState(false);

  const refCarousel = useRef("");
  const refCheckbox = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();

  const [listPopularAll, setListPopularAll] = useState([]);

  let numberOfItems = showMore ? listCategory.length : 5;
  // let filterCategory = location.state?.category;
  const [filterCategory, setFilterCategory] = useState();

  const dispatch = useDispatch();
  const params = new URLSearchParams(location.search);

  const keyTabHome = useSelector((state) => state.category?.keyTabHome);
  const rateRedux = useSelector((state) => state.category.rateRedux);
  const priceRedux = useSelector((state) => state.category.priceRedux);
  const querySort = useSelector((state) => state.category?.querySort);
  const searchPrice = useSelector((state) => state.category.searchPrice);
  const currentRedux = useSelector((state) => state.category.current);

  const [queryCategory, setQueryCategory] = useState([]);
  const [current, setCurrent] = useState(currentRedux);
  const [sort, setSort] = useState(querySort); // set lai de tu dong lay lai
  const [price, setPrice] = useState(priceRedux);
  const [rate, setRate] = useState(rateRedux);

  const [activeRes, setActiveRes] = useState({
    a1: keyTabHome === 1 ? true : false,
    a2: keyTabHome === 2 ? true : false,
    a3: keyTabHome === 3 ? true : false,
    a4: keyTabHome === 4 ? true : false,
  });
  const [activePrice, setactivePrice] = useState({
    a: price === "0,40000" ? true : false,
    b: price === "40000,120000" ? true : false,
    c: price === "120000,300000" ? true : false,
    d: price === "300000,99999999" ? true : false,
  });

  const [activeStar, setActiveStar] = useState({
    five: +rateRedux === 5 ? true : false,
    four: +rateRedux === 4 ? true : false,
    three: +rateRedux === 3 ? true : false,
  });

  // window.onbeforeunload = function () {
  //   window.scrollTo(0, 0);
  // };

  const getListBookPopularAll = async () => {
    let res = await callListBookPopularAll();
    if (res && res.data) {
      setListPopularAll(res.data);
    }
  };

  useEffect(() => {
    getListBookPopularAll();
  }, []);

  useEffect(() => {
    // set lại query từ url, ko lấy từ redux nữa
    if (params.get("category")) {
      setFilterCategory(params.get("category"));
    }
    if (params.get("page")) {
      setCurrent(params.get("page"));
    } else {
      setCurrent(1);
    }
    if (params.get("price")) {
      setPrice(params.get("price"));
    }
    setactivePrice({
      a: params.get("price") === "0,40000" ? true : false,
      b: params.get("price") === "40000,120000" ? true : false,
      c: params.get("price") === "120000,300000" ? true : false,
      d: params.get("price") === "300000,99999999" ? true : false,
    });
  }, [location]);

  useEffect(() => {
    getListBook();
    window.scrollTo(0, 0);

    // custom url link
    let url = "";
    let d = 0;

    if (+current > 1) {
      url += `page=${current}`;
      d = d + 1;
    }
    if (queryCategory[0]?.category) {
      const theloai = queryCategory[0].category;
      if (d > 0) url += "&";
      url += `category=${queryCategory[0].category}`;
      d = d + 1;
    }

    if (price) {
      if (d > 0) url += "&";
      url += `price=${price}`;
      d = d + 1;
    }
    if (url[0] === "&") url = url.substring(1); // xóa kí tự & ở đầu
    url = "?" + url; // thêm ? cho url

    navigate(`/${url}`);
  }, [current, queryCategory, sort, price, rate]);

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
        if (item.category === filterCategory) {
          if (index >= +numberOfItems) {
            setShowMore(true);
          }
          // lần đầu chạy skeleton chưa render được, deps là listcategory
          // chờ để hiển thị category more => để gán ref
          setTimeout(() => {
            refCheckbox.current[index].checked = true;
          }, 400);
          let c = queryCategory.findIndex((i) => i.category === filterCategory);
          if (c === -1) {
            setQueryCategory([item]);
          }
        }
      });
      setTimeout(() => {
        setIsLoading(false); // skeleton hien , doi load xong ref
      }, 300);
    }
  }, [listCategory]);

  const handleSortDepsCategory = (e, category) => {
    if (e.target.checked === true) {
      refCheckbox.current.map((item) => {
        if (item) item.checked = false;
      });

      e.target.checked = true; // chi cho select 1
      navigate("/", { state: { category: category.category } }); // reset/ assign state location
    } else navigate("/");
    let c = queryCategory.findIndex((item) => item.id === category.id);
    if (e.target.checked === true && c === -1) {
      setQueryCategory([category]);
    }
    if (e.target.checked === false) {
      let c = queryCategory.filter((item) => item.id != category.id);
      setQueryCategory(c);
    }
    setCurrent(1); // set lai current khi list thay doi
    dispatch(doSetCurrentPageAction(1));
  };

  const getListBook = async () => {
    let query = "";
    let arr = [];
    queryCategory.map((item) => {
      arr.push(item.id);
    });
    query = arr.join(","); // custom query category chỉ 1 thể loại

    dispatch(doSetPriceAction(price));
    dispatch(doSetRateReduxAction(rate));

    let res = await callGetListBookHome(
      current,
      pageSize,
      query,
      sort,
      price,
      rate
    );
    if (res && res.data) {
      setDataBook(res.data.result);
      setTotal(res.data.meta.total);
      if (res.data.meta.pages < currentRedux) {
        setCurrent(1);
        dispatch(doSetCurrentPageAction(1));
      }
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
        setPrice("");
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
        setPrice("");
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
        setPrice("");
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
        setPrice("");
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
      if (activeStar.five === true) {
        setRate(0);
      } else {
        setRate(5);
      }
    }
    if (name === "four") {
      setActiveStar({
        five: false,
        four: !activeStar.four,
        three: false,
      });
      if (activeStar.four === true) {
        setRate(0);
      } else {
        setRate(4);
      }
    }
    if (name === "three") {
      setActiveStar({
        five: false,
        four: false,
        three: !activeStar.three,
      });
      if (activeStar.three === true) {
        setRate(0);
      } else {
        setRate(3);
      }
    }
  };
  const onClose = () => {
    setModalFilter(false);
  };

  const onFinish = (values) => {
    setactivePrice({
      a: false,
      b: false,
      c: false,
      d: false,
    });

    let v = values.priceFrom;
    dispatch(doSetSearchPriceAction(v));
    setPrice(`${v},99999999`);
    onClose();
  };

  const onChangeTab = (key) => {
    if (+key === 1) {
      setActiveRes({
        a1: true,
        a2: false,
        a3: false,
      });
      setSort("&field=&sort=");
      dispatch(doSetKeyTabHomeAction(key));
      dispatch(doSetQuerySortHomeAction("&field=&sort="));
    }
    if (+key === 2) {
      setActiveRes({
        a1: false,
        a2: true,
        a3: false,
      });
      setSort("&field=createdAt&sort=DESC");
      dispatch(doSetKeyTabHomeAction(key));
      dispatch(doSetQuerySortHomeAction("&field=createdAt&sort=DESC"));
    }
    if (+key === 3) {
      setActiveRes({
        a1: false,
        a2: false,
        a3: true,
      });
      setSort("&field=price&sort=ASC");
      dispatch(doSetKeyTabHomeAction(key));
      dispatch(doSetQuerySortHomeAction("&field=price&sort=ASC"));
    }
    if (+key === 4) {
      setActiveRes({
        a1: false,
        a2: false,
        a3: false,
        a4: true,
      });
      setSort("&field=price&sort=DESC");
      dispatch(doSetKeyTabHomeAction(key));
      dispatch(doSetQuerySortHomeAction("&field=price&sort=DESC"));
    }
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
      label: (
        <p
          style={{ color: activeRes.a3 === true ? "blue" : "black" }}
          onClick={() => onChangeTab(3)}
        >
          Thấp đến cao
        </p>
      ),
      key: "3",
    },
    {
      label: (
        <p
          style={{ color: activeRes.a4 === true ? "blue" : "black" }}
          onClick={() => onChangeTab(4)}
        >
          Cao đến thấp
        </p>
      ),
      key: "4",
    },
  ];
  const handleChangePage = (p, s) => {
    // navigate("?page")
    setCurrent(p);
    dispatch(doSetCurrentPageAction(p));
  };
  const handleReset = () => {
    setQueryCategory([]);
    form.resetFields();
    setactivePrice({
      a: false,
      b: false,
      c: false,
      d: false,
    });
    setPrice("");
    setRate(0);
    setActiveStar({
      five: false,
      four: false,
      three: false,
    });
  };

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  const handleSearchPriceInput = () => {
    setactivePrice({
      a: false,
      b: false,
      c: false,
      d: false,
    });
    setPrice("");
  };
  const handleRedirectBook = (book) => {
    // const slug = convertSlug(book.mainText);
    navigate(`/book/${book.slug}`);
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
            <Col lg={6} md={0} sm={0} xs={0} className="homepage-left">
            
              <Form
                onFinish={onFinish}
                form={form}
                initialValues={{ priceFrom: searchPrice }}
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
                              key={`itemcategory-${index}`}
                            >
                              <input
                                id={index}
                                ref={(el) => (refCheckbox.current[index] = el)}
                                type="checkbox"
                                style={{ marginRight: 10 }}
                                onChange={(e) =>
                                  handleSortDepsCategory(e, item)
                                }
                              ></input>
                              <label htmlFor={index}>
                                <div>{item.category}</div>
                              </label>
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
                        handleSelectPrice("a", "0,40000");
                      }}
                      type={activePrice.a === true ? "primary" : "default"}
                    >
                      Dưới 40.000
                    </Button>
                    <Button
                      onClick={() => {
                        handleSelectPrice("b", "40000,120000");
                      }}
                      type={activePrice.b === true ? "primary" : "default"}
                    >
                      {" "}
                      40.000 - 120.000
                    </Button>
                    <Button
                      onClick={() => {
                        handleSelectPrice("c", "120000,300000");
                      }}
                      type={activePrice.c === true ? "primary" : "default"}
                    >
                      {" "}
                      120.000 - 300.000
                    </Button>
                    <Button
                      onClick={() => {
                        handleSelectPrice("d", "300000,99999999");
                      }}
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
                    <Form.Item name="priceFrom">
                      <InputNumber
                        className="input-number"
                        min={0}
                        placeholder="đ"
                        onChange={() => handleSearchPriceInput()}
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
                      Tìm kiếm
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

              {/* <DanhMuc /> */}
            </Col>

            <Col lg={17} md={24} sm={24} xs={24} className="homepage-right">
              <CarouselBanner />

              <div className="carousel-homepage">
                <CarouselSanpham listPopularAll={listPopularAll} />

                <div className="tabs">
                  <Tabs
                    defaultActiveKey={keyTabHome}
                    items={item}
                    onChange={onChangeTab}
                  />
                  <div className="filter" onClick={() => setModalFilter(true)}>
                    <span style={{ marginRight: 10 }}>Bộ lọc</span>
                    <AiFillFilter style={{ marginTop: 3 }} />
                  </div>
                </div>
                {/* ---------Reponsive xs tabs -------- */}
                <div className="tab-reponsive">
                  <span
                    className={activeRes.a1 === true ? "text-tab" : ""}
                    onClick={() => onChangeTab(1)}
                  >
                    Tất cả
                  </span>
                  <span
                    className={activeRes.a2 === true ? "text-tab" : ""}
                    onClick={() => onChangeTab(2)}
                  >
                    Hàng Mới
                  </span>
                  <span>
                    <Dropdown
                      menu={{
                        items,
                      }}
                      trigger={["click"]}
                    >
                      <a onClick={(e) => e.preventDefault()}>
                        <Space
                          style={{
                            color:
                              activeRes.a3 === true || activeRes.a4 === true
                                ? "blue"
                                : "black",
                          }}
                        >
                          Giá
                        </Space>
                      </a>
                    </Dropdown>
                  </span>
                  <span onClick={() => setModalFilter(true)}>
                    <AiFillFilter style={{ marginTop: 3 }} />
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
                        key={`itemlist-${index}`}
                        onClick={() => handleRedirectBook(item)}
                      >
                        <div className="wrapper">
                          <div className="thumbnail">
                            <img
                              loading="lazy"
                              src={`${
                                import.meta.env.VITE_BACKEND_URL
                              }/images/book/${item?.thumbnail}`}
                              alt="thumbnail book"
                            />
                          </div>

                          <div className="text-home hover:text-blue-600">
                            <div className="t-h">{item.mainText}</div>
                          </div>
                          <div className="author"> {item.author}</div>
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

                            {/* <div className="rating">
                              <Rate
                                value={item.rate}
                                disabled
                                className="star"
                              />

                              <span className="rate">{item.rate}</span>
                              <AiFillStar className="responsive-star" />
                              <span
                                style={{ display: "inline-block" }}
                                className="sold"
                              >
                                Đã bán {item.sold}
                              </span>
                            </div> */}
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
              <Divider />
              <Row style={{ display: "flex", justifyContent: "center" }}>
                <Pagination
                  showSizeChanger={false}
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
            setIsLoading={setIsLoading}
            handleSearchPriceInput={handleSearchPriceInput}
            setQueryCategory={setQueryCategory}
            queryCategory={queryCategory}
            setCurrent={setCurrent}
            setActiveStar={setActiveStar}
          />
        </div>
      </div>
    );
};

export default Home;
