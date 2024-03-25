import { Route, Routes } from "react-router-dom";

import "./App.css";

import { Home } from "./pages/Home/Home";
import { Login } from "./pages/Login/Login";
import { LeaderBoard } from "./pages/LeaderBoard/LeaderBoard";
import { CreateNewPoll } from "./pages/CreateNew/CreateNew";
import { PollDetails } from "./pages/PollDetails/PollDetails";

import { routes } from "./constants/routes";
import { NotFound } from "./pages/NotFound/NotFound";
import { Layout } from "./pages/Layout/Layout";

function App() {
  return (
    <Routes>
      <Route path={routes.home} Component={Layout}>
        <Route index Component={Home}></Route>
        <Route path={routes.leaderboard} Component={LeaderBoard}></Route>
        <Route path={routes.newPoll} Component={CreateNewPoll}></Route>
        <Route path={`${routes.poll}/:id`} Component={PollDetails}></Route>
      </Route>
      <Route path={routes.login} Component={Login}></Route>
      <Route path="*" Component={NotFound}></Route>
    </Routes>
  );
}

export default App;
