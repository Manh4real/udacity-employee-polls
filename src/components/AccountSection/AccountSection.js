import { useDispatch, useSelector } from "react-redux";
import { logoutThunk, selectUser } from "../../features/auth";

import { Image } from "../../components/Image/Image";

export const AccountSection = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutThunk());
  };

  if (!user) return <></>;

  return (
    <div className="flex items-center gap-2 text-base">
      <Image src={user.avatarURL} />
      <span className="font-semibold">{user.id}</span>
      <span className="cursor-pointer" onClick={handleLogout}>
        Log out
      </span>
    </div>
  );
};
