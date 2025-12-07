export default function ServiceProviderGallery({ image }: { image: string }) {
  return (
    <figure className=" rounded-lg">
      <img
        src={image}
        alt="uploads"
        className="aspect-square object-cover rounded-lg w-full"
        loading="lazy"
      />
    </figure>
  )
}
