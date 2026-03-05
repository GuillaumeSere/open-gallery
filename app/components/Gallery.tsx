import PhotoCard from "./PhotoCard";

export default function Gallery({ photos }: any) {
  return (
    <div
      className="max-w-7xl mx-auto px-6 py-16 grid gap-6 
      grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      {photos.map((photo: any, index: number) => (
        <PhotoCard key={`${photo.id}-${index}`} photo={photo} />
      ))}
    </div>
  );
}