import { Heart } from 'lucide-react'

export default function AddToFavoriteForm({
  id,
  type,
  favorite,
}: {
  id: string
  type: 'service' | 'provider'
  favorite: boolean
}) {
  const classNameOptions: Record<string, { button: string; icon: string }> = {
    service: {
      button: ` ${
        favorite === true
          ? 'top-0 right-0 text-white absolute bg-black/30 rounded-tr-xl p-1'
          : 'hidden'
      }`,
      icon: '',
    },
    provider: {
      button: '',
      icon: `${favorite ? 'text-primary fill-primary' : 'text-foreground'}`,
    },
  }
  const className = classNameOptions[type]

  return (
    <form>
      <input type="text" hidden value={id} id="id" name="id" disabled />
      <input type="text" hidden value={type} id="type" name="type" disabled />
      {
        <button type="submit" className={className.button}>
          <Heart className={`w-5 md:w-6 h-5 md:h-6 ${className.icon}`} />
        </button>
      }
    </form>
  )
}
