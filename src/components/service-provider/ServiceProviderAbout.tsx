export default function ServiceProviderAbout({
  about,
}: {
  about?: string | undefined
}) {
  return <p className="text-sm md:text-base">{about}</p>
}
