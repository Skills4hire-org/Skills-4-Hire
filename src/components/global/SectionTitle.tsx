export default function SectionTitle({
  title1,
  title2,
  desc,
}: {
  title1: string
  title2: string
  desc?: string
}) {
  return (
    <div className="space-y-2 md:space-y-4 text-center">
      <h2 className=" font-bold text-2xl capitalize md:text-4xl ">
        {title1} <span className="text-primary">{title2}</span>
      </h2>
      <p className="text-sm md:text-base max-w-2xl mx-auto">{desc}</p>
    </div>
  )
}
