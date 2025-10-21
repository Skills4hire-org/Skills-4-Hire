export default function EmptyTab({ label }: { label: string }) {
  return (
    <p className="font-medium text-center md:text-lg capitalize py-10">
      no {label} yet
    </p>
  )
}
