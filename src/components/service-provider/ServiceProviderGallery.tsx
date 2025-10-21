export default function ServiceProviderGallery({
  gallery,
}: {
  gallery: string[] | undefined
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 pb-2">
      {gallery?.map((image, index) => {
        return (
          <figure key={index} className=" rounded-lg">
            <img
              src={image}
              alt="uploads"
              className="aspect-square object-cover rounded-lg w-full"
              loading="lazy"
            />
          </figure>
        )
      })}
    </div>
  )
}
