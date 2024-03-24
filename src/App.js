import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./App.css";

import { Home } from "./pages/Home/Home";
import { Login } from "./pages/Login/Login";
import { LeaderBoard } from "./pages/LeaderBoard/LeaderBoard";
import { CreateNewPoll } from "./pages/CreateNew/CreateNew";
import { PollDetails } from "./pages/PollDetails/PollDetails";

import { Header } from "./components/Header/Header";

import { loginThunk, selectUser } from "./features/auth";
import { asyncGetAllUsers } from "./features/users";
import { routes } from "./constants/routes";

function App() {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const cachedUser = localStorage.getItem("user");
    const cached = cachedUser && JSON.parse(cachedUser);

    if (cached && !user) {
      dispatch(loginThunk());

      return;
    }

    if (!user) {
      navigate(routes.login);
    }
  }, [user, dispatch, navigate]);

  useEffect(() => {
    dispatch(asyncGetAllUsers());
  }, [dispatch]);

  return (
    <div className="App">
      <Header />

      <div className="p-5">
        <Routes>
          <Route path={routes.home} Component={Home}></Route>
          <Route path={routes.login} Component={Login}></Route>
          <Route path={routes.leaderboard} Component={LeaderBoard}></Route>
          <Route path={routes.newPoll} Component={CreateNewPoll}></Route>
          <Route path={`${routes.poll}/:id`} Component={PollDetails}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
