export default function ServiceProviderAbout({
  about,
}: {
  about?: string | undefined
}) {
  return (
    <>
      {about ? (
        <p className="text-sm md:text-base">{about}</p>
      ) : (
        <p className="text-center font-medium text-lg md:text-xl py-4">
          No about yet.
        </p>
      )}
    </>
  )
}
