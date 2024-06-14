import { Divider } from "antd";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import Slider from "react-slick";
import { convertSlug } from "../../../utils/convertSlug";
import { useNavigate } from "react-router-dom";
import "./carouselsanpham.scss";

let settings = {
  //   dots: true,
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,   ///
  speed: 4000,
  autoplaySpeed: 0,
  cssEase: "linear",
  pauseOnHover: true,

  responsive: [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 2,
      },
    },
  ],
};
const CarouselSanpham = (props) => {
  const { listPopularAll } = props;
 
  const navigate = useNavigate();

  const handleRedirectBook = (book) => {
    // const slug = convertSlug(book.mainText);
    navigate(`/book/${book.slug}`);
  };
  return (
    <div>
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
      <div className="carousel-sanpham">
        <Slider {...settings}>
          {listPopularAll &&
            listPopularAll.length > 0 &&
            listPopularAll.map((item, index) => {
              return (
                <div
                  className="wrapper"
                  key={`itemcarosel-${index}`}
                  onClick={() => handleRedirectBook(item)}
                >
                  <div className="thumbnail">
                    <img
                      src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${
                        item?.thumbnail
                      }`}
                      alt="thumbnail book"
                    />
                  </div>

                  <div className="text-cr">{item.mainText}</div>
                  <div
                    className="price-sold"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
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
                    {/* <div
                      className="sold-carousel"
                      style={{
                        marginRight: 20,
                        color: "#535c68",
                      }}
                    >
                      Đã bán ({item.sold})
                    </div> */}
                  </div>
                </div>
              );
            })}
        </Slider>
      </div>
      <Divider />
    </div>
  );
};

export default CarouselSanpham;
