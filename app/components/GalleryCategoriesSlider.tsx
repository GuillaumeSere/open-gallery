"use client";

import { useEffect, useState } from "react";
import GallerySlider from "./GallerySlider";

type UnsplashPhoto = {
  id: string;
  alt_description: string | null;
  urls: {
    regular: string;
  };
};

type GalleryCategoriesSliderProps = {
  initialPhotos: UnsplashPhoto[];
};

type GalleryCategory = {
  id: string;
  label: string;
  query: string | null;
};

const categories: GalleryCategory[] = [
  { id: "all", label: "Popular", query: null },
  { id: "nature", label: "Nature", query: "nature" },
  { id: "city", label: "City", query: "city" },
  { id: "people", label: "People", query: "people" },
  { id: "technology", label: "Technology", query: "technology" },
  { id: "animals", label: "Animals", query: "animals" },
];

const GalleryCategoriesSlider = ({
  initialPhotos,
}: GalleryCategoriesSliderProps) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("all");
  const [photos, setPhotos] = useState<UnsplashPhoto[]>(initialPhotos || []);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCategoryChange = (categoryId: string) => {
    if (categoryId === selectedCategoryId) {
      return;
    }

    setSelectedCategoryId(categoryId);
  };

  useEffect(() => {
    if (selectedCategoryId === "all") {
      setPhotos(initialPhotos || []);
      return;
    }

    const selectedCategory = categories.find(
      (category) => category.id === selectedCategoryId
    );

    if (!selectedCategory) {
      return;
    }

    const fetchCategoryPhotos = async () => {
      setIsLoading(true);

      try {
        const queryParam = selectedCategory.query
          ? `&query=${encodeURIComponent(selectedCategory.query)}`
          : "";

        const response = await fetch(
          `https://api.unsplash.com/photos/random?count=30&client_id=${
            process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY
          }${queryParam}`
        );

        if (!response.ok) {
          return;
        }

        const categoryPhotos: UnsplashPhoto[] = await response.json();

        setPhotos(categoryPhotos);
      } finally {
        setIsLoading(false);
      }
    };

    void fetchCategoryPhotos();
  }, [initialPhotos, selectedCategoryId]);

  return (
    <div className="max-w-7xl mx-auto px-6 pb-16">
      <div className="mb-8 flex flex-wrap items-center justify-center gap-3 pb-2 sm:justify-start">
        {categories.map((category) => {
          const isActive = category.id === selectedCategoryId;

          return (
            <button
              key={category.id}
              type="button"
              onClick={() => handleCategoryChange(category.id)}
              aria-pressed={isActive}
              className={`w-full whitespace-nowrap cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition sm:w-auto ${
                isActive
                  ? "bg-black text-white border-black"
                  : "bg-white text-gray-700 border-gray-200 hover:bg-gray-300"
              }`}
            >
              {category.label}
            </button>
          );
        })}
      </div>

      {isLoading && (
        <div className="flex h-32 items-center justify-center text-sm text-gray-500">
          Chargement des images...
        </div>
      )}

      {!isLoading && <GallerySlider photos={photos} />}
    </div>
  );
};

export default GalleryCategoriesSlider;

