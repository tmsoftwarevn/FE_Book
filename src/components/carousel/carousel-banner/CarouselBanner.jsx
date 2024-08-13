import { Carousel } from "antd";
import { useRef } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

import "./carouselBanner.scss";

const CarouselBanner = (props) => {
  const { listBanner } = props;
  const refCarousel = useRef("");
  return (
    <div className="carousel-banner">
      <div className="carousel">
        <Carousel ref={refCarousel} draggable={true} dots={false} autoplay infinite>
          {listBanner &&
            listBanner.map((item, idx) => {
              return (
                <>
                  <div>
                    <div className="carousel__img">
                      <img
                        className="w-full"
                        src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${
                          item.banner
                        }`}
                      />
                    </div>
                  </div>
                </>
              );
            })}
        </Carousel>

        {/* <div
          className="left-carousel"
          onClick={() => refCarousel.current.prev()}
        >
          <AiOutlineLeft />
        </div>
        <div
          className="right-carousel"
          onClick={() => refCarousel.current.next()}
        >
          <AiOutlineRight />
        </div> */}
      </div>
    </div>
  );
};

export default CarouselBanner;
