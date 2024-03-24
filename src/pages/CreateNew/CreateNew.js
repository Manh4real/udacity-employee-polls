import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { inputClasses } from "../../common/input";
import { getButtonClasses } from "../../common/button";
import { asyncCreateNewPoll } from "../../features/poll";
import { selectUser } from "../../features/auth";
import { routes } from "../../constants/routes";

export const CreateNewPoll = () => {
  const [form, setForm] = useState({ firstOption: "", secondOption: "" });
  const user = useSelector(selectUser);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const disabledSubmit = !form.firstOption || !form.secondOption;

  const handleClick = (e) => {
    e.preventDefault();

    if (disabledSubmit) return;

    dispatch(asyncCreateNewPoll({ ...form, user: user.id }))
      .unwrap()
      .then((res) => {
        if (!res.error) {
          navigate(routes.home);
        }
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
      <header className="mt-5 text-center mb-5">
        <h1 className="text-2xl font-semibold mb-1">Would You Rather</h1>
        <h2 className="text-xl font-thin">Create Your Own Poll</h2>
      </header>
      <main>
        <form className="flex flex-col text-center gap-3 items-center m-auto max-w-[500px]">
          <div className="input-field">
            <label htmlFor="firstOption">First Option</label>
            <input
              className={inputClasses}
              id="firstOption"
              name="firstOption"
              value={form["firstOption"]}
              onChange={handleInputChange}
              autoComplete="off"
            />
          </div>
          <div className="input-field">
            <label htmlFor="secondOption">Second Option</label>
            <input
              className={inputClasses}
              id="secondOption"
              name="secondOption"
              value={form["secondOption"]}
              onChange={handleInputChange}
              autoComplete="off"
            />
          </div>
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
