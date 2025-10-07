const Container = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div className={`px-2 sm:px-4 ${className}`}>
      <div className="max-w-6xl xl:max-w-7xl mx-auto">{children}</div>
    </div>
  )
}
export default Container
