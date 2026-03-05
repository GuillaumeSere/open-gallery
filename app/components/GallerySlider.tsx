"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";

type UnsplashPhoto = {
  id: string;
  alt_description: string | null;
  urls: {
    regular: string;
  };
  description?: string | null;
  user?: {
    name?: string;
    username?: string;
  };
};

type GallerySliderProps = {
  photos: UnsplashPhoto[];
};

const GallerySlider = ({ photos }: GallerySliderProps) => {
  if (!photos || photos.length === 0) {
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 pb-16">
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={32}
        slidesPerView={1}
        loop
        className="w-full"
      >
        {photos.map((photo) => (
          <SwiperSlide key={photo.id}>
            <div className="mx-auto w-full max-w-5xl">
              <div className="relative h-[50vh] w-full rounded-3xl bg-black shadow-lg sm:h-[60vh] md:h-[70vh]">
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

              <div className="mt-4 flex flex-col gap-1 rounded-2xl bg-white/80 p-4 text-sm text-gray-800 shadow-sm backdrop-blur">
                <p className="line-clamp-2 font-medium">
                  {photo.alt_description || photo.description || "Sans titre"}
                </p>
                {photo.user?.name && (
                  <p className="text-xs text-gray-600">
                    Photo par{" "}
                    <span className="font-semibold">{photo.user.name}</span>
                    {photo.user.username && (
                      <span className="text-gray-500">
                        {" "}
                        (@{photo.user.username})
                      </span>
                    )}
                  </p>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default GallerySlider;

