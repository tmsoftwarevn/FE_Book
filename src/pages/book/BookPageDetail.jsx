import { Row, Col, Rate, Divider, Button, Breadcrumb } from "antd";
import "./book.scss";
import ImageGallery from "react-image-gallery";
import { useEffect, useRef, useState } from "react";
import ModalGallery from "./ModalImageGallery";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { BsCartPlus } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import { callGetDetailBook } from "../../services/api";
import BookSkeleton from "./BookSkeleton";

const BookPageDetail = (props) => {
  const [isOpenModalGallery, setIsOpenModalGallery] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [detailBook, setDetailBook] = useState("");
  const refGallery = useRef(null);

  const [images, setImage] = useState([]);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  let id = params.get("id");
  useEffect(() => {
    const getDetailBook = async () => {
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
  console.log("<<<<images", images);
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
      arr.push(obj);
    });

    setImage(arr);
  };

  const handleOnClickImage = () => {
    setIsOpenModalGallery(true);
    setCurrentIndex(refGallery?.current?.getCurrentIndex() ?? 0);
  };
  const handleOnclickResponsive = () => {
    //refGallery.current?.fullScreen();
  };
  const onChange = (value) => {
    console.log("changed", value);
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
              style={{ padding: "10px 0", fontSize: 16 }}
              items={a}
            />
            <div
              className="view-detail-book"
              style={
                {
                  //minHeight: "calc(100vh - 130px)",
                }
              }
            >
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
                      onClick={() => handleOnClickImage()}
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
                      onClick={() => handleOnclickResponsive()}
                    />
                  </Col>

                  <Col lg={14} sm={24} md={24} xs={24}>
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
                      <div className="author">
                        <u style={{ marginRight: 5 }}>Tác giả:</u>{" "}
                        <span>{detailBook.author}</span>
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
            {/* ===========responsive buy =========== */}
            <div className="responsive-cart">
              <div className="quantity-res">
                <div className="count">
                  <MinusOutlined />
                </div>
                <input defaultValue={1} />
                <div className="count">
                  <PlusOutlined />
                </div>
              </div>
              <div className="add-item-res">
                <div className="cart-res">
                  <BsCartPlus className="icon-cart-res" />
                  <p>Thêm vào giỏ hàng</p>
                </div>
              </div>
              <div className="now-res">
                <span>Mua ngay</span>
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
        </div>
      </div>
    );
};

export default BookPageDetail;
