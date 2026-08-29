export default function DesktopChatHeader({ title }: { title?: string }) {
  return (
    <header className="hidden lg:block py-4">
      <h1 className="font-bold text-2xl text-center">{title || 'Wallet'}</h1>
    </header>
  )
}
