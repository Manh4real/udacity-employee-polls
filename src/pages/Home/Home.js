import { useSelector } from "react-redux";

import { selectPolls } from "../../features/poll";
import { selectUser } from "../../features/auth";

import { PollList } from "./PollList";

export const Home = () => {
  const polls = useSelector(selectPolls);
  const user = useSelector(selectUser);

  if (!user) return;

  const newPolls = Object.values(polls).filter((p) => !user.answers[p.id]);
  const answereedPolls = Object.values(polls).filter((p) => user.answers[p.id]);

  return (
    <section className="flex flex-col gap-5">
      <PollList title="New Questions" list={newPolls} />
      <PollList title="Done" list={answereedPolls} />
    </section>
  );
};
