export default function NoTransactionHistory({ label }: { label: string }) {
  return (
    <p className="font-medium text-center md:text-lg capitalize py-10">
      no {label} transaction yet
    </p>
  )
}
