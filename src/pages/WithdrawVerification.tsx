"use client";

import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import HeaderWithBackNavigation from "@/components/header/HeaderWithBackNavigation";
import { CheckCircle2, Landmark, CreditCard, User } from "lucide-react";
import type { WithdrawalDetails } from "@/types/withdrawal";

export default function WithdrawVerification() {
  const navigate = useNavigate();
  const location = useLocation();

  const withdrawalDetails = (location.state as WithdrawalDetails) || {
    amount: "25,000.00",
    bank: "Opay",
    accountNumber: "8123456789",
    accountName: "John Doe",
  };

  const handleConfirm = () => {
    navigate("/customer/wallet/withdraw-pin", {
      state: withdrawalDetails,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="[&>*]:border-none">
        <HeaderWithBackNavigation title="Confirm Transaction" />
      </div>

      <div className="flex justify-center w-full px-4 md:px-6 lg:px-8 mt-10">
        <div className="w-full max-w-2xl space-y-8">
          <div className="bg-white rounded-2xl shadow-sm p-8 text-center space-y-4 border">
            <div className="flex justify-center">
              <div className="bg-green-100 p-3 rounded-full">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
            </div>

            <p className="text-gray-500 text-sm">You are about to withdraw</p>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              ₦{withdrawalDetails.amount}
            </h1>

            <p className="text-sm text-gray-500">
              to {withdrawalDetails.bank}. Please confirm the details below.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border divide-y">
            <div className="flex items-center justify-between p-5">
              <div className="flex items-center gap-3 text-gray-500">
                <Landmark className="w-5 h-5" />
                <span className="text-sm">Bank</span>
              </div>

              <span className="text-sm font-medium text-gray-900">
                {withdrawalDetails.bank}
              </span>
            </div>

            <div className="flex items-center justify-between p-5">
              <div className="flex items-center gap-3 text-gray-500">
                <CreditCard className="w-5 h-5" />
                <span className="text-sm">Account Number</span>
              </div>

              <span className="text-sm font-medium text-gray-900">
                {withdrawalDetails.accountNumber}
              </span>
            </div>

            <div className="flex items-center justify-between p-5">
              <div className="flex items-center gap-3 text-gray-500">
                <User className="w-5 h-5" />
                <span className="text-sm">Account Name</span>
              </div>

              <span className="text-sm font-medium text-gray-900">
                {withdrawalDetails.accountName}
              </span>
            </div>
          </div>

          <p className="text-xs text-center text-gray-500">
            You will be required to enter your transaction PIN to complete this
            withdrawal.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-8">
            <Button
              variant="outline"
              onClick={() => navigate(-1)}
              className="w-full sm:w-auto px-12 py-4 rounded-lg text-base font-semibold"
            >
              Cancel
            </Button>

            <Button
              onClick={handleConfirm}
              className="w-full sm:w-auto px-12 py-4 rounded-lg text-base font-semibold"
            >
              Confirm Withdrawal
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
