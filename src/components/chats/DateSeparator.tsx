interface Props {
  date: string
}

export default function DateSeparator({ date }: Props) {
  return (
    <div className="flex justify-center my-4">
      <div className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full">
        {date}
      </div>
    </div>
  )
}
