import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Login } from "../pages/Login/Login";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../features/store";

describe("Login Component", () => {
  test("renders user name field, password field, and submit button", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Login />
        </Provider>
      </BrowserRouter>
    );

    const usernameField = screen.getByLabelText("User");
    expect(usernameField).toBeInTheDocument();

    const passwordField = screen.getByLabelText("Password");
    expect(passwordField).toBeInTheDocument();

    const submitButton = screen.getByRole("button", { name: "Submit" });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  test("displays error message for incorrect username or password", async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Login />
        </Provider>
      </BrowserRouter>
    );

    const usernameInput = screen.getByLabelText("User");
    const passwordInput = screen.getByLabelText("Password");

    fireEvent.change(usernameInput, { target: { value: "incorrectUsername" } });
    fireEvent.change(passwordInput, { target: { value: "incorrectPassword" } });

    fireEvent.click(screen.getByText("Submit"));

    await waitFor(
      () => {
        expect(screen.getByText("Failed to login")).toBeInTheDocument();
      },
      {
        timeout: 3000,
      }
    );
  });
});
