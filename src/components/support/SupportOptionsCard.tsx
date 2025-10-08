export default function SupportOptionsCard({
  icon,
  text,
  url,
}: {
  icon: any
  text: string
  url: string
}) {
  const IconComponent = icon
  return (
    <a
      href={url}
      className=" flex items-center gap-2 md:gap-4 rounded-md bg-white p-2 md:p-3 "
    >
      <div className="p-2 md:p-4 bg-gray-300 w-max rounded-full">
        <IconComponent className="w-5 h-5 md:w-6 md:h-6" />
      </div>
      <h2 className="text-sm md:text-base">{text}</h2>
    </a>
  )
}
