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
  callGet_ParentCategory_Home,
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
import TheLoaiNoiBat from "../../components/theloai noibat/TheLoaiNoiBat";

const Home = () => {
  const [form] = Form.useForm();
  const [total, setTotal] = useState(1);
  const [pageSize, setPageSize] = useState(16);
  const [dataBook, setDataBook] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [listCategory, setlistCategory] = useState([]);
  const [nameCategory, setNameCategory] = useState([]);

  const [showMore, setShowMore] = useState(false);
  const [modalFilter, setModalFilter] = useState(false);

  const refCarousel = useRef("");
  const refCheckbox = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();

  const [listPopularAll, setListPopularAll] = useState([]);

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
  const [arrId, setArrId] = useState([]);

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
  }, [location]);

  useEffect(() => {
    const getListCategory = async () => {
      let res = await callGet_ParentCategory_Home();
      if (res && res.data) {
        setlistCategory(res.data);
        getAllChildrenIds(res.data);
        // setArrId(arr)
      }
    };
    getListCategory();
  }, []);

  function getAllChildrenIds(categories) {
    let ids = [];
    let arrId = [];
    let name = [];
    //lặp kiếm tất cả con của cha
    function traverse(node) {
      if (node.children && node.children.length > 0) {
        node.children.forEach((child) => {
          ids.push(child.id);
          traverse(child);
        });
      }
    }
    // set điều kiện hiển thị home
    categories.forEach((category) => {
      // điều kiện id cate cha = 9
      if (category.id === 7 || category.id === 9) {
        traverse(category);
        name.push(category.category);
        setNameCategory(name);
        arrId.push(ids);
        ids = [];
      }
    });
    //return ids;

    setArrId(arrId);
  }

  console.log("iddd: ", arrId);
  console.log("list name", nameCategory);

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

  const onClose = () => {
    setModalFilter(false);
  };

  const handleChangePage = (p, s) => {
    // navigate("?page")
    setCurrent(p);
    dispatch(doSetCurrentPageAction(p));
  };

  const handleRedirectBook = (book) => {
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
          <Row style={{ gap: 40, paddingTop: 20 }} className="my-5">
            <Col lg={6} md={0} sm={0} xs={0} className="bg-white px-7 py-5">
              <Form form={form}>
                <div className="text-2xl font-semibold">Danh mục sản phẩm</div>
                <Form.Item name="category" labelCol={{ span: 24 }}>
                  <Row>
                    {listCategory?.length > 0 &&
                      listCategory.map((item, index) => {
                        return (
                          <Col
                            span={24}
                            className="flex items-center mt-5"
                            key={`itemcategory-${index}`}
                          >
                            <input
                              id={index}
                              ref={(el) => (refCheckbox.current[index] = el)}
                              type="checkbox"
                              style={{ marginRight: 10 }}
                              onChange={(e) => handleSortDepsCategory(e, item)}
                            ></input>
                            <label htmlFor={index}>
                              <div>{item.category}</div>
                            </label>
                          </Col>
                        );
                      })}
                  </Row>
                </Form.Item>
              </Form>
            </Col>

            <Col lg={17} md={24} sm={24} xs={24} className="homepage-right">
              <CarouselBanner />
            </Col>
          </Row>

          <div className="carousel-homepage">
            <CarouselSanpham listPopularAll={listPopularAll} />
          </div>

          {arrId &&
            arrId.map((item, idx) => {
              return (
                <>
                  <TheLoaiNoiBat
                    arrId={item}
                    nameCategory={nameCategory[idx]}
                  />
                </>
              );
            })}

          {/* <TheLoaiNoiBat arrId={arrId} nameCategory={nameCategory} /> */}

          {/* =============responsive============ */}

          {/* <ResponsiveHome
            onClose={onClose}
            modalFilter={modalFilter}
            onFinish={onFinish}
            form={form}
            listCategory={listCategory}
            showMore={showMore}
            setShowMore={setShowMore}
            handleShowMore={handleShowMore}
            
            handleReset={handleReset}
            filterCategory={filterCategory}
            setIsLoading={setIsLoading}
            handleSearchPriceInput={handleSearchPriceInput}
            setQueryCategory={setQueryCategory}
            queryCategory={queryCategory}
            setCurrent={setCurrent}
            setActiveStar={setActiveStar}
          /> */}
        </div>
      </div>
    );
};

export default Home;
