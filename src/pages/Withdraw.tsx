"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import HeaderWithBackNavigation from "@/components/header/HeaderWithBackNavigation";
import { ChevronRight, Search, Landmark, CreditCard, User } from "lucide-react";
import { withdrawData, nigerianBanks } from "@/assets/data";
import { withdrawSchema } from "@/utils/schemas";
import { useValidateSchema } from "@/hooks/useValidateSchema";
import type { WithdrawalDetails } from "@/types/withdrawal";

export default function Withdraw() {
  const navigate = useNavigate();

  const [accountName, setAccountName] = useState("");
  const [amount, setAmount] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [selectedBank, setSelectedBank] = useState("");

  const [bankSearch, setBankSearch] = useState("");
  const [showBankDropdown, setShowBankDropdown] = useState(false);

  const filteredBanks = nigerianBanks.filter((bank) =>
    bank.toLowerCase().includes(bankSearch.toLowerCase()),
  );

  const handleWithdraw = () => {
    const validatedData = useValidateSchema(withdrawSchema, {
      accountName,
      amount,
      accountNumber,
      bank: selectedBank,
    }) as WithdrawalDetails;

    if (!validatedData) return;

    navigate("../wallet/withdraw-verify", {
      state: validatedData,
    });
  };
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="[&>*]:border-none">
        <HeaderWithBackNavigation title={withdrawData.title} />
      </div>

      <div className="flex justify-center w-full px-4 md:px-6 lg:px-8 mt-10">
        <div className="w-full max-w-2xl space-y-6">
          <div className="border border-gray-300 bg-white p-4 rounded-lg flex items-center gap-3">
            <CreditCard className="w-5 h-5 text-gray-400" />
            <input
              type="tel"
              inputMode="numeric"
              maxLength={10}
              value={accountNumber}
              onChange={(e) =>
                setAccountNumber(e.target.value.replace(/\D/g, ""))
              }
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
                  {selectedBank || "Select Bank"}
                </span>
              </div>

              <ChevronRight
                className={`w-5 h-5 text-gray-500 transition-transform ${
                  showBankDropdown ? "rotate-90" : ""
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
                  {filteredBanks.length > 0 ? (
                    filteredBanks.map((bank) => (
                      <div
                        key={bank}
                        onClick={() => {
                          setSelectedBank(bank);
                          setShowBankDropdown(false);
                          setBankSearch("");
                        }}
                        className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                      >
                        {bank}
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

          <div className="border border-gray-300 bg-white p-4 rounded-lg flex items-center gap-3">
            <User className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={accountName}
              onChange={(e) =>
                setAccountName(e.target.value.replace(/[^a-zA-Z\s]/g, ""))
              }
              onKeyDown={(e) => {
                if (!/[a-zA-Z\s]/.test(e.key) && e.key !== "Backspace") {
                  e.preventDefault();
                }
              }}
              placeholder="Account Name"
              className="w-full bg-transparent outline-none text-gray-800 text-sm"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-end">
              <span className="text-sm font-medium text-gray-700">
                Balance: ₦{withdrawData.balance.toFixed(2)}
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
                {withdrawData.minWithdraw.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>
          </div>

          <div className="flex justify-center pt-8">
            <Button
              size="lg"
              onClick={handleWithdraw}
              className="px-16 py-4 rounded-lg text-base font-semibold"
            >
              {withdrawData.buttonLabel}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
