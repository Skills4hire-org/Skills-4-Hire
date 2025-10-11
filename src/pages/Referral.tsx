"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
      alert("Referral code copied!");
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
    <div className="min-h-screen flex flex-col bg-white">
      <HeaderWithBackNavigation title={referralPageData.title} />
      <Container className="pt-4 text-center space-y-3">
        <p className="text-2xl font-semibold">+ ₦0.00</p>
        <p className="text-sm text-gray-500">
          0 contacts, ₦{referralPageData.rewardAmount} per invite
        </p>
        <Button
          variant="secondary"
          className="w-32 mx-auto bg-gray-200 hover:bg-gray-300 text-black shadow-sm mt-2"
        >
          Withdraw
        </Button>
      </Container>

      <Container className="mt-8 flex flex-col items-center space-y-6">
        <div className="flex items-center justify-between w-full max-w-sm bg-gray-200 px-4 py-3 rounded-lg shadow-sm">
          <Input
            readOnly
            value={referralCode}
            className="border-none bg-transparent font-medium w-32 text-center"
          />
          <Button
            onClick={handleCopy}
            variant="ghost"
            className="text-primary font-semibold"
          >
            Copy
          </Button>
        </div>

        <div className="flex items-center justify-center gap-3 w-full max-w-sm flex-wrap mt-4">
          {socialShareOptions.map(({ id, Icon, url }) => (
            <button
              key={id}
              onClick={() => handleShare(url)}
              className="p-3 bg-gray-200 rounded-lg hover:bg-gray-300 transition shadow-sm"
            >
              <Icon className="w-5 h-5" />
            </button>
          ))}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-3 bg-gray-200 rounded-lg hover:bg-gray-300 transition shadow-sm">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-36">
              <DropdownMenuItem onClick={handleCopy}>
                Copy Referral Link
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-start justify-center gap-2 text-xs text-gray-500 text-center mt-4 px-4">
          <Info className="w-4 h-4 shrink-0 mt-[2px]" />
          <p className="max-w-sm">{referralPageData.note}</p>
        </div>
      </Container>

      <div className="flex-grow bg-gray-200 rounded-t-[2.5rem] pt-10 pb-20 mt-10 flex flex-col min-h-[50vh] sm:min-h-[60vh] md:min-h-[70vh] lg:min-h-[80vh]">
        <Container className="space-y-3 flex-grow">
          <h2 className="text-lg font-semibold">Invite a friend</h2>

          <SearchBar placeholder="Search by name" maxWidth="w-full" />

          <div className="mt-4 space-y-3 flex-grow">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className="flex items-center justify-between rounded-lg p-3 shadow-sm border border-gray-300 bg-gray-100"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gray-300" />
                  <div>
                    <p className="font-medium text-sm text-gray-800">
                      {contact.name}
                    </p>
                    <p className="text-xs text-gray-500">{contact.source}</p>
                  </div>
                </div>

                {contact.status === "Accepted" ? (
                  <Button
                    variant="outline"
                    disabled
                    className="text-black bg-gray-500 border border-gray-700 shadow-sm"
                  >
                    Accepted
                  </Button>
                ) : (
                  <Button
                    onClick={() => handleInvite(contact.id, contact.name)}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    Invite
                  </Button>
                )}
              </div>
            ))}
          </div>
        </Container>
      </div>
    </div>
  );
}
