import Slider from "react-slick";
import img3 from "../../../assets/3.png";

let settings = {
    dots: true,
  arrows: false,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const CarouselSlick = () => {
  let arr = [1, 2, 3, 4];

  return (
    <div className="width-slide-one-row relative">
      <Slider {...settings}>
        {arr.map((item, idx) => {
          return (
            <div key={`sor${idx}`}>
              <div>
                <img className="w-full" src={img3} />
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default CarouselSlick;
