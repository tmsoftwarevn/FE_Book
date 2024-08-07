import { Row, Col, Form } from "antd";
import "./home.scss";
import { useEffect, useRef, useState } from "react";
import {
  callGet_ParentCategory_Home,
  callListBookPopularAll,
} from "../../services/api";

import { useLocation, useNavigate } from "react-router-dom";
import HomeSkeleton from "./homeSkeleton";

import { useDispatch, useSelector } from "react-redux";
import { doSetCurrentPageAction } from "../../redux/category/categorySlice";
import CarouselBanner from "../../components/carousel/carousel-banner/CarouselBanner";
import CarouselSanpham from "../../components/carousel/carousel-sanpham/CarouselSanpham";
import banner_quangcao from "../../images/banner_qc.jpg";
import DanhMuc from "../../components/danh muc/DanhMuc";
import TheLoaiNoiBat from "../../components/theloai noibat/TheLoaiNoiBat";
import { convertSlug } from "../../utils/convertSlug";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

const Home = () => {
  const [form] = Form.useForm();

  const [isLoading, setIsLoading] = useState(true);
  const [listCategory, setlistCategory] = useState([]);
  const [nameCategory, setNameCategory] = useState([]);

  const refCheckbox = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();

  const [listPopularAll, setListPopularAll] = useState([]);

  const [filterCategory, setFilterCategory] = useState();

  const dispatch = useDispatch();
  const params = new URLSearchParams(location.search);

  const [queryCategory, setQueryCategory] = useState([]);

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
    const getListCategory = async () => {
      let res = await callGet_ParentCategory_Home();
      if (res && res.data) {
        setIsLoading(false);
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
    let test=[7,9]
    categories.forEach((category) => {
      // điều kiện id cate cha = 9 , 7

      // nhớ add thêm id cha vào, [7,4]
      test.map((item) =>{
        if (category.id === item ) {
          traverse(category);
          name.push(category.category);
          setNameCategory(name);
          // thêm id cha
          ids.push(category.id);
          arrId.push(ids);
          ids = [];
        }
      })

      // if (category.id === 7 || category.id === 9) {
      //   traverse(category);
      //   name.push(category.category);
      //   setNameCategory(name);
      //   // thêm id cha

      //   arrId.push(ids);
      //   ids = [];
      // }
    });
    //return ids;

    setArrId(arrId);
  }

  console.log("arrridddd 11111111", arrId);

  const handleSelectCategory = (item) => {
    navigate(`/the-loai/${item.slug}`);
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
          <Row style={{ gap: 0 }} className="my-5">
            <Col
              lg={5}
              md={0}
              sm={0}
              xs={0}
              className="bg-blue-600 text-white shadow-gray-400 shadow-lg"
            >
              <div className="text-xl text-center font-semibold p-3 uppercase border-b border-gray">
                Danh mục sản phẩm
              </div>
              <Row>
                {listCategory?.length > 0 &&
                  listCategory.map((item, index) => {
                    return (
                      <Col
                        span={24}
                        className="flex font-semibold items-center hover:pl-5 hover:bg-blue-900 cursor-pointer px-2 py-2 border-b border-gray"
                        key={`itemcategory-${index}`}
                      >
                        <MdKeyboardDoubleArrowRight />
                        <div onClick={() => handleSelectCategory(item)}>
                          {item.category}
                        </div>
                      </Col>
                    );
                  })}
              </Row>
            </Col>

            <Col lg={19} md={24} sm={24} xs={24}>
              <CarouselBanner />
            </Col>
          </Row>

          <div>
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
        </div>
      </div>
    );
};

export default Home;
