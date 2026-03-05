"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Image from "next/image";

type UnsplashPhoto = {
  id: string;
  alt_description: string | null;
  urls: {
    regular: string;
  };
};

type HeroSliderProps = {
  photos: UnsplashPhoto[];
};

const HeroSlider = ({ photos }: HeroSliderProps) => {
  if (!photos || photos.length === 0) {
    return null;
  }

  return (
    <Swiper
      spaceBetween={0}
      slidesPerView={1}
      loop
      className="w-full"
      modules={[Autoplay]}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
    >
      {photos.map((photo) => (
        <SwiperSlide key={photo.id}>
          <div className="relative h-[50vh] w-full bg-black sm:h-[60vh] md:h-[70vh]">
            <Image
              src={photo.urls.regular}
              alt={photo.alt_description || "image"}
              fill
              sizes="100vw"
              unoptimized
              priority
              className="object-contain"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroSlider;