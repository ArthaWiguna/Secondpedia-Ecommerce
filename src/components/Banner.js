import React from "react";
import banner from "../assets/img/banner-image.png";
import bannerMobile from "../assets/img/banner-mobile.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay } from "swiper";

const Banner = () => {
  return (
    <div>
      <div className="w-full mt-32 hidden md:block">
        <Swiper
          slidesPerView={1}
          centeredSlides={true}
          loop={true}
          spaceBetween={12}
          breakpoints={{
            640: {
              slidesPerView: 1.8,
              centeredSlides: true,
              loop: true,
              spaceBetween: 12,
            },
          }}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 3200,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          className="mySwiper"
        >
          <SwiperSlide>
            <img src={banner} alt="banner" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={banner} alt="banner" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={banner} alt="banner" />
          </SwiperSlide>
        </Swiper>
      </div>
      {/* mobile */}
      <div className="w-full block md:hidden -mt-[88px] absolute md:static -z-10">
        <Swiper
          slidesPerView={1}
          centeredSlides={true}
          loop={true}
          spaceBetween={16}
          breakpoints={{
            640: {
              slidesPerView: 1.6,
              centeredSlides: true,
              loop: true,
              spaceBetween: 16,
            },
          }}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          className="mySwiper "
        >
          <SwiperSlide>
            <img src={bannerMobile} alt="bannerMobile" className="w-full" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={bannerMobile} alt="bannerMobile" className="w-full" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={bannerMobile} alt="bannerMobile" className="w-full" />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Banner;
