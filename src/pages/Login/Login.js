import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { getButtonClasses } from "../../common/button";
import { inputClasses } from "../../common/input";
import { loginThunk } from "../../features/auth";
import { routes } from "../../constants/routes";

export const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const disabledSubmit = !form.password || !form.username;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();

    if (disabledSubmit) return;

    dispatch(loginThunk(form))
      .unwrap()
      .then((res) => {
        if (res.error) {
          setError(res.error);

          return;
        }

        navigate(routes.home);
      });
  };

  const handleInputChange = (e) => {
    setForm((prev) => {
      return {
        ...prev,
        [e.target["name"]]: e.target.value,
      };
    });
  };

  return (
    <section className="p-5">
      <header className="mt-5 text-center flex flex-col gap-10 mb-5">
        <h1 className="text-4xl font-bold">Employee Polls</h1>

        <img
          className="w-40 h-40 border m-auto rounded-full object-contain"
          src="./images/entry-img.webp"
          alt=""
        />

        <h2 className="text-3xl font-semibold">Log In</h2>
      </header>
      <main>
        <form className="flex flex-col gap-3 items-center m-auto max-w-[500px]">
          <div className="input-field">
            <label htmlFor="username">User</label>
            <input
              className={inputClasses}
              id="username"
              name="username"
              value={form["username"]}
              onChange={handleInputChange}
              placeholder="Username"
              autoComplete="off"
            />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input
              className={inputClasses}
              id="password"
              name="password"
              value={form["password"]}
              onChange={handleInputChange}
              placeholder="Password"
              autoComplete="off"
            />
          </div>
          {error && (
            <p className="text-red-600 font-semibold text-center text-sm">
              {error}
            </p>
          )}
          <div className="mt-3">
            <button
              type="submit"
              onClick={handleClick}
              className={
                getButtonClasses({ disabled: disabledSubmit }) +
                " text-lg w-[150px]"
              }
              disabled={disabledSubmit}
            >
              Submit
            </button>
          </div>
        </form>
      </main>
    </section>
  );
};
