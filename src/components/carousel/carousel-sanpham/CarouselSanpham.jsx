import { Divider } from "antd";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import Slider from "react-slick";
import { convertSlug } from "../../../utils/convertSlug";
import { useNavigate } from "react-router-dom";
import "./carouselsanpham.scss";
import Card from "../../card/Card";
import { BsBook } from "react-icons/bs";

let settings = {
  infinite: true,
  slidesToShow: 5,
  slidesToScroll: 1,
  autoplay: true, ///
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
    <div className="">
      <div className="text-xl px-2 mb-5 mt-10 text-blue-600 flex text-center w-fit mx-auto items-center uppercase font-semibold ">
        <BsBook className="mr-3 hidden sm:block " />
        Sách mới
      </div>
      <div className=" overflow-hidden">
        <Slider {...settings}>
          {listPopularAll &&
            listPopularAll.length > 0 &&
            listPopularAll.map((item, index) => {
              return (
                <div className="shadow-gray-400 bg-white shadow-md border border-transparent hover:-translate-y-2 duration-300">
                  <Card item={item} />
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
