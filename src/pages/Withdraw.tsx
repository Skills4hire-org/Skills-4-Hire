'use client'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import HeaderWithBackNavigation from '@/components/header/HeaderWithBackNavigation'
import {
  ChevronRight,
  Search,
  Landmark,
  CreditCard,
  User,
  Loader2,
} from 'lucide-react'
import { withdrawSchema } from '@/utils/schemas'
import { useValidateSchema } from '@/hooks/useValidateSchema'
import type { WithdrawalDetails } from '@/types/withdrawal'
import { useBanks, useWallet } from '@/hooks/useWallet'
import type { WalletBalance } from '@/types/wallet.types'
import { currencyFormatter } from '@/utils/format'
import {
  initiateWithdrawal,
  pollWithdrawal,
  resolveBanksDetails,
} from '@/api/wallet'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import type { UserType } from '@/types/user.types'
import Loading from '@/components/global/Loading'
import Error from '@/components/global/Error'

export default function Withdraw() {
  const { userType }: { userType: UserType } = useSelector(
    (state: any) => state.userState,
  )
  const { data, isLoading, isError, refetch } = useBanks()
  const {
    data: walletBalance,
    isLoading: walletLoading,
    isError: walletError,
    refetch: walletRefetch,
  } = useWallet()

  const wallet: WalletBalance | undefined = walletBalance
  const banks: { id: string; code: string; name: string }[] | undefined =
    data?.data ?? []

  const navigate = useNavigate()

  const [accountName, setAccountName] = useState('')
  const [amount, setAmount] = useState('')
  const [accountNumber, setAccountNumber] = useState('')
  const [selectedBank, setSelectedBank] = useState('')
  const [selectedBankCode, setSelectedBankCode] = useState('')
  const [bankSearch, setBankSearch] = useState('')
  const [showBankDropdown, setShowBankDropdown] = useState(false)
  const minWithdrawal = 1000

  const filteredBanks = banks?.filter(({ name }) =>
    name.toLowerCase().includes(bankSearch.toLowerCase()),
  )

  const [isAccountNameLoading, setIsAccountNameLoading] = useState(false)
  const [isWithdrawalLoading, setIsWithdrawalLoading] = useState(false)

  const handleRefetch = () => {
    refetch()
    walletRefetch()
  }

  const handleAccountName = async (code: string) => {
    setIsAccountNameLoading(true)
    try {
      const response = await resolveBanksDetails({
        account_number: accountNumber,
        bank_code: code,
        currency: 'NGN',
      })

      const accountName = response?.account_name
      if (accountName) {
        setAccountName(accountName)
      } else {
        toast.error('No account with the given details found.')
      }
    } catch (error: any) {
      toast.error(error?.message)
    } finally {
      setIsAccountNameLoading(false)
    }
  }

  const handleSelectBank = ({ name, code }: { name: string; code: string }) => {
    if (accountNumber.length !== 10) {
      toast.error('Please enter a 10-digit account number')
      return
    }
    setSelectedBank(name)
    setSelectedBankCode(code)
    setShowBankDropdown(false)
    setBankSearch('')
    handleAccountName(code)
  }
  const handleAccountNumberInput = (value: string) => {
    setAccountNumber(value.replace(/\D/g, ''))

    if (accountName) {
      return (setSelectedBank(''), setAccountName(''))
    }
  }

  const handleWithdraw = async () => {
    const validatedData = useValidateSchema(withdrawSchema, {
      accountName,
      amount,
      accountNumber,
      bank: selectedBank,
    }) as WithdrawalDetails

    if (!validatedData) return

    if (Number(amount) > Number(wallet?.available_balance)) {
      toast.warning('Insufficient Funds.')
      return
    }
    setIsWithdrawalLoading(true)
    try {
      const response = await initiateWithdrawal({
        account_number: accountNumber,
        bank_code: selectedBankCode,
        amount,
        currency: 'NGN',
      })

      const transfer_id = response?.transfer_id
      if (!transfer_id) {
        toast.error('Failed to initialize withdrawal')
        navigate(`/${userType}/wallet`)
        return
      }
      const status = await pollWithdrawal({ transfer_id })
      if (status === 'COMPLETED') {
        toast.success('Withdrawal completed successfully')
      } else if (status === 'FAILED') {
        toast.error(
          'Withdrawal failed. The amount has been refunded to your wallet.',
        )
      } else {
        toast.warning(
          'Withdrawal is still being processed. Please check your transaction history.',
        )
      }

      navigate(`/${userType}/wallet/transaction-history`)
    } catch (error: any) {
      toast.error(error?.message)
    } finally {
      setIsWithdrawalLoading(false)
    }
  }
  return (
    <div className="min-h-screen bg-white flex flex-col max-[1023px]:min-[768px]:w-135 max-[1023px]:min-[768px]:ml-17">
      <div className="[&>*]:border-none">
        <HeaderWithBackNavigation title="Withdraw" />
      </div>

      {isLoading || walletLoading ? (
        <div className="h-24">
          <Loading />
        </div>
      ) : (
        <>
          {isError || walletError ? (
            <div className="py-6">
              <Error
                text="An error occured. Check your network connection and try again."
                buttonFunc={handleRefetch}
              />
            </div>
          ) : (
            <div className="flex justify-center w-full px-4 md:px-6 lg:px-8 mt-10">
              <div className="w-full max-w-2xl space-y-6">
                <div className="border border-gray-300 bg-white p-4 rounded-lg flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    value={accountNumber}
                    onChange={(e) => handleAccountNumberInput(e.target.value)}
                    placeholder="Account Number"
                    className="w-full bg-transparent outline-none text-gray-800 text-sm"
                  />
                </div>

                <div className="relative">
                  <div
                    onClick={() => setShowBankDropdown(!showBankDropdown)}
                    className="border border-gray-300 bg-white p-4 rounded-lg flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <Landmark className="w-5 h-5 text-gray-400" />
                      <span className="text-sm text-gray-800">
                        {selectedBank || 'Select Bank'}
                      </span>
                    </div>

                    <ChevronRight
                      className={`w-5 h-5 text-gray-500 transition-transform ${
                        showBankDropdown ? 'rotate-90' : ''
                      }`}
                    />
                  </div>

                  {showBankDropdown && (
                    <div className="absolute mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                      <div className="flex items-center px-3 py-2 border-b">
                        <Search className="w-4 h-4 text-gray-400 mr-2" />
                        <input
                          type="text"
                          placeholder="Search bank..."
                          value={bankSearch}
                          onChange={(e) => setBankSearch(e.target.value)}
                          className="w-full outline-none text-sm"
                        />
                      </div>

                      <div className="max-h-60 overflow-y-auto">
                        {filteredBanks?.length !== 0 ? (
                          filteredBanks?.map(({ code, name }, index) => (
                            <div
                              key={index}
                              onClick={() => {
                                handleSelectBank({ code, name })
                              }}
                              className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                            >
                              {name}
                            </div>
                          ))
                        ) : (
                          <div className="px-4 py-3 text-sm text-gray-500">
                            No bank found
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="border border-gray-300 bg-white p-4 rounded-lg flex items-center gap-3 relative">
                  <User className="w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={accountName}
                    disabled
                    placeholder="Account Name"
                    className="w-full bg-transparent outline-none text-gray-800 text-sm"
                  />
                  {isAccountNameLoading && (
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                      <Loader2 className="w-4 h-4 animate-spin" />
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-end">
                    <span className="text-sm font-medium text-gray-700">
                      Balance:{' '}
                      {currencyFormatter(Number(wallet?.available_balance))}
                    </span>
                  </div>

                  <div className="relative border border-gray-300 bg-white p-4 rounded-lg">
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="Amount (NGN)"
                      className="w-full bg-transparent outline-none text-gray-800 text-sm pr-20"
                    />

                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                      min.
                      {currencyFormatter(minWithdrawal)}
                    </span>
                  </div>
                </div>

                <div className="flex justify-center pt-8">
                  <Button
                    size="lg"
                    onClick={handleWithdraw}
                    disabled={isWithdrawalLoading || !accountName}
                    className="px-16 py-4 rounded-lg text-base font-semibold"
                  >
                    {isWithdrawalLoading ? 'Withdrawing...' : 'Withdraw'}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
