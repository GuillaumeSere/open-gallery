import HeroSlider from "./components/HeroSlider";
import InfiniteGallery from "./components/InfiniteGallery";

async function getGalleryPhotos() {
  try {
    const res = await fetch(
      `https://api.unsplash.com/photos?page=1&per_page=20&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      return [];
    }

    return res.json();
  } catch {
    return [];
  }
}

async function getRandomHeroPhotos(count: number = 5) {
  try {
    const res = await fetch(
      `https://api.unsplash.com/photos/random?count=${count}&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      return [];
    }

    return res.json();
  } catch {
    return [];
  }
}

export default async function Home() {
  const [rawHeroPhotos, galleryPhotos] = await Promise.all([
    getRandomHeroPhotos(),
    getGalleryPhotos(),
  ]);

  const heroPhotos =
    Array.isArray(rawHeroPhotos) && rawHeroPhotos.length > 0
      ? rawHeroPhotos
      : Array.isArray(galleryPhotos)
        ? galleryPhotos.slice(0, 5)
        : [];

  return (
    <>
      <HeroSlider photos={heroPhotos} />
      <InfiniteGallery initialPhotos={galleryPhotos} />
    </>
  );
}