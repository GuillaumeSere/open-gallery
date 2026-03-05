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
    <div className="relative w-full">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        loop
        modules={[Autoplay]}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        className="w-full"
      >
        {photos.map((photo) => (
          <SwiperSlide key={photo.id}>
            <div className="relative h-[50vh] w-full sm:h-[60vh] md:h-[70vh]">
              <Image
                src={photo.urls.regular}
                alt={photo.alt_description || "free stock photo"}
                fill
                sizes="100vw"
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/30"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Overlay Glassmorphism */}
      <div className="absolute inset-0 z-10 flex items-center justify-center px-6">
        <div className="max-w-xl text-center text-white backdrop-blur-lg bg-white/10 border border-white/20 shadow-xl rounded-2xl p-8">

          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Discover Stunning Free Photos
          </h1>

          <p className="text-sm md:text-lg p-2 text-gray-200">
            Explore a curated gallery of high-quality images from talented
            photographers around the world. Find inspiration, download visuals,
            and power your creative projects with beautiful photography.
          </p>

        </div>
      </div>
    </div>
  );
};

export default HeroSlider;