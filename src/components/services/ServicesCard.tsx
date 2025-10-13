export default function ServicesCard({
  serviceName,
  serviceImage,
}: {
  serviceName: string
  serviceImage: string
}) {
  return (
    <figure className="relative rounded-xl">
      <img
        src={serviceImage}
        alt={serviceName}
        className="rounded-xl object-cover aspect-square w-full"
        loading="lazy"
      />
      <figcaption>
        <span className="text-white capitalize text-[10px] sm:text-xs absolute bottom-4 font-medium left-1/2 -translate-x-1/2 py-1 px-2 bg-black/30 w-full text-center">
          {serviceName}
        </span>
      </figcaption>
    </figure>
  )
}
