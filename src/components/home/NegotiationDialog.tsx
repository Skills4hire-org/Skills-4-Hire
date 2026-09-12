import NegotiateOfferForm from '../form/NegotiateOfferForm'

export default function NegotiationDialog({
  setIsNegotiateOpen,
  customerUserId,
  postTitle,
}: {
  setIsNegotiateOpen: (value: boolean) => void
  customerUserId?: string
  postTitle?: string
}) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <NegotiateOfferForm
        setIsNegotiateOpen={setIsNegotiateOpen}
        customerUserId={customerUserId}
        postTitle={postTitle}
      />
    </div>
  )
}
