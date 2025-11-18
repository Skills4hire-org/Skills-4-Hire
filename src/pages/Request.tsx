import HeaderWithBackNavigation from "@/components/header/HeaderWithBackNavigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function RequestsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="w-full pb-4">
        <HeaderWithBackNavigation title="Request" />
      </div>

      <div className="max-w-screen-lg mx-auto px-4">
        <div className="flex flex-col gap-4 mt-4 pb-10">
          <div className="bg-white border rounded-2xl p-4 shadow-sm flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <img
                src="/src/assets/request1.png"
                alt="Request"
                className="w-16 h-16 rounded-xl object-cover"
              />
              <div className="flex-1">
                <p className="text-sm font-medium">
                  No 18, IyanuOluwa Street, Taloke, Ilorin
                </p>
                <p className="text-xs text-gray-500">Plumbing</p>
              </div>

              <div className="text-right">
                <Badge className="bg-blue-500 text-white">Accepted</Badge>
                <p className="text-sm font-semibold mt-1">₦20,000</p>
              </div>
            </div>

            <Button className="w-full bg-blue-600 text-white rounded-full h-10">
              Accept
            </Button>

            <Button
              variant="outline"
              className="w-full rounded-full h-10 text-black border-gray-300"
            >
              Decline
            </Button>
          </div>

          <div className="bg-white border rounded-2xl p-4 shadow-sm flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <img
                src="/src/assets/request2.png"
                alt="Request"
                className="w-16 h-16 rounded-xl object-cover"
              />
              <div className="flex-1">
                <p className="text-sm font-medium">
                  No 19, IyanuOluwa Street, Taloke, Ilorin
                </p>
                <p className="text-xs text-gray-500">Plumbing</p>
                <p className="text-xs text-gray-400 mt-1">
                  28 Mar 2025 — 11:26pm
                </p>
                <p className="text-xs font-medium mt-1">Joshua Friday</p>
              </div>

              <div className="text-right">
                <Badge className="bg-orange-500 text-white">Pending</Badge>
                <p className="text-sm font-semibold mt-1">₦20,000</p>
              </div>
            </div>

            <Button className="w-full bg-blue-600 text-white rounded-full h-10">
              Accept
            </Button>

            <Button
              variant="outline"
              className="w-full rounded-full h-10 text-black border-gray-300"
            >
              Decline
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
