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
  Flex,
} from "antd";
import "./theloai.scss";

import { useEffect, useRef, useState } from "react";
import {
  callGet_listbook_arrid_paginate,
  callGet_ParentCategory_Home,
} from "../../services/api";

import {
  useLocation,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import HomeSkeleton from "./homeSkeleton";

import { useDispatch, useSelector } from "react-redux";
import { doSetSearchPriceAction } from "../../redux/category/categorySlice";

import BreadcrumbCustom from "../../components/breadcrum/BreadCrumCustom";
import {
  getCategory_ChildrenById,
  getCategoryById,
} from "../../utils/function";

import Card from "../../components/card/Card";
import SelectCustom from "../../components/select/SelectCustom";
import { SiGitbook } from "react-icons/si";
import { FaFilter } from "react-icons/fa";
import DrawDanhmuc from "./drawDanhmuc";

const TheLoai = () => {
  const [form] = Form.useForm();
  const [total, setTotal] = useState(1);
  const [pageSize, setPageSize] = useState(16); //16
  const [dataBook, setDataBook] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [listCategory, setlistCategory] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const params = new URLSearchParams(location.search);

  const querySort = useSelector((state) => state.category?.querySort);
  const searchPrice = useSelector((state) => state.category.searchPrice);
  const [current, setCurrent] = useState(
    params.get("page") ? params.get("page") : 1
  );

  const [price, setPrice] = useState(params.get("p") ? params.get("p") : "");

  const [sortPrice, setSortPrice] = useState(
    params.get("sp") ? params.get("sp") : ""
  );
  const [sortDay, setSortDay] = useState(
    params.get("sd") ? params.get("sd") : ""
  );
  const [openDraw, setOpenDraw] = useState(false);

  const [activePrice, setactivePrice] = useState({
    a: price === "0,80000" ? true : false,
    b: price === "80000,200000" ? true : false,
    c: price === "200000,400000" ? true : false,
    d: price === "400000,99999999" ? true : false,
  });

  const [arrId, setArrId] = useState([]);
  const slugPrams = useParams();
  const [nameCategory, setNameCategory] = useState("");
  const [listBread, setListBread] = useState([]); // set cho arrId

  useEffect(() => {
    const getListCategory = async () => {
      let res = await callGet_ParentCategory_Home();
      if (res && res.data) {
        setIsLoading(false);
        // get namecate bread
        const { arrCate } = getCategoryById(res.data, slugPrams.slug);
        setListBread(arrCate);
        getAllChildrenIds(res.data);
      }
    };
    getListCategory();
    // click reset price , off draw
    setOpenDraw(false);
    setPrice("");
  }, [slugPrams.slug]);

  function getAllChildrenIds(categories) {
    let ids = [];

    //lặp kiếm tất cả con của cha
    function traverse(node) {
      // nếu slug == param url
      if (node.slug === slugPrams.slug) {
        setlistCategory(node); // để lặp .children
        setNameCategory(node);
        //get children id category
        const { arrId } = getCategory_ChildrenById(node, node.id);
        setArrId(arrId);
      }

      node.children &&
        node.children.forEach((child) => {
          traverse(child);
        });
    }
    // set điều kiện hiển thị home
    categories.forEach((category) => {
      // điều kiện id cate cha = 9
      traverse(category);
    });
  }

  console.log("priceee", price);
  useEffect(() => {
    if (params.get("page")) {
      setCurrent(params.get("page"));
    } else {
      setCurrent(1);
    }

    setactivePrice({
      a: params.get("p") === "0,80000" ? true : false,
      b: params.get("p") === "80000,200000" ? true : false,
      c: params.get("p") === "200000,400000" ? true : false,
      d: params.get("p") === "400000,99999999" ? true : false,
    });
  }, [location]);

  // window.onbeforeunload = function () {
  //   window.scrollTo(0, 0);
  // };

  useEffect(() => {
    fetch_listbook_arrid_paginate();
  }, [current, price, arrId, sortDay, sortPrice]);

  const fetch_listbook_arrid_paginate = async () => {
    let res = await callGet_listbook_arrid_paginate(
      current,
      pageSize,
      price,
      sortPrice,
      sortDay,
      arrId
    );
    if (res && res.data) {
      // console.log("ressss", res);

      setIsLoading(false);
      setDataBook(res.list);
      setTotal(res.data.total);
    }
  };

  const handleSelectPrice = (name, price) => {
    setOpenDraw(false);

    if (name === "a") {
      setactivePrice({
        a: !activePrice.a,
        b: false,
        c: false,
        d: false,
      });
      if (activePrice.a === true) {
        setPrice("");
        navigate(`${location.pathname}?page=${1}`);
      } else {
        setPrice(price);
        navigate(`${location.pathname}?page=${1}&p=${price}`);
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
        navigate(`${location.pathname}?page=${1}`);
      } else {
        setPrice(price);
        navigate(`${location.pathname}?page=${1}&p=${price}`);
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
        navigate(`${location.pathname}?page=${1}`);
      } else {
        setPrice(price);
        navigate(`${location.pathname}?page=${1}&p=${price}`);
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
        navigate(`${location.pathname}?page=${1}`);
      } else {
        setPrice(price);
        navigate(`${location.pathname}?page=${1}&p=${price}`);
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

  const handleChangePage = (p, s) => {
    if (price) navigate(`${location.pathname}?page=${p}&p=${price}`);
    else {
      navigate(`${location.pathname}?page=${p}`);
    }
    //navigate(`?page=${p}`);
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
  };

  const handleSelectCategory = (item) => {
    setOpenDraw(false);
    navigate(`/the-loai/${item.slug}`);
  };

  console.log("sss price", sortPrice);
  console.log("sss day", sortDay);

  if (isLoading === true) {
    return (
      <div className="container">
        <HomeSkeleton />
      </div>
    );
  } else
    return (
      <div className="theloai">
        <div className="container">
          <DrawDanhmuc
            listCategory={listCategory}
            openDraw={openDraw}
            setOpenDraw={setOpenDraw}
            handleSelectCategory={handleSelectCategory}
            listBread={listBread}
            handleSelectPrice={handleSelectPrice}
            activePrice={activePrice}
          />

          <div className="hidden sm:block">
            <BreadcrumbCustom listBread={listBread} />
          </div>

          <Row style={{ gap: 0 }}>
            <Col lg={6} md={6} sm={0} xs={0} className="px-3">
              <div className=" shadow-gray-400 shadow-lg pb-5">
                <div className="bg-blue-600 text-white">
                  <div className="text-xl text-center font-semibold p-3 uppercase border-b border-gray">
                    Danh mục sản phẩm
                    {/* {nameCategory.category} */}
                  </div>

                  <Row>
                    {listCategory.children ? (
                      listCategory?.children &&
                      listCategory.children.map((item, index) => {
                        return (
                          <Col
                            span={24}
                            className="flex font-semibold items-center hover:pl-5 hover:bg-blue-900 cursor-pointer px-2 py-2 border-b border-gray"
                            key={`itemcategory-${index}`}
                            onClick={() => handleSelectCategory(item)}
                          >
                            <SiGitbook className="mr-2" />
                            <div>{item.category}</div>
                          </Col>
                        );
                      })
                    ) : (
                      <Col
                        span={24}
                        className="flex font-semibold items-center hover:pl-5 hover:bg-blue-900 cursor-pointer px-2 py-2 border-b border-gray"
                      >
                        {/* <MdKeyboardDoubleArrowRight /> */}
                        <SiGitbook className="mr-2" />
                        <div onClick={() => handleSelectCategory(listCategory)}>
                          {listCategory.category}
                        </div>
                      </Col>
                    )}
                  </Row>
                </div>

                <Form
                  onFinish={onFinish}
                  form={form}
                  initialValues={{ priceFrom: searchPrice }}
                  className="px-5"
                >
                  <Divider />

                  <p className="text-xl font-semibold mb-4">Giá</p>
                  <Form.Item>
                    <div className="grid gap-4">
                      <Button
                        onClick={() => {
                          handleSelectPrice("a", "0,80000");
                        }}
                        type={activePrice.a === true ? "primary" : "default"}
                      >
                        Dưới 80.000
                      </Button>
                      <Button
                        onClick={() => {
                          handleSelectPrice("b", "80000,200000");
                        }}
                        type={activePrice.b === true ? "primary" : "default"}
                      >
                        {" "}
                        80.000 - 200.000
                      </Button>
                      <Button
                        onClick={() => {
                          handleSelectPrice("c", "200000,400000");
                        }}
                        type={activePrice.c === true ? "primary" : "default"}
                      >
                        {" "}
                        200.000 - 400.000
                      </Button>
                      <Button
                        onClick={() => {
                          handleSelectPrice("d", "400000,99999999");
                        }}
                        type={activePrice.d === true ? "primary" : "default"}
                      >
                        {" "}
                        Trên 400.000
                      </Button>
                    </div>
                  </Form.Item>

                  {/* <div
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
                      className="hidden"
                    >
                      Tìm kiếm
                    </Button>

                    <Button
                      onClick={() => handleReset()}
                      style={{ width: "fit-content" }}
                      className="mx-auto"
                    >
                      <GrPowerReset />
                    </Button>
                  </div> */}
                </Form>
              </div>
            </Col>

            <Col lg={18} md={18} sm={24} xs={24} className="bg-white px-3">
              <div className="mb-5 md:flex md:justify-between block">
                <div className="font-semibold text-xl text-center uppercase my-4">
                  {nameCategory.category}
                </div>
                <div className="flex justify-between gap-4 text-md items-center">
                  <div className="flex items-center gap-4">
                    <div className="font-semibold hidden sm:block">
                      Sắp xếp:
                    </div>
                    <SelectCustom
                      setSortDay={setSortDay}
                      setSortPrice={setSortPrice}
                    />
                  </div>

                  <div
                    className="md:hidden text-blue-600 text-xl"
                    onClick={() => setOpenDraw(true)}
                  >
                    <FaFilter />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {dataBook &&
                  dataBook.length > 0 &&
                  dataBook.map((item, index) => {
                    return (
                      <div
                        key={`itemlist-${index}`}
                        className="col-span-1 bg-white shadow-gray-400 shadow-sm hover:-translate-y-2 duration-300"
                      >
                        <Card item={item} />
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
        </div>
      </div>
    );
};

export default TheLoai;
