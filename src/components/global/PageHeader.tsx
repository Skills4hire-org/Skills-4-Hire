import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

interface PageHeaderProps {
  title: string;
}

export default function PageHeader({ title }: PageHeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="w-full flex items-center justify-between py-3 px-4 md:px-6 bg-white sticky top-0 z-10 border-b border-gray-100">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1 text-gray-700 hover:text-primary transition-colors focus:outline-none"
      >
        <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
        <span className="sr-only">Back</span>
      </button>

      <h1 className="text-lg md:text-xl text-gray-800 font-bold text-center flex-1">
        {title}
      </h1>
      <div className="w-10" />
    </header>
  );
}
