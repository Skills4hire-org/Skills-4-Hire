interface JobOfferCardProps {
  profile: string;
  name: string;
  role: string;
  location: string;
  title: string;
  description: string;
  budget: string;
  deadline: string;
  images?: string[];
}

export default function JobOfferCard({
  profile,
  name,
  role,
  location,
  title,
  description,
  budget,
  deadline,
  images = [],
}: JobOfferCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 space-y-3">
      <div className="flex items-center gap-3">
        <img
          src={profile}
          alt={name}
          className="h-10 w-10 rounded-full object-cover"
        />
        <div className="text-sm">
          <p className="font-semibold text-gray-900">{name}</p>
          <p className="text-gray-500 text-xs">
            {role} • {location}
          </p>
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-gray-900 text-base">{title}</h3>
        <p className="text-gray-600 text-sm mt-1">{description}</p>
      </div>

      <div className="flex items-center gap-4 text-xs flex-wrap">
        <span className="text-blue-600 font-medium">💰 Budget: {budget}</span>
        <span className="text-yellow-700 font-medium">
          ⏰ Deadline: {deadline}
        </span>
      </div>

      {images.length > 0 && (
        <div className="flex gap-2">
          {images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`job-img-${i}`}
              className="h-28 w-1/2 object-cover rounded-xl"
            />
          ))}
        </div>
      )}
      <div className="flex gap-3 pt-2">
        <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 rounded-xl">
          Accept
        </button>
        <button className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white text-sm py-2 rounded-xl">
          Negotiate
        </button>
        <button className="flex-1 border border-gray-300 text-gray-700 text-sm py-2 rounded-xl">
          Message
        </button>
      </div>
    </div>
  );
}
