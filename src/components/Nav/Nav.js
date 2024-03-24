import { NavLink } from "react-router-dom";
import { routes } from "../../constants/routes";

import "./Nav.css";

export const Nav = () => {
  return (
    <nav className="header-nav">
      <ul>
        <li className="font-semibold">
          <NavLink to={routes.home}>Home</NavLink>
        </li>
        <li className="font-semibold">
          <NavLink to={routes.leaderboard}>LeaderBoard</NavLink>
        </li>
        <li className="font-semibold">
          <NavLink to={routes.newPoll}>New Poll</NavLink>
        </li>
      </ul>
    </nav>
  );
};
