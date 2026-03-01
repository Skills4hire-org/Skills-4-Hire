export default function DesktopWalletHeader({ title }: { title?: string }) {
  return (
    <header className="hidden md:block py-4">
      <h1 className="font-bold text-2xl text-center">{title || 'Wallet'}</h1>
    </header>
  )
}
