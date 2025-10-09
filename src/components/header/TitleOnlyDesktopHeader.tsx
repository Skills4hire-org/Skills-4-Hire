export default function TitleOnlyDesktopHeader({ title }: { title: string }) {
  return (
    <header className="hidden md:block py-4">
      <h1 className="font-bold text-2xl text-start">{title}</h1>
    </header>
  )
}
