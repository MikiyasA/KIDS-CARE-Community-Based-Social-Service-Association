import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
// import "swiper/css/navigation";

export default function Our_Latest_News({ initialValues }) {
  // console.log(initialValues);

  return initialValues && initialValues[0] ? (
    <div className="our-latest-news-section our-latest-news-section-container">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="latest-news-slider">
              <Swiper
                data-aos="fade-up"
                data-aos-duration="1000"
                slidesPerView={1}
                spaceBetween={10}
                navigation={{
                  nextEl: ".latest-news-slider .swiper-button-next",
                  prevEl: ".latest-news-slider .swiper-button-prev",
                }}
                breakpoints={{
                  575: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                  },
                  991: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                  },
                }}
                modules={[Navigation]}
                className="mySwiper"
              >
                {initialValues &&
                  initialValues.map((data, index) => {
                    return (
                      <SwiperSlide key={index}>
                        <div className="latest-news-box">
                          <div className="latest-news-content">
                            <p>{data.label}</p>
                            <h3>{data.name}</h3>
                          </div>
                        </div>
                      </SwiperSlide>
                    );
                  })}
              </Swiper>

              <div
                className="slider-arrow"
                data-aos="fade-up"
                data-aos-duration="1000"
              >
                <div className="swiper-button-prev">
                  <i className="fa-solid fa-arrow-left"></i>
                </div>
                <div className="swiper-button-next">
                  <i className="fa-solid fa-arrow-right"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}
