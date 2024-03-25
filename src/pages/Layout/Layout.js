import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Header } from "../../components/Header/Header";
import { routes } from "../../constants/routes";

import { asyncGetAllUsers } from "../../features/users";
import { selectUser } from "../../features/auth";

export const Layout = () => {
  const user = useSelector(selectUser);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      console.log(location.pathname);
      navigate(routes.login, {
        state: {
          prevPath: location.pathname,
        },
      });
    }
  }, [user, dispatch, navigate, location.pathname]);

  useEffect(() => {
    dispatch(asyncGetAllUsers());
  }, [dispatch]);

  return (
    <div className="App">
      <Header />

      <div className="p-5">
        <Outlet></Outlet>
      </div>
    </div>
  );
};
