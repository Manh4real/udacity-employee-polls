import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { PollOption } from "../pages/PollDetails/PollOption";
import { Provider } from "react-redux";
import { store } from "../features/store";

describe("PollOption component", () => {
  test("changes the input when selectedValue matches value", () => {
    const option = {
      text: "Test Option",
      votes: ["User1Id", "User2Id"],
    };
    const handleChange = jest.fn();

    render(
      <Provider store={store}>
        <PollOption
          option={option}
          selectedValue="someValue"
          value="someValue"
          handleChange={handleChange}
          currentUserVoted={false}
        />
      </Provider>
    );

    const input = screen.getByRole("radio");
    expect(input).toHaveAttribute("value", "someValue");

    fireEvent.change(input, { target: { value: "otherValue" } });
    expect(input).not.toHaveAttribute("value", "someValue");

    fireEvent.change(input, { target: { value: "someValue" } });
    expect(input).toHaveAttribute("value", "someValue");
  });
});
