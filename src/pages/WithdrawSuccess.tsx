"use client";

import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import HeaderWithBackNavigation from "@/components/header/HeaderWithBackNavigation";
import { CheckCircle2 } from "lucide-react";
import type { WithdrawalDetails } from "@/types/withdrawal";

export default function WithdrawSuccess() {
  const navigate = useNavigate();
  const location = useLocation();

  const withdrawalDetails = (location.state as WithdrawalDetails) || {
    amount: "0.00",
    bank: "Bank",
    accountNumber: "0000000000",
    accountName: "Customer",
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="[&>*]:border-none">
        <HeaderWithBackNavigation title="Withdrawal Successful" />
      </div>

      <div className="flex justify-center w-full px-4 md:px-6 lg:px-8 mt-20">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border p-10 text-center space-y-6">
          <div className="flex justify-center">
            <div className="bg-green-100 p-4 rounded-full">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
          </div>

          <h2 className="text-xl font-semibold text-gray-900">
            Withdrawal Successful
          </h2>

          <p className="text-gray-500 text-sm">
            You have successfully withdrawn
          </p>

          <h1 className="text-3xl font-bold text-gray-900">
            ₦{withdrawalDetails.amount}
          </h1>

          <p className="text-sm text-gray-500">to {withdrawalDetails.bank}</p>

          <p className="text-sm text-gray-500">
            Account: {withdrawalDetails.accountNumber}
          </p>

          <p className="text-sm text-gray-500">
            Name: {withdrawalDetails.accountName}
          </p>

          <Button
            onClick={() => navigate("/customer/wallet")}
            className="w-full py-4 mt-4"
          >
            Back to Wallet
          </Button>
        </div>
      </div>
    </div>
  );
}
