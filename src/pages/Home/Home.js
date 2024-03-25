import { useSelector } from "react-redux";

import { selectPolls } from "../../features/poll";
import { selectUser } from "../../features/auth";

import { PollList } from "./PollList";
import { useState } from "react";

export const Home = () => {
  const polls = useSelector(selectPolls);
  const user = useSelector(selectUser);

  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle((prev) => !prev);
  };

  if (!user) return;

  const newPolls = Object.values(polls).filter((p) => !user.answers[p.id]);
  const answereedPolls = Object.values(polls).filter((p) => user.answers[p.id]);
  const activeClasses = "border-b-2 border-gray-500";

  return (
    <section className="flex flex-col gap-5">
      <div className="flex">
        <div
          className={`cursor-pointer p-3 ${!toggle ? activeClasses : ""}`}
          onClick={handleToggle}
        >
          Unanswered
        </div>
        <div
          className={`cursor-pointer p-3 ${toggle ? activeClasses : ""}`}
          onClick={handleToggle}
        >
          Answered
        </div>
      </div>

      {toggle ? (
        <PollList title="New Questions" list={newPolls} />
      ) : (
        <PollList title="Done" list={answereedPolls} />
      )}
    </section>
  );
};
