export type WalletBalance = {
  wallet_id: string
  user_email: string
  is_active: boolean
  created_at: string
  available_balance: string
  overall_balance: string
  overall_locked_balance: string
}

export type Transaction = {
  amount: string
  reference_key: string
  status: string
  transaction_id: string
  type: string
  transaction_date: string
}
