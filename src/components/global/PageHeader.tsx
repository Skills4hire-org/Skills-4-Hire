import { useNavigate } from "react-router-dom";
import Container from "./Container";

interface PageHeaderProps {
  title: string;
}

export default function PageHeader({ title }: PageHeaderProps) {
  const navigate = useNavigate();

  return (
    <Container>
      <header className="flex items-center justify-between py-2 sm:py-3 px-2 sm:px-4 bg-white shadow-sm sticky top-0 z-10">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-primary font-medium focus:outline-none"
        >
          <span className="sr-only">Back</span>

          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm font-semibold">
            ←
          </div>
        </button>

        <h1 className="text-lg sm:text-xl font-semibold text-gray-800 text-center flex-1">
          {title}
        </h1>

        <div className="w-8" />
      </header>
    </Container>
  );
}
