import Image from "next/image";

export default function PhotoCard({ photo }: any) {
  return (
    <div className="relative w-full rounded-2xl bg-black shadow-md aspect-[4/3]">
      <Image
        src={photo.urls.small}
        alt={photo.alt_description || "image"}
        fill
        sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
        unoptimized
        className="object-cover transition duration-500 hover:scale-105"
      />
    </div>
  );
}