import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

export default function ApprovePaymentButton() {
  return (
    <Link to="/customer/wallet/approve">
      <Button size="sm">Approve</Button>
    </Link>
  )
}
