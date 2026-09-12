'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import HeaderWithBackNavigation from '@/components/header/HeaderWithBackNavigation'
import { useWallet } from '@/hooks/useWallet'
import type { WalletBalance } from '@/types/wallet.types'
import { currencyFormatter } from '@/utils/format'
import { initiateDeposit } from '@/api/wallet'
import { toast } from 'sonner'
import Loading from '@/components/global/Loading'
import Error from '@/components/global/Error'

export default function Deposit() {
  const {
    data: walletBalance,
    isLoading: walletLoading,
    isError: walletError,
    refetch: walletRefetch,
  } = useWallet()

  const wallet: WalletBalance | undefined = walletBalance

  const [amount, setAmount] = useState('')

  const minDeposit = 1000

  const [isDepositLoading, setIsDepositLoading] = useState(false)

  const handleRefetch = () => {
    walletRefetch()
  }

  const handleDeposit = async () => {

    setIsDepositLoading(true)

    try {
      const response = await initiateDeposit({
        payment_method: 'bank_account',
        amount,
        currency: 'NGN',
      })
      const redirect_url = response?.redirect_url
      window.location.href = redirect_url
    } catch (error: any) {
      toast.error(error?.message || 'Failed to initialize deposit.')
    } finally {
      setIsDepositLoading(false)
    }
  }
  return (
    <div className="min-h-screen bg-white flex flex-col max-[1023px]:min-[768px]:w-135 max-[1023px]:min-[768px]:ml-17">
      <div className="[&>*]:border-none">
        <HeaderWithBackNavigation title="Deposit" />
      </div>

      {walletLoading ? (
        <div className="h-24">
          <Loading />
        </div>
      ) : (
        <>
          {walletError ? (
            <div className="py-6">
              <Error
                text="An error occured. Check your network connection and try again."
                buttonFunc={handleRefetch}
              />
            </div>
          ) : (
            <div className="flex justify-center w-full px-4 md:px-6 lg:px-8 mt-10">
              <div className="w-full max-w-2xl space-y-6">
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
                      {currencyFormatter(minDeposit)}
                    </span>
                  </div>
                </div>

                <div className="flex justify-center pt-8">
                  <Button
                    size="lg"
                    onClick={handleDeposit}
                    disabled={isDepositLoading || Number(amount) < minDeposit}
                    className="px-16 py-4 rounded-lg text-base font-semibold"
                  >
                    {isDepositLoading ? 'Please wait...' : 'Deposit'}
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
