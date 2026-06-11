import { Trash2 } from 'lucide-react'

export default function ServiceProviderGallery({
  image,
  editGallery,
}: {
  image: string
  editGallery?: boolean
}) {
  return (
    <figure className=" rounded-lg relative">
      <img
        src={image}
        alt="uploads"
        className="aspect-square object-cover rounded-lg w-full"
        loading="lazy"
      />

      {editGallery && (
        <button className="bg-red-100 p-1 absolute -top-2 -right-2 md:-top-2.5 md:-right-2.5 rounded-sm cursor-pointer hover:shadow-sm text-destructive hover:text-destructive/80">
          <Trash2 className="w-4 h-4 md:w-5 md:h-5" />
          <span className="sr-only">delete image</span>
        </button>
      )}
    </figure>
  )
}
