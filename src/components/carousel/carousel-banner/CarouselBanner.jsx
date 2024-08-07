import { Carousel } from "antd";
import { useRef } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import img1 from "../../../assets/1.jpg";
import img2 from "../../../assets/2.jpg";
import img3 from "../../../assets/3.png";
import "./carouselBanner.scss";

const CarouselBanner = () => {
  const refCarousel = useRef("");
  return (
    <div className="carousel-banner">
     
      <div className="carousel">
        <Carousel ref={refCarousel} draggable={true} dots={false} autoplay>
          <div>
            <div className="carousel__img">
              <img className="w-full" src={img1} />
            </div>
          </div>
          <div>
            <div>
              <img className="w-full" src={img2} />
            </div>
          </div>
          <div>
            <div>
              <img className="w-full" src={img3} />
            </div>
          </div>
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
