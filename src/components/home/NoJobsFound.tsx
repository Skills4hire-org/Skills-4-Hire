import { Briefcase } from "lucide-react";

export default function NoJobsFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center space-y-3">
      <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">
        <Briefcase className="w-7 h-7 text-gray-400" />
      </div>

      <p className="text-gray-600 font-medium">No job offers found</p>
      <p className="text-sm text-gray-400">
        Try adjusting your filters or reset search
      </p>
    </div>
  );
}
