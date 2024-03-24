import { useSelector } from "react-redux";
import { selectTotalUsers } from "../../features/users";

export const PollOption = ({
  option,
  selectedValue,
  value,
  handleChange,
  currentUserVoted,
}) => {
  const totalUsers = useSelector(selectTotalUsers);

  return (
    <div className="flex-1 flex gap-3 py-3 px-5 border border-gray-200 rounded">
      <input
        type="radio"
        name="answer"
        id={value}
        value={value}
        checked={selectedValue === value}
        onChange={handleChange}
        disabled={currentUserVoted}
        readOnly={currentUserVoted}
      />
      <div className="flex-1">
        <label htmlFor={value} className="block flex-1 cursor-pointer">
          {option.text}
        </label>
        {option.votes.length > 0 && (
          <p className="text-gray-500 font-thin text-sm">
            <span className="text-green-600 font-semibold">
              {option.votes.length}/{totalUsers} voted:&nbsp;
            </span>
            {option.votes.join(", ")}
          </p>
        )}
      </div>
    </div>
  );
};
