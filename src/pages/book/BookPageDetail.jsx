import { Row, Col, Rate, Divider, Button, Breadcrumb } from "antd";
import "./book.scss";
import ImageGallery from "react-image-gallery";
import { useEffect, useRef, useState } from "react";
import ModalGallery from "./ModalImageGallery";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { BsCartPlus } from "react-icons/bs";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { callGetDetailBook } from "../../services/api";
import BookSkeleton from "./BookSkeleton";

const BookPageDetail = (props) => {
  const [isOpenModalGallery, setIsOpenModalGallery] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [detailBook, setDetailBook] = useState("");
  const refGallery = useRef(null);

  const [images, setImage] = useState([]);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  let id = params.get("id");

  useEffect(() => {
    setIsLoading(true);
    const getDetailBook = async () => {
      let res = await callGetDetailBook(id);
      if (res && res.data) {
        setDetailBook(res.data);
        customDataBook(res.data);
      }
      setIsLoading(false);
    };
    setTimeout(() => {
      getDetailBook();
    }, 5000);
    window.scrollTo(0, 0);
  }, []);
  const a = [
    {
      title: <Link to="/">Trang chủ</Link>,
    },
    {
      title: <Link to="/">{detailBook.category}</Link>,
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
    detailBook?.slider.map((item) => {
      obj = {
        original: `${import.meta.env.VITE_BACKEND_URL}/images/book/${item}`,
        thumbnail: `${import.meta.env.VITE_BACKEND_URL}/images/book/${item}`,
        originalClass: "original-image",
        thumbnailClass: "thumbnail-image",
      };
    });
    arr.push(obj);
    setImage(arr);
  };

  const handleOnClickImage = () => {
    setIsOpenModalGallery(true);
    setCurrentIndex(refGallery?.current?.getCurrentIndex() ?? 0);
  };

  const onChange = (value) => {
    console.log("changed", value);
  };

  return (
    <div className="book-page">
      <div className="container">
        {isLoading === true ? (
          <BookSkeleton />
        ) : (
          <div>
            <Breadcrumb
              separator=">"
              style={{ padding: "10px 0", fontSize: 16 }}
              items={a}
            />
            <div
              className="view-detail-book"
              style={{
                minHeight: "calc(100vh - 130px)",
              }}
            >
              <div
                style={{
                  background: " rgb(255 255 255)",
                  borderRadius: 5,
                  padding: 20,
                }}
              >
                <Row gutter={[40, 20]}>
                  <Col md={10} sm={0} xs={0}>
                    <ImageGallery
                      ref={refGallery}
                      items={images}
                      showPlayButton={false} //hide play button
                      showFullscreenButton={false} //hide fullscreen button
                      renderLeftNav={() => <></>} //left arrow === <> </>
                      renderRightNav={() => <></>} //right arrow === <> </>
                      slideOnThumbnailOver={true} //onHover => auto scroll images
                      onClick={() => handleOnClickImage()}
                    />
                  </Col>
                  <Col md={14} sm={24}>
                    <Col span={24}>
                      <div className="title">{detailBook.mainText}</div>
                      <div className="rating">
                        <Rate
                          value={5}
                          disabled
                          style={{ color: "#ffce3d", fontSize: 12 }}
                        />
                        <span className="sold">
                          <Divider type="vertical" />
                          Đã bán {detailBook.sold}
                        </span>
                      </div>
                      <div className="price">
                        <span className="currency">
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(detailBook.price)}
                        </span>
                      </div>
                      <div className="delivery">
                        <div>
                          <span className="leftt">Vận chuyển</span>
                          <span className="rightt">Miễn phí vận chuyển</span>
                        </div>
                      </div>
                      <div className="quantity">
                        <span className="leftt">Số lượng</span>
                        <span className="rightt">
                          <button>
                            <MinusOutlined />
                          </button>
                          <input defaultValue={1} />
                          <button>
                            <PlusOutlined />
                          </button>
                        </span>
                      </div>
                      <div className="buy">
                        <button className="cart">
                          <BsCartPlus className="icon-cart" />
                          <span>Thêm vào giỏ hàng</span>
                        </button>
                        <button className="now">Mua ngay</button>
                      </div>
                    </Col>
                  </Col>
                </Row>
              </div>
            </div>
            <div className="detail">
              <div className="description">CHI TIẾT SẢN PHẨM</div>
              <div className="content" style={{ fontSize: 18 }}>
                Đang cập nhật...
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
        )}
      </div>
    </div>
  );
};

export default BookPageDetail;
