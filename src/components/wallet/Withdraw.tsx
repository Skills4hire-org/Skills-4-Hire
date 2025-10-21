"use client";

import { Button } from "@/components/ui/button";
import TitleOnlyDesktopHeader from "@/components/header/TitleOnlyDesktopHeader";
import { ChevronRight } from "lucide-react";
import { withdrawFields, withdrawData } from "@/assets/data";

export default function Withdraw() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      <div className="flex-grow w-full">
        <div className="hidden md:block pl-20">
          <TitleOnlyDesktopHeader title={withdrawData.title} />
        </div>

        <header className="md:hidden text-center py-3">
          <h1 className="text-2xl font-bold text-gray-900">
            {withdrawData.title}
          </h1>
        </header>

        <div className="px-4 md:px-8 md:pl-24 mt-4">
          <div className="max-w-3xl mx-auto md:mx-0 bg-gray-100 border border-gray-200 p-6 shadow-sm">
            <div className="-mt-2 mb-4">
              <div className="inline-block rounded-r-full rounded-l-none bg-primary text-white px-6 py-2 text-sm font-medium">
                {withdrawData.sectionLabel}
              </div>
            </div>

            <div className="space-y-4">
              {withdrawFields.map(
                ({ id, label, icon: Icon, type, showChevron }) => (
                  <div key={id}>
                    {id === "amount" ? (
                      <>
                        <div className="flex justify-end mb-2">
                          <span className="text-sm font-semibold text-gray-800">
                            Balance: ₦{withdrawData.balance.toFixed(2)}
                          </span>
                        </div>

                        <div className="relative border border-gray-300 bg-white p-2">
                          <div className="flex items-center">
                            <div className="flex items-center justify-center w-9 h-9 rounded-md bg-gray-200 mr-3">
                              <Icon className="w-5 h-5 text-gray-500" />
                            </div>
                            <input
                              type={type}
                              placeholder={label}
                              className="flex-1 bg-transparent outline-none text-gray-700 text-sm pr-24"
                            />
                          </div>

                          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 pointer-events-none">
                            min ₦
                            {withdrawData.minWithdraw.toLocaleString(
                              undefined,
                              {
                                minimumFractionDigits: 2,
                              }
                            )}
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="flex items-center justify-between border border-gray-300 bg-white p-3 cursor-pointer">
                        <div className="flex items-center gap-3 text-gray-600">
                          <div className="flex items-center justify-center w-9 h-9 rounded-md bg-gray-200">
                            <Icon className="w-5 h-5 text-gray-500" />
                          </div>
                          {type === "text" ? (
                            <input
                              type="text"
                              placeholder={label}
                              className="flex-1 bg-transparent outline-none text-gray-700 text-sm"
                            />
                          ) : (
                            <span className="text-sm text-gray-700">
                              {label}
                            </span>
                          )}
                        </div>
                        {showChevron && (
                          <ChevronRight className="w-5 h-5 text-gray-500" />
                        )}
                      </div>
                    )}
                  </div>
                )
              )}

              <div className="flex justify-center mt-6">
                <Button
                  size="lg"
                  className="px-12 py-4 rounded-md text-base font-semibold"
                >
                  {withdrawData.buttonLabel}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
