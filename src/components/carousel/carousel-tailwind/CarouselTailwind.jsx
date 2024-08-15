// core version + navigation, pagination modules:
import Swiper from "swiper";
import { Navigation } from "swiper/modules";
// import Swiper and modules styles
import "swiper/css";
import "swiper/css/navigation";

import React, { useEffect } from "react";
import "./tail.scss";
import Blog from "../../../pages/blog/Blog";

const CarouselTailwind = (props) => {
  const { list } = props;

  useEffect(() => {
    const swiper = new Swiper(".multiple-slide-carousel", {
      modules: [Navigation],
      loop: true,
      slidesPerView: 3,
      spaceBetween: 20,
      navigation: {
        nextEl: ".multiple-slide-carousel .swiper-button-next",
        prevEl: ".multiple-slide-carousel .swiper-button-prev",
      },
      breakpoints: {
        992: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        640: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        0: {
          slidesPerView: 1,
          spaceBetween: 0,
        },
      },
    });
  }, []);

  return (
    <div class="w-full relative px-2">
      <div class="swiper multiple-slide-carousel swiper-container relative">
        <div class="swiper-wrapper mb-16">
          {list.map((item) => {
            return (
              <div class="swiper-slide">
                <div class="bg-indigo-50 rounded-2xl h-96 flex justify-center items-center">
                  <Blog detail={item} />
                </div>
              </div>
            );
          })}
        </div>
        <div class="absolute flex justify-center items-center m-auto left-0 right-0 w-fit bottom-12">
          <button
            id="slider-button-left"
            class="swiper-button-prev group !p-2 flex justify-center items-center border border-solid border-indigo-600 !w-12 !h-12 transition-all duration-500 rounded-full  hover:bg-indigo-600 !-translate-x-16"
            data-carousel-prev
          >
            <svg
              class="h-5 w-5 text-indigo-600 group-hover:text-white"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M10.0002 11.9999L6 7.99971L10.0025 3.99719"
                stroke="currentColor"
                stroke-width="1.6"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <button
            id="slider-button-right"
            class="swiper-button-next group !p-2 flex justify-center items-center border border-solid border-indigo-600 !w-12 !h-12 transition-all duration-500 rounded-full hover:bg-indigo-600 !translate-x-16"
            data-carousel-next
          >
            <svg
              class="h-5 w-5 text-indigo-600 group-hover:text-white"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M5.99984 4.00012L10 8.00029L5.99748 12.0028"
                stroke="currentColor"
                stroke-width="1.6"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarouselTailwind;
