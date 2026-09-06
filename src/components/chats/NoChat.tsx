import icon from '../../assets/images/NoChat.png'
export default function NoChat({ text }: { text?: string }) {
  return (
    <div className="mt-16 flex flex-col items-center justify-center gap-4">
      <figure className="w-40 md:w-56 h-32 md:h-44 ">
        <img src={icon} alt="chat" className="w-full h-auto" />
      </figure>
      <div className="space-y-3 text-center">
        <p className="text-sm md:text-base text-gray-500">
          {text ?? 'No messages yet'}
        </p>
      </div>
    </div>
  )
}
