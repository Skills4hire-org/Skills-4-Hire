import HeaderWithBackNavigation from "@/components/header/HeaderWithBackNavigation";
import Container from "@/components/global/Container";
import { requests } from "@/assets/data";
import { Button } from "@/components/ui/button";

export default function Request() {
  const statusColor = (status: string) =>
    status === "Pending" ? "bg-red-500" : "bg-primary";

  return (
    <>
      <HeaderWithBackNavigation title="Request" onlyMobile={false} />

      <Container>
        <div className="w-full flex flex-col gap-4 pb-10">
          {requests.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl shadow-md border border-gray-200 overflow-hidden bg-white"
            >
              <div className="p-4 flex flex-col gap-3">
                <div className="flex items-start gap-3">
                  <img src={item.avatar} alt={item.name} />

                  <div className="flex flex-col flex-1">
                    <span
                      className={`${statusColor(
                        item.status
                      )} text-white text-xs px-3 py-1 rounded-full w-fit`}
                    >
                      {item.status}
                    </span>

                    {item.service && (
                      <p className="mt-1 text-gray-600 italic text-sm">
                        {item.service}
                      </p>
                    )}

                    <span className="text-gray-900 font-medium mt-1">
                      ₦{item.price.toLocaleString()}
                    </span>
                  </div>

                  <span className="text-gray-500 font-semibold">
                    #{item.id}
                  </span>
                </div>

                <div className="bg-gray-100 p-3 rounded-xl text-sm text-gray-700">
                  <p className="font-medium">{item.address}</p>
                  <p className="mt-1 text-gray-500">
                    {item.date} — {item.time}
                  </p>
                  <p className="mt-1 font-medium text-gray-700">{item.name}</p>
                </div>

                {item.status === "Pending" && (
                  <div className="flex items-center justify-between gap-3 mt-2">
                    <Button className="flex-1 bg-primary text-white rounded-full py-2">
                      Accept
                    </Button>

                    <Button
                      variant="outline"
                      className="flex-1 border-gray-400 text-gray-700 rounded-full py-2"
                    >
                      Decline
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}
