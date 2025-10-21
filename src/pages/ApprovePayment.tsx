"use client";

import { Button } from "@/components/ui/button";
import TitleOnlyDesktopHeader from "@/components/header/TitleOnlyDesktopHeader";

export default function ApprovePayment() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      <div className="flex-grow w-full">
        <div className="hidden md:block pl-16">
          <TitleOnlyDesktopHeader title="Payment" />
        </div>
        <header className="md:hidden text-center py-3">
          <h1 className="text-2xl font-bold text-gray-900">Payment</h1>
        </header>
        <div className="px-4 md:px-8 md:pl-24">
          <div className="w-full max-w-4xl mx-auto md:mx-0">
            <div className="mt-4 md:mt-6">
              <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                Pending
              </h2>
              <p className="text-sm text-gray-600 mt-2 md:w-full leading-relaxed">
                Payment for the service will remain pending until the service
                provider has successfully completed the agreed-upon task.
              </p>
            </div>
            <div className="border-t border-gray-300 my-6" />
            <div className="w-full text-sm text-gray-800">
              <div className="space-y-4">
                {["From", "To", "Title", "Amount", "Comment", "Rating"].map(
                  (label) => (
                    <div
                      key={label}
                      className="flex items-center justify-between border-b-2 border-gray-300 pb-2"
                    >
                      <span className="font-medium text-gray-700">
                        {label}:
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>
            <div className="flex justify-center mt-10 mb-10">
              <Button
                size="lg"
                className="px-10 py-4 rounded-xl text-base font-semibold"
              >
                Approve
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
