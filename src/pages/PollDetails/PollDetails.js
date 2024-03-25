import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { asyncAnswer, selectPoll } from "../../features/poll";
import { useParams } from "react-router-dom";
import { selectUser } from "../../features/auth";
import { PollOption } from "./PollOption";
import { NotFound } from "../NotFound/NotFound";

export const PollDetails = () => {
  const { id: pollId } = useParams();
  const poll = useSelector(selectPoll(pollId));
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const [option, setOption] = useState(user?.answers[poll?.id]);

  const handleChange = (e) => {
    if (option) return;

    const answer = e.target.value;

    dispatch(
      asyncAnswer({
        authedUser: user.id,
        qid: pollId,
        answer,
      })
    );

    setOption(answer);
  };

  const currentUserVoted = Boolean(option);

  useEffect(() => {
    setOption(user?.answers[poll?.id]);
  }, [user, poll]);

  if (!poll) return <NotFound />;

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-semibold">
        Poll by {poll.author} {poll.author === user.id && "(You)"}
      </h2>
      <div className="poll-author-image | my-8 mx-auto">
        <img
          className="block bg-gray-200 aspect-square w-64 object-cover rounded-full"
          src="https://picsum.photos/200"
          alt=""
        />
      </div>
      <p className="text-2xl font-semibold mb-5">Would You Rather</p>
      <div className="flex gap-3 w-full max-w-[1000px]">
        <PollOption
          option={poll.optionOne}
          selectedValue={option}
          value="optionOne"
          handleChange={handleChange}
          currentUserVoted={currentUserVoted}
        />

        <PollOption
          option={poll.optionTwo}
          selectedValue={option}
          value="optionTwo"
          handleChange={handleChange}
          currentUserVoted={currentUserVoted}
        />
      </div>
    </div>
  );
};
