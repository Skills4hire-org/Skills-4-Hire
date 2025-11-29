import { setUserType } from '@/features/user/userSlice'
import type { UserType } from '@/utils/types'
import { UserStar } from 'lucide-react'
import { MdHandyman } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

export default function SwitchRoleButton({ className }: { className: string }) {
  const {
    isServiceProvider,
    userType,
  }: {
    isServiceProvider: boolean
    userType: UserType
  } = useSelector((state: any) => state.userState)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleSwitchToServiceProvider = () => {
    dispatch(
      setUserType({
        userType: 'service-provider',
      })
    )
    navigate('/service-provider/profile')
  }
  const handleSwitchToCustomer = () => {
    dispatch(
      setUserType({
        userType: 'customer',
      })
    )
    navigate('/service-provider/profile')
  }

  return (
    <>
      {isServiceProvider ? (
        <button
          className={`flex items-center justify-start px-2 py-2.5 rounded-full w-max text-xs font-medium gap-2.5 ${className} cursor-pointer`}
          onClick={
            userType == 'customer'
              ? handleSwitchToServiceProvider
              : handleSwitchToCustomer
          }
        >
          {userType === 'customer' ? (
            <>
              <MdHandyman className="w-5 h-5 font-bold" />
              Switch to Service Provider{' '}
            </>
          ) : (
            <>
              <UserStar className="w-5 h-5 font-bold" />
              Switch to Customer
            </>
          )}
        </button>
      ) : (
        <Link to="/service-provider/registration">
          <button
            className={`flex items-center justify-start px-2 py-2.5 rounded-full w-max text-xs font-medium gap-2.5 ${className} cursor-pointer`}
          >
            <MdHandyman className="w-5 h-5 font-bold" />
            Register as a Service Provider
          </button>
        </Link>
      )}
    </>
  )
}
