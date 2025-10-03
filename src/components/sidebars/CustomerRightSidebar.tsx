import SmallDP from "../../assets/Small-DP.png";

export default function CustomerRightSidebar() {
  return (
    <div className="bg-white rounded-lg shadow p-4 space-y-6 w-72 flex flex-col min-h-[90vh]">
      <section>
        <h3 className="font-semibold text-gray-700 mb-3">
          Top-rated providers
        </h3>
        <div className="space-y-3">
          {[1, 2, 3].map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <img
                src={SmallDP}
                alt="provider"
                className="h-8 w-8 rounded-full object-cover"
              />
              <div>
                <div className="text-sm font-medium text-gray-800">
                  James Carpentry
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <span className="text-yellow-500">★</span> 4.9 · Carpentry
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="mt-3 text-sm text-[#222BDE] font-medium hover:underline">
          See all
        </button>
      </section>

      <section>
        <h3 className="font-semibold text-gray-700 mb-3">Suggested services</h3>
        <div className="grid grid-cols-2 gap-3">
          {["Moving", "Painting", "Handyman", "Cleaning"].map((s) => (
            <span
              key={s}
              className="px-3 py-4 text-sm text-gray-600 border border-gray-300 rounded-md text-center"
            >
              {s}
            </span>
          ))}
        </div>
      </section>

      <section className="flex-1">
        <h3 className="font-semibold text-gray-700 mb-3">Quick Tips</h3>
        <div className="bg-[#ECF4FB] rounded-lg p-3 space-y-3">
          {[
            "Check provider reviews and ratings before hiring.",
            "Always verify provider credentials and insurance.",
            "Communicate clearly about your service needs.",
            "Get multiple quotes before meeting with the provider.",
          ].map((tip, i) => (
            <div
              key={i}
              className="flex items-start gap-2 text-sm text-gray-700"
            >
              <span className="flex-shrink-0 w-4 h-4 rounded-full bg-[#222BDE] text-white flex items-center justify-center text-xs mt-0.5">
                ✓
              </span>
              <span>{tip}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
