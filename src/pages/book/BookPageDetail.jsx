import {
  Row,
  Col,
  Rate,
  Divider,
  Breadcrumb,
  notification,
  message,
} from "antd";
import "./book.scss";
import ImageGallery from "react-image-gallery";
import { useEffect, useRef, useState } from "react";
import ModalGallery from "./ModalImageGallery";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { BsCartPlus } from "react-icons/bs";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { callGetDetailBook } from "../../services/api";
import BookSkeleton from "./BookSkeleton";

import { doAddBookAction, saveInfoCartUser } from "../../redux/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import MessageCart from "../cart/MessageCart";
import ResponsiveBookDetail from "./responsiveBookDetail";
import NProgress from "nprogress";
import DOMPurify from "dompurify";

import dayjs from "dayjs";
import "dayjs/locale/vi";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
// timezone vietnam
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("vi");

const TimeConvert = (props) => {
  const { detailBook } = props;
  return (
    <p>
      {dayjs(detailBook?.ngayxuatban)
        .tz("Asia/Ho_Chi_Minh")
        .format("DD/MM/YYYY")}
    </p>
  );
};
const BookPageDetail = (props) => {
  const [isOpenModalGallery, setIsOpenModalGallery] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [detailBook, setDetailBook] = useState("");
  const [images, setImage] = useState([]);

  const refCount = useRef(1);
  const refCountResponsive = useRef(1);
  const refGallery = useRef(null);
  const refMessage = useRef();

  const location = useLocation();
  // const params = new URLSearchParams(location.search);
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
  const listCart = useSelector((state) => state.cart.listCart);
  const [isExpanded, setIsExpanded] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // let id = params.get("id");
  const params = useParams();
  const id = params.slug; // fix lại id = slug

  // window.onbeforeunload = function () {
  //   window.scrollTo(0, 0);
  // };

  const MAX_LENGTH = 600; // Độ dài tối đa của mô tả rút gọn
  const cleanDescription = DOMPurify.sanitize(detailBook?.description);
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    const getDetailBook = async () => {
      //NProgress.start();
      let res = await callGetDetailBook(id);

      if (res && res.data) {
        setDetailBook(res.data);
        customDataBook(res.data);
      }
      setIsLoading(false);
    };
    getDetailBook();

    window.scrollTo(0, 0);
  }, []);

  const a = [
    {
      title: <Link to="/">Trang chủ</Link>,
    },
    {
      title: (
        // <Link to={"/"} state={{ category: detailBook.category }}>
        //   {detailBook.category}
        // </Link>
        <Link to={`/?category=${detailBook.category}`}>
          {detailBook.category}
        </Link>
      ),
    },

    {
      title: `${detailBook.mainText}`,
    },
  ];
  const customDataBook = (detailBook) => {
    let arr = [];
    let obj = {
      original: `${import.meta.env.VITE_BACKEND_URL}/images/book/${
        detailBook?.thumbnail
      }`,
      thumbnail: `${import.meta.env.VITE_BACKEND_URL}/images/book/${
        detailBook?.thumbnail
      }`,
      originalClass: "original-image",
      thumbnailClass: "thumbnail-image",
    };
    arr.push(obj);

    detailBook.slider = JSON.parse(detailBook.slider);
    detailBook?.slider.map((item, i) => {
      obj = {
        original: `${import.meta.env.VITE_BACKEND_URL}/images/book/${item}`,
        thumbnail: `${import.meta.env.VITE_BACKEND_URL}/images/book/${item}`,
        originalClass: "original-image",
        thumbnailClass: "thumbnail-image",
      };
      arr.push(obj);
    });

    setImage(arr);
  };

  const handleOnClickImage = (e, index) => {
    setIsOpenModalGallery(true);
    setCurrentIndex(index);
  };
  const handleOnclickResponsive = () => {
    setCurrentIndex(refGallery?.current?.getCurrentIndex() ?? 0);
  };
  const onChange = (value) => {
    console.log("changed", value);
  };
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
  const handleChangeQuantity = (type, name) => {
    let count = 1;
    if ((name = "lg")) {
      count = refCount.current.value;
      if (type === "minus" && count > 1) {
        refCount.current.value -= 1;
      }
      if (type === "plus" && count < detailBook.quantity) {
        refCount.current.value = +count + 1;
      }
    }
    if ((name = "xs")) {
      count = refCountResponsive.current.value;
      if (type === "minus" && count > 1) {
        refCountResponsive.current.value -= 1;
      }
      if (type === "plus" && count < detailBook.quantity) {
        refCountResponsive.current.value = +count + 1;
      }
    }
  };

  const handleAddToCart = (name) => {
    if (isAuthenticated === false) {
      navigate("/login");
      return;
    }
    let quantity = 1;
    if (name === "lg") {
      quantity = refCount.current.value;
    } else {
      quantity = refCountResponsive.current.value;
    }

    const dataAddBook = {
      quantity: +quantity,
      id: id,
      detail: {
        slug: detailBook.slug,
        thumbnail: detailBook.thumbnail,
        mainText: detailBook.mainText,
        price: detailBook.price,
        total: detailBook.quantity,
      },
    };
    let check = false;
    listCart.map((item, index) => {
      if (item.id === id && item.quantity === detailBook.quantity) {
        check = true;
        return;
      }
    });
    if (check === true) message.error("Số lượng sản phẩm trong giỏ đã tối đa");
    else {
      dispatch(doAddBookAction(dataAddBook));
      refMessage.current.onModalMessage();
      dispatch(saveInfoCartUser());
    }
  };

  const handleBuyNow = (name) => {
    if (isAuthenticated === false) {
      navigate("/login");
      return;
    }
    let quantity = 1;
    if (name === "lg") {
      quantity = refCount.current.value;
    } else {
      quantity = refCountResponsive.current.value;
    }

    const dataAddBook = {
      quantity: +quantity,
      id: id,
      detail: {
        thumbnail: detailBook.thumbnail,
        mainText: detailBook.mainText,
        price: detailBook.price,
        total: detailBook.quantity,
      },
    };
    dispatch(doAddBookAction(dataAddBook));
    dispatch(saveInfoCartUser());
    navigate("/cart", { state: { id_book: id } });
  };
  const handleClickOutside = (e, name) => {
    if (name === "lg") {
      if (+e.target.value === 0) refCount.current.value = 1;
      if (e.target.value > detailBook.quantity)
        refCount.current.value = detailBook.quantity;
      if (e.target.value) {
        refCount.current.value = +refCount.current.value;
      }
    }
    if (name === "xs") {
      // convert empty && 0
      if (+e.target.value === 0) refCountResponsive.current.value = 1;
      if (e.target.value > detailBook.quantity)
        refCountResponsive.current.value = detailBook.quantity;
      if (e.target.value) {
        refCountResponsive.current.value = +refCountResponsive.current.value; //covert  089
      }
    }
  };
  if (isLoading === true) {
    return (
      <div className="container">
        <BookSkeleton />
      </div>
    );
  } else
    return (
      <div className="book-page">
        <div className="container">
          <div>
            <Breadcrumb
              separator=">"
              style={{ padding: "10px ", fontSize: 16 }}
              items={a}
            />
            <div className="view-detail-book">
              <div
                style={{
                  background: " rgb(255 255 255)",
                  borderRadius: 5,
                  padding: 20,
                }}
              >
                <Row gutter={[40, 20]}>
                  <Col lg={10} sm={24} xs={24} md={24} className="img-thumnail">
                    <ImageGallery
                      ref={refGallery}
                      items={images}
                      showPlayButton={false} //hide play button
                      showFullscreenButton={false} //hide fullscreen button
                      renderLeftNav={() => <></>} //left arrow === <> </>
                      renderRightNav={() => <></>} //right arrow === <> </>
                      slideOnThumbnailOver={true} //onHover => auto scroll images
                      onThumbnailClick={(e, index) =>
                        handleOnClickImage(e, index)
                      }
                    />
                  </Col>
                  <Col
                    lg={10}
                    sm={24}
                    xs={24}
                    md={24}
                    className="thumnail-responsive"
                  >
                    <ImageGallery
                      ref={refGallery}
                      items={images}
                      showPlayButton={false} //hide play button
                      showFullscreenButton={false} //hide fullscreen button
                      showThumbnails={false}
                      renderLeftNav={() => <></>} //left arrow === <> </>
                      renderRightNav={() => <></>} //right arrow === <> </>
                      slideOnThumbnailOver={true} //onHover => auto scroll images
                      onSlide={() => handleOnclickResponsive()}
                    />
                    <div className="page-total">
                      {currentIndex + 1}/{detailBook?.slider?.length + 1}
                    </div>
                  </Col>

                  <Col lg={14} sm={24} md={24} xs={24} className="!p-0">
                    <Col span={24}>
                      <div className="title-name">{detailBook.mainText}</div>
                      <div className="rating">
                        {/* <Rate
                          value={detailBook.rate}
                          disabled
                          style={{ color: "#ffce3d", fontSize: 12 }}
                        /> */}
                        {/* <span className="sold">Đã bán {detailBook.sold}</span> */}
                      </div>

                      <div className="price">
                        <span className="currency">
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(detailBook.price)}
                        </span>
                      </div>

                      <div className="author flex text-base my-2">
                        <p className="mr-2">Tác giả:</p>
                        <p>{detailBook.author}</p>
                      </div>
                      <div className="hinhthuc flex text-base my-2">
                        <p className="mr-2">Hình thức:</p>
                        <p> {detailBook.hinhthuc}</p>
                      </div>
                      <div className="nhaxuatban flex text-base my-2">
                        <p className="mr-2">Nhà xuất bản:</p>
                        <p> {detailBook.nhaxuatban}</p>
                      </div>
                      <div className="ngayxuatban flex text-base my-2">
                        <p className="mr-2">Ngày xuất bản:</p>
                        <TimeConvert detailBook={detailBook} />
                      </div>

                      <div className="quantity">
                        <span className="leftt text-base font-semibold">
                          Số lượng
                        </span>
                        <span className="rightt">
                          <button
                            onClick={() => handleChangeQuantity("minus", "lg")}
                          >
                            <MinusOutlined />
                          </button>
                          <input
                            ref={refCount}
                            defaultValue={1}
                            onKeyDown={(e) => {
                              if (!validKeyForPayment.includes(e.key)) {
                                e.preventDefault();
                              }
                            }}
                            onBlur={(e) => handleClickOutside(e, "lg")}
                          />
                          <button
                            onClick={() => handleChangeQuantity("plus", "lg")}
                          >
                            <PlusOutlined />
                          </button>
                        </span>
                      </div>
                      <div className="buy">
                        <button
                          disabled={detailBook.quantity > 0 ? false : true}
                          style={{
                            cursor:
                              detailBook.quantity > 0
                                ? "pointer"
                                : "not-allowed",
                          }}
                          className="cart"
                          onClick={() => handleAddToCart("lg")}
                        >
                          <BsCartPlus className="icon-cart" />
                          <span>Thêm vào giỏ hàng</span>
                        </button>
                        <button
                          disabled={detailBook.quantity > 0 ? false : true}
                          style={{
                            cursor:
                              detailBook.quantity > 0
                                ? "pointer"
                                : "not-allowed",
                          }}
                          className="now"
                          onClick={() => handleBuyNow("lg")}
                        >
                          Mua ngay
                        </button>
                      </div>
                    </Col>
                  </Col>
                </Row>
              </div>
            </div>
            {/* ===========responsive buy =========== */}

            <ResponsiveBookDetail
              handleChangeQuantity={handleChangeQuantity}
              refCountResponsive={refCountResponsive}
              handleClickOutside={handleClickOutside}
              handleAddToCart={handleAddToCart}
              handleBuyNow={handleBuyNow}
            />

            <div className="detail">
              {/* <div className="detail__title">CHI TIẾT SẢN PHẨM</div> */}
              <div className="detail__content">
              <div className="detail__title font-bold">CHI TIẾT SẢN PHẨM</div>
              <div className="border border-black-400 mb-5"></div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: isExpanded
                      ? cleanDescription
                      : cleanDescription.substring(0, MAX_LENGTH) +
                        (cleanDescription.length > MAX_LENGTH ? "..." : ""),
                  }}
                />
                {cleanDescription.length > MAX_LENGTH && (
                  <div
                    onClick={toggleExpanded}
                    className={isExpanded ? "mt-3" : "show-more-btn"}
                  >
                    <span className="block mx-auto w-fit px-20 py-2 rounded cursor-pointer border border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white">
                      {isExpanded ? "Thu gọn" : "Xem thêm"}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <Divider />
            <ModalGallery
              isOpen={isOpenModalGallery}
              setIsOpen={setIsOpenModalGallery}
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
              items={images}
              title={detailBook.mainText}
            />
          </div>

          <MessageCart ref={refMessage} />
        </div>
      </div>
    );
};

export default BookPageDetail;
