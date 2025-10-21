"use client";

import React, { useState } from "react";
import { Send } from "lucide-react";
import { transferModes, sendInputIcons, bankOptions } from "@/assets/data";
import { mockWalletData } from "@/utils/database";

type TransferMode = "inApp" | "bankTransfer";

interface WalletSendProps {
  onSendMoney?: (mode: TransferMode, amount: number, recipient: string) => void;
}

const WalletSend: React.FC<WalletSendProps> = ({ onSendMoney }) => {
  const [mode, setMode] = useState<TransferMode>("inApp");
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [bankName, setBankName] = useState("Select Bank");
  const [accountNumber, setAccountNumber] = useState("");

  const { balance, currency } = mockWalletData;
  const numericBalance = `${currency}${balance.toLocaleString(undefined, {
    minimumFractionDigits: 2,
  })}`;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const numericAmount = parseFloat(amount.replace(/[^0-9.]/g, ""));
    if (isNaN(numericAmount) || numericAmount <= 0) return;

    if (mode === "inApp" && recipient && onSendMoney) {
      onSendMoney("inApp", numericAmount, recipient);
    } else if (
      mode === "bankTransfer" &&
      accountNumber &&
      bankName !== "Select Bank" &&
      onSendMoney
    ) {
      onSendMoney(
        "bankTransfer",
        numericAmount,
        `${accountNumber} (${bankName})`
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      <div className="flex-grow w-full">
        <div className="hidden md:block pl-16">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Send Money</h1>
        </div>

        <header className="md:hidden text-center py-3">
          <h1 className="text-2xl font-bold text-gray-900">Send Money</h1>
        </header>

        <div className="px-4 md:px-8 md:pl-24">
          <div className="max-w-4xl mx-auto md:mx-0 bg-gray-100 border border-gray-200 p-6 md:p-8 shadow-sm">
            <form onSubmit={handleSend} className="space-y-6">
              <div className="flex bg-gray-200 p-1 rounded-xl shadow-inner">
                {transferModes.map((m) => {
                  const Icon = m.icon;
                  return (
                    <button
                      key={m.key}
                      type="button"
                      onClick={() => setMode(m.key as TransferMode)}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                        mode === m.key
                          ? "bg-white text-primary shadow-md"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {m.label}
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-col space-y-1">
                <label className="text-gray-800 font-semibold text-sm">
                  Amount
                </label>
                <div className="relative">
                  <sendInputIcons.amount className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-primary" />
                  <input
                    type="text"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 text-2xl font-extrabold text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-gray-400 transition duration-150"
                    required
                  />
                </div>
                <p className="text-xs text-gray-600 px-1">
                  Current Balance: {numericBalance}
                </p>
              </div>

              <div className="pt-2">
                <label className="text-gray-800 font-semibold text-sm mb-2 block">
                  Recipient Details
                </label>

                {mode === "inApp" ? (
                  <>
                    <div className="relative mb-3">
                      <sendInputIcons.search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                      <input
                        type="text"
                        placeholder="Enter Username or ID (e.g., @john_doe)"
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-gray-500 transition duration-150"
                        required
                      />
                    </div>
                    <p className="text-xs text-gray-600 px-1">
                      {
                        transferModes.find((m) => m.key === "inApp")
                          ?.description
                      }
                    </p>
                  </>
                ) : (
                  <>
                    <input
                      type="text"
                      placeholder="Recipient's Account Number"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      className="w-full px-4 py-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-gray-500 transition duration-150 mb-3"
                      required
                    />

                    <div className="relative mb-3">
                      <sendInputIcons.bank className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                      <select
                        value={bankName}
                        onChange={(e) => setBankName(e.target.value)}
                        className="appearance-none w-full pl-10 pr-8 py-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-white text-gray-700 transition duration-150"
                        required
                      >
                        {bankOptions.map((bank) => (
                          <option
                            key={bank}
                            value={bank}
                            disabled={bank === "Select Bank"}
                          >
                            {bank}
                          </option>
                        ))}
                      </select>

                      <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-500">
                        <svg
                          className="w-4 h-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>

                    <input
                      type="text"
                      placeholder="Recipient Name (Usually auto-fetched)"
                      className="w-full px-4 py-3 text-sm border border-gray-300 rounded-md bg-gray-50 focus:outline-none placeholder:text-gray-500 cursor-not-allowed"
                      disabled
                    />

                    <p className="text-xs text-gray-600 px-1">
                      {
                        transferModes.find((m) => m.key === "bankTransfer")
                          ?.description
                      }
                    </p>
                  </>
                )}
              </div>

              <div className="flex justify-center mt-6">
                <button
                  type="submit"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 
                    bg-primary text-white font-semibold 
                    px-12 py-4 rounded-md text-base
                    shadow-md hover:shadow-lg hover:opacity-95 
                    transition duration-200"
                >
                  <Send className="w-5 h-5" />
                  Confirm & Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletSend;
