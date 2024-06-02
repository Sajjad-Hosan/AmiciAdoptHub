import { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import "./styles.css";
import { EffectCoverflow, Pagination, Mousewheel } from "swiper/modules";
import SliderDetail from "../SliderDetail/SliderDetail";
const Sliders = () => {
  const [view, setView] = useState([]);
  const handleImage = (log) => {
    console.log(log.target);
    document.getElementById("sliderDetails").showModal();
    setView(log.target.src);
  };
  return (
    <>
      <SliderDetail details={view} open={open} handleOpen={handleImage} />
      <div className="max-w-screen-lg mx-auto card border p-10 mt-5">
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          initialSlide={3}
          centeredSlides={true}
          slidesPerView={"auto"}
          mousewheel={true}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 2,
            slideShadows: true,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[EffectCoverflow, Pagination, Mousewheel]}
          className="mySwiper"
        >
          {/* TODO: images from database */}
          <SwiperSlide onClick={handleImage}>
            <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://swiperjs.com/demos/images/nature-5.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://swiperjs.com/demos/images/nature-6.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://swiperjs.com/demos/images/nature-7.jpg" />
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
};

export default Sliders;
