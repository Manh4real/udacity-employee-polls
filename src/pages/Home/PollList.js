import { PollCard } from "../../components/PollCard/PollCard";

export const PollList = ({ title, list }) => {
  return (
    <div className="rounded border border-gray-200">
      <div className="p-3 border-b border-b-gray-200 font-semibold text-2xl text-center">
        {title}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-3">
        {list.length === 0 && <p className="text-sm">No items found</p>}

        {list.map((item, i) => (
          <PollCard key={i} poll={item} />
        ))}
      </div>
    </div>
  );
};
