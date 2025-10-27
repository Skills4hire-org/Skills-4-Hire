"use client";

import { Button } from "@/components/ui/button";
import TitleOnlyDesktopHeader from "@/components/header/TitleOnlyDesktopHeader";
import Container from "@/components/global/Container";
import { approvePaymentData } from "@/assets/data";

export default function ApprovePayment() {
  const { title, section, description, fields, buttonLabel } =
    approvePaymentData;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      <div className="flex-grow w-full">
        <Container className="bg-white py-1 md:py-4">
          <div className="hidden md:block">
            <TitleOnlyDesktopHeader title={title} />
          </div>

          <header className="md:hidden text-center">
            <h1 className="font-bold text-lg md:text-xl">{title}</h1>
          </header>
        </Container>

        <Container className="space-y-4 md:space-y-6 mt-2 md:mt-4">
          <div className="w-full max-w-4xl mx-auto md:mx-0 space-y-4 md:space-y-6">
            <div className="space-y-2 md:space-y-4">
              <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                {section}
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed md:w-full">
                {description}
              </p>
            </div>

            <div className="border-t border-gray-300" />

            <div className="w-full text-sm text-gray-800 space-y-2 md:space-y-4">
              {fields.map((label) => (
                <div
                  key={label}
                  className="flex items-center justify-between border-b border-gray-300 pb-2"
                >
                  <span className="font-medium text-gray-700">{label}:</span>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-8 md:mt-10 mb-10">
              <Button
                size="lg"
                className="px-10 py-4 rounded-xl text-base font-semibold"
              >
                {buttonLabel}
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
