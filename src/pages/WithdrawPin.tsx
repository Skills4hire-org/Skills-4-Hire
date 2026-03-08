"use client";

import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import HeaderWithBackNavigation from "@/components/header/HeaderWithBackNavigation";
import type { WithdrawalDetails } from "@/types/withdrawal";
import { withdrawPinSchema } from "@/utils/schemas";
import { useValidateSchema } from "@/hooks/useValidateSchema";
import { toast } from "sonner";

export default function WithdrawPin() {
  const navigate = useNavigate();
  const location = useLocation();

  const withdrawalDetails = location.state as WithdrawalDetails;

  const [pin, setPin] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [locked, setLocked] = useState(false);

  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "⌫"];

  const handlePinChange = (value: string) => {
    if (pin.length >= 4 || locked) return;

    const newPin = pin + value;
    setPin(newPin);

    if (newPin.length === 4) {
      const validated = useValidateSchema(withdrawPinSchema, { pin: newPin });

      if (!validated) {
        setPin("");
        return;
      }

      // Simulated correct PIN
      if (newPin !== "1234") {
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);

        const remaining = 3 - newAttempts;

        if (remaining > 0) {
          toast.error(
            `Incorrect PIN (${remaining} attempt${remaining > 1 ? "s" : ""} left)`,
          );
        } else {
          toast.error("Too many incorrect attempts. Try again later.");
          setLocked(true);
        }

        setPin("");
        return;
      }

      navigate("/customer/wallet/withdraw-success", {
        state: withdrawalDetails,
      });
    }
  };

  const handleDelete = () => {
    if (locked) return;
    setPin(pin.slice(0, -1));
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <HeaderWithBackNavigation title="Enter Transaction PIN" />

      <div className="flex flex-col items-center justify-center flex-1 space-y-10 px-6">
        <h2 className="text-lg font-semibold text-gray-800">
          Enter your 4-digit PIN
        </h2>

        <div className="flex gap-4">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`w-4 h-4 rounded-full border ${
                pin[i] ? "bg-black border-black" : "border-gray-300"
              }`}
            />
          ))}
        </div>

        <div className="grid grid-cols-3 gap-6 w-64">
          {numbers.map((num, i) => (
            <button
              key={i}
              disabled={locked || num === ""}
              onClick={() => {
                if (num === "⌫") handleDelete();
                else if (num !== "") handlePinChange(num);
              }}
              className={`text-xl font-semibold h-14 rounded-lg 
                ${locked ? "bg-gray-200 text-gray-400" : "bg-gray-100 active:bg-gray-200"}`}
            >
              {num}
            </button>
          ))}
        </div>

        <button onClick={() => navigate(-1)} className="text-gray-500 text-sm">
          Cancel
        </button>
      </div>
    </div>
  );
}
