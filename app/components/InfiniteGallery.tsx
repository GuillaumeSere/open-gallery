"use client";

import { useEffect, useRef, useState } from "react";
import Gallery from "./Gallery";
import HeroSlider from "./HeroSlider";

type UnsplashPhoto = {
  id: string;
  alt_description: string | null;
  urls: {
    small: string;
  };
};

type InfiniteGalleryProps = {
  initialPhotos: UnsplashPhoto[];
};

const InfiniteGallery = ({ initialPhotos }: InfiniteGalleryProps) => {
  const [photos, setPhotos] = useState<UnsplashPhoto[]>(initialPhotos || []);
  const [page, setPage] = useState<number>(2);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const handleLoadMore = async () => {
    if (isLoading || !hasMore) {
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const res = await fetch(
        `https://api.unsplash.com/photos?page=${page}&per_page=20&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`
      );

      if (!res.ok) {
        setHasMore(false);
        if (res.status === 403 || res.status === 429) {
          setErrorMessage(
            "Quota Unsplash atteint. La page reste utilisable, mais le chargement de nouvelles images est temporairement désactivé."
          );
        } else {
          setErrorMessage(
            "Impossible de charger plus d'images pour le moment. Réessaie plus tard."
          );
        }
        return;
      }

      const newPhotos: UnsplashPhoto[] = await res.json();

      if (!Array.isArray(newPhotos) || newPhotos.length === 0) {
        setHasMore(false);
        return;
      }

      setPhotos((prev) => [...prev, ...newPhotos]);
      setPage((prev) => prev + 1);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!loadMoreRef.current) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;

        if (entry.isIntersecting) {
          void handleLoadMore();
        }
      },
      {
        rootMargin: "200px",
      }
    );

    observer.observe(loadMoreRef.current);

    return () => {
      observer.disconnect();
    };
  }, [hasMore, isLoading]);

  return (
    <>
      {photos.length === 0 && (
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm text-gray-700">
            <p className="font-semibold">Aucune image à afficher.</p>
            <p className="mt-1 text-gray-600">
              {errorMessage ||
                "Si tu viens d'atteindre le quota Unsplash, c'est normal. Sinon, vérifie ta clé API."}
            </p>
          </div>
        </div>
      )}

      <Gallery photos={photos} />

      <div
        ref={loadMoreRef}
        className="h-16 flex items-center justify-center text-sm text-gray-500"
      >
        {isLoading && hasMore && "Chargement des images..."}
        {!isLoading && hasMore && "Faites défiler pour charger plus d'images"}
        {!hasMore && (errorMessage || "Plus d'images à charger")}
      </div>
    </>
  );
};

export default InfiniteGallery;

