interface Props {
  value: string;
  setValue: (v: string) => void;
}

export default function SortDropdown({ value, setValue }: Props) {
  return (
    <select
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="
        px-3 py-1.5
        rounded-md
        bg-white
        border border-gray-200
        text-xs md:text-sm
        focus:outline-none
        focus:ring-2 focus:ring-primary
        focus:border-primary
        hover:bg-gray-300
        hover:border-gray-300
      "
    >
      <option value="">Sort</option>
      <option value="newest">Newest → Oldest</option>
      <option value="oldest">Oldest → Newest</option>
      <option value="highest">Highest Budget</option>
      <option value="lowest">Lowest Budget</option>
    </select>
  );
}
