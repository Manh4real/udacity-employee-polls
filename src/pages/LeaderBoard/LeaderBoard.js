import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectUsers } from "../../features/users";
import { selectUser } from "../../features/auth";
import { asyncGetAllUsers } from "../../features/users";

import { Image } from "../../components/Image/Image";

export const LeaderBoard = () => {
  const _user = useSelector(selectUser);
  const users = useSelector(selectUsers);
  const dispatch = useDispatch();

  const renderedUserList = useMemo(
    () =>
      Object.values(users || {})
        .sort((a, b) => b.questions.length - a.questions.length)
        .sort(
          (a, b) =>
            Object.keys(b.answers).length - Object.keys(a.answers).length
        ),
    [users]
  );

  useEffect(() => {
    dispatch(asyncGetAllUsers());
  }, [dispatch]);

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full border text-sm text-left rtl:text-right text-gray-500 ">
        <thead className="text-xs border-b text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Users
            </th>
            <th scope="col" className="px-6 py-3">
              Answered
            </th>
            <th scope="col" className="px-6 py-3">
              Created
            </th>
          </tr>
        </thead>
        <tbody>
          {renderedUserList.map((user) => (
            <tr
              key={user.id}
              className={
                "bg-white border-b " +
                (_user?.id === user.id
                  ? "!bg-green-300 font-bold text-black"
                  : "")
              }
            >
              <th
                scope="row"
                className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap"
              >
                <div className="flex gap-2 items-center">
                  <Image src={user.avatarURL} />
                  <div>
                    <p>
                      {user.name} {_user?.id === user.id && "(You)"}
                    </p>
                    <p className="font-thin text-sm">{user.id}</p>
                  </div>
                </div>
              </th>
              <td className="px-6 py-2">{Object.keys(user.answers).length}</td>
              <td className="px-6 py-2">{user.questions.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
