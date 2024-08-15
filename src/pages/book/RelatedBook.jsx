import { useEffect, useState } from "react";
import { call_related_book } from "../../services/api";
import CarouselSanpham from "../../components/carousel/carousel-sanpham/CarouselSanpham";

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

const RelatedBook = (props) => {
  const { arrId } = props;  // arrId con, hiện tại lấy 1 id
  const [list, setList] = useState([]);

  const get_list_related = async () => {
    let res = await call_related_book(arrId);
    if (res && res.EC === 1) {
      setList(res.data);
    }
  };
  useEffect(() => {
    get_list_related();
  }, []);

  return (
    <>
     
      <CarouselSanpham name={'sản phẩm liên quan'}  listPopularAll={list} />
    </>
  );
};

export default RelatedBook;
