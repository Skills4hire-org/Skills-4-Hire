import { TabsList, TabsTrigger } from '../ui/tabs'

export default function TabHead({
  tabList,
}: {
  tabList: { status: string; label: string }[]
}) {
  return (
    <TabsList className="w-full h-full  rounded-none relative p-0">
      {tabList.map(({ status, label }, index) => {
        return (
          <TabsTrigger
            key={index}
            value={status}
            className="bg-background cursor-pointer capitalize "
          >
            {label}
          </TabsTrigger>
        )
      })}
      <span className="absolute z-40 w-full bottom-0 border-b-4 border-b-red-100"></span>
    </TabsList>
  )
}
