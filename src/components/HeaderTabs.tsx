import { useState } from "react";

export default function HeaderTabs() {
  const tabs = ["Posts", "My Posts", "Job Offers"] as const;
  const [active, setActive] = useState<(typeof tabs)[number]>("Posts");

  return (
    <div className="bg-white sticky top-0 z-10 border-b">
      <div className="mx-auto max-w-md px-4 py-3 flex gap-6 text-sm">
        {tabs.map((t) => {
          const isActive = t === active;
          return (
            <button
              key={t}
              onClick={() => setActive(t)}
              className={`relative pb-2 font-medium ${
                isActive ? "text-blue-600" : "text-gray-600"
              }`}
            >
              {t}
              {isActive && (
                <span className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
