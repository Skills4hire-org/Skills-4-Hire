"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import HeaderWithBackNavigation from "@/components/header/HeaderWithBackNavigation";
import Container from "@/components/global/Container";
import SearchBar from "@/components/global/SearchBar";
import { socialShareOptions, mockContacts } from "@/assets/data";
import { referralPageData } from "@/utils/database";
import { Info, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Referral() {
  const [referralCode] = useState("fghijk90");
  const [contacts, setContacts] = useState(mockContacts);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralCode);
      console.log("Referral code copied");
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const handleShare = (baseUrl: string) => {
    const shareUrl = `${baseUrl}${referralCode}`;
    window.open(shareUrl, "_blank");
  };

  const handleInvite = (id: number, name: string) => {
    const smsMessage = `Hi ${name}, join Skills4Hire using my link: https://skills4hire.com/ref?code=${referralCode}`;
    window.location.href = `sms:?&body=${encodeURIComponent(smsMessage)}`;

    setContacts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: "Accepted" } : c))
    );
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <HeaderWithBackNavigation title="Referrals" />
      <Container className="pt-8 text-center max-w-lg mx-auto">
        <p className="text-2xl font-semibold text-gray-900">+ ₦0.00</p>
        <p className="text-sm text-gray-600 mb-3">
          0 contacts, ₦{referralPageData.rewardAmount} per invite
        </p>

        <div className="flex flex-col items-center gap-4">
          <div>
            <Button className="bg-gray-400 text-black font-medium hover:bg-gray-500 px-5 py-1 rounded-lg">
              Withdraw
            </Button>
          </div>

          <div className="w-full max-w-[90%] sm:max-w-sm mx-auto">
            <div className="bg-gray-400 rounded-lg px-4 py-3 flex items-center justify-between">
              <span className="font-semibold text-gray-900">
                {referralCode}
              </span>
              <Button
                onClick={handleCopy}
                variant="ghost"
                className="text-black font-semibold hover:bg-gray-300"
              >
                Copy
              </Button>
            </div>
          </div>

          <div className="w-full max-w-[90%] sm:max-w-sm flex items-center justify-center gap-2 sm:gap-3 mt-2 mx-auto">
            {socialShareOptions.map(({ id, Icon, url }) => (
              <button
                key={id}
                onClick={() => handleShare(url)}
                className="p-2.5 sm:p-3 bg-gray-400 rounded-lg hover:bg-gray-500 transition"
                aria-label={id}
              >
                <Icon className="w-5 h-5 text-gray-900" />
              </button>
            ))}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-2.5 sm:p-3 bg-gray-400 rounded-lg hover:bg-gray-500 transition">
                  <MoreHorizontal className="w-5 h-5 text-gray-900" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
                <DropdownMenuItem onClick={handleCopy}>
                  Copy Referral Link
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex items-start justify-center gap-2 text-xs text-gray-700 mt-2 px-4">
            <Info className="w-4 h-4 shrink-0 mt-[2px]" />
            <p className="max-w-sm">{referralPageData.note}</p>
          </div>
        </div>
      </Container>

      <div className="flex-grow flex justify-center px-4 mt-8 pb-8">
        <div
          className="bg-gray-400 rounded-t-lg w-full max-w-md flex flex-col"
          style={{ minHeight: "65vh" }}
        >
          <div className="px-6 pt-6 pb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Invite a friend
            </h2>

            <div className="mt-4 max-w-xs mx-auto">
              <SearchBar placeholder="Search by name" maxWidth="w-full" />
            </div>
          </div>

          <div className="px-4 flex-1 overflow-auto">
            <div className="divide-y divide-gray-500">
              {contacts.map((contact) => (
                <div
                  key={contact.id}
                  className="flex items-center justify-between py-3 border-b border-gray-500"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-300" />
                    <div>
                      <p className="font-medium text-sm text-gray-900">
                        {contact.name}
                      </p>
                      <p className="text-xs text-gray-700">{contact.source}</p>
                    </div>
                  </div>

                  {contact.status === "Accepted" ? (
                    <button
                      className="bg-gray-600 text-black text-sm font-normal rounded-full px-3 py-1 h-7 border border-gray-700"
                      disabled
                    >
                      Accepted
                    </button>
                  ) : (
                    <button
                      onClick={() => handleInvite(contact.id, contact.name)}
                      className="bg-green-700 text-black text-sm font-medium rounded-full px-3 py-1 h-7"
                    >
                      + Invite
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
