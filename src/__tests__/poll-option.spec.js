import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { PollOption } from "../pages/PollDetails/PollOption";
import { Provider } from "react-redux";
import { store } from "../features/store";

// Mock the useSelector hook
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}));

describe("PollOption component", () => {
  test("renders correctly", () => {
    const option = {
      text: "Test Option",
      votes: ["User1Id", "User2Id"],
    };

    const { asFragment } = render(
      <Provider store={store}>
        <PollOption
          option={option}
          selectedValue="testValue"
          value="testValue"
          handleChange={() => {}}
          currentUserVoted={false}
        />
      </Provider>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test("displays the correct number of people who voted for an option", () => {
    // Mock total users
    const totalUsers = 100;

    const useSelector = jest.requireMock("react-redux").useSelector;

    // Mock useSelector to return totalUsers
    useSelector.mockReturnValue(totalUsers);

    // Mock option data
    const option = {
      text: "Sample Option",
      votes: ["User1", "User2"],
    };

    // Render the component
    render(
      <Provider store={store}>
        <PollOption
          option={option}
          selectedValue="someValue"
          value="someValue"
          handleChange={() => {}}
          currentUserVoted={false}
        />
      </Provider>
    );

    expect(
      screen.getByText(`${option.votes.length}/${totalUsers} voted:`, {
        exact: false,
      })
    ).toBeInTheDocument();
  });
});
