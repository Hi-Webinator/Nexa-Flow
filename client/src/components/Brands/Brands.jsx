import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { brands } from "../../data/content";
import "swiper/css";
import "./_brands.scss";

const loopBrands = [...brands, ...brands];

// How long each logo rests before gliding to the next (ms).
const REST = 1000;
// How long the glide to the next logo takes (ms).
const GLIDE = 500;

const Brands = () => {
  return (
    <div className="brands">
      <p className="brandsTitle">Trusted by teams at world-class companies</p>
      <Swiper
        className="marquee"
        modules={[Autoplay]}
        slidesPerView="auto"
        spaceBetween={0}
        loop
        speed={GLIDE}
        autoplay={{
          delay: REST,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        allowTouchMove={false}
      >
        {loopBrands.map((b, i) => (
          <SwiperSlide key={i} style={{ width: "auto" }}>
            <div className="brandItem">
              <div
                className="brandIcon"
                style={{
                  background: `linear-gradient(135deg,#${b.color.split(",")[0].replace("#", "")},#${b.color.split(",")[1].replace("#", "")})`,
                }}
              />
              {b.name}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Brands;
