export default function EmptyTab({ label }: { label: string }) {
  return (
    <p className="font-medium text-center md:text-lg capitalize py-9">
      no {label} yet
    </p>
  )
}
