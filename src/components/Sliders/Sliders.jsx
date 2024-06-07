import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "./styles.css";
import { EffectCoverflow, Pagination, Mousewheel } from "swiper/modules";
import SliderDetail from "../SliderDetail/SliderDetail";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Sliders = () => {
  const axiosSecure = useAxiosSecure();
  const [result, setResult] = useState({});
  const { data = [] } = useQuery({
    queryKey: ["sliders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/pets");
      return res.data;
    },
  });
  const handleImage = (log) => {
    setResult(log);
    document.getElementById("sliderDetails").showModal();
  };
  return (
    <>
      <SliderDetail handleOpen={handleImage} loaderData={result} />
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
          {data.slice(1, 6).map((item, i) => (
            <SwiperSlide key={i} onClick={() => handleImage(item)}>
              <img src={item?.image} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default Sliders;
