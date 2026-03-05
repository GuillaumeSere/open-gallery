import GalleryCategoriesSlider from "../../components/GalleryCategoriesSlider";

export const metadata = {
  title: "Open Gallery",
  description: "Explore high quality free images",
};

async function getPhotos(count: number = 30) {
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

type GalleryPageParams = {
  params: {
    page: string;
  };
};

export default async function GalleryPage({ params }: GalleryPageParams) {
  const currentPage = Number(params.page) || 1;
  const photos = await getPhotos();

  return (
    <section className="min-h-screen">
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-10">
        <h1 className="text-4xl font-bold mb-4">Gallery</h1>
        <p className="text-gray-500 mb-10">
          Discover beautiful free photos from Unsplash
        </p>
      </div>

      <GalleryCategoriesSlider initialPhotos={photos} />

    </section>
  );
}

